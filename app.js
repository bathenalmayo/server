require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const { MongoClient } = require('mongodb');
const mongoose  = require('mongoose');
const Item = require('./model');
const listRoute = require('./routs');
const port = process.env.port || 3000; 
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/serverTest'; 

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log(`Database connected`);
});


//executing express
const app = express();

//set the view engine to be ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//path for public directory
app.use(express.static(path.join(__dirname, 'public')))

//a middelware for parsing req.body
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

//for form methods such as PUT, DELETE, PATCH
app.use(methodOverride('_method'))

app.use('/', listRoute);

//cant give up this line(homePage/index.ejs),has duplicat route to 'allList'
app.get('/', async (req, res) => { //get all list same as the homePage
    const list = await Item.find({}); 
    res.render('allList', {list})
  })

//defualt if rout is not exist
app.all('*', (req, res) => {
    res.status(404).send('Page Not Found!')
})

app.listen(port, ()=>{
    console.log(`App listening at ${port} port`)
})
