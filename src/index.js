import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
//component file
import Home from './pages/home/Home.jsx';

//stylesheet
import "./App.css"

  ReactDOM.render(
    <React.StrictMode>
      <Router>        
          <Home />       
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );



