// design
import "./index.css";

// react stuff
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Create from "./pages/Create";
import Event from "./pages/Event";
import Calendar from "./pages/Calender";
import Impressum from "./pages/Impressum";
import VierNullVier from "./pages/VierNullVier";

// components
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";

// context
import { LoginAuthContextProvider } from "./context/LoginAuthContext";
import { FilterOptionContextProvider } from "./context/FilterOptionContext";
import { MenuContextProvider } from "./context/MobileNavBarContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      <LoginAuthContextProvider>
        <FilterOptionContextProvider>
          <MenuContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/event/:id" element={<Event />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="*" element={<VierNullVier />} />
          </Routes>
          </MenuContextProvider>
        </FilterOptionContextProvider>
      </LoginAuthContextProvider>
      <Footer />
  </BrowserRouter>
);
