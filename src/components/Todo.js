import React, { Component } from "react";
import Progress from "./Progress";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,
      showAddProgressInputs: false,
      progressDate: new Date(),
      progressGoal: "",
      progressId: 0,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = (progressDate) => {
    this.setState({ progressDate });
  };

  showProgress = () => {
    this.setState((prevProps) => ({
      showProgress: !prevProps.showProgress,
      showAddProgressInputs: false,
      progressGoal: "",
      progressDate: new Date(),
    }));
  };

  changeProgressState = () => {
    this.setState((prevProps) => ({
      showAddProgressInputs: !prevProps.showAddProgressInputs,
      progressGoal: "",
      progressDate: new Date(),
    }));
  };

  submitProgressForm = (event) => {
    event.preventDefault();
    let { progressGoal, progressDate, progressId } = this.state;
    if (progressGoal !== "") {
      let newProgressObject = {
        goal: progressGoal,
        date: progressDate,
        id: progressId,
        isCompleted: false,
      };
      this.props.addProgressToTodo(newProgressObject, this.props.todo.id);
    }
    this.setState({
      progressId: progressId + 1,
      showAddProgressInputs: false,
      progressGoal: "",
    });
  };

  render() {
    return (
      <div className="todo-and-progress">
        <div className="todo">
          <button
            className="todo-button delete-button"
            onClick={() => this.props.onDelete(this.props.todo.id)}
          >
            ×
          </button>
          <button
            onClick={() => this.props.changeTodoStatus(this.props.todo.id)}
            className="status-button todo-button"
          >
            {this.props.todo.isCompleted ? (
              <span>&#10004; </span>
            ) : (
              <span>×</span>
            )}
          </button>
          <div className="todo-header">
            <h2>{this.props.todo.name}</h2>
          </div>
          <div className="button-holder">
            <button
              className="todo-button first-button"
              onClick={() => this.showProgress()}
            >
              Progress
            </button>
          </div>
        </div>

        {this.state.showProgress && (
          <div className="progress-holder">
            {this.props.todo.progress.map((p) => (
              <Progress
                key={p.id}
                changeProgressStatus={this.props.changeProgressStatus}
                toDoId={this.props.todo.id}
                progress={p}
              />
            ))}
            {this.state.showAddProgressInputs && (
              <div>
                <form
                  className="new-progress"
                  onSubmit={this.submitProgressForm}
                >
                  <div className="form-div">
                    <label>Completion Date</label>
                    <DatePicker
                      selected={this.state.progressDate}
                      onChange={this.handleDateChange}
                    />
                  </div>
                  <div className="form-div">
                    <label>Goal</label>
                    <input
                      type="text"
                      name="progressGoal"
                      value={this.state.progressGoal}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button>Submit</button>
                </form>
                <button onClick={() => this.changeProgressState()}>
                  Cancel
                </button>
              </div>
            )}
            {!this.state.showAddProgressInputs && (
              <button onClick={() => this.changeProgressState()}>
                Add New Progress
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Todo;
