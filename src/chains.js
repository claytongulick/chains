o_o =  function()
{
  var args = arguments;
  var fn;
  var self = (this != window ? this :
  {
    functions: [],
    current_index: 0,
    execution_map: null
  });

  /**
   * Utility to call the fn with the given name.
   * This just spins through the functions[] until it finds a function with the given name and executes it
   */
  function call_fn(name,last)
  {
    var fn;
    if(typeof name=='function')
      fn=name;
      
    for(var i=0;i<self.functions.length;i++)
    {
      if(self.functions[i].alias && self.functions[i].alias==name)
      {
        fn = self.functions[i]; 
        break;
      }

      if(self.functions[i].name && self.functions[i].name==name)
      {
        fn = self.functions[i]; 
        break;
      }
    }
    
    fn.start_execute = new Date().getTime();
    var thys = {
        last: last,
        next: function()
        {
          fn.end_execute = new Date().getTime();
          //copy the 'this' context and preserve it once execution context has faded
          for(key in thys)
            fn[key] = thys[key];

          next(fn);
        }
    };
    fn.apply(thys,[]);
  }

  /**
   * This calls the next function.
   *
   * It operates differently depending on whether an execution map has been passed in.
   *
   * If an execution map has been specified, it will look for the function or array specified to be chained to the
   * end of the current call. In the case of an array, it will call the next item in the array until all functions in the array have 
   * been executed.
   *
   * If no execution map has been specified, functions will be chained in the order they were added.
   *
   * In many cases, the chained function will itself be a new execution chain
   */
  function next(last)
  {
    var next_fn;
    var i=0;
    if(self.execution_map)
    {
      for(var key in execution_map)
        if(key==last)
        {
          next_fn = execution_map[key];
          if(typeof next_fn == 'array')
            for(i=0; i < next_fn.length; i++)
              call_fn(next_fn[i].name,last);
          else
            if(typeof next_fn == 'string')
              call_fn(next_fn,last);
        }
    }
    else
    {
      self.current_index++;
      if(self.current_index >= self.functions.length) return;
      call_fn(self.functions[self.current_index],last);
    }
  } //end next()
  
  /**
   * Determine how o_o was called, and queue functions appropriately
   */
  if(arguments.length > 0)
  {
    switch(typeof args[0])
    {
      case 'function':
        fn = args[0];
        self.functions.push(fn);
        break;
      case 'object':
        break;
      case 'string':
        fn = args[1];
        fn.alias=args[0];
        self.functions.push(fn);

        break;
      default:
        break;
    }
  }
  else
  {
    //no arguments were passed, this means it's time to execute starting at the head of the chain
    if(self.execution_map)
      for(key in self.execution_map)
      {
        //get the first key, then break
        call_fn(key,self);
        break;
      }
    else
      call_fn(self.functions[0],self);
  }

  return function() 
          { 
            return o_o.apply(self,arguments); 
          };
}
