const express = require('express')
const app = express()
app.use(express.json())

let notes =  [
      {
        "id":1,
        "latitude": 40.416875,
        "longitude": -3.703308,
        "city": "Madrid",
        "description": "Puerta del Sol"
      },
      {
        "id":2,
        "latitude": 40.417438,
        "longitude": -3.693363,
        "city": "Madrid",
        "description": "Paseo del Prado"
      },
      {
        "id":3,
        "latitude": 40.407015,
        "longitude": -3.691163,
        "city": "Madrid",
        "description": "Estación de Atocha"
      }
    ]


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

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`El servidor corre en el puerto: ${PORT}`)
})
