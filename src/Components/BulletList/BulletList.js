import React from 'react'
import PropTypes from 'prop-types';
import Icon from '@mdi/react'
import {  mdiSquare,
          mdiSquareOutline,
          mdiCircle,
          mdiCircleOutline,
          mdiTriangle,
          mdiTriangleOutline
        } from '@mdi/js'
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

// Components
import BulletSelector from './BulletSelector'
import BulletItem from './BulletItem'

// square = Task
// circle = Event
// triangle = Habit

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing.unit,
    flexDirection: 'row',
  },
});

class BulletList extends React.Component {
  constructor(props)
  {
    super(props);

    this.state = {
      bullets: [],
    };

    this.addBullet = this.addBullet.bind(this)
  }

  handleChange = event => {
    this.setState({
      selected: event.target.value });
  };

  addBullet(selected, description)
  {
    const bullet = {
      description: description,
      selected: selected,
    }

    this.setState({
      bullets: this.state.bullets.concat(bullet)
    })

  }

  render() {
    return(
      <div className={this.props.classes.root}>
        <BulletSelector add={this.addBullet}/>
        <BulletItem bullets={this.state.bullets}/>
      </div>
    );
  }
}

BulletList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BulletList);
