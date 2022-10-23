import { fireEvent, render, screen } from "@testing-library/react";
import App from './App';
import Header from './components/Header';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom'
import AddTask from "./components/AddTask";


test('Render Task Tracker Header correctly', () => {
  render(<App/>);
  const h1Element = screen.getByText('Task Tracker');
  expect(h1Element).toBeInTheDocument();
})

test('Render Task Tracker title as the Header', () => {
  render(
  <BrowserRouter>
    <Header/>
  </BrowserRouter>
  );
  const headerEl = screen.getByTestId('header-title');
  expect(headerEl).toHaveTextContent('Task Tracker');
})

test('Header button text is Add Task', () => {
  render(
  <BrowserRouter>
    <Header/>
  </BrowserRouter>
  );
  const headerBtn = screen.getByTestId('header-button');
  expect(headerBtn).toHaveTextContent('Add Task');
})

test('Button registers click event', () => {
  render(<App/>);
  const headerBtn = screen.getByTestId('header-button')
  fireEvent.click(headerBtn)
  const form = screen.getByTestId('add-task-form')
  expect(form).toBeVisible();
})

test('Value of the task input field is correct',() => {
  render(<AddTask/>);
  const taskInputValue = screen.getByTestId('task-value')
  fireEvent.change(taskInputValue,{
    target : {
       value : 'Create Test for Project'
    }
  })

  expect(taskInputValue).toHaveValue('Create Test for Project')
})

test('Value of the day input field is correct',() => {
  render(<AddTask/>);
  const dayInputValue = screen.getByTestId('day-value')
  fireEvent.change(dayInputValue,{
    target : {
       value : 'Monday 3rd October'
    }
  })

  expect(dayInputValue).toHaveValue('Monday 3rd October')

})

test('Value of reminder checkbox is correct',() => {
  render(<AddTask/>);
  const reminderInputValue = screen.getByTestId('day-value')
  fireEvent.change(reminderInputValue,{
    target : {
       checked : false
    }
  })
expect(reminderInputValue).not.toBeChecked()
})

test('On click create alert for empty',() => {
  render(<AddTask/>);
  const alertMock = jest.spyOn(window,'alert').mockImplementation() 
  const submitBtn = screen.getByTestId('task-submit')

  fireEvent.click(submitBtn)

  expect(alertMock).toBeCalledTimes(1);

})

test('On submission, trigger submit handler',() => {
  const submitTest = jest.fn();
  render(<AddTask submitTest={submitTest}/>);
  
  const taskInput = screen.getByTestId('task-value')
  const dayInput = screen.getByTestId('day-value')
  const reminderInput = screen.getByTestId('reminder-value')
  const submitBtn = screen.getByTestId('task-submit')
  
  const form = screen.getByTestId('add-task-form')

  fireEvent.change(taskInput, {
    target : {
     value: 'Go to the shop'
    }
  })
  fireEvent.change(dayInput, {
    target : {
      value: 'Tuesday 5th December'
    }
  })
  fireEvent.change(reminderInput,{
    target : {
       checked : true
  }
  })
 
fireEvent.click(submitBtn)

expect(submitTest).toHaveBeenCalled()

})