const express    = require('express');
const app        = express();
const path       = require('path');
const exphbs     = require('express-handlebars');
const bodyParser = require('body-parser');

const hashPayment = require('./lib/hashPayment');

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir:path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers:require('./lib/handlebars'),
}));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({ extended:false, }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', hashPayment, (req, res) => {
    const { recipient, amount, nonce, defaultAccount, hash, contractAddress, } = req.body;
    const contentRes = { recipient, amount, nonce, defaultAccount, hash, contractAddress };

    console.log(contentRes);
    res.sender('index2', { contentRes });
});

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});