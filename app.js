const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();


app.use(express.static(__dirname + '/app'));
app.set('view engine', 'pug')


friends = [{nick:'Jan', lvl:2, img:'../resources/picture.svg'},
           {nick:'Sześcian', lvl:8, img:'../resources/picture.svg'}, 
           {nick:'Ośmiościan', lvl:11, img:'../resources/picture.svg'}]

const views_path = __dirname + '/app/views/'

router.get('/planer',function(req,res){
  res.render(path.join(views_path + 'planer'), {})
});

router.get('/znajomi',function(req,res){
  res.render(path.join(views_path + 'znajomi'), { friends: friends})
});

router.get('/widok_dnia',function(req,res){
  res.render(path.join(views_path + 'widok_dnia'), {})
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');