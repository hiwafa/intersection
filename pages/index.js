import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Login from "../src/components/Login";
import { isLoggedIn, loadCredential } from '../src/store/actions/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';



export default function Home() {

  const checkLogin = useSelector(isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {

    (async () => {
      const {payload} = await dispatch(loadCredential({}));
      console.log("payload: ", payload);
    })();

  }, []);

  if (checkLogin === 'loading') return (
    <div className={styles.container}>
      <Head>
        <title>Intersection</title>
        <meta name="description" content="intersection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        loading ...
      </main>

      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );

  if (checkLogin === "loaded") return (
    <div className={styles.container}>
      <Head>
        <title>Register Your Self</title>
        <meta name="description" content="intersection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Welcome you logged in
      </main>

      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Intersection</title>
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
  );

}
