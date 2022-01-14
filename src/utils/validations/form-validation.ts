import React from 'react';
import * as yup from 'yup';
import { FormValidationConfig, ResultCallback } from './interfaces';

export function createShapeValidations(shapeParam: any) {
  return new Map<string, yup.AnySchema>(Object.entries(shapeParam));
}

export function useFormValidation(params: FormValidationConfig): ResultCallback{
  const { values: objValues, validations } = params;

  const [result, setResult] = React.useState(new Map());
  const [isInValid, setIsInValid] = React.useState(true);
  
  const execValidations = () => {
    const tempResult = new Map();
    Object.entries(objValues).forEach(([key, val]) => {
      if(validations.has(key)) {

        const keyToValidate = validations.get(key);
        keyToValidate?.validate(val)
        .catch(err => {
          tempResult.set(key, err.errors[0])
        })
        .finally(() => {
          setIsInValid(tempResult.size > 0);
          setResult(tempResult);
        });
      }
    });
  }

  return {
    errors: Object.fromEntries(result),
    hasErrors: isInValid,
    validateForm: execValidations
  }
}

  
