import { format, isValid } from 'date-fns';

class Calendar {
  constructor(title = 'New Event', description = '', timezone = '+00:00') {
    this._timezone = timezone;
    this._formatDate = "yyyyMMdd'T'HHmmss"; // eslint-disable-line
    this._description = description;
    this._title = title;
  }

  setDate(start, end) {
    if (isValid(start) && isValid(end)) {
      this._startDate = format(start, this._formatDate);
      this._endDate = format(end, this._formatDate);
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
      '&location=&details=' +
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
