var o_o = require("../../src/chains.js");
var console = require("console");

o_o(
  function()
  {
    var self=this;
    console.log("Setting value and wating a second...");
    setTimeout(
      function()
      {
        self.value="This is a test!";
        self.next();
      },1000);
  }
)(
  function()
  {
    console.log(this.last.value);
  }
)
();
