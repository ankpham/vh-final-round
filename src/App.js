import React, {useRef} from 'react';
import {Routes, BrowserRouter as Router, Route} 
from 'react-router-dom';

import './style/style.css'

import Home from './pages/Home';
import RoundSelection from './pages/RoundSelection';
import R1Home from './pages/R1Home';
import R2Home from './pages/R2Home';
import R3Home from './pages/R3Home';
import R4Home from './pages/R4Home';
import R1Selection from './pages/R1Selection';
import R2Selection from './pages/R2Selection';
import R3Selection from './pages/R3Selection';
import R4Selection from './pages/R4Selection';
import ViewQuestion from './pages/ViewQuestion';
import ViewOERAnswer from './pages/ViewOERAnswer';

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
        <Route path="/view-question/:category/:subcategory/:points/:seconds" element={<ViewQuestion/>} exact/>
        <Route path="/view-oer-question/:category/:subcategory/:points/" element={<ViewOERAnswer/>} exact/>
        <Route path="/r1-home" element={<R1Home/>} exact/>
        <Route path="/r2-home" element={<R2Home/>} exact/>
        <Route path="/r3-home" element={<R3Home/>} exact/>
        <Route path="/r4-home" element={<R4Home/>} exact/>
        <Route path="/r1-selection" element={<R1Selection/>} exact/>
        <Route path="/r2-selection" element={<R2Selection/>} exact/>
        <Route path="/r3-selection" element={<R3Selection/>} exact/>
        <Route path="/r4-selection" element={<R4Selection/>} exact/>
      </Routes>
    </Router>
    {/*remove overflow hidden to add scrollbar and access full screen button*/}
    <button ref={fullScreenButton} style={{right: '0', display: 'flex', position: 'absolute'}} onClick={() => fullscreen()}>Full Screen</button>
    </div>
  );
}

export default App;
