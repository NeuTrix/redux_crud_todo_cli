//  vendor
import React, { Component } from 'react';
import shortid from 'shortid';
// custom
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

// +++++++++ CSS +++++++++ 

const style = {
	display: 'grid',
	gridTemplateAreas: `"todoItems"`,
	gridTemplateColumns: '1fr',
	gridTemplateRows: 'auto',
	gridRowGap: 20,
}

// +++++++++ COMPONENT  +++++++++ 

class TodoList extends Component {
	
	constructor (props) {
		super(props);
		this.state = { 
			todoArray: this.props.todoArray			
		};
	}

	componentWillReceiveProps (newProps) {
		this.setState({ todoArray: newProps.todoArray });
	}

	render() {
		let _todoArray = this.state.todoArray; 
		
		let todos = _todoArray.map (item => {
			return <TodoItem 
				key = { shortid.generate() } 
				item = { item } 
				deleteTodo = { this.props.deleteTodo }
				editTodo = { this.props.editTodo }
			/>;
		});

		return (
			<div className = 'TodoList' style = { style } >
					{ todos.reverse() } 
			</div>
		);
	}
} 

// +++++++++ PROPS +++++++++ 

TodoList.propTypes = {
	todoArray: PropTypes.array.isRequired,
	deleteTodo: PropTypes.func.isRequired,
	editTodo: PropTypes.func.isRequired,
};

TodoList.defaultProps = { 
	todoArray: [],
	deleteTodo: f => alert('default function.  check component props'),
	editTodo: f => alert('default function.  check component props'),
};

export default TodoList;