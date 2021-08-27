import "antd/dist/antd.css";
import "../styles/globals.css";

import store from "../src/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { loadCredential } from '../src/store/actions/UserSlice';

function MyApp({ Component, pageProps }) {

  const dispatch = useDispatch();
  
  useEffect(()=> {
    (async () => {
      const {payload} = await dispatch(loadCredential({}));
      console.log("payload: ", payload.jwt);
    })();
  }, []);

  return <Component {...pageProps} />
}

export default ({ Component, pageProps })=> (
  <Provider store={store}>
    <MyApp Component={Component} pageProps={pageProps} />
  </Provider>
);