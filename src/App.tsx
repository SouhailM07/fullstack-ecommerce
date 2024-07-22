import "./style/input.css";
import "./App.css";
import MyLogin from "./components/SINGLE-USE/MyLogin/MyLogin.js";
import { Routes, Route } from "react-router-dom";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Navbar from "./components/SINGLE-USE/Navbar/Navbar.js";
import SearchPanel from "./components/SINGLE-USE/SearchPanel/SearchPanel.js";
import Loading from "./components/SINGLE-USE/Loading/Loading.js";
import MainPage from "./components/SINGLE-USE/MainPage/MainPage.js";
import ViewProduct from "./components/SINGLE-USE/ViewProduct/ViewProduct.js";
import SearchResultsPage from "./components/SINGLE-USE/SearchResultsPage/SearchResultsPage.js";
import BillPage from "./components/SINGLE-USE/BillPage/BillPage.js";

function App() {
  return (
    <>
      <Navbar />
      <SearchPanel />
      <Loading />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="viewProduct/:id" element={<ViewProduct />} />
        <Route path="searchResults/" element={<SearchResultsPage />} />
        <Route path="billPage/" element={<BillPage />} />
        <Route path="login" element={<MyLogin />} />
        <Route
          path="/sso-callback"
          element={<AuthenticateWithRedirectCallback />}
        />
      </Routes>
    </>
  );
}
export default App;
