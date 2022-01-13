import React from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import SignUpImage from '../../assets/images/sign-up.png';
import Link from 'next/link';
import Image from 'next/image';

import GoogleLogin from 'react-google-login';

import { loginStyles } from './styles';
import { LoginGoogleBtnRender } from './interfaces';

const statusPasswordInput = {
  'visible': {
    type: 'text',
    icon: <Visibility />
  },
  'visible-off': {
    type: 'password',
    icon: <VisibilityOff />
  }
}

export function Login() {
  const classes = loginStyles();
  const [statusPassword, setStatusPassword] = React.useState<'visible' | 'visible-off'>('visible-off');
  const [formLogin, setFormLogin] = React.useState({
    email: '',
    password: ''
  });

  const statusPasswordHandler = React.useCallback(() => {
    statusPassword === 'visible' ? setStatusPassword('visible-off') : setStatusPassword('visible')
  }, [statusPassword]);

  const handleChange = React.useCallback((key: 'email' | 'password') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormLogin({
      ...formLogin,
      [key]: value
    });
  }, [formLogin]);

  const loginGoogleBtnRender = React.useCallback((props: LoginGoogleBtnRender) => {
    return (
      <Button
        fullWidth
        size="large"
        variant="outlined"
        color="secondary"
        onClick={props.onClick}
      >
        Entrar com o gmail
      </Button>
    )
  }, []);

  const loginWithGoogleSuccess = React.useCallback((response: any) => {
    console.log(response)
  }, []);

  const loginWithGoogleFailure = React.useCallback((response: any) => {
    console.log(response)
  }, []);

  return (
    <Container maxWidth="lg">
      <form>
        <Box className={classes.root}>
          <Box className="avatar-box">
            <Image
              className="sign-up-image"
              alt="sign-up"
              src={SignUpImage}
            />
          </Box>
          <Box className="form-login">
            <Box className="form-control">
              <GoogleLogin
                clientId="538179172481-68445nh8s2h39vhur7j73g94v5roqrcj.apps.googleusercontent.com"
                onSuccess={loginWithGoogleSuccess}
                onFailure={loginWithGoogleFailure}
                cookiePolicy="single_host_origin"
                render={loginGoogleBtnRender}
              />
            </Box>
            <Box className="form-control">
              <TextField
                fullWidth
                id="email-input"
                type="text"
                variant="outlined"
                label="Email"
                value={formLogin.email}
                onChange={handleChange('email')}
              />
            </Box>
            <Box className="form-control">
              <TextField
                fullWidth
                id="password-input"
                type={statusPasswordInput[statusPassword].type}
                variant="outlined"
                label="Senha"
                value={formLogin.password}
                onChange={handleChange('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={statusPasswordHandler}>
                        {statusPasswordInput[statusPassword].icon}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <Box className="form-control submit-btn">
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Entrar
              </Button>
            </Box>
            <Box className="form-control btn-link">
              <Link
                href="user/register"
              >
                <a>
                  Gostaria de criar uma nova conta
                </a>
              </Link>
            </Box>
          </Box>
        </Box>
      </form>
    </Container>
  )
}
