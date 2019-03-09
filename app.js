require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
var sqlite3 = require('sqlite3').verbose();
var Pusher = require('pusher');

var db = new sqlite3.Database('./app.db', sqlite3.OPEN_READWRITE);

db.run("CREATE TABLE IF NOT EXISTS subscriptions (email VARCHAR(90), name VARCHAR(90))")

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true
});

app.get('/', (req, res) => res.status(200).send({msg: "Count down server!"}))

app.get('/userCount', (req, res) => {
    db.each(`SELECT count(*) AS userCount FROM subscriptions`, (err, row) => {
        res.status(201).send({userCount: row.userCount, targetCount: 5}) 
    });
})

app.post('/addUser',  (req, res) => {
    const email = req.body.email;
    const name = req.body.name;

    db.run(`INSERT INTO subscriptions (name, email) values ('${name}', '${email}')`)
    
    db.serialize(function() {
        db.each(`SELECT count(*) AS userCount FROM subscriptions`, (err, row) => {
            res.status(201).send({userCount: row.userCount}) 
        });
    });
})

app.post('/pusher/trigger', (req, res) => {
    const channel_name = req.body.channel_name;
    const event_name = req.body.event_name;
    const data = req.body.data;
 
    pusher.trigger(channel_name, event_name, data);
    
    res.status(200).send(data)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))