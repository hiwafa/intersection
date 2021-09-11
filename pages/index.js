import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Analys from "./analys";

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const Home = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="intersection" />
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <main className={styles.main}>
        <Analys />
      </main>
    </div>
  );

}

export default Home;