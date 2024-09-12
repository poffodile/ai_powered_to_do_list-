const express = require('express');
const cors = require('cors');
const app = express();

//enables cors for all routes 
app.use(cors());

// middleware to parse JSON data
 app.use(express.json());

 // Sample data
let tasks = [
  { id: 1, name: 'Learn Node.js', completed: false },
  { id: 2, name: 'Build a React app', completed: true }
];

//  API  GET endpoint to get tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});
// API POST endpoint to add a new task
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id : tasks.length +1, // sample id generation for now 
    name : req.body.name, // task name frommthe request body 
    completed : false     // thus make new tasks incomplete by default 
  };
  tasks.push(newTask);   // adda a new task to the list 
  res.status(201).json(newTask); // return/ respond with  the new task with status code 201
});

 


// route to update PUT  tasks i.e to mark a task as completed  (PUT request)
app.put('/api/tasks/:id', (req, res)=>{
  const taskId=parseInt(req.params.id); // get the task id from the URL / request parameters
  const task = tasks.find(t =>t.id === taskId); // find the task by id
   if (task) {
    task.name =req.body.name || task.name; // update the task's name
    task.completed = req.body.completed!== undefined? 
    req.body.completed:task.completed;  // only update completed  task's completed status, if provided 
    res.json(task); // respond with the updated task
   }
   else {
    res.status(404).send('Task not found'); // if task not found, return 404
   }

});
// route to DELETE a task
 app.delete('/api/tasks/:id', (req,res)=> {
    const taskid = parseInt(req.params.id); // get the task id from the URL / request parameters
    tasks = tasks.filter(t=>t.id !==taskid); // filter out the task with the given id /remove the task
    res. status (204).send(); // respond with no content and status code 204
 });

// Set the port to 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
