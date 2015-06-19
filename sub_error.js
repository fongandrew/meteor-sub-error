(function() {
  'use strict';

  var origSubscribe = Meteor.subscribe;

  Meteor.subscribe = function() {
    var params = _.toArray(arguments);

    // Ensure last param is a callback object
    var lastParam = params[params.length - 1];
    if (_.isFunction(lastParam)) {
      params[params.length - 1] = {
        onReady: lastParam
      };
    } 
    else if (! _.any([lastParam.onReady, lastParam.onStop], _.isFunction)) {
      params.push({});
    }
    var callbacks = params[params.length - 1];

    var sub; // This will point to newly created subscription object

    // Override onStop callback
    var origOnStop = callbacks.onStop;    
    callbacks.onStop = function(err) {
      if (err) {
        console.error(err);
        if (sub && sub._errorRV) {
          sub._errorRV.set(true);
        }
      }
      if (_.isFunction(origOnStop)) {
        origOnStop.apply(null, arguments);
      }
    };

    // Call original subscribe and add some helpers to the new object.
    sub = origSubscribe.apply(this, params);
    sub._errorRV = new ReactiveVar(false);    
    if (! sub.error) {
      sub.error = function() {
        return this._errorRV && this._errorRV.get();
      };
    }
    
    return sub;
  }; 
})();