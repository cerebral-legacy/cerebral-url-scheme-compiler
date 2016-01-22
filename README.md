# cerebral-url-scheme-compiler
The url scheme compiler for Cerebral

### getCompiler
converts a path URL, string or array into an efficient getter function

```js
import getCompiler from 'cerebral-url-scheme-compiler/getCompiler';

// some action factory
export default function (fromPath) {
  // "compile" the fromPath into a getValue function
  const getValue = getCompiler(fromPath);
  // return an action
  return function myAction (args) {
    let value = getValue(args);
    // do something with value ...
  }
}
```

### setCompiler
converts a path URL, string or array into an efficient setter function

```js
import setCompiler from 'cerebral-url-scheme-compiler/setCompiler';

// some action factory
export default function (toPath) {
  // "compile" the toPath into a setValue function
  const setValue = setCompiler(toPath);
  // return an action
  return function myAction (args) {
    // do something to get the value
    setValue(args, value);
  }
}
```

## Contribute

Fork repo

* `npm install`
* `npm start` runs dev mode which watches for changes and auto lints, tests and builds
* `npm test` runs the tests
* `npm run lint` lints the code
* `npm run build` compiles es6 to es5
