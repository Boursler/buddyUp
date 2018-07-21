
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import './main.html';

import App from '../imports/ui/App.js';
import '../imports/startup/client/useraccounts-configuration';


Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});

eventApi = meteor.subscribe('apiCall');
