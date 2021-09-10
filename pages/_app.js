import "antd/dist/antd.css";
import "../styles/globals.css";

import store from "../src/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { loadCredential } from '../src/store/actions/UserSlice';
import Layout from "../src/components/Layout";


function MyApp({ Component, pageProps }) {

  const dispatch = useDispatch();
  useEffect(() => {

    (async () => {
      // const { payload } = 
      await dispatch(loadCredential(null));
    })();
    

  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

const MainApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <MyApp Component={Component} pageProps={pageProps} />
  </Provider>
);

export default MainApp;