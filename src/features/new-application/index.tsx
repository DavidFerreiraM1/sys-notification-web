import React from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Collapse,
  Snackbar
} from '@material-ui/core';
import { NewAppFormProvider, useNewAppFormContext } from './context';

import EmailIcon from '@material-ui/icons/Email';
import SmsIcon from '@material-ui/icons/Sms';
import WebIcon from '@material-ui/icons/Web';

import { newAppStyles } from './styles';
import { useFormValidation } from '../../utils/validations/form-validation';
import { newAppShapeValidations } from './utils';
import { AppChannelFormOpennedTypes, AppPropsPage } from './interfaces';
import { WebPushForm } from './web-push';
import { SmsForm } from './sms';
import { EmailForm } from './email';
import { ContainerPage, useAlerts } from '../../shared';
import { authHeader, useVibbraneoApi } from '../../http-client/vibbraneo-api';
import { useRouter } from 'next/router';

function NewAppFormComponent() {
  const classes = newAppStyles();
  const {
    appForm,
    appFormValueHandler,
    appChannelFormOpenned,
    appChannelFormOpennedValueHandler,
    activeChannels
  } = useNewAppFormContext();

  const { errors, validateForm } = useFormValidation({
    validations: newAppShapeValidations,
    values: {
      name: appForm.name
    },
  });

  const changeValueOnAppForm = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const keyMethod = appFormValueHandler('name');
    const { value } = event.target;

    keyMethod(value);
  }, [appForm]);

  const { post } = useVibbraneoApi();
  const { push } = useRouter();
  const { render } = useAlerts();

  const appChannelFormOpennedValueChange = React.useCallback(
    (appChannelName: AppChannelFormOpennedTypes) =>
    () => {
      appChannelFormOpennedValueHandler(appChannelName);
    },
  [appChannelFormOpenned]);

  const onSubmit = React.useCallback(() => {
    const renderFailureAlert = () => {
      render('Não foi possível criar o aplicativo!', 'error', 2000);
    };

    validateForm((hasErrors) => {
      if(!hasErrors) {
        post(`apps/`, { 'app_name': appForm.name }, authHeader())
        .then(async (res) => {
          const data = await res.json();
          if (res.status === 200) {
            push({
              pathname: '/app/[app-id]',
              query: {'app-id': data['app_id']}
            },
            `/app/${data['app_id']}`,
            { shallow: true }
            );
          }
          else {
            renderFailureAlert();
          }
        })
        .catch(() => {
          renderFailureAlert();
        });
      }
    });
  }, [appForm]);

  return (
    <ContainerPage>
      <Grid
        container
        className={classes.root}
      >
        <form>
          <Grid
            container
            className={classes.formContainer}
          >
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Typography
                component="h2"
                variant="h6"
              >
                {appForm.id !== '' ? 'Informações' : 'Novo Aplicativo'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Box className="form-control">
                <TextField
                  fullWidth
                  id="app-name"
                  color="primary"
                  label="Nome do aplicativo"
                  placeholder="Informe o nome de indentificação do aplicativo"
                  type="text"
                  variant="outlined"
                  value={appForm.name}
                  onChange={changeValueOnAppForm}
                  disabled={appForm.id !== ''}
                  error={errors?.name}
                  helperText={errors?.name && errors.name}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Box
                className="create-app-btn-area form-control"
              >
                <Button
                  className="create-app-btn"
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={onSubmit}
                  disabled={appForm.id !== ''}
                  fullWidth
                >
                  Criar Aplicativo
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <Grid xs={12} sm={12} md={12} lg={12}>
          <Box className={classes.dividerArea}>
            <Divider className="divider" />
          </Box>
        </Grid>
        <Grid
            container
            className={classes.formContainer}
        >
          {
            appForm.id && (
              <>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <Typography
                    component="h2"
                    variant="h6"
                    >
                    Tipos de canais
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Box component="ul" className={classes.ulServices}>
                    <Box component="li" className={classes.serviceTypeRoot}>
                      <Box
                        component={appForm.id ? 'button' : 'div'}
                        className="content"
                        onClick={appChannelFormOpennedValueChange('email')}
                      >
                        <Box className="icon-area">
                          <EmailIcon />
                        </Box>
                        <Box className="service-type-name">
                          <Typography component="span">
                            E-mail -
                          </Typography>
                          <Typography component="span" className="status-service">
                            { activeChannels.email ? 'Clique para envio manual' : 'Clique para configurar' }
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Collapse in={appChannelFormOpenned === 'email'}>
                      <EmailForm />
                    </Collapse>
                    <Box component="li" className={classes.serviceTypeRoot}>
                      <Box
                        component="button"
                        className="content"
                        onClick={appChannelFormOpennedValueChange('sms')}
                      >
                        <Box className="icon-area">
                          <SmsIcon />
                        </Box>
                        <Box className="service-type-name">
                          <Typography component="span">
                            SMS -
                          </Typography>
                          <Typography component="span" className="status-service">
                            { activeChannels.sms ? 'Clique para envio manual' : 'Clique para configurar' }
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Collapse in={appChannelFormOpenned === 'sms'}>
                      <SmsForm />
                    </Collapse>
                    <Box component="li" className={classes.serviceTypeRoot}>
                      <Box
                        component="button"
                        className="content"
                        onClick={appChannelFormOpennedValueChange('web-push')}
                      >
                        <Box className="icon-area">
                          <WebIcon />
                        </Box>
                        <Box className="service-type-name">
                          <Typography component="span">
                            Web Push -
                          </Typography>
                          <Typography component="span" className="status-service">
                            { activeChannels.webpush ? 'Clique para envio manual' : 'Clique para configurar' }
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Collapse in={appChannelFormOpenned === 'web-push'}>
                      <WebPushForm />
                    </Collapse>
                  </Box>
                </Grid>
              </>
            )
          }
        </Grid>
      </Grid>
    </ContainerPage>
  );
}

export function NewApplicationForm(props: AppPropsPage) {
  return (
    <NewAppFormProvider {...props}>
      <NewAppFormComponent />
    </NewAppFormProvider>
  )
} 
