import { format, isValid, addMinutes } from 'date-fns';

class Calendar {
  constructor(
    title = 'New Event',
    description = '',
    timezone = 0,
    localTimezoneOffset,
    dateStart,
    dateEnd,
    location
  ) {
    this._timezone = timezone;
    this._formatDate = "yyyyMMdd'T'HHmmss"; // eslint-disable-line
    this._description = description;
    this._title = title;
    this._location = location;

    if (isValid(dateStart) && isValid(dateEnd)) {
      const offset = timezone - localTimezoneOffset;
      this._startDate = format(addMinutes(dateStart, offset), this._formatDate);
      this._endDate = format(addMinutes(dateEnd, offset), this._formatDate);
    } else {
      throw new Error('Invalide time');
    }
  }

  get googleCalendarLink() {
    const link =
      'http://www.google.com/calendar/event?action=TEMPLATE' +
      '&dates=' +
      this._startDate +
      '%2F' +
      this._endDate +
      '&text=' +
      this._title +
      '&location=' +
      this._location +
      '&details=' +
      this._description;

    return link;
  }

  get outlookFile() {
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Our Company//NONSGML v1.0//EN
BEGIN:VEVENT
UID:me@google.com
DTSTAMP:${this._startDate}
ORGANIZER;CN=Me:MAILTO::me@gmail.com
DTSTART:${this._startDate}
DTEND:${this._endDate}
SUMMARY:${this._title}
END:VEVENT
END:VCALENDAR`;
  }
}

export default Calendar;
