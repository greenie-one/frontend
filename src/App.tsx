import { Routes, Route, useLocation } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import { PageNotFound } from "./pages/PageNotFound";
import { Landing } from "./pages/Landing";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";

import { validRoutes } from "./utils/constants/ValidRoutes";

const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        {validRoutes.includes(pathname) ? <Navbar /> : null}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {validRoutes.includes(pathname) ? <Footer /> : null}
      </MantineProvider>
    </>
  );
};

export default App;
