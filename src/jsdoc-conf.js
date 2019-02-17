'use strict';

module.exports = {
    plugins: ['plugins/jsdoc-plugin-mongoose'],
    recurseDepth: 10,
    source: {
        include: ['src/models', 'src/controllers', 'src/routes', 'src/index.js', 'src/app.js']
    },
    templates: {
        monospaceLinks: true
    }
};