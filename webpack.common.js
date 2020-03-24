const merge = require('webpack-merge');
const rules = require("./webpack/rules.js");
const plugins = require("./webpack/plugins.js")

const config = merge(rules, {
    context: __dirname,
    node: {
        dns: 'mock',
        net: 'mock',
        fs: 'empty'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            'masonry': 'masonry-layout',
            'isotope': 'isotope-layout',
            'vue': 'vue/dist/vue.min.js'
        }
    },
    plugins
});

module.exports = config;