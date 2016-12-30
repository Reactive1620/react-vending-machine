module.exports = {
   entry: './src/main.js',
    
   output: {
      path:'./dist/',
      filename: 'bundle.js',
   },
    
   devServer: {
      inline: true,
      port: 8888
   },
    
   module: {
      loaders: [
         {
            test: /\.js/,
            exclude: /node_modules/,
            loader: 'babel-loader',
                
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}