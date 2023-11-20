// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
    const inputDate = req.params.date;

    // Verifica se a entrada é um timestamp
    const isTimestamp = !isNaN(inputDate);

    let date;
    if (isTimestamp) {
        // Se for um timestamp, converte para número e cria um objeto Date
        date = new Date(parseInt(inputDate));
    } else {
        // Se não for um timestamp, tenta criar um objeto Date diretamente
        date = new Date(inputDate);
    }

    // Verifica se a data é válida
    if (isNaN(date.getTime())) {
        res.json({ error: 'Invalid Date' });
    } else {
        res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }
});
app.get("/api/", (req, res) => {
    let date = new Date()
    res.json({unix: date.getTime(), utc: date.toUTCString()})
})

// listen for requests :)
var listener = app.listen('3000', function () {
    console.log("Your app is listening on port " + listener.address().port);
});
