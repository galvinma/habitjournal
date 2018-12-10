import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


// redux
import store from '../.././Store/store'
import { connect } from "react-redux";
import {getAuthStatus, getCurrentUser} from '../.././Actions/actions'

// email val
var validator = require("email-validator");

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,

    [theme.breakpoints.down(768)]: {
      marginTop: theme.spacing.unit * 4,
    },
  },
  helper: {
    color: '#E53935',
  },
  form_control: {

    [theme.breakpoints.down(768)]: {
      marginTop: '8px',
      marginBottom: '0px',
    },

    [theme.breakpoints.down(500)]: {
      marginTop: '0px',
      marginBottom: '0px',
    },
  },
});

class SignUpPrompt extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  };

  this.handleChange = this.handleChange.bind(this);

}

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  signUpUser() {

    this.setState({
      firstname_validation_text: "",
      lastname_validation_text: "",
      email_validation_text: "",
      password_validation_text: "",
    })

    if (this.state.email === "" ||
        this.state.password === "" ||
        this.state.firstname === "" ||
        this.state.lastname === "")
    {
      this.setState({ password_validation_text: "Missing required field(s)"})
      return
    }

    if (validator.validate(this.state.email) === false)
    {
      this.setState({ email_validation_text: "Invalid email address"})
      return
    }

    if (this.state.password.length < 8)
    {
      this.setState({ password_validation_text: "Password must be at least 8 characters"})
      return
    }

    axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/signup`, {
      params: {
        email: this.state.email,
        password: this.state.password,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email_validation_text: "",
        password_validation_text: "",
        firstname_validation_text: "",
        lastname_validation_text: "",
      }
    })
    .then((response) => {
      if (response.data.allow === true)
      {
        var token = response.data.token
        var user = response.data.user
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', user);

        store.dispatch(getAuthStatus({
          auth_status: true,
        }))
        store.dispatch(getCurrentUser({
          user: response.data.user,
        }))
      }
      else
      {
        this.setState({ password_validation_text: "Unable to register user"})
      }
    })
  }

  checkJoin(event)
  {
    if (event.keyCode === 13) {
        this.signUpUser()
    }
  }

  render() {
    if (store.getState().auth_status.auth_status === true) {
      return <Redirect to='/journal' />
    }
    return (
      <div>
        <div className={this.props.classes.layout}>
          <Paper className={this.props.classes.paper}>
             <form className={this.props.classes.form}>
               <FormControl className={this.props.classes.form_control} margin="normal" required fullWidth value={this.state.firstname} onChange={this.handleChange} onKeyDown={(e) => this.checkJoin(e)}>
                 <InputLabel style={{color: 'rgba(0, 0, 0, 0.87)'}}  htmlFor="firstname">First Name</InputLabel>
                 <Input id="firstname" name="firstname" autoComplete="firstname" autoFocus />
                 <FormHelperText className={this.props.classes.helper}>{this.state.firstname_validation_text}</FormHelperText>
               </FormControl>
               <FormControl className={this.props.classes.form_control} margin="normal" required fullWidth value={this.state.lastname} onChange={this.handleChange} onKeyDown={(e) => this.checkJoin(e)}>
                 <InputLabel style={{color: 'rgba(0, 0, 0, 0.87)'}} htmlFor="lastname">Last Name</InputLabel>
                 <Input id="lastname" name="lastname" autoComplete="lastname" />
                 <FormHelperText className={this.props.classes.helper}>{this.state.lastname_validation_text}</FormHelperText>
               </FormControl>
               <FormControl className={this.props.classes.form_control} margin="normal" required fullWidth value={this.state.email}  onChange={this.handleChange} onKeyDown={(e) => this.checkJoin(e)}>
                 <InputLabel style={{color: 'rgba(0, 0, 0, 0.87)'}} htmlFor="email">Email Address</InputLabel>
                 <Input id="email" name="email" autoComplete="email" />
                 <FormHelperText className={this.props.classes.helper}>{this.state.email_validation_text}</FormHelperText>
               </FormControl>
               <FormControl className={this.props.classes.form_control} margin="normal" required fullWidth value={this.state.password} onChange={this.handleChange} onKeyDown={(e) => this.checkJoin(e)}>
                 <InputLabel style={{color: 'rgba(0, 0, 0, 0.87)'}} htmlFor="password">Password</InputLabel>
                 <Input
                   name="password"
                   type="password"
                   id="password"
                   autoComplete="current-password"
                 />
                 <FormHelperText className={this.props.classes.helper}>{this.state.password_validation_text}</FormHelperText>
               </FormControl>
               <Button
                 fullWidth
                 className={this.props.classes.submit}
                 onClick={() => this.signUpUser()}>Join
               </Button>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

SignUpPrompt.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(SignUpPrompt));
