import React, { Component } from 'react';
import styles from './TodoItem.module.css';
import cancelIcon from '../assets/img/cancel-icon.svg';

class TodoItem extends Component {
  state = {
    editing: false,
    isManagingFocus: false,
    updateText: '',
  };

  handleTextChange = (newValue = '') => {
    this.setState({
      updateText: newValue,
    });
  };

  checkForEnterKey = (e) => {
    //Enter Key Pressed
    if (e.keyCode === 13) {
      this.props.handleUpdate(this.props.todoItem, this.state.updateText.trim());
      this.toggleEditing();
    }

    //ESC key -> Cancel
    if (e.keyCode === 27) {
      this.toggleEditing();
    }
  };

  handleCrossClick = (todoItem, e) => {
    // If editing is ON, then cancel editing first
    if (this.state.editing) {
      return this.toggleEditing();
    }
    this.props.handleCancelClick(todoItem, e);
  };

  toggleEditing = () => {
    this.setState(
      (prevState) => ({
        editing: !prevState.editing,
        updateText: prevState.editing ? '' : this.props.todoItem.title,
      }),
      () => {
        if (this.state.editing === true) {
          this.updateTodoBox && this.updateTodoBox.focus();
        }
      }
    );
  };

  render() {
    const { handleDoneToggle, handleCancelClick, todoItem } = this.props;
    return (
      <div
        onDoubleClick={this.toggleEditing}
        className={`${styles.todoItemContainer} ${todoItem.completed ? styles.todoItemContainerComplted : ''}`}
      >
        <div className={styles.doneButtonContainer}>
          <input
            onChange={(e) => handleDoneToggle(todoItem, e.target.checked)}
            className={styles.todoDoneButton}
            type="checkbox"
            name="todoComplted"
            id={`todoComplted-${todoItem.id}`}
          />
        </div>
        {this.state.editing ? (
          <input
            ref={this.updateTodoBox}
            className={styles.todoEditBox}
            type="text"
            value={this.state.updateText}
            onKeyDown={this.checkForEnterKey}
            onChange={(e) => this.handleTextChange(e.target.value)}
            name="updateTodo"
          />
        ) : (
          <span className={styles.todoItemTitle}>{todoItem.title}</span>
        )}

        <div className={styles.cancelButtonContainer}>
          <button onClick={(e) => this.handleCrossClick(todoItem, e)}>
            <img src={cancelIcon} alt="Cancel" className={styles.cancelIcon} />
          </button>
        </div>
      </div>
    );
  }
}
export default TodoItem;
