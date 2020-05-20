import React, { Component } from "react";

class Progress extends Component {
  state = {};

  formatDate = () => {
    const dateObject = new Date(this.props.progress.date);
    return (
      dateObject.getMonth() +
      1 +
      "/" +
      dateObject.getDay() +
      "/" +
      dateObject.getFullYear()
    );
  };

  render() {
    return (
      <div className="progress">
        <button
          onClick={() =>
            this.props.changeProgressStatus(
              this.props.progress.id,
              this.props.toDoId
            )
          }
          className="status-button progress-button"
        >
          {this.props.progress.isCompleted ? (
            <span>&#10004; </span>
          ) : (
            <span>×</span>
          )}
        </button>

        <span>{this.props.progress.goal}</span>
        <span>{this.formatDate()}</span>
      </div>
    );
  }
}

export default Progress;
