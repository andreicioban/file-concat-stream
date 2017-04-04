(function(){
  var concat = require('./concat')
  concat(['test-files/1.txt','test-files/2.txt','test-files/3.txt'], 'test-files/out.txt', function(){ console.log('Done!');})
})()
