import React from 'react';
import { Box, Button, FormControl, FormLabel, Grid, Switch, TextField } from '@material-ui/core';

import { useNewAppFormContext } from '../context';

export function WebPushForm() {
  const { webPushForm, webPushValueHandler } = useNewAppFormContext();

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
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
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
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
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
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
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
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
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
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
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
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
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
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <FormControl>
            <FormLabel component="legend">Habilitar/Desabilitar url para redirecionamento</FormLabel>
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
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
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
                >
                  Cancelar
                </Button>
              </Box>
              <Box marginLeft="4px">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
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
