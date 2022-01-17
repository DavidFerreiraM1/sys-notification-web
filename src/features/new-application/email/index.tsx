import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField
} from '@material-ui/core';
import { useNewAppFormContext } from '../context';

export function EmailForm() {
  const { emailForm, emailFormValueHandler } = useNewAppFormContext();
  
  const emailFormChangeHandler = React.useCallback(
    (option: 'sever' | 'sender' | 'emailTemplates', key: string) => 
    ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => {
      const method = emailFormValueHandler(option, key);
      method(value.toString());
  }, [emailForm]);

  return (
    <Box padding="8px">
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <TextField
              fullWidth
              id="sever-smtp-name"
              type="text"
              variant="outlined"
              label="Nome do servidor SMTP"
              value={emailForm.sever.smtpName}
              onChange={emailFormChangeHandler('sever', 'smtpName')}
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <TextField
              fullWidth
              id="sever-smtp-port"
              type="number"
              variant="outlined"
              label="Porta do servidor SMTP"
              value={emailForm.sever.smptPort}
              onChange={emailFormChangeHandler('sever', 'smptPort')}
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              fullWidth
              id="sever-smtp-login"
              type="text"
              variant="outlined"
              label="Login para o servidor"
              value={emailForm.sever.userLogin}
              onChange={emailFormChangeHandler('sever', 'userLogin')}
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              fullWidth
              id="sever-smtp-password"
              type="password"
              variant="outlined"
              label="Senha para o servidor"
              value={emailForm.sever.userPassword}
              onChange={emailFormChangeHandler('sever', 'userPassword')}
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              fullWidth
              id="sender-name"
              type="text"
              variant="outlined"
              label="Nome do remetente"
              value={emailForm.sender.name}
              onChange={emailFormChangeHandler('sender', 'name')}
              // error={errors?.email}
              // helperText={errors?.email && errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              fullWidth
              id="sender-email"
              type="text"
              variant="outlined"
              label="Email do remetente"
              value={emailForm.sender.email}
              onChange={emailFormChangeHandler('sender', 'email')}
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
    </Box>
  );
}
