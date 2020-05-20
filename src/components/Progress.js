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
        {this.props.progress.isCompleted ? (
          <button
            onClick={() =>
              this.props.changeProgressStatus(
                true,
                this.props.progress.id,
                this.props.toDoId
              )
            }
            className="progress-button completed"
          >
            &#10004;
          </button>
        ) : (
          <button
            onClick={() =>
              this.props.changeProgressStatus(
                true,
                this.props.progress.id,
                this.props.toDoId
              )
            }
            className="progress-button not-completed"
          >
            ×
          </button>
        )}
        <span>{this.props.progress.goal}</span>
        <span>{this.formatDate()}</span>
      </div>
    );
  }
}

export default Progress;
