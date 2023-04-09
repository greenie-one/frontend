import { Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { PageNotFound } from "./pages/PageNotFound";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MantineProvider>
    </>
  );
};

export default App;
