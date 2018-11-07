import React, { Component } from 'react';
import CalendarForm from './components/CalendarForm';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import 'typeface-roboto';

const styles = {
  grow: {
    flexGrow: 1,
  },
};

class App extends Component {
  constructor() {
    super();

    const today = new Date();
    this.state = {
      today,
      lang: 'en',
      localTimezoneOffset: today.getTimezoneOffset() * -1,
      anchorEl: null,
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
    });

    const { classes } = this.props;
    const { today, localTimezoneOffset, lang } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <AppBar color="default" position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Calendar
              </Typography>

              <Select
                value={lang}
                onChange={this.handleChange}
                inputProps={{
                  name: 'lang',
                  id: 'lang-simple',
                }}
              >
                <MenuItem value={'en'}>English</MenuItem>
                <MenuItem value={'ru'}>Russian</MenuItem>
              </Select>
            </Toolbar>
          </AppBar>
          <CalendarForm
            localTimezoneOffset={localTimezoneOffset}
            today={today}
            formatDate={'dd.MM.yyyy HH:mm'}
            lang={lang}
          />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
