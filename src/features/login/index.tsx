import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import SignUpImage from '../../assets/images/sign-up.png';
import Link from 'next/link';
import Image from 'next/image';

import GoogleLogin from 'react-google-login';

import { loginStyles } from './styles';
import { LoginGoogleBtnRender, ResponseUserLogin } from './interfaces';
import { authHeader, useVibbraneoApi } from '../../http-client/vibbraneo-api';
import { useRouter } from 'next/router';
import { useAlerts } from '../../shared';
import { useLocallStorage } from '../../local-storage';

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
  const [autoLogin, setAutoLogin] = React.useState(false);
  const [formLogin, setFormLogin] = React.useState({
    email: '',
    password: ''
  });

  const autoLoginChangeHandler = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setAutoLogin(checked);
  }, [autoLogin]);

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

  // const loginGoogleBtnRender = React.useCallback((props: LoginGoogleBtnRender) => {
  //   return (
  //     <Button
  //       fullWidth
  //       size="large"
  //       variant="outlined"
  //       color="secondary"
  //       onClick={props.onClick}
  //     >
  //       Entrar com o gmail
  //     </Button>
  //   )
  // }, []);

  const loginWithGoogleSuccess = React.useCallback((response: any) => {
    console.log(response)
  }, []);

  const loginWithGoogleFailure = React.useCallback((response: any) => {
    console.log(response)
  }, []);

  const { post, get } = useVibbraneoApi();
  const { replace } = useRouter();
  const { render } = useAlerts();
  const { userLoggedInfo } = useLocallStorage();
  const submitLogin = React.useCallback(() => {
    const failureRenderAlert = () => {
      render('Não foi possível fazer login', 'error', 3000);
    };
    post('login/', formLogin)
    .then(async (res) => {
      if (res.status === 200) {
        const data: ResponseUserLogin = await res.json();
        userLoggedInfo.set({
          id: data.user.id.toString(),
          token: data.token,
          autoLogin: autoLogin
        });

        replace('/app/register');

      } else {
        failureRenderAlert();
      }
    })
    .catch(() => {
      failureRenderAlert();
    });
  }, [formLogin]);

  const autoLoginStart = React.useCallback(() => {
    const failureRenderAlert = () => {
      render('Não foi possível fazer login', 'error', 3000);
    };

    const userInfo = userLoggedInfo.get();
    if(userInfo) {
      const { id } = userInfo;
      get(`users/${id}`, authHeader())
      .then( async (res) => {
        if(res.status === 200) {
          const data = await res.json();
          setFormLogin({
            email: data.email,
            password: data.password
          });
          submitLogin();
        }
      })
      .catch(() => {
        failureRenderAlert();
      });
    } else {
      failureRenderAlert();
    }
  }, [formLogin]);

  React.useEffect(() => {
    const data = userLoggedInfo.get();
    if(data && data.autoLogin) {
      autoLoginStart();
    };
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
                onClick={submitLogin}
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Entrar
              </Button>
            </Box>
            <Box className="form-control auto-login">
              <FormControl>
                <FormControlLabel
                  label="Login automático"
                  labelPlacement="start"
                  control={
                    <Checkbox
                      color="primary"
                      name="auto-login"
                      checked={autoLogin}
                      onChange={autoLoginChangeHandler}
                    />}
                />
              </FormControl>
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
