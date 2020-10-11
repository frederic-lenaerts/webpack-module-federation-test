import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

const el = document.createElement("div");

ReactDOM.render(React.createElement(App), el);

document.body.appendChild(el);