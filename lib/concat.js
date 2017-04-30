(function(){
  module.exports = concat

  var fs = require('fs')
  function concat(files, target, onSuccess, onError){
    validateInputs(files, target, onSuccess, onError)
    var writeStream = fs.createWriteStream(target, {flags: 'a'})
    writeFiles(files.reverse(), writeStream, onSuccess, onError)
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
    if(typeof onSuccess !== 'function' && typeof onError !== 'function'){
      throw new Error('Expected onSuccess and onError to be functions!')
    }
  }
})()
