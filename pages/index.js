import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Analysis from './analysis';

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getUser } from '../src/store/actions/UserSlice';
import { useGetIntersectionsQuery } from '../src/store/query';
import { useEffect } from 'react';


const Home = () => {

  const router = useRouter();
  const { role, loginStatus } = useSelector(getUser);
  const { data, refetch } = useGetIntersectionsQuery("intersection-inventories");

  useEffect(()=> {
    (()=> {
      try {
        refetch();
      } catch (error) {
        
      }
    })()
  },[loginStatus]);

  useEffect(() => {
    if (![1, 3].includes(role.id)) {
      if (role.id === 4) {
        router.push("projects");
      } else {
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
        <Analysis data={data} />
      </main>
    </div>
  );

}

export default Home;