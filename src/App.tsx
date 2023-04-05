import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
