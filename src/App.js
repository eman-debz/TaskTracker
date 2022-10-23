import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'




const App = () => {
  const [showAddTask,setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }

    getTasks()
  }, [])// Empty dependecy array
  
  // Fetch Tasks Array
  const fetchTasks = async () =>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task Obj
  const fetchTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task Func
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',
    {method:'POST',
     headers: {
      'Content-type':'application/json',
    },
     body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Delete Task Func 
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id)) // Set State to remove task by id
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToggled = await fetchTask(id)
    const updTask = {...taskToggled, reminder: !taskToggled.reminder }
    
    const res = await fetch(`http://localhost:5000/tasks/${id}`,
    {method: 'PUT',
    headers: {
      'Content-type':'application/json',
    },
     body: JSON.stringify(updTask),
    })

    const data = await res.json()   
    

    setTasks(tasks.map((task) => task.id === id ? 
    {...task, reminder: data.reminder} : // Change state of reminder to opposite of current if id matches param
    task))
  }

  const submitTest = (e) => {
    console.log(e)
  }

  return (
    <Router>
      <div className="container">
          <Header 
            onAdd = {() => setShowAddTask(!showAddTask)}
            showAdd = {showAddTask}
          />
          <Routes>
            <Route path = 'about' element = {<About/>}/>
            <Route index element = {
                <>
                  {showAddTask && <AddTask onAdd={addTask} submitTest = {submitTest}/> }
                  {tasks.length > 0 ? <Tasks tasks = {tasks} 
                  onDelete = {deleteTask} 
                  onToggle = {toggleReminder}/> :
                  <h3>No tasks available</h3>}
                </>
              } 
            />
          </Routes>
          <Footer/>
      </div>
    </Router>
  )
}

export default App