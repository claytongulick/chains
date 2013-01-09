/*
   chains.testplugin.js

   test plugin for chains.js

   This plugin is only used to test the plugin capabilities of chains.js

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

o_o.plugins.push(
  function(self,options,alias)
  {
    //we want to handle any object passed in that have a property "test" that is truthy
    if(typeof options != 'object') return false; //returning false indicates that we're not handling this function call
    if(!options.test) return false;
    var fn = function()
    {
      this.result="test plugin";
      this.value = options.value;
      setTimeout(this.next,1); //execute next asynchronously
    };
    if(alias) fn.alias=alias;
    self.functions.push(fn);

    return true;

  });
