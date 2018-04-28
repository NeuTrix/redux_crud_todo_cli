// ... Component to create new Todo items
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import normalizeDate from '../helpers/normalizeDate';

// +++++++++ CSS  +++++++++ 

const gridStyle = {
	display: 'grid',
	gridTemplateAreas: 
	` "task task task " 
		" priority date action" ` ,
	gridTemplateColumn: '30px 30px 30px',
	gridTemplateRow: 50,
	gridGap: 5,

	borderColor: 'steelblue',
	padding: 5,
}

const style = {
	task: { gridArea: 'task', paddingLeft: '1em', },
	action: { 
		gridArea: 'action', 
		backgroundColor: 'palegreen', 
		border: '1px solid darkgreen' ,
		color: 'darkgreen',
		opacity: .5,
	},

	priority: { 
		gridArea: 'priority' ,
		backgroundColor: 'aliceblue', 
		border: '1px solid steelblue' ,
		color: 'steelblue',
		opacity: .8,
	},

	date: { 
		gridArea: 'date' ,
		backgroundColor: 'aliceblue', 
		border: '1px solid steelblue' ,
		color: 'steelblue',
		opacity: .8,
	},
}

// +++++++++ COMPONENT +++++++++ 

class TodoForm extends Component {

	constructor (props) {

		super(props);

		this.state = {
			date: normalizeDate(new Date()) ,
			task: '', 
			rank: 'Med',
		 	owner: this.props.owner ,
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleSubmit(e) {
		e.preventDefault ();
		this.props.createTodo (this.state);
		this.setState ({ task: ''})
	};

	handleChange(e) {
		e.preventDefault();
		this.setState ({ [ e.target.name ]: e.target.value })
	}

	render () {
		return (
			<form 
				className = 'TodoForm boxClr engrBox' 
				style = { gridStyle } 
				onSubmit = { this.handleSubmit } 
			>
				<input 
					id = 'new_item_task'
					style = { style.task }
					type = 'text'
					name = 'task'
					value = { this.state.task }
					onChange = { this.handleChange }
					placeholder = 'enter a new task here'
					autoFocus
					required
				/>

				<select
					className = 'boxClr engrBox'
					id = 'new_item_priority' 
					style = { style.priority } 
					name = 'rank'
					type = 'select'
					value = { this.state.rank }
					onChange = { this.handleChange }
			 	> 
					<option value = 'High'> High	</option>
					<option value = 'Med'>	Med		</option>
					<option value = 'Low'>	Low		</option>
				</select>

				<input 
					className = 'boxClr engrBox'
					id = 'new_item_date'
					style = { style.date } 
					name = 'date' 
					type = 'date'
					onChange = { this.handleChange }
					value = { this.state.date }
				/>

				<button 
					className = 'boxClr engrBox'
					id = 'new_item_submit'
					style = { style.action } 
					type = "Submit"
				> <i className = "fa fa-plus fa-lg" ></i> 
				</button> 

			</form>
		)
	}
};

// +++++++++ PROPS +++++++++ 

TodoForm.propTypes = {
	createTodo: PropTypes.func.isRequired,
	owner: PropTypes.string.isRequired
};

TodoForm.defaultProps = {
	createTodo: f => f,
	owner: 'Default from APP.js'
};

export default TodoForm;