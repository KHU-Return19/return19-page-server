const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const port = 8000

const userRoute = require("./routes/users")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true
}).then(() => console.log("MongoDB Connected ..."))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('dev')
})

// use routes 
app.use("/api/users/", userRoute)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

