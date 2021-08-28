import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="intersection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Welcome you logged in
      </main>
    </div>
  );

}

export default Home;