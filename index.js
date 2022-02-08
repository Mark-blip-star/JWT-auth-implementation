const express = require(`express`)
const mongoose = require(`mongoose`)
const app = express()
const dotenv = require(`dotenv`)
const cookieParser = require(`cookie-parser`)
dotenv.config()
//==========================================
const AuthRouter = require(`./routes/authRoutes.js`)
const infoRoutes = require(`./routes/infoRoutes.js`)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(AuthRouter)
app.use(infoRoutes)
const PORT = process.env.PORT || 5000

function start(){
	app.listen(PORT,async() => {
		await mongoose.connect(`mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@cluster0.m1o8c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
	    console.log(`The server is working on port ${PORT}`)
	})
}

start()