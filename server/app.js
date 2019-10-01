// indlæs express
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// knyt morgan til som logger
const logger = require('morgan');
app.use(logger('dev'));

// sæt view-engine op til at benytte ejs
app.set('view engine', 'ejs'); // definer template engine
app.set('views', './server/views'); // definerer hvor ejs filerne er placeret
app.engine('ejs', require('express-ejs-extend')); // tillad extends i ejs templates

// konfigurer bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//directory for routes filerne
let directories = ['routes'];

directories.forEach(directory => {
    fs.readdirSync(path.join(__dirname, directory)).forEach(file => {
        require(path.join(__dirname, directory, file))(app);
    });
});

//express
app.use(express.static('public'));

// start serveren på port 3000
const port = 3001;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('App is listening on http://localhost:' + port);
});