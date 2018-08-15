import React from 'react';
import { Button, Dialog, TextField,DialogActions,DialogContent,Tabs,Tab,Typography,AppBar,LinearProgress  } from '@material-ui/core';
//import TextField from '@material-ui/core/TextField';
//import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';
//import Tabs from '@material-ui/core/Tabs';
//import Tab from '@material-ui/core/Tab';
//import Typography from '@material-ui/core/Typography';
//import AppBar from '@material-ui/core/AppBar';


import AccountCircle from '@material-ui/icons/AccountCircle';
//import { FormGroup,FormControl } from '@material-ui/core';

import EventBus from './Services/EventBus';

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}
  


export default class FormDialog extends React.Component {
  state = {
    open: false,
    username:'',
    password:'',
    value:0,
    mail:'',
    passwordone:'',
    passwordtwo:''
  };


  handleClickOpen = () => {
    this.setState({ open: true });
    //console.log("user",this.state.username,"password",this.state.password)
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleSignIn = () => {
      //alert("Sign In");
      this.handleClose();
      //console.log("handle sign in ",this.state.username,this.state.mail);
      
      EventBus.eventEmitter.emit('authenticated', this.state.username);
  }

  handleSignUp = () => {
      //alert("Sign Up");
      this.handleClose();
  }



  render() {


    const {
        username,
        password,
        value,
        mail,
        passwordone,
        passwordtwo

    } = this.state;

    let re = "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
    let StrongPassword = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})";
    let WeakPassword = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})";
    const isInvalidEmail = !mail.match(re);
    const isInvalidSignIn = username === '' || password === ''; 
    const isInvalidSignUp = username === '' || mail === '' || passwordone !== passwordtwo || passwordone === '' || isInvalidEmail ;
    const isMismatchPassword = passwordone !== passwordtwo;  

    
    
    //console.log("isinvalidsignin",isInvalidSignIn,"username",username,"password",password);
    //console.log("valid mail",isInvalidEmail);
    return (
      <div>
        <Button color="inherit" onClick={this.handleClickOpen}>{<AccountCircle />}</Button>
        <Dialog
          scroll='body'
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
                <div >
                    <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        <Tab label="Sign In" />
                        <Tab label="Sign Up" />
                    </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer>
                        <div>
                            <form>
                            <TextField
                                value={username}
                                onChange={event => this.setState(byPropKey('username', event.target.value))}
                                autoFocus
                                margin="dense"
                                id="username"
                                label="User"
                                type="text"
                                fullWidth
                                
                            />            
                            <TextField
                                value={password}
                                onChange={event => this.setState(byPropKey('password', event.target.value))}
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                type="password"
                                fullWidth
                                
                            />
                            </form>
                        </div>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                            Cancel
                            </Button>
                            <Button  disabled={isInvalidSignIn} onClick={this.handleSignIn} color="primary">
                            Login
                            </Button>
                        </DialogActions>   
                    </TabContainer>}
                    {value === 1 && <TabContainer>
                        <div>
                            <form>
                            <TextField
                                value={username}
                                onChange={event => this.setState(byPropKey('username', event.target.value))}
                                autoFocus
                                margin="dense"
                                id="username"
                                label="User"
                                type="text"
                                fullWidth 
                                                          
                            />
                            <TextField
                                value={mail}
                                onChange={event => this.setState(byPropKey('mail', event.target.value))}
                                autoFocus
                                margin="dense"
                                id="mail"
                                label="E-Mail"
                                type="mail"
                                fullWidth     
                                
                                                            
                            />
                            <TextField
                                value={passwordone}
                                onChange={event => this.setState(byPropKey('passwordone', event.target.value))}
                                autoFocus
                                margin="dense"
                                id="passwordone"
                                label="Password"
                                type="password"
                                fullWidth      
                                                           
                            />
                            {passwordone.match(StrongPassword)?<LinearProgress color="primary" variant="determinate" value={100} />:passwordone.match(WeakPassword)?<LinearProgress color="primary" variant="determinate" value={60} />:<LinearProgress color="secondary" variant="determinate" value={20} />} 
                              
                            <TextField
                                value={passwordtwo}
                                onChange={event => this.setState(byPropKey('passwordtwo', event.target.value))}
                                autoFocus
                                margin="dense"
                                id="passwordtwo"
                                label="Confirm Password"
                                type="password"
                                fullWidth      
                                                           
                            />
                            {isMismatchPassword? <p>Password must match</p>: null}
                            </form>                                                      
                        </div>   
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                            Cancel
                            </Button>
                            <Button disabled={isInvalidSignUp} onClick={this.handleSignUp} color="primary">
                            Sign Up
                            </Button>
                        </DialogActions>                         
                    </TabContainer>}
                    
                </div>                            
          </DialogContent>  
       
        </Dialog>
      </div>
    );
  }
}



