
module("no execution map")
/**
 * This tests execution of synchronous anonymous functions
 */
test("anonymous functions, synchronous, no execution map",
  function()
  {
    expect(9);
    o_o
    (
      function()
      {
        ok(true,"anonymous function 1 execute");
        this.result = 1;
        this.data_object = { test: "value 1" };
        this.next();
      }
    )(
      function()
      {
        ok(true,"anonymous function 2 execute");
        this.result = 2;
        this.data_object = { test: "value 2" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        this.next();
      }
    )(
      function()
      {
        ok(true,"anonymous function 3 execute");
        ok(this.last.result==2,"previous link result");
        ok(this.last.data_object.test=="value 2","previous link data object result");
        ok(this.last.last.result==1,"previous previous link result");
        ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
        this.next();
      }
    )
    ();
  }
);

/**
 * This tests execution of synchronous aliased functions
 */
test("aliased functions, synchronous, no execution map",
  function()
  {
    expect(9);
    o_o
    (
      "function1",
      function()
      {
        ok(true,"aliased function 1 execute");
        this.result = 1;
        this.data_object = { test: "value 1" };
        this.next();
      }
    )(
      "function2",
      function()
      {
        ok(true,"aliased function 2 execute");
        this.result = 2;
        this.data_object = { test: "value 2" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        this.next();
      }
    )(
      "function3",
      function()
      {
        ok(true,"aliased function 3 execute");
        ok(this.last.result==2,"previous link result");
        ok(this.last.data_object.test=="value 2","previous link data object result");
        ok(this.last.last.result==1,"previous previous link result");
        ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
        this.next();
      }
    )
    ();
  }
);

/**
 * This tests execution of synchronous named functions
 */
test("named functions, synchronous, no execution map",
  function()
  {
    function function1()
    {
      ok(true,"named function 1 execute");
      this.result = 1;
      this.data_object = { test: "value 1" };
      this.next();
    }

    function function2()
    {
      ok(true,"named function 2 execute");
      this.result = 2;
      this.data_object = { test: "value 2" };
      ok(this.last.result==1,"previous link result");
      ok(this.last.data_object.test=="value 1","previous link data object result");
      this.next();
    }

    function function3()
    {
      ok(true,"named function 3 execute");
      ok(this.last.result==2,"previous link result");
      ok(this.last.data_object.test=="value 2","previous link data object result");
      ok(this.last.last.result==1,"previous previous link result");
      ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
      this.next();
    }

    expect(9);
    o_o
    (
      function1
    )(
      function2
    )(
      function3
    )
    ();
  }
);

/**
 * This tests execution of asynchronous anonymous functions
 */
asyncTest("anonymous functions, asynchronous, no execution map",
  function()
  {
    expect(9);
    o_o
    (
      function()
      {
        ok(true,"anonymous function 1 execute");
        this.result = 1;
        this.data_object = { test: "value 1" };
        setTimeout(this.next, 1);
      }
    )(
      function()
      {
        ok(true,"anonymous function 2 execute");
        this.result = 2;
        this.data_object = { test: "value 2" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        var next = this.next;
        setTimeout(
          function()
          {
            next();
          }, 1);
      }
    )(
      function()
      {
        ok(true,"anonymous function 3 execute");
        ok(this.last.result==2,"previous link result");
        ok(this.last.data_object.test=="value 2","previous link data object result");
        ok(this.last.last.result==1,"previous previous link result");
        ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
        setTimeout(this.next, 1);
        start();
      }
    )
    ();
  }
);

/**
 * This tests execution of asynchronous anonymous functions
 */
asyncTest("aliased functions, asynchronous, no execution map",
  function()
  {
    expect(9);
    o_o
    (
      "function1",
      function()
      {
        ok(true,"anonymous function 1 execute");
        this.result = 1;
        this.data_object = { test: "value 1" };
        setTimeout(this.next, 1);
      }
    )(
      "function2",
      function()
      {
        ok(true,"anonymous function 2 execute");
        this.result = 2;
        this.data_object = { test: "value 2" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        var next = this.next;
        setTimeout(
          function()
          {
            next();
          }, 1);
      }
    )(
      "function3",
      function()
      {
        ok(true,"anonymous function 3 execute");
        ok(this.last.result==2,"previous link result");
        ok(this.last.data_object.test=="value 2","previous link data object result");
        ok(this.last.last.result==1,"previous previous link result");
        ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
        setTimeout(this.next, 1);
        start();
      }
    )
    ();
  }
);

/**
 * This tests execution of asynchronous anonymous functions
 */
asyncTest("named functions, asynchronous, no execution map",
  function()
  {
    function function1()
    {
      ok(true,"named function 1 execute");
      this.result = 1;
      this.data_object = { test: "value 1" };
      setTimeout(this.next, 1);
    }

    function function2()
    {
      ok(true,"named function 2 execute");
      this.result = 2;
      this.data_object = { test: "value 2" };
      ok(this.last.result==1,"previous link result");
      ok(this.last.data_object.test=="value 1","previous link data object result");
      setTimeout(this.next, 1);
    }

    function function3()
    {
      ok(true,"named function 3 execute");
      ok(this.last.result==2,"previous link result");
      ok(this.last.data_object.test=="value 2","previous link data object result");
      ok(this.last.last.result==1,"previous previous link result");
      ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
      setTimeout(this.next, 1);
      start();
    }

    expect(9);
    o_o
    (
      function1
    )(
      function2
    )(
      function3
    )
    ();
  }
);

/**
 * All execution flow with maps
 */
module("execution map");
/**
 * This tests execution of synchronous aliased functions
 */
test("aliased functions, synchronous, execution map",
  function()
  {
    o_o
    (
      "function3",
      function()
      {
        ok(true,"aliased function 3 execute");
        ok(this.last.result==2,"previous link result");
        ok(this.last.data_object.test=="value 2","previous link data object result");
        ok(this.last.last.result==1,"previous previous link result");
        ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
        this.next();
      }
    )(
      "function2",
      function()
      {
        ok(true,"aliased function 2 execute");
        this.result = 2;
        this.data_object = { test: "value 2" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        this.next();
      }
    )(
      "function1",
      function()
      {
        ok(true,"aliased function 1 execute");
        this.result = 1;
        this.data_object = { test: "value 1" };
        this.next();
      }
    )
    (
      {
        "function1": "function2",
        "function2": "function3"
      }
    )
    ();
  }
);

/**
 * This tests execution of synchronous named functions
 */
test("named functions, synchronous, execution map",
  function()
  {
    function function1()
    {
      ok(true,"named function 1 execute");
      this.result = 1;
      this.data_object = { test: "value 1" };
      this.next();
    }

    function function2()
    {
      ok(true,"named function 2 execute");
      this.result = 2;
      this.data_object = { test: "value 2" };
      ok(this.last.result==1,"previous link result");
      ok(this.last.data_object.test=="value 1","previous link data object result");
      this.next();
    }

    function function3()
    {
      ok(true,"named function 3 execute");
      ok(this.last.result==2,"previous link result");
      ok(this.last.data_object.test=="value 2","previous link data object result");
      ok(this.last.last.result==1,"previous previous link result");
      ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
      this.next();
    }

    expect(9);
    o_o
    (
      function3
    )(
      function2
    )(
      function1
    )(
      {
        "function1": "function2",
        "function2": "function3"
      }
    )();
  }
);

/**
 * This tests execution of asynchronous anonymous functions
 */
asyncTest("aliased functions, asynchronous, execution map",
  function()
  {
    o_o
    (
      "function3",
      function()
      {
        ok(true,"aliased function 3 execute");
        ok(this.last.result==2,"previous link result");
        ok(this.last.data_object.test=="value 2","previous link data object result");
        ok(this.last.last.result==1,"previous previous link result");
        ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
        setTimeout(this.next,1);
        start();
      }
    )(
      "function2",
      function()
      {
        ok(true,"aliased function 2 execute");
        this.result = 2;
        this.data_object = { test: "value 2" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        setTimeout(this.next,1);
      }
    )(
      "function1",
      function()
      {
        ok(true,"aliased function 1 execute");
        this.result = 1;
        this.data_object = { test: "value 1" };
        setTimeout(this.next,1);
      }
    )
    (
      {
        "function1": "function2",
        "function2": "function3"
      }
    )
    ();
  }
);

/**
 * This tests execution of asynchronous anonymous functions
 */
asyncTest("named functions, asynchronous, execution map",
  function()
  {
    function function1()
    {
      ok(true,"named function 1 execute");
      this.result = 1;
      this.data_object = { test: "value 1" };
      setTimeout(this.next,1);
    }

    function function2()
    {
      ok(true,"named function 2 execute");
      this.result = 2;
      this.data_object = { test: "value 2" };
      ok(this.last.result==1,"previous link result");
      ok(this.last.data_object.test=="value 1","previous link data object result");
      var nxt = this.next;
      setTimeout(function() { nxt();},1);
    }

    function function3()
    {
      ok(true,"named function 3 execute");
      ok(this.last.result==2,"previous link result");
      ok(this.last.data_object.test=="value 2","previous link data object result");
      ok(this.last.last.result==1,"previous previous link result");
      ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
      setTimeout(this.next,1);
      start();
    }

    expect(9);
    o_o
    (
      function3
    )(
      function2
    )(
      function1
    )(
      {
        "function1": "function2",
        "function2": "function3"
      }
    )();
  }
);

/**
 * Test the use of arrays in execution map, for synchronous functions
 */
test("synchronous, execution_map, array",
  function()
  {
    expect(18);
    o_o
    (
      "function3",
      function()
      {
        ok(true,"aliased function 3 execute");
        ok(this.last.result==6,"previous link result");
        ok(this.last.data_object.test=="value 6","previous link data object result");
        ok(this.last.last.result==1,"previous previous link result");
        ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
        this.next();
      }
    )(
      "function2",
      function()
      {
        ok(true,"aliased function 2 execute");
        this.result = 2;
        this.data_object = { test: "value 2" };
        ok(this.last.result==5,"previous link result");
        ok(this.last.data_object.test=="value 5","previous link data object result");
        this.next();
      }
    )(
      "function1",
      function()
      {
        ok(true,"aliased function 1 execute");
        this.result = 1;
        this.data_object = { test: "value 1" };
        this.next();
      }
    )(
      "function_ar1",
      function()
      {
        ok(true,"aliased array function 1 execute");
        this.result = 4;
        this.data_object = { test: "value 4" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        this.next();
      }
    )(
      "function_ar2",
      function()
      {
        ok(true,"aliased array function 2 execute");
        this.result = 5;
        this.data_object = { test: "value 5" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        this.next();
      }
    )(
      "function_ar3",
      function()
      {
        ok(true,"aliased array function 3 execute");
        this.result = 6;
        this.data_object = { test: "value 6" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        this.next();
      }
    )(
      {
        "function1": [
                        "function_ar1",
                        "function_ar2",
                        "function_ar3"
                      ],
        "function_ar2": "function2",
        "function_ar3": "function3"
      }
    )
    ();
  }
);

asyncTest("mixed synchronous, asyncronous, named, aliased, anonymous no execution_map",
  function()
  {
    expect(14);
    function function1()
    {
      ok(true,"named function 1 execute");
      this.result = 1;
      this.data_object = { test: "value 1" };
      this.next();
    }

    function function2()
    {
      ok(true,"named function 2 execute");
      this.result = 2;
      this.data_object = { test: "value 2" };
      ok(this.last.result==1,"previous link result");
      ok(this.last.data_object.test=="value 1","previous link data object result");
      var nxt = this.next;
      setTimeout(function() { nxt();},1);
    }

    o_o
    (
      function1
    )(
      function2
    )(
      "function3",
      function()
      {
        ok(true,"aliased function 3 execute");
        this.result=3;
        this.data_object = { test: "value 3" };
        ok(this.last.result==2,"previous link result");
        ok(this.last.data_object.test=="value 2","previous link data object result");
        ok(this.last.last.result==1,"previous previous link result");
        ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
        setTimeout(this.next,1);
      }
    )(
      function()
      {
        ok(true,"anonymous function 4 execute");
        ok(this.last.result==3,"previous link result");
        ok(this.last.data_object.test=="value 3","previous link data object result");
        ok(this.last.last.result==2,"previous previous link result");
        ok(this.last.last.data_object.test=="value 2","previous previous link data object result");
        start();
        this.next();
      }
    )();

  }
);

asyncTest("mixed synchronous, asyncronous, named, aliased, arrays execution_map",
  function()
  {
    expect(14);
    function function1()
    {
      ok(true,"named function 1 execute");
      this.result = 1;
      this.data_object = { test: "value 1" };
      this.next();
    }

    function function2()
    {
      ok(true,"named function 2 execute");
      this.result = 2;
      this.data_object = { test: "value 2" };
      ok(this.last.result==1,"previous link result");
      ok(this.last.data_object.test=="value 1","previous link data object result");
      var nxt = this.next;
      setTimeout(function() { nxt();},1);
    }

    o_o
    (
      function1
    )(
      function2
    )(
      "function3",
      function()
      {
        ok(true,"aliased function 3 execute");
        this.result=3;
        this.data_object = { test: "value 3" };
        ok(this.last.result==2,"previous link result");
        ok(this.last.data_object.test=="value 2","previous link data object result");
        ok(this.last.last.result==1,"previous previous link result");
        ok(this.last.last.data_object.test=="value 1","previous previous link data object result");
        setTimeout(this.next,1);
      }
    )(
      "function4",
      function()
      {
        ok(true,"anonymous function 4 execute");
        ok(this.last.result==3,"previous link result");
        ok(this.last.data_object.test=="value 3","previous link data object result");
        ok(this.last.last.result==2,"previous previous link result");
        ok(this.last.last.data_object.test=="value 2","previous previous link data object result");
        start();
        this.next();
      }
    )(
      "function_ar1",
      function()
      {
        ok(true,"aliased array function 1 execute");
        this.result = 4;
        this.data_object = { test: "value 4" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        this.next();
      }
    )(
      "function_ar2",
      function()
      {
        ok(true,"aliased array function 2 execute");
        this.result = 5;
        this.data_object = { test: "value 5" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        this.next();
      }
    )(
      "function_ar3",
      function()
      {
        ok(true,"aliased array function 3 execute");
        this.result = 6;
        this.data_object = { test: "value 6" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        this.next();
      }
    )(
      {
        "function1": "function2",
        "function2": [
                        "function_ar1",
                        "function_ar2",
                        "function_ar3"
                     ],
        "function_ar2": "function3",
        "function_ar3": "function4"
        
      }
    )();
  }
);

/**
 * Test the use of arrays in execution map, for asynchronous functions
 */
asyncTest("asynchronous, execution_map, array",
  function()
  {
  }
);

module("nested chains");

/**
 * Test using chains of chains anonymously
 * This uses both synchronous and async functions
 */
test("nested anonymous chains",
  function()
  {
  }
);

/**
 * Test using chains of chains with exection_map 
 * This uses both synchronous and async functions
 * This uses both aliased sub chains, and named functions
 */
test("nested named chains",
  function()
  {
  }
);

module("module loader");

test("basic module loading",
  function()
  {
  }
);

test("nested module loading",
  function()
  {
  }
);

test("nested module loading of existing loaded modules",
  function()
  {
  }
);

test("module load of jquery",
  function()
  {
  }
);

test("module load of chains modules",
  function()
  {
  }
);

module("threading");
test("web workers",
  function()
  {
  }
);

test("web workers unsupported",
  function()
  {
  }
);
