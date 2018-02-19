import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from '../assets/logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import TodoList from '../containers/TodoList';
import TodoForm from '../components/TodoForm';
import { addTodo } from '../actions/todoActions';

class App extends Component {

	render() {
		return (
			<div className="App">
	
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">
						React/Redux Todo (LocalStorage)
					</h1>
				</header>
				
				<p> Todays Date: { new Date().toDateString() } </p>
				
				<TodoForm addTodo = { this.props.addTodo } />

				<TodoList todoArray=  { this.props.todoArray } />

			</div>
		);
	}
} 

// ========= Props ========= 

App.propTypes = { 
	addTodo:    PropTypes.func.isRequired,
	todoArray: 	PropTypes.array.isRequired
};

App.defaultProps ={
	addTodo: f=>f,
	todoArray: []
};

// ========= Store  ========= 

const mapStateToProps = (state) => {
	return {
		todoArray: state.todos
	};
}; 

const mapDispatchToProps = (dispatch) => {
	return {
		addTodo: (task) => { dispatch(addTodo(task)); }
	};
}; 

export default connect(mapStateToProps, mapDispatchToProps)(App);
