import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card_container: {
    minWidth: '360px',
    minHeight: '300px',
    maxWidth: '90vw',
    position: 'absolute',
    right: '80px',
    top: '160px',

    [theme.breakpoints.down(768)]: {
      position: 'relative',
      marginLeft: '20px',
      marginRight: '20px',
      right: '0px',
      top: '80px',
    },
  },
});

class LandingCard extends React.Component {
  render() {
    return (
    <div>
      <Card className={this.props.classes.card_container}>
        <CardContent>
          <Typography variant="headline">
            Daisy Journal
          </Typography>
          <br />
          <Typography variant="body1">
            Planning made simple.
          </Typography>
        </CardContent>
      </Card>
    </div>
  )}
}

LandingCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingCard);
