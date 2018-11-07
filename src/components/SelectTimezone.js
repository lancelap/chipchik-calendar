import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';

const timezones = [
  {
    offset: 'GMT -12:00',
    value: -720,
  },
  {
    offset: 'GMT -11:00',
    value: -660,
  },
  {
    offset: 'GMT -10:00',
    value: -600,
  },
  {
    offset: 'GMT -09:00',
    value: -540,
  },
  {
    offset: 'GMT -08:00',
    value: -480,
  },
  {
    offset: 'GMT -07:00',
    value: -420,
  },
  {
    offset: 'GMT -06:00',
    value: -360,
  },
  {
    offset: 'GMT -05:00',
    value: -300,
  },
  {
    offset: 'GMT -04:30',
    value: -270,
  },
  {
    offset: 'GMT -04:00',
    value: -240,
  },
  {
    offset: 'GMT -03:30',
    value: -210,
  },
  {
    offset: 'GMT -03:00',
    value: -180,
  },
  {
    offset: 'GMT -02:00',
    value: -120,
  },
  {
    offset: 'GMT -01:00',
    value: -60,
  },
  {
    offset: 'GMT 00:00',
    value: 0,
  },
  {
    offset: 'GMT +01:00',
    value: 60,
  },
  {
    offset: 'GMT +02:00',
    value: 120,
  },
  {
    offset: 'GMT +03:00',
    value: 180,
  },
  {
    offset: 'GMT +03:30',
    value: 210,
  },
  {
    offset: 'GMT +04:00',
    value: 240,
  },
  {
    offset: 'GMT +04:30',
    value: 270,
  },
  {
    offset: 'GMT +05:00',
    value: 300,
  },
  {
    offset: 'GMT +05:30',
    value: 330,
  },
  {
    offset: 'GMT +05:45',
    value: 345,
  },
  {
    offset: 'GMT +06:00',
    value: 360,
  },
  {
    offset: 'GMT +06:30',
    value: 390,
  },
  {
    offset: 'GMT +07:00',
    value: 420,
  },
  {
    offset: 'GMT +08:00',
    value: 480,
  },
  {
    offset: 'GMT +08:45',
    value: 525,
  },
  {
    offset: 'GMT +09:00',
    value: 550,
  },
  {
    offset: 'GMT +09:30',
    value: 570,
  },
  {
    offset: 'GMT +10:00',
    value: 600,
  },
  {
    offset: 'GMT +11:00',
    value: 660,
  },
  {
    offset: 'GMT +11:30',
    value: 690,
  },
  {
    offset: 'GMT +12:00',
    value: 720,
  },
  {
    offset: 'GMT +13:00',
    value: 780,
  },
  {
    offset: 'GMT +14:00',
    value: 840,
  },
];

const items = timezones.map(zone => (
  <option key={zone.value} value={zone.value}>
    {zone.offset}
  </option>
));

export default ({
  input: { name, onChange, value, ...restInput },
  meta,
  label,
  defaultValue,
  fullWidth,
  ...rest
}) => {
  return (
    <FormControl fullWidth={fullWidth} margin="normal">
      <InputLabel shrink htmlFor={name}>
        {label}
      </InputLabel>
      <NativeSelect
        {...rest}
        name={name}
        onChange={onChange}
        defaultValue={defaultValue}
        input={<Input {...restInput} />}
      >
        <option value="" />
        {items}
      </NativeSelect>
    </FormControl>
  );
};
