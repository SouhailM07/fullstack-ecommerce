import "./style/input.css";
import "./App.css";
import { MyContainer, MyLogin } from "@/components";
import { Routes, Route } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { useEffect } from "react";
import loadingStore from "./zustand/loading.store.js";
function App() {
  const { loading } = loadingStore((state) => state);
  const body = document.body as HTMLBodyElement;

  useEffect(() => {
    body.className = loading ? "overflow-hidden" : "overflow-visible";
  }, [loading]);
  return (
    <Routes>
      <Route path="/*" element={<MyContainer />} />
      <Route path="login" element={<MyLogin />} />
      <Route
        path="/sso-callback"
        element={<AuthenticateWithRedirectCallback />}
      />
    </Routes>
  );
}
export default App;
