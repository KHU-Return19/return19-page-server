const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('test')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})