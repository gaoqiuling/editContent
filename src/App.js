import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import './App.css'
import AppRouters from './routers'

function App() {
  return (
    <BrowserRouter>
      <AppRouters />
    </BrowserRouter>
  );
}

export default App;