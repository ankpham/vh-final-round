import React, {useRef} from 'react';
import {Routes, BrowserRouter as Router, Route} 
from 'react-router-dom';

import './style/style.css'

import Home from './pages/Home';
import VLHome from './pages/VLHome';
import VLSelection from './pages/VLSelection';
import VLViewQuestion from './pages/VLViewQuestion';
import Selection from './pages/Selection';
import ViewQuestion from './pages/ViewQuestion';

function App() {
  const page = useRef(null);
  const fullScreenButton = useRef(null);

  
  const fullscreen = () => {
    if (page.current.requestFullscreen) {
      page.current.requestFullscreen();
    } else if (page.current.webkitRequestFullscreen) { /* Safari */
      page.current.webkitRequestFullscreen();
    } else if (page.current.msRequestFullscreen) { /* IE11 */
      page.current.msRequestFullscreen();
    }
  }

  return (
    <div ref={page} className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/selection" element={<Selection/>} exact/>
        <Route path="/vl-home" element={<VLHome/>} exact/>
        <Route path="/vl-selection" element={<VLSelection/>} exact/>
        <Route path="/vl-view-question/:category/:points" element={<VLViewQuestion/>} exact/>
        <Route path="/view-question/:category" element={<ViewQuestion/>} exact/>
      </Routes>
    </Router>
    <button ref={fullScreenButton} style={{right: '0', display: 'flex', position: 'absolute'}} onClick={() => fullscreen()}>Full Screen</button>
    </div>
  );
}

export default App;
