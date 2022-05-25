import { BrowserRouter, Routes, Route } from "react-router-dom";

import './css/reset.css';

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

  return (
    <UserContext.Provider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<SignIn setToken={setToken} />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/habitos" element={<Habits token={token} />} />
          <Route path="/hoje" element={<Today token={token} />} />
          <Route path="/historico" element={<History token={token} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
