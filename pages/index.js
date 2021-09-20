import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Analysis from './analysis';

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getUser } from '../src/store/actions/UserSlice';
import { useEffect } from 'react';


const Home = () => {

  const router = useRouter();
  const { role } = useSelector(getUser);

  useEffect(() => {

    if (role.id !== "1" && role.id !== "3") {
      if (role.id === "4") {
        router.push("projects");
      }else {
        router.push("deny");
      }
    }

  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="intersection" />
        <link rel="icon" href="/favicon.ico" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css' rel='stylesheet' />
      </Head>

      <main className={styles.main} style={{ height: "100%" }}>
        <Analysis />
      </main>
    </div>
  );

}

export default Home;