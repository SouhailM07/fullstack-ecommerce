import "./style/input.css";
import "./App.css";
import { MyContainer, MyLogin } from "@/components";
import { Routes, Route } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function App() {
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
