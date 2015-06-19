Package.describe({
  name: 'fongandrew:sub-error',
  summary: 'Adds reactive error var to Meteor subscription handles',
  version: '0.1.0',
  git: '' // Not really publishable yet
});

Package.onUse(function(api) {
  'use strict';

  api.versionsFrom('1.0');
  api.use('reactive-var');
  api.use('underscore');
  api.addFiles('sub_error.js', 'client');
});
