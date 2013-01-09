
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

test("anonymous functions, synchronous, error",
  function()
  {
    expect(11);
    o_o
    (
      "error",
      function(err)
      {
        ok(true,"error handler executed");
        ok(err.value=="test err","Err value ok");
      }
    )(
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
        this.error({value:"test err"});
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

test("aliased functions, synchronous, no execution map, error",
  function()
  {
    expect(11);
    o_o
    (
      "error",
      function(err)
      {
        ok(true,"error handler executed");
        ok(err.value=="test err","Err value ok");
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
        this.error({value:"test err"});
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

test("named functions, synchronous, no execution map, error",
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
      this.error({value:"test err"});
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

    function error(err)
    {
      ok(true,"error handler executed");
      ok(err.value=="test err","Err value ok");
    }

    expect(6);
    o_o
    (
      "error",
      error
    )(
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

asyncTest("anonymous functions, asynchronous, no execution map, error",
  function()
  {
    expect(6);
    o_o
    (
      "error",
      function(err)
      {
        ok(true,"error handler executed");
        ok(err.value=="test err","Err value ok");
      }
    )(
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
        var error = this.error;
        setTimeout(
          function()
          {
            error({value:"test err"});
            start();
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

test("aliased functions, synchronous, execution map, error",
  function()
  {
    o_o
    (
      "error",
      function(err)
      {
        ok(true,"error handler executed");
        ok(err.value=="test err","Err value ok");
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
    )(
      "function2",
      function()
      {
        ok(true,"aliased function 2 execute");
        this.result = 2;
        this.data_object = { test: "value 2" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        this.error({value:"test err"});
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

/**
 * Test the use of arrays in execution map, for synchronous accumulator functions
 */
test("synchronous, execution_map, array, accumulator function",
  function()
  {
    expect(17);
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
      "function_ar1",
      function()
      {
        ok(true,"aliased array function 1 execute");
        this.result1 = 4;
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
        this.result2 = 5;
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
        this.result3 = 6;
        this.data_object = { test: "value 6" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        this.next();
      }
    )(
      "accumulator",
      function()
      {
        if(this.last.result1)
        {
          ok(true,"first result");
          this.result1 = this.last.result1;
        }
        if(this.last.result2)
        {
          ok(true,"second result");
          this.result2 = this.last.result2;
        }
        if(this.last.result3)
        {
          ok(true,"third result");
          this.result3 = this.last.result3;
        }

        if(this.result1 && this.result2 && this.result3)
        {
          ok(true,"accumulator complete");
          this.next();
        }
      }
    )(
      "finish",
      function()
      {
        ok(this.last.result1==4,"correct result 1");
        ok(this.last.result2==5,"correct result 2");
        ok(this.last.result3==6,"correct result 3");
      }
    )(
      {
        "function1": [
                        "function_ar1",
                        "function_ar2",
                        "function_ar3"
                      ],
        "function_ar1": "accumulator",
        "function_ar2": "accumulator",
        "function_ar3": "accumulator",
        "accumulator": "finish"
      }
    )
    ();
  }
);

test("synchronous, execution_map, array, error",
  function()
  {
    expect(9);
    o_o
    (
      "error",
      function(err)
      {
        ok(true,"error handler executed");
        ok(err.value=="test err","Err value ok");
      }
    )(
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

        this.error({value:"test err"});
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
/**
 * Test the use of arrays in execution map, for asynchronous accumulator functions
 */
asyncTest("asynchronous, execution_map, array, accumulator function",
  function()
  {
    expect(17);
    o_o
    (
      "function1",
      function()
      {
        ok(true,"aliased function 1 execute");
        this.result = 1;
        this.data_object = { test: "value 1" };
        setTimeout(this.next,1);
      }
    )(
      "function_ar1",
      function()
      {
        ok(true,"aliased array function 1 execute");
        this.result1 = 4;
        this.data_object = { test: "value 4" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        setTimeout(this.next,1);
      }
    )(
      "function_ar2",
      function()
      {
        ok(true,"aliased array function 2 execute");
        this.result2 = 5;
        this.data_object = { test: "value 5" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        setTimeout(this.next,1);
      }
    )(
      "function_ar3",
      function()
      {
        ok(true,"aliased array function 3 execute");
        this.result3 = 6;
        this.data_object = { test: "value 6" };
        ok(this.last.result==1,"previous link result");
        ok(this.last.data_object.test=="value 1","previous link data object result");
        setTimeout(this.next,1);
      }
    )(
      "accumulator",
      function()
      {
        if(this.last.result1)
        {
          ok(true,"first result");
          this.result1 = this.last.result1;
        }
        if(this.last.result2)
        {
          ok(true,"second result");
          this.result2 = this.last.result2;
        }
        if(this.last.result3)
        {
          ok(true,"third result");
          this.result3 = this.last.result3;
        }

        if(this.result1 && this.result2 && this.result3)
        {
          ok(true,"accumulator complete");
          setTimeout(this.next,1);
        }
      }
    )(
      "finish",
      function()
      {
        ok(this.last.result1==4,"correct result 1");
        ok(this.last.result2==5,"correct result 2");
        ok(this.last.result3==6,"correct result 3");
        start();
      }
    )(
      {
        "function1": [
                        "function_ar1",
                        "function_ar2",
                        "function_ar3"
                      ],
        "function_ar1": "accumulator",
        "function_ar2": "accumulator",
        "function_ar3": "accumulator",
        "accumulator": "finish"
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
    expect(25);
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
        ok(this.last.result==5,"previous link result");
        ok(this.last.data_object.test=="value 5","previous link data object result");
        ok(this.last.last.result==2,"previous previous link result");
        ok(this.last.last.data_object.test=="value 2","previous previous link data object result");
        setTimeout(this.next,1);
      }
    )(
      "function4",
      function()
      {
        ok(true,"aliased function 4 execute");
        ok(this.last.result==6,"previous link result");
        ok(this.last.data_object.test=="value 6","previous link data object result");
        ok(this.last.last.result==2,"previous previous link result");
        ok(this.last.last.data_object.test=="value 2","previous previous link data object result");
        ok(this.last.last.last.result==1,"previous previous previous link result");
        ok(this.last.last.last.data_object.test=="value 1","previous previous previous link data object result");
        this.next();
      }
    )(
      "function_ar1",
      function()
      {
        ok(true,"aliased array function 1 execute");
        this.result = 4;
        this.data_object = { test: "value 4" };
        ok(this.last.result==2,"previous link result");
        ok(this.last.data_object.test=="value 2","previous link data object result");
        this.next();
      }
    )(
      "function_ar2",
      function()
      {
        ok(true,"aliased array function 2 execute");
        this.result = 5;
        this.data_object = { test: "value 5" };
        ok(this.last.result==2,"previous link result");
        ok(this.last.data_object.test=="value 2","previous link data object result");
        setTimeout(this.next,1);
      }
    )(
      "function_ar3",
      function()
      {
        ok(true,"aliased array function 3 execute");
        this.result = 6;
        this.data_object = { test: "value 6" };
        ok(this.last.result==2,"previous link result");
        ok(this.last.data_object.test=="value 2","previous link data object result");
        this.next();
      }
    )(
      "finish",
      start
    )(
      {
        "function1": "function2",
        "function2": [
                        "function_ar1",
                        "function_ar2",
                        "function_ar3"
                     ],
        "function_ar2": "function3",
        "function_ar3": "function4",
        "function4": "finish"
      }
    )();
  }
);

/**
 * Tests synchronous execution of a looping chain, maintaining 'this' context
 * across loop iterations
 */
test("looping chain, synchronous",
  function()
  {
    expect(11);
    o_o
    (
      "loop",
      function()
      {
        if(!this.execution_count)
          this.execution_count = 1;
        else
          this.execution_count++;

        ok(true,"executing number: " + this.execution_count);

        if(this.execution_count && this.execution_count < 10)
        {
          this.next();
        }
        else if(this.execution_count == 10)
        {
          ok(true,"execution count equals 10");
        }
      }
    )(
      {
        "loop":"loop"
      }
    )();
  });

/**
 * Tests asynchronous execution of a looping chain, maintaining 'this' context
 * across loop iterations
 */
asyncTest("looping chain, asynchronous",
  function()
  {
    expect(11);
    o_o
    (
      "loop",
      function()
      {
        if(!this.execution_count)
          this.execution_count = 1;
        else
          this.execution_count++;

        ok(true,"executing number: " + this.execution_count);

        if(this.execution_count && this.execution_count < 10)
        {
          setTimeout(this.next,1);
        }
        else if(this.execution_count == 10)
        {
          ok(true,"execution count equals 10");
          start();
        }
      }
    )(
      {
        "loop":"loop"
      }
    )();
  });


module("nested chains");

test("basic nested chains",
  function()
  {
    expect(6);
    o_o
    (
      o_o
      (
        function()
        {
          this.chain="inner chain";
          ok(true,"inner chain 1, function 1");
          this.result=1;
          this.next();
        }
      )(
        function()
        {
          ok(true,"inner chain 1, function 2");
          this.result=2;
          this.next();
        }
      )
    )(
      o_o
      (
        function()
        {
          ok(true,"inner chain 2, function 1");
          ok(this.last.result==2,"previous chain result");
          ok(this.last.last.result==1,"previous previous chain result");
          this.next();
        }
      )(
        function()
        {
          ok(true,"inner chain 2, function 2");
          this.next();
        }
      )
    )();
  });

/**
 * Test using chains of chains anonymously
 * This uses both synchronous and async functions
 */
asyncTest("nested anonymous chains",
  function()
  {
    expect(8);
    var sync_result;
    var async_result;

    o_o
    (
      //execute a chain of synchronous anonymous functions, store the result in sync_result
      o_o
      (
        function()
        {
          ok(true,"nested chain synch func 1");
          this.result=1;
          this.next();
        }
      )(
        function()
        {
          ok(true,"nested chain synch func 2");
          this.result = 1 + this.last.result;
          this.next();
        }
      )(
        function()
        {
          ok(true,"nested chain synch func 3");
          sync_result = 1 + this.last.result;
          this.next(); 
        }
      )
    )(
      //execute a chain of async functions, store the result in async_result
      o_o
      (
        function()
        {
          ok(true,"nested chain asynch func 1");
          this.result=1;
          setTimeout(this.next,1);
        }
      )(
        function()
        {
          ok(true,"nested chain asynch func 2");
          this.result = 2 + this.last.result;
          setTimeout(this.next,1);
        }
      )(
        function()
        {
          ok(true,"nested chain asynch func 3");
          async_result = 3 + this.last.result;
          this.next();
        }
      )
    )(
      function()
      {
        ok(sync_result==3,"Synchronous result ok");
        ok(async_result==6, "Asynchronous result ok");
        this.next();
        start();
      }
    )();
  }
);

/**
 * Test using chains of chains with exection_map 
 * This uses both synchronous and async functions
 * This uses both aliased sub chains, and named functions
 */
asyncTest("nested named chains",
  function()
  {
    expect(8);
    chain2 = o_o
    (
      function()
      {
        ok(true,"chain2 function 1 execute");
        this.result=3;
        ok(this.last.result==2,"previous chain result");
        ok(this.last.last.result==1,"previous chain result");
        setTimeout(this.next,1);
      }
    )(
      function()
      {
        ok(true,"chain2 function 2 execute");
        ok(this.last.result==3,"previous chain result");
        this.next();
      }
    );
    o_o
    (
      "chain1",
      o_o
      (
        function()
        {
          ok(true,"chain1 execute, first function");
          this.result=1;
          this.next();
        }
      )(
        function()
        {
          ok(true,"chain1 execute, second function, async next");
          ok(this.last.result==1,"previous result");
          this.result=2;
          setTimeout(this.next,10); 
        }
      )
    )(
      chain2
    )(
      start
    )();

  }
);



