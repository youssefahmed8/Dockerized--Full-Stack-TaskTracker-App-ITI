import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import InternetConnectionProvider from "./InternetProvider/InternetConnectionProvider.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <InternetConnectionProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </InternetConnectionProvider>
  </Provider>
);
