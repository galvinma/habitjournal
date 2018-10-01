
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

// functions
import { sendSignUpCredentials } from '../.././Utils/signup'

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

  render() {
    return (
      <div>
        <div className={this.props.classes.layout}>
          <Paper className={this.props.classes.paper}>
            <Typography variant="headline">Sign up</Typography>
             <form className={this.props.classes.form}>
               <FormControl margin="normal" required fullWidth value={this.state.firstname} onChange={this.handleChange}>
                 <InputLabel htmlFor="firstname">First Name</InputLabel>
                 <Input id="firstname" name="firstname" autoComplete="firstname" autoFocus />
               </FormControl>
               <FormControl margin="normal" required fullWidth value={this.state.lastname} onChange={this.handleChange}>
                 <InputLabel htmlFor="lastname">Last Name</InputLabel>
                 <Input id="lastname" name="lastname" autoComplete="lastname" />
               </FormControl>
               <FormControl margin="normal" required fullWidth value={this.state.email}  onChange={this.handleChange}>
                 <InputLabel htmlFor="email">Email Address</InputLabel>
                 <Input id="email" name="email" autoComplete="email" />
               </FormControl>
               <FormControl margin="normal" required fullWidth value={this.state.password} onChange={this.handleChange}>
                 <InputLabel htmlFor="password">Password</InputLabel>
                 <Input
                   name="password"
                   type="password"
                   id="password"
                   autoComplete="current-password"
                 />
               </FormControl>
               <Button
                 type="submit"
                 componentClass={NavLink}
                 href="/#/timer"
                 fullWidth
                 variant="raised"
                 color="primary"
                 className={this.props.classes.submit}
                 onClick={() => sendSignUpCredentials(
                   this.state.firstname,
                   this.state.lastname,
                   this.state.email,
                   this.state.password,
                 )}
               >
                 Sign Up
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

export default withStyles(styles)(SignUpPrompt);
