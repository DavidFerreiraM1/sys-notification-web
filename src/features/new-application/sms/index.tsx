import React from 'react';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { useNewAppFormContext } from '../context';
import { authHeader, useVibbraneoApi } from '../../../http-client/vibbraneo-api';
import { useRouter } from 'next/router';
import { useLocallStorage } from '../../../local-storage';
import { useAlerts } from '../../../shared';

export function SmsForm() {
  const {
    smsForm,
    smsFormValueHandler,
    appChannelFormOpenned,
    appChannelFormOpennedValueHandler,
    appForm,
    resetSmsForm,
  } = useNewAppFormContext();

  const changeValueHandler = React.useCallback(
    (key: 'name' | 'login' | 'password') =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const keyMethod = smsFormValueHandler(key);
      keyMethod(value);
  }, [smsForm]);

  const closeAppFormOpenned = React.useCallback(() => {
    resetSmsForm();
    appChannelFormOpennedValueHandler('');
  }, [appChannelFormOpenned]);

  const { post } = useVibbraneoApi();
  const { replace } = useRouter();
  const { userLoggedInfo } = useLocallStorage();
  const { render } = useAlerts();
  const submitForm = React.useCallback(() => {
    post(
      `apps/${appForm.id}/sms/settings`,
      {
        'settings': {
          'sms_provider': {
            'name': smsForm.name,
            'login': smsForm.login,
            'password': smsForm.password
          }
        }
      },
      authHeader()
    )
    .then( async (res) => {
      if (res.status === 200) {
        const userLogged = userLoggedInfo.get();
        render('Configuração criada com sucesso!', 'success', 3000);
        replace({
          pathname: '/app/[app-id]',
          query: {
            'app-id': appForm.id,
            'auth-token': userLogged?.token,
          }
        },
        `/app/${appForm.id}`,
        { shallow: true }
        );
      } else {
        render('Falha em salvar sua configuração, verifique os campos e tente novamente!', 'error', 4000);
      }
    })
    .catch(() => {
      render('Não foi possível criar configuração!', 'error', 4000);
    })
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
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <TextField
              fullWidth
              id="login-sms-provider"
              type="text"
              variant="outlined"
              label="Login"
              value={smsForm.login}
              onChange={changeValueHandler('login')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <TextField
              fullWidth
              id="password-sms-provider"
              type="password"
              variant="outlined"
              label="Senha"
              value={smsForm.password}
              onChange={changeValueHandler('password')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box
              width="100%"
              display="flex"
              justifyContent="flex-end"
            >
              <Box marginRight="4px">
                <Button
                  variant="text"
                  color="primary"
                  size="large"
                  onClick={closeAppFormOpenned}
                >
                  Cancelar
                </Button>
              </Box>
              <Box marginLeft="4px">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={submitForm}
                >
                  Salvar configurações
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}
