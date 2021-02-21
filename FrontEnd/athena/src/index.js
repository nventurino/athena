import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './App';
import Dashboard from './AppDashboard';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Route, Switch, useParams} from "react-router-dom"

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// console.log('location', location)

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/"  component={Home}/>
      <Route exact path="/dashboard/:type?/:extension?/:uniqueId?"  component={Dashboard}/>
    </Switch>
  </BrowserRouter>
)

// ReactDOM.render(<App/>, document.getElementById('root'));


let app = document.getElementById('root');
if (app) {
    // 1. Set up the browser history with the updated location
    // (minus the # sign)
	const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
	if (path) {
		history.replace(path);
	}

    // 2. Render our app
	ReactDOM.render(<App />, app);
}
