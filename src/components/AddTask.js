import React from 'react'
import { useState } from 'react'


const AddTask = ({onAdd,submitTest}) => {
  const [text,setText] = useState('');
  const [day,setDay] = useState('');
  const [reminder,setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault() // Stop event from searching for a submit page

    if (!text) { //If task empty ...
      alert('Please add a task')
      return
    }
    
    onAdd({text,day,reminder}) //Trigger add func

    //Reset state of all forms
    setText('')
    setDay('')
    setReminder(false)
  }
  
  return (

    <form className='add-form' onSubmit={onSubmit} data-testid='add-task-form'>
      <div className='form-control'>
        <label>Task Name</label>
        <input type = 'text' placeholder='Add Task' data-testid='task-value' value={text} 
          onChange = {(e) => setText(e.target.value)} />
      </div>
      <div className='form-control'>
        <label>Day & Time</label>
        <input type = 'text' placeholder='Add Day & Time' data-testid='day-value'
          value={day} onChange = {(e) => setDay(e.target.value)}/>
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input type = 'checkbox' data-testid='reminder-value' checked={reminder} value={reminder} 
          onChange = {(e) => setReminder(e.currentTarget.checked)}/>
      </div>
      
      <input className='btn btn-block' type='submit' onClick={submitTest} data-testid='task-submit' 
        value='Save Task'/>
    </form>
  )
}

export default AddTask