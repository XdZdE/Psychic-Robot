const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(morgan('short'))
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: false}))
// ------------------------------------------------------------------------------------------------------------------------------------------------ //

const connection =  mysql.createConnection({
        host: 'remotemysql.com',
        user: 'REPLACE THIS',
        password: 'REPLACE THIS',
        database: 'REPLACE THIS'
    })

app.get("/users/:username", (request, response) => {
    const queryString = "SELECT * FROM users WHERE username = ?"
    connection.query(queryString, [request.params.username], (error, rows, fields) => {
        if (error) {
            console.log("Failed to query for user! " + error)
            response.sendStatus(500)
            response.end()
            return
        }
        response.json(rows)
    })
})
