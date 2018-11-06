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
      helperText={meta.touched ? meta.error : undefined}
      error={meta.error && meta.touched}
      InputProps={restInput}
      onChange={onChange}
      value={value}
      format={formatDate}
    />
  );
};
