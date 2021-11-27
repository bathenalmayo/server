//restfull route
const express = require('express');
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
uuidv4();
let listItems = require('./data');
//let listItems = []; // option for empty list


router.route('/list')
    .get(function (req, res) {//get all list same as the homePage
        res.render('allList',{listItems})
      })
    .post(function (req, res) {//create new item
        //destructor req.body to prevent implantation via postman
        try{
        const {name = "item", qty = 1} = req.body; 
        listItems.push({id: uuidv4(), name, qty})
        console.log(listItems);
        res.redirect('/list')
        }catch(e){
          console.log("ERROR IN CREATING NEW ITEM",e)
          res.redirect('/list/new');
        }
      })  

      //form for adding new item 
      //IMPORTANT!! needs to be before /list/:id because it refer /new as req.params  
router.get('/list/new', function (req, res) {
    res.render('createItem')
  })

router.route('/list/:id')
      .get(function (req, res) {//show specific item
        const {id} = req.params;
        const item = listItems.find(i => i.id == id);
        res.render('showItem',{item})
      })
      .patch(function (req, res) {//update item
        try{
        const {id} = req.params;
        const prevItem = listItems.find( i => i.id == id);
        const newItemName = req.body.name ;
        const newItemQty = req.body.qty ;
        prevItem.name = newItemName; ///checking about immutability term!!!
        prevItem.qty = newItemQty;
        res.redirect('/list')
        }catch(e){
          console.log("ERROR IN ITEM UPDATING",e)
          res.redirect('/list/:id');
        }
      })
      .delete(function (req, res) {//delete item
        const {id} = req.params;
        listItems = listItems.filter(i => i.id !== id);
        res.redirect('/list')
      })

      
 //edit item  form
router.get('/list/:id/edit', function (req, res) {
    const {id} = req.params;
    const item = listItems.find( i => i.id == id);
    res.render('editItem',{item})
  })    

module.exports = router;