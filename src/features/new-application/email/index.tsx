import React from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { useNewAppFormContext } from '../context';
import { authHeader, useVibbraneoApi } from '../../../http-client/vibbraneo-api';
import { useRouter } from 'next/router';
import { useLocallStorage } from '../../../local-storage';
import { useAlerts } from '../../../shared';

export function EmailForm() {
  const {
    emailForm,
    emailFormValueHandler,
    appChannelFormOpenned,
    appChannelFormOpennedValueHandler,
    removeEmailTemplate,
    resetEmailForm,
    appForm
  } = useNewAppFormContext();

  const [template, setTemplate] = React.useState({name: '', uri: ''});
  
  const emailFormChangeHandler = React.useCallback(
    (option: 'sever' | 'sender' | 'emailTemplates', key: string) => 
    ({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => {
      const method = emailFormValueHandler(option, key);
      method(value.toString());
  }, [emailForm]);

  const closeAppFormOpenned = React.useCallback(() => {
    resetEmailForm();
    appChannelFormOpennedValueHandler('');
  }, [appChannelFormOpenned]);

  const templateValueHandler = React.useCallback(() => {
    const changeValue = (key: 'name' | 'uri') => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setTemplate({
        ...template,
        [key]: value
      });
    };

    const addTemplate = () => {
      const method = emailFormValueHandler('emailTemplates', '');
      method({ name: template.name, uri: template.uri, code: Math.floor(Math.random() * 2000) });
      setTemplate({ name: '', uri: '' });
    };

    const removeItem = (codeParam: number) => () => {
      removeEmailTemplate(codeParam);
    }

    return {
      changeValue,
      addTemplate,
      removeItem
    }

  }, [template, emailForm]);

  const { post } = useVibbraneoApi();
  const { replace } = useRouter();
  const { userLoggedInfo } = useLocallStorage();
  const { render } = useAlerts();
  const submitForm = React.useCallback(() => {
    post(
      `apps/${appForm.id}/emails/settings`,
      {
        'settings': {
          'sever': {
            'smtp_name': emailForm.sever.smtpName,
            'smpt_port': emailForm.sever.smptPort,
            'user_login': emailForm.sever.userLogin,
            'user_password': emailForm.sever.userPassword
          },
          'sender': {
            'name': emailForm.sender.name,
            'email': emailForm.sender.email
          },
          'email_templates': emailForm.emailTemplates.map((item) => ({ 'name': item.name, 'uri': item.uri })),
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
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box padding="0px 8px">
              <Typography>Adicionar Templates</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <TextField
              fullWidth
              id="template-name"
              type="text"
              variant="outlined"
              label="Nome do template"
              value={template.name}
              onChange={templateValueHandler().changeValue('name')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <TextField
              fullWidth
              id="template-uri"
              type="text"
              variant="outlined"
              label="URI do template"
              value={template.uri}
              onChange={templateValueHandler().changeValue('uri')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={2}>
            <Box
              height="100%"
            >
              <Button
                style={{ height: '56px' }}
                variant="contained"
                color="primary"
                fullWidth
                onClick={templateValueHandler().addTemplate}
                disabled={(template.name === '') || (template.uri === '')}
              >
                Adicionar
              </Button>
            </Box>
          </Grid>
            {
              emailForm.emailTemplates.length > 0 && (
                <Grid container xs={12} sm={12} md={12} lg={12}>
                  <Box padding="8px" width="100%">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Box padding="16px 8px">
                        <Typography>Templates</Typography>
                      </Box>
                    </Grid>
                    <Box width="100%" padding="0 16px">
                      {
                        emailForm.emailTemplates.map((item, key) => {
                          return (
                            <Grid key={key} container xs={12} sm={12} md={12} lg={12}>
                              <Grid item xs={12} sm={12} md={5} lg={5}>
                                <Typography component="span"><strong>Nome - </strong></Typography>
                                <Typography component="span">{item.name}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={12} md={5} lg={5}>
                              <Typography component="span"><strong>URI - </strong></Typography>
                                <Typography component="span">{item.uri}</Typography>
                              </Grid>
                              <Grid>
                                <Button onClick={templateValueHandler().removeItem(item.code)} >
                                  remover
                                </Button>
                              </Grid>
                            </Grid>
                          )
                        })
                      }
                    </Box>
                  </Box>
                </Grid>
              )
            }
          
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box
              width="100%"
              display="flex"
              justifyContent="flex-end"
              padding="32px 0"
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
    </Box>
  );
}
