import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import Tasks from './components/Tasks'

import {
  MainContainer,
  TaskInputContainer,
  TaskDisplayContainer,
  Heading,
  InputContainer,
  LabelText,
  Input,
  Select,
  AddButton,
  TagsHeading,
  TagsContainer,
  TagsButton,
  TagsListItem,
  NoTaskText,
  TasksContainer,
} from './style'

import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    myTaskList: [],
    inputTask: '',
    selectTag: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  onClickAddButton = () => {
    const {inputTask, selectTag} = this.state
    const taskName = inputTask
    const taskCategory = selectTag
    const bgColor = false
    const id = uuid()
    if (taskName.length !== 0) {
      this.setState(pre => ({
        myTaskList: [...pre.myTaskList, {id, taskName, taskCategory, bgColor}],
        inputTask: '',
        selectTag: tagsList[0].optionId,
      }))
    }
  }

  onChangeInputTask = event => {
    this.setState({inputTask: event.target.value})
  }

  onChangeSelectTag = event => {
    this.setState({selectTag: event.target.value})
  }

  onClickTag = event => {
    this.setState(pre => ({
      activeTag:
        pre.activeTag === event.target.value ? 'INITIAL' : event.target.value,
    }))
  }

  render() {
    const {myTaskList, inputTask, selectTag, activeTag} = this.state
    const filterTasksList =
      activeTag === 'INITIAL'
        ? myTaskList
        : myTaskList.filter(each => each.taskCategory === activeTag)
    return (
      <MainContainer>
        <TaskInputContainer>
          <Heading>Create a Task!</Heading>
          <InputContainer>
            <LabelText for="textInput">Task</LabelText>
            <Input
              id="textInput"
              type="text"
              placeholder="Enter task here"
              value={inputTask}
              onChange={this.onChangeInputTask}
            />
            <LabelText for="optionalInput">Tags</LabelText>
            <Select
              id="optionInput"
              value={selectTag}
              onChange={this.onChangeSelectTag}
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </Select>
          </InputContainer>
          <AddButton type="button" onClick={this.onClickAddButton}>
            Add Task
          </AddButton>
        </TaskInputContainer>
        <TaskDisplayContainer>
          <TagsHeading>Tags</TagsHeading>
          <TagsContainer>
            {tagsList.map(each => {
              const isActive = activeTag === each.optionId
              return (
                <TagsListItem key={each.optionId}>
                  <TagsButton
                    type="button"
                    value={each.optionId}
                    onClick={this.onClickTag}
                    isActive={isActive}
                  >
                    {each.displayText}
                  </TagsButton>
                </TagsListItem>
              )
            })}
          </TagsContainer>
          <TagsHeading>Tasks</TagsHeading>
          <TasksContainer>
            {filterTasksList.length === 0 ? (
              <NoTaskText>No Task Added Yet</NoTaskText>
            ) : (
              filterTasksList.map(each => (
                <Tasks key={each.id} taskDetails={each} />
              ))
            )}
          </TasksContainer>
        </TaskDisplayContainer>
      </MainContainer>
    )
  }
}

export default App
