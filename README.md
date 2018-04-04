# AHOPE 2018

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

## PREREQUISITES

- `npm install`
- follow instructions here: https://firebase.google.com/docs/cli/


## RUNNING BEHIND A CORPORATE PROXY

- Test with: echo $http_proxy"
- Unset proxies using a method below
- Reset proxies by reloading .bashrc `source ~/.bashrc`, assuming default proxies are set there

### bash

```bash
# Method 1: Manual Reset
unset ALL_PROXY
unset FTP_PROXY
unset RSYNC_PROXY
unset HTTP_PROXY
unset HTTPS_PROXY
unset http_proxy
unset https_proxy
unset ftp_proxy
unset rsync_proxy
unset NO_PROXY
npm config delete https-proxy
npm config delete http-proxy
npm config delete proxy

# Method 2: Function Reset
function setproxy() {
    export {http,https,ftp}_proxy="http://proxy-server:port"
    export {HTTP,HTTPS,FTP}_PROXY="http://proxy-server:port"
}
function unsetproxy() {
    unset {http,https,ftp}_proxy
    unset {HTTP,HTTPS,FTP}_PROXY
}
```