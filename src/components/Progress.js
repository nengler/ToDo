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

  dragElement = (event) => {
    let dragObject = {
      initialIndex: this.props.index,
      toDoId: this.props.toDoId,
      progressId: this.props.progress.id,
    };
    event.dataTransfer.setData("text/plain", JSON.stringify(dragObject));
    event.dataTransfer.effectAllowed = "move";
  };

  progressDrag = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  progressDrop = (event) => {
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    if (
      this.props.toDoId === data.toDoId &&
      this.props.index !== data.initialIndex
    ) {
      this.props.changeProgressOrder(
        this.props.toDoId,
        data.initialIndex,
        this.props.index
      );
    }
  };

  render() {
    return (
      <div
        className="progress"
        draggable={true}
        onDragStart={this.dragElement}
        onDragOver={this.progressDrag}
        onDrop={this.progressDrop}
      >
        <button
          className="progress-button delete-button-progress"
          onClick={() =>
            this.props.onDeleteProgress(
              this.props.toDoId,
              this.props.progress.id
            )
          }
        >
          ×
        </button>
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
