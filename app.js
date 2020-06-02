const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/app'));
app.set('view engine', 'pug')
const views_path = __dirname + '/app/views/'


users = [{nick:'Jan', lvl:2, img:'../resources/picture.svg', friend:true},
            {nick:'Sześcian', lvl:8, img:'../resources/picture.svg', friend:true}, 
            {nick:'Ośmiościan', lvl:11, img:'../resources/picture.svg', friend:true},
            {nick:'Pjoter', lvl:2, img:'../resources/picture.svg', friend:false},
            {nick:'Osa', lvl:8, img:'../resources/picture.svg', friend:false}]

days = [
  {
    id: "01.06, Poniedzialek",
    tasks: [
      {
        id: "Zadanie Akka",
        status: "SUCCESS",
        hour: "09:00",
        priority: 2
      },
      {
        id: "Zadanie UX",
        status: "SUCCESS",
        hour: "11:30",
        priority: 1
      },
      {
        id: "Projekt inzynierka",
        status: "FAILURE",
        hour: "012:00",
        priority: 1
      },
      {
        id: "Kompilatory lab4",
        status: "PROGRESS",
        hour: "16:00",
        priority: 3
      },
      {
        id: "Silownia",
        status: "PROGRESS",
        hour: "17:00",
        priority: 2
      }
    ]
  }
]

router.get('/planer', function(req,res){
  res.render(path.join(views_path + 'planer'), {})
});

router.get('/znajomi', function(req,res){
  res.render(path.join(views_path + 'znajomi'), {users: users})
});

router.post('/znajomi', function(req,res){
  for(var i=0; i<users.length; i++){
    if(users[i].nick == req.body.nick){
      users[i].friend = true;
      break;
    }
  }
 
  res.render(path.join(views_path + 'znajomi'), {users: users})
});

router.get('/widok_dnia/:dayId', function(req,res){
  const index = parseInt(req.params['dayId']);
  console.log(index);
  res.render(path.join(views_path + 'widok_dnia'), {day: days[index]})
});

router.get('/widok_dnia', function(req,res){
  res.render(path.join(views_path + 'widok_dnia'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
