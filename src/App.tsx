import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@mui/material';
import theme from './config/theme/theme';
import Navbar from './components/Navbar/Navbar';
import { Legume } from './models/Plante';
import AppContext from './context/AppContext';
import { RoutesApp } from './RoutesApp';

function App() {
  const [legumes, setLegumes] = useState<Legume[]>([]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <AppContext.Provider value={{ legumes, setLegumes }}>
            <Navbar />
            <RoutesApp />
          </AppContext.Provider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
