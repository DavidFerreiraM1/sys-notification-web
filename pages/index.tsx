import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { Login } from '../src/features'

const LoginPage: NextPage = () => {
  return <Login />
}

export default LoginPage
