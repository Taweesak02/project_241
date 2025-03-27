const express = require('express');
const bodyparset = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');

const port = 8000; 

app.use(bodyparset.json())
app.use(cors())

let conn = null
const initMySQL = async () => {
    conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'webdb',
      port: 8820
    })
}

app.get('/Orders', async (req, res) => {
    const results = await conn.query('SELECT * FROM Orders')
    res.json(results[0])
  })

app.listen(port, async (req, res) => {
    await initMySQL()
    console.log(`Http Server is running on port ${port}`)
})