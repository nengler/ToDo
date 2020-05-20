import React, { Component } from "react";
import Todo from "./Todo";

class ToDoList extends Component {
  state = {
    toDoList: [],
    newTodoName: "",
    id: 0,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { newTodoName, id } = this.state;
    if (newTodoName !== "") {
      let newToDoObject = {
        name: newTodoName,
        id,
        isCompleted: false,
        progress: [],
      };
      this.setState({
        toDoList: this.state.toDoList.concat(newToDoObject),
        newTodoName: "",
        id: id + 1,
      });
    }
  };

  handleDeleteTodo = (todoIdBeingDeleted) => {
    this.setState({
      toDoList: this.state.toDoList.filter(
        (todo) => todo.id !== todoIdBeingDeleted
      ),
    });
  };

  onAddProgressToToDo = (progressObject, todoId) => {
    let toDoList = [...this.state.toDoList];
    for (let i = 0; i < toDoList.length; i++) {
      if (toDoList[i].id === todoId) {
        toDoList[i].progress.push(progressObject);
        this.setState({ toDoList });
        return;
      }
    }
  };

  onChangeProgressStatus = (newProgressStatus, progressId, todoId) => {
    let toDoList = [...this.state.toDoList];
    toDoList.forEach((todo) => {
      if (todo.id === todoId) {
        todo.progress.forEach((progress) => {
          if (progress.id === progressId) {
            progress.isCompleted = !progress.isCompleted;
          }
        });
      }
    });
    this.setState({ toDoList });
  };

  render() {
    return (
      <div className="container">
        <h1 className="header">ToDo List</h1>
        <div className="create-new-todo">
          <h2>Create New ToDo</h2>
          <form onSubmit={this.handleSubmit} className="todo-form">
            <label htmlFor="newTodoName">ToDo Name:</label>
            <input
              name="newTodoName"
              type="text"
              value={this.state.newTodoName}
              onChange={this.handleChange}
            />
            <button className="create-todo-button">Create</button>
          </form>
        </div>
        <div className="show-todo">
          {this.state.toDoList.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              addProgressToTodo={this.onAddProgressToToDo}
              onDelete={this.handleDeleteTodo}
              changeProgressStatus={this.onChangeProgressStatus}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ToDoList;
