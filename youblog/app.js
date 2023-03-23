const express = require('express')
const path = require('path')
const app = express()


app.listen(3000, () => {
  console.log('Start server at port 3000.')
})

// Setup ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Setup static path
app.use(express.static(path.join(__dirname, 'public')))

// Config Router
const indexRouter = require('./routes/index')

app.use('/', indexRouter)

