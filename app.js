const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();


app.use(express.static(__dirname + '/app'));

const views_path = __dirname + '/app/views/'

router.get('/planer',function(req,res){
  res.sendFile(path.join(views_path + 'planer.html'));
});

router.get('/znajomi',function(req,res){
  res.sendFile(path.join(views_path + 'znajomi.html'));
});

router.get('/widok_dnia',function(req,res){
  res.sendFile(path.join(views_path + 'widok_dnia.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');