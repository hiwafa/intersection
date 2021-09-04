import Head from 'next/head';
import styles from '../styles/Home.module.css';

import { Layout } from 'antd';
import { useRef } from 'react';
const { Header, Footer, Sider, Content } = Layout;


const Home = () => {

  const ref = useRef();

  console.log("ref.current.offsetWidth", ref.current)

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="intersection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <main className={styles.main}> */}

        <div className={styles.row}>
          <div className={styles.column} style={{backgroundColor: 'green'}}>
            <h2>Column 1</h2>
            <p>Some text..</p>
          </div>
          <div className={styles.column} style={{backgroundColor: 'blue'}}>
            <h2>Column 2</h2>
            <p>Some text..</p>
          </div>
        </div>

      {/* </main> */}
    </div>
  );

}

export default Home;