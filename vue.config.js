module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? ( process.env.OUTPUT_DIR === 'docs' ? '/alpha-player/' : '/')
    : '/',
   outputDir: process.env.OUTPUT_DIR,
   configureWebpack: {
    externals: ['Hls']
  }
}