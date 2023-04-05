import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { PageNotFound } from "./pages/PageNotFound";
import Landing from "./pages/Landing";

const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
