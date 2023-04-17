import { Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { PageNotFound } from "./pages/PageNotFound";
import { Landing } from "./pages/Landing";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";

const App = () => {
    return (
        <>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
            </MantineProvider>
        </>
    );
};

export default App;
