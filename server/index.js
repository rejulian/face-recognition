const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : 'admin',
    database : 'facerecognition'
})

app.get('/',(req,res)=>{
    db.query('SELECT nombre,foto FROM empleado',(err,response)=>{
        if (err) {
            console.error(err);
        }
        res.send(response)
    })
})


app.listen(4000,()=>{
    console.log('server running on port: 4000');
})


