import Head from 'next/head';
import styles from '../styles/Home.module.css';

import {Login} from "../src/components/login";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="intersection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Login />
      </main>

      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  )
}
