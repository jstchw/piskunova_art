window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    let navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    /*
    Navbar shrinking function exists but the listener for it is disabled
    for cosmetic purposes.
     */

    // Shrink the navbar 
    //navbarShrink();

    // Shrink the navbar when page is scrolled
    //document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        })
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    )
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        })
    })

    /// When you click everywhere in the document
    $(document).click(function (event) {
      /// If *navbar-collapse* is not among targets of event
      if (!$(event.target).is('.navbar-collapse *')) {
        /// Collapse every *navbar-collapse*
        $('.navbar-collapse').collapse('hide');
      }
    });

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
        })
    })

// JQuery part of code
// Handles the email sending via AJAX
$(() => {
    let submitButton = $('#submitButton')
    $('#contactForm').on('submit', function (e) {
        e.preventDefault()
        let message = $('[name=message]').val()
        let name = $('[name=name]').val()
        let phone = $('[name=phone]').val()
        let email = $('[name=email]').val()
        if(message && name && phone && email) {
            $.ajax({
                type : 'POST',
                url : "/send_email",
                data: {message: message, name: name, phone: phone, email: email},
                success: function() {
                    emailSent(submitButton)
                },
                error: function() {
                    emailNotSent(submitButton)
                }
            })
            submitButton.empty()
            submitButton.append($('<div id="spinner-elem" class="spinner-border text-light" role="status" style="display: none"></div>'))
            $('#spinner-elem').fadeIn('slow')



        }

    })

    // Clean the form on modal close
    $('#emailModal').on('hidden.bs.modal', () => {
        $('#contactForm').trigger('reset')
        $('#contactForm').removeClass('was-validated')
    })

    return false
})

// Function to handle when the email fails to send
function emailNotSent(submitButton) {
    const spinner = submitButton.contents()
    const cross = $('<div id="cross-fade" class="far fa-times-circle"></div>')
    cross.css('display', 'none')
    submitButton.append(cross)
    spinner.fadeOut('slow', () => {
        $('#cross-fade').fadeIn('slow').delay(2000)
        $('#cross-fade').fadeOut('slow', () => {
            submitButton.append($(`<div id="send-div" style='display: none;'>Send</div>`))
            $('#send-div').fadeIn('slow')
        })
    })
}

// Function to handle when the email is sent successfully
function emailSent(submitButton) {
    const spinner = submitButton.contents()
    const check = $('<div id="check-fade" class="far fa-check-circle"></div>')
    check.css('display', 'none')
    submitButton.append(check)
    spinner.fadeOut('slow', () => {
        $('#check-fade').fadeIn('slow')
    })
}
