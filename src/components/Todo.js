import React, { Component } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showProgress = () => {
    console.log("clicked");
  };

  render() {
    return (
      <div className="todo">
        <div className="todo-header">
          <h2>{this.props.todo.name}</h2>
        </div>
        <div className="delete-button-holder">
          <button
            className="delete-button"
            onClick={() => this.props.onDelete(this.props.todo.id)}
          >
            ×
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;
