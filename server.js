const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engire with custom helpers
const hbs = exphbs.create({ helpers });

// Sets up session and connect to our Sequelize db
const sess = {
    secret: 'Super secret secret',
    cookie: {
        // cookie (and session) will expire after one hour
        maxAge: 60 * 60 * 1000,
        // only store session cookies when the protocol being used to connect to the server is HTTP
        httpOnly: true,
        // only initialize session cookies when the protocol being used is HTTPS
        secure: false,
        // only initialize session cookies when the referrer provided by the client matches the domain our server is hosted from
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    // Set up session store
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
});