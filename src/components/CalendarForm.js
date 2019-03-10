import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from './TextField';
import DateTimePicker from './DateTimePicker';
import SelectTimezone from './SelectTimezone';
import Calendar from './../utils/calendar';
import SimpleModal from './SimpleModal';
import langLib from '.././utils/langLib';
import downloadPst from './../utils/downloadPst';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    marginTop: '10%',
    marginBottom: '10%',
  },
});

class CalendarForm extends Component {
  getOutlook = values => () => {
    const { title, descEvent, timezone, dateStart, dateEnd, location } = values;
    const calendar = new Calendar(
      title,
      descEvent,
      timezone,
      this.props.localTimezoneOffset,
      dateStart,
      dateEnd,
      location
    );
    downloadPst(calendar.outlookFile);
  };

  onSubmit = values => {
    const { title, descEvent, timezone, dateStart, dateEnd, location } = values;
    const calendar = new Calendar(
      title,
      descEvent,
      timezone,
      this.props.localTimezoneOffset,
      dateStart,
      dateEnd,
      location
    );
    window.open(calendar.googleCalendarLink);
  };

  render() {
    const {
      formatDate,
      localTimezoneOffset,
      today,
      classes,
      lang,
    } = this.props;
    const validate = values => {
      const errors = {};
      if (!values.title) {
        errors.title = langLib.required[lang];
      }

      if (values.dateStart > values.dateEnd) {
        errors.dateStart = 'values.dateStart > values.dateEnd';
      }

      if (values.dateEnd < values.dateStart) {
        errors.dateEnd = 'values.dateEnd < values.dateStart';
      }

      return errors;
    };

    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={{
          dateStart: today,
          dateEnd: today,
          timezone: localTimezoneOffset,
        }}
        validate={validate}
        render={({ handleSubmit, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid
              container
              alignItems="center"
              justify="center"
              className={classes.container}
            >
              <Grid container item spacing={24} xs={12} xl={4} md={6}>
                <Grid item xs={12}>
                  <Field
                    name="title"
                    component={TextField}
                    label={langLib.title[lang]}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="location"
                    component={TextField}
                    label={langLib.location[lang]}
                    multiline
                    rowsMax="10"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    name="descEvent"
                    component={TextField}
                    label={langLib.description[lang]}
                    multiline
                    rowsMax="10"
                    fullWidth
                  />
                </Grid>

                <Grid container justify="space-between" item xs={12}>
                  <Grid item xs={4}>
                    <Field
                      name="dateStart"
                      component={DateTimePicker}
                      formatDate={formatDate}
                      label={langLib.start[lang]}
                      disablePast
                      ampm={false}
                      margin="normal"
                      fullWidth
                    />
                  </Grid>

                  <Grid container item xs={4}>
                    <Field
                      name="dateEnd"
                      component={DateTimePicker}
                      formatDate={formatDate}
                      label={langLib.end[lang]}
                      margin="normal"
                      disablePast
                      ampm={false}
                      fullWidth
                    />
                  </Grid>

                  <Grid container item xs={4}>
                    <Field
                      name="timezone"
                      component={SelectTimezone}
                      label={langLib.timezone[lang]}
                      defaultValue={localTimezoneOffset}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid item container justify="center" spacing={8}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Google Calendar
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button 
                      disabled={submitting}
                      onClick={this.getOutlook(values)}>
                      getOutlook
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      />
    );
  }
}

export default withStyles(styles)(CalendarForm);
