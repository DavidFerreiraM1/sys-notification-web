import React from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Collapse
} from '@material-ui/core';
import { NewAppFormProvider, useNewAppFormContext } from './context';

import EmailIcon from '@material-ui/icons/Email';
import SmsIcon from '@material-ui/icons/Sms';
import WebIcon from '@material-ui/icons/Web';

import { newAppStyles } from './styles';
import { useFormValidation } from '../../utils/validations/form-validation';
import { newAppShapeValidations } from './utils';
import { AppChannelFormOpennedTypes } from './interfaces';
import { WebPushForm } from './web-push';
import { SmsForm } from './sms';

function NewAppFormComponent() {
  const classes = newAppStyles();
  const {
    appForm,
    appFormValueHandler,
    appChannelFormOpenned,
    appChannelFormOpennedValueHandler
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

  const onSubmit = React.useCallback(() => {
    validateForm();
    // alert('CRIANDO APP: ' + appForm.name);
  }, [appForm]);

  const appChannelFormOpennedValueChange = React.useCallback(
    (appChannelName: AppChannelFormOpennedTypes) =>
    () => {
      appChannelFormOpennedValueHandler(appChannelName);
    },
  [appChannelFormOpenned]);

  return (
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
              Novo Aplicativo
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
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={appForm.name}
                onChange={changeValueOnAppForm}
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
                component="button"
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
                    (Configurar)
                  </Typography>
                </Box>
              </Box>
            </Box>
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
                    (Configurar)
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
                    (Configurar)
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Collapse in={appChannelFormOpenned === 'web-push'}>
              <WebPushForm />
            </Collapse>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export function NewApplicationForm() {
  return (
    <NewAppFormProvider>
      <NewAppFormComponent />
    </NewAppFormProvider>
  )
} 
