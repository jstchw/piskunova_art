import os

from flask import Flask, render_template, request
from flask_mail import Mail, Message
from datetime import date
from static import config
from markupsafe import escape

app = Flask(__name__, template_folder='templates')


@app.route('/')
def main():
    insta_profile = 'https://www.instagram.com/piskunovaart/'
    github_profile = 'https://github.com/jstchw'
    in_profile = 'https://www.linkedin.com/in/elizaveta-piskunova-3a745b244/'
    email = 'piskunovaart@gmail.com'
    year = date.today().year
    return render_template('main.html', insta_profile=insta_profile, year=year, github_profile=github_profile,
                           in_profile=in_profile, email=email)


@app.route('/theatre')
def theatre():
    return render_template('theatre.html')


@app.route('/media')
def media():
    return render_template('media.html')


@app.route('/collections')
def collections():
    return render_template('collections.html')


@app.route('/send_email', methods=['POST'])
def send_email():
    name = request.form.get("name")
    email = request.form.get("email")
    phone = request.form.get("phone")
    message = request.form.get("message")
    message = str(escape(message))
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USERNAME'] = config.sender
    app.config['MAIL_PASSWORD'] = config.app_password
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True
    mail = Mail(app)
    msg = Message('A message sent from piskunovaart', sender=config.sender, recipients=[config.recipient])
    msg.body = f"Sender name: {name}\n" \
               f"Sender email: {email}\n" \
               f"Sender phone: {phone}\n" \
               f"Message: {message}"
    mail.send(msg)
    return ''


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
