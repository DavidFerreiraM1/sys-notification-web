export interface NewAppFormType {
  id: string;
  name: string;
};

export type AppChannelFormOpennedTypes = 'web-push' | 'sms' | 'email' | '';

export interface NewAppFormValueProvider {
  appForm: NewAppFormType;
  appChannelFormOpenned: AppChannelFormOpennedTypes;
  appChannelFormOpennedValueHandler(value: AppChannelFormOpennedTypes): void;
  appFormValueHandler(key: string): (value: string) => void;
};
