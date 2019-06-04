import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import HocExample from "./pages/HocExample";
import HookExample from "./pages/HookExample";
import Home from "./pages/Home";
import Counters from "./pages/Counters";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Route exact path="/" component={Home} />
              <Route path="/hoc/:token" component={HocExample} />
              <Route path="/hook/:token" component={HookExample} />
              <Route path="/counters" component={Counters} />
          </div>
      </BrowserRouter>
  );
}

export default App;
