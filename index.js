import express from 'express';
import mongoose, { Schema, connect } from 'mongoose';
import cors from "cors"
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
const workSchema = new Schema({
    image: String,
    name: String,
    author: String,

});

const workModel = mongoose.model('Work', workSchema);


app.get('/', async (req, res) => {
    const work = await workModel.find({})
    res.send(work)
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    const work = await workModel.findById(id)
    res.send(work)
})

app.post('/', async (req, res) => {
    const { image, name, author } = req.body
    const newWorks = new workModel({ image, name, author })
    await newWorks.save()
    res.send('Got a POST request')
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const { image, name, author } = req.body
    const work = await workModel.findByIdAndUpdate(id, { image, name, author })
    res.send(work)
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    const work = await workModel.findByIdAndDelete(id)
    res.send(work)
})
connect('mongodb+srv://mahammad:mahammad@cluster0.errjuf4.mongodb.net/')
    .then(() => console.log('Connected!'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})