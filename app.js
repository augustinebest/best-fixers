var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

//cors {Cross Origin Request}
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,DELETE,PATCH,POST,GET');
        return res.status(200).json({});;
    }
    next();
});

// Routes
const UserRoutes = require('./routes/User');
const ArtisanRoutes = require('./routes/Artisan');
const AdminRoutes = require('./routes/Admin');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/client'));
app.use(morgan('dev'));


//connecting to mongoose
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/Artisan', { useNewUrlParser: true })

// Connection to mlab
mongoose.connect('mongodb://thefixers:thefixers1@ds043170.mlab.com:43170/thefixers', { useNewUrlParser: true })

//route for homepage
app.get('/', (req, res) => {
    res.json('hello world!');
});

app.use('/user', UserRoutes);
app.use('/artisan', ArtisanRoutes);
app.use('/admin', AdminRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

const port = process.env.PORT || 9000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});