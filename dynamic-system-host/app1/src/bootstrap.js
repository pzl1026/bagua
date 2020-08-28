setTimeout(() => {
  // loadComponent(aa.app4.scope, aa.app4.module, 'vue')();
  import('app4/Widget');
}, 2000);

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('app'));
