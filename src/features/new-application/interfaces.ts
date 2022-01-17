export interface NewAppFormType {
  id: string;
  name: string;
};

export type AppChannelFormOpennedTypes = 'web-push' | 'sms' | 'email' | '';

export interface NewAppFormValueProvider {
  appForm: NewAppFormType;
  webPushForm: WebPushFormType;
  appChannelFormOpenned: AppChannelFormOpennedTypes;
  appChannelFormOpennedValueHandler(value: AppChannelFormOpennedTypes): void;
  appFormValueHandler(key: string): (value: string) => void;
  webPushValueHandler(option: 'site' | 'allowNotification' | 'welcomeNotification', key: string): (value: string | number) => void;
};

export interface WebPushFormType {
  site: {
    name: string;
    address: string;
    urlIcon: string;
  };
  allowNotification: {
    messageText: string;
    allowButtonText: string;
    denyButtonText: string;
  };
  welcomeNotification: {
    messageTitle: string;
    messageText: string;
    enableUrlRedirect: number;
    urlRedirect: string;
  };
}

