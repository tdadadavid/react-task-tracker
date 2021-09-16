import { useState, useEffect } from 'react'
import { BrowserRouter as Router , Route } from 'react-router-dom'
 import Header from "./components/Header"
 import Footer from './components/Footer';
 import About from './components/About';
 import Tasks from "./components/Tasks";
 import AddTask from "./components/AddTask";
 

function App() {

  const[showAddTask , setShowAddtask] = useState(false)
  const [tasks , setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const  tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
    
  } , [])

  

// Fetch Task
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
  
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
  
    return data;
  }


//Add Task
const addTask = async (task) =>{
  const res = await fetch('http://localhost:5000/tasks' , {
    method: 'POST' ,
    headers: {
      'Content-type': 'application/json',
    },

    body: JSON.stringify(task),
  })

  const data = await res.json()

  setTasks([...tasks , data])
  
}


// Delete Task
const deleteTask = async (id) =>{
  await fetch(`http://localhost:5000/tasks/${id}` , {
    method: 'DELETE'
  })


  setTasks(tasks.filter((task) => task.id !== id))
}

// Toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updatedTask = { ...taskToToggle,
    reminder: !taskToToggle.reminder
  }

  const res = await fetch(`http://localhost:5000/tasks/${id}` , {
    method: 'PUT' ,
    headers: {
      'Content-type': 'application/json',
    },

    body: JSON.stringify(updatedTask),
  })

  const data = await res.json()

  setTasks(
    tasks.map((task) => 
            task.id === id ? 
            {...task, reminder: data.reminder } : task
    )
  )
}


  return (
    <Router>
      <div id="root">
        <div className="container">
          <Header 
              title="Task Tracker" 
              onAdd={() =>setShowAddtask(!showAddTask)} 
              showForm={showAddTask}
          />
          <Route path='/' exact render={(props) => (
            <div>
                {showAddTask && <AddTask onAdd={addTask} />}

                {tasks.length > 0 ? 
                  <Tasks tasks={tasks} 
                      onDelete={deleteTask}
                      onToggle={toggleReminder}
                  /> 
                  : "No task at this time"
                } 
            </div>
            )} 
          />

          <Route path='/about' component={About} />
          <Footer />
        </div>
      </div>
    </Router>    
  )
}

export default App;
