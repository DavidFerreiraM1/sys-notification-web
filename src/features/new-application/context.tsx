import React from 'react';
import { ComponentWithChildrenProps } from '../../utils/interfaces/with-children-props';
import { AppChannelFormOpennedTypes, NewAppFormValueProvider } from './interfaces';

const NewAppFormContext = React.createContext({} as NewAppFormValueProvider);

export function NewAppFormProvider(props: ComponentWithChildrenProps) {
  const [appChannelFormOpenned, setChannelFormOpenned] = React.useState<AppChannelFormOpennedTypes>('');
  const [appForm, setAppForm] = React.useState({
    name: '',
  });

  const appChannelFormOpennedValueHandler = React.useCallback((value: AppChannelFormOpennedTypes) => {
    setChannelFormOpenned(value);
  }, [appChannelFormOpenned]);

  const appFormValueHandler = React.useCallback((key: 'name') => (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppForm({
      [key]: event.target.value,
    });
  }, [appForm]);

  return (
    <NewAppFormContext.Provider
      value={{
        appForm,
        appChannelFormOpenned,
        appChannelFormOpennedValueHandler,
        appFormValueHandler
      }}
    >
      {props.children}
    </NewAppFormContext.Provider>
  )
}

export const useNewAppFormContext = () => React.useContext(NewAppFormContext);
