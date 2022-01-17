import * as yup from 'yup';
import { createShapeValidations } from '../../utils/validations/form-validation';
import { EmailFormType, NewAppFormType, SmsFormType, WebPushFormType } from './interfaces';

export const newAppForm: NewAppFormType = {
  id: '',
  name: '',
};

export const newAppShapeValidations = createShapeValidations({
  name: yup.string().required('Este campo é obrigatório!'),
});

export const newEmailForm: EmailFormType = {
  sever: {
    smtpName: '',
    smptPort: '',
    userLogin: '',
    userPassword: '',
  },
  sender: {
    name: '',
    email: '',
  },
  emailTemplates: [],
}

export const newSmsForm: SmsFormType = {
  name: '',
  login: '',
  password: '',
}

export const newWebPushForm: WebPushFormType = {
  site: {
    name: '',
    address: '',
    urlIcon: '',
  },
  allowNotification: {
    messageText: '',
    allowButtonText: '',
    denyButtonText: '',
  },
  welcomeNotification: {
    messageTitle: '',
    messageText: '',
    enableUrlRedirect: 0,
    urlRedirect: '',
  },
}
