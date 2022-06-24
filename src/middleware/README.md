# About this folder

This folder contains all the express middleware. You can add your own middleware here, if required

## The error middleware
The error middleware implemented here catch any unhandled exception and send a response with status 500.

```js
// An example of error response
{ status: 500, message: 'Internal server error' }
```

If the environment differ from production, error details will be also included into response

```js
// An example of error response in an environment that is not production
{ 
    status: 500, 
    message: 'Internal server error', 
    error: {
        message: 'Error sample message',
        stack: // There will be the stacktrace of the error
    }
```