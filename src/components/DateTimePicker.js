import React from 'react';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';

export default ({
  input: { name, onChange, value, ...restInput },
  meta,
  formatDate,
  ...rest
}) => {
  return (
    <DateTimePicker
      {...rest}
      name={name}
      error={meta.error && meta.touched}
      InputProps={restInput}
      onChange={onChange}
      value={value}
      format={formatDate}
    />
  );
};
