#!/bin/bash

read -p "Are you sure UPDATE ALEXA PROD? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    DEPLOY_PATH='./deploy/prod/alexa';
    dt=`date '+%Y_%m_%d_%H_%M_%S'`
    pushd $DEPLOY_PATH/app;
    rm ../send/index.zip;
    zip -r ../send/all/$dt.zip entity config framework model node_modules index.js app-handlers.js
    ln -s ../send/all/$dt.zip ../send/index.zip;
    popd;
    gulp deploy-prod-alexa;
fi