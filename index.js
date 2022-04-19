const { request } = require('express')
const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())

let notes =  require('./notes')


app.get('/', (request, response)=>{
    response.send('<h1>hola</h1>')
})

app.get('/api/notes', (request, response)=>{
    response.json(notes)
})

app.get('/api/notes/:id', (request,response)=>{
    const id = Number(request.params.id)
    const idNotes = notes.find(note => note.id === id)
    if(idNotes){
        response.send(idNotes)
    }else{
        response.status(404).end()
    }    
})

app.delete('/api/notes/:id', (request, response)=>{
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response)=>{
    const note = request.body
    notes = [...notes, note]
    response.json(note)
})

app.use((request, response)=>{
    response.status(404).json({
        error:'not found'
    })
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`El servidor corre en el puerto: ${PORT}`)
})
