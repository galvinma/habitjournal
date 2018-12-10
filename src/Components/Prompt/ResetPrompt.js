import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
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
});

class ResetPrompt extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    email: "",
    email_validation_text: "",
    helper_color: "#E53935",
  };

  this.handleChange = this.handleChange.bind(this);

}

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  resetPass() {
    // reset validators
    this.setState({
      email_validation_text: "Please wait",
    })

    if (this.state.email === "")
    {
      this.setState({ email_validation_text: "Enter a valid email address"})
      return
    }

    if (validator.validate(this.state.email) === false)
    {
      this.setState({ email_validation_text: "Invalid email address"})
      return
    }

    axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/reset`, {
      params: {
        email: this.state.email,
      }
    })
    .then((response) => {
      if (response.data.success === true)
      {
        this.setState({
          email_validation_text: "Please check your email",
          helper_color: '#43A047'
        })
      }
      else
      {
        this.setState({ email_validation_text: "Unable to reset password"})
      }
    })
  }

  checkReset(event)
  {
    if (event.keyCode === 13) {
        this.resetPass()
    }
  }

  render() {
    return (
      <div>
        <div className={this.props.classes.layout}>
          <Paper className={this.props.classes.paper}>
             <form className={this.props.classes.form}>
               <FormControl
                    margin="normal"
                    required fullWidth
                    value={this.state.email}
                    onChange={this.handleChange}
                    onKeyDown={(e) => this.checkReset(e)}
                    >
                 <InputLabel style={{color: 'rgba(0, 0, 0, 0.87)'}} htmlFor="email">Email Address</InputLabel>
                 <Input id="email" name="email" autoComplete="email" autoFocus />
                 <FormHelperText style={{color: this.state.helper_color}}>{this.state.email_validation_text}</FormHelperText>
               </FormControl>
               <Button
                 fullWidth
                 className={this.props.classes.submit}
                 onClick={() => this.resetPass()} >Reset Password
               </Button>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

ResetPrompt.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ResetPrompt));
