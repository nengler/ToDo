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
    }));
  };

  addProgress = () => {
    this.setState({ showAddProgressInputs: true });
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
      <div>
        <div className="todo">
          <div className="todo-header">
            <h2>{this.props.todo.name}</h2>
          </div>
          <div className="button-holder">
            <button className="todo-button" onClick={() => this.showProgress()}>
              Progress
            </button>
            <button
              className="todo-button delete-button"
              onClick={() => this.props.onDelete(this.props.todo.id)}
            >
              ×
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
              <form className="new-progress" onSubmit={this.submitProgressForm}>
                <div>
                  <label>Completion Date</label>
                  <DatePicker
                    selected={this.state.progressDate}
                    onChange={this.handleDateChange}
                  />
                </div>
                <div>
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
            )}
            <button onClick={() => this.addProgress()}>Add New Progress</button>
          </div>
        )}
      </div>
    );
  }
}

export default Todo;
