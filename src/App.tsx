import { Route, Routes } from "react-router";
import "./App.css";
import AuthStep1 from "./components/authorization/auth-step1";
import AuthStep2 from "./components/authorization/auth-step2";

function App() {
  return (
    <div className="flex h-full items-center justify-center">
      <Routes>
        <Route index element={<AuthStep1 />} />
        <Route path="/sign-in-step1" element={<AuthStep1 />} />
        <Route path="/sign-in-step2" element={<AuthStep2 />} />
      </Routes>
    </div>
  );
}

export default App;
