module("plugins");

asyncTest("basic anonymous plugin test",
  function()
  {
    expect(3);
    o_o
    (
      {
        test: true,
        value: "this is a test value passed to the plugin"
      }
    )(
      function()
      {
        ok(true,"function execution after plugin");
        ok(this.last.result=="test plugin","plugin result");
        ok(this.last.value=="this is a test value passed to the plugin","plugin passed value");
        this.next();
      }
    )(
      start
    )();
  });

asyncTest("basic aliased plugin test",
  function()
  {
    expect(3);
    o_o
    (
      "test_plugin",
      {
        test: true,
        value: "this is a test value passed to the plugin"
      }
    )(
      function()
      {
        ok(true,"function execution after plugin");
        ok(this.last.result=="test plugin","plugin result");
        ok(this.last.value=="this is a test value passed to the plugin","plugin passed value");
        this.next();
      }
    )(
      start
    )();
  });

asyncTest("aliased plugin test with execution map",
  function()
  {
    expect(4);
    
    o_o
    (
      "test_plugin",
      {
        test: true,
        value: "this is a test value passed to the plugin"
      }
    )(
      "function2",
      function()
      {
        ok(true,"function execution after plugin");
        ok(this.last.result=="test plugin","plugin result");
        ok(this.last.value=="this is a test value passed to the plugin","plugin passed value");
        this.next();
      }
    )(
      "function1",
      function()
      {
        ok(true,"function 1 execute");
        setTimeout(this.next,1);
      }
    )(
      "finish",
      start
    )(
      {
        "function1":"test_plugin",
        "test_plugin":"function2",
        "function2":"finish"
      }
    )();
  });

asyncTest("aliased plugin test with execution map and array",
  function()
  {
    expect(7);
    
    o_o
    (
      "test_plugin1",
      {
        test: true,
        value: "this is a test value passed to the plugin1"
      }
    )(
      "test_plugin2",
      {
        test: true,
        value: "this is a test value passed to the plugin2"
      }
    )(
      "function2",
      function()
      {
        ok(true,"function execution after plugin1");
        ok(this.last.result=="test plugin","plugin result");
        ok(this.last.value=="this is a test value passed to the plugin1","plugin passed value");
        this.next();
      }
    )(
      "function3",
      function()
      {
        ok(true,"function execution after plugin2");
        ok(this.last.result=="test plugin","plugin result");
        ok(this.last.value=="this is a test value passed to the plugin2","plugin passed value");
        this.next();
      }
    )(
      "function1",
      function()
      {
        ok(true,"function 1 execute");
        setTimeout(this.next,1);
      }
    )(
      "finish",
      start
    )(
      {
        "function1": [
                      "test_plugin1",
                      "test_plugin2"
                     ],
        "test_plugin1":"function2",
        "test_plugin2":"function3",
        "function3":"finish"
      }
    )();
  });

