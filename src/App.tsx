import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home/home';
import { ThemeProvider } from '@mui/material';
import theme from './config/theme/theme';
import Navbar from './components/Navbar/Navbar';
import { Calendrier } from './pages/calendrier/calendrier';
import { Legume } from './models/Plante';
import AppContext from './context/AppContext';

function App() {
  const [legumes, setLegumes] = useState<Legume[]>([]);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContext.Provider value={{ legumes, setLegumes }}>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/calendrier" element={<Calendrier />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </AppContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
