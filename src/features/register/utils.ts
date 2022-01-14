import * as yup from 'yup';
import { createShapeValidations } from '../../utils/validations/form-validation';
import { FormRegisterInterface } from './interfaces';

export const formRegister: FormRegisterInterface = {
  email: '',
  name: '',
  companyName: '',
  phoneNumber: '',
  companyAddress: '',
  password: '',
  confirmPassword: '',
};

export const newUserShapeValidations = createShapeValidations({
  email: yup.string().required('Este campo é obrigatório!'),
  name: yup.string().required('Este campo é obrigatório!'),
  password: yup.string().required('Este campo é obrigatório!'),
  confirmPassword: yup.string().required('Este campo é obrigatório!'),
});
