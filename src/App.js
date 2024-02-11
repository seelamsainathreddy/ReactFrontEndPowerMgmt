import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListConnectionComponent from './components/ListConnectionComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ViewConnectionComponent from './components/ViewConnectionComponent';
import Test from './components/Test'

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListConnectionComponent}></Route>
                          <Route path = "/connections" component = {Test}></Route>
                          <Route path = "/edit-connection/:id" component = {ViewConnectionComponent}></Route>
                          {/* <Route path = "/update-component/:id" component = {UpdateComponentComponent}></Route> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;