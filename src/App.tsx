import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthStep1 from "./components/authorization/auth-step1";
import AuthStep2 from "./components/authorization/auth-step2";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-full items-center justify-center">
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in-step1" replace />} />
          <Route path="/sign-in-step1" element={<AuthStep1 />} />
          <Route path="/sign-in-step2" element={<AuthStep2 />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
