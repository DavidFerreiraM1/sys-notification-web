import * as yup from 'yup';
import { createShapeValidations } from '../../utils/validations/form-validation';
import { NewAppFormType, WebPushFormType } from './interfaces';

export const newAppForm: NewAppFormType = {
  id: '',
  name: '',
}

export const newAppShapeValidations = createShapeValidations({
  name: yup.string().required('Este campo é obrigatório!'),
});

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
