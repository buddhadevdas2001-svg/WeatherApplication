import { Routes, Route, BrowserRouter } from "react-router-dom";
import Weather from "../pages/Weather";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
