import React from 'react';
import { Box, Button, FormControl, FormLabel, Grid, Switch, TextField } from '@material-ui/core';

import { useNewAppFormContext } from '../context';
import { authHeader, useVibbraneoApi } from '../../../http-client/vibbraneo-api';
import { useRouter } from 'next/router';
import { useAlerts } from '../../../shared';
import { useLocallStorage } from '../../../local-storage';

export function WebPushForm() {
  const {
    webPushForm,
    webPushValueHandler,
    appChannelFormOpenned,
    appChannelFormOpennedValueHandler,
    appForm,
    resetWebPushForm
  } = useNewAppFormContext();

  const webPushFormChangeHandler = React.useCallback(
    (option: 'site' | 'allowNotification' | 'welcomeNotification', key: string) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const keyMethod = webPushValueHandler(option, key);
      keyMethod(value);
  }, [webPushForm]);

  const enableUrlRedirectChangeValue = React.useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    const keyMethod = webPushValueHandler('welcomeNotification', 'enableUrlRedirect');
    if(value) {
      keyMethod(0);
    } else {
      keyMethod(1);
    }
  }, [webPushForm.welcomeNotification.enableUrlRedirect]);

  const closeAppFormOpenned = React.useCallback(() => {
    resetWebPushForm();
    appChannelFormOpennedValueHandler('');
  }, [appChannelFormOpenned]);

  const { post } = useVibbraneoApi();
  const { replace } = useRouter();
  const { userLoggedInfo } = useLocallStorage();
  const { render } = useAlerts();
  const submitForm = React.useCallback(() => {
    post(
      `apps/${appForm.id}/webpushes/settings`,
      {
        'settings': {
          'site': {
            'name': webPushForm.site.name,
            'address': webPushForm.site.address,
            'url_icon': webPushForm.site.urlIcon
          },
          'allow_notification': {
            'message_text': webPushForm.allowNotification.messageText,
            'allow_button_text': webPushForm.allowNotification.allowButtonText,
            'deny_button_text': webPushForm.allowNotification.denyButtonText
          },
          'welcome_notification': {
            'message_title': webPushForm.welcomeNotification.messageTitle,
            'message_text': webPushForm.welcomeNotification.messageText,
            'enable_url_redirect': webPushForm.welcomeNotification.enableUrlRedirect,
            'url_redirect': webPushForm.welcomeNotification.urlRedirect
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
        });
      } else {
        render('Falha em salvar sua configuração, verifique os campos e tente novamente!', 'error', 4000);
      }
    })
    .catch(() => {
      render('Não foi possível criar configuração!', 'error', 4000);
    })
  }, [webPushForm]);

  return (
    <form>
      <Box padding="8px">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              fullWidth
              id="site-name"
              type="text"
              variant="outlined"
              label="Nome do site"
              value={webPushForm.site.name}
              onChange={webPushFormChangeHandler('site', 'name')}
              
              
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              fullWidth
              id="site-address"
              type="text"
              variant="outlined"
              label="Endereço do site"
              value={webPushForm.site.address}
              onChange={webPushFormChangeHandler('site', 'address')}
              
              
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              id="site-url"
              type="text"
              variant="outlined"
              label="Url do ícone do site"
              value={webPushForm.site.urlIcon}
              onChange={webPushFormChangeHandler('site', 'urlIcon')}
              
              
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              fullWidth
              id="allowNotification-messageText"
              type="text"
              variant="outlined"
              label="Texto da mensagem na notificação"
              value={webPushForm.allowNotification.messageText}
              onChange={webPushFormChangeHandler('allowNotification', 'messageText')}
              
              
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TextField
              fullWidth
              id="allowNotification-allowButtonText"
              type="text"
              variant="outlined"
              label='Texto do botão "Permitir"'
              value={webPushForm.allowNotification.allowButtonText}
              onChange={webPushFormChangeHandler('allowNotification', 'allowButtonText')}
              
              
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TextField
              fullWidth
              id="allowNotification-denyButtonText"
              type="text"
              variant="outlined"
              label='Texto do botão "Negar"'
              value={webPushForm.allowNotification.denyButtonText}
              onChange={webPushFormChangeHandler('allowNotification', 'denyButtonText')}
              
              
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TextField
              fullWidth
              id="welcomeNotification-messageTitle"
              type="text"
              variant="outlined"
              label="Título da notificação"
              value={webPushForm.welcomeNotification.messageTitle}
              onChange={webPushFormChangeHandler('welcomeNotification', 'messageTitle')}
              
              
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <FormControl>
            <FormLabel component="legend">Desabilitar/Habilitar url para redirecionamento</FormLabel>
              <Grid
                container
                component="label"
                alignItems="center"
                spacing={1}
              >
                <Grid item>Desabilitar</Grid>
                <Grid item>
                  <Switch
                    color="primary"
                    id="enable-url-redirect"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    value={webPushForm.welcomeNotification.enableUrlRedirect === 1}
                    onChange={enableUrlRedirectChangeValue}
                  />
                </Grid>
                <Grid item>Habilitar</Grid>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <TextField
              fullWidth
              id="welcomeNotification-urlRedirect"
              type="text"
              variant="outlined"
              label="Endereço do link de destino"
              value={webPushForm.welcomeNotification.urlRedirect}
              onChange={webPushFormChangeHandler('welcomeNotification', 'urlRedirect')}
              
              
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
  );
}
