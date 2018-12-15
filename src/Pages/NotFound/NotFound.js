import React from 'react'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import history from '../.././history';

// redux
import store from '../.././Store/store'
import { connect } from "react-redux";

// functions
import { checkAuth } from '../.././Utils/checkauth'

// Components
import InternalNavBar from '../.././Components/NavBar/InternalNavBar'
import NotFoundCard from '../.././Components/Cards/NotFoundCard'


// css
import './NotFound.css'
import '../.././Images/Prompt.css'

// Images
var not_found = require('../.././Images/404.svg')

const styles = theme => ({
  journal_container: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '80vw',
    marginTop: '80px',
    marginBottom: '20px',
    marginLeft: '20px',
    marginRight: '20px',
}})

class NotFound extends React.Component {
  constructor(props)
  {
    super(props);

  }

  render() {
    return (
      <div>
        <InternalNavBar />
        <NotFoundCard />
        <div id="block_one"/>
        <div id="block_two"/>
        <svg viewBox="0 0 100 100" id="not_found" alt="" style ={{ backgroundImage: "url("+not_found+")"}}/>
      </div>
    )
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(NotFound));
