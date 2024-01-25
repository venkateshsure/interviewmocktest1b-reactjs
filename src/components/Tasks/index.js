import {TaskName, TaskCategory, ListItem} from './style'

const Tasks = props => {
  const {taskDetails} = props
  const {taskName, taskCategory} = taskDetails
  return (
    <ListItem>
      <TaskName>{taskName}</TaskName>
      <TaskCategory>{taskCategory}</TaskCategory>
    </ListItem>
  )
}

export default Tasks
