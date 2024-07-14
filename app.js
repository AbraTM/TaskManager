const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect');
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//MiddleWare
app.use(express.static("./public"))
app.use(express.json())

//Routes
app.use('/api/v1/tasks', tasks)
// app.get('/api/v1/tasks')  getData
// app.post('/api/v1/tasks') postData
// app.delete('/api/v1/tasks') deleteData
// app.get('/api/v1/tasks/:id) getParticularData
// app.patch('/api/v1/tasks/:id') updataData

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...` )
        })
    } catch (err) {
        console.log(err)
    }
}

start()

