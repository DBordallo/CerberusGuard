import path from 'path';

export default {
  mode: 'development', // Modo de desarrollo
  entry: './src/index.js', // Punto de entrada de tu aplicación
  output: {
    path: path.resolve(__dirname, 'dist'), // Directorio de salida para los archivos generados
    filename: 'bundle.js', // Nombre del archivo de salida generado
    publicPath: '/' // Ruta pública para los archivos generados (importante para webpack-dev-server)
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // Directorio base para servir el contenido
    publicPath: '/', // Ruta pública para el servidor de desarrollo
    open: true // Abrir automáticamente el navegador al iniciar el servidor de desarrollo
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Regla para archivos JavaScript
        exclude: /node_modules/, // Excluir la carpeta 'node_modules'
        use: {
          loader: 'babel-loader', // Utilizar Babel para transpilar el código
          options: {
            presets: ['@babel/preset-env'] // Utilizar el preset de Babel para entornos modernos
          }
        }
      }
    ]
  }
};
