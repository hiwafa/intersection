import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Login from "../src/components/Login";
import { isLoggedIn, loadCredential } from '../src/store/actions/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


import { Layout } from "antd";
import TopicMenu from "../src/components/Menu";
import SideBar from "../src/components/SideBar";
import NavBar from "../src/components/NavBar";

export default function Home() {


  const topics = ["First topic", "Second topic", "Third topic"];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");

  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };

  const Menu = (
    <TopicMenu
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

  return (
    <div className="App">
      <NavBar menu={Menu} />
      <Layout>
        <SideBar menu={Menu} />
        <Layout.Content className="content">
          {topics[contentIndex]}
        </Layout.Content>
      </Layout>
    </div>
  );


  // above is test

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
