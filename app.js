const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/app/'));

app.set('view engine', 'pug')
const views_path = __dirname + '/app/views/'


users = [{nick:'Jan3', lvl:2, img:'resources/picture.svg', friend:true},
            {nick:'Piotrek12', lvl:6, img:'resources/picture.svg', friend:true}, 
            {nick:'Łukasz2115', lvl:8, img:'resources/picture.svg', friend:true},
            {nick:'Ośmiościan8', lvl:8, img:'resources/picture.svg', friend:true},
            {nick:'Pietruszk@', lvl:8, img:'resources/picture.svg', friend:true},
            {nick:'Alpaka318', lvl:8, img:'resources/picture.svg', friend:true},
            {nick:'AnnaZaradna', lvl:8, img:'resources/picture.svg', friend:true},
            {nick:'Mirinda', lvl:8, img:'resources/picture.svg', friend:true},
            {nick:'Andrzej', lvl:8, img:'resources/picture.svg', friend:true},
            {nick:'Radekkk', lvl:8, img:'resources/picture.svg', friend:true},
            {nick:'Kas1a', lvl:8, img:'resources/picture.svg', friend:true},
            {nick:'Pjoter213', lvl:2, img:'resources/picture.svg', friend:false},
            {nick:'Osa123456', lvl:8, img:'resources/picture.svg', friend:false},
            {nick:'Lexus13', lvl:2, img:'resources/picture.svg', friend:false},
            {nick:'Arbuz', lvl:8, img:'resources/picture.svg', friend:false},
            {nick:'Pesos21', lvl:2, img:'resources/picture.svg', friend:false},
            {nick:'Maradona', lvl:8, img:'resources/picture.svg', friend:false}]

days = [
  {
    id: "01.06, Poniedzialek",
    ind: 0,
    progress: 0,
    top2:[],
    extra:"",
    tasks: [
      {
        id: "Pobudka",
        status: "FAILURE",
        hour: "07:00",
        priority: 2
      },
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
        hour: "12:00",
        priority: 1
      },
      {
        id: "Obiad",
        status: "FAILURE",
        hour: "14:00",
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
      },
      {
        id: "CS",
        status: "PROGRESS",
        hour: "19:00",
        priority: 1
      },
      {
        id: "Spacer z psem",
        status: "SUCCESS",
        hour: "20:00",
        priority: 2
      },
      {
        id: "Spakowac sie",
        status: "PROGRESS",
        hour: "21:30",
        priority: 2
      },
      {
        id: "Isc spac",
        status: "PROGRESS",
        hour: "23:00",
        priority: 2
      },
      {
        id: "Spac dalej",
        status: "PROGRESS",
        hour: "23:59",
        priority: 3
      },
    ]
  },
  {
    id: "02.06, Wtorek",
    progress: 0,
    ind:1,
    top2:[],
    extra:"",
    tasks: [
      {
        id: "Rozmowa o prace",
        status: "PROGRESS",
        hour: "11:15",
        priority: 2
      },
      {
        id: "ADPTO - projekt",
        status: "SUCCESS",
        hour: "11:45",
        priority: 1
      },
      {
        id: "ML - projekt",
        status: "PROGRESS",
        hour: "18:00",
        priority: 3
      }
    ]
  },

]

prioTasks = {
  1:{
    id: "",
    status: "",
    hour: "",
    date: "",
    priority: 0
  },
  2:{
    id: "",
    status: "",
    hour: "",
    date: "",
    priority: 0
  }};


router.get('/planer', function(req,res){
  days.forEach((day)=>{
    let counter = 0;
    let i =0;
    day.top2=[];
      day.tasks.forEach((task)=>{

        if(task.status === "SUCCESS")counter++;
        if(task.priority > prioTasks["1"].priority){
            prioTasks["2"].id = prioTasks["1"].id;
            prioTasks["2"].status = prioTasks["1"].status;
            prioTasks["2"].hour = prioTasks["1"].hour;
            prioTasks["2"].date = prioTasks["1"].date;
            prioTasks["2"].priority = prioTasks["1"].priority;

            prioTasks["1"].id = task.id;
            prioTasks["1"].status = task.status;
            prioTasks["1"].hour = task.hour;
            prioTasks["1"].date = day.id.split(",")[0];
            prioTasks["1"].priority = task.priority;

          } else if(task.priority > prioTasks["2"].priority && task.id !== prioTasks["1"].id){
            prioTasks["2"].id = task.id;
            prioTasks["2"].status = task.status;
            prioTasks["2"].hour = task.hour;
            prioTasks["2"].date = day.id.split(",")[0];
            prioTasks["2"].priority = task.priority;

          }
        if(i<2)day.top2.push(task);
        i++;
      }
      );
      day.extra = day.tasks.length > 2 ? "...+"+(day.tasks.length-2):"";
      day.progress = parseInt((counter/(day.tasks.length)*100));

  });
  res.render(path.join(views_path + 'planer'), {tasks: prioTasks})
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
  res.render(path.join(views_path + 'widok_dnia'), {day: days[index], dayIndex: index})
});

router.get('/widok_dnia', function(req,res){
  res.render(path.join(views_path + 'widok_dnia'));
});

router.delete('/widok_dnia/:dayId/:taskId', function(req, res) {
  const dayId = req.params['dayId'];
  const taskId = req.params['taskId'];

  console.log(dayId);
  console.log(taskId);

  const thisDay = days.filter(day => day.id === dayId)[0];
  thisDay.tasks = thisDay.tasks.filter(t => t.id !== taskId);
});

router.put('/widok_dnia/:dayId/:taskId', function(req, res) {
  const dayId = req.params['dayId'];
  const taskId = req.params['taskId'];

  console.log(dayId);
  console.log(taskId);

  const thisDay = days.filter(day => day.id === dayId)[0];
  const thisTask = thisDay.tasks.filter(t => t.id === taskId)[0];
  console.log(thisTask);
  thisTask.status = 'SUCCESS';
  console.log(thisTask);
});

router.get('/zadanie/:dayId/:taskId', function(req,res){
  const dayIndex = parseInt(req.params['dayId']);
  const taskIndex = parseInt(req.params['taskId']);

  res.render(path.join(views_path + 'zadanie'), {users: users, task: days[dayIndex].tasks[taskIndex]})
});

router.get('/zadanie', function(req,res){
  var d = new Date();
  var task = {
    id: "",
    status: "PROGRESS",
    hour: `${d.getHours()}:${d.getMinutes()}`,
    priority: 1
  };
  res.render(path.join(views_path + 'zadanie'), {users: users, task: task})
});

router.post('/zadanie/:dayId/:taskId', function(req,res){
  // TODO: ADD/EDIT TASK
  const dayId = req.params['dayId'];
  const taskId = req.params['taskId'];

  console.log(req.body)
  days[dayId].tasks[taskId] = req.body;

  res.redirect(`/widok_dnia/${dayId}`)
});

router.get('/', function(req,res){
  res.redirect('/planer')
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
