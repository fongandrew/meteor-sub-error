#sub-error
Meteor's subscription handles have a `ready` function that reactively updates
when the subscription is ready, but not when there was an error during
subscription. This package adds an `error` function that functions similarly
to `ready`.

Installation
------------
`meteor add fongandrew:sub-error`

Usage
-----
The handle returned by `Meteor.subscribe()` now has a reactive `error` 
function, similarly to `ready`. It will return true if the subscription
has errored out.
