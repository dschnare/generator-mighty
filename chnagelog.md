# Changelog

## 0.2.5

*May 6, 2015*

- Update mighty-mail to version 0.3.1.


## 0.2.4

*May 6, 2015*

- Update mighty-mail to version 0.3.0.


## 0.2.3

*May 6, 2015*

- Resolve issue with Outlook conditional if blocks being mangled by HTML prettifier.


## 0.2.2

*May 6, 2015*

- Resolve issue with image prefixing not using the global Regex flag and the substition constructed the path incorrectly.


## 0.2.1

*May 5, 2015*

- Update mighty-mail to version 0.1.7.


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