import React from 'react';
import { ComponentWithChildrenProps } from '../../utils/interfaces/with-children-props';
import { AppChannelFormOpennedTypes, AppPropsPage, NewAppFormValueProvider } from './interfaces';
import { newAppForm, newEmailForm, newSmsForm, newWebPushForm } from './utils';

const NewAppFormContext = React.createContext({} as NewAppFormValueProvider);

export function NewAppFormProvider(props: ComponentWithChildrenProps & AppPropsPage) {
  const [appChannelFormOpenned, setChannelFormOpenned] = React.useState<AppChannelFormOpennedTypes>('');
  const [appForm, setAppForm] = React.useState(newAppForm);
  const [activeChannels, setActiveChannels] = React.useState({
    webpush: false,
    email: false,
    sms: false,
  })
  
  const [emailForm, setEmailForm] = React.useState(newEmailForm);
  const [smsForm, setSmsForm] = React.useState(newSmsForm);
  const [webPushForm, setNewWebPushForm, ] = React.useState(newWebPushForm);

  const appChannelFormOpennedValueHandler = React.useCallback((value: AppChannelFormOpennedTypes) => {
    setChannelFormOpenned(value);
  }, [appChannelFormOpenned]);

  const appFormValueHandler = React.useCallback((key: 'name' | 'id') => (value: string) => {
    setAppForm({ ...appForm, [key]: value });
  }, [appForm]);

  const emailFormValueHandler = React.useCallback(
    (option: 'sever' | 'sender' | 'emailTemplates', key: string) =>
    (value: string | { name: string; uri: string }) => {

      switch(option) {
        case 'emailTemplates':
          const emailTemplateSaves = emailForm.emailTemplates;
          emailTemplateSaves.push(value as { name: string; uri: string });
          setEmailForm({
            ...emailForm,
            emailTemplates: emailTemplateSaves
          });
          break;
        default:
          setEmailForm({
            ...emailForm,
            [option]: {
              ...emailForm[option],
              [key]: value,
            }
          });
          break;
      } 
  }, [emailForm]);

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

  React.useEffect(() => {
    if(props.app) {
      setAppForm({
        id: props.app.id.toString(),
        name: props.app.name,
      });

      setActiveChannels({
        webpush: props.app.activeChannels.webpush,
        sms: props.app.activeChannels.sms,
        email: props.app.activeChannels.email
      });
    }
  }, [props]);

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
        smsFormValueHandler,
        emailForm,
        emailFormValueHandler,
        activeChannels,
      }}
    >
      {props.children}
    </NewAppFormContext.Provider>
  )
}

export const useNewAppFormContext = () => React.useContext(NewAppFormContext);
