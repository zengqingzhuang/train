// requirejs config
require.config({
    baseUrl: '/src/js/',
    map: {
        '*': {
            'css': '/lib/require-css/css.js'
        }
    },
    paths: {
        'Module': '/lib/module',
        'jqextend': '/lib/jquery-extend',
        'floatcount': '/lib/floatcount',
        'validrule': '/lib/validrule',
        'dialog': '/lib/jquery-dialog',
        'submitform': '/lib/submitform',
        'json2': '/lib/json2',
        'json3': '/lib/json3',
        'datepicker': '/lib/jquery-datepicker',
        'selectcity': '/lib/jquery-selectcity',
        'lazyload': '/lib/jquery-lazyload',
        'base64': '/lib/base64',
        'handlebars': '/lib/handlebars-v3.0.3',
        'jquery': '/lib/jquery-1.8.3',
        'slide': '/lib/jquery-slide',
        'angular': '/bower_components/angular/angular',
        'angular-route': '/bower_components/angular-route/angular-route',
        'angular-resource': '/bower_components/angular-resource/angular-resource'
    },
    shim: {
        'handlebars': {
            'exports': 'Handlebars'
        },
        'angular': {
            'exports': 'angular'
        }
    },
    priority: [
        "angular"
    ],
    waitSeconds: 30,
    // deps: ['base64', 'es5-shim', 'json2'],
    urlArgs: 'v=1.0.0',
    help: 'config'
});