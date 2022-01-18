export interface LoginGoogleBtnRender {
  onClick: () => void;
  disabled?: boolean | undefined;
}

export interface ResponseUserLogin {
  token: string;
	user: {
    id: number;
    name: string;
    email: string;
  }
}
