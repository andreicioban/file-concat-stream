(function(){
  module.exports = concat

  var fs = require('fs')
  function concat(files, target, onSuccess, onError){
    //Fallback for being backwards compatible
    //TODO: remove in the next major release
    var errorCb = onError || onErrorFallback
    validateInputs(files, target, onSuccess, errorCb)
    var writeStream = fs.createWriteStream(target, {flags: 'a'})
    writeFiles(files.reverse(), writeStream, onSuccess, errorCb)
  }

  function writeFiles(files, writeStream, onSuccess, onError){
    if(files.length){
      var currentFile = files.pop()
      var readStream = fs.createReadStream(currentFile)
      readStream.pipe(writeStream, { end: false })
      readStream.on('error', onError)
      readStream.on('end', function onReadEnd(){
        writeFiles(files, writeStream, onSuccess, onError)
      })
    } else {
      writeStream.end();
      onSuccess()
    }
  }

  function validateInputs(files, target, onSuccess, onError){
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
    if(typeof onSuccess !== 'function'){
      throw new Error('Expected Success callback to be a function!')
    }
  }

  function onErrorFallback(err) {
    throw err
  }
})()
