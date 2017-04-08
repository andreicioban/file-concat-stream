# file-concat-stream
Concat files using streams. Especially built for concatenation of large files without running out of memory.

# Install

```shell
npm install file-concat-stream
```

# Dependencies

This package has no external dependencies and runs on `"node": ">=0.12"`.

# Usage

```js
var concat = require('concat')

concat(['users.sql', 'profiles.sql'], 'batch.sql', function(){ console.log('Done!') })
```

# Tests
Tests are written using [mocha](https://github.com/mochajs/mocha).

Coverage reports using [istanbul](https://github.com/gotwarlost/istanbul).

```bash
npm test
```

# Roadmap

* Support detection of folders in the input.
* Support patterns in the inputs.
* Add benchmarks.

# License
MIT
