import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import normalizeDate from '../../helpers/normalizeDate';
// import { colors, media } from '../../helpers/cssConstants';

const propTypes = {
	createTodo: PropTypes.func.isRequired,
	owner: PropTypes.string.isRequired,
};

class TodoForm extends Component {

	constructor(props) {
		// const { owner } = props;
		super(props);
		this.state = {
			date: normalizeDate(new Date()),
			owner: this.props.owner,
			// owner,
			rank: 'Med',
			task: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.createTodo(this.state);
		this.setState({ task: '' });
	}

	handleChange(e) {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { classes } = this.props;

		return (
			<form
				className={classes.grid}
				onSubmit={this.handleSubmit}
			>
				<i className={classes.glyph} />

				<input
					className={classes.task}
					id="new_item_task"
					type="text"
					name="task"
					value={this.state.task}
					onChange={this.handleChange}
					placeholder="Enter a new task here"
					autoFocus
					required
				/>

				<select
					className={classes.rank}
					id="new_item_priority"
					name="rank"
					type="select"
					value={this.state.rank}
					onBlur={this.handleChange}
				>
					<option value="High"> High	</option>
					<option value="Med">	Med		</option>
					<option value="Low">	Low		</option>

				</select>

				<input
					className={classes.datePick}
					id="new_item_date"
					name="date"
					type="date"
					onChange={this.handleChange}
					value={this.state.date}
				/>

				<button
					className={classes.add}
					id="new_item_submit"
					type="submit"
				> Add
				</button>

			</form>
		);
	}
}

const styles = {
	grid: {
		/* mobile view */
		backgroundColor: 'aliceblue',
		display: 'grid',
		gridGap: 10,
		gridTemplateAreas: `
			" glyph task task task "
			" . rank date add " 
		`,
		gridTemplateColumns: '1fr 3fr 4fr 1fr',
		marginBottom: 20,
		padding: 10,
		// & * {
		// 	font-size: 1em,
		// 	&:hover {
		// 		color: steelblue,
		// 	}
	},

	/* iPad and large view */
	// @media (${media._medium}) {
	// 	gridTemplateAreas: 
	// 		" glyph 	task  rank  date 	add  "
	// 	,
	// 	gridTemplateColumns: 1fr 8fr 2fr 3fr 1fr,
	// },

	add: {
		// background: 'none',
		// border: 'none',
		color: '#00cc00',
		// fontSize: '2em',
		gridArea: 'add',
	},

	datePick: {
		gridArea: 'date',
		textIndent: 10,
	},

	glyph: {
		color: 'aliceblue',
		fontSize: '1.5em',
		gridArea: 'glyph',
	},

	rank: {
		gridArea: 'rank',
	},

	task: {
		gridArea: 'task',
		textIndent: 10,
		// &: hover {
		// color: 'steelblue'
		// }
	},


}

TodoForm.propTypes = propTypes;

export default withStyles(styles)(TodoForm);
