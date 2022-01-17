import React from 'react';
import { Box, Grid, TextField } from '@material-ui/core';
import { useNewAppFormContext } from '../context';

export function SmsForm() {
  const { smsForm, smsFormValueHandler } = useNewAppFormContext();

  const changeValueHandler = React.useCallback(
    (key: 'name' | 'login' | 'password') =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const keyMethod = smsFormValueHandler(key);
      keyMethod(value);
  }, [smsForm]);

  return (
    <form>
      <Box padding="8px">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              fullWidth
              id="name-sms-provider"
              type="text"
              variant="outlined"
              label="Provedor de SMS"
              value={smsForm.name}
              onChange={changeValueHandler('name')}
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              fullWidth
              id="login-sms-provider"
              type="text"
              variant="outlined"
              label="Login"
              value={smsForm.login}
              onChange={changeValueHandler('login')}
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              id="password-sms-provider"
              type="password"
              variant="outlined"
              label="Url do ícone do site"
              value={smsForm.password}
              onChange={changeValueHandler('password')}
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}
