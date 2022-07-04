from flask import Flask, render_template
from datetime import date

app = Flask(__name__, template_folder='templates')


@app.route('/')
def main():
    insta_profile = 'https://www.instagram.com/piskunovaart/'
    github_profile = 'https://github.com/jstchw'
    in_profile = 'https://www.linkedin.com/in/elizaveta-piskunova-3a745b244/'
    year = date.today().year
    return render_template('main.html', insta_profile=insta_profile, year=year, github_profile=github_profile,
                           in_profile=in_profile)


# @app.route('/theatre')
# def theatre():
#     return render_template('templates_obsolete/theatre.html')
#
#
# @app.route('/media')
# def media():
#     return render_template('templates_obsolete/media.html')


if __name__ == '__main__':
    app.run()
