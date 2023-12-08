import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "swiper/css";
import "swiper/css/autoplay";
import App from "./App.tsx";
import store, { persistor } from "./app/store.tsx";
import "./index.css";
// import viVn from "antd/locale/vi_VN";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CookiesProvider>
    <BrowserRouter>
      {/* <ConfigProvider locale={viVn}> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      {/* </ConfigProvider> */}
    </BrowserRouter>
  </CookiesProvider>
);
