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

  //if this==window this is an initial invocation, create the self context that will be passed to chained calls
  //if this!=window, this is a chained call, and 'self' has been applied as 'this', so get a reference to it
 var self = (this.__o_o__ ? this :  
 {
    functions: [],
    current_index: 0,
    execution_map: null,
    error_handler: null,
    err: null,
    __o_o__: true //sentinel flag to track current context. Indicates that we're in a chain
  });

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
    }
      
    fn.start_execute = new Date().getTime(); //tag the start time for runtime performance evaluation
    debug("Executing function: " + (fn.name || fn.alias || "anonymous") + " start time: " + fn.start_execute);
    var thys;

    //create a 'this' context for the invoked function
    //this context contains the next and last members, which allow chaining.
    //the next member is a closure around o_o.next
      thys = {
        //pass the name or alias into the 'this' context. This is useful for
        //execution maps of aliased nested chains
        __alias: fn.alias || fn.name,
        error: function(err) 
        { 
          self.err=err; 
          if(self.error_handler) 
          {  
            self.error_handler(err); 
          }
        },
        
        next: function(nextFnName)
        {
          //check to see if we've been invoked from a different chain, this supports nesting chains
          if(this.__last) //check to see if 'last' is being passed up from a nested chain
          {
            this.__last.end_execute = new Date().getTime();
            debug("Function chain: " + this.__alias + " complete. End execution time: " + this.__last.end_execute + " total time: " + (this.__last.end_execute - this.__last.start_execute));
            this.__last.alias=this.__alias;
            next(this.__last,nextFnName)
          }
          else
          {
            fn.end_execute = new Date().getTime();
            debug("Function: " + (fn.alias || fn.name || "anonymous") + " complete. End execution time: " + fn.end_execute + " total time: " + (fn.end_execute - fn.start_execute));
            //copy the 'this' context and preserve it once execution context has faded
            for(key in thys)
              fn[key] = thys[key];
            next(fn,nextFnName);
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
      if(self.error_handler)
        self.error_handler(ex);
    }
  }

  /**
   * This calls the next function.
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
  function next(last,nextFnName)
  {
    var next_fn=null;
    var i=0;
    var lastFnName = nextFnName || last.alias || last.name;

    if(nextFnName) 
    {
      debug("Skipping to function: " + nextFnName);
      //check to see if the function is in the list of self.functions, if not, it could be in a parent chain, so apply self.next
      for(var i=0;i<self.functions.length;i++)
      {
        if(self.functions[i].name==nextFnName || self.functions[i].alias == nextFnName)
          return call_fn(nextFnName,last);
      }
      //apply self.next in hopes that we can skip to a parent chain
      if(self.next)
        self.next.apply({__last:last,__alias:self.alias},[nextFnName]);
    }
    else if(self.execution_map)
    {
      for(var key in self.execution_map)
        if(key==lastFnName)
        {
          next_fn = self.execution_map[key];
          if(typeof next_fn == 'object')
          {
            if (Object.prototype.toString.call(next_fn) == '[object Array]')
              for(i=0; i < next_fn.length; i++)
                if(!self.err)
                  call_fn(next_fn[i],last);
          }
          else
            if(typeof next_fn == 'string')
              call_fn(next_fn,last);
        }
      if(!next_fn)
      {
        if(self.next)
          self.next.apply({__last:last,__alias:self.alias},[nextFnName]);
      }
    }
    else
    {
      self.current_index++;
      if(self.current_index >= self.functions.length)
      {
        if(self.next)
        {
          self.next.apply({__last:last,__alias:self.alias},[nextFnName]); //if we're a nested chain call next()
        }
        return;
      }
      call_fn(self.functions[self.current_index],last);
    }
  } //end next()
  
  /**
   * Determine how o_o was called, and queue functions appropriately
   */
  if(arguments.length > 0)
  {
    var handled=false;

    switch(typeof args[0])
    {
      case 'function': //functions get queued
        fn = args[0];
        debug("Adding function: " + fn.name || "anonymous" + " to function queue.");
        self.functions.push(fn);
        break;
      case 'object': //objects are interpreted as an execution map
        debug("Checking plugins...");
        //check to see if we have any plugins that will handle this call
        if(o_o.plugins.length)
        {
          for(var i=0; i < o_o.plugins.length; i++)
            if(o_o.plugins[i](self,args[0])) {handled = true;debug("found plugin"); break;}
        }

        if(handled) break; //the plugin handled this, move on
        debug("Registering execution map");
        self.execution_map = args[0];
        break;
      case 'string': //strings are assumed to be aliases
        if(args.length==1) break; //a string alone is meaningless

        if(args[0]=='error')
        {
          if(typeof args[1] == 'function')
          {
            self.error_handler=args[1]
            break;
          }
        }

        //check to see if we have any plugins that will handle this call
        if(o_o.plugins.length && (typeof args[1] == 'object'))
        {
          for(var i=0; i < o_o.plugins.length; i++)
            if(o_o.plugins[i](self,args[1],args[0])) {handled = true; break;}
        }

        if(handled) break; //the plugin handled this, move on

        fn = args[1];
        if(typeof fn == 'function') //if a function was passed in, queue it. ignore anything else
        {
          fn.alias=args[0];
          debug("Registering aliased function: " + fn.alias);
          self.functions.push(fn);
        }
        break;
      default:
        break;
    }
  }
  else
  {
    debug("Executing chain...");
    //no arguments were passed, this means it's time to execute starting at the head of the chain
    if(self.execution_map)
      for(key in self.execution_map)
      {
        //get the first key, then break
        call_fn(key,self.last||self);
        break;
      }
    else
      call_fn(self.functions[0],self.last||self);
  }

  //this allows chaining of calls, while preserving context in the 'self' variable
  return function() 
          { 
            //handle nested chains, carry assignment of next() and 'last' through to 'this' context of tail and head functions
            //also grab the __alias in case we're an aliased nested chain
            if(this.next)
              self.next=this.next;
            if(this.last)
              self.last=this.last;
            if(this.__alias)
              self.alias=this.__alias;

            //closure around self
            return o_o.apply(self,arguments); 
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

