import React, { Component } from 'react';

// components
import LeftHamburgerMenu from '../components/HamburgerMenu';
import RightTodoContent from '../components/TodoContent';
// styles
import styles from './Dashboard.module.css';

class Dashboard extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    fetch('http://demo9421147.mockable.io/getTodos')
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          todos: data,
        })
      );
  }

  addTodo = (newTodoItem) =>
    this.setState((prevState) => {
      return {
        todos: [
          {
            id: Math.ceil(Math.random() * 100),
            title: newTodoItem,
            completed: false,
            createdOn: new Date(),
            compltedOn: null,
          },
          ...prevState.todos,
        ],
      };
    });

  updateTodo = (itemId, newTodoItem) =>
    this.setState((prevState) => {
      let newTodos = prevState.todos.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            ...newTodoItem,
          };
        }

        return item;
      });
      return {
        todos: newTodos,
      };
    });

  removeTodo = (prevTodoItem) =>
    this.setState((prevState) => {
      return {
        todos: prevState.todos.filter((item) => item.id !== prevTodoItem.id),
      };
    });

  render() {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.leftMenuContainer}>
          <LeftHamburgerMenu />
        </div>
        <div className={styles.rightContentContainer}>
          <RightTodoContent
            todoList={this.state.todos}
            addTodo={this.addTodo}
            updateTodo={this.updateTodo}
            removeTodo={this.removeTodo}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
