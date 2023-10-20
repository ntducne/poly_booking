import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import store, { persistor } from './app/store.tsx';
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';
import "swiper/css"
import "swiper/css/autoplay"
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter >
  </CookiesProvider>
)
