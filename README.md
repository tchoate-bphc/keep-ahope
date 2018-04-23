# AHOPE 2018


## SETUP

- `npm install`
- `firebase login` 
    - Instructions for Firebase-cli setup and login: https://firebase.google.com/docs/cli/
    - Ensure that you have been granted Firebase permissions to this project
    - After first logging in with your Gmail (running locally or in production), ensure that your user has permissions granted in the Firebase database (`/users/<<Google UID>>/permissions/basic`)


## DEVELOPMENT

[http://localhost:8080/](http://localhost:8080/)

*development server* `npm run start`


## PRODUCTION

[http://localhost:3000/](http://localhost:3000/)

*build and serve* `npm run prod`

*build*  `npm run build` -- Don't forget to first copy the static images from src/static/images into public/images

*serve*  `npm run serve`


## DEPLOY

`firebase deploy`

