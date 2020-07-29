import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import LeftHamburgerMenu from '../components/HamburgerMenu';
import RightTodoContent from '../components/TodoContent';
import About from './About';
// styles
import styles from './Dashboard.module.css';
//redux
import { connect } from 'react-redux';
import { createTodo, appendTodos, deleteTodo, updateTodo, loadTodos, loadTodosByCustomMiddleware } from '../actions';

class Dashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    // custom middleware
    dispatch(loadTodosByCustomMiddleware('http://demo9421147.mockable.io/getTodos'));

    // loadTodos(dispatch, 'http://demo9421147.mockable.io/getTodos');

    // fetch('http://demo9421147.mockable.io/getTodos')
    //   .then((response) => response.json())
    //   .then((data) => dispatch(appendTodos(data)));
  }

  addTodo = (newTodoItem) => {
    const { dispatch } = this.props;
    dispatch(
      createTodo({
        id: Math.ceil(Math.random() * 100),
        title: newTodoItem,
        completed: false,
        createdOn: new Date(),
        compltedOn: null,
      })
    );
  };

  updateTodo = (itemId, newTodoItem) => {
    const { dispatch } = this.props;
    dispatch(updateTodo(newTodoItem));
  };

  removeTodo = (prevTodoItem) => {
    const { dispatch } = this.props;
    dispatch(deleteTodo(prevTodoItem));
  };

  render() {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.leftMenuContainer}>
          <LeftHamburgerMenu />
        </div>
        <div className={styles.rightContentContainer}>
          <Switch>
            <Route exact path="/">
              <RightTodoContent
                todoList={this.props.todos}
                addTodo={this.addTodo}
                updateTodo={this.updateTodo}
                removeTodo={this.removeTodo}
              />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="*">
              <div>
                <img src="https://images.unsplash.com/photo-1532003885409-ed84d334f6cc?w=1200" />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapDispatchToProps)(Dashboard);
