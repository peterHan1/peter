// { "framework": "Vue" }

/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};
/******/
/******/    // The require function
/******/    function __webpack_require__(moduleId) {
/******/
/******/        // Check if module is in cache
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;
/******/
/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            exports: {},
/******/            id: moduleId,
/******/            loaded: false
/******/        };
/******/
/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/        // Flag the module as loaded
/******/        module.loaded = true;
/******/
/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }
/******/
/******/
/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;
/******/
/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;
/******/
/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";
/******/
/******/    // Load entry module and return exports
/******/    return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';
    
    var _vue = __webpack_require__(1);
    
    var _vue2 = _interopRequireDefault(_vue);
    
    var _shopBase = __webpack_require__(3);
    
    var _shopBase2 = _interopRequireDefault(_shopBase);
    
    var _shopModal = __webpack_require__(8);
    
    var _shopModal2 = _interopRequireDefault(_shopModal);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    window.Vue = _vue2.default;
    
    /**
     * 注册component
     * 
     */
    
    // import TestComponent from './components/test/test.vue'
    // Vue.component('test-component', TestComponent)
    
    
    /**
     * 注册module
     * 
     */
    __webpack_require__(27);
    window.weex.config.rrr = 'sdsds';
    // shopBase
    
    window.weex.registerModule('shopBase', _shopBase2.default);
    
    // shopModal
    
    window.weex.registerModule('shopModal', _shopModal2.default);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

    /* WEBPACK VAR INJECTION */(function(process, global) {/*!
     * Vue.js v2.1.10
     * (c) 2014-2017 Evan You
     * Released under the MIT License.
     */'use strict';/*  *//**
     * Convert a value to a string that is actually rendered.
     */var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};function _toString(val){return val==null?'':(typeof val==='undefined'?'undefined':_typeof(val))==='object'?JSON.stringify(val,null,2):String(val);}/**
     * Convert a input value to a number for persistence.
     * If the conversion fails, return original string.
     */function toNumber(val){var n=parseFloat(val);return isNaN(n)?val:n;}/**
     * Make a map and return a function for checking if a key
     * is in that map.
     */function makeMap(str,expectsLowerCase){var map=Object.create(null);var list=str.split(',');for(var i=0;i<list.length;i++){map[list[i]]=true;}return expectsLowerCase?function(val){return map[val.toLowerCase()];}:function(val){return map[val];};}/**
     * Check if a tag is a built-in tag.
     */var isBuiltInTag=makeMap('slot,component',true);/**
     * Remove an item from an array
     */function remove$1(arr,item){if(arr.length){var index=arr.indexOf(item);if(index>-1){return arr.splice(index,1);}}}/**
     * Check whether the object has the property.
     */var hasOwnProperty=Object.prototype.hasOwnProperty;function hasOwn(obj,key){return hasOwnProperty.call(obj,key);}/**
     * Check if value is primitive
     */function isPrimitive(value){return typeof value==='string'||typeof value==='number';}/**
     * Create a cached version of a pure function.
     */function cached(fn){var cache=Object.create(null);return function cachedFn(str){var hit=cache[str];return hit||(cache[str]=fn(str));};}/**
     * Camelize a hyphen-delimited string.
     */var camelizeRE=/-(\w)/g;var camelize=cached(function(str){return str.replace(camelizeRE,function(_,c){return c?c.toUpperCase():'';});});/**
     * Capitalize a string.
     */var capitalize=cached(function(str){return str.charAt(0).toUpperCase()+str.slice(1);});/**
     * Hyphenate a camelCase string.
     */var hyphenateRE=/([^-])([A-Z])/g;var hyphenate=cached(function(str){return str.replace(hyphenateRE,'$1-$2').replace(hyphenateRE,'$1-$2').toLowerCase();});/**
     * Simple bind, faster than native
     */function bind$1(fn,ctx){function boundFn(a){var l=arguments.length;return l?l>1?fn.apply(ctx,arguments):fn.call(ctx,a):fn.call(ctx);}// record original fn length
    boundFn._length=fn.length;return boundFn;}/**
     * Convert an Array-like object to a real Array.
     */function toArray(list,start){start=start||0;var i=list.length-start;var ret=new Array(i);while(i--){ret[i]=list[i+start];}return ret;}/**
     * Mix properties into target object.
     */function extend(to,_from){for(var key in _from){to[key]=_from[key];}return to;}/**
     * Quick object check - this is primarily used to tell
     * Objects from primitive values when we know the value
     * is a JSON-compliant type.
     */function isObject(obj){return obj!==null&&(typeof obj==='undefined'?'undefined':_typeof(obj))==='object';}/**
     * Strict object type check. Only returns true
     * for plain JavaScript objects.
     */var toString=Object.prototype.toString;var OBJECT_STRING='[object Object]';function isPlainObject(obj){return toString.call(obj)===OBJECT_STRING;}/**
     * Merge an Array of Objects into a single Object.
     */function toObject(arr){var res={};for(var i=0;i<arr.length;i++){if(arr[i]){extend(res,arr[i]);}}return res;}/**
     * Perform no operation.
     */function noop(){}/**
     * Always return false.
     */var no=function no(){return false;};/**
     * Return same value
     */var identity=function identity(_){return _;};/**
     * Generate a static keys string from compiler modules.
     */function genStaticKeys(modules){return modules.reduce(function(keys,m){return keys.concat(m.staticKeys||[]);},[]).join(',');}/**
     * Check if two values are loosely equal - that is,
     * if they are plain objects, do they have the same shape?
     */function looseEqual(a,b){var isObjectA=isObject(a);var isObjectB=isObject(b);if(isObjectA&&isObjectB){return JSON.stringify(a)===JSON.stringify(b);}else if(!isObjectA&&!isObjectB){return String(a)===String(b);}else{return false;}}function looseIndexOf(arr,val){for(var i=0;i<arr.length;i++){if(looseEqual(arr[i],val)){return i;}}return-1;}/*  */var config={/**
       * Option merge strategies (used in core/util/options)
       */optionMergeStrategies:Object.create(null),/**
       * Whether to suppress warnings.
       */silent:false,/**
       * Whether to enable devtools
       */devtools:process.env.NODE_ENV!=='production',/**
       * Error handler for watcher errors
       */errorHandler:null,/**
       * Ignore certain custom elements
       */ignoredElements:[],/**
       * Custom user key aliases for v-on
       */keyCodes:Object.create(null),/**
       * Check if a tag is reserved so that it cannot be registered as a
       * component. This is platform-dependent and may be overwritten.
       */isReservedTag:no,/**
       * Check if a tag is an unknown element.
       * Platform-dependent.
       */isUnknownElement:no,/**
       * Get the namespace of an element
       */getTagNamespace:noop,/**
       * Parse the real tag name for the specific platform.
       */parsePlatformTagName:identity,/**
       * Check if an attribute must be bound using property, e.g. value
       * Platform-dependent.
       */mustUseProp:no,/**
       * List of asset types that a component can own.
       */_assetTypes:['component','directive','filter'],/**
       * List of lifecycle hooks.
       */_lifecycleHooks:['beforeCreate','created','beforeMount','mounted','beforeUpdate','updated','beforeDestroy','destroyed','activated','deactivated'],/**
       * Max circular updates allowed in a scheduler flush cycle.
       */_maxUpdateCount:100};/*  *//**
     * Check if a string starts with $ or _
     */function isReserved(str){var c=(str+'').charCodeAt(0);return c===0x24||c===0x5F;}/**
     * Define a property.
     */function def(obj,key,val,enumerable){Object.defineProperty(obj,key,{value:val,enumerable:!!enumerable,writable:true,configurable:true});}/**
     * Parse simple path.
     */var bailRE=/[^\w.$]/;function parsePath(path){if(bailRE.test(path)){return;}else{var segments=path.split('.');return function(obj){for(var i=0;i<segments.length;i++){if(!obj){return;}obj=obj[segments[i]];}return obj;};}}/*  *//* globals MutationObserver */// can we use __proto__?
    var hasProto='__proto__'in{};// Browser environment sniffing
    var inBrowser=typeof window!=='undefined';var UA=inBrowser&&window.navigator.userAgent.toLowerCase();var isIE=UA&&/msie|trident/.test(UA);var isIE9=UA&&UA.indexOf('msie 9.0')>0;var isEdge=UA&&UA.indexOf('edge/')>0;var isAndroid=UA&&UA.indexOf('android')>0;var isIOS=UA&&/iphone|ipad|ipod|ios/.test(UA);// this needs to be lazy-evaled because vue may be required before
    // vue-server-renderer can set VUE_ENV
    var _isServer;var isServerRendering=function isServerRendering(){if(_isServer===undefined){/* istanbul ignore if */if(!inBrowser&&typeof global!=='undefined'){// detect presence of vue-server-renderer and avoid
    // Webpack shimming the process
    _isServer=global['process'].env.VUE_ENV==='server';}else{_isServer=false;}}return _isServer;};// detect devtools
    var devtools=inBrowser&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;/* istanbul ignore next */function isNative(Ctor){return /native code/.test(Ctor.toString());}/**
     * Defer a task to execute it asynchronously.
     */var nextTick=function(){var callbacks=[];var pending=false;var timerFunc;function nextTickHandler(){pending=false;var copies=callbacks.slice(0);callbacks.length=0;for(var i=0;i<copies.length;i++){copies[i]();}}// the nextTick behavior leverages the microtask queue, which can be accessed
    // via either native Promise.then or MutationObserver.
    // MutationObserver has wider support, however it is seriously bugged in
    // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
    // completely stops working after triggering a few times... so, if native
    // Promise is available, we will use it:
    /* istanbul ignore if */if(typeof Promise!=='undefined'&&isNative(Promise)){var p=Promise.resolve();var logError=function logError(err){console.error(err);};timerFunc=function timerFunc(){p.then(nextTickHandler).catch(logError);// in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if(isIOS){setTimeout(noop);}};}else if(typeof MutationObserver!=='undefined'&&(isNative(MutationObserver)||// PhantomJS and iOS 7.x
    MutationObserver.toString()==='[object MutationObserverConstructor]')){// use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter=1;var observer=new MutationObserver(nextTickHandler);var textNode=document.createTextNode(String(counter));observer.observe(textNode,{characterData:true});timerFunc=function timerFunc(){counter=(counter+1)%2;textNode.data=String(counter);};}else{// fallback to setTimeout
    /* istanbul ignore next */timerFunc=function timerFunc(){setTimeout(nextTickHandler,0);};}return function queueNextTick(cb,ctx){var _resolve;callbacks.push(function(){if(cb){cb.call(ctx);}if(_resolve){_resolve(ctx);}});if(!pending){pending=true;timerFunc();}if(!cb&&typeof Promise!=='undefined'){return new Promise(function(resolve){_resolve=resolve;});}};}();var _Set;/* istanbul ignore if */if(typeof Set!=='undefined'&&isNative(Set)){// use native Set when available.
    _Set=Set;}else{// a non-standard Set polyfill that only works with primitive keys.
    _Set=function(){function Set(){this.set=Object.create(null);}Set.prototype.has=function has(key){return this.set[key]===true;};Set.prototype.add=function add(key){this.set[key]=true;};Set.prototype.clear=function clear(){this.set=Object.create(null);};return Set;}();}var warn=noop;var formatComponentName;if(process.env.NODE_ENV!=='production'){var hasConsole=typeof console!=='undefined';warn=function warn(msg,vm){if(hasConsole&&!config.silent){console.error("[Vue warn]: "+msg+" "+(vm?formatLocation(formatComponentName(vm)):''));}};formatComponentName=function formatComponentName(vm){if(vm.$root===vm){return'root instance';}var name=vm._isVue?vm.$options.name||vm.$options._componentTag:vm.name;return(name?"component <"+name+">":"anonymous component")+(vm._isVue&&vm.$options.__file?" at "+vm.$options.__file:'');};var formatLocation=function formatLocation(str){if(str==='anonymous component'){str+=" - use the \"name\" option for better debugging messages.";}return"\n(found in "+str+")";};}/*  */var uid$1=0;/**
     * A dep is an observable that can have multiple
     * directives subscribing to it.
     */var Dep=function Dep(){this.id=uid$1++;this.subs=[];};Dep.prototype.addSub=function addSub(sub){this.subs.push(sub);};Dep.prototype.removeSub=function removeSub(sub){remove$1(this.subs,sub);};Dep.prototype.depend=function depend(){if(Dep.target){Dep.target.addDep(this);}};Dep.prototype.notify=function notify(){// stablize the subscriber list first
    var subs=this.subs.slice();for(var i=0,l=subs.length;i<l;i++){subs[i].update();}};// the current target watcher being evaluated.
    // this is globally unique because there could be only one
    // watcher being evaluated at any time.
    Dep.target=null;var targetStack=[];function pushTarget(_target){if(Dep.target){targetStack.push(Dep.target);}Dep.target=_target;}function popTarget(){Dep.target=targetStack.pop();}/*
     * not type checking this file because flow doesn't play well with
     * dynamically accessing methods on Array prototype
     */var arrayProto=Array.prototype;var arrayMethods=Object.create(arrayProto);['push','pop','shift','unshift','splice','sort','reverse'].forEach(function(method){// cache original method
    var original=arrayProto[method];def(arrayMethods,method,function mutator(){var arguments$1=arguments;// avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i=arguments.length;var args=new Array(i);while(i--){args[i]=arguments$1[i];}var result=original.apply(this,args);var ob=this.__ob__;var inserted;switch(method){case'push':inserted=args;break;case'unshift':inserted=args;break;case'splice':inserted=args.slice(2);break;}if(inserted){ob.observeArray(inserted);}// notify change
    ob.dep.notify();return result;});});/*  */var arrayKeys=Object.getOwnPropertyNames(arrayMethods);/**
     * By default, when a reactive property is set, the new value is
     * also converted to become reactive. However when passing down props,
     * we don't want to force conversion because the value may be a nested value
     * under a frozen data structure. Converting it would defeat the optimization.
     */var observerState={shouldConvert:true,isSettingProps:false};/**
     * Observer class that are attached to each observed
     * object. Once attached, the observer converts target
     * object's property keys into getter/setters that
     * collect dependencies and dispatches updates.
     */var Observer=function Observer(value){this.value=value;this.dep=new Dep();this.vmCount=0;def(value,'__ob__',this);if(Array.isArray(value)){var augment=hasProto?protoAugment:copyAugment;augment(value,arrayMethods,arrayKeys);this.observeArray(value);}else{this.walk(value);}};/**
     * Walk through each property and convert them into
     * getter/setters. This method should only be called when
     * value type is Object.
     */Observer.prototype.walk=function walk(obj){var keys=Object.keys(obj);for(var i=0;i<keys.length;i++){defineReactive$$1(obj,keys[i],obj[keys[i]]);}};/**
     * Observe a list of Array items.
     */Observer.prototype.observeArray=function observeArray(items){for(var i=0,l=items.length;i<l;i++){observe(items[i]);}};// helpers
    /**
     * Augment an target Object or Array by intercepting
     * the prototype chain using __proto__
     */function protoAugment(target,src){/* eslint-disable no-proto */target.__proto__=src;/* eslint-enable no-proto */}/**
     * Augment an target Object or Array by defining
     * hidden properties.
     *//* istanbul ignore next */function copyAugment(target,src,keys){for(var i=0,l=keys.length;i<l;i++){var key=keys[i];def(target,key,src[key]);}}/**
     * Attempt to create an observer instance for a value,
     * returns the new observer if successfully observed,
     * or the existing observer if the value already has one.
     */function observe(value,asRootData){if(!isObject(value)){return;}var ob;if(hasOwn(value,'__ob__')&&value.__ob__ instanceof Observer){ob=value.__ob__;}else if(observerState.shouldConvert&&!isServerRendering()&&(Array.isArray(value)||isPlainObject(value))&&Object.isExtensible(value)&&!value._isVue){ob=new Observer(value);}if(asRootData&&ob){ob.vmCount++;}return ob;}/**
     * Define a reactive property on an Object.
     */function defineReactive$$1(obj,key,val,customSetter){var dep=new Dep();var property=Object.getOwnPropertyDescriptor(obj,key);if(property&&property.configurable===false){return;}// cater for pre-defined getter/setters
    var getter=property&&property.get;var setter=property&&property.set;var childOb=observe(val);Object.defineProperty(obj,key,{enumerable:true,configurable:true,get:function reactiveGetter(){var value=getter?getter.call(obj):val;if(Dep.target){dep.depend();if(childOb){childOb.dep.depend();}if(Array.isArray(value)){dependArray(value);}}return value;},set:function reactiveSetter(newVal){var value=getter?getter.call(obj):val;/* eslint-disable no-self-compare */if(newVal===value||newVal!==newVal&&value!==value){return;}/* eslint-enable no-self-compare */if(process.env.NODE_ENV!=='production'&&customSetter){customSetter();}if(setter){setter.call(obj,newVal);}else{val=newVal;}childOb=observe(newVal);dep.notify();}});}/**
     * Set a property on an object. Adds the new property and
     * triggers change notification if the property doesn't
     * already exist.
     */function set$1(obj,key,val){if(Array.isArray(obj)){obj.length=Math.max(obj.length,key);obj.splice(key,1,val);return val;}if(hasOwn(obj,key)){obj[key]=val;return;}var ob=obj.__ob__;if(obj._isVue||ob&&ob.vmCount){process.env.NODE_ENV!=='production'&&warn('Avoid adding reactive properties to a Vue instance or its root $data '+'at runtime - declare it upfront in the data option.');return;}if(!ob){obj[key]=val;return;}defineReactive$$1(ob.value,key,val);ob.dep.notify();return val;}/**
     * Delete a property and trigger change if necessary.
     */function del(obj,key){var ob=obj.__ob__;if(obj._isVue||ob&&ob.vmCount){process.env.NODE_ENV!=='production'&&warn('Avoid deleting properties on a Vue instance or its root $data '+'- just set it to null.');return;}if(!hasOwn(obj,key)){return;}delete obj[key];if(!ob){return;}ob.dep.notify();}/**
     * Collect dependencies on array elements when the array is touched, since
     * we cannot intercept array element access like property getters.
     */function dependArray(value){for(var e=void 0,i=0,l=value.length;i<l;i++){e=value[i];e&&e.__ob__&&e.__ob__.dep.depend();if(Array.isArray(e)){dependArray(e);}}}/*  *//**
     * Option overwriting strategies are functions that handle
     * how to merge a parent option value and a child option
     * value into the final value.
     */var strats=config.optionMergeStrategies;/**
     * Options with restrictions
     */if(process.env.NODE_ENV!=='production'){strats.el=strats.propsData=function(parent,child,vm,key){if(!vm){warn("option \""+key+"\" can only be used during instance "+'creation with the `new` keyword.');}return defaultStrat(parent,child);};}/**
     * Helper that recursively merges two data objects together.
     */function mergeData(to,from){if(!from){return to;}var key,toVal,fromVal;var keys=Object.keys(from);for(var i=0;i<keys.length;i++){key=keys[i];toVal=to[key];fromVal=from[key];if(!hasOwn(to,key)){set$1(to,key,fromVal);}else if(isPlainObject(toVal)&&isPlainObject(fromVal)){mergeData(toVal,fromVal);}}return to;}/**
     * Data
     */strats.data=function(parentVal,childVal,vm){if(!vm){// in a Vue.extend merge, both should be functions
    if(!childVal){return parentVal;}if(typeof childVal!=='function'){process.env.NODE_ENV!=='production'&&warn('The "data" option should be a function '+'that returns a per-instance value in component '+'definitions.',vm);return parentVal;}if(!parentVal){return childVal;}// when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn(){return mergeData(childVal.call(this),parentVal.call(this));};}else if(parentVal||childVal){return function mergedInstanceDataFn(){// instance merge
    var instanceData=typeof childVal==='function'?childVal.call(vm):childVal;var defaultData=typeof parentVal==='function'?parentVal.call(vm):undefined;if(instanceData){return mergeData(instanceData,defaultData);}else{return defaultData;}};}};/**
     * Hooks and param attributes are merged as arrays.
     */function mergeHook(parentVal,childVal){return childVal?parentVal?parentVal.concat(childVal):Array.isArray(childVal)?childVal:[childVal]:parentVal;}config._lifecycleHooks.forEach(function(hook){strats[hook]=mergeHook;});/**
     * Assets
     *
     * When a vm is present (instance creation), we need to do
     * a three-way merge between constructor options, instance
     * options and parent options.
     */function mergeAssets(parentVal,childVal){var res=Object.create(parentVal||null);return childVal?extend(res,childVal):res;}config._assetTypes.forEach(function(type){strats[type+'s']=mergeAssets;});/**
     * Watchers.
     *
     * Watchers hashes should not overwrite one
     * another, so we merge them as arrays.
     */strats.watch=function(parentVal,childVal){/* istanbul ignore if */if(!childVal){return parentVal;}if(!parentVal){return childVal;}var ret={};extend(ret,parentVal);for(var key in childVal){var parent=ret[key];var child=childVal[key];if(parent&&!Array.isArray(parent)){parent=[parent];}ret[key]=parent?parent.concat(child):[child];}return ret;};/**
     * Other object hashes.
     */strats.props=strats.methods=strats.computed=function(parentVal,childVal){if(!childVal){return parentVal;}if(!parentVal){return childVal;}var ret=Object.create(null);extend(ret,parentVal);extend(ret,childVal);return ret;};/**
     * Default strategy.
     */var defaultStrat=function defaultStrat(parentVal,childVal){return childVal===undefined?parentVal:childVal;};/**
     * Validate component names
     */function checkComponents(options){for(var key in options.components){var lower=key.toLowerCase();if(isBuiltInTag(lower)||config.isReservedTag(lower)){warn('Do not use built-in or reserved HTML elements as component '+'id: '+key);}}}/**
     * Ensure all props option syntax are normalized into the
     * Object-based format.
     */function normalizeProps(options){var props=options.props;if(!props){return;}var res={};var i,val,name;if(Array.isArray(props)){i=props.length;while(i--){val=props[i];if(typeof val==='string'){name=camelize(val);res[name]={type:null};}else if(process.env.NODE_ENV!=='production'){warn('props must be strings when using array syntax.');}}}else if(isPlainObject(props)){for(var key in props){val=props[key];name=camelize(key);res[name]=isPlainObject(val)?val:{type:val};}}options.props=res;}/**
     * Normalize raw function directives into object format.
     */function normalizeDirectives(options){var dirs=options.directives;if(dirs){for(var key in dirs){var def=dirs[key];if(typeof def==='function'){dirs[key]={bind:def,update:def};}}}}/**
     * Merge two option objects into a new one.
     * Core utility used in both instantiation and inheritance.
     */function mergeOptions(parent,child,vm){if(process.env.NODE_ENV!=='production'){checkComponents(child);}normalizeProps(child);normalizeDirectives(child);var extendsFrom=child.extends;if(extendsFrom){parent=typeof extendsFrom==='function'?mergeOptions(parent,extendsFrom.options,vm):mergeOptions(parent,extendsFrom,vm);}if(child.mixins){for(var i=0,l=child.mixins.length;i<l;i++){var mixin=child.mixins[i];if(mixin.prototype instanceof Vue$2){mixin=mixin.options;}parent=mergeOptions(parent,mixin,vm);}}var options={};var key;for(key in parent){mergeField(key);}for(key in child){if(!hasOwn(parent,key)){mergeField(key);}}function mergeField(key){var strat=strats[key]||defaultStrat;options[key]=strat(parent[key],child[key],vm,key);}return options;}/**
     * Resolve an asset.
     * This function is used because child instances need access
     * to assets defined in its ancestor chain.
     */function resolveAsset(options,type,id,warnMissing){/* istanbul ignore if */if(typeof id!=='string'){return;}var assets=options[type];// check local registration variations first
    if(hasOwn(assets,id)){return assets[id];}var camelizedId=camelize(id);if(hasOwn(assets,camelizedId)){return assets[camelizedId];}var PascalCaseId=capitalize(camelizedId);if(hasOwn(assets,PascalCaseId)){return assets[PascalCaseId];}// fallback to prototype chain
    var res=assets[id]||assets[camelizedId]||assets[PascalCaseId];if(process.env.NODE_ENV!=='production'&&warnMissing&&!res){warn('Failed to resolve '+type.slice(0,-1)+': '+id,options);}return res;}/*  */function validateProp(key,propOptions,propsData,vm){var prop=propOptions[key];var absent=!hasOwn(propsData,key);var value=propsData[key];// handle boolean props
    if(isType(Boolean,prop.type)){if(absent&&!hasOwn(prop,'default')){value=false;}else if(!isType(String,prop.type)&&(value===''||value===hyphenate(key))){value=true;}}// check default value
    if(value===undefined){value=getPropDefaultValue(vm,prop,key);// since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert=observerState.shouldConvert;observerState.shouldConvert=true;observe(value);observerState.shouldConvert=prevShouldConvert;}if(process.env.NODE_ENV!=='production'){assertProp(prop,key,value,vm,absent);}return value;}/**
     * Get the default value of a prop.
     */function getPropDefaultValue(vm,prop,key){// no default, return undefined
    if(!hasOwn(prop,'default')){return undefined;}var def=prop.default;// warn against non-factory defaults for Object & Array
    if(isObject(def)){process.env.NODE_ENV!=='production'&&warn('Invalid default value for prop "'+key+'": '+'Props with type Object/Array must use a factory function '+'to return the default value.',vm);}// the raw prop value was also undefined from previous render,
    // return previous default value to avoid unnecessary watcher trigger
    if(vm&&vm.$options.propsData&&vm.$options.propsData[key]===undefined&&vm[key]!==undefined){return vm[key];}// call factory function for non-Function types
    return typeof def==='function'&&prop.type!==Function?def.call(vm):def;}/**
     * Assert whether a prop is valid.
     */function assertProp(prop,name,value,vm,absent){if(prop.required&&absent){warn('Missing required prop: "'+name+'"',vm);return;}if(value==null&&!prop.required){return;}var type=prop.type;var valid=!type||type===true;var expectedTypes=[];if(type){if(!Array.isArray(type)){type=[type];}for(var i=0;i<type.length&&!valid;i++){var assertedType=assertType(value,type[i]);expectedTypes.push(assertedType.expectedType||'');valid=assertedType.valid;}}if(!valid){warn('Invalid prop: type check failed for prop "'+name+'".'+' Expected '+expectedTypes.map(capitalize).join(', ')+', got '+Object.prototype.toString.call(value).slice(8,-1)+'.',vm);return;}var validator=prop.validator;if(validator){if(!validator(value)){warn('Invalid prop: custom validator check failed for prop "'+name+'".',vm);}}}/**
     * Assert the type of a value
     */function assertType(value,type){var valid;var expectedType=getType(type);if(expectedType==='String'){valid=(typeof value==='undefined'?'undefined':_typeof(value))===(expectedType='string');}else if(expectedType==='Number'){valid=(typeof value==='undefined'?'undefined':_typeof(value))===(expectedType='number');}else if(expectedType==='Boolean'){valid=(typeof value==='undefined'?'undefined':_typeof(value))===(expectedType='boolean');}else if(expectedType==='Function'){valid=(typeof value==='undefined'?'undefined':_typeof(value))===(expectedType='function');}else if(expectedType==='Object'){valid=isPlainObject(value);}else if(expectedType==='Array'){valid=Array.isArray(value);}else{valid=value instanceof type;}return{valid:valid,expectedType:expectedType};}/**
     * Use function string name to check built-in types,
     * because a simple equality check will fail when running
     * across different vms / iframes.
     */function getType(fn){var match=fn&&fn.toString().match(/^\s*function (\w+)/);return match&&match[1];}function isType(type,fn){if(!Array.isArray(fn)){return getType(fn)===getType(type);}for(var i=0,len=fn.length;i<len;i++){if(getType(fn[i])===getType(type)){return true;}}/* istanbul ignore next */return false;}var util=Object.freeze({defineReactive:defineReactive$$1,_toString:_toString,toNumber:toNumber,makeMap:makeMap,isBuiltInTag:isBuiltInTag,remove:remove$1,hasOwn:hasOwn,isPrimitive:isPrimitive,cached:cached,camelize:camelize,capitalize:capitalize,hyphenate:hyphenate,bind:bind$1,toArray:toArray,extend:extend,isObject:isObject,isPlainObject:isPlainObject,toObject:toObject,noop:noop,no:no,identity:identity,genStaticKeys:genStaticKeys,looseEqual:looseEqual,looseIndexOf:looseIndexOf,isReserved:isReserved,def:def,parsePath:parsePath,hasProto:hasProto,inBrowser:inBrowser,UA:UA,isIE:isIE,isIE9:isIE9,isEdge:isEdge,isAndroid:isAndroid,isIOS:isIOS,isServerRendering:isServerRendering,devtools:devtools,nextTick:nextTick,get _Set(){return _Set;},mergeOptions:mergeOptions,resolveAsset:resolveAsset,get warn(){return warn;},get formatComponentName(){return formatComponentName;},validateProp:validateProp});/* not type checking this file because flow doesn't play well with Proxy */var initProxy;if(process.env.NODE_ENV!=='production'){var allowedGlobals=makeMap('Infinity,undefined,NaN,isFinite,isNaN,'+'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,'+'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,'+'require'// for Webpack/Browserify
    );var warnNonPresent=function warnNonPresent(target,key){warn("Property or method \""+key+"\" is not defined on the instance but "+"referenced during render. Make sure to declare reactive data "+"properties in the data option.",target);};var hasProxy=typeof Proxy!=='undefined'&&Proxy.toString().match(/native code/);if(hasProxy){var isBuiltInModifier=makeMap('stop,prevent,self,ctrl,shift,alt,meta');config.keyCodes=new Proxy(config.keyCodes,{set:function set(target,key,value){if(isBuiltInModifier(key)){warn("Avoid overwriting built-in modifier in config.keyCodes: ."+key);return false;}else{target[key]=value;return true;}}});}var hasHandler={has:function has(target,key){var has=key in target;var isAllowed=allowedGlobals(key)||key.charAt(0)==='_';if(!has&&!isAllowed){warnNonPresent(target,key);}return has||!isAllowed;}};var getHandler={get:function get(target,key){if(typeof key==='string'&&!(key in target)){warnNonPresent(target,key);}return target[key];}};initProxy=function initProxy(vm){if(hasProxy){// determine which proxy handler to use
    var options=vm.$options;var handlers=options.render&&options.render._withStripped?getHandler:hasHandler;vm._renderProxy=new Proxy(vm,handlers);}else{vm._renderProxy=vm;}};}/*  */var VNode=function VNode(tag,data,children,text,elm,context,componentOptions){this.tag=tag;this.data=data;this.children=children;this.text=text;this.elm=elm;this.ns=undefined;this.context=context;this.functionalContext=undefined;this.key=data&&data.key;this.componentOptions=componentOptions;this.componentInstance=undefined;this.parent=undefined;this.raw=false;this.isStatic=false;this.isRootInsert=true;this.isComment=false;this.isCloned=false;this.isOnce=false;};var prototypeAccessors={child:{}};// DEPRECATED: alias for componentInstance for backwards compat.
    /* istanbul ignore next */prototypeAccessors.child.get=function(){return this.componentInstance;};Object.defineProperties(VNode.prototype,prototypeAccessors);var createEmptyVNode=function createEmptyVNode(){var node=new VNode();node.text='';node.isComment=true;return node;};function createTextVNode(val){return new VNode(undefined,undefined,undefined,String(val));}// optimized shallow clone
    // used for static nodes and slot nodes because they may be reused across
    // multiple renders, cloning them avoids errors when DOM manipulations rely
    // on their elm reference.
    function cloneVNode(vnode){var cloned=new VNode(vnode.tag,vnode.data,vnode.children,vnode.text,vnode.elm,vnode.context,vnode.componentOptions);cloned.ns=vnode.ns;cloned.isStatic=vnode.isStatic;cloned.key=vnode.key;cloned.isCloned=true;return cloned;}function cloneVNodes(vnodes){var res=new Array(vnodes.length);for(var i=0;i<vnodes.length;i++){res[i]=cloneVNode(vnodes[i]);}return res;}/*  */var hooks={init:init,prepatch:prepatch,insert:insert,destroy:destroy$1};var hooksToMerge=Object.keys(hooks);function createComponent(Ctor,data,context,children,tag){if(!Ctor){return;}var baseCtor=context.$options._base;if(isObject(Ctor)){Ctor=baseCtor.extend(Ctor);}if(typeof Ctor!=='function'){if(process.env.NODE_ENV!=='production'){warn("Invalid Component definition: "+String(Ctor),context);}return;}// async component
    if(!Ctor.cid){if(Ctor.resolved){Ctor=Ctor.resolved;}else{Ctor=resolveAsyncComponent(Ctor,baseCtor,function(){// it's ok to queue this on every render because
    // $forceUpdate is buffered by the scheduler.
    context.$forceUpdate();});if(!Ctor){// return nothing if this is indeed an async component
    // wait for the callback to trigger parent update.
    return;}}}// resolve constructor options in case global mixins are applied after
    // component constructor creation
    resolveConstructorOptions(Ctor);data=data||{};// extract props
    var propsData=extractProps(data,Ctor);// functional component
    if(Ctor.options.functional){return createFunctionalComponent(Ctor,propsData,data,context,children);}// extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    var listeners=data.on;// replace with listeners with .native modifier
    data.on=data.nativeOn;if(Ctor.options.abstract){// abstract components do not keep anything
    // other than props & listeners
    data={};}// merge component management hooks onto the placeholder node
    mergeHooks(data);// return a placeholder vnode
    var name=Ctor.options.name||tag;var vnode=new VNode("vue-component-"+Ctor.cid+(name?"-"+name:''),data,undefined,undefined,undefined,context,{Ctor:Ctor,propsData:propsData,listeners:listeners,tag:tag,children:children});return vnode;}function createFunctionalComponent(Ctor,propsData,data,context,children){var props={};var propOptions=Ctor.options.props;if(propOptions){for(var key in propOptions){props[key]=validateProp(key,propOptions,propsData);}}// ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    var _context=Object.create(context);var h=function h(a,b,c,d){return createElement(_context,a,b,c,d,true);};var vnode=Ctor.options.render.call(null,h,{props:props,data:data,parent:context,children:children,slots:function slots(){return resolveSlots(children,context);}});if(vnode instanceof VNode){vnode.functionalContext=context;if(data.slot){(vnode.data||(vnode.data={})).slot=data.slot;}}return vnode;}function createComponentInstanceForVnode(vnode,// we know it's MountedComponentVNode but flow doesn't
    parent,// activeInstance in lifecycle state
    parentElm,refElm){var vnodeComponentOptions=vnode.componentOptions;var options={_isComponent:true,parent:parent,propsData:vnodeComponentOptions.propsData,_componentTag:vnodeComponentOptions.tag,_parentVnode:vnode,_parentListeners:vnodeComponentOptions.listeners,_renderChildren:vnodeComponentOptions.children,_parentElm:parentElm||null,_refElm:refElm||null};// check inline-template render functions
    var inlineTemplate=vnode.data.inlineTemplate;if(inlineTemplate){options.render=inlineTemplate.render;options.staticRenderFns=inlineTemplate.staticRenderFns;}return new vnodeComponentOptions.Ctor(options);}function init(vnode,hydrating,parentElm,refElm){if(!vnode.componentInstance||vnode.componentInstance._isDestroyed){var child=vnode.componentInstance=createComponentInstanceForVnode(vnode,activeInstance,parentElm,refElm);child.$mount(hydrating?vnode.elm:undefined,hydrating);}else if(vnode.data.keepAlive){// kept-alive components, treat as a patch
    var mountedNode=vnode;// work around flow
    prepatch(mountedNode,mountedNode);}}function prepatch(oldVnode,vnode){var options=vnode.componentOptions;var child=vnode.componentInstance=oldVnode.componentInstance;child._updateFromParent(options.propsData,// updated props
    options.listeners,// updated listeners
    vnode,// new parent vnode
    options.children// new children
    );}function insert(vnode){if(!vnode.componentInstance._isMounted){vnode.componentInstance._isMounted=true;callHook(vnode.componentInstance,'mounted');}if(vnode.data.keepAlive){vnode.componentInstance._inactive=false;callHook(vnode.componentInstance,'activated');}}function destroy$1(vnode){if(!vnode.componentInstance._isDestroyed){if(!vnode.data.keepAlive){vnode.componentInstance.$destroy();}else{vnode.componentInstance._inactive=true;callHook(vnode.componentInstance,'deactivated');}}}function resolveAsyncComponent(factory,baseCtor,cb){if(factory.requested){// pool callbacks
    factory.pendingCallbacks.push(cb);}else{factory.requested=true;var cbs=factory.pendingCallbacks=[cb];var sync=true;var resolve=function resolve(res){if(isObject(res)){res=baseCtor.extend(res);}// cache resolved
    factory.resolved=res;// invoke callbacks only if this is not a synchronous resolve
    // (async resolves are shimmed as synchronous during SSR)
    if(!sync){for(var i=0,l=cbs.length;i<l;i++){cbs[i](res);}}};var reject=function reject(reason){process.env.NODE_ENV!=='production'&&warn("Failed to resolve async component: "+String(factory)+(reason?"\nReason: "+reason:''));};var res=factory(resolve,reject);// handle promise
    if(res&&typeof res.then==='function'&&!factory.resolved){res.then(resolve,reject);}sync=false;// return in case resolved synchronously
    return factory.resolved;}}function extractProps(data,Ctor){// we are only extracting raw values here.
    // validation and default values are handled in the child
    // component itself.
    var propOptions=Ctor.options.props;if(!propOptions){return;}var res={};var attrs=data.attrs;var props=data.props;var domProps=data.domProps;if(attrs||props||domProps){for(var key in propOptions){var altKey=hyphenate(key);checkProp(res,props,key,altKey,true)||checkProp(res,attrs,key,altKey)||checkProp(res,domProps,key,altKey);}}return res;}function checkProp(res,hash,key,altKey,preserve){if(hash){if(hasOwn(hash,key)){res[key]=hash[key];if(!preserve){delete hash[key];}return true;}else if(hasOwn(hash,altKey)){res[key]=hash[altKey];if(!preserve){delete hash[altKey];}return true;}}return false;}function mergeHooks(data){if(!data.hook){data.hook={};}for(var i=0;i<hooksToMerge.length;i++){var key=hooksToMerge[i];var fromParent=data.hook[key];var ours=hooks[key];data.hook[key]=fromParent?mergeHook$1(ours,fromParent):ours;}}function mergeHook$1(one,two){return function(a,b,c,d){one(a,b,c,d);two(a,b,c,d);};}/*  */function mergeVNodeHook(def,hookKey,hook,key){key=key+hookKey;var injectedHash=def.__injected||(def.__injected={});if(!injectedHash[key]){injectedHash[key]=true;var oldHook=def[hookKey];if(oldHook){def[hookKey]=function(){oldHook.apply(this,arguments);hook.apply(this,arguments);};}else{def[hookKey]=hook;}}}/*  */var normalizeEvent=cached(function(name){var once=name.charAt(0)==='~';// Prefixed last, checked first
    name=once?name.slice(1):name;var capture=name.charAt(0)==='!';name=capture?name.slice(1):name;return{name:name,once:once,capture:capture};});function createEventHandle(fn){var handle={fn:fn,invoker:function invoker(){var arguments$1=arguments;var fn=handle.fn;if(Array.isArray(fn)){for(var i=0;i<fn.length;i++){fn[i].apply(null,arguments$1);}}else{fn.apply(null,arguments);}}};return handle;}function updateListeners(on,oldOn,add,remove$$1,vm){var name,cur,old,event;for(name in on){cur=on[name];old=oldOn[name];event=normalizeEvent(name);if(!cur){process.env.NODE_ENV!=='production'&&warn("Invalid handler for event \""+event.name+"\": got "+String(cur),vm);}else if(!old){if(!cur.invoker){cur=on[name]=createEventHandle(cur);}add(event.name,cur.invoker,event.once,event.capture);}else if(cur!==old){old.fn=cur;on[name]=old;}}for(name in oldOn){if(!on[name]){event=normalizeEvent(name);remove$$1(event.name,oldOn[name].invoker,event.capture);}}}/*  */// The template compiler attempts to minimize the need for normalization by
    // statically analyzing the template at compile time.
    //
    // For plain HTML markup, normalization can be completely skipped because the
    // generated render function is guaranteed to return Array<VNode>. There are
    // two cases where extra normalization is needed:
    // 1. When the children contains components - because a functional component
    // may return an Array instead of a single root. In this case, just a simple
    // nomralization is needed - if any child is an Array, we flatten the whole
    // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
    // because functional components already normalize their own children.
    function simpleNormalizeChildren(children){for(var i=0;i<children.length;i++){if(Array.isArray(children[i])){return Array.prototype.concat.apply([],children);}}return children;}// 2. When the children contains constrcuts that always generated nested Arrays,
    // e.g. <template>, <slot>, v-for, or when the children is provided by user
    // with hand-written render functions / JSX. In such cases a full normalization
    // is needed to cater to all possible types of children values.
    function normalizeChildren(children){return isPrimitive(children)?[createTextVNode(children)]:Array.isArray(children)?normalizeArrayChildren(children):undefined;}function normalizeArrayChildren(children,nestedIndex){var res=[];var i,c,last;for(i=0;i<children.length;i++){c=children[i];if(c==null||typeof c==='boolean'){continue;}last=res[res.length-1];//  nested
    if(Array.isArray(c)){res.push.apply(res,normalizeArrayChildren(c,(nestedIndex||'')+"_"+i));}else if(isPrimitive(c)){if(last&&last.text){last.text+=String(c);}else if(c!==''){// convert primitive to vnode
    res.push(createTextVNode(c));}}else{if(c.text&&last&&last.text){res[res.length-1]=createTextVNode(last.text+c.text);}else{// default key for nested array children (likely generated by v-for)
    if(c.tag&&c.key==null&&nestedIndex!=null){c.key="__vlist"+nestedIndex+"_"+i+"__";}res.push(c);}}}return res;}/*  */function getFirstComponentChild(children){return children&&children.filter(function(c){return c&&c.componentOptions;})[0];}/*  */var SIMPLE_NORMALIZE=1;var ALWAYS_NORMALIZE=2;// wrapper function for providing a more flexible interface
    // without getting yelled at by flow
    function createElement(context,tag,data,children,normalizationType,alwaysNormalize){if(Array.isArray(data)||isPrimitive(data)){normalizationType=children;children=data;data=undefined;}if(alwaysNormalize){normalizationType=ALWAYS_NORMALIZE;}return _createElement(context,tag,data,children,normalizationType);}function _createElement(context,tag,data,children,normalizationType){if(data&&data.__ob__){process.env.NODE_ENV!=='production'&&warn("Avoid using observed data object as vnode data: "+JSON.stringify(data)+"\n"+'Always create fresh vnode data objects in each render!',context);return createEmptyVNode();}if(!tag){// in case of component :is set to falsy value
    return createEmptyVNode();}// support single function children as default scoped slot
    if(Array.isArray(children)&&typeof children[0]==='function'){data=data||{};data.scopedSlots={default:children[0]};children.length=0;}if(normalizationType===ALWAYS_NORMALIZE){children=normalizeChildren(children);}else if(normalizationType===SIMPLE_NORMALIZE){children=simpleNormalizeChildren(children);}var vnode,ns;if(typeof tag==='string'){var Ctor;ns=config.getTagNamespace(tag);if(config.isReservedTag(tag)){// platform built-in elements
    vnode=new VNode(config.parsePlatformTagName(tag),data,children,undefined,undefined,context);}else if(Ctor=resolveAsset(context.$options,'components',tag)){// component
    vnode=createComponent(Ctor,data,context,children,tag);}else{// unknown or unlisted namespaced elements
    // check at runtime because it may get assigned a namespace when its
    // parent normalizes children
    vnode=new VNode(tag,data,children,undefined,undefined,context);}}else{// direct component options / constructor
    vnode=createComponent(tag,data,context,children);}if(vnode){if(ns){applyNS(vnode,ns);}return vnode;}else{return createEmptyVNode();}}function applyNS(vnode,ns){vnode.ns=ns;if(vnode.tag==='foreignObject'){// use default namespace inside foreignObject
    return;}if(vnode.children){for(var i=0,l=vnode.children.length;i<l;i++){var child=vnode.children[i];if(child.tag&&!child.ns){applyNS(child,ns);}}}}/*  */function initRender(vm){vm.$vnode=null;// the placeholder node in parent tree
    vm._vnode=null;// the root of the child tree
    vm._staticTrees=null;var parentVnode=vm.$options._parentVnode;var renderContext=parentVnode&&parentVnode.context;vm.$slots=resolveSlots(vm.$options._renderChildren,renderContext);vm.$scopedSlots={};// bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    vm._c=function(a,b,c,d){return createElement(vm,a,b,c,d,false);};// normalization is always applied for the public version, used in
    // user-written render functions.
    vm.$createElement=function(a,b,c,d){return createElement(vm,a,b,c,d,true);};}function renderMixin(Vue){Vue.prototype.$nextTick=function(fn){return nextTick(fn,this);};Vue.prototype._render=function(){var vm=this;var ref=vm.$options;var render=ref.render;var staticRenderFns=ref.staticRenderFns;var _parentVnode=ref._parentVnode;if(vm._isMounted){// clone slot nodes on re-renders
    for(var key in vm.$slots){vm.$slots[key]=cloneVNodes(vm.$slots[key]);}}if(_parentVnode&&_parentVnode.data.scopedSlots){vm.$scopedSlots=_parentVnode.data.scopedSlots;}if(staticRenderFns&&!vm._staticTrees){vm._staticTrees=[];}// set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode=_parentVnode;// render self
    var vnode;try{vnode=render.call(vm._renderProxy,vm.$createElement);}catch(e){/* istanbul ignore else */if(config.errorHandler){config.errorHandler.call(null,e,vm);}else{if(process.env.NODE_ENV!=='production'){warn("Error when rendering "+formatComponentName(vm)+":");}throw e;}// return previous vnode to prevent render error causing blank component
    vnode=vm._vnode;}// return empty vnode in case the render function errored out
    if(!(vnode instanceof VNode)){if(process.env.NODE_ENV!=='production'&&Array.isArray(vnode)){warn('Multiple root nodes returned from render function. Render function '+'should return a single root node.',vm);}vnode=createEmptyVNode();}// set parent
    vnode.parent=_parentVnode;return vnode;};// toString for mustaches
    Vue.prototype._s=_toString;// convert text to vnode
    Vue.prototype._v=createTextVNode;// number conversion
    Vue.prototype._n=toNumber;// empty vnode
    Vue.prototype._e=createEmptyVNode;// loose equal
    Vue.prototype._q=looseEqual;// loose indexOf
    Vue.prototype._i=looseIndexOf;// render static tree by index
    Vue.prototype._m=function renderStatic(index,isInFor){var tree=this._staticTrees[index];// if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree by doing a shallow clone.
    if(tree&&!isInFor){return Array.isArray(tree)?cloneVNodes(tree):cloneVNode(tree);}// otherwise, render a fresh tree.
    tree=this._staticTrees[index]=this.$options.staticRenderFns[index].call(this._renderProxy);markStatic(tree,"__static__"+index,false);return tree;};// mark node as static (v-once)
    Vue.prototype._o=function markOnce(tree,index,key){markStatic(tree,"__once__"+index+(key?"_"+key:""),true);return tree;};function markStatic(tree,key,isOnce){if(Array.isArray(tree)){for(var i=0;i<tree.length;i++){if(tree[i]&&typeof tree[i]!=='string'){markStaticNode(tree[i],key+"_"+i,isOnce);}}}else{markStaticNode(tree,key,isOnce);}}function markStaticNode(node,key,isOnce){node.isStatic=true;node.key=key;node.isOnce=isOnce;}// filter resolution helper
    Vue.prototype._f=function resolveFilter(id){return resolveAsset(this.$options,'filters',id,true)||identity;};// render v-for
    Vue.prototype._l=function renderList(val,render){var ret,i,l,keys,key;if(Array.isArray(val)||typeof val==='string'){ret=new Array(val.length);for(i=0,l=val.length;i<l;i++){ret[i]=render(val[i],i);}}else if(typeof val==='number'){ret=new Array(val);for(i=0;i<val;i++){ret[i]=render(i+1,i);}}else if(isObject(val)){keys=Object.keys(val);ret=new Array(keys.length);for(i=0,l=keys.length;i<l;i++){key=keys[i];ret[i]=render(val[key],key,i);}}return ret;};// renderSlot
    Vue.prototype._t=function(name,fallback,props,bindObject){var scopedSlotFn=this.$scopedSlots[name];if(scopedSlotFn){// scoped slot
    props=props||{};if(bindObject){extend(props,bindObject);}return scopedSlotFn(props)||fallback;}else{var slotNodes=this.$slots[name];// warn duplicate slot usage
    if(slotNodes&&process.env.NODE_ENV!=='production'){slotNodes._rendered&&warn("Duplicate presence of slot \""+name+"\" found in the same render tree "+"- this will likely cause render errors.",this);slotNodes._rendered=true;}return slotNodes||fallback;}};// apply v-bind object
    Vue.prototype._b=function bindProps(data,tag,value,asProp){if(value){if(!isObject(value)){process.env.NODE_ENV!=='production'&&warn('v-bind without argument expects an Object or Array value',this);}else{if(Array.isArray(value)){value=toObject(value);}for(var key in value){if(key==='class'||key==='style'){data[key]=value[key];}else{var type=data.attrs&&data.attrs.type;var hash=asProp||config.mustUseProp(tag,type,key)?data.domProps||(data.domProps={}):data.attrs||(data.attrs={});hash[key]=value[key];}}}}return data;};// check v-on keyCodes
    Vue.prototype._k=function checkKeyCodes(eventKeyCode,key,builtInAlias){var keyCodes=config.keyCodes[key]||builtInAlias;if(Array.isArray(keyCodes)){return keyCodes.indexOf(eventKeyCode)===-1;}else{return keyCodes!==eventKeyCode;}};}function resolveSlots(children,context){var slots={};if(!children){return slots;}var defaultSlot=[];var name,child;for(var i=0,l=children.length;i<l;i++){child=children[i];// named slots should only be respected if the vnode was rendered in the
    // same context.
    if((child.context===context||child.functionalContext===context)&&child.data&&(name=child.data.slot)){var slot=slots[name]||(slots[name]=[]);if(child.tag==='template'){slot.push.apply(slot,child.children);}else{slot.push(child);}}else{defaultSlot.push(child);}}// ignore single whitespace
    if(defaultSlot.length&&!(defaultSlot.length===1&&(defaultSlot[0].text===' '||defaultSlot[0].isComment))){slots.default=defaultSlot;}return slots;}/*  */function initEvents(vm){vm._events=Object.create(null);vm._hasHookEvent=false;// init parent attached events
    var listeners=vm.$options._parentListeners;if(listeners){updateComponentListeners(vm,listeners);}}var target;function add$1(event,fn,once){if(once){target.$once(event,fn);}else{target.$on(event,fn);}}function remove$2(event,fn){target.$off(event,fn);}function updateComponentListeners(vm,listeners,oldListeners){target=vm;updateListeners(listeners,oldListeners||{},add$1,remove$2,vm);}function eventsMixin(Vue){var hookRE=/^hook:/;Vue.prototype.$on=function(event,fn){var vm=this;(vm._events[event]||(vm._events[event]=[])).push(fn);// optimize hook:event cost by using a boolean flag marked at registration
    // instead of a hash lookup
    if(hookRE.test(event)){vm._hasHookEvent=true;}return vm;};Vue.prototype.$once=function(event,fn){var vm=this;function on(){vm.$off(event,on);fn.apply(vm,arguments);}on.fn=fn;vm.$on(event,on);return vm;};Vue.prototype.$off=function(event,fn){var vm=this;// all
    if(!arguments.length){vm._events=Object.create(null);return vm;}// specific event
    var cbs=vm._events[event];if(!cbs){return vm;}if(arguments.length===1){vm._events[event]=null;return vm;}// specific handler
    var cb;var i=cbs.length;while(i--){cb=cbs[i];if(cb===fn||cb.fn===fn){cbs.splice(i,1);break;}}return vm;};Vue.prototype.$emit=function(event){var vm=this;var cbs=vm._events[event];if(cbs){cbs=cbs.length>1?toArray(cbs):cbs;var args=toArray(arguments,1);for(var i=0,l=cbs.length;i<l;i++){cbs[i].apply(vm,args);}}return vm;};}/*  */var activeInstance=null;function initLifecycle(vm){var options=vm.$options;// locate first non-abstract parent
    var parent=options.parent;if(parent&&!options.abstract){while(parent.$options.abstract&&parent.$parent){parent=parent.$parent;}parent.$children.push(vm);}vm.$parent=parent;vm.$root=parent?parent.$root:vm;vm.$children=[];vm.$refs={};vm._watcher=null;vm._inactive=false;vm._isMounted=false;vm._isDestroyed=false;vm._isBeingDestroyed=false;}function lifecycleMixin(Vue){Vue.prototype._mount=function(el,hydrating){var vm=this;vm.$el=el;if(!vm.$options.render){vm.$options.render=createEmptyVNode;if(process.env.NODE_ENV!=='production'){/* istanbul ignore if */if(vm.$options.template&&vm.$options.template.charAt(0)!=='#'){warn('You are using the runtime-only build of Vue where the template '+'option is not available. Either pre-compile the templates into '+'render functions, or use the compiler-included build.',vm);}else{warn('Failed to mount component: template or render function not defined.',vm);}}}callHook(vm,'beforeMount');vm._watcher=new Watcher(vm,function updateComponent(){vm._update(vm._render(),hydrating);},noop);hydrating=false;// manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if(vm.$vnode==null){vm._isMounted=true;callHook(vm,'mounted');}return vm;};Vue.prototype._update=function(vnode,hydrating){var vm=this;if(vm._isMounted){callHook(vm,'beforeUpdate');}var prevEl=vm.$el;var prevVnode=vm._vnode;var prevActiveInstance=activeInstance;activeInstance=vm;vm._vnode=vnode;// Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if(!prevVnode){// initial render
    vm.$el=vm.__patch__(vm.$el,vnode,hydrating,false/* removeOnly */,vm.$options._parentElm,vm.$options._refElm);}else{// updates
    vm.$el=vm.__patch__(prevVnode,vnode);}activeInstance=prevActiveInstance;// update __vue__ reference
    if(prevEl){prevEl.__vue__=null;}if(vm.$el){vm.$el.__vue__=vm;}// if parent is an HOC, update its $el as well
    if(vm.$vnode&&vm.$parent&&vm.$vnode===vm.$parent._vnode){vm.$parent.$el=vm.$el;}// updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
    };Vue.prototype._updateFromParent=function(propsData,listeners,parentVnode,renderChildren){var vm=this;var hasChildren=!!(vm.$options._renderChildren||renderChildren);vm.$options._parentVnode=parentVnode;vm.$vnode=parentVnode;// update vm's placeholder node without re-render
    if(vm._vnode){// update child tree's parent
    vm._vnode.parent=parentVnode;}vm.$options._renderChildren=renderChildren;// update props
    if(propsData&&vm.$options.props){observerState.shouldConvert=false;if(process.env.NODE_ENV!=='production'){observerState.isSettingProps=true;}var propKeys=vm.$options._propKeys||[];for(var i=0;i<propKeys.length;i++){var key=propKeys[i];vm[key]=validateProp(key,vm.$options.props,propsData,vm);}observerState.shouldConvert=true;if(process.env.NODE_ENV!=='production'){observerState.isSettingProps=false;}vm.$options.propsData=propsData;}// update listeners
    if(listeners){var oldListeners=vm.$options._parentListeners;vm.$options._parentListeners=listeners;updateComponentListeners(vm,listeners,oldListeners);}// resolve slots + force update if has children
    if(hasChildren){vm.$slots=resolveSlots(renderChildren,parentVnode.context);vm.$forceUpdate();}};Vue.prototype.$forceUpdate=function(){var vm=this;if(vm._watcher){vm._watcher.update();}};Vue.prototype.$destroy=function(){var vm=this;if(vm._isBeingDestroyed){return;}callHook(vm,'beforeDestroy');vm._isBeingDestroyed=true;// remove self from parent
    var parent=vm.$parent;if(parent&&!parent._isBeingDestroyed&&!vm.$options.abstract){remove$1(parent.$children,vm);}// teardown watchers
    if(vm._watcher){vm._watcher.teardown();}var i=vm._watchers.length;while(i--){vm._watchers[i].teardown();}// remove reference from data ob
    // frozen object may not have observer.
    if(vm._data.__ob__){vm._data.__ob__.vmCount--;}// call the last hook...
    vm._isDestroyed=true;callHook(vm,'destroyed');// turn off all instance listeners.
    vm.$off();// remove __vue__ reference
    if(vm.$el){vm.$el.__vue__=null;}// invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode,null);};}function callHook(vm,hook){var handlers=vm.$options[hook];if(handlers){for(var i=0,j=handlers.length;i<j;i++){handlers[i].call(vm);}}if(vm._hasHookEvent){vm.$emit('hook:'+hook);}}/*  */var queue=[];var has$1={};var circular={};var waiting=false;var flushing=false;var index=0;/**
     * Reset the scheduler's state.
     */function resetSchedulerState(){queue.length=0;has$1={};if(process.env.NODE_ENV!=='production'){circular={};}waiting=flushing=false;}/**
     * Flush both queues and run the watchers.
     */function flushSchedulerQueue(){flushing=true;var watcher,id,vm;// Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(function(a,b){return a.id-b.id;});// do not cache length because more watchers might be pushed
    // as we run existing watchers
    for(index=0;index<queue.length;index++){watcher=queue[index];id=watcher.id;has$1[id]=null;watcher.run();// in dev build, check and stop circular updates.
    if(process.env.NODE_ENV!=='production'&&has$1[id]!=null){circular[id]=(circular[id]||0)+1;if(circular[id]>config._maxUpdateCount){warn('You may have an infinite update loop '+(watcher.user?"in watcher with expression \""+watcher.expression+"\"":"in a component render function."),watcher.vm);break;}}}// call updated hooks
    index=queue.length;while(index--){watcher=queue[index];vm=watcher.vm;if(vm._watcher===watcher&&vm._isMounted){callHook(vm,'updated');}}// devtool hook
    /* istanbul ignore if */if(devtools&&config.devtools){devtools.emit('flush');}resetSchedulerState();}/**
     * Push a watcher into the watcher queue.
     * Jobs with duplicate IDs will be skipped unless it's
     * pushed when the queue is being flushed.
     */function queueWatcher(watcher){var id=watcher.id;if(has$1[id]==null){has$1[id]=true;if(!flushing){queue.push(watcher);}else{// if already flushing, splice the watcher based on its id
    // if already past its id, it will be run next immediately.
    var i=queue.length-1;while(i>=0&&queue[i].id>watcher.id){i--;}queue.splice(Math.max(i,index)+1,0,watcher);}// queue the flush
    if(!waiting){waiting=true;nextTick(flushSchedulerQueue);}}}/*  */var uid$2=0;/**
     * A watcher parses an expression, collects dependencies,
     * and fires callback when the expression value changes.
     * This is used for both the $watch() api and directives.
     */var Watcher=function Watcher(vm,expOrFn,cb,options){this.vm=vm;vm._watchers.push(this);// options
    if(options){this.deep=!!options.deep;this.user=!!options.user;this.lazy=!!options.lazy;this.sync=!!options.sync;}else{this.deep=this.user=this.lazy=this.sync=false;}this.cb=cb;this.id=++uid$2;// uid for batching
    this.active=true;this.dirty=this.lazy;// for lazy watchers
    this.deps=[];this.newDeps=[];this.depIds=new _Set();this.newDepIds=new _Set();this.expression=process.env.NODE_ENV!=='production'?expOrFn.toString():'';// parse expression for getter
    if(typeof expOrFn==='function'){this.getter=expOrFn;}else{this.getter=parsePath(expOrFn);if(!this.getter){this.getter=function(){};process.env.NODE_ENV!=='production'&&warn("Failed watching path: \""+expOrFn+"\" "+'Watcher only accepts simple dot-delimited paths. '+'For full control, use a function instead.',vm);}}this.value=this.lazy?undefined:this.get();};/**
     * Evaluate the getter, and re-collect dependencies.
     */Watcher.prototype.get=function get(){pushTarget(this);var value=this.getter.call(this.vm,this.vm);// "touch" every property so they are all tracked as
    // dependencies for deep watching
    if(this.deep){traverse(value);}popTarget();this.cleanupDeps();return value;};/**
     * Add a dependency to this directive.
     */Watcher.prototype.addDep=function addDep(dep){var id=dep.id;if(!this.newDepIds.has(id)){this.newDepIds.add(id);this.newDeps.push(dep);if(!this.depIds.has(id)){dep.addSub(this);}}};/**
     * Clean up for dependency collection.
     */Watcher.prototype.cleanupDeps=function cleanupDeps(){var this$1=this;var i=this.deps.length;while(i--){var dep=this$1.deps[i];if(!this$1.newDepIds.has(dep.id)){dep.removeSub(this$1);}}var tmp=this.depIds;this.depIds=this.newDepIds;this.newDepIds=tmp;this.newDepIds.clear();tmp=this.deps;this.deps=this.newDeps;this.newDeps=tmp;this.newDeps.length=0;};/**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */Watcher.prototype.update=function update(){/* istanbul ignore else */if(this.lazy){this.dirty=true;}else if(this.sync){this.run();}else{queueWatcher(this);}};/**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */Watcher.prototype.run=function run(){if(this.active){var value=this.get();if(value!==this.value||// Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value)||this.deep){// set new value
    var oldValue=this.value;this.value=value;if(this.user){try{this.cb.call(this.vm,value,oldValue);}catch(e){/* istanbul ignore else */if(config.errorHandler){config.errorHandler.call(null,e,this.vm);}else{process.env.NODE_ENV!=='production'&&warn("Error in watcher \""+this.expression+"\"",this.vm);throw e;}}}else{this.cb.call(this.vm,value,oldValue);}}}};/**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */Watcher.prototype.evaluate=function evaluate(){this.value=this.get();this.dirty=false;};/**
     * Depend on all deps collected by this watcher.
     */Watcher.prototype.depend=function depend(){var this$1=this;var i=this.deps.length;while(i--){this$1.deps[i].depend();}};/**
     * Remove self from all dependencies' subscriber list.
     */Watcher.prototype.teardown=function teardown(){var this$1=this;if(this.active){// remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if(!this.vm._isBeingDestroyed){remove$1(this.vm._watchers,this);}var i=this.deps.length;while(i--){this$1.deps[i].removeSub(this$1);}this.active=false;}};/**
     * Recursively traverse an object to evoke all converted
     * getters, so that every nested property inside the object
     * is collected as a "deep" dependency.
     */var seenObjects=new _Set();function traverse(val){seenObjects.clear();_traverse(val,seenObjects);}function _traverse(val,seen){var i,keys;var isA=Array.isArray(val);if(!isA&&!isObject(val)||!Object.isExtensible(val)){return;}if(val.__ob__){var depId=val.__ob__.dep.id;if(seen.has(depId)){return;}seen.add(depId);}if(isA){i=val.length;while(i--){_traverse(val[i],seen);}}else{keys=Object.keys(val);i=keys.length;while(i--){_traverse(val[keys[i]],seen);}}}/*  */function initState(vm){vm._watchers=[];var opts=vm.$options;if(opts.props){initProps(vm,opts.props);}if(opts.methods){initMethods(vm,opts.methods);}if(opts.data){initData(vm);}else{observe(vm._data={},true/* asRootData */);}if(opts.computed){initComputed(vm,opts.computed);}if(opts.watch){initWatch(vm,opts.watch);}}var isReservedProp={key:1,ref:1,slot:1};function initProps(vm,props){var propsData=vm.$options.propsData||{};var keys=vm.$options._propKeys=Object.keys(props);var isRoot=!vm.$parent;// root instance props should be converted
    observerState.shouldConvert=isRoot;var loop=function loop(i){var key=keys[i];/* istanbul ignore else */if(process.env.NODE_ENV!=='production'){if(isReservedProp[key]){warn("\""+key+"\" is a reserved attribute and cannot be used as component prop.",vm);}defineReactive$$1(vm,key,validateProp(key,props,propsData,vm),function(){if(vm.$parent&&!observerState.isSettingProps){warn("Avoid mutating a prop directly since the value will be "+"overwritten whenever the parent component re-renders. "+"Instead, use a data or computed property based on the prop's "+"value. Prop being mutated: \""+key+"\"",vm);}});}else{defineReactive$$1(vm,key,validateProp(key,props,propsData,vm));}};for(var i=0;i<keys.length;i++){loop(i);}observerState.shouldConvert=true;}function initData(vm){var data=vm.$options.data;data=vm._data=typeof data==='function'?data.call(vm):data||{};if(!isPlainObject(data)){data={};process.env.NODE_ENV!=='production'&&warn('data functions should return an object:\n'+'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',vm);}// proxy data on instance
    var keys=Object.keys(data);var props=vm.$options.props;var i=keys.length;while(i--){if(props&&hasOwn(props,keys[i])){process.env.NODE_ENV!=='production'&&warn("The data property \""+keys[i]+"\" is already declared as a prop. "+"Use prop default value instead.",vm);}else{proxy(vm,keys[i]);}}// observe data
    observe(data,true/* asRootData */);}var computedSharedDefinition={enumerable:true,configurable:true,get:noop,set:noop};function initComputed(vm,computed){for(var key in computed){/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&key in vm){warn("existing instance property \""+key+"\" will be "+"overwritten by a computed property with the same name.",vm);}var userDef=computed[key];if(typeof userDef==='function'){computedSharedDefinition.get=makeComputedGetter(userDef,vm);computedSharedDefinition.set=noop;}else{computedSharedDefinition.get=userDef.get?userDef.cache!==false?makeComputedGetter(userDef.get,vm):bind$1(userDef.get,vm):noop;computedSharedDefinition.set=userDef.set?bind$1(userDef.set,vm):noop;}Object.defineProperty(vm,key,computedSharedDefinition);}}function makeComputedGetter(getter,owner){var watcher=new Watcher(owner,getter,noop,{lazy:true});return function computedGetter(){if(watcher.dirty){watcher.evaluate();}if(Dep.target){watcher.depend();}return watcher.value;};}function initMethods(vm,methods){for(var key in methods){vm[key]=methods[key]==null?noop:bind$1(methods[key],vm);if(process.env.NODE_ENV!=='production'&&methods[key]==null){warn("method \""+key+"\" has an undefined value in the component definition. "+"Did you reference the function correctly?",vm);}}}function initWatch(vm,watch){for(var key in watch){var handler=watch[key];if(Array.isArray(handler)){for(var i=0;i<handler.length;i++){createWatcher(vm,key,handler[i]);}}else{createWatcher(vm,key,handler);}}}function createWatcher(vm,key,handler){var options;if(isPlainObject(handler)){options=handler;handler=handler.handler;}if(typeof handler==='string'){handler=vm[handler];}vm.$watch(key,handler,options);}function stateMixin(Vue){// flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    var dataDef={};dataDef.get=function(){return this._data;};if(process.env.NODE_ENV!=='production'){dataDef.set=function(newData){warn('Avoid replacing instance root $data. '+'Use nested data properties instead.',this);};}Object.defineProperty(Vue.prototype,'$data',dataDef);Vue.prototype.$set=set$1;Vue.prototype.$delete=del;Vue.prototype.$watch=function(expOrFn,cb,options){var vm=this;options=options||{};options.user=true;var watcher=new Watcher(vm,expOrFn,cb,options);if(options.immediate){cb.call(vm,watcher.value);}return function unwatchFn(){watcher.teardown();};};}function proxy(vm,key){if(!isReserved(key)){Object.defineProperty(vm,key,{configurable:true,enumerable:true,get:function proxyGetter(){return vm._data[key];},set:function proxySetter(val){vm._data[key]=val;}});}}/*  */var uid=0;function initMixin(Vue){Vue.prototype._init=function(options){var vm=this;// a uid
    vm._uid=uid++;// a flag to avoid this being observed
    vm._isVue=true;// merge options
    if(options&&options._isComponent){// optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm,options);}else{vm.$options=mergeOptions(resolveConstructorOptions(vm.constructor),options||{},vm);}/* istanbul ignore else */if(process.env.NODE_ENV!=='production'){initProxy(vm);}else{vm._renderProxy=vm;}// expose real self
    vm._self=vm;initLifecycle(vm);initEvents(vm);initRender(vm);callHook(vm,'beforeCreate');initState(vm);callHook(vm,'created');if(vm.$options.el){vm.$mount(vm.$options.el);}};}function initInternalComponent(vm,options){var opts=vm.$options=Object.create(vm.constructor.options);// doing this because it's faster than dynamic enumeration.
    opts.parent=options.parent;opts.propsData=options.propsData;opts._parentVnode=options._parentVnode;opts._parentListeners=options._parentListeners;opts._renderChildren=options._renderChildren;opts._componentTag=options._componentTag;opts._parentElm=options._parentElm;opts._refElm=options._refElm;if(options.render){opts.render=options.render;opts.staticRenderFns=options.staticRenderFns;}}function resolveConstructorOptions(Ctor){var options=Ctor.options;if(Ctor.super){var superOptions=Ctor.super.options;var cachedSuperOptions=Ctor.superOptions;var extendOptions=Ctor.extendOptions;if(superOptions!==cachedSuperOptions){// super option changed
    Ctor.superOptions=superOptions;extendOptions.render=options.render;extendOptions.staticRenderFns=options.staticRenderFns;extendOptions._scopeId=options._scopeId;options=Ctor.options=mergeOptions(superOptions,extendOptions);if(options.name){options.components[options.name]=Ctor;}}}return options;}function Vue$2(options){if(process.env.NODE_ENV!=='production'&&!(this instanceof Vue$2)){warn('Vue is a constructor and should be called with the `new` keyword');}this._init(options);}initMixin(Vue$2);stateMixin(Vue$2);eventsMixin(Vue$2);lifecycleMixin(Vue$2);renderMixin(Vue$2);/*  */function initUse(Vue){Vue.use=function(plugin){/* istanbul ignore if */if(plugin.installed){return;}// additional parameters
    var args=toArray(arguments,1);args.unshift(this);if(typeof plugin.install==='function'){plugin.install.apply(plugin,args);}else{plugin.apply(null,args);}plugin.installed=true;return this;};}/*  */function initMixin$1(Vue){Vue.mixin=function(mixin){this.options=mergeOptions(this.options,mixin);};}/*  */function initExtend(Vue){/**
       * Each instance constructor, including Vue, has a unique
       * cid. This enables us to create wrapped "child
       * constructors" for prototypal inheritance and cache them.
       */Vue.cid=0;var cid=1;/**
       * Class inheritance
       */Vue.extend=function(extendOptions){extendOptions=extendOptions||{};var Super=this;var SuperId=Super.cid;var cachedCtors=extendOptions._Ctor||(extendOptions._Ctor={});if(cachedCtors[SuperId]){return cachedCtors[SuperId];}var name=extendOptions.name||Super.options.name;if(process.env.NODE_ENV!=='production'){if(!/^[a-zA-Z][\w-]*$/.test(name)){warn('Invalid component name: "'+name+'". Component names '+'can only contain alphanumeric characters and the hyphen, '+'and must start with a letter.');}}var Sub=function VueComponent(options){this._init(options);};Sub.prototype=Object.create(Super.prototype);Sub.prototype.constructor=Sub;Sub.cid=cid++;Sub.options=mergeOptions(Super.options,extendOptions);Sub['super']=Super;// allow further extension/mixin/plugin usage
    Sub.extend=Super.extend;Sub.mixin=Super.mixin;Sub.use=Super.use;// create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function(type){Sub[type]=Super[type];});// enable recursive self-lookup
    if(name){Sub.options.components[name]=Sub;}// keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions=Super.options;Sub.extendOptions=extendOptions;// cache constructor
    cachedCtors[SuperId]=Sub;return Sub;};}/*  */function initAssetRegisters(Vue){/**
       * Create asset registration methods.
       */config._assetTypes.forEach(function(type){Vue[type]=function(id,definition){if(!definition){return this.options[type+'s'][id];}else{/* istanbul ignore if */if(process.env.NODE_ENV!=='production'){if(type==='component'&&config.isReservedTag(id)){warn('Do not use built-in or reserved HTML elements as component '+'id: '+id);}}if(type==='component'&&isPlainObject(definition)){definition.name=definition.name||id;definition=this.options._base.extend(definition);}if(type==='directive'&&typeof definition==='function'){definition={bind:definition,update:definition};}this.options[type+'s'][id]=definition;return definition;}};});}/*  */var patternTypes=[String,RegExp];function getComponentName(opts){return opts&&(opts.Ctor.options.name||opts.tag);}function matches(pattern,name){if(typeof pattern==='string'){return pattern.split(',').indexOf(name)>-1;}else{return pattern.test(name);}}function pruneCache(cache,filter){for(var key in cache){var cachedNode=cache[key];if(cachedNode){var name=getComponentName(cachedNode.componentOptions);if(name&&!filter(name)){pruneCacheEntry(cachedNode);cache[key]=null;}}}}function pruneCacheEntry(vnode){if(vnode){if(!vnode.componentInstance._inactive){callHook(vnode.componentInstance,'deactivated');}vnode.componentInstance.$destroy();}}var KeepAlive={name:'keep-alive',abstract:true,props:{include:patternTypes,exclude:patternTypes},created:function created(){this.cache=Object.create(null);},destroyed:function destroyed(){var this$1=this;for(var key in this.cache){pruneCacheEntry(this$1.cache[key]);}},watch:{include:function include(val){pruneCache(this.cache,function(name){return matches(val,name);});},exclude:function exclude(val){pruneCache(this.cache,function(name){return!matches(val,name);});}},render:function render(){var vnode=getFirstComponentChild(this.$slots.default);var componentOptions=vnode&&vnode.componentOptions;if(componentOptions){// check pattern
    var name=getComponentName(componentOptions);if(name&&(this.include&&!matches(this.include,name)||this.exclude&&matches(this.exclude,name))){return vnode;}var key=vnode.key==null// same constructor may get registered as different local components
    // so cid alone is not enough (#3269)
    ?componentOptions.Ctor.cid+(componentOptions.tag?"::"+componentOptions.tag:''):vnode.key;if(this.cache[key]){vnode.componentInstance=this.cache[key].componentInstance;}else{this.cache[key]=vnode;}vnode.data.keepAlive=true;}return vnode;}};var builtInComponents={KeepAlive:KeepAlive};/*  */function initGlobalAPI(Vue){// config
    var configDef={};configDef.get=function(){return config;};if(process.env.NODE_ENV!=='production'){configDef.set=function(){warn('Do not replace the Vue.config object, set individual fields instead.');};}Object.defineProperty(Vue,'config',configDef);Vue.util=util;Vue.set=set$1;Vue.delete=del;Vue.nextTick=nextTick;Vue.options=Object.create(null);config._assetTypes.forEach(function(type){Vue.options[type+'s']=Object.create(null);});// this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base=Vue;extend(Vue.options.components,builtInComponents);initUse(Vue);initMixin$1(Vue);initExtend(Vue);initAssetRegisters(Vue);}initGlobalAPI(Vue$2);Object.defineProperty(Vue$2.prototype,'$isServer',{get:isServerRendering});Vue$2.version='2.1.10';/*  */// attributes that should be using props for binding
    var acceptValue=makeMap('input,textarea,option,select');var mustUseProp=function mustUseProp(tag,type,attr){return attr==='value'&&acceptValue(tag)&&type!=='button'||attr==='selected'&&tag==='option'||attr==='checked'&&tag==='input'||attr==='muted'&&tag==='video';};var isEnumeratedAttr=makeMap('contenteditable,draggable,spellcheck');var isBooleanAttr=makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,'+'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,'+'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,'+'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,'+'required,reversed,scoped,seamless,selected,sortable,translate,'+'truespeed,typemustmatch,visible');var xlinkNS='http://www.w3.org/1999/xlink';var isXlink=function isXlink(name){return name.charAt(5)===':'&&name.slice(0,5)==='xlink';};var getXlinkProp=function getXlinkProp(name){return isXlink(name)?name.slice(6,name.length):'';};var isFalsyAttrValue=function isFalsyAttrValue(val){return val==null||val===false;};/*  */function genClassForVnode(vnode){var data=vnode.data;var parentNode=vnode;var childNode=vnode;while(childNode.componentInstance){childNode=childNode.componentInstance._vnode;if(childNode.data){data=mergeClassData(childNode.data,data);}}while(parentNode=parentNode.parent){if(parentNode.data){data=mergeClassData(data,parentNode.data);}}return genClassFromData(data);}function mergeClassData(child,parent){return{staticClass:concat(child.staticClass,parent.staticClass),class:child.class?[child.class,parent.class]:parent.class};}function genClassFromData(data){var dynamicClass=data.class;var staticClass=data.staticClass;if(staticClass||dynamicClass){return concat(staticClass,stringifyClass(dynamicClass));}/* istanbul ignore next */return'';}function concat(a,b){return a?b?a+' '+b:a:b||'';}function stringifyClass(value){var res='';if(!value){return res;}if(typeof value==='string'){return value;}if(Array.isArray(value)){var stringified;for(var i=0,l=value.length;i<l;i++){if(value[i]){if(stringified=stringifyClass(value[i])){res+=stringified+' ';}}}return res.slice(0,-1);}if(isObject(value)){for(var key in value){if(value[key]){res+=key+' ';}}return res.slice(0,-1);}/* istanbul ignore next */return res;}/*  */var namespaceMap={svg:'http://www.w3.org/2000/svg',math:'http://www.w3.org/1998/Math/MathML'};var isHTMLTag=makeMap('html,body,base,head,link,meta,style,title,'+'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,'+'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,'+'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,'+'s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,'+'embed,object,param,source,canvas,script,noscript,del,ins,'+'caption,col,colgroup,table,thead,tbody,td,th,tr,'+'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,'+'output,progress,select,textarea,'+'details,dialog,menu,menuitem,summary,'+'content,element,shadow,template');// this map is intentionally selective, only covering SVG elements that may
    // contain child elements.
    var isSVG=makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,'+'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,'+'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',true);var isReservedTag=function isReservedTag(tag){return isHTMLTag(tag)||isSVG(tag);};function getTagNamespace(tag){if(isSVG(tag)){return'svg';}// basic support for MathML
    // note it doesn't support other MathML elements being component roots
    if(tag==='math'){return'math';}}var unknownElementCache=Object.create(null);function isUnknownElement(tag){/* istanbul ignore if */if(!inBrowser){return true;}if(isReservedTag(tag)){return false;}tag=tag.toLowerCase();/* istanbul ignore if */if(unknownElementCache[tag]!=null){return unknownElementCache[tag];}var el=document.createElement(tag);if(tag.indexOf('-')>-1){// http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag]=el.constructor===window.HTMLUnknownElement||el.constructor===window.HTMLElement;}else{return unknownElementCache[tag]=/HTMLUnknownElement/.test(el.toString());}}/*  *//**
     * Query an element selector if it's not an element already.
     */function query(el){if(typeof el==='string'){var selector=el;el=document.querySelector(el);if(!el){process.env.NODE_ENV!=='production'&&warn('Cannot find element: '+selector);return document.createElement('div');}}return el;}/*  */function createElement$1(tagName,vnode){var elm=document.createElement(tagName);if(tagName!=='select'){return elm;}if(vnode.data&&vnode.data.attrs&&'multiple'in vnode.data.attrs){elm.setAttribute('multiple','multiple');}return elm;}function createElementNS(namespace,tagName){return document.createElementNS(namespaceMap[namespace],tagName);}function createTextNode(text){return document.createTextNode(text);}function createComment(text){return document.createComment(text);}function insertBefore(parentNode,newNode,referenceNode){parentNode.insertBefore(newNode,referenceNode);}function removeChild(node,child){node.removeChild(child);}function appendChild(node,child){node.appendChild(child);}function parentNode(node){return node.parentNode;}function nextSibling(node){return node.nextSibling;}function tagName(node){return node.tagName;}function setTextContent(node,text){node.textContent=text;}function setAttribute(node,key,val){node.setAttribute(key,val);}var nodeOps=Object.freeze({createElement:createElement$1,createElementNS:createElementNS,createTextNode:createTextNode,createComment:createComment,insertBefore:insertBefore,removeChild:removeChild,appendChild:appendChild,parentNode:parentNode,nextSibling:nextSibling,tagName:tagName,setTextContent:setTextContent,setAttribute:setAttribute});/*  */var ref={create:function create(_,vnode){registerRef(vnode);},update:function update(oldVnode,vnode){if(oldVnode.data.ref!==vnode.data.ref){registerRef(oldVnode,true);registerRef(vnode);}},destroy:function destroy(vnode){registerRef(vnode,true);}};function registerRef(vnode,isRemoval){var key=vnode.data.ref;if(!key){return;}var vm=vnode.context;var ref=vnode.componentInstance||vnode.elm;var refs=vm.$refs;if(isRemoval){if(Array.isArray(refs[key])){remove$1(refs[key],ref);}else if(refs[key]===ref){refs[key]=undefined;}}else{if(vnode.data.refInFor){if(Array.isArray(refs[key])&&refs[key].indexOf(ref)<0){refs[key].push(ref);}else{refs[key]=[ref];}}else{refs[key]=ref;}}}/**
     * Virtual DOM patching algorithm based on Snabbdom by
     * Simon Friis Vindum (@paldepind)
     * Licensed under the MIT License
     * https://github.com/paldepind/snabbdom/blob/master/LICENSE
     *
     * modified by Evan You (@yyx990803)
     *
    
    /*
     * Not type-checking this because this file is perf-critical and the cost
     * of making flow understand it is not worth it.
     */var emptyNode=new VNode('',{},[]);var hooks$1=['create','activate','update','remove','destroy'];function isUndef(s){return s==null;}function isDef(s){return s!=null;}function sameVnode(vnode1,vnode2){return vnode1.key===vnode2.key&&vnode1.tag===vnode2.tag&&vnode1.isComment===vnode2.isComment&&!vnode1.data===!vnode2.data;}function createKeyToOldIdx(children,beginIdx,endIdx){var i,key;var map={};for(i=beginIdx;i<=endIdx;++i){key=children[i].key;if(isDef(key)){map[key]=i;}}return map;}function createPatchFunction(backend){var i,j;var cbs={};var modules=backend.modules;var nodeOps=backend.nodeOps;for(i=0;i<hooks$1.length;++i){cbs[hooks$1[i]]=[];for(j=0;j<modules.length;++j){if(modules[j][hooks$1[i]]!==undefined){cbs[hooks$1[i]].push(modules[j][hooks$1[i]]);}}}function emptyNodeAt(elm){return new VNode(nodeOps.tagName(elm).toLowerCase(),{},[],undefined,elm);}function createRmCb(childElm,listeners){function remove$$1(){if(--remove$$1.listeners===0){removeNode(childElm);}}remove$$1.listeners=listeners;return remove$$1;}function removeNode(el){var parent=nodeOps.parentNode(el);// element may have already been removed due to v-html / v-text
    if(parent){nodeOps.removeChild(parent,el);}}var inPre=0;function createElm(vnode,insertedVnodeQueue,parentElm,refElm,nested){vnode.isRootInsert=!nested;// for transition enter check
    if(createComponent(vnode,insertedVnodeQueue,parentElm,refElm)){return;}var data=vnode.data;var children=vnode.children;var tag=vnode.tag;if(isDef(tag)){if(process.env.NODE_ENV!=='production'){if(data&&data.pre){inPre++;}if(!inPre&&!vnode.ns&&!(config.ignoredElements.length&&config.ignoredElements.indexOf(tag)>-1)&&config.isUnknownElement(tag)){warn('Unknown custom element: <'+tag+'> - did you '+'register the component correctly? For recursive components, '+'make sure to provide the "name" option.',vnode.context);}}vnode.elm=vnode.ns?nodeOps.createElementNS(vnode.ns,tag):nodeOps.createElement(tag,vnode);setScope(vnode);/* istanbul ignore if */{createChildren(vnode,children,insertedVnodeQueue);if(isDef(data)){invokeCreateHooks(vnode,insertedVnodeQueue);}insert(parentElm,vnode.elm,refElm);}if(process.env.NODE_ENV!=='production'&&data&&data.pre){inPre--;}}else if(vnode.isComment){vnode.elm=nodeOps.createComment(vnode.text);insert(parentElm,vnode.elm,refElm);}else{vnode.elm=nodeOps.createTextNode(vnode.text);insert(parentElm,vnode.elm,refElm);}}function createComponent(vnode,insertedVnodeQueue,parentElm,refElm){var i=vnode.data;if(isDef(i)){var isReactivated=isDef(vnode.componentInstance)&&i.keepAlive;if(isDef(i=i.hook)&&isDef(i=i.init)){i(vnode,false/* hydrating */,parentElm,refElm);}// after calling the init hook, if the vnode is a child component
    // it should've created a child instance and mounted it. the child
    // component also has set the placeholder vnode's elm.
    // in that case we can just return the element and be done.
    if(isDef(vnode.componentInstance)){initComponent(vnode,insertedVnodeQueue);if(isReactivated){reactivateComponent(vnode,insertedVnodeQueue,parentElm,refElm);}return true;}}}function initComponent(vnode,insertedVnodeQueue){if(vnode.data.pendingInsert){insertedVnodeQueue.push.apply(insertedVnodeQueue,vnode.data.pendingInsert);}vnode.elm=vnode.componentInstance.$el;if(isPatchable(vnode)){invokeCreateHooks(vnode,insertedVnodeQueue);setScope(vnode);}else{// empty component root.
    // skip all element-related modules except for ref (#3455)
    registerRef(vnode);// make sure to invoke the insert hook
    insertedVnodeQueue.push(vnode);}}function reactivateComponent(vnode,insertedVnodeQueue,parentElm,refElm){var i;// hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode=vnode;while(innerNode.componentInstance){innerNode=innerNode.componentInstance._vnode;if(isDef(i=innerNode.data)&&isDef(i=i.transition)){for(i=0;i<cbs.activate.length;++i){cbs.activate[i](emptyNode,innerNode);}insertedVnodeQueue.push(innerNode);break;}}// unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm,vnode.elm,refElm);}function insert(parent,elm,ref){if(parent){if(ref){nodeOps.insertBefore(parent,elm,ref);}else{nodeOps.appendChild(parent,elm);}}}function createChildren(vnode,children,insertedVnodeQueue){if(Array.isArray(children)){for(var i=0;i<children.length;++i){createElm(children[i],insertedVnodeQueue,vnode.elm,null,true);}}else if(isPrimitive(vnode.text)){nodeOps.appendChild(vnode.elm,nodeOps.createTextNode(vnode.text));}}function isPatchable(vnode){while(vnode.componentInstance){vnode=vnode.componentInstance._vnode;}return isDef(vnode.tag);}function invokeCreateHooks(vnode,insertedVnodeQueue){for(var i$1=0;i$1<cbs.create.length;++i$1){cbs.create[i$1](emptyNode,vnode);}i=vnode.data.hook;// Reuse variable
    if(isDef(i)){if(i.create){i.create(emptyNode,vnode);}if(i.insert){insertedVnodeQueue.push(vnode);}}}// set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    function setScope(vnode){var i;if(isDef(i=vnode.context)&&isDef(i=i.$options._scopeId)){nodeOps.setAttribute(vnode.elm,i,'');}if(isDef(i=activeInstance)&&i!==vnode.context&&isDef(i=i.$options._scopeId)){nodeOps.setAttribute(vnode.elm,i,'');}}function addVnodes(parentElm,refElm,vnodes,startIdx,endIdx,insertedVnodeQueue){for(;startIdx<=endIdx;++startIdx){createElm(vnodes[startIdx],insertedVnodeQueue,parentElm,refElm);}}function invokeDestroyHook(vnode){var i,j;var data=vnode.data;if(isDef(data)){if(isDef(i=data.hook)&&isDef(i=i.destroy)){i(vnode);}for(i=0;i<cbs.destroy.length;++i){cbs.destroy[i](vnode);}}if(isDef(i=vnode.children)){for(j=0;j<vnode.children.length;++j){invokeDestroyHook(vnode.children[j]);}}}function removeVnodes(parentElm,vnodes,startIdx,endIdx){for(;startIdx<=endIdx;++startIdx){var ch=vnodes[startIdx];if(isDef(ch)){if(isDef(ch.tag)){removeAndInvokeRemoveHook(ch);invokeDestroyHook(ch);}else{// Text node
    removeNode(ch.elm);}}}}function removeAndInvokeRemoveHook(vnode,rm){if(rm||isDef(vnode.data)){var listeners=cbs.remove.length+1;if(!rm){// directly removing
    rm=createRmCb(vnode.elm,listeners);}else{// we have a recursively passed down rm callback
    // increase the listeners count
    rm.listeners+=listeners;}// recursively invoke hooks on child component root node
    if(isDef(i=vnode.componentInstance)&&isDef(i=i._vnode)&&isDef(i.data)){removeAndInvokeRemoveHook(i,rm);}for(i=0;i<cbs.remove.length;++i){cbs.remove[i](vnode,rm);}if(isDef(i=vnode.data.hook)&&isDef(i=i.remove)){i(vnode,rm);}else{rm();}}else{removeNode(vnode.elm);}}function updateChildren(parentElm,oldCh,newCh,insertedVnodeQueue,removeOnly){var oldStartIdx=0;var newStartIdx=0;var oldEndIdx=oldCh.length-1;var oldStartVnode=oldCh[0];var oldEndVnode=oldCh[oldEndIdx];var newEndIdx=newCh.length-1;var newStartVnode=newCh[0];var newEndVnode=newCh[newEndIdx];var oldKeyToIdx,idxInOld,elmToMove,refElm;// removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove=!removeOnly;while(oldStartIdx<=oldEndIdx&&newStartIdx<=newEndIdx){if(isUndef(oldStartVnode)){oldStartVnode=oldCh[++oldStartIdx];// Vnode has been moved left
    }else if(isUndef(oldEndVnode)){oldEndVnode=oldCh[--oldEndIdx];}else if(sameVnode(oldStartVnode,newStartVnode)){patchVnode(oldStartVnode,newStartVnode,insertedVnodeQueue);oldStartVnode=oldCh[++oldStartIdx];newStartVnode=newCh[++newStartIdx];}else if(sameVnode(oldEndVnode,newEndVnode)){patchVnode(oldEndVnode,newEndVnode,insertedVnodeQueue);oldEndVnode=oldCh[--oldEndIdx];newEndVnode=newCh[--newEndIdx];}else if(sameVnode(oldStartVnode,newEndVnode)){// Vnode moved right
    patchVnode(oldStartVnode,newEndVnode,insertedVnodeQueue);canMove&&nodeOps.insertBefore(parentElm,oldStartVnode.elm,nodeOps.nextSibling(oldEndVnode.elm));oldStartVnode=oldCh[++oldStartIdx];newEndVnode=newCh[--newEndIdx];}else if(sameVnode(oldEndVnode,newStartVnode)){// Vnode moved left
    patchVnode(oldEndVnode,newStartVnode,insertedVnodeQueue);canMove&&nodeOps.insertBefore(parentElm,oldEndVnode.elm,oldStartVnode.elm);oldEndVnode=oldCh[--oldEndIdx];newStartVnode=newCh[++newStartIdx];}else{if(isUndef(oldKeyToIdx)){oldKeyToIdx=createKeyToOldIdx(oldCh,oldStartIdx,oldEndIdx);}idxInOld=isDef(newStartVnode.key)?oldKeyToIdx[newStartVnode.key]:null;if(isUndef(idxInOld)){// New element
    createElm(newStartVnode,insertedVnodeQueue,parentElm,oldStartVnode.elm);newStartVnode=newCh[++newStartIdx];}else{elmToMove=oldCh[idxInOld];/* istanbul ignore if */if(process.env.NODE_ENV!=='production'&&!elmToMove){warn('It seems there are duplicate keys that is causing an update error. '+'Make sure each v-for item has a unique key.');}if(sameVnode(elmToMove,newStartVnode)){patchVnode(elmToMove,newStartVnode,insertedVnodeQueue);oldCh[idxInOld]=undefined;canMove&&nodeOps.insertBefore(parentElm,newStartVnode.elm,oldStartVnode.elm);newStartVnode=newCh[++newStartIdx];}else{// same key but different element. treat as new element
    createElm(newStartVnode,insertedVnodeQueue,parentElm,oldStartVnode.elm);newStartVnode=newCh[++newStartIdx];}}}}if(oldStartIdx>oldEndIdx){refElm=isUndef(newCh[newEndIdx+1])?null:newCh[newEndIdx+1].elm;addVnodes(parentElm,refElm,newCh,newStartIdx,newEndIdx,insertedVnodeQueue);}else if(newStartIdx>newEndIdx){removeVnodes(parentElm,oldCh,oldStartIdx,oldEndIdx);}}function patchVnode(oldVnode,vnode,insertedVnodeQueue,removeOnly){if(oldVnode===vnode){return;}// reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if(vnode.isStatic&&oldVnode.isStatic&&vnode.key===oldVnode.key&&(vnode.isCloned||vnode.isOnce)){vnode.elm=oldVnode.elm;vnode.componentInstance=oldVnode.componentInstance;return;}var i;var data=vnode.data;var hasData=isDef(data);if(hasData&&isDef(i=data.hook)&&isDef(i=i.prepatch)){i(oldVnode,vnode);}var elm=vnode.elm=oldVnode.elm;var oldCh=oldVnode.children;var ch=vnode.children;if(hasData&&isPatchable(vnode)){for(i=0;i<cbs.update.length;++i){cbs.update[i](oldVnode,vnode);}if(isDef(i=data.hook)&&isDef(i=i.update)){i(oldVnode,vnode);}}if(isUndef(vnode.text)){if(isDef(oldCh)&&isDef(ch)){if(oldCh!==ch){updateChildren(elm,oldCh,ch,insertedVnodeQueue,removeOnly);}}else if(isDef(ch)){if(isDef(oldVnode.text)){nodeOps.setTextContent(elm,'');}addVnodes(elm,null,ch,0,ch.length-1,insertedVnodeQueue);}else if(isDef(oldCh)){removeVnodes(elm,oldCh,0,oldCh.length-1);}else if(isDef(oldVnode.text)){nodeOps.setTextContent(elm,'');}}else if(oldVnode.text!==vnode.text){nodeOps.setTextContent(elm,vnode.text);}if(hasData){if(isDef(i=data.hook)&&isDef(i=i.postpatch)){i(oldVnode,vnode);}}}function invokeInsertHook(vnode,queue,initial){// delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if(initial&&vnode.parent){vnode.parent.data.pendingInsert=queue;}else{for(var i=0;i<queue.length;++i){queue[i].data.hook.insert(queue[i]);}}}var bailed=false;// list of modules that can skip create hook during hydration because they
    // are already rendered on the client or has no need for initialization
    var isRenderedModule=makeMap('attrs,style,class,staticClass,staticStyle,key');// Note: this is a browser-only function so we can assume elms are DOM nodes.
    function hydrate(elm,vnode,insertedVnodeQueue){if(process.env.NODE_ENV!=='production'){if(!assertNodeMatch(elm,vnode)){return false;}}vnode.elm=elm;var tag=vnode.tag;var data=vnode.data;var children=vnode.children;if(isDef(data)){if(isDef(i=data.hook)&&isDef(i=i.init)){i(vnode,true/* hydrating */);}if(isDef(i=vnode.componentInstance)){// child component. it should have hydrated its own tree.
    initComponent(vnode,insertedVnodeQueue);return true;}}if(isDef(tag)){if(isDef(children)){// empty element, allow client to pick up and populate children
    if(!elm.hasChildNodes()){createChildren(vnode,children,insertedVnodeQueue);}else{var childrenMatch=true;var childNode=elm.firstChild;for(var i$1=0;i$1<children.length;i$1++){if(!childNode||!hydrate(childNode,children[i$1],insertedVnodeQueue)){childrenMatch=false;break;}childNode=childNode.nextSibling;}// if childNode is not null, it means the actual childNodes list is
    // longer than the virtual children list.
    if(!childrenMatch||childNode){if(process.env.NODE_ENV!=='production'&&typeof console!=='undefined'&&!bailed){bailed=true;console.warn('Parent: ',elm);console.warn('Mismatching childNodes vs. VNodes: ',elm.childNodes,children);}return false;}}}if(isDef(data)){for(var key in data){if(!isRenderedModule(key)){invokeCreateHooks(vnode,insertedVnodeQueue);break;}}}}else if(elm.data!==vnode.text){elm.data=vnode.text;}return true;}function assertNodeMatch(node,vnode){if(vnode.tag){return vnode.tag.indexOf('vue-component')===0||vnode.tag.toLowerCase()===(node.tagName&&node.tagName.toLowerCase());}else{return node.nodeType===(vnode.isComment?8:3);}}return function patch(oldVnode,vnode,hydrating,removeOnly,parentElm,refElm){if(!vnode){if(oldVnode){invokeDestroyHook(oldVnode);}return;}var isInitialPatch=false;var insertedVnodeQueue=[];if(!oldVnode){// empty mount (likely as component), create new root element
    isInitialPatch=true;createElm(vnode,insertedVnodeQueue,parentElm,refElm);}else{var isRealElement=isDef(oldVnode.nodeType);if(!isRealElement&&sameVnode(oldVnode,vnode)){// patch existing root node
    patchVnode(oldVnode,vnode,insertedVnodeQueue,removeOnly);}else{if(isRealElement){// mounting to a real element
    // check if this is server-rendered content and if we can perform
    // a successful hydration.
    if(oldVnode.nodeType===1&&oldVnode.hasAttribute('server-rendered')){oldVnode.removeAttribute('server-rendered');hydrating=true;}if(hydrating){if(hydrate(oldVnode,vnode,insertedVnodeQueue)){invokeInsertHook(vnode,insertedVnodeQueue,true);return oldVnode;}else if(process.env.NODE_ENV!=='production'){warn('The client-side rendered virtual DOM tree is not matching '+'server-rendered content. This is likely caused by incorrect '+'HTML markup, for example nesting block-level elements inside '+'<p>, or missing <tbody>. Bailing hydration and performing '+'full client-side render.');}}// either not server-rendered, or hydration failed.
    // create an empty node and replace it
    oldVnode=emptyNodeAt(oldVnode);}// replacing existing element
    var oldElm=oldVnode.elm;var parentElm$1=nodeOps.parentNode(oldElm);createElm(vnode,insertedVnodeQueue,// extremely rare edge case: do not insert if old element is in a
    // leaving transition. Only happens when combining transition +
    // keep-alive + HOCs. (#4590)
    oldElm._leaveCb?null:parentElm$1,nodeOps.nextSibling(oldElm));if(vnode.parent){// component root element replaced.
    // update parent placeholder node element, recursively
    var ancestor=vnode.parent;while(ancestor){ancestor.elm=vnode.elm;ancestor=ancestor.parent;}if(isPatchable(vnode)){for(var i=0;i<cbs.create.length;++i){cbs.create[i](emptyNode,vnode.parent);}}}if(parentElm$1!==null){removeVnodes(parentElm$1,[oldVnode],0,0);}else if(isDef(oldVnode.tag)){invokeDestroyHook(oldVnode);}}}invokeInsertHook(vnode,insertedVnodeQueue,isInitialPatch);return vnode.elm;};}/*  */var directives={create:updateDirectives,update:updateDirectives,destroy:function unbindDirectives(vnode){updateDirectives(vnode,emptyNode);}};function updateDirectives(oldVnode,vnode){if(oldVnode.data.directives||vnode.data.directives){_update(oldVnode,vnode);}}function _update(oldVnode,vnode){var isCreate=oldVnode===emptyNode;var isDestroy=vnode===emptyNode;var oldDirs=normalizeDirectives$1(oldVnode.data.directives,oldVnode.context);var newDirs=normalizeDirectives$1(vnode.data.directives,vnode.context);var dirsWithInsert=[];var dirsWithPostpatch=[];var key,oldDir,dir;for(key in newDirs){oldDir=oldDirs[key];dir=newDirs[key];if(!oldDir){// new directive, bind
    callHook$1(dir,'bind',vnode,oldVnode);if(dir.def&&dir.def.inserted){dirsWithInsert.push(dir);}}else{// existing directive, update
    dir.oldValue=oldDir.value;callHook$1(dir,'update',vnode,oldVnode);if(dir.def&&dir.def.componentUpdated){dirsWithPostpatch.push(dir);}}}if(dirsWithInsert.length){var callInsert=function callInsert(){for(var i=0;i<dirsWithInsert.length;i++){callHook$1(dirsWithInsert[i],'inserted',vnode,oldVnode);}};if(isCreate){mergeVNodeHook(vnode.data.hook||(vnode.data.hook={}),'insert',callInsert,'dir-insert');}else{callInsert();}}if(dirsWithPostpatch.length){mergeVNodeHook(vnode.data.hook||(vnode.data.hook={}),'postpatch',function(){for(var i=0;i<dirsWithPostpatch.length;i++){callHook$1(dirsWithPostpatch[i],'componentUpdated',vnode,oldVnode);}},'dir-postpatch');}if(!isCreate){for(key in oldDirs){if(!newDirs[key]){// no longer present, unbind
    callHook$1(oldDirs[key],'unbind',oldVnode,oldVnode,isDestroy);}}}}var emptyModifiers=Object.create(null);function normalizeDirectives$1(dirs,vm){var res=Object.create(null);if(!dirs){return res;}var i,dir;for(i=0;i<dirs.length;i++){dir=dirs[i];if(!dir.modifiers){dir.modifiers=emptyModifiers;}res[getRawDirName(dir)]=dir;dir.def=resolveAsset(vm.$options,'directives',dir.name,true);}return res;}function getRawDirName(dir){return dir.rawName||dir.name+"."+Object.keys(dir.modifiers||{}).join('.');}function callHook$1(dir,hook,vnode,oldVnode,isDestroy){var fn=dir.def&&dir.def[hook];if(fn){fn(vnode.elm,dir,vnode,oldVnode,isDestroy);}}var baseModules=[ref,directives];/*  */function updateAttrs(oldVnode,vnode){if(!oldVnode.data.attrs&&!vnode.data.attrs){return;}var key,cur,old;var elm=vnode.elm;var oldAttrs=oldVnode.data.attrs||{};var attrs=vnode.data.attrs||{};// clone observed objects, as the user probably wants to mutate it
    if(attrs.__ob__){attrs=vnode.data.attrs=extend({},attrs);}for(key in attrs){cur=attrs[key];old=oldAttrs[key];if(old!==cur){setAttr(elm,key,cur);}}// #4391: in IE9, setting type can reset value for input[type=radio]
    /* istanbul ignore if */if(isIE9&&attrs.value!==oldAttrs.value){setAttr(elm,'value',attrs.value);}for(key in oldAttrs){if(attrs[key]==null){if(isXlink(key)){elm.removeAttributeNS(xlinkNS,getXlinkProp(key));}else if(!isEnumeratedAttr(key)){elm.removeAttribute(key);}}}}function setAttr(el,key,value){if(isBooleanAttr(key)){// set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if(isFalsyAttrValue(value)){el.removeAttribute(key);}else{el.setAttribute(key,key);}}else if(isEnumeratedAttr(key)){el.setAttribute(key,isFalsyAttrValue(value)||value==='false'?'false':'true');}else if(isXlink(key)){if(isFalsyAttrValue(value)){el.removeAttributeNS(xlinkNS,getXlinkProp(key));}else{el.setAttributeNS(xlinkNS,key,value);}}else{if(isFalsyAttrValue(value)){el.removeAttribute(key);}else{el.setAttribute(key,value);}}}var attrs={create:updateAttrs,update:updateAttrs};/*  */function updateClass(oldVnode,vnode){var el=vnode.elm;var data=vnode.data;var oldData=oldVnode.data;if(!data.staticClass&&!data.class&&(!oldData||!oldData.staticClass&&!oldData.class)){return;}var cls=genClassForVnode(vnode);// handle transition classes
    var transitionClass=el._transitionClasses;if(transitionClass){cls=concat(cls,stringifyClass(transitionClass));}// set the class
    if(cls!==el._prevClass){el.setAttribute('class',cls);el._prevClass=cls;}}var klass={create:updateClass,update:updateClass};/*  */var target$1;function add$2(event,_handler,once,capture){if(once){var oldHandler=_handler;var _target=target$1;// save current target element in closure
    _handler=function handler(ev){remove$3(event,_handler,capture,_target);arguments.length===1?oldHandler(ev):oldHandler.apply(null,arguments);};}target$1.addEventListener(event,_handler,capture);}function remove$3(event,handler,capture,_target){(_target||target$1).removeEventListener(event,handler,capture);}function updateDOMListeners(oldVnode,vnode){if(!oldVnode.data.on&&!vnode.data.on){return;}var on=vnode.data.on||{};var oldOn=oldVnode.data.on||{};target$1=vnode.elm;updateListeners(on,oldOn,add$2,remove$3,vnode.context);}var events={create:updateDOMListeners,update:updateDOMListeners};/*  */function updateDOMProps(oldVnode,vnode){if(!oldVnode.data.domProps&&!vnode.data.domProps){return;}var key,cur;var elm=vnode.elm;var oldProps=oldVnode.data.domProps||{};var props=vnode.data.domProps||{};// clone observed objects, as the user probably wants to mutate it
    if(props.__ob__){props=vnode.data.domProps=extend({},props);}for(key in oldProps){if(props[key]==null){elm[key]='';}}for(key in props){cur=props[key];// ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if(key==='textContent'||key==='innerHTML'){if(vnode.children){vnode.children.length=0;}if(cur===oldProps[key]){continue;}}if(key==='value'){// store value as _value as well since
    // non-string values will be stringified
    elm._value=cur;// avoid resetting cursor position when value is the same
    var strCur=cur==null?'':String(cur);if(shouldUpdateValue(elm,vnode,strCur)){elm.value=strCur;}}else{elm[key]=cur;}}}// check platforms/web/util/attrs.js acceptValue
    function shouldUpdateValue(elm,vnode,checkVal){return!elm.composing&&(vnode.tag==='option'||isDirty(elm,checkVal)||isInputChanged(vnode,checkVal));}function isDirty(elm,checkVal){// return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
    return document.activeElement!==elm&&elm.value!==checkVal;}function isInputChanged(vnode,newVal){var value=vnode.elm.value;var modifiers=vnode.elm._vModifiers;// injected by v-model runtime
    if(modifiers&&modifiers.number||vnode.elm.type==='number'){return toNumber(value)!==toNumber(newVal);}if(modifiers&&modifiers.trim){return value.trim()!==newVal.trim();}return value!==newVal;}var domProps={create:updateDOMProps,update:updateDOMProps};/*  */var parseStyleText=cached(function(cssText){var res={};var listDelimiter=/;(?![^(]*\))/g;var propertyDelimiter=/:(.+)/;cssText.split(listDelimiter).forEach(function(item){if(item){var tmp=item.split(propertyDelimiter);tmp.length>1&&(res[tmp[0].trim()]=tmp[1].trim());}});return res;});// merge static and dynamic style data on the same vnode
    function normalizeStyleData(data){var style=normalizeStyleBinding(data.style);// static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle?extend(data.staticStyle,style):style;}// normalize possible array / string values into Object
    function normalizeStyleBinding(bindingStyle){if(Array.isArray(bindingStyle)){return toObject(bindingStyle);}if(typeof bindingStyle==='string'){return parseStyleText(bindingStyle);}return bindingStyle;}/**
     * parent component style should be after child's
     * so that parent component's style could override it
     */function getStyle(vnode,checkChild){var res={};var styleData;if(checkChild){var childNode=vnode;while(childNode.componentInstance){childNode=childNode.componentInstance._vnode;if(childNode.data&&(styleData=normalizeStyleData(childNode.data))){extend(res,styleData);}}}if(styleData=normalizeStyleData(vnode.data)){extend(res,styleData);}var parentNode=vnode;while(parentNode=parentNode.parent){if(parentNode.data&&(styleData=normalizeStyleData(parentNode.data))){extend(res,styleData);}}return res;}/*  */var cssVarRE=/^--/;var importantRE=/\s*!important$/;var setProp=function setProp(el,name,val){/* istanbul ignore if */if(cssVarRE.test(name)){el.style.setProperty(name,val);}else if(importantRE.test(val)){el.style.setProperty(name,val.replace(importantRE,''),'important');}else{el.style[normalize(name)]=val;}};var prefixes=['Webkit','Moz','ms'];var testEl;var normalize=cached(function(prop){testEl=testEl||document.createElement('div');prop=camelize(prop);if(prop!=='filter'&&prop in testEl.style){return prop;}var upper=prop.charAt(0).toUpperCase()+prop.slice(1);for(var i=0;i<prefixes.length;i++){var prefixed=prefixes[i]+upper;if(prefixed in testEl.style){return prefixed;}}});function updateStyle(oldVnode,vnode){var data=vnode.data;var oldData=oldVnode.data;if(!data.staticStyle&&!data.style&&!oldData.staticStyle&&!oldData.style){return;}var cur,name;var el=vnode.elm;var oldStaticStyle=oldVnode.data.staticStyle;var oldStyleBinding=oldVnode.data.style||{};// if static style exists, stylebinding already merged into it when doing normalizeStyleData
    var oldStyle=oldStaticStyle||oldStyleBinding;var style=normalizeStyleBinding(vnode.data.style)||{};vnode.data.style=style.__ob__?extend({},style):style;var newStyle=getStyle(vnode,true);for(name in oldStyle){if(newStyle[name]==null){setProp(el,name,'');}}for(name in newStyle){cur=newStyle[name];if(cur!==oldStyle[name]){// ie9 setting to null has no effect, must use empty string
    setProp(el,name,cur==null?'':cur);}}}var style={create:updateStyle,update:updateStyle};/*  *//**
     * Add class with compatibility for SVG since classList is not supported on
     * SVG elements in IE
     */function addClass(el,cls){/* istanbul ignore if */if(!cls||!cls.trim()){return;}/* istanbul ignore else */if(el.classList){if(cls.indexOf(' ')>-1){cls.split(/\s+/).forEach(function(c){return el.classList.add(c);});}else{el.classList.add(cls);}}else{var cur=' '+el.getAttribute('class')+' ';if(cur.indexOf(' '+cls+' ')<0){el.setAttribute('class',(cur+cls).trim());}}}/**
     * Remove class with compatibility for SVG since classList is not supported on
     * SVG elements in IE
     */function removeClass(el,cls){/* istanbul ignore if */if(!cls||!cls.trim()){return;}/* istanbul ignore else */if(el.classList){if(cls.indexOf(' ')>-1){cls.split(/\s+/).forEach(function(c){return el.classList.remove(c);});}else{el.classList.remove(cls);}}else{var cur=' '+el.getAttribute('class')+' ';var tar=' '+cls+' ';while(cur.indexOf(tar)>=0){cur=cur.replace(tar,' ');}el.setAttribute('class',cur.trim());}}/*  */var hasTransition=inBrowser&&!isIE9;var TRANSITION='transition';var ANIMATION='animation';// Transition property/event sniffing
    var transitionProp='transition';var transitionEndEvent='transitionend';var animationProp='animation';var animationEndEvent='animationend';if(hasTransition){/* istanbul ignore if */if(window.ontransitionend===undefined&&window.onwebkittransitionend!==undefined){transitionProp='WebkitTransition';transitionEndEvent='webkitTransitionEnd';}if(window.onanimationend===undefined&&window.onwebkitanimationend!==undefined){animationProp='WebkitAnimation';animationEndEvent='webkitAnimationEnd';}}// binding to window is necessary to make hot reload work in IE in strict mode
    var raf=inBrowser&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout;function nextFrame(fn){raf(function(){raf(fn);});}function addTransitionClass(el,cls){(el._transitionClasses||(el._transitionClasses=[])).push(cls);addClass(el,cls);}function removeTransitionClass(el,cls){if(el._transitionClasses){remove$1(el._transitionClasses,cls);}removeClass(el,cls);}function whenTransitionEnds(el,expectedType,cb){var ref=getTransitionInfo(el,expectedType);var type=ref.type;var timeout=ref.timeout;var propCount=ref.propCount;if(!type){return cb();}var event=type===TRANSITION?transitionEndEvent:animationEndEvent;var ended=0;var end=function end(){el.removeEventListener(event,onEnd);cb();};var onEnd=function onEnd(e){if(e.target===el){if(++ended>=propCount){end();}}};setTimeout(function(){if(ended<propCount){end();}},timeout+1);el.addEventListener(event,onEnd);}var transformRE=/\b(transform|all)(,|$)/;function getTransitionInfo(el,expectedType){var styles=window.getComputedStyle(el);var transitioneDelays=styles[transitionProp+'Delay'].split(', ');var transitionDurations=styles[transitionProp+'Duration'].split(', ');var transitionTimeout=getTimeout(transitioneDelays,transitionDurations);var animationDelays=styles[animationProp+'Delay'].split(', ');var animationDurations=styles[animationProp+'Duration'].split(', ');var animationTimeout=getTimeout(animationDelays,animationDurations);var type;var timeout=0;var propCount=0;/* istanbul ignore if */if(expectedType===TRANSITION){if(transitionTimeout>0){type=TRANSITION;timeout=transitionTimeout;propCount=transitionDurations.length;}}else if(expectedType===ANIMATION){if(animationTimeout>0){type=ANIMATION;timeout=animationTimeout;propCount=animationDurations.length;}}else{timeout=Math.max(transitionTimeout,animationTimeout);type=timeout>0?transitionTimeout>animationTimeout?TRANSITION:ANIMATION:null;propCount=type?type===TRANSITION?transitionDurations.length:animationDurations.length:0;}var hasTransform=type===TRANSITION&&transformRE.test(styles[transitionProp+'Property']);return{type:type,timeout:timeout,propCount:propCount,hasTransform:hasTransform};}function getTimeout(delays,durations){/* istanbul ignore next */while(delays.length<durations.length){delays=delays.concat(delays);}return Math.max.apply(null,durations.map(function(d,i){return toMs(d)+toMs(delays[i]);}));}function toMs(s){return Number(s.slice(0,-1))*1000;}/*  */function enter(vnode,toggleDisplay){var el=vnode.elm;// call leave callback now
    if(el._leaveCb){el._leaveCb.cancelled=true;el._leaveCb();}var data=resolveTransition(vnode.data.transition);if(!data){return;}/* istanbul ignore if */if(el._enterCb||el.nodeType!==1){return;}var css=data.css;var type=data.type;var enterClass=data.enterClass;var enterToClass=data.enterToClass;var enterActiveClass=data.enterActiveClass;var appearClass=data.appearClass;var appearToClass=data.appearToClass;var appearActiveClass=data.appearActiveClass;var beforeEnter=data.beforeEnter;var enter=data.enter;var afterEnter=data.afterEnter;var enterCancelled=data.enterCancelled;var beforeAppear=data.beforeAppear;var appear=data.appear;var afterAppear=data.afterAppear;var appearCancelled=data.appearCancelled;// activeInstance will always be the <transition> component managing this
    // transition. One edge case to check is when the <transition> is placed
    // as the root node of a child component. In that case we need to check
    // <transition>'s parent for appear check.
    var context=activeInstance;var transitionNode=activeInstance.$vnode;while(transitionNode&&transitionNode.parent){transitionNode=transitionNode.parent;context=transitionNode.context;}var isAppear=!context._isMounted||!vnode.isRootInsert;if(isAppear&&!appear&&appear!==''){return;}var startClass=isAppear?appearClass:enterClass;var activeClass=isAppear?appearActiveClass:enterActiveClass;var toClass=isAppear?appearToClass:enterToClass;var beforeEnterHook=isAppear?beforeAppear||beforeEnter:beforeEnter;var enterHook=isAppear?typeof appear==='function'?appear:enter:enter;var afterEnterHook=isAppear?afterAppear||afterEnter:afterEnter;var enterCancelledHook=isAppear?appearCancelled||enterCancelled:enterCancelled;var expectsCSS=css!==false&&!isIE9;var userWantsControl=enterHook&&// enterHook may be a bound method which exposes
    // the length of original fn as _length
    (enterHook._length||enterHook.length)>1;var cb=el._enterCb=once(function(){if(expectsCSS){removeTransitionClass(el,toClass);removeTransitionClass(el,activeClass);}if(cb.cancelled){if(expectsCSS){removeTransitionClass(el,startClass);}enterCancelledHook&&enterCancelledHook(el);}else{afterEnterHook&&afterEnterHook(el);}el._enterCb=null;});if(!vnode.data.show){// remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook||(vnode.data.hook={}),'insert',function(){var parent=el.parentNode;var pendingNode=parent&&parent._pending&&parent._pending[vnode.key];if(pendingNode&&pendingNode.tag===vnode.tag&&pendingNode.elm._leaveCb){pendingNode.elm._leaveCb();}enterHook&&enterHook(el,cb);},'transition-insert');}// start enter transition
    beforeEnterHook&&beforeEnterHook(el);if(expectsCSS){addTransitionClass(el,startClass);addTransitionClass(el,activeClass);nextFrame(function(){addTransitionClass(el,toClass);removeTransitionClass(el,startClass);if(!cb.cancelled&&!userWantsControl){whenTransitionEnds(el,type,cb);}});}if(vnode.data.show){toggleDisplay&&toggleDisplay();enterHook&&enterHook(el,cb);}if(!expectsCSS&&!userWantsControl){cb();}}function leave(vnode,rm){var el=vnode.elm;// call enter callback now
    if(el._enterCb){el._enterCb.cancelled=true;el._enterCb();}var data=resolveTransition(vnode.data.transition);if(!data){return rm();}/* istanbul ignore if */if(el._leaveCb||el.nodeType!==1){return;}var css=data.css;var type=data.type;var leaveClass=data.leaveClass;var leaveToClass=data.leaveToClass;var leaveActiveClass=data.leaveActiveClass;var beforeLeave=data.beforeLeave;var leave=data.leave;var afterLeave=data.afterLeave;var leaveCancelled=data.leaveCancelled;var delayLeave=data.delayLeave;var expectsCSS=css!==false&&!isIE9;var userWantsControl=leave&&// leave hook may be a bound method which exposes
    // the length of original fn as _length
    (leave._length||leave.length)>1;var cb=el._leaveCb=once(function(){if(el.parentNode&&el.parentNode._pending){el.parentNode._pending[vnode.key]=null;}if(expectsCSS){removeTransitionClass(el,leaveToClass);removeTransitionClass(el,leaveActiveClass);}if(cb.cancelled){if(expectsCSS){removeTransitionClass(el,leaveClass);}leaveCancelled&&leaveCancelled(el);}else{rm();afterLeave&&afterLeave(el);}el._leaveCb=null;});if(delayLeave){delayLeave(performLeave);}else{performLeave();}function performLeave(){// the delayed leave may have already been cancelled
    if(cb.cancelled){return;}// record leaving element
    if(!vnode.data.show){(el.parentNode._pending||(el.parentNode._pending={}))[vnode.key]=vnode;}beforeLeave&&beforeLeave(el);if(expectsCSS){addTransitionClass(el,leaveClass);addTransitionClass(el,leaveActiveClass);nextFrame(function(){addTransitionClass(el,leaveToClass);removeTransitionClass(el,leaveClass);if(!cb.cancelled&&!userWantsControl){whenTransitionEnds(el,type,cb);}});}leave&&leave(el,cb);if(!expectsCSS&&!userWantsControl){cb();}}}function resolveTransition(def$$1){if(!def$$1){return;}/* istanbul ignore else */if((typeof def$$1==='undefined'?'undefined':_typeof(def$$1))==='object'){var res={};if(def$$1.css!==false){extend(res,autoCssTransition(def$$1.name||'v'));}extend(res,def$$1);return res;}else if(typeof def$$1==='string'){return autoCssTransition(def$$1);}}var autoCssTransition=cached(function(name){return{enterClass:name+"-enter",leaveClass:name+"-leave",appearClass:name+"-enter",enterToClass:name+"-enter-to",leaveToClass:name+"-leave-to",appearToClass:name+"-enter-to",enterActiveClass:name+"-enter-active",leaveActiveClass:name+"-leave-active",appearActiveClass:name+"-enter-active"};});function once(fn){var called=false;return function(){if(!called){called=true;fn();}};}function _enter(_,vnode){if(!vnode.data.show){enter(vnode);}}var transition=inBrowser?{create:_enter,activate:_enter,remove:function remove(vnode,rm){/* istanbul ignore else */if(!vnode.data.show){leave(vnode,rm);}else{rm();}}}:{};var platformModules=[attrs,klass,events,domProps,style,transition];/*  */// the directive module should be applied last, after all
    // built-in modules have been applied.
    var modules=platformModules.concat(baseModules);var patch$1=createPatchFunction({nodeOps:nodeOps,modules:modules});/**
     * Not type checking this file because flow doesn't like attaching
     * properties to Elements.
     */var modelableTagRE=/^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;/* istanbul ignore if */if(isIE9){// http://www.matts411.com/post/internet-explorer-9-oninput/
    document.addEventListener('selectionchange',function(){var el=document.activeElement;if(el&&el.vmodel){trigger(el,'input');}});}var model={inserted:function inserted(el,binding,vnode){if(process.env.NODE_ENV!=='production'){if(!modelableTagRE.test(vnode.tag)){warn("v-model is not supported on element type: <"+vnode.tag+">. "+'If you are working with contenteditable, it\'s recommended to '+'wrap a library dedicated for that purpose inside a custom component.',vnode.context);}}if(vnode.tag==='select'){var cb=function cb(){setSelected(el,binding,vnode.context);};cb();/* istanbul ignore if */if(isIE||isEdge){setTimeout(cb,0);}}else if(vnode.tag==='textarea'||el.type==='text'){el._vModifiers=binding.modifiers;if(!binding.modifiers.lazy){if(!isAndroid){el.addEventListener('compositionstart',onCompositionStart);el.addEventListener('compositionend',onCompositionEnd);}/* istanbul ignore if */if(isIE9){el.vmodel=true;}}}},componentUpdated:function componentUpdated(el,binding,vnode){if(vnode.tag==='select'){setSelected(el,binding,vnode.context);// in case the options rendered by v-for have changed,
    // it's possible that the value is out-of-sync with the rendered options.
    // detect such cases and filter out values that no longer has a matching
    // option in the DOM.
    var needReset=el.multiple?binding.value.some(function(v){return hasNoMatchingOption(v,el.options);}):binding.value!==binding.oldValue&&hasNoMatchingOption(binding.value,el.options);if(needReset){trigger(el,'change');}}}};function setSelected(el,binding,vm){var value=binding.value;var isMultiple=el.multiple;if(isMultiple&&!Array.isArray(value)){process.env.NODE_ENV!=='production'&&warn("<select multiple v-model=\""+binding.expression+"\"> "+"expects an Array value for its binding, but got "+Object.prototype.toString.call(value).slice(8,-1),vm);return;}var selected,option;for(var i=0,l=el.options.length;i<l;i++){option=el.options[i];if(isMultiple){selected=looseIndexOf(value,getValue(option))>-1;if(option.selected!==selected){option.selected=selected;}}else{if(looseEqual(getValue(option),value)){if(el.selectedIndex!==i){el.selectedIndex=i;}return;}}}if(!isMultiple){el.selectedIndex=-1;}}function hasNoMatchingOption(value,options){for(var i=0,l=options.length;i<l;i++){if(looseEqual(getValue(options[i]),value)){return false;}}return true;}function getValue(option){return'_value'in option?option._value:option.value;}function onCompositionStart(e){e.target.composing=true;}function onCompositionEnd(e){e.target.composing=false;trigger(e.target,'input');}function trigger(el,type){var e=document.createEvent('HTMLEvents');e.initEvent(type,true,true);el.dispatchEvent(e);}/*  */// recursively search for possible transition defined inside the component root
    function locateNode(vnode){return vnode.componentInstance&&(!vnode.data||!vnode.data.transition)?locateNode(vnode.componentInstance._vnode):vnode;}var show={bind:function bind(el,ref,vnode){var value=ref.value;vnode=locateNode(vnode);var transition=vnode.data&&vnode.data.transition;var originalDisplay=el.__vOriginalDisplay=el.style.display==='none'?'':el.style.display;if(value&&transition&&!isIE9){vnode.data.show=true;enter(vnode,function(){el.style.display=originalDisplay;});}else{el.style.display=value?originalDisplay:'none';}},update:function update(el,ref,vnode){var value=ref.value;var oldValue=ref.oldValue;/* istanbul ignore if */if(value===oldValue){return;}vnode=locateNode(vnode);var transition=vnode.data&&vnode.data.transition;if(transition&&!isIE9){vnode.data.show=true;if(value){enter(vnode,function(){el.style.display=el.__vOriginalDisplay;});}else{leave(vnode,function(){el.style.display='none';});}}else{el.style.display=value?el.__vOriginalDisplay:'none';}},unbind:function unbind(el,binding,vnode,oldVnode,isDestroy){if(!isDestroy){el.style.display=el.__vOriginalDisplay;}}};var platformDirectives={model:model,show:show};/*  */// Provides transition support for a single element/component.
    // supports transition mode (out-in / in-out)
    var transitionProps={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String};// in case the child is also an abstract component, e.g. <keep-alive>
    // we want to recursively retrieve the real component to be rendered
    function getRealChild(vnode){var compOptions=vnode&&vnode.componentOptions;if(compOptions&&compOptions.Ctor.options.abstract){return getRealChild(getFirstComponentChild(compOptions.children));}else{return vnode;}}function extractTransitionData(comp){var data={};var options=comp.$options;// props
    for(var key in options.propsData){data[key]=comp[key];}// events.
    // extract listeners and pass them directly to the transition methods
    var listeners=options._parentListeners;for(var key$1 in listeners){data[camelize(key$1)]=listeners[key$1].fn;}return data;}function placeholder(h,rawChild){return /\d-keep-alive$/.test(rawChild.tag)?h('keep-alive'):null;}function hasParentTransition(vnode){while(vnode=vnode.parent){if(vnode.data.transition){return true;}}}function isSameChild(child,oldChild){return oldChild.key===child.key&&oldChild.tag===child.tag;}var Transition={name:'transition',props:transitionProps,abstract:true,render:function render(h){var this$1=this;var children=this.$slots.default;if(!children){return;}// filter out text nodes (possible whitespaces)
    children=children.filter(function(c){return c.tag;});/* istanbul ignore if */if(!children.length){return;}// warn multiple elements
    if(process.env.NODE_ENV!=='production'&&children.length>1){warn('<transition> can only be used on a single element. Use '+'<transition-group> for lists.',this.$parent);}var mode=this.mode;// warn invalid mode
    if(process.env.NODE_ENV!=='production'&&mode&&mode!=='in-out'&&mode!=='out-in'){warn('invalid <transition> mode: '+mode,this.$parent);}var rawChild=children[0];// if this is a component root node and the component's
    // parent container node also has transition, skip.
    if(hasParentTransition(this.$vnode)){return rawChild;}// apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child=getRealChild(rawChild);/* istanbul ignore if */if(!child){return rawChild;}if(this._leaving){return placeholder(h,rawChild);}// ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id="__transition-"+this._uid+"-";var key=child.key=child.key==null?id+child.tag:isPrimitive(child.key)?String(child.key).indexOf(id)===0?child.key:id+child.key:child.key;var data=(child.data||(child.data={})).transition=extractTransitionData(this);var oldRawChild=this._vnode;var oldChild=getRealChild(oldRawChild);// mark v-show
    // so that the transition module can hand over the control to the directive
    if(child.data.directives&&child.data.directives.some(function(d){return d.name==='show';})){child.data.show=true;}if(oldChild&&oldChild.data&&!isSameChild(child,oldChild)){// replace old child transition data with fresh one
    // important for dynamic transitions!
    var oldData=oldChild&&(oldChild.data.transition=extend({},data));// handle transition mode
    if(mode==='out-in'){// return placeholder node and queue update when leave finishes
    this._leaving=true;mergeVNodeHook(oldData,'afterLeave',function(){this$1._leaving=false;this$1.$forceUpdate();},key);return placeholder(h,rawChild);}else if(mode==='in-out'){var delayedLeave;var performLeave=function performLeave(){delayedLeave();};mergeVNodeHook(data,'afterEnter',performLeave,key);mergeVNodeHook(data,'enterCancelled',performLeave,key);mergeVNodeHook(oldData,'delayLeave',function(leave){delayedLeave=leave;},key);}}return rawChild;}};/*  */// Provides transition support for list items.
    // supports move transitions using the FLIP technique.
    // Because the vdom's children update algorithm is "unstable" - i.e.
    // it doesn't guarantee the relative positioning of removed elements,
    // we force transition-group to update its children into two passes:
    // in the first pass, we remove all nodes that need to be removed,
    // triggering their leaving transition; in the second pass, we insert/move
    // into the final disired state. This way in the second pass removed
    // nodes will remain where they should be.
    var props=extend({tag:String,moveClass:String},transitionProps);delete props.mode;var TransitionGroup={props:props,render:function render(h){var tag=this.tag||this.$vnode.data.tag||'span';var map=Object.create(null);var prevChildren=this.prevChildren=this.children;var rawChildren=this.$slots.default||[];var children=this.children=[];var transitionData=extractTransitionData(this);for(var i=0;i<rawChildren.length;i++){var c=rawChildren[i];if(c.tag){if(c.key!=null&&String(c.key).indexOf('__vlist')!==0){children.push(c);map[c.key]=c;(c.data||(c.data={})).transition=transitionData;}else if(process.env.NODE_ENV!=='production'){var opts=c.componentOptions;var name=opts?opts.Ctor.options.name||opts.tag:c.tag;warn("<transition-group> children must be keyed: <"+name+">");}}}if(prevChildren){var kept=[];var removed=[];for(var i$1=0;i$1<prevChildren.length;i$1++){var c$1=prevChildren[i$1];c$1.data.transition=transitionData;c$1.data.pos=c$1.elm.getBoundingClientRect();if(map[c$1.key]){kept.push(c$1);}else{removed.push(c$1);}}this.kept=h(tag,null,kept);this.removed=removed;}return h(tag,null,children);},beforeUpdate:function beforeUpdate(){// force removing pass
    this.__patch__(this._vnode,this.kept,false,// hydrating
    true// removeOnly (!important, avoids unnecessary moves)
    );this._vnode=this.kept;},updated:function updated(){var children=this.prevChildren;var moveClass=this.moveClass||(this.name||'v')+'-move';if(!children.length||!this.hasMove(children[0].elm,moveClass)){return;}// we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);children.forEach(recordPosition);children.forEach(applyTranslation);// force reflow to put everything in position
    var f=document.body.offsetHeight;// eslint-disable-line
    children.forEach(function(c){if(c.data.moved){var el=c.elm;var s=el.style;addTransitionClass(el,moveClass);s.transform=s.WebkitTransform=s.transitionDuration='';el.addEventListener(transitionEndEvent,el._moveCb=function cb(e){if(!e||/transform$/.test(e.propertyName)){el.removeEventListener(transitionEndEvent,cb);el._moveCb=null;removeTransitionClass(el,moveClass);}});}});},methods:{hasMove:function hasMove(el,moveClass){/* istanbul ignore if */if(!hasTransition){return false;}if(this._hasMove!=null){return this._hasMove;}addTransitionClass(el,moveClass);var info=getTransitionInfo(el);removeTransitionClass(el,moveClass);return this._hasMove=info.hasTransform;}}};function callPendingCbs(c){/* istanbul ignore if */if(c.elm._moveCb){c.elm._moveCb();}/* istanbul ignore if */if(c.elm._enterCb){c.elm._enterCb();}}function recordPosition(c){c.data.newPos=c.elm.getBoundingClientRect();}function applyTranslation(c){var oldPos=c.data.pos;var newPos=c.data.newPos;var dx=oldPos.left-newPos.left;var dy=oldPos.top-newPos.top;if(dx||dy){c.data.moved=true;var s=c.elm.style;s.transform=s.WebkitTransform="translate("+dx+"px,"+dy+"px)";s.transitionDuration='0s';}}var platformComponents={Transition:Transition,TransitionGroup:TransitionGroup};/*  */// install platform specific utils
    Vue$2.config.isUnknownElement=isUnknownElement;Vue$2.config.isReservedTag=isReservedTag;Vue$2.config.getTagNamespace=getTagNamespace;Vue$2.config.mustUseProp=mustUseProp;// install platform runtime directives & components
    extend(Vue$2.options.directives,platformDirectives);extend(Vue$2.options.components,platformComponents);// install platform patch function
    Vue$2.prototype.__patch__=inBrowser?patch$1:noop;// wrap mount
    Vue$2.prototype.$mount=function(el,hydrating){el=el&&inBrowser?query(el):undefined;return this._mount(el,hydrating);};if(process.env.NODE_ENV!=='production'&&inBrowser&&typeof console!=='undefined'){console[console.info?'info':'log']("You are running Vue in development mode.\n"+"Make sure to turn on production mode when deploying for production.\n"+"See more tips at https://vuejs.org/guide/deployment.html");}// devtools global hook
    /* istanbul ignore next */setTimeout(function(){if(config.devtools){if(devtools){devtools.emit('init',Vue$2);}else if(process.env.NODE_ENV!=='production'&&inBrowser&&!isEdge&&/Chrome\/\d+/.test(window.navigator.userAgent)){console[console.info?'info':'log']('Download the Vue Devtools extension for a better development experience:\n'+'https://github.com/vuejs/vue-devtools');}}},0);module.exports=Vue$2;
    /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

    'use strict';
    
    // shim for using process in browser
    var process = module.exports = {};
    
    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.
    
    var cachedSetTimeout;
    var cachedClearTimeout;
    
    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    })();
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    
    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }
    
    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
    
        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }
    
    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };
    
    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};
    
    function noop() {}
    
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    
    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };
    
    process.cwd = function () {
        return '/';
    };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
        return 0;
    };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';
    
    // loading 
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    __webpack_require__(4);
    var hasDom = false;
    
    var shopBase = {
    
      isOnline: function isOnline(callbackId) {
        var sender = this.sender;
        var hostname = window.location.hostname;
        var result = false;
        if (hostname.indexOf('showjoy.com') !== -1) {
          result = true;
        }
        sender.performCallback(callbackId, {
          data: result
        });
      },
    
      reload: function reload() {
    
        window.location.reload();
      },
    
      showLoading: function showLoading(str) {
        var text = str == undefined ? '加载中...' : str;
        var spanDom = text != '' ? '<span class="text">' + text + '</span>' : '<span></span>';
    
        if (!hasDom) {
          var $appendContainer = document.body;
          var dom = '<div class="joy-ui-loading j_JoyLoading">' + '<div class="content-box">' + '<div class="circle"></div>' + '<div class="j_JoyLoadingTextWrap" style="float: left">' + spanDom + '</div>' + '</div>' + '</div>';
          var div = document.createElement('div');
          div.innerHTML = dom;
          $appendContainer.appendChild(div);
          hasDom = true;
        }
    
        document.querySelector('.j_JoyLoadingTextWrap').innerHTML = spanDom;
        document.querySelector('.j_JoyLoading').style.display = 'block';
      },
    
      hideLoading: function hideLoading() {
        document.querySelector('.j_JoyLoading').style.display = 'none';
      },
    
      setTitle: function setTitle(title) {
        try {
          title = decodeURIComponent(title);
        } catch (e) {}
        document.title = title;
      },
    
      getElement: function getElement(hook, callbackId) {
        var sender = this.sender;
        var el = document.querySelector(hook);
        sender.performCallback(callbackId, {
          el: el
        });
      },
    
      loadPage: function loadPage(urlString) {
        var linkStr = '';
        if (urlString.indexOf('?') > -1) {
          linkStr = '&v=';
        } else {
          linkStr = '?v=';
        }
        window.location.href = urlString + linkStr + new Date().getTime();
      }
    
    };
    
    exports.default = shopBase;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = __webpack_require__(5);
    if(typeof content === 'string') content = [[module.id, content, '']];
    // add the styles to the DOM
    var update = __webpack_require__(7)(content, {});
    if(content.locals) module.exports = content.locals;
    // Hot Module Replacement
    if(false) {
        // When the styles change, update the <style> tags
        if(!content.locals) {
            module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/less-loader/index.js!./style.less", function() {
                var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/less-loader/index.js!./style.less");
                if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
                update(newContent);
            });
        }
        // When the module is disposed, remove the <style> tags
        module.hot.dispose(function() { update(); });
    }

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

    exports = module.exports = __webpack_require__(6)();
    // imports
    
    
    // module
    exports.push([module.id, ".joy-ui-loading {\n  display: none;\n  z-index: 999;\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n}\n.joy-ui-loading .content-box {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  padding: 0.3rem 0.45rem;\n  -webkit-transform: translateY(-50%) translateX(-50%);\n          transform: translateY(-50%) translateX(-50%);\n  color: #fff;\n  font-size: 0.426666rem;\n  background-color: #111;\n  border-radius: 0.133334rem;\n  overflow: hidden;\n}\n.joy-ui-loading .content-box .circle {\n  position: relative;\n  box-sizing: border-box;\n  float: left;\n  width: 0.8rem;\n  height: 0.8rem;\n  border-top: 2px solid #fff;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  border-left: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 0.4rem;\n  -webkit-animation: rotateO 0.6s 0s infinite normal linear;\n  animation: rotateO 0.6s 0s infinite normal linear;\n}\n.joy-ui-loading .content-box .text {\n  display: inline-block;\n  height: 0.8rem;\n  line-height: 0.8rem;\n  float: left;\n  margin-left: 0.26rem;\n  color: #fff;\n  font-size: 24px;\n}\n@-webkit-keyframes rotateO {\n  0% {\n    -webkit-transform: rotate(-359deg);\n    -webkit-transform-origin: center;\n  }\n  100% {\n    -webkit-transform: rotate(0deg);\n  }\n}\n@keyframes rotateO {\n  0% {\n    -webkit-transform: rotate(-359deg);\n            transform: rotate(-359deg);\n    -webkit-transform-origin: center;\n            transform-origin: center;\n  }\n  100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n", ""]);
    
    // exports


/***/ },
/* 6 */
/***/ function(module, exports) {

    "use strict";
    
    /*
        MIT License http://www.opensource.org/licenses/mit-license.php
        Author Tobias Koppers @sokra
    */
    // css base code, injected by the css-loader
    module.exports = function () {
        var list = [];
    
        // return the list of modules as css string
        list.toString = function toString() {
            var result = [];
            for (var i = 0; i < this.length; i++) {
                var item = this[i];
                if (item[2]) {
                    result.push("@media " + item[2] + "{" + item[1] + "}");
                } else {
                    result.push(item[1]);
                }
            }
            return result.join("");
        };
    
        // import a list of modules into the list
        list.i = function (modules, mediaQuery) {
            if (typeof modules === "string") modules = [[null, modules, ""]];
            var alreadyImportedModules = {};
            for (var i = 0; i < this.length; i++) {
                var id = this[i][0];
                if (typeof id === "number") alreadyImportedModules[id] = true;
            }
            for (i = 0; i < modules.length; i++) {
                var item = modules[i];
                // skip already imported module
                // this implementation is not 100% perfect for weird media query combinations
                //  when a module is imported multiple times with different media queries.
                //  I hope this will never occur (Hey this way we have smaller bundles)
                if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
                    if (mediaQuery && !item[2]) {
                        item[2] = mediaQuery;
                    } else if (mediaQuery) {
                        item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
                    }
                    list.push(item);
                }
            }
        };
        return list;
    };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

    /*
        MIT License http://www.opensource.org/licenses/mit-license.php
        Author Tobias Koppers @sokra
    */
    var stylesInDom = {},
        memoize = function(fn) {
            var memo;
            return function () {
                if (typeof memo === "undefined") memo = fn.apply(this, arguments);
                return memo;
            };
        },
        isOldIE = memoize(function() {
            return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
        }),
        getHeadElement = memoize(function () {
            return document.head || document.getElementsByTagName("head")[0];
        }),
        singletonElement = null,
        singletonCounter = 0,
        styleElementsInsertedAtTop = [];
    
    module.exports = function(list, options) {
        if(false) {
            if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
        }
    
        options = options || {};
        // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
        // tags it will allow on a page
        if (typeof options.singleton === "undefined") options.singleton = isOldIE();
    
        // By default, add <style> tags to the bottom of <head>.
        if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
    
        var styles = listToStyles(list);
        addStylesToDom(styles, options);
    
        return function update(newList) {
            var mayRemove = [];
            for(var i = 0; i < styles.length; i++) {
                var item = styles[i];
                var domStyle = stylesInDom[item.id];
                domStyle.refs--;
                mayRemove.push(domStyle);
            }
            if(newList) {
                var newStyles = listToStyles(newList);
                addStylesToDom(newStyles, options);
            }
            for(var i = 0; i < mayRemove.length; i++) {
                var domStyle = mayRemove[i];
                if(domStyle.refs === 0) {
                    for(var j = 0; j < domStyle.parts.length; j++)
                        domStyle.parts[j]();
                    delete stylesInDom[domStyle.id];
                }
            }
        };
    }
    
    function addStylesToDom(styles, options) {
        for(var i = 0; i < styles.length; i++) {
            var item = styles[i];
            var domStyle = stylesInDom[item.id];
            if(domStyle) {
                domStyle.refs++;
                for(var j = 0; j < domStyle.parts.length; j++) {
                    domStyle.parts[j](item.parts[j]);
                }
                for(; j < item.parts.length; j++) {
                    domStyle.parts.push(addStyle(item.parts[j], options));
                }
            } else {
                var parts = [];
                for(var j = 0; j < item.parts.length; j++) {
                    parts.push(addStyle(item.parts[j], options));
                }
                stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
            }
        }
    }
    
    function listToStyles(list) {
        var styles = [];
        var newStyles = {};
        for(var i = 0; i < list.length; i++) {
            var item = list[i];
            var id = item[0];
            var css = item[1];
            var media = item[2];
            var sourceMap = item[3];
            var part = {css: css, media: media, sourceMap: sourceMap};
            if(!newStyles[id])
                styles.push(newStyles[id] = {id: id, parts: [part]});
            else
                newStyles[id].parts.push(part);
        }
        return styles;
    }
    
    function insertStyleElement(options, styleElement) {
        var head = getHeadElement();
        var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
        if (options.insertAt === "top") {
            if(!lastStyleElementInsertedAtTop) {
                head.insertBefore(styleElement, head.firstChild);
            } else if(lastStyleElementInsertedAtTop.nextSibling) {
                head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
            } else {
                head.appendChild(styleElement);
            }
            styleElementsInsertedAtTop.push(styleElement);
        } else if (options.insertAt === "bottom") {
            head.appendChild(styleElement);
        } else {
            throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
        }
    }
    
    function removeStyleElement(styleElement) {
        styleElement.parentNode.removeChild(styleElement);
        var idx = styleElementsInsertedAtTop.indexOf(styleElement);
        if(idx >= 0) {
            styleElementsInsertedAtTop.splice(idx, 1);
        }
    }
    
    function createStyleElement(options) {
        var styleElement = document.createElement("style");
        styleElement.type = "text/css";
        insertStyleElement(options, styleElement);
        return styleElement;
    }
    
    function createLinkElement(options) {
        var linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        insertStyleElement(options, linkElement);
        return linkElement;
    }
    
    function addStyle(obj, options) {
        var styleElement, update, remove;
    
        if (options.singleton) {
            var styleIndex = singletonCounter++;
            styleElement = singletonElement || (singletonElement = createStyleElement(options));
            update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
            remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
        } else if(obj.sourceMap &&
            typeof URL === "function" &&
            typeof URL.createObjectURL === "function" &&
            typeof URL.revokeObjectURL === "function" &&
            typeof Blob === "function" &&
            typeof btoa === "function") {
            styleElement = createLinkElement(options);
            update = updateLink.bind(null, styleElement);
            remove = function() {
                removeStyleElement(styleElement);
                if(styleElement.href)
                    URL.revokeObjectURL(styleElement.href);
            };
        } else {
            styleElement = createStyleElement(options);
            update = applyToTag.bind(null, styleElement);
            remove = function() {
                removeStyleElement(styleElement);
            };
        }
    
        update(obj);
    
        return function updateStyle(newObj) {
            if(newObj) {
                if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
                    return;
                update(obj = newObj);
            } else {
                remove();
            }
        };
    }
    
    var replaceText = (function () {
        var textStore = [];
    
        return function (index, replacement) {
            textStore[index] = replacement;
            return textStore.filter(Boolean).join('\n');
        };
    })();
    
    function applyToSingletonTag(styleElement, index, remove, obj) {
        var css = remove ? "" : obj.css;
    
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = replaceText(index, css);
        } else {
            var cssNode = document.createTextNode(css);
            var childNodes = styleElement.childNodes;
            if (childNodes[index]) styleElement.removeChild(childNodes[index]);
            if (childNodes.length) {
                styleElement.insertBefore(cssNode, childNodes[index]);
            } else {
                styleElement.appendChild(cssNode);
            }
        }
    }
    
    function applyToTag(styleElement, obj) {
        var css = obj.css;
        var media = obj.media;
    
        if(media) {
            styleElement.setAttribute("media", media)
        }
    
        if(styleElement.styleSheet) {
            styleElement.styleSheet.cssText = css;
        } else {
            while(styleElement.firstChild) {
                styleElement.removeChild(styleElement.firstChild);
            }
            styleElement.appendChild(document.createTextNode(css));
        }
    }
    
    function updateLink(linkElement, obj) {
        var css = obj.css;
        var sourceMap = obj.sourceMap;
    
        if(sourceMap) {
            // http://stackoverflow.com/a/26603875
            css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
        }
    
        var blob = new Blob([css], { type: "text/css" });
    
        var oldSrc = linkElement.href;
    
        linkElement.href = URL.createObjectURL(blob);
    
        if(oldSrc)
            URL.revokeObjectURL(oldSrc);
    }


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    
    var _modals = __webpack_require__(9);
    
    var _modals2 = _interopRequireDefault(_modals);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    __webpack_require__(25);
    var hasConfirm = false;
    
    var shopModal = {
    
      confirm: function confirm(options, callbackId) {
        var sender = this.sender;
        var cancelTitle = options.cancelTitle || '取消';
        var okTitle = options.okTitle || '确定';
        var message = options.message || '标题';
    
        if (!hasConfirm) {
          var $appendContainer = document.body;
          var dialogAlertTitle = '<div class="joy-ui-dialog-alert-title">' + message + '</div>';
          var dialogAlertBtn = '<div class="joy-ui-dialog-alert-btn-group">';
          dialogAlertBtn += '<div class="joy-ui-dialog-alert-btn j_Joy-ui-dialog-alert-btn-' + 0 + '">' + cancelTitle + '</div>';
          dialogAlertBtn += '<div class="joy-ui-dialog-alert-btn j_Joy-ui-dialog-alert-btn-' + 1 + '">' + okTitle + '</div>';
          dialogAlertBtn += '</div>';
          var alertDom = '<div class="joy-ui-dialog-alert j_Joy-ui-dialog-alert"><div class="joy-ui-dialog-alert-window">' + dialogAlertTitle + dialogAlertBtn + '</div></div>';
          var div = document.createElement('div');
          div.innerHTML = alertDom;
          $appendContainer.appendChild(div);
    
          hasConfirm = true;
        }
    
        var $okBtn = document.querySelector('.j_Joy-ui-dialog-alert-btn-1');
        var $cancelBtn = document.querySelector('.j_Joy-ui-dialog-alert-btn-0');
        var $confirmDialog = document.querySelector('.j_Joy-ui-dialog-alert');
    
        $confirmDialog.style.display = "block";
    
        var okFn = function okFn() {
          $confirmDialog.style.display = "none";
          $okBtn.removeEventListener('click', okFn, false);
          $cancelBtn.removeEventListener('click', cancelFn, false);
          sender.performCallback(callbackId);
        };
        var cancelFn = function cancelFn() {
          $confirmDialog.style.display = "none";
          $okBtn.removeEventListener('click', okFn, false);
          $cancelBtn.removeEventListener('click', cancelFn, false);
        };
    
        $okBtn.addEventListener("click", okFn, false);
    
        $cancelBtn.addEventListener("click", cancelFn, false);
      },
    
      toast: function toast(options) {
        _modals2.default.toast(options.message, options.duration);
      }
    
    };
    
    exports.default = shopModal;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';
    
    var Alert = __webpack_require__(10);
    var Confirm = __webpack_require__(16);
    var Prompt = __webpack_require__(19);
    var _toast = __webpack_require__(22);
    
    var modal = {
    
      toast: function toast(msg, duration) {
        _toast.push(msg, duration);
      },
    
      alert: function alert(config) {
        new Alert(config).show();
      },
    
      prompt: function prompt(config) {
        new Prompt(config).show();
      },
    
      confirm: function confirm(config) {
        new Confirm(config).show();
      }
    
    };
    
    !window.lib && (window.lib = {});
    window.lib.modal = modal;
    
    module.exports = modal;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';
    
    var Modal = __webpack_require__(11);
    __webpack_require__(14);
    
    var CONTENT_CLASS = 'content';
    var MSG_CLASS = 'content-msg';
    var BUTTON_GROUP_CLASS = 'btn-group';
    var BUTTON_CLASS = 'btn';
    
    function Alert(config) {
      this.msg = config.message || '';
      this.callback = config.callback;
      this.okTitle = config.okTitle || 'OK';
      Modal.call(this);
      this.node.classList.add('amfe-alert');
    }
    
    Alert.prototype = Object.create(Modal.prototype);
    
    Alert.prototype.createNodeContent = function () {
      var content = document.createElement('div');
      content.classList.add(CONTENT_CLASS);
      this.node.appendChild(content);
    
      var msg = document.createElement('div');
      msg.classList.add(MSG_CLASS);
      msg.appendChild(document.createTextNode(this.msg));
      content.appendChild(msg);
    
      var buttonGroup = document.createElement('div');
      buttonGroup.classList.add(BUTTON_GROUP_CLASS);
      this.node.appendChild(buttonGroup);
      var button = document.createElement('div');
      button.classList.add(BUTTON_CLASS, 'alert-ok');
      button.appendChild(document.createTextNode(this.okTitle));
      buttonGroup.appendChild(button);
    };
    
    Alert.prototype.bindEvents = function () {
      Modal.prototype.bindEvents.call(this);
      var button = this.node.querySelector('.' + BUTTON_CLASS);
      button.addEventListener('click', function () {
        this.destroy();
        this.callback && this.callback();
      }.bind(this));
    };
    
    module.exports = Alert;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';
    
    __webpack_require__(12);
    
    // there will be only one instance of modal.
    var MODAL_WRAP_CLASS = 'amfe-modal-wrap';
    var MODAL_NODE_CLASS = 'amfe-modal-node';
    
    function Modal() {
      this.wrap = document.querySelector(MODAL_WRAP_CLASS);
      this.node = document.querySelector(MODAL_NODE_CLASS);
      if (!this.wrap) {
        this.createWrap();
      }
      if (!this.node) {
        this.createNode();
      }
      this.clearNode();
      this.createNodeContent();
      this.bindEvents();
    }
    
    Modal.prototype = {
    
      show: function show() {
        this.wrap.style.display = 'block';
        this.node.classList.remove('hide');
      },
    
      destroy: function destroy() {
        document.body.removeChild(this.wrap);
        document.body.removeChild(this.node);
        this.wrap = null;
        this.node = null;
      },
    
      createWrap: function createWrap() {
        this.wrap = document.createElement('div');
        this.wrap.className = MODAL_WRAP_CLASS;
        document.body.appendChild(this.wrap);
      },
    
      createNode: function createNode() {
        this.node = document.createElement('div');
        this.node.classList.add(MODAL_NODE_CLASS, 'hide');
        document.body.appendChild(this.node);
      },
    
      clearNode: function clearNode() {
        this.node.innerHTML = '';
      },
    
      createNodeContent: function createNodeContent() {
    
        // do nothing.
        // child classes can override this method.
      },
    
      bindEvents: function bindEvents() {
        this.wrap.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
        });
      }
    };
    
    module.exports = Modal;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = __webpack_require__(13);
    if(typeof content === 'string') content = [[module.id, content, '']];
    // add the styles to the DOM
    var update = __webpack_require__(7)(content, {});
    if(content.locals) module.exports = content.locals;
    // Hot Module Replacement
    if(false) {
        // When the styles change, update the <style> tags
        if(!content.locals) {
            module.hot.accept("!!./../../css-loader/index.js!./modal.css", function() {
                var newContent = require("!!./../../css-loader/index.js!./modal.css");
                if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
                update(newContent);
            });
        }
        // When the module is disposed, remove the <style> tags
        module.hot.dispose(function() { update(); });
    }

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

    exports = module.exports = __webpack_require__(6)();
    // imports
    
    
    // module
    exports.push([module.id, ".amfe-modal-wrap {\n  display: none;\n  position: fixed;\n  z-index: 999999999;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  opacity: 0.5;\n}\n\n.amfe-modal-node {\n  position: fixed;\n  z-index: 9999999999;\n  top: 50%;\n  left: 50%;\n  width: 6.666667rem;\n  min-height: 2.666667rem;\n  border-radius: 0.066667rem;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  background-color: #fff;\n}\n.amfe-modal-node.hide {\n  display: none;\n}\n.amfe-modal-node .content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  width: 100%;\n  min-height: 1.866667rem;\n  box-sizing: border-box;\n  font-size: 0.32rem;\n  line-height: 0.426667rem;\n  padding: 0.213333rem;\n  border-bottom: 1px solid #ddd;\n}\n.amfe-modal-node .btn-group {\n  width: 100%;\n  height: 0.8rem;\n  font-size: 0.373333rem;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  border: none;\n}\n.amfe-modal-node .btn-group .btn {\n  box-sizing: border-box;\n  height: 0.8rem;\n  line-height: 0.8rem;\n  margin: 0;\n  padding: 0;\n  border: none;\n  background: none;\n}\n", ""]);
    
    // exports


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = __webpack_require__(15);
    if(typeof content === 'string') content = [[module.id, content, '']];
    // add the styles to the DOM
    var update = __webpack_require__(7)(content, {});
    if(content.locals) module.exports = content.locals;
    // Hot Module Replacement
    if(false) {
        // When the styles change, update the <style> tags
        if(!content.locals) {
            module.hot.accept("!!./../../css-loader/index.js!./alert.css", function() {
                var newContent = require("!!./../../css-loader/index.js!./alert.css");
                if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
                update(newContent);
            });
        }
        // When the module is disposed, remove the <style> tags
        module.hot.dispose(function() { update(); });
    }

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

    exports = module.exports = __webpack_require__(6)();
    // imports
    
    
    // module
    exports.push([module.id, ".amfe-alert .amfe-alert-ok {\n  width: 100%;\n}\n", ""]);
    
    // exports


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';
    
    var Modal = __webpack_require__(11);
    __webpack_require__(17);
    
    var CONTENT_CLASS = 'content';
    var MSG_CLASS = 'content-msg';
    var BUTTON_GROUP_CLASS = 'btn-group';
    var BUTTON_CLASS = 'btn';
    
    function Confirm(config) {
      this.msg = config.message || '';
      this.callback = config.callback;
      this.okTitle = config.okTitle || 'OK';
      this.cancelTitle = config.cancelTitle || 'Cancel';
      Modal.call(this);
      this.node.classList.add('amfe-confirm');
    }
    
    Confirm.prototype = Object.create(Modal.prototype);
    
    Confirm.prototype.createNodeContent = function () {
      var content = document.createElement('div');
      content.classList.add(CONTENT_CLASS);
      this.node.appendChild(content);
    
      var msg = document.createElement('div');
      msg.classList.add(MSG_CLASS);
      msg.appendChild(document.createTextNode(this.msg));
      content.appendChild(msg);
    
      var buttonGroup = document.createElement('div');
      buttonGroup.classList.add(BUTTON_GROUP_CLASS);
      this.node.appendChild(buttonGroup);
      var btnOk = document.createElement('div');
      btnOk.appendChild(document.createTextNode(this.okTitle));
      btnOk.classList.add('btn-ok', BUTTON_CLASS);
      var btnCancel = document.createElement('div');
      btnCancel.appendChild(document.createTextNode(this.cancelTitle));
      btnCancel.classList.add('btn-cancel', BUTTON_CLASS);
      buttonGroup.appendChild(btnOk);
      buttonGroup.appendChild(btnCancel);
      this.node.appendChild(buttonGroup);
    };
    
    Confirm.prototype.bindEvents = function () {
      Modal.prototype.bindEvents.call(this);
      var btnOk = this.node.querySelector('.' + BUTTON_CLASS + '.btn-ok');
      var btnCancel = this.node.querySelector('.' + BUTTON_CLASS + '.btn-cancel');
      btnOk.addEventListener('click', function () {
        this.destroy();
        this.callback && this.callback(this.okTitle);
      }.bind(this));
      btnCancel.addEventListener('click', function () {
        this.destroy();
        this.callback && this.callback(this.cancelTitle);
      }.bind(this));
    };
    
    module.exports = Confirm;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = __webpack_require__(18);
    if(typeof content === 'string') content = [[module.id, content, '']];
    // add the styles to the DOM
    var update = __webpack_require__(7)(content, {});
    if(content.locals) module.exports = content.locals;
    // Hot Module Replacement
    if(false) {
        // When the styles change, update the <style> tags
        if(!content.locals) {
            module.hot.accept("!!./../../css-loader/index.js!./confirm.css", function() {
                var newContent = require("!!./../../css-loader/index.js!./confirm.css");
                if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
                update(newContent);
            });
        }
        // When the module is disposed, remove the <style> tags
        module.hot.dispose(function() { update(); });
    }

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

    exports = module.exports = __webpack_require__(6)();
    // imports
    
    
    // module
    exports.push([module.id, ".amfe-confirm .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n.amfe-confirm .btn-group .btn.btn-ok {\n  border-right: 1px solid #ddd;\n}\n", ""]);
    
    // exports


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';
    
    var Modal = __webpack_require__(11);
    __webpack_require__(20);
    
    var CONTENT_CLASS = 'content';
    var MSG_CLASS = 'content-msg';
    var BUTTON_GROUP_CLASS = 'btn-group';
    var BUTTON_CLASS = 'btn';
    var INPUT_WRAP_CLASS = 'input-wrap';
    var INPUT_CLASS = 'input';
    
    function Prompt(config) {
      this.msg = config.message || '';
      this.defaultMsg = config.default || '';
      this.callback = config.callback;
      this.okTitle = config.okTitle || 'OK';
      this.cancelTitle = config.cancelTitle || 'Cancel';
      Modal.call(this);
      this.node.classList.add('amfe-prompt');
    }
    
    Prompt.prototype = Object.create(Modal.prototype);
    
    Prompt.prototype.createNodeContent = function () {
    
      var content = document.createElement('div');
      content.classList.add(CONTENT_CLASS);
      this.node.appendChild(content);
    
      var msg = document.createElement('div');
      msg.classList.add(MSG_CLASS);
      msg.appendChild(document.createTextNode(this.msg));
      content.appendChild(msg);
    
      var inputWrap = document.createElement('div');
      inputWrap.classList.add(INPUT_WRAP_CLASS);
      content.appendChild(inputWrap);
      var input = document.createElement('input');
      input.classList.add(INPUT_CLASS);
      input.type = 'text';
      input.autofocus = true;
      input.placeholder = this.defaultMsg;
      inputWrap.appendChild(input);
    
      var buttonGroup = document.createElement('div');
      buttonGroup.classList.add(BUTTON_GROUP_CLASS);
      var btnOk = document.createElement('div');
      btnOk.appendChild(document.createTextNode(this.okTitle));
      btnOk.classList.add('btn-ok', BUTTON_CLASS);
      var btnCancel = document.createElement('div');
      btnCancel.appendChild(document.createTextNode(this.cancelTitle));
      btnCancel.classList.add('btn-cancel', BUTTON_CLASS);
      buttonGroup.appendChild(btnOk);
      buttonGroup.appendChild(btnCancel);
      this.node.appendChild(buttonGroup);
    };
    
    Prompt.prototype.bindEvents = function () {
      Modal.prototype.bindEvents.call(this);
      var btnOk = this.node.querySelector('.' + BUTTON_CLASS + '.btn-ok');
      var btnCancel = this.node.querySelector('.' + BUTTON_CLASS + '.btn-cancel');
      var that = this;
      btnOk.addEventListener('click', function () {
        var val = document.querySelector('input').value;
        this.destroy();
        this.callback && this.callback({
          result: that.okTitle,
          data: val
        });
      }.bind(this));
      btnCancel.addEventListener('click', function () {
        var val = document.querySelector('input').value;
        this.destroy();
        this.callback && this.callback({
          result: that.cancelTitle,
          data: val
        });
      }.bind(this));
    };
    
    module.exports = Prompt;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = __webpack_require__(21);
    if(typeof content === 'string') content = [[module.id, content, '']];
    // add the styles to the DOM
    var update = __webpack_require__(7)(content, {});
    if(content.locals) module.exports = content.locals;
    // Hot Module Replacement
    if(false) {
        // When the styles change, update the <style> tags
        if(!content.locals) {
            module.hot.accept("!!./../../css-loader/index.js!./prompt.css", function() {
                var newContent = require("!!./../../css-loader/index.js!./prompt.css");
                if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
                update(newContent);
            });
        }
        // When the module is disposed, remove the <style> tags
        module.hot.dispose(function() { update(); });
    }

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

    exports = module.exports = __webpack_require__(6)();
    // imports
    
    
    // module
    exports.push([module.id, ".amfe-prompt .input-wrap {\n  box-sizing: border-box;\n  width: 100%;\n  margin-top: 0.133333rem;\n  // padding: 0.24rem 0.213333rem 0.213333rem;\n  height: 0.96rem;\n}\n.amfe-prompt .input-wrap .input {\n  box-sizing: border-box;\n  width: 100%;\n  height: 0.56rem;\n  line-height: 0.56rem;\n  font-size: 0.32rem;\n  border: 1px solid #999;\n}\n.amfe-prompt .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n.amfe-prompt .btn-group .btn.btn-ok {\n  border-right: 1px solid #ddd;\n}\n", ""]);
    
    // exports


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';
    
    __webpack_require__(23);
    
    var queue = [];
    var timer;
    var isProcessing = false;
    var toastWin;
    var TOAST_WIN_CLASS_NAME = 'amfe-toast';
    
    var DEFAULT_DURATION = 0.8;
    var TRANSITION_TIME = 0.4;
    
    function showToastWindow(msg, callback) {
      var handleTransitionEnd = function handleTransitionEnd() {
        toastWin.removeEventListener('transitionend', handleTransitionEnd);
        toastWin.removeEventListener('webkitTransitionEnd', handleTransitionEnd);
        callback && callback();
      };
      if (!toastWin) {
        toastWin = document.createElement('div');
        toastWin.classList.add(TOAST_WIN_CLASS_NAME, 'hide');
        document.body.appendChild(toastWin);
      }
      toastWin.innerHTML = msg;
      toastWin.addEventListener('transitionend', handleTransitionEnd);
      toastWin.addEventListener('webkitTransitionEnd', handleTransitionEnd);
      setTimeout(function () {
        toastWin.classList.remove('hide');
      }, 0);
      setTimeout(function () {
        callback && callback();
      }, TRANSITION_TIME * 1000);
    }
    
    function hideToastWindow(callback) {
      var handleTransitionEnd = function handleTransitionEnd() {
        toastWin.removeEventListener('transitionend', handleTransitionEnd);
        toastWin.removeEventListener('webkitTransitionEnd', handleTransitionEnd);
        callback && callback();
      };
      if (!toastWin) {
        return;
      }
      toastWin.addEventListener('transitionend', handleTransitionEnd);
      toastWin.addEventListener('webkitTransitionEnd', handleTransitionEnd);
      toastWin.classList.add('hide');
      setTimeout(function () {
        callback && callback();
      }, TRANSITION_TIME * 1000);
    }
    
    var toast = {
    
      push: function push(msg, duration) {
        queue.push({
          msg: msg,
          duration: duration || DEFAULT_DURATION
        });
        this.show();
      },
    
      show: function show() {
        var that = this;
    
        // All messages had been toasted already, so remove the toast window,
        if (!queue.length) {
          toastWin && toastWin.parentNode.removeChild(toastWin);
          toastWin = null;
          return;
        }
    
        // the previous toast is not ended yet.
        if (isProcessing) {
          return;
        }
        isProcessing = true;
    
        var toastInfo = queue.shift();
        showToastWindow(toastInfo.msg, function () {
          timer = setTimeout(function () {
            timer = null;
            hideToastWindow(function () {
              isProcessing = false;
              that.show();
            });
          }, toastInfo.duration * 1000);
        });
      }
    
    };
    
    module.exports = {
      push: toast.push.bind(toast)
    };

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = __webpack_require__(24);
    if(typeof content === 'string') content = [[module.id, content, '']];
    // add the styles to the DOM
    var update = __webpack_require__(7)(content, {});
    if(content.locals) module.exports = content.locals;
    // Hot Module Replacement
    if(false) {
        // When the styles change, update the <style> tags
        if(!content.locals) {
            module.hot.accept("!!./../../css-loader/index.js!./toast.css", function() {
                var newContent = require("!!./../../css-loader/index.js!./toast.css");
                if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
                update(newContent);
            });
        }
        // When the module is disposed, remove the <style> tags
        module.hot.dispose(function() { update(); });
    }

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

    exports = module.exports = __webpack_require__(6)();
    // imports
    
    
    // module
    exports.push([module.id, ".amfe-toast {\n  font-size: 0.32rem;\n  line-height: 0.426667rem;\n  position: fixed;\n  box-sizing: border-box;\n  max-width: 80%;\n  bottom: 2.666667rem;\n  left: 50%;\n  padding: 0.213333rem;\n  background-color: #000;\n  color: #fff;\n  text-align: center;\n  opacity: 0.6;\n  transition: all 0.4s ease-in-out;\n  border-radius: 0.066667rem;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n}\n\n.amfe-toast.hide {\n  opacity: 0;\n}\n", ""]);
    
    // exports


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = __webpack_require__(26);
    if(typeof content === 'string') content = [[module.id, content, '']];
    // add the styles to the DOM
    var update = __webpack_require__(7)(content, {});
    if(content.locals) module.exports = content.locals;
    // Hot Module Replacement
    if(false) {
        // When the styles change, update the <style> tags
        if(!content.locals) {
            module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/less-loader/index.js!./style.less", function() {
                var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/postcss-loader/index.js!./../../../node_modules/less-loader/index.js!./style.less");
                if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
                update(newContent);
            });
        }
        // When the module is disposed, remove the <style> tags
        module.hot.dispose(function() { update(); });
    }

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

    exports = module.exports = __webpack_require__(6)();
    // imports
    
    
    // module
    exports.push([module.id, ".joy-ui-dialog-pop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 99999999;\n  opacity: 0;\n}\n.joy-ui-dialog-pop .joy-ui-dialog-pop-window {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  width: 6.8rem;\n  min-height: 3.73333333rem;\n  -webkit-transform: translateX(-3.4rem) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  padding: 0.53333333rem 0.4rem 0.4rem;\n  background-color: #fff;\n}\n.joy-ui-dialog-pop .joy-ui-dialog-pop-window .joy-ui-dialog-pop-close-btn {\n  position: absolute;\n  top: 0.13333333rem;\n  right: 0.13333333rem;\n  width: 0.56rem;\n  height: 0.56rem;\n  background: url('//cdn1.showjoy.com/images/59/5954b558bd5e4d8fa5c40756099bc1f6.png') center no-repeat;\n  background-size: 0.56rem 0.56rem;\n}\n.joy-ui-dialog-pop .joy-ui-dialog-pop-window .joy-ui-dialog-pop-title {\n  margin-bottom: 0.26666667rem;\n  font: normal 0.42666667rem/0.53333333rem 'PingFang-SC-Regular';\n  color: #000;\n  text-align: center;\n}\n.joy-ui-dialog-pop .joy-ui-dialog-pop-window .joy-ui-dialog-pop-message {\n  font: normal 0.42666667rem/0.64rem 'PingFang-SC-Regular';\n  color: #9e9e9e;\n}\n.joy-ui-dialog-confirm {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 99999999;\n}\n.joy-ui-dialog-confirm .joy-ui-dialog-confirm-window {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  width: 6.8rem;\n  -webkit-transform: translateX(-3.4rem) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  padding: 0.4rem 0.4rem 1.73333333rem;\n  font: normal 0.42666667rem/0.53333333rem 'PingFang-SC-Regular';\n  text-align: center;\n  background-color: #fff;\n}\n.joy-ui-dialog-confirm .joy-ui-dialog-confirm-window .joy-ui-dialog-confirm-icon {\n  font: normal 0.66666667rem/0.66666667rem 'iconfont';\n  margin-bottom: 0.13333333rem;\n  color: #f93450;\n}\n.joy-ui-dialog-confirm .joy-ui-dialog-confirm-window .joy-ui-dialog-confirm-title {\n  color: #393836;\n}\n.joy-ui-dialog-confirm .joy-ui-dialog-confirm-window .joy-ui-dialog-confirm-subtitle {\n  margin-top: 0.24rem;\n  color: #9e9e9e;\n}\n.joy-ui-dialog-confirm .joy-ui-dialog-confirm-window .joy-ui-dialog-confirm-btn {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 1.33333333rem;\n  background-color: #f93450;\n  font: normal 0.42666667rem/1.33333333rem 'PingFang-SC-Regular';\n  color: #fff;\n}\n.joy-ui-dialog-confirm.hide {\n  display: none;\n}\n.joy-ui-dialog-toast {\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  z-index: 99999999;\n  margin-left: -3.2rem;\n  margin-top: -1.333334rem;\n  width: 6.4rem;\n  padding: 0.266666rem;\n  opacity: 0;\n  border-radius: 0.186666rem;\n  background-color: rgba(0, 0, 0, 0.7);\n  box-shadow: 0.266666rem 0.266666rem 0.266666rem -0.266666rem rgba(0, 0, 0, 0.7);\n  text-align: center;\n  font-size: 0.346666rem;\n  line-height: 1.4;\n  color: #fff;\n}\n.joy-ui-dialog-wxshare {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 10000;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.4);\n  opacity: 0;\n}\n.joy-ui-dialog-wxshare .joy-ui-dialog-wxshare-icon {\n  position: absolute;\n  top: 0;\n  right: 0.13333333rem;\n  width: 1.14666667rem;\n  height: 1.14666667rem;\n  background: url('//cdn1.showjoy.com/images/8b/8bccc512b0fb479a8c0c36afafcad4c1.png') center no-repeat;\n  background-size: 1.14666667rem 1.14666667rem;\n}\n.joy-ui-dialog-wxshare .joy-ui-dialog-wxshare-text {\n  position: absolute;\n  top: 1.33333333rem;\n  right: 0.4rem;\n  width: 4rem;\n  height: 0.96rem;\n  font: normal 0.37333333rem/0.48rem 'PingFang-SC-Regular';\n  color: #fff;\n  text-align: center;\n}\n.joy-ui-dialog-alert {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 99999999;\n}\n.joy-ui-dialog-alert .joy-ui-dialog-alert-window {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  width: 6.8rem;\n  -webkit-transform: translateX(-3.4rem) translateY(-50%);\n  transform: translateX(-50%) translateY(-50%);\n  padding: 0.8rem 0.4rem 2.13333333rem;\n  font: normal 0.42666667rem/0.53333333rem 'PingFang-SC-Regular';\n  text-align: center;\n  background-color: #fff;\n}\n.joy-ui-dialog-alert .joy-ui-dialog-alert-window .joy-ui-dialog-alert-title {\n  color: #393836;\n  font-size: 36px;\n  text-align: center;\n}\n.joy-ui-dialog-alert .joy-ui-dialog-alert-window .joy-ui-dialog-alert-btn-group {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 1.33333333rem;\n  font: normal 0.42666667rem/1.33333333rem 'PingFang-SC-Regular';\n  color: #fff;\n}\n.joy-ui-dialog-alert .joy-ui-dialog-alert-window .joy-ui-dialog-alert-btn-group:after,\n.joy-ui-dialog-alert .joy-ui-dialog-alert-window .joy-ui-dialog-alert-btn-group:before {\n  display: table;\n  content: \"\";\n}\n.joy-ui-dialog-alert .joy-ui-dialog-alert-window .joy-ui-dialog-alert-btn-group:after {\n  clear: both;\n}\n.joy-ui-dialog-alert .joy-ui-dialog-alert-window .joy-ui-dialog-alert-btn-group .joy-ui-dialog-alert-btn {\n  float: left;\n  width: 50%;\n  height: 100%;\n  color: #fff;\n  font-size: 32px;\n  line-height: 100px;\n  text-align: center;\n}\n.joy-ui-dialog-alert .joy-ui-dialog-alert-window .joy-ui-dialog-alert-btn-group .joy-ui-dialog-alert-btn:nth-child(1) {\n  background-color: #000;\n}\n.joy-ui-dialog-alert .joy-ui-dialog-alert-window .joy-ui-dialog-alert-btn-group .joy-ui-dialog-alert-btn:nth-child(2) {\n  background-color: #f93450;\n}\n.joy-ui-dialog-select {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.4);\n  z-index: 99999999;\n}\n.joy-ui-dialog-select .joy-ui-dialog-select-window {\n  position: absolute;\n  width: 100%;\n  padding: 0 0.533333rem;\n  max-height: 5.94rem;\n  left: 0;\n  bottom: 0;\n  background-color: #fefefe;\n  overflow-y: scroll;\n  -webkit-overflow-scrolling: touch;\n  animation: 'joy-ui-sliderup-animate' 0.6s ease normal both;\n  -webkit-animation: 'joy-ui-sliderup-animate' 0.6s ease normal both;\n}\n.joy-ui-dialog-select .joy-ui-dialog-select-window .joy-ui-dialog-select-item {\n  height: 1.32rem;\n  line-height: 1.32rem;\n  text-align: center;\n  border-bottom: 1px solid #ddd;\n}\n.joy-ui-dialog-show {\n  animation: 'joy-ui-dialog-show-animate' 0.7s ease 1 normal both;\n  -webkit-animation: 'joy-ui-dialog-show-animate' 0.7s ease 1 normal both;\n}\n.joy-ui-dialog-hide {\n  animation: 'joy-ui-dialog-hide-animate' 0.7s ease 1 normal both;\n  -webkit-animation: 'joy-ui-dialog-hide-animate' 0.7s ease 1 normal both;\n}\n@-webkit-keyframes joy-ui-sliderup-animate {\n  0% {\n    -webkit-transform: translateY(100%);\n  }\n  100% {\n    -webkit-transform: translateY(0);\n  }\n}\n@keyframes joy-ui-sliderup-animate {\n  0% {\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%);\n  }\n  100% {\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n}\n@-webkit-keyframes joy-ui-dialog-show-animate {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes joy-ui-dialog-show-animate {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes joy-ui-dialog-hide-animate {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes joy-ui-dialog-hide-animate {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n", ""]);
    
    // exports


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {'use strict';var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};console.log('START WEEX VUE RENDER: 0.10.4, Build 2017-03-23 17:15.');(function(global,factory){( false?'undefined':_typeof(exports))==='object'&&typeof module!=='undefined'?module.exports=factory(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):global.WeexVueRender=factory();})(undefined,function(){'use strict';function __$styleInject(css,returnValue){if(typeof document==='undefined'){return returnValue;}css=css||'';var head=document.head||document.getElementsByTagName('head')[0];var style=document.createElement('style');style.type='text/css';if(style.styleSheet){style.styleSheet.cssText=css;}else{style.appendChild(document.createTextNode(css));}head.appendChild(style);return returnValue;}__$styleInject(".weex-root,\n.weex-root * {\n  color: initial;\n  cursor: initial;\n  direction: initial;\n  font: initial;\n  font-family: initial;\n  font-size: initial;\n  font-style: initial;\n  font-variant: initial;\n  font-weight: initial;\n  line-height: initial;\n  text-align: initial;\n  text-indent: initial;\n  visibility: initial;\n  white-space: initial;\n  word-spacing: initial;\n  font-family: BlinkMacSystemFont, 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n}\n\n.weex-root,\n.weex-root *,\n.weex-root *::before,\n.weex-root *::after {\n  box-sizing: border-box;\n  -webkit-text-size-adjust: none;\n      -ms-text-size-adjust: none;\n          text-size-adjust: none;\n}\n\n.weex-root a,\n.weex-root button,\n.weex-root [role=\"button\"],\n.weex-root input,\n.weex-root label,\n.weex-root select,\n.weex-root textarea {\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n}\n\n.weex-root p,\n.weex-root ol,\n.weex-root ul,\n.weex-root dl {\n  margin: 0;\n  padding: 0;\n}\n\n.weex-root li {\n  list-style: none;\n}\n\n.weex-root figure {\n  margin: 0;\n}\n\n.weex-root textarea {\n  resize: none;\n}\n",undefined);__$styleInject(".weex-root * {\n  border-width: 0;\n  border-color: inherit;\n  border-style: solid;\n}\n\n.weex-ct {\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  position: relative;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -webkit-flex-grow: 0;\n  -ms-flex-grow: 0;\n  flex-grow: 0;\n  -webkit-flex-basis: auto;\n  flex-basis: auto;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n  -ms-flex-align: stretch;\n  align-items: stretch;\n  -webkit-align-content: flex-start;\n  -ms-flex-line-pack: start;\n  align-content: flex-start;\n  border: 0 solid black;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\n\n.weex-ct.horizontal {\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n}\n\n.weex-el {\n  display: block;\n  box-sizing: border-box;\n  position: relative;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -webkit-flex-grow: 0;\n  -ms-flex-grow: 0;\n  flex-grow: 0;\n  -webkit-flex-basis: auto;\n  flex-basis: auto;\n  border: 0 solid black;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\n\n.weex-a {\n  text-decoration: none;\n}\n\nbody > .weex-div {\n  min-height: 100%;\n}\n\n.weex-input, .weex-textarea {\n  font-size: 0.426667rem;\n}\n.weex-input:focus, .weex-textarea:focus {\n  outline: none;\n}\n\n.weex-image, .weex-img {\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n}\n\n.weex-toast {\n  font-size: 0.426667rem;\n  line-height: 0.426667rem;\n  position: fixed;\n  z-index: 1999999999;\n  box-sizing: border-box;\n  max-width: 80%;\n  bottom: 50%;\n  left: 50%;\n  padding: 0.213333rem;\n  background-color: #000;\n  color: #fff;\n  text-align: center;\n  opacity: 0.6;\n  -webkit-transition: all 0.4s ease-in-out;\n          transition: all 0.4s ease-in-out;\n  border-radius: 0.066667rem;\n  -webkit-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n      transform: translateX(-50%);\n}\n\n.weex-toast.hide {\n  opacity: 0;\n}\n\n.weex-alert .weex-alert-ok {\n  width: 100%;\n}\n\n.weex-confirm .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n\n.weex-confirm .btn-group .btn.btn-ok {\n  border-right: 0.013333rem solid #ddd;\n}\n\n.weex-modal-wrap {\n  display: none;\n  position: fixed;\n  z-index: 999999999;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  opacity: 0.5;\n}\n\n.weex-modal-node {\n  position: fixed;\n  z-index: 9999999999;\n  top: 50%;\n  left: 50%;\n  width: 6.666667rem;\n  min-height: 2.666667rem;\n  border-radius: 0.066667rem;\n  -webkit-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n  background-color: #fff;\n}\n\n.weex-modal-node.hide {\n  display: none;\n}\n\n.weex-modal-node .content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n      align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  width: 100%;\n  min-height: 1.866667rem;\n  box-sizing: border-box;\n  font-size: 0.426667rem;\n  line-height: 0.426667rem;\n  padding: 0.213333rem;\n  border-bottom: 0.013333rem solid #ddd;\n}\n\n.weex-modal-node .btn-group {\n  width: 100%;\n  height: 0.8rem;\n  font-size: 0.373333rem;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  border: none;\n}\n\n.amfe-modal-node .btn-group .btn {\n  text-align: center;\n}\n\n.weex-modal-node .btn-group .btn {\n  box-sizing: border-box;\n  height: 0.8rem;\n  line-height: 0.8rem;\n  margin: 0;\n  padding: 0;\n  border: none;\n  background: none;\n  text-align: center;\n}\n\n.weex-prompt .input-wrap {\n  box-sizing: border-box;\n  width: 100%;\n  margin-top: 0.133333rem;\n  height: 0.96rem;\n}\n\n.weex-prompt .input-wrap .input {\n  box-sizing: border-box;\n  width: 100%;\n  height: 0.56rem;\n  line-height: 0.56rem;\n  font-size: 0.426667rem;\n  border: 0.013333rem solid #999;\n}\n\n.weex-prompt .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n\n.weex-prompt .btn-group .btn.btn-ok {\n  border-right: 0.013333rem solid #ddd;\n}\n\nbody > .weex-list,\nbody > .weex-scroller {\n  max-height: 100%;\n}\n\n.weex-list-wrapper,\n.weex-scroller-wrapper {\n  -webkit-overflow-scrolling: touch;\n}\n\n.weex-list-wrapper {\n  overflow-y: scroll !important;\n}\n\n.weex-list-inner,\n.weex-scroller-inner {\n  -webkit-overflow-scrolling: touch;\n  width: 100%;\n}\n\n.weex-scroller-inner::-webkit-scrollbar {\n    width: 0;\n}\n\n.weex-scroller-wrapper.weex-scroller-vertical {\n  overflow-y: scroll;\n}\n\n.weex-scroller-wrapper.weex-scroller-horizontal {\n  overflow-x: scroll;\n}\n\n.weex-scroller-horizontal .weex-scroller-inner {\n  -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-orient: horizontal;\n  height: 100%;\n}\n\n.iossticky {\n  position: -webkit-sticky !important;\n  position: sticky !important;\n  z-index: 9999;\n  top: 0;\n}\n\n.sticky {\n  position: fixed;\n  top: 0;\n  z-index: 9999;\n}\n\n.weex-cell {\n  width: 100%;\n}\n\n.weex-refresh,\n.weex-loading {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 100%;\n  overflow: hidden;\n}\n\n.weex-slider-wrapper {\n  overflow: hidden;\n}\n\n.weex-slider-inner {\n  position: absolute;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.weex-slider-cell {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  overflow: hidden;\n}\n\n.weex-indicator {\n  position: absolute;\n  -webkit-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n  margin: 0;\n  padding: 0;\n}\n\n.weex-indicator-item {\n  display: inline-block;\n  position: relative;\n  border-radius: 50%;\n  width: 0.266667rem;\n  height: 0.266667rem;\n  background-color: #BBBBBB;\n}\n.weex-indicator-item + .weex-indicator-item {\n  margin-left: 0.133333rem;\n}\n\n.weex-indicator-item-active {\n  background-color: blue;\n}\n\n.weex-refresh-indicator,\n.weex-loading-indicator {\n  width: 1.0rem;\n  height: 1.0rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  overflow: visible;\n  background: none;\n}\n.weex-refresh-indicator:before,\n.weex-loading-indicator:before {\n  display: block;\n  content: '';\n  font-size: 0.16rem;\n  width: 1em;\n  height: 1em;\n  left: -60%;\n  top: 40%;\n  border-radius: 50%;\n  position: relative;\n  text-indent: -9999em;\n  -webkit-animation: weex-spinner 1.1s infinite ease;\n          animation: weex-spinner 1.1s infinite ease;\n  -webkit-transform: translate3d(1.0rem, 0, 0);\n          transform: translate3d(1.0rem, 0, 0);\n}\n\n@-webkit-keyframes weex-spinner {\n  0%,\n  100% {\n    box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  12.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  62.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;\n  }\n}\n\n@keyframes weex-spinner {\n  0%,\n  100% {\n    box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  12.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  62.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;\n  }\n}\n.weex-switch {\n  border: 0.013333rem solid #dfdfdf;\n  cursor: pointer;\n  display: inline-block;\n  position: relative;\n  vertical-align: middle;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  box-sizing: content-box;\n  background-clip: content-box;\n  color: #64bd63;\n  width: 1.333333rem;\n  height: 0.8rem;\n  background-color: white;\n  border-color: #dfdfdf;\n  box-shadow: #dfdfdf 0 0 0 0 inset;\n  border-radius: 0.8rem;\n  -webkit-transition: border 0.4s, box-shadow 0.4s, background-color 1.2s;\n          transition: border 0.4s, box-shadow 0.4s, background-color 1.2s;\n}\n\n.weex-switch-checked {\n  background-color: #64bd63;\n  border-color: #64bd63;\n  box-shadow: #64bd63 0 0 0 0.533333rem inset;\n}\n\n.weex-switch-checked.weex-switch-disabled {\n  background-color: #A0CCA0;\n  box-shadow: #A0CCA0 0 0 0 0.533333rem inset;\n}\n\n.weex-switch-disabled {\n  background-color: #EEEEEE;\n}\n\n.weex-switch-inner {\n  width: 0.8rem;\n  height: 0.8rem;\n  background: #fff;\n  border-radius: 100%;\n  box-shadow: 0 0.013333rem 0.04rem rgba(0, 0, 0, 0.4);\n  position: absolute;\n  top: 0;\n  left: 0;\n  -webkit-transition: background-color 0.4s, left 0.2s;\n          transition: background-color 0.4s, left 0.2s;\n}\n\n.weex-switch-checked > .weex-switch-inner {\n  left: 0.533333rem;\n}\n\n.weex-text {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  position: relative;\n  white-space: pre-wrap;  /* not using 'pre': support auto line feed. */\n  font-size: 0.426667rem;\n  word-wrap: break-word;\n  overflow: hidden; /* it'll be clipped if the height is not high enough. */\n}\n\n.weex-web {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  border: none;\n  box-sizing: border-box;\n}\n",undefined);/* eslint-disable */var isInitialized=false;// major events supported:
    //   panstart
    //   panmove
    //   panend
    //   swipe
    //   longpress
    // extra events supported:
    //   dualtouchstart
    //   dualtouch
    //   dualtouchend
    //   tap
    //   doubletap
    //   pressend
    var doc=window.document;var docEl=doc.documentElement;var slice=Array.prototype.slice;var gestures={};var lastTap=null;/**
     * find the closest common ancestor
     * if there's no one, return null
     *
     * @param  {Element} el1 first element
     * @param  {Element} el2 second element
     * @return {Element}     common ancestor
     */function getCommonAncestor(el1,el2){var el=el1;while(el){if(el.contains(el2)||el==el2){return el;}el=el.parentNode;}return null;}/**
     * fire a HTMLEvent
     *
     * @param  {Element} element which element to fire a event on
     * @param  {string}  type    type of event
     * @param  {object}  extra   extra data for the event object
     */function fireEvent(element,type,extra){var event=doc.createEvent('HTMLEvents');event.initEvent(type,true,true);if((typeof extra==='undefined'?'undefined':_typeof(extra))==='object'){for(var p in extra){event[p]=extra[p];}}element.dispatchEvent(event);}/**
     * calc the transform
     * assume 4 points ABCD on the coordinate system
     * > rotate：angle rotating from AB to CD
     * > scale：scale ratio from AB to CD
     * > translate：translate shift from A to C
     *
     * @param  {number} x1 abscissa of A
     * @param  {number} y1 ordinate of A
     * @param  {number} x2 abscissa of B
     * @param  {number} y2 ordinate of B
     * @param  {number} x3 abscissa of C
     * @param  {number} y3 ordinate of C
     * @param  {number} x4 abscissa of D
     * @param  {number} y4 ordinate of D
     * @return {object}    transform object like
     *   {rotate, scale, translate[2], matrix[3][3]}
     */function calc(x1,y1,x2,y2,x3,y3,x4,y4){var rotate=Math.atan2(y4-y3,x4-x3)-Math.atan2(y2-y1,x2-x1);var scale=Math.sqrt((Math.pow(y4-y3,2)+Math.pow(x4-x3,2))/(Math.pow(y2-y1,2)+Math.pow(x2-x1,2)));var translate=[x3-scale*x1*Math.cos(rotate)+scale*y1*Math.sin(rotate),y3-scale*y1*Math.cos(rotate)-scale*x1*Math.sin(rotate)];return{rotate:rotate,scale:scale,translate:translate,matrix:[[scale*Math.cos(rotate),-scale*Math.sin(rotate),translate[0]],[scale*Math.sin(rotate),scale*Math.cos(rotate),translate[1]],[0,0,1]]};}/**
     * take over the touchstart events. Add new touches to the gestures.
     * If there is no previous records, then bind touchmove, tochend
     * and touchcancel events.
     * new touches initialized with state 'tapping', and within 500 milliseconds
     * if the state is still tapping, then trigger gesture 'press'.
     * If there are two touche points, then the 'dualtouchstart' is triggerd. The
     * node of the touch gesture is their cloest common ancestor.
     *
     * @event
     * @param  {event} event
     */function touchstartHandler(event){if(Object.keys(gestures).length===0){docEl.addEventListener('touchmove',touchmoveHandler,false);docEl.addEventListener('touchend',touchendHandler,false);docEl.addEventListener('touchcancel',touchcancelHandler,false);}// record every touch
    for(var i=0;i<event.changedTouches.length;i++){var touch=event.changedTouches[i];var touchRecord={};for(var p in touch){touchRecord[p]=touch[p];}var gesture={startTouch:touchRecord,startTime:Date.now(),status:'tapping',element:event.srcElement||event.target,pressingHandler:setTimeout(function(element,touch){return function(){if(gesture.status==='tapping'){gesture.status='pressing';fireEvent(element,'longpress',{// add touch data for weex
    touch:touch,touches:event.touches,changedTouches:event.changedTouches,touchEvent:event});}clearTimeout(gesture.pressingHandler);gesture.pressingHandler=null;};}(event.srcElement||event.target,event.changedTouches[i]),500)};gestures[touch.identifier]=gesture;}if(Object.keys(gestures).length==2){var elements=[];for(var p in gestures){elements.push(gestures[p].element);}fireEvent(getCommonAncestor(elements[0],elements[1]),'dualtouchstart',{touches:slice.call(event.touches),touchEvent:event});}}/**
     * take over touchmove events, and handle pan and dual related gestures.
     *
     * 1. traverse every touch point：
     * > if 'tapping' and the shift is over 10 pixles, then it's a 'panning'.
     * 2. if there are two touch points, then calc the tranform and trigger
     *   'dualtouch'.
     *
     * @event
     * @param  {event} event
     */function touchmoveHandler(event){for(var i=0;i<event.changedTouches.length;i++){var touch=event.changedTouches[i];var gesture=gestures[touch.identifier];if(!gesture){return;}if(!gesture.lastTouch){gesture.lastTouch=gesture.startTouch;}if(!gesture.lastTime){gesture.lastTime=gesture.startTime;}if(!gesture.velocityX){gesture.velocityX=0;}if(!gesture.velocityY){gesture.velocityY=0;}if(!gesture.duration){gesture.duration=0;}var time=Date.now()-gesture.lastTime;var vx=(touch.clientX-gesture.lastTouch.clientX)/time;var vy=(touch.clientY-gesture.lastTouch.clientY)/time;var RECORD_DURATION=70;if(time>RECORD_DURATION){time=RECORD_DURATION;}if(gesture.duration+time>RECORD_DURATION){gesture.duration=RECORD_DURATION-time;}gesture.velocityX=(gesture.velocityX*gesture.duration+vx*time)/(gesture.duration+time);gesture.velocityY=(gesture.velocityY*gesture.duration+vy*time)/(gesture.duration+time);gesture.duration+=time;gesture.lastTouch={};for(var p in touch){gesture.lastTouch[p]=touch[p];}gesture.lastTime=Date.now();var displacementX=touch.clientX-gesture.startTouch.clientX;var displacementY=touch.clientY-gesture.startTouch.clientY;var distance=Math.sqrt(Math.pow(displacementX,2)+Math.pow(displacementY,2));var isVertical=!(Math.abs(displacementX)>Math.abs(displacementY));var direction=isVertical?displacementY>=0?'down':'up':displacementX>=0?'right':'left';// magic number 10: moving 10px means pan, not tap
    if((gesture.status==='tapping'||gesture.status==='pressing')&&distance>10){gesture.status='panning';gesture.isVertical=isVertical;gesture.direction=direction;fireEvent(gesture.element,'panstart',{touch:touch,touches:event.touches,changedTouches:event.changedTouches,touchEvent:event,isVertical:gesture.isVertical,direction:direction});}if(gesture.status==='panning'){gesture.panTime=Date.now();fireEvent(gesture.element,'panmove',{displacementX:displacementX,displacementY:displacementY,touch:touch,touches:event.touches,changedTouches:event.changedTouches,touchEvent:event,isVertical:gesture.isVertical,direction:direction});}}if(Object.keys(gestures).length==2){var position=[];var current=[];var elements=[];var transform;for(var i=0;i<event.touches.length;i++){var touch=event.touches[i];var gesture=gestures[touch.identifier];position.push([gesture.startTouch.clientX,gesture.startTouch.clientY]);current.push([touch.clientX,touch.clientY]);}for(var p in gestures){elements.push(gestures[p].element);}transform=calc(position[0][0],position[0][1],position[1][0],position[1][1],current[0][0],current[0][1],current[1][0],current[1][1]);fireEvent(getCommonAncestor(elements[0],elements[1]),'dualtouch',{transform:transform,touches:event.touches,touchEvent:event});}}/**
     * handle touchend event
     *
     * 1. if there are tow touch points, then trigger 'dualtouchend'如
     *
     * 2. traverse every touch piont：
     * > if tapping, then trigger 'tap'.
     * If there is a tap 300 milliseconds before, then it's a 'doubletap'.
     * > if padding, then decide to trigger 'panend' or 'swipe'
     * > if pressing, then trigger 'pressend'.
     *
     * 3. remove listeners.
     *
     * @event
     * @param  {event} event
     */function touchendHandler(event){if(Object.keys(gestures).length==2){var elements=[];for(var p in gestures){elements.push(gestures[p].element);}fireEvent(getCommonAncestor(elements[0],elements[1]),'dualtouchend',{touches:slice.call(event.touches),touchEvent:event});}for(var i=0;i<event.changedTouches.length;i++){var touch=event.changedTouches[i];var id=touch.identifier;var gesture=gestures[id];if(!gesture){continue;}if(gesture.pressingHandler){clearTimeout(gesture.pressingHandler);gesture.pressingHandler=null;}if(gesture.status==='tapping'){gesture.timestamp=Date.now();fireEvent(gesture.element,'tap',{touch:touch,touchEvent:event});if(lastTap&&gesture.timestamp-lastTap.timestamp<300){fireEvent(gesture.element,'doubletap',{touch:touch,touchEvent:event});}lastTap=gesture;}if(gesture.status==='panning'){var now=Date.now();var duration=now-gesture.startTime;var displacementX=touch.clientX-gesture.startTouch.clientX;var displacementY=touch.clientY-gesture.startTouch.clientY;var velocity=Math.sqrt(gesture.velocityY*gesture.velocityY+gesture.velocityX*gesture.velocityX);var isSwipe=velocity>0.5&&now-gesture.lastTime<100;var extra={duration:duration,isSwipe:isSwipe,velocityX:gesture.velocityX,velocityY:gesture.velocityY,displacementX:displacementX,displacementY:displacementY,touch:touch,touches:event.touches,changedTouches:event.changedTouches,touchEvent:event,isVertical:gesture.isVertical,direction:gesture.direction};fireEvent(gesture.element,'panend',extra);if(isSwipe){fireEvent(gesture.element,'swipe',extra);}}if(gesture.status==='pressing'){fireEvent(gesture.element,'pressend',{touch:touch,touchEvent:event});}delete gestures[id];}if(Object.keys(gestures).length===0){docEl.removeEventListener('touchmove',touchmoveHandler,false);docEl.removeEventListener('touchend',touchendHandler,false);docEl.removeEventListener('touchcancel',touchcancelHandler,false);}}/**
     * handle touchcancel
     *
     * 1. if there are two touch points, then trigger 'dualtouchend'
     *
     * 2. traverse everty touch point:
     * > if pannnig, then trigger 'panend'
     * > if pressing, then trigger 'pressend'
     *
     * 3. remove listeners
     *
     * @event
     * @param  {event} event
     */function touchcancelHandler(event){if(Object.keys(gestures).length==2){var elements=[];for(var p in gestures){elements.push(gestures[p].element);}fireEvent(getCommonAncestor(elements[0],elements[1]),'dualtouchend',{touches:slice.call(event.touches),touchEvent:event});}for(var i=0;i<event.changedTouches.length;i++){var touch=event.changedTouches[i];var id=touch.identifier;var gesture=gestures[id];if(!gesture){continue;}if(gesture.pressingHandler){clearTimeout(gesture.pressingHandler);gesture.pressingHandler=null;}if(gesture.status==='panning'){fireEvent(gesture.element,'panend',{touch:touch,touches:event.touches,changedTouches:event.changedTouches,touchEvent:event});}if(gesture.status==='pressing'){fireEvent(gesture.element,'pressend',{touch:touch,touchEvent:event});}delete gestures[id];}if(Object.keys(gestures).length===0){docEl.removeEventListener('touchmove',touchmoveHandler,false);docEl.removeEventListener('touchend',touchendHandler,false);docEl.removeEventListener('touchcancel',touchcancelHandler,false);}}if(!isInitialized){docEl.addEventListener('touchstart',touchstartHandler,false);isInitialized=true;}/* eslint-disable */// Production steps of ECMA-262, Edition 6, 22.1.2.1
    // Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
    /* istanbul ignore if */if(!Array.from){Array.from=function(){var toStr=Object.prototype.toString;var isCallable=function isCallable(fn){return typeof fn==='function'||toStr.call(fn)==='[object Function]';};var toInteger=function toInteger(value){var number=Number(value);if(isNaN(number)){return 0;}if(number===0||!isFinite(number)){return number;}return(number>0?1:-1)*Math.floor(Math.abs(number));};var maxSafeInteger=Math.pow(2,53)-1;var toLength=function toLength(value){var len=toInteger(value);return Math.min(Math.max(len,0),maxSafeInteger);};// The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */){// 1. Let C be the this value.
    var C=this;// 2. Let items be ToObject(arrayLike).
    var items=Object(arrayLike);// 3. ReturnIfAbrupt(items).
    if(arrayLike==null){throw new TypeError('Array.from requires an array-like object - not null or undefined');}// 4. If mapfn is undefined, then let mapping be false.
    var mapFn=arguments.length>1?arguments[1]:void undefined;var T;if(typeof mapFn!=='undefined'){// 5. else
    // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
    if(!isCallable(mapFn)){throw new TypeError('Array.from: when provided, the second argument must be a function');}// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if(arguments.length>2){T=arguments[2];}}// 10. Let lenValue be Get(items, "length").
    // 11. Let len be ToLength(lenValue).
    var len=toLength(items.length);// 13. If IsConstructor(C) is true, then
    // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
    // 14. a. Else, Let A be ArrayCreate(len).
    var A=isCallable(C)?Object(new C(len)):new Array(len);// 16. Let k be 0.
    var k=0;// 17. Repeat, while k < len… (also steps a - h)
    var kValue;while(k<len){kValue=items[k];if(mapFn){A[k]=typeof T==='undefined'?mapFn(kValue,k):mapFn.call(T,kValue,k);}else{A[k]=kValue;}k+=1;}// 18. Let putStatus be Put(A, "length", len, true).
    A.length=len;// 20. Return A.
    return A;};}();}function createCommonjsModule(fn,module){return module={exports:{}},fn(module,module.exports),module.exports;}var _global=createCommonjsModule(function(module){// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global=module.exports=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();if(typeof __g=='number'){__g=global;}// eslint-disable-line no-undef
    });var _core=createCommonjsModule(function(module){var core=module.exports={version:'2.4.0'};if(typeof __e=='number'){__e=core;}// eslint-disable-line no-undef
    });var _isObject=function _isObject(it){return(typeof it==='undefined'?'undefined':_typeof(it))==='object'?it!==null:typeof it==='function';};var isObject=_isObject;var _anObject=function _anObject(it){if(!isObject(it)){throw TypeError(it+' is not an object!');}return it;};var _fails=function _fails(exec){try{return!!exec();}catch(e){return true;}};// Thank's IE8 for his funny defineProperty
    var _descriptors=!_fails(function(){return Object.defineProperty({},'a',{get:function get(){return 7;}}).a!=7;});var isObject$1=_isObject;var document$1=_global.document;var is=isObject$1(document$1)&&isObject$1(document$1.createElement);var _domCreate=function _domCreate(it){return is?document$1.createElement(it):{};};var _ie8DomDefine=!_descriptors&&!_fails(function(){return Object.defineProperty(_domCreate('div'),'a',{get:function get(){return 7;}}).a!=7;});// 7.1.1 ToPrimitive(input [, PreferredType])
    var isObject$2=_isObject;// instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string
    var _toPrimitive=function _toPrimitive(it,S){if(!isObject$2(it)){return it;}var fn,val;if(S&&typeof(fn=it.toString)=='function'&&!isObject$2(val=fn.call(it))){return val;}if(typeof(fn=it.valueOf)=='function'&&!isObject$2(val=fn.call(it))){return val;}if(!S&&typeof(fn=it.toString)=='function'&&!isObject$2(val=fn.call(it))){return val;}throw TypeError("Can't convert object to primitive value");};var anObject=_anObject;var IE8_DOM_DEFINE=_ie8DomDefine;var toPrimitive=_toPrimitive;var dP$1=Object.defineProperty;var f$1=_descriptors?Object.defineProperty:function defineProperty(O,P,Attributes){anObject(O);P=toPrimitive(P,true);anObject(Attributes);if(IE8_DOM_DEFINE){try{return dP$1(O,P,Attributes);}catch(e){/* empty */}}if('get'in Attributes||'set'in Attributes){throw TypeError('Accessors not supported!');}if('value'in Attributes){O[P]=Attributes.value;}return O;};var _objectDp={f:f$1};var _propertyDesc=function _propertyDesc(bitmap,value){return{enumerable:!(bitmap&1),configurable:!(bitmap&2),writable:!(bitmap&4),value:value};};var dP=_objectDp;var createDesc=_propertyDesc;var _hide=_descriptors?function(object,key,value){return dP.f(object,key,createDesc(1,value));}:function(object,key,value){object[key]=value;return object;};var hasOwnProperty={}.hasOwnProperty;var _has=function _has(it,key){return hasOwnProperty.call(it,key);};var id=0;var px=Math.random();var _uid=function _uid(key){return'Symbol('.concat(key===undefined?'':key,')_',(++id+px).toString(36));};var _redefine=createCommonjsModule(function(module){var global=_global,hide=_hide,has=_has,SRC=_uid('src'),TO_STRING='toString',$toString=Function[TO_STRING],TPL=(''+$toString).split(TO_STRING);_core.inspectSource=function(it){return $toString.call(it);};(module.exports=function(O,key,val,safe){var isFunction=typeof val=='function';if(isFunction){has(val,'name')||hide(val,'name',key);}if(O[key]===val){return;}if(isFunction){has(val,SRC)||hide(val,SRC,O[key]?''+O[key]:TPL.join(String(key)));}if(O===global){O[key]=val;}else{if(!safe){delete O[key];hide(O,key,val);}else{if(O[key]){O[key]=val;}else{hide(O,key,val);}}}// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype,TO_STRING,function toString(){return typeof this=='function'&&this[SRC]||$toString.call(this);});});var _aFunction=function _aFunction(it){if(typeof it!='function'){throw TypeError(it+' is not a function!');}return it;};// optional / simple context binding
    var aFunction=_aFunction;var _ctx=function _ctx(fn,that,length){aFunction(fn);if(that===undefined){return fn;}switch(length){case 1:return function(a){return fn.call(that,a);};case 2:return function(a,b){return fn.call(that,a,b);};case 3:return function(a,b,c){return fn.call(that,a,b,c);};}return function()/* ...args */{return fn.apply(that,arguments);};};var global$1=_global;var core=_core;var hide=_hide;var redefine=_redefine;var ctx=_ctx;var PROTOTYPE='prototype';var $export$1=function $export$1(type,name,source){var IS_FORCED=type&$export$1.F,IS_GLOBAL=type&$export$1.G,IS_STATIC=type&$export$1.S,IS_PROTO=type&$export$1.P,IS_BIND=type&$export$1.B,target=IS_GLOBAL?global$1:IS_STATIC?global$1[name]||(global$1[name]={}):(global$1[name]||{})[PROTOTYPE],exports=IS_GLOBAL?core:core[name]||(core[name]={}),expProto=exports[PROTOTYPE]||(exports[PROTOTYPE]={}),key,own,out,exp;if(IS_GLOBAL){source=name;}for(key in source){// contains in native
    own=!IS_FORCED&&target&&target[key]!==undefined;// export native or passed
    out=(own?target:source)[key];// bind timers to global for call from export context
    exp=IS_BIND&&own?ctx(out,global$1):IS_PROTO&&typeof out=='function'?ctx(Function.call,out):out;// extend global
    if(target){redefine(target,key,out,type&$export$1.U);}// export
    if(exports[key]!=out){hide(exports,key,exp);}if(IS_PROTO&&expProto[key]!=out){expProto[key]=out;}}};global$1.core=core;// type bitmap
    $export$1.F=1;// forced
    $export$1.G=2;// global
    $export$1.S=4;// static
    $export$1.P=8;// proto
    $export$1.B=16;// bind
    $export$1.W=32;// wrap
    $export$1.U=64;// safe
    $export$1.R=128;// real proto method for `library` 
    var _export=$export$1;var toString$1={}.toString;var _cof=function _cof(it){return toString$1.call(it).slice(8,-1);};// fallback for non-array-like ES3 and non-enumerable old V8 strings
    var cof=_cof;var _iobject=Object('z').propertyIsEnumerable(0)?Object:function(it){return cof(it)=='String'?it.split(''):Object(it);};// 7.2.1 RequireObjectCoercible(argument)
    var _defined=function _defined(it){if(it==undefined){throw TypeError("Can't call method on  "+it);}return it;};// to indexed object, toObject with fallback for non-array-like ES3 strings
    var IObject$1=_iobject;var defined=_defined;var _toIobject=function _toIobject(it){return IObject$1(defined(it));};// 7.1.4 ToInteger
    var ceil=Math.ceil;var floor=Math.floor;var _toInteger=function _toInteger(it){return isNaN(it=+it)?0:(it>0?floor:ceil)(it);};// 7.1.15 ToLength
    var toInteger=_toInteger;var min=Math.min;var _toLength=function _toLength(it){return it>0?min(toInteger(it),0x1fffffffffffff):0;// pow(2, 53) - 1 == 9007199254740991
    };var toInteger$1=_toInteger;var max=Math.max;var min$1=Math.min;var _toIndex=function _toIndex(index,length){index=toInteger$1(index);return index<0?max(index+length,0):min$1(index,length);};// false -> Array#indexOf
    // true  -> Array#includes
    var toIObject$1=_toIobject;var toLength=_toLength;var toIndex=_toIndex;var _arrayIncludes=function _arrayIncludes(IS_INCLUDES){return function($this,el,fromIndex){var O=toIObject$1($this),length=toLength(O.length),index=toIndex(fromIndex,length),value;// Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES&&el!=el){while(length>index){value=O[index++];if(value!=value){return true;}// Array#toIndex ignores holes, Array#includes - not
    }}else{for(;length>index;index++){if(IS_INCLUDES||index in O){if(O[index]===el){return IS_INCLUDES||index||0;}}}}return!IS_INCLUDES&&-1;};};var global$2=_global;var SHARED='__core-js_shared__';var store=global$2[SHARED]||(global$2[SHARED]={});var _shared=function _shared(key){return store[key]||(store[key]={});};var shared=_shared('keys');var uid=_uid;var _sharedKey=function _sharedKey(key){return shared[key]||(shared[key]=uid(key));};var has=_has;var toIObject=_toIobject;var arrayIndexOf=_arrayIncludes(false);var IE_PROTO=_sharedKey('IE_PROTO');var _objectKeysInternal=function _objectKeysInternal(object,names){var O=toIObject(object),i=0,result=[],key;for(key in O){if(key!=IE_PROTO){has(O,key)&&result.push(key);}}// Don't enum bug & hidden keys
    while(names.length>i){if(has(O,key=names[i++])){~arrayIndexOf(result,key)||result.push(key);}}return result;};// IE 8- don't enum bug keys
    var _enumBugKeys='constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');// 19.1.2.14 / 15.2.3.14 Object.keys(O)
    var $keys=_objectKeysInternal;var enumBugKeys=_enumBugKeys;var _objectKeys=Object.keys||function keys(O){return $keys(O,enumBugKeys);};var f$2=Object.getOwnPropertySymbols;var _objectGops={f:f$2};var f$3={}.propertyIsEnumerable;var _objectPie={f:f$3};// 7.1.13 ToObject(argument)
    var defined$1=_defined;var _toObject=function _toObject(it){return Object(defined$1(it));};// 19.1.2.1 Object.assign(target, source, ...)
    var getKeys=_objectKeys;var gOPS=_objectGops;var pIE=_objectPie;var toObject=_toObject;var IObject=_iobject;var $assign=Object.assign;// should work with symbols and should have deterministic property order (V8 bug)
    var _objectAssign=!$assign||_fails(function(){var A={},B={},S=Symbol(),K='abcdefghijklmnopqrst';A[S]=7;K.split('').forEach(function(k){B[k]=k;});return $assign({},A)[S]!=7||Object.keys($assign({},B)).join('')!=K;})?function assign(target,source){var arguments$1=arguments;// eslint-disable-line no-unused-vars
    var T=toObject(target),aLen=arguments.length,index=1,getSymbols=gOPS.f,isEnum=pIE.f;while(aLen>index){var S=IObject(arguments$1[index++]),keys=getSymbols?getKeys(S).concat(getSymbols(S)):getKeys(S),length=keys.length,j=0,key;while(length>j){if(isEnum.call(S,key=keys[j++])){T[key]=S[key];}}}return T;}:$assign;// 19.1.3.1 Object.assign(target, source)
    var $export=_export;$export($export.S+$export.F,'Object',{assign:_objectAssign});/* eslint-disable */// https://gist.github.com/WebReflection/5593554
    /* istanbul ignore if */if(!Object.setPrototypeOf){Object.setPrototypeOf=function(Object,magic){var set;function setPrototypeOf(O,proto){set.call(O,proto);return O;}try{// this works already in Firefox and Safari
    set=Object.getOwnPropertyDescriptor(Object.prototype,magic).set;set.call({},null);}catch(e){if(// IE < 11 cannot be shimmed
    Object.prototype!=={}[magic]||// neither can any browser that actually
    // implemented __proto__ correctly
    // (all but old V8 will return here)
    {__proto__:null}.__proto__===void 0// this case means null objects cannot be passed
    // through setPrototypeOf in a reliable way
    // which means here a **Sham** is needed instead
    ){return;}// nodejs 0.8 and 0.10 are (buggy and..) fine here
    // probably Chrome or some old Mobile stock browser
    set=function set(proto){this[magic]=proto;};// please note that this will **not** work
    // in those browsers that do not inherit
    // __proto__ by mistake from Object.prototype
    // in these cases we should probably throw an error
    // or at least be informed about the issue
    setPrototypeOf.polyfill=setPrototypeOf(setPrototypeOf({},null),Object.prototype)instanceof Object;// setPrototypeOf.polyfill === true means it works as meant
    // setPrototypeOf.polyfill === false means it's not 100% reliable
    // setPrototypeOf.polyfill === undefined
    // or
    // setPrototypeOf.polyfill ==  null means it's not a polyfill
    // which means it works as expected
    // we can even delete Object.prototype.__proto__;
    }return setPrototypeOf;}(Object,'__proto__');}var _wks=createCommonjsModule(function(module){var store=_shared('wks'),uid=_uid,_Symbol=_global.Symbol,USE_SYMBOL=typeof _Symbol=='function';var $exports=module.exports=function(name){return store[name]||(store[name]=USE_SYMBOL&&_Symbol[name]||(USE_SYMBOL?_Symbol:uid)('Symbol.'+name));};$exports.store=store;});// getting tag from 19.1.3.6 Object.prototype.toString()
    var cof$1=_cof;var TAG=_wks('toStringTag');var ARG=cof$1(function(){return arguments;}())=='Arguments';// fallback for IE11 Script Access Denied error
    var tryGet=function tryGet(it,key){try{return it[key];}catch(e){/* empty */}};var _classof=function _classof(it){var O,T,B;return it===undefined?'Undefined':it===null?'Null'// @@toStringTag case
    :typeof(T=tryGet(O=Object(it),TAG))=='string'?T// builtinTag case
    :ARG?cof$1(O)// ES3 arguments fallback
    :(B=cof$1(O))=='Object'&&typeof O.callee=='function'?'Arguments':B;};// 19.1.3.6 Object.prototype.toString()
    var classof=_classof;var test={};test[_wks('toStringTag')]='z';if(test+''!='[object z]'){_redefine(Object.prototype,'toString',function toString(){return'[object '+classof(this)+']';},true);}var toInteger$2=_toInteger;var defined$2=_defined;// true  -> String#at
    // false -> String#codePointAt
    var _stringAt=function _stringAt(TO_STRING){return function(that,pos){var s=String(defined$2(that)),i=toInteger$2(pos),l=s.length,a,b;if(i<0||i>=l){return TO_STRING?'':undefined;}a=s.charCodeAt(i);return a<0xd800||a>0xdbff||i+1===l||(b=s.charCodeAt(i+1))<0xdc00||b>0xdfff?TO_STRING?s.charAt(i):a:TO_STRING?s.slice(i,i+2):(a-0xd800<<10)+(b-0xdc00)+0x10000;};};var _library=false;var _iterators={};var dP$2=_objectDp;var anObject$2=_anObject;var getKeys$1=_objectKeys;var _objectDps=_descriptors?Object.defineProperties:function defineProperties(O,Properties){anObject$2(O);var keys=getKeys$1(Properties),length=keys.length,i=0,P;while(length>i){dP$2.f(O,P=keys[i++],Properties[P]);}return O;};var _html=_global.document&&document.documentElement;// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    var anObject$1=_anObject;var dPs=_objectDps;var enumBugKeys$1=_enumBugKeys;var IE_PROTO$1=_sharedKey('IE_PROTO');var Empty=function Empty(){/* empty */};var PROTOTYPE$1='prototype';// Create object with fake `null` prototype: use iframe Object with cleared prototype
    var _createDict=function createDict(){// Thrash, waste and sodomy: IE GC bug
    var iframe=_domCreate('iframe'),i=enumBugKeys$1.length,lt='<',gt='>',iframeDocument;iframe.style.display='none';_html.appendChild(iframe);iframe.src='javascript:';// eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument=iframe.contentWindow.document;iframeDocument.open();iframeDocument.write(lt+'script'+gt+'document.F=Object'+lt+'/script'+gt);iframeDocument.close();_createDict=iframeDocument.F;while(i--){delete _createDict[PROTOTYPE$1][enumBugKeys$1[i]];}return _createDict();};var _objectCreate=Object.create||function create(O,Properties){var result;if(O!==null){Empty[PROTOTYPE$1]=anObject$1(O);result=new Empty();Empty[PROTOTYPE$1]=null;// add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1]=O;}else{result=_createDict();}return Properties===undefined?result:dPs(result,Properties);};var def=_objectDp.f;var has$2=_has;var TAG$1=_wks('toStringTag');var _setToStringTag=function _setToStringTag(it,tag,stat){if(it&&!has$2(it=stat?it:it.prototype,TAG$1)){def(it,TAG$1,{configurable:true,value:tag});}};var create$1=_objectCreate;var descriptor=_propertyDesc;var setToStringTag$1=_setToStringTag;var IteratorPrototype={};// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
    _hide(IteratorPrototype,_wks('iterator'),function(){return this;});var _iterCreate=function _iterCreate(Constructor,NAME,next){Constructor.prototype=create$1(IteratorPrototype,{next:descriptor(1,next)});setToStringTag$1(Constructor,NAME+' Iterator');};// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
    var has$3=_has;var toObject$1=_toObject;var IE_PROTO$2=_sharedKey('IE_PROTO');var ObjectProto=Object.prototype;var _objectGpo=Object.getPrototypeOf||function(O){O=toObject$1(O);if(has$3(O,IE_PROTO$2)){return O[IE_PROTO$2];}if(typeof O.constructor=='function'&&O instanceof O.constructor){return O.constructor.prototype;}return O instanceof Object?ObjectProto:null;};var LIBRARY=_library;var $export$2=_export;var redefine$1=_redefine;var hide$1=_hide;var has$1=_has;var Iterators=_iterators;var $iterCreate=_iterCreate;var setToStringTag=_setToStringTag;var getPrototypeOf=_objectGpo;var ITERATOR=_wks('iterator');var BUGGY=!([].keys&&'next'in[].keys());var FF_ITERATOR='@@iterator';var KEYS='keys';var VALUES='values';var returnThis=function returnThis(){return this;};var _iterDefine=function _iterDefine(Base,NAME,Constructor,next,DEFAULT,IS_SET,FORCED){$iterCreate(Constructor,NAME,next);var getMethod=function getMethod(kind){if(!BUGGY&&kind in proto){return proto[kind];}switch(kind){case KEYS:return function keys(){return new Constructor(this,kind);};case VALUES:return function values(){return new Constructor(this,kind);};}return function entries(){return new Constructor(this,kind);};};var TAG=NAME+' Iterator',DEF_VALUES=DEFAULT==VALUES,VALUES_BUG=false,proto=Base.prototype,$native=proto[ITERATOR]||proto[FF_ITERATOR]||DEFAULT&&proto[DEFAULT],$default=$native||getMethod(DEFAULT),$entries=DEFAULT?!DEF_VALUES?$default:getMethod('entries'):undefined,$anyNative=NAME=='Array'?proto.entries||$native:$native,methods,key,IteratorPrototype;// Fix native
    if($anyNative){IteratorPrototype=getPrototypeOf($anyNative.call(new Base()));if(IteratorPrototype!==Object.prototype){// Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype,TAG,true);// fix for some old engines
    if(!LIBRARY&&!has$1(IteratorPrototype,ITERATOR)){hide$1(IteratorPrototype,ITERATOR,returnThis);}}}// fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES&&$native&&$native.name!==VALUES){VALUES_BUG=true;$default=function values(){return $native.call(this);};}// Define iterator
    if((!LIBRARY||FORCED)&&(BUGGY||VALUES_BUG||!proto[ITERATOR])){hide$1(proto,ITERATOR,$default);}// Plug for library
    Iterators[NAME]=$default;Iterators[TAG]=returnThis;if(DEFAULT){methods={values:DEF_VALUES?$default:getMethod(VALUES),keys:IS_SET?$default:getMethod(KEYS),entries:$entries};if(FORCED){for(key in methods){if(!(key in proto)){redefine$1(proto,key,methods[key]);}}}else{$export$2($export$2.P+$export$2.F*(BUGGY||VALUES_BUG),NAME,methods);}}return methods;};var $at=_stringAt(true);// 21.1.3.27 String.prototype[@@iterator]()
    _iterDefine(String,'String',function(iterated){this._t=String(iterated);// target
    this._i=0;// next index
    // 21.1.5.2.1 %StringIteratorPrototype%.next()
    },function(){var O=this._t,index=this._i,point;if(index>=O.length){return{value:undefined,done:true};}point=$at(O,index);this._i+=point.length;return{value:point,done:false};});// 22.1.3.31 Array.prototype[@@unscopables]
    var UNSCOPABLES=_wks('unscopables');var ArrayProto=Array.prototype;if(ArrayProto[UNSCOPABLES]==undefined){_hide(ArrayProto,UNSCOPABLES,{});}var _addToUnscopables=function _addToUnscopables(key){ArrayProto[UNSCOPABLES][key]=true;};var _iterStep=function _iterStep(done,value){return{value:value,done:!!done};};var addToUnscopables=_addToUnscopables;var step=_iterStep;var Iterators$2=_iterators;var toIObject$2=_toIobject;// 22.1.3.4 Array.prototype.entries()
    // 22.1.3.13 Array.prototype.keys()
    // 22.1.3.29 Array.prototype.values()
    // 22.1.3.30 Array.prototype[@@iterator]()
    var es6_array_iterator=_iterDefine(Array,'Array',function(iterated,kind){this._t=toIObject$2(iterated);// target
    this._i=0;// next index
    this._k=kind;// kind
    // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    },function(){var O=this._t,kind=this._k,index=this._i++;if(!O||index>=O.length){this._t=undefined;return step(1);}if(kind=='keys'){return step(0,index);}if(kind=='values'){return step(0,O[index]);}return step(0,[index,O[index]]);},'values');// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
    Iterators$2.Arguments=Iterators$2.Array;addToUnscopables('keys');addToUnscopables('values');addToUnscopables('entries');var $iterators=es6_array_iterator;var redefine$2=_redefine;var global$3=_global;var hide$2=_hide;var Iterators$1=_iterators;var wks=_wks;var ITERATOR$1=wks('iterator');var TO_STRING_TAG=wks('toStringTag');var ArrayValues=Iterators$1.Array;for(var collections=['NodeList','DOMTokenList','MediaList','StyleSheetList','CSSRuleList'],i=0;i<5;i++){var NAME=collections[i],Collection=global$3[NAME],proto=Collection&&Collection.prototype,key;if(proto){if(!proto[ITERATOR$1]){hide$2(proto,ITERATOR$1,ArrayValues);}if(!proto[TO_STRING_TAG]){hide$2(proto,TO_STRING_TAG,NAME);}Iterators$1[NAME]=ArrayValues;for(key in $iterators){if(!proto[key]){redefine$2(proto,key,$iterators[key],true);}}}}var _anInstance=function _anInstance(it,Constructor,name,forbiddenField){if(!(it instanceof Constructor)||forbiddenField!==undefined&&forbiddenField in it){throw TypeError(name+': incorrect invocation!');}return it;};// call something on iterator step with safe closing on error
    var anObject$3=_anObject;var _iterCall=function _iterCall(iterator,fn,value,entries){try{return entries?fn(anObject$3(value)[0],value[1]):fn(value);// 7.4.6 IteratorClose(iterator, completion)
    }catch(e){var ret=iterator['return'];if(ret!==undefined){anObject$3(ret.call(iterator));}throw e;}};// check on default Array iterator
    var Iterators$3=_iterators;var ITERATOR$2=_wks('iterator');var ArrayProto$1=Array.prototype;var _isArrayIter=function _isArrayIter(it){return it!==undefined&&(Iterators$3.Array===it||ArrayProto$1[ITERATOR$2]===it);};var classof$2=_classof;var ITERATOR$3=_wks('iterator');var Iterators$4=_iterators;var core_getIteratorMethod=_core.getIteratorMethod=function(it){if(it!=undefined){return it[ITERATOR$3]||it['@@iterator']||Iterators$4[classof$2(it)];}};var _forOf=createCommonjsModule(function(module){var ctx=_ctx,call=_iterCall,isArrayIter=_isArrayIter,anObject=_anObject,toLength=_toLength,getIterFn=core_getIteratorMethod,BREAK={},RETURN={};var exports=module.exports=function(iterable,entries,fn,that,ITERATOR){var iterFn=ITERATOR?function(){return iterable;}:getIterFn(iterable),f=ctx(fn,that,entries?2:1),index=0,length,step,iterator,result;if(typeof iterFn!='function'){throw TypeError(iterable+' is not iterable!');}// fast case for arrays with default iterator
    if(isArrayIter(iterFn)){for(length=toLength(iterable.length);length>index;index++){result=entries?f(anObject(step=iterable[index])[0],step[1]):f(iterable[index]);if(result===BREAK||result===RETURN){return result;}}}else{for(iterator=iterFn.call(iterable);!(step=iterator.next()).done;){result=call(iterator,f,step.value,entries);if(result===BREAK||result===RETURN){return result;}}}};exports.BREAK=BREAK;exports.RETURN=RETURN;});// 7.3.20 SpeciesConstructor(O, defaultConstructor)
    var anObject$4=_anObject;var aFunction$2=_aFunction;var SPECIES=_wks('species');var _speciesConstructor=function _speciesConstructor(O,D){var C=anObject$4(O).constructor,S;return C===undefined||(S=anObject$4(C)[SPECIES])==undefined?D:aFunction$2(S);};// fast apply, http://jsperf.lnkit.com/fast-apply/5
    var _invoke=function _invoke(fn,args,that){var un=that===undefined;switch(args.length){case 0:return un?fn():fn.call(that);case 1:return un?fn(args[0]):fn.call(that,args[0]);case 2:return un?fn(args[0],args[1]):fn.call(that,args[0],args[1]);case 3:return un?fn(args[0],args[1],args[2]):fn.call(that,args[0],args[1],args[2]);case 4:return un?fn(args[0],args[1],args[2],args[3]):fn.call(that,args[0],args[1],args[2],args[3]);}return fn.apply(that,args);};var ctx$2=_ctx;var invoke=_invoke;var html=_html;var cel=_domCreate;var global$5=_global;var process$1=global$5.process;var setTask=global$5.setImmediate;var clearTask=global$5.clearImmediate;var MessageChannel=global$5.MessageChannel;var counter=0;var queue={};var ONREADYSTATECHANGE='onreadystatechange';var defer;var channel;var port;var run=function run(){var id=+this;if(queue.hasOwnProperty(id)){var fn=queue[id];delete queue[id];fn();}};var listener=function listener(event){run.call(event.data);};// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    if(!setTask||!clearTask){setTask=function setImmediate(fn){var arguments$1=arguments;var args=[],i=1;while(arguments.length>i){args.push(arguments$1[i++]);}queue[++counter]=function(){invoke(typeof fn=='function'?fn:Function(fn),args);};defer(counter);return counter;};clearTask=function clearImmediate(id){delete queue[id];};// Node.js 0.8-
    if(_cof(process$1)=='process'){defer=function defer(id){process$1.nextTick(ctx$2(run,id,1));};// Browsers with MessageChannel, includes WebWorkers
    }else if(MessageChannel){channel=new MessageChannel();port=channel.port2;channel.port1.onmessage=listener;defer=ctx$2(port.postMessage,port,1);// Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    }else if(global$5.addEventListener&&typeof postMessage=='function'&&!global$5.importScripts){defer=function defer(id){global$5.postMessage(id+'','*');};global$5.addEventListener('message',listener,false);// IE8-
    }else if(ONREADYSTATECHANGE in cel('script')){defer=function defer(id){html.appendChild(cel('script'))[ONREADYSTATECHANGE]=function(){html.removeChild(this);run.call(id);};};// Rest old browsers
    }else{defer=function defer(id){setTimeout(ctx$2(run,id,1),0);};}}var _task={set:setTask,clear:clearTask};var global$6=_global;var macrotask=_task.set;var Observer=global$6.MutationObserver||global$6.WebKitMutationObserver;var process$2=global$6.process;var Promise$1=global$6.Promise;var isNode$1=_cof(process$2)=='process';var _microtask=function _microtask(){var head,last,notify;var flush=function flush(){var parent,fn;if(isNode$1&&(parent=process$2.domain)){parent.exit();}while(head){fn=head.fn;head=head.next;try{fn();}catch(e){if(head){notify();}else{last=undefined;}throw e;}}last=undefined;if(parent){parent.enter();}};// Node.js
    if(isNode$1){notify=function notify(){process$2.nextTick(flush);};// browsers with MutationObserver
    }else if(Observer){var toggle=true,node=document.createTextNode('');new Observer(flush).observe(node,{characterData:true});// eslint-disable-line no-new
    notify=function notify(){node.data=toggle=!toggle;};// environments with maybe non-completely correct, but existent Promise
    }else if(Promise$1&&Promise$1.resolve){var promise=Promise$1.resolve();notify=function notify(){promise.then(flush);};// for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
    }else{notify=function notify(){// strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global$6,flush);};}return function(fn){var task={fn:fn,next:undefined};if(last){last.next=task;}if(!head){head=task;notify();}last=task;};};var redefine$3=_redefine;var _redefineAll=function _redefineAll(target,src,safe){for(var key in src){redefine$3(target,key,src[key],safe);}return target;};var global$7=_global;var dP$3=_objectDp;var DESCRIPTORS=_descriptors;var SPECIES$1=_wks('species');var _setSpecies=function _setSpecies(KEY){var C=global$7[KEY];if(DESCRIPTORS&&C&&!C[SPECIES$1]){dP$3.f(C,SPECIES$1,{configurable:true,get:function get(){return this;}});}};var ITERATOR$4=_wks('iterator');var SAFE_CLOSING=false;try{var riter=[7][ITERATOR$4]();riter['return']=function(){SAFE_CLOSING=true;};Array.from(riter,function(){throw 2;});}catch(e){/* empty */}var _iterDetect=function _iterDetect(exec,skipClosing){if(!skipClosing&&!SAFE_CLOSING){return false;}var safe=false;try{var arr=[7],iter=arr[ITERATOR$4]();iter.next=function(){return{done:safe=true};};arr[ITERATOR$4]=function(){return iter;};exec(arr);}catch(e){/* empty */}return safe;};var LIBRARY$1=_library;var global$4=_global;var ctx$1=_ctx;var classof$1=_classof;var $export$3=_export;var isObject$3=_isObject;var aFunction$1=_aFunction;var anInstance=_anInstance;var forOf=_forOf;var speciesConstructor=_speciesConstructor;var task=_task.set;var microtask=_microtask();var PROMISE='Promise';var TypeError$1=global$4.TypeError;var process=global$4.process;var $Promise=global$4[PROMISE];var process=global$4.process;var isNode=classof$1(process)=='process';var empty=function empty(){/* empty */};var Internal;var GenericPromiseCapability;var Wrapper;var USE_NATIVE=!!function(){try{// correct subclassing with @@species support
    var promise=$Promise.resolve(1),FakePromise=(promise.constructor={})[_wks('species')]=function(exec){exec(empty,empty);};// unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return(isNode||typeof PromiseRejectionEvent=='function')&&promise.then(empty)instanceof FakePromise;}catch(e){/* empty */}}();// helpers
    var sameConstructor=function sameConstructor(a,b){// with library wrapper special case
    return a===b||a===$Promise&&b===Wrapper;};var isThenable=function isThenable(it){var then;return isObject$3(it)&&typeof(then=it.then)=='function'?then:false;};var newPromiseCapability=function newPromiseCapability(C){return sameConstructor($Promise,C)?new PromiseCapability(C):new GenericPromiseCapability(C);};var PromiseCapability=GenericPromiseCapability=function GenericPromiseCapability(C){var resolve,reject;this.promise=new C(function($$resolve,$$reject){if(resolve!==undefined||reject!==undefined){throw TypeError$1('Bad Promise constructor');}resolve=$$resolve;reject=$$reject;});this.resolve=aFunction$1(resolve);this.reject=aFunction$1(reject);};var perform=function perform(exec){try{exec();}catch(e){return{error:e};}};var notify=function notify(promise,isReject){if(promise._n){return;}promise._n=true;var chain=promise._c;microtask(function(){var value=promise._v,ok=promise._s==1,i=0;var run=function run(reaction){var handler=ok?reaction.ok:reaction.fail,resolve=reaction.resolve,reject=reaction.reject,domain=reaction.domain,result,then;try{if(handler){if(!ok){if(promise._h==2){onHandleUnhandled(promise);}promise._h=1;}if(handler===true){result=value;}else{if(domain){domain.enter();}result=handler(value);if(domain){domain.exit();}}if(result===reaction.promise){reject(TypeError$1('Promise-chain cycle'));}else if(then=isThenable(result)){then.call(result,resolve,reject);}else{resolve(result);}}else{reject(value);}}catch(e){reject(e);}};while(chain.length>i){run(chain[i++]);}// variable length - can't use forEach
    promise._c=[];promise._n=false;if(isReject&&!promise._h){onUnhandled(promise);}});};var onUnhandled=function onUnhandled(promise){task.call(global$4,function(){var value=promise._v,abrupt,handler,console;if(isUnhandled(promise)){abrupt=perform(function(){if(isNode){process.emit('unhandledRejection',value,promise);}else if(handler=global$4.onunhandledrejection){handler({promise:promise,reason:value});}else if((console=global$4.console)&&console.error){console.error('Unhandled promise rejection',value);}});// Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
    promise._h=isNode||isUnhandled(promise)?2:1;}promise._a=undefined;if(abrupt){throw abrupt.error;}});};var isUnhandled=function isUnhandled(promise){if(promise._h==1){return false;}var chain=promise._a||promise._c,i=0,reaction;while(chain.length>i){reaction=chain[i++];if(reaction.fail||!isUnhandled(reaction.promise)){return false;}}return true;};var onHandleUnhandled=function onHandleUnhandled(promise){task.call(global$4,function(){var handler;if(isNode){process.emit('rejectionHandled',promise);}else if(handler=global$4.onrejectionhandled){handler({promise:promise,reason:promise._v});}});};var $reject=function $reject(value){var promise=this;if(promise._d){return;}promise._d=true;promise=promise._w||promise;// unwrap
    promise._v=value;promise._s=2;if(!promise._a){promise._a=promise._c.slice();}notify(promise,true);};var $resolve=function $resolve(value){var promise=this,then;if(promise._d){return;}promise._d=true;promise=promise._w||promise;// unwrap
    try{if(promise===value){throw TypeError$1("Promise can't be resolved itself");}if(then=isThenable(value)){microtask(function(){var wrapper={_w:promise,_d:false};// wrap
    try{then.call(value,ctx$1($resolve,wrapper,1),ctx$1($reject,wrapper,1));}catch(e){$reject.call(wrapper,e);}});}else{promise._v=value;promise._s=1;notify(promise,false);}}catch(e){$reject.call({_w:promise,_d:false},e);// wrap
    }};// constructor polyfill
    if(!USE_NATIVE){// 25.4.3.1 Promise(executor)
    $Promise=function Promise(executor){anInstance(this,$Promise,PROMISE,'_h');aFunction$1(executor);Internal.call(this);try{executor(ctx$1($resolve,this,1),ctx$1($reject,this,1));}catch(err){$reject.call(this,err);}};Internal=function Promise(executor){this._c=[];// <- awaiting reactions
    this._a=undefined;// <- checked in isUnhandled reactions
    this._s=0;// <- state
    this._d=false;// <- done
    this._v=undefined;// <- value
    this._h=0;// <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n=false;// <- notify
    };Internal.prototype=_redefineAll($Promise.prototype,{// 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then:function then(onFulfilled,onRejected){var reaction=newPromiseCapability(speciesConstructor(this,$Promise));reaction.ok=typeof onFulfilled=='function'?onFulfilled:true;reaction.fail=typeof onRejected=='function'&&onRejected;reaction.domain=isNode?process.domain:undefined;this._c.push(reaction);if(this._a){this._a.push(reaction);}if(this._s){notify(this,false);}return reaction.promise;},// 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch':function _catch(onRejected){return this.then(undefined,onRejected);}});PromiseCapability=function PromiseCapability(){var promise=new Internal();this.promise=promise;this.resolve=ctx$1($resolve,promise,1);this.reject=ctx$1($reject,promise,1);};}$export$3($export$3.G+$export$3.W+$export$3.F*!USE_NATIVE,{Promise:$Promise});_setToStringTag($Promise,PROMISE);_setSpecies(PROMISE);Wrapper=_core[PROMISE];// statics
    $export$3($export$3.S+$export$3.F*!USE_NATIVE,PROMISE,{// 25.4.4.5 Promise.reject(r)
    reject:function reject(r){var capability=newPromiseCapability(this),$$reject=capability.reject;$$reject(r);return capability.promise;}});$export$3($export$3.S+$export$3.F*(LIBRARY$1||!USE_NATIVE),PROMISE,{// 25.4.4.6 Promise.resolve(x)
    resolve:function resolve(x){// instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise&&sameConstructor(x.constructor,this)){return x;}var capability=newPromiseCapability(this),$$resolve=capability.resolve;$$resolve(x);return capability.promise;}});$export$3($export$3.S+$export$3.F*!(USE_NATIVE&&_iterDetect(function(iter){$Promise.all(iter)['catch'](empty);})),PROMISE,{// 25.4.4.1 Promise.all(iterable)
    all:function all(iterable){var C=this,capability=newPromiseCapability(C),resolve=capability.resolve,reject=capability.reject;var abrupt=perform(function(){var values=[],index=0,remaining=1;forOf(iterable,false,function(promise){var $index=index++,alreadyCalled=false;values.push(undefined);remaining++;C.resolve(promise).then(function(value){if(alreadyCalled){return;}alreadyCalled=true;values[$index]=value;--remaining||resolve(values);},reject);});--remaining||resolve(values);});if(abrupt){reject(abrupt.error);}return capability.promise;},// 25.4.4.4 Promise.race(iterable)
    race:function race(iterable){var C=this,capability=newPromiseCapability(C),reject=capability.reject;var abrupt=perform(function(){forOf(iterable,false,function(promise){C.resolve(promise).then(capability.resolve,reject);});});if(abrupt){reject(abrupt.error);}return capability.promise;}});var event={/**
       * openUrl
       * @param  {string} url
       */openURL:function openURL(url){location.href=url;}};var meta={event:[{name:'openURL',args:['string']}]};var Event$1={init:function init(Weex){Weex.registerApiModule('event',event,meta);}};var supportGeolocation='geolocation'in navigator;var errorMsg="[h5-render]: browser doesn't support geolocation.";var geolocation={// options:
    //   - enableHighAccuracy optional, value is true or false, false by default.
    //   - timeout [none-native] optional, value is a number (milliseconds), default vaule is FINFINITY.
    //   - maximumAge [none-native] optional, value is a number (milliseconds), default value is 0.
    getCurrentPosition:function getCurrentPosition(successCbId,errorCbId,options){var this$1=this;var successCb=function successCb(pos){return this$1.sender.performCallback(successCbId,pos);};var errorCb=function errorCb(err){return this$1.sender.performCallback(errorCbId,err);};if(supportGeolocation){navigator.geolocation.getCurrentPosition(successCb,errorCb,options);}else{console.warn(errorMsg);errorCb(new Error(errorMsg));}},// options: the same with `getCurrentPosition`.
    watchPosition:function watchPosition(successCbId,errorCbId,options){var this$1=this;var successCb=function successCb(pos){return this$1.sender.performCallback(successCbId,pos,true);};var errorCb=function errorCb(err){return this$1.sender.performCallback(errorCbId,err);};if(supportGeolocation){var id=navigator.geolocation.watchPosition(function(pos){pos.watchId=id;successCb(pos);},errorCb,options);}else{console.warn(errorMsg);errorCb(new Error(errorMsg));}},clearWatch:function clearWatch(watchId){if(supportGeolocation){navigator.geolocation.clearWatch(watchId);}else{console.warn(errorMsg);}}};var meta$1={geolocation:[{name:'getCurrentPosition',args:['function','function','object']},{name:'watchPosition',args:['function','function','object']},{name:'clearWatch',args:['string']}]};var Geolocation={init:function init(Weex){Weex.registerApiModule('geolocation',geolocation,meta$1);}};var pageInfo={setTitle:function setTitle(title){title=title||'Weex HTML5';try{title=decodeURIComponent(title);}catch(e){}document.title=title;}};var meta$2={pageInfo:[{name:'setTitle',args:['string']}]};var PageInfo={init:function init(Weex){Weex.registerApiModule('pageInfo',pageInfo,meta$2);}};/* global localStorage */var supportLocalStorage=typeof localStorage!=='undefined';var SUCCESS='success';var FAILED='failed';var INVALID_PARAM='invalid_param';var UNDEFINED='undefined';var storage={/**
       * When passed a key name and value, will add that key to the storage,
       * or update that key's value if it already exists.
       * @param {string} key
       * @param {string} value
       * @param {function} callbackId
       */setItem:function setItem(key,value,callbackId){if(!supportLocalStorage){console.error('your browser is not support localStorage yet.');return;}var sender=this.sender;if(!key||!value){sender.performCallback(callbackId,{result:'failed',data:INVALID_PARAM});return;}try{localStorage.setItem(key,value);sender.performCallback(callbackId,{result:SUCCESS,data:UNDEFINED});}catch(e){// accept any exception thrown during a storage attempt as a quota error
    sender.performCallback(callbackId,{result:FAILED,data:UNDEFINED});}},/**
       * When passed a key name, will return that key's value.
       * @param {string} key
       * @param {function} callbackId
       */getItem:function getItem(key,callbackId){if(!supportLocalStorage){console.error('your browser is not support localStorage yet.');return;}var sender=this.sender;if(!key){sender.performCallback(callbackId,{result:FAILED,data:INVALID_PARAM});return;}var val=localStorage.getItem(key);sender.performCallback(callbackId,{result:val?SUCCESS:FAILED,data:val||UNDEFINED});},/**
       *When passed a key name, will remove that key from the storage.
       * @param {string} key
       * @param {function} callbackId
       */removeItem:function removeItem(key,callbackId){if(!supportLocalStorage){console.error('your browser is not support localStorage yet.');return;}var sender=this.sender;if(!key){sender.performCallback(callbackId,{result:FAILED,data:INVALID_PARAM});return;}localStorage.removeItem(key);sender.performCallback(callbackId,{result:SUCCESS,data:UNDEFINED});},/**
       * Returns an integer representing the number of data items stored in the Storage object.
       * @param {function} callbackId
       */length:function length(callbackId){if(!supportLocalStorage){console.error('your browser is not support localStorage yet.');return;}var sender=this.sender;var len=localStorage.length;sender.performCallback(callbackId,{result:SUCCESS,data:len});},/**
       * Returns an array that contains all keys stored in Storage object.
       * @param {function} callbackId
       */getAllKeys:function getAllKeys(callbackId){if(!supportLocalStorage){console.error('your browser is not support localStorage yet.');return;}var sender=this.sender;var _arr=[];for(var i=0;i<localStorage.length;i++){_arr.push(localStorage.key(i));}sender.performCallback(callbackId,{result:SUCCESS,data:_arr});}};var meta$3={storage:[{name:'setItem',args:['string','string','function']},{name:'getItem',args:['string','function']},{name:'removeItem',args:['string','function']},{name:'length',args:['function']},{name:'getAllKeys',args:['function']}]};var Storage={init:function init(Weex){Weex.registerApiModule('storage',storage,meta$3);}};typeof window==='undefined'&&(window={ctrl:{},lib:{}});!window.ctrl&&(window.ctrl={});!window.lib&&(window.lib={});!function(a,b){function c(a){var b={};Object.defineProperty(this,"params",{set:function set(a){if("object"==(typeof a==='undefined'?'undefined':_typeof(a))){for(var c in b){delete b[c];}for(var c in a){b[c]=a[c];}}},get:function get(){return b;},enumerable:!0}),Object.defineProperty(this,"search",{set:function set(a){if("string"==typeof a){0===a.indexOf("?")&&(a=a.substr(1));var c=a.split("&");for(var d in b){delete b[d];}for(var e=0;e<c.length;e++){var f=c[e].split("=");if(void 0!==f[1]&&(f[1]=f[1].toString()),f[0]){try{b[decodeURIComponent(f[0])]=decodeURIComponent(f[1]);}catch(g){b[f[0]]=f[1];}}}}},get:function get(){var a=[];for(var c in b){if(void 0!==b[c]){if(""!==b[c]){try{a.push(encodeURIComponent(c)+"="+encodeURIComponent(b[c]));}catch(d){a.push(c+"="+b[c]);}}else{try{a.push(encodeURIComponent(c));}catch(d){a.push(c);}}}}return a.length?"?"+a.join("&"):"";},enumerable:!0});var c;Object.defineProperty(this,"hash",{set:function set(a){"string"==typeof a&&(a&&a.indexOf("#")<0&&(a="#"+a),c=a||"");},get:function get(){return c;},enumerable:!0}),this.set=function(a){a=a||"";var b;if(!(b=a.match(new RegExp("^([a-z0-9-]+:)?[/]{2}(?:([^@/:?]+)(?::([^@/:]+))?@)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^#]*))?([#][^?]*)?$","i")))){throw new Error("Wrong uri scheme.");}this.protocol=b[1]||("object"==(typeof location==='undefined'?'undefined':_typeof(location))?location.protocol:""),this.username=b[2]||"",this.password=b[3]||"",this.hostname=this.host=b[4],this.port=b[5]||"",this.pathname=b[6]||"/",this.search=b[7]||"",this.hash=b[8]||"",this.origin=this.protocol+"//"+this.hostname;},this.toString=function(){var a=this.protocol+"//";return this.username&&(a+=this.username,this.password&&(a+=":"+this.password),a+="@"),a+=this.host,this.port&&"80"!==this.port&&(a+=":"+this.port),this.pathname&&(a+=this.pathname),this.search&&(a+=this.search),this.hash&&(a+=this.hash),a;},a&&this.set(a.toString());}b.httpurl=function(a){return new c(a);};}(window,window.lib||(window.lib={}));var index$1=function index$1(str){return encodeURIComponent(str).replace(/[!'()*]/g,function(c){return'%'+c.charCodeAt(0).toString(16).toUpperCase();});};/*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    *//* eslint-disable no-unused-vars */var getOwnPropertySymbols=Object.getOwnPropertySymbols;var hasOwnProperty$1=Object.prototype.hasOwnProperty;var propIsEnumerable=Object.prototype.propertyIsEnumerable;function toObject$2(val){if(val===null||val===undefined){throw new TypeError('Object.assign cannot be called with null or undefined');}return Object(val);}function shouldUseNative(){try{if(!Object.assign){return false;}// Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118
    var test1=new String('abc');// eslint-disable-line no-new-wrappers
    test1[5]='de';if(Object.getOwnPropertyNames(test1)[0]==='5'){return false;}// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test2={};for(var i=0;i<10;i++){test2['_'+String.fromCharCode(i)]=i;}var order2=Object.getOwnPropertyNames(test2).map(function(n){return test2[n];});if(order2.join('')!=='0123456789'){return false;}// https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test3={};'abcdefghijklmnopqrst'.split('').forEach(function(letter){test3[letter]=letter;});if(Object.keys(Object.assign({},test3)).join('')!=='abcdefghijklmnopqrst'){return false;}return true;}catch(err){// We don't expect any of the above to throw, but better to be safe.
    return false;}}var index$3=shouldUseNative()?Object.assign:function(target,source){var arguments$1=arguments;var from;var to=toObject$2(target);var symbols;for(var s=1;s<arguments.length;s++){from=Object(arguments$1[s]);for(var key in from){if(hasOwnProperty$1.call(from,key)){to[key]=from[key];}}if(getOwnPropertySymbols){symbols=getOwnPropertySymbols(from);for(var i=0;i<symbols.length;i++){if(propIsEnumerable.call(from,symbols[i])){to[symbols[i]]=from[symbols[i]];}}}}return to;};var strictUriEncode=index$1;var objectAssign=index$3;function encoderForArrayFormat(opts){switch(opts.arrayFormat){case'index':return function(key,value,index){return value===null?[encode(key,opts),'[',index,']'].join(''):[encode(key,opts),'[',encode(index,opts),']=',encode(value,opts)].join('');};case'bracket':return function(key,value){return value===null?encode(key,opts):[encode(key,opts),'[]=',encode(value,opts)].join('');};default:return function(key,value){return value===null?encode(key,opts):[encode(key,opts),'=',encode(value,opts)].join('');};}}function parserForArrayFormat(opts){var result;switch(opts.arrayFormat){case'index':return function(key,value,accumulator){result=/\[(\d*)\]$/.exec(key);key=key.replace(/\[\d*\]$/,'');if(!result){accumulator[key]=value;return;}if(accumulator[key]===undefined){accumulator[key]={};}accumulator[key][result[1]]=value;};case'bracket':return function(key,value,accumulator){result=/(\[\])$/.exec(key);key=key.replace(/\[\]$/,'');if(!result||accumulator[key]===undefined){accumulator[key]=value;return;}accumulator[key]=[].concat(accumulator[key],value);};default:return function(key,value,accumulator){if(accumulator[key]===undefined){accumulator[key]=value;return;}accumulator[key]=[].concat(accumulator[key],value);};}}function encode(value,opts){if(opts.encode){return opts.strict?strictUriEncode(value):encodeURIComponent(value);}return value;}function keysSorter(input){if(Array.isArray(input)){return input.sort();}else if((typeof input==='undefined'?'undefined':_typeof(input))==='object'){return keysSorter(Object.keys(input)).sort(function(a,b){return Number(a)-Number(b);}).map(function(key){return input[key];});}return input;}var extract=function extract(str){return str.split('?')[1]||'';};var parse=function parse(str,opts){opts=objectAssign({arrayFormat:'none'},opts);var formatter=parserForArrayFormat(opts);// Create an object with no prototype
    // https://github.com/sindresorhus/query-string/issues/47
    var ret=Object.create(null);if(typeof str!=='string'){return ret;}str=str.trim().replace(/^(\?|#|&)/,'');if(!str){return ret;}str.split('&').forEach(function(param){var parts=param.replace(/\+/g,' ').split('=');// Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37
    var key=parts.shift();var val=parts.length>0?parts.join('='):undefined;// missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val=val===undefined?null:decodeURIComponent(val);formatter(decodeURIComponent(key),val,ret);});return Object.keys(ret).sort().reduce(function(result,key){var val=ret[key];if(Boolean(val)&&(typeof val==='undefined'?'undefined':_typeof(val))==='object'&&!Array.isArray(val)){// Sort object keys, not values
    result[key]=keysSorter(val);}else{result[key]=val;}return result;},Object.create(null));};var stringify=function stringify(obj,opts){var defaults={encode:true,strict:true,arrayFormat:'none'};opts=objectAssign(defaults,opts);var formatter=encoderForArrayFormat(opts);return obj?Object.keys(obj).sort().map(function(key){var val=obj[key];if(val===undefined){return'';}if(val===null){return encode(key,opts);}if(Array.isArray(val)){var result=[];val.slice().forEach(function(val2){if(val2===undefined){return;}result.push(formatter(key,val2,result.length));});return result.join('&');}return encode(key,opts)+'='+encode(val,opts);}).filter(function(x){return x.length>0;}).join('&'):'';};var index={extract:extract,parse:parse,stringify:stringify};/* global lib, XMLHttpRequest *//* deps: httpurl */var utils;var jsonpCnt=0;var ERROR_STATE=-1;function _jsonp(config,callback,progressCallback){var cbName='jsonp_'+ ++jsonpCnt;var url;if(!config.url){console.error('[h5-render] config.url should be set in _jsonp for \'fetch\' API.');}global[cbName]=function(cb){return function(response){callback({status:200,ok:true,statusText:'OK',data:response});delete global[cb];};}(cbName);var script=document.createElement('script');try{url=lib.httpurl(config.url);}catch(err){console.error('[h5-render] invalid config.url in _jsonp for \'fetch\' API: '+config.url);}url.params.callback=cbName;script.type='text/javascript';script.src=url.toString();// script.onerror is not working on IE or safari.
    // but they are not considered here.
    script.onerror=function(cb){return function(err){console.error('[h5-render] unexpected error in _jsonp for \'fetch\' API',err);callback({status:ERROR_STATE,ok:false,statusText:'',data:''});delete global[cb];};}(cbName);var head=document.getElementsByTagName('head')[0];head.insertBefore(script,null);}function _xhr(config,callback,progressCallback){var xhr=new XMLHttpRequest();xhr.responseType=config.type;xhr.open(config.method,config.url,true);// cors cookie support
    if(config.withCredentials===true){xhr.withCredentials=true;}var headers=config.headers||{};for(var k in headers){xhr.setRequestHeader(k,headers[k]);}xhr.onload=function(res){callback({status:xhr.status,ok:xhr.status>=200&&xhr.status<300,statusText:xhr.statusText,data:xhr.response,headers:xhr.getAllResponseHeaders().split('\n').reduce(function(obj,headerStr){var headerArr=headerStr.match(/(.+): (.+)/);if(headerArr){obj[headerArr[1]]=headerArr[2];}return obj;},{})});};if(progressCallback){xhr.onprogress=function(e){progressCallback({readyState:xhr.readyState,status:xhr.status,length:e.loaded,total:e.total,statusText:xhr.statusText,headers:xhr.getAllResponseHeaders().split('\n').reduce(function(obj,headerStr){var headerArr=headerStr.match(/(.+): (.+)/);if(headerArr){obj[headerArr[1]]=headerArr[2];}return obj;},{})});};}xhr.onerror=function(err){console.error('[h5-render] unexpected error in _xhr for \'fetch\' API',err);callback({status:ERROR_STATE,ok:false,statusText:'',data:''});};xhr.send(config.body||null);}var stream={/**
       * sendHttp
       * @deprecated
       * Note: This API is deprecated. Please use stream.fetch instead.
       * send a http request through XHR.
       * @param  {obj} params
       *  - method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH',
       *  - url: url requested
       * @param  {string} callbackId
       */sendHttp:function sendHttp(param,callbackId){if(typeof param==='string'){try{param=JSON.parse(param);}catch(e){return;}}if((typeof param==='undefined'?'undefined':_typeof(param))!=='object'||!param.url){return console.error('[h5-render] invalid config or invalid config.url for sendHttp API');}var sender=this.sender;var method=param.method||'GET';var xhr=new XMLHttpRequest();xhr.open(method,param.url,true);xhr.onload=function(){sender.performCallback(callbackId,this.responseText);};xhr.onerror=function(error){return console.error('[h5-render] unexpected error in sendHttp API',error);// sender.performCallback(
    //   callbackId,
    //   new Error('unexpected error in sendHttp API')
    // )
    };xhr.send();},/**
       * fetch
       * use stream.fetch to request for a json file, a plain text file or
       * a arraybuffer for a file stream. (You can use Blob and FileReader
       * API implemented by most modern browsers to read a arraybuffer.)
       * @param  {object} options config options
       *   - method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH'
       *   - headers {obj}
       *   - url {string}
       *   - mode {string} 'cors' | 'no-cors' | 'same-origin' | 'navigate'
       *   - withCredentials {boolean}
       *   - body
       *   - type {string} 'json' | 'jsonp' | 'text'
       * @param  {string} callbackId
       * @param  {string} progressCallbackId
       */fetch:function fetch(options,callbackId,progressCallbackId){var DEFAULT_METHOD='GET';var DEFAULT_MODE='cors';var DEFAULT_TYPE='text';var methodOptions=['GET','POST','PUT','DELETE','HEAD','PATCH'];var modeOptions=['cors','no-cors','same-origin','navigate'];var typeOptions=['text','json','jsonp','arraybuffer'];// const fallback = false  // fallback from 'fetch' API to XHR.
    var sender=this.sender;var config=utils.extend({},options);// validate options.method
    if(typeof config.method==='undefined'){config.method=DEFAULT_METHOD;console.warn('[h5-render] options.method for \'fetch\' API has been set to '+'default value \''+config.method+'\'');}else if(methodOptions.indexOf((config.method+'').toUpperCase())===-1){return console.error('[h5-render] options.method \''+config.method+'\' for \'fetch\' API should be one of '+methodOptions+'.');}// validate options.url
    if(!config.url){return console.error('[h5-render] options.url should be set for \'fetch\' API.');}// validate body content for method 'GET'.
    if(config.method.toUpperCase()==='GET'){var body=config.body;if(utils.isPlainObject(body)){body=index.stringify(body);}var url=config.url;var hashIdx=url.indexOf('#');hashIdx<=-1&&(hashIdx=url.length);var hash=url.substr(hashIdx);hash&&(hash='#'+hash);url=url.substring(0,hashIdx);url+=(config.url.indexOf('?')<=-1?'?':'&')+body+hash;config.url=url;}// validate options.mode
    if(typeof config.mode==='undefined'){config.mode=DEFAULT_MODE;}else if(modeOptions.indexOf((config.mode+'').toLowerCase())===-1){return console.error('[h5-render] options.mode \''+config.mode+'\' for \'fetch\' API should be one of '+modeOptions+'.');}// validate options.type
    if(typeof config.type==='undefined'){config.type=DEFAULT_TYPE;console.warn('[h5-render] options.type for \'fetch\' API has been set to '+'default value \''+config.type+'\'.');}else if(typeOptions.indexOf((config.type+'').toLowerCase())===-1){return console.error('[h5-render] options.type \''+config.type+'\' for \'fetch\' API should be one of '+typeOptions+'.');}// validate options.headers
    config.headers=config.headers||{};if(!utils.isPlainObject(config.headers)){return console.error('[h5-render] options.headers should be a plain object');}// validate options.timeout
    config.timeout=parseInt(config.timeout,10)||2500;var _callArgs=[config,function(res){sender.performCallback(callbackId,res);}];if(progressCallbackId){_callArgs.push(function(res){// Set 'keepAlive' to true for sending continuous callbacks
    sender.performCallback(progressCallbackId,res,true);});}if(config.type==='jsonp'){_jsonp.apply(this,_callArgs);}else{_xhr.apply(this,_callArgs);}}};var meta$4={stream:[{name:'sendHttp',args:['object','function']},{name:'fetch',args:['object','function','function']}]};var Stream={init:function init(Weex){utils=Weex.utils;Weex.registerApiModule('stream',stream,meta$4);}};/**
    
    AUCTION:
    taskQueue
    Clipboard.setString()  NOW not works, facing to user-act lose of taskQueue.
    
    works in Chrome Firefox Opera. but not in Safari.
    @see https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#Browser_compatibility
    
    Clipboard.getString() unimplemented. There is no easy way to do paste from clipboard to js variable.
    
    So look out your app behavior, when downgrade to html5 render.
    Any idea is welcome.
    **/var WEEX_CLIPBOARD_ID='__weex_clipboard_id__';var clipboard={getString:function getString(callbackId){// not supported in html5
    console.log('clipboard.getString() is not supported now.');},setString:function setString(text){// not support safari
    if(typeof text==='string'&&text!==''&&document.execCommand){var tempInput=element();tempInput.value=text;tempInput.select();document.execCommand('copy');// var out = document.execCommand('copy');
    // console.log("execCommand out is " + out);
    tempInput.value='';tempInput.blur();}else{console.log('only support string input now');}}};function element(){var tempInput=document.getElementById(WEEX_CLIPBOARD_ID);if(!tempInput){tempInput=document.createElement('input');tempInput.setAttribute('id',WEEX_CLIPBOARD_ID);tempInput.style.cssText='height:1px;width:1px;border:none;';// tempInput.style.cssText = "height:40px;width:300px;border:solid;"
    document.body.appendChild(tempInput);}return tempInput;}var meta$5={clipboard:[{name:'getString',args:['function']},{name:'setString',args:['string']}]};var Clipboard={init:function init(Weex){Weex.registerApiModule('clipboard',clipboard,meta$5);}};/**
     * Mix properties into target object.
     * the rightest object's value has the highest priority.
     */function extend(to){var args=[],len=arguments.length-1;while(len-->0){args[len]=arguments[len+1];}if(!args||args.length<=0){return to;}args.forEach(function(from){if((typeof from==='undefined'?'undefined':_typeof(from))!=='object'){return;}for(var key in from){to[key]=from[key];}});return to;}/**
     * Mix specified properties into target object.
     */function extendKeys(to,from,keys){if(!from){return to;}(keys||[]).forEach(function(key){to[key]=from[key];});return to;}/**
     * Extract specified properties from src to target object.
     */function extractKeys(to,from,keys){if(!from){return to;}(keys||[]).forEach(function(key){to[key]=from[key];delete from[key];});return to;}/**
     * Simple bind, faster than native
     *
     * @param {Function} fn
     * @param {Object} ctx
     * @return {Function}
     */function bind(fn,ctx){return function(a){var l=arguments.length;return l?l>1?fn.apply(ctx,arguments):fn.call(ctx,a):fn.call(ctx);};}/**
     * Only call the func the last time before it's not that frequently called.
     */function debounce(func,wait){var timerId;function later(){timerId=null;func.apply(null);}return function(){clearTimeout(timerId);timerId=setTimeout(later,wait);};}/**
     * Only call the func the first time before a series frequently function calls happen.
     */function depress(func,wait){var timerId;function later(){timerId=null;}return function(){if(!timerId){func.apply();}clearTimeout(timerId);timerId=setTimeout(later,wait);};}/**
     * Only call the func every time after a wait milliseconds if it's too frequently called.
     */function throttle(func,wait,callLastTime,tag){var last=0;var lastTimer=null;var lastTimeDuration=wait+(wait>25?wait:25);// plus half wait time.
    return function(){var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}var context=this;var time=new Date().getTime();if(time-last>wait){if(callLastTime){lastTimer&&clearTimeout(lastTimer);lastTimer=setTimeout(function(){lastTimer=null;func.apply(context,args);},lastTimeDuration);}func.apply(context,args);last=time;}};}/**
     * Create Event.
     * @param {DOMString} type
     * @param {Object} props
     */function createEvent(context,type,props){var event=new Event(type,{bubbles:false});// event.preventDefault()
    // event.stopPropagation()
    extend(event,props);Object.defineProperty(event,'target',{enumerable:true,value:context||null});return event;}/**
     * Create Custom Event.
     * @param {DOMString} type
     * @param {Object} props
     */function createCustomEvent(context,type,props){// compatibility: http://caniuse.com/#search=customevent
    // const event = new CustomEvent(type)
    var event=document.createEvent('CustomEvent');event.initCustomEvent(type,false,true,{});// event.preventDefault()
    // event.stopPropagation()
    extend(event,props);// TODO: event.target is readonly
    Object.defineProperty(event,'target',{enumerable:true,value:context||null});return event;}/**
     * dispatch a event on a dom element.
     * @param  {HTMLElement} dom
     * @param  {Event} event
     */function dispatchEvent(dom,event){dom.dispatchEvent(event);}function mapFormEvents(context){var eventMap={};['input','change','focus','blur'].forEach(function(type){eventMap[type]=function(event){if(context.$el){event.value=context.$el.value;}context.$emit(type,event);};});return eventMap;}function getParentScroller$$1(vnode){if(!vnode){return null;}if(vnode.weexType==='scroller'||vnode.weexType==='list'){return vnode;}return getParentScroller$$1(vnode.$parent);}function hasIntersection$$1(rect,ctRect){return rect.left<ctRect.right&&rect.right>ctRect.left&&rect.top<ctRect.bottom&&rect.bottom>ctRect.top;}/**
     * [isElementVisible description]
     * @param  {HTMLElement}  el    a dom element.
     * @param  {HTMLElement}  container  optional, the container of this el.
     */function isElementVisible$$1(el,container){var bodyRect={top:0,left:0,bottom:window.innerHeight,right:window.innerWidth};var ctRect=container===document.body?bodyRect:container?container.getBoundingClientRect():bodyRect;return hasIntersection$$1(el.getBoundingClientRect(),ctRect);}function isComponentVisible$$1(component){if(component.$el){var scroller=getParentScroller$$1(component);if(scroller&&scroller.$el){return hasIntersection$$1(component.$el.getBoundingClientRect(),scroller.$el.getBoundingClientRect());}else{return isElementVisible$$1(component.$el);}}return false;}// TODO: improve the efficiency
    function watchAppear$$1(context){if(!context){return null;}context.$nextTick(function(){if(context.$options&&context.$options._parentListeners){var on=context.$options._parentListeners;if(on.appear||on.disappear){var scroller=getParentScroller$$1(context);var isWindow=false;var container=window;if(scroller&&scroller.$el){container=scroller.$el;}else{isWindow=true;}var lastScrollTop=container.scrollTop||window.pageYOffset;context._visible=isElementVisible$$1(context.$el,isWindow?document.body:container);if(context._visible&&on.appear){if(on.appear.fn){on.appear=on.appear.fn;}on.appear(createEvent(context.$el,'appear',{direction:null}));}var handler=throttle(function(event){var visible=isElementVisible$$1(context.$el,isWindow?document.body:container);var listener=null;var type=null;if(visible!==context._visible){context._visible=visible;if(visible){listener=on.appear;type='appear';}else{listener=on.disappear;type='disappear';}if(listener&&listener.fn){listener=listener.fn;}var scrollTop=container.scrollTop||window.pageYOffset;listener&&listener(createEvent(context.$el,type,{direction:scrollTop<lastScrollTop?'down':scrollTop>lastScrollTop?'up':null}));lastScrollTop=scrollTop;}},25,true);container.addEventListener('scroll',handler,false);}}});}var toString$2=Object.prototype.toString;/**
     * Strict object type check. Only returns true
     * for plain JavaScript objects.
     *
     * @param {*} obj
     * @return {Boolean}
     */var OBJECT_STRING='[object Object]';function isPlainObject(obj){return toString$2.call(obj)===OBJECT_STRING;}var ARRAY_STRING='[object Array]';function isArray(arr){return toString$2.call(arr)===ARRAY_STRING;}/**
     * @fileOverview: perf data recorder.
     */// performance tracker for weex.
    var perf=window._weex_perf={earliestBeforeCreates:[],latestMounts:[],earliestBeforeUpdates:[],latestUpdates:[],latestRenderFinishes:[],// createTime: earliest beforeCreate -> latest mounted.
    createTime:[],// updateTime: earliest beforeUpdate -> latest updated.
    updateTime:[],// renderTime: earliest beforeCreate/beforeUpdate -> latest img loaded.
    renderTime:[],entries:[],time:{}};var tmp={};var IMG_REC_INDENT=500;// record loading events after 500ms towards last recording.
    var earliestBeforeUpdateTime=0;var earliestBeforeCreateTime=0;function getNow(){return performance.now?performance.now():new Date().getTime();}function getEntries(){return performance.getEntries?performance.getEntries():[{responseEnd:getNow()}];}/**
     * get first screen time.
     */var debouncedTagImg=debounce(function(){var entries=getEntries();var len=entries.length;var i=0;var end=0;while(i<len){var responseEnd=entries[i].responseEnd;end=end<responseEnd?responseEnd:end;perf.entries.push({requestStart:entries[i].requestStart,responseEnd:responseEnd});i++;}end>0&&(end=end-IMG_REC_INDENT);perf.latestRenderFinishes.push(end);var start=Math.max(earliestBeforeCreateTime,earliestBeforeUpdateTime);perf.renderTime.push({start:start,end:end,duration:end-start});var num=perf.renderTime.length;perf["screenTime"+num]=end;weex.emit('renderfinish',end);{console.log("screenTime["+num+"]: "+end+" ms.");console.log('_weex_perf:',window._weex_perf);}},IMG_REC_INDENT);function tagImg(){debouncedTagImg();}/**
     * recording the earliest 'beforeCreate' time.
     */var depressedTagBeforeCreate=depress(function(){var now=getNow();earliestBeforeCreateTime=now;perf.earliestBeforeCreates.push(now);},25);function tagBeforeCreate(){depressedTagBeforeCreate();}/**
     * recording the latest 'mounted' time.
     */var debouncedTagMounted=debounce(function(){var now=getNow();perf.latestMounts.push(now);perf.createTime.push({start:earliestBeforeCreateTime,end:now,duration:now-earliestBeforeCreateTime});if(!perf.firstAllMountedTime){perf.firstAllMountedTime=now;{console.log("first all mounted time: "+now+" ms.");}}},25);function tagMounted(){debouncedTagMounted();}/**
     * recording the earliest 'beforeUpdate' time.
     */var depressedTagBeforeUpdate=depress(function(){var now=getNow();earliestBeforeUpdateTime=now;perf.earliestBeforeUpdates.push(now);},25);function tagBeforeUpdate(){depressedTagBeforeUpdate();}/**
     * recording the latest 'updated' time.
     */var debouncedTagUpdated=debounce(function(){var now=getNow();perf.latestUpdates.push(now);perf.updateTime.push({start:earliestBeforeUpdateTime,end:now,duration:now-earliestBeforeUpdateTime});},25);function tagUpdated(){debouncedTagUpdated();}function tagBegin(name){tmp[name]=getNow();}function tagEnd(name){var pre=perf.time[name];if(!pre){pre=0;}perf.time[name]=pre+getNow()-tmp[name];}var SCREEN_REC_LIMIT=3;// just record the first 3 times for screen-render finishing.
    var doRecord=true;function preLoadImg(src,loadCallback,errorCallback){var img=new Image();img.onload=loadCallback?loadCallback.bind(img):null;img.onerror=errorCallback?errorCallback.bind(img):null;img.src=src;}function applySrc(item,src,placeholderSrc){if(!src){return;}function finallCb(){item.removeAttribute('img-src');if(doRecord){if(window._weex_perf.renderTime.length<SCREEN_REC_LIMIT){tagImg();// tag lastest img onload time.
    }else{doRecord=false;}}}preLoadImg(src,function(){item.style.backgroundImage="url("+src+")";var ref=this;var naturalWidth=ref.width;var naturalHeight=ref.height;dispatchEvent(item,createEvent(item,'load',{naturalWidth:naturalWidth,naturalHeight:naturalHeight}));finallCb();},function(){dispatchEvent(item,createEvent(item,'error'));if(placeholderSrc){preLoadImg(placeholderSrc,function(){item.style.backgroundImage="url("+placeholderSrc+")";});}finallCb();});}function fireLazyload(el,ignoreVisibility){if(isArray(el)){return el.forEach(function(ct){return fireLazyload(ct);});}var imgs=(el||document.body).querySelectorAll('[img-src]');for(var i=0;i<imgs.length;i++){var img=imgs[i];if(typeof ignoreVisibility==='boolean'&&ignoreVisibility){applySrc(img,img.getAttribute('img-src'),img.getAttribute('img-placeholder'));}else if(isElementVisible$$1(img,el)){applySrc(img,img.getAttribute('img-src'),img.getAttribute('img-placeholder'));}// In somecases there are images out of the screen in x-axis. There
    // should not be a break point in these cases.
    // else {
    //   // alreay out of view, no need to compare any more.
    //   break
    // }
    }}/**
     * cache a throttle lazyload function for every container element
     * once for different wait times separate.
     *   the architecture of this cache:
     *      cache: {
     *        el.id: {
     *          wait: throttledFunction () { ... }
     *        }
     *      }
     */var cache={};var _uid$2=0;function getThrottleLazyload(wait,el){if(wait===void 0)wait=16;if(el===void 0)el=document.body;var id=el.dataset.throttleId;if(!id){id=_uid$2++;el.setAttribute('data-throttle-id',id);}!cache[id]&&(cache[id]={});var throttled=cache[id][wait]||(cache[id][wait]=throttle(fireLazyload.bind(this,el),parseFloat(wait),// true for callLastTime.
    // to trigger once more time after the last throttled function called with a little more delay.
    true));return throttled;}var valueMap={alignItems:{stretch:'stretch','flex-start':'start','flex-end':'end',center:'center'},flexDirection:{row:'horizontal',column:'vertical'},justifyContent:{'flex-start':'start','flex-end':'end',center:'center','space-between':'justify','space-around':'justify'// Just same as `space-between`
    }};var filters={flex:function flex(value){return{'-webkit-box-flex':value,'-webkit-flex':value,'flex':value};},'align-items':function align_items(value){return{'-webkit-box-align':valueMap.alignItems[value],'-webkit-align-items':value,'align-items':value};},'align-self':function align_self(value){return{'-webkit-align-self':value,'align-self':value};},'flex-direction':function flex_direction(value){return{'-webkit-box-orient':valueMap.flexDirection[value],'-webkit-flex-direction':value,'flex-direction':value};},'justify-content':function justify_content(value){return{'-webkit-box-pack':valueMap.justifyContent[value],'-webkit-justify-content':value,'justify-content':value};}};function normalize(styles){var res={};for(var key in styles){if(typeof filters[key]!=='function'){res[key]=styles[key];}else{extend(res,filters[key](styles[key]));}}return res;}/**
     * remove comments from a cssText.
     */function trimComment(cssText){return cssText.replace(/(?:\/\*)[^*]*\*\//g,'');}/**
     * add flex prefixes for compatibility conisderation.
     */function normalizeStyles(style){return normalize(style);}var support=null;function supportSticky(){if(support!==null){return support;}var element=window.document.createElement('div');var elementStyle=element.style;elementStyle.cssText='position:-webkit-sticky;position:sticky;';support=elementStyle.position.indexOf('sticky')!==-1;return support;}/**
     * Create a cached version of a pure function.
     */function cached(fn){var cache=Object.create(null);return function cachedFn(str){var hit=cache[str];return hit||(cache[str]=fn(str));};}/**
     * Camelize a hyphen-delmited string.
     */var camelizeRE=/-(\w)/g;var camelize=cached(function(str){return str.replace(camelizeRE,function(_,c){return c.toUpperCase();});});/**
     * Capitalize a string.
     */var capitalize=cached(function(str){return str.charAt(0).toUpperCase()+str.slice(1);});/**
     * Hyphenate a camelCase string.
     */var hyphenateRE=/([^-])([A-Z])/g;var hyphenate=cached(function(str){return str.replace(hyphenateRE,'$1-$2').replace(hyphenateRE,'$1-$2').toLowerCase();});function camelToKebab(name){if(!name){return'';}return name.replace(/([A-Z])/g,function(g,g1){return"-"+g1.toLowerCase();});}function appendStyle(css,styleId,replace){var style=document.getElementById(styleId);if(style&&replace){style.parentNode.removeChild(style);style=null;}if(!style){style=document.createElement('style');style.type='text/css';styleId&&(style.id=styleId);document.getElementsByTagName('head')[0].appendChild(style);}style.appendChild(document.createTextNode(css));}function nextFrame(callback){var runner=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(cb){return setTimeout(cb,16);};runner(callback);}function toCSSText(object){var cssText='';if(object){for(var key in object){cssText+=hyphenate(key)+":"+object[key]+";";}}return cssText;}var utils$1=Object.freeze({cached:cached,camelize:camelize,capitalize:capitalize,hyphenate:hyphenate,camelToKebab:camelToKebab,appendStyle:appendStyle,nextFrame:nextFrame,toCSSText:toCSSText,extend:extend,extendKeys:extendKeys,extractKeys:extractKeys,bind:bind,debounce:debounce,depress:depress,throttle:throttle,createEvent:createEvent,createCustomEvent:createCustomEvent,dispatchEvent:dispatchEvent,mapFormEvents:mapFormEvents,getParentScroller:getParentScroller$$1,hasIntersection:hasIntersection$$1,isElementVisible:isElementVisible$$1,isComponentVisible:isComponentVisible$$1,watchAppear:watchAppear$$1,applySrc:applySrc,fireLazyload:fireLazyload,getThrottleLazyload:getThrottleLazyload,trimComment:trimComment,normalizeStyles:normalizeStyles,supportSticky:supportSticky,isPlainObject:isPlainObject,isArray:isArray});function transitionOnce(vnode,config,callback){var duration=config.duration||1000;// ms
    var timing=config.timingFunction||'ease';var delay=config.delay||0;// ms
    // TODO: parse transition properties
    var transitionValue="all "+duration+"ms "+timing+" "+delay+"ms";var dom=vnode.$el;var transitionEndHandler=function transitionEndHandler(event){event.stopPropagation();dom.removeEventListener('webkitTransitionEnd',transitionEndHandler);dom.removeEventListener('transitionend',transitionEndHandler);dom.style.transition='';dom.style.webkitTransition='';callback();};dom.style.transition=transitionValue;dom.style.webkitTransition=transitionValue;dom.addEventListener('webkitTransitionEnd',transitionEndHandler);dom.addEventListener('transitionend',transitionEndHandler);nextFrame(function(){dom.style.cssText+=toCSSText(config.styles||{});});}var animation={/**
       * transition
       * @param  {String} vnode
       * @param  {Object} config
       * @param  {String} callback
       */transition:function transition(vnode,config,callback){// TODO: Make sure the transition is only run once
    return transitionOnce(vnode,config,function(){callback&&callback();});}};function getParentScroller$1(vnode){if(!vnode){return null;}if(vnode.weexType==='scroller'||vnode.weexType==='list'){return vnode;}return getParentScroller$1(vnode.$parent);}function now(){var now=window.performance&&window.performance.now?window.performance.now.bind(window.performance):Date.now;return now();}function scrollElement(dSuffix,position){this["scroll"+dSuffix]=position;}/**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     */function step$1(context){// call method again on next available frame
    context.frame=window.requestAnimationFrame(step$1.bind(window,context));var time=now();var elapsed=(time-context.startTime)/468;// avoid elapsed times higher than one
    elapsed=elapsed>1?1:elapsed;// apply easing to elapsed time
    var value=ease(elapsed);var currentPosition=context.startPosition+(context.position-context.startPosition)*value;context.method.call(context.scrollable,context.dSuffix,currentPosition);// return when end points have been reached
    if(currentPosition===context.position){window.cancelAnimationFrame(context.frame);return;}}/**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */function ease(k){return 0.5*(1-Math.cos(Math.PI*k));}var dom={/**
       * scrollToElement
       * @param  {String} vnode
       * @param  {Object} options {offset:Number}
       *   ps: scroll-to has 'ease' and 'duration'(ms) as options.
       */scrollToElement:function scrollToElement(vnode,options){var scroller=getParentScroller$1(vnode);var scrollDirection=scroller.scrollDirection||'vertical';if(scroller&&scroller.$el&&vnode.$el){// if it's a list, then the listVnode.scrollDirection is undefined. just
    // assum it is the default value 'vertical'.
    var dSuffix={horizontal:'Left',vertical:'Top'}[scrollDirection];var offset=vnode.$el["offset"+dSuffix];if(options){offset+=Number(options.offset)||0;}else{console.warn('[Vue Render] The second parameter of "scrollToElement" is required, '+'otherwise it may not works well on native.');}step$1({scrollable:scroller.$el,startTime:now(),frame:null,startPosition:scroller.$el["scroll"+dSuffix],position:offset,method:scrollElement,dSuffix:dSuffix});}},/**
       * getComponentRect
       * @param {String} vnode
       * @param {Function} callback
       */getComponentRect:function getComponentRect(vnode,callback){var info={result:false};if(vnode&&vnode==='viewport'){info.result=true;info.size={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,top:0,left:0,right:document.documentElement.clientWidth,bottom:document.documentElement.clientHeight};}else if(vnode&&vnode.$el){info.result=true;info.size=vnode.$el.getBoundingClientRect();}var message=info.result?info:{result:false,errMsg:'Illegal parameter'};callback&&callback(message);return message;},/**
       * for adding fontFace
       * @param {string} key fontFace
       * @param {object} styles rules
       */addRule:function addRule(key,styles){key=camelToKebab(key);var stylesText='';for(var k in styles){if(styles.hasOwnProperty(k)){stylesText+=camelToKebab(k)+':'+styles[k]+';';}}var styleText="@"+key+"{"+stylesText+"}";appendStyle(styleText,'dom-added-rules');}};var queue$1=[];var isProcessing=false;var toastWin;var TOAST_WIN_CLASS_NAME='weex-toast';var DEFAULT_DURATION=0.8;function showToastWindow(msg,callback){var handleTransitionEnd=function handleTransitionEnd(){toastWin.removeEventListener('transitionend',handleTransitionEnd);toastWin.removeEventListener('webkitTransitionEnd',handleTransitionEnd);callback&&callback();};if(!toastWin){toastWin=document.createElement('div');toastWin.classList.add(TOAST_WIN_CLASS_NAME,'hide');document.body.appendChild(toastWin);}toastWin.textContent=msg;toastWin.addEventListener('transitionend',handleTransitionEnd);toastWin.addEventListener('webkitTransitionEnd',handleTransitionEnd);setTimeout(function(){toastWin.classList.remove('hide');},0);}function hideToastWindow(callback){var handleTransitionEnd=function handleTransitionEnd(){toastWin.removeEventListener('transitionend',handleTransitionEnd);toastWin.removeEventListener('webkitTransitionEnd',handleTransitionEnd);callback&&callback();};if(!toastWin){return;}toastWin.addEventListener('transitionend',handleTransitionEnd);toastWin.addEventListener('webkitTransitionEnd',handleTransitionEnd);setTimeout(function(){toastWin.classList.add('hide');},0);}var _toast={push:function push(msg,duration){queue$1.push({msg:msg,duration:duration||DEFAULT_DURATION});this.show();},show:function show(){var that=this;// All messages had been toasted already, so remove the toast window,
    if(!queue$1.length){toastWin&&toastWin.parentNode.removeChild(toastWin);toastWin=null;return;}// the previous toast is not ended yet.
    if(isProcessing){return;}isProcessing=true;var toastInfo=queue$1.shift();showToastWindow(toastInfo.msg,function(){setTimeout(function(){hideToastWindow(function(){isProcessing=false;that.show();});},toastInfo.duration*1000);});}};// there will be only one instance of modal.
    var MODAL_WRAP_CLASS='weex-modal-wrap';var MODAL_NODE_CLASS='weex-modal-node';function Modal(){this.wrap=document.querySelector(MODAL_WRAP_CLASS);this.node=document.querySelector(MODAL_NODE_CLASS);if(!this.wrap){this.createWrap();}if(!this.node){this.createNode();}this.clearNode();this.createNodeContent();this.bindEvents();}Modal.prototype={show:function show(){this.wrap.style.display='block';this.node.classList.remove('hide');},destroy:function destroy(){document.body.removeChild(this.wrap);document.body.removeChild(this.node);this.wrap=null;this.node=null;},createWrap:function createWrap(){this.wrap=document.createElement('div');this.wrap.className=MODAL_WRAP_CLASS;document.body.appendChild(this.wrap);},createNode:function createNode(){this.node=document.createElement('div');this.node.classList.add(MODAL_NODE_CLASS,'hide');document.body.appendChild(this.node);},clearNode:function clearNode(){this.node.innerHTML='';},createNodeContent:function createNodeContent(){// do nothing.
    // child classes can override this method.
    },bindEvents:function bindEvents(){this.wrap.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();});}};var CONTENT_CLASS='content';var MSG_CLASS='content-msg';var BUTTON_GROUP_CLASS='btn-group';var BUTTON_CLASS='btn';function Alert(config){this.msg=config.message||'';this.callback=config.callback;this.okTitle=config.okTitle||'OK';Modal.call(this);this.node.classList.add('weex-alert');}Alert.prototype=Object.create(Modal.prototype);Alert.prototype.createNodeContent=function(){var content=document.createElement('div');content.classList.add(CONTENT_CLASS);this.node.appendChild(content);var msg=document.createElement('div');msg.classList.add(MSG_CLASS);msg.appendChild(document.createTextNode(this.msg));content.appendChild(msg);var buttonGroup=document.createElement('div');buttonGroup.classList.add(BUTTON_GROUP_CLASS);this.node.appendChild(buttonGroup);var button=document.createElement('div');button.classList.add(BUTTON_CLASS,'alert-ok');button.appendChild(document.createTextNode(this.okTitle));buttonGroup.appendChild(button);};Alert.prototype.bindEvents=function(){Modal.prototype.bindEvents.call(this);var button=this.node.querySelector('.'+BUTTON_CLASS);button.addEventListener('click',function(){this.destroy();this.callback&&this.callback();}.bind(this));};var CONTENT_CLASS$1='content';var MSG_CLASS$1='content-msg';var BUTTON_GROUP_CLASS$1='btn-group';var BUTTON_CLASS$1='btn';function Confirm(config){this.msg=config.message||'';this.callback=config.callback;this.okTitle=config.okTitle||'OK';this.cancelTitle=config.cancelTitle||'Cancel';Modal.call(this);this.node.classList.add('weex-confirm');}Confirm.prototype=Object.create(Modal.prototype);Confirm.prototype.createNodeContent=function(){var content=document.createElement('div');content.classList.add(CONTENT_CLASS$1);this.node.appendChild(content);var msg=document.createElement('div');msg.classList.add(MSG_CLASS$1);msg.appendChild(document.createTextNode(this.msg));content.appendChild(msg);var buttonGroup=document.createElement('div');buttonGroup.classList.add(BUTTON_GROUP_CLASS$1);this.node.appendChild(buttonGroup);var btnOk=document.createElement('div');btnOk.appendChild(document.createTextNode(this.okTitle));btnOk.classList.add('btn-ok',BUTTON_CLASS$1);var btnCancel=document.createElement('div');btnCancel.appendChild(document.createTextNode(this.cancelTitle));btnCancel.classList.add('btn-cancel',BUTTON_CLASS$1);buttonGroup.appendChild(btnOk);buttonGroup.appendChild(btnCancel);this.node.appendChild(buttonGroup);};Confirm.prototype.bindEvents=function(){Modal.prototype.bindEvents.call(this);var btnOk=this.node.querySelector('.'+BUTTON_CLASS$1+'.btn-ok');var btnCancel=this.node.querySelector('.'+BUTTON_CLASS$1+'.btn-cancel');btnOk.addEventListener('click',function(){this.destroy();this.callback&&this.callback(this.okTitle);}.bind(this));btnCancel.addEventListener('click',function(){this.destroy();this.callback&&this.callback(this.cancelTitle);}.bind(this));};var CONTENT_CLASS$2='content';var MSG_CLASS$2='content-msg';var BUTTON_GROUP_CLASS$2='btn-group';var BUTTON_CLASS$2='btn';var INPUT_WRAP_CLASS='input-wrap';var INPUT_CLASS='input';function Prompt(config){this.msg=config.message||'';this.defaultMsg=config.default||'';this.callback=config.callback;this.okTitle=config.okTitle||'OK';this.cancelTitle=config.cancelTitle||'Cancel';Modal.call(this);this.node.classList.add('weex-prompt');}Prompt.prototype=Object.create(Modal.prototype);Prompt.prototype.createNodeContent=function(){var content=document.createElement('div');content.classList.add(CONTENT_CLASS$2);this.node.appendChild(content);var msg=document.createElement('div');msg.classList.add(MSG_CLASS$2);msg.appendChild(document.createTextNode(this.msg));content.appendChild(msg);var inputWrap=document.createElement('div');inputWrap.classList.add(INPUT_WRAP_CLASS);content.appendChild(inputWrap);var input=document.createElement('input');input.classList.add(INPUT_CLASS);input.type='text';input.autofocus=true;input.placeholder=this.defaultMsg;inputWrap.appendChild(input);var buttonGroup=document.createElement('div');buttonGroup.classList.add(BUTTON_GROUP_CLASS$2);var btnOk=document.createElement('div');btnOk.appendChild(document.createTextNode(this.okTitle));btnOk.classList.add('btn-ok',BUTTON_CLASS$2);var btnCancel=document.createElement('div');btnCancel.appendChild(document.createTextNode(this.cancelTitle));btnCancel.classList.add('btn-cancel',BUTTON_CLASS$2);buttonGroup.appendChild(btnOk);buttonGroup.appendChild(btnCancel);this.node.appendChild(buttonGroup);};Prompt.prototype.bindEvents=function(){Modal.prototype.bindEvents.call(this);var btnOk=this.node.querySelector('.'+BUTTON_CLASS$2+'.btn-ok');var btnCancel=this.node.querySelector('.'+BUTTON_CLASS$2+'.btn-cancel');var that=this;btnOk.addEventListener('click',function(){var val=document.querySelector('input').value;this.destroy();this.callback&&this.callback({result:that.okTitle,data:val});}.bind(this));btnCancel.addEventListener('click',function(){var val=document.querySelector('input').value;this.destroy();this.callback&&this.callback({result:that.cancelTitle,data:val});}.bind(this));};// TODO: rewrite the modal styles
    var modal={// duration: default is 0.8 seconds.
    toast:function toast(config){_toast.push(config.message,config.duration);},// config:
    //  - message: string
    //  - okTitle: title of ok button
    //  - callback
    alert:function alert(config,callback){config.callback=function(){callback&&callback();};new Alert(config).show();},// config:
    //  - message: string
    //  - okTitle: title of ok button
    //  - cancelTitle: title of cancel button
    //  - callback
    confirm:function confirm(config,callback){config.callback=function(val){callback&&callback(val);};new Confirm(config).show();},// config:
    //  - message: string
    //  - okTitle: title of ok button
    //  - cancelTitle: title of cancel button
    //  - callback
    prompt:function prompt(config,callback){config.callback=function(val){callback&&callback(val);};new Prompt(config).show();}};/**
     * Navigator module
     */// TODO: config.animated
    var navigator$1={push:function push(config,callback){window.location.href=config.url;callback&&callback();},pop:function pop(config,callback){window.history.back();callback&&callback();}};/**
     * Webview module
     */var webview={goBack:function goBack(vnode){if(vnode&&typeof vnode.goBack==='function'){vnode.goBack();}},goForward:function goForward(vnode){if(vnode&&typeof vnode.goForward==='function'){vnode.goForward();}},reload:function reload(vnode){if(vnode&&typeof vnode.reload==='function'){vnode.reload();}}};// modules from render/browesr
    // custom modules
    var modules={animation:animation,dom:dom,modal:modal,navigator:navigator$1,webview:webview};function requireWeexModule(name){if(modules[name]){return modules[name];}return null;}var modules$1={init:function init(weex){weex.install(Event$1);weex.install(Geolocation);weex.install(PageInfo);weex.install(Storage);weex.install(Stream);weex.install(Clipboard);}};typeof window==='undefined'&&(window={ctrl:{},lib:{}});!window.ctrl&&(window.ctrl={});!window.lib&&(window.lib={});!function(a,b){function c(a){Object.defineProperty(this,"val",{value:a.toString(),enumerable:!0}),this.gt=function(a){return c.compare(this,a)>0;},this.gte=function(a){return c.compare(this,a)>=0;},this.lt=function(a){return c.compare(this,a)<0;},this.lte=function(a){return c.compare(this,a)<=0;},this.eq=function(a){return 0===c.compare(this,a);};}b.env=b.env||{},c.prototype.toString=function(){return this.val;},c.prototype.valueOf=function(){for(var a=this.val.split("."),b=[],c=0;c<a.length;c++){var d=parseInt(a[c],10);isNaN(d)&&(d=0);var e=d.toString();e.length<5&&(e=Array(6-e.length).join("0")+e),b.push(e),1===b.length&&b.push(".");}return parseFloat(b.join(""));},c.compare=function(a,b){a=a.toString().split("."),b=b.toString().split(".");for(var c=0;c<a.length||c<b.length;c++){var d=parseInt(a[c],10),e=parseInt(b[c],10);if(window.isNaN(d)&&(d=0),window.isNaN(e)&&(e=0),e>d){return-1;}if(d>e){return 1;}}return 0;},b.version=function(a){return new c(a);};}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c=a.location.search.replace(/^\?/,"");if(b.env.params={},c){for(var d=c.split("&"),e=0;e<d.length;e++){d[e]=d[e].split("=");try{b.env.params[d[e][0]]=decodeURIComponent(d[e][1]);}catch(f){b.env.params[d[e][0]]=d[e][1];}}}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;if(c=d.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/)){b.env.os={name:"Windows Phone",isWindowsPhone:!0,version:c[1]};}else if(d.match(/Safari/)&&(c=d.match(/Android[\s\/]([\d\.]+)/))){b.env.os={version:c[1]},d.match(/Mobile\s+Safari/)?(b.env.os.name="Android",b.env.os.isAndroid=!0):(b.env.os.name="AndroidPad",b.env.os.isAndroidPad=!0);}else if(c=d.match(/(iPhone|iPad|iPod)/)){var e=c[1];c=d.match(/OS ([\d_\.]+) like Mac OS X/),b.env.os={name:e,isIPhone:"iPhone"===e||"iPod"===e,isIPad:"iPad"===e,isIOS:!0,version:c[1].split("_").join(".")};}else{b.env.os={name:"unknown",version:"0.0.0"};}b.version&&(b.env.os.version=b.version(b.env.os.version));}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;(c=d.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))?b.env.browser={name:"UC",isUC:!0,version:c[1]}:(c=d.match(/MQQBrowser\/([\d\.]+)/))?b.env.browser={name:"QQ",isQQ:!0,version:c[1]}:(c=d.match(/Firefox\/([\d\.]+)/))?b.env.browser={name:"Firefox",isFirefox:!0,version:c[1]}:(c=d.match(/MSIE\s([\d\.]+)/))||(c=d.match(/IEMobile\/([\d\.]+)/))?(b.env.browser={version:c[1]},d.match(/IEMobile/)?(b.env.browser.name="IEMobile",b.env.browser.isIEMobile=!0):(b.env.browser.name="IE",b.env.browser.isIE=!0),d.match(/Android|iPhone/)&&(b.env.browser.isIELikeWebkit=!0)):(c=d.match(/(?:Chrome|CriOS)\/([\d\.]+)/))?(b.env.browser={name:"Chrome",isChrome:!0,version:c[1]},d.match(/Version\/[\d+\.]+\s*Chrome/)&&(b.env.browser.name="Chrome Webview",b.env.browser.isWebview=!0)):d.match(/Safari/)&&(c=d.match(/Android[\s\/]([\d\.]+)/))?b.env.browser={name:"Android",isAndroid:!0,version:c[1]}:d.match(/iPhone|iPad|iPod/)?d.match(/Safari/)?(c=d.match(/Version\/([\d\.]+)/),b.env.browser={name:"Safari",isSafari:!0,version:c[1]}):(c=d.match(/OS ([\d_\.]+) like Mac OS X/),b.env.browser={name:"iOS Webview",isWebview:!0,version:c[1].replace(/\_/g,".")}):b.env.browser={name:"unknown",version:"0.0.0"},b.version&&(b.env.browser.version=b.version(b.env.browser.version));}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c=a.navigator.userAgent;c.match(/Weibo/i)?b.env.thirdapp={appname:"Weibo",isWeibo:!0}:c.match(/MicroMessenger/i)?b.env.thirdapp={appname:"Weixin",isWeixin:!0}:b.env.thirdapp=!1;}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d,e=a.navigator.userAgent;(d=e.match(/WindVane[\/\s]([\d\.\_]+)/))&&(c=d[1]);var f=!1,g="",h="",i="";(d=e.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i))&&(f=!0,g=d[1],i=d[2],h=g.indexOf("-PD")>0?b.env.os.isIOS?"iPad":b.env.os.isAndroid?"AndroidPad":b.env.os.name:b.env.os.name),!g&&e.indexOf("TBIOS")>0&&(g="TB"),f?b.env.aliapp={windvane:b.version(c||"0.0.0"),appname:g||"unkown",version:b.version(i||"0.0.0"),platform:h||b.env.os.name}:b.env.aliapp=!1,b.env.taobaoApp=b.env.aliapp;}(window,window.lib||(window.lib={}));/**
     * viewport priority:
     *
     * 1. meta weex-viewport (developer custom)
     * 2. setViewport(config) := config.width (private code) @deprecated
     * 3. 750 (buid time)
     *
     */var viewportWidth=750;var wxViewportMeta=document.querySelector('meta[name="weex-viewport"]');var metaWidth=wxViewportMeta&&parseInt(wxViewportMeta.getAttribute('content'));if(metaWidth&&!isNaN(metaWidth)&&metaWidth>0){viewportWidth=metaWidth;}/**
     * set root font-size for rem units. If already been set, just skip this.
     */function setRootFont(doc,width){var rootFontSize=doc.documentElement.style.fontSize;if(!rootFontSize){doc.documentElement.style.fontSize=width/10+'px';}}function setViewport(config){if(config===void 0)config={};var doc=window.document;if(doc){// set root font for rem.
    setRootFont(doc,viewportWidth);/**
         * why not to use window.screen.width to get screenWidth ? Because in some
         * old webkit browser on android system it get the device pixel width, which
         * is the screenWidth multiply by the device pixel ratio.
         */var deRect=document.documentElement.getBoundingClientRect();var screenWidth=deRect.width;var screenHeight=deRect.height;var scale=screenWidth/viewportWidth;/**
         * if set initial/maximum/mimimum-scale some how the page will have a bounce
         * effect when user drag the page towards horizontal axis.
         */var contents=["width="+viewportWidth,// `initial-scale=${scale}`,
    // `maximum-scale=${scale}`,
    // `minimum-scale=${scale}`,
    "user-scalable=no"];var meta=doc.querySelector('meta[name="viewport"]');if(!meta){meta=doc.createElement('meta');meta.setAttribute('name','viewport');document.querySelector('head').appendChild(meta);}meta.setAttribute('content',contents.join(','));var dpr=window.devicePixelRatio;return{scale:scale,deviceWidth:screenWidth*dpr,deviceHeight:screenHeight*dpr};}}var scaleInfo=setViewport();var lib$1=window.lib;var env={platform:'Web',// weexVersion: '0.10.0', // TODO: get version from package.json (not sure)
    weexVersion:'0.10.4',userAgent:navigator.userAgent,appName:lib$1.env.aliapp?lib$1.env.aliapp.appname:navigator.appName,appVersion:lib$1.env.aliapp?lib$1.env.aliapp.version.val:null,osName:lib$1.env.browser?lib$1.env.browser.name:null,osVersion:lib$1.env.browser?lib$1.env.browser.version.val:null,deviceModel:lib$1.env.os.name||null};/**
     * scaleInfo: scale, deviceWidth, deviceHeight.
     */extend(env,scaleInfo);// 750 by default currently
    var scale=env.scale;var units={REM:12*scale,VW:env.deviceWidth/100,VH:env.deviceHeight/100,VMIN:Math.min(env.deviceWidth,env.deviceHeight)/100,VMAX:Math.max(env.deviceWidth,env.deviceHeight)/100,CM:96/2.54*scale,MM:96/25.4*scale,Q:96/25.4/4*scale,IN:96*scale,PT:96/72*scale,PC:96/6*scale,PX:scale};Object.freeze(units);// Object.freeze(env)
    window.CSS_UNIT=units;window.WXEnvironment=env;/* global Vue */var weexModules={};var weex$3={__vue__:null,utils:utils$1,units:window.CSS_UNIT,config:{env:window.WXEnvironment,bundleUrl:location.href},requireModule:function requireModule(moduleName){var module=requireWeexModule(moduleName);if(module){return module;}return weexModules[moduleName];},registerModule:function registerModule(){var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}return(ref=this).registerApiModule.apply(ref,args);var ref;},// @deprecated
    require:function require(){var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}console.log("[Vue Render] \"weex.require\" is deprecated, please use \"weex.requireModule\" instead.");return(ref=this).requireModule.apply(ref,args);var ref;},// @deprecated
    // TODO: rename to registerModule
    registerApiModule:function registerApiModule(name,module,meta){var this$1=this;if(!weexModules[name]){weexModules[name]={};}for(var key in module){if(module.hasOwnProperty(key)){weexModules[name][key]=bind(module[key],this$1);}}},registerComponent:function registerComponent(name,component){if(!this.__vue__){return console.log('[Vue Render] Vue is not found. Please import Vue.js before register a component.');}this.__vue__.component(name,component);},// @deprecated
    getRoot:function getRoot(){},// @deprecated
    sender:{performCallback:function performCallback(callback,data,keepAlive){if(typeof callback==='function'){return callback(data);}return null;}},// @deprecated
    install:function install(module){module.init(this);}};['on','once','off','emit'].forEach(function(method){weex$3[method]=function(){var args=[],len=arguments.length;while(len--){args[len]=arguments[len];}if(!this._vue){this._vue=new Vue();}return(ref=this._vue)["$"+method].apply(ref,args);var ref;};});// import 'lazyimg'
    // register built-in modules.
    weex$3.install(modules$1);function setVue(vue){if(!vue){throw new Error('[Vue Render] Vue not found. Please make sure vue 2.x runtime is imported.');}weex$3.__vue__=vue;console.log("[Vue Render] install Vue "+vue.version+".");}window.weex=weex$3;window.global=window;// import { validateStyles } from '../validator'
    var _switch={props:{checked:{type:[Boolean,String],default:false},disabled:{type:[Boolean,String],default:false}},data:function data(){return{isChecked:this.checked!=='false'&&this.checked!==false,isDisabled:this.disabled!=='false'&&this.disabled!==false};},computed:{wrapperClass:function wrapperClass(){var classArray=['weex-switch'];this.isChecked&&classArray.push('weex-switch-checked');this.isDisabled&&classArray.push('weex-switch-disabled');return classArray.join(' ');}},methods:{toggle:function toggle(){// TODO: handle the events
    if(!this.isDisabled){this.isChecked=!this.isChecked;this.$emit('change',{value:this.isChecked});}}},render:function render(createElement){var this$1=this;/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('switch', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    return createElement('span',{attrs:{'weex-type':'switch'},staticClass:this.wrapperClass,on:{click:function click(event){this$1.$emit('click',event);this$1.toggle();}}},[createElement('small',{staticClass:'weex-switch-inner'})]);}};// import { validateStyles } from '../validator'
    var a={props:{href:String},render:function render(createElement){/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('a', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    return createElement('html:a',{attrs:{'weex-type':'a',href:this.href},on:this._createEventMap(),staticClass:'weex-a weex-ct',staticStyle:this._normalizeInlineStyles(this.$vnode.data)},this.$slots.default);}};// import { validateStyles } from '../validator'
    function trimTextNode(children){if(Array.isArray(children)){return children.filter(function(vnode){return!!vnode.tag;});}return children;}var div={render:function render(createElement){/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('div', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    // const ms = this._getComponentStyle(this.$vnode.data)
    return createElement('html:div',{attrs:{'weex-type':'div'},on:this._createEventMap(),staticClass:'weex-div weex-ct',// staticStyle: ms
    staticStyle:this._normalizeInlineStyles(this.$vnode.data)},trimTextNode(this.$slots.default));}};/**
     * get resize (stetch|cover|contain) related styles.
     */function getResizeStyle(context){var stretch='100% 100%';var resize=context.resize||stretch;var bgSize=['cover','contain',stretch].indexOf(resize)>-1?resize:stretch;return{'background-size':bgSize};}function preProcessSrc(context,url,mergedStyle){// somehow the merged style in _prerender hook is gone.
    // just return the original src.
    if(!mergedStyle||!mergedStyle.width||!mergedStyle.height){return url;}var width=mergedStyle.width;var height=mergedStyle.height;return context.processImgSrc&&context.processImgSrc(url,{width:parseFloat(width),height:parseFloat(height),quality:context.quality,sharpen:context.sharpen,original:context.original})||url;}var image={props:{src:String,placeholder:String,resize:String,quality:String,sharpen:String,original:[String,Boolean]},updated:function updated(){this._fireLazyload();},mounted:function mounted(){this._fireLazyload();},render:function render(createElement){/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('image', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    // let cssText = `background-image:url("${this.src}");`
    // // compatibility: http://caniuse.com/#search=background-size
    // cssText += (this.resize && this.resize !== 'stretch')
    //   ? `background-size: ${this.resize};`
    //   : `background-size: 100% 100%;`
    var style=this._normalizeInlineStyles(this.$vnode.data);// const ms = this._getComponentStyle(this.$vnode.data)
    var wh=this._getSize(this.$vnode.data);return createElement('figure',{attrs:{'weex-type':'image','img-src':preProcessSrc(this,this.src,wh),'img-placeholder':preProcessSrc(this,this.placeholder,wh)},on:this._createEventMap(['load','error']),staticClass:'weex-image weex-el',staticStyle:extend(style,getResizeStyle(this))// staticStyle: extend(ms, getResizeStyle(this))
    });}};var supportedEvents=['click','longpress','appear','disappear'];var scrollableTypes=['scroller','list'];var lazyloadWatched=false;function watchLazyload(){lazyloadWatched=true;['scroll'].forEach(function(evt){window.addEventListener(evt,getThrottleLazyload(25,document.body));});}var base={beforeCreate:function beforeCreate(){if(!lazyloadWatched){watchLazyload();}{tagBeforeCreate();}},mounted:function mounted(){if(!weex._root){weex._root=this.$root.$el;weex._root.classList.add('weex-root');}watchAppear$$1(this);{tagMounted();}},beforeUpdate:function beforeUpdate(){{tagBeforeUpdate();}},updated:function updated(){{tagUpdated();}},methods:{_getTopContext:function _getTopContext(){var ctx=this;var vnode=ctx.$options._parentVnode;while(vnode){ctx=vnode.context;vnode=ctx.$options._parentVnode;}return ctx;},_getScopeIds:function _getScopeIds(){var arr=[];var ctx=this;var scopeId;while(ctx){scopeId=ctx.$options._scopeId;scopeId&&arr.push(scopeId);ctx=ctx.$options.parent;}return arr;},_getParentScroller:function _getParentScroller(){var parent=this;while(parent&&scrollableTypes.indexOf(parent.$options._componentTag)<=-1){parent=parent.$options.parent;}return parent;},_createEventMap:function _createEventMap(extras){var this$1=this;if(extras===void 0)extras=[];var eventMap={};supportedEvents.concat(extras).forEach(function(name){eventMap[name]=function(event){return this$1.$emit(name,event);};});return eventMap;},_fireLazyload:function _fireLazyload(el){{tagBegin('base._fireLazyload');}getThrottleLazyload(16)();{tagEnd('base._fireLazyload');}}}};// import { validateStyles } from '../validator'
    // let warned = false
    // function hyphenateExtend (to, from) {
    //   if (!from) { return }
    //   for (const k in from) {
    //     to[hyphenate(k)] = from[k]
    //   }
    // }
    function getHeadStyleMap(){{tagBegin('getHeadStyleMap');}var res=Array.from(document.styleSheets||[]).reduce(function(pre,styleSheet){// why not using styleSheet.rules || styleSheet.cssRules to get css rules ?
    // because weex's components defined non-standard style attributes, which is
    // auto ignored when access rule.cssText.
    var strArr=trimComment(styleSheet.ownerNode.textContent.trim()).split(/}/);var len=strArr.length;var rules=[];for(var i=0;i<len;i++){var str=strArr[i];if(!str||str.match(/^\s*$/)){continue;}var match=str.match(/((?:,?\s*\.[[\]\w-]+\s*)+)({[^}]+)/);if(!match){// not the vue static class styles map. so acquire no rules for this styleSheet.
    // just jump through this styleSheet and go to analyzing next.
    return pre;}var clsNms=match[1].split(',').map(function(n){return n.trim();});var cssText=match[2].replace(/[{}]/g,'').trim();var clsNmsIdx=0;var clsNmsLen=clsNms.length;while(clsNmsIdx<clsNmsLen){rules.push({selectorText:clsNms[clsNmsIdx],cssText:cssText});clsNmsIdx++;}}Array.from(rules).forEach(function(rule){var selector=rule.selectorText||'';pre[selector]=trimComment(rule.cssText).split(';').reduce(function(styleObj,statement){statement=statement.trim();if(statement&&statement.indexOf('/*')<=-1){var resArr=statement.split(':').map(function(part){return part.trim();});styleObj[resArr[0]]=resArr[1];}return styleObj;},{});});return pre;},{});{tagEnd('getHeadStyleMap');}return res;}var style={beforeCreate:function beforeCreate(){// get static class style map from document's styleSheets.
    if(!weex.styleMap){weex.styleMap=getHeadStyleMap();}},methods:{_normalizeInlineStyles:function _normalizeInlineStyles(data){var style=extend({},data.staticStyle,data.style);var res=normalizeStyles(style);return res;},_getScopeStyle:function _getScopeStyle(classNames){var scopeIds=this._getScopeIds();var style={};var styleMap=weex.styleMap;var map;var cls;var clsNmsIdx;var scpIdsIdx;var clsNmsLen=classNames.length;var scpIdsLen=scopeIds.length;if(clsNmsLen<=0){return{};}clsNmsIdx=0;while(clsNmsIdx<clsNmsLen){scpIdsIdx=0;while(scpIdsIdx<scpIdsLen){cls="."+classNames[clsNmsIdx]+"["+scopeIds[scpIdsIdx]+"]";map=styleMap[cls];if(!map){scpIdsIdx++;continue;}for(var k in map){style[k]=map[k];}scpIdsIdx++;}clsNmsIdx++;}return style;},_getSize:function _getSize(data){var wh={};var style=data.style;var staticStyle=data.staticStyle;var classes=typeof data.class==='string'?data.class.split(' '):data.class||[];var staticClass=typeof data.staticClass==='string'?data.staticClass.split(' '):data.class||[];var clsNms=staticClass.concat(classes);function extendWHFrom(to,from){if(!from){return;}from.width&&(to.width=from.width);from.height&&(to.height=from.height);}extendWHFrom(wh,this._getScopeStyle(clsNms));extendWHFrom(wh,staticStyle);extendWHFrom(wh,style);return wh;},// get style from class, staticClass, style and staticStyle.
    _getComponentStyle:function _getComponentStyle(data){var staticClassNames=typeof data.staticClass==='string'?data.staticClass.split(' '):data.staticClass||[];var classNames=typeof data.class==='string'?data.class.split(' '):data.class||[];/**
           * merge styles. priority: high -> low
           *  1. data.style (bound style).
           *  2. data.staticStyle (inline styles).
           *  3. data.class style (bound class names).
           *  4. data.staticClass style (scoped styles or static classes).
           */var clsNms=staticClassNames.concat(classNames);var style=this._getScopeStyle(clsNms);var res=normalizeStyles(extend(style,data.staticStyle,data.style));return res;},// merge static styles and static class styles into $vnode.data.mergedStyles.
    _mergeStyles:function _mergeStyles(){var vnode=this.$options._parentVnode||{};var data=vnode.data;if(!data){return;}this.$options._parentVnode.data.staticStyle=this._getComponentStyle(data);},_getParentRect:function _getParentRect(){var parentElm=this.$options._parentElm;return parentElm&&parentElm.getBoundingClientRect();},_getParentRectAsync:function _getParentRectAsync(cb){this.$nextTick(function(){return cb&&cb.call(this,this.getParentRectSync());});}}};var throttleScroll;function getThrottledScroll(context){if(!throttleScroll){var wrapper=context.$refs.wrapper;var inner=context.$refs.inner;var preOffset=(context.scrollDirection==='horizontal'?wrapper.scrollLeft:wrapper.scrollTop)||0;throttleScroll=throttle(function(evt){var offset=context.scrollDirection==='horizontal'?wrapper.scrollLeft:wrapper.scrollTop;var indent=parseInt(context.offsetAccuracy);function triggerScroll(){var rect=inner.getBoundingClientRect();evt.contentSize={width:rect.width,height:rect.height};evt.contentOffset={x:wrapper.scrollLeft,y:wrapper.scrollTop};context.$emit('scroll',evt);}if(indent&&!isNaN(indent)&&indent>0&&Math.abs(offset-preOffset)>=indent){triggerScroll();preOffset=offset;}else if(!indent||isNaN(indent)||indent<=0){triggerScroll();}},16,true);}return throttleScroll;}var scrollable={props:{offsetAccuracy:[Number,String]},methods:{updateLayout:function updateLayout(){var wrapper=this.$refs.wrapper;if(wrapper){var rect=wrapper.getBoundingClientRect();this.wrapperWidth=rect.width;this.wrapperHeight=rect.height;}},handleScroll:function handleScroll(event){getThrottleLazyload(25,this.$el,'scroll')();getThrottledScroll(this)(event);if(this.reachBottom()){this.$emit('loadmore',event);}},reachTop:function reachTop(){var wrapper=this.$refs.wrapper;return!!wrapper&&wrapper.scrollTop<=0;},reachBottom:function reachBottom(){var wrapper=this.$refs.wrapper;var inner=this.$refs.inner;var offset=Number(this.loadmoreoffset)||0;if(wrapper&&inner){var innerHeight=inner.getBoundingClientRect().height;var wrapperHeight=wrapper.getBoundingClientRect().height;return wrapper.scrollTop>=innerHeight-wrapperHeight-offset;}return false;},handleTouchStart:function handleTouchStart(event){// event.preventDefault()
    event.stopPropagation();if(this._loading||this._refresh){var touch=event.changedTouches[0];this._touchParams={reachTop:this.reachTop(),reachBottom:this.reachBottom(),startTouchEvent:touch,startX:touch.pageX,startY:touch.pageY,timeStamp:event.timeStamp};}},handleTouchMove:function handleTouchMove(event){// event.preventDefault()
    event.stopPropagation();if(this._touchParams){var inner=this.$refs.inner;var ref=this._touchParams;var startY=ref.startY;var reachTop=ref.reachTop;var reachBottom=ref.reachBottom;if(inner){var touch=event.changedTouches[0];var offsetY=touch.pageY-startY;this._touchParams.offsetY=offsetY;if(reachTop&&this._refresh){this._refresh.pullingDown(offsetY);}else if(reachBottom&&this._loading){this._loading.pullingUp(-offsetY);}}}},handleTouchEnd:function handleTouchEnd(event){// event.preventDefault()
    event.stopPropagation();if(this._touchParams){var inner=this.$refs.inner;var ref=this._touchParams;var reachTop=ref.reachTop;var reachBottom=ref.reachBottom;if(inner){if(reachTop&&this._refresh){this._refresh.pullingEnd();}else if(reachBottom&&this._loading){this._loading.pullingEnd();}}}delete this._touchParams;}}};// input and textare has some common api and event
    var findEnterKeyType=function findEnterKeyType(key){var keys=['default','go','next','search','send'];if(keys.indexOf(key)>-1){return key;}return'done';};var inputCommon={methods:{// support enter key envent
    createKeyboardEvent:function createKeyboardEvent(events){var customKeyType=this.returnKeyType;var self=this;if(this._events['return']){var keyboardEvents={'keyup':function keyup(ev){var code=ev.keyCode;var key=ev.key;if(code===13){if(key.toLowerCase()==='tab'){key='next';}var rightKeyType=findEnterKeyType(customKeyType);ev.returnKeyType=rightKeyType;ev.value=ev.target.value;self.$emit('return',ev);}}};events=extend(events,keyboardEvents);}return events;}}};/**
     * @fileOverview Input component.
     * Support v-model only if vue version is large than 2.2.0
     */// import { validateStyles } from '../validator'
    var input={mixins:[inputCommon],props:{type:{type:String,default:'text',validator:function validator(value){return['email','number','password','search','tel','text','url'].indexOf(value)!==-1;}},value:String,placeholder:String,disabled:{type:[String,Boolean],default:false},autofocus:{type:[String,Boolean],default:false},maxlength:[String,Number],returnKeyType:String},methods:{focus:function focus(){this.$el&&this.$el.focus();},blur:function blur(){this.$el&&this.$el.blur();}},render:function render(createElement){/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('input', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    var events=extend(this._createEventMap(),mapFormEvents(this));return createElement('html:input',{attrs:{'weex-type':'input',type:this.type,value:this.value,disabled:this.disabled!=='false'&&this.disabled!==false,autofocus:this.autofocus!=='false'&&this.autofocus!==false,placeholder:this.placeholder,maxlength:this.maxlength,'returnKeyType':this.returnKeyType},domProps:{value:this.value},on:this.createKeyboardEvent(events),staticClass:'weex-input weex-el'});}};// import { validateStyles } from '../../validator'
    var header={data:function data(){return{sticky:false,initTop:0,placeholder:null,supportSticky:supportSticky()};},mounted:function mounted(){this.initTop=this.$el.offsetTop;this.placeholder=window.document.createElement('div');},updated:function updated(){if(!this.sticky){this.initTop=this.$el.offsetTop;}},methods:{addSticky:function addSticky(){this.sticky=true;this.placeholder.style.display='block';this.placeholder.style.width=this.$el.offsetWidth+'px';this.placeholder.style.height=this.$el.offsetHeight+'px';this.$el.parentNode.insertBefore(this.placeholder,this.$el);},removeSticky:function removeSticky(){this.sticky=false;try{this.$el.parentNode.removeChild(this.placeholder);}catch(e){}}},render:function render(createElement){/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('header', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    return createElement('html:header',{attrs:{'weex-type':'header'},on:this._createEventMap(),ref:'header',staticClass:'weex-header weex-ct',class:{sticky:this.sticky,iossticky:this.supportSticky},staticStyle:this._normalizeInlineStyles(this.$vnode.data)},this.$slots.default);}};var listMixin={methods:{handleListScroll:function handleListScroll(event){this.handleScroll(event);if(supportSticky()){return;}var scrollTop=this.$el.scrollTop;var h=this.$children.filter(function(vm){return vm.$refs.header;});if(h.length<=0){return;}for(var i=0;i<h.length;i++){if(h[i].initTop<scrollTop){h[i].addSticky();}else{h[i].removeSticky();}}}}};// import { validateStyles } from '../../../validator'
    var index$5={name:'list',mixins:[scrollable,listMixin],props:{loadmoreoffset:{type:[String,Number],default:0}},computed:{wrapperClass:function wrapperClass(){var classArray=['weex-list','weex-list-wrapper','weex-ct'];this._refresh&&classArray.push('with-refresh');this._loading&&classArray.push('with-loading');return classArray.join(' ');}},methods:{resetLoadmore:function resetLoadmore(){this._availableToFireLoadmore=true;},createChildren:function createChildren(h){var slots=this.$slots.default||[];this._cells=slots.filter(function(vnode){if(!vnode.tag||!vnode.componentOptions){return false;}return true;});return[h('html:div',{ref:'inner',staticClass:'weex-list-inner weex-ct'},this._cells)];}},render:function render(createElement){var this$1=this;this.weexType='list';/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('list', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    // const ms = this._getComponentStyle(this.$vnode.data)
    this.$nextTick(function(){this$1.updateLayout();});return createElement('main',{ref:'wrapper',attrs:{'weex-type':'list'},staticClass:this.wrapperClass,staticStyle:this._normalizeInlineStyles(this.$vnode.data),// staticStyle: ms,
    on:extend(this._createEventMap(),{scroll:this.handleListScroll,touchstart:this.handleTouchStart,touchmove:this.handleTouchMove,touchend:this.handleTouchEnd})},this.createChildren(createElement));}};// import { validateStyles } from '../../../validator'
    var cell={render:function render(createElement){/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('cell', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    // const ms = this._getComponentStyle(this.$vnode.data)
    return createElement('section',{attrs:{'weex-type':'cell'},on:this._createEventMap(),staticClass:'weex-cell weex-ct',// staticStyle: ms
    staticStyle:this._normalizeInlineStyles(this.$vnode.data)},this.$slots.default);}};// import { validateStyles } from '../../validator'
    var scroller={mixins:[scrollable,listMixin],props:{scrollDirection:{type:[String],default:'vertical',validator:function validator(value){return['horizontal','vertical'].indexOf(value)!==-1;}},loadmoreoffset:{type:[String,Number],default:0},// TODO: support loadmore retry
    loadmoreretry:{type:[String,Number],default:0}},computed:{wrapperClass:function wrapperClass(){var classArray=['weex-scroller','weex-scroller-wrapper','weex-ct'];if(this.scrollDirection==='horizontal'){classArray.push('weex-scroller-horizontal');}else{classArray.push('weex-scroller-vertical');}return classArray.join(' ');}},methods:{createChildren:function createChildren(h){var slots=this.$slots.default||[];this._cells=slots.filter(function(vnode){if(!vnode.tag||!vnode.componentOptions){return false;}return true;});return[h('html:div',{ref:'inner',staticClass:'weex-scroller-inner weex-ct'},this._cells)];},scrollTo:function scrollTo(vnode){if(vnode&&vnode.$el){// TODO: add animation
    this.$el.scrollTop=vnode.$el.offsetTop;}}},render:function render(createElement){var this$1=this;this.weexType='scroller';/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('scroller', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    this._cells=this.$slots.default||[];this.$nextTick(function(){this$1.updateLayout();});return createElement('main',{ref:'wrapper',attrs:{'weex-type':'scroller'},staticClass:this.wrapperClass,staticStyle:this._normalizeInlineStyles(this.$vnode.data),on:extend(this._createEventMap(),{scroll:this.handleScroll,touchstart:this.handleTouchStart,touchmove:this.handleTouchMove,touchend:this.handleTouchEnd})},this.createChildren(createElement));}};function getIndicatorItemStyle(spec,isActive){var style={};style['background-color']=spec[isActive?'item-selected-color':'item-color'];style['width']=style['height']=spec['item-size'];return style;}function _render(context,h){var children=[];var mergedStyle=context._getComponentStyle(context.$vnode.data);context.$vnode.data.cached={};extendKeys(context.$vnode.data.cached,mergedStyle,['width','height']);var indicatorSpecStyle=extendKeys({},mergedStyle,['item-color','item-selected-color','item-size']);for(var i=0;i<Number(context.count);++i){var classNames=['weex-indicator-item weex-el'];var isActive=false;if(i===Number(context.active)){classNames.push('weex-indicator-item-active');isActive=true;}children.push(h('mark',{staticClass:classNames.join(' '),staticStyle:getIndicatorItemStyle(indicatorSpecStyle,isActive)}));}if(!context.$vnode.context._isMounted){context.$nextTick(function(){_reLayout(this,_getVirtualRect(this,mergedStyle),_getLtbr(this,mergedStyle));});}return h('nav',{attrs:{'weex-type':'indicator'},staticClass:'weex-indicator weex-ct',staticStyle:mergedStyle},children);}/**
     * get indicator's virtual rect (width, height), which is the .
     */function _getVirtualRect(context,mergedStyle){var ct=context._getParentRect();var rect=['width','height'].reduce(function(pre,key){var msv=mergedStyle&&mergedStyle[key];pre[key]=msv?parseFloat(msv):ct[key];return pre;},{});return rect;}/**
     * get indicator's ltbr values (without units).
     */function _getLtbr(context,mergedStyle){return['left','top','bottom','right'].reduce(function(pre,key){var msv=mergedStyle&&mergedStyle[key];// undefined, null, or '0px' -> o
    pre[key]=msv&&parseFloat(msv)||0;return pre;},{});}/**
     * get indicator's rect (width, height).
     */function _getIndicatorRect(el){var width,height;if(el.children.length===1){width=height=window.getComputedStyle(el.children[0]);}else{var itemComputedStyle=window.getComputedStyle(el.children[1]);var padding=parseFloat(itemComputedStyle.marginLeft);height=parseFloat(itemComputedStyle.height);width=el.children.length*(height+padding)-padding;}return{width:width,height:height};}/**
     * calculate and reset indicator's width, height, and ltbr.
     * @param {object} virtualRect. width and height of indicator's virtual rect box.
     * @param {object} ltbr. the user specified left, top, bottom, right pixels (without units).
     */function _reLayout(context,virtualRect,ltbr){var el=context.$el;var rect=_getIndicatorRect(el);var rectWithPx=Object.keys(rect).reduce(function(pre,key){pre[key]=rect[key]+'px';return pre;},{});extend(el.style,rectWithPx);var axisMap=[{dir:ltbr.left?'left':ltbr.right?'right':'left',scale:'width'},{dir:ltbr.top?'top':ltbr.bottom?'bottom':'top',scale:'height'}];Object.keys(axisMap).forEach(function(key){var ref=axisMap[key];var dir=ref.dir;var scale=ref.scale;el.style[dir]=ltbr[dir]+virtualRect[scale]/2-rect[scale]/2+'px';});}var indicator={name:'indicator',methods:{show:function show(){this.$el.style.visibility='visible';}},props:{count:[Number,String],active:[Number,String]},updated:function updated(){var mergedStyle=this._getComponentStyle(this.$vnode.data);_reLayout(this,_getVirtualRect(this,mergedStyle),_getLtbr(this,mergedStyle));},render:function render(createElement){return _render(this,createElement);}};var TRANSITION_TIME=200;// trigger scroll event frequency.
    // const scrollDam = 16
    var slideMixin={methods:{// get standard index
    normalizeIndex:function normalizeIndex(index){var newIndex=(index+this.frameCount)%this.frameCount;return Math.min(Math.max(newIndex,0),this.frameCount-1);},slideTo:function slideTo(index){var this$1=this;var newIndex=this.normalizeIndex(index);var inner=this.$refs.inner;var step=this._cells.length<=1?0:this.currentIndex-index;this.innerOffset+=Math.sign(step)*this.wrapperWidth;if(inner){// const match = (inner.style.transform || inner.style.webkitTransform).match(/(\d+)px/)
    // const currentOffset = parseFloat(match[1])
    // TODO: will-change | set styles together
    inner.style.webkitTransition="-webkit-transform .2s ease-in-out";inner.style.transition="transform .2s ease-in-out";inner.style.webkitTransform="translate3d("+this.innerOffset+"px, 0, 0)";inner.style.transform="translate3d("+this.innerOffset+"px, 0, 0)";setTimeout(function(){inner.style.webkitTransition='';inner.style.transition='';},TRANSITION_TIME);}// TODO: emit scroll event.
    // nextFrame()
    if(newIndex!==this.currentIndex){this.currentIndex=newIndex;// replace $el with { attr, style } is a legacy usage. Is it necessary to
    // do this ? Or just tell devers to use inline functions to access attrs ?
    this.$emit('change',createEvent(this.$el,'change',{index:this.currentIndex}));setTimeout(function(){this$1.reorder();},TRANSITION_TIME);}},reorder:function reorder(){var this$1=this;var removeClone=function removeClone(clone,prevElm){// switch current page.
    var curTransform="translate3d("+-this$1.innerOffset+"px, 0, 0)";prevElm.style.transform=curTransform;prevElm.style.webkitTransform=curTransform;// remove clone node.
    clone&&clone.parentElement.removeChild(clone);};this.$nextTick(function(){if(this$1._cells.length<=1){return;}var lastPrev=this$1._prevElm;var prevIndex=this$1.normalizeIndex(this$1.currentIndex-1);var nextIndex=this$1.normalizeIndex(this$1.currentIndex+1);var prevElm=this$1._prevElm=this$1._cells[prevIndex].elm;var nextElm=this$1._cells[nextIndex].elm;var currentElm=this$1._cells[this$1.currentIndex].elm;// put current slide on the top.
    currentElm.style.zIndex=1;// clone prevCell if there are only tow slides.
    if(this$1._cells.length===2){this$1._clonePrev&&removeClone(this$1._clonePrev,lastPrev);this$1._clonePrev=prevElm.cloneNode(true);this$1._clonePrev.classList.add('weex-slide-clone-prev');prevElm.parentElement.insertBefore(this$1._clonePrev,currentElm);if(!this$1._prevFired){fireLazyload(this$1._clonePrev,true);this$1._prevFired=true;}prevElm=this$1._clonePrev;}var prevOffset=-this$1.wrapperWidth-this$1.innerOffset;prevElm.style.webkitTransform="translate3d("+prevOffset+"px, 0, 0)";prevElm.style.transform="translate3d("+prevOffset+"px, 0, 0)";var nextOffset=this$1.wrapperWidth-this$1.innerOffset;nextElm.style.webkitTransform="translate3d("+nextOffset+"px, 0, 0)";nextElm.style.transform="translate3d("+nextOffset+"px, 0, 0)";});},next:function next(){this.slideTo(this.currentIndex+1);},prev:function prev(){this.slideTo(this.currentIndex-1);},handleTouchStart:function handleTouchStart(event){event.stopPropagation();var touch=event.changedTouches[0];this._touchParams={originalTransform:this.$refs.inner.style.webkitTransform||this.$refs.inner.style.transform,startTouchEvent:touch,startX:touch.pageX,startY:touch.pageY,timeStamp:event.timeStamp};},handleTouchMove:function handleTouchMove(event){event.stopPropagation();var tp=this._touchParams;if(!tp){return;}var ref=this._touchParams;var startX=ref.startX;var startY=ref.startY;var touch=event.changedTouches[0];var offsetX=touch.pageX-startX;var offsetY=touch.pageY-startY;tp.offsetX=offsetX;tp.offsetY=offsetY;var isV=tp.isVertical;if(typeof isV==='undefined'){isV=tp.isVertical=Math.abs(offsetX)<Math.abs(offsetY);if(!isV){this.$emit('scrollstart',createEvent(this.$el,'scrollstart',{}));}}// vertical scroll. just ignore it.
    if(isV){return;}// horizontal scroll. trigger scroll event.
    event.preventDefault();var inner=this.$refs.inner;if(inner&&offsetX){// TODO: add throttle.
    this.$emit('scroll',createEvent(this.$el,'scroll',{offsetXRatio:offsetX/this.wrapperWidth}));inner.style.transform="translate3d("+(this.innerOffset+offsetX)+"px, 0, 0)";inner.style.webkitTransform="translate3d("+(this.innerOffset+offsetX)+"px, 0, 0)";}},handleTouchEnd:function handleTouchEnd(event){event.stopPropagation();var tp=this._touchParams;if(!tp){return;}var isV=tp.isVertical;if(typeof isV==='undefined'){return;}var inner=this.$refs.inner;var offsetX=tp.offsetX;if(inner){this.$emit('scrollend',createEvent(this.$el,'scrollend'));// TODO: test the velocity if it's less than 0.2.
    var reset=Math.abs(offsetX/this.wrapperWidth)<0.2;var direction=offsetX>0?1:-1;var newIndex=reset?this.currentIndex:this.currentIndex-direction;this.slideTo(newIndex);}delete this._touchParams;}}};// import { validateStyles } from '../../validator'
    var index$6={mixins:[slideMixin],props:{'auto-play':{type:[String,Boolean],default:false},interval:{type:[String,Number],default:3000}},data:function data(){return{currentIndex:0,frameCount:0};},methods:{computeWrapperSize:function computeWrapperSize(){var wrapper=this.$refs.wrapper;if(wrapper){var rect=wrapper.getBoundingClientRect();this.wrapperWidth=rect.width;this.wrapperHeight=rect.height;}},updateLayout:function updateLayout(){this.computeWrapperSize();var inner=this.$refs.inner;if(inner){inner.style.width=this.wrapperWidth*this.frameCount+'px';}},formatChildren:function formatChildren(createElement){var children=this.$slots.default||[];var indicatorVnode;var cells=children.filter(function(vnode){if(!vnode.tag){return false;}if(vnode.componentOptions&&vnode.componentOptions.tag==='indicator'){indicatorVnode=vnode;return false;}return true;}).map(function(vnode){return createElement('li',{ref:'cells',staticClass:'weex-slider-cell'},[vnode]);});if(indicatorVnode){indicatorVnode.data.attrs=indicatorVnode.data.attrs||{};indicatorVnode.data.attrs.count=cells.length;indicatorVnode.data.attrs.active=this.currentIndex;this._indicator=createElement(indicator,indicatorVnode.data);}return cells;}},created:function created(){var this$1=this;this.weexType='slider';this.currentIndex=0;this.innerOffset=0;this._indicator=null;this.$nextTick(function(){this$1.updateLayout();});},beforeUpdate:function beforeUpdate(){this.updateLayout();this.reorder();},updated:function updated(){fireLazyload(this.$el,true);},mounted:function mounted(){if(this.autoPlay&&this.autoPlay!=='false'){var interval=Number(this.interval);this._lastSlideTime=Date.now();var autoPlayFn=bind(function(){clearTimeout(this._autoPlayTimer);var now=Date.now();var nextTick=interval-now+this._lastSlideTime;nextTick=nextTick>100?nextTick:interval;this.next();this._lastSlideTime=now;this._autoPlayTimer=setTimeout(autoPlayFn,nextTick);},this);this._autoPlayTimer=setTimeout(autoPlayFn,interval);}this.reorder();fireLazyload(this.$el,true);},render:function render(createElement){/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('slider', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    this._cells=this.formatChildren(createElement);this.frameCount=this._cells.length;return createElement('nav',{ref:'wrapper',attrs:{'weex-type':'slider'},staticClass:'weex-slider weex-slider-wrapper weex-ct',on:extend(this._createEventMap(['scroll','scrollstart','scrollend']),{touchstart:this.handleTouchStart,touchmove:throttle(bind(this.handleTouchMove,this),25),touchend:this.handleTouchEnd})},[createElement('ul',{ref:'inner',staticClass:'weex-slider-inner weex-ct'},this._cells),this._indicator]);}};var LoadingIndicator={render:function render(createElement){this.weexType='loading-indicator';return createElement('mark',{attrs:{'weex-type':'loading-indicator'},staticClass:'weex-loading-indicator weex-ct',staticStyle:this._normalizeInlineStyles(this.$vnode.data)});}};var refresh={components:{LoadingIndicator:LoadingIndicator},props:{display:{type:String,default:'show',validator:function validator(value){return['show','hide'].indexOf(value)!==-1;}}},data:function data(){return{lastDy:0,viewHeight:0,height:-1};},mounted:function mounted(){this.viewHeight=this.$el.offsetHeight;if(this.display==='hide'){this.height=0;}else{this.height=this.viewHeight;}},updated:function updated(){},watch:{height:function height(val){this.$el.style.height=val+'px';},display:function display(val){if(val==='hide'){this.height=0;}else{this.height=this.viewHeight;}}},methods:{pulling:function pulling(offsetY){if(offsetY===void 0)offsetY=0;this.height=offsetY;this.$emit('pullingdown',createEvent(this,'pullingdown',{dy:offsetY-this.lastDy,pullingDistance:offsetY,viewHeight:this.viewHeight}));this.lastDy=offsetY;},pullingDown:function pullingDown(offsetY){this.$el.style.transition="height 0s";this.pulling(offsetY);},pullingEnd:function pullingEnd(){this.$el.style.transition="height .2s";if(this.height>=this.viewHeight){this.pulling(this.viewHeight);this.$emit('refresh');}else{this.pulling(0);}},getChildren:function getChildren(){var children=this.$slots.default||[];if(this.display==='show'){return children;}return children.filter(function(vnode){return vnode.componentOptions&&vnode.componentOptions.tag!=='loading-indicator';});}},render:function render(createElement){this.$parent._refresh=this;return createElement('aside',{ref:'refresh',attrs:{'weex-type':'refresh'},staticClass:'weex-refresh weex-ct',staticStyle:this._normalizeInlineStyles(this.$vnode.data)},this.getChildren());}};var loading={components:{LoadingIndicator:LoadingIndicator},props:{display:{type:String,default:'show',validator:function validator(value){return['show','hide'].indexOf(value)!==-1;}}},data:function data(){return{height:-1,viewHeight:0};},mounted:function mounted(){this.viewHeight=this.$el.offsetHeight;if(this.display==='hide'){this.height=0;}else{this.height=this.viewHeight;}},updated:function updated(){},watch:{height:function height(val){this.$el.style.height=val+'px';},display:function display(val){if(val==='hide'){this.height=0;}else{this.height=this.viewHeight;}}},methods:{pulling:function pulling(offsetY){if(offsetY===void 0)offsetY=0;this.height=offsetY;},pullingUp:function pullingUp(offsetY){this.$el.style.transition="height 0s";this.pulling(offsetY);},pullingEnd:function pullingEnd(){this.$el.style.transition="height .2s";if(this.height>=this.viewHeight){this.pulling(this.viewHeight);this.$emit('loading');}else{this.pulling(0);}},getChildren:function getChildren(){var children=this.$slots.default||[];if(this.display==='show'){return children;}return children.filter(function(vnode){return vnode.componentOptions&&vnode.componentOptions.tag!=='loading-indicator';});}},render:function render(createElement){this.$parent._loading=this;return createElement('aside',{ref:'loading',attrs:{'weex-type':'loading'},staticClass:'weex-loading weex-ct',staticStyle:this._normalizeInlineStyles(this.$vnode.data)},this.getChildren());}};/**
     * @fileOverview Impl of text component.
     *
     * Notes about the style 'height' and 'lines':
     * if the computed value of 'height' is bigger than 'lines', than the text will
     * be clipped according to the 'lines'. Otherwise, it'll be the 'height'.
     *//**
     * Get text special styles (lines and text-overflow).
     */function getTextSpecStyle(context,ms){if(context===void 0)context={};if(ms===void 0)ms={};var lines=parseInt(ms.lines)||0;var overflow=ms['text-overflow']||'ellipsis';if(lines>0){return{overflow:'hidden','text-overflow':overflow,'-webkit-line-clamp':lines};}}var text={props:{lines:[Number,String],value:[String]},render:function render(createElement){/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('text', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    var ms=this._getComponentStyle(this.$vnode.data);return createElement('p',{attrs:{'weex-type':'text'},on:this._createEventMap(),staticClass:'weex-text weex-el',staticStyle:getTextSpecStyle(this,ms)},this.$slots.default||[this.value]);}};// import { validateStyles } from '../validator'
    var textarea={mixins:[inputCommon],props:{value:String,placeholder:String,disabled:{type:[String,Boolean],default:false},autofocus:{type:[String,Boolean],default:false},rows:{type:[String,Number],default:2},returnKeyType:String},render:function render(createElement){/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('textarea', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    var events=extend(this._createEventMap(),mapFormEvents(this));return createElement('html:textarea',{attrs:{'weex-type':'textarea',value:this.value,disabled:this.disabled!=='false'&&this.disabled!==false,autofocus:this.autofocus!=='false'&&this.autofocus!==false,placeholder:this.placeholder,rows:this.rows,'return-key-type':this.returnKeyType},domProps:{value:this.value},on:this.createKeyboardEvent(events),staticClass:'weex-textarea weex-el',staticStyle:this._normalizeInlineStyles(this.$vnode.data)},this.value);}};// import { validateStyles } from '../validator'
    var video={props:{src:String,playStatus:{type:String,default:'pause',validator:function validator(value){return['play','pause'].indexOf(value)!==-1;}},autoplay:{type:[String,Boolean],default:false},autoPlay:{type:[String,Boolean],default:false},playsinline:{type:[String,Boolean],default:false},controls:{type:[String,Boolean],default:false}},render:function render(createElement){/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('video', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    // TODO: support playStatus
    return createElement('html:video',{attrs:{'weex-type':'video',autoplay:this.autoplay!=='false'&&this.autoplay!==false,autoPlay:this.autoplay!=='false'&&this.autoplay!==false,controls:this.controls,src:this.src},on:this._createEventMap(['start','pause','finish','fail']),staticClass:'weex-video weex-el'});}};// import { validateStyles } from '../validator'
    var web={props:{src:String},methods:{// TODO: check cross-origin
    goBack:function goBack(){if(this.$el){this.$el.contentWindow.history.back();}},goForward:function goForward(){if(this.$el){this.$el.contentWindow.history.forward();}},reload:function reload(){if(this.$el){this.$el.contentWindow.history.reload();}}},mounted:function mounted(){var this$1=this;if(this.$el){this.$emit('pagestart',createEvent(this.$el,'pagestart',{url:this.src}));this.$el.addEventListener('load',function(event){this$1.$emit('pagefinish',createEvent(this$1.$el,'pagefinish',{url:this$1.src}));});}},render:function render(createElement){/* istanbul ignore next */// if ("development" === 'development') {
    //   validateStyles('web', this.$vnode.data && this.$vnode.data.staticStyle)
    // }
    return createElement('iframe',{attrs:{'weex-type':'web',src:this.src},on:this._createEventMap(['error']),staticClass:'weex-web weex-el',staticStyle:this._normalizeInlineStyles(this.$vnode.data)});}};// import indicator from './warning'
    // import refresh from './warning'
    // import loading from './warning'
    var components$1=Object.freeze({switch:_switch,a:a,div:div,container:div,image:image,img:image,input:input,header:header,list:index$5,cell:cell,scroller:scroller,slider:index$6,indicator:indicator,refresh:refresh,loading:loading,LoadingIndicator:LoadingIndicator,text:text,textarea:textarea,video:video,web:web});// import semver from 'semver'
    // import styleMixin from './mixins/style'
    /**
     * init weex.
     * @param  {Vue$2} Vue: Vue Constructor.
     * @param  {object} options: extend weex plugins.
     *         - components.
     *         - modules.
     */function init$1(Vue/*, options = {}*/){setVue(Vue);Vue.prototype.$getConfig=function(){console.warn('[Vue Render] "this.$getConfig" is deprecated, please use "weex.config" instead.');return weex$3.config;};var htmlRegex=/^html:/i;Vue.config.isReservedTag=function(tag){return htmlRegex.test(tag);};Vue.config.parsePlatformTagName=function(tag){return tag.replace(htmlRegex,'');};// register sdk components.
    for(var name in components$1){Vue.component(name,components$1[name]);}// // get user extended plugins.
    // const { components: comps, modules } = options
    // // register user extended components.
    // for (const name in comps) {
    //   Vue.components(name, comps[name])
    // }
    // // register user extended modules.
    // for (const mod in modules) {
    //   this.registerModule(mod, modules[mod])
    // }
    /* istanbul ignore next */// if ("development" === 'development') {
    //   if (semver.lt(Vue.version, '2.1.5')) {
    //     console.warn(`[Vue Render] The version of Vue should be ` +
    //       `greater than 2.1.5, current is ${Vue.version}.`)
    //   }
    //   console.info(`[Vue Render] Registered components: `
    //     + `[${Object.keys(components).join(', ')}].`)
    Vue.mixin(base);Vue.mixin(style);// }
    }// auto init in dist mode.
    if(typeof window!=='undefined'&&window.Vue){init$1(window.Vue);}return weex$3;});
    /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);