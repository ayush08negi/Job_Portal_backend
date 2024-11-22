import express from 'express'

const app = express();
const PORT = 3000;

app.listen(PORT, async(req , res) =>{
    console.log(`Server running at port ${PORT}`);
})

