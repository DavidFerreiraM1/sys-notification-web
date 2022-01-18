import React from 'react';
import { GetServerSideProps } from 'next';
import { NewApplicationForm } from '../../src/features';
import { useVibbraneoApi } from '../../src/http-client/vibbraneo-api';
import { AppPropsPage, ResponseDataApi } from '../../src/features/new-application/interfaces';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { get } = useVibbraneoApi();
    const badResponses = [404, 403, 404];
  
    const appId: any = context.query['app-id'];
    const res = await get(`apps/${appId}`);
    const code = res.status;
    const data: ResponseDataApi = await res.json();
  
    let appData = null;
  
    if(code === 200) {
      appData = {
        id: data['app_id'],
        name: data['app_name'],
        token: data['app_token'],
        activeChannels: {
          webpush: data['active_channels']['webpush'],
          email: data['active_channels']['email'],
          sms: data['active_channels']['sms'],
        },
      };
    }
  
    const props: AppPropsPage = { app: appData };
  
    return {
      props,
      notFound: badResponses.includes(code),
    };
  } catch (err) {
    return {
      props: {
        app: null,
      },
      notFound: true,
    };
  }
}

export default function Register(props: AppPropsPage) {
  return <NewApplicationForm {...props} />
}
