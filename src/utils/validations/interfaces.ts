import * as yup from 'yup';

export interface ResultCallback {
  errors: any;
  hasErrors: boolean;
  validateForm(callback?: (hasError: boolean) => void): void;
}

export interface FormValidationConfig {
  values: any;
  validations: Map<any, yup.AnySchema>;
}
