import { makeStyles } from '@material-ui/core';

export const newAppStyles = makeStyles((theme) => ({
  root: {
    '& h2': {
      fontFamily: "'Ubuntu', sans-serif",
    },
    '& form': {
      width: '100%',
      '& .form-control': {
        padding: '16px 8px'
      },
      '& .create-app-btn-area': {
        height: '100%',
        '& .create-app-btn': {
          height: '56px'
        }
      },
    }
  },
  formContainer: {
    padding: '16px 8px',
  },
  dividerArea: {
    padding: '8px 8px',
    '& .divider': {
      height: '2px',
      backgroundColor: '#C4C4C4'
    }
  },
  ulServices: {
    listStyleType: 'none',
    padding: '0 0px'
  },
  serviceTypeRoot: {
    width: '260px',
    padding: '0px',
    margin: '8px 0',
    '& .content': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: '0px 8px'
    },
    '& .icon-area': {
      padding: '4px 0px',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        fontSize: '24px',
        color: '#505554',
      }
    },
    '& .service-type-name': {
      margin: '0px 8px',
      '& span': {
        fontFamily: "'Ubuntu', sans-serif",
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '18px',
        color: '#505554',
      },
  
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      '& .status-service': {
        margin: '0px 4px'
      },
    }
  }
}));
