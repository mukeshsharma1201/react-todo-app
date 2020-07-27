import React, { Component } from 'react';
import styles from './TodoContent.module.css';
import TodoItem from './TodoItem';

const FilterChip = ({ chipItem, onFilterClick }) => {
  return (
    <div onClick={onFilterClick} className={`${styles.filterChip} ${chipItem.active ? styles.filterChipActive : ''}`}>
      {chipItem.title}
    </div>
  );
};

class TodoContent extends Component {
  state = {
    addTodoValue: '',
    searchTodoValue: '',
    filterOptions: [
      {
        title: 'All',
        active: true,
      },
      {
        title: 'Active',
        active: false,
      },
      {
        title: 'Completed',
        active: false,
      },
    ],
  };

  handleFilerChange(chipItem) {
    if (!chipItem || chipItem.active) {
      return;
    }

    if (chipItem.active === false) {
      this.setState((prevState) => ({
        filterOptions: prevState.filterOptions.map((prevItem) => {
          if (prevItem.title === chipItem.title) {
            prevItem['active'] = true;
          } else {
            prevItem['active'] = false;
          }
          return prevItem;
        }),
      }));
    }
  }

  handleDoneToggle = (todoItem, isChecked) => {
    this.props.updateTodo(todoItem.id, {
      ...todoItem,
      completed: isChecked,
    });
  };

  handleTodoItemUpdate = (todoItem, updatedTitle) => {
    this.props.updateTodo(todoItem.id, {
      ...todoItem,
      title: updatedTitle,
    });
  };

  handleEditClick = (todoItem, e) => {
    console.log(todoItem);
  };

  handleCancelClick = (todoItem, e) => {
    this.props.removeTodo(todoItem);
  };

  checkForEnterKey = (e) => {
    //Enter Key Pressed
    if (e.keyCode === 13) this.addTodo();
  };

  handleTodoInputChange(newValue = '') {
    this.setState({
      addTodoValue: newValue,
    });
  }

  handleSearchInputChange(searchTerm = '') {
    this.setState({
      searchTodoValue: searchTerm,
    });
  }

  addTodo = () => {
    let todoItem = this.state.addTodoValue;
    if (todoItem.trim().length > 0) {
      this.props.addTodo(todoItem.trim());
      this.setState({
        addTodoValue: '',
      });
    }
  };

  getFilteredItems() {
    if (!this.props.todoList) {
      return [];
    }

    let filteredList = [];
    let activeFilter = this.state.filterOptions.filter((filterItem) => filterItem.active)[0];

    if (activeFilter.title.toLowerCase() === 'all') {
      filteredList = this.props.todoList;
    }

    if (activeFilter.title.toLowerCase() === 'active') {
      filteredList = this.props.todoList.filter((todoItem) => !todoItem.completed);
    }

    if (activeFilter.title.toLowerCase() === 'completed') {
      filteredList = this.props.todoList.filter((todoItem) => todoItem.completed);
    }

    if (this.state.searchTodoValue) {
      let searchTerm = this.state.searchTodoValue.trim().toLowerCase();
      filteredList = filteredList.filter((todoItem) => todoItem.title.toLowerCase().includes(searchTerm));
    }

    return filteredList;
  }

  render() {
    let sendButtonClasses = styles.todoInputSendButton;
    if (this.state.addTodoValue.trim().length === 0) {
      sendButtonClasses += ' ' + styles.todoInputSendButtonHidden;
    }
    return (
      <div className={styles.container}>
        <div className={styles.searchBoxContainer}>
          <div className={styles.searchInputBoxContainer}>
            <input
              className={`${styles.todoInputBox} ${styles.searchInputBox}`}
              placeholder="Search your Todos"
              autoComplete="off"
              value={this.state.searchTodoValue}
              onChange={(e) => this.handleSearchInputChange(e.target.value)}
              type="search"
              name="searchTodo"
              id="searchTodo"
            />
          </div>
        </div>
        <div className={styles.addTodoContainer}>
          <div className={styles.todoInputBoxContainer}>
            <input
              className={styles.todoInputBox}
              placeholder="What to do?"
              autoComplete="off"
              value={this.state.addTodoValue}
              onKeyDown={this.checkForEnterKey}
              onChange={(e) => this.handleTodoInputChange(e.target.value)}
              type="text"
              name="addTodo"
              id="addTodo"
            />
            <div onClick={this.addTodo} className={sendButtonClasses}>
              Send
            </div>
          </div>
          <div className={styles.filterContainer}>
            {this.state.filterOptions.map((chipItem, index) => (
              <FilterChip
                chipItem={chipItem}
                key={index}
                onFilterClick={() => {
                  this.handleFilerChange(chipItem);
                }}
              />
            ))}
          </div>
          <div className={styles.todoItemsListContainer}>
            {this.getFilteredItems().map((item, index) => (
              <TodoItem
                handleUpdate={this.handleTodoItemUpdate}
                handleEditDbClick={this.handleEditClick}
                handleDoneToggle={this.handleDoneToggle}
                handleCancelClick={this.handleCancelClick}
                todoItem={item}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TodoContent;
