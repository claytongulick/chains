
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
        ok(true,"anonymous function 1 execute");
        this.result = 1;
        this.data_object = { test: "value 1" };
        this.next();
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
        this.next();
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
  }
);

/**
 * This tests execution of asynchronous anonymous functions
 */
asyncTest("anonymous functions, asynchronous, no execution map",
  function()
  {
  }
);

/**
 * This tests execution of asynchronous anonymous functions
 */
asyncTest("aliased functions, asynchronous, no execution map",
  function()
  {
  }
);

/**
 * This tests execution of asynchronous anonymous functions
 */
asyncTest("named functions, asynchronous, no execution map",
  function()
  {
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
  }
);

/**
 * This tests execution of synchronous named functions
 */
test("named functions, synchronous, execution map",
  function()
  {
  }
);

/**
 * This tests execution of asynchronous anonymous functions
 */
asyncTest("aliased functions, asynchronous, execution map",
  function()
  {
  }
);

/**
 * This tests execution of asynchronous anonymous functions
 */
asyncTest("named functions, asynchronous, execution map",
  function()
  {
  }
);

/**
 * Test the use of arrays in execution map, for synchronous functions
 */
test("synchronous, execution_map, array",
  function()
  {
  }
);

asyncTest("mixed synchronous, asyncronous, no execution_map",
  function()
  {
  }
);

asyncTest("mixed synchronous, asyncronous, execution_map",
  function()
  {
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
