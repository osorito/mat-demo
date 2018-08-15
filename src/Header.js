import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Avatar from '@material-ui/core/Avatar';
import Login from './Login';
import Close from '@material-ui/icons/Close';
import EventBus from './Services/EventBus';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};



function ButtonAppBar(props) {

 
  //{this.props.token===null?<Login/>:<Button color="inherit" onClick={this.handleSignOut}>{<Close />}</Button>}
  console.log("props",props.token);
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Avatar alt="Logaad Logo" src="../assets/logo-50-color.png" className={styles.avatar} />
          <Typography variant="title" color="inherit" className={classes.flex}  >
              Logaad
          </Typography>
          {props.token===null?<Login/>:<Button color="inherit" onClick={
            ()=>{EventBus.eventEmitter.emit('authenticated', null);}

          }>{<Close />}</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);