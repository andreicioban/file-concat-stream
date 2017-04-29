(function(){
  module.exports = concat

  var fs = require('fs')
  function concat(files, target, done, errFunction){
    validateInputs(files, target, done, errFunction)
    var writeStream = fs.createWriteStream(target, {flags: 'a'})
    writeFiles(files.reverse(), writeStream, done, errFunction)
  }

  function writeFiles(files, writeStream, callback, errFunction){
    if(files.length){
      var currentFile = files.pop()
      var readStream = fs.createReadStream(currentFile)
      readStream.pipe(writeStream, { end: false })
      readStream.on('error', errFunction)
      readStream.on('end', function onReadEnd(){
        writeFiles(files, writeStream, callback, errFunction)
      })
    } else {
      writeStream.end();
      callback()
    }
  }

  function validateInputs(files, target, done, errFunction){
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
    if(typeof done !== 'function' && typeof errFunction !== 'function'){
      throw new Error('Expected callback and errFunction to be functions!')
    }
  }
})()
