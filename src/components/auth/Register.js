import React, { Component } from 'react';
import { 
	Button, 
	Col, 
	ControlLabel,
	Form, 
  Grid,
	FormControl,
	FormGroup, 
	HelpBlock,
  PageHeader,
	Row 
} from 'react-bootstrap';

class Registration extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      emailConfirm: '',
      password: '',
      passwordConfirm: '',
      timezone: '',
      pwordLength: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getValidationState() {
    const length = this.state.pwordLength.length;
    if (length > 7) return 'success';
    else if (length > 4) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
    // validate email format
    // this.setState({ xxx: e.target.xxx });
    // ??? Test
    console.log(`${e.target.name}: ${e.target.value}`)
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state)
  }

  render() {
    return (
    <Grid 
      md = { 4 } mdOffset = { 4 } 
      onSubmit = { this.onSubmit }
    >

      <Row>
        <Col sm = { 12 } >
          <PageHeader> Registration </PageHeader>
        </Col>
      </Row>

      <Row>
        <Grid>
          <Form>
            <FormGroup
              validationState={this.getValidationState()}
            >

              <Row>
                <Col style = { { margin: 15 } }>
                  <ControlLabel>
                    User email
                  </ControlLabel>

                  <FormControl
                    inputRef = { value => this.state.email = value }
                    name = 'email'
                    type="email"
                    label="Email address"
                    placeholder="Enter email address"
                    xxx={ this.state.xxx }
                    onChange={ this.handleChange }
                  />
                  <FormControl.Feedback />
                </Col>

                <Col style = { { margin: 15 } }>
                  <FormControl
                    inputRef = { value => this.state.emailConfirm = value }
                    name = 'emailConfirm'
                    type="emailConfirm"
                    label="Email address"
                    placeholder="Confirm email address"
                    xxx={ this.state.xxx }
                    onChange={ this.handleChange }
                  />
                  <FormControl.Feedback />
                </Col>
              </Row>

              <Row>
                <Col style = { { margin: 15 } }>
                  <ControlLabel >
                    Password
                  </ControlLabel>

                    <HelpBlock style = { { color: 'lightgrey' } } >
                      Password must be at least 8 characters
                    </HelpBlock>

                   <FormControl 
                    inputRef = {value => this.state.pword = value}
                    name = "password"
                    type="password" 
                    label="Password" 
                    placeholder="Enter your password"
                    onChange={this.handleChange}
                    />
                
                  <FormControl.Feedback />

                </Col>

                <Col style = { { margin: 15 } }>

                   <FormControl 
                    inputRef = {value => this.state.pword = value}
                    name = "passwordConfirm"
                    type="passwordConfirm" 
                    label="Confirm Password" 
                    placeholder="Confirm your password"
                    onChange={this.handleChange}
                    />
                
                  <FormControl.Feedback />

                </Col>
              </Row>

            </FormGroup>

            <Button type="submit" bsStyle = 'primary' >
              Sign Up
            </Button>
            
          </Form>
        </Grid>
      </Row>
    </Grid>

    );
  }
}

export default Registration;