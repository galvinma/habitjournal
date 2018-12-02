import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card_container: {
    width: '360px',
    height: '300px',
    position: 'absolute',
    right: '80px',
    top: '160px',

    [theme.breakpoints.down(768)]: {
      position: 'relative',
      height: '200px',
      marginLeft: '8px',
      marginRight: '8px',
      right: '0px',
      top: '80px',
    },
  },
  homelink: {
    textDecoration: 'underline',
    color: 'inherit'
  }
});

class NotFoundCard extends React.Component {
  render() {
    return (
    <div className={this.props.classes.root}>
      <Card className={this.props.classes.card_container}>
        <CardContent>
          <Typography variant="display2">
            404
          </Typography>
          <br />
          <Typography variant="body1">
            Take me back to <a className={this.props.classes.homelink} href='/'>daisyjournal.com</a>.
          </Typography>
        </CardContent>
      </Card>
    </div>
  )}
}

NotFoundCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFoundCard);
