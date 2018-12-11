import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card_container: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '400px',
    minHeight: '120px',
    maxWidth: '90vw',
    position: 'absolute',
    right: '52px',
    top: '140px',
  },
  content_container: {
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
  },
  header_text: {
    fontSize: '32px',
    fontFamily: 'Nunito',
    fontWeight: '500',
  },
  body_text: {
    fontSize: '14px',
    fontFamily: 'Nunito',
    fontWeight: '500',
    marginTop: "auto",
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'underline',
    color: 'inherit'
  }
});

class LandingCard extends React.Component {
  render() {
    return (
    <div>
      <Card id="description_card" className={this.props.classes.card_container}>
        <CardContent className={this.props.classes.content_container}>
          <div className={this.props.classes.header_text}>
            Daisy Journal
          </div>
          <div className={this.props.classes.body_text}>
            Methodical planning for the digital age. <a className={this.props.classes.link} href='#/info'>Find out more</a>.
          </div>
        </CardContent>
      </Card>
    </div>
  )}
}

LandingCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingCard);
