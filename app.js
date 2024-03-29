require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const cors = require('cors')

const { requireAuth, checkUser } = require("./middleware/authMiddleware")

const authRoutes = require("./routes/authRoutes")
const dataRoutes = require("./routes/dataRoutes")

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server listening to port ${process.env.PORT}`)
        })
    })
    .catch(err => console.log(err))

app.use("/", authRoutes)
app.use("/api", dataRoutes)

app.get("/", checkUser, (req, res) => res.send("Lastu"))