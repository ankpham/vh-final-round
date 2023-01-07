import React, {useRef} from 'react';
import {Routes, BrowserRouter as Router, Route} 
from 'react-router-dom';

import './style/style.css'

import Home from './pages/Home';
import VLHome from './pages/VLHome';
import VLSelection from './pages/VLSelection';
import VLViewQuestion from './pages/VLViewQuestion';
import RoundSelection from './pages/RoundSelection';
import ViewQuestion from './pages/ViewQuestion';
import ViewOERQuestion from './pages/ViewOERQuestion';

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
        <Route path="/selection" element={<RoundSelection/>} exact/>
        <Route path="/vl-home" element={<VLHome/>} exact/>
        <Route path="/vl-selection" element={<VLSelection/>} exact/>
        <Route path="/vl-view-question/:category/:points" element={<VLViewQuestion/>} exact/>
        <Route path="/view-question/:category" element={<ViewQuestion/>} exact/>
        <Route path="/view-oer-question/:category" element={<ViewOERQuestion/>} exact/>
      </Routes>
    </Router>
    {/*remove overflow hidden to add scrollbar and access full screen button*/}
    <button ref={fullScreenButton} style={{right: '0', display: 'flex', position: 'absolute'}} onClick={() => fullscreen()}>Full Screen</button>
    </div>
  );
}

export default App;
