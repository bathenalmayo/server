const express = require('express');
const router = express.Router()
let listItems = require('./data');
//let listItems = []; // option for empty list
const mongoose  = require('mongoose');
const Item = require('./model');

//INSERT DATA FROM HARDCODED ARRAY
// Item.insertMany(listItems)
// .then((res) => {
//   console.log(res);

// }).catch((err) => {
//   console.log(err);
// });


router.route('/list')
    .get( async (req, res) => {
      const list =  await Item.find({}); 
      res.render('allList',{list})
      })
    .post(async (req, res) => {
        //destructor req.body to prevent implantation via postman
        try{ 
        const newItem = new Item(req.body);
        await newItem.save();
        console.log(newItem);
        res.redirect('/list');
        }catch(e){
          console.log("ERROR IN CREATING NEW ITEM",e);
          res.redirect('/list/new');
        }
      })  

      //form for adding new item 
      //IMPORTANT!! needs to be before /list/:id because it refer /new as req.params  
router.get('/list/new', function (req, res) {
    res.render('createItem')
  })

router.route('/list/:id')
      .get( async(req, res)=> {
        const {id} = req.params;
        const item = await Item.findById(id);
        res.render('showItem',{item})
      })
      .patch(async (req, res)=> {
        try{
        const {id} = req.params;
        const item = await Item.findByIdAndUpdate(id, req.body);
        res.redirect('/list')
        }catch(e){
          console.log("ERROR IN ITEM UPDATING",e)
          res.redirect('/list/:id');
        }
      })
      .delete(async (req, res)=> {
        const {id} = req.params;
        const item = await Item.findByIdAndDelete(id);
        res.redirect('/list')
      })

router.get('/list/:id/edit', async (req, res)=> {
    const {id} = req.params;
    const item = await Item.findById(id);
    res.render('editItem',{item})
  })    

module.exports = router;