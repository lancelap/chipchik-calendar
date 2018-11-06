import React from 'react';
import TextField from '@material-ui/core/TextField';

export default ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      name={name}
      helperText={meta.touched ? meta.error : undefined}
      error={meta.error && meta.touched}
      InputProps={restInput}
      onChange={onChange}
      value={value}
    />
  );
};
