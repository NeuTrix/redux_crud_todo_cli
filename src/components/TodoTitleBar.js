// component to display the curret todo list
import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

// ============================ STYLING ============================

const styleTitle= {
	background: '#006699',
	color: 'lightblue',
	borderRadius: 5,
	marginBottom: 10,
	textAlign: 'left'
};

const spacing =  {
	sm: {task: 6, rank: 2, date: 2, action: 2,  }, 
};	

// =========================== Container ===========================

const TodoTitleBar = (props) => {

	
	return (
	
		<Grid >

			<Row className = 'TodoTitleBar' style= { styleTitle }>
			
				<Col className = 'titleTask' sm = { spacing.sm.task } >
					Task
				</Col>

				<Col className = 'titleRank' sm = { spacing.sm.rank } >
					Rank
				</Col>

				<Col className = 'titleDue' sm = { spacing.sm.date } >
					Date
				</Col>

				<Col className = 'titleAction' sm = { spacing.sm.action } >
					Action
				</Col>

			</Row>

		</Grid>
	);

}; // end container

// ==================================================================

TodoTitleBar.propTypes = {
	spacing: PropTypes.object
};

TodoTitleBar.defaultProps = {
	
};

export default (TodoTitleBar);