const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const app = express()
const port = 8000

const userRoute = require("./routes/users")
require("dotenv").config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log("MongoDB Connected ..."))
.catch(err => console.log(err))

app.get("/api/test/", (req, res) => {
  res.send('test !!!')
})

// use routes 
app.use("/api/users/", userRoute)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

