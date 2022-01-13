import { makeStyles } from '@material-ui/core';

export const loginStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '64px 0',
    '& .sign-up-image': {},
    '& .avatar-box': {
      display: 'flex',
      alignItems: 'center'
    },
    '& .form-login': {
      padding: '8px',
    },
    '& .form-control': {
      margin: '8px 0',
      width: '320px'
    },
    '& .btn-link': {
     width: '100%',
     display: 'flex',
     justifyContent: 'flex-end',
     margin: '22px 0'
    },
  },
});
