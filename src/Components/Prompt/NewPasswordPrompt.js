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

class NewPasswordPrompt extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
    check: "",
    new: "",
    validation_text: "",
    helper_color: "#E53935",
  };

  this.handleChange = this.handleChange.bind(this);

}

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  changePass() {

    this.setState({
      validation_text: "",
    })


    if (this.state.new !== this.state.check)
    {
      this.setState({ validation_text: "Passwords do not match"})
      return
    }

    if (this.state.new.length < 8)
    {
      this.setState({ validation_text: "Password must be at least 8 characters"})
      return
    }


    var s = window.location.href.split("/")
    let hash = s[s.length-1]
    let id = s[s.length-2]


    axios.post(`${process.env.REACT_APP_DAISY_JOURNAL_API_URI}/api/newpass`, {
      params: {
        user_id: id,
        token_hash: hash,
        new_password: this.state.new,
      }
    })
    .then((response) => {
      if (response.data.success === true)
      {
        this.setState({
          validation_text: "Password reset",
          helper_color: '#43A047'
        })
      }
      else
      {
        this.setState({ validation_text: "Unable to reset password"})
      }
    })
  }

  checkReset(event)
  {
    if (event.keyCode === 13) {
        this.changePass()
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
                    onChange={this.handleChange}
                    onKeyDown={(e) => this.checkReset(e)}
                    >
                <InputLabel style={{color: 'rgba(0, 0, 0, 0.87)'}} htmlFor="new">New Password</InputLabel>
                <Input id="new" type="password"/>
               </FormControl>

               <FormControl
                    margin="normal"
                    required fullWidth
                    onChange={this.handleChange}
                    onKeyDown={(e) => this.checkReset(e)}
                    >
                <InputLabel style={{color: 'rgba(0, 0, 0, 0.87)'}} htmlFor="new">Confirm Password</InputLabel>
                <Input id="check" type="password"/>
                 <FormHelperText style={{color: this.state.helper_color}}>{this.state.validation_text}</FormHelperText>
               </FormControl>

               <Button
                 fullWidth
                 className={this.props.classes.submit}
                 onClick={() => this.changePass()} >Change Password
               </Button>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

NewPasswordPrompt.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth_status: state.auth_status,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps)(withStyles(styles)(NewPasswordPrompt));
