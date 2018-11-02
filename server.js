var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('assets'));

app.get('/', (req, res) => {
	res.render('form');
});

app.use('/auth/google', (req, res, next) => {
    const response = {
        username: req.query.username,
        password: req.query.password
    };

    JSON.stringify(response);
    next();
});

app.get('/auth/google', (req, res) => {
    
    if (req.query.username.length >= 3 && req.query.password.length >= 6) {
        res.render('logged', {
            
            response: {
                username: req.query.username,
            },

            url: 'http://localhost:3000/'
        });
    }

    else {
        res.render('error', {
            url: 'http://localhost:3000/',
        })
    }
});

app.listen(3000);

app.use((req, res, next) => {
	res.status(404).send('Niestety nie mogliśmy znaleźć tego, czego żądasz');
});