const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 8080
const routes = require('./routes/api.js')

app.use(bodyParser.json())

app.use("/api", routes)

app.get('/', (req, res) => {
    res.send({ message: "Hello World" })
})

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})