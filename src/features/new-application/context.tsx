import React from 'react';
import { ComponentWithChildrenProps } from '../../utils/interfaces/with-children-props';
import { AppChannelFormOpennedTypes, NewAppFormValueProvider } from './interfaces';
import { newAppForm, newSmsForm, newWebPushForm } from './utils';

const NewAppFormContext = React.createContext({} as NewAppFormValueProvider);

export function NewAppFormProvider(props: ComponentWithChildrenProps) {
  const [appChannelFormOpenned, setChannelFormOpenned] = React.useState<AppChannelFormOpennedTypes>('');
  const [appForm, setAppForm] = React.useState(newAppForm);
  const [smsForm, setSmsForm] = React.useState(newSmsForm);
  const [webPushForm, setNewWebPushForm, ] = React.useState(newWebPushForm);

  const appChannelFormOpennedValueHandler = React.useCallback((value: AppChannelFormOpennedTypes) => {
    setChannelFormOpenned(value);
  }, [appChannelFormOpenned]);

  const appFormValueHandler = React.useCallback((key: 'name' | 'id') => (value: string) => {
    setAppForm({ ...appForm, [key]: value });
  }, [appForm]);

  const webPushValueHandler = React.useCallback(
    (option: 'site' | 'allowNotification' | 'welcomeNotification', key: string) => (value: string | number) => {
    setNewWebPushForm({
      ...webPushForm,
      [option]: {
        ...webPushForm[option],
        [key]: value
      },
    });
  }, [webPushForm]);

  const smsFormValueHandler = React.useCallback((key: 'name' | 'login' | 'password') => (value: string) => {
    setSmsForm({ ...smsForm, [key]: value });
  }, [smsForm]);

  return (
    <NewAppFormContext.Provider
      value={{
        appForm,
        appChannelFormOpenned,
        appChannelFormOpennedValueHandler,
        appFormValueHandler,
        webPushForm,
        webPushValueHandler,
        smsForm,
        smsFormValueHandler
      }}
    >
      {props.children}
    </NewAppFormContext.Provider>
  )
}

export const useNewAppFormContext = () => React.useContext(NewAppFormContext);
