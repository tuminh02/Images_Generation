const PORT = 8000;
const express = require('express');
const cors = require('cors');
const OpenAIApi = require('openai');

const openai = new OpenAIApi({
    apiKey:'API key',
});

const app = express();
app.use(cors('https://localhost:8000/images'));
app.use(express.json());
require('dotenv').config();

app.post('/images', async(req,res)=>{
    try {
        const response = await openai.images.generate({
            prompt: req.body.message,
            n:5,
            size: "256x256"
        })
        res.send(response.data);
        console.log(response.data);
    }
    catch (err) {
        console.error(err);
    }
})

app.listen(PORT,()=>console.log('listening on port '+PORT));
