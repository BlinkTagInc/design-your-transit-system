const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    // Specify the paths to all of the template files
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}'
    ],
    // This is the function used to extract class names from the templates
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  }
]

module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    process.env.NODE_ENV === 'production' ? purgecss : undefined,
    'autoprefixer'
  ]
}
