import React, { Component } from 'react';
import CalendarForm from './components/CalendarForm';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';

class App extends Component {
  render() {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CalendarForm formatDate={'dd.MM.yyyy HH:mm'} />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
