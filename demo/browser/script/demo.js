o_o
(
  "regular_execute_1",
  function(_o_)
  {
    alert("1");
    next("test");
  }
)(
  "regular_execute_2",
  function(_o_)
  {
    alert("2: " + _o_.result);
    next({
              regular_execute_1: _o_.result,
              regular_execute_2: "test 2"
              });
            
  }
)(
  "test_async_1",
  function(_o_)
  {
    _o_._o_._o_.result;
    setTimeout(
      function()
      {
        next("async 1 complete");
      },10);
  }
)(
  "test_async_2",
  function(_o_)
  {
    setTimeout(
      function()
      {
        next("async 2 complete");
      },1000);
  }
)(
  {
    "regular_execute_1": "regular_execute_2",
    "regular_execute_2": "test_async_1",
    "test_async_1": "test_async_2"
  }
)();
