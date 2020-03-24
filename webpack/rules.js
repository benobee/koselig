const rules = {
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                "babel-loader",
                {
                    loader: "eslint-loader",
                    options: {
                        emitWarning: true,
                        fix: true
                    }
                },
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.json$/,
            use: "json-loader"
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              'file-loader',
            ],
        }]
    }
}

module.exports = rules;