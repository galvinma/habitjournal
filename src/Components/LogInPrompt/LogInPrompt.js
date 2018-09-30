
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

class LoginPrompt extends React.Component {
  render() {
    return (
      <div>
        <div className={this.props.classes.layout}>
          <Paper className={this.props.classes.paper}>
            <Typography variant="headline">Log in</Typography>
             <form className={this.props.classes.form}>
               <FormControl margin="normal" required fullWidth>
                 <InputLabel htmlFor="email">Email Address</InputLabel>
                 <Input id="email" name="email" autoComplete="email" autoFocus />
               </FormControl>
               <FormControl margin="normal" required fullWidth>
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
               >
                 Log in
               </Button>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

LoginPrompt.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPrompt);
