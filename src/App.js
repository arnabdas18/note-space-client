import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./bootstrap.min.css";
import { Footer, Header } from "./components";
import { LandingPage } from "./pages";
import MyNotes from "./pages/MyNotesPage/MyNotes";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/mynotes" element={<MyNotes />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
