require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');

const authRoutes = require("./routes/authRoutes")
const dataRoutes = require("./routes/dataRoutes")

const app = express()

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server listening to port ${process.env.PORT}`)
        })
    })
    .catch(err => console.log(err))

app.get("/", (req, res) => {
    res.cookie('haha', 'cookied')
    res.cookie('nana', 'biscuit')

    res.send(req.cookies.haha)
})
app.use("/", authRoutes)
app.use("/api", dataRoutes)