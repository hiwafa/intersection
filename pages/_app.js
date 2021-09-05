import "antd/dist/antd.css";
import "../styles/globals.css";

import store from "../src/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { loadCredential } from '../src/store/actions/UserSlice';
import Layout from "../src/components/Layout";


import { useGetIntersectionsQuery } from "../src/store/query";

function MyApp({ Component, pageProps }) {

  const dispatch = useDispatch();
  const inventories = useGetIntersectionsQuery("intersection-inventories");
  const intersections = useGetIntersectionsQuery("crash-intersections");

  useEffect(() => {

    (async () => {
      const { payload } = await dispatch(loadCredential({}));
      console.log("payload: ", payload.jwt);
    })();
    

  }, []);

  return (
    <Layout>
      <Component {...pageProps} data={{
        intersectionInventories: inventories,
        crashIntersections: intersections
      }} />
    </Layout>
  );
}

const MainApp = ({ Component, pageProps }) => (
  <Provider store={store}>
    <MyApp Component={Component} pageProps={pageProps} />
  </Provider>
);

export default MainApp;