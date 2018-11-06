import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from './TextField';
import DateTimePicker from './DateTimePicker';
import SelectTimezone from './SelectTimezone';
import Calendar from './../utils/calendar';

class CalendarForm extends Component {
  onSubmit = async values => {
    window.alert(JSON.stringify(values, 0, 2));
  };

  state = {
    today: new Date(),
  };

  openGoogleCalendar = (title, desc, timezone, startDate, endDate) => () => {
    console.log(timezone);
    const calendar = new Calendar(title, desc, timezone);
    calendar.setDate(startDate, endDate);
    window.open(calendar.googleCalendarLink);
  };

  onSubmit = values => {
    
    const { title, descEvent, timezones, dateStart, dateEnd } = values;
    const calendar = new Calendar(title, descEvent, timezones);
    calendar.setDate(dateStart, dateEnd);
    window.open(calendar.googleCalendarLink);
  };

  render() {
    const { today } = this.state;
    const { formatDate } = this.props;
    const validate = values => {
      const errors = {};
      if (!values.title) {
        errors.title = 'Required';
      }
      return errors;
    };
    const calculator = createDecorator(
      {
        field: 'dateStart',
        updates: {
          dateEnd: (dateStart, allValues) => {
            if (dateStart >= allValues.dateEnd) {
              return dateStart;
            }

            return allValues.dateEnd;
          },
        },
      },
      {
        field: 'dateEnd',
        updates: {
          dateStart: (dateEnd, allValues) => {
            if (dateEnd < allValues.dateStart) {
              return dateEnd;
            }

            return allValues.dateStart;
          },
        },
      }
    );

    return (
      <Form
        onSubmit={this.onSubmit}
        decorators={[calculator]}
        initialValues={{
          dateStart: today,
          dateEnd: today,
        }}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container justify="center" style={{ height: '90vh' }}>
              <Grid container item justify="flex-start" spacing={24} xs={6}>
                <Grid item xs={12}>
                  <Field
                    name="title"
                    component={TextField}
                    label="Title"
                    margin="normal"
                    fullWidth
                  />
                  <Field
                    name="descEvent"
                    component={TextField}
                    label="Description"
                    multiline
                    rowsMax="10"
                    margin="normal"
                    fullWidth
                  />

                  <Field
                    name="dateStart"
                    component={DateTimePicker}
                    formatDate={formatDate}
                    label="Start"
                    disablePast
                    ampm={false}
                    margin="normal"
                    fullWidth
                  />

                  <Field
                    name="dateEnd"
                    component={DateTimePicker}
                    formatDate={formatDate}
                    label="End"
                    margin="normal"
                    disablePast
                    ampm={false}
                    fullWidth
                  />

                  <Field
                    name="timezones"
                    component={SelectTimezone}
                    label="Timezone"
                    fullWidth
                  />
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
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      />
    );
  }
}

export default CalendarForm;
