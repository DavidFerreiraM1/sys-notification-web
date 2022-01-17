import * as yup from 'yup';
import { createShapeValidations } from '../../utils/validations/form-validation';
import { NewAppFormType } from './interfaces';

export const newAppForm: NewAppFormType = {
  id: '',
  name: '',
}

export const newAppShapeValidations = createShapeValidations({
  name: yup.string().required('Este campo é obrigatório!'),
});
