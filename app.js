const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 8080


app.get('/', (req, res) => {
    res.send({ message: "Hello World" })
})

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})