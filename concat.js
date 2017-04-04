(function(){
  module.exports = concat

  var fs = require('fs')
  function concat(files, target, done){
    validateInputs(files, target)
    var writeStream = fs.createWriteStream(target, {flags: 'a'})
    writeFiles(files.reverse(), writeStream, done)
  }

  function writeFiles(files, writeStream, callback){
    if(files.length){
      var currentFile = files.pop()
      var readStream = fs.createReadStream(currentFile)
      readStream.pipe(writeStream, { end: false })
      readStream.on('error', function (err) {
        throw err
      })
      readStream.on('end', function(){
        writeFiles(files, writeStream, callback)
      })
    } else {
      writeStream.end();
      callback()
    }
  }

  function validateInputs(files, target){
    if(!(files instanceof Array)){
      throw new Error('Expected array but got:', files)
    }
    if(target.constructor !== String){
      throw new Error('Expected string destination but got:', target)
    }
  }
})()
