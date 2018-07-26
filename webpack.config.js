const path = require('path');





module.exports={
    entry: ["babel-polyfill", './src/app.js'],
    output:{
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module:{
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.jpg$/,
            use: [
                {
                    loader:'url-loader',
                    options:{
                        mimetype: 'image/jpg'

                }
            }
            ]
        },
        {
            test: /\.scss$/,
            use:[
                
                'style-loader',
                'css-loader',
                'resolve-url-loader',
                'sass-loader?sourceMap'
                
            ]
        },{
            test: /\.css$/,
            use:[
                'style-loader',
                'css-loader'
            ]
        }
    ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    }
};
