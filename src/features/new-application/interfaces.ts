export interface NewAppFormType {
  name: string
};

export type AppChannelFormOpennedTypes = 'web-push' | 'sms' | 'email' | '';

export interface NewAppFormValueProvider {
  appForm: NewAppFormType;
  appChannelFormOpenned: AppChannelFormOpennedTypes;
  appChannelFormOpennedValueHandler(value: AppChannelFormOpennedTypes): void;
  appFormValueHandler(key: string): (event: React.ChangeEvent<HTMLInputElement>) => void;
};
