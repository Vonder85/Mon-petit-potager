import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home/home";
import { ThemeProvider } from "@mui/material";
import theme from "./config/theme/theme";
import Navbar from "./components/Navbar/Navbar";
import { Calendrier } from "./pages/calendrier/calendrier";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path='/calendrier' element={<Calendrier />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
