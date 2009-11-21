sleuth = (function() {
  document.write('<script type="text/javascript" src="jquery"></script>');
  var $ = jQuery.noConflict(true);
  
  // represents the results of a single test
  var Results = function() {
    this.passes = [];
    this.fails = [];
  }
  
  Results.prototype = {
    pass: function() {},
    fail: function() {}
  }
  
  // the base for assertations
  var Sleuth = function(test, context) {
    this.test = test;
    this.results = this.test.results;
    this.context = $(context); 
  }
  
  Sleuth.prototype = {
    pass: function(element, message) {
      this.results.pass(element, message);
    },
    fail: function(element, message) {
      this.results.fail(element, message);
    },
    subcontext: function(func) {
      var me = this;
      this.context.each(function() {
        func.call(me, new Sleuth(me.test, $(this)));
      });
    }
  }
  
  // the test itself
  var Test = function() {
    this.context = $(document.body);
    this.results = new Results;
  }
  
  Test.prototype = new Sleuth;
  
  // test runner function runner the tests and displays results
  var testRunner = function(options, func) {
    if (typeof options == 'function') {
      func = options;
      options = {};
    }
    
    var test = new Test;
    testRunner.tests.push(test);
    func.call(window, test);
   
    // render results
  };
  
  testRunner.test = [];
  testRunner.fn = Sleuth.prototype;
  
  return testRunner;
})();
