# Changelog


## 0.2.0

*May 5, 2015*

- Change the API for emails to have the following shape: {subject, body}.
- Insert the email subject into the email template file by replacing %subject%.
- Implement image prefix function so that images are prefixed when producing production and testing emails.


## 0.1.2

*May 5, 2015*

- Add trailing space to email.js template file.
- Added build/scripts and build/styles to mighty project .gitignore.


## 0.1.1

*May 5, 2015*

- Conditionally install gulp-sass or gulp-less depending on sass command line option.
- Convert gulpfile.js to template that only uses gulp-sass or gulp-less depending on sass command line option.