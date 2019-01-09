#!/bin/bash
rm -rf lambda/custom/node_modules
mkdir -p "./lambda/custom/node_modules" && cp -r ../../../node_modules ./lambda/custom/
ask deploy --target lambda
