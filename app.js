const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const listRoute = require('./routs');
let listItems = require('./data');
const port = process.env.port || 3000; 

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
app.get('/', function (req, res) { //get all list same as the homePage
    res.render('allList', {listItems})
  })

//defualt if rout is not exist
app.all('*', (req, res) => {
    res.status(404).send('Page Not Found!')
})

app.listen(port, ()=>{
    console.log(`App listening at ${port} port`)
})
