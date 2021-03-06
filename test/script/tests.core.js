
QUnit.module("no execution map")
o_o.debug=true;


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

test("error handler next call",
function()
{
  expect(2);
  o_o(
    "raiseError",
    function()
    {
      console.log("raising error...");
      this.accumulator.test = "test";
      this.doesNotExist.thisWillBeAnError = 1;
    }
  )(
    "complete",
    function()
    {
      console.log("complete");
      ok(true,"complete executed");
    }
  )(
    "error",
    function()
    {
      console.log("error caught");
      ok(this.accumulator.test=="test","context exists");
      this.next("complete");
    }
  )();

});

test("nested error handler",function()
{
  expect(1);
  var chain1 = o_o
  (
    function()
    {
      this.next();
    }
  )(
    function()
    {
      //raise error
      throw new Error("test");
      this.next();
    }
  );

  o_o
  (
    function()
    {
      this.next();
    }
  )(
    chain1
  )(
    "error",
    function()
    {
      ok(true,"error handler executed");
    }
  )
  ();
});

test("error propagation from within error handler",
  function()
  {
    expect(1);

    var subChain = o_o(
      "subStart",
      function()
      {
        this.error("error");
      }
    )(
      "error",
      function(err)
      {
        this.error(err);
      }
    );

    var topChain = o_o(
      "topStart",
      function()
      {
        this.next();
      }
    )(
      subChain
    )(
      "error",
      function(err)
      {
        ok(err="error","Top error handler called");
      }
    )();
  });

test("error exception propagation from within error handler",
  function()
  {
    expect(3);

    var subsubChain = o_o(
      "subsubStart",
      function()
      {
        undefinedFunction(); //raise exception
        this.next();
      }
    )(
      "error",
      function(err)
      {
        ok(true, "subsubChain error handler: " + err);
        this.error(err);
      }
    );

    var subChain = o_o(
      "subStart",
      function()
      {
        this.next();
      }
    )(
      subsubChain
    )(
      "error",
      function(err)
      {
        ok(true,"subChain error handler: " + err);
        this.error(err);
      }
    );

    var topChain = o_o(
      "topStart",
      function()
      {
        this.next();
      }
    )(
      subChain
    )(
      "error",
      function(err)
      {
        ok(true,"Top error handler called: " + err);
        this.error(err);
      }
    )();
  });

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

/**
 * This tests execution of asynchronous anonymous functions where the same function is used in multiple chains
 */
asyncTest("anonymous functions, asynchronous, function used in multiple chains",
  function()
  {
    expect(7);

    var fn = function()
      {
        ok(true,"anonymous function 1 execute");
        this.result = 1;
        this.data_object = { test: "value 1" };
        setTimeout(this.next, 1);
      }

    o_o
    (
      fn
    )(
      function()
      {
        ok(true,"anonymous function 2 execute");
        ok(this.last.result==1,"previous link result");
        setTimeout(this.next, 1);
        start();
      }
    )
    ();

    o_o
    (
      fn
    )(
      function()
      {
        ok(true,"anonymous function 3 execute");
        ok(true,"anonymous function 3 execute");
        ok(this.last.result==1,"previous link result");
        setTimeout(this.next, 1);
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
 * Test array of functions, synchronous and async, no execution map
 */
asyncTest("passing array of sync and async functions, no execution map",
  function()
  {
    expect(12);

    o_o([function1,function2,function3,function4])
    (
      function()
      {
        ok(this.accumulator.test1=="test1", "correct value 1"); 
        ok(this.accumulator.test2=="test2", "correct value 2");
        ok(this.accumulator.test3=="test3", "correct value 3");
        ok(this.accumulator.test4=="test4", "correct value 4");
        ok(this.last.test1=="test1","correct last 1");
        ok(this.last.test2=="test2","correct last 2");
        ok(this.last.test3=="test3","correct last 3");
        ok(this.last.test4=="test4","correct last 4");
        start();
      }
    )();

    function function1() { ok(true, "function1 execute"); this.test1="test1"; this.accumulator.test1="test1"; this.next(); }
    function function2() { ok(true, "function2 execute"); this.test2="test2"; this.accumulator.test2="test2"; setTimeout(this.next, 1); }
    function function3() { ok(true, "function3 execute"); this.test3="test3"; this.accumulator.test3="test3"; this.next(); }
    function function4() { ok(true, "function4 execute"); this.test4="test4"; this.accumulator.test4="test4"; this.next();}
  }
);

/**
 * Test array of functions and subchains, synchronous and async, no execution map
 */
asyncTest("passing array of sync and async functions and subchains, no execution map",
  function()
  {
    expect(16);


    function function1() { ok(true, "function1 execute"); this.test1="test1"; this.accumulator.test1="test1"; this.next(); }
    function function2() { ok(true, "function2 execute"); this.test2="test2"; this.accumulator.test2="test2"; setTimeout(this.next, 1); }
    function function3() { ok(true, "function3 execute"); this.test3="test3"; this.accumulator.test3="test3"; this.next(); }
    function function4() { ok(true, "function4 execute"); this.test4="test4"; this.accumulator.test4="test4"; this.next();}
    var function5 = o_o(
        function()
        {
          this.accumulator.subchain1="subchain1";
          setTimeout(this.next,1);
        }
      )(
        function()
        {
          this.subchain1="subchain1";
          setTimeout(this.next,1);
        }
      );
    var function6 = o_o(
        function()
        {
          this.accumulator.subchain2="subchain2";
          this.next();
        }
      )(
        function()
        {
          this.subchain2="subchain2";
          this.next();
        }
      );

    o_o([function1,function2,function5,function6,function3,function4])
    (
      function()
      {
        ok(this.accumulator.test1=="test1", "correct value 1"); 
        ok(this.accumulator.test2=="test2", "correct value 2");
        ok(this.accumulator.test3=="test3", "correct value 3");
        ok(this.accumulator.test4=="test4", "correct value 4");
        ok(this.accumulator.subchain1=="subchain1", "correct accumulator subchain1");
        ok(this.accumulator.subchain2=="subchain2", "correct accumulator subchain2");
        ok(this.last.test1=="test1","correct last 1");
        ok(this.last.test2=="test2","correct last 2");
        ok(this.last.test3=="test3","correct last 3");
        ok(this.last.test4=="test4","correct last 4");
        ok(this.last.subchain1=="subchain1","correct last subchain1");
        ok(this.last.subchain2=="subchain2","correct last subchain2");
        start();
      }
    )();
  }
);

/**
 * Test subchain tree, synchronous and async, no execution map
 */
asyncTest("passing array of sync and async subchain trees, no execution map",
  function()
  {
    expect(10);


    function function1() { ok(true, "function1 execute"); this.test1="test1"; this.accumulator.test1="test1"; this.next(); }
    function function2() { ok(true, "function2 execute"); this.test2="test2"; this.accumulator.test2="test2"; setTimeout(this.next, 1); }

    var subchain2 = o_o(
        function()
        {
          this.accumulator.subchain2="subchain2";
          this.next();
        }
      )(
        function()
        {
          this.subchain2="subchain2";
          this.next();
        }
      );
    var subchain1 = o_o(
        function()
        {
          this.accumulator.subchain1="subchain1";
          setTimeout(this.next,1);
        }
      )
      (subchain2)
      (
        function()
        {
          this.subchain1="subchain1";
          setTimeout(this.next,1);
        }
      );

    var chain1 = o_o(subchain1)
      (
        function()
        {
          this.chain1="chain1";
          this.accumulator.chain1 = "chain1";
          setTimeout(this.next,1);
        }
      );

    o_o([function1,function2,chain1])
    (
      function()
      {
        ok(this.accumulator.test1=="test1", "correct value 1"); 
        ok(this.accumulator.test2=="test2", "correct value 2");
        ok(this.accumulator.chain1=="chain1", "correct accumulator chain1");
        ok(this.accumulator.subchain1=="subchain1", "correct accumulator subchain1");
        ok(this.accumulator.subchain2=="subchain2", "correct accumulator subchain2");
        ok(this.last.test1=="test1","correct last 1");
        ok(this.last.test2=="test2","correct last 2");
        ok(this.last.chain1=="chain1","correct last chain1");
        start();
      }
    )();
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
QUnit.module("execution map");
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
 * Test array of functions, synchronous and async, execution map
 */
asyncTest("passing array of sync and async functions, execution map",
  function()
  {
    expect(12);

    o_o(
      "first",
      function()
      {
        setTimeout(this.next,1);
      }
    )("second",[function1,function2,function3,function4])
    ( 
      "third",
      function()
      {
        ok(this.accumulator.test1=="test1", "correct value 1"); 
        ok(this.accumulator.test2=="test2", "correct value 2");
        ok(this.accumulator.test3=="test3", "correct value 3");
        ok(this.accumulator.test4=="test4", "correct value 4");
        ok(this.last.test1=="test1","correct last 1");
        ok(this.last.test2=="test2","correct last 2");
        ok(this.last.test3=="test3","correct last 3");
        ok(this.last.test4=="test4","correct last 4");
        start();
      }
    )("start",start)
    (
      {
        'first': 'second',
        'second': 'third',
        'third': 'start'
      }
    )();

    function function1() { ok(true, "function1 execute"); this.test1="test1"; this.accumulator.test1="test1"; this.next(); }
    function function2() { ok(true, "function2 execute"); this.test2="test2"; this.accumulator.test2="test2"; setTimeout(this.next, 1); }
    function function3() { ok(true, "function3 execute"); this.test3="test3"; this.accumulator.test3="test3"; this.next(); }
    function function4() { ok(true, "function4 execute"); this.test4="test4"; this.accumulator.test4="test4"; this.next();}
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
          this.accumulator.result1 = this.last.result1;
        }
        if(this.last.result2)
        {
          ok(true,"second result");
          this.accumulator.result2 = this.last.result2;
        }
        if(this.last.result3)
        {
          ok(true,"third result");
          this.accumulator.result3 = this.last.result3;
        }

        if(this.accumulator.result1 && this.accumulator.result2 && this.accumulator.result3)
        {
          ok(true,"accumulator complete");
          this.next();
        }
      }
    )(
      "finish",
      function()
      {
        ok(this.accumulator.result1==4,"correct result 1");
        ok(this.accumulator.result2==5,"correct result 2");
        ok(this.accumulator.result3==6,"correct result 3");
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
          this.accumulator.result1 = this.last.result1;
        }
        if(this.last.result2)
        {
          ok(true,"second result");
          this.accumulator.result2 = this.last.result2;
        }
        if(this.last.result3)
        {
          ok(true,"third result");
          this.accumulator.result3 = this.last.result3;
        }

        if(this.accumulator.result1 && this.accumulator.result2 && this.accumulator.result3)
        {
          ok(true,"accumulator complete");
          setTimeout(this.next,1);
        }
      }
    )(
      "finish",
      function()
      {
        ok(this.accumulator.result1==4,"correct result 1");
        ok(this.accumulator.result2==5,"correct result 2");
        ok(this.accumulator.result3==6,"correct result 3");
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
asyncTest("mixed synchronous, asyncronous, named, aliased, anonymous, accumulator no execution_map",
  function()
  {
    expect(15);
    function function1()
    {
      ok(true,"named function 1 execute");
      this.result = 1;
      this.data_object = { test: "value 1" };
      this.accumulator.value1 = true;
      this.next();
    }

    function function2()
    {
      ok(true,"named function 2 execute");
      this.result = 2;
      this.data_object = { test: "value 2" };
      this.accumulator.value2=true;
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
        this.accumulator.value3=true;
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
        ok(this.accumulator.value1 && this.accumulator.value2 && this.accumulator.value3,"accumulator values correct");
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

test("skipping order, sync",
  function()
  {
    expect(1);
    var step1 = o_o(
      function()
      {
        this.accumulator.lastValue=1;
        this.next("step3");
      });
    var step2 = o_o(
      function()
      {
        ok(this.accumulator.lastValue==3,"last val is 3");
        this.next();
      });
    var step3 = o_o(
      function()
      {
        ok(this.accumulator.lastValue==1,"last val is 1");
        this.accumulator.lastValue=3;
        this.next();
      });

    o_o("step1", step1 )("step2", step2 )("step3", step3 )
    (
      {
        "step1":"step2",
        "step2":"step3"
      }
    )
    ();
  });
asyncTest("skipping order, async",
  function()
  {
    expect(1);
    var step1 = 
      function()
      {
        var thys=this;
        this.accumulator.lastValue=1;
        setTimeout(function() {thys.next("step3")},1);
        //next();
      }
    var step2 = 
      function()
      {
        ok(this.accumulator.lastValue==3,"last val is 3");
        this.accumulator.lastValue=2;
        this.next();
      }
    var step3 = 
      function()
      {
        ok(this.accumulator.lastValue==1,"last val is 1");
        this.accumulator.lastValue=3;
        //next("step2");
        this.next();
      }

    o_o
      ("step1", step1 )
      ("step2", step2 )
      ("step3", step3 )
      ("finish", start )
      ();
  });


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
        if(!this.accumulator.execution_count)
          this.accumulator.execution_count = 1;
        else
          this.accumulator.execution_count++;

        ok(true,"executing number: " + this.execution_count);

        if(this.accumulator.execution_count && this.accumulator.execution_count < 10)
        {
          this.next();
        }
        else if(this.accumulator.execution_count == 10)
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
        if(!this.accumulator.execution_count)
          this.accumulator.execution_count = 1;
        else
          this.accumulator.execution_count++;

        ok(true,"executing number: " + this.accumulator.execution_count);

        if(this.accumulator.execution_count && this.accumulator.execution_count < 10)
        {
          setTimeout(this.next,1);
        }
        else if(this.accumulator.execution_count == 10)
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


QUnit.module("nested chains");

test("basic nested chains",
  function()
  {
    expect(7);
    o_o
    (
      o_o
      (
        function()
        {
          this.chain="inner chain";
          ok(true,"inner chain 1, function 1");
          this.result=1;
          this.accumulator.value1=true;
          this.next();
        }
      )(
        function()
        {
          ok(true,"inner chain 1, function 2");
          this.result=2;
          this.accumulator.value2=true;
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
          ok(this.accumulator.value1 && this.accumulator.value2,"accumulator values correct");
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
    expect(9);
    chain2 = o_o
    (
      function()
      {
        ok(true,"chain2 function 1 execute");
        this.result=3;
        this.accumulator.value3=true;
        ok(this.last.result==2,"previous chain result");
        ok(this.last.last.result==1,"previous chain result");
        setTimeout(this.next,1);
      }
    )(
      function()
      {
        ok(true,"chain2 function 2 execute");
        ok(this.last.result==3,"previous chain result");
        ok(this.accumulator.value1 && this.accumulator.value2 && this.accumulator.value3,"accumulator values correct");
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
          this.accumulator.value1=true;
          this.next();
        }
      )(
        function()
        {
          ok(true,"chain1 execute, second function, async next");
          ok(this.last.result==1,"previous result");
          this.result=2;
          this.accumulator.value2=true;
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

/**
 * Test using chains of chains with exection_map 
 * This uses both synchronous functions
 * Simple list of named chains
 */
test("nested simple named chains,sync, execution map",
  function()
  {
    expect(6);
    var chain1 = o_o
      (
        function()
        {
          ok(true,"chain1 execute, first function");
          this.result=1;
          this.accumulator.value1=true;
          this.next();
        }
      );
    var chain2 = o_o
    (
      function()
      {
        ok(true,"chain2 function 1 execute");
        this.result=2;
        this.accumulator.value2=true;
        ok(this.last.result==1,"previous chain result");
        this.next();
      }
    );
    var chain3 = o_o
    (
      function()
      {
        ok(true,"chain3 function 1 execute");
        this.accumulator.value3=true;
        ok(this.last.result==2,"previous chain result");
        ok(this.last.last.result==1,"previous chain result");
        this.next();
      }
    );
    o_o ( "chain1",chain1 )("chain2", chain2 )("chain3", chain3 )(
      {
        "chain1":"chain2",
        "chain2":"chain3",
      }
    )();

  }
);

/**
 * Test using chains of chains with exection_map 
 * This uses both synchronous and async functions
 * Simple list of named chains
 */
asyncTest("nested simple named chains,async, execution map",
  function()
  {
    expect(6);
    var chain1 = o_o
      (
        function()
        {
          ok(true,"chain1 execute, first function");
          this.result=1;
          this.accumulator.value1=true;
          this.next();
        }
      );
    var chain2 = o_o
    (
      function()
      {
        ok(true,"chain2 function 1 execute");
        this.result=2;
        this.accumulator.value2=true;
        ok(this.last.result==1,"previous chain result");
        setTimeout(this.next,1);
      }
    );
    var chain3 = o_o
    (
      function()
      {
        ok(true,"chain3 function 1 execute");
        this.accumulator.value3=true;
        ok(this.last.result==2,"previous chain result");
        ok(this.last.last.result==1,"previous chain result");
        setTimeout(this.next,1);
      }
    );
    o_o ("chain1", chain1 )("chain2", chain2 )("chain3", chain3 )("chain4", function() {start();})(
      {
        "chain1":"chain2",
        "chain2":"chain3",
        "chain3":"chain4"
      }
    )();

  }
);

//test repeated calls of instantiated subchain
test("test repeated calls of subchain",
  function()
  {
    expect(4);
    var defined = o_o(
      "defined chain start",
      function()
      {
        this.next();
      }
      )(
      "defined chain second",
      function()
      {
        ok(true,"second called");
      }
    ) ;

    for(var i=0;i<4; i++)
    {
      o_o(
          "start main",
          function()
          {
            this.next();
          }
        )(
          "call defined",
          defined
        )();
    }
  });

asyncTest("async subchain",
  function()
  {
    expect(9);

    var subsubchain = o_o(
      function()
      {
        this.test4 = "test4";
        this.accumulator.test4="test4";
        setTimeout(this.next,1);
      }
    );

    var subchain = o_o(
      function()
      {
        this.test2 = "test2";
        this.accumulator.test2 = "test2";
        setTimeout(this.next,1);
      }
    )(
      function()
      {
        this.test3 = "test3";
        this.accumulator.test3 = "test3";
        setTimeout(this.next,1);
      }
    )("subsubchain",subsubchain);


    o_o(
      function()
      {
        ok("start");
        this.test1 = "test1";
        this.accumulator.test1 = "test1";
        setTimeout(this.next,1);
      }
    )(
      "subchain", subchain
    )(
      function()
      {

        ok(this.last.test4=="test4","last val");
        ok(this.last.last.test3=="test3","last val");
        ok(this.last.last.last.test2=="test2","last last val");
        ok(this.last.last.last.last.test1=="test1","last last last val");
        ok(this.accumulator.test1=="test1","accumulator ok");
        ok(this.accumulator.test2=="test2","accumulator ok");
        ok(this.accumulator.test3=="test3","accumulator ok");
        ok(this.accumulator.test4=="test4","accumulator ok");
        start();
      }
    )();
  });




