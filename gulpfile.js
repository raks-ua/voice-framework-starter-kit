let gulp = require('gulp');
let copy = require('gulp-copy');
let rename = require('gulp-rename');
//let config = require('config');

let dt = new Date();

let zip = require('gulp-zip');
let aws_lambda = require('gulp-aws-lambda');

let lambda_params_prod = {
    FunctionName: 'myFrameworkProd',
    Handler: 'index.handler',
    Role: process.env["AWS_ROLE"],
    Runtime: 'nodejs6.10',
    Description: 'My Open Framework',
    MemorySize: 128,
    Timeout: 10,
    Publish: true
};

let aws_credentials_prod = {
    "accessKeyId": process.env["AWS_KEY"],
    "secretAccessKey": process.env["AWS_PASS"],
    "region": "us-east-1"
};


gulp.task('deploy-prod-alexa', function () {
    return gulp.src('./deploy/prod/alexa/send/index.zip')
        .pipe(aws_lambda(aws_credentials_prod, lambda_params_prod));
});

