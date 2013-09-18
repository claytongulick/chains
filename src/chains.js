/*

   chains.js

   version 0.1

   Javascript execution and management utility

   Copyright 2012 Clayton C. Gulick

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var console;
//get node console instance
if(((typeof require) != "undefined") && 
   ((typeof module) != "undefined") && 
   ((typeof module.exports) != "undefined"))
  console=require("console");

//check to see if we're using a browser that doesn't support console
if(!console)
  console={log:function(message){}}

o_o =  function()
{
  var args = arguments;
  var fn;

  //if this==window this is an initial invocation, create the context that will be passed to chained calls
  //if this!=window, this is a chained call, and a parent context has been applied as 'this', so get a reference to it
 var context = (this.__o_o__ ? this :  
 {
    functions: [],  //the array of functions to be executed in the current chain
    current_index: 0, //the current index into the function queue that is used for sequential excution of non-execution map chains
    execution_map: null, //the execution map that defines the flow of execution through the links in the chain
    error_handler: null, //the error handler assigned to the current chain
    current_error: null, //a holder for the last error that occurred in the current chain
    parentChainNext: null, //the next function from the parent chain, if any
    parentChainLast: null, //the last function from the parent chain, if any
    alias: null, //if this chain is a subchain, what, if any, alias was used to refer to the subchain
    __o_o__: true //sentinel flag to track current context. Indicates that we're in a chain
  });

  /**
   * Search for an error handler in the chain hierarchy
   * Currently, we're explicitly searching back up the 
   * recursion/closure stack for an error handler, and mutating
   * the context for "this" inside of the error handler to allow passing
   * up the chain. This may need to be rethought, since just raising/throwing
   * the exception might accomplish the same thing but better
   */
  function err(function_context,errObj, ctx)
  {
    if(!ctx)
      ctx=context;
    while(ctx)
    {
      if(ctx.error_handler)
      {
        //mutate the context to mofify the error handler.
        //We do this because if this.error is called from within an error handler, we want to execute the parent
        //err handler chain, not the current one
        function_context.error = function(errorObj) 
        { 
          if(ctx.parent)
          {
            ctx.parent.current_error=errorObj; 
            err(this,errorObj,ctx.parent);
          }
        }
        return ctx.error_handler.apply(function_context,[errObj]);
      }
      ctx=ctx.parent;
    }
  }


  /**
   * Utility to call the fn with the given name.
   * This just spins through the functions[] until it finds a function with the given name and executes it
   * If name is a function, it will be executed directly
   */
  function call_fn(name,last)
  {
    var fn;
    if(typeof name=='function')
    {
      fn=name;
    }
    else
    {
      //find the function with the correct name
      for(var i=0;i < context.functions.length; i++)
      {
        if(context.functions[i].alias && context.functions[i].alias==name)
        {
          fn = context.functions[i]; 
          break;
        }

        if(context.functions[i].name && context.functions[i].name==name)
        {
          fn = context.functions[i]; 
          break;
        }
      }
    }
      
    fn.start_execute = new Date().getTime(); //tag the start time for runtime performance evaluation
    debug("Executing function: " + (fn.name || fn.alias || "anonymous") + " start time: " + fn.start_execute);
    var thys;

    //create a 'this' context for the invoked function
    //this context contains the next and last members, which allow chaining.
    //the next member is a closure around o_o.next
    thys = {
      //pass the name or alias into the 'this' context. This is useful for
      //execution maps of aliased nested chains. The reason is, when the last
      //function in a nested chain executes, it needs to be able to "pretend"
      //that it was the actual aliased chain function so that the execution map
      //continues to flow. i.e, o_o("alias",o_o( ... , ... , iNeedToCarryTheAlias)) ("next",...);
      //in this situation, fn *is* the subchain, so we want to pass the alias into the "this" context so it will
      //be picked up and assigned to context.alias when fn is executed. When the last function in the subchain has executed,
      //the alias of the subchain can then be retrieved from the context 
      __alias: fn.alias || fn.name,
      __parent: context,
      error: function(errorObj) 
      { 
        context.current_error = errorObj; 
        err(this,errorObj);
      },

      next: function(nextFnName)
      {
        //check to see if we've been invoked from a different chain, this supports nesting chains
        if(this.__last) //check to see if 'last' is being passed up from a nested chain
        {
          this.__last.end_execute = new Date().getTime();
          debug("Function chain: " + this.__alias + " complete. End execution time: " + this.__last.end_execute + " total time: " + (this.__last.end_execute - this.__last.start_execute));
          this.__last.alias=this.__alias;
          iterate(this.__last,nextFnName)
        }
        else
        {
          fn.end_execute = new Date().getTime();
          debug("Function: " + (fn.alias || fn.name || "anonymous") + " complete. End execution time: " + fn.end_execute + " total time: " + (fn.end_execute - fn.start_execute));
          //copy the 'this' context and preserve it once execution context has faded
          for(key in thys)
            fn[key] = thys[key];
          iterate(fn,nextFnName);
        }
      }
    };
    thys.last=last; //set or update the 'last' member
    //create a forward accumulating object for carrying values forward into each call. This can be used to always keep certain values
    //at the front of the chain, instead of needing to call this.last.last.last.someValue, this.accumulator.someValue will always be present
    //if it's set anywhere in the chain
    thys.accumulator = last.accumulator || {}; 
    //fn.thys=thys; //cache the thys context for use in later calls to this function. this is primarily used for accumulator type functions
    try
    {
      fn.apply(thys,[]);
    }
    catch(ex)
    {
      debug("Exception thrown during execution: " + JSON.stringify(ex));
      err(thys,ex);
    }
  }

  /**
   * Utility to call an array of functions in parallel and proceed to the 
   * next function in the queue or map when all function in the array
   * have executed next()
   *
   * This needs some serious thought on how it will work before it's ready
   * for prime time. commented out for now
   */
  /*function call_arr(name, last)
  {
    var arr;
    if(Object.prototype.toString.call(name) =='[object Array]')
    {
      arr=name;
    }
    else
    {
      //find the array with the correct name
      for(var i=0;i<context.functions.length;i++)
      {
        if(context.functions[i].alias && context.functions[i].alias==name)
        {
          arr = context.functions[i]; 
          break;
        }
      }
    }

    arr.start_execute = new Date().getTime(); //tag the start time for runtime performance evaluation
    debug("Executing parallel array of " + arr.length + " functions: " + (arr.alias || "anonymous") + " start time: " + fn.start_execute);

    var functionsLeft = arr.length;
    //this array is going to be the this.last for future calls.
    //it needs to have all the stuff a normal function would though, so that it 
    //works in execution maps and all that jazz
    var arrayLast = new Array(arr.length);
    function paralellFunctionComplete(index,context,fn)
    {
      functionsLeft--;
      arrayLast[index]=context;
      if(!functionsLeft)
      {
        //check to see if we've been invoked from a different chain, context supports nesting chains
        if(context.__last) //check to see if 'last' is being passed up from a nested chain
        {
          context.__last.end_execute = new Date().getTime();
          debug("Function chain: " + context.__alias + " complete. End execution time: " + context.__last.end_execute + " total time: " + (context.__last.end_execute - context.__last.start_execute));
          context.__last.alias=context.__alias;
          iterate(context.__last)
        }
        else
        {
          fn.end_execute = new Date().getTime();
          debug("Function: " + (fn.alias || fn.name || "anonymous") + " complete. End execution time: " + fn.end_execute + " total time: " + (fn.end_execute - fn.start_execute));
          //copy the 'context' context and preserve it once execution context has faded
          for(key in thys)
            fn[key] = thys[key];
          iterate(fn);
        }
      }
    }

    var i=0;
    var thys;
    var fn;
    for(i=0;i<arr.length;i++)
    {
      fn=arr[i];

      //create a 'this' context for the invoked functions
      //this context contains the next and last members, which allow chaining.
      //the next member is a proxy to parallelFunctionComplete which checks
      //to see if all functions in the array have completed before continuing
      thys = {
        //pass the name or alias into the 'this' context. This is useful for
        //execution maps of aliased nested chains
        __alias: fn.name,
        __parent: context,
        error: function(errorObj) 
        { 
          context.err=errorObj; 

          err(errorObj);
        },

        next: function()
        {
          parallelFunctionComplete(i,this,fn);
        }
      };
      thys.last=last; //set or update the 'last' member
      //create a forward accumulating object for carrying values forward into each call. This can be used to always keep certain values
      //at the front of the chain, instead of needing to call this.last.last.last.someValue, this.accumulator.someValue will always be present
      //if it's set anywhere in the chain
      thys.accumulator = last.accumulator || {}; 
      //fn.thys=thys; //cache the thys context for use in later calls to this function. this is primarily used for accumulator type functions
      try
      {
        fn.apply(thys,[]);
      }
      catch(ex)
      {
        debug("Exception thrown during execution: " + JSON.stringify(ex));
        err(ex);
      }
    }

  }*/

  /**
   * This iterates to the next function.
   *
   * It operates differently depending on whether an execution map has been passed in.
   *
   * If an execution map has been specified, it will look for the function or array specified to be chained to the
   * If an execution map has been specified, it will look for the function or array specified to be chained to the
   * end of the current call. In the case of an array, it will call the next item in the array until all functions in the array have 
   * been executed.
   *
   * If no execution map has been specified, functions will be chained in the order they were added.
   *
   * In many cases, the chained function will itself be a new execution chain
   */
  function iterate(last,nextFnName)
  {
    var next_fn=null;
    var i=0;
    var lastFnName = nextFnName || last.alias || last.name;

    if(nextFnName) 
    {
      debug("Skipping to function: " + nextFnName);
      //check to see if the function is in the list of context.functions, if not, it could be in a parent chain, so apply context.parentChainNext
      for(var i=0;i<context.functions.length;i++)
      {
        if(context.functions[i].name==nextFnName || context.functions[i].alias == nextFnName)
        {
          //update the index into the array queue
          context.current_index = i;
          return call_fn(nextFnName,last);
        }
      }
      //apply context.parentChainNext in hopes that we can skip to a parent chain
      if(context.parentChainNext)
        context.parentChainNext.apply({__last:last,__alias:context.alias},[nextFnName]);
    }
    else if(context.execution_map)
    {
      for(var key in context.execution_map)
        if(key==lastFnName)
        {
          next_fn = context.execution_map[key];
          if(typeof next_fn == 'object')
          {
            if (Object.prototype.toString.call(next_fn) == '[object Array]')
              for(i=0; i < next_fn.length; i++)
                if(!context.current_error)
                  call_fn(next_fn[i],last);
          }
          else
            if(typeof next_fn == 'string')
              call_fn(next_fn,last);
        }
      if(!next_fn)
      {
        if(context.parentChainNext)
          context.parentChainNext.apply({__last:last,__alias:context.alias},[nextFnName]);
      }
    }
    else
    {
      context.current_index++;
      if(context.current_index >= context.functions.length)
      {
        if(context.parentChainNext)
        {
          context.parentChainNext.apply({__last:last,__alias:context.alias},[nextFnName]); //if we're a nested chain call next()
        }
        return;
      }
      call_fn(context.functions[context.current_index],last);
    }
  } //end iterate()
  
  /**
   * Determine how o_o was called, and queue functions appropriately
   */
  if(arguments.length > 0)
  {
    var handled=false;

    //check to see if we got an array of functions passed in
    if(Object.prototype.toString.call(args[0]) == "[object Array]")
    {
      var arr = args[0];
      var i=0;
      for(i=0;i<arr.length;i++)
        context.functions.push(arr[i]);
    }
    else
    {
      //this isn't an array, determine the type of the argument
      switch(typeof args[0])
      {
        case 'function': //functions get queued
          fn = args[0];
          debug("Adding function: " + fn.name || "anonymous" + " to function queue.");
          context.functions.push(fn);
          break;
        case 'object': //objects are interpreted as an execution map
          debug("Checking plugins...");
          //check to see if we have any plugins that will handle this call
          if(o_o.plugins.length)
          {
            for(var i=0; i < o_o.plugins.length; i++)
              if(o_o.plugins[i](context,args[0])) {handled = true;debug("found plugin"); break;}
          }

          if(handled) break; //the plugin handled this, move on
          debug("Registering execution map");
          context.execution_map = args[0];
          break;
        case 'string': //strings are assumed to be aliases
          if(args.length==1) break; //a string alone is meaningless

          if(args[0]=='error')
          {
            if(typeof args[1] == 'function')
            {
              context.error_handler=args[1]
              break;
            }
          }

          //check to see if we have any plugins that will handle this call
          if(o_o.plugins.length && (typeof args[1] == 'object'))
          {
            for(var i=0; i < o_o.plugins.length; i++)
              if(o_o.plugins[i](context,args[1],args[0])) {handled = true; break;}
          }

          if(handled) break; //the plugin handled this, move on

          fn = args[1];
          if(typeof fn == 'function') //if a function was passed in, queue it. ignore anything else
          {
            fn.alias=args[0];
            debug("Registering aliased function: " + fn.alias);
            context.functions.push(fn);
          }
          break;
        default:
          break;
      } //end switch type
    }
  } //end if arguments.length > 0
  else //no arguments were passed, just execute the chain
  {
    debug("Executing chain...");
    //no arguments were passed, this means it's time to execute starting at the head of the chain
    if(context.execution_map)
      for(key in context.execution_map)
      {
        //get the first key, then break
        call_fn(key,context.last||context);
        break;
      }
    else
    {
      context.current_index=0;
      call_fn(context.functions[0],context.parentChainLast||context);
    }
  }

  //this allows chaining of calls, while preserving context in the 'context' variable
  //this is confusing, but it's helpful to remember that the below function is the
  //thing that actually gets applied with the above "thys" construct in call_fn or call_arr.
  //Therefore, if "this" has a "next" function, we know that this is being invoked from a
  //parent chain, so we want to carry some of the parent's info along.
  //We need to know the parent's next function so that when this chain is done, we can invoke
  //the next() from the parent. We need to know last, so that this.last navigates up the chain,
  //we need to know the alias, because if this is a function in a nested chain, the nested chain
  //could have been aliased like o_o("someAlias",o_o(...)), and we need to carry that through
  //and __parent is a reference to the context object of the current chain
  return function() 
          { 
            //handle nested chains, carry assignment of next() and 'last' through to 'this' context of tail and head functions
            //also grab the __alias in case we're an aliased nested chain
            if(this.next)
              context.parentChainNext=this.next;
            if(this.last)
              context.parentChainLast=this.last;
            if(this.__alias)
              context.alias=this.__alias;
            if(this.__parent)
              context.parent=this.__parent;

            //closure around context 
            return o_o.apply(context,arguments); 
          };
}

function debug(message)
{
  if(o_o.debug)
    console.log(message);
}

o_o.plugins=[]; //init plugins array

if(module && module.exports)
  module.exports = o_o;

