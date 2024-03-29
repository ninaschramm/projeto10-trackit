import { BrowserRouter, Routes, Route } from "react-router-dom";

import './css/reset.css';
import Loader from "react-loader-spinner";


import UserContext from "./contexts/UserContext";
import { useState } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Today from "./Today";
import Habits from "./Habits";
import History from "./History";
import Header from "./Header";
import Footer from "./Footer";

function App() {

  
  const [token, setToken] = useState("");
  const [pic, setPic] = useState("");
  const [showHeader, setShowHeader] = useState("");
  const [percent, setPercent] = useState("");
  const contextValue = { token, setToken, pic, setPic, showHeader, setShowHeader, percent, setPercent };

  return (
    <UserContext.Provider value={ contextValue } >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/habitos" element={<Habits />} />
          <Route path="/hoje" element={<Today />} />
          <Route path="/historico" element={<History />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
