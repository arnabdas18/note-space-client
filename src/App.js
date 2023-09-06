import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./bootstrap.min.css";
import { Footer, Header } from "./components";
import {
  LandingPage,
  MyNotes,
  LoginPage,
  RegisterPage,
  CreateNotePage,
  SingleNotePage,
} from "./pages";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
          <Route path="/createnote" element={<CreateNotePage />} />
          <Route path="/note/:noteId" element={<SingleNotePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
