import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
