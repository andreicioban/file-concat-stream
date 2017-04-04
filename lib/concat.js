(function(){
  module.exports = concat

  var fs = require('fs')
  function concat(files, target, done){
    validateInputs(files, target, done)
    var writeStream = fs.createWriteStream(target, {flags: 'a'})
    writeFiles(files.reverse(), writeStream, done)
  }

  function writeFiles(files, writeStream, callback){
    if(files.length){
      var currentFile = files.pop()
      var readStream = fs.createReadStream(currentFile)
      readStream.pipe(writeStream, { end: false })
      readStream.on('error', onError)
      readStream.on('end', function onReadEnd(){
        writeFiles(files, writeStream, callback)
      })
    } else {
      writeStream.end();
      callback()
    }
  }

  function validateInputs(files, target, done){
    if(!(files instanceof Array)){
      throw new Error('Expected array but got:', files)
    }
    files.forEach(function(f){
      if(f && f.constructor !== String){
        throw new Error('Unexpected input file path:', f)
      }
    })
    if(target.constructor !== String || target.length === 0){
      throw new Error('Expected string destination but got:', target)
    }
    if(typeof done !== 'function'){
      throw new Error('Expected callback to bea function but got:', done)
    }
  }
  function onError(err) {
    throw err
  }
})()
