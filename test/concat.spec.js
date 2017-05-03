var assert = require('assert')
var fs = require('fs')
var temp = require('temp')
var path = require('path')
var concat = require('.././lib/concat')

describe('Concat files module', function() {
  describe('Init', function() {
    it('Require successfuly', function() {
      var concatType = typeof concat
      var expectedType = 'function'
      assert.equal(expectedType, concatType)
    })
  })

  describe('Validates inputs', function() {
    function matchPattern(pattern){
      return function(err){
        return (err instanceof Error) && pattern.test(err)
      }
    }
    it('Thrwos an error when input paths are missing', function() {
      var pattern = /^Error: Expected array but got:/i
      assert.throws(function () { concat() }, matchPattern(pattern))
    })
    it('Thrwos an error when one input path is not string', function() {
      var pattern = /^Error: Unexpected input file path:/i
      assert.throws(function () { concat([{}]) }, matchPattern(pattern))
    })
    it('Thrwos an error when target path is missing', function() {
      var pattern = /^Error: Expected string destination but got:/i
      assert.throws(function () { concat([], '') }, matchPattern(pattern))
    })
    it('Thrwos an error when callback is not a function', function() {
      var pattern = /^Error: Expected Success callback to be a function/i
      assert.throws(function () { concat([], '1.txt') }, matchPattern(pattern))
    })
  })

  describe('Concat files', function() {
    var inputFiles = []
    var targetFile = temp.openSync().path
    var testLine = 'test:'
    var expectedContent = ''

    before(function() {
      for (var i = 1; i <= 10; i++) {
        var tempFile = temp.openSync().path
        expectedContent += testLine + i
        inputFiles.push(tempFile)
        fs.writeFileSync(tempFile, testLine + i)
      }
    })

    it('Output file has expected content', function(done) {
      concat(inputFiles, targetFile, function(){
        var actualContent = fs.readFileSync(targetFile).toString()
        assert.equal(actualContent, expectedContent)
        done()
      })
    })

  })

})
