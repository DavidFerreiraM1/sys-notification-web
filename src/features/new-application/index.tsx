import React from 'react';
import { Box, Button, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { NewAppFormProvider } from './context';

import EmailIcon from '@material-ui/icons/Email';
import SmsIcon from '@material-ui/icons/Sms';
import WebIcon from '@material-ui/icons/Web';

import { newAppStyles } from './styles';

function NewAppFormComponent() {
  const classes = newAppStyles();

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
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Box component="ul" className={classes.ulServices}>
            <Box component="li" className={classes.serviceTypeRoot}>
              <Box component="button" className="content">
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
              <Box component="button" className="content">
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
            <Box component="li" className={classes.serviceTypeRoot}>
              <Box component="button" className="content">
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
