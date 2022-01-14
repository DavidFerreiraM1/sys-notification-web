import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Hidden
} from '@material-ui/core';

import SignUpImage from '../../assets/images/sign-up-2.png';
import InputMask from 'react-input-mask';
import GoogleLogin from 'react-google-login';

import { registerStyles } from './styles';
import { formRegister, newUserShapeValidations } from './utils';
import { LoginGoogleBtnRender } from '../login/interfaces';
import { useFormValidation } from '../../utils/validations/form-validation';

export function Register() {
  const classes = registerStyles();
  const [formValues, setFormValues] = React.useState(formRegister);

  const { errors, validateForm } = useFormValidation({
    validations: newUserShapeValidations,
    values: formValues
  });

  const changeFormValuesHandler = React.useCallback((key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormValues({
      ...formValues,
      [key]: value
    });
  }, [formValues]);

  const submitForm = React.useCallback(() => {
    validateForm();
  }, [formValues]);

  const { replace } = useRouter();
  const cancelSubmit = React.useCallback(() => {
    replace('/')
  }, [formValues]);

  const signUpWithGoogleSuccess = React.useCallback((response: any) => {
    console.log(response);
  }, []);

  const signUpWithGoogleFailure = React.useCallback((response: any) => {
    console.log(response);
  }, []);

  const signUpGoogleBtnRender = React.useCallback((props: LoginGoogleBtnRender) => {
    return (
      <Button
        fullWidth
        size="large"
        variant="outlined"
        color="secondary"
        onClick={props.onClick}
      >
        Criar conta com o gmail
      </Button>
    )
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Hidden smDown>
          <Grid
            item
            sm={6}
            md={6}
            lg={6}
          >
            <Box className={classes.sideLeftRoot}>
              <Box>
                <Image
                  src={SignUpImage}
                  alt="sign-up"
                />
              </Box>
            </Box>
          </Grid>
        </Hidden>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          alignItems="center"
        >
          <form>
            <Grid
              container
              item
              className={classes.sideRightRoot}
              spacing={4}
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box className="form-title">
                  <Typography component="h1" variant="h6">
                    Novo usuário
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <GoogleLogin
                  clientId="538179172481-68445nh8s2h39vhur7j73g94v5roqrcj.apps.googleusercontent.com"
                  onSuccess={signUpWithGoogleSuccess}
                  onFailure={signUpWithGoogleFailure}
                  cookiePolicy="single_host_origin"
                  render={signUpGoogleBtnRender}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  id="email-input"
                  type="text"
                  variant="outlined"
                  label="Email"
                  value={formValues.email}
                  onChange={changeFormValuesHandler('email')}
                  error={errors?.email}
                  helperText={errors?.email && errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  fullWidth
                  id="user-name-input"
                  type="text"
                  variant="outlined"
                  label="Nome de usuário"
                  value={formValues.name}
                  onChange={changeFormValuesHandler('name')}
                  error={errors?.name}
                  helperText={errors?.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  fullWidth
                  id="company-name-input"
                  type="text"
                  variant="outlined"
                  label="Nome da empresa"
                  value={formValues.companyName}
                  onChange={changeFormValuesHandler('companyName')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="password-input"
                  type="password"
                  variant="outlined"
                  label="Senha"
                  value={formValues.password}
                  onChange={changeFormValuesHandler('password')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="confirm-password-input"
                  type="password"
                  variant="outlined"
                  label="Confirmar a senha"
                  value={formValues.confirmPassword}
                  onChange={changeFormValuesHandler('confirmPassword')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <InputMask
                  mask="(99) 9 9999-9999"
                  value={formValues.phoneNumber}
                  onChange={changeFormValuesHandler('phoneNumber')}
                >
                {
                  (inputProps: any) => (
                      <TextField
                      {...inputProps}
                      fullWidth
                      id="phone-input"
                      type="text"
                      variant="outlined"
                      label="Telefone"
                    />
                  )
                }
                </InputMask>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  id="address-company-input"
                  type="text"
                  variant="outlined"
                  label="Endereço da empresa"
                  value={formValues.companyAddress}
                  onChange={changeFormValuesHandler('companyAddress')}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box className="submit-area">
                  <Button
                    onClick={cancelSubmit}
                    className="cancel-btn"
                    variant="text"
                    color="primary"
                    size="large"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={submitForm}
                    className="confirm-btn"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Salvar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}
