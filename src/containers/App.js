import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoList from '../containers/TodoList';
import TodoForm from '../components/TodoForm';
import Header from '../components/Header';
import Login from '../components/Login';
import { connect } from 'react-redux';
import { createTodo } from '../actions/createActions';
import { Route, Link } from 'react-router-dom';
import { Col, Grid, Row } from 'react-bootstrap'
import { startState } from '../actions/readActions';

const main ={


}

class App extends Component {
	
	componentDidMount() {
		this.props.startApp();
	}

	render() {
		return (
			<Grid>
				<Row>
					<Header/>		
				</Row>
				
				<Row>
				
					<Col className="App">
						<Route path = '/login' component = { Login } />
						<Route 
							exact path = '/' 
							render = { () => 
								<Row>
									<TodoForm createTodo = { this.props.createTodo } />
									<TodoList todoArray = { this.props.todoArray } />
								</Row>
							} 
						/> 
					</Col>
				</Row>
			</Grid>
		);
	}
} 

App.propTypes = { 
	createTodo:    PropTypes.func.isRequired,
	todoArray: 	PropTypes.array.isRequired
};

App.defaultProps = {
	createTodo: f => f,
	todoArray: [ ]
};

const mapStateToProps = (state) => {
	return {
		todoArray: state.todos
	};
}; 

const mapDispatchToProps = (dispatch) => {
	return {
		createTodo: (task) => { dispatch (createTodo (task)); },
		startApp: () => { dispatch(startState()); }
	};
}; 

export default connect(mapStateToProps, mapDispatchToProps)(App);
