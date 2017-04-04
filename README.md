# file-concat-stream
Concat files using streams. Especially built for concatenating large files without running out of memory.

# Usage

```js
var concat = require('concat')

concat(['users.sql', 'profiles.sql'], 'batch.sql', function(){ console.log('Done!') })
```

# Install

-- TBA


# Tests
Tests are written using [mocha](https://github.com/mochajs/mocha).

Coverage reports using [istanbul](https://github.com/gotwarlost/istanbul).

```bash
npm test
```

# License
MIT
