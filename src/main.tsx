import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext";
import App from "./App";
import "./assets/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </MantineProvider>
  </BrowserRouter>
);
