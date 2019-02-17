'use strict';

module.exports = {
    plugins: ['plugins/jsdoc-plugin-mongoose'],
    recurseDepth: 10,
    source: {
        include: ['app.js', 'models/', 'controllers/'],
        includePattern: '.+\\.js(doc|x)?$'
    },
    templates: {
        monospaceLinks: true
    }
};