import { makeStyles } from '@material-ui/core';

export const registerStyles = makeStyles((theme) => ({
  sideLeftRoot: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideRightRoot: {
    height: 'fit-content',
    '& .form-title': {
      [theme.breakpoints.down('md')]: {
        marginTop: '24px'
      },
    },
    '& .submit-area': {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      '& .cancel-btn': {
        marginRight: '8px',
      },
      '& .confirm-btn': {
        marginLeft: '8px',
      },
    }
  }
}));
