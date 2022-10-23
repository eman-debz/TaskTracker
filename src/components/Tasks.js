import Task from "./Task"



const Tasks = ({tasks, onDelete, onToggle}) => {
	
  return (
  	<>
    	{tasks.map((task, index) => ( //Map eaxh List item to task component and pass in props
				<Task 
				key = {index} 
				task = {task}  
				onDelete={onDelete}
				onToggle = {onToggle}/>
    	))}
    </>
  )
}

export default Tasks