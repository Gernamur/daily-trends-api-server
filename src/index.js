import app from './app.js'

app.listen(process.env.PORT, () => {
  console.log(`Listening at port ${process.env.PORT}`)
  console.log(`Environment ${process.env.NODE_ENV}`)
  console.log(`Version ${process.env.npm_package_version}`)
})
