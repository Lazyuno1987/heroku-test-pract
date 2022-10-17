const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const app = express();
const cors = require("cors")
require("dotenv").config();
const { DB_HOST, PORT = 3001 } = process.env
const Contact = require("./schema")
app.use(express.static(path.join(__dirname, "front/build")))

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "front/build", "index.html" ))
})
app.get("/contacts", async(req, res) => {
    const contacts = await Contact.find()
    res.send(
        contacts
    )
})
app.get("/contacts/:id", async (req, res) => {
   
    const {id} = req.params
    const contactId = await Contact.findById(id)
     res.send(contactId)
})
app.delete("/contacts/:id", async (req, res) => {
  
    const {id} = req.params
    const contactDelete = await Contact.findOneAndDelete(id);
    res.send(contactDelete)
   
})


// app.('/contacts', async (req, res) => {
//     res.send( "Hello")
// })
app.post('/contacts', async(req, res) => {
 console.log(req.params)
    const newContact = await Contact.create(req.body)
  console.log(req.body)
    res.json({ data: newContact })
})


mongoose.connect(DB_HOST, () => {
    console.log("Mongodb connect")
})


app.use((err, req, res, next) => {
    const { message, status=500 }= err
    res.status(status).send(message)
})
app.use((req, res, next) => {
    res.status(404).json({
        message:"Not found"
    })
})



mongoose.connect(DB_HOST)

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})
