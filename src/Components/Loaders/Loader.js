import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

const styles = theme => ({
  loading: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '32px',
    marginBottom: '32px',
  }
});

class Loader extends React.Component {
  render() {

    return(
    <div id='loader' className={this.props.classes.loading}>
      <ClipLoader
        sizeUnit={"px"}
        size={100}
        color={'#93AAB5'}
        loading={this.props.loading_status.loading_status}
      />
    </div>
  )}
}
Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    loading_status: state.loading_status,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Loader));
