module.exports = {
  plugins: [
    require('postcss-easy-import')({prefix: '_'}), // Keep this first
    require('autoprefixer')({ /* ...options */ }) // So imports are auto-prefixed too
  ]
}
