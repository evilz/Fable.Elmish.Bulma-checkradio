var bulmaDocSite = (function (exports) {
'use strict';

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var index = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

var reactProdInvariant_1 = reactProdInvariant;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction_1;

var warning_1 = warning;

function warnNoop(publicInstance, callerName) {
  
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

var ReactNoopUpdateQueue_1 = ReactNoopUpdateQueue;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var emptyObject = {};

var emptyObject_1 = emptyObject;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

var invariant_1 = invariant;

/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject_1;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? reactProdInvariant_1('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject_1;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
index(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

var ReactBaseClasses = {
  Component: ReactComponent,
  PureComponent: ReactPureComponent
};

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler$1 = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler$1 = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? reactProdInvariant_1('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler$1,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler$1
};

var PooledClass_1 = PooledClass;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var ReactCurrentOwner_1 = ReactCurrentOwner;

/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var ReactElementSymbol = REACT_ELEMENT_TYPE;

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;



var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

function hasValidRef(config) {
  return config.ref !== undefined;
}

function hasValidKey(config) {
  return config.key !== undefined;
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: ReactElementSymbol,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner_1.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = index({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner_1.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === ReactElementSymbol;
};

var ReactElement_1 = ReactElement;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

var getIteratorFn_1 = getIteratorFn;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

var KeyEscapeUtils_1 = KeyEscapeUtils;

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils_1.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === ReactElementSymbol) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn_1(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils_1.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      var childrenString = String(children);
      reactProdInvariant_1('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

var traverseAllChildren_1 = traverseAllChildren;

var twoArgumentPooler = PooledClass_1.twoArgumentPooler;
var fourArgumentPooler = PooledClass_1.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass_1.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren_1(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass_1.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction_1.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement_1.isValidElement(mappedChild)) {
      mappedChild = ReactElement_1.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren_1(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren_1(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction_1.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

var ReactChildren_1 = ReactChildren;

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty
  // Strip regex characters so we can use it for regex
  ).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'
  // Remove hasOwnProperty from the template to make it generic
  ).replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? reactProdInvariant_1('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? reactProdInvariant_1('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? reactProdInvariant_1('141') : void 0;
      !nextChild.isMounted ? reactProdInvariant_1('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? reactProdInvariant_1('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? reactProdInvariant_1('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner_1.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs,

  pushNonStandardWarningStack: function (isCreatingElement, currentSource) {
    if (typeof console.reactStack !== 'function') {
      return;
    }

    var stack = [];
    var currentOwner = ReactCurrentOwner_1.current;
    var id = currentOwner && currentOwner._debugID;

    try {
      if (isCreatingElement) {
        stack.push({
          name: id ? ReactComponentTreeHook.getDisplayName(id) : null,
          fileName: currentSource ? currentSource.fileName : null,
          lineNumber: currentSource ? currentSource.lineNumber : null
        });
      }

      while (id) {
        var element = ReactComponentTreeHook.getElement(id);
        var parentID = ReactComponentTreeHook.getParentID(id);
        var ownerID = ReactComponentTreeHook.getOwnerID(id);
        var ownerName = ownerID ? ReactComponentTreeHook.getDisplayName(ownerID) : null;
        var source = element && element._source;
        stack.push({
          name: ownerName,
          fileName: source ? source.fileName : null,
          lineNumber: source ? source.lineNumber : null
        });
        id = parentID;
      }
    } catch (err) {
      // Internal state is messed up.
      // Stop building the stack (it's just a nice to have).
    }

    console.reactStack(stack);
  },
  popNonStandardWarningStack: function () {
    if (typeof console.reactStackEnd !== 'function') {
      return;
    }
    console.reactStackEnd();
  }
};

var ReactComponentTreeHook_1 = ReactComponentTreeHook;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

var ReactComponentTreeHook$1;

if (typeof process !== 'undefined' && process.env && "production" === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook$1 = ReactComponentTreeHook_1;
}

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement_1.createFactory;
/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

var ReactDOMFactories_1 = ReactDOMFactories;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var ReactPropTypesSecret$2 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1$2 = ReactPropTypesSecret$2;

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  
}

var checkPropTypes_1 = checkPropTypes;

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    var manualPropTypeCallCache, manualPropTypeWarningCount;

function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1$2) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant_1(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("production" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning_1(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1$2);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1$2);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      void 0;
      return emptyFunction_1.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning_1(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction_1.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1$2) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1$2);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

// React 15.5 references this module, and assumes PropTypes are still callable in production.
// Therefore we re-export development-only version with all the PropTypes checks here.
// However if one is migrating to the `prop-types` npm library, they will go through the
// `index.js` entry point, and it will branch depending on the environment.

var factory_1 = function(isValidElement) {
  // It is still allowed in 15.5.
  var throwOnDirectAccess = false;
  return factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
};

var isValidElement = ReactElement_1.isValidElement;



var ReactPropTypes = factory_1(isValidElement);

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var ReactVersion = '15.6.1';

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

{
  
}

function factory$1(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      Constructor.childContextTypes = index(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      Constructor.contextTypes = index(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      Constructor.propTypes = index({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      invariant_1(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      invariant_1(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      return;
    }

    invariant_1(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    invariant_1(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            invariant_1(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      invariant_1(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isInherited = name in Constructor;
      invariant_1(
        !isInherited,
        'ReactClass: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be ' +
          'due to a mixin.',
        name
      );
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    invariant_1(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        invariant_1(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  index(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject_1;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      invariant_1(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    invariant_1(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

var factory_1$2 = factory$1;

var Component = ReactBaseClasses.Component;

var isValidElement$1 = ReactElement_1.isValidElement;




var createClass = factory_1$2(Component, isValidElement$1, ReactNoopUpdateQueue_1);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement_1.isValidElement(children) ? reactProdInvariant_1('143') : void 0;
  return children;
}

var onlyChild_1 = onlyChild;

var createElement = ReactElement_1.createElement;
var createFactory = ReactElement_1.createFactory;
var cloneElement = ReactElement_1.cloneElement;

var __spread = index;
var createMixin = function (mixin) {
  return mixin;
};

var React = {
  // Modern

  Children: {
    map: ReactChildren_1.map,
    forEach: ReactChildren_1.forEach,
    count: ReactChildren_1.count,
    toArray: ReactChildren_1.toArray,
    only: onlyChild_1
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement_1.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: createClass,
  createFactory: createFactory,
  createMixin: createMixin,

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories_1,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

var React_1 = React;

var react$1 = React_1;

var react_1 = react$1.createElement;
var react_2 = react$1.Component;

var types = new Map();
function setType(fullName, cons) {
    types.set(fullName, cons);
}

var _Symbol = {
    reflection: Symbol("reflection")
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$2 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var NonDeclaredType = function () {
    function NonDeclaredType(kind, definition, generics) {
        classCallCheck(this, NonDeclaredType);

        this.kind = kind;
        this.definition = definition;
        this.generics = generics;
    }

    createClass$2(NonDeclaredType, [{
        key: "Equals",
        value: function Equals(other) {
            if (this.kind === other.kind && this.definition === other.definition) {
                return _typeof(this.generics) === "object" ? equalsRecords(this.generics, other.generics) : this.generics === other.generics;
            }
            return false;
        }
    }]);
    return NonDeclaredType;
}();
var Any = new NonDeclaredType("Any");
var Unit = new NonDeclaredType("Unit");
function Option(t) {
    return new NonDeclaredType("Option", null, [t]);
}
function FableArray(t) {
    var isTypedArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var def = null;
    var genArg = null;
    if (isTypedArray) {
        def = t;
    } else {
        genArg = t;
    }
    return new NonDeclaredType("Array", def, [genArg]);
}
function Tuple(types) {
    return new NonDeclaredType("Tuple", null, types);
}
function FableFunction(types) {
    return new NonDeclaredType("Function", null, types);
}
function GenericParam(definition) {
    return new NonDeclaredType("GenericParam", definition);
}
function Interface(definition) {
    return new NonDeclaredType("Interface", definition);
}
function makeGeneric(typeDef, genArgs) {
    return new NonDeclaredType("GenericType", typeDef, genArgs);
}

/**
 * Returns the parent if this is a declared generic type or the argument otherwise.
 * Attention: Unlike .NET this doesn't throw an exception if type is not generic.
 */

function extendInfo(cons, info) {
    var parent = Object.getPrototypeOf(cons.prototype);
    if (typeof parent[_Symbol.reflection] === "function") {
        var newInfo = {};
        var parentInfo = parent[_Symbol.reflection]();
        Object.getOwnPropertyNames(info).forEach(function (k) {
            var i = info[k];
            if ((typeof i === "undefined" ? "undefined" : _typeof(i)) === "object") {
                newInfo[k] = Array.isArray(i) ? (parentInfo[k] || []).concat(i) : Object.assign(parentInfo[k] || {}, i);
            } else {
                newInfo[k] = i;
            }
        });
        return newInfo;
    }
    return info;
}
function hasInterface(obj, interfaceName) {
    if (interfaceName === "System.Collections.Generic.IEnumerable") {
        return typeof obj[Symbol.iterator] === "function";
    } else if (typeof obj[_Symbol.reflection] === "function") {
        var interfaces = obj[_Symbol.reflection]().interfaces;
        return Array.isArray(interfaces) && interfaces.indexOf(interfaceName) > -1;
    }
    return false;
}
/**
 * Returns:
 * - Records: array with names of fields
 * - Classes: array with names of getters
 * - Nulls and unions: empty array
 * - JS Objects: The result of calling Object.getOwnPropertyNames
 */
function getPropertyNames(obj) {
    if (obj == null) {
        return [];
    }
    var propertyMap = typeof obj[_Symbol.reflection] === "function" ? obj[_Symbol.reflection]().properties || [] : obj;
    return Object.getOwnPropertyNames(propertyMap);
}

function toString(obj) {
    var quoteStrings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    function isObject(x) {
        return x !== null && (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" && !(x instanceof Number) && !(x instanceof String) && !(x instanceof Boolean);
    }
    if (obj == null || typeof obj === "number") {
        return String(obj);
    }
    if (typeof obj === "string") {
        return quoteStrings ? JSON.stringify(obj) : obj;
    }
    if (typeof obj.ToString === "function") {
        return obj.ToString();
    }
    if (hasInterface(obj, "FSharpUnion")) {
        var info = obj[_Symbol.reflection]();
        var uci = info.cases[obj.tag];
        switch (uci.length) {
            case 1:
                return uci[0];
            case 2:
                // For simplicity let's always use parens, in .NET they're ommitted in some cases
                return uci[0] + " (" + toString(obj.data, true) + ")";
            default:
                return uci[0] + " (" + obj.data.map(function (x) {
                    return toString(x, true);
                }).join(",") + ")";
        }
    }
    try {
        return JSON.stringify(obj, function (k, v) {
            return v && v[Symbol.iterator] && !Array.isArray(v) && isObject(v) ? Array.from(v) : v && typeof v.ToString === "function" ? toString(v) : v;
        });
    } catch (err) {
        // Fallback for objects with circular references
        return "{" + Object.getOwnPropertyNames(obj).map(function (k) {
            return k + ": " + String(obj[k]);
        }).join(", ") + "}";
    }
}
function hash(x) {
    if (x != null && typeof x.GetHashCode === "function") {
        return x.GetHashCode();
    } else {
        var s = JSON.stringify(x);
        var h = 5381;
        var i = 0;
        var len = s.length;
        while (i < len) {
            h = h * 33 ^ s.charCodeAt(i++);
        }
        return h;
    }
}
function equals(x, y) {
    // Optimization if they are referencially equal
    if (x === y) {
        return true;
    } else if (x == null) {
        return y == null;
    } else if (y == null) {
        return false;
    } else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y)) {
        return false;
        // Equals override or IEquatable implementation
    } else if (typeof x.Equals === "function") {
        return x.Equals(y);
    } else if (Array.isArray(x)) {
        if (x.length !== y.length) {
            return false;
        }
        for (var i = 0; i < x.length; i++) {
            if (!equals(x[i], y[i])) {
                return false;
            }
        }
        return true;
    } else if (ArrayBuffer.isView(x)) {
        if (x.byteLength !== y.byteLength) {
            return false;
        }
        var dv1 = new DataView(x.buffer);
        var dv2 = new DataView(y.buffer);
        for (var _i = 0; _i < x.byteLength; _i++) {
            if (dv1.getUint8(_i) !== dv2.getUint8(_i)) {
                return false;
            }
        }
        return true;
    } else if (x instanceof Date) {
        return x.getTime() === y.getTime();
    } else {
        return false;
    }
}
function comparePrimitives(x, y) {
    return x === y ? 0 : x < y ? -1 : 1;
}
function compare(x, y) {
    // Optimization if they are referencially equal
    if (x === y) {
        return 0;
    } else if (x == null) {
        return y == null ? 0 : -1;
    } else if (y == null) {
        return 1; // everything is bigger than null
    } else if (Object.getPrototypeOf(x) !== Object.getPrototypeOf(y)) {
        return -1;
        // Some types (see Long.ts) may just implement the function and not the interface
        // else if (hasInterface(x, "System.IComparable"))
    } else if (typeof x.CompareTo === "function") {
        return x.CompareTo(y);
    } else if (Array.isArray(x)) {
        if (x.length !== y.length) {
            return x.length < y.length ? -1 : 1;
        }
        for (var i = 0, j = 0; i < x.length; i++) {
            j = compare(x[i], y[i]);
            if (j !== 0) {
                return j;
            }
        }
        return 0;
    } else if (ArrayBuffer.isView(x)) {
        if (x.byteLength !== y.byteLength) {
            return x.byteLength < y.byteLength ? -1 : 1;
        }
        var dv1 = new DataView(x.buffer);
        var dv2 = new DataView(y.buffer);
        for (var _i2 = 0, b1 = 0, b2 = 0; _i2 < x.byteLength; _i2++) {
            b1 = dv1.getUint8(_i2), b2 = dv2.getUint8(_i2);
            if (b1 < b2) {
                return -1;
            }
            if (b1 > b2) {
                return 1;
            }
        }
        return 0;
    } else if (x instanceof Date) {
        var xtime = x.getTime();
        var ytime = y.getTime();
        return xtime === ytime ? 0 : xtime < ytime ? -1 : 1;
    } else if ((typeof x === "undefined" ? "undefined" : _typeof(x)) === "object") {
        var xhash = hash(x);
        var yhash = hash(y);
        if (xhash === yhash) {
            return equals(x, y) ? 0 : -1;
        } else {
            return xhash < yhash ? -1 : 1;
        }
    } else {
        return x < y ? -1 : 1;
    }
}
function equalsRecords(x, y) {
    // Optimization if they are referencially equal
    if (x === y) {
        return true;
    } else {
        var keys = getPropertyNames(x);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (!equals(x[key], y[key])) {
                    return false;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return true;
    }
}
function compareRecords(x, y) {
    // Optimization if they are referencially equal
    if (x === y) {
        return 0;
    } else {
        var keys = getPropertyNames(x);
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var key = _step2.value;

                var res = compare(x[key], y[key]);
                if (res !== 0) {
                    return res;
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return 0;
    }
}
function equalsUnions(x, y) {
    return x === y || x.tag === y.tag && equals(x.data, y.data);
}
function compareUnions(x, y) {
    if (x === y) {
        return 0;
    } else {
        var res = x.tag < y.tag ? -1 : x.tag > y.tag ? 1 : 0;
        return res !== 0 ? res : compare(x.data, y.data);
    }
}

// tslint forbids non-arrow functions, but it's
// necessary here to use the arguments object
/* tslint:disable */

/* tslint:enable */
var CaseRules = {
    None: 0,
    LowerFirst: 1
};
function isList(o) {
    if (o != null) {
        if (typeof o[_Symbol.reflection] === "function") {
            return o[_Symbol.reflection]().type === "Microsoft.FSharp.Collections.FSharpList";
        }
    }
    return false;
}
function createObj(fields) {
    var caseRule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CaseRules.None;
    var casesCache = arguments[2];

    var iter = fields[Symbol.iterator]();
    var cur = iter.next();
    var o = {};
    while (!cur.done) {
        var value = cur.value;
        if (Array.isArray(value)) {
            o[value[0]] = value[1];
        } else {
            casesCache = casesCache || new Map();
            var proto = Object.getPrototypeOf(value);
            var cases = casesCache.get(proto);
            if (cases == null) {
                if (typeof proto[_Symbol.reflection] === "function") {
                    cases = proto[_Symbol.reflection]().cases;
                    casesCache.set(proto, cases);
                }
            }
            var caseInfo = cases != null ? cases[value.tag] : null;
            if (Array.isArray(caseInfo)) {
                var key = caseInfo[0];
                if (caseRule === CaseRules.LowerFirst) {
                    key = key[0].toLowerCase() + key.substr(1);
                }
                o[key] = caseInfo.length === 1 ? true : isList(value.data) ? createObj(value.data, caseRule, casesCache) : value.data;
            } else {
                throw new Error("Cannot infer key and value of " + value);
            }
        }
        cur = iter.next();
    }
    return o;
}

// This module is split from List.ts to prevent cyclic dependencies
function ofArray(args, base) {
    var acc = base || new List$1();
    for (var i = args.length - 1; i >= 0; i--) {
        acc = new List$1(args[i], acc);
    }
    return acc;
}

var List$1 = function () {
    function List(head, tail) {
        classCallCheck(this, List);

        this.head = head;
        this.tail = tail;
    }

    createClass$2(List, [{
        key: "ToString",
        value: function ToString() {
            return "[" + Array.from(this).map(function (x) {
                return toString(x);
            }).join("; ") + "]";
        }
    }, {
        key: "Equals",
        value: function Equals(x) {
            // Optimization if they are referencially equal
            if (this === x) {
                return true;
            } else {
                var iter1 = this[Symbol.iterator]();
                var iter2 = x[Symbol.iterator]();
                while (true) {
                    var cur1 = iter1.next();
                    var cur2 = iter2.next();
                    if (cur1.done) {
                        return cur2.done ? true : false;
                    } else if (cur2.done) {
                        return false;
                    } else if (!equals(cur1.value, cur2.value)) {
                        return false;
                    }
                }
            }
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(x) {
            // Optimization if they are referencially equal
            if (this === x) {
                return 0;
            } else {
                var acc = 0;
                var iter1 = this[Symbol.iterator]();
                var iter2 = x[Symbol.iterator]();
                while (true) {
                    var cur1 = iter1.next();
                    var cur2 = iter2.next();
                    if (cur1.done) {
                        return cur2.done ? acc : -1;
                    } else if (cur2.done) {
                        return 1;
                    } else {
                        acc = compare(cur1.value, cur2.value);
                        if (acc !== 0) {
                            return acc;
                        }
                    }
                }
            }
        }
    }, {
        key: Symbol.iterator,
        value: function value() {
            var cur = this;
            return {
                next: function next() {
                    var tmp = cur;
                    cur = cur.tail;
                    return { done: tmp.tail == null, value: tmp.head };
                }
            };
        }
        //   append(ys: List<T>): List<T> {
        //     return append(this, ys);
        //   }
        //   choose<U>(f: (x: T) => U, xs: List<T>): List<U> {
        //     return choose(f, this);
        //   }
        //   collect<U>(f: (x: T) => List<U>): List<U> {
        //     return collect(f, this);
        //   }
        //   filter(f: (x: T) => boolean): List<T> {
        //     return filter(f, this);
        //   }
        //   where(f: (x: T) => boolean): List<T> {
        //     return filter(f, this);
        //   }
        //   map<U>(f: (x: T) => U): List<U> {
        //     return map(f, this);
        //   }
        //   mapIndexed<U>(f: (i: number, x: T) => U): List<U> {
        //     return mapIndexed(f, this);
        //   }
        //   partition(f: (x: T) => boolean): [List<T>, List<T>] {
        //     return partition(f, this) as [List<T>, List<T>];
        //   }
        //   reverse(): List<T> {
        //     return reverse(this);
        //   }
        //   slice(lower: number, upper: number): List<T> {
        //     return slice(lower, upper, this);
        //   }

    }, {
        key: _Symbol.reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpList",
                interfaces: ["System.IEquatable", "System.IComparable"]
            };
        }
    }, {
        key: "length",
        get: function get$$1() {
            var cur = this;
            var acc = 0;
            while (cur.tail != null) {
                cur = cur.tail;
                acc++;
            }
            return acc;
        }
    }]);
    return List;
}();

var Comparer = function () {
    function Comparer(f) {
        classCallCheck(this, Comparer);

        this.Compare = f || compare;
    }

    createClass$2(Comparer, [{
        key: _Symbol.reflection,
        value: function value() {
            return { interfaces: ["System.IComparer"] };
        }
    }]);
    return Comparer;
}();

var Enumerator = function () {
    function Enumerator(iter) {
        classCallCheck(this, Enumerator);

        this.iter = iter;
    }

    createClass$2(Enumerator, [{
        key: "MoveNext",
        value: function MoveNext() {
            var cur = this.iter.next();
            this.current = cur.value;
            return !cur.done;
        }
    }, {
        key: "Reset",
        value: function Reset() {
            throw new Error("JS iterators cannot be reset");
        }
    }, {
        key: "Dispose",
        value: function Dispose() {
            return;
        }
    }, {
        key: "Current",
        get: function get$$1() {
            return this.current;
        }
    }]);
    return Enumerator;
}();


function __failIfNone(res) {
    if (res == null) {
        throw new Error("Seq did not contain any matching element");
    }
    return res;
}
function toList(xs) {
    return foldBack$1(function (x, acc) {
        return new List$1(x, acc);
    }, xs, new List$1());
}


function append$1(xs, ys) {
    return delay(function () {
        var firstDone = false;
        var i = xs[Symbol.iterator]();
        var iters = [i, null];
        return unfold(function () {
            var cur = void 0;
            if (!firstDone) {
                cur = iters[0].next();
                if (!cur.done) {
                    return [cur.value, iters];
                } else {
                    firstDone = true;
                    iters = [null, ys[Symbol.iterator]()];
                }
            }
            cur = iters[1].next();
            return !cur.done ? [cur.value, iters] : null;
        }, iters);
    });
}


function concat$1(xs) {
    return delay(function () {
        var iter = xs[Symbol.iterator]();
        var output = { value: null };
        return unfold(function (innerIter) {
            var hasFinished = false;
            while (!hasFinished) {
                if (innerIter == null) {
                    var cur = iter.next();
                    if (!cur.done) {
                        innerIter = cur.value[Symbol.iterator]();
                    } else {
                        hasFinished = true;
                    }
                } else {
                    var _cur = innerIter.next();
                    if (!_cur.done) {
                        output = { value: _cur.value };
                        hasFinished = true;
                    } else {
                        innerIter = null;
                    }
                }
            }
            return innerIter != null && output != null ? [output.value, innerIter] : null;
        }, null);
    });
}
function collect$1(f, xs) {
    return concat$1(map$2(f, xs));
}
function choose$1(f, xs) {
    return delay(function () {
        return unfold(function (iter) {
            var cur = iter.next();
            while (!cur.done) {
                var y = f(cur.value);
                if (y != null) {
                    return [y, iter];
                }
                cur = iter.next();
            }
            return null;
        }, xs[Symbol.iterator]());
    });
}
function compareWith(f, xs, ys) {
    var nonZero = tryFind$1(function (i) {
        return i !== 0;
    }, map2(function (x, y) {
        return f(x, y);
    }, xs, ys));
    return nonZero != null ? nonZero : count(xs) - count(ys);
}
function delay(f) {
    return defineProperty({}, Symbol.iterator, function () {
        return f()[Symbol.iterator]();
    });
}
function empty() {
    return unfold(function () {
        return void 0;
    });
}









function fold$1(f, acc, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
        return xs.reduce(f, acc);
    } else {
        var cur = void 0;
        for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
            cur = iter.next();
            if (cur.done) {
                break;
            }
            acc = f(acc, cur.value, i);
        }
        return acc;
    }
}
function foldBack$1(f, xs, acc) {
    var arr = Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs : Array.from(xs);
    for (var i = arr.length - 1; i >= 0; i--) {
        acc = f(arr[i], acc, i);
    }
    return acc;
}










function iterate$1(f, xs) {
    fold$1(function (_, x) {
        return f(x);
    }, null, xs);
}




function tryLast(xs) {
    try {
        return reduce(function (_, x) {
            return x;
        }, xs);
    } catch (err) {
        return null;
    }
}
function last(xs) {
    return __failIfNone(tryLast(xs));
}
// A export function 'length' method causes problems in JavaScript -- https://github.com/Microsoft/TypeScript/issues/442
function count(xs) {
    return Array.isArray(xs) || ArrayBuffer.isView(xs) ? xs.length : fold$1(function (acc, x) {
        return acc + 1;
    }, 0, xs);
}
function map$2(f, xs) {
    return delay(function () {
        return unfold(function (iter) {
            var cur = iter.next();
            return !cur.done ? [f(cur.value), iter] : null;
        }, xs[Symbol.iterator]());
    });
}


function map2(f, xs, ys) {
    return delay(function () {
        var iter1 = xs[Symbol.iterator]();
        var iter2 = ys[Symbol.iterator]();
        return unfold(function () {
            var cur1 = iter1.next();
            var cur2 = iter2.next();
            return !cur1.done && !cur2.done ? [f(cur1.value, cur2.value), null] : null;
        });
    });
}















function reduce(f, xs) {
    if (Array.isArray(xs) || ArrayBuffer.isView(xs)) {
        return xs.reduce(f);
    }
    var iter = xs[Symbol.iterator]();
    var cur = iter.next();
    if (cur.done) {
        throw new Error("Seq was empty");
    }
    var acc = cur.value;
    while (true) {
        cur = iter.next();
        if (cur.done) {
            break;
        }
        acc = f(acc, cur.value);
    }
    return acc;
}





function singleton$1(y) {
    return unfold(function (x) {
        return x != null ? [x, null] : null;
    }, y);
}









function tryFind$1(f, xs, defaultValue) {
    for (var i = 0, iter = xs[Symbol.iterator]();; i++) {
        var cur = iter.next();
        if (cur.done) {
            return defaultValue === void 0 ? null : defaultValue;
        }
        if (f(cur.value, i)) {
            return cur.value;
        }
    }
}









function unfold(f, acc) {
    return defineProperty({}, Symbol.iterator, function () {
        return {
            next: function next() {
                var res = f(acc);
                if (res != null) {
                    acc = res[1];
                    return { done: false, value: res[0] };
                }
                return { done: true };
            }
        };
    });
}

// ----------------------------------------------
// These functions belong to Seq.ts but are
// implemented here to prevent cyclic dependencies


var MapTree = function MapTree(tag, data) {
    classCallCheck(this, MapTree);

    this.tag = tag | 0;
    this.data = data;
};
function tree_sizeAux(acc, m) {
    sizeAux: while (true) {
        if (m.tag === 1) {
            return acc + 1 | 0;
        } else if (m.tag === 2) {
            acc = tree_sizeAux(acc + 1, m.data[2]);
            m = m.data[3];
            continue sizeAux;
        } else {
            return acc | 0;
        }
    }
}
function tree_size(x) {
    return tree_sizeAux(0, x);
}
function tree_empty() {
    return new MapTree(0);
}
function tree_height(_arg1) {
    return _arg1.tag === 1 ? 1 : _arg1.tag === 2 ? _arg1.data[4] : 0;
}
function tree_mk(l, k, v, r) {
    var matchValue = l.tag === 0 ? r.tag === 0 ? 0 : 1 : 1;
    switch (matchValue) {
        case 0:
            return new MapTree(1, [k, v]);
        case 1:
            var hl = tree_height(l) | 0;
            var hr = tree_height(r) | 0;
            var m = (hl < hr ? hr : hl) | 0;
            return new MapTree(2, [k, v, l, r, m + 1]);
    }
    throw new Error("internal error: Map.tree_mk");
}
function tree_rebalance(t1, k, v, t2) {
    var t1h = tree_height(t1);
    var t2h = tree_height(t2);
    if (t2h > t1h + 2) {
        if (t2.tag === 2) {
            if (tree_height(t2.data[2]) > t1h + 1) {
                if (t2.data[2].tag === 2) {
                    return tree_mk(tree_mk(t1, k, v, t2.data[2].data[2]), t2.data[2].data[0], t2.data[2].data[1], tree_mk(t2.data[2].data[3], t2.data[0], t2.data[1], t2.data[3]));
                } else {
                    throw new Error("rebalance");
                }
            } else {
                return tree_mk(tree_mk(t1, k, v, t2.data[2]), t2.data[0], t2.data[1], t2.data[3]);
            }
        } else {
            throw new Error("rebalance");
        }
    } else {
        if (t1h > t2h + 2) {
            if (t1.tag === 2) {
                if (tree_height(t1.data[3]) > t2h + 1) {
                    if (t1.data[3].tag === 2) {
                        return tree_mk(tree_mk(t1.data[2], t1.data[0], t1.data[1], t1.data[3].data[2]), t1.data[3].data[0], t1.data[3].data[1], tree_mk(t1.data[3].data[3], k, v, t2));
                    } else {
                        throw new Error("rebalance");
                    }
                } else {
                    return tree_mk(t1.data[2], t1.data[0], t1.data[1], tree_mk(t1.data[3], k, v, t2));
                }
            } else {
                throw new Error("rebalance");
            }
        } else {
            return tree_mk(t1, k, v, t2);
        }
    }
}
function tree_add(comparer, k, v, m) {
    if (m.tag === 1) {
        var c = comparer.Compare(k, m.data[0]);
        if (c < 0) {
            return new MapTree(2, [k, v, new MapTree(0), m, 2]);
        } else if (c === 0) {
            return new MapTree(1, [k, v]);
        }
        return new MapTree(2, [k, v, m, new MapTree(0), 2]);
    } else if (m.tag === 2) {
        var _c = comparer.Compare(k, m.data[0]);
        if (_c < 0) {
            return tree_rebalance(tree_add(comparer, k, v, m.data[2]), m.data[0], m.data[1], m.data[3]);
        } else if (_c === 0) {
            return new MapTree(2, [k, v, m.data[2], m.data[3], m.data[4]]);
        }
        return tree_rebalance(m.data[2], m.data[0], m.data[1], tree_add(comparer, k, v, m.data[3]));
    }
    return new MapTree(1, [k, v]);
}
function tree_find(comparer, k, m) {
    var res = tree_tryFind(comparer, k, m);
    if (res != null) {
        return res;
    }
    throw new Error("key not found");
}
function tree_tryFind(comparer, k, m) {
    tryFind: while (true) {
        if (m.tag === 1) {
            var c = comparer.Compare(k, m.data[0]) | 0;
            if (c === 0) {
                return m.data[1];
            } else {
                return null;
            }
        } else if (m.tag === 2) {
            var c_1 = comparer.Compare(k, m.data[0]) | 0;
            if (c_1 < 0) {
                comparer = comparer;
                k = k;
                m = m.data[2];
                continue tryFind;
            } else if (c_1 === 0) {
                return m.data[1];
            } else {
                comparer = comparer;
                k = k;
                m = m.data[3];
                continue tryFind;
            }
        } else {
            return null;
        }
    }
}
function tree_spliceOutSuccessor(m) {
    if (m.tag === 1) {
        return [m.data[0], m.data[1], new MapTree(0)];
    } else if (m.tag === 2) {
        if (m.data[2].tag === 0) {
            return [m.data[0], m.data[1], m.data[3]];
        } else {
            var kvl = tree_spliceOutSuccessor(m.data[2]);
            return [kvl[0], kvl[1], tree_mk(kvl[2], m.data[0], m.data[1], m.data[3])];
        }
    }
    throw new Error("internal error: Map.spliceOutSuccessor");
}
function tree_remove(comparer, k, m) {
    if (m.tag === 1) {
        var c = comparer.Compare(k, m.data[0]);
        if (c === 0) {
            return new MapTree(0);
        } else {
            return m;
        }
    } else if (m.tag === 2) {
        var _c2 = comparer.Compare(k, m.data[0]);
        if (_c2 < 0) {
            return tree_rebalance(tree_remove(comparer, k, m.data[2]), m.data[0], m.data[1], m.data[3]);
        } else if (_c2 === 0) {
            if (m.data[2].tag === 0) {
                return m.data[3];
            } else {
                if (m.data[3].tag === 0) {
                    return m.data[2];
                } else {
                    var input = tree_spliceOutSuccessor(m.data[3]);
                    return tree_mk(m.data[2], input[0], input[1], input[2]);
                }
            }
        } else {
            return tree_rebalance(m.data[2], m.data[0], m.data[1], tree_remove(comparer, k, m.data[3]));
        }
    } else {
        return tree_empty();
    }
}
function tree_mem(comparer, k, m) {
    mem: while (true) {
        if (m.tag === 1) {
            return comparer.Compare(k, m.data[0]) === 0;
        } else if (m.tag === 2) {
            var c = comparer.Compare(k, m.data[0]) | 0;
            if (c < 0) {
                comparer = comparer;
                k = k;
                m = m.data[2];
                continue mem;
            } else if (c === 0) {
                return true;
            } else {
                comparer = comparer;
                k = k;
                m = m.data[3];
                continue mem;
            }
        } else {
            return false;
        }
    }
}
// function tree_foldFromTo(
//     comparer: IComparer<any>, lo: any, hi: any,
//     f: (k:any, v: any, acc: any) => any, m: MapTree, x: any): any {
//   if (m.tag === 1) {
//     var cLoKey = comparer.Compare(lo, m.data[0]);
//     var cKeyHi = comparer.Compare(m.data[0], hi);
//     var x_1 = (cLoKey <= 0 ? cKeyHi <= 0 : false) ? f(m.data[0], m.data[1], x) : x;
//     return x_1;
//   } else if (m.tag === 2) {
//     var cLoKey = comparer.Compare(lo, m.data[0]);
//     var cKeyHi = comparer.Compare(m.data[0], hi);
//     var x_1 = cLoKey < 0 ? tree_foldFromTo(comparer, lo, hi, f, m.data[2], x) : x;
//     var x_2 = (cLoKey <= 0 ? cKeyHi <= 0 : false) ? f(m.data[0], m.data[1], x_1) : x_1;
//     var x_3 = cKeyHi < 0 ? tree_foldFromTo(comparer, lo, hi, f, m.data[3], x_2) : x_2;
//     return x_3;
//   }
//   return x;
// }
// function tree_foldSection(
//     comparer: IComparer<any>, lo: any, hi: any,
//     f: (k: any, v: any, acc: any) => any, m: MapTree, x: any) {
//   return comparer.Compare(lo, hi) === 1 ? x : tree_foldFromTo(comparer, lo, hi, f, m, x);
// }
// function tree_loop(m: MapTree, acc: any): List<[any,any]> {
//   return m.tag === 1
//     ? new List([m.data[0], m.data[1]], acc)
//     : m.tag === 2
//       ? tree_loop(m.data[2], new List([m.data[0], m.data[1]], tree_loop(m.data[3], acc)))
//       : acc;
// }
// function tree_toList(m: MapTree) {
//   return tree_loop(m, new List());
// }
// function tree_toArray(m: MapTree) {
//   return Array.from(tree_toList(m));
// }
// function tree_ofList(comparer: IComparer<any>, l: List<[any,any]>) {
//   return Seq.fold((acc: MapTree, tupledArg: [any, any]) => {
//     return tree_add(comparer, tupledArg[0], tupledArg[1], acc);
//   }, tree_empty(), l);
// }
function tree_mkFromEnumerator(comparer, acc, e) {
    var cur = e.next();
    while (!cur.done) {
        acc = tree_add(comparer, cur.value[0], cur.value[1], acc);
        cur = e.next();
    }
    return acc;
}
// function tree_ofArray(comparer: IComparer<any>, arr: ArrayLike<[any,any]>) {
//   var res = tree_empty();
//   for (var i = 0; i <= arr.length - 1; i++) {
//     res = tree_add(comparer, arr[i][0], arr[i][1], res);
//   }
//   return res;
// }
function tree_ofSeq(comparer, c) {
    var ie = c[Symbol.iterator]();
    return tree_mkFromEnumerator(comparer, tree_empty(), ie);
}
// function tree_copyToArray(s: MapTree, arr: ArrayLike<any>, i: number) {
//   tree_iter((x, y) => { arr[i++] = [x, y]; }, s);
// }
function tree_collapseLHS(stack) {
    if (stack.tail != null) {
        if (stack.head.tag === 1) {
            return stack;
        } else if (stack.head.tag === 2) {
            return tree_collapseLHS(ofArray([stack.head.data[2], new MapTree(1, [stack.head.data[0], stack.head.data[1]]), stack.head.data[3]], stack.tail));
        } else {
            return tree_collapseLHS(stack.tail);
        }
    } else {
        return new List$1();
    }
}
function tree_mkIterator(s) {
    return { stack: tree_collapseLHS(new List$1(s, new List$1())), started: false };
}
function tree_moveNext(i) {
    function current(it) {
        if (it.stack.tail == null) {
            return null;
        } else if (it.stack.head.tag === 1) {
            return [it.stack.head.data[0], it.stack.head.data[1]];
        }
        throw new Error("Please report error: Map iterator, unexpected stack for current");
    }
    if (i.started) {
        if (i.stack.tail == null) {
            return { done: true, value: null };
        } else {
            if (i.stack.head.tag === 1) {
                i.stack = tree_collapseLHS(i.stack.tail);
                return {
                    done: i.stack.tail == null,
                    value: current(i)
                };
            } else {
                throw new Error("Please report error: Map iterator, unexpected stack for moveNext");
            }
        }
    } else {
        i.started = true;
        return {
            done: i.stack.tail == null,
            value: current(i)
        };
    }
}

var FableMap = function () {
    /** Do not call, use Map.create instead. */
    function FableMap() {
        classCallCheck(this, FableMap);
        return;
    }

    createClass$2(FableMap, [{
        key: "ToString",
        value: function ToString() {
            return "map [" + Array.from(this).map(function (x) {
                return toString(x);
            }).join("; ") + "]";
        }
    }, {
        key: "Equals",
        value: function Equals(m2) {
            return this.CompareTo(m2) === 0;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(m2) {
            var _this = this;

            return this === m2 ? 0 : compareWith(function (kvp1, kvp2) {
                var c = _this.comparer.Compare(kvp1[0], kvp2[0]);
                return c !== 0 ? c : compare(kvp1[1], kvp2[1]);
            }, this, m2);
        }
    }, {
        key: Symbol.iterator,
        value: function value() {
            var i = tree_mkIterator(this.tree);
            return {
                next: function next() {
                    return tree_moveNext(i);
                }
            };
        }
    }, {
        key: "entries",
        value: function entries() {
            return this[Symbol.iterator]();
        }
    }, {
        key: "keys",
        value: function keys() {
            return map$2(function (kv) {
                return kv[0];
            }, this);
        }
    }, {
        key: "values",
        value: function values() {
            return map$2(function (kv) {
                return kv[1];
            }, this);
        }
    }, {
        key: "get",
        value: function get$$1(k) {
            return tree_find(this.comparer, k, this.tree);
        }
    }, {
        key: "has",
        value: function has(k) {
            return tree_mem(this.comparer, k, this.tree);
        }
        /** Mutating method */

    }, {
        key: "set",
        value: function set$$1(k, v) {
            this.tree = tree_add(this.comparer, k, v, this.tree);
        }
        /** Mutating method */

    }, {
        key: "delete",
        value: function _delete(k) {
            // TODO: Is calculating the size twice is more performant than calling tree_mem?
            var oldSize = tree_size(this.tree);
            this.tree = tree_remove(this.comparer, k, this.tree);
            return oldSize > tree_size(this.tree);
        }
        /** Mutating method */

    }, {
        key: "clear",
        value: function clear() {
            this.tree = tree_empty();
        }
    }, {
        key: _Symbol.reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpMap",
                interfaces: ["System.IEquatable", "System.IComparable", "System.Collections.Generic.IDictionary"]
            };
        }
    }, {
        key: "size",
        get: function get$$1() {
            return tree_size(this.tree);
        }
    }]);
    return FableMap;
}();

function from(comparer, tree) {
    var map = new FableMap();
    map.tree = tree;
    map.comparer = comparer || new Comparer();
    return map;
}
function create(ie, comparer) {
    comparer = comparer || new Comparer();
    return from(comparer, ie ? tree_ofSeq(comparer, ie) : tree_empty());
}






function tryFind(k, map) {
    return tree_tryFind(map.comparer, k, map.tree);
}

function append(xs, ys) {
    return fold$1(function (acc, x) {
        return new List$1(x, acc);
    }, ys, reverse(xs));
}

function collect(f, xs) {
    return fold$1(function (acc, x) {
        return append(acc, f(x));
    }, new List$1(), xs);
}
// TODO: should be xs: Iterable<List<T>>
function concat(xs) {
    return collect(function (x) {
        return x;
    }, xs);
}
function filter(f, xs) {
    return reverse(fold$1(function (acc, x) {
        return f(x) ? new List$1(x, acc) : acc;
    }, new List$1(), xs));
}


function map(f, xs) {
    return reverse(fold$1(function (acc, x) {
        return new List$1(f(x), acc);
    }, new List$1(), xs));
}




function reverse(xs) {
    return fold$1(function (acc, x) {
        return new List$1(x, acc);
    }, new List$1(), xs);
}


/* ToDo: instance unzip() */

/* ToDo: instance unzip3() */

var Props = function (__exports) {
  var CSSProp = __exports.CSSProp = function () {
    function CSSProp(tag, data) {
      babelHelpers.classCallCheck(this, CSSProp);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(CSSProp, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Fable.Helpers.React.Props.CSSProp",
          interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.React.Props.ICSSProp"],
          cases: [["BoxFlex", "number"], ["BoxFlexGroup", "number"], ["ColumnCount", "number"], ["Flex", Any], ["FlexGrow", "number"], ["FlexShrink", "number"], ["FontWeight", Any], ["LineClamp", "number"], ["LineHeight", Any], ["Opacity", "number"], ["Order", "number"], ["Orphans", "number"], ["Widows", "number"], ["ZIndex", "number"], ["Zoom", "number"], ["FontSize", Any], ["FillOpacity", "number"], ["StrokeOpacity", "number"], ["StrokeWidth", "number"], ["AlignContent", Any], ["AlignItems", Any], ["AlignSelf", Any], ["AlignmentAdjust", Any], ["AlignmentBaseline", Any], ["AnimationDelay", Any], ["AnimationDirection", Any], ["AnimationIterationCount", Any], ["AnimationName", Any], ["AnimationPlayState", Any], ["Appearance", Any], ["BackfaceVisibility", Any], ["BackgroundBlendMode", Any], ["BackgroundColor", Any], ["BackgroundComposite", Any], ["BackgroundImage", Any], ["BackgroundOrigin", Any], ["BackgroundPositionX", Any], ["BackgroundRepeat", Any], ["BaselineShift", Any], ["Behavior", Any], ["Border", Any], ["BorderBottomLeftRadius", Any], ["BorderBottomRightRadius", Any], ["BorderBottomWidth", Any], ["BorderCollapse", Any], ["BorderColor", Any], ["BorderCornerShape", Any], ["BorderImageSource", Any], ["BorderImageWidth", Any], ["BorderLeft", Any], ["BorderLeftColor", Any], ["BorderLeftStyle", Any], ["BorderLeftWidth", Any], ["BorderRight", Any], ["BorderRightColor", Any], ["BorderRightStyle", Any], ["BorderRightWidth", Any], ["BorderSpacing", Any], ["BorderStyle", Any], ["BorderTop", Any], ["BorderTopColor", Any], ["BorderTopLeftRadius", Any], ["BorderTopRightRadius", Any], ["BorderTopStyle", Any], ["BorderTopWidth", Any], ["BorderWidth", Any], ["Bottom", Any], ["BoxAlign", Any], ["BoxDecorationBreak", Any], ["BoxDirection", Any], ["BoxLineProgression", Any], ["BoxLines", Any], ["BoxOrdinalGroup", Any], ["BreakAfter", Any], ["BreakBefore", Any], ["BreakInside", Any], ["Clear", Any], ["Clip", Any], ["ClipRule", Any], ["Color", Any], ["ColumnFill", Any], ["ColumnGap", Any], ["ColumnRule", Any], ["ColumnRuleColor", Any], ["ColumnRuleWidth", Any], ["ColumnSpan", Any], ["ColumnWidth", Any], ["Columns", Any], ["CounterIncrement", Any], ["CounterReset", Any], ["Cue", Any], ["CueAfter", Any], ["Direction", Any], ["Display", Any], ["Fill", Any], ["FillRule", Any], ["Filter", Any], ["FlexAlign", Any], ["FlexBasis", Any], ["FlexDirection", Any], ["FlexFlow", Any], ["FlexItemAlign", Any], ["FlexLinePack", Any], ["FlexOrder", Any], ["FlexWrap", Any], ["Float", Any], ["FlowFrom", Any], ["Font", Any], ["FontFamily", Any], ["FontKerning", Any], ["FontSizeAdjust", Any], ["FontStretch", Any], ["FontStyle", Any], ["FontSynthesis", Any], ["FontVariant", Any], ["FontVariantAlternates", Any], ["GridArea", Any], ["GridColumn", Any], ["GridColumnEnd", Any], ["GridColumnStart", Any], ["GridRow", Any], ["GridRowEnd", Any], ["GridRowPosition", Any], ["GridRowSpan", Any], ["GridTemplateAreas", Any], ["GridTemplateColumns", Any], ["GridTemplateRows", Any], ["Height", Any], ["HyphenateLimitChars", Any], ["HyphenateLimitLines", Any], ["HyphenateLimitZone", Any], ["Hyphens", Any], ["ImeMode", Any], ["JustifyContent", Any], ["LayoutGrid", Any], ["LayoutGridChar", Any], ["LayoutGridLine", Any], ["LayoutGridMode", Any], ["LayoutGridType", Any], ["Left", Any], ["LetterSpacing", Any], ["LineBreak", Any], ["ListStyle", Any], ["ListStyleImage", Any], ["ListStylePosition", Any], ["ListStyleType", Any], ["Margin", Any], ["MarginBottom", Any], ["MarginLeft", Any], ["MarginRight", Any], ["MarginTop", Any], ["MarqueeDirection", Any], ["MarqueeStyle", Any], ["Mask", Any], ["MaskBorder", Any], ["MaskBorderRepeat", Any], ["MaskBorderSlice", Any], ["MaskBorderSource", Any], ["MaskBorderWidth", Any], ["MaskClip", Any], ["MaskOrigin", Any], ["MaxFontSize", Any], ["MaxHeight", Any], ["MaxWidth", Any], ["MinHeight", Any], ["MinWidth", Any], ["Outline", Any], ["OutlineColor", Any], ["OutlineOffset", Any], ["Overflow", Any], ["OverflowStyle", Any], ["OverflowX", Any], ["Padding", Any], ["PaddingBottom", Any], ["PaddingLeft", Any], ["PaddingRight", Any], ["PaddingTop", Any], ["PageBreakAfter", Any], ["PageBreakBefore", Any], ["PageBreakInside", Any], ["Pause", Any], ["PauseAfter", Any], ["PauseBefore", Any], ["Perspective", Any], ["PerspectiveOrigin", Any], ["PointerEvents", Any], ["Position", Any], ["PunctuationTrim", Any], ["Quotes", Any], ["RegionFragment", Any], ["RestAfter", Any], ["RestBefore", Any], ["Right", Any], ["RubyAlign", Any], ["RubyPosition", Any], ["ShapeImageThreshold", Any], ["ShapeInside", Any], ["ShapeMargin", Any], ["ShapeOutside", Any], ["Speak", Any], ["SpeakAs", Any], ["TabSize", Any], ["TableLayout", Any], ["TextAlign", Any], ["TextAlignLast", Any], ["TextDecoration", Any], ["TextDecorationColor", Any], ["TextDecorationLine", Any], ["TextDecorationLineThrough", Any], ["TextDecorationNone", Any], ["TextDecorationOverline", Any], ["TextDecorationSkip", Any], ["TextDecorationStyle", Any], ["TextDecorationUnderline", Any], ["TextEmphasis", Any], ["TextEmphasisColor", Any], ["TextEmphasisStyle", Any], ["TextHeight", Any], ["TextIndent", Any], ["TextJustifyTrim", Any], ["TextKashidaSpace", Any], ["TextLineThrough", Any], ["TextLineThroughColor", Any], ["TextLineThroughMode", Any], ["TextLineThroughStyle", Any], ["TextLineThroughWidth", Any], ["TextOverflow", Any], ["TextOverline", Any], ["TextOverlineColor", Any], ["TextOverlineMode", Any], ["TextOverlineStyle", Any], ["TextOverlineWidth", Any], ["TextRendering", Any], ["TextScript", Any], ["TextShadow", Any], ["TextTransform", Any], ["TextUnderlinePosition", Any], ["TextUnderlineStyle", Any], ["Top", Any], ["TouchAction", Any], ["Transform", Any], ["TransformOrigin", Any], ["TransformOriginZ", Any], ["TransformStyle", Any], ["Transition", Any], ["TransitionDelay", Any], ["TransitionDuration", Any], ["TransitionProperty", Any], ["TransitionTimingFunction", Any], ["UnicodeBidi", Any], ["UnicodeRange", Any], ["UserFocus", Any], ["UserInput", Any], ["VerticalAlign", Any], ["Visibility", Any], ["VoiceBalance", Any], ["VoiceDuration", Any], ["VoiceFamily", Any], ["VoicePitch", Any], ["VoiceRange", Any], ["VoiceRate", Any], ["VoiceStress", Any], ["VoiceVolume", Any], ["WhiteSpace", Any], ["WhiteSpaceTreatment", Any], ["Width", Any], ["WordBreak", Any], ["WordSpacing", Any], ["WordWrap", Any], ["WrapFlow", Any], ["WrapMargin", Any], ["WrapOption", Any], ["WritingMode", Any]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }]);
    return CSSProp;
  }();

  setType("Fable.Helpers.React.Props.CSSProp", CSSProp);

  var Prop = __exports.Prop = function () {
    function Prop(tag, data) {
      babelHelpers.classCallCheck(this, Prop);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(Prop, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Fable.Helpers.React.Props.Prop",
          interfaces: ["FSharpUnion", "Fable.Helpers.React.Props.IHTMLProp"],
          cases: [["Key", "string"], ["Ref", FableFunction([Interface("Fable.Import.Browser.Element"), Unit])]]
        };
      }
    }]);
    return Prop;
  }();

  setType("Fable.Helpers.React.Props.Prop", Prop);

  var DOMAttr = __exports.DOMAttr = function () {
    function DOMAttr(tag, data) {
      babelHelpers.classCallCheck(this, DOMAttr);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(DOMAttr, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Fable.Helpers.React.Props.DOMAttr",
          interfaces: ["FSharpUnion", "Fable.Helpers.React.Props.IHTMLProp"],
          cases: [["DangerouslySetInnerHTML", Any], ["OnCopy", FableFunction([Interface("Fable.Import.React.ClipboardEvent"), Unit])], ["OnCut", FableFunction([Interface("Fable.Import.React.ClipboardEvent"), Unit])], ["OnPaste", FableFunction([Interface("Fable.Import.React.ClipboardEvent"), Unit])], ["OnCompositionEnd", FableFunction([Interface("Fable.Import.React.CompositionEvent"), Unit])], ["OnCompositionStart", FableFunction([Interface("Fable.Import.React.CompositionEvent"), Unit])], ["OnCompositionUpdate", FableFunction([Interface("Fable.Import.React.CompositionEvent"), Unit])], ["OnFocus", FableFunction([Interface("Fable.Import.React.FocusEvent"), Unit])], ["OnBlur", FableFunction([Interface("Fable.Import.React.FocusEvent"), Unit])], ["OnChange", FableFunction([Interface("Fable.Import.React.FormEvent"), Unit])], ["OnInput", FableFunction([Interface("Fable.Import.React.FormEvent"), Unit])], ["OnSubmit", FableFunction([Interface("Fable.Import.React.FormEvent"), Unit])], ["OnLoad", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnError", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnKeyDown", FableFunction([Interface("Fable.Import.React.KeyboardEvent"), Unit])], ["OnKeyPress", FableFunction([Interface("Fable.Import.React.KeyboardEvent"), Unit])], ["OnKeyUp", FableFunction([Interface("Fable.Import.React.KeyboardEvent"), Unit])], ["OnAbort", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnCanPlay", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnCanPlayThrough", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnDurationChange", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnEmptied", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnEncrypted", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnEnded", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnLoadedData", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnLoadedMetadata", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnLoadStart", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnPause", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnPlay", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnPlaying", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnProgress", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnRateChange", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnSeeked", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnSeeking", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnStalled", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnSuspend", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnTimeUpdate", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnVolumeChange", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnWaiting", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnClick", FableFunction([Interface("Fable.Import.React.MouseEvent"), Unit])], ["OnContextMenu", FableFunction([Interface("Fable.Import.React.MouseEvent"), Unit])], ["OnDoubleClick", FableFunction([Interface("Fable.Import.React.MouseEvent"), Unit])], ["OnDrag", FableFunction([Interface("Fable.Import.React.DragEvent"), Unit])], ["OnDragEnd", FableFunction([Interface("Fable.Import.React.DragEvent"), Unit])], ["OnDragEnter", FableFunction([Interface("Fable.Import.React.DragEvent"), Unit])], ["OnDragExit", FableFunction([Interface("Fable.Import.React.DragEvent"), Unit])], ["OnDragLeave", FableFunction([Interface("Fable.Import.React.DragEvent"), Unit])], ["OnDragOver", FableFunction([Interface("Fable.Import.React.DragEvent"), Unit])], ["OnDragStart", FableFunction([Interface("Fable.Import.React.DragEvent"), Unit])], ["OnDrop", FableFunction([Interface("Fable.Import.React.DragEvent"), Unit])], ["OnMouseDown", FableFunction([Interface("Fable.Import.React.MouseEvent"), Unit])], ["OnMouseEnter", FableFunction([Interface("Fable.Import.React.MouseEvent"), Unit])], ["OnMouseLeave", FableFunction([Interface("Fable.Import.React.MouseEvent"), Unit])], ["OnMouseMove", FableFunction([Interface("Fable.Import.React.MouseEvent"), Unit])], ["OnMouseOut", FableFunction([Interface("Fable.Import.React.MouseEvent"), Unit])], ["OnMouseOver", FableFunction([Interface("Fable.Import.React.MouseEvent"), Unit])], ["OnMouseUp", FableFunction([Interface("Fable.Import.React.MouseEvent"), Unit])], ["OnSelect", FableFunction([Interface("Fable.Import.React.SyntheticEvent"), Unit])], ["OnTouchCancel", FableFunction([Interface("Fable.Import.React.TouchEvent"), Unit])], ["OnTouchEnd", FableFunction([Interface("Fable.Import.React.TouchEvent"), Unit])], ["OnTouchMove", FableFunction([Interface("Fable.Import.React.TouchEvent"), Unit])], ["OnTouchStart", FableFunction([Interface("Fable.Import.React.TouchEvent"), Unit])], ["OnScroll", FableFunction([Interface("Fable.Import.React.UIEvent"), Unit])], ["OnWheel", FableFunction([Interface("Fable.Import.React.WheelEvent"), Unit])]]
        };
      }
    }]);
    return DOMAttr;
  }();

  setType("Fable.Helpers.React.Props.DOMAttr", DOMAttr);

  var HTMLAttr = __exports.HTMLAttr = function () {
    function HTMLAttr(tag, data) {
      babelHelpers.classCallCheck(this, HTMLAttr);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(HTMLAttr, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Fable.Helpers.React.Props.HTMLAttr",
          interfaces: ["FSharpUnion", "System.IEquatable", "Fable.Helpers.React.Props.IHTMLProp"],
          cases: [["DefaultChecked", "boolean"], ["DefaultValue", Any], ["Accept", "string"], ["AcceptCharset", "string"], ["AccessKey", "string"], ["Action", "string"], ["AllowFullScreen", "boolean"], ["AllowTransparency", "boolean"], ["Alt", "string"], ["aria-haspopup", "boolean"], ["aria-expanded", "boolean"], ["Async", "boolean"], ["AutoComplete", "string"], ["AutoFocus", "boolean"], ["AutoPlay", "boolean"], ["Capture", "boolean"], ["CellPadding", Any], ["CellSpacing", Any], ["CharSet", "string"], ["Challenge", "string"], ["Checked", "boolean"], ["ClassID", "string"], ["ClassName", "string"], ["Cols", "number"], ["ColSpan", "number"], ["Content", "string"], ["ContentEditable", "boolean"], ["ContextMenu", "string"], ["Controls", "boolean"], ["Coords", "string"], ["CrossOrigin", "string"], ["Data", "string"], ["data-toggle", "string"], ["DateTime", "string"], ["Default", "boolean"], ["Defer", "boolean"], ["Dir", "string"], ["Disabled", "boolean"], ["Download", Any], ["Draggable", "boolean"], ["EncType", "string"], ["Form", "string"], ["FormAction", "string"], ["FormEncType", "string"], ["FormMethod", "string"], ["FormNoValidate", "boolean"], ["FormTarget", "string"], ["FrameBorder", Any], ["Headers", "string"], ["Hidden", "boolean"], ["High", "number"], ["Href", "string"], ["HrefLang", "string"], ["HtmlFor", "string"], ["HttpEquiv", "string"], ["Icon", "string"], ["Id", "string"], ["InputMode", "string"], ["Integrity", "string"], ["Is", "string"], ["KeyParams", "string"], ["KeyType", "string"], ["Kind", "string"], ["Label", "string"], ["Lang", "string"], ["List", "string"], ["Loop", "boolean"], ["Low", "number"], ["Manifest", "string"], ["MarginHeight", "number"], ["MarginWidth", "number"], ["Max", Any], ["MaxLength", "number"], ["Media", "string"], ["MediaGroup", "string"], ["Method", "string"], ["Min", Any], ["MinLength", "number"], ["Multiple", "boolean"], ["Muted", "boolean"], ["Name", "string"], ["NoValidate", "boolean"], ["Open", "boolean"], ["Optimum", "number"], ["Pattern", "string"], ["Placeholder", "string"], ["Poster", "string"], ["Preload", "string"], ["RadioGroup", "string"], ["ReadOnly", "boolean"], ["Rel", "string"], ["Required", "boolean"], ["Role", "string"], ["Rows", "number"], ["RowSpan", "number"], ["Sandbox", "string"], ["Scope", "string"], ["Scoped", "boolean"], ["Scrolling", "string"], ["Seamless", "boolean"], ["Selected", "boolean"], ["Shape", "string"], ["Size", "number"], ["Sizes", "string"], ["Span", "number"], ["SpellCheck", "boolean"], ["Src", "string"], ["SrcDoc", "string"], ["SrcLang", "string"], ["SrcSet", "string"], ["Start", "number"], ["Step", Any], ["Summary", "string"], ["TabIndex", "number"], ["Target", "string"], ["Title", "string"], ["Type", "string"], ["UseMap", "string"], ["Value", Any], ["Width", Any], ["Wmode", "string"], ["Wrap", "string"], ["About", "string"], ["Datatype", "string"], ["Inlist", Any], ["Prefix", "string"], ["Property", "string"], ["Resource", "string"], ["Typeof", "string"], ["Vocab", "string"], ["AutoCapitalize", "string"], ["AutoCorrect", "string"], ["AutoSave", "string"], ["ItemProp", "string"], ["ItemScope", "boolean"], ["ItemType", "string"], ["ItemID", "string"], ["ItemRef", "string"], ["Results", "number"], ["Security", "string"], ["Unselectable", "boolean"]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }]);
    return HTMLAttr;
  }();

  setType("Fable.Helpers.React.Props.HTMLAttr", HTMLAttr);

  var SVGAttr = __exports.SVGAttr = function () {
    function SVGAttr(tag, data) {
      babelHelpers.classCallCheck(this, SVGAttr);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(SVGAttr, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Fable.Helpers.React.Props.SVGAttr",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable", "Fable.Helpers.React.Props.IProp"],
          cases: [["ClipPath", "string"], ["Cx", Any], ["Cy", Any], ["D", "string"], ["Dx", Any], ["Dy", Any], ["Fill", "string"], ["FillOpacity", Any], ["FontFamily", "string"], ["FontSize", Any], ["Fx", Any], ["Fy", Any], ["GradientTransform", "string"], ["GradientUnits", "string"], ["MarkerEnd", "string"], ["MarkerMid", "string"], ["MarkerStart", "string"], ["Offset", Any], ["Opacity", Any], ["PatternContentUnits", "string"], ["PatternUnits", "string"], ["Points", "string"], ["PreserveAspectRatio", "string"], ["R", Any], ["Rx", Any], ["Ry", Any], ["SpreadMethod", "string"], ["StopColor", "string"], ["StopOpacity", Any], ["Stroke", "string"], ["StrokeDasharray", "string"], ["StrokeLinecap", "string"], ["StrokeMiterlimit", "string"], ["StrokeOpacity", Any], ["StrokeWidth", Any], ["TextAnchor", "string"], ["Transform", "string"], ["Version", "string"], ["ViewBox", "string"], ["X1", Any], ["X2", Any], ["X", Any], ["XlinkActuate", "string"], ["XlinkArcrole", "string"], ["XlinkHref", "string"], ["XlinkRole", "string"], ["XlinkShow", "string"], ["XlinkTitle", "string"], ["XlinkType", "string"], ["XmlBase", "string"], ["XmlLang", "string"], ["XmlSpace", "string"], ["Y1", Any], ["Y2", Any], ["Y", Any]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return compareUnions(this, other) | 0;
      }
    }]);
    return SVGAttr;
  }();

  setType("Fable.Helpers.React.Props.SVGAttr", SVGAttr);
  return __exports;
}({});

function classBaseList(std, classes) {
  return new Props.HTMLAttr(22, function () {
    var folder = function folder(complete, _arg1) {
      if (_arg1[1]) {
        return complete + " " + _arg1[0];
      } else {
        return complete;
      }
    };

    return function (list) {
      return fold$1(folder, std, list);
    };
  }()(classes));
}
function classList(classes) {
  return classBaseList("", classes);
}

var Elements = function () {
  function Elements(tag, data) {
    babelHelpers.classCallCheck(this, Elements);
    this.tag = tag;
    this.data = data;
  }

  babelHelpers.createClass(Elements, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Global.Elements",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Checkradio"]]
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareUnions(this, other) | 0;
    }
  }]);
  return Elements;
}();
setType("Global.Elements", Elements);
var Page = function () {
  function Page(tag, data) {
    babelHelpers.classCallCheck(this, Page);
    this.tag = tag;
    this.data = data;
  }

  babelHelpers.createClass(Page, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Global.Page",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Home"], ["Element", Elements]]
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareUnions(this, other) | 0;
    }
  }]);
  return Page;
}();
setType("Global.Page", Page);
function toHash(page) {
  if (page.tag === 1) {
    return "#elements/checkradio";
  } else {
    return "#home";
  }
}

var StandardSize = function () {
  function StandardSize(isSmall, isMedium, isLarge) {
    babelHelpers.classCallCheck(this, StandardSize);
    this.IsSmall = isSmall;
    this.IsMedium = isMedium;
    this.IsLarge = isLarge;
  }

  babelHelpers.createClass(StandardSize, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elmish.Bulma.BulmaClasses.StandardSize",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          IsSmall: "string",
          IsMedium: "string",
          IsLarge: "string"
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareRecords(this, other) | 0;
    }
  }]);
  return StandardSize;
}();
setType("Elmish.Bulma.BulmaClasses.StandardSize", StandardSize);
var LevelAndColor = function () {
  function LevelAndColor(isBlack, isDark, isLight, isWhite, isPrimary, isInfo, isSuccess, isWarning, isDanger) {
    babelHelpers.classCallCheck(this, LevelAndColor);
    this.IsBlack = isBlack;
    this.IsDark = isDark;
    this.IsLight = isLight;
    this.IsWhite = isWhite;
    this.IsPrimary = isPrimary;
    this.IsInfo = isInfo;
    this.IsSuccess = isSuccess;
    this.IsWarning = isWarning;
    this.IsDanger = isDanger;
  }

  babelHelpers.createClass(LevelAndColor, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elmish.Bulma.BulmaClasses.LevelAndColor",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          IsBlack: "string",
          IsDark: "string",
          IsLight: "string",
          IsWhite: "string",
          IsPrimary: "string",
          IsInfo: "string",
          IsSuccess: "string",
          IsWarning: "string",
          IsDanger: "string"
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareRecords(this, other) | 0;
    }
  }]);
  return LevelAndColor;
}();
setType("Elmish.Bulma.BulmaClasses.LevelAndColor", LevelAndColor);
var GenericIsActiveState = function () {
  function GenericIsActiveState(isActive) {
    babelHelpers.classCallCheck(this, GenericIsActiveState);
    this.IsActive = isActive;
  }

  babelHelpers.createClass(GenericIsActiveState, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elmish.Bulma.BulmaClasses.GenericIsActiveState",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          IsActive: "string"
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareRecords(this, other) | 0;
    }
  }]);
  return GenericIsActiveState;
}();
setType("Elmish.Bulma.BulmaClasses.GenericIsActiveState", GenericIsActiveState);
var GenericColumnSize = function () {
  function GenericColumnSize(isOneQuarter, isOneThird, isHalf, isTwoThirds, isThreeQuarters, is1, is2, is3, is4, is5, is6, is7, is8, is9, is10, is11, isNarrow, isFull) {
    babelHelpers.classCallCheck(this, GenericColumnSize);
    this.IsOneQuarter = isOneQuarter;
    this.IsOneThird = isOneThird;
    this.IsHalf = isHalf;
    this.IsTwoThirds = isTwoThirds;
    this.IsThreeQuarters = isThreeQuarters;
    this.Is1 = is1;
    this.Is2 = is2;
    this.Is3 = is3;
    this.Is4 = is4;
    this.Is5 = is5;
    this.Is6 = is6;
    this.Is7 = is7;
    this.Is8 = is8;
    this.Is9 = is9;
    this.Is10 = is10;
    this.Is11 = is11;
    this.IsNarrow = isNarrow;
    this.IsFull = isFull;
  }

  babelHelpers.createClass(GenericColumnSize, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elmish.Bulma.BulmaClasses.GenericColumnSize",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          IsOneQuarter: "string",
          IsOneThird: "string",
          IsHalf: "string",
          IsTwoThirds: "string",
          IsThreeQuarters: "string",
          Is1: "string",
          Is2: "string",
          Is3: "string",
          Is4: "string",
          Is5: "string",
          Is6: "string",
          Is7: "string",
          Is8: "string",
          Is9: "string",
          Is10: "string",
          Is11: "string",
          IsNarrow: "string",
          IsFull: "string"
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareRecords(this, other) | 0;
    }
  }]);
  return GenericColumnSize;
}();
setType("Elmish.Bulma.BulmaClasses.GenericColumnSize", GenericColumnSize);
var DisplayType = function () {
  function DisplayType(always, mobile, tablet, tabletOnly, touch, desktop, desktopOnly, widescreen) {
    babelHelpers.classCallCheck(this, DisplayType);
    this.Always = always;
    this.Mobile = mobile;
    this.Tablet = tablet;
    this.TabletOnly = tabletOnly;
    this.Touch = touch;
    this.Desktop = desktop;
    this.DesktopOnly = desktopOnly;
    this.Widescreen = widescreen;
  }

  babelHelpers.createClass(DisplayType, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elmish.Bulma.BulmaClasses.DisplayType",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Always: "string",
          Mobile: "string",
          Tablet: "string",
          TabletOnly: "string",
          Touch: "string",
          Desktop: "string",
          DesktopOnly: "string",
          Widescreen: "string"
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareRecords(this, other) | 0;
    }
  }]);
  return DisplayType;
}();
setType("Elmish.Bulma.BulmaClasses.DisplayType", DisplayType);
function op_PlusPlus(str1, str2) {
  return str1 + " " + str2;
}
var standardSize = new StandardSize("is-small", "is-medium", "is-large ");
var levelAndColor = new LevelAndColor("is-black", "is-dark", "is-light", "is-white", "is-primary", "is-info", "is-success", "is-warning", "is-danger");
var genericIsActiveState = new GenericIsActiveState("is-active");
function generateColumnSize(suffix) {
  return new GenericColumnSize("is-one-quarter" + suffix, "is-one-third" + suffix, "is-half" + suffix, "is-two-third + suffixs", "is-three + suffix-quarters", "is-1" + suffix, "is-2" + suffix, "is-3" + suffix, "is-4" + suffix, "is-5" + suffix, "is-6" + suffix, "is-7" + suffix, "is-8" + suffix, "is-9" + suffix, "is-10" + suffix, "is-11" + suffix, "is-narrow" + suffix, "is-full" + suffix);
}
function generateColumnOffset(suffix) {
  return new GenericColumnSize("is-offset-one-quarter" + suffix, "is-offset-one-third" + suffix, "is-offset-half" + suffix, "is-offset-two-thirds" + suffix, "is-offset-three-qua + suffixrters", "is-offset-1" + suffix, "is-offset-2" + suffix, "is-offset-3" + suffix, "is-offset-4" + suffix, "is-offset-5" + suffix, "is-offset-6" + suffix, "is-offset-7" + suffix, "is-offset-8" + suffix, "is-offset-9" + suffix, "is-offset-10" + suffix, "is-offset-11" + suffix, "is-offset-narrow" + suffix, "is-full" + suffix);
}
function generateDisplayType(prefix) {
  return new DisplayType(op_PlusPlus("is-" + prefix + "-touch", "is-") + prefix + "-desktop", "is-" + prefix + "-mobile", "is-" + prefix + "-tablet", "is-" + prefix + "-tablet-only", "is-" + prefix + "-touch", "is-" + prefix + "-desktop", "is-" + prefix + "-desktop-only", "is-" + prefix + "-widescreen");
}
var Bulma = function (__exports) {
  var Modifiers = __exports.Modifiers = function (__exports) {
    var Size = __exports.Size = standardSize;
    var Color = __exports.Color = levelAndColor;
    return __exports;
  }({});

  var Box = __exports.Box = function (__exports) {
    var Container = __exports.Container = "box";
    return __exports;
  }({});

  var Button = __exports.Button = function (__exports) {
    var Container_1 = __exports.Container = "button";

    var Size = __exports.Size = function (__exports) {
      var IsSmall = __exports.IsSmall = "is-small";
      var IsMedium = __exports.IsMedium = "is-medium";
      var IsLarge = __exports.IsLarge = "is-large ";
      var IsFullwidth = __exports.IsFullwidth = "is-fullwidth";
      return __exports;
    }({});

    var Color_1 = __exports.Color = levelAndColor;

    var State = __exports.State = function (__exports) {
      var IsHovered = __exports.IsHovered = "is-hovered";
      var IsFocused = __exports.IsFocused = "is-focus";
      var IsActive = __exports.IsActive = "is-active";
      var IsLoading = __exports.IsLoading = "is-loading";
      return __exports;
    }({});

    var Styles = __exports.Styles = function (__exports) {
      var IsLink = __exports.IsLink = "is-link";
      var IsOutlined = __exports.IsOutlined = "is-outlined";
      var IsInverted = __exports.IsInverted = "is-inverted";
      return __exports;
    }({});

    return __exports;
  }({});

  var Breadcrumb = __exports.Breadcrumb = function (__exports) {
    var Container_2 = __exports.Container = "breadcrumb";

    var Alignment = __exports.Alignment = function (__exports) {
      var IsCentered = __exports.IsCentered = "is-centered";
      var IsRight = __exports.IsRight = "is-right";
      return __exports;
    }({});

    var Separator = __exports.Separator = function (__exports) {
      var Arrow = __exports.Arrow = "has-arrow-separator";
      var Bullet = __exports.Bullet = "has-bullet-separator";
      var Dot = __exports.Dot = "has-dot-separator";
      var Succeeds = __exports.Succeeds = "has-succeeds-separator";
      return __exports;
    }({});

    var State = __exports.State = function (__exports) {
      var IsActive_1 = __exports.IsActive = "is-active";
      return __exports;
    }({});

    var Size_1 = __exports.Size = standardSize;
    return __exports;
  }({});

  var Card = __exports.Card = function (__exports) {
    var Container_3 = __exports.Container = "card";

    var Header = __exports.Header = function (__exports) {
      var Container_4 = __exports.Container = "card-header";
      var Title = __exports.Title = "card-header-title";
      var Icon = __exports.Icon = "card-header-icon";
      return __exports;
    }({});

    var Image = __exports.Image = "card-image";
    var Content = __exports.Content = "card-content";

    var Footer = __exports.Footer = function (__exports) {
      var Container_5 = __exports.Container = "card-footer";
      var Item = __exports.Item = "card-footer-item";
      return __exports;
    }({});

    return __exports;
  }({});

  var Content = __exports.Content = function (__exports) {
    var Container_6 = __exports.Container = "content";
    var Size_2 = __exports.Size = standardSize;
    return __exports;
  }({});

  var Control = __exports.Control = function (__exports) {
    var Container_7 = __exports.Container = "control";

    var HasIcon = __exports.HasIcon = function (__exports) {
      var Left = __exports.Left = "has-icons-left";
      var Right = __exports.Right = "has-icons-right";
      return __exports;
    }({});

    var State = __exports.State = function (__exports) {
      var IsLoading_1 = __exports.IsLoading = "is-loading";
      return __exports;
    }({});

    return __exports;
  }({});

  var Delete = __exports.Delete = function (__exports) {
    var Container_8 = __exports.Container = "delete";
    var Size_3 = __exports.Size = standardSize;
    return __exports;
  }({});

  var Field = __exports.Field = function (__exports) {
    var Container_9 = __exports.Container = "field";
    var Label = __exports.Label = "field-label";
    var Body = __exports.Body = "field-body";

    var HasAddons = __exports.HasAddons = function (__exports) {
      var Left_1 = __exports.Left = "has-addons";
      var Centered = __exports.Centered = "has-addons-centered";
      var Right_1 = __exports.Right = "has-addons-right";
      var FullWidh = __exports.FullWidh = "has-addons-fullwidth";
      return __exports;
    }({});

    var IsGrouped = __exports.IsGrouped = function (__exports) {
      var Left_2 = __exports.Left = "is-grouped";
      var Centered_1 = __exports.Centered = "is-grouped-centered";
      var Right_2 = __exports.Right = "is-grouped-right";
      return __exports;
    }({});

    var Layout = __exports.Layout = function (__exports) {
      var IsHorizontal = __exports.IsHorizontal = "is-horizontal";
      return __exports;
    }({});

    return __exports;
  }({});

  var Grid = __exports.Grid = function (__exports) {
    var Columns = __exports.Columns = function (__exports) {
      var Container_10 = __exports.Container = "columns";

      var Alignment = __exports.Alignment = function (__exports) {
        var IsCentered_1 = __exports.IsCentered = "is-centered";
        var IsVCentered = __exports.IsVCentered = "is-vcentered";
        return __exports;
      }({});

      var Spacing = __exports.Spacing = function (__exports) {
        var IsMultiline = __exports.IsMultiline = "is-multiline";
        var IsGapless = __exports.IsGapless = "is-gapless";
        var IsGrid = __exports.IsGrid = "is-grid";
        return __exports;
      }({});

      var Display = __exports.Display = function (__exports) {
        var OnMobile = __exports.OnMobile = "on-mobile";
        var OnlyDesktop = __exports.OnlyDesktop = "only-desktop";
        return __exports;
      }({});

      return __exports;
    }({});

    var Column = __exports.Column = function (__exports) {
      var Container_11 = __exports.Container = "column";
      var Width = __exports.Width = generateColumnSize("");
      var Offset = __exports.Offset = generateColumnOffset("");

      var Desktop = __exports.Desktop = function (__exports) {
        var Width_1 = __exports.Width = generateColumnSize("-desktop");
        var Offset_1 = __exports.Offset = generateColumnOffset("-desktop");
        return __exports;
      }({});

      var Mobile = __exports.Mobile = function (__exports) {
        var Width_2 = __exports.Width = generateColumnSize("-mobile");
        var Offset_2 = __exports.Offset = generateColumnOffset("-mobule");
        return __exports;
      }({});

      var Tablet = __exports.Tablet = function (__exports) {
        var Width_3 = __exports.Width = generateColumnSize("-tablet");
        var Offset_3 = __exports.Offset = generateColumnOffset("-tablet");
        return __exports;
      }({});

      var WideScreen = __exports.WideScreen = function (__exports) {
        var Width_4 = __exports.Width = generateColumnSize("-widescreen");
        var Offset_4 = __exports.Offset = generateColumnOffset("-widescreen");
        return __exports;
      }({});

      return __exports;
    }({});

    return __exports;
  }({});

  var Icon = __exports.Icon = function (__exports) {
    var Container_12 = __exports.Container = "icon";

    var Position = __exports.Position = function (__exports) {
      var Left_3 = __exports.Left = "is-left";
      var Right_3 = __exports.Right = "is-right";
      return __exports;
    }({});

    var Size_4 = __exports.Size = standardSize;
    return __exports;
  }({});

  var Image = __exports.Image = function (__exports) {
    var Container_13 = __exports.Container = "image";

    var Size = __exports.Size = function (__exports) {
      var Is16x16 = __exports.Is16x16 = "is-16x16";
      var Is24x24 = __exports.Is24x24 = "is-24x24";
      var Is32x32 = __exports.Is32x32 = "is-32x32";
      var Is48x48 = __exports.Is48x48 = "is-48x48";
      var Is64x64 = __exports.Is64x64 = "is-64x64";
      var Is96x96 = __exports.Is96x96 = "is-96x96";
      var Is128x128 = __exports.Is128x128 = "is-128x128";
      return __exports;
    }({});

    var Ratio = __exports.Ratio = function (__exports) {
      var IsSquare = __exports.IsSquare = "is-square";
      var Is1by1 = __exports.Is1by1 = "is-1by1";
      var Is4by3 = __exports.Is4by3 = "is-4by3";
      var Is3by2 = __exports.Is3by2 = "is-3by2";
      var Is16by9 = __exports.Is16by9 = "is-16by9";
      var Is2by1 = __exports.Is2by1 = "is-2by1";
      return __exports;
    }({});

    return __exports;
  }({});

  var Input = __exports.Input = function (__exports) {
    var Container_14 = __exports.Container = "input";

    var Display = __exports.Display = function (__exports) {
      var IsInline = __exports.IsInline = "is-inline";
      return __exports;
    }({});

    var Size_5 = __exports.Size = standardSize;

    var State = __exports.State = function (__exports) {
      var IsHovered_1 = __exports.IsHovered = "is-hovered";
      var IsFocused_1 = __exports.IsFocused = "is-focus";
      var IsActive_2 = __exports.IsActive = "is-active";
      var IsLoading_2 = __exports.IsLoading = "is-loading";
      return __exports;
    }({});

    var Color_2 = __exports.Color = levelAndColor;

    var Addon = __exports.Addon = function (__exports) {
      var IsExpanded = __exports.IsExpanded = "is-expanded";
      return __exports;
    }({});

    return __exports;
  }({});

  var Label = __exports.Label = function (__exports) {
    var Container_15 = __exports.Container = "label";
    var Size_6 = __exports.Size = standardSize;
    return __exports;
  }({});

  var Level = __exports.Level = function (__exports) {
    var Container_16 = __exports.Container = "level";
    var Left_4 = __exports.Left = "level-left";
    var Right_4 = __exports.Right = "level-right";

    var Item = __exports.Item = function (__exports) {
      var Container_17 = __exports.Container = "level-item";
      var HasTextCentered = __exports.HasTextCentered = "has-text-centered";
      return __exports;
    }({});

    var Mobile = __exports.Mobile = function (__exports) {
      var IsHorizontal_1 = __exports.IsHorizontal = "is-mobile";
      return __exports;
    }({});

    return __exports;
  }({});

  var Menu = __exports.Menu = function (__exports) {
    var Container_18 = __exports.Container = "menu";
    var Label_1 = __exports.Label = "menu-label";
    var List = __exports.List = "menu-list";
    var State_1 = __exports.State = genericIsActiveState;
    return __exports;
  }({});

  var Media = __exports.Media = function (__exports) {
    var Container_19 = __exports.Container = "media";
    var Left_5 = __exports.Left = "media-left";
    var Right_5 = __exports.Right = "media-right";
    var Content_1 = __exports.Content = "media-content";

    var Size = __exports.Size = function (__exports) {
      var IsLarge_1 = __exports.IsLarge = "is-large";
      return __exports;
    }({});

    return __exports;
  }({});

  var Message = __exports.Message = function (__exports) {
    var Container_20 = __exports.Container = "message";
    var Header_1 = __exports.Header = "message-header";
    var Body_1 = __exports.Body = "message-body";
    var Color_3 = __exports.Color = levelAndColor;
    return __exports;
  }({});

  var Nav = __exports.Nav = function (__exports) {
    var Container_21 = __exports.Container = "nav";
    var Left_6 = __exports.Left = "nav-left";
    var Center = __exports.Center = "nav-center";
    var Right_6 = __exports.Right = "nav-right";

    var Toggle = __exports.Toggle = function (__exports) {
      var Container_22 = __exports.Container = "nav-toggle";
      var State_2 = __exports.State = genericIsActiveState;
      return __exports;
    }({});

    var Menu = __exports.Menu = function (__exports) {
      var Container_23 = __exports.Container = "nav-menu";
      var State_3 = __exports.State = genericIsActiveState;
      return __exports;
    }({});

    var Item = __exports.Item = function (__exports) {
      var Container_24 = __exports.Container = "nav-item";

      var Style = __exports.Style = function (__exports) {
        var IsTab = __exports.IsTab = "is-tab";
        return __exports;
      }({});

      var State_4 = __exports.State = genericIsActiveState;
      return __exports;
    }({});

    var Style = __exports.Style = function (__exports) {
      var HasShadow = __exports.HasShadow = "has-shadow";
      return __exports;
    }({});

    return __exports;
  }({});

  var Navbar = __exports.Navbar = function (__exports) {
    var Container_25 = __exports.Container = "navbar";
    var Brand = __exports.Brand = "navbar-brand";
    var Burger = __exports.Burger = "navbar-burger";
    var Content_2 = __exports.Content = "navbar-content";
    var Divider = __exports.Divider = "navbar-divider";
    var Start = __exports.Start = "navbar-start";
    var End = __exports.End = "navbar-end";

    var Item = __exports.Item = function (__exports) {
      var Container_26 = __exports.Container = "navbar-item";
      var IsHoverable = __exports.IsHoverable = "is-hoverable";
      var State_5 = __exports.State = genericIsActiveState;

      var Style = __exports.Style = function (__exports) {
        var HasDropdown = __exports.HasDropdown = "has-dropdown";
        var IsTab_1 = __exports.IsTab = "is-tab";
        return __exports;
      }({});

      return __exports;
    }({});

    var Menu = __exports.Menu = function (__exports) {
      var Container_27 = __exports.Container = "navbar-menu";
      var State_6 = __exports.State = genericIsActiveState;
      return __exports;
    }({});

    var Link = __exports.Link = function (__exports) {
      var Container_28 = __exports.Container = "navbar-link";
      var State_7 = __exports.State = genericIsActiveState;
      return __exports;
    }({});

    var Dropdown = __exports.Dropdown = function (__exports) {
      var Container_29 = __exports.Container = "navbar-dropdown";
      var State_8 = __exports.State = genericIsActiveState;
      var IsBoxed = __exports.IsBoxed = "is-boxed";
      var IsRight_1 = __exports.IsRight = "is-right";
      return __exports;
    }({});

    var Style = __exports.Style = function (__exports) {
      var HasShadow_1 = __exports.HasShadow = "has-shadow";
      var IsTransparent = __exports.IsTransparent = "is-transparent";
      return __exports;
    }({});

    return __exports;
  }({});

  var Notification = __exports.Notification = function (__exports) {
    var Container_30 = __exports.Container = "notification";
    var Color_4 = __exports.Color = levelAndColor;

    var Delete = __exports.Delete = function (__exports) {
      var Container_31 = __exports.Container = "delete";
      return __exports;
    }({});

    return __exports;
  }({});

  var Panel = __exports.Panel = function (__exports) {
    var Container_32 = __exports.Container = "panel";
    var Heading = __exports.Heading = "panel-heading";

    var Tabs = __exports.Tabs = function (__exports) {
      var Container_33 = __exports.Container = "panel-tabs";

      var Tab = __exports.Tab = function (__exports) {
        var State = __exports.State = function (__exports) {
          var IsActive_3 = __exports.IsActive = "is-active";
          return __exports;
        }({});

        return __exports;
      }({});

      return __exports;
    }({});

    var Block = __exports.Block = function (__exports) {
      var Container_34 = __exports.Container = "panel-block";
      var Icon_1 = __exports.Icon = "panel-icon";
      var List_1 = __exports.List = "panel-list";

      var State = __exports.State = function (__exports) {
        var IsActive_4 = __exports.IsActive = "is-active";
        return __exports;
      }({});

      return __exports;
    }({});

    return __exports;
  }({});

  var Tabs = __exports.Tabs = function (__exports) {
    var Container_35 = __exports.Container = "tabs";
    var State_9 = __exports.State = genericIsActiveState;
    var Size_7 = __exports.Size = standardSize;

    var Alignment = __exports.Alignment = function (__exports) {
      var Center_1 = __exports.Center = "is-centered";
      var Right_7 = __exports.Right = "is-right";
      return __exports;
    }({});

    var Style = __exports.Style = function (__exports) {
      var IsBoxed_1 = __exports.IsBoxed = "is-boxed";
      var IsToggle = __exports.IsToggle = "is-toggle";
      var IsFullwidth_1 = __exports.IsFullwidth = "is-fullwidth";
      return __exports;
    }({});

    return __exports;
  }({});

  var Pagination = __exports.Pagination = function (__exports) {
    var Container_36 = __exports.Container = "pagination";
    var Previous = __exports.Previous = "pagination-previous";
    var Next = __exports.Next = "pagination-next";
    var Link_1 = __exports.Link = "pagination-link";
    var Ellipsis = __exports.Ellipsis = "pagination-ellipsis";
    var List_2 = __exports.List = "pagination-list";
    var Size_8 = __exports.Size = standardSize;

    var Alignment = __exports.Alignment = function (__exports) {
      var Center_2 = __exports.Center = "is-centered";
      var Right_8 = __exports.Right = "is-right";
      return __exports;
    }({});

    var State = __exports.State = function (__exports) {
      var IsCurrent = __exports.IsCurrent = "is-current";
      return __exports;
    }({});

    return __exports;
  }({});

  var Properties = __exports.Properties = function (__exports) {
    var Float = __exports.Float = function (__exports) {
      var IsClearfix = __exports.IsClearfix = "is-clearfix";
      var IsPulledLeft = __exports.IsPulledLeft = "is-pulled-left";
      var IsPulledRight = __exports.IsPulledRight = "is-pulled-right";
      return __exports;
    }({});

    var Alignment = __exports.Alignment = function (__exports) {
      var HasTextCentered_1 = __exports.HasTextCentered = "has-text-centered";
      var HasTextLeft = __exports.HasTextLeft = "has-text-left";
      var HasTextRight = __exports.HasTextRight = "has-text-right";
      return __exports;
    }({});

    var Sizing = __exports.Sizing = function (__exports) {
      var IsOverlay = __exports.IsOverlay = "is-overlay";
      var IsFullwidth_2 = __exports.IsFullwidth = "is-fullwidth";
      var IsMarginless = __exports.IsMarginless = "is-marginless";
      var IsPaddingless = __exports.IsPaddingless = "is-paddingless";
      return __exports;
    }({});

    var Display = __exports.Display = function (__exports) {
      var IsBlock = __exports.IsBlock = generateDisplayType("block");
      var IsFlex = __exports.IsFlex = generateDisplayType("flex");
      var IsInline_1 = __exports.IsInline = generateDisplayType("inline");
      var IsInlineBox = __exports.IsInlineBox = generateDisplayType("inline-block");
      var IsInlineFlex = __exports.IsInlineFlex = generateDisplayType("inline-flex");
      return __exports;
    }({});

    var Visibility = __exports.Visibility = function (__exports) {
      var IsHidden = __exports.IsHidden = generateDisplayType("hidden");
      return __exports;
    }({});

    var Interaction = __exports.Interaction = function (__exports) {
      var IsUnselectable = __exports.IsUnselectable = "is-unselectable";
      return __exports;
    }({});

    return __exports;
  }({});

  var Progress = __exports.Progress = function (__exports) {
    var Container_37 = __exports.Container = "progress";
    var Size_9 = __exports.Size = standardSize;
    var Color_5 = __exports.Color = levelAndColor;
    return __exports;
  }({});

  var Heading = __exports.Heading = function (__exports) {
    var Title_1 = __exports.Title = "title";
    var Subtitle = __exports.Subtitle = "subtitle";

    var Size = __exports.Size = function (__exports) {
      var Is1 = __exports.Is1 = "is-1";
      var Is2 = __exports.Is2 = "is-2";
      var Is3 = __exports.Is3 = "is-3";
      var Is4 = __exports.Is4 = "is-4";
      var Is5 = __exports.Is5 = "is-5";
      var Is6 = __exports.Is6 = "is-6";
      return __exports;
    }({});

    var Spacing = __exports.Spacing = function (__exports) {
      var IsNormal = __exports.IsNormal = "is-spaced";
      return __exports;
    }({});

    return __exports;
  }({});

  var Hero = __exports.Hero = function (__exports) {
    var Container_38 = __exports.Container = "hero";
    var Head = __exports.Head = "hero-head";
    var Body_2 = __exports.Body = "hero-body";
    var Foot = __exports.Foot = "hero-foot";

    var Video = __exports.Video = function (__exports) {
      var Container_39 = __exports.Container = "hero-video";
      var IsTransparent_1 = __exports.IsTransparent = "is-transparent";
      return __exports;
    }({});

    var Buttons = __exports.Buttons = function (__exports) {
      var Container_40 = __exports.Container = "hero-buttons";
      return __exports;
    }({});

    var Style = __exports.Style = function (__exports) {
      var IsBold = __exports.IsBold = "is-bold";
      return __exports;
    }({});

    var Size = __exports.Size = function (__exports) {
      var IsMedium_1 = __exports.IsMedium = "is-medium";
      var IsLarge_2 = __exports.IsLarge = "is-large";
      var IsHalfHeight = __exports.IsHalfHeight = "is-halfheight";
      var IsFullHeight = __exports.IsFullHeight = "is-fullheight";
      return __exports;
    }({});

    var Color_6 = __exports.Color = levelAndColor;
    return __exports;
  }({});

  var Table = __exports.Table = function (__exports) {
    var Container_41 = __exports.Container = "table";

    var Row = __exports.Row = function (__exports) {
      var State = __exports.State = function (__exports) {
        var IsSelected = __exports.IsSelected = "is-selected";
        return __exports;
      }({});

      return __exports;
    }({});

    var Style = __exports.Style = function (__exports) {
      var IsBordered = __exports.IsBordered = "is-bordered";
      var IsStripped = __exports.IsStripped = "is-stripped ";
      return __exports;
    }({});

    var Spacing = __exports.Spacing = function (__exports) {
      var IsNarrow = __exports.IsNarrow = "is-narrow";
      return __exports;
    }({});

    return __exports;
  }({});

  var Tag = __exports.Tag = function (__exports) {
    var Container_42 = __exports.Container = "tag";

    var Size = __exports.Size = function (__exports) {
      var IsMedium_2 = __exports.IsMedium = "is-medium";
      var IsLarge_3 = __exports.IsLarge = "is-large";
      return __exports;
    }({});

    var Color_7 = __exports.Color = levelAndColor;
    return __exports;
  }({});

  return __exports;
}({});

var ISize = function () {
  function ISize(tag, data) {
    babelHelpers.classCallCheck(this, ISize);
    this.tag = tag;
    this.data = data;
  }

  babelHelpers.createClass(ISize, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elmish.Bulma.Common.ISize",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["IsSmall"], ["IsMedium"], ["IsLarge"]]
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareUnions(this, other) | 0;
    }
  }]);
  return ISize;
}();
setType("Elmish.Bulma.Common.ISize", ISize);
var ILevelAndColor = function () {
  function ILevelAndColor(tag, data) {
    babelHelpers.classCallCheck(this, ILevelAndColor);
    this.tag = tag;
    this.data = data;
  }

  babelHelpers.createClass(ILevelAndColor, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elmish.Bulma.Common.ILevelAndColor",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["IsBlack"], ["IsDark"], ["IsLight"], ["IsWhite"], ["IsPrimary"], ["IsInfo"], ["IsSuccess"], ["IsWarning"], ["IsDanger"]]
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareUnions(this, other) | 0;
    }
  }]);
  return ILevelAndColor;
}();
setType("Elmish.Bulma.Common.ILevelAndColor", ILevelAndColor);
function ofLevelAndColor(level) {
  if (level.tag === 1) {
    return Bulma.Modifiers.Color.IsDark;
  } else if (level.tag === 2) {
    return Bulma.Modifiers.Color.IsLight;
  } else if (level.tag === 3) {
    return Bulma.Modifiers.Color.IsWhite;
  } else if (level.tag === 4) {
    return Bulma.Modifiers.Color.IsPrimary;
  } else if (level.tag === 5) {
    return Bulma.Modifiers.Color.IsInfo;
  } else if (level.tag === 6) {
    return Bulma.Modifiers.Color.IsSuccess;
  } else if (level.tag === 7) {
    return Bulma.Modifiers.Color.IsWarning;
  } else if (level.tag === 8) {
    return Bulma.Modifiers.Color.IsDanger;
  } else {
    return Bulma.Modifiers.Color.IsBlack;
  }
}
function ofSize(size) {
  if (size.tag === 1) {
    return Bulma.Modifiers.Size.IsMedium;
  } else if (size.tag === 2) {
    return Bulma.Modifiers.Size.IsLarge;
  } else {
    return Bulma.Modifiers.Size.IsSmall;
  }
}
var GenericOption = function () {
  function GenericOption(tag, data) {
    babelHelpers.classCallCheck(this, GenericOption);
    this.tag = tag;
    this.data = data;
  }

  babelHelpers.createClass(GenericOption, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elmish.Bulma.Common.GenericOption",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["CustomClass", "string"], ["Props", makeGeneric(List$1, {
          T: Interface("Fable.Helpers.React.Props.IHTMLProp")
        })]]
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }
  }]);
  return GenericOption;
}();
setType("Elmish.Bulma.Common.GenericOption", GenericOption);
var GenericOptions = function () {
  function GenericOptions(customClass, props) {
    babelHelpers.classCallCheck(this, GenericOptions);
    this.CustomClass = customClass;
    this.Props = props;
  }

  babelHelpers.createClass(GenericOptions, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elmish.Bulma.Common.GenericOptions",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          CustomClass: Option("string"),
          Props: makeGeneric(List$1, {
            T: Interface("Fable.Helpers.React.Props.IHTMLProp")
          })
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }], [{
    key: "Empty",
    get: function get() {
      return new GenericOptions(null, new List$1());
    }
  }]);
  return GenericOptions;
}();
setType("Elmish.Bulma.Common.GenericOptions", GenericOptions);
function genericParse(options) {
  var parseOptions = function parseOptions(result, opt) {
    if (opt.tag === 0) {
      return new GenericOptions(opt.data, result.Props);
    } else {
      return new GenericOptions(result.CustomClass, opt.data);
    }
  };

  return function () {
    var state = GenericOptions.Empty;
    return function (list) {
      return fold$1(parseOptions, state, list);
    };
  }()(options);
}

function menu$1(options, children) {
  var opts = genericParse(options);
  return react_1.apply(undefined, ["aside", createObj(toList(delay(function () {
    return append$1(singleton$1(classBaseList("menu", ofArray([[opts.CustomClass, function () {
      return opts.CustomClass != null;
    }()]]))), delay(function () {
      return opts.Props;
    }));
  })), 1)].concat(babelHelpers.toConsumableArray(children)));
}
function label(options, children) {
  var opts = genericParse(options);
  return react_1.apply(undefined, ["p", createObj(toList(delay(function () {
    return append$1(singleton$1(classBaseList("menu-label", ofArray([[opts.CustomClass, function () {
      return opts.CustomClass != null;
    }()]]))), delay(function () {
      return opts.Props;
    }));
  })), 1)].concat(babelHelpers.toConsumableArray(children)));
}
function list(options, children) {
  var opts = genericParse(options);
  return react_1.apply(undefined, ["ul", createObj(toList(delay(function () {
    return append$1(singleton$1(classBaseList("menu-list", ofArray([[opts.CustomClass, function () {
      return opts.CustomClass != null;
    }()]]))), delay(function () {
      return opts.Props;
    }));
  })), 1)].concat(babelHelpers.toConsumableArray(children)));
}

// TODO verify that this matches the behavior of .NET
var parseRadix10 = /^ *([\+\-]?[0-9]+) *$/;
// TODO verify that this matches the behavior of .NET
var parseRadix16 = /^ *([\+\-]?[0-9a-fA-F]+) *$/;
function isValid(s, radix) {
    if (s != null) {
        if (radix === 16) {
            return parseRadix16.exec(s);
        } else if (radix <= 10) {
            return parseRadix10.exec(s);
        }
    }
    return null;
}
// TODO does this perfectly match the .NET behavior ?

// Source: https://github.com/dcodeIO/long.js/blob/master/LICENSE
// tslint:disable:curly
// tslint:disable:member-access
// tslint:disable:member-ordering
// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.
/**
 * @class A Long class for representing a 64 bit two's-complement integer value.
 */
var Long = function () {
    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     *  See the from* functions below for more convenient ways of constructing Longs.
     * @param {number} low The low (signed) 32 bits of the long
     * @param {number} high The high (signed) 32 bits of the long
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     */
    function Long(low, high, unsigned) {
        classCallCheck(this, Long);

        /**
         * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        this.eq = this.equals;
        /**
         * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        this.neq = this.notEquals;
        /**
         * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        this.lt = this.lessThan;
        /**
         * Tests if this Long's value is less than or equal the specified's.
         * This is an alias of {@link Long#lessThanOrEqual}.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        this.lte = this.lessThanOrEqual;
        /**
         * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        this.gt = this.greaterThan;
        /**
         * Tests if this Long's value is greater than or equal the specified's.
         * This is an alias of {@link Long#greaterThanOrEqual}.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */
        this.gte = this.greaterThanOrEqual;
        /**
         * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
         * @param {!Long|number|string} other Other value
         * @returns {number} 0 if they are the same, 1 if the this is greater and -1
         *  if the given one is greater
         */
        this.comp = this.compare;
        /**
         * Negates this Long's value. This is an alias of {@link Long#negate}.
         * @returns {!Long} Negated Long
         */
        this.neg = this.negate;
        /**
         * Returns this Long's absolute value. This is an alias of {@link Long#absolute}.
         * @returns {!Long} Absolute Long
         */
        this.abs = this.absolute;
        /**
         * Returns the difference of this and the specified  This is an alias of {@link Long#subtract}.
         * @param {!Long|number|string} subtrahend Subtrahend
         * @returns {!Long} Difference
         */
        this.sub = this.subtract;
        /**
         * Returns the product of this and the specified  This is an alias of {@link Long#multiply}.
         * @param {!Long|number|string} multiplier Multiplier
         * @returns {!Long} Product
         */
        this.mul = this.multiply;
        /**
         * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
         * @param {!Long|number|string} divisor Divisor
         * @returns {!Long} Quotient
         */
        this.div = this.divide;
        /**
         * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
         * @param {!Long|number|string} divisor Divisor
         * @returns {!Long} Remainder
         */
        this.mod = this.modulo;
        /**
         * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */
        this.shl = this.shiftLeft;
        /**
         * Returns this Long with bits arithmetically shifted to the right by the given amount.
         * This is an alias of {@link Long#shiftRight}.
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */
        this.shr = this.shiftRight;
        /**
         * Returns this Long with bits logically shifted to the right by the given amount.
         * This is an alias of {@link Long#shiftRightUnsigned}.
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */
        this.shru = this.shiftRightUnsigned;
        // Aliases for compatibility with Fable
        this.Equals = this.equals;
        this.CompareTo = this.compare;
        this.ToString = this.toString;
        this.low = low | 0;
        this.high = high | 0;
        this.unsigned = !!unsigned;
    }
    /**
     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
     * @returns {number}
     */


    createClass$2(Long, [{
        key: "toInt",
        value: function toInt() {
            return this.unsigned ? this.low >>> 0 : this.low;
        }
        /**
         * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
         * @returns {number}
         */

    }, {
        key: "toNumber",
        value: function toNumber() {
            if (this.unsigned) return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
            return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
        }
        /**
         * Converts the Long to a string written in the specified radix.
         * @param {number=} radix Radix (2-36), defaults to 10
         * @returns {string}
         * @override
         * @throws {RangeError} If `radix` is out of range
         */

    }, {
        key: "toString",
        value: function toString() {
            var radix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

            radix = radix || 10;
            if (radix < 2 || 36 < radix) throw RangeError("radix");
            if (this.isZero()) return "0";
            if (this.isNegative()) {
                if (this.eq(MIN_VALUE)) {
                    // We need to change the Long value before it can be negated, so we remove
                    // the bottom-most digit in this base and then recurse to do the rest.
                    var radixLong = fromNumber(radix);
                    var div = this.div(radixLong);
                    var rem1 = div.mul(radixLong).sub(this);
                    return div.toString(radix) + rem1.toInt().toString(radix);
                } else return "-" + this.neg().toString(radix);
            }
            // Do several (6) digits each time through the loop, so as to
            // minimize the calls to the very expensive emulated div.
            var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned);
            var rem = this;
            var result = "";
            while (true) {
                var remDiv = rem.div(radixToPower);
                var intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0;
                var digits = intval.toString(radix);
                rem = remDiv;
                if (rem.isZero()) return digits + result;else {
                    while (digits.length < 6) {
                        digits = "0" + digits;
                    }result = "" + digits + result;
                }
            }
        }
        /**
         * Gets the high 32 bits as a signed integer.
         * @returns {number} Signed high bits
         */

    }, {
        key: "getHighBits",
        value: function getHighBits() {
            return this.high;
        }
        /**
         * Gets the high 32 bits as an unsigned integer.
         * @returns {number} Unsigned high bits
         */

    }, {
        key: "getHighBitsUnsigned",
        value: function getHighBitsUnsigned() {
            return this.high >>> 0;
        }
        /**
         * Gets the low 32 bits as a signed integer.
         * @returns {number} Signed low bits
         */

    }, {
        key: "getLowBits",
        value: function getLowBits() {
            return this.low;
        }
        /**
         * Gets the low 32 bits as an unsigned integer.
         * @returns {number} Unsigned low bits
         */

    }, {
        key: "getLowBitsUnsigned",
        value: function getLowBitsUnsigned() {
            return this.low >>> 0;
        }
        /**
         * Gets the number of bits needed to represent the absolute value of this
         * @returns {number}
         */

    }, {
        key: "getNumBitsAbs",
        value: function getNumBitsAbs() {
            if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
            var val = this.high !== 0 ? this.high : this.low;
            var bit = void 0;
            for (bit = 31; bit > 0; bit--) {
                if ((val & 1 << bit) !== 0) break;
            }return this.high !== 0 ? bit + 33 : bit + 1;
        }
        /**
         * Tests if this Long's value equals zero.
         * @returns {boolean}
         */

    }, {
        key: "isZero",
        value: function isZero() {
            return this.high === 0 && this.low === 0;
        }
        /**
         * Tests if this Long's value is negative.
         * @returns {boolean}
         */

    }, {
        key: "isNegative",
        value: function isNegative() {
            return !this.unsigned && this.high < 0;
        }
        /**
         * Tests if this Long's value is positive.
         * @returns {boolean}
         */

    }, {
        key: "isPositive",
        value: function isPositive() {
            return this.unsigned || this.high >= 0;
        }
        /**
         * Tests if this Long's value is odd.
         * @returns {boolean}
         */

    }, {
        key: "isOdd",
        value: function isOdd() {
            return (this.low & 1) === 1;
        }
        /**
         * Tests if this Long's value is even.
         * @returns {boolean}
         */

    }, {
        key: "isEven",
        value: function isEven() {
            return (this.low & 1) === 0;
        }
        /**
         * Tests if this Long's value equals the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */

    }, {
        key: "equals",
        value: function equals(other) {
            if (!isLong(other)) other = fromValue(other);
            if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
            return this.high === other.high && this.low === other.low;
        }
        /**
         * Tests if this Long's value differs from the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */

    }, {
        key: "notEquals",
        value: function notEquals(other) {
            return !this.eq( /* validates */other);
        }
        /**
         * Tests if this Long's value is less than the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */

    }, {
        key: "lessThan",
        value: function lessThan(other) {
            return this.comp( /* validates */other) < 0;
        }
        /**
         * Tests if this Long's value is less than or equal the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */

    }, {
        key: "lessThanOrEqual",
        value: function lessThanOrEqual(other) {
            return this.comp( /* validates */other) <= 0;
        }
        /**
         * Tests if this Long's value is greater than the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */

    }, {
        key: "greaterThan",
        value: function greaterThan(other) {
            return this.comp( /* validates */other) > 0;
        }
        /**
         * Tests if this Long's value is greater than or equal the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {boolean}
         */

    }, {
        key: "greaterThanOrEqual",
        value: function greaterThanOrEqual(other) {
            return this.comp( /* validates */other) >= 0;
        }
        /**
         * Compares this Long's value with the specified's.
         * @param {!Long|number|string} other Other value
         * @returns {number} 0 if they are the same, 1 if the this is greater and -1
         *  if the given one is greater
         */

    }, {
        key: "compare",
        value: function compare(other) {
            if (!isLong(other)) other = fromValue(other);
            if (this.eq(other)) return 0;
            var thisNeg = this.isNegative();
            var otherNeg = other.isNegative();
            if (thisNeg && !otherNeg) return -1;
            if (!thisNeg && otherNeg) return 1;
            // At this point the sign bits are the same
            if (!this.unsigned) return this.sub(other).isNegative() ? -1 : 1;
            // Both are positive if at least one is unsigned
            return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
        }
        /**
         * Negates this Long's value.
         * @returns {!Long} Negated Long
         */

    }, {
        key: "negate",
        value: function negate() {
            if (!this.unsigned && this.eq(MIN_VALUE)) return MIN_VALUE;
            return this.not().add(ONE);
        }
        /**
         * Returns this Long's absolute value.
         * @returns {!Long} Absolute Long
         */

    }, {
        key: "absolute",
        value: function absolute() {
            if (!this.unsigned && this.isNegative()) return this.negate();else return this;
        }
        /**
         * Returns the sum of this and the specified
         * @param {!Long|number|string} addend Addend
         * @returns {!Long} Sum
         */

    }, {
        key: "add",
        value: function add(addend) {
            if (!isLong(addend)) addend = fromValue(addend);
            // Divide each number into 4 chunks of 16 bits, and then sum the chunks.
            var a48 = this.high >>> 16;
            var a32 = this.high & 0xFFFF;
            var a16 = this.low >>> 16;
            var a00 = this.low & 0xFFFF;
            var b48 = addend.high >>> 16;
            var b32 = addend.high & 0xFFFF;
            var b16 = addend.low >>> 16;
            var b00 = addend.low & 0xFFFF;
            var c48 = 0;
            var c32 = 0;
            var c16 = 0;
            var c00 = 0;
            c00 += a00 + b00;
            c16 += c00 >>> 16;
            c00 &= 0xFFFF;
            c16 += a16 + b16;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c32 += a32 + b32;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c48 += a48 + b48;
            c48 &= 0xFFFF;
            return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
        }
        /**
         * Returns the difference of this and the specified
         * @param {!Long|number|string} subtrahend Subtrahend
         * @returns {!Long} Difference
         */

    }, {
        key: "subtract",
        value: function subtract(subtrahend) {
            if (!isLong(subtrahend)) subtrahend = fromValue(subtrahend);
            return this.add(subtrahend.neg());
        }
        /**
         * Returns the product of this and the specified
         * @param {!Long|number|string} multiplier Multiplier
         * @returns {!Long} Product
         */

    }, {
        key: "multiply",
        value: function multiply(multiplier) {
            if (this.isZero()) return ZERO;
            if (!isLong(multiplier)) multiplier = fromValue(multiplier);
            if (multiplier.isZero()) return ZERO;
            if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
            if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
            if (this.isNegative()) {
                if (multiplier.isNegative()) return this.neg().mul(multiplier.neg());else return this.neg().mul(multiplier).neg();
            } else if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
            // If both longs are small, use float multiplication
            if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
            // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
            // We can skip products that would overflow.
            var a48 = this.high >>> 16;
            var a32 = this.high & 0xFFFF;
            var a16 = this.low >>> 16;
            var a00 = this.low & 0xFFFF;
            var b48 = multiplier.high >>> 16;
            var b32 = multiplier.high & 0xFFFF;
            var b16 = multiplier.low >>> 16;
            var b00 = multiplier.low & 0xFFFF;
            var c48 = 0;
            var c32 = 0;
            var c16 = 0;
            var c00 = 0;
            c00 += a00 * b00;
            c16 += c00 >>> 16;
            c00 &= 0xFFFF;
            c16 += a16 * b00;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c16 += a00 * b16;
            c32 += c16 >>> 16;
            c16 &= 0xFFFF;
            c32 += a32 * b00;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c32 += a16 * b16;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c32 += a00 * b32;
            c48 += c32 >>> 16;
            c32 &= 0xFFFF;
            c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
            c48 &= 0xFFFF;
            return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
        }
        /**
         * Returns this Long divided by the specified. The result is signed if this Long is signed or
         *  unsigned if this Long is unsigned.
         * @param {!Long|number|string} divisor Divisor
         * @returns {!Long} Quotient
         */

    }, {
        key: "divide",
        value: function divide(divisor) {
            if (!isLong(divisor)) divisor = fromValue(divisor);
            if (divisor.isZero()) throw Error("division by zero");
            if (this.isZero()) return this.unsigned ? UZERO : ZERO;
            var rem = ZERO;
            var res = ZERO;
            if (!this.unsigned) {
                // This section is only relevant for signed longs and is derived from the
                // closure library as a whole.
                if (this.eq(MIN_VALUE)) {
                    if (divisor.eq(ONE) || divisor.eq(NEG_ONE)) return MIN_VALUE; // recall that -MIN_VALUE == MIN_VALUE
                    else if (divisor.eq(MIN_VALUE)) return ONE;else {
                            // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                            var halfThis = this.shr(1);
                            var approx = halfThis.div(divisor).shl(1);
                            if (approx.eq(ZERO)) {
                                return divisor.isNegative() ? ONE : NEG_ONE;
                            } else {
                                rem = this.sub(divisor.mul(approx));
                                res = approx.add(rem.div(divisor));
                                return res;
                            }
                        }
                } else if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
                if (this.isNegative()) {
                    if (divisor.isNegative()) return this.neg().div(divisor.neg());
                    return this.neg().div(divisor).neg();
                } else if (divisor.isNegative()) return this.div(divisor.neg()).neg();
                res = ZERO;
            } else {
                // The algorithm below has not been made for unsigned longs. It's therefore
                // required to take special care of the MSB prior to running it.
                if (!divisor.unsigned) divisor = divisor.toUnsigned();
                if (divisor.gt(this)) return UZERO;
                if (divisor.gt(this.shru(1))) return UONE;
                res = UZERO;
            }
            // Repeat the following until the remainder is less than other:  find a
            // floating-point that approximates remainder / other *from below*, add this
            // into the result, and subtract it from the remainder.  It is critical that
            // the approximate value is less than or equal to the real value so that the
            // remainder never becomes negative.
            rem = this;
            while (rem.gte(divisor)) {
                // Approximate the result of division. This may be a little greater or
                // smaller than the actual value.
                var _approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
                // We will tweak the approximate result by changing it in the 48-th digit or
                // the smallest non-fractional digit, whichever is larger.
                // tslint:disable-next-line:prefer-const
                // tslint:disable-next-line:semicolon
                var log2 = Math.ceil(Math.log(_approx) / Math.LN2);
                var delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48);
                // Decrease the approximation until it is smaller than the remainder.  Note
                // that if it is too large, the product overflows and is negative.
                var approxRes = fromNumber(_approx);
                var approxRem = approxRes.mul(divisor);
                while (approxRem.isNegative() || approxRem.gt(rem)) {
                    _approx -= delta;
                    approxRes = fromNumber(_approx, this.unsigned);
                    approxRem = approxRes.mul(divisor);
                }
                // We know the answer can't be zero... and actually, zero would cause
                // infinite recursion since we would make no progress.
                if (approxRes.isZero()) approxRes = ONE;
                res = res.add(approxRes);
                rem = rem.sub(approxRem);
            }
            return res;
        }
        /**
         * Returns this Long modulo the specified.
         * @param {!Long|number|string} divisor Divisor
         * @returns {!Long} Remainder
         */

    }, {
        key: "modulo",
        value: function modulo(divisor) {
            if (!isLong(divisor)) divisor = fromValue(divisor);
            return this.sub(this.div(divisor).mul(divisor));
        }
        /**
         * Returns the bitwise NOT of this
         * @returns {!Long}
         */

    }, {
        key: "not",
        value: function not() {
            return fromBits(~this.low, ~this.high, this.unsigned);
        }
        /**
         * Returns the bitwise AND of this Long and the specified.
         * @param {!Long|number|string} other Other Long
         * @returns {!Long}
         */

    }, {
        key: "and",
        value: function and(other) {
            if (!isLong(other)) other = fromValue(other);
            return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
        }
        /**
         * Returns the bitwise OR of this Long and the specified.
         * @param {!Long|number|string} other Other Long
         * @returns {!Long}
         */

    }, {
        key: "or",
        value: function or(other) {
            if (!isLong(other)) other = fromValue(other);
            return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
        }
        /**
         * Returns the bitwise XOR of this Long and the given one.
         * @param {!Long|number|string} other Other Long
         * @returns {!Long}
         */

    }, {
        key: "xor",
        value: function xor(other) {
            if (!isLong(other)) other = fromValue(other);
            return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
        }
        /**
         * Returns this Long with bits shifted to the left by the given amount.
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */

    }, {
        key: "shiftLeft",
        value: function shiftLeft(numBits) {
            if (isLong(numBits)) numBits = numBits.toInt();
            numBits = numBits & 63;
            if (numBits === 0) return this;else if (numBits < 32) return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);else return fromBits(0, this.low << numBits - 32, this.unsigned);
        }
        /**
         * Returns this Long with bits arithmetically shifted to the right by the given amount.
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */

    }, {
        key: "shiftRight",
        value: function shiftRight(numBits) {
            if (isLong(numBits)) numBits = numBits.toInt();
            numBits = numBits & 63;
            if (numBits === 0) return this;else if (numBits < 32) return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);else return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
        }
        /**
         * Returns this Long with bits logically shifted to the right by the given amount.
         * @param {number|!Long} numBits Number of bits
         * @returns {!Long} Shifted Long
         */

    }, {
        key: "shiftRightUnsigned",
        value: function shiftRightUnsigned(numBits) {
            if (isLong(numBits)) numBits = numBits.toInt();
            numBits = numBits & 63;
            if (numBits === 0) return this;else {
                var high = this.high;
                if (numBits < 32) {
                    var low = this.low;
                    return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
                } else if (numBits === 32) return fromBits(high, 0, this.unsigned);else return fromBits(high >>> numBits - 32, 0, this.unsigned);
            }
        }
        /**
         * Converts this Long to signed.
         * @returns {!Long} Signed long
         */

    }, {
        key: "toSigned",
        value: function toSigned() {
            if (!this.unsigned) return this;
            return fromBits(this.low, this.high, false);
        }
        /**
         * Converts this Long to unsigned.
         * @returns {!Long} Unsigned long
         */

    }, {
        key: "toUnsigned",
        value: function toUnsigned() {
            if (this.unsigned) return this;
            return fromBits(this.low, this.high, true);
        }
        /**
         * Converts this Long to its byte representation.
         * @param {boolean=} le Whether little or big endian, defaults to big endian
         * @returns {!Array.<number>} Byte representation
         */

    }, {
        key: "toBytes",
        value: function toBytes(le) {
            return le ? this.toBytesLE() : this.toBytesBE();
        }
        /**
         * Converts this Long to its little endian byte representation.
         * @returns {!Array.<number>} Little endian byte representation
         */

    }, {
        key: "toBytesLE",
        value: function toBytesLE() {
            var hi = this.high;
            var lo = this.low;
            return [lo & 0xff, lo >>> 8 & 0xff, lo >>> 16 & 0xff, lo >>> 24 & 0xff, hi & 0xff, hi >>> 8 & 0xff, hi >>> 16 & 0xff, hi >>> 24 & 0xff];
        }
        /**
         * Converts this Long to its big endian byte representation.
         * @returns {!Array.<number>} Big endian byte representation
         */

    }, {
        key: "toBytesBE",
        value: function toBytesBE() {
            var hi = this.high;
            var lo = this.low;
            return [hi >>> 24 & 0xff, hi >>> 16 & 0xff, hi >>> 8 & 0xff, hi & 0xff, lo >>> 24 & 0xff, lo >>> 16 & 0xff, lo >>> 8 & 0xff, lo & 0xff];
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            return (!this.unsigned && !this.lessThan(0) ? "+" : "") + this.toString();
        }
    }, {
        key: _Symbol.reflection,
        value: function value() {
            return {
                type: this.unsigned ? "System.UInt64" : "System.Int64",
                interfaces: ["FSharpRecord", "System.IComparable"],
                properties: {
                    low: "number",
                    high: "number",
                    unsigned: "boolean"
                }
            };
        }
    }], [{
        key: "ofJSON",
        value: function ofJSON(str) {
            return fromString(str, !/^[+-]/.test(str));
        }
    }]);
    return Long;
}();
// A cache of the Long representations of small integer values.
var INT_CACHE = {};
// A cache of the Long representations of small unsigned integer values.
var UINT_CACHE = {};
/**
 * Tests if the specified object is a
 * @param {*} obj Object
 * @returns {boolean}
 */
function isLong(obj) {
    return obj && obj instanceof Long;
}
/**
 * Returns a Long representing the given 32 bit integer value.
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
 * @returns {!Long} The corresponding Long value
 */
function fromInt(value) {
    var unsigned = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var obj = void 0;
    var cachedObj = void 0;
    var cache = false;
    if (unsigned) {
        value >>>= 0;
        if (0 <= value && value < 256) {
            cache = true;
            cachedObj = UINT_CACHE[value];
            if (cachedObj) return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache) UINT_CACHE[value] = obj;
        return obj;
    } else {
        value |= 0;
        if (-128 <= value && value < 128) {
            cache = true;
            cachedObj = INT_CACHE[value];
            if (cachedObj) return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache) INT_CACHE[value] = obj;
        return obj;
    }
}
/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
 * @returns {!Long} The corresponding Long value
 */
function fromNumber(value) {
    var unsigned = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (isNaN(value) || !isFinite(value)) {
        // TODO FormatException ?
        throw new Error("Input string was not in a correct format.");
    }
    if (unsigned) {
        if (value < 0) return UZERO;
        if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
    }
    if (value < 0) return fromNumber(-value, unsigned).neg();
    return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
}
/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
 * @returns {!Long} The corresponding Long value
 */
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}
/**
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 */
var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)
/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */
function fromString(str) {
    var unsigned = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

    if (isValid(str, radix) === null) {
        // TODO FormatException ?
        throw new Error("Input string was not in a correct format.");
    }
    if (str.length === 0) throw Error("empty string");
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity") return ZERO;
    if (typeof unsigned === "number") {
        // For goog.math.long compatibility
        radix = unsigned, unsigned = false;
    } else {
        unsigned = !!unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix) throw RangeError("radix");
    var p = str.indexOf("-");
    if (p > 0) throw Error("interior hyphen");else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }
    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 8));
    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i);
        var value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}
/**
 * Converts the specified value to a
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @returns {!Long}
 */
function fromValue(val) {
    if (val /* is compatible */ instanceof Long) return val;
    if (typeof val === "number") return fromNumber(val);
    if (typeof val === "string") return fromString(val);
    // Throws for non-objects, converts non-instanceof Long:
    return fromBits(val.low, val.high, val.unsigned);
}
// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.
var TWO_PWR_16_DBL = 1 << 16;
var TWO_PWR_24_DBL = 1 << 24;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
/**
 * Signed zero.
 * @type {!Long}
 */
var ZERO = fromInt(0);
/**
 * Unsigned zero.
 * @type {!Long}
 */
var UZERO = fromInt(0, true);
/**
 * Signed one.
 * @type {!Long}
 */
var ONE = fromInt(1);
/**
 * Unsigned one.
 * @type {!Long}
 */
var UONE = fromInt(1, true);
/**
 * Signed negative one.
 * @type {!Long}
 */
var NEG_ONE = fromInt(-1);
/**
 * Maximum signed value.
 * @type {!Long}
 */
var MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);
/**
 * Maximum unsigned value.
 * @type {!Long}
 */
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);
/**
 * Minimum signed value.
 * @type {!Long}
 */
var MIN_VALUE = fromBits(0, 0x80000000 | 0, false);

/* tslint:disable */
function parse$1(v, kind) {
    if (kind == null) {
        kind = typeof v === "string" && v.slice(-1) === "Z" ? 1 /* UTC */ : 2 /* Local */;
    }
    var date = v == null ? new Date() : new Date(v);
    if (isNaN(date.getTime())) {
        // Check if this is a time-only string, which JS Date parsing cannot handle (see #1045)
        if (typeof v === "string" && /^(?:[01]?\d|2[0-3]):(?:[0-5]?\d)(?::[0-5]?\d(?:\.\d+)?)?(?:\s*[AaPp][Mm])?$/.test(v)) {
            var d = new Date();
            date = new Date(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + v);
        } else {
            throw new Error("The string is not a valid Date.");
        }
    }
    if (kind === 2 /* Local */) {
            date.kind = kind;
        }
    return date;
}
/* tslint:enable */

// From http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escape$1(str) {
    return str.replace(/[\-\[\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var fsFormatRegExp = /(^|[^%])%([0+ ]*)(-?\d+)?(?:\.(\d+))?(\w)/;




function toHex(value) {
    return value < 0 ? "ff" + (16777215 - (Math.abs(value) - 1)).toString(16) : value.toString(16);
}
function fsFormat(str) {
    function formatOnce(str2, rep) {
        return str2.replace(fsFormatRegExp, function (_, prefix, flags, pad, precision, format) {
            switch (format) {
                case "f":
                case "F":
                    rep = rep.toFixed(precision || 6);
                    break;
                case "g":
                case "G":
                    rep = rep.toPrecision(precision);
                    break;
                case "e":
                case "E":
                    rep = rep.toExponential(precision);
                    break;
                case "O":
                    rep = toString(rep);
                    break;
                case "A":
                    rep = toString(rep, true);
                    break;
                case "x":
                    rep = toHex(Number(rep));
                    break;
                case "X":
                    rep = toHex(Number(rep)).toUpperCase();
                    break;
            }
            var plusPrefix = flags.indexOf("+") >= 0 && parseInt(rep, 10) >= 0;
            pad = parseInt(pad, 10);
            if (!isNaN(pad)) {
                var ch = pad >= 0 && flags.indexOf("0") >= 0 ? "0" : " ";
                rep = padLeft(rep, Math.abs(pad) - (plusPrefix ? 1 : 0), ch, pad < 0);
            }
            var once = prefix + (plusPrefix ? "+" + rep : rep);
            return once.replace(/%/g, "%%");
        });
    }

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    if (args.length === 0) {
        return function (cont) {
            if (fsFormatRegExp.test(str)) {
                return function () {
                    for (var _len3 = arguments.length, args2 = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                        args2[_key3] = arguments[_key3];
                    }

                    var strCopy = str;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = args2[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var arg = _step2.value;

                            strCopy = formatOnce(strCopy, arg);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    return cont(strCopy.replace(/%%/g, "%"));
                };
            } else {
                return cont(str);
            }
        };
    } else {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = args[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var arg = _step3.value;

                str = formatOnce(str, arg);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return str.replace(/%%/g, "%");
    }
}






function join(delimiter, xs) {
    var xs2 = xs;
    var len = arguments.length;
    if (len > 2) {
        xs2 = Array(len - 1);
        for (var key = 1; key < len; key++) {
            xs2[key - 1] = arguments[key];
        }
    } else if (!Array.isArray(xs)) {
        xs2 = Array.from(xs);
    }
    return xs2.map(function (x) {
        return toString(x);
    }).join(delimiter);
}
function newGuid() {
    var uuid = "";
    for (var i = 0; i < 32; i++) {
        var random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += "-";
        }
        uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
    }
    return uuid;
}


function padLeft(str, len, ch, isRight) {
    ch = ch || " ";
    str = String(str);
    len = len - str.length;
    for (var i = 0; i < len; i++) {
        str = isRight ? str + ch : ch + str;
    }
    return str;
}





function split(str, splitters, count, removeEmpty) {
    count = typeof count === "number" ? count : null;
    removeEmpty = typeof removeEmpty === "number" ? removeEmpty : null;
    if (count < 0) {
        throw new Error("Count cannot be less than zero");
    }
    if (count === 0) {
        return [];
    }
    var splitters2 = splitters;
    if (!Array.isArray(splitters)) {
        var len = arguments.length;
        splitters2 = Array(len - 1);
        for (var key = 1; key < len; key++) {
            splitters2[key - 1] = arguments[key];
        }
    }
    splitters2 = splitters2.map(function (x) {
        return escape$1(x);
    });
    splitters2 = splitters2.length > 0 ? splitters2 : [" "];
    var i = 0;
    var splits = [];
    var reg = new RegExp(splitters2.join("|"), "g");
    while (count == null || count > 1) {
        var m = reg.exec(str);
        if (m === null) {
            break;
        }
        if (!removeEmpty || m.index - i > 0) {
            count = count != null ? count - 1 : count;
            splits.push(str.substring(i, m.index));
        }
        i = reg.lastIndex;
    }
    if (!removeEmpty || str.length - i > 0) {
        splits.push(str.substring(i));
    }
    return splits;
}

var Types = function (__exports) {
  var IDisplay = __exports.IDisplay = function () {
    function IDisplay(tag, data) {
      babelHelpers.classCallCheck(this, IDisplay);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(IDisplay, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Grids.Columns.Types.IDisplay",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: [["Mobile"], ["DesktopOnly"]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return compareUnions(this, other) | 0;
      }
    }]);
    return IDisplay;
  }();

  setType("Elmish.Bulma.Grids.Columns.Types.IDisplay", IDisplay);

  var ISpacing = __exports.ISpacing = function () {
    function ISpacing(tag, data) {
      babelHelpers.classCallCheck(this, ISpacing);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(ISpacing, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Grids.Columns.Types.ISpacing",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: [["IsMultiline"], ["IsGapless"], ["IsGrid"]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return compareUnions(this, other) | 0;
      }
    }]);
    return ISpacing;
  }();

  setType("Elmish.Bulma.Grids.Columns.Types.ISpacing", ISpacing);

  var IAlignement = __exports.IAlignement = function () {
    function IAlignement(tag, data) {
      babelHelpers.classCallCheck(this, IAlignement);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(IAlignement, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Grids.Columns.Types.IAlignement",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: [["IsCentered"], ["IsVCentered"]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return compareUnions(this, other) | 0;
      }
    }]);
    return IAlignement;
  }();

  setType("Elmish.Bulma.Grids.Columns.Types.IAlignement", IAlignement);

  var Option$$1 = __exports.Option = function () {
    function Option$$1(tag, data) {
      babelHelpers.classCallCheck(this, Option$$1);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(Option$$1, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Grids.Columns.Types.Option",
          interfaces: ["FSharpUnion", "System.IEquatable"],
          cases: [["Display", IDisplay], ["Spacing", ISpacing], ["Alignment", IAlignement], ["CustomClass", "string"], ["Props", makeGeneric(List$1, {
            T: Interface("Fable.Helpers.React.Props.IHTMLProp")
          })]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }]);
    return Option$$1;
  }();

  setType("Elmish.Bulma.Grids.Columns.Types.Option", Option$$1);

  var ofAlignment = __exports.ofAlignment = function (_arg1) {
    if (_arg1.tag === 1) {
      return "is-vcentered";
    } else {
      return "is-centered";
    }
  };

  var ofSpacing = __exports.ofSpacing = function (_arg1) {
    if (_arg1.tag === 1) {
      return "is-gapless";
    } else if (_arg1.tag === 2) {
      return "is-grid";
    } else {
      return "is-multiline";
    }
  };

  var ofDisplay = __exports.ofDisplay = function (_arg1) {
    if (_arg1.tag === 1) {
      return "only-desktop";
    } else {
      return "on-mobile";
    }
  };

  var Options = __exports.Options = function () {
    function Options(display, spacing, alignment, customClass, props) {
      babelHelpers.classCallCheck(this, Options);
      this.Display = display;
      this.Spacing = spacing;
      this.Alignment = alignment;
      this.CustomClass = customClass;
      this.Props = props;
    }

    babelHelpers.createClass(Options, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Grids.Columns.Types.Options",
          interfaces: ["FSharpRecord", "System.IEquatable"],
          properties: {
            Display: Option("string"),
            Spacing: Option("string"),
            Alignment: Option("string"),
            CustomClass: Option("string"),
            Props: makeGeneric(List$1, {
              T: Interface("Fable.Helpers.React.Props.IHTMLProp")
            })
          }
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return equalsRecords(this, other);
      }
    }], [{
      key: "Empty",
      get: function get() {
        return new Options(null, null, null, null, new List$1());
      }
    }]);
    return Options;
  }();

  setType("Elmish.Bulma.Grids.Columns.Types.Options", Options);
  return __exports;
}({});
var isCentered = new Types.Option(2, new Types.IAlignement(0));
var isVCentered = new Types.Option(2, new Types.IAlignement(1));
var onMobile = new Types.Option(0, new Types.IDisplay(0));
var onDesktopOnly = new Types.Option(0, new Types.IDisplay(1));
var isMultiline = new Types.Option(1, new Types.ISpacing(0));
var isGapless = new Types.Option(1, new Types.ISpacing(1));
var isGrid = new Types.Option(1, new Types.ISpacing(2));


function columns(options, children) {
  var parseOptions = function parseOptions(result, _arg1) {
    if (_arg1.tag === 1) {
      var Spacing = Types.ofSpacing(_arg1.data);
      return new Types.Options(result.Display, Spacing, result.Alignment, result.CustomClass, result.Props);
    } else if (_arg1.tag === 2) {
      var Alignment = Types.ofAlignment(_arg1.data);
      return new Types.Options(result.Display, result.Spacing, Alignment, result.CustomClass, result.Props);
    } else if (_arg1.tag === 3) {
      var CustomClass = _arg1.data;
      return new Types.Options(result.Display, result.Spacing, result.Alignment, CustomClass, result.Props);
    } else if (_arg1.tag === 4) {
      return new Types.Options(result.Display, result.Spacing, result.Alignment, result.CustomClass, _arg1.data);
    } else {
      return new Types.Options(Types.ofDisplay(_arg1.data), result.Spacing, result.Alignment, result.CustomClass, result.Props);
    }
  };

  var opts = function () {
    var state = Types.Options.Empty;
    return function (list) {
      return fold$1(parseOptions, state, list);
    };
  }()(options);

  return react_1.apply(undefined, ["div", createObj(toList(delay(function () {
    return append$1(singleton$1(new Props.HTMLAttr(22, join(" ", new List$1("columns", map(function (x) {
      return x;
    }, filter(function (x_1) {
      return function () {
        return x_1 != null;
      }();
    }, ofArray([opts.Alignment, opts.Display, opts.Spacing, opts.CustomClass]))))))), delay(function () {
      return opts.Props;
    }));
  })), 1)].concat(babelHelpers.toConsumableArray(children)));
}

var Types$1 = function (__exports) {
  var ISize = __exports.ISize = function () {
    function ISize(tag, data) {
      babelHelpers.classCallCheck(this, ISize);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(ISize, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Grids.Column.Types.ISize",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: [["IsOneQuarter"], ["IsOneThird"], ["IsHalf"], ["IsTwoThirds"], ["IsThreeQuarters"], ["Is1"], ["Is2"], ["Is3"], ["Is4"], ["Is5"], ["Is6"], ["Is7"], ["Is8"], ["Is9"], ["Is10"], ["Is11"], ["IsNarrow"], ["IsFull"]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return compareUnions(this, other) | 0;
      }
    }]);
    return ISize;
  }();

  setType("Elmish.Bulma.Grids.Column.Types.ISize", ISize);

  var IScreen = __exports.IScreen = function () {
    function IScreen(tag, data) {
      babelHelpers.classCallCheck(this, IScreen);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(IScreen, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Grids.Column.Types.IScreen",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: [["All"], ["Desktop"], ["Tablet"], ["Mobile"], ["WideScreen"]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return compareUnions(this, other) | 0;
      }
    }]);
    return IScreen;
  }();

  setType("Elmish.Bulma.Grids.Column.Types.IScreen", IScreen);

  var Option$$1 = __exports.Option = function () {
    function Option$$1(tag, data) {
      babelHelpers.classCallCheck(this, Option$$1);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(Option$$1, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Grids.Column.Types.Option",
          interfaces: ["FSharpUnion", "System.IEquatable"],
          cases: [["Width", IScreen, ISize], ["Offset", IScreen, ISize], ["CustomClass", "string"], ["Props", makeGeneric(List$1, {
            T: Interface("Fable.Helpers.React.Props.IHTMLProp")
          })]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }]);
    return Option$$1;
  }();

  setType("Elmish.Bulma.Grids.Column.Types.Option", Option$$1);

  var ofWidth = __exports.ofWidth = function (_arg1_0, _arg1_1) {
    var _arg1 = [_arg1_0, _arg1_1];

    if (_arg1[0].tag === 1) {
      if (_arg1[1].tag === 1) {
        return Bulma.Grid.Column.Desktop.Width.IsOneThird;
      } else if (_arg1[1].tag === 2) {
        return Bulma.Grid.Column.Desktop.Width.IsHalf;
      } else if (_arg1[1].tag === 3) {
        return Bulma.Grid.Column.Desktop.Width.IsTwoThirds;
      } else if (_arg1[1].tag === 4) {
        return Bulma.Grid.Column.Desktop.Width.IsThreeQuarters;
      } else if (_arg1[1].tag === 5) {
        return Bulma.Grid.Column.Desktop.Width.Is1;
      } else if (_arg1[1].tag === 6) {
        return Bulma.Grid.Column.Desktop.Width.Is2;
      } else if (_arg1[1].tag === 7) {
        return Bulma.Grid.Column.Desktop.Width.Is3;
      } else if (_arg1[1].tag === 8) {
        return Bulma.Grid.Column.Desktop.Width.Is4;
      } else if (_arg1[1].tag === 9) {
        return Bulma.Grid.Column.Desktop.Width.Is5;
      } else if (_arg1[1].tag === 10) {
        return Bulma.Grid.Column.Desktop.Width.Is6;
      } else if (_arg1[1].tag === 11) {
        return Bulma.Grid.Column.Desktop.Width.Is7;
      } else if (_arg1[1].tag === 12) {
        return Bulma.Grid.Column.Desktop.Width.Is8;
      } else if (_arg1[1].tag === 13) {
        return Bulma.Grid.Column.Desktop.Width.Is9;
      } else if (_arg1[1].tag === 14) {
        return Bulma.Grid.Column.Desktop.Width.Is10;
      } else if (_arg1[1].tag === 15) {
        return Bulma.Grid.Column.Desktop.Width.Is11;
      } else if (_arg1[1].tag === 16) {
        return Bulma.Grid.Column.Desktop.Width.IsNarrow;
      } else if (_arg1[1].tag === 17) {
        return Bulma.Grid.Column.Desktop.Width.IsFull;
      } else {
        return Bulma.Grid.Column.Desktop.Width.IsOneQuarter;
      }
    } else if (_arg1[0].tag === 2) {
      if (_arg1[1].tag === 1) {
        return Bulma.Grid.Column.Tablet.Width.IsOneThird;
      } else if (_arg1[1].tag === 2) {
        return Bulma.Grid.Column.Tablet.Width.IsHalf;
      } else if (_arg1[1].tag === 3) {
        return Bulma.Grid.Column.Tablet.Width.IsTwoThirds;
      } else if (_arg1[1].tag === 4) {
        return Bulma.Grid.Column.Tablet.Width.IsThreeQuarters;
      } else if (_arg1[1].tag === 5) {
        return Bulma.Grid.Column.Tablet.Width.Is1;
      } else if (_arg1[1].tag === 6) {
        return Bulma.Grid.Column.Tablet.Width.Is2;
      } else if (_arg1[1].tag === 7) {
        return Bulma.Grid.Column.Tablet.Width.Is3;
      } else if (_arg1[1].tag === 8) {
        return Bulma.Grid.Column.Tablet.Width.Is4;
      } else if (_arg1[1].tag === 9) {
        return Bulma.Grid.Column.Tablet.Width.Is5;
      } else if (_arg1[1].tag === 10) {
        return Bulma.Grid.Column.Tablet.Width.Is6;
      } else if (_arg1[1].tag === 11) {
        return Bulma.Grid.Column.Tablet.Width.Is7;
      } else if (_arg1[1].tag === 12) {
        return Bulma.Grid.Column.Tablet.Width.Is8;
      } else if (_arg1[1].tag === 13) {
        return Bulma.Grid.Column.Tablet.Width.Is9;
      } else if (_arg1[1].tag === 14) {
        return Bulma.Grid.Column.Tablet.Width.Is10;
      } else if (_arg1[1].tag === 15) {
        return Bulma.Grid.Column.Tablet.Width.Is11;
      } else if (_arg1[1].tag === 16) {
        return Bulma.Grid.Column.Tablet.Width.IsNarrow;
      } else if (_arg1[1].tag === 17) {
        return Bulma.Grid.Column.Tablet.Width.IsFull;
      } else {
        return Bulma.Grid.Column.Tablet.Width.IsOneQuarter;
      }
    } else if (_arg1[0].tag === 3) {
      if (_arg1[1].tag === 1) {
        return Bulma.Grid.Column.Mobile.Width.IsOneThird;
      } else if (_arg1[1].tag === 2) {
        return Bulma.Grid.Column.Mobile.Width.IsHalf;
      } else if (_arg1[1].tag === 3) {
        return Bulma.Grid.Column.Mobile.Width.IsTwoThirds;
      } else if (_arg1[1].tag === 4) {
        return Bulma.Grid.Column.Mobile.Width.IsThreeQuarters;
      } else if (_arg1[1].tag === 5) {
        return Bulma.Grid.Column.Mobile.Width.Is1;
      } else if (_arg1[1].tag === 6) {
        return Bulma.Grid.Column.Mobile.Width.Is2;
      } else if (_arg1[1].tag === 7) {
        return Bulma.Grid.Column.Mobile.Width.Is3;
      } else if (_arg1[1].tag === 8) {
        return Bulma.Grid.Column.Mobile.Width.Is4;
      } else if (_arg1[1].tag === 9) {
        return Bulma.Grid.Column.Mobile.Width.Is5;
      } else if (_arg1[1].tag === 10) {
        return Bulma.Grid.Column.Mobile.Width.Is6;
      } else if (_arg1[1].tag === 11) {
        return Bulma.Grid.Column.Mobile.Width.Is7;
      } else if (_arg1[1].tag === 12) {
        return Bulma.Grid.Column.Mobile.Width.Is8;
      } else if (_arg1[1].tag === 13) {
        return Bulma.Grid.Column.Mobile.Width.Is9;
      } else if (_arg1[1].tag === 14) {
        return Bulma.Grid.Column.Mobile.Width.Is10;
      } else if (_arg1[1].tag === 15) {
        return Bulma.Grid.Column.Mobile.Width.Is11;
      } else if (_arg1[1].tag === 16) {
        return Bulma.Grid.Column.Mobile.Width.IsNarrow;
      } else if (_arg1[1].tag === 17) {
        return Bulma.Grid.Column.Mobile.Width.IsFull;
      } else {
        return Bulma.Grid.Column.Mobile.Width.IsOneQuarter;
      }
    } else if (_arg1[0].tag === 4) {
      if (_arg1[1].tag === 1) {
        return Bulma.Grid.Column.WideScreen.Width.IsOneThird;
      } else if (_arg1[1].tag === 2) {
        return Bulma.Grid.Column.WideScreen.Width.IsHalf;
      } else if (_arg1[1].tag === 3) {
        return Bulma.Grid.Column.WideScreen.Width.IsTwoThirds;
      } else if (_arg1[1].tag === 4) {
        return Bulma.Grid.Column.WideScreen.Width.IsThreeQuarters;
      } else if (_arg1[1].tag === 5) {
        return Bulma.Grid.Column.WideScreen.Width.Is1;
      } else if (_arg1[1].tag === 6) {
        return Bulma.Grid.Column.WideScreen.Width.Is2;
      } else if (_arg1[1].tag === 7) {
        return Bulma.Grid.Column.WideScreen.Width.Is3;
      } else if (_arg1[1].tag === 8) {
        return Bulma.Grid.Column.WideScreen.Width.Is4;
      } else if (_arg1[1].tag === 9) {
        return Bulma.Grid.Column.WideScreen.Width.Is5;
      } else if (_arg1[1].tag === 10) {
        return Bulma.Grid.Column.WideScreen.Width.Is6;
      } else if (_arg1[1].tag === 11) {
        return Bulma.Grid.Column.WideScreen.Width.Is7;
      } else if (_arg1[1].tag === 12) {
        return Bulma.Grid.Column.WideScreen.Width.Is8;
      } else if (_arg1[1].tag === 13) {
        return Bulma.Grid.Column.WideScreen.Width.Is9;
      } else if (_arg1[1].tag === 14) {
        return Bulma.Grid.Column.WideScreen.Width.Is10;
      } else if (_arg1[1].tag === 15) {
        return Bulma.Grid.Column.WideScreen.Width.Is11;
      } else if (_arg1[1].tag === 16) {
        return Bulma.Grid.Column.WideScreen.Width.IsNarrow;
      } else if (_arg1[1].tag === 17) {
        return Bulma.Grid.Column.WideScreen.Width.IsFull;
      } else {
        return Bulma.Grid.Column.WideScreen.Width.IsOneQuarter;
      }
    } else if (_arg1[1].tag === 1) {
      return Bulma.Grid.Column.Width.IsOneThird;
    } else if (_arg1[1].tag === 2) {
      return Bulma.Grid.Column.Width.IsHalf;
    } else if (_arg1[1].tag === 3) {
      return Bulma.Grid.Column.Width.IsTwoThirds;
    } else if (_arg1[1].tag === 4) {
      return Bulma.Grid.Column.Width.IsThreeQuarters;
    } else if (_arg1[1].tag === 5) {
      return Bulma.Grid.Column.Width.Is1;
    } else if (_arg1[1].tag === 6) {
      return Bulma.Grid.Column.Width.Is2;
    } else if (_arg1[1].tag === 7) {
      return Bulma.Grid.Column.Width.Is3;
    } else if (_arg1[1].tag === 8) {
      return Bulma.Grid.Column.Width.Is4;
    } else if (_arg1[1].tag === 9) {
      return Bulma.Grid.Column.Width.Is5;
    } else if (_arg1[1].tag === 10) {
      return Bulma.Grid.Column.Width.Is6;
    } else if (_arg1[1].tag === 11) {
      return Bulma.Grid.Column.Width.Is7;
    } else if (_arg1[1].tag === 12) {
      return Bulma.Grid.Column.Width.Is8;
    } else if (_arg1[1].tag === 13) {
      return Bulma.Grid.Column.Width.Is9;
    } else if (_arg1[1].tag === 14) {
      return Bulma.Grid.Column.Width.Is10;
    } else if (_arg1[1].tag === 15) {
      return Bulma.Grid.Column.Width.Is11;
    } else if (_arg1[1].tag === 16) {
      return Bulma.Grid.Column.Width.IsNarrow;
    } else if (_arg1[1].tag === 17) {
      return Bulma.Grid.Column.Width.IsFull;
    } else {
      return Bulma.Grid.Column.Width.IsOneQuarter;
    }
  };

  var ofOffset = __exports.ofOffset = function (_arg1_0, _arg1_1) {
    var _arg1 = [_arg1_0, _arg1_1];

    if (_arg1[0].tag === 1) {
      if (_arg1[1].tag === 1) {
        return Bulma.Grid.Column.Desktop.Offset.IsOneThird;
      } else if (_arg1[1].tag === 2) {
        return Bulma.Grid.Column.Desktop.Offset.IsHalf;
      } else if (_arg1[1].tag === 3) {
        return Bulma.Grid.Column.Desktop.Offset.IsTwoThirds;
      } else if (_arg1[1].tag === 4) {
        return Bulma.Grid.Column.Desktop.Offset.IsThreeQuarters;
      } else if (_arg1[1].tag === 5) {
        return Bulma.Grid.Column.Desktop.Offset.Is1;
      } else if (_arg1[1].tag === 6) {
        return Bulma.Grid.Column.Desktop.Offset.Is2;
      } else if (_arg1[1].tag === 7) {
        return Bulma.Grid.Column.Desktop.Offset.Is3;
      } else if (_arg1[1].tag === 8) {
        return Bulma.Grid.Column.Desktop.Offset.Is4;
      } else if (_arg1[1].tag === 9) {
        return Bulma.Grid.Column.Desktop.Offset.Is5;
      } else if (_arg1[1].tag === 10) {
        return Bulma.Grid.Column.Desktop.Offset.Is6;
      } else if (_arg1[1].tag === 11) {
        return Bulma.Grid.Column.Desktop.Offset.Is7;
      } else if (_arg1[1].tag === 12) {
        return Bulma.Grid.Column.Desktop.Offset.Is8;
      } else if (_arg1[1].tag === 13) {
        return Bulma.Grid.Column.Desktop.Offset.Is9;
      } else if (_arg1[1].tag === 14) {
        return Bulma.Grid.Column.Desktop.Offset.Is10;
      } else if (_arg1[1].tag === 15) {
        return Bulma.Grid.Column.Desktop.Offset.Is11;
      } else if (_arg1[1].tag === 16) {
        return Bulma.Grid.Column.Desktop.Offset.IsNarrow;
      } else if (_arg1[1].tag === 17) {
        return Bulma.Grid.Column.Desktop.Offset.IsFull;
      } else {
        return Bulma.Grid.Column.Desktop.Offset.IsOneQuarter;
      }
    } else if (_arg1[0].tag === 2) {
      if (_arg1[1].tag === 1) {
        return Bulma.Grid.Column.Tablet.Offset.IsOneThird;
      } else if (_arg1[1].tag === 2) {
        return Bulma.Grid.Column.Tablet.Offset.IsHalf;
      } else if (_arg1[1].tag === 3) {
        return Bulma.Grid.Column.Tablet.Offset.IsTwoThirds;
      } else if (_arg1[1].tag === 4) {
        return Bulma.Grid.Column.Tablet.Offset.IsThreeQuarters;
      } else if (_arg1[1].tag === 5) {
        return Bulma.Grid.Column.Tablet.Offset.Is1;
      } else if (_arg1[1].tag === 6) {
        return Bulma.Grid.Column.Tablet.Offset.Is2;
      } else if (_arg1[1].tag === 7) {
        return Bulma.Grid.Column.Tablet.Offset.Is3;
      } else if (_arg1[1].tag === 8) {
        return Bulma.Grid.Column.Tablet.Offset.Is4;
      } else if (_arg1[1].tag === 9) {
        return Bulma.Grid.Column.Tablet.Offset.Is5;
      } else if (_arg1[1].tag === 10) {
        return Bulma.Grid.Column.Tablet.Offset.Is6;
      } else if (_arg1[1].tag === 11) {
        return Bulma.Grid.Column.Tablet.Offset.Is7;
      } else if (_arg1[1].tag === 12) {
        return Bulma.Grid.Column.Tablet.Offset.Is8;
      } else if (_arg1[1].tag === 13) {
        return Bulma.Grid.Column.Tablet.Offset.Is9;
      } else if (_arg1[1].tag === 14) {
        return Bulma.Grid.Column.Tablet.Offset.Is10;
      } else if (_arg1[1].tag === 15) {
        return Bulma.Grid.Column.Tablet.Offset.Is11;
      } else if (_arg1[1].tag === 16) {
        return Bulma.Grid.Column.Tablet.Offset.IsNarrow;
      } else if (_arg1[1].tag === 17) {
        return Bulma.Grid.Column.Tablet.Offset.IsFull;
      } else {
        return Bulma.Grid.Column.Tablet.Offset.IsOneQuarter;
      }
    } else if (_arg1[0].tag === 3) {
      if (_arg1[1].tag === 1) {
        return Bulma.Grid.Column.Mobile.Offset.IsOneThird;
      } else if (_arg1[1].tag === 2) {
        return Bulma.Grid.Column.Mobile.Offset.IsHalf;
      } else if (_arg1[1].tag === 3) {
        return Bulma.Grid.Column.Mobile.Offset.IsTwoThirds;
      } else if (_arg1[1].tag === 4) {
        return Bulma.Grid.Column.Mobile.Offset.IsThreeQuarters;
      } else if (_arg1[1].tag === 5) {
        return Bulma.Grid.Column.Mobile.Offset.Is1;
      } else if (_arg1[1].tag === 6) {
        return Bulma.Grid.Column.Mobile.Offset.Is2;
      } else if (_arg1[1].tag === 7) {
        return Bulma.Grid.Column.Mobile.Offset.Is3;
      } else if (_arg1[1].tag === 8) {
        return Bulma.Grid.Column.Mobile.Offset.Is4;
      } else if (_arg1[1].tag === 9) {
        return Bulma.Grid.Column.Mobile.Offset.Is5;
      } else if (_arg1[1].tag === 10) {
        return Bulma.Grid.Column.Mobile.Offset.Is6;
      } else if (_arg1[1].tag === 11) {
        return Bulma.Grid.Column.Mobile.Offset.Is7;
      } else if (_arg1[1].tag === 12) {
        return Bulma.Grid.Column.Mobile.Offset.Is8;
      } else if (_arg1[1].tag === 13) {
        return Bulma.Grid.Column.Mobile.Offset.Is9;
      } else if (_arg1[1].tag === 14) {
        return Bulma.Grid.Column.Mobile.Offset.Is10;
      } else if (_arg1[1].tag === 15) {
        return Bulma.Grid.Column.Mobile.Offset.Is11;
      } else if (_arg1[1].tag === 16) {
        return Bulma.Grid.Column.Mobile.Offset.IsNarrow;
      } else if (_arg1[1].tag === 17) {
        return Bulma.Grid.Column.Mobile.Offset.IsFull;
      } else {
        return Bulma.Grid.Column.Mobile.Offset.IsOneQuarter;
      }
    } else if (_arg1[0].tag === 4) {
      if (_arg1[1].tag === 1) {
        return Bulma.Grid.Column.WideScreen.Offset.IsOneThird;
      } else if (_arg1[1].tag === 2) {
        return Bulma.Grid.Column.WideScreen.Offset.IsHalf;
      } else if (_arg1[1].tag === 3) {
        return Bulma.Grid.Column.WideScreen.Offset.IsTwoThirds;
      } else if (_arg1[1].tag === 4) {
        return Bulma.Grid.Column.WideScreen.Offset.IsThreeQuarters;
      } else if (_arg1[1].tag === 5) {
        return Bulma.Grid.Column.WideScreen.Offset.Is1;
      } else if (_arg1[1].tag === 6) {
        return Bulma.Grid.Column.WideScreen.Offset.Is2;
      } else if (_arg1[1].tag === 7) {
        return Bulma.Grid.Column.WideScreen.Offset.Is3;
      } else if (_arg1[1].tag === 8) {
        return Bulma.Grid.Column.WideScreen.Offset.Is4;
      } else if (_arg1[1].tag === 9) {
        return Bulma.Grid.Column.WideScreen.Offset.Is5;
      } else if (_arg1[1].tag === 10) {
        return Bulma.Grid.Column.WideScreen.Offset.Is6;
      } else if (_arg1[1].tag === 11) {
        return Bulma.Grid.Column.WideScreen.Offset.Is7;
      } else if (_arg1[1].tag === 12) {
        return Bulma.Grid.Column.WideScreen.Offset.Is8;
      } else if (_arg1[1].tag === 13) {
        return Bulma.Grid.Column.WideScreen.Offset.Is9;
      } else if (_arg1[1].tag === 14) {
        return Bulma.Grid.Column.WideScreen.Offset.Is10;
      } else if (_arg1[1].tag === 15) {
        return Bulma.Grid.Column.WideScreen.Offset.Is11;
      } else if (_arg1[1].tag === 16) {
        return Bulma.Grid.Column.WideScreen.Offset.IsNarrow;
      } else if (_arg1[1].tag === 17) {
        return Bulma.Grid.Column.WideScreen.Offset.IsFull;
      } else {
        return Bulma.Grid.Column.WideScreen.Offset.IsOneQuarter;
      }
    } else if (_arg1[1].tag === 1) {
      return Bulma.Grid.Column.Offset.IsOneThird;
    } else if (_arg1[1].tag === 2) {
      return Bulma.Grid.Column.Offset.IsHalf;
    } else if (_arg1[1].tag === 3) {
      return Bulma.Grid.Column.Offset.IsTwoThirds;
    } else if (_arg1[1].tag === 4) {
      return Bulma.Grid.Column.Offset.IsThreeQuarters;
    } else if (_arg1[1].tag === 5) {
      return Bulma.Grid.Column.Offset.Is1;
    } else if (_arg1[1].tag === 6) {
      return Bulma.Grid.Column.Offset.Is2;
    } else if (_arg1[1].tag === 7) {
      return Bulma.Grid.Column.Offset.Is3;
    } else if (_arg1[1].tag === 8) {
      return Bulma.Grid.Column.Offset.Is4;
    } else if (_arg1[1].tag === 9) {
      return Bulma.Grid.Column.Offset.Is5;
    } else if (_arg1[1].tag === 10) {
      return Bulma.Grid.Column.Offset.Is6;
    } else if (_arg1[1].tag === 11) {
      return Bulma.Grid.Column.Offset.Is7;
    } else if (_arg1[1].tag === 12) {
      return Bulma.Grid.Column.Offset.Is8;
    } else if (_arg1[1].tag === 13) {
      return Bulma.Grid.Column.Offset.Is9;
    } else if (_arg1[1].tag === 14) {
      return Bulma.Grid.Column.Offset.Is10;
    } else if (_arg1[1].tag === 15) {
      return Bulma.Grid.Column.Offset.Is11;
    } else if (_arg1[1].tag === 16) {
      return Bulma.Grid.Column.Offset.IsNarrow;
    } else if (_arg1[1].tag === 17) {
      return Bulma.Grid.Column.Offset.IsFull;
    } else {
      return Bulma.Grid.Column.Offset.IsOneQuarter;
    }
  };

  var Options = __exports.Options = function () {
    function Options(width, offset, desktopWidth, desktopOffset, tabletpWidth, tabletpOffset, mobileWidth, mobileOffset, wideScreenpWidth, wideScreenpOffset, customClass, props) {
      babelHelpers.classCallCheck(this, Options);
      this.Width = width;
      this.Offset = offset;
      this.DesktopWidth = desktopWidth;
      this.DesktopOffset = desktopOffset;
      this.TabletpWidth = tabletpWidth;
      this.TabletpOffset = tabletpOffset;
      this.MobileWidth = mobileWidth;
      this.MobileOffset = mobileOffset;
      this.WideScreenpWidth = wideScreenpWidth;
      this.WideScreenpOffset = wideScreenpOffset;
      this.CustomClass = customClass;
      this.Props = props;
    }

    babelHelpers.createClass(Options, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Grids.Column.Types.Options",
          interfaces: ["FSharpRecord", "System.IEquatable"],
          properties: {
            Width: Option("string"),
            Offset: Option("string"),
            DesktopWidth: Option("string"),
            DesktopOffset: Option("string"),
            TabletpWidth: Option("string"),
            TabletpOffset: Option("string"),
            MobileWidth: Option("string"),
            MobileOffset: Option("string"),
            WideScreenpWidth: Option("string"),
            WideScreenpOffset: Option("string"),
            CustomClass: Option("string"),
            Props: makeGeneric(List$1, {
              T: Interface("Fable.Helpers.React.Props.IHTMLProp")
            })
          }
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return equalsRecords(this, other);
      }
    }], [{
      key: "Empty",
      get: function get() {
        return new Options(null, null, null, null, null, null, null, null, null, null, null, new List$1());
      }
    }]);
    return Options;
  }();

  setType("Elmish.Bulma.Grids.Column.Types.Options", Options);
  return __exports;
}({});
var Width = function (__exports) {
  var Dekstop = __exports.Dekstop = function (__exports) {
    var isOneQuarter = __exports.isOneQuarter = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(0)]);
    var isOneThird = __exports.isOneThird = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(1)]);
    var isHalf = __exports.isHalf = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(2)]);
    var isTwoThirds = __exports.isTwoThirds = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(3)]);
    var isThreeQuarters = __exports.isThreeQuarters = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(4)]);
    var is1 = __exports.is1 = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(5)]);
    var is2 = __exports.is2 = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(6)]);
    var is3 = __exports.is3 = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(7)]);
    var is4 = __exports.is4 = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(8)]);
    var is5 = __exports.is5 = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(9)]);
    var is6 = __exports.is6 = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(10)]);
    var is7 = __exports.is7 = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(11)]);
    var is8 = __exports.is8 = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(12)]);
    var is9 = __exports.is9 = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(13)]);
    var is10 = __exports.is10 = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(14)]);
    var is11 = __exports.is11 = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(15)]);
    var isNarrow = __exports.isNarrow = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(16)]);
    var isFull = __exports.isFull = new Types$1.Option(0, [new Types$1.IScreen(1), new Types$1.ISize(17)]);
    return __exports;
  }({});

  var WideScreen = __exports.WideScreen = function (__exports) {
    var isOneQuarter_1 = __exports.isOneQuarter = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(0)]);
    var isOneThird_1 = __exports.isOneThird = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(1)]);
    var isHalf_1 = __exports.isHalf = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(2)]);
    var isTwoThirds_1 = __exports.isTwoThirds = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(3)]);
    var isThreeQuarters_1 = __exports.isThreeQuarters = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(4)]);
    var is1_1 = __exports.is1 = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(5)]);
    var is2_1 = __exports.is2 = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(6)]);
    var is3_1 = __exports.is3 = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(7)]);
    var is4_1 = __exports.is4 = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(8)]);
    var is5_1 = __exports.is5 = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(9)]);
    var is6_1 = __exports.is6 = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(10)]);
    var is7_1 = __exports.is7 = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(11)]);
    var is8_1 = __exports.is8 = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(12)]);
    var is9_1 = __exports.is9 = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(13)]);
    var is10_1 = __exports.is10 = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(14)]);
    var is11_1 = __exports.is11 = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(15)]);
    var isNarrow_1 = __exports.isNarrow = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(16)]);
    var isFull_1 = __exports.isFull = new Types$1.Option(0, [new Types$1.IScreen(4), new Types$1.ISize(17)]);
    return __exports;
  }({});

  var Mobile = __exports.Mobile = function (__exports) {
    var isOneQuarter_2 = __exports.isOneQuarter = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(0)]);
    var isOneThird_2 = __exports.isOneThird = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(1)]);
    var isHalf_2 = __exports.isHalf = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(2)]);
    var isTwoThirds_2 = __exports.isTwoThirds = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(3)]);
    var isThreeQuarters_2 = __exports.isThreeQuarters = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(4)]);
    var is1_2 = __exports.is1 = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(5)]);
    var is2_2 = __exports.is2 = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(6)]);
    var is3_2 = __exports.is3 = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(7)]);
    var is4_2 = __exports.is4 = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(8)]);
    var is5_2 = __exports.is5 = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(9)]);
    var is6_2 = __exports.is6 = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(10)]);
    var is7_2 = __exports.is7 = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(11)]);
    var is8_2 = __exports.is8 = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(12)]);
    var is9_2 = __exports.is9 = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(13)]);
    var is10_2 = __exports.is10 = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(14)]);
    var is11_2 = __exports.is11 = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(15)]);
    var isNarrow_2 = __exports.isNarrow = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(16)]);
    var isFull_2 = __exports.isFull = new Types$1.Option(0, [new Types$1.IScreen(3), new Types$1.ISize(17)]);
    return __exports;
  }({});

  var Tablet = __exports.Tablet = function (__exports) {
    var isOneQuarter_3 = __exports.isOneQuarter = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(0)]);
    var isOneThird_3 = __exports.isOneThird = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(1)]);
    var isHalf_3 = __exports.isHalf = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(2)]);
    var isTwoThirds_3 = __exports.isTwoThirds = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(3)]);
    var isThreeQuarters_3 = __exports.isThreeQuarters = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(4)]);
    var is1_3 = __exports.is1 = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(5)]);
    var is2_3 = __exports.is2 = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(6)]);
    var is3_3 = __exports.is3 = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(7)]);
    var is4_3 = __exports.is4 = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(8)]);
    var is5_3 = __exports.is5 = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(9)]);
    var is6_3 = __exports.is6 = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(10)]);
    var is7_3 = __exports.is7 = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(11)]);
    var is8_3 = __exports.is8 = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(12)]);
    var is9_3 = __exports.is9 = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(13)]);
    var is10_3 = __exports.is10 = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(14)]);
    var is11_3 = __exports.is11 = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(15)]);
    var isNarrow_3 = __exports.isNarrow = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(16)]);
    var isFull_3 = __exports.isFull = new Types$1.Option(0, [new Types$1.IScreen(2), new Types$1.ISize(17)]);
    return __exports;
  }({});

  var isOneQuarter_4 = __exports.isOneQuarter = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(0)]);
  var isOneThird_4 = __exports.isOneThird = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(1)]);
  var isHalf_4 = __exports.isHalf = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(2)]);
  var isTwoThirds_4 = __exports.isTwoThirds = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(3)]);
  var isThreeQuarters_4 = __exports.isThreeQuarters = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(4)]);
  var is1_4 = __exports.is1 = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(5)]);
  var is2_4 = __exports.is2 = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(6)]);
  var is3_4 = __exports.is3 = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(7)]);
  var is4_4 = __exports.is4 = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(8)]);
  var is5_4 = __exports.is5 = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(9)]);
  var is6_4 = __exports.is6 = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(10)]);
  var is7_4 = __exports.is7 = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(11)]);
  var is8_4 = __exports.is8 = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(12)]);
  var is9_4 = __exports.is9 = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(13)]);
  var is10_4 = __exports.is10 = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(14)]);
  var is11_4 = __exports.is11 = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(15)]);
  var isNarrow_4 = __exports.isNarrow = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(16)]);
  var isFull_4 = __exports.isFull = new Types$1.Option(0, [new Types$1.IScreen(0), new Types$1.ISize(17)]);
  return __exports;
}({});
var Offset = function (__exports) {
  var Dekstop = __exports.Dekstop = function (__exports) {
    var isOneQuarter_5 = __exports.isOneQuarter = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(0)]);
    var isOneThird_5 = __exports.isOneThird = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(1)]);
    var isHalf_5 = __exports.isHalf = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(2)]);
    var isTwoThirds_5 = __exports.isTwoThirds = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(3)]);
    var isThreeQuarters_5 = __exports.isThreeQuarters = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(4)]);
    var is1_5 = __exports.is1 = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(5)]);
    var is2_5 = __exports.is2 = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(6)]);
    var is3_5 = __exports.is3 = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(7)]);
    var is4_5 = __exports.is4 = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(8)]);
    var is5_5 = __exports.is5 = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(9)]);
    var is6_5 = __exports.is6 = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(10)]);
    var is7_5 = __exports.is7 = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(11)]);
    var is8_5 = __exports.is8 = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(12)]);
    var is9_5 = __exports.is9 = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(13)]);
    var is10_5 = __exports.is10 = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(14)]);
    var is11_5 = __exports.is11 = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(15)]);
    var isNarrow_5 = __exports.isNarrow = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(16)]);
    var isFull_5 = __exports.isFull = new Types$1.Option(1, [new Types$1.IScreen(1), new Types$1.ISize(17)]);
    return __exports;
  }({});

  var WideScreen = __exports.WideScreen = function (__exports) {
    var isOneQuarter_6 = __exports.isOneQuarter = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(0)]);
    var isOneThird_6 = __exports.isOneThird = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(1)]);
    var isHalf_6 = __exports.isHalf = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(2)]);
    var isTwoThirds_6 = __exports.isTwoThirds = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(3)]);
    var isThreeQuarters_6 = __exports.isThreeQuarters = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(4)]);
    var is1_6 = __exports.is1 = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(5)]);
    var is2_6 = __exports.is2 = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(6)]);
    var is3_6 = __exports.is3 = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(7)]);
    var is4_6 = __exports.is4 = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(8)]);
    var is5_6 = __exports.is5 = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(9)]);
    var is6_6 = __exports.is6 = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(10)]);
    var is7_6 = __exports.is7 = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(11)]);
    var is8_6 = __exports.is8 = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(12)]);
    var is9_6 = __exports.is9 = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(13)]);
    var is10_6 = __exports.is10 = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(14)]);
    var is11_6 = __exports.is11 = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(15)]);
    var isNarrow_6 = __exports.isNarrow = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(16)]);
    var isFull_6 = __exports.isFull = new Types$1.Option(1, [new Types$1.IScreen(4), new Types$1.ISize(17)]);
    return __exports;
  }({});

  var Mobile = __exports.Mobile = function (__exports) {
    var isOneQuarter_7 = __exports.isOneQuarter = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(0)]);
    var isOneThird_7 = __exports.isOneThird = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(1)]);
    var isHalf_7 = __exports.isHalf = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(2)]);
    var isTwoThirds_7 = __exports.isTwoThirds = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(3)]);
    var isThreeQuarters_7 = __exports.isThreeQuarters = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(4)]);
    var is1_7 = __exports.is1 = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(5)]);
    var is2_7 = __exports.is2 = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(6)]);
    var is3_7 = __exports.is3 = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(7)]);
    var is4_7 = __exports.is4 = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(8)]);
    var is5_7 = __exports.is5 = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(9)]);
    var is6_7 = __exports.is6 = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(10)]);
    var is7_7 = __exports.is7 = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(11)]);
    var is8_7 = __exports.is8 = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(12)]);
    var is9_7 = __exports.is9 = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(13)]);
    var is10_7 = __exports.is10 = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(14)]);
    var is11_7 = __exports.is11 = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(15)]);
    var isNarrow_7 = __exports.isNarrow = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(16)]);
    var isFull_7 = __exports.isFull = new Types$1.Option(1, [new Types$1.IScreen(3), new Types$1.ISize(17)]);
    return __exports;
  }({});

  var Tablet = __exports.Tablet = function (__exports) {
    var isOneQuarter_8 = __exports.isOneQuarter = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(0)]);
    var isOneThird_8 = __exports.isOneThird = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(1)]);
    var isHalf_8 = __exports.isHalf = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(2)]);
    var isTwoThirds_8 = __exports.isTwoThirds = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(3)]);
    var isThreeQuarters_8 = __exports.isThreeQuarters = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(4)]);
    var is1_8 = __exports.is1 = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(5)]);
    var is2_8 = __exports.is2 = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(6)]);
    var is3_8 = __exports.is3 = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(7)]);
    var is4_8 = __exports.is4 = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(8)]);
    var is5_8 = __exports.is5 = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(9)]);
    var is6_8 = __exports.is6 = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(10)]);
    var is7_8 = __exports.is7 = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(11)]);
    var is8_8 = __exports.is8 = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(12)]);
    var is9_8 = __exports.is9 = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(13)]);
    var is10_8 = __exports.is10 = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(14)]);
    var is11_8 = __exports.is11 = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(15)]);
    var isNarrow_8 = __exports.isNarrow = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(16)]);
    var isFull_8 = __exports.isFull = new Types$1.Option(1, [new Types$1.IScreen(2), new Types$1.ISize(17)]);
    return __exports;
  }({});

  var isOneQuarter_9 = __exports.isOneQuarter = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(0)]);
  var isOneThird_9 = __exports.isOneThird = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(1)]);
  var isHalf_9 = __exports.isHalf = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(2)]);
  var isTwoThirds_9 = __exports.isTwoThirds = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(3)]);
  var isThreeQuarters_9 = __exports.isThreeQuarters = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(4)]);
  var is1_9 = __exports.is1 = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(5)]);
  var is2_9 = __exports.is2 = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(6)]);
  var is3_9 = __exports.is3 = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(7)]);
  var is4_9 = __exports.is4 = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(8)]);
  var is5_9 = __exports.is5 = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(9)]);
  var is6_9 = __exports.is6 = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(10)]);
  var is7_9 = __exports.is7 = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(11)]);
  var is8_9 = __exports.is8 = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(12)]);
  var is9_9 = __exports.is9 = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(13)]);
  var is10_9 = __exports.is10 = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(14)]);
  var is11_9 = __exports.is11 = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(15)]);
  var isNarrow_9 = __exports.isNarrow = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(16)]);
  var isFull_9 = __exports.isFull = new Types$1.Option(1, [new Types$1.IScreen(0), new Types$1.ISize(17)]);
  return __exports;
}({});


function column(options, children) {
  var parseOptions = function parseOptions(result, _arg1) {
    var $var1 = _arg1.tag === 0 ? _arg1.data[0].Equals(new Types$1.IScreen(0)) ? [0, _arg1.data[0], _arg1.data[1]] : [1] : [1];

    switch ($var1[0]) {
      case 0:
        return new Types$1.Options(Types$1.ofWidth($var1[1], $var1[2]), result.Offset, result.DesktopWidth, result.DesktopOffset, result.TabletpWidth, result.TabletpOffset, result.MobileWidth, result.MobileOffset, result.WideScreenpWidth, result.WideScreenpOffset, result.CustomClass, result.Props);

      case 1:
        var $var2 = _arg1.tag === 1 ? _arg1.data[0].Equals(new Types$1.IScreen(0)) ? [0, _arg1.data[1], _arg1.data[0]] : [1] : [1];

        switch ($var2[0]) {
          case 0:
            var Offset_1 = Types$1.ofOffset($var2[2], $var2[1]);
            return new Types$1.Options(result.Width, Offset_1, result.DesktopWidth, result.DesktopOffset, result.TabletpWidth, result.TabletpOffset, result.MobileWidth, result.MobileOffset, result.WideScreenpWidth, result.WideScreenpOffset, result.CustomClass, result.Props);

          case 1:
            var $var3 = _arg1.tag === 0 ? _arg1.data[0].Equals(new Types$1.IScreen(1)) ? [0, _arg1.data[0], _arg1.data[1]] : [1] : [1];

            switch ($var3[0]) {
              case 0:
                var DesktopWidth = Types$1.ofWidth($var3[1], $var3[2]);
                return new Types$1.Options(result.Width, result.Offset, DesktopWidth, result.DesktopOffset, result.TabletpWidth, result.TabletpOffset, result.MobileWidth, result.MobileOffset, result.WideScreenpWidth, result.WideScreenpOffset, result.CustomClass, result.Props);

              case 1:
                var $var4 = _arg1.tag === 1 ? _arg1.data[0].Equals(new Types$1.IScreen(1)) ? [0, _arg1.data[1], _arg1.data[0]] : [1] : [1];

                switch ($var4[0]) {
                  case 0:
                    var DesktopOffset = Types$1.ofOffset($var4[2], $var4[1]);
                    return new Types$1.Options(result.Width, result.Offset, result.DesktopWidth, DesktopOffset, result.TabletpWidth, result.TabletpOffset, result.MobileWidth, result.MobileOffset, result.WideScreenpWidth, result.WideScreenpOffset, result.CustomClass, result.Props);

                  case 1:
                    var $var5 = _arg1.tag === 0 ? _arg1.data[0].Equals(new Types$1.IScreen(2)) ? [0, _arg1.data[0], _arg1.data[1]] : [1] : [1];

                    switch ($var5[0]) {
                      case 0:
                        var TabletpWidth = Types$1.ofWidth($var5[1], $var5[2]);
                        return new Types$1.Options(result.Width, result.Offset, result.DesktopWidth, result.DesktopOffset, TabletpWidth, result.TabletpOffset, result.MobileWidth, result.MobileOffset, result.WideScreenpWidth, result.WideScreenpOffset, result.CustomClass, result.Props);

                      case 1:
                        var $var6 = _arg1.tag === 1 ? _arg1.data[0].Equals(new Types$1.IScreen(2)) ? [0, _arg1.data[1], _arg1.data[0]] : [1] : [1];

                        switch ($var6[0]) {
                          case 0:
                            var TabletpOffset = Types$1.ofOffset($var6[2], $var6[1]);
                            return new Types$1.Options(result.Width, result.Offset, result.DesktopWidth, result.DesktopOffset, result.TabletpWidth, TabletpOffset, result.MobileWidth, result.MobileOffset, result.WideScreenpWidth, result.WideScreenpOffset, result.CustomClass, result.Props);

                          case 1:
                            var $var7 = _arg1.tag === 0 ? _arg1.data[0].Equals(new Types$1.IScreen(3)) ? [0, _arg1.data[0], _arg1.data[1]] : [1] : [1];

                            switch ($var7[0]) {
                              case 0:
                                var MobileWidth = Types$1.ofWidth($var7[1], $var7[2]);
                                return new Types$1.Options(result.Width, result.Offset, result.DesktopWidth, result.DesktopOffset, result.TabletpWidth, result.TabletpOffset, MobileWidth, result.MobileOffset, result.WideScreenpWidth, result.WideScreenpOffset, result.CustomClass, result.Props);

                              case 1:
                                var $var8 = _arg1.tag === 1 ? _arg1.data[0].Equals(new Types$1.IScreen(3)) ? [0, _arg1.data[1], _arg1.data[0]] : [1] : [1];

                                switch ($var8[0]) {
                                  case 0:
                                    var MobileOffset = Types$1.ofOffset($var8[2], $var8[1]);
                                    return new Types$1.Options(result.Width, result.Offset, result.DesktopWidth, result.DesktopOffset, result.TabletpWidth, result.TabletpOffset, result.MobileWidth, MobileOffset, result.WideScreenpWidth, result.WideScreenpOffset, result.CustomClass, result.Props);

                                  case 1:
                                    var $var9 = _arg1.tag === 0 ? _arg1.data[0].Equals(new Types$1.IScreen(4)) ? [0, _arg1.data[0], _arg1.data[1]] : [1] : [1];

                                    switch ($var9[0]) {
                                      case 0:
                                        var WideScreenpWidth = Types$1.ofWidth($var9[1], $var9[2]);
                                        return new Types$1.Options(result.Width, result.Offset, result.DesktopWidth, result.DesktopOffset, result.TabletpWidth, result.TabletpOffset, result.MobileWidth, result.MobileOffset, WideScreenpWidth, result.WideScreenpOffset, result.CustomClass, result.Props);

                                      case 1:
                                        var $var10 = _arg1.tag === 1 ? _arg1.data[0].Equals(new Types$1.IScreen(4)) ? [0, _arg1.data[1], _arg1.data[0]] : [1] : [1];

                                        switch ($var10[0]) {
                                          case 0:
                                            var WideScreenpOffset = Types$1.ofOffset($var10[2], $var10[1]);
                                            return new Types$1.Options(result.Width, result.Offset, result.DesktopWidth, result.DesktopOffset, result.TabletpWidth, result.TabletpOffset, result.MobileWidth, result.MobileOffset, result.WideScreenpWidth, WideScreenpOffset, result.CustomClass, result.Props);

                                          case 1:
                                            if (_arg1.tag === 2) {
                                              var CustomClass = _arg1.data;
                                              return new Types$1.Options(result.Width, result.Offset, result.DesktopWidth, result.DesktopOffset, result.TabletpWidth, result.TabletpOffset, result.MobileWidth, result.MobileOffset, result.WideScreenpWidth, result.WideScreenpOffset, CustomClass, result.Props);
                                            } else if (_arg1.tag === 3) {
                                              return new Types$1.Options(result.Width, result.Offset, result.DesktopWidth, result.DesktopOffset, result.TabletpWidth, result.TabletpOffset, result.MobileWidth, result.MobileOffset, result.WideScreenpWidth, result.WideScreenpOffset, result.CustomClass, _arg1.data);
                                            } else {
                                              return {
                                                formatFn: fsFormat("Error when parsing column option %A"),
                                                input: "Error when parsing column option %A"
                                              }.formatFn(function (x) {
                                                throw new Error(x);
                                              })(_arg1);
                                            }

                                        }

                                    }

                                }

                            }

                        }

                    }

                }

            }

        }

    }
  };

  var opts = function () {
    var state = Types$1.Options.Empty;
    return function (list) {
      return fold$1(parseOptions, state, list);
    };
  }()(options);

  return react_1.apply(undefined, ["div", createObj(toList(delay(function () {
    return append$1(singleton$1(new Props.HTMLAttr(22, join(" ", new List$1("column", map(function (x) {
      return x;
    }, filter(function (x_1) {
      return function () {
        return x_1 != null;
      }();
    }, ofArray([opts.Width, opts.Offset, opts.DesktopWidth, opts.DesktopOffset, opts.MobileWidth, opts.MobileOffset, opts.TabletpWidth, opts.TabletpOffset, opts.WideScreenpWidth, opts.WideScreenpOffset, opts.CustomClass]))))))), delay(function () {
      return opts.Props;
    }));
  })), 1)].concat(babelHelpers.toConsumableArray(children)));
}

var Styles = function (__exports) {
  var IsCheckox = __exports.IsCheckox = "is-checkbox";
  var IsRadio = __exports.IsRadio = "is-radio";
  var IsCircle = __exports.IsCircle = "is-circle";
  return __exports;
}({});
var Types$2 = function (__exports) {
  var Option$$1 = __exports.Option = function () {
    function Option$$1(tag, data) {
      babelHelpers.classCallCheck(this, Option$$1);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(Option$$1, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Extensions.Checkradio.Types.Option",
          interfaces: ["FSharpUnion"],
          cases: [["Level", ILevelAndColor], ["Size", ISize], ["IsCircle"], ["IsChecked", "boolean"], ["IsDisabled", "boolean"], ["Value", "string"], ["Label", "string"], ["Props", makeGeneric(List$1, {
            T: Interface("Fable.Helpers.React.Props.IHTMLProp")
          })], ["OnChange", FableFunction([Interface("Fable.Import.React.FormEvent"), Unit])], ["CustomClass", "string"], ["ComponentId", "string"], ["Name", "string"]]
        };
      }
    }]);
    return Option$$1;
  }();

  setType("Elmish.Bulma.Extensions.Checkradio.Types.Option", Option$$1);

  var ofStyles = __exports.ofStyles = function (style) {
    if (style.tag === 2) {
      return "is-circle";
    } else {
      return {
        formatFn: fsFormat("%A isn't a valid style value"),
        input: "%A isn't a valid style value"
      }.formatFn(function (x) {
        throw new Error(x);
      })(style);
    }
  };

  var Options = __exports.Options = function () {
    function Options(level, size, isCircle, isChecked, isDisabled, value, label, name, props, customClass, onChange, componentId) {
      babelHelpers.classCallCheck(this, Options);
      this.Level = level;
      this.Size = size;
      this.IsCircle = isCircle;
      this.IsChecked = isChecked;
      this.IsDisabled = isDisabled;
      this.Value = value;
      this.Label = label;
      this.Name = name;
      this.Props = props;
      this.CustomClass = customClass;
      this.OnChange = onChange;
      this.ComponentId = componentId;
    }

    babelHelpers.createClass(Options, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Extensions.Checkradio.Types.Options",
          interfaces: ["FSharpRecord"],
          properties: {
            Level: Option("string"),
            Size: Option("string"),
            IsCircle: "boolean",
            IsChecked: "boolean",
            IsDisabled: "boolean",
            Value: "string",
            Label: "string",
            Name: "string",
            Props: makeGeneric(List$1, {
              T: Interface("Fable.Helpers.React.Props.IHTMLProp")
            }),
            CustomClass: Option("string"),
            OnChange: Option(FableFunction([Interface("Fable.Import.React.FormEvent"), Unit])),
            ComponentId: "string"
          }
        };
      }
    }], [{
      key: "Empty",
      get: function get() {
        return new Options(null, null, false, false, false, "", "", "", new List$1(), null, null, {
          formatFn: fsFormat("%O"),
          input: "%O"
        }.formatFn(function (x) {
          return x;
        })(newGuid()));
      }
    }]);
    return Options;
  }();

  setType("Elmish.Bulma.Extensions.Checkradio.Types.Options", Options);
  return __exports;
}({});
var isSmall = new Types$2.Option(1, new ISize(0));
var isMedium = new Types$2.Option(1, new ISize(1));
var isLarge = new Types$2.Option(1, new ISize(2));
var isChecked = new Types$2.Option(3, true);
var isDisabled = new Types$2.Option(4, true);
var isCircle = new Types$2.Option(2);
var isBlack = new Types$2.Option(0, new ILevelAndColor(0));
var isDark = new Types$2.Option(0, new ILevelAndColor(1));
var isLight = new Types$2.Option(0, new ILevelAndColor(2));
var isWhite = new Types$2.Option(0, new ILevelAndColor(3));
var isPrimary = new Types$2.Option(0, new ILevelAndColor(4));
var isInfo = new Types$2.Option(0, new ILevelAndColor(5));
var isSuccess = new Types$2.Option(0, new ILevelAndColor(6));
var isWarning = new Types$2.Option(0, new ILevelAndColor(7));
var isDanger = new Types$2.Option(0, new ILevelAndColor(8));



function name(customName) {
  return new Types$2.Option(11, customName);
}


function onChange(cb) {
  return new Types$2.Option(8, cb);
}
function checkbox(options, children) {
  var parseOptions = function parseOptions(result, opt) {
    if (opt.tag === 1) {
      var Size = ofSize(opt.data);
      return new Types$2.Options(result.Level, Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 2) {
      return new Types$2.Options(result.Level, result.Size, true, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 3) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, opt.data, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 4) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, opt.data, result.Value, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 5) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, opt.data, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 6) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, opt.data, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 11) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, opt.data, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 7) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, opt.data, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 9) {
      var CustomClass = opt.data;
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 8) {
      var OnChange = opt.data;
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, result.CustomClass, OnChange, result.ComponentId);
    } else if (opt.tag === 10) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, opt.data);
    } else {
      return new Types$2.Options(ofLevelAndColor(opt.data), result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    }
  };

  var opts = function () {
    var state = Types$2.Options.Empty;
    return function (list) {
      return fold$1(parseOptions, state, list);
    };
  }()(options);

  return ofArray([react_1("input", createObj(toList(delay(function () {
    return append$1(singleton$1(classBaseList(join(" ", new List$1("is-checkbox", map(function (x) {
      return x;
    }, filter(function (x_1) {
      return function () {
        return x_1 != null;
      }();
    }, ofArray([opts.Level, opts.Size]))))), ofArray([["is-circle", opts.IsCircle], [opts.CustomClass, function () {
      return opts.CustomClass != null;
    }()]]))), delay(function () {
      return append$1(function () {
        return opts.OnChange != null;
      }() ? append$1(singleton$1(new Props.HTMLAttr(20, opts.IsChecked)), delay(function () {
        return singleton$1(new Props.DOMAttr(9, opts.OnChange));
      })) : singleton$1(new Props.HTMLAttr(0, opts.IsChecked)), delay(function () {
        return append$1(opts.Props, delay(function () {
          return append$1(singleton$1(new Props.HTMLAttr(116, "checkbox")), delay(function () {
            return append$1(singleton$1(new Props.HTMLAttr(56, opts.ComponentId)), delay(function () {
              return singleton$1(new Props.HTMLAttr(37, opts.IsDisabled));
            }));
          }));
        }));
      }));
    }));
  })), 1)), react_1.apply(undefined, ["label", {
    htmlFor: opts.ComponentId
  }].concat(babelHelpers.toConsumableArray(toList(delay(function () {
    return children.tail == null ? singleton$1(opts.Label) : children;
  })))))]);
}
function radio(options, children) {
  var parseOptions = function parseOptions(result, opt) {
    if (opt.tag === 1) {
      var Size = ofSize(opt.data);
      return new Types$2.Options(result.Level, Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 2) {
      return new Types$2.Options(result.Level, result.Size, true, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 3) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, opt.data, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 4) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, opt.data, result.Value, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 5) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, opt.data, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 6) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, opt.data, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 11) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, opt.data, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 7) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, opt.data, result.CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 9) {
      var CustomClass = opt.data;
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, CustomClass, result.OnChange, result.ComponentId);
    } else if (opt.tag === 8) {
      var OnChange = opt.data;
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, result.CustomClass, OnChange, result.ComponentId);
    } else if (opt.tag === 10) {
      return new Types$2.Options(result.Level, result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, opt.data);
    } else {
      return new Types$2.Options(ofLevelAndColor(opt.data), result.Size, result.IsCircle, result.IsChecked, result.IsDisabled, result.Value, result.Label, result.Name, result.Props, result.CustomClass, result.OnChange, result.ComponentId);
    }
  };

  var opts = function () {
    var state = Types$2.Options.Empty;
    return function (list) {
      return fold$1(parseOptions, state, list);
    };
  }()(options);

  return ofArray([react_1("input", createObj(toList(delay(function () {
    return append$1(singleton$1(classBaseList(join(" ", new List$1("is-radio", map(function (x) {
      return x;
    }, filter(function (x_1) {
      return function () {
        return x_1 != null;
      }();
    }, ofArray([opts.Level, opts.Size]))))), ofArray([["is-circle", opts.IsCircle], [opts.CustomClass, function () {
      return opts.CustomClass != null;
    }()]]))), delay(function () {
      return append$1(function () {
        return opts.OnChange != null;
      }() ? append$1(singleton$1(new Props.HTMLAttr(20, opts.IsChecked)), delay(function () {
        return singleton$1(new Props.DOMAttr(9, opts.OnChange));
      })) : singleton$1(new Props.HTMLAttr(0, opts.IsChecked)), delay(function () {
        return append$1(opts.Props, delay(function () {
          return append$1(singleton$1(new Props.HTMLAttr(116, "radio")), delay(function () {
            return append$1(singleton$1(new Props.HTMLAttr(56, opts.ComponentId)), delay(function () {
              return append$1(opts.Name !== "" ? singleton$1(new Props.HTMLAttr(80, opts.Name)) : empty(), delay(function () {
                return singleton$1(new Props.HTMLAttr(37, opts.IsDisabled));
              }));
            }));
          }));
        }));
      }));
    }));
  })), 1)), react_1.apply(undefined, ["label", {
    htmlFor: opts.ComponentId
  }].concat(babelHelpers.toConsumableArray(toList(delay(function () {
    return children.tail == null ? singleton$1(opts.Label) : children;
  })))))]);
}

var Model$1 = function () {
  function Model(isExpanded, code) {
    babelHelpers.classCallCheck(this, Model);
    this.IsExpanded = isExpanded;
    this.Code = code;
  }

  babelHelpers.createClass(Model, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Viewer.Types.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          IsExpanded: "boolean",
          Code: "string"
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareRecords(this, other) | 0;
    }
  }]);
  return Model;
}();
setType("Viewer.Types.Model", Model$1);
var Msg$1 = function () {
  function Msg(tag, data) {
    babelHelpers.classCallCheck(this, Msg);
    this.tag = tag;
    this.data = data;
  }

  babelHelpers.createClass(Msg, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Viewer.Types.Msg",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["Expand"], ["Collapse"]]
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareUnions(this, other) | 0;
    }
  }]);
  return Msg;
}();
setType("Viewer.Types.Msg", Msg$1);

var Model = function () {
  function Model(intro, inlineBlockViewer, colorViewer, sizeViewer, circleViewer, stateViewer, eventViewer, isChecked) {
    babelHelpers.classCallCheck(this, Model);
    this.Intro = intro;
    this.InlineBlockViewer = inlineBlockViewer;
    this.ColorViewer = colorViewer;
    this.SizeViewer = sizeViewer;
    this.CircleViewer = circleViewer;
    this.StateViewer = stateViewer;
    this.EventViewer = eventViewer;
    this.IsChecked = isChecked;
  }

  babelHelpers.createClass(Model, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elements.Checkradio.Types.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Intro: "string",
          InlineBlockViewer: Model$1,
          ColorViewer: Model$1,
          SizeViewer: Model$1,
          CircleViewer: Model$1,
          StateViewer: Model$1,
          EventViewer: Model$1,
          IsChecked: "boolean"
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareRecords(this, other) | 0;
    }
  }]);
  return Model;
}();
setType("Elements.Checkradio.Types.Model", Model);
var Msg = function () {
  function Msg(tag, data) {
    babelHelpers.classCallCheck(this, Msg);
    this.tag = tag;
    this.data = data;
  }

  babelHelpers.createClass(Msg, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elements.Checkradio.Types.Msg",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["InlineBlockViewerMsg", Msg$1], ["ColorViewerMsg", Msg$1], ["SizeViewerMsg", Msg$1], ["CircleViewerMsg", Msg$1], ["StateViewerMsg", Msg$1], ["EventViewerMsg", Msg$1], ["Change", "boolean"]]
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareUnions(this, other) | 0;
    }
  }]);
  return Msg;
}();
setType("Elements.Checkradio.Types.Msg", Msg);

var Types$3 = function (__exports) {
  var IPosition = __exports.IPosition = function () {
    function IPosition(tag, data) {
      babelHelpers.classCallCheck(this, IPosition);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(IPosition, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Elements.Icon.Types.IPosition",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: [["Left"], ["Right"]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return compareUnions(this, other) | 0;
      }
    }]);
    return IPosition;
  }();

  setType("Elmish.Bulma.Elements.Icon.Types.IPosition", IPosition);

  var Option$$1 = __exports.Option = function () {
    function Option$$1(tag, data) {
      babelHelpers.classCallCheck(this, Option$$1);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(Option$$1, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Elements.Icon.Types.Option",
          interfaces: ["FSharpUnion", "System.IEquatable"],
          cases: [["Size", ISize], ["Position", IPosition], ["CustomClass", "string"], ["Props", makeGeneric(List$1, {
            T: Interface("Fable.Helpers.React.Props.IHTMLProp")
          })]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }]);
    return Option$$1;
  }();

  setType("Elmish.Bulma.Elements.Icon.Types.Option", Option$$1);

  var Options = __exports.Options = function () {
    function Options(size, position, customClass, props) {
      babelHelpers.classCallCheck(this, Options);
      this.Size = size;
      this.Position = position;
      this.CustomClass = customClass;
      this.Props = props;
    }

    babelHelpers.createClass(Options, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Elements.Icon.Types.Options",
          interfaces: ["FSharpRecord", "System.IEquatable"],
          properties: {
            Size: Option("string"),
            Position: Option("string"),
            CustomClass: Option("string"),
            Props: makeGeneric(List$1, {
              T: Interface("Fable.Helpers.React.Props.IHTMLProp")
            })
          }
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return equalsRecords(this, other);
      }
    }], [{
      key: "Empty",
      get: function get() {
        return new Options(null, null, null, new List$1());
      }
    }]);
    return Options;
  }();

  setType("Elmish.Bulma.Elements.Icon.Types.Options", Options);

  var ofPosition = __exports.ofPosition = function (_arg1) {
    if (_arg1.tag === 1) {
      return "is-right";
    } else {
      return "is-left";
    }
  };

  return __exports;
}({});
var isSmall$1 = new Types$3.Option(0, new ISize(0));
var isMedium$1 = new Types$3.Option(0, new ISize(1));
var isLarge$1 = new Types$3.Option(0, new ISize(2));
var isLeft = new Types$3.Option(1, new Types$3.IPosition(0));
var isRight = new Types$3.Option(1, new Types$3.IPosition(1));


function icon(options, children) {
  var parseOptions = function parseOptions(result, option) {
    if (option.tag === 1) {
      var Position = Types$3.ofPosition(option.data);
      return new Types$3.Options(result.Size, Position, result.CustomClass, result.Props);
    } else if (option.tag === 2) {
      var CustomClass = option.data;
      return new Types$3.Options(result.Size, result.Position, CustomClass, result.Props);
    } else if (option.tag === 3) {
      return new Types$3.Options(result.Size, result.Position, result.CustomClass, option.data);
    } else {
      return new Types$3.Options(ofSize(option.data), result.Position, result.CustomClass, result.Props);
    }
  };

  var opts = function () {
    var state = Types$3.Options.Empty;
    return function (list) {
      return fold$1(parseOptions, state, list);
    };
  }()(options);

  return react_1.apply(undefined, ["span", createObj(toList(delay(function () {
    return append$1(singleton$1(new Props.HTMLAttr(22, join(" ", new List$1("icon", map(function (x) {
      return x;
    }, filter(function (x_1) {
      return function () {
        return x_1 != null;
      }();
    }, ofArray([opts.Size, opts.Position, opts.CustomClass]))))))), delay(function () {
      return opts.Props;
    }));
  })), 1)].concat(babelHelpers.toConsumableArray(children)));
}

var Types$4 = function (__exports) {
  var Option$$1 = __exports.Option = function () {
    function Option$$1(tag, data) {
      babelHelpers.classCallCheck(this, Option$$1);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(Option$$1, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Elements.Content.Types.Option",
          interfaces: ["FSharpUnion", "System.IEquatable"],
          cases: [["Size", ISize], ["CustomClass", "string"], ["Props", makeGeneric(List$1, {
            T: Interface("Fable.Helpers.React.Props.IHTMLProp")
          })]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }]);
    return Option$$1;
  }();

  setType("Elmish.Bulma.Elements.Content.Types.Option", Option$$1);

  var Options = __exports.Options = function () {
    function Options(size, props, customClass) {
      babelHelpers.classCallCheck(this, Options);
      this.Size = size;
      this.Props = props;
      this.CustomClass = customClass;
    }

    babelHelpers.createClass(Options, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Bulma.Elements.Content.Types.Options",
          interfaces: ["FSharpRecord", "System.IEquatable"],
          properties: {
            Size: Option("string"),
            Props: makeGeneric(List$1, {
              T: Interface("Fable.Helpers.React.Props.IHTMLProp")
            }),
            CustomClass: Option("string")
          }
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return equalsRecords(this, other);
      }
    }], [{
      key: "Empty",
      get: function get() {
        return new Options(null, new List$1(), null);
      }
    }]);
    return Options;
  }();

  setType("Elmish.Bulma.Elements.Content.Types.Options", Options);
  return __exports;
}({});
var isSmall$2 = new Types$4.Option(0, new ISize(0));
var isMedium$2 = new Types$4.Option(0, new ISize(1));
var isLarge$2 = new Types$4.Option(0, new ISize(2));


function content(options, children) {
  var parseOption = function parseOption(result, opt) {
    if (opt.tag === 1) {
      var CustomClass = opt.data;
      return new Types$4.Options(result.Size, result.Props, CustomClass);
    } else if (opt.tag === 2) {
      return new Types$4.Options(result.Size, opt.data, result.CustomClass);
    } else {
      return new Types$4.Options(ofSize(opt.data), result.Props, result.CustomClass);
    }
  };

  var opts = function () {
    var state = Types$4.Options.Empty;
    return function (list) {
      return fold$1(parseOption, state, list);
    };
  }()(options);

  return react_1.apply(undefined, ["div", createObj(toList(delay(function () {
    return append$1(singleton$1(classBaseList("content", ofArray([[opts.CustomClass, function () {
      return opts.CustomClass != null;
    }()], [opts.Size, function () {
      return opts.Size != null;
    }()]]))), delay(function () {
      return opts.Props;
    }));
  })), 1)].concat(babelHelpers.toConsumableArray(children)));
}

function htmlFromMarkdown(str) {
  return react_1("div", {
    dangerouslySetInnerHTML: {
      __html: marked.parse(str)
    }
  });
}
function contentFromMarkdown(str) {
  return content(new List$1(), ofArray([htmlFromMarkdown(str)]));
}
function docSection(title, viewer) {
  return react_1.apply(undefined, ["div", {}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
    return append$1(singleton$1(contentFromMarkdown(title)), delay(function () {
      return singleton$1(viewer);
    }));
  })))));
}
function docPage(children) {
  return react_1.apply(undefined, ["div", {}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
    return collect$1(function (child) {
      return append$1(singleton$1(child), delay(function () {
        return singleton$1(react_1("hr", {}));
      }));
    }, children);
  })))));
}

function card(options, children) {
  var opts = genericParse(options);
  return react_1.apply(undefined, ["div", createObj(toList(delay(function () {
    return append$1(singleton$1(classBaseList("card", ofArray([[opts.CustomClass, function () {
      return opts.CustomClass != null;
    }()]]))), delay(function () {
      return opts.Props;
    }));
  })), 1)].concat(babelHelpers.toConsumableArray(children)));
}

function content$1(options, children) {
  var opts = genericParse(options);
  return react_1.apply(undefined, ["div", createObj(toList(delay(function () {
    return append$1(singleton$1(classBaseList("card-content", ofArray([[opts.CustomClass, function () {
      return opts.CustomClass != null;
    }()]]))), delay(function () {
      return opts.Props;
    }));
  })), 1)].concat(babelHelpers.toConsumableArray(children)));
}
function footer(options, children) {
  var opts = genericParse(options);
  return react_1.apply(undefined, ["footer", createObj(toList(delay(function () {
    return append$1(singleton$1(classBaseList("card-footer", ofArray([[opts.CustomClass, function () {
      return opts.CustomClass != null;
    }()]]))), delay(function () {
      return opts.Props;
    }));
  })), 1)].concat(babelHelpers.toConsumableArray(children)));
}
var Header = function (__exports) {
  var customClass_1 = __exports.customClass = function (arg0) {
    return new GenericOption(0, arg0);
  };

  var props_1 = __exports.props = function (arg0) {
    return new GenericOption(1, arg0);
  };

  var icon = __exports.icon = function (options, children) {
    var opts = genericParse(options);
    return react_1.apply(undefined, ["a", createObj(toList(delay(function () {
      return append$1(singleton$1(classBaseList("card-header-icon", ofArray([[opts.CustomClass, function () {
        return opts.CustomClass != null;
      }()]]))), delay(function () {
        return opts.Props;
      }));
    })), 1)].concat(babelHelpers.toConsumableArray(children)));
  };

  var title = __exports.title = function (options, children) {
    var opts = genericParse(options);
    return react_1.apply(undefined, ["p", createObj(toList(delay(function () {
      return append$1(singleton$1(classBaseList("card-header-title", ofArray([[opts.CustomClass, function () {
        return opts.CustomClass != null;
      }()]]))), delay(function () {
        return opts.Props;
      }));
    })), 1)].concat(babelHelpers.toConsumableArray(children)));
  };

  return __exports;
}({});
var Footer = function (__exports) {
  var customClass_2 = __exports.customClass = function (arg0) {
    return new GenericOption(0, arg0);
  };

  var props_2 = __exports.props = function (arg0) {
    return new GenericOption(1, arg0);
  };

  var item$$1 = __exports.item = function (options, children) {
    var opts = genericParse(options);
    return react_1.apply(undefined, ["a", createObj(toList(delay(function () {
      return append$1(singleton$1(classBaseList("card-footer-item", ofArray([[opts.CustomClass, function () {
        return opts.CustomClass != null;
      }()]]))), delay(function () {
        return opts.Props;
      }));
    })), 1)].concat(babelHelpers.toConsumableArray(children)));
  };

  return __exports;
}({});

function box_(options, children) {
  var opts = genericParse(options);
  return react_1.apply(undefined, ["div", createObj(toList(delay(function () {
    return append$1(singleton$1(classBaseList("box", ofArray([[opts.CustomClass, function () {
      return opts.CustomClass != null;
    }()]]))), delay(function () {
      return opts.Props;
    }));
  })), 1)].concat(babelHelpers.toConsumableArray(children)));
}

function root$2(interactiveView, model, dispatch) {
  var eventToTrigger = model.IsExpanded ? new Msg$1(1) : new Msg$1(0);
  var footerItemIcon = void 0;
  var footerIconClass = model.IsExpanded ? new Props.HTMLAttr(22, "fa fa-angle-up") : new Props.HTMLAttr(22, "fa fa-angle-down");
  footerItemIcon = Footer.item(new List$1(), ofArray([icon(new List$1(), ofArray([react_1("i", createObj(ofArray([footerIconClass]), 1))]))]));
  var footerItemText = model.IsExpanded ? Footer.item(new List$1(), ofArray(["Hide code"])) : Footer.item(new List$1(), ofArray(["View code"]));
  return card(new List$1(), toList(delay(function () {
    return append$1(singleton$1(content$1(new List$1(), ofArray([interactiveView]))), delay(function () {
      return append$1(singleton$1(footer(ofArray([Footer.props(ofArray([new Props.DOMAttr(39, function (_arg1) {
        dispatch(eventToTrigger);
      })]))]), ofArray([footerItemIcon, footerItemText, footerItemIcon]))), delay(function () {
        return model.IsExpanded ? singleton$1(box_(new List$1(), ofArray([contentFromMarkdown(model.Code)]))) : empty();
      }));
    }));
  })));
}

var inlineBlockInteractive = columns(new List$1(), ofArray([column(new List$1(), ofArray([react_1.apply(undefined, ["div", {
  className: "block"
}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
  return append$1(singleton$1(react_1("b", {}, "Block")), delay(function () {
    return append$1(singleton$1(react_1.apply(undefined, ["div", {
      className: "field"
    }].concat(babelHelpers.toConsumableArray(toList(delay(function () {
      return checkbox(new List$1(), ofArray(["One"]));
    })))))), delay(function () {
      return append$1(singleton$1(react_1.apply(undefined, ["div", {
        className: "field"
      }].concat(babelHelpers.toConsumableArray(toList(delay(function () {
        return checkbox(new List$1(), ofArray(["Two"]));
      })))))), delay(function () {
        return append$1(singleton$1(react_1("b", {}, "Inline")), delay(function () {
          return singleton$1(react_1.apply(undefined, ["div", {
            className: "field"
          }].concat(babelHelpers.toConsumableArray(toList(delay(function () {
            return append$1(checkbox(new List$1(), ofArray(["One "])), delay(function () {
              return checkbox(new List$1(), ofArray(["Two "]));
            }));
          }))))));
        }));
      }));
    }));
  }));
})))))])), column(new List$1(), ofArray([react_1.apply(undefined, ["div", {
  className: "block"
}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
  return append$1(singleton$1(react_1("b", {}, "Block")), delay(function () {
    return append$1(singleton$1(react_1.apply(undefined, ["div", {
      className: "field"
    }].concat(babelHelpers.toConsumableArray(toList(delay(function () {
      return radio(ofArray([name("block")]), ofArray(["One"]));
    })))))), delay(function () {
      return append$1(singleton$1(react_1.apply(undefined, ["div", {
        className: "field"
      }].concat(babelHelpers.toConsumableArray(toList(delay(function () {
        return radio(ofArray([name("block")]), ofArray(["Two"]));
      })))))), delay(function () {
        return append$1(singleton$1(react_1("b", {}, "Inline")), delay(function () {
          return singleton$1(react_1.apply(undefined, ["div", {
            className: "field"
          }].concat(babelHelpers.toConsumableArray(toList(delay(function () {
            return append$1(radio(ofArray([name("inline")]), ofArray(["One"])), delay(function () {
              return radio(ofArray([name("inline")]), ofArray(["Two "]));
            }));
          }))))));
        }));
      }));
    }));
  }));
})))))]))]));
var colorInteractive = columns(new List$1(), ofArray([column(new List$1(), ofArray([react_1.apply(undefined, ["div", {
  className: "block callout is-primary"
}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
  return append$1(checkbox(ofArray([isChecked]), ofArray(["Checkbox"])), delay(function () {
    return append$1(checkbox(ofArray([isChecked, isWhite]), ofArray(["White"])), delay(function () {
      return append$1(checkbox(ofArray([isChecked, isLight]), ofArray(["Light"])), delay(function () {
        return append$1(checkbox(ofArray([isChecked, isDark]), ofArray(["Dark"])), delay(function () {
          return checkbox(ofArray([isChecked, isBlack]), ofArray(["Black"]));
        }));
      }));
    }));
  }));
})))))])), column(new List$1(), ofArray([react_1.apply(undefined, ["div", {
  className: "block callout"
}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
  return append$1(checkbox(ofArray([isChecked, isPrimary]), ofArray(["Primary"])), delay(function () {
    return append$1(checkbox(ofArray([isChecked, isInfo]), ofArray(["Info"])), delay(function () {
      return append$1(checkbox(ofArray([isChecked, isSuccess]), ofArray(["Success"])), delay(function () {
        return append$1(checkbox(ofArray([isChecked, isWarning]), ofArray(["Warning"])), delay(function () {
          return checkbox(ofArray([isChecked, isDanger]), ofArray(["Danger"]));
        }));
      }));
    }));
  }));
})))))])), column(new List$1(), ofArray([react_1.apply(undefined, ["div", {
  className: "block callout is-primary"
}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
  return append$1(radio(ofArray([isChecked, name("rad")]), ofArray(["Checkbox"])), delay(function () {
    return append$1(radio(ofArray([isChecked, isWhite, name("rad")]), ofArray(["White"])), delay(function () {
      return append$1(radio(ofArray([isChecked, isLight, name("rad")]), ofArray(["Light"])), delay(function () {
        return append$1(radio(ofArray([isChecked, isDark, name("rad")]), ofArray(["Dark"])), delay(function () {
          return radio(ofArray([isChecked, isBlack, name("rad")]), ofArray(["Black"]));
        }));
      }));
    }));
  }));
})))))])), column(new List$1(), ofArray([react_1.apply(undefined, ["div", {
  className: "block callout"
}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
  return append$1(radio(ofArray([isChecked, isPrimary, name("rad1")]), ofArray(["Primary"])), delay(function () {
    return append$1(radio(ofArray([isChecked, isInfo, name("rad1")]), ofArray(["Info"])), delay(function () {
      return append$1(radio(ofArray([isChecked, isSuccess, name("rad1")]), ofArray(["Success"])), delay(function () {
        return append$1(radio(ofArray([isChecked, isWarning, name("rad1")]), ofArray(["Warning"])), delay(function () {
          return radio(ofArray([isChecked, isDanger, name("rad1")]), ofArray(["Danger"]));
        }));
      }));
    }));
  }));
})))))]))]));
var sizeInteractive = columns(new List$1(), ofArray([column(new List$1(), ofArray([react_1.apply(undefined, ["div", {
  className: "block"
}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
  return append$1(checkbox(ofArray([isChecked, isSmall]), ofArray(["Small"])), delay(function () {
    return append$1(checkbox(ofArray([isChecked]), ofArray(["Normal"])), delay(function () {
      return append$1(checkbox(ofArray([isChecked, isMedium]), ofArray(["Medium"])), delay(function () {
        return checkbox(ofArray([isChecked, isLarge]), ofArray(["Large"]));
      }));
    }));
  }));
})))))])), column(new List$1(), ofArray([react_1.apply(undefined, ["div", {
  className: "block"
}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
  return append$1(radio(ofArray([name("rSize"), isSmall]), ofArray(["Small"])), delay(function () {
    return append$1(radio(ofArray([name("rSize")]), ofArray(["Normal"])), delay(function () {
      return append$1(radio(ofArray([name("rSize"), isMedium]), ofArray(["Medium"])), delay(function () {
        return radio(ofArray([name("rSize"), isLarge]), ofArray(["Large"]));
      }));
    }));
  }));
})))))]))]));
var stylesInteractive = react_1.apply(undefined, ["div", {
  className: "block"
}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
  return append$1(checkbox(ofArray([isChecked, isCircle, isDisabled]), ofArray(["Checkbox"])), delay(function () {
    return append$1(checkbox(ofArray([isChecked, isCircle, isPrimary]), ofArray(["Checkbox"])), delay(function () {
      return append$1(checkbox(ofArray([isChecked, isCircle, isSuccess]), ofArray(["Checkbox - success"])), delay(function () {
        return append$1(checkbox(ofArray([isChecked, isCircle, isWarning]), ofArray(["Checkbox - warning"])), delay(function () {
          return append$1(checkbox(ofArray([isChecked, isCircle, isDanger]), ofArray(["Checkbox - danger"])), delay(function () {
            return checkbox(ofArray([isChecked, isCircle, isInfo]), ofArray(["Checkbox - info"]));
          }));
        }));
      }));
    }));
  }));
})))));
var stateInteractive = columns(new List$1(), ofArray([column(new List$1(), ofArray([react_1.apply(undefined, ["div", {
  className: "block"
}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
  return append$1(checkbox(ofArray([isDisabled]), ofArray(["Disabled"])), delay(function () {
    return append$1(checkbox(ofArray([isDisabled, isChecked]), ofArray(["Disabled & Checked"])), delay(function () {
      return append$1(checkbox(new List$1(), ofArray(["Unchecked"])), delay(function () {
        return checkbox(ofArray([isChecked]), ofArray(["checked"]));
      }));
    }));
  }));
})))))])), column(new List$1(), ofArray([react_1.apply(undefined, ["div", {
  className: "block"
}].concat(babelHelpers.toConsumableArray(toList(delay(function () {
  return append$1(radio(ofArray([isDisabled]), ofArray(["Disabled"])), delay(function () {
    return append$1(radio(ofArray([isDisabled, isChecked]), ofArray(["Disabled & Checked"])), delay(function () {
      return append$1(radio(new List$1(), ofArray(["Unchecked"])), delay(function () {
        return radio(ofArray([isChecked]), ofArray(["checked"]));
      }));
    }));
  }));
})))))]))]));
function eventInteractive(model, dispatch) {
  var state = !model.IsChecked;
  return react_1.apply(undefined, ["div", {
    className: "block"
  }].concat(babelHelpers.toConsumableArray(toList(delay(function () {
    return append$1(checkbox(toList(delay(function () {
      return append$1(model.IsChecked ? singleton$1(isChecked) : empty(), delay(function () {
        return singleton$1(onChange(function (x) {
          dispatch(new Msg(6, state));
        }));
      }));
    })), ofArray([{
      formatFn: fsFormat("%A"),
      input: "%A"
    }.formatFn(function (x) {
      return x;
    })(model.IsChecked)])), delay(function () {
      return append$1(checkbox(toList(delay(function () {
        return append$1(model.IsChecked ? singleton$1(isChecked) : empty(), delay(function () {
          return singleton$1(onChange(function (x_1) {
            dispatch(new Msg(6, state));
          }));
        }));
      })), ofArray([model.IsChecked ? ":p" : ":'("])), delay(function () {
        return checkbox(toList(delay(function () {
          return append$1(model.IsChecked ? singleton$1(isChecked) : empty(), delay(function () {
            return singleton$1(onChange(function (x_2) {
              dispatch(new Msg(6, state));
            }));
          }));
        })), ofArray([model.IsChecked ? icon(new List$1(), ofArray([react_1("i", {
          className: "fa fa-plane"
        })])) : icon(new List$1(), ofArray([react_1("i", {
          className: "fa fa-rocket"
        })]))]));
      }));
    }));
  })))));
}
function root$1(model, dispatch) {
  return docPage(ofArray([contentFromMarkdown(model.Intro), docSection("### Inline vs Block", root$2(inlineBlockInteractive, model.InlineBlockViewer, function ($var1) {
    return dispatch(function (arg0) {
      return new Msg(0, arg0);
    }($var1));
  })), docSection("### Colors", root$2(colorInteractive, model.ColorViewer, function ($var2) {
    return dispatch(function (arg0_1) {
      return new Msg(1, arg0_1);
    }($var2));
  })), docSection("### Sizes", root$2(sizeInteractive, model.SizeViewer, function ($var3) {
    return dispatch(function (arg0_2) {
      return new Msg(2, arg0_2);
    }($var3));
  })), docSection("\r\n### Styles\r\nThe checkbox can be **circle**.\r\n                            ", root$2(stylesInteractive, model.CircleViewer, function ($var4) {
    return dispatch(function (arg0_3) {
      return new Msg(3, arg0_3);
    }($var4));
  })), docSection("### States", root$2(stateInteractive, model.StateViewer, function ($var5) {
    return dispatch(function (arg0_4) {
      return new Msg(4, arg0_4);
    }($var5));
  })), docSection("### Event handler", root$2(eventInteractive(model, dispatch), model.EventViewer, function ($var6) {
    return dispatch(function (arg0_5) {
      return new Msg(5, arg0_5);
    }($var6));
  }))]));
}

var Model$3 = function () {
  function Model(intro) {
    babelHelpers.classCallCheck(this, Model);
    this.Intro = intro;
  }

  babelHelpers.createClass(Model, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Home.Types.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Intro: "string"
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareRecords(this, other) | 0;
    }
  }]);
  return Model;
}();
setType("Home.Types.Model", Model$3);

var Msg$2 = function () {
  function Msg$$1(tag, data) {
    babelHelpers.classCallCheck(this, Msg$$1);
    this.tag = tag;
    this.data = data;
  }

  babelHelpers.createClass(Msg$$1, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "App.Types.Msg",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: [["CheckradioMsg", Msg]]
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareUnions(this, other) | 0;
    }
  }]);
  return Msg$$1;
}();
setType("App.Types.Msg", Msg$2);
var ElementsModel = function () {
  function ElementsModel(checkradio) {
    babelHelpers.classCallCheck(this, ElementsModel);
    this.Checkradio = checkradio;
  }

  babelHelpers.createClass(ElementsModel, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "App.Types.ElementsModel",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          Checkradio: Model
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareRecords(this, other) | 0;
    }
  }]);
  return ElementsModel;
}();
setType("App.Types.ElementsModel", ElementsModel);
var Model$2 = function () {
  function Model$$1(currentPage, home, elements) {
    babelHelpers.classCallCheck(this, Model$$1);
    this.CurrentPage = currentPage;
    this.Home = home;
    this.Elements = elements;
  }

  babelHelpers.createClass(Model$$1, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "App.Types.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          CurrentPage: Page,
          Home: Model$3,
          Elements: ElementsModel
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareRecords(this, other) | 0;
    }
  }]);
  return Model$$1;
}();
setType("App.Types.Model", Model$2);

function root$3(model) {
  return contentFromMarkdown(model.Intro);
}

function navButton(classy, href, faClass, txt) {
  return react_1("div", {
    className: "control"
  }, react_1("a", {
    className: "button " + classy,
    href: href
  }, react_1("span", {
    className: "icon"
  }, react_1("i", {
    className: "fa " + faClass
  })), react_1("span", {}, txt)));
}
var navButtons = react_1("span", {
  className: "nav-item block"
}, navButton("github", "https://github.com/evilz/Fable.Elmish.Bulma-checkradio/", "fa-github", "Github"));
var root$4 = react_1("div", {
  className: "nav"
}, react_1("div", {
  className: "nav-left"
}, react_1("h1", {
  className: "nav-item is-brand title is-4"
}, react_1("img", createObj(ofArray([new Props.HTMLAttr(106, "logo.png"), new Props.HTMLAttr(8, "logo"), ["style", {
  marginRight: "10px"
}]]), 1)), "Fable.Elmish.Bulma-checkradio")), navButtons);

function CurriedLambda(f, _this, expectedArgsLength) {
    if (f.curried === true) {
        return f;
    }
    var curriedFn = function curriedFn() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        // _this = _this || this;
        expectedArgsLength = expectedArgsLength || f.length;
        if (args.length >= expectedArgsLength) {
            var restArgs = args.splice(expectedArgsLength);
            var res = f.apply(_this, args);
            if (typeof res === "function") {
                var newLambda = CurriedLambda(res, _this);
                return restArgs.length === 0 ? newLambda : newLambda.apply(_this, restArgs);
            } else {
                return res;
            }
        } else {
            return CurriedLambda(function () {
                for (var _len2 = arguments.length, args2 = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args2[_key2] = arguments[_key2];
                }

                return f.apply(_this, args.concat(args2));
            }, _this, expectedArgsLength - args.length);
        }
    };
    curriedFn.curried = true;
    return curriedFn;
}

var Trampoline = function () {
    createClass$2(Trampoline, null, [{
        key: "maxTrampolineCallCount",
        get: function get$$1() {
            return 2000;
        }
    }]);

    function Trampoline() {
        classCallCheck(this, Trampoline);

        this.callCount = 0;
    }

    createClass$2(Trampoline, [{
        key: "incrementAndCheck",
        value: function incrementAndCheck() {
            return this.callCount++ > Trampoline.maxTrampolineCallCount;
        }
    }, {
        key: "hijack",
        value: function hijack(f) {
            this.callCount = 0;
            setTimeout(f, 0);
        }
    }]);
    return Trampoline;
}();
function protectedCont(f) {
    return function (ctx) {
        if (ctx.cancelToken.isCancelled) {
            ctx.onCancel("cancelled");
        } else if (ctx.trampoline.incrementAndCheck()) {
            ctx.trampoline.hijack(function () {
                try {
                    f(ctx);
                } catch (err) {
                    ctx.onError(err);
                }
            });
        } else {
            try {
                f(ctx);
            } catch (err) {
                ctx.onError(err);
            }
        }
    };
}
function protectedBind(computation, binder) {
    return protectedCont(function (ctx) {
        computation({
            onSuccess: function onSuccess(x) {
                try {
                    binder(x)(ctx);
                } catch (ex) {
                    ctx.onError(ex);
                }
            },
            onError: ctx.onError,
            onCancel: ctx.onCancel,
            cancelToken: ctx.cancelToken,
            trampoline: ctx.trampoline
        });
    });
}
function protectedReturn(value) {
    return protectedCont(function (ctx) {
        return ctx.onSuccess(value);
    });
}
var AsyncBuilder = function () {
    function AsyncBuilder() {
        classCallCheck(this, AsyncBuilder);
    }

    createClass$2(AsyncBuilder, [{
        key: "Bind",
        value: function Bind(computation, binder) {
            return protectedBind(computation, binder);
        }
    }, {
        key: "Combine",
        value: function Combine(computation1, computation2) {
            return this.Bind(computation1, function () {
                return computation2;
            });
        }
    }, {
        key: "Delay",
        value: function Delay(generator) {
            return protectedCont(function (ctx) {
                return generator()(ctx);
            });
        }
    }, {
        key: "For",
        value: function For(sequence, body) {
            var iter = sequence[Symbol.iterator]();
            var cur = iter.next();
            return this.While(function () {
                return !cur.done;
            }, this.Delay(function () {
                var res = body(cur.value);
                cur = iter.next();
                return res;
            }));
        }
    }, {
        key: "Return",
        value: function Return(value) {
            return protectedReturn(value);
        }
    }, {
        key: "ReturnFrom",
        value: function ReturnFrom(computation) {
            return computation;
        }
    }, {
        key: "TryFinally",
        value: function TryFinally(computation, compensation) {
            return protectedCont(function (ctx) {
                computation({
                    onSuccess: function onSuccess(x) {
                        compensation();
                        ctx.onSuccess(x);
                    },
                    onError: function onError(x) {
                        compensation();
                        ctx.onError(x);
                    },
                    onCancel: function onCancel(x) {
                        compensation();
                        ctx.onCancel(x);
                    },
                    cancelToken: ctx.cancelToken,
                    trampoline: ctx.trampoline
                });
            });
        }
    }, {
        key: "TryWith",
        value: function TryWith(computation, catchHandler) {
            return protectedCont(function (ctx) {
                computation({
                    onSuccess: ctx.onSuccess,
                    onCancel: ctx.onCancel,
                    cancelToken: ctx.cancelToken,
                    trampoline: ctx.trampoline,
                    onError: function onError(ex) {
                        try {
                            catchHandler(ex)(ctx);
                        } catch (ex2) {
                            ctx.onError(ex2);
                        }
                    }
                });
            });
        }
    }, {
        key: "Using",
        value: function Using(resource, binder) {
            return this.TryFinally(binder(resource), function () {
                return resource.Dispose();
            });
        }
    }, {
        key: "While",
        value: function While(guard, computation) {
            var _this = this;

            if (guard()) {
                return this.Bind(computation, function () {
                    return _this.While(guard, computation);
                });
            } else {
                return this.Return(void 0);
            }
        }
    }, {
        key: "Zero",
        value: function Zero() {
            return protectedCont(function (ctx) {
                return ctx.onSuccess(void 0);
            });
        }
    }]);
    return AsyncBuilder;
}();
var singleton$2 = new AsyncBuilder();

function choice1Of2(v) {
    return new Choice(0, v);
}
function choice2Of2(v) {
    return new Choice(1, v);
}

var Choice = function () {
    function Choice(tag, data) {
        classCallCheck(this, Choice);

        this.tag = tag | 0;
        this.data = data;
    }

    createClass$2(Choice, [{
        key: "Equals",
        value: function Equals(other) {
            return equalsUnions(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return compareUnions(this, other);
        }
    }, {
        key: _Symbol.reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Core.FSharpChoice",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Choice1Of2", Any], ["Choice2Of2", Any]]
            };
        }
    }, {
        key: "valueIfChoice1",
        get: function get$$1() {
            return this.tag === 0 ? this.data : null;
        }
    }, {
        key: "valueIfChoice2",
        get: function get$$1() {
            return this.tag === 1 ? this.data : null;
        }
    }]);
    return Choice;
}();

function emptyContinuation(x) {
    // NOP
}


var defaultCancellationToken = { isCancelled: false };
function catchAsync(work) {
    return protectedCont(function (ctx) {
        work({
            onSuccess: function onSuccess(x) {
                return ctx.onSuccess(choice1Of2(x));
            },
            onError: function onError(ex) {
                return ctx.onSuccess(choice2Of2(ex));
            },
            onCancel: ctx.onCancel,
            cancelToken: ctx.cancelToken,
            trampoline: ctx.trampoline
        });
    });
}
function fromContinuations(f) {
    return protectedCont(function (ctx) {
        return f([ctx.onSuccess, ctx.onError, ctx.onCancel]);
    });
}



function start(computation, cancellationToken) {
    return startWithContinuations(computation, cancellationToken);
}
function startImmediate(computation, cancellationToken) {
    return start(computation, cancellationToken);
}
function startWithContinuations(computation, continuation, exceptionContinuation, cancellationContinuation, cancelToken) {
    if (typeof continuation !== "function") {
        cancelToken = continuation;
        continuation = null;
    }
    var trampoline = new Trampoline();
    computation({
        onSuccess: continuation ? continuation : emptyContinuation,
        onError: exceptionContinuation ? exceptionContinuation : emptyContinuation,
        onCancel: cancellationContinuation ? cancellationContinuation : emptyContinuation,
        cancelToken: cancelToken ? cancelToken : defaultCancellationToken,
        trampoline: trampoline
    });
}

var Cmd = function (__exports) {
  var none = __exports.none = function () {
    return new List$1();
  };

  var ofMsg = __exports.ofMsg = function (msg) {
    return ofArray([function (dispatch) {
      dispatch(msg);
    }]);
  };

  var map$$1 = __exports.map = function (f, cmd) {
    return map(CurriedLambda(function (g) {
      return function ($var2) {
        return g(function (dispatch) {
          return function ($var1) {
            return dispatch(f($var1));
          };
        }($var2));
      };
    }), cmd);
  };

  var batch = __exports.batch = function (cmds) {
    return concat(cmds);
  };

  var ofAsync = __exports.ofAsync = function (task, arg, ofSuccess, ofError) {
    var bind = function bind(dispatch) {
      return function (builder_) {
        return builder_.Delay(function () {
          return builder_.Bind(catchAsync(task(arg)), function (_arg1) {
            dispatch(_arg1.tag === 1 ? ofError(_arg1.data) : ofSuccess(_arg1.data));
            return builder_.Zero();
          });
        });
      }(singleton$2);
    };

    return ofArray([function ($var3) {
      return function (arg00) {
        startImmediate(arg00);
      }(bind($var3));
    }]);
  };

  var ofFunc = __exports.ofFunc = function (task, arg, ofSuccess, ofError) {
    var bind = function bind(dispatch) {
      try {
        return function ($var4) {
          return dispatch(ofSuccess($var4));
        }(task(arg));
      } catch (x) {
        return function ($var5) {
          return dispatch(ofError($var5));
        }(x);
      }
    };

    return ofArray([bind]);
  };

  var performFunc = __exports.performFunc = function (task, arg, ofSuccess) {
    var bind = function bind(dispatch) {
      try {
        (function ($var6) {
          return dispatch(ofSuccess($var6));
        })(task(arg));
      } catch (x) {}
    };

    return ofArray([bind]);
  };

  var attemptFunc = __exports.attemptFunc = function (task, arg, ofError) {
    var bind = function bind(dispatch) {
      try {
        task(arg);
      } catch (x) {
        (function ($var7) {
          return dispatch(ofError($var7));
        })(x);
      }
    };

    return ofArray([bind]);
  };

  var ofSub = __exports.ofSub = function (sub) {
    return ofArray([sub]);
  };

  var ofPromise = __exports.ofPromise = function (task, arg, ofSuccess, ofError) {
    var bind = function bind(dispatch) {
      task(arg).then(function ($var9) {
        return dispatch(ofSuccess($var9));
      }).catch(function ($var8) {
        return dispatch(ofError($var8));
      });
    };

    return ofArray([bind]);
  };

  return __exports;
}({});

var MemberInfo = function () {
    function MemberInfo(name, index, declaringType, propertyType, unionFields) {
        classCallCheck(this, MemberInfo);

        this.name = name;
        this.index = index;
        this.declaringType = declaringType;
        this.propertyType = propertyType;
        this.unionFields = unionFields;
    }

    createClass$2(MemberInfo, [{
        key: "getUnionFields",
        value: function getUnionFields() {
            var _this = this;

            return this.unionFields.map(function (fi, i) {
                return new MemberInfo("unknown", i, _this.declaringType, fi);
            });
        }
    }]);
    return MemberInfo;
}();
function resolveGeneric(idx, enclosing) {
    try {
        var t = enclosing.head;
        if (t.generics == null) {
            return resolveGeneric(idx, enclosing.tail);
        } else {
            var name = typeof idx === "string" ? idx : Object.getOwnPropertyNames(t.generics)[idx];
            var resolved = t.generics[name];
            if (resolved == null) {
                return resolveGeneric(idx, enclosing.tail);
            } else if (resolved instanceof NonDeclaredType && resolved.kind === "GenericParam") {
                return resolveGeneric(resolved.definition, enclosing.tail);
            } else {
                return new List$1(resolved, enclosing);
            }
        }
    } catch (err) {
        throw new Error("Cannot resolve generic argument " + idx + ": " + err);
    }
}

// TODO: This needs improvement, check namespace for non-custom types?
function getTypeFullName(typ, option) {
    function trim(fullName, opt) {
        if (typeof fullName !== "string") {
            return "unknown";
        }
        if (opt === "name") {
            var i = fullName.lastIndexOf(".");
            return fullName.substr(i + 1);
        }
        if (opt === "namespace") {
            var _i = fullName.lastIndexOf(".");
            return _i > -1 ? fullName.substr(0, _i) : "";
        }
        return fullName;
    }
    if (typeof typ === "string") {
        return typ;
    } else if (typ instanceof NonDeclaredType) {
        switch (typ.kind) {
            case "Unit":
                return "unit";
            case "Option":
                return getTypeFullName(typ.generics[0], option) + " option";
            case "Array":
                return getTypeFullName(typ.generics[0], option) + "[]";
            case "Tuple":
                return typ.generics.map(function (x) {
                    return getTypeFullName(x, option);
                }).join(" * ");
            case "Function":
                return "Func<" + typ.generics.map(function (x) {
                    return getTypeFullName(x, option);
                }).join(", ") + ">";
            case "GenericParam":
            case "Interface":
                return typ.definition;
            case "GenericType":
                return getTypeFullName(typ.definition, option);
            case "Any":
            default:
                return "unknown";
        }
    } else {
        // Attention: this doesn't work with Object.getPrototypeOf
        var proto = typ.prototype;
        return trim(typeof proto[_Symbol.reflection] === "function" ? proto[_Symbol.reflection]().type : null, option);
    }
}
function getName(x) {
    if (x instanceof MemberInfo) {
        return x.name;
    }
    return getTypeFullName(x, "name");
}




function getUnionFields(obj, typ) {
    if (obj != null && typeof obj[_Symbol.reflection] === "function") {
        var info = obj[_Symbol.reflection]();
        if (info.cases) {
            var uci = info.cases[obj.tag];
            if (uci != null) {
                var fields = uci.length > 2 ? obj.data : uci.length > 1 ? [obj.data] : [];
                return [new MemberInfo(uci[0], obj.tag, typ, null, uci.slice(1)), fields];
            }
        }
    }
    throw new Error("Not an F# union type.");
}

// tslint:disable:max-line-length
// ----------------------------------------------
// These functions belong to Seq.ts but are
// implemented here to prevent cyclic dependencies


var SetTree = function SetTree(tag, data) {
    classCallCheck(this, SetTree);

    this.tag = tag | 0;
    this.data = data;
};
var tree_tolerance = 2;
function tree_countAux(s, acc) {
    countAux: while (true) {
        if (s.tag === 1) {
            return acc + 1 | 0;
        } else if (s.tag === 0) {
            return acc | 0;
        } else {
            var _var5 = s.data[1];
            acc = tree_countAux(s.data[2], acc + 1);
            s = _var5;
            continue countAux;
        }
    }
}
function tree_count(s) {
    return tree_countAux(s, 0);
}
function tree_SetOne(n) {
    return new SetTree(1, [n]);
}
function tree_SetNode(x, l, r, h) {
    return new SetTree(2, [x, l, r, h]);
}
function tree_height$1(t) {
    return t.tag === 1 ? 1 : t.tag === 2 ? t.data[3] : 0;
}
function tree_mk$1(l, k, r) {
    var matchValue = l.tag === 0 ? r.tag === 0 ? 0 : 1 : 1;
    switch (matchValue) {
        case 0:
            return tree_SetOne(k);
        case 1:
            var hl = tree_height$1(l) | 0;
            var hr = tree_height$1(r) | 0;
            var m = (hl < hr ? hr : hl) | 0;
            return tree_SetNode(k, l, r, m + 1);
    }
    throw new Error("internal error: Set.tree_mk");
}
function tree_rebalance$1(t1, k, t2) {
    var t1h = tree_height$1(t1);
    var t2h = tree_height$1(t2);
    if (t2h > t1h + tree_tolerance) {
        if (t2.tag === 2) {
            if (tree_height$1(t2.data[1]) > t1h + 1) {
                if (t2.data[1].tag === 2) {
                    return tree_mk$1(tree_mk$1(t1, k, t2.data[1].data[1]), t2.data[1].data[0], tree_mk$1(t2.data[1].data[2], t2.data[0], t2.data[2]));
                } else {
                    throw new Error("rebalance");
                }
            } else {
                return tree_mk$1(tree_mk$1(t1, k, t2.data[1]), t2.data[0], t2.data[2]);
            }
        } else {
            throw new Error("rebalance");
        }
    } else {
        if (t1h > t2h + tree_tolerance) {
            if (t1.tag === 2) {
                if (tree_height$1(t1.data[2]) > t2h + 1) {
                    if (t1.data[2].tag === 2) {
                        return tree_mk$1(tree_mk$1(t1.data[1], t1.data[0], t1.data[2].data[1]), t1.data[2].data[0], tree_mk$1(t1.data[2].data[2], k, t2));
                    } else {
                        throw new Error("rebalance");
                    }
                } else {
                    return tree_mk$1(t1.data[1], t1.data[0], tree_mk$1(t1.data[2], k, t2));
                }
            } else {
                throw new Error("rebalance");
            }
        } else {
            return tree_mk$1(t1, k, t2);
        }
    }
}
function tree_add$1(comparer, k, t) {
    if (t.tag === 1) {
        var c = comparer.Compare(k, t.data[0]);
        if (c < 0) {
            return tree_SetNode(k, new SetTree(0), t, 2);
        } else if (c === 0) {
            return t;
        } else {
            return tree_SetNode(k, t, new SetTree(0), 2);
        }
    } else if (t.tag === 0) {
        return tree_SetOne(k);
    } else {
        var _c = comparer.Compare(k, t.data[0]);
        if (_c < 0) {
            return tree_rebalance$1(tree_add$1(comparer, k, t.data[1]), t.data[0], t.data[2]);
        } else if (_c === 0) {
            return t;
        } else {
            return tree_rebalance$1(t.data[1], t.data[0], tree_add$1(comparer, k, t.data[2]));
        }
    }
}
function tree_spliceOutSuccessor$1(t) {
    if (t.tag === 1) {
        return [t.data[0], new SetTree(0)];
    } else if (t.tag === 2) {
        if (t.data[1].tag === 0) {
            return [t.data[0], t.data[2]];
        } else {
            var patternInput = tree_spliceOutSuccessor$1(t.data[1]);
            return [patternInput[0], tree_mk$1(patternInput[1], t.data[0], t.data[2])];
        }
    } else {
        throw new Error("internal error: Map.spliceOutSuccessor");
    }
}
function tree_remove$1(comparer, k, t) {
    if (t.tag === 1) {
        var c = comparer.Compare(k, t.data[0]);
        if (c === 0) {
            return new SetTree(0);
        } else {
            return t;
        }
    } else if (t.tag === 2) {
        var _c3 = comparer.Compare(k, t.data[0]);
        if (_c3 < 0) {
            return tree_rebalance$1(tree_remove$1(comparer, k, t.data[1]), t.data[0], t.data[2]);
        } else if (_c3 === 0) {
            var matchValue = [t.data[1], t.data[2]];
            if (matchValue[0].tag === 0) {
                return t.data[2];
            } else if (matchValue[1].tag === 0) {
                return t.data[1];
            } else {
                var patternInput = tree_spliceOutSuccessor$1(t.data[2]);
                return tree_mk$1(t.data[1], patternInput[0], patternInput[1]);
            }
        } else {
            return tree_rebalance$1(t.data[1], t.data[0], tree_remove$1(comparer, k, t.data[2]));
        }
    } else {
        return t;
    }
}
function tree_mem$1(comparer, k, t) {
    mem: while (true) {
        if (t.tag === 1) {
            return comparer.Compare(k, t.data[0]) === 0;
        } else if (t.tag === 0) {
            return false;
        } else {
            var c = comparer.Compare(k, t.data[0]) | 0;
            if (c < 0) {
                comparer = comparer;
                k = k;
                t = t.data[1];
                continue mem;
            } else if (c === 0) {
                return true;
            } else {
                comparer = comparer;
                k = k;
                t = t.data[2];
                continue mem;
            }
        }
    }
}
function tree_collapseLHS$1(stack) {
    collapseLHS: while (true) {
        if (stack.tail != null) {
            if (stack.head.tag === 1) {
                return stack;
            } else if (stack.head.tag === 2) {
                stack = ofArray([stack.head.data[1], tree_SetOne(stack.head.data[0]), stack.head.data[2]], stack.tail);
                continue collapseLHS;
            } else {
                stack = stack.tail;
                continue collapseLHS;
            }
        } else {
            return new List$1();
        }
    }
}
function tree_mkIterator$1(s) {
    return { stack: tree_collapseLHS$1(new List$1(s, new List$1())), started: false };
}
// function tree_notStarted() {
//   throw new Error("Enumeration not started");
// };
// var alreadyFinished = $exports.alreadyFinished = function () {
//   throw new Error("Enumeration already started");
// };
function tree_moveNext$1(i) {
    function current(it) {
        if (it.stack.tail == null) {
            return null;
        } else if (it.stack.head.tag === 1) {
            return it.stack.head.data[0];
        }
        throw new Error("Please report error: Set iterator, unexpected stack for current");
    }
    if (i.started) {
        if (i.stack.tail == null) {
            return { done: true, value: null };
        } else {
            if (i.stack.head.tag === 1) {
                i.stack = tree_collapseLHS$1(i.stack.tail);
                return {
                    done: i.stack.tail == null,
                    value: current(i)
                };
            } else {
                throw new Error("Please report error: Set iterator, unexpected stack for moveNext");
            }
        }
    } else {
        i.started = true;
        return {
            done: i.stack.tail == null,
            value: current(i)
        };
    }
}
function tree_compareStacks(comparer, l1, l2) {
    compareStacks: while (true) {
        var matchValue = l1.tail != null ? l2.tail != null ? l2.head.tag === 1 ? l1.head.tag === 1 ? [4, l1.head.data[0], l2.head.data[0], l1.tail, l2.tail] : l1.head.tag === 2 ? l1.head.data[1].tag === 0 ? [6, l1.head.data[1], l1.head.data[0], l1.head.data[2], l2.head.data[0], l1.tail, l2.tail] : [9, l1.head.data[0], l1.head.data[1], l1.head.data[2], l1.tail] : [10, l2.head.data[0], l2.tail] : l2.head.tag === 2 ? l2.head.data[1].tag === 0 ? l1.head.tag === 1 ? [5, l1.head.data[0], l2.head.data[0], l2.head.data[2], l1.tail, l2.tail] : l1.head.tag === 2 ? l1.head.data[1].tag === 0 ? [7, l1.head.data[0], l1.head.data[2], l2.head.data[0], l2.head.data[2], l1.tail, l2.tail] : [9, l1.head.data[0], l1.head.data[1], l1.head.data[2], l1.tail] : [11, l2.head.data[0], l2.head.data[1], l2.head.data[2], l2.tail] : l1.head.tag === 1 ? [8, l1.head.data[0], l1.tail] : l1.head.tag === 2 ? [9, l1.head.data[0], l1.head.data[1], l1.head.data[2], l1.tail] : [11, l2.head.data[0], l2.head.data[1], l2.head.data[2], l2.tail] : l1.head.tag === 1 ? [8, l1.head.data[0], l1.tail] : l1.head.tag === 2 ? [9, l1.head.data[0], l1.head.data[1], l1.head.data[2], l1.tail] : [3, l1.tail, l2.tail] : [2] : l2.tail != null ? [1] : [0];
        switch (matchValue[0]) {
            case 0:
                return 0;
            case 1:
                return -1;
            case 2:
                return 1;
            case 3:
                comparer = comparer;
                l1 = matchValue[1];
                l2 = matchValue[2];
                continue compareStacks;
            case 4:
                var c = comparer.Compare(matchValue[1], matchValue[2]) | 0;
                if (c !== 0) {
                    return c | 0;
                } else {
                    comparer = comparer;
                    l1 = matchValue[3];
                    l2 = matchValue[4];
                    continue compareStacks;
                }
            case 5:
                var c_1 = comparer.Compare(matchValue[1], matchValue[2]) | 0;
                if (c_1 !== 0) {
                    return c_1 | 0;
                } else {
                    comparer = comparer;
                    l1 = new List$1(new SetTree(0), matchValue[4]);
                    l2 = new List$1(matchValue[3], matchValue[5]);
                    continue compareStacks;
                }
            case 6:
                var c_2 = comparer.Compare(matchValue[2], matchValue[4]) | 0;
                if (c_2 !== 0) {
                    return c_2 | 0;
                } else {
                    comparer = comparer;
                    l1 = new List$1(matchValue[3], matchValue[5]);
                    l2 = new List$1(matchValue[1], matchValue[6]);
                    continue compareStacks;
                }
            case 7:
                var c_3 = comparer.Compare(matchValue[1], matchValue[3]) | 0;
                if (c_3 !== 0) {
                    return c_3 | 0;
                } else {
                    comparer = comparer;
                    l1 = new List$1(matchValue[2], matchValue[5]);
                    l2 = new List$1(matchValue[4], matchValue[6]);
                    continue compareStacks;
                }
            case 8:
                comparer = comparer;
                l1 = ofArray([new SetTree(0), tree_SetOne(matchValue[1])], matchValue[2]);
                l2 = l2;
                continue compareStacks;
            case 9:
                comparer = comparer;
                l1 = ofArray([matchValue[2], tree_SetNode(matchValue[1], new SetTree(0), matchValue[3], 0)], matchValue[4]);
                l2 = l2;
                continue compareStacks;
            case 10:
                comparer = comparer;
                l1 = l1;
                l2 = ofArray([new SetTree(0), tree_SetOne(matchValue[1])], matchValue[2]);
                continue compareStacks;
            case 11:
                comparer = comparer;
                l1 = l1;
                l2 = ofArray([matchValue[2], tree_SetNode(matchValue[1], new SetTree(0), matchValue[3], 0)], matchValue[4]);
                continue compareStacks;
        }
    }
}
function tree_compare(comparer, s1, s2) {
    if (s1.tag === 0) {
        return s2.tag === 0 ? 0 : -1;
    } else {
        return s2.tag === 0 ? 1 : tree_compareStacks(comparer, ofArray([s1]), ofArray([s2]));
    }
}
function tree_mkFromEnumerator$1(comparer, acc, e) {
    var cur = e.next();
    while (!cur.done) {
        acc = tree_add$1(comparer, cur.value, acc);
        cur = e.next();
    }
    return acc;
}
function tree_ofSeq$1(comparer, c) {
    var ie = c[Symbol.iterator]();
    return tree_mkFromEnumerator$1(comparer, new SetTree(0), ie);
}

var FableSet = function () {
    /** Do not call, use Set.create instead. */
    function FableSet() {
        classCallCheck(this, FableSet);
        return;
    }

    createClass$2(FableSet, [{
        key: "ToString",
        value: function ToString() {
            return "set [" + Array.from(this).map(function (x) {
                return toString(x);
            }).join("; ") + "]";
        }
    }, {
        key: "Equals",
        value: function Equals(s2) {
            return this.CompareTo(s2) === 0;
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(s2) {
            return this === s2 ? 0 : tree_compare(this.comparer, this.tree, s2.tree);
        }
    }, {
        key: Symbol.iterator,
        value: function value() {
            var i = tree_mkIterator$1(this.tree);
            return {
                next: function next() {
                    return tree_moveNext$1(i);
                }
            };
        }
    }, {
        key: "values",
        value: function values() {
            return this[Symbol.iterator]();
        }
    }, {
        key: "has",
        value: function has(v) {
            return tree_mem$1(this.comparer, v, this.tree);
        }
        /** Mutating method */

    }, {
        key: "add",
        value: function add(v) {
            this.tree = tree_add$1(this.comparer, v, this.tree);
            return this;
        }
        /** Mutating method */

    }, {
        key: "delete",
        value: function _delete(v) {
            // TODO: Is calculating the size twice is more performant than calling tree_mem?
            var oldSize = tree_count(this.tree);
            this.tree = tree_remove$1(this.comparer, v, this.tree);
            return oldSize > tree_count(this.tree);
        }
        /** Mutating method */

    }, {
        key: "clear",
        value: function clear() {
            this.tree = new SetTree(0);
        }
    }, {
        key: _Symbol.reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Collections.FSharpSet",
                interfaces: ["System.IEquatable", "System.IComparable"]
            };
        }
    }, {
        key: "size",
        get: function get$$1() {
            return tree_count(this.tree);
        }
    }]);
    return FableSet;
}();

function from$1(comparer, tree) {
    var s = new FableSet();
    s.tree = tree;
    s.comparer = comparer || new Comparer();
    return s;
}
function create$4(ie, comparer) {
    comparer = comparer || new Comparer();
    return from$1(comparer, ie ? tree_ofSeq$1(comparer, ie) : new SetTree(0));
}

// tslint:disable:ban-types
function deflate(v) {
    if (ArrayBuffer.isView(v)) {
        return Array.from(v);
    } else if (v != null && (typeof v === "undefined" ? "undefined" : _typeof(v)) === "object") {
        if (v instanceof List$1 || v instanceof FableSet || v instanceof Set) {
            return Array.from(v);
        } else if (v instanceof FableMap || v instanceof Map) {
            var stringKeys = null;
            return fold$1(function (o, kv) {
                if (stringKeys === null) {
                    stringKeys = typeof kv[0] === "string";
                }
                o[stringKeys ? kv[0] : toJson(kv[0])] = kv[1];
                return o;
            }, {}, v);
        }
        var reflectionInfo = typeof v[_Symbol.reflection] === "function" ? v[_Symbol.reflection]() : {};
        if (reflectionInfo.properties) {
            return fold$1(function (o, prop) {
                return o[prop] = v[prop], o;
            }, {}, Object.getOwnPropertyNames(reflectionInfo.properties));
        } else if (reflectionInfo.cases) {
            var caseInfo = reflectionInfo.cases[v.tag];
            var caseName = caseInfo[0];
            var fieldsLength = caseInfo.length - 1;
            if (fieldsLength === 0) {
                return caseName;
            } else {
                // Prevent undefined assignment from removing case property; see #611:
                return defineProperty({}, caseName, v.data !== void 0 ? v.data : null);
            }
        }
    }
    return v;
}
function toJson(o) {
    return JSON.stringify(o, function (k, v) {
        return deflate(v);
    });
}
function combine(path1, path2) {
    return typeof path2 === "number" ? path1 + "[" + path2 + "]" : (path1 ? path1 + "." : "") + path2;
}
function isNullable(typ) {
    if (typeof typ === "string") {
        return typ !== "boolean" && typ !== "number";
    } else if (typ instanceof NonDeclaredType) {
        return typ.kind !== "Array" && typ.kind !== "Tuple";
    } else {
        var info = typeof typ.prototype[_Symbol.reflection] === "function" ? typ.prototype[_Symbol.reflection]() : null;
        return info ? info.nullable : true;
    }
}
function invalidate(val, typ, path) {
    throw new Error(fsFormat("%A", val) + " " + (path ? "(" + path + ")" : "") + " is not of type " + getTypeFullName(typ));
}
function needsInflate(enclosing) {
    var typ = enclosing.head;
    if (typeof typ === "string") {
        return false;
    }
    if (typ instanceof NonDeclaredType) {
        switch (typ.kind) {
            case "Option":
            case "Array":
                return typ.definition != null || needsInflate(new List$1(typ.generics[0], enclosing));
            case "Tuple":
                return typ.generics.some(function (x) {
                    return needsInflate(new List$1(x, enclosing));
                });
            case "Function":
                return false;
            case "GenericParam":
                return needsInflate(resolveGeneric(typ.definition, enclosing.tail));
            case "GenericType":
                return true;
            default:
                return false;
        }
    }
    return true;
}
function inflateArray(arr, enclosing, path) {
    if (!Array.isArray) {
        invalidate(arr, "array", path);
    }
    // TODO: Validate non-inflated elements
    return needsInflate(enclosing) ? arr.map(function (x, i) {
        return inflate(x, enclosing, combine(path, i));
    }) : arr;
}
function inflateMap(obj, keyEnclosing, valEnclosing, path) {
    var inflateKey = keyEnclosing.head !== "string";
    var inflateVal = needsInflate(valEnclosing);
    return Object.getOwnPropertyNames(obj).map(function (k) {
        var key = inflateKey ? inflate(JSON.parse(k), keyEnclosing, combine(path, k)) : k;
        var val = inflateVal ? inflate(obj[k], valEnclosing, combine(path, k)) : obj[k];
        return [key, val];
    });
}
function inflateList(val, enclosing, path) {
    var ar = [];
    var li = new List$1();
    var cur = val;
    var inf = needsInflate(enclosing);
    while (cur.tail != null) {
        ar.push(inf ? inflate(cur.head, enclosing, path) : cur.head);
        cur = cur.tail;
    }
    ar.reverse();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = ar[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var a = _step.value;

            li = new List$1(a, li);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return li;
}
function inflateUnion(val, typ, info, path, inflateField) {
    var caseName = void 0;
    // Same shape as runtime DUs, for example, if they've been serialized with `JSON.stringify`
    if (typeof val.tag === "number") {
        return Object.assign(new typ(), val);
    } else if (typeof val === "string") {
        // Cases without fields are serialized as strings by `toJson`
        caseName = val;
    } else {
        // Non-empty cases are serialized as `{ "MyCase": [1, 2] }` by `toJson`
        caseName = Object.getOwnPropertyNames(val)[0];
    }
    // Locate case index
    var tag = -1;
    for (var i = 0; info.cases[i] != null; i++) {
        if (info.cases[i][0] === caseName) {
            tag = i;
            break;
        }
    }
    // Validate
    if (tag === -1) {
        invalidate(val, typ, path);
    }
    var caseInfo = info.cases[tag];
    var inflatedData = void 0;
    if (caseInfo.length > 2) {
        inflatedData = [];
        var data = val[caseName];
        path = combine(path, caseName);
        for (var _i = 0; _i < data.length; _i++) {
            inflatedData.push(inflateField ? inflateField(data[_i], caseInfo[_i + 1], combine(path, _i)) : data[_i]);
        }
    } else if (caseInfo.length > 1) {
        inflatedData = inflateField ? inflateField(val[caseName], caseInfo[1], combine(path, caseName)) : val[caseName];
    }
    return new typ(tag, inflatedData);
}
function inflate(val, typ, path) {
    var enclosing = null;
    if (typ instanceof List$1) {
        enclosing = typ;
        typ = typ.head;
    } else {
        enclosing = new List$1(typ, new List$1());
    }
    if (val == null) {
        if (!isNullable(typ)) {
            invalidate(val, typ, path);
        }
        return val;
    } else if (typeof typ === "string") {
        if ((typ === "boolean" || typ === "number" || typ === "string") && (typeof val === "undefined" ? "undefined" : _typeof(val)) !== typ) {
            invalidate(val, typ, path);
        }
        return val;
    } else if (typ instanceof NonDeclaredType) {
        switch (typ.kind) {
            case "Unit":
                return null;
            case "Option":
                return inflate(val, new List$1(typ.generics[0], enclosing), path);
            case "Array":
                if (typ.definition != null) {
                    return new typ.definition(val);
                } else {
                    return inflateArray(val, new List$1(typ.generics[0], enclosing), path);
                }
            case "Tuple":
                return typ.generics.map(function (x, i) {
                    return inflate(val[i], new List$1(x, enclosing), combine(path, i));
                });
            case "Function":
                return val;
            case "GenericParam":
                return inflate(val, resolveGeneric(typ.definition, enclosing.tail), path);
            case "GenericType":
                var def = typ.definition;
                if (def === List$1) {
                    return Array.isArray(val) ? ofArray(inflateArray(val, resolveGeneric(0, enclosing), path)) : inflateList(val, resolveGeneric(0, enclosing), path);
                }
                // TODO: Should we try to inflate also sets and maps serialized with `JSON.stringify`?
                if (def === FableSet) {
                    return create$4(inflateArray(val, resolveGeneric(0, enclosing), path));
                }
                if (def === Set) {
                    return new Set(inflateArray(val, resolveGeneric(0, enclosing), path));
                }
                if (def === FableMap) {
                    return create(inflateMap(val, resolveGeneric(0, enclosing), resolveGeneric(1, enclosing), path));
                }
                if (def === Map) {
                    return new Map(inflateMap(val, resolveGeneric(0, enclosing), resolveGeneric(1, enclosing), path));
                }
                return inflate(val, new List$1(typ.definition, enclosing), path);
            default:
                // case "Interface": // case "Any":
                return val;
        }
    } else if (typeof typ === "function") {
        if (typ === Date) {
            return parse$1(val);
        }
        if (typeof typ.ofJSON === "function") {
            return typ.ofJSON(val);
        }
        var info = typeof typ.prototype[_Symbol.reflection] === "function" ? typ.prototype[_Symbol.reflection]() : {};
        // Union types
        if (info.cases) {
            return inflateUnion(val, typ, info, path, function (fi, t, p) {
                return inflate(fi, new List$1(t, enclosing), path);
            });
        }
        if (info.properties) {
            var newObj = new typ();
            var properties = info.properties;
            var ks = Object.getOwnPropertyNames(properties);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = ks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var k = _step2.value;

                    newObj[k] = inflate(val[k], new List$1(properties[k], enclosing), combine(path, k));
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return newObj;
        }
        return val;
    }
    throw new Error("Unexpected type when deserializing JSON: " + typ);
}
function inflatePublic(val, genArgs) {
    return inflate(val, genArgs ? genArgs.T : null, "");
}

// TODO: Dates and types with `toJSON` are not adding the $type field

var QueueCell = function QueueCell(message) {
    classCallCheck(this, QueueCell);

    this.value = message;
};

var MailboxQueue = function () {
    function MailboxQueue() {
        classCallCheck(this, MailboxQueue);
    }

    createClass$2(MailboxQueue, [{
        key: "add",
        value: function add(message) {
            var itCell = new QueueCell(message);
            if (this.firstAndLast) {
                this.firstAndLast[1].next = itCell;
                this.firstAndLast = [this.firstAndLast[0], itCell];
            } else {
                this.firstAndLast = [itCell, itCell];
            }
        }
    }, {
        key: "tryGet",
        value: function tryGet() {
            if (this.firstAndLast) {
                var value = this.firstAndLast[0].value;
                if (this.firstAndLast[0].next) {
                    this.firstAndLast = [this.firstAndLast[0].next, this.firstAndLast[1]];
                } else {
                    delete this.firstAndLast;
                }
                return value;
            }
            return void 0;
        }
    }]);
    return MailboxQueue;
}();

var MailboxProcessor = function () {
    function MailboxProcessor(body, cancellationToken$$1) {
        classCallCheck(this, MailboxProcessor);

        this.body = body;
        this.cancellationToken = cancellationToken$$1 || defaultCancellationToken;
        this.messages = new MailboxQueue();
    }

    createClass$2(MailboxProcessor, [{
        key: "__processEvents",
        value: function __processEvents() {
            if (this.continuation) {
                var value = this.messages.tryGet();
                if (value) {
                    var cont = this.continuation;
                    delete this.continuation;
                    cont(value);
                }
            }
        }
    }, {
        key: "start",
        value: function start$$1() {
            startImmediate(this.body(this), this.cancellationToken);
        }
    }, {
        key: "receive",
        value: function receive() {
            var _this = this;

            return fromContinuations(function (conts) {
                if (_this.continuation) {
                    throw new Error("Receive can only be called once!");
                }
                _this.continuation = conts[0];
                _this.__processEvents();
            });
        }
    }, {
        key: "post",
        value: function post(message) {
            this.messages.add(message);
            this.__processEvents();
        }
    }, {
        key: "postAndAsyncReply",
        value: function postAndAsyncReply(buildMessage) {
            var result = void 0;
            var continuation = void 0;
            function checkCompletion() {
                if (result && continuation) {
                    continuation(result);
                }
            }
            var reply = {
                reply: function reply(res) {
                    result = res;
                    checkCompletion();
                }
            };
            this.messages.add(buildMessage(reply));
            this.__processEvents();
            return fromContinuations(function (conts) {
                continuation = conts[0];
                checkCompletion();
            });
        }
    }]);
    return MailboxProcessor;
}();

function start$1(body, cancellationToken$$1) {
    var mbox = new MailboxProcessor(body, cancellationToken$$1);
    mbox.start();
    return mbox;
}

var Program = function () {
  function Program(init, update, subscribe, view, setState, onError) {
    babelHelpers.classCallCheck(this, Program);
    this.init = init;
    this.update = update;
    this.subscribe = subscribe;
    this.view = view;
    this.setState = setState;
    this.onError = onError;
  }

  babelHelpers.createClass(Program, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elmish.Program",
        interfaces: ["FSharpRecord"],
        properties: {
          init: FableFunction([GenericParam("arg"), Tuple([GenericParam("model"), makeGeneric(List$1, {
            T: FableFunction([FableFunction([GenericParam("msg"), Unit]), Unit])
          })])]),
          update: FableFunction([GenericParam("msg"), GenericParam("model"), Tuple([GenericParam("model"), makeGeneric(List$1, {
            T: FableFunction([FableFunction([GenericParam("msg"), Unit]), Unit])
          })])]),
          subscribe: FableFunction([GenericParam("model"), makeGeneric(List$1, {
            T: FableFunction([FableFunction([GenericParam("msg"), Unit]), Unit])
          })]),
          view: FableFunction([GenericParam("model"), FableFunction([GenericParam("msg"), Unit]), GenericParam("view")]),
          setState: FableFunction([GenericParam("model"), FableFunction([GenericParam("msg"), Unit]), Unit]),
          onError: FableFunction([Tuple(["string", Error]), Unit])
        }
      };
    }
  }]);
  return Program;
}();
setType("Elmish.Program", Program);
var ProgramModule = function (__exports) {
  var onError = __exports.onError = function (text, ex) {
    console.error(text, ex);
  };

  var mkProgram = __exports.mkProgram = function (init, update, view) {
    var setState = CurriedLambda(function (model) {
      return function ($var2) {
        return function (value) {
          value;
        }(function ($var1) {
          return view(model, $var1);
        }($var2));
      };
    });
    return new Program(init, update, function (_arg1) {
      return Cmd.none();
    }, view, setState, function (tupledArg) {
      onError(tupledArg[0], tupledArg[1]);
    });
  };

  var mkSimple = __exports.mkSimple = function (init, update, view) {
    var init_1 = function init_1($var3) {
      return function (state) {
        return [state, Cmd.none()];
      }(init($var3));
    };

    var update_1 = CurriedLambda(function (msg) {
      return function ($var5) {
        return function (state_1) {
          return [state_1, Cmd.none()];
        }(function ($var4) {
          return update(msg, $var4);
        }($var5));
      };
    });
    var setState = CurriedLambda(function (model) {
      return function ($var7) {
        return function (value) {
          value;
        }(function ($var6) {
          return view(model, $var6);
        }($var7));
      };
    });
    return new Program(init_1, update_1, function (_arg1) {
      return Cmd.none();
    }, view, setState, function (tupledArg) {
      onError(tupledArg[0], tupledArg[1]);
    });
  };

  var withSubscription = __exports.withSubscription = function (subscribe, program) {
    var sub = function sub(model) {
      return Cmd.batch(ofArray([program.subscribe(model), subscribe(model)]));
    };

    return new Program(program.init, program.update, sub, program.view, program.setState, program.onError);
  };

  var withConsoleTrace = __exports.withConsoleTrace = function (program) {
    var traceInit = function traceInit(arg) {
      var patternInput = program.init(arg);
      console.log("Initial state:", function (o) {
        return function (arg00) {
          return JSON.parse(arg00);
        }(toJson(o));
      }(patternInput[0]));
      return [patternInput[0], patternInput[1]];
    };

    var traceUpdate = function traceUpdate(msg, model) {
      console.log("New message:", function (o_1) {
        return function (arg00_1) {
          return JSON.parse(arg00_1);
        }(toJson(o_1));
      }(msg));
      var patternInput_1 = program.update(msg, model);
      console.log("Updated state:", function (o_2) {
        return function (arg00_2) {
          return JSON.parse(arg00_2);
        }(toJson(o_2));
      }(patternInput_1[0]));
      return [patternInput_1[0], patternInput_1[1]];
    };

    return new Program(traceInit, traceUpdate, program.subscribe, program.view, program.setState, program.onError);
  };

  var withTrace = __exports.withTrace = function (trace, program) {
    var update = function update(msg, model) {
      trace(msg, model);
      return program.update(msg, model);
    };

    return new Program(program.init, update, program.subscribe, program.view, program.setState, program.onError);
  };

  var withErrorHandler = __exports.withErrorHandler = function (onError_1, program) {
    return new Program(program.init, program.update, program.subscribe, program.view, program.setState, onError_1);
  };

  var runWith = __exports.runWith = function (arg, program) {
    var patternInput = program.init(arg);
    var inbox = start$1(function (mb) {
      var loop = function loop(state) {
        return function (builder_) {
          return builder_.Delay(function () {
            return builder_.Bind(mb.receive(), function (_arg1) {
              return builder_.TryWith(builder_.Delay(function () {
                var patternInput_1 = program.update(_arg1, state);
                program.setState(patternInput_1[0], function (arg00) {
                  mb.post(arg00);
                });
                iterate$1(function (sub) {
                  sub(function (arg00_1) {
                    mb.post(arg00_1);
                  });
                }, patternInput_1[1]);
                return builder_.ReturnFrom(loop(patternInput_1[0]));
              }), function (_arg2) {
                program.onError(["Unable to process a message:", _arg2]);
                return builder_.ReturnFrom(loop(state));
              });
            });
          });
        }(singleton$2);
      };

      return loop(patternInput[0]);
    });
    program.setState(patternInput[0], function (arg00_2) {
      inbox.post(arg00_2);
    });
    iterate$1(function (sub_1) {
      sub_1(function (arg00_3) {
        inbox.post(arg00_3);
      });
    }, append(program.subscribe(patternInput[0]), patternInput[1]));
  };

  var run = __exports.run = function (program) {
    runWith(null, program);
  };

  return __exports;
}({});

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant$1(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

var reactProdInvariant_1$2 = reactProdInvariant$1;

function checkMask(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var DOMPropertyInjection = {
  /**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */
  MUST_USE_PROPERTY: 0x1,
  HAS_BOOLEAN_VALUE: 0x4,
  HAS_NUMERIC_VALUE: 0x8,
  HAS_POSITIVE_NUMERIC_VALUE: 0x10 | 0x8,
  HAS_OVERLOADED_BOOLEAN_VALUE: 0x20,

  /**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * isCustomAttribute: function that given an attribute name will return true
   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
   * attributes where it's impossible to enumerate all of the possible
   * attribute names,
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
   * attribute namespace URL. (Attribute names not specified use no namespace.)
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */
  injectDOMPropertyConfig: function (domPropertyConfig) {
    var Injection = DOMPropertyInjection;
    var Properties = domPropertyConfig.Properties || {};
    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

    if (domPropertyConfig.isCustomAttribute) {
      DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
    }

    for (var propName in Properties) {
      !!DOMProperty.properties.hasOwnProperty(propName) ? reactProdInvariant_1$2('48', propName) : void 0;

      var lowerCased = propName.toLowerCase();
      var propConfig = Properties[propName];

      var propertyInfo = {
        attributeName: lowerCased,
        attributeNamespace: null,
        propertyName: propName,
        mutationMethod: null,

        mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
        hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
        hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
        hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
        hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
      };
      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? reactProdInvariant_1$2('50', propName) : void 0;

      if (DOMAttributeNames.hasOwnProperty(propName)) {
        var attributeName = DOMAttributeNames[propName];
        propertyInfo.attributeName = attributeName;
        
      }

      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
      }

      if (DOMPropertyNames.hasOwnProperty(propName)) {
        propertyInfo.propertyName = DOMPropertyNames[propName];
      }

      if (DOMMutationMethods.hasOwnProperty(propName)) {
        propertyInfo.mutationMethod = DOMMutationMethods[propName];
      }

      DOMProperty.properties[propName] = propertyInfo;
    }
  }
};

/* eslint-disable max-len */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
/* eslint-enable max-len */

/**
 * DOMProperty exports lookup objects that can be used like functions:
 *
 *   > DOMProperty.isValid['id']
 *   true
 *   > DOMProperty.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */
var DOMProperty = {
  ID_ATTRIBUTE_NAME: 'data-reactid',
  ROOT_ATTRIBUTE_NAME: 'data-reactroot',

  ATTRIBUTE_NAME_START_CHAR: ATTRIBUTE_NAME_START_CHAR,
  ATTRIBUTE_NAME_CHAR: ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040',

  /**
   * Map from property "standard name" to an object with info about how to set
   * the property in the DOM. Each object contains:
   *
   * attributeName:
   *   Used when rendering markup or with `*Attribute()`.
   * attributeNamespace
   * propertyName:
   *   Used on DOM node instances. (This includes properties that mutate due to
   *   external factors.)
   * mutationMethod:
   *   If non-null, used instead of the property or `setAttribute()` after
   *   initial render.
   * mustUseProperty:
   *   Whether the property must be accessed and mutated as an object property.
   * hasBooleanValue:
   *   Whether the property should be removed when set to a falsey value.
   * hasNumericValue:
   *   Whether the property must be numeric or parse as a numeric and should be
   *   removed when set to a falsey value.
   * hasPositiveNumericValue:
   *   Whether the property must be positive numeric or parse as a positive
   *   numeric and should be removed when set to a falsey value.
   * hasOverloadedBooleanValue:
   *   Whether the property can be used as a flag as well as with a value.
   *   Removed when strictly equal to false; present without a value when
   *   strictly equal to true; present with a value otherwise.
   */
  properties: {},

  /**
   * Mapping from lowercase property names to the properly cased version, used
   * to warn in the case of missing properties. Available only in __DEV__.
   *
   * autofocus is predefined, because adding it to the property whitelist
   * causes unintended side effects.
   *
   * @type {Object}
   */
  getPossibleStandardName: null,

  /**
   * All of the isCustomAttribute() functions that have been injected.
   */
  _isCustomAttributeFunctions: [],

  /**
   * Checks whether a property name is a custom attribute.
   * @method
   */
  isCustomAttribute: function (attributeName) {
    for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
      var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
      if (isCustomAttributeFn(attributeName)) {
        return true;
      }
    }
    return false;
  },

  injection: DOMPropertyInjection
};

var DOMProperty_1 = DOMProperty;

/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var ReactDOMComponentFlags = {
  hasCachedChildNodes: 1 << 0
};

var ReactDOMComponentFlags_1 = ReactDOMComponentFlags;

var ATTR_NAME = DOMProperty_1.ID_ATTRIBUTE_NAME;
var Flags = ReactDOMComponentFlags_1;

var internalInstanceKey = '__reactInternalInstance$' + Math.random().toString(36).slice(2);

/**
 * Check if a given node should be cached.
 */
function shouldPrecacheNode(node, nodeID) {
  return node.nodeType === 1 && node.getAttribute(ATTR_NAME) === String(nodeID) || node.nodeType === 8 && node.nodeValue === ' react-text: ' + nodeID + ' ' || node.nodeType === 8 && node.nodeValue === ' react-empty: ' + nodeID + ' ';
}

/**
 * Drill down (through composites and empty components) until we get a host or
 * host text component.
 *
 * This is pretty polymorphic but unavoidable with the current structure we have
 * for `_renderedChildren`.
 */
function getRenderedHostOrTextFromComponent(component) {
  var rendered;
  while (rendered = component._renderedComponent) {
    component = rendered;
  }
  return component;
}

/**
 * Populate `_hostNode` on the rendered host/text component with the given
 * DOM node. The passed `inst` can be a composite.
 */
function precacheNode(inst, node) {
  var hostInst = getRenderedHostOrTextFromComponent(inst);
  hostInst._hostNode = node;
  node[internalInstanceKey] = hostInst;
}

function uncacheNode(inst) {
  var node = inst._hostNode;
  if (node) {
    delete node[internalInstanceKey];
    inst._hostNode = null;
  }
}

/**
 * Populate `_hostNode` on each child of `inst`, assuming that the children
 * match up with the DOM (element) children of `node`.
 *
 * We cache entire levels at once to avoid an n^2 problem where we access the
 * children of a node sequentially and have to walk from the start to our target
 * node every time.
 *
 * Since we update `_renderedChildren` and the actual DOM at (slightly)
 * different times, we could race here and see a newer `_renderedChildren` than
 * the DOM nodes we see. To avoid this, ReactMultiChild calls
 * `prepareToManageChildren` before we change `_renderedChildren`, at which
 * time the container's child nodes are always cached (until it unmounts).
 */
function precacheChildNodes(inst, node) {
  if (inst._flags & Flags.hasCachedChildNodes) {
    return;
  }
  var children = inst._renderedChildren;
  var childNode = node.firstChild;
  outer: for (var name in children) {
    if (!children.hasOwnProperty(name)) {
      continue;
    }
    var childInst = children[name];
    var childID = getRenderedHostOrTextFromComponent(childInst)._domID;
    if (childID === 0) {
      // We're currently unmounting this child in ReactMultiChild; skip it.
      continue;
    }
    // We assume the child nodes are in the same order as the child instances.
    for (; childNode !== null; childNode = childNode.nextSibling) {
      if (shouldPrecacheNode(childNode, childID)) {
        precacheNode(childInst, childNode);
        continue outer;
      }
    }
    // We reached the end of the DOM children without finding an ID match.
    reactProdInvariant_1$2('32', childID);
  }
  inst._flags |= Flags.hasCachedChildNodes;
}

/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 */
function getClosestInstanceFromNode(node) {
  if (node[internalInstanceKey]) {
    return node[internalInstanceKey];
  }

  // Walk up the tree until we find an ancestor whose instance we have cached.
  var parents = [];
  while (!node[internalInstanceKey]) {
    parents.push(node);
    if (node.parentNode) {
      node = node.parentNode;
    } else {
      // Top of the tree. This node must not be part of a React tree (or is
      // unmounted, potentially).
      return null;
    }
  }

  var closest;
  var inst;
  for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
    closest = inst;
    if (parents.length) {
      precacheChildNodes(inst, node);
    }
  }

  return closest;
}

/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */
function getInstanceFromNode(node) {
  var inst = getClosestInstanceFromNode(node);
  if (inst != null && inst._hostNode === node) {
    return inst;
  } else {
    return null;
  }
}

/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */
function getNodeFromInstance(inst) {
  // Without this first invariant, passing a non-DOM-component triggers the next
  // invariant for a missing parent, which is super confusing.
  !(inst._hostNode !== undefined) ? reactProdInvariant_1$2('33') : void 0;

  if (inst._hostNode) {
    return inst._hostNode;
  }

  // Walk up the tree until we find an ancestor whose DOM node we have cached.
  var parents = [];
  while (!inst._hostNode) {
    parents.push(inst);
    !inst._hostParent ? reactProdInvariant_1$2('34') : void 0;
    inst = inst._hostParent;
  }

  // Now parents contains each ancestor that does *not* have a cached native
  // node, and `inst` is the deepest ancestor that does.
  for (; parents.length; inst = parents.pop()) {
    precacheChildNodes(inst, inst._hostNode);
  }

  return inst._hostNode;
}

var ReactDOMComponentTree = {
  getClosestInstanceFromNode: getClosestInstanceFromNode,
  getInstanceFromNode: getInstanceFromNode,
  getNodeFromInstance: getNodeFromInstance,
  precacheChildNodes: precacheChildNodes,
  precacheNode: precacheNode,
  uncacheNode: uncacheNode
};

var ReactDOMComponentTree_1 = ReactDOMComponentTree;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var ARIADOMPropertyConfig = {
  Properties: {
    // Global States and Properties
    'aria-current': 0, // state
    'aria-details': 0,
    'aria-disabled': 0, // state
    'aria-hidden': 0, // state
    'aria-invalid': 0, // state
    'aria-keyshortcuts': 0,
    'aria-label': 0,
    'aria-roledescription': 0,
    // Widget Attributes
    'aria-autocomplete': 0,
    'aria-checked': 0,
    'aria-expanded': 0,
    'aria-haspopup': 0,
    'aria-level': 0,
    'aria-modal': 0,
    'aria-multiline': 0,
    'aria-multiselectable': 0,
    'aria-orientation': 0,
    'aria-placeholder': 0,
    'aria-pressed': 0,
    'aria-readonly': 0,
    'aria-required': 0,
    'aria-selected': 0,
    'aria-sort': 0,
    'aria-valuemax': 0,
    'aria-valuemin': 0,
    'aria-valuenow': 0,
    'aria-valuetext': 0,
    // Live Region Attributes
    'aria-atomic': 0,
    'aria-busy': 0,
    'aria-live': 0,
    'aria-relevant': 0,
    // Drag-and-Drop Attributes
    'aria-dropeffect': 0,
    'aria-grabbed': 0,
    // Relationship Attributes
    'aria-activedescendant': 0,
    'aria-colcount': 0,
    'aria-colindex': 0,
    'aria-colspan': 0,
    'aria-controls': 0,
    'aria-describedby': 0,
    'aria-errormessage': 0,
    'aria-flowto': 0,
    'aria-labelledby': 0,
    'aria-owns': 0,
    'aria-posinset': 0,
    'aria-rowcount': 0,
    'aria-rowindex': 0,
    'aria-rowspan': 0,
    'aria-setsize': 0
  },
  DOMAttributeNames: {},
  DOMPropertyNames: {}
};

var ARIADOMPropertyConfig_1 = ARIADOMPropertyConfig;

/**
 * Injectable ordering of event plugins.
 */
var eventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!eventPluginOrder) {
    // Wait until an `eventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var pluginModule = namesToPlugins[pluginName];
    var pluginIndex = eventPluginOrder.indexOf(pluginName);
    !(pluginIndex > -1) ? reactProdInvariant_1$2('96', pluginName) : void 0;
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    !pluginModule.extractEvents ? reactProdInvariant_1$2('97', pluginName) : void 0;
    EventPluginRegistry.plugins[pluginIndex] = pluginModule;
    var publishedEvents = pluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? reactProdInvariant_1$2('98', eventName, pluginName) : void 0;
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
  !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? reactProdInvariant_1$2('99', eventName) : void 0;
  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events and
 * can be used with `EventPluginHub.putListener` to register listeners.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, pluginModule, eventName) {
  !!EventPluginRegistry.registrationNameModules[registrationName] ? reactProdInvariant_1$2('100', registrationName) : void 0;
  EventPluginRegistry.registrationNameModules[registrationName] = pluginModule;
  EventPluginRegistry.registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;

  
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */
var EventPluginRegistry = {
  /**
   * Ordered list of injected plugins.
   */
  plugins: [],

  /**
   * Mapping from event name to dispatch config
   */
  eventNameDispatchConfigs: {},

  /**
   * Mapping from registration name to plugin module
   */
  registrationNameModules: {},

  /**
   * Mapping from registration name to event name
   */
  registrationNameDependencies: {},

  /**
   * Mapping from lowercase registration names to the properly cased version,
   * used to warn in the case of missing event handlers. Available
   * only in __DEV__.
   * @type {Object}
   */
  possibleRegistrationNames: null,
  // Trust the developer to only use possibleRegistrationNames in __DEV__

  /**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */
  injectEventPluginOrder: function (injectedEventPluginOrder) {
    !!eventPluginOrder ? reactProdInvariant_1$2('101') : void 0;
    // Clone the ordering so it cannot be dynamically mutated.
    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
    recomputePluginOrdering();
  },

  /**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */
  injectEventPluginsByName: function (injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var pluginModule = injectedNamesToPlugins[pluginName];
      if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
        !!namesToPlugins[pluginName] ? reactProdInvariant_1$2('102', pluginName) : void 0;
        namesToPlugins[pluginName] = pluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      recomputePluginOrdering();
    }
  },

  /**
   * Looks up the plugin for the supplied event.
   *
   * @param {object} event A synthetic event.
   * @return {?object} The plugin that created the supplied event.
   * @internal
   */
  getPluginModuleForEvent: function (event) {
    var dispatchConfig = event.dispatchConfig;
    if (dispatchConfig.registrationName) {
      return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
    }
    if (dispatchConfig.phasedRegistrationNames !== undefined) {
      // pulling phasedRegistrationNames out of dispatchConfig helps Flow see
      // that it is not undefined.
      var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;

      for (var phase in phasedRegistrationNames) {
        if (!phasedRegistrationNames.hasOwnProperty(phase)) {
          continue;
        }
        var pluginModule = EventPluginRegistry.registrationNameModules[phasedRegistrationNames[phase]];
        if (pluginModule) {
          return pluginModule;
        }
      }
    }
    return null;
  },

  /**
   * Exposed for unit testing.
   * @private
   */
  _resetEventPlugins: function () {
    eventPluginOrder = null;
    for (var pluginName in namesToPlugins) {
      if (namesToPlugins.hasOwnProperty(pluginName)) {
        delete namesToPlugins[pluginName];
      }
    }
    EventPluginRegistry.plugins.length = 0;

    var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
    for (var eventName in eventNameDispatchConfigs) {
      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
        delete eventNameDispatchConfigs[eventName];
      }
    }

    var registrationNameModules = EventPluginRegistry.registrationNameModules;
    for (var registrationName in registrationNameModules) {
      if (registrationNameModules.hasOwnProperty(registrationName)) {
        delete registrationNameModules[registrationName];
      }
    }

    
  }
};

var EventPluginRegistry_1 = EventPluginRegistry;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

var caughtError = null;

/**
 * Call a function while guarding against errors that happens within it.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} a First argument
 * @param {*} b Second argument
 */
function invokeGuardedCallback(name, func, a) {
  try {
    func(a);
  } catch (x) {
    if (caughtError === null) {
      caughtError = x;
    }
  }
}

var ReactErrorUtils = {
  invokeGuardedCallback: invokeGuardedCallback,

  /**
   * Invoked by ReactTestUtils.Simulate so that any errors thrown by the event
   * handler are sure to be rethrown by rethrowCaughtError.
   */
  invokeGuardedCallbackWithCatch: invokeGuardedCallback,

  /**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */
  rethrowCaughtError: function () {
    if (caughtError) {
      var error = caughtError;
      caughtError = null;
      throw error;
    }
  }
};

var ReactErrorUtils_1 = ReactErrorUtils;

/**
 * Injected dependencies:
 */

/**
 * - `ComponentTree`: [required] Module that can convert between React instances
 *   and actual node references.
 */
var ComponentTree;
var TreeTraversal;
var injection = {
  injectComponentTree: function (Injected) {
    ComponentTree = Injected;
    
  },
  injectTreeTraversal: function (Injected) {
    TreeTraversal = Injected;
    
  }
};

function isEndish(topLevelType) {
  return topLevelType === 'topMouseUp' || topLevelType === 'topTouchEnd' || topLevelType === 'topTouchCancel';
}

function isMoveish(topLevelType) {
  return topLevelType === 'topMouseMove' || topLevelType === 'topTouchMove';
}
function isStartish(topLevelType) {
  return topLevelType === 'topMouseDown' || topLevelType === 'topTouchStart';
}

/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */
function executeDispatch(event, simulated, listener, inst) {
  var type = event.type || 'unknown-event';
  event.currentTarget = EventPluginUtils.getNodeFromInstance(inst);
  if (simulated) {
    ReactErrorUtils_1.invokeGuardedCallbackWithCatch(type, listener, event);
  } else {
    ReactErrorUtils_1.invokeGuardedCallback(type, listener, event);
  }
  event.currentTarget = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, simulated) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
    }
  } else if (dispatchListeners) {
    executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
  }
  event._dispatchListeners = null;
  event._dispatchInstances = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return {?string} id of the first dispatch execution who's listener returns
 * true, or null if no listener returned true.
 */
function executeDispatchesInOrderStopAtTrueImpl(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      if (dispatchListeners[i](event, dispatchInstances[i])) {
        return dispatchInstances[i];
      }
    }
  } else if (dispatchListeners) {
    if (dispatchListeners(event, dispatchInstances)) {
      return dispatchInstances;
    }
  }
  return null;
}

/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */
function executeDispatchesInOrderStopAtTrue(event) {
  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
  event._dispatchInstances = null;
  event._dispatchListeners = null;
  return ret;
}

/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 */
function executeDirectDispatch(event) {
  var dispatchListener = event._dispatchListeners;
  var dispatchInstance = event._dispatchInstances;
  !!Array.isArray(dispatchListener) ? reactProdInvariant_1$2('103') : void 0;
  event.currentTarget = dispatchListener ? EventPluginUtils.getNodeFromInstance(dispatchInstance) : null;
  var res = dispatchListener ? dispatchListener(event) : null;
  event.currentTarget = null;
  event._dispatchListeners = null;
  event._dispatchInstances = null;
  return res;
}

/**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 */
function hasDispatches(event) {
  return !!event._dispatchListeners;
}

/**
 * General utilities that are useful in creating custom Event Plugins.
 */
var EventPluginUtils = {
  isEndish: isEndish,
  isMoveish: isMoveish,
  isStartish: isStartish,

  executeDirectDispatch: executeDirectDispatch,
  executeDispatchesInOrder: executeDispatchesInOrder,
  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
  hasDispatches: hasDispatches,

  getInstanceFromNode: function (node) {
    return ComponentTree.getInstanceFromNode(node);
  },
  getNodeFromInstance: function (node) {
    return ComponentTree.getNodeFromInstance(node);
  },
  isAncestor: function (a, b) {
    return TreeTraversal.isAncestor(a, b);
  },
  getLowestCommonAncestor: function (a, b) {
    return TreeTraversal.getLowestCommonAncestor(a, b);
  },
  getParentInstance: function (inst) {
    return TreeTraversal.getParentInstance(inst);
  },
  traverseTwoPhase: function (target, fn, arg) {
    return TreeTraversal.traverseTwoPhase(target, fn, arg);
  },
  traverseEnterLeave: function (from, to, fn, argFrom, argTo) {
    return TreeTraversal.traverseEnterLeave(from, to, fn, argFrom, argTo);
  },

  injection: injection
};

var EventPluginUtils_1 = EventPluginUtils;

/**
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */

function accumulateInto(current, next) {
  !(next != null) ? reactProdInvariant_1$2('30') : void 0;

  if (current == null) {
    return next;
  }

  // Both are not empty. Warning: Never call x.concat(y) when you are not
  // certain that x is an Array (x could be a string with concat method).
  if (Array.isArray(current)) {
    if (Array.isArray(next)) {
      current.push.apply(current, next);
      return current;
    }
    current.push(next);
    return current;
  }

  if (Array.isArray(next)) {
    // A bit too dangerous to mutate `next`.
    return [current].concat(next);
  }

  return [current, next];
}

var accumulateInto_1 = accumulateInto;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * @param {array} arr an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 */

function forEachAccumulated(arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
}

var forEachAccumulated_1 = forEachAccumulated;

/**
 * Internal store for event listeners
 */
var listenerBank = {};

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */
var executeDispatchesAndRelease = function (event, simulated) {
  if (event) {
    EventPluginUtils_1.executeDispatchesInOrder(event, simulated);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
var executeDispatchesAndReleaseSimulated = function (e) {
  return executeDispatchesAndRelease(e, true);
};
var executeDispatchesAndReleaseTopLevel = function (e) {
  return executeDispatchesAndRelease(e, false);
};

var getDictionaryKey = function (inst) {
  // Prevents V8 performance issue:
  // https://github.com/facebook/react/pull/7232
  return '.' + inst._rootNodeID;
};

function isInteractive(tag) {
  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
}

function shouldPreventMouseEvent(name, type, props) {
  switch (name) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
      return !!(props.disabled && isInteractive(type));
    default:
      return false;
  }
}

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */
var EventPluginHub = {
  /**
   * Methods for injecting dependencies.
   */
  injection: {
    /**
     * @param {array} InjectedEventPluginOrder
     * @public
     */
    injectEventPluginOrder: EventPluginRegistry_1.injectEventPluginOrder,

    /**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */
    injectEventPluginsByName: EventPluginRegistry_1.injectEventPluginsByName
  },

  /**
   * Stores `listener` at `listenerBank[registrationName][key]`. Is idempotent.
   *
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {function} listener The callback to store.
   */
  putListener: function (inst, registrationName, listener) {
    !(typeof listener === 'function') ? reactProdInvariant_1$2('94', registrationName, typeof listener) : void 0;

    var key = getDictionaryKey(inst);
    var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
    bankForRegistrationName[key] = listener;

    var PluginModule = EventPluginRegistry_1.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.didPutListener) {
      PluginModule.didPutListener(inst, registrationName, listener);
    }
  },

  /**
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */
  getListener: function (inst, registrationName) {
    // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
    // live here; needs to be moved to a better place soon
    var bankForRegistrationName = listenerBank[registrationName];
    if (shouldPreventMouseEvent(registrationName, inst._currentElement.type, inst._currentElement.props)) {
      return null;
    }
    var key = getDictionaryKey(inst);
    return bankForRegistrationName && bankForRegistrationName[key];
  },

  /**
   * Deletes a listener from the registration bank.
   *
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   */
  deleteListener: function (inst, registrationName) {
    var PluginModule = EventPluginRegistry_1.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.willDeleteListener) {
      PluginModule.willDeleteListener(inst, registrationName);
    }

    var bankForRegistrationName = listenerBank[registrationName];
    // TODO: This should never be null -- when is it?
    if (bankForRegistrationName) {
      var key = getDictionaryKey(inst);
      delete bankForRegistrationName[key];
    }
  },

  /**
   * Deletes all listeners for the DOM element with the supplied ID.
   *
   * @param {object} inst The instance, which is the source of events.
   */
  deleteAllListeners: function (inst) {
    var key = getDictionaryKey(inst);
    for (var registrationName in listenerBank) {
      if (!listenerBank.hasOwnProperty(registrationName)) {
        continue;
      }

      if (!listenerBank[registrationName][key]) {
        continue;
      }

      var PluginModule = EventPluginRegistry_1.registrationNameModules[registrationName];
      if (PluginModule && PluginModule.willDeleteListener) {
        PluginModule.willDeleteListener(inst, registrationName);
      }

      delete listenerBank[registrationName][key];
    }
  },

  /**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @return {*} An accumulation of synthetic events.
   * @internal
   */
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var events;
    var plugins = EventPluginRegistry_1.plugins;
    for (var i = 0; i < plugins.length; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
        if (extractedEvents) {
          events = accumulateInto_1(events, extractedEvents);
        }
      }
    }
    return events;
  },

  /**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */
  enqueueEvents: function (events) {
    if (events) {
      eventQueue = accumulateInto_1(eventQueue, events);
    }
  },

  /**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */
  processEventQueue: function (simulated) {
    // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.
    var processingEventQueue = eventQueue;
    eventQueue = null;
    if (simulated) {
      forEachAccumulated_1(processingEventQueue, executeDispatchesAndReleaseSimulated);
    } else {
      forEachAccumulated_1(processingEventQueue, executeDispatchesAndReleaseTopLevel);
    }
    !!eventQueue ? reactProdInvariant_1$2('95') : void 0;
    // This would be a good time to rethrow if any of the event handlers threw.
    ReactErrorUtils_1.rethrowCaughtError();
  },

  /**
   * These are needed for tests only. Do not use!
   */
  __purge: function () {
    listenerBank = {};
  },

  __getListenerBank: function () {
    return listenerBank;
  }
};

var EventPluginHub_1 = EventPluginHub;

var getListener = EventPluginHub_1.getListener;

/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */
function listenerAtPhase(inst, event, propagationPhase) {
  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(inst, registrationName);
}

/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */
function accumulateDirectionalDispatches(inst, phase, event) {
  var listener = listenerAtPhase(inst, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto_1(event._dispatchListeners, listener);
    event._dispatchInstances = accumulateInto_1(event._dispatchInstances, inst);
  }
}

/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We cannot perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginUtils_1.traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
 */
function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    var targetInst = event._targetInst;
    var parentInst = targetInst ? EventPluginUtils_1.getParentInstance(targetInst) : null;
    EventPluginUtils_1.traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */
function accumulateDispatches(inst, ignoredDirection, event) {
  if (event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(inst, registrationName);
    if (listener) {
      event._dispatchListeners = accumulateInto_1(event._dispatchListeners, listener);
      event._dispatchInstances = accumulateInto_1(event._dispatchInstances, inst);
    }
  }
}

/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) {
    accumulateDispatches(event._targetInst, null, event);
  }
}

function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated_1(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateTwoPhaseDispatchesSkipTarget(events) {
  forEachAccumulated_1(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
}

function accumulateEnterLeaveDispatches(leave, enter, from, to) {
  EventPluginUtils_1.traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
}

function accumulateDirectDispatches(events) {
  forEachAccumulated_1(events, accumulateDirectDispatchesSingle);
}

/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing event a
 * single one.
 *
 * @constructor EventPropagators
 */
var EventPropagators = {
  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
  accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
  accumulateDirectDispatches: accumulateDirectDispatches,
  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
};

var EventPropagators_1 = EventPropagators;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment$1 = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

var ExecutionEnvironment_1 = ExecutionEnvironment$1;

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler$1 = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler$2 = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler$1 = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler$2 = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser$1 = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? reactProdInvariant_1$2('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE$1 = 10;
var DEFAULT_POOLER$1 = oneArgumentPooler$1;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo$1 = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER$1;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE$1;
  }
  NewKlass.release = standardReleaser$1;
  return NewKlass;
};

var PooledClass$2 = {
  addPoolingTo: addPoolingTo$1,
  oneArgumentPooler: oneArgumentPooler$1,
  twoArgumentPooler: twoArgumentPooler$2,
  threeArgumentPooler: threeArgumentPooler$1,
  fourArgumentPooler: fourArgumentPooler$2
};

var PooledClass_1$2 = PooledClass$2;

var contentKey = null;

/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */
function getTextContentAccessor() {
  if (!contentKey && ExecutionEnvironment_1.canUseDOM) {
    // Prefer textContent to innerText because many browsers support both but
    // SVG <text> elements don't support innerText even when <div> does.
    contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
  }
  return contentKey;
}

var getTextContentAccessor_1 = getTextContentAccessor;

/**
 * This helper class stores information about text content of a target node,
 * allowing comparison of content before and after a given event.
 *
 * Identify the node where selection currently begins, then observe
 * both its text content and its current position in the DOM. Since the
 * browser may natively replace the target node during composition, we can
 * use its position to find its replacement.
 *
 * @param {DOMEventTarget} root
 */
function FallbackCompositionState(root) {
  this._root = root;
  this._startText = this.getText();
  this._fallbackText = null;
}

index(FallbackCompositionState.prototype, {
  destructor: function () {
    this._root = null;
    this._startText = null;
    this._fallbackText = null;
  },

  /**
   * Get current text of input.
   *
   * @return {string}
   */
  getText: function () {
    if ('value' in this._root) {
      return this._root.value;
    }
    return this._root[getTextContentAccessor_1()];
  },

  /**
   * Determine the differing substring between the initially stored
   * text content and the current content.
   *
   * @return {string}
   */
  getData: function () {
    if (this._fallbackText) {
      return this._fallbackText;
    }

    var start;
    var startValue = this._startText;
    var startLength = startValue.length;
    var end;
    var endValue = this.getText();
    var endLength = endValue.length;

    for (start = 0; start < startLength; start++) {
      if (startValue[start] !== endValue[start]) {
        break;
      }
    }

    var minEnd = startLength - start;
    for (end = 1; end <= minEnd; end++) {
      if (startValue[startLength - end] !== endValue[endLength - end]) {
        break;
      }
    }

    var sliceTail = end > 1 ? 1 - end : undefined;
    this._fallbackText = endValue.slice(start, sliceTail);
    return this._fallbackText;
  }
});

PooledClass_1$2.addPoolingTo(FallbackCompositionState);

var FallbackCompositionState_1 = FallbackCompositionState;

var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: null,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: emptyFunction_1.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function (event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */
function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      if (propName === 'target') {
        this.target = nativeEventTarget;
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction_1.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction_1.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction_1.thatReturnsFalse;
  return this;
}

index(SyntheticEvent.prototype, {
  preventDefault: function () {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
      // eslint-disable-next-line valid-typeof
    } else if (typeof event.returnValue !== 'unknown') {
      event.returnValue = false;
    }
    this.isDefaultPrevented = emptyFunction_1.thatReturnsTrue;
  },

  stopPropagation: function () {
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
      // eslint-disable-next-line valid-typeof
    } else if (typeof event.cancelBubble !== 'unknown') {
      // The ChangeEventPlugin registers a "propertychange" event for
      // IE. This event does not support bubbling or cancelling, and
      // any references to cancelBubble throw "Member not found".  A
      // typeof check of "unknown" circumvents this issue (and is also
      // IE specific).
      event.cancelBubble = true;
    }

    this.isPropagationStopped = emptyFunction_1.thatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function () {
    this.isPersistent = emptyFunction_1.thatReturnsTrue;
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: emptyFunction_1.thatReturnsFalse,

  /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */
  destructor: function () {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      {
        this[propName] = null;
      }
    }
    for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
      this[shouldBeReleasedProperties[i]] = null;
    }
    
  }
});

SyntheticEvent.Interface = EventInterface;

/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */
SyntheticEvent.augmentClass = function (Class, Interface) {
  var Super = this;

  var E = function () {};
  E.prototype = Super.prototype;
  var prototype = new E();

  index(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = index({}, Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;

  PooledClass_1$2.addPoolingTo(Class, PooledClass_1$2.fourArgumentPooler);
};

PooledClass_1$2.addPoolingTo(SyntheticEvent, PooledClass_1$2.fourArgumentPooler);

var SyntheticEvent_1 = SyntheticEvent;

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */
var CompositionEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent_1.augmentClass(SyntheticCompositionEvent, CompositionEventInterface);

var SyntheticCompositionEvent_1 = SyntheticCompositionEvent;

/**
 * @interface Event
 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
 *      /#events-inputevents
 */
var InputEventInterface = {
  data: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent_1.augmentClass(SyntheticInputEvent, InputEventInterface);

var SyntheticInputEvent_1 = SyntheticInputEvent;

var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
var START_KEYCODE = 229;

var canUseCompositionEvent = ExecutionEnvironment_1.canUseDOM && 'CompositionEvent' in window;

var documentMode = null;
if (ExecutionEnvironment_1.canUseDOM && 'documentMode' in document) {
  documentMode = document.documentMode;
}

// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent = ExecutionEnvironment_1.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto();

// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData = ExecutionEnvironment_1.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);

/**
 * Opera <= 12 includes TextEvent in window, but does not fire
 * text input events. Rely on keypress instead.
 */
function isPresto() {
  var opera = window.opera;
  return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
}

var SPACEBAR_CODE = 32;
var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

// Events and their corresponding property names.
var eventTypes = {
  beforeInput: {
    phasedRegistrationNames: {
      bubbled: 'onBeforeInput',
      captured: 'onBeforeInputCapture'
    },
    dependencies: ['topCompositionEnd', 'topKeyPress', 'topTextInput', 'topPaste']
  },
  compositionEnd: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionEnd',
      captured: 'onCompositionEndCapture'
    },
    dependencies: ['topBlur', 'topCompositionEnd', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  },
  compositionStart: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionStart',
      captured: 'onCompositionStartCapture'
    },
    dependencies: ['topBlur', 'topCompositionStart', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  },
  compositionUpdate: {
    phasedRegistrationNames: {
      bubbled: 'onCompositionUpdate',
      captured: 'onCompositionUpdateCapture'
    },
    dependencies: ['topBlur', 'topCompositionUpdate', 'topKeyDown', 'topKeyPress', 'topKeyUp', 'topMouseDown']
  }
};

// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress = false;

/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */
function isKeypressCommand(nativeEvent) {
  return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
  // ctrlKey && altKey is equivalent to AltGr, and is not a command.
  !(nativeEvent.ctrlKey && nativeEvent.altKey);
}

/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */
function getCompositionEventType(topLevelType) {
  switch (topLevelType) {
    case 'topCompositionStart':
      return eventTypes.compositionStart;
    case 'topCompositionEnd':
      return eventTypes.compositionEnd;
    case 'topCompositionUpdate':
      return eventTypes.compositionUpdate;
  }
}

/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionStart(topLevelType, nativeEvent) {
  return topLevelType === 'topKeyDown' && nativeEvent.keyCode === START_KEYCODE;
}

/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case 'topKeyUp':
      // Command keys insert or clear IME input.
      return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
    case 'topKeyDown':
      // Expect IME keyCode on each keydown. If we get any other
      // code we must have exited earlier.
      return nativeEvent.keyCode !== START_KEYCODE;
    case 'topKeyPress':
    case 'topMouseDown':
    case 'topBlur':
      // Events are not possible without cancelling IME.
      return true;
    default:
      return false;
  }
}

/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */
function getDataFromCustomEvent(nativeEvent) {
  var detail = nativeEvent.detail;
  if (typeof detail === 'object' && 'data' in detail) {
    return detail.data;
  }
  return null;
}

// Track the current IME composition fallback object, if any.
var currentComposition = null;

/**
 * @return {?object} A SyntheticCompositionEvent.
 */
function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var eventType;
  var fallbackData;

  if (canUseCompositionEvent) {
    eventType = getCompositionEventType(topLevelType);
  } else if (!currentComposition) {
    if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionStart;
    }
  } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
    eventType = eventTypes.compositionEnd;
  }

  if (!eventType) {
    return null;
  }

  if (useFallbackCompositionData) {
    // The current composition is stored statically and must not be
    // overwritten while composition continues.
    if (!currentComposition && eventType === eventTypes.compositionStart) {
      currentComposition = FallbackCompositionState_1.getPooled(nativeEventTarget);
    } else if (eventType === eventTypes.compositionEnd) {
      if (currentComposition) {
        fallbackData = currentComposition.getData();
      }
    }
  }

  var event = SyntheticCompositionEvent_1.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);

  if (fallbackData) {
    // Inject data generated from fallback path into the synthetic event.
    // This matches the property of native CompositionEventInterface.
    event.data = fallbackData;
  } else {
    var customData = getDataFromCustomEvent(nativeEvent);
    if (customData !== null) {
      event.data = customData;
    }
  }

  EventPropagators_1.accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The string corresponding to this `beforeInput` event.
 */
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case 'topCompositionEnd':
      return getDataFromCustomEvent(nativeEvent);
    case 'topKeyPress':
      /**
       * If native `textInput` events are available, our goal is to make
       * use of them. However, there is a special case: the spacebar key.
       * In Webkit, preventing default on a spacebar `textInput` event
       * cancels character insertion, but it *also* causes the browser
       * to fall back to its default spacebar behavior of scrolling the
       * page.
       *
       * Tracking at:
       * https://code.google.com/p/chromium/issues/detail?id=355103
       *
       * To avoid this issue, use the keypress event as if no `textInput`
       * event is available.
       */
      var which = nativeEvent.which;
      if (which !== SPACEBAR_CODE) {
        return null;
      }

      hasSpaceKeypress = true;
      return SPACEBAR_CHAR;

    case 'topTextInput':
      // Record the characters to be added to the DOM.
      var chars = nativeEvent.data;

      // If it's a spacebar character, assume that we have already handled
      // it at the keypress level and bail immediately. Android Chrome
      // doesn't give us keycodes, so we need to blacklist it.
      if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
        return null;
      }

      return chars;

    default:
      // For other native event types, do nothing.
      return null;
  }
}

/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The fallback string for this `beforeInput` event.
 */
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  // If we are currently composing (IME) and using a fallback to do so,
  // try to extract the composed characters from the fallback object.
  // If composition event is available, we extract a string only at
  // compositionevent, otherwise extract it at fallback events.
  if (currentComposition) {
    if (topLevelType === 'topCompositionEnd' || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent)) {
      var chars = currentComposition.getData();
      FallbackCompositionState_1.release(currentComposition);
      currentComposition = null;
      return chars;
    }
    return null;
  }

  switch (topLevelType) {
    case 'topPaste':
      // If a paste event occurs after a keypress, throw out the input
      // chars. Paste events should not lead to BeforeInput events.
      return null;
    case 'topKeyPress':
      /**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */
      if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
        return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case 'topCompositionEnd':
      return useFallbackCompositionData ? null : nativeEvent.data;
    default:
      return null;
  }
}

/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */
function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
  var chars;

  if (canUseTextInputEvent) {
    chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
  } else {
    chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
  }

  // If no characters are being inserted, no BeforeInput event should
  // be fired.
  if (!chars) {
    return null;
  }

  var event = SyntheticInputEvent_1.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);

  event.data = chars;
  EventPropagators_1.accumulateTwoPhaseDispatches(event);
  return event;
}

/**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 *
 * This plugin is also responsible for emitting `composition` events, thus
 * allowing us to share composition fallback code for both `beforeInput` and
 * `composition` event types.
 */
var BeforeInputEventPlugin = {
  eventTypes: eventTypes,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    return [extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget), extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget)];
  }
};

var BeforeInputEventPlugin_1 = BeforeInputEventPlugin;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





/**
 * A specialized pseudo-event module to help keep track of components waiting to
 * be notified when their DOM representations are available for use.
 *
 * This implements `PooledClass`, so you should never need to instantiate this.
 * Instead, use `CallbackQueue.getPooled()`.
 *
 * @class ReactMountReady
 * @implements PooledClass
 * @internal
 */

var CallbackQueue = function () {
  function CallbackQueue(arg) {
    _classCallCheck(this, CallbackQueue);

    this._callbacks = null;
    this._contexts = null;
    this._arg = arg;
  }

  /**
   * Enqueues a callback to be invoked when `notifyAll` is invoked.
   *
   * @param {function} callback Invoked when `notifyAll` is invoked.
   * @param {?object} context Context to call `callback` with.
   * @internal
   */


  CallbackQueue.prototype.enqueue = function enqueue(callback, context) {
    this._callbacks = this._callbacks || [];
    this._callbacks.push(callback);
    this._contexts = this._contexts || [];
    this._contexts.push(context);
  };

  /**
   * Invokes all enqueued callbacks and clears the queue. This is invoked after
   * the DOM representation of a component has been created or updated.
   *
   * @internal
   */


  CallbackQueue.prototype.notifyAll = function notifyAll() {
    var callbacks = this._callbacks;
    var contexts = this._contexts;
    var arg = this._arg;
    if (callbacks && contexts) {
      !(callbacks.length === contexts.length) ? reactProdInvariant_1$2('24') : void 0;
      this._callbacks = null;
      this._contexts = null;
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i].call(contexts[i], arg);
      }
      callbacks.length = 0;
      contexts.length = 0;
    }
  };

  CallbackQueue.prototype.checkpoint = function checkpoint() {
    return this._callbacks ? this._callbacks.length : 0;
  };

  CallbackQueue.prototype.rollback = function rollback(len) {
    if (this._callbacks && this._contexts) {
      this._callbacks.length = len;
      this._contexts.length = len;
    }
  };

  /**
   * Resets the internal queue.
   *
   * @internal
   */


  CallbackQueue.prototype.reset = function reset() {
    this._callbacks = null;
    this._contexts = null;
  };

  /**
   * `PooledClass` looks for this.
   */


  CallbackQueue.prototype.destructor = function destructor() {
    this.reset();
  };

  return CallbackQueue;
}();

var CallbackQueue_1 = PooledClass_1$2.addPoolingTo(CallbackQueue);

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

var ReactFeatureFlags = {
  // When true, call console.time() before and .timeEnd() after each top-level
  // render (both initial renders and updates). Useful when looking at prod-mode
  // timeline profiles in Chrome, for example.
  logTopLevelRenders: false
};

var ReactFeatureFlags_1 = ReactFeatureFlags;

/**
 * @param {?object} object
 * @return {boolean} True if `object` is a valid owner.
 * @final
 */
function isValidOwner(object) {
  return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
}

/**
 * ReactOwners are capable of storing references to owned components.
 *
 * All components are capable of //being// referenced by owner components, but
 * only ReactOwner components are capable of //referencing// owned components.
 * The named reference is known as a "ref".
 *
 * Refs are available when mounted and updated during reconciliation.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return (
 *         <div onClick={this.handleClick}>
 *           <CustomComponent ref="custom" />
 *         </div>
 *       );
 *     },
 *     handleClick: function() {
 *       this.refs.custom.handleClick();
 *     },
 *     componentDidMount: function() {
 *       this.refs.custom.initialize();
 *     }
 *   });
 *
 * Refs should rarely be used. When refs are used, they should only be done to
 * control data that is not handled by React's data flow.
 *
 * @class ReactOwner
 */
var ReactOwner = {
  /**
   * Adds a component by ref to an owner component.
   *
   * @param {ReactComponent} component Component to reference.
   * @param {string} ref Name by which to refer to the component.
   * @param {ReactOwner} owner Component on which to record the ref.
   * @final
   * @internal
   */
  addComponentAsRefTo: function (component, ref, owner) {
    !isValidOwner(owner) ? reactProdInvariant_1$2('119') : void 0;
    owner.attachRef(ref, component);
  },

  /**
   * Removes a component by ref from an owner component.
   *
   * @param {ReactComponent} component Component to dereference.
   * @param {string} ref Name of the ref to remove.
   * @param {ReactOwner} owner Component on which the ref is recorded.
   * @final
   * @internal
   */
  removeComponentAsRefFrom: function (component, ref, owner) {
    !isValidOwner(owner) ? reactProdInvariant_1$2('120') : void 0;
    var ownerPublicInstance = owner.getPublicInstance();
    // Check that `component`'s owner is still alive and that `component` is still the current ref
    // because we do not want to detach the ref if another component stole it.
    if (ownerPublicInstance && ownerPublicInstance.refs[ref] === component.getPublicInstance()) {
      owner.detachRef(ref);
    }
  }
};

var ReactOwner_1 = ReactOwner;

var ReactRef = {};

function attachRef(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(component.getPublicInstance());
  } else {
    // Legacy ref
    ReactOwner_1.addComponentAsRefTo(component, ref, owner);
  }
}

function detachRef(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(null);
  } else {
    // Legacy ref
    ReactOwner_1.removeComponentAsRefFrom(component, ref, owner);
  }
}

ReactRef.attachRefs = function (instance, element) {
  if (element === null || typeof element !== 'object') {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    attachRef(ref, instance, element._owner);
  }
};

ReactRef.shouldUpdateRefs = function (prevElement, nextElement) {
  // If either the owner or a `ref` has changed, make sure the newest owner
  // has stored a reference to `this`, and the previous owner (if different)
  // has forgotten the reference to `this`. We use the element instead
  // of the public this.props because the post processing cannot determine
  // a ref. The ref conceptually lives on the element.

  // TODO: Should this even be possible? The owner cannot change because
  // it's forbidden by shouldUpdateReactComponent. The ref can change
  // if you swap the keys of but not the refs. Reconsider where this check
  // is made. It probably belongs where the key checking and
  // instantiateReactComponent is done.

  var prevRef = null;
  var prevOwner = null;
  if (prevElement !== null && typeof prevElement === 'object') {
    prevRef = prevElement.ref;
    prevOwner = prevElement._owner;
  }

  var nextRef = null;
  var nextOwner = null;
  if (nextElement !== null && typeof nextElement === 'object') {
    nextRef = nextElement.ref;
    nextOwner = nextElement._owner;
  }

  return prevRef !== nextRef ||
  // If owner changes but we have an unchanged function ref, don't update refs
  typeof nextRef === 'string' && nextOwner !== prevOwner;
};

ReactRef.detachRefs = function (instance, element) {
  if (element === null || typeof element !== 'object') {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    detachRef(ref, instance, element._owner);
  }
};

var ReactRef_1 = ReactRef;

var ReactInvalidSetStateWarningHook = {
  onBeginProcessingChildContext: function () {
    processingChildContext = true;
  },
  onEndProcessingChildContext: function () {
    processingChildContext = false;
  },
  onSetState: function () {
    warnInvalidSetState();
  }
};

var ReactInvalidSetStateWarningHook_1 = ReactInvalidSetStateWarningHook;

/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

var history$1 = [];

var ReactHostOperationHistoryHook = {
  onHostOperation: function (operation) {
    history$1.push(operation);
  },
  clearHistory: function () {
    if (ReactHostOperationHistoryHook._preventClearing) {
      // Should only be used for tests.
      return;
    }

    history$1 = [];
  },
  getHistory: function () {
    return history$1;
  }
};

var ReactHostOperationHistoryHook_1 = ReactHostOperationHistoryHook;

var performance$1;

if (ExecutionEnvironment_1.canUseDOM) {
  performance$1 = window.performance || window.msPerformance || window.webkitPerformance;
}

var performance_1 = performance$1 || {};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */



var performanceNow;

/**
 * Detect if we can use `window.performance.now()` and gracefully fallback to
 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
 * because of Facebook's testing infrastructure.
 */
if (performance_1.now) {
  performanceNow = function performanceNow() {
    return performance_1.now();
  };
} else {
  performanceNow = function performanceNow() {
    return Date.now();
  };
}

var performanceNow_1 = performanceNow;

var hooks = [];
var didHookThrowForEvent = {};

function callHook(event, fn, context, arg1, arg2, arg3, arg4, arg5) {
  try {
    fn.call(context, arg1, arg2, arg3, arg4, arg5);
  } catch (e) {
    void 0;
    didHookThrowForEvent[event] = true;
  }
}

function emitEvent(event, arg1, arg2, arg3, arg4, arg5) {
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    var fn = hook[event];
    if (fn) {
      callHook(event, fn, hook, arg1, arg2, arg3, arg4, arg5);
    }
  }
}

var isProfiling = false;
var flushHistory = [];
var lifeCycleTimerStack = [];
var currentFlushNesting = 0;
var currentFlushMeasurements = [];
var currentFlushStartTime = 0;
var currentTimerDebugID = null;
var currentTimerStartTime = 0;
var currentTimerNestedFlushDuration = 0;
var currentTimerType = null;

var lifeCycleTimerHasWarned = false;

function clearHistory() {
  ReactComponentTreeHook_1.purgeUnmountedComponents();
  ReactHostOperationHistoryHook_1.clearHistory();
}

function getTreeSnapshot(registeredIDs) {
  return registeredIDs.reduce(function (tree, id) {
    var ownerID = ReactComponentTreeHook_1.getOwnerID(id);
    var parentID = ReactComponentTreeHook_1.getParentID(id);
    tree[id] = {
      displayName: ReactComponentTreeHook_1.getDisplayName(id),
      text: ReactComponentTreeHook_1.getText(id),
      updateCount: ReactComponentTreeHook_1.getUpdateCount(id),
      childIDs: ReactComponentTreeHook_1.getChildIDs(id),
      // Text nodes don't have owners but this is close enough.
      ownerID: ownerID || parentID && ReactComponentTreeHook_1.getOwnerID(parentID) || 0,
      parentID: parentID
    };
    return tree;
  }, {});
}

function resetMeasurements() {
  var previousStartTime = currentFlushStartTime;
  var previousMeasurements = currentFlushMeasurements;
  var previousOperations = ReactHostOperationHistoryHook_1.getHistory();

  if (currentFlushNesting === 0) {
    currentFlushStartTime = 0;
    currentFlushMeasurements = [];
    clearHistory();
    return;
  }

  if (previousMeasurements.length || previousOperations.length) {
    var registeredIDs = ReactComponentTreeHook_1.getRegisteredIDs();
    flushHistory.push({
      duration: performanceNow_1() - previousStartTime,
      measurements: previousMeasurements || [],
      operations: previousOperations || [],
      treeSnapshot: getTreeSnapshot(registeredIDs)
    });
  }

  clearHistory();
  currentFlushStartTime = performanceNow_1();
  currentFlushMeasurements = [];
}

function checkDebugID(debugID) {
  var allowRoot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (allowRoot && debugID === 0) {
    return;
  }
  if (!debugID) {
    void 0;
  }
}

function beginLifeCycleTimer(debugID, timerType) {
  if (currentFlushNesting === 0) {
    return;
  }
  if (currentTimerType && !lifeCycleTimerHasWarned) {
    void 0;
    lifeCycleTimerHasWarned = true;
  }
  currentTimerStartTime = performanceNow_1();
  currentTimerNestedFlushDuration = 0;
  currentTimerDebugID = debugID;
  currentTimerType = timerType;
}

function endLifeCycleTimer(debugID, timerType) {
  if (currentFlushNesting === 0) {
    return;
  }
  if (currentTimerType !== timerType && !lifeCycleTimerHasWarned) {
    void 0;
    lifeCycleTimerHasWarned = true;
  }
  if (isProfiling) {
    currentFlushMeasurements.push({
      timerType: timerType,
      instanceID: debugID,
      duration: performanceNow_1() - currentTimerStartTime - currentTimerNestedFlushDuration
    });
  }
  currentTimerStartTime = 0;
  currentTimerNestedFlushDuration = 0;
  currentTimerDebugID = null;
  currentTimerType = null;
}

function pauseCurrentLifeCycleTimer() {
  var currentTimer = {
    startTime: currentTimerStartTime,
    nestedFlushStartTime: performanceNow_1(),
    debugID: currentTimerDebugID,
    timerType: currentTimerType
  };
  lifeCycleTimerStack.push(currentTimer);
  currentTimerStartTime = 0;
  currentTimerNestedFlushDuration = 0;
  currentTimerDebugID = null;
  currentTimerType = null;
}

function resumeCurrentLifeCycleTimer() {
  var _lifeCycleTimerStack$ = lifeCycleTimerStack.pop(),
      startTime = _lifeCycleTimerStack$.startTime,
      nestedFlushStartTime = _lifeCycleTimerStack$.nestedFlushStartTime,
      debugID = _lifeCycleTimerStack$.debugID,
      timerType = _lifeCycleTimerStack$.timerType;

  var nestedFlushDuration = performanceNow_1() - nestedFlushStartTime;
  currentTimerStartTime = startTime;
  currentTimerNestedFlushDuration += nestedFlushDuration;
  currentTimerDebugID = debugID;
  currentTimerType = timerType;
}

var lastMarkTimeStamp = 0;
var canUsePerformanceMeasure = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

function shouldMark(debugID) {
  if (!isProfiling || !canUsePerformanceMeasure) {
    return false;
  }
  var element = ReactComponentTreeHook_1.getElement(debugID);
  if (element == null || typeof element !== 'object') {
    return false;
  }
  var isHostElement = typeof element.type === 'string';
  if (isHostElement) {
    return false;
  }
  return true;
}

function markBegin(debugID, markType) {
  if (!shouldMark(debugID)) {
    return;
  }

  var markName = debugID + '::' + markType;
  lastMarkTimeStamp = performanceNow_1();
  performance.mark(markName);
}

function markEnd(debugID, markType) {
  if (!shouldMark(debugID)) {
    return;
  }

  var markName = debugID + '::' + markType;
  var displayName = ReactComponentTreeHook_1.getDisplayName(debugID) || 'Unknown';

  // Chrome has an issue of dropping markers recorded too fast:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=640652
  // To work around this, we will not report very small measurements.
  // I determined the magic number by tweaking it back and forth.
  // 0.05ms was enough to prevent the issue, but I set it to 0.1ms to be safe.
  // When the bug is fixed, we can `measure()` unconditionally if we want to.
  var timeStamp = performanceNow_1();
  if (timeStamp - lastMarkTimeStamp > 0.1) {
    var measurementName = displayName + ' [' + markType + ']';
    performance.measure(measurementName, markName);
  }

  performance.clearMarks(markName);
  if (measurementName) {
    performance.clearMeasures(measurementName);
  }
}

var ReactDebugTool$1 = {
  addHook: function (hook) {
    hooks.push(hook);
  },
  removeHook: function (hook) {
    for (var i = 0; i < hooks.length; i++) {
      if (hooks[i] === hook) {
        hooks.splice(i, 1);
        i--;
      }
    }
  },
  isProfiling: function () {
    return isProfiling;
  },
  beginProfiling: function () {
    if (isProfiling) {
      return;
    }

    isProfiling = true;
    flushHistory.length = 0;
    resetMeasurements();
    ReactDebugTool$1.addHook(ReactHostOperationHistoryHook_1);
  },
  endProfiling: function () {
    if (!isProfiling) {
      return;
    }

    isProfiling = false;
    resetMeasurements();
    ReactDebugTool$1.removeHook(ReactHostOperationHistoryHook_1);
  },
  getFlushHistory: function () {
    return flushHistory;
  },
  onBeginFlush: function () {
    currentFlushNesting++;
    resetMeasurements();
    pauseCurrentLifeCycleTimer();
    emitEvent('onBeginFlush');
  },
  onEndFlush: function () {
    resetMeasurements();
    currentFlushNesting--;
    resumeCurrentLifeCycleTimer();
    emitEvent('onEndFlush');
  },
  onBeginLifeCycleTimer: function (debugID, timerType) {
    checkDebugID(debugID);
    emitEvent('onBeginLifeCycleTimer', debugID, timerType);
    markBegin(debugID, timerType);
    beginLifeCycleTimer(debugID, timerType);
  },
  onEndLifeCycleTimer: function (debugID, timerType) {
    checkDebugID(debugID);
    endLifeCycleTimer(debugID, timerType);
    markEnd(debugID, timerType);
    emitEvent('onEndLifeCycleTimer', debugID, timerType);
  },
  onBeginProcessingChildContext: function () {
    emitEvent('onBeginProcessingChildContext');
  },
  onEndProcessingChildContext: function () {
    emitEvent('onEndProcessingChildContext');
  },
  onHostOperation: function (operation) {
    checkDebugID(operation.instanceID);
    emitEvent('onHostOperation', operation);
  },
  onSetState: function () {
    emitEvent('onSetState');
  },
  onSetChildren: function (debugID, childDebugIDs) {
    checkDebugID(debugID);
    childDebugIDs.forEach(checkDebugID);
    emitEvent('onSetChildren', debugID, childDebugIDs);
  },
  onBeforeMountComponent: function (debugID, element, parentDebugID) {
    checkDebugID(debugID);
    checkDebugID(parentDebugID, true);
    emitEvent('onBeforeMountComponent', debugID, element, parentDebugID);
    markBegin(debugID, 'mount');
  },
  onMountComponent: function (debugID) {
    checkDebugID(debugID);
    markEnd(debugID, 'mount');
    emitEvent('onMountComponent', debugID);
  },
  onBeforeUpdateComponent: function (debugID, element) {
    checkDebugID(debugID);
    emitEvent('onBeforeUpdateComponent', debugID, element);
    markBegin(debugID, 'update');
  },
  onUpdateComponent: function (debugID) {
    checkDebugID(debugID);
    markEnd(debugID, 'update');
    emitEvent('onUpdateComponent', debugID);
  },
  onBeforeUnmountComponent: function (debugID) {
    checkDebugID(debugID);
    emitEvent('onBeforeUnmountComponent', debugID);
    markBegin(debugID, 'unmount');
  },
  onUnmountComponent: function (debugID) {
    checkDebugID(debugID);
    markEnd(debugID, 'unmount');
    emitEvent('onUnmountComponent', debugID);
  },
  onTestEvent: function () {
    emitEvent('onTestEvent');
  }
};

// TODO remove these when RN/www gets updated
ReactDebugTool$1.addDevtool = ReactDebugTool$1.addHook;
ReactDebugTool$1.removeDevtool = ReactDebugTool$1.removeHook;

ReactDebugTool$1.addHook(ReactInvalidSetStateWarningHook_1);
ReactDebugTool$1.addHook(ReactComponentTreeHook_1);
var url = ExecutionEnvironment_1.canUseDOM && window.location.href || '';
if (/[?&]react_perf\b/.test(url)) {
  ReactDebugTool$1.beginProfiling();
}

/**
 * Helper to call ReactRef.attachRefs with this composite component, split out
 * to avoid allocations in the transaction mount-ready queue.
 */
function attachRefs() {
  ReactRef_1.attachRefs(this, this._currentElement);
}

var ReactReconciler = {
  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {ReactComponent} internalInstance
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {?object} the containing host component instance
   * @param {?object} info about the host container
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent: function (internalInstance, transaction, hostParent, hostContainerInfo, context, parentDebugID) // 0 in production and for roots
  {
    var markup = internalInstance.mountComponent(transaction, hostParent, hostContainerInfo, context, parentDebugID);
    if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
    }
    return markup;
  },

  /**
   * Returns a value that can be passed to
   * ReactComponentEnvironment.replaceNodeWithMarkup.
   */
  getHostNode: function (internalInstance) {
    return internalInstance.getHostNode();
  },

  /**
   * Releases any resources allocated by `mountComponent`.
   *
   * @final
   * @internal
   */
  unmountComponent: function (internalInstance, safely) {
    ReactRef_1.detachRefs(internalInstance, internalInstance._currentElement);
    internalInstance.unmountComponent(safely);
    
  },

  /**
   * Update a component using a new element.
   *
   * @param {ReactComponent} internalInstance
   * @param {ReactElement} nextElement
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   * @internal
   */
  receiveComponent: function (internalInstance, nextElement, transaction, context) {
    var prevElement = internalInstance._currentElement;

    if (nextElement === prevElement && context === internalInstance._context) {
      // Since elements are immutable after the owner is rendered,
      // we can do a cheap identity compare here to determine if this is a
      // superfluous reconcile. It's possible for state to be mutable but such
      // change should trigger an update of the owner which would recreate
      // the element. We explicitly check for the existence of an owner since
      // it's possible for an element created outside a composite to be
      // deeply mutated and reused.

      // TODO: Bailing out early is just a perf optimization right?
      // TODO: Removing the return statement should affect correctness?
      return;
    }

    var refsChanged = ReactRef_1.shouldUpdateRefs(prevElement, nextElement);

    if (refsChanged) {
      ReactRef_1.detachRefs(internalInstance, prevElement);
    }

    internalInstance.receiveComponent(nextElement, transaction, context);

    if (refsChanged && internalInstance._currentElement && internalInstance._currentElement.ref != null) {
      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
    }

    
  },

  /**
   * Flush any dirty changes in a component.
   *
   * @param {ReactComponent} internalInstance
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  performUpdateIfNecessary: function (internalInstance, transaction, updateBatchNumber) {
    if (internalInstance._updateBatchNumber !== updateBatchNumber) {
      // The component's enqueued batch number should always be the current
      // batch or the following one.
      void 0;
      return;
    }
    internalInstance.performUpdateIfNecessary(transaction);
    
  }
};

var ReactReconciler_1 = ReactReconciler;

var OBSERVED_ERROR = {};

/**
 * `Transaction` creates a black box that is able to wrap any method such that
 * certain invariants are maintained before and after the method is invoked
 * (Even if an exception is thrown while invoking the wrapped method). Whoever
 * instantiates a transaction can provide enforcers of the invariants at
 * creation time. The `Transaction` class itself will supply one additional
 * automatic invariant for you - the invariant that any transaction instance
 * should not be run while it is already being run. You would typically create a
 * single instance of a `Transaction` for reuse multiple times, that potentially
 * is used to wrap several different methods. Wrappers are extremely simple -
 * they only require implementing two methods.
 *
 * <pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 *
 * Use cases:
 * - Preserving the input selection ranges before/after reconciliation.
 *   Restoring selection even in the event of an unexpected error.
 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
 *   while guaranteeing that afterwards, the event system is reactivated.
 * - Flushing a queue of collected DOM mutations to the main UI thread after a
 *   reconciliation takes place in a worker thread.
 * - Invoking any collected `componentDidUpdate` callbacks after rendering new
 *   content.
 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
 * - (Future use case): Layout calculations before and after DOM updates.
 *
 * Transactional plugin API:
 * - A module that has an `initialize` method that returns any precomputation.
 * - and a `close` method that accepts the precomputation. `close` is invoked
 *   when the wrapped process is completed, or has failed.
 *
 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
 * that implement `initialize` and `close`.
 * @return {Transaction} Single transaction for reuse in thread.
 *
 * @class Transaction
 */
var TransactionImpl = {
  /**
   * Sets up this instance so that it is prepared for collecting metrics. Does
   * so such that this setup method may be used on an instance that is already
   * initialized, in a way that does not consume additional memory upon reuse.
   * That can be useful if you decide to make your subclass of this mixin a
   * "PooledClass".
   */
  reinitializeTransaction: function () {
    this.transactionWrappers = this.getTransactionWrappers();
    if (this.wrapperInitData) {
      this.wrapperInitData.length = 0;
    } else {
      this.wrapperInitData = [];
    }
    this._isInTransaction = false;
  },

  _isInTransaction: false,

  /**
   * @abstract
   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
   */
  getTransactionWrappers: null,

  isInTransaction: function () {
    return !!this._isInTransaction;
  },

  /* eslint-disable space-before-function-paren */

  /**
   * Executes the function within a safety window. Use this for the top level
   * methods that result in large amounts of computation/mutations that would
   * need to be safety checked. The optional arguments helps prevent the need
   * to bind in many cases.
   *
   * @param {function} method Member of scope to call.
   * @param {Object} scope Scope to invoke from.
   * @param {Object?=} a Argument to pass to the method.
   * @param {Object?=} b Argument to pass to the method.
   * @param {Object?=} c Argument to pass to the method.
   * @param {Object?=} d Argument to pass to the method.
   * @param {Object?=} e Argument to pass to the method.
   * @param {Object?=} f Argument to pass to the method.
   *
   * @return {*} Return value from `method`.
   */
  perform: function (method, scope, a, b, c, d, e, f) {
    /* eslint-enable space-before-function-paren */
    !!this.isInTransaction() ? reactProdInvariant_1$2('27') : void 0;
    var errorThrown;
    var ret;
    try {
      this._isInTransaction = true;
      // Catching errors makes debugging more difficult, so we start with
      // errorThrown set to true before setting it to false after calling
      // close -- if it's still set to true in the finally block, it means
      // one of these calls threw.
      errorThrown = true;
      this.initializeAll(0);
      ret = method.call(scope, a, b, c, d, e, f);
      errorThrown = false;
    } finally {
      try {
        if (errorThrown) {
          // If `method` throws, prefer to show that stack trace over any thrown
          // by invoking `closeAll`.
          try {
            this.closeAll(0);
          } catch (err) {}
        } else {
          // Since `method` didn't throw, we don't want to silence the exception
          // here.
          this.closeAll(0);
        }
      } finally {
        this._isInTransaction = false;
      }
    }
    return ret;
  },

  initializeAll: function (startIndex) {
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      try {
        // Catching errors makes debugging more difficult, so we start with the
        // OBSERVED_ERROR state before overwriting it with the real return value
        // of initialize -- if it's still set to OBSERVED_ERROR in the finally
        // block, it means wrapper.initialize threw.
        this.wrapperInitData[i] = OBSERVED_ERROR;
        this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
      } finally {
        if (this.wrapperInitData[i] === OBSERVED_ERROR) {
          // The initializer for wrapper i threw an error; initialize the
          // remaining wrappers but silence any exceptions from them to ensure
          // that the first error is the one to bubble up.
          try {
            this.initializeAll(i + 1);
          } catch (err) {}
        }
      }
    }
  },

  /**
   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
   * them the respective return values of `this.transactionWrappers.init[i]`
   * (`close`rs that correspond to initializers that failed will not be
   * invoked).
   */
  closeAll: function (startIndex) {
    !this.isInTransaction() ? reactProdInvariant_1$2('28') : void 0;
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      var initData = this.wrapperInitData[i];
      var errorThrown;
      try {
        // Catching errors makes debugging more difficult, so we start with
        // errorThrown set to true before setting it to false after calling
        // close -- if it's still set to true in the finally block, it means
        // wrapper.close threw.
        errorThrown = true;
        if (initData !== OBSERVED_ERROR && wrapper.close) {
          wrapper.close.call(this, initData);
        }
        errorThrown = false;
      } finally {
        if (errorThrown) {
          // The closer for wrapper i threw an error; close the remaining
          // wrappers but silence any exceptions from them to ensure that the
          // first error is the one to bubble up.
          try {
            this.closeAll(i + 1);
          } catch (e) {}
        }
      }
    }
    this.wrapperInitData.length = 0;
  }
};

var Transaction = TransactionImpl;

var dirtyComponents = [];
var updateBatchNumber = 0;
var asapCallbackQueue = CallbackQueue_1.getPooled();
var asapEnqueued = false;

var batchingStrategy = null;

function ensureInjected() {
  !(ReactUpdates.ReactReconcileTransaction && batchingStrategy) ? reactProdInvariant_1$2('123') : void 0;
}

var NESTED_UPDATES = {
  initialize: function () {
    this.dirtyComponentsLength = dirtyComponents.length;
  },
  close: function () {
    if (this.dirtyComponentsLength !== dirtyComponents.length) {
      // Additional updates were enqueued by componentDidUpdate handlers or
      // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
      // these new updates so that if A's componentDidUpdate calls setState on
      // B, B will update before the callback A's updater provided when calling
      // setState.
      dirtyComponents.splice(0, this.dirtyComponentsLength);
      flushBatchedUpdates();
    } else {
      dirtyComponents.length = 0;
    }
  }
};

var UPDATE_QUEUEING = {
  initialize: function () {
    this.callbackQueue.reset();
  },
  close: function () {
    this.callbackQueue.notifyAll();
  }
};

var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];

function ReactUpdatesFlushTransaction() {
  this.reinitializeTransaction();
  this.dirtyComponentsLength = null;
  this.callbackQueue = CallbackQueue_1.getPooled();
  this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled(
  /* useCreateElement */true);
}

index(ReactUpdatesFlushTransaction.prototype, Transaction, {
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS;
  },

  destructor: function () {
    this.dirtyComponentsLength = null;
    CallbackQueue_1.release(this.callbackQueue);
    this.callbackQueue = null;
    ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
    this.reconcileTransaction = null;
  },

  perform: function (method, scope, a) {
    // Essentially calls `this.reconcileTransaction.perform(method, scope, a)`
    // with this transaction's wrappers around it.
    return Transaction.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
  }
});

PooledClass_1$2.addPoolingTo(ReactUpdatesFlushTransaction);

function batchedUpdates(callback, a, b, c, d, e) {
  ensureInjected();
  return batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
}

/**
 * Array comparator for ReactComponents by mount ordering.
 *
 * @param {ReactComponent} c1 first component you're comparing
 * @param {ReactComponent} c2 second component you're comparing
 * @return {number} Return value usable by Array.prototype.sort().
 */
function mountOrderComparator(c1, c2) {
  return c1._mountOrder - c2._mountOrder;
}

function runBatchedUpdates(transaction) {
  var len = transaction.dirtyComponentsLength;
  !(len === dirtyComponents.length) ? reactProdInvariant_1$2('124', len, dirtyComponents.length) : void 0;

  // Since reconciling a component higher in the owner hierarchy usually (not
  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
  // them before their children by sorting the array.
  dirtyComponents.sort(mountOrderComparator);

  // Any updates enqueued while reconciling must be performed after this entire
  // batch. Otherwise, if dirtyComponents is [A, B] where A has children B and
  // C, B could update twice in a single batch if C's render enqueues an update
  // to B (since B would have already updated, we should skip it, and the only
  // way we can know to do so is by checking the batch counter).
  updateBatchNumber++;

  for (var i = 0; i < len; i++) {
    // If a component is unmounted before pending changes apply, it will still
    // be here, but we assume that it has cleared its _pendingCallbacks and
    // that performUpdateIfNecessary is a noop.
    var component = dirtyComponents[i];

    // If performUpdateIfNecessary happens to enqueue any new updates, we
    // shouldn't execute the callbacks until the next render happens, so
    // stash the callbacks first
    var callbacks = component._pendingCallbacks;
    component._pendingCallbacks = null;

    var markerName;
    if (ReactFeatureFlags_1.logTopLevelRenders) {
      var namedComponent = component;
      // Duck type TopLevelWrapper. This is probably always true.
      if (component._currentElement.type.isReactTopLevelWrapper) {
        namedComponent = component._renderedComponent;
      }
      markerName = 'React update: ' + namedComponent.getName();
      console.time(markerName);
    }

    ReactReconciler_1.performUpdateIfNecessary(component, transaction.reconcileTransaction, updateBatchNumber);

    if (markerName) {
      console.timeEnd(markerName);
    }

    if (callbacks) {
      for (var j = 0; j < callbacks.length; j++) {
        transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
      }
    }
  }
}

var flushBatchedUpdates = function () {
  // ReactUpdatesFlushTransaction's wrappers will clear the dirtyComponents
  // array and perform any updates enqueued by mount-ready handlers (i.e.,
  // componentDidUpdate) but we need to check here too in order to catch
  // updates enqueued by setState callbacks and asap calls.
  while (dirtyComponents.length || asapEnqueued) {
    if (dirtyComponents.length) {
      var transaction = ReactUpdatesFlushTransaction.getPooled();
      transaction.perform(runBatchedUpdates, null, transaction);
      ReactUpdatesFlushTransaction.release(transaction);
    }

    if (asapEnqueued) {
      asapEnqueued = false;
      var queue = asapCallbackQueue;
      asapCallbackQueue = CallbackQueue_1.getPooled();
      queue.notifyAll();
      CallbackQueue_1.release(queue);
    }
  }
};

/**
 * Mark a component as needing a rerender, adding an optional callback to a
 * list of functions which will be executed once the rerender occurs.
 */
function enqueueUpdate(component) {
  ensureInjected();

  // Various parts of our code (such as ReactCompositeComponent's
  // _renderValidatedComponent) assume that calls to render aren't nested;
  // verify that that's the case. (This is called by each top-level update
  // function, like setState, forceUpdate, etc.; creation and
  // destruction of top-level components is guarded in ReactMount.)

  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }

  dirtyComponents.push(component);
  if (component._updateBatchNumber == null) {
    component._updateBatchNumber = updateBatchNumber + 1;
  }
}

/**
 * Enqueue a callback to be run at the end of the current batching cycle. Throws
 * if no updates are currently being performed.
 */
function asap(callback, context) {
  !batchingStrategy.isBatchingUpdates ? reactProdInvariant_1$2('125') : void 0;
  asapCallbackQueue.enqueue(callback, context);
  asapEnqueued = true;
}

var ReactUpdatesInjection = {
  injectReconcileTransaction: function (ReconcileTransaction) {
    !ReconcileTransaction ? reactProdInvariant_1$2('126') : void 0;
    ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
  },

  injectBatchingStrategy: function (_batchingStrategy) {
    !_batchingStrategy ? reactProdInvariant_1$2('127') : void 0;
    !(typeof _batchingStrategy.batchedUpdates === 'function') ? reactProdInvariant_1$2('128') : void 0;
    !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? reactProdInvariant_1$2('129') : void 0;
    batchingStrategy = _batchingStrategy;
  }
};

var ReactUpdates = {
  /**
   * React references `ReactReconcileTransaction` using this property in order
   * to allow dependency injection.
   *
   * @internal
   */
  ReactReconcileTransaction: null,

  batchedUpdates: batchedUpdates,
  enqueueUpdate: enqueueUpdate,
  flushBatchedUpdates: flushBatchedUpdates,
  injection: ReactUpdatesInjection,
  asap: asap
};

var ReactUpdates_1 = ReactUpdates;

function isCheckable(elem) {
  var type = elem.type;
  var nodeName = elem.nodeName;
  return nodeName && nodeName.toLowerCase() === 'input' && (type === 'checkbox' || type === 'radio');
}

function getTracker(inst) {
  return inst._wrapperState.valueTracker;
}

function attachTracker(inst, tracker) {
  inst._wrapperState.valueTracker = tracker;
}

function detachTracker(inst) {
  delete inst._wrapperState.valueTracker;
}

function getValueFromNode(node) {
  var value;
  if (node) {
    value = isCheckable(node) ? '' + node.checked : node.value;
  }
  return value;
}

var inputValueTracking = {
  // exposed for testing
  _getTrackerFromNode: function (node) {
    return getTracker(ReactDOMComponentTree_1.getInstanceFromNode(node));
  },


  track: function (inst) {
    if (getTracker(inst)) {
      return;
    }

    var node = ReactDOMComponentTree_1.getNodeFromInstance(inst);
    var valueField = isCheckable(node) ? 'checked' : 'value';
    var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);

    var currentValue = '' + node[valueField];

    // if someone has already defined a value or Safari, then bail
    // and don't track value will cause over reporting of changes,
    // but it's better then a hard failure
    // (needed for certain tests that spyOn input values and Safari)
    if (node.hasOwnProperty(valueField) || typeof descriptor.get !== 'function' || typeof descriptor.set !== 'function') {
      return;
    }

    Object.defineProperty(node, valueField, {
      enumerable: descriptor.enumerable,
      configurable: true,
      get: function () {
        return descriptor.get.call(this);
      },
      set: function (value) {
        currentValue = '' + value;
        descriptor.set.call(this, value);
      }
    });

    attachTracker(inst, {
      getValue: function () {
        return currentValue;
      },
      setValue: function (value) {
        currentValue = '' + value;
      },
      stopTracking: function () {
        detachTracker(inst);
        delete node[valueField];
      }
    });
  },

  updateValueIfChanged: function (inst) {
    if (!inst) {
      return false;
    }
    var tracker = getTracker(inst);

    if (!tracker) {
      inputValueTracking.track(inst);
      return true;
    }

    var lastValue = tracker.getValue();
    var nextValue = getValueFromNode(ReactDOMComponentTree_1.getNodeFromInstance(inst));

    if (nextValue !== lastValue) {
      tracker.setValue(nextValue);
      return true;
    }

    return false;
  },
  stopTracking: function (inst) {
    var tracker = getTracker(inst);
    if (tracker) {
      tracker.stopTracking();
    }
  }
};

var inputValueTracking_1 = inputValueTracking;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */

function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;

  // Normalize SVG <use> element events #4963
  if (target.correspondingUseElement) {
    target = target.correspondingUseElement;
  }

  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === 3 ? target.parentNode : target;
}

var getEventTarget_1 = getEventTarget;

var useHasFeature;
if (ExecutionEnvironment_1.canUseDOM) {
  useHasFeature = document.implementation && document.implementation.hasFeature &&
  // always returns true in newer browsers as per the standard.
  // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
  document.implementation.hasFeature('', '') !== true;
}

/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isEventSupported(eventNameSuffix, capture) {
  if (!ExecutionEnvironment_1.canUseDOM || capture && !('addEventListener' in document)) {
    return false;
  }

  var eventName = 'on' + eventNameSuffix;
  var isSupported = eventName in document;

  if (!isSupported) {
    var element = document.createElement('div');
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] === 'function';
  }

  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
    // This is the only way to test support for the `wheel` event in IE9+.
    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
  }

  return isSupported;
}

var isEventSupported_1 = isEventSupported;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
 */

var supportedInputTypes = {
  color: true,
  date: true,
  datetime: true,
  'datetime-local': true,
  email: true,
  month: true,
  number: true,
  password: true,
  range: true,
  search: true,
  tel: true,
  text: true,
  time: true,
  url: true,
  week: true
};

function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();

  if (nodeName === 'input') {
    return !!supportedInputTypes[elem.type];
  }

  if (nodeName === 'textarea') {
    return true;
  }

  return false;
}

var isTextInputElement_1 = isTextInputElement;

var eventTypes$1 = {
  change: {
    phasedRegistrationNames: {
      bubbled: 'onChange',
      captured: 'onChangeCapture'
    },
    dependencies: ['topBlur', 'topChange', 'topClick', 'topFocus', 'topInput', 'topKeyDown', 'topKeyUp', 'topSelectionChange']
  }
};

function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
  var event = SyntheticEvent_1.getPooled(eventTypes$1.change, inst, nativeEvent, target);
  event.type = 'change';
  EventPropagators_1.accumulateTwoPhaseDispatches(event);
  return event;
}
/**
 * For IE shims
 */
var activeElement = null;
var activeElementInst = null;

/**
 * SECTION: handle `change` event
 */
function shouldUseChangeEvent(elem) {
  var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
}

var doesChangeEventBubble = false;
if (ExecutionEnvironment_1.canUseDOM) {
  // See `handleChange` comment below
  doesChangeEventBubble = isEventSupported_1('change') && (!document.documentMode || document.documentMode > 8);
}

function manualDispatchChangeEvent(nativeEvent) {
  var event = createAndAccumulateChangeEvent(activeElementInst, nativeEvent, getEventTarget_1(nativeEvent));

  // If change and propertychange bubbled, we'd just bind to it like all the
  // other events and have it go through ReactBrowserEventEmitter. Since it
  // doesn't, we manually listen for the events and so we have to enqueue and
  // process the abstract event manually.
  //
  // Batching is necessary here in order to ensure that all event handlers run
  // before the next rerender (including event handlers attached to ancestor
  // elements instead of directly on the input). Without this, controlled
  // components don't work properly in conjunction with event bubbling because
  // the component is rerendered and the value reverted before all the event
  // handlers can run. See https://github.com/facebook/react/issues/708.
  ReactUpdates_1.batchedUpdates(runEventInBatch, event);
}

function runEventInBatch(event) {
  EventPluginHub_1.enqueueEvents(event);
  EventPluginHub_1.processEventQueue(false);
}

function startWatchingForChangeEventIE8(target, targetInst) {
  activeElement = target;
  activeElementInst = targetInst;
  activeElement.attachEvent('onchange', manualDispatchChangeEvent);
}

function stopWatchingForChangeEventIE8() {
  if (!activeElement) {
    return;
  }
  activeElement.detachEvent('onchange', manualDispatchChangeEvent);
  activeElement = null;
  activeElementInst = null;
}

function getInstIfValueChanged(targetInst, nativeEvent) {
  var updated = inputValueTracking_1.updateValueIfChanged(targetInst);
  var simulated = nativeEvent.simulated === true && ChangeEventPlugin._allowSimulatedPassThrough;

  if (updated || simulated) {
    return targetInst;
  }
}

function getTargetInstForChangeEvent(topLevelType, targetInst) {
  if (topLevelType === 'topChange') {
    return targetInst;
  }
}

function handleEventsForChangeEventIE8(topLevelType, target, targetInst) {
  if (topLevelType === 'topFocus') {
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForChangeEventIE8();
    startWatchingForChangeEventIE8(target, targetInst);
  } else if (topLevelType === 'topBlur') {
    stopWatchingForChangeEventIE8();
  }
}

/**
 * SECTION: handle `input` event
 */
var isInputEventSupported = false;
if (ExecutionEnvironment_1.canUseDOM) {
  // IE9 claims to support the input event but fails to trigger it when
  // deleting text, so we ignore its input events.

  isInputEventSupported = isEventSupported_1('input') && (!('documentMode' in document) || document.documentMode > 9);
}

/**
 * (For IE <=9) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */
function startWatchingForValueChange(target, targetInst) {
  activeElement = target;
  activeElementInst = targetInst;
  activeElement.attachEvent('onpropertychange', handlePropertyChange);
}

/**
 * (For IE <=9) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */
function stopWatchingForValueChange() {
  if (!activeElement) {
    return;
  }
  activeElement.detachEvent('onpropertychange', handlePropertyChange);

  activeElement = null;
  activeElementInst = null;
}

/**
 * (For IE <=9) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */
function handlePropertyChange(nativeEvent) {
  if (nativeEvent.propertyName !== 'value') {
    return;
  }
  if (getInstIfValueChanged(activeElementInst, nativeEvent)) {
    manualDispatchChangeEvent(nativeEvent);
  }
}

function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
  if (topLevelType === 'topFocus') {
    // In IE8, we can capture almost all .value changes by adding a
    // propertychange handler and looking for events with propertyName
    // equal to 'value'
    // In IE9, propertychange fires for most input events but is buggy and
    // doesn't fire when text is deleted, but conveniently, selectionchange
    // appears to fire in all of the remaining cases so we catch those and
    // forward the event if the value has changed
    // In either case, we don't want to call the event handler if the value
    // is changed from JS so we redefine a setter for `.value` that updates
    // our activeElementValue variable, allowing us to ignore those changes
    //
    // stopWatching() should be a noop here but we call it just in case we
    // missed a blur event somehow.
    stopWatchingForValueChange();
    startWatchingForValueChange(target, targetInst);
  } else if (topLevelType === 'topBlur') {
    stopWatchingForValueChange();
  }
}

// For IE8 and IE9.
function getTargetInstForInputEventPolyfill(topLevelType, targetInst, nativeEvent) {
  if (topLevelType === 'topSelectionChange' || topLevelType === 'topKeyUp' || topLevelType === 'topKeyDown') {
    // On the selectionchange event, the target is just document which isn't
    // helpful for us so just check activeElement instead.
    //
    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
    // propertychange on the first input event after setting `value` from a
    // script and fires only keydown, keypress, keyup. Catching keyup usually
    // gets it and catching keydown lets us fire an event for the first
    // keystroke if user does a key repeat (it'll be a little delayed: right
    // before the second keystroke). Other input methods (e.g., paste) seem to
    // fire selectionchange normally.
    return getInstIfValueChanged(activeElementInst, nativeEvent);
  }
}

/**
 * SECTION: handle `click` event
 */
function shouldUseClickEvent(elem) {
  // Use the `click` event to detect changes to checkbox and radio inputs.
  // This approach works across all browsers, whereas `change` does not fire
  // until `blur` in IE8.
  var nodeName = elem.nodeName;
  return nodeName && nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
}

function getTargetInstForClickEvent(topLevelType, targetInst, nativeEvent) {
  if (topLevelType === 'topClick') {
    return getInstIfValueChanged(targetInst, nativeEvent);
  }
}

function getTargetInstForInputOrChangeEvent(topLevelType, targetInst, nativeEvent) {
  if (topLevelType === 'topInput' || topLevelType === 'topChange') {
    return getInstIfValueChanged(targetInst, nativeEvent);
  }
}

function handleControlledInputBlur(inst, node) {
  // TODO: In IE, inst is occasionally null. Why?
  if (inst == null) {
    return;
  }

  // Fiber and ReactDOM keep wrapper state in separate places
  var state = inst._wrapperState || node._wrapperState;

  if (!state || !state.controlled || node.type !== 'number') {
    return;
  }

  // If controlled, assign the value attribute to the current value on blur
  var value = '' + node.value;
  if (node.getAttribute('value') !== value) {
    node.setAttribute('value', value);
  }
}

/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */
var ChangeEventPlugin = {
  eventTypes: eventTypes$1,

  _allowSimulatedPassThrough: true,
  _isInputEventSupported: isInputEventSupported,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var targetNode = targetInst ? ReactDOMComponentTree_1.getNodeFromInstance(targetInst) : window;

    var getTargetInstFunc, handleEventFunc;
    if (shouldUseChangeEvent(targetNode)) {
      if (doesChangeEventBubble) {
        getTargetInstFunc = getTargetInstForChangeEvent;
      } else {
        handleEventFunc = handleEventsForChangeEventIE8;
      }
    } else if (isTextInputElement_1(targetNode)) {
      if (isInputEventSupported) {
        getTargetInstFunc = getTargetInstForInputOrChangeEvent;
      } else {
        getTargetInstFunc = getTargetInstForInputEventPolyfill;
        handleEventFunc = handleEventsForInputEventPolyfill;
      }
    } else if (shouldUseClickEvent(targetNode)) {
      getTargetInstFunc = getTargetInstForClickEvent;
    }

    if (getTargetInstFunc) {
      var inst = getTargetInstFunc(topLevelType, targetInst, nativeEvent);
      if (inst) {
        var event = createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
        return event;
      }
    }

    if (handleEventFunc) {
      handleEventFunc(topLevelType, targetNode, targetInst);
    }

    // When blurring, set the value attribute for number inputs
    if (topLevelType === 'topBlur') {
      handleControlledInputBlur(targetInst, targetNode);
    }
  }
};

var ChangeEventPlugin_1 = ChangeEventPlugin;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */

var DefaultEventPluginOrder = ['ResponderEventPlugin', 'SimpleEventPlugin', 'TapEventPlugin', 'EnterLeaveEventPlugin', 'ChangeEventPlugin', 'SelectEventPlugin', 'BeforeInputEventPlugin'];

var DefaultEventPluginOrder_1 = DefaultEventPluginOrder;

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: function (event) {
    if (event.view) {
      return event.view;
    }

    var target = getEventTarget_1(event);
    if (target.window === target) {
      // target is a window object
      return target;
    }

    var doc = target.ownerDocument;
    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
    if (doc) {
      return doc.defaultView || doc.parentWindow;
    } else {
      return window;
    }
  },
  detail: function (event) {
    return event.detail || 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent_1.augmentClass(SyntheticUIEvent, UIEventInterface);

var SyntheticUIEvent_1 = SyntheticUIEvent;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var ViewportMetrics = {
  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: function (scrollPosition) {
    ViewportMetrics.currentScrollLeft = scrollPosition.x;
    ViewportMetrics.currentScrollTop = scrollPosition.y;
  }
};

var ViewportMetrics_1 = ViewportMetrics;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */

var modifierKeyToProp = {
  Alt: 'altKey',
  Control: 'ctrlKey',
  Meta: 'metaKey',
  Shift: 'shiftKey'
};

// IE8 does not implement getModifierState so we simply map it to the only
// modifier keys exposed by the event itself, does not support Lock-keys.
// Currently, all major browsers except Chrome seems to support Lock-keys.
function modifierStateGetter(keyArg) {
  var syntheticEvent = this;
  var nativeEvent = syntheticEvent.nativeEvent;
  if (nativeEvent.getModifierState) {
    return nativeEvent.getModifierState(keyArg);
  }
  var keyProp = modifierKeyToProp[keyArg];
  return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState(nativeEvent) {
  return modifierStateGetter;
}

var getEventModifierState_1 = getEventModifierState;

/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var MouseEventInterface = {
  screenX: null,
  screenY: null,
  clientX: null,
  clientY: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  getModifierState: getEventModifierState_1,
  button: function (event) {
    // Webkit, Firefox, IE9+
    // which:  1 2 3
    // button: 0 1 2 (standard)
    var button = event.button;
    if ('which' in event) {
      return button;
    }
    // IE<9
    // which:  undefined
    // button: 0 0 0
    // button: 1 4 2 (onmouseup)
    return button === 2 ? 2 : button === 4 ? 1 : 0;
  },
  buttons: null,
  relatedTarget: function (event) {
    return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
  },
  // "Proprietary" Interface.
  pageX: function (event) {
    return 'pageX' in event ? event.pageX : event.clientX + ViewportMetrics_1.currentScrollLeft;
  },
  pageY: function (event) {
    return 'pageY' in event ? event.pageY : event.clientY + ViewportMetrics_1.currentScrollTop;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent_1.augmentClass(SyntheticMouseEvent, MouseEventInterface);

var SyntheticMouseEvent_1 = SyntheticMouseEvent;

var eventTypes$2 = {
  mouseEnter: {
    registrationName: 'onMouseEnter',
    dependencies: ['topMouseOut', 'topMouseOver']
  },
  mouseLeave: {
    registrationName: 'onMouseLeave',
    dependencies: ['topMouseOut', 'topMouseOver']
  }
};

var EnterLeaveEventPlugin = {
  eventTypes: eventTypes$2,

  /**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   */
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    if (topLevelType === 'topMouseOver' && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
      return null;
    }
    if (topLevelType !== 'topMouseOut' && topLevelType !== 'topMouseOver') {
      // Must not be a mouse in or mouse out - ignoring.
      return null;
    }

    var win;
    if (nativeEventTarget.window === nativeEventTarget) {
      // `nativeEventTarget` is probably a window object.
      win = nativeEventTarget;
    } else {
      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
      var doc = nativeEventTarget.ownerDocument;
      if (doc) {
        win = doc.defaultView || doc.parentWindow;
      } else {
        win = window;
      }
    }

    var from;
    var to;
    if (topLevelType === 'topMouseOut') {
      from = targetInst;
      var related = nativeEvent.relatedTarget || nativeEvent.toElement;
      to = related ? ReactDOMComponentTree_1.getClosestInstanceFromNode(related) : null;
    } else {
      // Moving to a node from outside the window.
      from = null;
      to = targetInst;
    }

    if (from === to) {
      // Nothing pertains to our managed components.
      return null;
    }

    var fromNode = from == null ? win : ReactDOMComponentTree_1.getNodeFromInstance(from);
    var toNode = to == null ? win : ReactDOMComponentTree_1.getNodeFromInstance(to);

    var leave = SyntheticMouseEvent_1.getPooled(eventTypes$2.mouseLeave, from, nativeEvent, nativeEventTarget);
    leave.type = 'mouseleave';
    leave.target = fromNode;
    leave.relatedTarget = toNode;

    var enter = SyntheticMouseEvent_1.getPooled(eventTypes$2.mouseEnter, to, nativeEvent, nativeEventTarget);
    enter.type = 'mouseenter';
    enter.target = toNode;
    enter.relatedTarget = fromNode;

    EventPropagators_1.accumulateEnterLeaveDispatches(leave, enter, from, to);

    return [leave, enter];
  }
};

var EnterLeaveEventPlugin_1 = EnterLeaveEventPlugin;

var MUST_USE_PROPERTY = DOMProperty_1.injection.MUST_USE_PROPERTY;
var HAS_BOOLEAN_VALUE = DOMProperty_1.injection.HAS_BOOLEAN_VALUE;
var HAS_NUMERIC_VALUE = DOMProperty_1.injection.HAS_NUMERIC_VALUE;
var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty_1.injection.HAS_POSITIVE_NUMERIC_VALUE;
var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty_1.injection.HAS_OVERLOADED_BOOLEAN_VALUE;

var HTMLDOMPropertyConfig = {
  isCustomAttribute: RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$')),
  Properties: {
    /**
     * Standard Properties
     */
    accept: 0,
    acceptCharset: 0,
    accessKey: 0,
    action: 0,
    allowFullScreen: HAS_BOOLEAN_VALUE,
    allowTransparency: 0,
    alt: 0,
    // specifies target context for links with `preload` type
    as: 0,
    async: HAS_BOOLEAN_VALUE,
    autoComplete: 0,
    // autoFocus is polyfilled/normalized by AutoFocusUtils
    // autoFocus: HAS_BOOLEAN_VALUE,
    autoPlay: HAS_BOOLEAN_VALUE,
    capture: HAS_BOOLEAN_VALUE,
    cellPadding: 0,
    cellSpacing: 0,
    charSet: 0,
    challenge: 0,
    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    cite: 0,
    classID: 0,
    className: 0,
    cols: HAS_POSITIVE_NUMERIC_VALUE,
    colSpan: 0,
    content: 0,
    contentEditable: 0,
    contextMenu: 0,
    controls: HAS_BOOLEAN_VALUE,
    coords: 0,
    crossOrigin: 0,
    data: 0, // For `<object />` acts as `src`.
    dateTime: 0,
    'default': HAS_BOOLEAN_VALUE,
    defer: HAS_BOOLEAN_VALUE,
    dir: 0,
    disabled: HAS_BOOLEAN_VALUE,
    download: HAS_OVERLOADED_BOOLEAN_VALUE,
    draggable: 0,
    encType: 0,
    form: 0,
    formAction: 0,
    formEncType: 0,
    formMethod: 0,
    formNoValidate: HAS_BOOLEAN_VALUE,
    formTarget: 0,
    frameBorder: 0,
    headers: 0,
    height: 0,
    hidden: HAS_BOOLEAN_VALUE,
    high: 0,
    href: 0,
    hrefLang: 0,
    htmlFor: 0,
    httpEquiv: 0,
    icon: 0,
    id: 0,
    inputMode: 0,
    integrity: 0,
    is: 0,
    keyParams: 0,
    keyType: 0,
    kind: 0,
    label: 0,
    lang: 0,
    list: 0,
    loop: HAS_BOOLEAN_VALUE,
    low: 0,
    manifest: 0,
    marginHeight: 0,
    marginWidth: 0,
    max: 0,
    maxLength: 0,
    media: 0,
    mediaGroup: 0,
    method: 0,
    min: 0,
    minLength: 0,
    // Caution; `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`.
    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    name: 0,
    nonce: 0,
    noValidate: HAS_BOOLEAN_VALUE,
    open: HAS_BOOLEAN_VALUE,
    optimum: 0,
    pattern: 0,
    placeholder: 0,
    playsInline: HAS_BOOLEAN_VALUE,
    poster: 0,
    preload: 0,
    profile: 0,
    radioGroup: 0,
    readOnly: HAS_BOOLEAN_VALUE,
    referrerPolicy: 0,
    rel: 0,
    required: HAS_BOOLEAN_VALUE,
    reversed: HAS_BOOLEAN_VALUE,
    role: 0,
    rows: HAS_POSITIVE_NUMERIC_VALUE,
    rowSpan: HAS_NUMERIC_VALUE,
    sandbox: 0,
    scope: 0,
    scoped: HAS_BOOLEAN_VALUE,
    scrolling: 0,
    seamless: HAS_BOOLEAN_VALUE,
    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    shape: 0,
    size: HAS_POSITIVE_NUMERIC_VALUE,
    sizes: 0,
    span: HAS_POSITIVE_NUMERIC_VALUE,
    spellCheck: 0,
    src: 0,
    srcDoc: 0,
    srcLang: 0,
    srcSet: 0,
    start: HAS_NUMERIC_VALUE,
    step: 0,
    style: 0,
    summary: 0,
    tabIndex: 0,
    target: 0,
    title: 0,
    // Setting .type throws on non-<input> tags
    type: 0,
    useMap: 0,
    value: 0,
    width: 0,
    wmode: 0,
    wrap: 0,

    /**
     * RDFa Properties
     */
    about: 0,
    datatype: 0,
    inlist: 0,
    prefix: 0,
    // property is also supported for OpenGraph in meta tags.
    property: 0,
    resource: 0,
    'typeof': 0,
    vocab: 0,

    /**
     * Non-standard Properties
     */
    // autoCapitalize and autoCorrect are supported in Mobile Safari for
    // keyboard hints.
    autoCapitalize: 0,
    autoCorrect: 0,
    // autoSave allows WebKit/Blink to persist values of input fields on page reloads
    autoSave: 0,
    // color is for Safari mask-icon link
    color: 0,
    // itemProp, itemScope, itemType are for
    // Microdata support. See http://schema.org/docs/gs.html
    itemProp: 0,
    itemScope: HAS_BOOLEAN_VALUE,
    itemType: 0,
    // itemID and itemRef are for Microdata support as well but
    // only specified in the WHATWG spec document. See
    // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
    itemID: 0,
    itemRef: 0,
    // results show looking glass icon and recent searches on input
    // search fields in WebKit/Blink
    results: 0,
    // IE-only attribute that specifies security restrictions on an iframe
    // as an alternative to the sandbox attribute on IE<10
    security: 0,
    // IE-only attribute that controls focus behavior
    unselectable: 0
  },
  DOMAttributeNames: {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
  },
  DOMPropertyNames: {},
  DOMMutationMethods: {
    value: function (node, value) {
      if (value == null) {
        return node.removeAttribute('value');
      }

      // Number inputs get special treatment due to some edge cases in
      // Chrome. Let everything else assign the value attribute as normal.
      // https://github.com/facebook/react/issues/7253#issuecomment-236074326
      if (node.type !== 'number' || node.hasAttribute('value') === false) {
        node.setAttribute('value', '' + value);
      } else if (node.validity && !node.validity.badInput && node.ownerDocument.activeElement !== node) {
        // Don't assign an attribute if validation reports bad
        // input. Chrome will clear the value. Additionally, don't
        // operate on inputs that have focus, otherwise Chrome might
        // strip off trailing decimal places and cause the user's
        // cursor position to jump to the beginning of the input.
        //
        // In ReactDOMInput, we have an onBlur event that will trigger
        // this function again when focus is lost.
        node.setAttribute('value', '' + value);
      }
    }
  }
};

var HTMLDOMPropertyConfig_1 = HTMLDOMPropertyConfig;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var DOMNamespaces = {
  html: 'http://www.w3.org/1999/xhtml',
  mathml: 'http://www.w3.org/1998/Math/MathML',
  svg: 'http://www.w3.org/2000/svg'
};

var DOMNamespaces_1 = DOMNamespaces;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/* globals MSApp */

/**
 * Create a function which has 'unsafe' privileges (required by windows8 apps)
 */

var createMicrosoftUnsafeLocalFunction = function (func) {
  if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
    return function (arg0, arg1, arg2, arg3) {
      MSApp.execUnsafeLocalFunction(function () {
        return func(arg0, arg1, arg2, arg3);
      });
    };
  } else {
    return func;
  }
};

var createMicrosoftUnsafeLocalFunction_1 = createMicrosoftUnsafeLocalFunction;

var WHITESPACE_TEST = /^[ \r\n\t\f]/;
var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;



// SVG temp container for IE lacking innerHTML
var reusableSVGContainer;

/**
 * Set the innerHTML property of a node, ensuring that whitespace is preserved
 * even in IE8.
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */
var setInnerHTML = createMicrosoftUnsafeLocalFunction_1(function (node, html) {
  // IE does not have innerHTML for SVG nodes, so instead we inject the
  // new markup in a temp node and then move the child nodes across into
  // the target node
  if (node.namespaceURI === DOMNamespaces_1.svg && !('innerHTML' in node)) {
    reusableSVGContainer = reusableSVGContainer || document.createElement('div');
    reusableSVGContainer.innerHTML = '<svg>' + html + '</svg>';
    var svgNode = reusableSVGContainer.firstChild;
    while (svgNode.firstChild) {
      node.appendChild(svgNode.firstChild);
    }
  } else {
    node.innerHTML = html;
  }
});

if (ExecutionEnvironment_1.canUseDOM) {
  // IE8: When updating a just created node with innerHTML only leading
  // whitespace is removed. When updating an existing node with innerHTML
  // whitespace in root TextNodes is also collapsed.
  // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html

  // Feature detection; only IE8 is known to behave improperly like this.
  var testElement = document.createElement('div');
  testElement.innerHTML = ' ';
  if (testElement.innerHTML === '') {
    setInnerHTML = function (node, html) {
      // Magic theory: IE8 supposedly differentiates between added and updated
      // nodes when processing innerHTML, innerHTML on updated nodes suffers
      // from worse whitespace behavior. Re-adding a node like this triggers
      // the initial and more favorable whitespace behavior.
      // TODO: What to do on a detached node?
      if (node.parentNode) {
        node.parentNode.replaceChild(node, node);
      }

      // We also implement a workaround for non-visible tags disappearing into
      // thin air on IE8, this only happens if there is no visible text
      // in-front of the non-visible tags. Piggyback on the whitespace fix
      // and simply check if any non-visible tags appear in the source.
      if (WHITESPACE_TEST.test(html) || html[0] === '<' && NONVISIBLE_TEST.test(html)) {
        // Recover leading whitespace by temporarily prepending any character.
        // \uFEFF has the potential advantage of being zero-width/invisible.
        // UglifyJS drops U+FEFF chars when parsing, so use String.fromCharCode
        // in hopes that this is preserved even if "\uFEFF" is transformed to
        // the actual Unicode character (by Babel, for example).
        // https://github.com/mishoo/UglifyJS2/blob/v2.4.20/lib/parse.js#L216
        node.innerHTML = String.fromCharCode(0xfeff) + html;

        // deleteData leaves an empty `TextNode` which offsets the index of all
        // children. Definitely want to avoid this.
        var textNode = node.firstChild;
        if (textNode.data.length === 1) {
          node.removeChild(textNode);
        } else {
          textNode.deleteData(0, 1);
        }
      } else {
        node.innerHTML = html;
      }
    };
  }
  testElement = null;
}

var setInnerHTML_1 = setInnerHTML;

/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Based on the escape-html library, which is used under the MIT License below:
 *
 * Copyright (c) 2012-2013 TJ Holowaychuk
 * Copyright (c) 2015 Andreas Lubbe
 * Copyright (c) 2015 Tiancheng "Timothy" Gu
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

// code copied and modified from escape-html
/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        // "
        escape = '&quot;';
        break;
      case 38:
        // &
        escape = '&amp;';
        break;
      case 39:
        // '
        escape = '&#x27;'; // modified from escape-html; used to be '&#39'
        break;
      case 60:
        // <
        escape = '&lt;';
        break;
      case 62:
        // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
// end code copied and modified from escape-html

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escapeTextContentForBrowser(text) {
  if (typeof text === 'boolean' || typeof text === 'number') {
    // this shortcircuit helps perf for types that we know will never have
    // special characters, especially given that this function is used often
    // for numeric dom ids.
    return '' + text;
  }
  return escapeHtml(text);
}

var escapeTextContentForBrowser_1 = escapeTextContentForBrowser;

/**
 * Set the textContent property of a node, ensuring that whitespace is preserved
 * even in IE8. innerText is a poor substitute for textContent and, among many
 * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
 * as it should.
 *
 * @param {DOMElement} node
 * @param {string} text
 * @internal
 */
var setTextContent = function (node, text) {
  if (text) {
    var firstChild = node.firstChild;

    if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
};

if (ExecutionEnvironment_1.canUseDOM) {
  if (!('textContent' in document.documentElement)) {
    setTextContent = function (node, text) {
      if (node.nodeType === 3) {
        node.nodeValue = text;
        return;
      }
      setInnerHTML_1(node, escapeTextContentForBrowser_1(text));
    };
  }
}

var setTextContent_1 = setTextContent;

var ELEMENT_NODE_TYPE = 1;
var DOCUMENT_FRAGMENT_NODE_TYPE = 11;

/**
 * In IE (8-11) and Edge, appending nodes with no children is dramatically
 * faster than appending a full subtree, so we essentially queue up the
 * .appendChild calls here and apply them so each node is added to its parent
 * before any children are added.
 *
 * In other browsers, doing so is slower or neutral compared to the other order
 * (in Firefox, twice as slow) so we only do this inversion in IE.
 *
 * See https://github.com/spicyj/innerhtml-vs-createelement-vs-clonenode.
 */
var enableLazy = typeof document !== 'undefined' && typeof document.documentMode === 'number' || typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string' && /\bEdge\/\d/.test(navigator.userAgent);

function insertTreeChildren(tree) {
  if (!enableLazy) {
    return;
  }
  var node = tree.node;
  var children = tree.children;
  if (children.length) {
    for (var i = 0; i < children.length; i++) {
      insertTreeBefore(node, children[i], null);
    }
  } else if (tree.html != null) {
    setInnerHTML_1(node, tree.html);
  } else if (tree.text != null) {
    setTextContent_1(node, tree.text);
  }
}

var insertTreeBefore = createMicrosoftUnsafeLocalFunction_1(function (parentNode, tree, referenceNode) {
  // DocumentFragments aren't actually part of the DOM after insertion so
  // appending children won't update the DOM. We need to ensure the fragment
  // is properly populated first, breaking out of our lazy approach for just
  // this level. Also, some <object> plugins (like Flash Player) will read
  // <param> nodes immediately upon insertion into the DOM, so <object>
  // must also be populated prior to insertion into the DOM.
  if (tree.node.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE || tree.node.nodeType === ELEMENT_NODE_TYPE && tree.node.nodeName.toLowerCase() === 'object' && (tree.node.namespaceURI == null || tree.node.namespaceURI === DOMNamespaces_1.html)) {
    insertTreeChildren(tree);
    parentNode.insertBefore(tree.node, referenceNode);
  } else {
    parentNode.insertBefore(tree.node, referenceNode);
    insertTreeChildren(tree);
  }
});

function replaceChildWithTree(oldNode, newTree) {
  oldNode.parentNode.replaceChild(newTree.node, oldNode);
  insertTreeChildren(newTree);
}

function queueChild(parentTree, childTree) {
  if (enableLazy) {
    parentTree.children.push(childTree);
  } else {
    parentTree.node.appendChild(childTree.node);
  }
}

function queueHTML(tree, html) {
  if (enableLazy) {
    tree.html = html;
  } else {
    setInnerHTML_1(tree.node, html);
  }
}

function queueText(tree, text) {
  if (enableLazy) {
    tree.text = text;
  } else {
    setTextContent_1(tree.node, text);
  }
}

function toString$1() {
  return this.node.nodeName;
}

function DOMLazyTree(node) {
  return {
    node: node,
    children: [],
    html: null,
    text: null,
    toString: toString$1
  };
}

DOMLazyTree.insertTreeBefore = insertTreeBefore;
DOMLazyTree.replaceChildWithTree = replaceChildWithTree;
DOMLazyTree.queueChild = queueChild;
DOMLazyTree.queueHTML = queueHTML;
DOMLazyTree.queueText = queueText;

var DOMLazyTree_1 = DOMLazyTree;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */



/**
 * Convert array-like objects to arrays.
 *
 * This API assumes the caller knows the contents of the data type. For less
 * well defined inputs use createArrayFromMixed.
 *
 * @param {object|function|filelist} obj
 * @return {array}
 */
function toArray$2(obj) {
  var length = obj.length;

  // Some browsers builtin objects can report typeof 'function' (e.g. NodeList
  // in old versions of Safari).
  !(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')) ? invariant_1(false) : void 0;

  !(typeof length === 'number') ? invariant_1(false) : void 0;

  !(length === 0 || length - 1 in obj) ? invariant_1(false) : void 0;

  !(typeof obj.callee !== 'function') ? invariant_1(false) : void 0;

  // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
  // without method will throw during the slice call and skip straight to the
  // fallback.
  if (obj.hasOwnProperty) {
    try {
      return Array.prototype.slice.call(obj);
    } catch (e) {
      // IE < 9 does not support Array#slice on collections objects
    }
  }

  // Fall back to copying key by key. This assumes all keys have a value,
  // so will not preserve sparsely populated inputs.
  var ret = Array(length);
  for (var ii = 0; ii < length; ii++) {
    ret[ii] = obj[ii];
  }
  return ret;
}

/**
 * Perform a heuristic test to determine if an object is "array-like".
 *
 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
 *   Joshu replied: "Mu."
 *
 * This function determines if its argument has "array nature": it returns
 * true if the argument is an actual array, an `arguments' object, or an
 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
 *
 * It will return false for other array-like objects like Filelist.
 *
 * @param {*} obj
 * @return {boolean}
 */
function hasArrayNature(obj) {
  return (
    // not null/false
    !!obj && (
    // arrays are objects, NodeLists are functions in Safari
    typeof obj == 'object' || typeof obj == 'function') &&
    // quacks like an array
    'length' in obj &&
    // not window
    !('setInterval' in obj) &&
    // no DOM node should be considered an array-like
    // a 'select' element has 'length' and 'item' properties on IE8
    typeof obj.nodeType != 'number' && (
    // a real array
    Array.isArray(obj) ||
    // arguments
    'callee' in obj ||
    // HTMLCollection/NodeList
    'item' in obj)
  );
}

/**
 * Ensure that the argument is an array by wrapping it in an array if it is not.
 * Creates a copy of the argument if it is already an array.
 *
 * This is mostly useful idiomatically:
 *
 *   var createArrayFromMixed = require('createArrayFromMixed');
 *
 *   function takesOneOrMoreThings(things) {
 *     things = createArrayFromMixed(things);
 *     ...
 *   }
 *
 * This allows you to treat `things' as an array, but accept scalars in the API.
 *
 * If you need to convert an array-like object, like `arguments`, into an array
 * use toArray instead.
 *
 * @param {*} obj
 * @return {array}
 */
function createArrayFromMixed(obj) {
  if (!hasArrayNature(obj)) {
    return [obj];
  } else if (Array.isArray(obj)) {
    return obj.slice();
  } else {
    return toArray$2(obj);
  }
}

var createArrayFromMixed_1 = createArrayFromMixed;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/*eslint-disable fb-www/unsafe-html */





/**
 * Dummy container used to detect which wraps are necessary.
 */
var dummyNode$1 = ExecutionEnvironment_1.canUseDOM ? document.createElement('div') : null;

/**
 * Some browsers cannot use `innerHTML` to render certain elements standalone,
 * so we wrap them, render the wrapped nodes, then extract the desired node.
 *
 * In IE8, certain elements cannot render alone, so wrap all elements ('*').
 */

var shouldWrap = {};

var selectWrap = [1, '<select multiple="true">', '</select>'];
var tableWrap = [1, '<table>', '</table>'];
var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

var svgWrap = [1, '<svg xmlns="http://www.w3.org/2000/svg">', '</svg>'];

var markupWrap = {
  '*': [1, '?<div>', '</div>'],

  'area': [1, '<map>', '</map>'],
  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  'legend': [1, '<fieldset>', '</fieldset>'],
  'param': [1, '<object>', '</object>'],
  'tr': [2, '<table><tbody>', '</tbody></table>'],

  'optgroup': selectWrap,
  'option': selectWrap,

  'caption': tableWrap,
  'colgroup': tableWrap,
  'tbody': tableWrap,
  'tfoot': tableWrap,
  'thead': tableWrap,

  'td': trWrap,
  'th': trWrap
};

// Initialize the SVG elements since we know they'll always need to be wrapped
// consistently. If they are created inside a <div> they will be initialized in
// the wrong namespace (and will not display).
var svgElements = ['circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'text', 'tspan'];
svgElements.forEach(function (nodeName) {
  markupWrap[nodeName] = svgWrap;
  shouldWrap[nodeName] = true;
});

/**
 * Gets the markup wrap configuration for the supplied `nodeName`.
 *
 * NOTE: This lazily detects which wraps are necessary for the current browser.
 *
 * @param {string} nodeName Lowercase `nodeName`.
 * @return {?array} Markup wrap configuration, if applicable.
 */
function getMarkupWrap(nodeName) {
  !!!dummyNode$1 ? invariant_1(false) : void 0;
  if (!markupWrap.hasOwnProperty(nodeName)) {
    nodeName = '*';
  }
  if (!shouldWrap.hasOwnProperty(nodeName)) {
    if (nodeName === '*') {
      dummyNode$1.innerHTML = '<link />';
    } else {
      dummyNode$1.innerHTML = '<' + nodeName + '></' + nodeName + '>';
    }
    shouldWrap[nodeName] = !dummyNode$1.firstChild;
  }
  return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
}

var getMarkupWrap_1 = getMarkupWrap;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

/*eslint-disable fb-www/unsafe-html*/







/**
 * Dummy container used to render all markup.
 */
var dummyNode = ExecutionEnvironment_1.canUseDOM ? document.createElement('div') : null;

/**
 * Pattern used by `getNodeName`.
 */
var nodeNamePattern = /^\s*<(\w+)/;

/**
 * Extracts the `nodeName` of the first element in a string of markup.
 *
 * @param {string} markup String of markup.
 * @return {?string} Node name of the supplied markup.
 */
function getNodeName(markup) {
  var nodeNameMatch = markup.match(nodeNamePattern);
  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
}

/**
 * Creates an array containing the nodes rendered from the supplied markup. The
 * optionally supplied `handleScript` function will be invoked once for each
 * <script> element that is rendered. If no `handleScript` function is supplied,
 * an exception is thrown if any <script> elements are rendered.
 *
 * @param {string} markup A string of valid HTML markup.
 * @param {?function} handleScript Invoked once for each rendered <script>.
 * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
 */
function createNodesFromMarkup(markup, handleScript) {
  var node = dummyNode;
  !!!dummyNode ? invariant_1(false) : void 0;
  var nodeName = getNodeName(markup);

  var wrap = nodeName && getMarkupWrap_1(nodeName);
  if (wrap) {
    node.innerHTML = wrap[1] + markup + wrap[2];

    var wrapDepth = wrap[0];
    while (wrapDepth--) {
      node = node.lastChild;
    }
  } else {
    node.innerHTML = markup;
  }

  var scripts = node.getElementsByTagName('script');
  if (scripts.length) {
    !handleScript ? invariant_1(false) : void 0;
    createArrayFromMixed_1(scripts).forEach(handleScript);
  }

  var nodes = Array.from(node.childNodes);
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
  return nodes;
}

var createNodesFromMarkup_1 = createNodesFromMarkup;

var Danger = {
  /**
   * Replaces a node with a string of markup at its current position within its
   * parent. The markup must render into a single root node.
   *
   * @param {DOMElement} oldChild Child node to replace.
   * @param {string} markup Markup to render in place of the child node.
   * @internal
   */
  dangerouslyReplaceNodeWithMarkup: function (oldChild, markup) {
    !ExecutionEnvironment_1.canUseDOM ? reactProdInvariant_1$2('56') : void 0;
    !markup ? reactProdInvariant_1$2('57') : void 0;
    !(oldChild.nodeName !== 'HTML') ? reactProdInvariant_1$2('58') : void 0;

    if (typeof markup === 'string') {
      var newChild = createNodesFromMarkup_1(markup, emptyFunction_1)[0];
      oldChild.parentNode.replaceChild(newChild, oldChild);
    } else {
      DOMLazyTree_1.replaceChildWithTree(oldChild, markup);
    }
  }
};

var Danger_1 = Danger;

function getNodeAfter(parentNode, node) {
  // Special case for text components, which return [open, close] comments
  // from getHostNode.
  if (Array.isArray(node)) {
    node = node[1];
  }
  return node ? node.nextSibling : parentNode.firstChild;
}

/**
 * Inserts `childNode` as a child of `parentNode` at the `index`.
 *
 * @param {DOMElement} parentNode Parent node in which to insert.
 * @param {DOMElement} childNode Child node to insert.
 * @param {number} index Index at which to insert the child.
 * @internal
 */
var insertChildAt = createMicrosoftUnsafeLocalFunction_1(function (parentNode, childNode, referenceNode) {
  // We rely exclusively on `insertBefore(node, null)` instead of also using
  // `appendChild(node)`. (Using `undefined` is not allowed by all browsers so
  // we are careful to use `null`.)
  parentNode.insertBefore(childNode, referenceNode);
});

function insertLazyTreeChildAt(parentNode, childTree, referenceNode) {
  DOMLazyTree_1.insertTreeBefore(parentNode, childTree, referenceNode);
}

function moveChild(parentNode, childNode, referenceNode) {
  if (Array.isArray(childNode)) {
    moveDelimitedText(parentNode, childNode[0], childNode[1], referenceNode);
  } else {
    insertChildAt(parentNode, childNode, referenceNode);
  }
}

function removeChild(parentNode, childNode) {
  if (Array.isArray(childNode)) {
    var closingComment = childNode[1];
    childNode = childNode[0];
    removeDelimitedText(parentNode, childNode, closingComment);
    parentNode.removeChild(closingComment);
  }
  parentNode.removeChild(childNode);
}

function moveDelimitedText(parentNode, openingComment, closingComment, referenceNode) {
  var node = openingComment;
  while (true) {
    var nextNode = node.nextSibling;
    insertChildAt(parentNode, node, referenceNode);
    if (node === closingComment) {
      break;
    }
    node = nextNode;
  }
}

function removeDelimitedText(parentNode, startNode, closingComment) {
  while (true) {
    var node = startNode.nextSibling;
    if (node === closingComment) {
      // The closing comment is removed by ReactMultiChild.
      break;
    } else {
      parentNode.removeChild(node);
    }
  }
}

function replaceDelimitedText(openingComment, closingComment, stringText) {
  var parentNode = openingComment.parentNode;
  var nodeAfterComment = openingComment.nextSibling;
  if (nodeAfterComment === closingComment) {
    // There are no text nodes between the opening and closing comments; insert
    // a new one if stringText isn't empty.
    if (stringText) {
      insertChildAt(parentNode, document.createTextNode(stringText), nodeAfterComment);
    }
  } else {
    if (stringText) {
      // Set the text content of the first node after the opening comment, and
      // remove all following nodes up until the closing comment.
      setTextContent_1(nodeAfterComment, stringText);
      removeDelimitedText(parentNode, nodeAfterComment, closingComment);
    } else {
      removeDelimitedText(parentNode, openingComment, closingComment);
    }
  }

  
}

var dangerouslyReplaceNodeWithMarkup = Danger_1.dangerouslyReplaceNodeWithMarkup;
/**
 * Operations for updating with DOM children.
 */
var DOMChildrenOperations = {
  dangerouslyReplaceNodeWithMarkup: dangerouslyReplaceNodeWithMarkup,

  replaceDelimitedText: replaceDelimitedText,

  /**
   * Updates a component's children by processing a series of updates. The
   * update configurations are each expected to have a `parentNode` property.
   *
   * @param {array<object>} updates List of update configurations.
   * @internal
   */
  processUpdates: function (parentNode, updates) {
    for (var k = 0; k < updates.length; k++) {
      var update = updates[k];
      switch (update.type) {
        case 'INSERT_MARKUP':
          insertLazyTreeChildAt(parentNode, update.content, getNodeAfter(parentNode, update.afterNode));
          
          break;
        case 'MOVE_EXISTING':
          moveChild(parentNode, update.fromNode, getNodeAfter(parentNode, update.afterNode));
          
          break;
        case 'SET_MARKUP':
          setInnerHTML_1(parentNode, update.content);
          
          break;
        case 'TEXT_CONTENT':
          setTextContent_1(parentNode, update.content);
          
          break;
        case 'REMOVE_NODE':
          removeChild(parentNode, update.fromNode);
          
          break;
      }
    }
  }
};

var DOMChildrenOperations_1 = DOMChildrenOperations;

/**
 * Operations used to process updates to DOM nodes.
 */
var ReactDOMIDOperations = {
  /**
   * Updates a component's children by processing a series of updates.
   *
   * @param {array<object>} updates List of update configurations.
   * @internal
   */
  dangerouslyProcessChildrenUpdates: function (parentInst, updates) {
    var node = ReactDOMComponentTree_1.getNodeFromInstance(parentInst);
    DOMChildrenOperations_1.processUpdates(node, updates);
  }
};

var ReactDOMIDOperations_1 = ReactDOMIDOperations;

/**
 * Abstracts away all functionality of the reconciler that requires knowledge of
 * the browser context. TODO: These callers should be refactored to avoid the
 * need for this injection.
 */
var ReactComponentBrowserEnvironment = {
  processChildrenUpdates: ReactDOMIDOperations_1.dangerouslyProcessChildrenUpdates,

  replaceNodeWithMarkup: DOMChildrenOperations_1.dangerouslyReplaceNodeWithMarkup
};

var ReactComponentBrowserEnvironment_1 = ReactComponentBrowserEnvironment;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * @param {DOMElement} node input/textarea to focus
 */

function focusNode(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
  } catch (e) {}
}

var focusNode_1 = focusNode;

var AutoFocusUtils = {
  focusDOMComponent: function () {
    focusNode_1(ReactDOMComponentTree_1.getNodeFromInstance(this));
  }
};

var AutoFocusUtils_1 = AutoFocusUtils;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * CSS properties which accept numbers but are not in units of "px".
 */

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

var CSSProperty_1 = CSSProperty;

var isUnitlessNumber$1 = CSSProperty_1.isUnitlessNumber;
/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @param {ReactDOMComponent} component
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, component, isCustomProperty) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (isCustomProperty || isNonNumeric || value === 0 || isUnitlessNumber$1.hasOwnProperty(name) && isUnitlessNumber$1[name]) {
    return '' + value; // cast to string
  }

  if (typeof value === 'string') {
    value = value.trim();
  }
  return value + 'px';
}

var dangerousStyleValue_1 = dangerousStyleValue;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

var hyphenate_1 = hyphenate;

var msPattern$1 = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate_1(string).replace(msPattern$1, '-ms-');
}

var hyphenateStyleName_1 = hyphenateStyleName;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @typechecks static-only
 */

/**
 * Memoizes the return value of a function that accepts one string argument.
 */

function memoizeStringOnly(callback) {
  var cache = {};
  return function (string) {
    if (!cache.hasOwnProperty(string)) {
      cache[string] = callback.call(this, string);
    }
    return cache[string];
  };
}

var memoizeStringOnly_1 = memoizeStringOnly;

var processStyleName = memoizeStringOnly_1(function (styleName) {
  return hyphenateStyleName_1(styleName);
});

var hasShorthandPropertyBug = false;
var styleFloatAccessor = 'cssFloat';
if (ExecutionEnvironment_1.canUseDOM) {
  var tempStyle = document.createElement('div').style;
  try {
    // IE8 throws "Invalid argument." if resetting shorthand style properties.
    tempStyle.font = '';
  } catch (e) {
    hasShorthandPropertyBug = true;
  }
  // IE8 only supports accessing cssFloat (standard) as styleFloat
  if (document.documentElement.style.cssFloat === undefined) {
    styleFloatAccessor = 'styleFloat';
  }
}

/**
 * Operations for dealing with CSS properties.
 */
var CSSPropertyOperations = {
  /**
   * Serializes a mapping of style properties for use as inline styles:
   *
   *   > createMarkupForStyles({width: '200px', height: 0})
   *   "width:200px;height:0;"
   *
   * Undefined values are ignored so that declarative programming is easier.
   * The result should be HTML-escaped before insertion into the DOM.
   *
   * @param {object} styles
   * @param {ReactDOMComponent} component
   * @return {?string}
   */
  createMarkupForStyles: function (styles, component) {
    var serialized = '';
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var isCustomProperty = styleName.indexOf('--') === 0;
      var styleValue = styles[styleName];
      if (styleValue != null) {
        serialized += processStyleName(styleName) + ':';
        serialized += dangerousStyleValue_1(styleName, styleValue, component, isCustomProperty) + ';';
      }
    }
    return serialized || null;
  },

  /**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   * @param {ReactDOMComponent} component
   */
  setValueForStyles: function (node, styles, component) {
    var style = node.style;
    for (var styleName in styles) {
      if (!styles.hasOwnProperty(styleName)) {
        continue;
      }
      var isCustomProperty = styleName.indexOf('--') === 0;
      var styleValue = dangerousStyleValue_1(styleName, styles[styleName], component, isCustomProperty);
      if (styleName === 'float' || styleName === 'cssFloat') {
        styleName = styleFloatAccessor;
      }
      if (isCustomProperty) {
        style.setProperty(styleName, styleValue);
      } else if (styleValue) {
        style[styleName] = styleValue;
      } else {
        var expansion = hasShorthandPropertyBug && CSSProperty_1.shorthandPropertyExpansions[styleName];
        if (expansion) {
          // Shorthand property that IE8 won't like unsetting, so unset each
          // component to placate it
          for (var individualStyleName in expansion) {
            style[individualStyleName] = '';
          }
        } else {
          style[styleName] = '';
        }
      }
    }
  }
};

var CSSPropertyOperations_1 = CSSPropertyOperations;

/**
 * Escapes attribute value to prevent scripting attacks.
 *
 * @param {*} value Value to escape.
 * @return {string} An escaped string.
 */
function quoteAttributeValueForBrowser(value) {
  return '"' + escapeTextContentForBrowser_1(value) + '"';
}

var quoteAttributeValueForBrowser_1 = quoteAttributeValueForBrowser;

var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + DOMProperty_1.ATTRIBUTE_NAME_START_CHAR + '][' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');
var illegalAttributeNameCache = {};
var validatedAttributeNameCache = {};

function isAttributeNameSafe(attributeName) {
  if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
    return true;
  }
  if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
    return false;
  }
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
    validatedAttributeNameCache[attributeName] = true;
    return true;
  }
  illegalAttributeNameCache[attributeName] = true;
  void 0;
  return false;
}

function shouldIgnoreValue(propertyInfo, value) {
  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
}

/**
 * Operations for dealing with DOM properties.
 */
var DOMPropertyOperations = {
  /**
   * Creates markup for the ID property.
   *
   * @param {string} id Unescaped ID.
   * @return {string} Markup string.
   */
  createMarkupForID: function (id) {
    return DOMProperty_1.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser_1(id);
  },

  setAttributeForID: function (node, id) {
    node.setAttribute(DOMProperty_1.ID_ATTRIBUTE_NAME, id);
  },

  createMarkupForRoot: function () {
    return DOMProperty_1.ROOT_ATTRIBUTE_NAME + '=""';
  },

  setAttributeForRoot: function (node) {
    node.setAttribute(DOMProperty_1.ROOT_ATTRIBUTE_NAME, '');
  },

  /**
   * Creates markup for a property.
   *
   * @param {string} name
   * @param {*} value
   * @return {?string} Markup string, or null if the property was invalid.
   */
  createMarkupForProperty: function (name, value) {
    var propertyInfo = DOMProperty_1.properties.hasOwnProperty(name) ? DOMProperty_1.properties[name] : null;
    if (propertyInfo) {
      if (shouldIgnoreValue(propertyInfo, value)) {
        return '';
      }
      var attributeName = propertyInfo.attributeName;
      if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
        return attributeName + '=""';
      }
      return attributeName + '=' + quoteAttributeValueForBrowser_1(value);
    } else if (DOMProperty_1.isCustomAttribute(name)) {
      if (value == null) {
        return '';
      }
      return name + '=' + quoteAttributeValueForBrowser_1(value);
    }
    return null;
  },

  /**
   * Creates markup for a custom property.
   *
   * @param {string} name
   * @param {*} value
   * @return {string} Markup string, or empty string if the property was invalid.
   */
  createMarkupForCustomAttribute: function (name, value) {
    if (!isAttributeNameSafe(name) || value == null) {
      return '';
    }
    return name + '=' + quoteAttributeValueForBrowser_1(value);
  },

  /**
   * Sets the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   * @param {*} value
   */
  setValueForProperty: function (node, name, value) {
    var propertyInfo = DOMProperty_1.properties.hasOwnProperty(name) ? DOMProperty_1.properties[name] : null;
    if (propertyInfo) {
      var mutationMethod = propertyInfo.mutationMethod;
      if (mutationMethod) {
        mutationMethod(node, value);
      } else if (shouldIgnoreValue(propertyInfo, value)) {
        this.deleteValueForProperty(node, name);
        return;
      } else if (propertyInfo.mustUseProperty) {
        // Contrary to `setAttribute`, object properties are properly
        // `toString`ed by IE8/9.
        node[propertyInfo.propertyName] = value;
      } else {
        var attributeName = propertyInfo.attributeName;
        var namespace = propertyInfo.attributeNamespace;
        // `setAttribute` with objects becomes only `[object]` in IE8/9,
        // ('' + value) makes it output the correct toString()-value.
        if (namespace) {
          node.setAttributeNS(namespace, attributeName, '' + value);
        } else if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
          node.setAttribute(attributeName, '');
        } else {
          node.setAttribute(attributeName, '' + value);
        }
      }
    } else if (DOMProperty_1.isCustomAttribute(name)) {
      DOMPropertyOperations.setValueForAttribute(node, name, value);
      return;
    }

    
  },

  setValueForAttribute: function (node, name, value) {
    if (!isAttributeNameSafe(name)) {
      return;
    }
    if (value == null) {
      node.removeAttribute(name);
    } else {
      node.setAttribute(name, '' + value);
    }

    
  },

  /**
   * Deletes an attributes from a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */
  deleteValueForAttribute: function (node, name) {
    node.removeAttribute(name);
    
  },

  /**
   * Deletes the value for a property on a node.
   *
   * @param {DOMElement} node
   * @param {string} name
   */
  deleteValueForProperty: function (node, name) {
    var propertyInfo = DOMProperty_1.properties.hasOwnProperty(name) ? DOMProperty_1.properties[name] : null;
    if (propertyInfo) {
      var mutationMethod = propertyInfo.mutationMethod;
      if (mutationMethod) {
        mutationMethod(node, undefined);
      } else if (propertyInfo.mustUseProperty) {
        var propName = propertyInfo.propertyName;
        if (propertyInfo.hasBooleanValue) {
          node[propName] = false;
        } else {
          node[propName] = '';
        }
      } else {
        node.removeAttribute(propertyInfo.attributeName);
      }
    } else if (DOMProperty_1.isCustomAttribute(name)) {
      node.removeAttribute(name);
    }

    
  }
};

var DOMPropertyOperations_1 = DOMPropertyOperations;

function runEventQueueInBatch(events) {
  EventPluginHub_1.enqueueEvents(events);
  EventPluginHub_1.processEventQueue(false);
}

var ReactEventEmitterMixin = {
  /**
   * Streams a fired top-level event to `EventPluginHub` where plugins have the
   * opportunity to create `ReactEvent`s to be dispatched.
   */
  handleTopLevel: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var events = EventPluginHub_1.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
    runEventQueueInBatch(events);
  }
};

var ReactEventEmitterMixin_1 = ReactEventEmitterMixin;

/**
 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
 *
 * @param {string} styleProp
 * @param {string} eventName
 * @returns {object}
 */
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};

  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes['Webkit' + styleProp] = 'webkit' + eventName;
  prefixes['Moz' + styleProp] = 'moz' + eventName;
  prefixes['ms' + styleProp] = 'MS' + eventName;
  prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();

  return prefixes;
}

/**
 * A list of event names to a configurable list of vendor prefixes.
 */
var vendorPrefixes = {
  animationend: makePrefixMap('Animation', 'AnimationEnd'),
  animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
  animationstart: makePrefixMap('Animation', 'AnimationStart'),
  transitionend: makePrefixMap('Transition', 'TransitionEnd')
};

/**
 * Event names that have already been detected and prefixed (if applicable).
 */
var prefixedEventNames = {};

/**
 * Element to check for prefixes on.
 */
var style = {};

/**
 * Bootstrap if a DOM exists.
 */
if (ExecutionEnvironment_1.canUseDOM) {
  style = document.createElement('div').style;

  // On some platforms, in particular some releases of Android 4.x,
  // the un-prefixed "animation" and "transition" properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are usable, and if not remove them from the map.
  if (!('AnimationEvent' in window)) {
    delete vendorPrefixes.animationend.animation;
    delete vendorPrefixes.animationiteration.animation;
    delete vendorPrefixes.animationstart.animation;
  }

  // Same as above
  if (!('TransitionEvent' in window)) {
    delete vendorPrefixes.transitionend.transition;
  }
}

/**
 * Attempts to determine the correct vendor prefixed event name.
 *
 * @param {string} eventName
 * @returns {string}
 */
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) {
    return prefixedEventNames[eventName];
  } else if (!vendorPrefixes[eventName]) {
    return eventName;
  }

  var prefixMap = vendorPrefixes[eventName];

  for (var styleProp in prefixMap) {
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
      return prefixedEventNames[eventName] = prefixMap[styleProp];
    }
  }

  return '';
}

var getVendorPrefixedEventName_1 = getVendorPrefixedEventName;

/**
 * Summary of `ReactBrowserEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactEventListener, which is injected and can therefore support pluggable
 *    event sources. This is the only work that occurs in the main thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */

var hasEventPageXY;
var alreadyListeningTo = {};
var isMonitoringScrollValue = false;
var reactTopListenersCounter = 0;

// For events like 'submit' which don't consistently bubble (which we trap at a
// lower node than `document`), binding at `document` would cause duplicate
// events so we don't include them here
var topEventMapping = {
  topAbort: 'abort',
  topAnimationEnd: getVendorPrefixedEventName_1('animationend') || 'animationend',
  topAnimationIteration: getVendorPrefixedEventName_1('animationiteration') || 'animationiteration',
  topAnimationStart: getVendorPrefixedEventName_1('animationstart') || 'animationstart',
  topBlur: 'blur',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topChange: 'change',
  topClick: 'click',
  topCompositionEnd: 'compositionend',
  topCompositionStart: 'compositionstart',
  topCompositionUpdate: 'compositionupdate',
  topContextMenu: 'contextmenu',
  topCopy: 'copy',
  topCut: 'cut',
  topDoubleClick: 'dblclick',
  topDrag: 'drag',
  topDragEnd: 'dragend',
  topDragEnter: 'dragenter',
  topDragExit: 'dragexit',
  topDragLeave: 'dragleave',
  topDragOver: 'dragover',
  topDragStart: 'dragstart',
  topDrop: 'drop',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topFocus: 'focus',
  topInput: 'input',
  topKeyDown: 'keydown',
  topKeyPress: 'keypress',
  topKeyUp: 'keyup',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topMouseDown: 'mousedown',
  topMouseMove: 'mousemove',
  topMouseOut: 'mouseout',
  topMouseOver: 'mouseover',
  topMouseUp: 'mouseup',
  topPaste: 'paste',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topScroll: 'scroll',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topSelectionChange: 'selectionchange',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTextInput: 'textInput',
  topTimeUpdate: 'timeupdate',
  topTouchCancel: 'touchcancel',
  topTouchEnd: 'touchend',
  topTouchMove: 'touchmove',
  topTouchStart: 'touchstart',
  topTransitionEnd: getVendorPrefixedEventName_1('transitionend') || 'transitionend',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting',
  topWheel: 'wheel'
};

/**
 * To ensure no conflicts with other potential React instances on the page
 */
var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);

function getListeningForDocument(mountAt) {
  // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
  // directly.
  if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
    mountAt[topListenersIDKey] = reactTopListenersCounter++;
    alreadyListeningTo[mountAt[topListenersIDKey]] = {};
  }
  return alreadyListeningTo[mountAt[topListenersIDKey]];
}

/**
 * `ReactBrowserEventEmitter` is used to attach top-level event listeners. For
 * example:
 *
 *   EventPluginHub.putListener('myID', 'onClick', myFunction);
 *
 * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
 *
 * @internal
 */
var ReactBrowserEventEmitter = index({}, ReactEventEmitterMixin_1, {
  /**
   * Injectable event backend
   */
  ReactEventListener: null,

  injection: {
    /**
     * @param {object} ReactEventListener
     */
    injectReactEventListener: function (ReactEventListener) {
      ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
      ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
    }
  },

  /**
   * Sets whether or not any created callbacks should be enabled.
   *
   * @param {boolean} enabled True if callbacks should be enabled.
   */
  setEnabled: function (enabled) {
    if (ReactBrowserEventEmitter.ReactEventListener) {
      ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
    }
  },

  /**
   * @return {boolean} True if callbacks are enabled.
   */
  isEnabled: function () {
    return !!(ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled());
  },

  /**
   * We listen for bubbled touch events on the document object.
   *
   * Firefox v8.01 (and possibly others) exhibited strange behavior when
   * mounting `onmousemove` events at some node that was not the document
   * element. The symptoms were that if your mouse is not moving over something
   * contained within that mount point (for example on the background) the
   * top-level listeners for `onmousemove` won't be called. However, if you
   * register the `mousemove` on the document object, then it will of course
   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
   * top-level listeners to the document object only, at least for these
   * movement types of events and possibly all events.
   *
   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
   *
   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
   * they bubble to document.
   *
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {object} contentDocumentHandle Document which owns the container
   */
  listenTo: function (registrationName, contentDocumentHandle) {
    var mountAt = contentDocumentHandle;
    var isListening = getListeningForDocument(mountAt);
    var dependencies = EventPluginRegistry_1.registrationNameDependencies[registrationName];

    for (var i = 0; i < dependencies.length; i++) {
      var dependency = dependencies[i];
      if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
        if (dependency === 'topWheel') {
          if (isEventSupported_1('wheel')) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'wheel', mountAt);
          } else if (isEventSupported_1('mousewheel')) {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'mousewheel', mountAt);
          } else {
            // Firefox needs to capture a different mouse scroll event.
            // @see http://www.quirksmode.org/dom/events/tests/scroll.html
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topWheel', 'DOMMouseScroll', mountAt);
          }
        } else if (dependency === 'topScroll') {
          if (isEventSupported_1('scroll', true)) {
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topScroll', 'scroll', mountAt);
          } else {
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topScroll', 'scroll', ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);
          }
        } else if (dependency === 'topFocus' || dependency === 'topBlur') {
          if (isEventSupported_1('focus', true)) {
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topFocus', 'focus', mountAt);
            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent('topBlur', 'blur', mountAt);
          } else if (isEventSupported_1('focusin')) {
            // IE has `focusin` and `focusout` events which bubble.
            // @see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topFocus', 'focusin', mountAt);
            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent('topBlur', 'focusout', mountAt);
          }

          // to make sure blur and focus event listeners are only attached once
          isListening.topBlur = true;
          isListening.topFocus = true;
        } else if (topEventMapping.hasOwnProperty(dependency)) {
          ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
        }

        isListening[dependency] = true;
      }
    }
  },

  trapBubbledEvent: function (topLevelType, handlerBaseName, handle) {
    return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
  },

  trapCapturedEvent: function (topLevelType, handlerBaseName, handle) {
    return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
  },

  /**
   * Protect against document.createEvent() returning null
   * Some popup blocker extensions appear to do this:
   * https://github.com/facebook/react/issues/6887
   */
  supportsEventPageXY: function () {
    if (!document.createEvent) {
      return false;
    }
    var ev = document.createEvent('MouseEvent');
    return ev != null && 'pageX' in ev;
  },

  /**
   * Listens to window scroll and resize events. We cache scroll values so that
   * application code can access them without triggering reflows.
   *
   * ViewportMetrics is only used by SyntheticMouse/TouchEvent and only when
   * pageX/pageY isn't supported (legacy browsers).
   *
   * NOTE: Scroll events do not bubble.
   *
   * @see http://www.quirksmode.org/dom/events/scroll.html
   */
  ensureScrollValueMonitoring: function () {
    if (hasEventPageXY === undefined) {
      hasEventPageXY = ReactBrowserEventEmitter.supportsEventPageXY();
    }
    if (!hasEventPageXY && !isMonitoringScrollValue) {
      var refresh = ViewportMetrics_1.refreshScrollValues;
      ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
      isMonitoringScrollValue = true;
    }
  }
});

var ReactBrowserEventEmitter_1 = ReactBrowserEventEmitter;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

var ReactPropTypesSecret$5 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1$4 = ReactPropTypesSecret$5;

var PropTypes = factory_1(React_1.isValidElement);




var hasReadOnlyValue = {
  button: true,
  checkbox: true,
  image: true,
  hidden: true,
  radio: true,
  reset: true,
  submit: true
};

function _assertSingleLink(inputProps) {
  !(inputProps.checkedLink == null || inputProps.valueLink == null) ? reactProdInvariant_1$2('87') : void 0;
}
function _assertValueLink(inputProps) {
  _assertSingleLink(inputProps);
  !(inputProps.value == null && inputProps.onChange == null) ? reactProdInvariant_1$2('88') : void 0;
}

function _assertCheckedLink(inputProps) {
  _assertSingleLink(inputProps);
  !(inputProps.checked == null && inputProps.onChange == null) ? reactProdInvariant_1$2('89') : void 0;
}

var propTypes = {
  value: function (props, propName, componentName) {
    if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
      return null;
    }
    return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
  },
  checked: function (props, propName, componentName) {
    if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
      return null;
    }
    return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
  },
  onChange: PropTypes.func
};

var loggedTypeFailures$2 = {};
function getDeclarationErrorAddendum$2(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Provide a linked `value` attribute for controlled forms. You should not use
 * this outside of the ReactDOM controlled form components.
 */
var LinkedValueUtils = {
  checkPropTypes: function (tagName, props, owner) {
    for (var propName in propTypes) {
      if (propTypes.hasOwnProperty(propName)) {
        var error = propTypes[propName](props, propName, tagName, 'prop', null, ReactPropTypesSecret_1$4);
      }
      if (error instanceof Error && !(error.message in loggedTypeFailures$2)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures$2[error.message] = true;

        var addendum = getDeclarationErrorAddendum$2(owner);
        void 0;
      }
    }
  },

  /**
   * @param {object} inputProps Props for form component
   * @return {*} current value of the input either from value prop or link.
   */
  getValue: function (inputProps) {
    if (inputProps.valueLink) {
      _assertValueLink(inputProps);
      return inputProps.valueLink.value;
    }
    return inputProps.value;
  },

  /**
   * @param {object} inputProps Props for form component
   * @return {*} current checked status of the input either from checked prop
   *             or link.
   */
  getChecked: function (inputProps) {
    if (inputProps.checkedLink) {
      _assertCheckedLink(inputProps);
      return inputProps.checkedLink.value;
    }
    return inputProps.checked;
  },

  /**
   * @param {object} inputProps Props for form component
   * @param {SyntheticEvent} event change event to handle
   */
  executeOnChange: function (inputProps, event) {
    if (inputProps.valueLink) {
      _assertValueLink(inputProps);
      return inputProps.valueLink.requestChange(event.target.value);
    } else if (inputProps.checkedLink) {
      _assertCheckedLink(inputProps);
      return inputProps.checkedLink.requestChange(event.target.checked);
    } else if (inputProps.onChange) {
      return inputProps.onChange.call(undefined, event);
    }
  }
};

var LinkedValueUtils_1 = LinkedValueUtils;

function forceUpdateIfMounted() {
  if (this._rootNodeID) {
    // DOM component is still mounted; update
    ReactDOMInput.updateWrapper(this);
  }
}

function isControlled(props) {
  var usesChecked = props.type === 'checkbox' || props.type === 'radio';
  return usesChecked ? props.checked != null : props.value != null;
}

/**
 * Implements an <input> host component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * @see http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */
var ReactDOMInput = {
  getHostProps: function (inst, props) {
    var value = LinkedValueUtils_1.getValue(props);
    var checked = LinkedValueUtils_1.getChecked(props);

    var hostProps = index({
      // Make sure we set .type before any other properties (setting .value
      // before .type means .value is lost in IE11 and below)
      type: undefined,
      // Make sure we set .step before .value (setting .value before .step
      // means .value is rounded on mount, based upon step precision)
      step: undefined,
      // Make sure we set .min & .max before .value (to ensure proper order
      // in corner cases such as min or max deriving from value, e.g. Issue #7170)
      min: undefined,
      max: undefined
    }, props, {
      defaultChecked: undefined,
      defaultValue: undefined,
      value: value != null ? value : inst._wrapperState.initialValue,
      checked: checked != null ? checked : inst._wrapperState.initialChecked,
      onChange: inst._wrapperState.onChange
    });

    return hostProps;
  },

  mountWrapper: function (inst, props) {
    var defaultValue = props.defaultValue;
    inst._wrapperState = {
      initialChecked: props.checked != null ? props.checked : props.defaultChecked,
      initialValue: props.value != null ? props.value : defaultValue,
      listeners: null,
      onChange: _handleChange.bind(inst),
      controlled: isControlled(props)
    };
  },

  updateWrapper: function (inst) {
    var props = inst._currentElement.props;

    var checked = props.checked;
    if (checked != null) {
      DOMPropertyOperations_1.setValueForProperty(ReactDOMComponentTree_1.getNodeFromInstance(inst), 'checked', checked || false);
    }

    var node = ReactDOMComponentTree_1.getNodeFromInstance(inst);
    var value = LinkedValueUtils_1.getValue(props);
    if (value != null) {
      if (value === 0 && node.value === '') {
        node.value = '0';
        // Note: IE9 reports a number inputs as 'text', so check props instead.
      } else if (props.type === 'number') {
        // Simulate `input.valueAsNumber`. IE9 does not support it
        var valueAsNumber = parseFloat(node.value, 10) || 0;

        if (
        // eslint-disable-next-line
        value != valueAsNumber ||
        // eslint-disable-next-line
        value == valueAsNumber && node.value != value) {
          // Cast `value` to a string to ensure the value is set correctly. While
          // browsers typically do this as necessary, jsdom doesn't.
          node.value = '' + value;
        }
      } else if (node.value !== '' + value) {
        // Cast `value` to a string to ensure the value is set correctly. While
        // browsers typically do this as necessary, jsdom doesn't.
        node.value = '' + value;
      }
    } else {
      if (props.value == null && props.defaultValue != null) {
        // In Chrome, assigning defaultValue to certain input types triggers input validation.
        // For number inputs, the display value loses trailing decimal points. For email inputs,
        // Chrome raises "The specified value <x> is not a valid email address".
        //
        // Here we check to see if the defaultValue has actually changed, avoiding these problems
        // when the user is inputting text
        //
        // https://github.com/facebook/react/issues/7253
        if (node.defaultValue !== '' + props.defaultValue) {
          node.defaultValue = '' + props.defaultValue;
        }
      }
      if (props.checked == null && props.defaultChecked != null) {
        node.defaultChecked = !!props.defaultChecked;
      }
    }
  },

  postMountWrapper: function (inst) {
    var props = inst._currentElement.props;

    // This is in postMount because we need access to the DOM node, which is not
    // available until after the component has mounted.
    var node = ReactDOMComponentTree_1.getNodeFromInstance(inst);

    // Detach value from defaultValue. We won't do anything if we're working on
    // submit or reset inputs as those values & defaultValues are linked. They
    // are not resetable nodes so this operation doesn't matter and actually
    // removes browser-default values (eg "Submit Query") when no value is
    // provided.

    switch (props.type) {
      case 'submit':
      case 'reset':
        break;
      case 'color':
      case 'date':
      case 'datetime':
      case 'datetime-local':
      case 'month':
      case 'time':
      case 'week':
        // This fixes the no-show issue on iOS Safari and Android Chrome:
        // https://github.com/facebook/react/issues/7233
        node.value = '';
        node.value = node.defaultValue;
        break;
      default:
        node.value = node.value;
        break;
    }

    // Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
    // this is needed to work around a chrome bug where setting defaultChecked
    // will sometimes influence the value of checked (even after detachment).
    // Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
    // We need to temporarily unset name to avoid disrupting radio button groups.
    var name = node.name;
    if (name !== '') {
      node.name = '';
    }
    node.defaultChecked = !node.defaultChecked;
    node.defaultChecked = !node.defaultChecked;
    if (name !== '') {
      node.name = name;
    }
  }
};

function _handleChange(event) {
  var props = this._currentElement.props;

  var returnValue = LinkedValueUtils_1.executeOnChange(props, event);

  // Here we use asap to wait until all updates have propagated, which
  // is important when using controlled components within layers:
  // https://github.com/facebook/react/issues/1698
  ReactUpdates_1.asap(forceUpdateIfMounted, this);

  var name = props.name;
  if (props.type === 'radio' && name != null) {
    var rootNode = ReactDOMComponentTree_1.getNodeFromInstance(this);
    var queryRoot = rootNode;

    while (queryRoot.parentNode) {
      queryRoot = queryRoot.parentNode;
    }

    // If `rootNode.form` was non-null, then we could try `form.elements`,
    // but that sometimes behaves strangely in IE8. We could also try using
    // `form.getElementsByName`, but that will only return direct children
    // and won't include inputs that use the HTML5 `form=` attribute. Since
    // the input might not even be in a form, let's just use the global
    // `querySelectorAll` to ensure we don't miss anything.
    var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');

    for (var i = 0; i < group.length; i++) {
      var otherNode = group[i];
      if (otherNode === rootNode || otherNode.form !== rootNode.form) {
        continue;
      }
      // This will throw if radio buttons rendered by different copies of React
      // and the same name are rendered into the same form (same as #1939).
      // That's probably okay; we don't support it just as we don't support
      // mixing React radio buttons with non-React ones.
      var otherInstance = ReactDOMComponentTree_1.getInstanceFromNode(otherNode);
      !otherInstance ? reactProdInvariant_1$2('90') : void 0;
      // If this is a controlled radio button group, forcing the input that
      // was previously checked to update will cause it to be come re-checked
      // as appropriate.
      ReactUpdates_1.asap(forceUpdateIfMounted, otherInstance);
    }
  }

  return returnValue;
}

var ReactDOMInput_1 = ReactDOMInput;

var didWarnValueDefaultValue$1 = false;

function updateOptionsIfPendingUpdateAndMounted() {
  if (this._rootNodeID && this._wrapperState.pendingUpdate) {
    this._wrapperState.pendingUpdate = false;

    var props = this._currentElement.props;
    var value = LinkedValueUtils_1.getValue(props);

    if (value != null) {
      updateOptions(this, Boolean(props.multiple), value);
    }
  }
}

/**
 * @param {ReactDOMComponent} inst
 * @param {boolean} multiple
 * @param {*} propValue A stringable (with `multiple`, a list of stringables).
 * @private
 */
function updateOptions(inst, multiple, propValue) {
  var selectedValue, i;
  var options = ReactDOMComponentTree_1.getNodeFromInstance(inst).options;

  if (multiple) {
    selectedValue = {};
    for (i = 0; i < propValue.length; i++) {
      selectedValue['' + propValue[i]] = true;
    }
    for (i = 0; i < options.length; i++) {
      var selected = selectedValue.hasOwnProperty(options[i].value);
      if (options[i].selected !== selected) {
        options[i].selected = selected;
      }
    }
  } else {
    // Do not set `select.value` as exact behavior isn't consistent across all
    // browsers for all cases.
    selectedValue = '' + propValue;
    for (i = 0; i < options.length; i++) {
      if (options[i].value === selectedValue) {
        options[i].selected = true;
        return;
      }
    }
    if (options.length) {
      options[0].selected = true;
    }
  }
}

/**
 * Implements a <select> host component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * stringable. If `multiple` is true, the prop must be an array of stringables.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */
var ReactDOMSelect = {
  getHostProps: function (inst, props) {
    return index({}, props, {
      onChange: inst._wrapperState.onChange,
      value: undefined
    });
  },

  mountWrapper: function (inst, props) {
    var value = LinkedValueUtils_1.getValue(props);
    inst._wrapperState = {
      pendingUpdate: false,
      initialValue: value != null ? value : props.defaultValue,
      listeners: null,
      onChange: _handleChange$1.bind(inst),
      wasMultiple: Boolean(props.multiple)
    };

    if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue$1) {
      void 0;
      didWarnValueDefaultValue$1 = true;
    }
  },

  getSelectValueContext: function (inst) {
    // ReactDOMOption looks at this initial value so the initial generated
    // markup has correct `selected` attributes
    return inst._wrapperState.initialValue;
  },

  postUpdateWrapper: function (inst) {
    var props = inst._currentElement.props;

    // After the initial mount, we control selected-ness manually so don't pass
    // this value down
    inst._wrapperState.initialValue = undefined;

    var wasMultiple = inst._wrapperState.wasMultiple;
    inst._wrapperState.wasMultiple = Boolean(props.multiple);

    var value = LinkedValueUtils_1.getValue(props);
    if (value != null) {
      inst._wrapperState.pendingUpdate = false;
      updateOptions(inst, Boolean(props.multiple), value);
    } else if (wasMultiple !== Boolean(props.multiple)) {
      // For simplicity, reapply `defaultValue` if `multiple` is toggled.
      if (props.defaultValue != null) {
        updateOptions(inst, Boolean(props.multiple), props.defaultValue);
      } else {
        // Revert the select back to its default unselected state.
        updateOptions(inst, Boolean(props.multiple), props.multiple ? [] : '');
      }
    }
  }
};

function _handleChange$1(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils_1.executeOnChange(props, event);

  if (this._rootNodeID) {
    this._wrapperState.pendingUpdate = true;
  }
  ReactUpdates_1.asap(updateOptionsIfPendingUpdateAndMounted, this);
  return returnValue;
}

var ReactDOMSelect_1 = ReactDOMSelect;

var didWarnInvalidOptionChildren = false;

function flattenChildren(children) {
  var content = '';

  // Flatten children and warn if they aren't strings or numbers;
  // invalid types are ignored.
  React_1.Children.forEach(children, function (child) {
    if (child == null) {
      return;
    }
    if (typeof child === 'string' || typeof child === 'number') {
      content += child;
    } else if (!didWarnInvalidOptionChildren) {
      didWarnInvalidOptionChildren = true;
      void 0;
    }
  });

  return content;
}

/**
 * Implements an <option> host component that warns when `selected` is set.
 */
var ReactDOMOption = {
  mountWrapper: function (inst, props, hostParent) {
    // TODO (yungsters): Remove support for `selected` in <option>.
    var selectValue = null;
    if (hostParent != null) {
      var selectParent = hostParent;

      if (selectParent._tag === 'optgroup') {
        selectParent = selectParent._hostParent;
      }

      if (selectParent != null && selectParent._tag === 'select') {
        selectValue = ReactDOMSelect_1.getSelectValueContext(selectParent);
      }
    }

    // If the value is null (e.g., no specified value or after initial mount)
    // or missing (e.g., for <datalist>), we don't change props.selected
    var selected = null;
    if (selectValue != null) {
      var value;
      if (props.value != null) {
        value = props.value + '';
      } else {
        value = flattenChildren(props.children);
      }
      selected = false;
      if (Array.isArray(selectValue)) {
        // multiple
        for (var i = 0; i < selectValue.length; i++) {
          if ('' + selectValue[i] === value) {
            selected = true;
            break;
          }
        }
      } else {
        selected = '' + selectValue === value;
      }
    }

    inst._wrapperState = { selected: selected };
  },

  postMountWrapper: function (inst) {
    // value="" should make a value attribute (#6219)
    var props = inst._currentElement.props;
    if (props.value != null) {
      var node = ReactDOMComponentTree_1.getNodeFromInstance(inst);
      node.setAttribute('value', props.value);
    }
  },

  getHostProps: function (inst, props) {
    var hostProps = index({ selected: undefined, children: undefined }, props);

    // Read state only from initial mount because <select> updates value
    // manually; we need the initial state only for server rendering
    if (inst._wrapperState.selected != null) {
      hostProps.selected = inst._wrapperState.selected;
    }

    var content = flattenChildren(props.children);

    if (content) {
      hostProps.children = content;
    }

    return hostProps;
  }
};

var ReactDOMOption_1 = ReactDOMOption;

function forceUpdateIfMounted$1() {
  if (this._rootNodeID) {
    // DOM component is still mounted; update
    ReactDOMTextarea.updateWrapper(this);
  }
}

/**
 * Implements a <textarea> host component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */
var ReactDOMTextarea = {
  getHostProps: function (inst, props) {
    !(props.dangerouslySetInnerHTML == null) ? reactProdInvariant_1$2('91') : void 0;

    // Always set children to the same thing. In IE9, the selection range will
    // get reset if `textContent` is mutated.  We could add a check in setTextContent
    // to only set the value if/when the value differs from the node value (which would
    // completely solve this IE9 bug), but Sebastian+Ben seemed to like this solution.
    // The value can be a boolean or object so that's why it's forced to be a string.
    var hostProps = index({}, props, {
      value: undefined,
      defaultValue: undefined,
      children: '' + inst._wrapperState.initialValue,
      onChange: inst._wrapperState.onChange
    });

    return hostProps;
  },

  mountWrapper: function (inst, props) {
    var value = LinkedValueUtils_1.getValue(props);
    var initialValue = value;

    // Only bother fetching default value if we're going to use it
    if (value == null) {
      var defaultValue = props.defaultValue;
      // TODO (yungsters): Remove support for children content in <textarea>.
      var children = props.children;
      if (children != null) {
        !(defaultValue == null) ? reactProdInvariant_1$2('92') : void 0;
        if (Array.isArray(children)) {
          !(children.length <= 1) ? reactProdInvariant_1$2('93') : void 0;
          children = children[0];
        }

        defaultValue = '' + children;
      }
      if (defaultValue == null) {
        defaultValue = '';
      }
      initialValue = defaultValue;
    }

    inst._wrapperState = {
      initialValue: '' + initialValue,
      listeners: null,
      onChange: _handleChange$2.bind(inst)
    };
  },

  updateWrapper: function (inst) {
    var props = inst._currentElement.props;

    var node = ReactDOMComponentTree_1.getNodeFromInstance(inst);
    var value = LinkedValueUtils_1.getValue(props);
    if (value != null) {
      // Cast `value` to a string to ensure the value is set correctly. While
      // browsers typically do this as necessary, jsdom doesn't.
      var newValue = '' + value;

      // To avoid side effects (such as losing text selection), only set value if changed
      if (newValue !== node.value) {
        node.value = newValue;
      }
      if (props.defaultValue == null) {
        node.defaultValue = newValue;
      }
    }
    if (props.defaultValue != null) {
      node.defaultValue = props.defaultValue;
    }
  },

  postMountWrapper: function (inst) {
    // This is in postMount because we need access to the DOM node, which is not
    // available until after the component has mounted.
    var node = ReactDOMComponentTree_1.getNodeFromInstance(inst);
    var textContent = node.textContent;

    // Only set node.value if textContent is equal to the expected
    // initial value. In IE10/IE11 there is a bug where the placeholder attribute
    // will populate textContent as well.
    // https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
    if (textContent === inst._wrapperState.initialValue) {
      node.value = textContent;
    }
  }
};

function _handleChange$2(event) {
  var props = this._currentElement.props;
  var returnValue = LinkedValueUtils_1.executeOnChange(props, event);
  ReactUpdates_1.asap(forceUpdateIfMounted$1, this);
  return returnValue;
}

var ReactDOMTextarea_1 = ReactDOMTextarea;

var injected = false;

var ReactComponentEnvironment = {
  /**
   * Optionally injectable hook for swapping out mount images in the middle of
   * the tree.
   */
  replaceNodeWithMarkup: null,

  /**
   * Optionally injectable hook for processing a queue of child updates. Will
   * later move into MultiChildComponents.
   */
  processChildrenUpdates: null,

  injection: {
    injectEnvironment: function (environment) {
      !!injected ? reactProdInvariant_1$2('104') : void 0;
      ReactComponentEnvironment.replaceNodeWithMarkup = environment.replaceNodeWithMarkup;
      ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
      injected = true;
    }
  }
};

var ReactComponentEnvironment_1 = ReactComponentEnvironment;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 */

// TODO: Replace this with ES6: var ReactInstanceMap = new Map();

var ReactInstanceMap = {
  /**
   * This API should be called `delete` but we'd have to make sure to always
   * transform these to strings for IE support. When this transform is fully
   * supported we can rename it.
   */
  remove: function (key) {
    key._reactInternalInstance = undefined;
  },

  get: function (key) {
    return key._reactInternalInstance;
  },

  has: function (key) {
    return key._reactInternalInstance !== undefined;
  },

  set: function (key, value) {
    key._reactInternalInstance = value;
  }
};

var ReactInstanceMap_1 = ReactInstanceMap;

var ReactNodeTypes = {
  HOST: 0,
  COMPOSITE: 1,
  EMPTY: 2,

  getType: function (node) {
    if (node === null || node === false) {
      return ReactNodeTypes.EMPTY;
    } else if (React_1.isValidElement(node)) {
      if (typeof node.type === 'function') {
        return ReactNodeTypes.COMPOSITE;
      } else {
        return ReactNodeTypes.HOST;
      }
    }
    reactProdInvariant_1$2('26', node);
  }
};

var ReactNodeTypes_1 = ReactNodeTypes;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

var ReactComponentTreeHook$3;

if (typeof process !== 'undefined' && process.env && "production" === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook$3 = ReactComponentTreeHook_1;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

var hasOwnProperty$3 = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty$3.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

var shallowEqual_1 = shallowEqual;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Given a `prevElement` and `nextElement`, determines if the existing
 * instance should be updated as opposed to being destroyed or replaced by a new
 * instance. Both arguments are elements. This ensures that this logic can
 * operate on stateless trees without any backing instance.
 *
 * @param {?object} prevElement
 * @param {?object} nextElement
 * @return {boolean} True if the existing instance should be updated.
 * @protected
 */

function shouldUpdateReactComponent(prevElement, nextElement) {
  var prevEmpty = prevElement === null || prevElement === false;
  var nextEmpty = nextElement === null || nextElement === false;
  if (prevEmpty || nextEmpty) {
    return prevEmpty === nextEmpty;
  }

  var prevType = typeof prevElement;
  var nextType = typeof nextElement;
  if (prevType === 'string' || prevType === 'number') {
    return nextType === 'string' || nextType === 'number';
  } else {
    return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
  }
}

var shouldUpdateReactComponent_1 = shouldUpdateReactComponent;

var CompositeTypes = {
  ImpureClass: 0,
  PureClass: 1,
  StatelessFunctional: 2
};

function StatelessComponent(Component) {}
StatelessComponent.prototype.render = function () {
  var Component = ReactInstanceMap_1.get(this)._currentElement.type;
  var element = Component(this.props, this.context, this.updater);
  warnIfInvalidElement(Component, element);
  return element;
};

function warnIfInvalidElement(Component, element) {
  
}

function shouldConstruct(Component) {
  return !!(Component.prototype && Component.prototype.isReactComponent);
}

function isPureComponent(Component) {
  return !!(Component.prototype && Component.prototype.isPureReactComponent);
}

/**
 * ------------------ The Life-Cycle of a Composite Component ------------------
 *
 * - constructor: Initialization of state. The instance is now retained.
 *   - componentWillMount
 *   - render
 *   - [children's constructors]
 *     - [children's componentWillMount and render]
 *     - [children's componentDidMount]
 *     - componentDidMount
 *
 *       Update Phases:
 *       - componentWillReceiveProps (only called if parent updated)
 *       - shouldComponentUpdate
 *         - componentWillUpdate
 *           - render
 *           - [children's constructors or receive props phases]
 *         - componentDidUpdate
 *
 *     - componentWillUnmount
 *     - [children's componentWillUnmount]
 *   - [children destroyed]
 * - (destroyed): The instance is now blank, released by React and ready for GC.
 *
 * -----------------------------------------------------------------------------
 */

/**
 * An incrementing ID assigned to each component when it is mounted. This is
 * used to enforce the order in which `ReactUpdates` updates dirty components.
 *
 * @private
 */
var nextMountID = 1;

/**
 * @lends {ReactCompositeComponent.prototype}
 */
var ReactCompositeComponent = {
  /**
   * Base constructor for all composite component.
   *
   * @param {ReactElement} element
   * @final
   * @internal
   */
  construct: function (element) {
    this._currentElement = element;
    this._rootNodeID = 0;
    this._compositeType = null;
    this._instance = null;
    this._hostParent = null;
    this._hostContainerInfo = null;

    // See ReactUpdateQueue
    this._updateBatchNumber = null;
    this._pendingElement = null;
    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    this._renderedNodeType = null;
    this._renderedComponent = null;
    this._context = null;
    this._mountOrder = 0;
    this._topLevelWrapper = null;

    // See ReactUpdates and ReactUpdateQueue.
    this._pendingCallbacks = null;

    // ComponentWillUnmount shall only be called once
    this._calledComponentWillUnmount = false;

    
  },

  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {?object} hostParent
   * @param {?object} hostContainerInfo
   * @param {?object} context
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
    var _this = this;

    this._context = context;
    this._mountOrder = nextMountID++;
    this._hostParent = hostParent;
    this._hostContainerInfo = hostContainerInfo;

    var publicProps = this._currentElement.props;
    var publicContext = this._processContext(context);

    var Component = this._currentElement.type;

    var updateQueue = transaction.getUpdateQueue();

    // Initialize the public class
    var doConstruct = shouldConstruct(Component);
    var inst = this._constructComponent(doConstruct, publicProps, publicContext, updateQueue);
    var renderedElement;

    // Support functional components
    if (!doConstruct && (inst == null || inst.render == null)) {
      renderedElement = inst;
      warnIfInvalidElement(Component, renderedElement);
      !(inst === null || inst === false || React_1.isValidElement(inst)) ? reactProdInvariant_1$2('105', Component.displayName || Component.name || 'Component') : void 0;
      inst = new StatelessComponent(Component);
      this._compositeType = CompositeTypes.StatelessFunctional;
    } else {
      if (isPureComponent(Component)) {
        this._compositeType = CompositeTypes.PureClass;
      } else {
        this._compositeType = CompositeTypes.ImpureClass;
      }
    }

    inst.props = publicProps;
    inst.context = publicContext;
    inst.refs = emptyObject_1;
    inst.updater = updateQueue;

    this._instance = inst;

    // Store a reference from the instance back to the internal representation
    ReactInstanceMap_1.set(inst, this);

    var initialState = inst.state;
    if (initialState === undefined) {
      inst.state = initialState = null;
    }
    !(typeof initialState === 'object' && !Array.isArray(initialState)) ? reactProdInvariant_1$2('106', this.getName() || 'ReactCompositeComponent') : void 0;

    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    var markup;
    if (inst.unstable_handleError) {
      markup = this.performInitialMountWithErrorHandling(renderedElement, hostParent, hostContainerInfo, transaction, context);
    } else {
      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
    }

    if (inst.componentDidMount) {
      {
        transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
      }
    }

    return markup;
  },

  _constructComponent: function (doConstruct, publicProps, publicContext, updateQueue) {
    {
      return this._constructComponentWithoutOwner(doConstruct, publicProps, publicContext, updateQueue);
    }
  },

  _constructComponentWithoutOwner: function (doConstruct, publicProps, publicContext, updateQueue) {
    var Component = this._currentElement.type;

    if (doConstruct) {
      {
        return new Component(publicProps, publicContext, updateQueue);
      }
    }

    // This can still be an instance in case of factory components
    // but we'll count this as time spent rendering as the more common case.
    {
      return Component(publicProps, publicContext, updateQueue);
    }
  },

  performInitialMountWithErrorHandling: function (renderedElement, hostParent, hostContainerInfo, transaction, context) {
    var markup;
    var checkpoint = transaction.checkpoint();
    try {
      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
    } catch (e) {
      // Roll back to checkpoint, handle error (which may add items to the transaction), and take a new checkpoint
      transaction.rollback(checkpoint);
      this._instance.unstable_handleError(e);
      if (this._pendingStateQueue) {
        this._instance.state = this._processPendingState(this._instance.props, this._instance.context);
      }
      checkpoint = transaction.checkpoint();

      this._renderedComponent.unmountComponent(true);
      transaction.rollback(checkpoint);

      // Try again - we've informed the component about the error, so they can render an error message this time.
      // If this throws again, the error will bubble up (and can be caught by a higher error boundary).
      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
    }
    return markup;
  },

  performInitialMount: function (renderedElement, hostParent, hostContainerInfo, transaction, context) {
    var inst = this._instance;

    var debugID = 0;
    if (inst.componentWillMount) {
      {
        inst.componentWillMount();
      }
      // When mounting, calls to `setState` by `componentWillMount` will set
      // `this._pendingStateQueue` without triggering a re-render.
      if (this._pendingStateQueue) {
        inst.state = this._processPendingState(inst.props, inst.context);
      }
    }

    // If not a stateless component, we now render
    if (renderedElement === undefined) {
      renderedElement = this._renderValidatedComponent();
    }

    var nodeType = ReactNodeTypes_1.getType(renderedElement);
    this._renderedNodeType = nodeType;
    var child = this._instantiateReactComponent(renderedElement, nodeType !== ReactNodeTypes_1.EMPTY /* shouldHaveDebugID */
    );
    this._renderedComponent = child;

    var markup = ReactReconciler_1.mountComponent(child, transaction, hostParent, hostContainerInfo, this._processChildContext(context), debugID);

    return markup;
  },

  getHostNode: function () {
    return ReactReconciler_1.getHostNode(this._renderedComponent);
  },

  /**
   * Releases any resources allocated by `mountComponent`.
   *
   * @final
   * @internal
   */
  unmountComponent: function (safely) {
    if (!this._renderedComponent) {
      return;
    }

    var inst = this._instance;

    if (inst.componentWillUnmount && !inst._calledComponentWillUnmount) {
      inst._calledComponentWillUnmount = true;

      if (safely) {
        var name = this.getName() + '.componentWillUnmount()';
        ReactErrorUtils_1.invokeGuardedCallback(name, inst.componentWillUnmount.bind(inst));
      } else {
        {
          inst.componentWillUnmount();
        }
      }
    }

    if (this._renderedComponent) {
      ReactReconciler_1.unmountComponent(this._renderedComponent, safely);
      this._renderedNodeType = null;
      this._renderedComponent = null;
      this._instance = null;
    }

    // Reset pending fields
    // Even if this component is scheduled for another update in ReactUpdates,
    // it would still be ignored because these fields are reset.
    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;
    this._pendingCallbacks = null;
    this._pendingElement = null;

    // These fields do not really need to be reset since this object is no
    // longer accessible.
    this._context = null;
    this._rootNodeID = 0;
    this._topLevelWrapper = null;

    // Delete the reference from the instance to this internal representation
    // which allow the internals to be properly cleaned up even if the user
    // leaks a reference to the public instance.
    ReactInstanceMap_1.remove(inst);

    // Some existing components rely on inst.props even after they've been
    // destroyed (in event handlers).
    // TODO: inst.props = null;
    // TODO: inst.state = null;
    // TODO: inst.context = null;
  },

  /**
   * Filters the context object to only contain keys specified in
   * `contextTypes`
   *
   * @param {object} context
   * @return {?object}
   * @private
   */
  _maskContext: function (context) {
    var Component = this._currentElement.type;
    var contextTypes = Component.contextTypes;
    if (!contextTypes) {
      return emptyObject_1;
    }
    var maskedContext = {};
    for (var contextName in contextTypes) {
      maskedContext[contextName] = context[contextName];
    }
    return maskedContext;
  },

  /**
   * Filters the context object to only contain keys specified in
   * `contextTypes`, and asserts that they are valid.
   *
   * @param {object} context
   * @return {?object}
   * @private
   */
  _processContext: function (context) {
    var maskedContext = this._maskContext(context);
    return maskedContext;
  },

  /**
   * @param {object} currentContext
   * @return {object}
   * @private
   */
  _processChildContext: function (currentContext) {
    var Component = this._currentElement.type;
    var inst = this._instance;
    var childContext;

    if (inst.getChildContext) {
      {
        childContext = inst.getChildContext();
      }
    }

    if (childContext) {
      !(typeof Component.childContextTypes === 'object') ? reactProdInvariant_1$2('107', this.getName() || 'ReactCompositeComponent') : void 0;
      for (var name in childContext) {
        !(name in Component.childContextTypes) ? reactProdInvariant_1$2('108', this.getName() || 'ReactCompositeComponent', name) : void 0;
      }
      return index({}, currentContext, childContext);
    }
    return currentContext;
  },

  /**
   * Assert that the context types are valid
   *
   * @param {object} typeSpecs Map of context field to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @private
   */
  _checkContextTypes: function (typeSpecs, values, location) {
    
  },

  receiveComponent: function (nextElement, transaction, nextContext) {
    var prevElement = this._currentElement;
    var prevContext = this._context;

    this._pendingElement = null;

    this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
  },

  /**
   * If any of `_pendingElement`, `_pendingStateQueue`, or `_pendingForceUpdate`
   * is set, update the component.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  performUpdateIfNecessary: function (transaction) {
    if (this._pendingElement != null) {
      ReactReconciler_1.receiveComponent(this, this._pendingElement, transaction, this._context);
    } else if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
      this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
    } else {
      this._updateBatchNumber = null;
    }
  },

  /**
   * Perform an update to a mounted component. The componentWillReceiveProps and
   * shouldComponentUpdate methods are called, then (assuming the update isn't
   * skipped) the remaining update lifecycle methods are called and the DOM
   * representation is updated.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {ReactElement} prevParentElement
   * @param {ReactElement} nextParentElement
   * @internal
   * @overridable
   */
  updateComponent: function (transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
    var inst = this._instance;
    !(inst != null) ? reactProdInvariant_1$2('136', this.getName() || 'ReactCompositeComponent') : void 0;

    var willReceive = false;
    var nextContext;

    // Determine if the context has changed or not
    if (this._context === nextUnmaskedContext) {
      nextContext = inst.context;
    } else {
      nextContext = this._processContext(nextUnmaskedContext);
      willReceive = true;
    }

    var prevProps = prevParentElement.props;
    var nextProps = nextParentElement.props;

    // Not a simple state update but a props update
    if (prevParentElement !== nextParentElement) {
      willReceive = true;
    }

    // An update here will schedule an update but immediately set
    // _pendingStateQueue which will ensure that any state updates gets
    // immediately reconciled instead of waiting for the next batch.
    if (willReceive && inst.componentWillReceiveProps) {
      {
        inst.componentWillReceiveProps(nextProps, nextContext);
      }
    }

    var nextState = this._processPendingState(nextProps, nextContext);
    var shouldUpdate = true;

    if (!this._pendingForceUpdate) {
      if (inst.shouldComponentUpdate) {
        {
          shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState, nextContext);
        }
      } else {
        if (this._compositeType === CompositeTypes.PureClass) {
          shouldUpdate = !shallowEqual_1(prevProps, nextProps) || !shallowEqual_1(inst.state, nextState);
        }
      }
    }

    this._updateBatchNumber = null;
    if (shouldUpdate) {
      this._pendingForceUpdate = false;
      // Will set `this.props`, `this.state` and `this.context`.
      this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
    } else {
      // If it's determined that a component should not update, we still want
      // to set props and state but we shortcut the rest of the update.
      this._currentElement = nextParentElement;
      this._context = nextUnmaskedContext;
      inst.props = nextProps;
      inst.state = nextState;
      inst.context = nextContext;
    }
  },

  _processPendingState: function (props, context) {
    var inst = this._instance;
    var queue = this._pendingStateQueue;
    var replace = this._pendingReplaceState;
    this._pendingReplaceState = false;
    this._pendingStateQueue = null;

    if (!queue) {
      return inst.state;
    }

    if (replace && queue.length === 1) {
      return queue[0];
    }

    var nextState = index({}, replace ? queue[0] : inst.state);
    for (var i = replace ? 1 : 0; i < queue.length; i++) {
      var partial = queue[i];
      index(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
    }

    return nextState;
  },

  /**
   * Merges new props and state, notifies delegate methods of update and
   * performs update.
   *
   * @param {ReactElement} nextElement Next element
   * @param {object} nextProps Next public object to set as properties.
   * @param {?object} nextState Next object to set as state.
   * @param {?object} nextContext Next public object to set as context.
   * @param {ReactReconcileTransaction} transaction
   * @param {?object} unmaskedContext
   * @private
   */
  _performComponentUpdate: function (nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
    var _this2 = this;

    var inst = this._instance;

    var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
    var prevProps;
    var prevState;
    var prevContext;
    if (hasComponentDidUpdate) {
      prevProps = inst.props;
      prevState = inst.state;
      prevContext = inst.context;
    }

    if (inst.componentWillUpdate) {
      {
        inst.componentWillUpdate(nextProps, nextState, nextContext);
      }
    }

    this._currentElement = nextElement;
    this._context = unmaskedContext;
    inst.props = nextProps;
    inst.state = nextState;
    inst.context = nextContext;

    this._updateRenderedComponent(transaction, unmaskedContext);

    if (hasComponentDidUpdate) {
      {
        transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
      }
    }
  },

  /**
   * Call the component's `render` method and update the DOM accordingly.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  _updateRenderedComponent: function (transaction, context) {
    var prevComponentInstance = this._renderedComponent;
    var prevRenderedElement = prevComponentInstance._currentElement;
    var nextRenderedElement = this._renderValidatedComponent();

    var debugID = 0;
    if (shouldUpdateReactComponent_1(prevRenderedElement, nextRenderedElement)) {
      ReactReconciler_1.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
    } else {
      var oldHostNode = ReactReconciler_1.getHostNode(prevComponentInstance);
      ReactReconciler_1.unmountComponent(prevComponentInstance, false);

      var nodeType = ReactNodeTypes_1.getType(nextRenderedElement);
      this._renderedNodeType = nodeType;
      var child = this._instantiateReactComponent(nextRenderedElement, nodeType !== ReactNodeTypes_1.EMPTY /* shouldHaveDebugID */
      );
      this._renderedComponent = child;

      var nextMarkup = ReactReconciler_1.mountComponent(child, transaction, this._hostParent, this._hostContainerInfo, this._processChildContext(context), debugID);

      this._replaceNodeWithMarkup(oldHostNode, nextMarkup, prevComponentInstance);
    }
  },

  /**
   * Overridden in shallow rendering.
   *
   * @protected
   */
  _replaceNodeWithMarkup: function (oldHostNode, nextMarkup, prevInstance) {
    ReactComponentEnvironment_1.replaceNodeWithMarkup(oldHostNode, nextMarkup, prevInstance);
  },

  /**
   * @protected
   */
  _renderValidatedComponentWithoutOwnerOrContext: function () {
    var inst = this._instance;
    var renderedElement;

    {
      renderedElement = inst.render();
    }

    return renderedElement;
  },

  /**
   * @private
   */
  _renderValidatedComponent: function () {
    var renderedElement;
    if ("production" !== 'production' || this._compositeType !== CompositeTypes.StatelessFunctional) {
      ReactCurrentOwner_1.current = this;
      try {
        renderedElement = this._renderValidatedComponentWithoutOwnerOrContext();
      } finally {
        ReactCurrentOwner_1.current = null;
      }
    } else {
      renderedElement = this._renderValidatedComponentWithoutOwnerOrContext();
    }
    !(
    // TODO: An `isValidNode` function would probably be more appropriate
    renderedElement === null || renderedElement === false || React_1.isValidElement(renderedElement)) ? reactProdInvariant_1$2('109', this.getName() || 'ReactCompositeComponent') : void 0;

    return renderedElement;
  },

  /**
   * Lazily allocates the refs object and stores `component` as `ref`.
   *
   * @param {string} ref Reference name.
   * @param {component} component Component to store as `ref`.
   * @final
   * @private
   */
  attachRef: function (ref, component) {
    var inst = this.getPublicInstance();
    !(inst != null) ? reactProdInvariant_1$2('110') : void 0;
    var publicComponentInstance = component.getPublicInstance();
    var refs = inst.refs === emptyObject_1 ? inst.refs = {} : inst.refs;
    refs[ref] = publicComponentInstance;
  },

  /**
   * Detaches a reference name.
   *
   * @param {string} ref Name to dereference.
   * @final
   * @private
   */
  detachRef: function (ref) {
    var refs = this.getPublicInstance().refs;
    delete refs[ref];
  },

  /**
   * Get a text description of the component that can be used to identify it
   * in error messages.
   * @return {string} The name or null.
   * @internal
   */
  getName: function () {
    var type = this._currentElement.type;
    var constructor = this._instance && this._instance.constructor;
    return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
  },

  /**
   * Get the publicly accessible representation of this component - i.e. what
   * is exposed by refs and returned by render. Can be null for stateless
   * components.
   *
   * @return {ReactComponent} the public component instance.
   * @internal
   */
  getPublicInstance: function () {
    var inst = this._instance;
    if (this._compositeType === CompositeTypes.StatelessFunctional) {
      return null;
    }
    return inst;
  },

  // Stub
  _instantiateReactComponent: null
};

var ReactCompositeComponent_1 = ReactCompositeComponent;

/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var emptyComponentFactory;

var ReactEmptyComponentInjection = {
  injectEmptyComponentFactory: function (factory) {
    emptyComponentFactory = factory;
  }
};

var ReactEmptyComponent = {
  create: function (instantiate) {
    return emptyComponentFactory(instantiate);
  }
};

ReactEmptyComponent.injection = ReactEmptyComponentInjection;

var ReactEmptyComponent_1 = ReactEmptyComponent;

var genericComponentClass = null;
var textComponentClass = null;

var ReactHostComponentInjection = {
  // This accepts a class that receives the tag string. This is a catch all
  // that can render any kind of tag.
  injectGenericComponentClass: function (componentClass) {
    genericComponentClass = componentClass;
  },
  // This accepts a text component class that takes the text string to be
  // rendered as props.
  injectTextComponentClass: function (componentClass) {
    textComponentClass = componentClass;
  }
};

/**
 * Get a host internal component class for a specific tag.
 *
 * @param {ReactElement} element The element to create.
 * @return {function} The internal class constructor function.
 */
function createInternalComponent(element) {
  !genericComponentClass ? reactProdInvariant_1$2('111', element.type) : void 0;
  return new genericComponentClass(element);
}

/**
 * @param {ReactText} text
 * @return {ReactComponent}
 */
function createInstanceForText(text) {
  return new textComponentClass(text);
}

/**
 * @param {ReactComponent} component
 * @return {boolean}
 */
function isTextComponent(component) {
  return component instanceof textComponentClass;
}

var ReactHostComponent = {
  createInternalComponent: createInternalComponent,
  createInstanceForText: createInstanceForText,
  isTextComponent: isTextComponent,
  injection: ReactHostComponentInjection
};

var ReactHostComponent_1 = ReactHostComponent;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

// To avoid a cyclic dependency, we create the final class in this module
var ReactCompositeComponentWrapper = function (element) {
  this.construct(element);
};

function getDeclarationErrorAddendum$4(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Check if the type reference is a known internal type. I.e. not a user
 * provided composite type.
 *
 * @param {function} type
 * @return {boolean} Returns true if this is a valid internal type.
 */
function isInternalComponentType(type) {
  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
}

/**
 * Given a ReactNode, create an instance that will actually be mounted.
 *
 * @param {ReactNode} node
 * @param {boolean} shouldHaveDebugID
 * @return {object} A new instance of the element's constructor.
 * @protected
 */
function instantiateReactComponent(node, shouldHaveDebugID) {
  var instance;

  if (node === null || node === false) {
    instance = ReactEmptyComponent_1.create(instantiateReactComponent);
  } else if (typeof node === 'object') {
    var element = node;
    var type = element.type;
    if (typeof type !== 'function' && typeof type !== 'string') {
      var info = '';
      info += getDeclarationErrorAddendum$4(element._owner);
      reactProdInvariant_1$2('130', type == null ? type : typeof type, info);
    }

    // Special case string values
    if (typeof element.type === 'string') {
      instance = ReactHostComponent_1.createInternalComponent(element);
    } else if (isInternalComponentType(element.type)) {
      // This is temporarily available for custom components that are not string
      // representations. I.e. ART. Once those are updated to use the string
      // representation, we can drop this code path.
      instance = new element.type(element);

      // We renamed this. Allow the old name for compat. :(
      if (!instance.getHostNode) {
        instance.getHostNode = instance.getNativeNode;
      }
    } else {
      instance = new ReactCompositeComponentWrapper(element);
    }
  } else if (typeof node === 'string' || typeof node === 'number') {
    instance = ReactHostComponent_1.createInstanceForText(node);
  } else {
    reactProdInvariant_1$2('131', typeof node);
  }

  instance._mountIndex = 0;
  instance._mountImage = null;

  return instance;
}

index(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent_1, {
  _instantiateReactComponent: instantiateReactComponent
});

var instantiateReactComponent_1 = instantiateReactComponent;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape$2(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape$2(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils$2 = {
  escape: escape$2,
  unescape: unescape$2
};

var KeyEscapeUtils_1$2 = KeyEscapeUtils$2;

/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE$2 = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var ReactElementSymbol$2 = REACT_ELEMENT_TYPE$2;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/* global Symbol */

var ITERATOR_SYMBOL$1 = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL$1 = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn$2(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL$1 && maybeIterable[ITERATOR_SYMBOL$1] || maybeIterable[FAUX_ITERATOR_SYMBOL$1]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

var getIteratorFn_1$2 = getIteratorFn$2;

var SEPARATOR$1 = '.';
var SUBSEPARATOR$1 = ':';

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey$1(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils_1$2.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl$1(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === ReactElementSymbol$2) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR$1 + getComponentKey$1(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR$1 : nameSoFar + SUBSEPARATOR$1;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey$1(child, i);
      subtreeCount += traverseAllChildrenImpl$1(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn_1$2(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey$1(child, ii++);
          subtreeCount += traverseAllChildrenImpl$1(child, nextName, callback, traverseContext);
        }
      } else {
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils_1$2.escape(entry[0]) + SUBSEPARATOR$1 + getComponentKey$1(child, 0);
            subtreeCount += traverseAllChildrenImpl$1(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      var childrenString = String(children);
      reactProdInvariant_1$2('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren$2(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl$1(children, '', callback, traverseContext);
}

var traverseAllChildren_1$2 = traverseAllChildren$2;

var ReactComponentTreeHook$2;

if (typeof process !== 'undefined' && process.env && "production" === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook$2 = ReactComponentTreeHook_1;
}

function instantiateChild(childInstances, child, name, selfDebugID) {
  // We found a component instance.
  var keyUnique = childInstances[name] === undefined;
  if (child != null && keyUnique) {
    childInstances[name] = instantiateReactComponent_1(child, true);
  }
}

/**
 * ReactChildReconciler provides helpers for initializing or updating a set of
 * children. Its output is suitable for passing it onto ReactMultiChild which
 * does diffed reordering and insertion.
 */
var ReactChildReconciler = {
  /**
   * Generates a "mount image" for each of the supplied children. In the case
   * of `ReactDOMComponent`, a mount image is a string of markup.
   *
   * @param {?object} nestedChildNodes Nested child maps.
   * @return {?object} A set of child instances.
   * @internal
   */
  instantiateChildren: function (nestedChildNodes, transaction, context, selfDebugID) // 0 in production and for roots
  {
    if (nestedChildNodes == null) {
      return null;
    }
    var childInstances = {};

    {
      traverseAllChildren_1$2(nestedChildNodes, instantiateChild, childInstances);
    }
    return childInstances;
  },

  /**
   * Updates the rendered children and returns a new set of children.
   *
   * @param {?object} prevChildren Previously initialized set of children.
   * @param {?object} nextChildren Flat child element maps.
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   * @return {?object} A new set of child instances.
   * @internal
   */
  updateChildren: function (prevChildren, nextChildren, mountImages, removedNodes, transaction, hostParent, hostContainerInfo, context, selfDebugID) // 0 in production and for roots
  {
    // We currently don't have a way to track moves here but if we use iterators
    // instead of for..in we can zip the iterators and check if an item has
    // moved.
    // TODO: If nothing has changed, return the prevChildren object so that we
    // can quickly bailout if nothing has changed.
    if (!nextChildren && !prevChildren) {
      return;
    }
    var name;
    var prevChild;
    for (name in nextChildren) {
      if (!nextChildren.hasOwnProperty(name)) {
        continue;
      }
      prevChild = prevChildren && prevChildren[name];
      var prevElement = prevChild && prevChild._currentElement;
      var nextElement = nextChildren[name];
      if (prevChild != null && shouldUpdateReactComponent_1(prevElement, nextElement)) {
        ReactReconciler_1.receiveComponent(prevChild, nextElement, transaction, context);
        nextChildren[name] = prevChild;
      } else {
        if (prevChild) {
          removedNodes[name] = ReactReconciler_1.getHostNode(prevChild);
          ReactReconciler_1.unmountComponent(prevChild, false);
        }
        // The child must be instantiated before it's mounted.
        var nextChildInstance = instantiateReactComponent_1(nextElement, true);
        nextChildren[name] = nextChildInstance;
        // Creating mount image now ensures refs are resolved in right order
        // (see https://github.com/facebook/react/pull/7101 for explanation).
        var nextChildMountImage = ReactReconciler_1.mountComponent(nextChildInstance, transaction, hostParent, hostContainerInfo, context, selfDebugID);
        mountImages.push(nextChildMountImage);
      }
    }
    // Unmount children that are no longer present.
    for (name in prevChildren) {
      if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
        prevChild = prevChildren[name];
        removedNodes[name] = ReactReconciler_1.getHostNode(prevChild);
        ReactReconciler_1.unmountComponent(prevChild, false);
      }
    }
  },

  /**
   * Unmounts all rendered children. This should be used to clean up children
   * when this component is unmounted.
   *
   * @param {?object} renderedChildren Previously initialized set of children.
   * @internal
   */
  unmountChildren: function (renderedChildren, safely) {
    for (var name in renderedChildren) {
      if (renderedChildren.hasOwnProperty(name)) {
        var renderedChild = renderedChildren[name];
        ReactReconciler_1.unmountComponent(renderedChild, safely);
      }
    }
  }
};

var ReactChildReconciler_1 = ReactChildReconciler;

var ReactComponentTreeHook$4;

if (typeof process !== 'undefined' && process.env && "production" === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook$4 = ReactComponentTreeHook_1;
}

/**
 * @param {function} traverseContext Context passed through traversal.
 * @param {?ReactComponent} child React child component.
 * @param {!string} name String name of key path to child.
 * @param {number=} selfDebugID Optional debugID of the current internal instance.
 */
function flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID) {
  // We found a component instance.
  if (traverseContext && typeof traverseContext === 'object') {
    var result = traverseContext;
    var keyUnique = result[name] === undefined;
    if (keyUnique && child != null) {
      result[name] = child;
    }
  }
}

/**
 * Flattens children that are typically specified as `props.children`. Any null
 * children will not be included in the resulting object.
 * @return {!object} flattened children keyed by name.
 */
function flattenChildren$1(children, selfDebugID) {
  if (children == null) {
    return children;
  }
  var result = {};

  {
    traverseAllChildren_1$2(children, flattenSingleChildIntoContext, result);
  }
  return result;
}

var flattenChildren_1 = flattenChildren$1;

/**
 * Make an update for markup to be rendered and inserted at a supplied index.
 *
 * @param {string} markup Markup that renders into an element.
 * @param {number} toIndex Destination index.
 * @private
 */
function makeInsertMarkup(markup, afterNode, toIndex) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'INSERT_MARKUP',
    content: markup,
    fromIndex: null,
    fromNode: null,
    toIndex: toIndex,
    afterNode: afterNode
  };
}

/**
 * Make an update for moving an existing element to another index.
 *
 * @param {number} fromIndex Source index of the existing element.
 * @param {number} toIndex Destination index of the element.
 * @private
 */
function makeMove(child, afterNode, toIndex) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'MOVE_EXISTING',
    content: null,
    fromIndex: child._mountIndex,
    fromNode: ReactReconciler_1.getHostNode(child),
    toIndex: toIndex,
    afterNode: afterNode
  };
}

/**
 * Make an update for removing an element at an index.
 *
 * @param {number} fromIndex Index of the element to remove.
 * @private
 */
function makeRemove(child, node) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'REMOVE_NODE',
    content: null,
    fromIndex: child._mountIndex,
    fromNode: node,
    toIndex: null,
    afterNode: null
  };
}

/**
 * Make an update for setting the markup of a node.
 *
 * @param {string} markup Markup that renders into an element.
 * @private
 */
function makeSetMarkup(markup) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'SET_MARKUP',
    content: markup,
    fromIndex: null,
    fromNode: null,
    toIndex: null,
    afterNode: null
  };
}

/**
 * Make an update for setting the text content.
 *
 * @param {string} textContent Text content to set.
 * @private
 */
function makeTextContent(textContent) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'TEXT_CONTENT',
    content: textContent,
    fromIndex: null,
    fromNode: null,
    toIndex: null,
    afterNode: null
  };
}

/**
 * Push an update, if any, onto the queue. Creates a new queue if none is
 * passed and always returns the queue. Mutative.
 */
function enqueue(queue, update) {
  if (update) {
    queue = queue || [];
    queue.push(update);
  }
  return queue;
}

/**
 * Processes any enqueued updates.
 *
 * @private
 */
function processQueue(inst, updateQueue) {
  ReactComponentEnvironment_1.processChildrenUpdates(inst, updateQueue);
}

/**
 * ReactMultiChild are capable of reconciling multiple children.
 *
 * @class ReactMultiChild
 * @internal
 */
var ReactMultiChild = {
  /**
   * Provides common functionality for components that must reconcile multiple
   * children. This is used by `ReactDOMComponent` to mount, update, and
   * unmount child components.
   *
   * @lends {ReactMultiChild.prototype}
   */
  Mixin: {
    _reconcilerInstantiateChildren: function (nestedChildren, transaction, context) {
      return ReactChildReconciler_1.instantiateChildren(nestedChildren, transaction, context);
    },

    _reconcilerUpdateChildren: function (prevChildren, nextNestedChildrenElements, mountImages, removedNodes, transaction, context) {
      var nextChildren;
      var selfDebugID = 0;
      nextChildren = flattenChildren_1(nextNestedChildrenElements, selfDebugID);
      ReactChildReconciler_1.updateChildren(prevChildren, nextChildren, mountImages, removedNodes, transaction, this, this._hostContainerInfo, context, selfDebugID);
      return nextChildren;
    },

    /**
     * Generates a "mount image" for each of the supplied children. In the case
     * of `ReactDOMComponent`, a mount image is a string of markup.
     *
     * @param {?object} nestedChildren Nested child maps.
     * @return {array} An array of mounted representations.
     * @internal
     */
    mountChildren: function (nestedChildren, transaction, context) {
      var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
      this._renderedChildren = children;

      var mountImages = [];
      var index = 0;
      for (var name in children) {
        if (children.hasOwnProperty(name)) {
          var child = children[name];
          var selfDebugID = 0;
          var mountImage = ReactReconciler_1.mountComponent(child, transaction, this, this._hostContainerInfo, context, selfDebugID);
          child._mountIndex = index++;
          mountImages.push(mountImage);
        }
      }

      return mountImages;
    },

    /**
     * Replaces any rendered children with a text content string.
     *
     * @param {string} nextContent String of content.
     * @internal
     */
    updateTextContent: function (nextContent) {
      var prevChildren = this._renderedChildren;
      // Remove any rendered children.
      ReactChildReconciler_1.unmountChildren(prevChildren, false);
      for (var name in prevChildren) {
        if (prevChildren.hasOwnProperty(name)) {
          reactProdInvariant_1$2('118');
        }
      }
      // Set new text content.
      var updates = [makeTextContent(nextContent)];
      processQueue(this, updates);
    },

    /**
     * Replaces any rendered children with a markup string.
     *
     * @param {string} nextMarkup String of markup.
     * @internal
     */
    updateMarkup: function (nextMarkup) {
      var prevChildren = this._renderedChildren;
      // Remove any rendered children.
      ReactChildReconciler_1.unmountChildren(prevChildren, false);
      for (var name in prevChildren) {
        if (prevChildren.hasOwnProperty(name)) {
          reactProdInvariant_1$2('118');
        }
      }
      var updates = [makeSetMarkup(nextMarkup)];
      processQueue(this, updates);
    },

    /**
     * Updates the rendered children with new children.
     *
     * @param {?object} nextNestedChildrenElements Nested child element maps.
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    updateChildren: function (nextNestedChildrenElements, transaction, context) {
      // Hook used by React ART
      this._updateChildren(nextNestedChildrenElements, transaction, context);
    },

    /**
     * @param {?object} nextNestedChildrenElements Nested child element maps.
     * @param {ReactReconcileTransaction} transaction
     * @final
     * @protected
     */
    _updateChildren: function (nextNestedChildrenElements, transaction, context) {
      var prevChildren = this._renderedChildren;
      var removedNodes = {};
      var mountImages = [];
      var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, mountImages, removedNodes, transaction, context);
      if (!nextChildren && !prevChildren) {
        return;
      }
      var updates = null;
      var name;
      // `nextIndex` will increment for each child in `nextChildren`, but
      // `lastIndex` will be the last index visited in `prevChildren`.
      var nextIndex = 0;
      var lastIndex = 0;
      // `nextMountIndex` will increment for each newly mounted child.
      var nextMountIndex = 0;
      var lastPlacedNode = null;
      for (name in nextChildren) {
        if (!nextChildren.hasOwnProperty(name)) {
          continue;
        }
        var prevChild = prevChildren && prevChildren[name];
        var nextChild = nextChildren[name];
        if (prevChild === nextChild) {
          updates = enqueue(updates, this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex));
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
          prevChild._mountIndex = nextIndex;
        } else {
          if (prevChild) {
            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            // The `removedNodes` loop below will actually remove the child.
          }
          // The child must be instantiated before it's mounted.
          updates = enqueue(updates, this._mountChildAtIndex(nextChild, mountImages[nextMountIndex], lastPlacedNode, nextIndex, transaction, context));
          nextMountIndex++;
        }
        nextIndex++;
        lastPlacedNode = ReactReconciler_1.getHostNode(nextChild);
      }
      // Remove children that are no longer present.
      for (name in removedNodes) {
        if (removedNodes.hasOwnProperty(name)) {
          updates = enqueue(updates, this._unmountChild(prevChildren[name], removedNodes[name]));
        }
      }
      if (updates) {
        processQueue(this, updates);
      }
      this._renderedChildren = nextChildren;

      
    },

    /**
     * Unmounts all rendered children. This should be used to clean up children
     * when this component is unmounted. It does not actually perform any
     * backend operations.
     *
     * @internal
     */
    unmountChildren: function (safely) {
      var renderedChildren = this._renderedChildren;
      ReactChildReconciler_1.unmountChildren(renderedChildren, safely);
      this._renderedChildren = null;
    },

    /**
     * Moves a child component to the supplied index.
     *
     * @param {ReactComponent} child Component to move.
     * @param {number} toIndex Destination index of the element.
     * @param {number} lastIndex Last index visited of the siblings of `child`.
     * @protected
     */
    moveChild: function (child, afterNode, toIndex, lastIndex) {
      // If the index of `child` is less than `lastIndex`, then it needs to
      // be moved. Otherwise, we do not need to move it because a child will be
      // inserted or moved before `child`.
      if (child._mountIndex < lastIndex) {
        return makeMove(child, afterNode, toIndex);
      }
    },

    /**
     * Creates a child component.
     *
     * @param {ReactComponent} child Component to create.
     * @param {string} mountImage Markup to insert.
     * @protected
     */
    createChild: function (child, afterNode, mountImage) {
      return makeInsertMarkup(mountImage, afterNode, child._mountIndex);
    },

    /**
     * Removes a child component.
     *
     * @param {ReactComponent} child Child to remove.
     * @protected
     */
    removeChild: function (child, node) {
      return makeRemove(child, node);
    },

    /**
     * Mounts a child with the supplied name.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to mount.
     * @param {string} name Name of the child.
     * @param {number} index Index at which to insert the child.
     * @param {ReactReconcileTransaction} transaction
     * @private
     */
    _mountChildAtIndex: function (child, mountImage, afterNode, index, transaction, context) {
      child._mountIndex = index;
      return this.createChild(child, afterNode, mountImage);
    },

    /**
     * Unmounts a rendered child.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to unmount.
     * @private
     */
    _unmountChild: function (child, node) {
      var update = this.removeChild(child, node);
      child._mountIndex = null;
      return update;
    }
  }
};

var ReactMultiChild_1 = ReactMultiChild;

function enqueueUpdate$1(internalInstance) {
  ReactUpdates_1.enqueueUpdate(internalInstance);
}

function formatUnexpectedArgument(arg) {
  var type = typeof arg;
  if (type !== 'object') {
    return type;
  }
  var displayName = arg.constructor && arg.constructor.name || type;
  var keys = Object.keys(arg);
  if (keys.length > 0 && keys.length < 20) {
    return displayName + ' (keys: ' + keys.join(', ') + ')';
  }
  return displayName;
}

function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
  var internalInstance = ReactInstanceMap_1.get(publicInstance);
  if (!internalInstance) {
    return null;
  }

  return internalInstance;
}

/**
 * ReactUpdateQueue allows for state updates to be scheduled into a later
 * reconciliation step.
 */
var ReactUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    var internalInstance = ReactInstanceMap_1.get(publicInstance);
    if (internalInstance) {
      // During componentWillMount and render this will still be null but after
      // that will always render to something. At least for now. So we can use
      // this hack.
      return !!internalInstance._renderedComponent;
    } else {
      return false;
    }
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @param {string} callerName Name of the calling function in the public API.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback, callerName) {
    ReactUpdateQueue.validateCallback(callback, callerName);
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);

    // Previously we would throw an error if we didn't have an internal
    // instance. Since we want to make it a no-op instead, we mirror the same
    // behavior we have in other enqueue* methods.
    // We also need to ignore callbacks in componentWillMount. See
    // enqueueUpdates.
    if (!internalInstance) {
      return null;
    }

    if (internalInstance._pendingCallbacks) {
      internalInstance._pendingCallbacks.push(callback);
    } else {
      internalInstance._pendingCallbacks = [callback];
    }
    // TODO: The callback here is ignored when setState is called from
    // componentWillMount. Either fix it or disallow doing so completely in
    // favor of getInitialState. Alternatively, we can disallow
    // componentWillMount during server-side rendering.
    enqueueUpdate$1(internalInstance);
  },

  enqueueCallbackInternal: function (internalInstance, callback) {
    if (internalInstance._pendingCallbacks) {
      internalInstance._pendingCallbacks.push(callback);
    } else {
      internalInstance._pendingCallbacks = [callback];
    }
    enqueueUpdate$1(internalInstance);
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'forceUpdate');

    if (!internalInstance) {
      return;
    }

    internalInstance._pendingForceUpdate = true;

    enqueueUpdate$1(internalInstance);
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceState');

    if (!internalInstance) {
      return;
    }

    internalInstance._pendingStateQueue = [completeState];
    internalInstance._pendingReplaceState = true;

    // Future-proof 15.5
    if (callback !== undefined && callback !== null) {
      ReactUpdateQueue.validateCallback(callback, 'replaceState');
      if (internalInstance._pendingCallbacks) {
        internalInstance._pendingCallbacks.push(callback);
      } else {
        internalInstance._pendingCallbacks = [callback];
      }
    }

    enqueueUpdate$1(internalInstance);
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');

    if (!internalInstance) {
      return;
    }

    var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    enqueueUpdate$1(internalInstance);
  },

  enqueueElementInternal: function (internalInstance, nextElement, nextContext) {
    internalInstance._pendingElement = nextElement;
    // TODO: introduce _pendingContext instead of setting it directly.
    internalInstance._context = nextContext;
    enqueueUpdate$1(internalInstance);
  },

  validateCallback: function (callback, callerName) {
    !(!callback || typeof callback === 'function') ? reactProdInvariant_1$2('122', callerName, formatUnexpectedArgument(callback)) : void 0;
  }
};

var ReactUpdateQueue_1 = ReactUpdateQueue;

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





function warnNoop$1(publicInstance, callerName) {
  
}

/**
 * This is the update queue used for server rendering.
 * It delegates to ReactUpdateQueue while server rendering is in progress and
 * switches to ReactNoopUpdateQueue after the transaction has completed.
 * @class ReactServerUpdateQueue
 * @param {Transaction} transaction
 */

var ReactServerUpdateQueue = function () {
  function ReactServerUpdateQueue(transaction) {
    _classCallCheck$1(this, ReactServerUpdateQueue);

    this.transaction = transaction;
  }

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */


  ReactServerUpdateQueue.prototype.isMounted = function isMounted(publicInstance) {
    return false;
  };

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */


  ReactServerUpdateQueue.prototype.enqueueCallback = function enqueueCallback(publicInstance, callback, callerName) {
    if (this.transaction.isInTransaction()) {
      ReactUpdateQueue_1.enqueueCallback(publicInstance, callback, callerName);
    }
  };

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */


  ReactServerUpdateQueue.prototype.enqueueForceUpdate = function enqueueForceUpdate(publicInstance) {
    if (this.transaction.isInTransaction()) {
      ReactUpdateQueue_1.enqueueForceUpdate(publicInstance);
    } else {
      warnNoop$1(publicInstance, 'forceUpdate');
    }
  };

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object|function} completeState Next state.
   * @internal
   */


  ReactServerUpdateQueue.prototype.enqueueReplaceState = function enqueueReplaceState(publicInstance, completeState) {
    if (this.transaction.isInTransaction()) {
      ReactUpdateQueue_1.enqueueReplaceState(publicInstance, completeState);
    } else {
      warnNoop$1(publicInstance, 'replaceState');
    }
  };

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object|function} partialState Next partial state to be merged with state.
   * @internal
   */


  ReactServerUpdateQueue.prototype.enqueueSetState = function enqueueSetState(publicInstance, partialState) {
    if (this.transaction.isInTransaction()) {
      ReactUpdateQueue_1.enqueueSetState(publicInstance, partialState);
    } else {
      warnNoop$1(publicInstance, 'setState');
    }
  };

  return ReactServerUpdateQueue;
}();

var ReactServerUpdateQueue_1 = ReactServerUpdateQueue;

/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
var TRANSACTION_WRAPPERS$1 = [];

var noopCallbackQueue = {
  enqueue: function () {}
};

/**
 * @class ReactServerRenderingTransaction
 * @param {boolean} renderToStaticMarkup
 */
function ReactServerRenderingTransaction(renderToStaticMarkup) {
  this.reinitializeTransaction();
  this.renderToStaticMarkup = renderToStaticMarkup;
  this.useCreateElement = false;
  this.updateQueue = new ReactServerUpdateQueue_1(this);
}

var Mixin = {
  /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array} Empty list of operation wrap procedures.
   */
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS$1;
  },

  /**
   * @return {object} The queue to collect `onDOMReady` callbacks with.
   */
  getReactMountReady: function () {
    return noopCallbackQueue;
  },

  /**
   * @return {object} The queue to collect React async events.
   */
  getUpdateQueue: function () {
    return this.updateQueue;
  },

  /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be reused.
   */
  destructor: function () {},

  checkpoint: function () {},

  rollback: function () {}
};

index(ReactServerRenderingTransaction.prototype, Transaction, Mixin);

PooledClass_1$2.addPoolingTo(ReactServerRenderingTransaction);

var ReactServerRenderingTransaction_1 = ReactServerRenderingTransaction;

var Flags$1 = ReactDOMComponentFlags_1;
var deleteListener = EventPluginHub_1.deleteListener;
var getNode = ReactDOMComponentTree_1.getNodeFromInstance;
var listenTo = ReactBrowserEventEmitter_1.listenTo;
var registrationNameModules = EventPluginRegistry_1.registrationNameModules;

// For quickly matching children type, to test if can be treated as content.
var CONTENT_TYPES = { string: true, number: true };

var STYLE = 'style';
var HTML = '__html';
var RESERVED_PROPS$1 = {
  children: null,
  dangerouslySetInnerHTML: null,
  suppressContentEditableWarning: null
};

// Node type for document fragments (Node.DOCUMENT_FRAGMENT_NODE).
var DOC_FRAGMENT_TYPE = 11;

function getDeclarationErrorAddendum$1(internalInstance) {
  if (internalInstance) {
    var owner = internalInstance._currentElement._owner || null;
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' This DOM node was rendered by `' + name + '`.';
      }
    }
  }
  return '';
}

/**
 * @param {object} component
 * @param {?object} props
 */
function assertValidProps(component, props) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  if (voidElementTags[component._tag]) {
    !(props.children == null && props.dangerouslySetInnerHTML == null) ? reactProdInvariant_1$2('137', component._tag, component._currentElement._owner ? ' Check the render method of ' + component._currentElement._owner.getName() + '.' : '') : void 0;
  }
  if (props.dangerouslySetInnerHTML != null) {
    !(props.children == null) ? reactProdInvariant_1$2('60') : void 0;
    !(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML) ? reactProdInvariant_1$2('61') : void 0;
  }
  !(props.style == null || typeof props.style === 'object') ? reactProdInvariant_1$2('62', getDeclarationErrorAddendum$1(component)) : void 0;
}

function enqueuePutListener(inst, registrationName, listener, transaction) {
  if (transaction instanceof ReactServerRenderingTransaction_1) {
    return;
  }
  var containerInfo = inst._hostContainerInfo;
  var isDocumentFragment = containerInfo._node && containerInfo._node.nodeType === DOC_FRAGMENT_TYPE;
  var doc = isDocumentFragment ? containerInfo._node : containerInfo._ownerDocument;
  listenTo(registrationName, doc);
  transaction.getReactMountReady().enqueue(putListener, {
    inst: inst,
    registrationName: registrationName,
    listener: listener
  });
}

function putListener() {
  var listenerToPut = this;
  EventPluginHub_1.putListener(listenerToPut.inst, listenerToPut.registrationName, listenerToPut.listener);
}

function inputPostMount() {
  var inst = this;
  ReactDOMInput_1.postMountWrapper(inst);
}

function textareaPostMount() {
  var inst = this;
  ReactDOMTextarea_1.postMountWrapper(inst);
}

function optionPostMount() {
  var inst = this;
  ReactDOMOption_1.postMountWrapper(inst);
}

// There are so many media events, it makes sense to just
// maintain a list rather than create a `trapBubbledEvent` for each
var mediaEvents = {
  topAbort: 'abort',
  topCanPlay: 'canplay',
  topCanPlayThrough: 'canplaythrough',
  topDurationChange: 'durationchange',
  topEmptied: 'emptied',
  topEncrypted: 'encrypted',
  topEnded: 'ended',
  topError: 'error',
  topLoadedData: 'loadeddata',
  topLoadedMetadata: 'loadedmetadata',
  topLoadStart: 'loadstart',
  topPause: 'pause',
  topPlay: 'play',
  topPlaying: 'playing',
  topProgress: 'progress',
  topRateChange: 'ratechange',
  topSeeked: 'seeked',
  topSeeking: 'seeking',
  topStalled: 'stalled',
  topSuspend: 'suspend',
  topTimeUpdate: 'timeupdate',
  topVolumeChange: 'volumechange',
  topWaiting: 'waiting'
};

function trackInputValue() {
  inputValueTracking_1.track(this);
}

function trapBubbledEventsLocal() {
  var inst = this;
  // If a component renders to null or if another component fatals and causes
  // the state of the tree to be corrupted, `node` here can be null.
  !inst._rootNodeID ? reactProdInvariant_1$2('63') : void 0;
  var node = getNode(inst);
  !node ? reactProdInvariant_1$2('64') : void 0;

  switch (inst._tag) {
    case 'iframe':
    case 'object':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter_1.trapBubbledEvent('topLoad', 'load', node)];
      break;
    case 'video':
    case 'audio':
      inst._wrapperState.listeners = [];
      // Create listener for each media event
      for (var event in mediaEvents) {
        if (mediaEvents.hasOwnProperty(event)) {
          inst._wrapperState.listeners.push(ReactBrowserEventEmitter_1.trapBubbledEvent(event, mediaEvents[event], node));
        }
      }
      break;
    case 'source':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter_1.trapBubbledEvent('topError', 'error', node)];
      break;
    case 'img':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter_1.trapBubbledEvent('topError', 'error', node), ReactBrowserEventEmitter_1.trapBubbledEvent('topLoad', 'load', node)];
      break;
    case 'form':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter_1.trapBubbledEvent('topReset', 'reset', node), ReactBrowserEventEmitter_1.trapBubbledEvent('topSubmit', 'submit', node)];
      break;
    case 'input':
    case 'select':
    case 'textarea':
      inst._wrapperState.listeners = [ReactBrowserEventEmitter_1.trapBubbledEvent('topInvalid', 'invalid', node)];
      break;
  }
}

function postUpdateSelectWrapper() {
  ReactDOMSelect_1.postUpdateWrapper(this);
}

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.

var omittedCloseTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
  // NOTE: menuitem's close tag should be omitted, but that causes problems.
};

var newlineEatingTags = {
  listing: true,
  pre: true,
  textarea: true
};

// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.

var voidElementTags = index({
  menuitem: true
}, omittedCloseTags);

// We accept any tag to be rendered but since this gets injected into arbitrary
// HTML, we want to make sure that it's a safe tag.
// http://www.w3.org/TR/REC-xml/#NT-Name

var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset
var validatedTagCache = {};
var hasOwnProperty$2 = {}.hasOwnProperty;

function validateDangerousTag(tag) {
  if (!hasOwnProperty$2.call(validatedTagCache, tag)) {
    !VALID_TAG_REGEX.test(tag) ? reactProdInvariant_1$2('65', tag) : void 0;
    validatedTagCache[tag] = true;
  }
}

function isCustomComponent(tagName, props) {
  return tagName.indexOf('-') >= 0 || props.is != null;
}

var globalIdCounter = 1;

/**
 * Creates a new React class that is idempotent and capable of containing other
 * React components. It accepts event listeners and DOM properties that are
 * valid according to `DOMProperty`.
 *
 *  - Event listeners: `onClick`, `onMouseDown`, etc.
 *  - DOM properties: `className`, `name`, `title`, etc.
 *
 * The `style` property functions differently from the DOM API. It accepts an
 * object mapping of style properties to values.
 *
 * @constructor ReactDOMComponent
 * @extends ReactMultiChild
 */
function ReactDOMComponent(element) {
  var tag = element.type;
  validateDangerousTag(tag);
  this._currentElement = element;
  this._tag = tag.toLowerCase();
  this._namespaceURI = null;
  this._renderedChildren = null;
  this._previousStyle = null;
  this._previousStyleCopy = null;
  this._hostNode = null;
  this._hostParent = null;
  this._rootNodeID = 0;
  this._domID = 0;
  this._hostContainerInfo = null;
  this._wrapperState = null;
  this._topLevelWrapper = null;
  this._flags = 0;
  
}

ReactDOMComponent.displayName = 'ReactDOMComponent';

ReactDOMComponent.Mixin = {
  /**
   * Generates root tag markup then recurses. This method has side effects and
   * is not idempotent.
   *
   * @internal
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {?ReactDOMComponent} the parent component instance
   * @param {?object} info about the host container
   * @param {object} context
   * @return {string} The computed markup.
   */
  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
    this._rootNodeID = globalIdCounter++;
    this._domID = hostContainerInfo._idCounter++;
    this._hostParent = hostParent;
    this._hostContainerInfo = hostContainerInfo;

    var props = this._currentElement.props;

    switch (this._tag) {
      case 'audio':
      case 'form':
      case 'iframe':
      case 'img':
      case 'link':
      case 'object':
      case 'source':
      case 'video':
        this._wrapperState = {
          listeners: null
        };
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
      case 'input':
        ReactDOMInput_1.mountWrapper(this, props, hostParent);
        props = ReactDOMInput_1.getHostProps(this, props);
        transaction.getReactMountReady().enqueue(trackInputValue, this);
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
      case 'option':
        ReactDOMOption_1.mountWrapper(this, props, hostParent);
        props = ReactDOMOption_1.getHostProps(this, props);
        break;
      case 'select':
        ReactDOMSelect_1.mountWrapper(this, props, hostParent);
        props = ReactDOMSelect_1.getHostProps(this, props);
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
      case 'textarea':
        ReactDOMTextarea_1.mountWrapper(this, props, hostParent);
        props = ReactDOMTextarea_1.getHostProps(this, props);
        transaction.getReactMountReady().enqueue(trackInputValue, this);
        transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
        break;
    }

    assertValidProps(this, props);

    // We create tags in the namespace of their parent container, except HTML
    // tags get no namespace.
    var namespaceURI;
    var parentTag;
    if (hostParent != null) {
      namespaceURI = hostParent._namespaceURI;
      parentTag = hostParent._tag;
    } else if (hostContainerInfo._tag) {
      namespaceURI = hostContainerInfo._namespaceURI;
      parentTag = hostContainerInfo._tag;
    }
    if (namespaceURI == null || namespaceURI === DOMNamespaces_1.svg && parentTag === 'foreignobject') {
      namespaceURI = DOMNamespaces_1.html;
    }
    if (namespaceURI === DOMNamespaces_1.html) {
      if (this._tag === 'svg') {
        namespaceURI = DOMNamespaces_1.svg;
      } else if (this._tag === 'math') {
        namespaceURI = DOMNamespaces_1.mathml;
      }
    }
    this._namespaceURI = namespaceURI;

    var mountImage;
    if (transaction.useCreateElement) {
      var ownerDocument = hostContainerInfo._ownerDocument;
      var el;
      if (namespaceURI === DOMNamespaces_1.html) {
        if (this._tag === 'script') {
          // Create the script via .innerHTML so its "parser-inserted" flag is
          // set to true and it does not execute
          var div = ownerDocument.createElement('div');
          var type = this._currentElement.type;
          div.innerHTML = '<' + type + '></' + type + '>';
          el = div.removeChild(div.firstChild);
        } else if (props.is) {
          el = ownerDocument.createElement(this._currentElement.type, props.is);
        } else {
          // Separate else branch instead of using `props.is || undefined` above becuase of a Firefox bug.
          // See discussion in https://github.com/facebook/react/pull/6896
          // and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
          el = ownerDocument.createElement(this._currentElement.type);
        }
      } else {
        el = ownerDocument.createElementNS(namespaceURI, this._currentElement.type);
      }
      ReactDOMComponentTree_1.precacheNode(this, el);
      this._flags |= Flags$1.hasCachedChildNodes;
      if (!this._hostParent) {
        DOMPropertyOperations_1.setAttributeForRoot(el);
      }
      this._updateDOMProperties(null, props, transaction);
      var lazyTree = DOMLazyTree_1(el);
      this._createInitialChildren(transaction, props, context, lazyTree);
      mountImage = lazyTree;
    } else {
      var tagOpen = this._createOpenTagMarkupAndPutListeners(transaction, props);
      var tagContent = this._createContentMarkup(transaction, props, context);
      if (!tagContent && omittedCloseTags[this._tag]) {
        mountImage = tagOpen + '/>';
      } else {
        mountImage = tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
      }
    }

    switch (this._tag) {
      case 'input':
        transaction.getReactMountReady().enqueue(inputPostMount, this);
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils_1.focusDOMComponent, this);
        }
        break;
      case 'textarea':
        transaction.getReactMountReady().enqueue(textareaPostMount, this);
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils_1.focusDOMComponent, this);
        }
        break;
      case 'select':
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils_1.focusDOMComponent, this);
        }
        break;
      case 'button':
        if (props.autoFocus) {
          transaction.getReactMountReady().enqueue(AutoFocusUtils_1.focusDOMComponent, this);
        }
        break;
      case 'option':
        transaction.getReactMountReady().enqueue(optionPostMount, this);
        break;
    }

    return mountImage;
  },

  /**
   * Creates markup for the open tag and all attributes.
   *
   * This method has side effects because events get registered.
   *
   * Iterating over object properties is faster than iterating over arrays.
   * @see http://jsperf.com/obj-vs-arr-iteration
   *
   * @private
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} props
   * @return {string} Markup of opening tag.
   */
  _createOpenTagMarkupAndPutListeners: function (transaction, props) {
    var ret = '<' + this._currentElement.type;

    for (var propKey in props) {
      if (!props.hasOwnProperty(propKey)) {
        continue;
      }
      var propValue = props[propKey];
      if (propValue == null) {
        continue;
      }
      if (registrationNameModules.hasOwnProperty(propKey)) {
        if (propValue) {
          enqueuePutListener(this, propKey, propValue, transaction);
        }
      } else {
        if (propKey === STYLE) {
          if (propValue) {
            propValue = this._previousStyleCopy = index({}, props.style);
          }
          propValue = CSSPropertyOperations_1.createMarkupForStyles(propValue, this);
        }
        var markup = null;
        if (this._tag != null && isCustomComponent(this._tag, props)) {
          if (!RESERVED_PROPS$1.hasOwnProperty(propKey)) {
            markup = DOMPropertyOperations_1.createMarkupForCustomAttribute(propKey, propValue);
          }
        } else {
          markup = DOMPropertyOperations_1.createMarkupForProperty(propKey, propValue);
        }
        if (markup) {
          ret += ' ' + markup;
        }
      }
    }

    // For static pages, no need to put React ID and checksum. Saves lots of
    // bytes.
    if (transaction.renderToStaticMarkup) {
      return ret;
    }

    if (!this._hostParent) {
      ret += ' ' + DOMPropertyOperations_1.createMarkupForRoot();
    }
    ret += ' ' + DOMPropertyOperations_1.createMarkupForID(this._domID);
    return ret;
  },

  /**
   * Creates markup for the content between the tags.
   *
   * @private
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} props
   * @param {object} context
   * @return {string} Content markup.
   */
  _createContentMarkup: function (transaction, props, context) {
    var ret = '';

    // Intentional use of != to avoid catching zero/false.
    var innerHTML = props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        ret = innerHTML.__html;
      }
    } else {
      var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
      var childrenToUse = contentToUse != null ? null : props.children;
      if (contentToUse != null) {
        // TODO: Validate that text is allowed as a child of this node
        ret = escapeTextContentForBrowser_1(contentToUse);
        
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(childrenToUse, transaction, context);
        ret = mountImages.join('');
      }
    }
    if (newlineEatingTags[this._tag] && ret.charAt(0) === '\n') {
      // text/html ignores the first character in these tags if it's a newline
      // Prefer to break application/xml over text/html (for now) by adding
      // a newline specifically to get eaten by the parser. (Alternately for
      // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
      // \r is normalized out by HTMLTextAreaElement#value.)
      // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
      // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
      // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
      // See: Parsing of "textarea" "listing" and "pre" elements
      //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
      return '\n' + ret;
    } else {
      return ret;
    }
  },

  _createInitialChildren: function (transaction, props, context, lazyTree) {
    // Intentional use of != to avoid catching zero/false.
    var innerHTML = props.dangerouslySetInnerHTML;
    if (innerHTML != null) {
      if (innerHTML.__html != null) {
        DOMLazyTree_1.queueHTML(lazyTree, innerHTML.__html);
      }
    } else {
      var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
      var childrenToUse = contentToUse != null ? null : props.children;
      // TODO: Validate that text is allowed as a child of this node
      if (contentToUse != null) {
        // Avoid setting textContent when the text is empty. In IE11 setting
        // textContent on a text area will cause the placeholder to not
        // show within the textarea until it has been focused and blurred again.
        // https://github.com/facebook/react/issues/6731#issuecomment-254874553
        if (contentToUse !== '') {
          DOMLazyTree_1.queueText(lazyTree, contentToUse);
        }
      } else if (childrenToUse != null) {
        var mountImages = this.mountChildren(childrenToUse, transaction, context);
        for (var i = 0; i < mountImages.length; i++) {
          DOMLazyTree_1.queueChild(lazyTree, mountImages[i]);
        }
      }
    }
  },

  /**
   * Receives a next element and updates the component.
   *
   * @internal
   * @param {ReactElement} nextElement
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {object} context
   */
  receiveComponent: function (nextElement, transaction, context) {
    var prevElement = this._currentElement;
    this._currentElement = nextElement;
    this.updateComponent(transaction, prevElement, nextElement, context);
  },

  /**
   * Updates a DOM component after it has already been allocated and
   * attached to the DOM. Reconciles the root DOM node, then recurses.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {ReactElement} prevElement
   * @param {ReactElement} nextElement
   * @internal
   * @overridable
   */
  updateComponent: function (transaction, prevElement, nextElement, context) {
    var lastProps = prevElement.props;
    var nextProps = this._currentElement.props;

    switch (this._tag) {
      case 'input':
        lastProps = ReactDOMInput_1.getHostProps(this, lastProps);
        nextProps = ReactDOMInput_1.getHostProps(this, nextProps);
        break;
      case 'option':
        lastProps = ReactDOMOption_1.getHostProps(this, lastProps);
        nextProps = ReactDOMOption_1.getHostProps(this, nextProps);
        break;
      case 'select':
        lastProps = ReactDOMSelect_1.getHostProps(this, lastProps);
        nextProps = ReactDOMSelect_1.getHostProps(this, nextProps);
        break;
      case 'textarea':
        lastProps = ReactDOMTextarea_1.getHostProps(this, lastProps);
        nextProps = ReactDOMTextarea_1.getHostProps(this, nextProps);
        break;
    }

    assertValidProps(this, nextProps);
    this._updateDOMProperties(lastProps, nextProps, transaction);
    this._updateDOMChildren(lastProps, nextProps, transaction, context);

    switch (this._tag) {
      case 'input':
        // Update the wrapper around inputs *after* updating props. This has to
        // happen after `_updateDOMProperties`. Otherwise HTML5 input validations
        // raise warnings and prevent the new value from being assigned.
        ReactDOMInput_1.updateWrapper(this);
        break;
      case 'textarea':
        ReactDOMTextarea_1.updateWrapper(this);
        break;
      case 'select':
        // <select> value update needs to occur after <option> children
        // reconciliation
        transaction.getReactMountReady().enqueue(postUpdateSelectWrapper, this);
        break;
    }
  },

  /**
   * Reconciles the properties by detecting differences in property values and
   * updating the DOM as necessary. This function is probably the single most
   * critical path for performance optimization.
   *
   * TODO: Benchmark whether checking for changed values in memory actually
   *       improves performance (especially statically positioned elements).
   * TODO: Benchmark the effects of putting this at the top since 99% of props
   *       do not change for a given reconciliation.
   * TODO: Benchmark areas that can be improved with caching.
   *
   * @private
   * @param {object} lastProps
   * @param {object} nextProps
   * @param {?DOMElement} node
   */
  _updateDOMProperties: function (lastProps, nextProps, transaction) {
    var propKey;
    var styleName;
    var styleUpdates;
    for (propKey in lastProps) {
      if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
        continue;
      }
      if (propKey === STYLE) {
        var lastStyle = this._previousStyleCopy;
        for (styleName in lastStyle) {
          if (lastStyle.hasOwnProperty(styleName)) {
            styleUpdates = styleUpdates || {};
            styleUpdates[styleName] = '';
          }
        }
        this._previousStyleCopy = null;
      } else if (registrationNameModules.hasOwnProperty(propKey)) {
        if (lastProps[propKey]) {
          // Only call deleteListener if there was a listener previously or
          // else willDeleteListener gets called when there wasn't actually a
          // listener (e.g., onClick={null})
          deleteListener(this, propKey);
        }
      } else if (isCustomComponent(this._tag, lastProps)) {
        if (!RESERVED_PROPS$1.hasOwnProperty(propKey)) {
          DOMPropertyOperations_1.deleteValueForAttribute(getNode(this), propKey);
        }
      } else if (DOMProperty_1.properties[propKey] || DOMProperty_1.isCustomAttribute(propKey)) {
        DOMPropertyOperations_1.deleteValueForProperty(getNode(this), propKey);
      }
    }
    for (propKey in nextProps) {
      var nextProp = nextProps[propKey];
      var lastProp = propKey === STYLE ? this._previousStyleCopy : lastProps != null ? lastProps[propKey] : undefined;
      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
        continue;
      }
      if (propKey === STYLE) {
        if (nextProp) {
          nextProp = this._previousStyleCopy = index({}, nextProp);
        } else {
          this._previousStyleCopy = null;
        }
        if (lastProp) {
          // Unset styles on `lastProp` but not on `nextProp`.
          for (styleName in lastProp) {
            if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = '';
            }
          }
          // Update styles that changed since `lastProp`.
          for (styleName in nextProp) {
            if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
              styleUpdates = styleUpdates || {};
              styleUpdates[styleName] = nextProp[styleName];
            }
          }
        } else {
          // Relies on `updateStylesByID` not mutating `styleUpdates`.
          styleUpdates = nextProp;
        }
      } else if (registrationNameModules.hasOwnProperty(propKey)) {
        if (nextProp) {
          enqueuePutListener(this, propKey, nextProp, transaction);
        } else if (lastProp) {
          deleteListener(this, propKey);
        }
      } else if (isCustomComponent(this._tag, nextProps)) {
        if (!RESERVED_PROPS$1.hasOwnProperty(propKey)) {
          DOMPropertyOperations_1.setValueForAttribute(getNode(this), propKey, nextProp);
        }
      } else if (DOMProperty_1.properties[propKey] || DOMProperty_1.isCustomAttribute(propKey)) {
        var node = getNode(this);
        // If we're updating to null or undefined, we should remove the property
        // from the DOM node instead of inadvertently setting to a string. This
        // brings us in line with the same behavior we have on initial render.
        if (nextProp != null) {
          DOMPropertyOperations_1.setValueForProperty(node, propKey, nextProp);
        } else {
          DOMPropertyOperations_1.deleteValueForProperty(node, propKey);
        }
      }
    }
    if (styleUpdates) {
      CSSPropertyOperations_1.setValueForStyles(getNode(this), styleUpdates, this);
    }
  },

  /**
   * Reconciles the children with the various properties that affect the
   * children content.
   *
   * @param {object} lastProps
   * @param {object} nextProps
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   */
  _updateDOMChildren: function (lastProps, nextProps, transaction, context) {
    var lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
    var nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;

    var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
    var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html;

    // Note the use of `!=` which checks for null or undefined.
    var lastChildren = lastContent != null ? null : lastProps.children;
    var nextChildren = nextContent != null ? null : nextProps.children;

    // If we're switching from children to content/html or vice versa, remove
    // the old content
    var lastHasContentOrHtml = lastContent != null || lastHtml != null;
    var nextHasContentOrHtml = nextContent != null || nextHtml != null;
    if (lastChildren != null && nextChildren == null) {
      this.updateChildren(null, transaction, context);
    } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
      this.updateTextContent('');
      
    }

    if (nextContent != null) {
      if (lastContent !== nextContent) {
        this.updateTextContent('' + nextContent);
        
      }
    } else if (nextHtml != null) {
      if (lastHtml !== nextHtml) {
        this.updateMarkup('' + nextHtml);
      }
      
    } else if (nextChildren != null) {
      this.updateChildren(nextChildren, transaction, context);
    }
  },

  getHostNode: function () {
    return getNode(this);
  },

  /**
   * Destroys all event registrations for this instance. Does not remove from
   * the DOM. That must be done by the parent.
   *
   * @internal
   */
  unmountComponent: function (safely) {
    switch (this._tag) {
      case 'audio':
      case 'form':
      case 'iframe':
      case 'img':
      case 'link':
      case 'object':
      case 'source':
      case 'video':
        var listeners = this._wrapperState.listeners;
        if (listeners) {
          for (var i = 0; i < listeners.length; i++) {
            listeners[i].remove();
          }
        }
        break;
      case 'input':
      case 'textarea':
        inputValueTracking_1.stopTracking(this);
        break;
      case 'html':
      case 'head':
      case 'body':
        /**
         * Components like <html> <head> and <body> can't be removed or added
         * easily in a cross-browser way, however it's valuable to be able to
         * take advantage of React's reconciliation for styling and <title>
         * management. So we just document it and throw in dangerous cases.
         */
        reactProdInvariant_1$2('66', this._tag);
        break;
    }

    this.unmountChildren(safely);
    ReactDOMComponentTree_1.uncacheNode(this);
    EventPluginHub_1.deleteAllListeners(this);
    this._rootNodeID = 0;
    this._domID = 0;
    this._wrapperState = null;

    
  },

  getPublicInstance: function () {
    return getNode(this);
  }
};

index(ReactDOMComponent.prototype, ReactDOMComponent.Mixin, ReactMultiChild_1.Mixin);

var ReactDOMComponent_1 = ReactDOMComponent;

var ReactDOMEmptyComponent = function (instantiate) {
  // ReactCompositeComponent uses this:
  this._currentElement = null;
  // ReactDOMComponentTree uses these:
  this._hostNode = null;
  this._hostParent = null;
  this._hostContainerInfo = null;
  this._domID = 0;
};
index(ReactDOMEmptyComponent.prototype, {
  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
    var domID = hostContainerInfo._idCounter++;
    this._domID = domID;
    this._hostParent = hostParent;
    this._hostContainerInfo = hostContainerInfo;

    var nodeValue = ' react-empty: ' + this._domID + ' ';
    if (transaction.useCreateElement) {
      var ownerDocument = hostContainerInfo._ownerDocument;
      var node = ownerDocument.createComment(nodeValue);
      ReactDOMComponentTree_1.precacheNode(this, node);
      return DOMLazyTree_1(node);
    } else {
      if (transaction.renderToStaticMarkup) {
        // Normally we'd insert a comment node, but since this is a situation
        // where React won't take over (static pages), we can simply return
        // nothing.
        return '';
      }
      return '<!--' + nodeValue + '-->';
    }
  },
  receiveComponent: function () {},
  getHostNode: function () {
    return ReactDOMComponentTree_1.getNodeFromInstance(this);
  },
  unmountComponent: function () {
    ReactDOMComponentTree_1.uncacheNode(this);
  }
});

var ReactDOMEmptyComponent_1 = ReactDOMEmptyComponent;

/**
 * Return the lowest common ancestor of A and B, or null if they are in
 * different trees.
 */
function getLowestCommonAncestor(instA, instB) {
  !('_hostNode' in instA) ? reactProdInvariant_1$2('33') : void 0;
  !('_hostNode' in instB) ? reactProdInvariant_1$2('33') : void 0;

  var depthA = 0;
  for (var tempA = instA; tempA; tempA = tempA._hostParent) {
    depthA++;
  }
  var depthB = 0;
  for (var tempB = instB; tempB; tempB = tempB._hostParent) {
    depthB++;
  }

  // If A is deeper, crawl up.
  while (depthA - depthB > 0) {
    instA = instA._hostParent;
    depthA--;
  }

  // If B is deeper, crawl up.
  while (depthB - depthA > 0) {
    instB = instB._hostParent;
    depthB--;
  }

  // Walk in lockstep until we find a match.
  var depth = depthA;
  while (depth--) {
    if (instA === instB) {
      return instA;
    }
    instA = instA._hostParent;
    instB = instB._hostParent;
  }
  return null;
}

/**
 * Return if A is an ancestor of B.
 */
function isAncestor(instA, instB) {
  !('_hostNode' in instA) ? reactProdInvariant_1$2('35') : void 0;
  !('_hostNode' in instB) ? reactProdInvariant_1$2('35') : void 0;

  while (instB) {
    if (instB === instA) {
      return true;
    }
    instB = instB._hostParent;
  }
  return false;
}

/**
 * Return the parent instance of the passed-in instance.
 */
function getParentInstance(inst) {
  !('_hostNode' in inst) ? reactProdInvariant_1$2('36') : void 0;

  return inst._hostParent;
}

/**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */
function traverseTwoPhase(inst, fn, arg) {
  var path = [];
  while (inst) {
    path.push(inst);
    inst = inst._hostParent;
  }
  var i;
  for (i = path.length; i-- > 0;) {
    fn(path[i], 'captured', arg);
  }
  for (i = 0; i < path.length; i++) {
    fn(path[i], 'bubbled', arg);
  }
}

/**
 * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
 * should would receive a `mouseEnter` or `mouseLeave` event.
 *
 * Does not invoke the callback on the nearest common ancestor because nothing
 * "entered" or "left" that element.
 */
function traverseEnterLeave(from, to, fn, argFrom, argTo) {
  var common = from && to ? getLowestCommonAncestor(from, to) : null;
  var pathFrom = [];
  while (from && from !== common) {
    pathFrom.push(from);
    from = from._hostParent;
  }
  var pathTo = [];
  while (to && to !== common) {
    pathTo.push(to);
    to = to._hostParent;
  }
  var i;
  for (i = 0; i < pathFrom.length; i++) {
    fn(pathFrom[i], 'bubbled', argFrom);
  }
  for (i = pathTo.length; i-- > 0;) {
    fn(pathTo[i], 'captured', argTo);
  }
}

var ReactDOMTreeTraversal = {
  isAncestor: isAncestor,
  getLowestCommonAncestor: getLowestCommonAncestor,
  getParentInstance: getParentInstance,
  traverseTwoPhase: traverseTwoPhase,
  traverseEnterLeave: traverseEnterLeave
};

/**
 * Text nodes violate a couple assumptions that React makes about components:
 *
 *  - When mounting text into the DOM, adjacent text nodes are merged.
 *  - Text nodes cannot be assigned a React root ID.
 *
 * This component is used to wrap strings between comment nodes so that they
 * can undergo the same reconciliation that is applied to elements.
 *
 * TODO: Investigate representing React components in the DOM with text nodes.
 *
 * @class ReactDOMTextComponent
 * @extends ReactComponent
 * @internal
 */
var ReactDOMTextComponent = function (text) {
  // TODO: This is really a ReactText (ReactNode), not a ReactElement
  this._currentElement = text;
  this._stringText = '' + text;
  // ReactDOMComponentTree uses these:
  this._hostNode = null;
  this._hostParent = null;

  // Properties
  this._domID = 0;
  this._mountIndex = 0;
  this._closingComment = null;
  this._commentNodes = null;
};

index(ReactDOMTextComponent.prototype, {
  /**
   * Creates the markup for this text node. This node is not intended to have
   * any features besides containing text content.
   *
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @return {string} Markup for this text node.
   * @internal
   */
  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
    var domID = hostContainerInfo._idCounter++;
    var openingValue = ' react-text: ' + domID + ' ';
    var closingValue = ' /react-text ';
    this._domID = domID;
    this._hostParent = hostParent;
    if (transaction.useCreateElement) {
      var ownerDocument = hostContainerInfo._ownerDocument;
      var openingComment = ownerDocument.createComment(openingValue);
      var closingComment = ownerDocument.createComment(closingValue);
      var lazyTree = DOMLazyTree_1(ownerDocument.createDocumentFragment());
      DOMLazyTree_1.queueChild(lazyTree, DOMLazyTree_1(openingComment));
      if (this._stringText) {
        DOMLazyTree_1.queueChild(lazyTree, DOMLazyTree_1(ownerDocument.createTextNode(this._stringText)));
      }
      DOMLazyTree_1.queueChild(lazyTree, DOMLazyTree_1(closingComment));
      ReactDOMComponentTree_1.precacheNode(this, openingComment);
      this._closingComment = closingComment;
      return lazyTree;
    } else {
      var escapedText = escapeTextContentForBrowser_1(this._stringText);

      if (transaction.renderToStaticMarkup) {
        // Normally we'd wrap this between comment nodes for the reasons stated
        // above, but since this is a situation where React won't take over
        // (static pages), we can simply return the text as it is.
        return escapedText;
      }

      return '<!--' + openingValue + '-->' + escapedText + '<!--' + closingValue + '-->';
    }
  },

  /**
   * Updates this component by updating the text content.
   *
   * @param {ReactText} nextText The next text content
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  receiveComponent: function (nextText, transaction) {
    if (nextText !== this._currentElement) {
      this._currentElement = nextText;
      var nextStringText = '' + nextText;
      if (nextStringText !== this._stringText) {
        // TODO: Save this as pending props and use performUpdateIfNecessary
        // and/or updateComponent to do the actual update for consistency with
        // other component types?
        this._stringText = nextStringText;
        var commentNodes = this.getHostNode();
        DOMChildrenOperations_1.replaceDelimitedText(commentNodes[0], commentNodes[1], nextStringText);
      }
    }
  },

  getHostNode: function () {
    var hostNode = this._commentNodes;
    if (hostNode) {
      return hostNode;
    }
    if (!this._closingComment) {
      var openingComment = ReactDOMComponentTree_1.getNodeFromInstance(this);
      var node = openingComment.nextSibling;
      while (true) {
        !(node != null) ? reactProdInvariant_1$2('67', this._domID) : void 0;
        if (node.nodeType === 8 && node.nodeValue === ' /react-text ') {
          this._closingComment = node;
          break;
        }
        node = node.nextSibling;
      }
    }
    hostNode = [this._hostNode, this._closingComment];
    this._commentNodes = hostNode;
    return hostNode;
  },

  unmountComponent: function () {
    this._closingComment = null;
    this._commentNodes = null;
    ReactDOMComponentTree_1.uncacheNode(this);
  }
});

var ReactDOMTextComponent_1 = ReactDOMTextComponent;

var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction_1,
  close: function () {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};

var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction_1,
  close: ReactUpdates_1.flushBatchedUpdates.bind(ReactUpdates_1)
};

var TRANSACTION_WRAPPERS$2 = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

function ReactDefaultBatchingStrategyTransaction() {
  this.reinitializeTransaction();
}

index(ReactDefaultBatchingStrategyTransaction.prototype, Transaction, {
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS$2;
  }
});

var transaction = new ReactDefaultBatchingStrategyTransaction();

var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  /**
   * Call the provided function in a context within which calls to `setState`
   * and friends are batched such that components aren't updated unnecessarily.
   */
  batchedUpdates: function (callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    // The code is written this way to avoid extra allocations
    if (alreadyBatchingUpdates) {
      return callback(a, b, c, d, e);
    } else {
      return transaction.perform(callback, null, a, b, c, d, e);
    }
  }
};

var ReactDefaultBatchingStrategy_1 = ReactDefaultBatchingStrategy;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @typechecks
 */



/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      return {
        remove: emptyFunction_1
      };
    }
  },

  registerDefault: function registerDefault() {}
};

var EventListener_1 = EventListener;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

/**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are unbounded, unlike `getScrollPosition`. This means they
 * may be negative or exceed the element boundaries (which is possible using
 * inertial scrolling).
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */

function getUnboundedScrollPosition(scrollable) {
  if (scrollable.Window && scrollable instanceof scrollable.Window) {
    return {
      x: scrollable.pageXOffset || scrollable.document.documentElement.scrollLeft,
      y: scrollable.pageYOffset || scrollable.document.documentElement.scrollTop
    };
  }
  return {
    x: scrollable.scrollLeft,
    y: scrollable.scrollTop
  };
}

var getUnboundedScrollPosition_1 = getUnboundedScrollPosition;

/**
 * Find the deepest React component completely containing the root of the
 * passed-in instance (for use when entire React trees are nested within each
 * other). If React trees are not nested, returns null.
 */
function findParent(inst) {
  // TODO: It may be a good idea to cache this to prevent unnecessary DOM
  // traversal, but caching is difficult to do correctly without using a
  // mutation observer to listen for all DOM changes.
  while (inst._hostParent) {
    inst = inst._hostParent;
  }
  var rootNode = ReactDOMComponentTree_1.getNodeFromInstance(inst);
  var container = rootNode.parentNode;
  return ReactDOMComponentTree_1.getClosestInstanceFromNode(container);
}

// Used to store ancestor hierarchy in top level callback
function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
  this.topLevelType = topLevelType;
  this.nativeEvent = nativeEvent;
  this.ancestors = [];
}
index(TopLevelCallbackBookKeeping.prototype, {
  destructor: function () {
    this.topLevelType = null;
    this.nativeEvent = null;
    this.ancestors.length = 0;
  }
});
PooledClass_1$2.addPoolingTo(TopLevelCallbackBookKeeping, PooledClass_1$2.twoArgumentPooler);

function handleTopLevelImpl(bookKeeping) {
  var nativeEventTarget = getEventTarget_1(bookKeeping.nativeEvent);
  var targetInst = ReactDOMComponentTree_1.getClosestInstanceFromNode(nativeEventTarget);

  // Loop through the hierarchy, in case there's any nested components.
  // It's important that we build the array of ancestors before calling any
  // event handlers, because event handlers can modify the DOM, leading to
  // inconsistencies with ReactMount's node cache. See #1105.
  var ancestor = targetInst;
  do {
    bookKeeping.ancestors.push(ancestor);
    ancestor = ancestor && findParent(ancestor);
  } while (ancestor);

  for (var i = 0; i < bookKeeping.ancestors.length; i++) {
    targetInst = bookKeeping.ancestors[i];
    ReactEventListener._handleTopLevel(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget_1(bookKeeping.nativeEvent));
  }
}

function scrollValueMonitor(cb) {
  var scrollPosition = getUnboundedScrollPosition_1(window);
  cb(scrollPosition);
}

var ReactEventListener = {
  _enabled: true,
  _handleTopLevel: null,

  WINDOW_HANDLE: ExecutionEnvironment_1.canUseDOM ? window : null,

  setHandleTopLevel: function (handleTopLevel) {
    ReactEventListener._handleTopLevel = handleTopLevel;
  },

  setEnabled: function (enabled) {
    ReactEventListener._enabled = !!enabled;
  },

  isEnabled: function () {
    return ReactEventListener._enabled;
  },

  /**
   * Traps top-level events by using event bubbling.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {string} handlerBaseName Event name (e.g. "click").
   * @param {object} element Element on which to attach listener.
   * @return {?object} An object with a remove function which will forcefully
   *                  remove the listener.
   * @internal
   */
  trapBubbledEvent: function (topLevelType, handlerBaseName, element) {
    if (!element) {
      return null;
    }
    return EventListener_1.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
  },

  /**
   * Traps a top-level event by using event capturing.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {string} handlerBaseName Event name (e.g. "click").
   * @param {object} element Element on which to attach listener.
   * @return {?object} An object with a remove function which will forcefully
   *                  remove the listener.
   * @internal
   */
  trapCapturedEvent: function (topLevelType, handlerBaseName, element) {
    if (!element) {
      return null;
    }
    return EventListener_1.capture(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
  },

  monitorScrollValue: function (refresh) {
    var callback = scrollValueMonitor.bind(null, refresh);
    EventListener_1.listen(window, 'scroll', callback);
  },

  dispatchEvent: function (topLevelType, nativeEvent) {
    if (!ReactEventListener._enabled) {
      return;
    }

    var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
    try {
      // Event queue being processed in the same cycle allows
      // `preventDefault`.
      ReactUpdates_1.batchedUpdates(handleTopLevelImpl, bookKeeping);
    } finally {
      TopLevelCallbackBookKeeping.release(bookKeeping);
    }
  }
};

var ReactEventListener_1 = ReactEventListener;

var ReactInjection = {
  Component: ReactComponentEnvironment_1.injection,
  DOMProperty: DOMProperty_1.injection,
  EmptyComponent: ReactEmptyComponent_1.injection,
  EventPluginHub: EventPluginHub_1.injection,
  EventPluginUtils: EventPluginUtils_1.injection,
  EventEmitter: ReactBrowserEventEmitter_1.injection,
  HostComponent: ReactHostComponent_1.injection,
  Updates: ReactUpdates_1.injection
};

var ReactInjection_1 = ReactInjection;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */

function getLeafNode(node) {
  while (node && node.firstChild) {
    node = node.firstChild;
  }
  return node;
}

/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */
function getSiblingNode(node) {
  while (node) {
    if (node.nextSibling) {
      return node.nextSibling;
    }
    node = node.parentNode;
  }
}

/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  var nodeStart = 0;
  var nodeEnd = 0;

  while (node) {
    if (node.nodeType === 3) {
      nodeEnd = nodeStart + node.textContent.length;

      if (nodeStart <= offset && nodeEnd >= offset) {
        return {
          node: node,
          offset: offset - nodeStart
        };
      }

      nodeStart = nodeEnd;
    }

    node = getLeafNode(getSiblingNode(node));
  }
}

var getNodeForCharacterOffset_1 = getNodeForCharacterOffset;

/**
 * While `isCollapsed` is available on the Selection object and `collapsed`
 * is available on the Range object, IE11 sometimes gets them wrong.
 * If the anchor/focus nodes and offsets are the same, the range is collapsed.
 */
function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
  return anchorNode === focusNode && anchorOffset === focusOffset;
}

/**
 * Get the appropriate anchor and focus node/offset pairs for IE.
 *
 * The catch here is that IE's selection API doesn't provide information
 * about whether the selection is forward or backward, so we have to
 * behave as though it's always forward.
 *
 * IE text differs from modern selection in that it behaves as though
 * block elements end with a new line. This means character offsets will
 * differ between the two APIs.
 *
 * @param {DOMElement} node
 * @return {object}
 */
function getIEOffsets(node) {
  var selection = document.selection;
  var selectedRange = selection.createRange();
  var selectedLength = selectedRange.text.length;

  // Duplicate selection so we can move range without breaking user selection.
  var fromStart = selectedRange.duplicate();
  fromStart.moveToElementText(node);
  fromStart.setEndPoint('EndToStart', selectedRange);

  var startOffset = fromStart.text.length;
  var endOffset = startOffset + selectedLength;

  return {
    start: startOffset,
    end: endOffset
  };
}

/**
 * @param {DOMElement} node
 * @return {?object}
 */
function getModernOffsets(node) {
  var selection = window.getSelection && window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  var anchorNode = selection.anchorNode;
  var anchorOffset = selection.anchorOffset;
  var focusNode = selection.focusNode;
  var focusOffset = selection.focusOffset;

  var currentRange = selection.getRangeAt(0);

  // In Firefox, range.startContainer and range.endContainer can be "anonymous
  // divs", e.g. the up/down buttons on an <input type="number">. Anonymous
  // divs do not seem to expose properties, triggering a "Permission denied
  // error" if any of its properties are accessed. The only seemingly possible
  // way to avoid erroring is to access a property that typically works for
  // non-anonymous divs and catch any error that may otherwise arise. See
  // https://bugzilla.mozilla.org/show_bug.cgi?id=208427
  try {
    /* eslint-disable no-unused-expressions */
    currentRange.startContainer.nodeType;
    currentRange.endContainer.nodeType;
    /* eslint-enable no-unused-expressions */
  } catch (e) {
    return null;
  }

  // If the node and offset values are the same, the selection is collapsed.
  // `Selection.isCollapsed` is available natively, but IE sometimes gets
  // this value wrong.
  var isSelectionCollapsed = isCollapsed(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);

  var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;

  var tempRange = currentRange.cloneRange();
  tempRange.selectNodeContents(node);
  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);

  var isTempRangeCollapsed = isCollapsed(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);

  var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
  var end = start + rangeLength;

  // Detect whether the selection is backward.
  var detectionRange = document.createRange();
  detectionRange.setStart(anchorNode, anchorOffset);
  detectionRange.setEnd(focusNode, focusOffset);
  var isBackward = detectionRange.collapsed;

  return {
    start: isBackward ? end : start,
    end: isBackward ? start : end
  };
}

/**
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setIEOffsets(node, offsets) {
  var range = document.selection.createRange().duplicate();
  var start, end;

  if (offsets.end === undefined) {
    start = offsets.start;
    end = start;
  } else if (offsets.start > offsets.end) {
    start = offsets.end;
    end = offsets.start;
  } else {
    start = offsets.start;
    end = offsets.end;
  }

  range.moveToElementText(node);
  range.moveStart('character', start);
  range.setEndPoint('EndToStart', range);
  range.moveEnd('character', end - start);
  range.select();
}

/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programmatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */
function setModernOffsets(node, offsets) {
  if (!window.getSelection) {
    return;
  }

  var selection = window.getSelection();
  var length = node[getTextContentAccessor_1()].length;
  var start = Math.min(offsets.start, length);
  var end = offsets.end === undefined ? start : Math.min(offsets.end, length);

  // IE 11 uses modern selection, but doesn't support the extend method.
  // Flip backward selections, so we can set with a single range.
  if (!selection.extend && start > end) {
    var temp = end;
    end = start;
    start = temp;
  }

  var startMarker = getNodeForCharacterOffset_1(node, start);
  var endMarker = getNodeForCharacterOffset_1(node, end);

  if (startMarker && endMarker) {
    var range = document.createRange();
    range.setStart(startMarker.node, startMarker.offset);
    selection.removeAllRanges();

    if (start > end) {
      selection.addRange(range);
      selection.extend(endMarker.node, endMarker.offset);
    } else {
      range.setEnd(endMarker.node, endMarker.offset);
      selection.addRange(range);
    }
  }
}

var useIEOffsets = ExecutionEnvironment_1.canUseDOM && 'selection' in document && !('getSelection' in window);

var ReactDOMSelection = {
  /**
   * @param {DOMElement} node
   */
  getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,

  /**
   * @param {DOMElement|DOMTextNode} node
   * @param {object} offsets
   */
  setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
};

var ReactDOMSelection_1 = ReactDOMSelection;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

var isNode_1 = isNode;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */



/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode_1(object) && object.nodeType == 3;
}

var isTextNode_1 = isTextNode;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode_1(outerNode)) {
    return false;
  } else if (isTextNode_1(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

var containsNode_1 = containsNode;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

var getActiveElement_1 = getActiveElement;

function isInDocument(node) {
  return containsNode_1(document.documentElement, node);
}

/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */
var ReactInputSelection = {
  hasSelectionCapabilities: function (elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
  },

  getSelectionInformation: function () {
    var focusedElem = getActiveElement_1();
    return {
      focusedElem: focusedElem,
      selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
    };
  },

  /**
   * @restoreSelection: If any selection information was potentially lost,
   * restore it. This is useful when performing operations that could remove dom
   * nodes and place them back in, resulting in focus being lost.
   */
  restoreSelection: function (priorSelectionInformation) {
    var curFocusedElem = getActiveElement_1();
    var priorFocusedElem = priorSelectionInformation.focusedElem;
    var priorSelectionRange = priorSelectionInformation.selectionRange;
    if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
      if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
        ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange);
      }
      focusNode_1(priorFocusedElem);
    }
  },

  /**
   * @getSelection: Gets the selection bounds of a focused textarea, input or
   * contentEditable node.
   * -@input: Look up selection bounds of this input
   * -@return {start: selectionStart, end: selectionEnd}
   */
  getSelection: function (input) {
    var selection;

    if ('selectionStart' in input) {
      // Modern browser with input or textarea.
      selection = {
        start: input.selectionStart,
        end: input.selectionEnd
      };
    } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
      // IE8 input.
      var range = document.selection.createRange();
      // There can only be one selection per document in IE, so it must
      // be in our element.
      if (range.parentElement() === input) {
        selection = {
          start: -range.moveStart('character', -input.value.length),
          end: -range.moveEnd('character', -input.value.length)
        };
      }
    } else {
      // Content editable or old IE textarea.
      selection = ReactDOMSelection_1.getOffsets(input);
    }

    return selection || { start: 0, end: 0 };
  },

  /**
   * @setSelection: Sets the selection bounds of a textarea or input and focuses
   * the input.
   * -@input     Set selection bounds of this input or textarea
   * -@offsets   Object of same form that is returned from get*
   */
  setSelection: function (input, offsets) {
    var start = offsets.start;
    var end = offsets.end;
    if (end === undefined) {
      end = start;
    }

    if ('selectionStart' in input) {
      input.selectionStart = start;
      input.selectionEnd = Math.min(end, input.value.length);
    } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveStart('character', start);
      range.moveEnd('character', end - start);
      range.select();
    } else {
      ReactDOMSelection_1.setOffsets(input, offsets);
    }
  }
};

var ReactInputSelection_1 = ReactInputSelection;

/**
 * Ensures that, when possible, the selection range (currently selected text
 * input) is not disturbed by performing the transaction.
 */
var SELECTION_RESTORATION = {
  /**
   * @return {Selection} Selection information.
   */
  initialize: ReactInputSelection_1.getSelectionInformation,
  /**
   * @param {Selection} sel Selection information returned from `initialize`.
   */
  close: ReactInputSelection_1.restoreSelection
};

/**
 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
 * high level DOM manipulations (like temporarily removing a text input from the
 * DOM).
 */
var EVENT_SUPPRESSION = {
  /**
   * @return {boolean} The enabled status of `ReactBrowserEventEmitter` before
   * the reconciliation.
   */
  initialize: function () {
    var currentlyEnabled = ReactBrowserEventEmitter_1.isEnabled();
    ReactBrowserEventEmitter_1.setEnabled(false);
    return currentlyEnabled;
  },

  /**
   * @param {boolean} previouslyEnabled Enabled status of
   *   `ReactBrowserEventEmitter` before the reconciliation occurred. `close`
   *   restores the previous value.
   */
  close: function (previouslyEnabled) {
    ReactBrowserEventEmitter_1.setEnabled(previouslyEnabled);
  }
};

/**
 * Provides a queue for collecting `componentDidMount` and
 * `componentDidUpdate` callbacks during the transaction.
 */
var ON_DOM_READY_QUEUEING = {
  /**
   * Initializes the internal `onDOMReady` queue.
   */
  initialize: function () {
    this.reactMountReady.reset();
  },

  /**
   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
   */
  close: function () {
    this.reactMountReady.notifyAll();
  }
};

/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
var TRANSACTION_WRAPPERS$3 = [SELECTION_RESTORATION, EVENT_SUPPRESSION, ON_DOM_READY_QUEUEING];

/**
 * Currently:
 * - The order that these are listed in the transaction is critical:
 * - Suppresses events.
 * - Restores selection range.
 *
 * Future:
 * - Restore document/overflow scroll positions that were unintentionally
 *   modified via DOM insertions above the top viewport boundary.
 * - Implement/integrate with customized constraint based layout system and keep
 *   track of which dimensions must be remeasured.
 *
 * @class ReactReconcileTransaction
 */
function ReactReconcileTransaction(useCreateElement) {
  this.reinitializeTransaction();
  // Only server-side rendering really needs this option (see
  // `ReactServerRendering`), but server-side uses
  // `ReactServerRenderingTransaction` instead. This option is here so that it's
  // accessible and defaults to false when `ReactDOMComponent` and
  // `ReactDOMTextComponent` checks it in `mountComponent`.`
  this.renderToStaticMarkup = false;
  this.reactMountReady = CallbackQueue_1.getPooled(null);
  this.useCreateElement = useCreateElement;
}

var Mixin$1 = {
  /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array<object>} List of operation wrap procedures.
   *   TODO: convert to array<TransactionWrapper>
   */
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS$3;
  },

  /**
   * @return {object} The queue to collect `onDOMReady` callbacks with.
   */
  getReactMountReady: function () {
    return this.reactMountReady;
  },

  /**
   * @return {object} The queue to collect React async events.
   */
  getUpdateQueue: function () {
    return ReactUpdateQueue_1;
  },

  /**
   * Save current transaction state -- if the return value from this method is
   * passed to `rollback`, the transaction will be reset to that state.
   */
  checkpoint: function () {
    // reactMountReady is the our only stateful wrapper
    return this.reactMountReady.checkpoint();
  },

  rollback: function (checkpoint) {
    this.reactMountReady.rollback(checkpoint);
  },

  /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be reused.
   */
  destructor: function () {
    CallbackQueue_1.release(this.reactMountReady);
    this.reactMountReady = null;
  }
};

index(ReactReconcileTransaction.prototype, Transaction, Mixin$1);

PooledClass_1$2.addPoolingTo(ReactReconcileTransaction);

var ReactReconcileTransaction_1 = ReactReconcileTransaction;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var NS = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace'
};

// We use attributes for everything SVG so let's avoid some duplication and run
// code instead.
// The following are all specified in the HTML config already so we exclude here.
// - class (as className)
// - color
// - height
// - id
// - lang
// - max
// - media
// - method
// - min
// - name
// - style
// - target
// - type
// - width
var ATTRS = {
  accentHeight: 'accent-height',
  accumulate: 0,
  additive: 0,
  alignmentBaseline: 'alignment-baseline',
  allowReorder: 'allowReorder',
  alphabetic: 0,
  amplitude: 0,
  arabicForm: 'arabic-form',
  ascent: 0,
  attributeName: 'attributeName',
  attributeType: 'attributeType',
  autoReverse: 'autoReverse',
  azimuth: 0,
  baseFrequency: 'baseFrequency',
  baseProfile: 'baseProfile',
  baselineShift: 'baseline-shift',
  bbox: 0,
  begin: 0,
  bias: 0,
  by: 0,
  calcMode: 'calcMode',
  capHeight: 'cap-height',
  clip: 0,
  clipPath: 'clip-path',
  clipRule: 'clip-rule',
  clipPathUnits: 'clipPathUnits',
  colorInterpolation: 'color-interpolation',
  colorInterpolationFilters: 'color-interpolation-filters',
  colorProfile: 'color-profile',
  colorRendering: 'color-rendering',
  contentScriptType: 'contentScriptType',
  contentStyleType: 'contentStyleType',
  cursor: 0,
  cx: 0,
  cy: 0,
  d: 0,
  decelerate: 0,
  descent: 0,
  diffuseConstant: 'diffuseConstant',
  direction: 0,
  display: 0,
  divisor: 0,
  dominantBaseline: 'dominant-baseline',
  dur: 0,
  dx: 0,
  dy: 0,
  edgeMode: 'edgeMode',
  elevation: 0,
  enableBackground: 'enable-background',
  end: 0,
  exponent: 0,
  externalResourcesRequired: 'externalResourcesRequired',
  fill: 0,
  fillOpacity: 'fill-opacity',
  fillRule: 'fill-rule',
  filter: 0,
  filterRes: 'filterRes',
  filterUnits: 'filterUnits',
  floodColor: 'flood-color',
  floodOpacity: 'flood-opacity',
  focusable: 0,
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontSizeAdjust: 'font-size-adjust',
  fontStretch: 'font-stretch',
  fontStyle: 'font-style',
  fontVariant: 'font-variant',
  fontWeight: 'font-weight',
  format: 0,
  from: 0,
  fx: 0,
  fy: 0,
  g1: 0,
  g2: 0,
  glyphName: 'glyph-name',
  glyphOrientationHorizontal: 'glyph-orientation-horizontal',
  glyphOrientationVertical: 'glyph-orientation-vertical',
  glyphRef: 'glyphRef',
  gradientTransform: 'gradientTransform',
  gradientUnits: 'gradientUnits',
  hanging: 0,
  horizAdvX: 'horiz-adv-x',
  horizOriginX: 'horiz-origin-x',
  ideographic: 0,
  imageRendering: 'image-rendering',
  'in': 0,
  in2: 0,
  intercept: 0,
  k: 0,
  k1: 0,
  k2: 0,
  k3: 0,
  k4: 0,
  kernelMatrix: 'kernelMatrix',
  kernelUnitLength: 'kernelUnitLength',
  kerning: 0,
  keyPoints: 'keyPoints',
  keySplines: 'keySplines',
  keyTimes: 'keyTimes',
  lengthAdjust: 'lengthAdjust',
  letterSpacing: 'letter-spacing',
  lightingColor: 'lighting-color',
  limitingConeAngle: 'limitingConeAngle',
  local: 0,
  markerEnd: 'marker-end',
  markerMid: 'marker-mid',
  markerStart: 'marker-start',
  markerHeight: 'markerHeight',
  markerUnits: 'markerUnits',
  markerWidth: 'markerWidth',
  mask: 0,
  maskContentUnits: 'maskContentUnits',
  maskUnits: 'maskUnits',
  mathematical: 0,
  mode: 0,
  numOctaves: 'numOctaves',
  offset: 0,
  opacity: 0,
  operator: 0,
  order: 0,
  orient: 0,
  orientation: 0,
  origin: 0,
  overflow: 0,
  overlinePosition: 'overline-position',
  overlineThickness: 'overline-thickness',
  paintOrder: 'paint-order',
  panose1: 'panose-1',
  pathLength: 'pathLength',
  patternContentUnits: 'patternContentUnits',
  patternTransform: 'patternTransform',
  patternUnits: 'patternUnits',
  pointerEvents: 'pointer-events',
  points: 0,
  pointsAtX: 'pointsAtX',
  pointsAtY: 'pointsAtY',
  pointsAtZ: 'pointsAtZ',
  preserveAlpha: 'preserveAlpha',
  preserveAspectRatio: 'preserveAspectRatio',
  primitiveUnits: 'primitiveUnits',
  r: 0,
  radius: 0,
  refX: 'refX',
  refY: 'refY',
  renderingIntent: 'rendering-intent',
  repeatCount: 'repeatCount',
  repeatDur: 'repeatDur',
  requiredExtensions: 'requiredExtensions',
  requiredFeatures: 'requiredFeatures',
  restart: 0,
  result: 0,
  rotate: 0,
  rx: 0,
  ry: 0,
  scale: 0,
  seed: 0,
  shapeRendering: 'shape-rendering',
  slope: 0,
  spacing: 0,
  specularConstant: 'specularConstant',
  specularExponent: 'specularExponent',
  speed: 0,
  spreadMethod: 'spreadMethod',
  startOffset: 'startOffset',
  stdDeviation: 'stdDeviation',
  stemh: 0,
  stemv: 0,
  stitchTiles: 'stitchTiles',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  strikethroughPosition: 'strikethrough-position',
  strikethroughThickness: 'strikethrough-thickness',
  string: 0,
  stroke: 0,
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeOpacity: 'stroke-opacity',
  strokeWidth: 'stroke-width',
  surfaceScale: 'surfaceScale',
  systemLanguage: 'systemLanguage',
  tableValues: 'tableValues',
  targetX: 'targetX',
  targetY: 'targetY',
  textAnchor: 'text-anchor',
  textDecoration: 'text-decoration',
  textRendering: 'text-rendering',
  textLength: 'textLength',
  to: 0,
  transform: 0,
  u1: 0,
  u2: 0,
  underlinePosition: 'underline-position',
  underlineThickness: 'underline-thickness',
  unicode: 0,
  unicodeBidi: 'unicode-bidi',
  unicodeRange: 'unicode-range',
  unitsPerEm: 'units-per-em',
  vAlphabetic: 'v-alphabetic',
  vHanging: 'v-hanging',
  vIdeographic: 'v-ideographic',
  vMathematical: 'v-mathematical',
  values: 0,
  vectorEffect: 'vector-effect',
  version: 0,
  vertAdvY: 'vert-adv-y',
  vertOriginX: 'vert-origin-x',
  vertOriginY: 'vert-origin-y',
  viewBox: 'viewBox',
  viewTarget: 'viewTarget',
  visibility: 0,
  widths: 0,
  wordSpacing: 'word-spacing',
  writingMode: 'writing-mode',
  x: 0,
  xHeight: 'x-height',
  x1: 0,
  x2: 0,
  xChannelSelector: 'xChannelSelector',
  xlinkActuate: 'xlink:actuate',
  xlinkArcrole: 'xlink:arcrole',
  xlinkHref: 'xlink:href',
  xlinkRole: 'xlink:role',
  xlinkShow: 'xlink:show',
  xlinkTitle: 'xlink:title',
  xlinkType: 'xlink:type',
  xmlBase: 'xml:base',
  xmlns: 0,
  xmlnsXlink: 'xmlns:xlink',
  xmlLang: 'xml:lang',
  xmlSpace: 'xml:space',
  y: 0,
  y1: 0,
  y2: 0,
  yChannelSelector: 'yChannelSelector',
  z: 0,
  zoomAndPan: 'zoomAndPan'
};

var SVGDOMPropertyConfig = {
  Properties: {},
  DOMAttributeNamespaces: {
    xlinkActuate: NS.xlink,
    xlinkArcrole: NS.xlink,
    xlinkHref: NS.xlink,
    xlinkRole: NS.xlink,
    xlinkShow: NS.xlink,
    xlinkTitle: NS.xlink,
    xlinkType: NS.xlink,
    xmlBase: NS.xml,
    xmlLang: NS.xml,
    xmlSpace: NS.xml
  },
  DOMAttributeNames: {}
};

Object.keys(ATTRS).forEach(function (key) {
  SVGDOMPropertyConfig.Properties[key] = 0;
  if (ATTRS[key]) {
    SVGDOMPropertyConfig.DOMAttributeNames[key] = ATTRS[key];
  }
});

var SVGDOMPropertyConfig_1 = SVGDOMPropertyConfig;

var skipSelectionChangeEvent = ExecutionEnvironment_1.canUseDOM && 'documentMode' in document && document.documentMode <= 11;

var eventTypes$3 = {
  select: {
    phasedRegistrationNames: {
      bubbled: 'onSelect',
      captured: 'onSelectCapture'
    },
    dependencies: ['topBlur', 'topContextMenu', 'topFocus', 'topKeyDown', 'topKeyUp', 'topMouseDown', 'topMouseUp', 'topSelectionChange']
  }
};

var activeElement$1 = null;
var activeElementInst$1 = null;
var lastSelection = null;
var mouseDown = false;

// Track whether a listener exists for this plugin. If none exist, we do
// not extract events. See #3639.
var hasListener = false;

/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @return {object}
 */
function getSelection(node) {
  if ('selectionStart' in node && ReactInputSelection_1.hasSelectionCapabilities(node)) {
    return {
      start: node.selectionStart,
      end: node.selectionEnd
    };
  } else if (window.getSelection) {
    var selection = window.getSelection();
    return {
      anchorNode: selection.anchorNode,
      anchorOffset: selection.anchorOffset,
      focusNode: selection.focusNode,
      focusOffset: selection.focusOffset
    };
  } else if (document.selection) {
    var range = document.selection.createRange();
    return {
      parentElement: range.parentElement(),
      text: range.text,
      top: range.boundingTop,
      left: range.boundingLeft
    };
  }
}

/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  // Ensure we have the right element, and that the user is not dragging a
  // selection (this matches native `select` event behavior). In HTML5, select
  // fires only on input and textarea thus if there's no focused element we
  // won't dispatch.
  if (mouseDown || activeElement$1 == null || activeElement$1 !== getActiveElement_1()) {
    return null;
  }

  // Only fire when selection has actually changed.
  var currentSelection = getSelection(activeElement$1);
  if (!lastSelection || !shallowEqual_1(lastSelection, currentSelection)) {
    lastSelection = currentSelection;

    var syntheticEvent = SyntheticEvent_1.getPooled(eventTypes$3.select, activeElementInst$1, nativeEvent, nativeEventTarget);

    syntheticEvent.type = 'select';
    syntheticEvent.target = activeElement$1;

    EventPropagators_1.accumulateTwoPhaseDispatches(syntheticEvent);

    return syntheticEvent;
  }

  return null;
}

/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */
var SelectEventPlugin = {
  eventTypes: eventTypes$3,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    if (!hasListener) {
      return null;
    }

    var targetNode = targetInst ? ReactDOMComponentTree_1.getNodeFromInstance(targetInst) : window;

    switch (topLevelType) {
      // Track the input node that has focus.
      case 'topFocus':
        if (isTextInputElement_1(targetNode) || targetNode.contentEditable === 'true') {
          activeElement$1 = targetNode;
          activeElementInst$1 = targetInst;
          lastSelection = null;
        }
        break;
      case 'topBlur':
        activeElement$1 = null;
        activeElementInst$1 = null;
        lastSelection = null;
        break;
      // Don't fire the event while the user is dragging. This matches the
      // semantics of the native select event.
      case 'topMouseDown':
        mouseDown = true;
        break;
      case 'topContextMenu':
      case 'topMouseUp':
        mouseDown = false;
        return constructSelectEvent(nativeEvent, nativeEventTarget);
      // Chrome and IE fire non-standard event when selection is changed (and
      // sometimes when it hasn't). IE's event fires out of order with respect
      // to key and input events on deletion, so we discard it.
      //
      // Firefox doesn't support selectionchange, so check selection status
      // after each key entry. The selection changes after keydown and before
      // keyup, but we check on keydown as well in the case of holding down a
      // key, when multiple keydown events are fired but only one keyup is.
      // This is also our approach for IE handling, for the reason above.
      case 'topSelectionChange':
        if (skipSelectionChangeEvent) {
          break;
        }
      // falls through
      case 'topKeyDown':
      case 'topKeyUp':
        return constructSelectEvent(nativeEvent, nativeEventTarget);
    }

    return null;
  },

  didPutListener: function (inst, registrationName, listener) {
    if (registrationName === 'onSelect') {
      hasListener = true;
    }
  }
};

var SelectEventPlugin_1 = SelectEventPlugin;

/**
 * @interface Event
 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
 */
var AnimationEventInterface = {
  animationName: null,
  elapsedTime: null,
  pseudoElement: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticAnimationEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent_1.augmentClass(SyntheticAnimationEvent, AnimationEventInterface);

var SyntheticAnimationEvent_1 = SyntheticAnimationEvent;

/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */
var ClipboardEventInterface = {
  clipboardData: function (event) {
    return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent_1.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);

var SyntheticClipboardEvent_1 = SyntheticClipboardEvent;

/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var FocusEventInterface = {
  relatedTarget: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent_1.augmentClass(SyntheticFocusEvent, FocusEventInterface);

var SyntheticFocusEvent_1 = SyntheticFocusEvent;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */

function getEventCharCode(nativeEvent) {
  var charCode;
  var keyCode = nativeEvent.keyCode;

  if ('charCode' in nativeEvent) {
    charCode = nativeEvent.charCode;

    // FF does not set `charCode` for the Enter-key, check against `keyCode`.
    if (charCode === 0 && keyCode === 13) {
      charCode = 13;
    }
  } else {
    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
    charCode = keyCode;
  }

  // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
  // Must not discard the (non-)printable Enter-key.
  if (charCode >= 32 || charCode === 13) {
    return charCode;
  }

  return 0;
}

var getEventCharCode_1 = getEventCharCode;

/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var normalizeKey = {
  Esc: 'Escape',
  Spacebar: ' ',
  Left: 'ArrowLeft',
  Up: 'ArrowUp',
  Right: 'ArrowRight',
  Down: 'ArrowDown',
  Del: 'Delete',
  Win: 'OS',
  Menu: 'ContextMenu',
  Apps: 'ContextMenu',
  Scroll: 'ScrollLock',
  MozPrintableKey: 'Unidentified'
};

/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */
var translateToKey = {
  8: 'Backspace',
  9: 'Tab',
  12: 'Clear',
  13: 'Enter',
  16: 'Shift',
  17: 'Control',
  18: 'Alt',
  19: 'Pause',
  20: 'CapsLock',
  27: 'Escape',
  32: ' ',
  33: 'PageUp',
  34: 'PageDown',
  35: 'End',
  36: 'Home',
  37: 'ArrowLeft',
  38: 'ArrowUp',
  39: 'ArrowRight',
  40: 'ArrowDown',
  45: 'Insert',
  46: 'Delete',
  112: 'F1',
  113: 'F2',
  114: 'F3',
  115: 'F4',
  116: 'F5',
  117: 'F6',
  118: 'F7',
  119: 'F8',
  120: 'F9',
  121: 'F10',
  122: 'F11',
  123: 'F12',
  144: 'NumLock',
  145: 'ScrollLock',
  224: 'Meta'
};

/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */
function getEventKey(nativeEvent) {
  if (nativeEvent.key) {
    // Normalize inconsistent values reported by browsers due to
    // implementations of a working draft specification.

    // FireFox implements `key` but returns `MozPrintableKey` for all
    // printable characters (normalized to `Unidentified`), ignore it.
    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
    if (key !== 'Unidentified') {
      return key;
    }
  }

  // Browser does not implement `key`, polyfill as much of it as we can.
  if (nativeEvent.type === 'keypress') {
    var charCode = getEventCharCode_1(nativeEvent);

    // The enter-key is technically both printable and non-printable and can
    // thus be captured by `keypress`, no other non-printable key should.
    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
  }
  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
    // While user keyboard layout determines the actual meaning of each
    // `keyCode` value, almost all function keys have a universal value.
    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
  }
  return '';
}

var getEventKey_1 = getEventKey;

/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var KeyboardEventInterface = {
  key: getEventKey_1,
  location: null,
  ctrlKey: null,
  shiftKey: null,
  altKey: null,
  metaKey: null,
  repeat: null,
  locale: null,
  getModifierState: getEventModifierState_1,
  // Legacy Interface
  charCode: function (event) {
    // `charCode` is the result of a KeyPress event and represents the value of
    // the actual printable character.

    // KeyPress is deprecated, but its replacement is not yet final and not
    // implemented in any major browser. Only KeyPress has charCode.
    if (event.type === 'keypress') {
      return getEventCharCode_1(event);
    }
    return 0;
  },
  keyCode: function (event) {
    // `keyCode` is the result of a KeyDown/Up event and represents the value of
    // physical keyboard key.

    // The actual meaning of the value depends on the users' keyboard layout
    // which cannot be detected. Assuming that it is a US keyboard layout
    // provides a surprisingly accurate mapping for US and European users.
    // Due to this, it is left to the user to implement at this time.
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  },
  which: function (event) {
    // `which` is an alias for either `keyCode` or `charCode` depending on the
    // type of the event.
    if (event.type === 'keypress') {
      return getEventCharCode_1(event);
    }
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }
    return 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent_1.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);

var SyntheticKeyboardEvent_1 = SyntheticKeyboardEvent;

/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var DragEventInterface = {
  dataTransfer: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticMouseEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent_1.augmentClass(SyntheticDragEvent, DragEventInterface);

var SyntheticDragEvent_1 = SyntheticDragEvent;

/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */
var TouchEventInterface = {
  touches: null,
  targetTouches: null,
  changedTouches: null,
  altKey: null,
  metaKey: null,
  ctrlKey: null,
  shiftKey: null,
  getModifierState: getEventModifierState_1
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */
function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticUIEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticUIEvent_1.augmentClass(SyntheticTouchEvent, TouchEventInterface);

var SyntheticTouchEvent_1 = SyntheticTouchEvent;

/**
 * @interface Event
 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
 */
var TransitionEventInterface = {
  propertyName: null,
  elapsedTime: null,
  pseudoElement: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticTransitionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent_1.augmentClass(SyntheticTransitionEvent, TransitionEventInterface);

var SyntheticTransitionEvent_1 = SyntheticTransitionEvent;

/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var WheelEventInterface = {
  deltaX: function (event) {
    return 'deltaX' in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
    'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
  },
  deltaY: function (event) {
    return 'deltaY' in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
    'wheelDeltaY' in event ? -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
    'wheelDelta' in event ? -event.wheelDelta : 0;
  },
  deltaZ: null,

  // Browsers without "deltaMode" is reporting in raw wheel delta where one
  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
  deltaMode: null
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */
function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticMouseEvent_1.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticMouseEvent_1.augmentClass(SyntheticWheelEvent, WheelEventInterface);

var SyntheticWheelEvent_1 = SyntheticWheelEvent;

/**
 * Turns
 * ['abort', ...]
 * into
 * eventTypes = {
 *   'abort': {
 *     phasedRegistrationNames: {
 *       bubbled: 'onAbort',
 *       captured: 'onAbortCapture',
 *     },
 *     dependencies: ['topAbort'],
 *   },
 *   ...
 * };
 * topLevelEventsToDispatchConfig = {
 *   'topAbort': { sameConfig }
 * };
 */
var eventTypes$4 = {};
var topLevelEventsToDispatchConfig = {};
['abort', 'animationEnd', 'animationIteration', 'animationStart', 'blur', 'canPlay', 'canPlayThrough', 'click', 'contextMenu', 'copy', 'cut', 'doubleClick', 'drag', 'dragEnd', 'dragEnter', 'dragExit', 'dragLeave', 'dragOver', 'dragStart', 'drop', 'durationChange', 'emptied', 'encrypted', 'ended', 'error', 'focus', 'input', 'invalid', 'keyDown', 'keyPress', 'keyUp', 'load', 'loadedData', 'loadedMetadata', 'loadStart', 'mouseDown', 'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'paste', 'pause', 'play', 'playing', 'progress', 'rateChange', 'reset', 'scroll', 'seeked', 'seeking', 'stalled', 'submit', 'suspend', 'timeUpdate', 'touchCancel', 'touchEnd', 'touchMove', 'touchStart', 'transitionEnd', 'volumeChange', 'waiting', 'wheel'].forEach(function (event) {
  var capitalizedEvent = event[0].toUpperCase() + event.slice(1);
  var onEvent = 'on' + capitalizedEvent;
  var topEvent = 'top' + capitalizedEvent;

  var type = {
    phasedRegistrationNames: {
      bubbled: onEvent,
      captured: onEvent + 'Capture'
    },
    dependencies: [topEvent]
  };
  eventTypes$4[event] = type;
  topLevelEventsToDispatchConfig[topEvent] = type;
});

var onClickListeners = {};

function getDictionaryKey$1(inst) {
  // Prevents V8 performance issue:
  // https://github.com/facebook/react/pull/7232
  return '.' + inst._rootNodeID;
}

function isInteractive$1(tag) {
  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
}

var SimpleEventPlugin = {
  eventTypes: eventTypes$4,

  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
    if (!dispatchConfig) {
      return null;
    }
    var EventConstructor;
    switch (topLevelType) {
      case 'topAbort':
      case 'topCanPlay':
      case 'topCanPlayThrough':
      case 'topDurationChange':
      case 'topEmptied':
      case 'topEncrypted':
      case 'topEnded':
      case 'topError':
      case 'topInput':
      case 'topInvalid':
      case 'topLoad':
      case 'topLoadedData':
      case 'topLoadedMetadata':
      case 'topLoadStart':
      case 'topPause':
      case 'topPlay':
      case 'topPlaying':
      case 'topProgress':
      case 'topRateChange':
      case 'topReset':
      case 'topSeeked':
      case 'topSeeking':
      case 'topStalled':
      case 'topSubmit':
      case 'topSuspend':
      case 'topTimeUpdate':
      case 'topVolumeChange':
      case 'topWaiting':
        // HTML Events
        // @see http://www.w3.org/TR/html5/index.html#events-0
        EventConstructor = SyntheticEvent_1;
        break;
      case 'topKeyPress':
        // Firefox creates a keypress event for function keys too. This removes
        // the unwanted keypress events. Enter is however both printable and
        // non-printable. One would expect Tab to be as well (but it isn't).
        if (getEventCharCode_1(nativeEvent) === 0) {
          return null;
        }
      /* falls through */
      case 'topKeyDown':
      case 'topKeyUp':
        EventConstructor = SyntheticKeyboardEvent_1;
        break;
      case 'topBlur':
      case 'topFocus':
        EventConstructor = SyntheticFocusEvent_1;
        break;
      case 'topClick':
        // Firefox creates a click event on right mouse clicks. This removes the
        // unwanted click events.
        if (nativeEvent.button === 2) {
          return null;
        }
      /* falls through */
      case 'topDoubleClick':
      case 'topMouseDown':
      case 'topMouseMove':
      case 'topMouseUp':
      // TODO: Disabled elements should not respond to mouse events
      /* falls through */
      case 'topMouseOut':
      case 'topMouseOver':
      case 'topContextMenu':
        EventConstructor = SyntheticMouseEvent_1;
        break;
      case 'topDrag':
      case 'topDragEnd':
      case 'topDragEnter':
      case 'topDragExit':
      case 'topDragLeave':
      case 'topDragOver':
      case 'topDragStart':
      case 'topDrop':
        EventConstructor = SyntheticDragEvent_1;
        break;
      case 'topTouchCancel':
      case 'topTouchEnd':
      case 'topTouchMove':
      case 'topTouchStart':
        EventConstructor = SyntheticTouchEvent_1;
        break;
      case 'topAnimationEnd':
      case 'topAnimationIteration':
      case 'topAnimationStart':
        EventConstructor = SyntheticAnimationEvent_1;
        break;
      case 'topTransitionEnd':
        EventConstructor = SyntheticTransitionEvent_1;
        break;
      case 'topScroll':
        EventConstructor = SyntheticUIEvent_1;
        break;
      case 'topWheel':
        EventConstructor = SyntheticWheelEvent_1;
        break;
      case 'topCopy':
      case 'topCut':
      case 'topPaste':
        EventConstructor = SyntheticClipboardEvent_1;
        break;
    }
    !EventConstructor ? reactProdInvariant_1$2('86', topLevelType) : void 0;
    var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
    EventPropagators_1.accumulateTwoPhaseDispatches(event);
    return event;
  },

  didPutListener: function (inst, registrationName, listener) {
    // Mobile Safari does not fire properly bubble click events on
    // non-interactive elements, which means delegated click listeners do not
    // fire. The workaround for this bug involves attaching an empty click
    // listener on the target node.
    // http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
    if (registrationName === 'onClick' && !isInteractive$1(inst._tag)) {
      var key = getDictionaryKey$1(inst);
      var node = ReactDOMComponentTree_1.getNodeFromInstance(inst);
      if (!onClickListeners[key]) {
        onClickListeners[key] = EventListener_1.listen(node, 'click', emptyFunction_1);
      }
    }
  },

  willDeleteListener: function (inst, registrationName) {
    if (registrationName === 'onClick' && !isInteractive$1(inst._tag)) {
      var key = getDictionaryKey$1(inst);
      onClickListeners[key].remove();
      delete onClickListeners[key];
    }
  }
};

var SimpleEventPlugin_1 = SimpleEventPlugin;

var alreadyInjected = false;

function inject() {
  if (alreadyInjected) {
    // TODO: This is currently true because these injections are shared between
    // the client and the server package. They should be built independently
    // and not share any injection state. Then this problem will be solved.
    return;
  }
  alreadyInjected = true;

  ReactInjection_1.EventEmitter.injectReactEventListener(ReactEventListener_1);

  /**
   * Inject modules for resolving DOM hierarchy and plugin ordering.
   */
  ReactInjection_1.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder_1);
  ReactInjection_1.EventPluginUtils.injectComponentTree(ReactDOMComponentTree_1);
  ReactInjection_1.EventPluginUtils.injectTreeTraversal(ReactDOMTreeTraversal);

  /**
   * Some important event plugins included by default (without having to require
   * them).
   */
  ReactInjection_1.EventPluginHub.injectEventPluginsByName({
    SimpleEventPlugin: SimpleEventPlugin_1,
    EnterLeaveEventPlugin: EnterLeaveEventPlugin_1,
    ChangeEventPlugin: ChangeEventPlugin_1,
    SelectEventPlugin: SelectEventPlugin_1,
    BeforeInputEventPlugin: BeforeInputEventPlugin_1
  });

  ReactInjection_1.HostComponent.injectGenericComponentClass(ReactDOMComponent_1);

  ReactInjection_1.HostComponent.injectTextComponentClass(ReactDOMTextComponent_1);

  ReactInjection_1.DOMProperty.injectDOMPropertyConfig(ARIADOMPropertyConfig_1);
  ReactInjection_1.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig_1);
  ReactInjection_1.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig_1);

  ReactInjection_1.EmptyComponent.injectEmptyComponentFactory(function (instantiate) {
    return new ReactDOMEmptyComponent_1(instantiate);
  });

  ReactInjection_1.Updates.injectReconcileTransaction(ReactReconcileTransaction_1);
  ReactInjection_1.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy_1);

  ReactInjection_1.Component.injectEnvironment(ReactComponentBrowserEnvironment_1);
}

var ReactDefaultInjection = {
  inject: inject
};

var DOC_NODE_TYPE$1 = 9;

function ReactDOMContainerInfo(topLevelWrapper, node) {
  var info = {
    _topLevelWrapper: topLevelWrapper,
    _idCounter: 1,
    _ownerDocument: node ? node.nodeType === DOC_NODE_TYPE$1 ? node : node.ownerDocument : null,
    _node: node,
    _tag: node ? node.nodeName.toLowerCase() : null,
    _namespaceURI: node ? node.namespaceURI : null
  };
  return info;
}

var ReactDOMContainerInfo_1 = ReactDOMContainerInfo;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var ReactDOMFeatureFlags = {
  useCreateElement: true,
  useFiber: false
};

var ReactDOMFeatureFlags_1 = ReactDOMFeatureFlags;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

var MOD = 65521;

// adler32 is not cryptographically strong, and is only used to sanity check that
// markup generated on the server matches the markup generated on the client.
// This implementation (a modified version of the SheetJS version) has been optimized
// for our use case, at the expense of conforming to the adler32 specification
// for non-ascii inputs.
function adler32(data) {
  var a = 1;
  var b = 0;
  var i = 0;
  var l = data.length;
  var m = l & ~0x3;
  while (i < m) {
    var n = Math.min(i + 4096, m);
    for (; i < n; i += 4) {
      b += (a += data.charCodeAt(i)) + (a += data.charCodeAt(i + 1)) + (a += data.charCodeAt(i + 2)) + (a += data.charCodeAt(i + 3));
    }
    a %= MOD;
    b %= MOD;
  }
  for (; i < l; i++) {
    b += a += data.charCodeAt(i);
  }
  a %= MOD;
  b %= MOD;
  return a | b << 16;
}

var adler32_1 = adler32;

var TAG_END = /\/?>/;
var COMMENT_START = /^<\!\-\-/;

var ReactMarkupChecksum = {
  CHECKSUM_ATTR_NAME: 'data-react-checksum',

  /**
   * @param {string} markup Markup string
   * @return {string} Markup string with checksum attribute attached
   */
  addChecksumToMarkup: function (markup) {
    var checksum = adler32_1(markup);

    // Add checksum (handle both parent tags, comments and self-closing tags)
    if (COMMENT_START.test(markup)) {
      return markup;
    } else {
      return markup.replace(TAG_END, ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '"$&');
    }
  },

  /**
   * @param {string} markup to use
   * @param {DOMElement} element root React element
   * @returns {boolean} whether or not the markup is the same
   */
  canReuseMarkup: function (markup, element) {
    var existingChecksum = element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
    var markupChecksum = adler32_1(markup);
    return markupChecksum === existingChecksum;
  }
};

var ReactMarkupChecksum_1 = ReactMarkupChecksum;

var ATTR_NAME$1 = DOMProperty_1.ID_ATTRIBUTE_NAME;
var ROOT_ATTR_NAME = DOMProperty_1.ROOT_ATTRIBUTE_NAME;

var ELEMENT_NODE_TYPE$1 = 1;
var DOC_NODE_TYPE = 9;
var DOCUMENT_FRAGMENT_NODE_TYPE$1 = 11;

var instancesByReactRootID = {};

/**
 * Finds the index of the first character
 * that's not common between the two given strings.
 *
 * @return {number} the index of the character where the strings diverge
 */
function firstDifferenceIndex(string1, string2) {
  var minLen = Math.min(string1.length, string2.length);
  for (var i = 0; i < minLen; i++) {
    if (string1.charAt(i) !== string2.charAt(i)) {
      return i;
    }
  }
  return string1.length === string2.length ? -1 : minLen;
}

/**
 * @param {DOMElement|DOMDocument} container DOM element that may contain
 * a React component
 * @return {?*} DOM element that may have the reactRoot ID, or null.
 */
function getReactRootElementInContainer(container) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOC_NODE_TYPE) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}

function internalGetID(node) {
  // If node is something like a window, document, or text node, none of
  // which support attributes or a .getAttribute method, gracefully return
  // the empty string, as if the attribute were missing.
  return node.getAttribute && node.getAttribute(ATTR_NAME$1) || '';
}

/**
 * Mounts this component and inserts it into the DOM.
 *
 * @param {ReactComponent} componentInstance The instance to mount.
 * @param {DOMElement} container DOM element to mount into.
 * @param {ReactReconcileTransaction} transaction
 * @param {boolean} shouldReuseMarkup If true, do not insert markup
 */
function mountComponentIntoNode(wrapperInstance, container, transaction, shouldReuseMarkup, context) {
  var markerName;
  if (ReactFeatureFlags_1.logTopLevelRenders) {
    var wrappedElement = wrapperInstance._currentElement.props.child;
    var type = wrappedElement.type;
    markerName = 'React mount: ' + (typeof type === 'string' ? type : type.displayName || type.name);
    console.time(markerName);
  }

  var markup = ReactReconciler_1.mountComponent(wrapperInstance, transaction, null, ReactDOMContainerInfo_1(wrapperInstance, container), context, 0 /* parentDebugID */
  );

  if (markerName) {
    console.timeEnd(markerName);
  }

  wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance;
  ReactMount._mountImageIntoNode(markup, container, wrapperInstance, shouldReuseMarkup, transaction);
}

/**
 * Batched mount.
 *
 * @param {ReactComponent} componentInstance The instance to mount.
 * @param {DOMElement} container DOM element to mount into.
 * @param {boolean} shouldReuseMarkup If true, do not insert markup
 */
function batchedMountComponentIntoNode(componentInstance, container, shouldReuseMarkup, context) {
  var transaction = ReactUpdates_1.ReactReconcileTransaction.getPooled(
  /* useCreateElement */
  !shouldReuseMarkup && ReactDOMFeatureFlags_1.useCreateElement);
  transaction.perform(mountComponentIntoNode, null, componentInstance, container, transaction, shouldReuseMarkup, context);
  ReactUpdates_1.ReactReconcileTransaction.release(transaction);
}

/**
 * Unmounts a component and removes it from the DOM.
 *
 * @param {ReactComponent} instance React component instance.
 * @param {DOMElement} container DOM element to unmount from.
 * @final
 * @internal
 * @see {ReactMount.unmountComponentAtNode}
 */
function unmountComponentFromNode(instance, container, safely) {
  ReactReconciler_1.unmountComponent(instance, safely);
  if (container.nodeType === DOC_NODE_TYPE) {
    container = container.documentElement;
  }

  // http://jsperf.com/emptying-a-node
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

/**
 * True if the supplied DOM node has a direct React-rendered child that is
 * not a React root element. Useful for warning in `render`,
 * `unmountComponentAtNode`, etc.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM element contains a direct child that was
 * rendered by React but is not a root element.
 * @internal
 */
function hasNonRootReactChild(container) {
  var rootEl = getReactRootElementInContainer(container);
  if (rootEl) {
    var inst = ReactDOMComponentTree_1.getInstanceFromNode(rootEl);
    return !!(inst && inst._hostParent);
  }
}

/**
 * True if the supplied DOM node is a valid node element.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM is a valid DOM node.
 * @internal
 */
function isValidContainer(node) {
  return !!(node && (node.nodeType === ELEMENT_NODE_TYPE$1 || node.nodeType === DOC_NODE_TYPE || node.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE$1));
}

function getHostRootInstanceInContainer(container) {
  var rootEl = getReactRootElementInContainer(container);
  var prevHostInstance = rootEl && ReactDOMComponentTree_1.getInstanceFromNode(rootEl);
  return prevHostInstance && !prevHostInstance._hostParent ? prevHostInstance : null;
}

function getTopLevelWrapperInContainer(container) {
  var root = getHostRootInstanceInContainer(container);
  return root ? root._hostContainerInfo._topLevelWrapper : null;
}

/**
 * Temporary (?) hack so that we can store all top-level pending updates on
 * composites instead of having to worry about different types of components
 * here.
 */
var topLevelRootCounter = 1;
var TopLevelWrapper = function () {
  this.rootID = topLevelRootCounter++;
};
TopLevelWrapper.prototype.isReactComponent = {};
TopLevelWrapper.prototype.render = function () {
  return this.props.child;
};
TopLevelWrapper.isReactTopLevelWrapper = true;

/**
 * Mounting is the process of initializing a React component by creating its
 * representative DOM elements and inserting them into a supplied `container`.
 * Any prior content inside `container` is destroyed in the process.
 *
 *   ReactMount.render(
 *     component,
 *     document.getElementById('container')
 *   );
 *
 *   <div id="container">                   <-- Supplied `container`.
 *     <div data-reactid=".3">              <-- Rendered reactRoot of React
 *       // ...                                 component.
 *     </div>
 *   </div>
 *
 * Inside of `container`, the first element rendered is the "reactRoot".
 */
var ReactMount = {
  TopLevelWrapper: TopLevelWrapper,

  /**
   * Used by devtools. The keys are not important.
   */
  _instancesByReactRootID: instancesByReactRootID,

  /**
   * This is a hook provided to support rendering React components while
   * ensuring that the apparent scroll position of its `container` does not
   * change.
   *
   * @param {DOMElement} container The `container` being rendered into.
   * @param {function} renderCallback This must be called once to do the render.
   */
  scrollMonitor: function (container, renderCallback) {
    renderCallback();
  },

  /**
   * Take a component that's already mounted into the DOM and replace its props
   * @param {ReactComponent} prevComponent component instance already in the DOM
   * @param {ReactElement} nextElement component instance to render
   * @param {DOMElement} container container to render into
   * @param {?function} callback function triggered on completion
   */
  _updateRootComponent: function (prevComponent, nextElement, nextContext, container, callback) {
    ReactMount.scrollMonitor(container, function () {
      ReactUpdateQueue_1.enqueueElementInternal(prevComponent, nextElement, nextContext);
      if (callback) {
        ReactUpdateQueue_1.enqueueCallbackInternal(prevComponent, callback);
      }
    });

    return prevComponent;
  },

  /**
   * Render a new component into the DOM. Hooked by hooks!
   *
   * @param {ReactElement} nextElement element to render
   * @param {DOMElement} container container to render into
   * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
   * @return {ReactComponent} nextComponent
   */
  _renderNewRootComponent: function (nextElement, container, shouldReuseMarkup, context) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case.
    void 0;

    !isValidContainer(container) ? reactProdInvariant_1$2('37') : void 0;

    ReactBrowserEventEmitter_1.ensureScrollValueMonitoring();
    var componentInstance = instantiateReactComponent_1(nextElement, false);

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.

    ReactUpdates_1.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context);

    var wrapperID = componentInstance._instance.rootID;
    instancesByReactRootID[wrapperID] = componentInstance;

    return componentInstance;
  },

  /**
   * Renders a React component into the DOM in the supplied `container`.
   *
   * If the React component was previously rendered into `container`, this will
   * perform an update on it and only mutate the DOM as necessary to reflect the
   * latest React component.
   *
   * @param {ReactComponent} parentComponent The conceptual parent of this render tree.
   * @param {ReactElement} nextElement Component element to render.
   * @param {DOMElement} container DOM element to render into.
   * @param {?function} callback function triggered on completion
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
    !(parentComponent != null && ReactInstanceMap_1.has(parentComponent)) ? reactProdInvariant_1$2('38') : void 0;
    return ReactMount._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);
  },

  _renderSubtreeIntoContainer: function (parentComponent, nextElement, container, callback) {
    ReactUpdateQueue_1.validateCallback(callback, 'ReactDOM.render');
    !React_1.isValidElement(nextElement) ? reactProdInvariant_1$2('39', typeof nextElement === 'string' ? " Instead of passing a string like 'div', pass " + "React.createElement('div') or <div />." : typeof nextElement === 'function' ? ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : void 0;

    void 0;

    var nextWrappedElement = React_1.createElement(TopLevelWrapper, {
      child: nextElement
    });

    var nextContext;
    if (parentComponent) {
      var parentInst = ReactInstanceMap_1.get(parentComponent);
      nextContext = parentInst._processChildContext(parentInst._context);
    } else {
      nextContext = emptyObject_1;
    }

    var prevComponent = getTopLevelWrapperInContainer(container);

    if (prevComponent) {
      var prevWrappedElement = prevComponent._currentElement;
      var prevElement = prevWrappedElement.props.child;
      if (shouldUpdateReactComponent_1(prevElement, nextElement)) {
        var publicInst = prevComponent._renderedComponent.getPublicInstance();
        var updatedCallback = callback && function () {
          callback.call(publicInst);
        };
        ReactMount._updateRootComponent(prevComponent, nextWrappedElement, nextContext, container, updatedCallback);
        return publicInst;
      } else {
        ReactMount.unmountComponentAtNode(container);
      }
    }

    var reactRootElement = getReactRootElementInContainer(container);
    var containerHasReactMarkup = reactRootElement && !!internalGetID(reactRootElement);
    var containerHasNonRootReactChild = hasNonRootReactChild(container);

    var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;
    var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance();
    if (callback) {
      callback.call(component);
    }
    return component;
  },

  /**
   * Renders a React component into the DOM in the supplied `container`.
   * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.render
   *
   * If the React component was previously rendered into `container`, this will
   * perform an update on it and only mutate the DOM as necessary to reflect the
   * latest React component.
   *
   * @param {ReactElement} nextElement Component element to render.
   * @param {DOMElement} container DOM element to render into.
   * @param {?function} callback function triggered on completion
   * @return {ReactComponent} Component instance rendered in `container`.
   */
  render: function (nextElement, container, callback) {
    return ReactMount._renderSubtreeIntoContainer(null, nextElement, container, callback);
  },

  /**
   * Unmounts and destroys the React component rendered in the `container`.
   * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.unmountcomponentatnode
   *
   * @param {DOMElement} container DOM element containing a React component.
   * @return {boolean} True if a component was found in and unmounted from
   *                   `container`
   */
  unmountComponentAtNode: function (container) {
    // Various parts of our code (such as ReactCompositeComponent's
    // _renderValidatedComponent) assume that calls to render aren't nested;
    // verify that that's the case. (Strictly speaking, unmounting won't cause a
    // render but we still don't expect to be in a render call here.)
    void 0;

    !isValidContainer(container) ? reactProdInvariant_1$2('40') : void 0;

    var prevComponent = getTopLevelWrapperInContainer(container);
    if (!prevComponent) {
      // Check if the node being unmounted was rendered by React, but isn't a
      // root node.
      var containerHasNonRootReactChild = hasNonRootReactChild(container);

      // Check if the container itself is a React root node.
      var isContainerReactRoot = container.nodeType === 1 && container.hasAttribute(ROOT_ATTR_NAME);

      return false;
    }
    delete instancesByReactRootID[prevComponent._instance.rootID];
    ReactUpdates_1.batchedUpdates(unmountComponentFromNode, prevComponent, container, false);
    return true;
  },

  _mountImageIntoNode: function (markup, container, instance, shouldReuseMarkup, transaction) {
    !isValidContainer(container) ? reactProdInvariant_1$2('41') : void 0;

    if (shouldReuseMarkup) {
      var rootElement = getReactRootElementInContainer(container);
      if (ReactMarkupChecksum_1.canReuseMarkup(markup, rootElement)) {
        ReactDOMComponentTree_1.precacheNode(instance, rootElement);
        return;
      } else {
        var checksum = rootElement.getAttribute(ReactMarkupChecksum_1.CHECKSUM_ATTR_NAME);
        rootElement.removeAttribute(ReactMarkupChecksum_1.CHECKSUM_ATTR_NAME);

        var rootMarkup = rootElement.outerHTML;
        rootElement.setAttribute(ReactMarkupChecksum_1.CHECKSUM_ATTR_NAME, checksum);

        var normalizedMarkup = markup;
        var diffIndex = firstDifferenceIndex(normalizedMarkup, rootMarkup);
        var difference = ' (client) ' + normalizedMarkup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);

        !(container.nodeType !== DOC_NODE_TYPE) ? reactProdInvariant_1$2('42', difference) : void 0;

        
      }
    }

    !(container.nodeType !== DOC_NODE_TYPE) ? reactProdInvariant_1$2('43') : void 0;

    if (transaction.useCreateElement) {
      while (container.lastChild) {
        container.removeChild(container.lastChild);
      }
      DOMLazyTree_1.insertTreeBefore(container, markup, null);
    } else {
      setInnerHTML_1(container, markup);
      ReactDOMComponentTree_1.precacheNode(instance, container.firstChild);
    }

    
  }
};

var ReactMount_1 = ReactMount;

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

var ReactVersion$3 = '15.6.1';

function getHostComponentFromComposite(inst) {
  var type;

  while ((type = inst._renderedNodeType) === ReactNodeTypes_1.COMPOSITE) {
    inst = inst._renderedComponent;
  }

  if (type === ReactNodeTypes_1.HOST) {
    return inst._renderedComponent;
  } else if (type === ReactNodeTypes_1.EMPTY) {
    return null;
  }
}

var getHostComponentFromComposite_1 = getHostComponentFromComposite;

/**
 * Returns the DOM node rendered by this element.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode
 *
 * @param {ReactComponent|DOMElement} componentOrElement
 * @return {?DOMElement} The root node of this element.
 */
function findDOMNode(componentOrElement) {
  if (componentOrElement == null) {
    return null;
  }
  if (componentOrElement.nodeType === 1) {
    return componentOrElement;
  }

  var inst = ReactInstanceMap_1.get(componentOrElement);
  if (inst) {
    inst = getHostComponentFromComposite_1(inst);
    return inst ? ReactDOMComponentTree_1.getNodeFromInstance(inst) : null;
  }

  if (typeof componentOrElement.render === 'function') {
    reactProdInvariant_1$2('44');
  } else {
    reactProdInvariant_1$2('45', Object.keys(componentOrElement));
  }
}

var findDOMNode_1 = findDOMNode;

var renderSubtreeIntoContainer = ReactMount_1.renderSubtreeIntoContainer;

ReactDefaultInjection.inject();

var ReactDOM = {
  findDOMNode: findDOMNode_1,
  render: ReactMount_1.render,
  unmountComponentAtNode: ReactMount_1.unmountComponentAtNode,
  version: ReactVersion$3,

  /* eslint-disable camelcase */
  unstable_batchedUpdates: ReactUpdates_1.batchedUpdates,
  unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
  /* eslint-enable camelcase */
};

// Inject the runtime into a devtools global hook regardless of browser.
// Allows for debugging when the hook is injected on the page.
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
    ComponentTree: {
      getClosestInstanceFromNode: ReactDOMComponentTree_1.getClosestInstanceFromNode,
      getNodeFromInstance: function (inst) {
        // inst is an internal instance (but could be a composite)
        if (inst._renderedComponent) {
          inst = getHostComponentFromComposite_1(inst);
        }
        if (inst) {
          return ReactDOMComponentTree_1.getNodeFromInstance(inst);
        } else {
          return null;
        }
      }
    },
    Mount: ReactMount_1,
    Reconciler: ReactReconciler_1
  });
}

var ReactDOM_1 = ReactDOM;

var index$2 = ReactDOM_1;

var index_1 = index$2.render;

var Components = function (__exports) {
  var LazyView = __exports.LazyView = function (_Component) {
    babelHelpers.inherits(LazyView, _Component);
    babelHelpers.createClass(LazyView, [{
      key: _Symbol.reflection,
      value: function value() {
        return extendInfo(LazyView, {
          type: "Elmish.React.Components.LazyView",
          interfaces: [],
          properties: {}
        });
      }
    }]);

    function LazyView(props) {
      babelHelpers.classCallCheck(this, LazyView);

      var _this = babelHelpers.possibleConstructorReturn(this, (LazyView.__proto__ || Object.getPrototypeOf(LazyView)).call(this, props));

      return _this;
    }

    babelHelpers.createClass(LazyView, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !this.props.equal(this.props.model, nextProps.model);
      }
    }, {
      key: "render",
      value: function render() {
        return this.props.render();
      }
    }]);
    return LazyView;
  }(react_2);

  setType("Elmish.React.Components.LazyView", LazyView);
  return __exports;
}({});
var Common = function (__exports) {
  var lazyViewWith = __exports.lazyViewWith = function (equal, view, state) {
    return react_1(Components.LazyView, function () {
      var render = function render() {
        return view(state);
      };

      return {
        model: state,
        render: render,
        equal: equal
      };
    }());
  };

  var lazyView2With = __exports.lazyView2With = function (equal, view, state, dispatch) {
    return react_1(Components.LazyView, function () {
      var render = function render() {
        return view(state, dispatch);
      };

      return {
        model: state,
        render: render,
        equal: equal
      };
    }());
  };

  var lazyView3With = __exports.lazyView3With = function (equal, view, state1, state2, dispatch) {
    return react_1(Components.LazyView, function () {
      var render = function render() {
        return view(state1, state2, dispatch);
      };

      return {
        model: [state1, state2],
        render: render,
        equal: equal
      };
    }());
  };

  var lazyView = __exports.lazyView = function (view) {
    var equal = function equal(x, y) {
      return equals(x, y);
    };

    return function (state) {
      return lazyViewWith(equal, view, state);
    };
  };

  var lazyView2 = __exports.lazyView2 = function (view) {
    var equal = function equal(x, y) {
      return equals(x, y);
    };

    return function (state, dispatch) {
      return lazyView2With(equal, view, state, dispatch);
    };
  };

  var lazyView3 = __exports.lazyView3 = function (view) {
    var equal = function equal(x, y) {
      return equals(x, y);
    };

    return function (state1, state2, dispatch) {
      return lazyView3With(equal, view, state1, state2, dispatch);
    };
  };

  return __exports;
}({});

function withReact(placeholderId, program) {
  var lastRequest = null;

  var setState = function setState(model, dispatch) {
    if (lastRequest != null) {
      var r = lastRequest;
      window.cancelAnimationFrame(r);
    }

    lastRequest = window.requestAnimationFrame(function (_arg1) {
      index_1(Common.lazyView2With(function (x, y) {
        return x === y;
      }, program.view, model, dispatch), document.getElementById(placeholderId));
    });
  };

  return new Program(program.init, program.update, program.subscribe, program.view, setState, program.onError);
}

var Navigable = function () {
  function Navigable(tag, data) {
    babelHelpers.classCallCheck(this, Navigable);
    this.tag = tag;
    this.data = data;
  }

  babelHelpers.createClass(Navigable, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elmish.Browser.Navigation.Navigable",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: [["Change", Interface("Fable.Import.Browser.Location")], ["UserMsg", GenericParam("msg")]]
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return this === other || this.tag === other.tag && equals(this.data, other.data);
    }
  }]);
  return Navigable;
}();
setType("Elmish.Browser.Navigation.Navigable", Navigable);
var Navigation = function (__exports) {
  var NavigatedEvent = __exports.NavigatedEvent = "NavigatedEvent";

  var modifyUrl = __exports.modifyUrl = function (newUrl) {
    return ofArray([function (_arg1) {
      history.replaceState(null, "", newUrl);
    }]);
  };

  var newUrl = __exports.newUrl = function (newUrl_1) {
    return ofArray([function (_arg1) {
      history.pushState(null, "", newUrl_1);
      var ev = document.createEvent("CustomEvent");
      ev.initCustomEvent("NavigatedEvent", true, true, {});
      window.dispatchEvent(ev);
    }]);
  };

  var jump = __exports.jump = function (n) {
    return ofArray([function (_arg1) {
      history.go(n);
    }]);
  };

  return __exports;
}({});
var ProgramModule$1 = function (__exports) {
  var toNavigable = __exports.toNavigable = function (parser, urlUpdate, program) {
    var map$$1 = function map$$1(tupledArg) {
      return [tupledArg[0], Cmd.map(function (arg0) {
        return new Navigable(1, arg0);
      }, tupledArg[1])];
    };

    var update = function update(msg, model) {
      return map$$1(msg.tag === 1 ? program.update(msg.data, model) : urlUpdate(parser(msg.data), model));
    };

    var locationChanges = function locationChanges(dispatch) {
      var lastLocation = null;

      var onChange = function onChange(_arg1) {
        return function () {
          var $var1 = lastLocation != null ? function () {
            var href = lastLocation;
            return href === window.location.href;
          }() ? [0, lastLocation] : [1] : [1];

          switch ($var1[0]) {
            case 0:
              break;

            case 1:
              lastLocation = window.location.href;
              dispatch(new Navigable(0, window.location));
              break;
          }
        }();
      };

      window.addEventListener("popstate", onChange);
      window.addEventListener("hashchange", onChange);
      window.addEventListener("NavigatedEvent", onChange);
    };

    var subs = function subs(model_1) {
      return Cmd.batch(ofArray([ofArray([locationChanges]), Cmd.map(function (arg0_1) {
        return new Navigable(1, arg0_1);
      }, program.subscribe(model_1))]));
    };

    var init = function init() {
      return map$$1(program.init(parser(window.location)));
    };

    var setState = function setState(model_2, dispatch_1) {
      program.setState(model_2, function ($var2) {
        return dispatch_1(function (arg0_2) {
          return new Navigable(1, arg0_2);
        }($var2));
      });
    };

    return new Program(init, update, subs, function (model_3, dispatch_2) {
      return program.view(model_3, function ($var3) {
        return dispatch_2(function (arg0_3) {
          return new Navigable(1, arg0_3);
        }($var3));
      });
    }, setState, program.onError);
  };

  return __exports;
}({});

var Result = function () {
    function Result(tag, data) {
        classCallCheck(this, Result);

        this.tag = tag | 0;
        this.data = data;
    }

    createClass$2(Result, [{
        key: "Equals",
        value: function Equals(other) {
            return equalsUnions(this, other);
        }
    }, {
        key: "CompareTo",
        value: function CompareTo(other) {
            return compareUnions(this, other);
        }
    }, {
        key: _Symbol.reflection,
        value: function value() {
            return {
                type: "Microsoft.FSharp.Core.FSharpResult",
                interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
                cases: [["Ok", Any], ["Error", Any]]
            };
        }
    }]);
    return Result;
}();

function tuple(a, b) {
  var matchValue = [a, b];
  var $var1 = matchValue[0] != null ? matchValue[1] != null ? [0, matchValue[0], matchValue[1]] : [1] : [1];

  switch ($var1[0]) {
    case 0:
      return [$var1[1], $var1[2]];

    case 1:
      return null;
  }
}
function ofFunc(f, arg) {
  try {
    return f(arg);
  } catch (matchValue) {
    return null;
  }
}

var State = function () {
  function State(visited, unvisited, args, value) {
    babelHelpers.classCallCheck(this, State);
    this.visited = visited;
    this.unvisited = unvisited;
    this.args = args;
    this.value = value;
  }

  babelHelpers.createClass(State, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Elmish.Browser.UrlParser.State",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          visited: makeGeneric(List$1, {
            T: "string"
          }),
          unvisited: makeGeneric(List$1, {
            T: "string"
          }),
          args: makeGeneric(FableMap, {
            Key: "string",
            Value: "string"
          }),
          value: GenericParam("v")
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function CompareTo(other) {
      return compareRecords(this, other) | 0;
    }
  }]);
  return State;
}();
setType("Elmish.Browser.UrlParser.State", State);
var StateModule = function (__exports) {
  var mkState = __exports.mkState = function (visited, unvisited, args, value) {
    return new State(visited, unvisited, args, value);
  };

  var map$$1 = __exports.map = function (f, _arg1) {
    return new State(_arg1.visited, _arg1.unvisited, _arg1.args, f(_arg1.value));
  };

  return __exports;
}({});



function s(str_1) {
  var inner = function inner(_arg1) {
    if (_arg1.unvisited.tail != null) {
      if (_arg1.unvisited.head === str_1) {
        return ofArray([StateModule.mkState(new List$1(_arg1.unvisited.head, _arg1.visited), _arg1.unvisited.tail, _arg1.args, _arg1.value)]);
      } else {
        return new List$1();
      }
    } else {
      return new List$1();
    }
  };

  return inner;
}

function map_1(subValue, parse$$1) {
  var inner = function inner(_arg1) {
    return map(function (arg10_) {
      return StateModule.map(_arg1.value, arg10_);
    }, parse$$1(new State(_arg1.visited, _arg1.unvisited, _arg1.args, subValue)));
  };

  return inner;
}

function oneOf(parsers, state) {
  return collect(function (parser) {
    return parser(state);
  }, parsers);
}
function top(state) {
  return ofArray([state]);
}




function parseHelp(states) {
  parseHelp: while (true) {
    if (states.tail != null) {
      var $var2 = states.head.unvisited.tail != null ? states.head.unvisited.head === "" ? states.head.unvisited.tail.tail == null ? [1] : [2] : [2] : [0];

      switch ($var2[0]) {
        case 0:
          return states.head.value;

        case 1:
          return states.head.value;

        case 2:
          states = states.tail;
          continue parseHelp;
      }
    } else {
      return null;
    }
  }
}
function splitUrl(url) {
  var matchValue = ofArray(split(url, "/"));
  var $var3 = matchValue.tail != null ? matchValue.head === "" ? [0, matchValue.tail] : [1, matchValue] : [1, matchValue];

  switch ($var3[0]) {
    case 0:
      return $var3[1];

    case 1:
      return $var3[1];
  }
}
function parse$3(parser, url, args) {
  return parseHelp(parser(new State(new List$1(), splitUrl(url), args, function (x) {
    return x;
  })));
}
function toKeyValuePair(segment) {
  var matchValue = split(segment, "=");

  if (matchValue.length === 2) {
    var value = matchValue[1];
    var key = matchValue[0];
    return tuple(ofFunc(decodeURI, key), ofFunc(decodeURI, value));
  } else {
    return null;
  }
}
function parseParams(querystring) {
  return create(choose$1(function (x) {
    return x;
  }, function (source) {
    return map$2(function (segment) {
      return toKeyValuePair(segment);
    }, source);
  }(split(querystring.substr(1), "&"))), new Comparer(comparePrimitives));
}

function parseHash(parser, location) {
  var patternInput = void 0;
  var hash$$1 = location.hash.substr(1);

  if (hash$$1.indexOf("?") >= 0) {
    var h = hash$$1.substr(0, hash$$1.indexOf("?"));
    patternInput = [h, hash$$1.substr(h.length)];
  } else {
    patternInput = [hash$$1, "?"];
  }

  return parse$3(parser, patternInput[0], parseParams(patternInput[1]));
}

function init$2(code) {
  return new Model$1(false, code);
}
function update$2(msg, model) {
  if (msg.tag === 1) {
    return [new Model$1(false, model.Code), Cmd.none()];
  } else {
    return [new Model$1(true, model.Code), Cmd.none()];
  }
}

var inlineBlockCode = "\r\n```fsharp\r\n    // Block\r\n    yield div [ ClassName \"field\"] [\r\n        yield! Checkradio.checkbox [ ] [ str \"One\" ]\r\n        \r\n    ]\r\n    yield div [ ClassName \"field\"] [\r\n        yield! Checkradio.checkbox [ ] [ str \"Two\" ]\r\n    ]\r\n                       \r\n    // Inline\r\n    yield div [ ClassName \"field\"] [\r\n        yield! Checkradio.checkbox [ ] [ str \"One \" ]\r\n        yield! Checkradio.checkbox [ ] [ str \"Two \" ]\r\n    ]\r\n```\r\n    ";
var colorCode = "\r\n```fsharp\r\n    Checkbox.checkbox [ ] [ str \"Button\" ]\r\n    Checkbox.checkbox [ Checkbox.isWhite ] [ str \"White\" ]\r\n    Checkbox.checkbox [ Checkbox.isLight ] [ str \"Light\" ]\r\n    Checkbox.checkbox [ Checkbox.isDark ] [ str \"Dark\" ]\r\n    Checkbox.checkbox [ Checkbox.isBlack ] [ str \"Black\" ]\r\n    Checkbox.checkbox [ Checkbox.isPrimary ] [ str \"Primary\" ]\r\n    Checkbox.checkbox [ Checkbox.isInfo ] [ str \"Info\" ]\r\n    Checkbox.checkbox [ Checkbox.isSuccess ] [ str \"Success\" ]\r\n    Checkbox.checkbox [ Checkbox.isWarning ] [ str \"Warning\" ]\r\n    Checkbox.checkbox [ Checkbox.isDanger ] [ str \"Danger\" ]\r\n```\r\n    ";
var sizeCode = "\r\n```fsharp\r\n    Checkbox.checkbox [ Checkbox.isSmall ] [ str \"Small\" ]\r\n    Checkbox.checkbox [ ] [ str \"Normal\" ]\r\n    Checkbox.checkbox [ Checkbox.isMedium ] [ str \"Medium\" ]\r\n    Checkbox.checkbox [ Checkbox.isLarge ] [ str \"Large\" ]\r\n```\r\n    ";
var circleCode = "\r\n```fsharp\r\n    Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle ] [ str \"Checkbox\" ]\r\n    Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isPrimary ] [ str \"Checkbox\" ]\r\n    Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isSuccess ] [ str \"Checkbox - success\" ]\r\n    Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isWarning ] [ str \"Checkbox - warning\" ]\r\n    Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isDanger ] [ str \"Checkbox - danger\" ]\r\n    Checkbox.checkbox [ Checkbox.isChecked; Checkbox.isCircle; Checkbox.isInfo ] [ str \"Checkbox - info\" ]\r\n```\r\n    ";

var stateCode = "\r\n```fsharp\r\n    Checkradio.checkbox [  Checkradio.isDisabled ] [ str \"Disabled\" ]\r\n    Checkradio.checkbox [  Checkradio.isDisabled; Checkradio.isChecked ] [ str \"Disabled & Checked\" ]\r\n    Checkradio.checkbox [ ] [ str \"Unchecked\" ]\r\n    Checkradio.checkbox [ Checkradio.isChecked;] [ str \"checked\" ]\r\n```\r\n    ";
var eventCode = "\r\n```fsharp\r\n    // For registering a change event, we can use the Checkradio.onChange helper\r\n    yield! Checkradio.checkbox \r\n            [ \r\n                if model.IsChecked then yield Checkradio.isChecked;  \r\n                yield Checkradio.onChange (fun x -> dispatch (Change state))\r\n            ] \r\n            [ str  (sprintf \"%A\" model.IsChecked) ]\r\n\r\n```\r\n    ";
var intro = "\r\n# Checkbox\r\n\r\nThe **Checkbox** can have different colors, sizes and states.\r\n\r\n*[bulma-checkradio documentation](https://github.com/Wikiki/bulma-checkradio)*\r\n        ";
function init$1() {
  var InlineBlockViewer = init$2(inlineBlockCode);
  var ColorViewer = init$2(colorCode);
  var SizeViewer = init$2(sizeCode);
  var CircleViewer = init$2(circleCode);
  var StateViewer = init$2(stateCode);
  var EventViewer = init$2(eventCode);
  return new Model(intro, InlineBlockViewer, ColorViewer, SizeViewer, CircleViewer, StateViewer, EventViewer, false);
}
function update$1(msg, model) {
  if (msg.tag === 1) {
    var patternInput = update$2(msg.data, model.ColorViewer);
    return [new Model(model.Intro, model.InlineBlockViewer, patternInput[0], model.SizeViewer, model.CircleViewer, model.StateViewer, model.EventViewer, model.IsChecked), Cmd.map(function (arg0) {
      return new Msg(1, arg0);
    }, patternInput[1])];
  } else if (msg.tag === 2) {
    var patternInput_1 = update$2(msg.data, model.SizeViewer);
    return [new Model(model.Intro, model.InlineBlockViewer, model.ColorViewer, patternInput_1[0], model.CircleViewer, model.StateViewer, model.EventViewer, model.IsChecked), Cmd.map(function (arg0_1) {
      return new Msg(2, arg0_1);
    }, patternInput_1[1])];
  } else if (msg.tag === 3) {
    var patternInput_2 = update$2(msg.data, model.CircleViewer);
    return [new Model(model.Intro, model.InlineBlockViewer, model.ColorViewer, model.SizeViewer, patternInput_2[0], model.StateViewer, model.EventViewer, model.IsChecked), Cmd.map(function (arg0_2) {
      return new Msg(3, arg0_2);
    }, patternInput_2[1])];
  } else if (msg.tag === 4) {
    var patternInput_3 = update$2(msg.data, model.StateViewer);
    return [new Model(model.Intro, model.InlineBlockViewer, model.ColorViewer, model.SizeViewer, model.CircleViewer, patternInput_3[0], model.EventViewer, model.IsChecked), Cmd.map(function (arg0_3) {
      return new Msg(4, arg0_3);
    }, patternInput_3[1])];
  } else if (msg.tag === 5) {
    var patternInput_4 = update$2(msg.data, model.EventViewer);
    return [new Model(model.Intro, model.InlineBlockViewer, model.ColorViewer, model.SizeViewer, model.CircleViewer, model.StateViewer, patternInput_4[0], model.IsChecked), Cmd.map(function (arg0_4) {
      return new Msg(5, arg0_4);
    }, patternInput_4[1])];
  } else if (msg.tag === 6) {
    return [new Model(model.Intro, model.InlineBlockViewer, model.ColorViewer, model.SizeViewer, model.CircleViewer, model.StateViewer, model.EventViewer, msg.data), Cmd.none()];
  } else {
    var patternInput_5 = update$2(msg.data, model.InlineBlockViewer);
    return [new Model(model.Intro, patternInput_5[0], model.ColorViewer, model.SizeViewer, model.CircleViewer, model.StateViewer, model.EventViewer, model.IsChecked), Cmd.map(function (arg0_5) {
      return new Msg(0, arg0_5);
    }, patternInput_5[1])];
  }
}

function init$3() {
  return new Model$3("\r\n# Fable.Elmish.Bulma\r\n\r\nProvide a wrapper around [Bulma](http://bulma.io/) for [Elmish](https://fable-elmish.github.io/).\r\n\r\nThis website isn't intended into providing a full documentation of Bulma.\r\n\r\nIt's only serve as a documentation of the wrapper and also test that the wrappers are working as this website is build with Fable.Elmish.Bulma itself.\r\n\r\n---\r\n\r\n## How to install ?\r\n\r\nAdd `Fable.Elmish.Bulma` dependence into your paket files.\r\n\r\n```\r\n// paket.denpendencies\r\nnuget Fable.Elmish.Bulma\r\n\r\n// paket.reference\r\nFable.Elmish.Bulma\r\n```\r\n\r\nRun `paket.exe update` at your project root and then `dotnet restore` on your `*.fsproj` file.\r\n\r\nYou are ready to start using Fable.Elmish.Bulma. You can confirm it by trying to open `Elmish.Bulma` namespace.\r\n\r\n```fsharp\r\nopen Elmish.Bulma\r\n```\r\n\r\n## Architecture\r\n\r\nFable.Elmish.Bulma has been designed to provide the best experience over the Bulma CSS framework.\r\nTo archieve this goal, we assume the user to follow some conventions.\r\n\r\nAlways open the \"global\" module and not the lower module of the hierachie. For example, if you want to use the Button element you should follow this code:\r\n\r\n```fsharp\r\nopen Elmish.Bulma.Elements\r\n\r\nButton.button [ Button.isSmall ]\r\n    [ str \"A button\" ]\r\n```\r\n\r\nEvery function follow the \"React DSL\":\r\n\r\n1. Name of the element\r\n2. List of properties\r\n3. Children\r\n\r\nFable.Elmish.Bulma do not only provide wrappers around Bulma but also intellisense the classes provied.\r\n\r\nFor example, here is how to access the \"is-hidden\" class.\r\n\r\n```fsharp\r\n\r\nopen Elmish.Bulma.BulmaClasses\r\n\r\nBulma.Properties.Visibility.IsHidden\r\n\r\n```\r\n\r\nAll the compoments documented into this website, are available into the library.\r\n\r\n   ");
}

var pageParser = function () {
  var parsers = ofArray([map_1(new Page(0), s("home")), map_1(new Page(1, new Elements(0)), function () {
    var parseBefore = s("elements");
    var parseAfter = s("checkradio");
    return function (state) {
      return collect(parseAfter, parseBefore(state));
    };
  }()), map_1(new Page(0), function (state_1) {
    return top(state_1);
  })]);
  return function (state_2) {
    return oneOf(parsers, state_2);
  };
}();
function urlUpdate(result, model) {
  if (result != null) {
    return [new Model$2(result, model.Home, model.Elements), new List$1()];
  } else {
    console.error("Error parsing url");
    return [model, Navigation.modifyUrl(toHash(model.CurrentPage))];
  }
}
function init(result) {
  var elements = new ElementsModel(init$1());
  var patternInput = urlUpdate(result, new Model$2(new Page(0), init$3(), elements));
  return [patternInput[0], Cmd.batch(ofArray([patternInput[1]]))];
}
function update(msg, model) {
  var patternInput = update$1(msg.data, model.Elements.Checkradio);
  return [function () {
    var Elements$$1 = new ElementsModel(patternInput[0]);
    return new Model$2(model.CurrentPage, model.Home, Elements$$1);
  }(), Cmd.map(function (arg0) {
    return new Msg$2(0, arg0);
  }, patternInput[1])];
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var pathGetter_1 = pathGetter;

function pathGetter(obj, path) {
  if (path !== '$') {
    var paths = getPaths(path);
    for (var i = 0; i < paths.length; i++) {
      path = paths[i].toString().replace(/\\"/g, '"');
      if (typeof obj[path] === 'undefined' && i !== paths.length - 1) continue;
      obj = obj[path];
    }
  }
  return obj;
}

function getPaths(pathString) {
  var regex = /(?:\.(\w+))|(?:\[(\d+)\])|(?:\["((?:[^\\"]|\\.)*)"\])/g;
  var matches = [];
  var match;
  while (match = regex.exec(pathString)) {
    matches.push( match[1] || match[2] || match[3] );
  }
  return matches;
}

var getRegexFlags = function getRegexFlags(regex) {
  var flags = '';
  if (regex.ignoreCase) flags += 'i';
  if (regex.global) flags += 'g';
  if (regex.multiline) flags += 'm';
  return flags;
};

var stringifyFunction = function stringifyFunction(fn, customToString) {
  if (typeof customToString === 'function') {
    return customToString(fn);
  }
  var str = fn.toString();
  var match = str.match(/^[^{]*{|^[^=]*=>/);
  var start = match ? match[0] : '<function> ';
  var end = str[str.length - 1] === '}' ? '}' : '';
  return start.replace(/\r\n|\n/g, ' ').replace(/\s+/g, ' ') + ' /* ... */ ' + end;
};

var restore = function restore(obj, root) {
  var type = obj[0];
  var rest = obj.slice(1);
  switch(type) {
    case '$':
      return pathGetter_1(root, obj);
    case 'r':
      var comma = rest.indexOf(',');
      var flags = rest.slice(0, comma);
      var source = rest.slice(comma + 1);
      return RegExp(source, flags);
    case 'd':
      return new Date(+rest);
    case 'f':
      var fn = function() { throw new Error("can't run jsan parsed function") };
      fn.toString = function() { return rest; };
      return fn;
    case 'u':
      return undefined;
    case 'e':
      var error = new Error(rest);
      error.stack = 'Stack is unavailable for jsan parsed errors';
      return error;
    case 's':
      return Symbol(rest);
    case 'g':
      return Symbol.for(rest);
    case 'm':
      return new Map(index$8.parse(rest));
    case 'l':
      return new Set(index$8.parse(rest));
    case 'n':
      return NaN;
    case 'i':
      return Infinity;
    case 'y':
      return -Infinity;
    default:
      console.warn('unknown type', obj);
      return obj;
  }
};

var utils = {
	getRegexFlags: getRegexFlags,
	stringifyFunction: stringifyFunction,
	restore: restore
};

var WMap = typeof WeakMap !== 'undefined'?
  WeakMap:
  function() {
    var keys = [];
    var values = [];
    return {
      set: function(key, value) {
        keys.push(key);
        values.push(value);
      },
      get: function(key) {
        for (var i = 0; i < keys.length; i++) {
          if (keys[i] === key) {
            return values[i];
          }
        }
      }
    }
  };

// Based on https://github.com/douglascrockford/JSON-js/blob/master/cycle.js

var decycle = function decycle(object, options, replacer) {
  'use strict';

  var map = new WMap();

  var hasCircular = Object.prototype.hasOwnProperty.call(options, 'circular');

  return (function derez(_value, path, key) {

    // The derez recurses through the object, producing the deep copy.

    var i,        // The loop counter
      name,       // Property name
      nu;         // The new object or array

    // typeof null === 'object', so go on if this value is really an object but not
    // one of the weird builtin objects.

    var value = replacer ? replacer(key || '', _value) : _value;

    if (options.date && value instanceof Date) {
      return {$jsan: 'd' + value.getTime()};
    }
    if (options.regex && value instanceof RegExp) {
      return {$jsan: 'r' + utils.getRegexFlags(value) + ',' + value.source};
    }
    if (options['function'] && typeof value === 'function') {
      return {$jsan: 'f' + utils.stringifyFunction(value, options['function'])}
    }
    if (options['nan'] && typeof value === 'number' && isNaN(value)) {
      return {$jsan: 'n'}
    }
    if (options['infinity']) {
      if (Number.POSITIVE_INFINITY === value) return {$jsan: 'i'}
      if (Number.NEGATIVE_INFINITY === value) return {$jsan: 'y'}
    }
    if (options['undefined'] && value === undefined) {
      return {$jsan: 'u'}
    }
    if (options['error'] && value instanceof Error) {
      return {$jsan: 'e' + value.message}
    }
    if (options['symbol'] && typeof value === 'symbol') {
      var symbolKey = Symbol.keyFor(value);
      if (symbolKey !== undefined) {
        return {$jsan: 'g' + symbolKey}
      }

      // 'Symbol(foo)'.slice(7, -1) === 'foo'
      return {$jsan: 's' + value.toString().slice(7, -1)}
    }

    if (options['map'] && typeof Map === 'function' && value instanceof Map && typeof Array.from === 'function') {
      return {$jsan: 'm' + JSON.stringify(decycle(Array.from(value), options, replacer))}
    }

    if (options['set'] && typeof Set === 'function' && value instanceof Set && typeof Array.from === 'function') {
      return {$jsan: 'l' + JSON.stringify(decycle(Array.from(value), options, replacer))}
    }

    if (value && typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }

    if (typeof value === 'object' && value !== null &&
      !(value instanceof Boolean) &&
      !(value instanceof Date)    &&
      !(value instanceof Number)  &&
      !(value instanceof RegExp)  &&
      !(value instanceof String)  &&
      !(typeof value === 'symbol')  &&
      !(value instanceof Error)) {

        // If the value is an object or array, look to see if we have already
        // encountered it. If so, return a $ref/path object.

      if (typeof value === 'object' && value !== null) {
        var foundPath = map.get(value);
        if (foundPath) {
          if (hasCircular && path.indexOf(foundPath) === 0) {
            return typeof options.circular === 'function'?
              options.circular(value, path, foundPath):
              options.circular;
          }
          return {$jsan: foundPath};
        }
        map.set(value, path);
      }


      // If it is an array, replicate the array.

      if (Object.prototype.toString.apply(value) === '[object Array]') {
          nu = [];
          for (i = 0; i < value.length; i += 1) {
              nu[i] = derez(value[i], path + '[' + i + ']', i);
          }
      } else {

        // If it is an object, replicate the object.

        nu = {};
        for (name in value) {
          if (Object.prototype.hasOwnProperty.call(value, name)) {
            var nextPath = /^\w+$/.test(name) ?
              '.' + name :
              '[' + JSON.stringify(name) + ']';
            nu[name] = name === '$jsan' ? [derez(value[name], path + nextPath)] : derez(value[name], path + nextPath, name);
          }
        }
      }
      return nu;
    }
    return value;
  }(object, '$'));
};


var retrocycle = function retrocycle($) {
  'use strict';


  return (function rez(value) {

    // The rez function walks recursively through the object looking for $jsan
    // properties. When it finds one that has a value that is a path, then it
    // replaces the $jsan object with a reference to the value that is found by
    // the path.

    var i, item, name, path;

    if (value && typeof value === 'object') {
      if (Object.prototype.toString.apply(value) === '[object Array]') {
        for (i = 0; i < value.length; i += 1) {
          item = value[i];
          if (item && typeof item === 'object') {
            if (item.$jsan) {
              value[i] = utils.restore(item.$jsan, $);
            } else {
              rez(item);
            }
          }
        }
      } else {
        for (name in value) {
          // base case passed raw object
          if(typeof value[name] === 'string' && name === '$jsan'){
            return utils.restore(value.$jsan, $);
            break;
          }
          else {
            if (name === '$jsan') {
              value[name] = value[name][0];
            }
            if (typeof value[name] === 'object') {
              item = value[name];
              if (item && typeof item === 'object') {
                if (item.$jsan) {
                  value[name] = utils.restore(item.$jsan, $);
                } else {
                  rez(item);
                }
              }
            }
          }
        }
      }
    }
    return value;
  }($));
};

var cycle = {
	decycle: decycle,
	retrocycle: retrocycle
};

var stringify = function stringify(value, replacer, space, _options) {

  if (arguments.length < 4) {
    try {
      if (arguments.length === 1) {
        return JSON.stringify(value);
      } else {
        return JSON.stringify.apply(JSON, arguments);
      }
    } catch (e) {}
  }

  var options = _options || false;
  if (typeof options === 'boolean') {
    options = {
      'date': options,
      'function': options,
      'regex': options,
      'undefined': options,
      'error': options,
      'symbol': options,
      'map': options,
      'set': options,
      'nan': options,
      'infinity': options
    };
  }

  var decycled = cycle.decycle(value, options, replacer);
  if (arguments.length === 1) {
    return JSON.stringify(decycled);
  } else {
    return JSON.stringify(decycled, replacer, space);
  }

};

var parse$4 = function parse(text, reviver) {
  var needsRetrocycle = /"\$jsan"/.test(text);
  var parsed;
  if (arguments.length === 1) {
    parsed = JSON.parse(text);
  } else {
    parsed = JSON.parse(text, reviver);
  }
  if (needsRetrocycle) {
    parsed = cycle.retrocycle(parsed);
  }
  return parsed;
};

var index$8 = {
	stringify: stringify,
	parse: parse$4
};

var index$6 = index$8;

/**
 * Expose `Emitter`.
 */

var index$14 = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

var create$5 = (function () {
  function F() {}

  return function (o) {
    if (arguments.length != 1) {
      throw new Error('Object.create implementation only accepts one parameter.');
    }
    F.prototype = o;
    return new F();
  }
})();

var objectcreate = {
	create: create$5
};

if (!Object.create) {
  Object.create = objectcreate;
}

var SCEmitter$2 = function () {
  index$14.call(this);
};

SCEmitter$2.prototype = Object.create(index$14.prototype);

SCEmitter$2.prototype.emit = function (event) {
  if (event == 'error') {

    // To work with sc-domain.
    // See https://github.com/SocketCluster/sc-domain
    var domainErrorArgs = ['__domainError'];
    if (arguments[1] !== undefined) {
      domainErrorArgs.push(arguments[1]);
    }

    index$14.prototype.emit.apply(this, domainErrorArgs);

    if (this.domain) {
      // Emit the error on the domain if it has one.
      // See https://github.com/joyent/node/blob/ef4344311e19a4f73c031508252b21712b22fe8a/lib/events.js#L78-85

      var err = arguments[1];

      if (!err) {
        err = new Error('Uncaught, unspecified "error" event.');
      }
      err.domainEmitter = this;
      err.domain = this.domain;
      err.domainThrown = false;
      this.domain.emit('error', err);
    }
  }
  index$14.prototype.emit.apply(this, arguments);
};

var SCEmitter_1 = SCEmitter$2;

var index$12 = {
	SCEmitter: SCEmitter_1
};

var SCEmitter$3 = index$12.SCEmitter;

var SCChannel$1 = function (name, client, options) {
  var self = this;

  SCEmitter$3.call(this);

  this.PENDING = 'pending';
  this.SUBSCRIBED = 'subscribed';
  this.UNSUBSCRIBED = 'unsubscribed';

  this.name = name;
  this.state = this.UNSUBSCRIBED;
  this.client = client;

  this.options = options || {};
  this.setOptions(this.options);
};

SCChannel$1.prototype = Object.create(SCEmitter$3.prototype);

SCChannel$1.prototype.setOptions = function (options) {
  if (!options) {
    options = {};
  }
  this.waitForAuth = options.waitForAuth || false;
  if (options.data !== undefined) {
    this.data = options.data;
  }
};

SCChannel$1.prototype.getState = function () {
  return this.state;
};

SCChannel$1.prototype.subscribe = function (options) {
  this.client.subscribe(this.name, options);
};

SCChannel$1.prototype.unsubscribe = function () {
  this.client.unsubscribe(this.name);
};

SCChannel$1.prototype.isSubscribed = function (includePending) {
  return this.client.isSubscribed(this.name, includePending);
};

SCChannel$1.prototype.publish = function (data, callback) {
  this.client.publish(this.name, data, callback);
};

SCChannel$1.prototype.watch = function (handler) {
  this.client.watch(this.name, handler);
};

SCChannel$1.prototype.unwatch = function (handler) {
  this.client.unwatch(this.name, handler);
};

SCChannel$1.prototype.watchers = function () {
  return this.client.watchers(this.name);
};

SCChannel$1.prototype.destroy = function () {
  this.client.destroyChannel(this.name);
};

var SCChannel_1 = SCChannel$1;

var index$16 = {
	SCChannel: SCChannel_1
};

// Based on https://github.com/dscape/cycle/blob/master/cycle.js

var decycle$1 = function decycle(object) {
// Make a deep copy of an object or array, assuring that there is at most
// one instance of each object or array in the resulting structure. The
// duplicate references (which might be forming cycles) are replaced with
// an object of the form
//      {$ref: PATH}
// where the PATH is a JSONPath string that locates the first occurance.
// So,
//      var a = [];
//      a[0] = a;
//      return JSON.stringify(JSON.decycle(a));
// produces the string '[{"$ref":"$"}]'.

// JSONPath is used to locate the unique object. $ indicates the top level of
// the object or array. [NUMBER] or [STRING] indicates a child member or
// property.

    var objects = [],   // Keep a reference to each unique object or array
        paths = [];     // Keep the path to each unique object or array

    return (function derez(value, path) {

// The derez recurses through the object, producing the deep copy.

        var i,          // The loop counter
            name,       // Property name
            nu;         // The new object or array

// typeof null === 'object', so go on if this value is really an object but not
// one of the weird builtin objects.

        if (typeof value === 'object' && value !== null &&
                !(value instanceof Boolean) &&
                !(value instanceof Date)    &&
                !(value instanceof Number)  &&
                !(value instanceof RegExp)  &&
                !(value instanceof String)) {

// If the value is an object or array, look to see if we have already
// encountered it. If so, return a $ref/path object. This is a hard way,
// linear search that will get slower as the number of unique objects grows.

            for (i = 0; i < objects.length; i += 1) {
                if (objects[i] === value) {
                    return {$ref: paths[i]};
                }
            }

// Otherwise, accumulate the unique value and its path.

            objects.push(value);
            paths.push(path);

// If it is an array, replicate the array.

            if (Object.prototype.toString.apply(value) === '[object Array]') {
                nu = [];
                for (i = 0; i < value.length; i += 1) {
                    nu[i] = derez(value[i], path + '[' + i + ']');
                }
            } else {

// If it is an object, replicate the object.

                nu = {};
                for (name in value) {
                    if (Object.prototype.hasOwnProperty.call(value, name)) {
                        nu[name] = derez(value[name],
                            path + '[' + JSON.stringify(name) + ']');
                    }
                }
            }
            return nu;
        }
        return value;
    }(object, '$'));
};

var isStrict = (function () { return !this; })();

function AuthTokenExpiredError(message, expiry) {
  this.name = 'AuthTokenExpiredError';
  this.message = message;
  this.expiry = expiry;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
AuthTokenExpiredError.prototype = Object.create(Error.prototype);


function AuthTokenInvalidError(message) {
  this.name = 'AuthTokenInvalidError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
AuthTokenInvalidError.prototype = Object.create(Error.prototype);


function AuthTokenNotBeforeError(message, date) {
  this.name = 'AuthTokenNotBeforeError';
  this.message = message;
  this.date = date;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
AuthTokenNotBeforeError.prototype = Object.create(Error.prototype);


// For any other auth token error.
function AuthTokenError(message) {
  this.name = 'AuthTokenError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
AuthTokenError.prototype = Object.create(Error.prototype);


function SilentMiddlewareBlockedError(message, type) {
  this.name = 'SilentMiddlewareBlockedError';
  this.message = message;
  this.type = type;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
SilentMiddlewareBlockedError.prototype = Object.create(Error.prototype);


function InvalidActionError$1(message) {
  this.name = 'InvalidActionError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
InvalidActionError$1.prototype = Object.create(Error.prototype);

function InvalidArgumentsError$1(message) {
  this.name = 'InvalidArgumentsError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
InvalidArgumentsError$1.prototype = Object.create(Error.prototype);

function InvalidOptionsError(message) {
  this.name = 'InvalidOptionsError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
InvalidOptionsError.prototype = Object.create(Error.prototype);


function InvalidMessageError$1(message) {
  this.name = 'InvalidMessageError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
InvalidMessageError$1.prototype = Object.create(Error.prototype);


function SocketProtocolError$1(message, code) {
  this.name = 'SocketProtocolError';
  this.message = message;
  this.code = code;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
SocketProtocolError$1.prototype = Object.create(Error.prototype);


function ServerProtocolError(message) {
  this.name = 'ServerProtocolError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
ServerProtocolError.prototype = Object.create(Error.prototype);

function HTTPServerError(message) {
  this.name = 'HTTPServerError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
HTTPServerError.prototype = Object.create(Error.prototype);


function ResourceLimitError(message) {
  this.name = 'ResourceLimitError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
ResourceLimitError.prototype = Object.create(Error.prototype);


function TimeoutError$1(message) {
  this.name = 'TimeoutError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
TimeoutError$1.prototype = Object.create(Error.prototype);


function BadConnectionError(message, type) {
  this.name = 'BadConnectionError';
  this.message = message;
  this.type = type;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
BadConnectionError.prototype = Object.create(Error.prototype);


function BrokerError(message) {
  this.name = 'BrokerError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
BrokerError.prototype = Object.create(Error.prototype);


function ProcessExitError(message, code) {
  this.name = 'ProcessExitError';
  this.message = message;
  this.code = code;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
ProcessExitError.prototype = Object.create(Error.prototype);


function UnknownError(message) {
  this.name = 'UnknownError';
  this.message = message;
  if (Error.captureStackTrace && !isStrict) {
    Error.captureStackTrace(this, arguments.callee);
  } else {
    this.stack = (new Error()).stack;
  }
}
UnknownError.prototype = Object.create(Error.prototype);


// Expose all error types

var index$18 = {
  AuthTokenExpiredError: AuthTokenExpiredError,
  AuthTokenInvalidError: AuthTokenInvalidError,
  AuthTokenNotBeforeError: AuthTokenNotBeforeError,
  AuthTokenError: AuthTokenError,
  SilentMiddlewareBlockedError: SilentMiddlewareBlockedError,
  InvalidActionError: InvalidActionError$1,
  InvalidArgumentsError: InvalidArgumentsError$1,
  InvalidOptionsError: InvalidOptionsError,
  InvalidMessageError: InvalidMessageError$1,
  SocketProtocolError: SocketProtocolError$1,
  ServerProtocolError: ServerProtocolError,
  HTTPServerError: HTTPServerError,
  ResourceLimitError: ResourceLimitError,
  TimeoutError: TimeoutError$1,
  BadConnectionError: BadConnectionError,
  BrokerError: BrokerError,
  ProcessExitError: ProcessExitError,
  UnknownError: UnknownError
};

var socketProtocolErrorStatuses = {
  1001: 'Socket was disconnected',
  1002: 'A WebSocket protocol error was encountered',
  1003: 'Server terminated socket because it received invalid data',
  1005: 'Socket closed without status code',
  1006: 'Socket hung up',
  1007: 'Message format was incorrect',
  1008: 'Encountered a policy violation',
  1009: 'Message was too big to process',
  1010: 'Client ended the connection because the server did not comply with extension requirements',
  1011: 'Server encountered an unexpected fatal condition',
  4000: 'Server ping timed out',
  4001: 'Client pong timed out',
  4002: 'Server failed to sign auth token',
  4003: 'Failed to complete handshake',
  4004: 'Client failed to save auth token',
  4005: 'Did not receive #handshake from client before timeout',
  4006: 'Failed to bind socket to message broker',
  4007: 'Client connection establishment timed out'
};

var socketProtocolIgnoreStatuses = {
  1000: 'Socket closed normally',
  1001: 'Socket hung up'
};

// Properties related to error domains cannot be serialized.
var unserializableErrorProperties = {
  domain: 1,
  domainEmitter: 1,
  domainThrown: 1
};

var dehydrateError = function (error, includeStackTrace) {
  var dehydratedError;

  if (error && typeof error == 'object') {
    dehydratedError = {
      message: error.message
    };
    if (includeStackTrace) {
      dehydratedError.stack = error.stack;
    }
    for (var i in error) {
      if (!unserializableErrorProperties[i]) {
        dehydratedError[i] = error[i];
      }
    }
  } else if (typeof error == 'function') {
    dehydratedError = '[function ' + (error.name || 'anonymous') + ']';
  } else {
    dehydratedError = error;
  }

  return decycle$1(dehydratedError);
};

var hydrateError = function (error) {
  var hydratedError = null;
  if (error != null) {
    if (typeof error == 'object') {
      hydratedError = new Error(error.message);
      for (var i in error) {
        if (error.hasOwnProperty(i)) {
          hydratedError[i] = error[i];
        }
      }
    } else {
      hydratedError = error;
    }
  }
  return hydratedError;
};

var decycle_1 = decycle$1;

index$18.socketProtocolErrorStatuses = socketProtocolErrorStatuses;
index$18.socketProtocolIgnoreStatuses = socketProtocolIgnoreStatuses;
index$18.dehydrateError = dehydrateError;
index$18.hydrateError = hydrateError;
index$18.decycle = decycle_1;

var InvalidActionError = index$18.InvalidActionError;

var Response$1 = function (socket, id) {
  this.socket = socket;
  this.id = id;
  this.sent = false;
};

Response$1.prototype._respond = function (responseData) {
  if (this.sent) {
    throw new InvalidActionError('Response ' + this.id + ' has already been sent');
  } else {
    this.sent = true;
    this.socket.send(this.socket.encode(responseData));
  }
};

Response$1.prototype.end = function (data) {
  if (this.id) {
    var responseData = {
      rid: this.id
    };
    if (data !== undefined) {
      responseData.data = data;
    }
    this._respond(responseData);
  }
};

Response$1.prototype.error = function (error, data) {
  if (this.id) {
    var err = index$18.dehydrateError(error);

    var responseData = {
      rid: this.id,
      error: err
    };
    if (data !== undefined) {
      responseData.data = data;
    }

    this._respond(responseData);
  }
};

Response$1.prototype.callback = function (error, data) {
  if (error) {
    this.error(error, data);
  } else {
    this.end(data);
  }
};

var Response_1 = Response$1;

var response = {
	Response: Response_1
};

var AuthEngine$1 = function () {
  this._internalStorage = {};
};

AuthEngine$1.prototype._isLocalStorageEnabled = function () {
  var err;
  try {
    // Some browsers will throw an error here if localStorage is disabled.
    commonjsGlobal.localStorage;
    
    // Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
    // throw QuotaExceededError. We're going to detect this and avoid hard to debug edge cases.
    commonjsGlobal.localStorage.setItem('__scLocalStorageTest', 1);
    commonjsGlobal.localStorage.removeItem('__scLocalStorageTest');
  } catch (e) {
    err = e;
  }
  return !err;
};

AuthEngine$1.prototype.saveToken = function (name, token, options, callback) {
  if (this._isLocalStorageEnabled() && commonjsGlobal.localStorage) {
    commonjsGlobal.localStorage.setItem(name, token);
  } else {
    this._internalStorage[name] = token;
  }
  callback && callback(null, token);
};

AuthEngine$1.prototype.removeToken = function (name, callback) {
  var token;

  this.loadToken(name, function (err, authToken) {
    token = authToken;
  });

  if (this._isLocalStorageEnabled() && commonjsGlobal.localStorage) {
    commonjsGlobal.localStorage.removeItem(name);
  }
  delete this._internalStorage[name];

  callback && callback(null, token);
};

AuthEngine$1.prototype.loadToken = function (name, callback) {
  var token;

  if (this._isLocalStorageEnabled() && commonjsGlobal.localStorage) {
    token = commonjsGlobal.localStorage.getItem(name);
  } else {
    token = this._internalStorage[name] || null;
  }
  callback(null, token);
};

var AuthEngine_1 = AuthEngine$1;

var auth = {
	AuthEngine: AuthEngine_1
};

var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

var arrayBufferToBase64 = function (arraybuffer) {
  var bytes = new Uint8Array(arraybuffer);
  var len = bytes.length;
  var base64 = '';

  for (var i = 0; i < len; i += 3) {
    base64 += base64Chars[bytes[i] >> 2];
    base64 += base64Chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64 += base64Chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64 += base64Chars[bytes[i + 2] & 63];
  }

  if ((len % 3) === 2) {
    base64 = base64.substring(0, base64.length - 1) + '=';
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + '==';
  }

  return base64;
};

var binaryToBase64Replacer = function (key, value) {
  if (commonjsGlobal.ArrayBuffer && value instanceof commonjsGlobal.ArrayBuffer) {
    return {
      base64: true,
      data: arrayBufferToBase64(value)
    };
  } else if (commonjsGlobal.Buffer) {
    if (value instanceof commonjsGlobal.Buffer){
      return {
        base64: true,
        data: value.toString('base64')
      };
    }
    // Some versions of Node.js convert Buffers to Objects before they are passed to
    // the replacer function - Because of this, we need to rehydrate Buffers
    // before we can convert them to base64 strings.
    if (value && value.type == 'Buffer' && value.data instanceof Array) {
      var rehydratedBuffer;
      if (commonjsGlobal.Buffer.from) {
        rehydratedBuffer = commonjsGlobal.Buffer.from(value.data);
      } else {
        rehydratedBuffer = new commonjsGlobal.Buffer(value.data);
      }
      return {
        base64: true,
        data: rehydratedBuffer.toString('base64')
      };
    }
  }
  return value;
};

// Decode the data which was transmitted over the wire to a JavaScript Object in a format which SC understands.
// See encode function below for more details.
var decode = function (input) {
  if (input == null) {
   return null;
  }
  // Leave ping or pong message as is
  if (input == '#1' || input == '#2') {
    return input;
  }
  var message = input.toString();

  try {
    return JSON.parse(message);
  } catch (err) {}
  return message;
};


// Encode a raw JavaScript object (which is in the SC protocol format) into a format for
// transfering it over the wire. In this case, we just convert it into a simple JSON string.
// If you want to create your own custom codec, you can encode the object into any format
// (e.g. binary ArrayBuffer or string with any kind of compression) so long as your decode
// function is able to rehydrate that object back into its original JavaScript Object format
// (which adheres to the SC protocol).
// See https://github.com/SocketCluster/socketcluster/blob/master/socketcluster-protocol.md
// for details about the SC protocol.
var encode = function (object) {
  // Leave ping or pong message as is
  if (object == '#1' || object == '#2') {
    return object;
  }
  return JSON.stringify(object, binaryToBase64Replacer);
};

var index$20 = {
	decode: decode,
	encode: encode
};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty$4(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var isArray$1 = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};
function stringifyPrimitive(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
}

function stringify$1 (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map$6(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray$1(obj[k])) {
        return map$6(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
}

function map$6 (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

function parse$5(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty$4(obj, k)) {
      obj[k] = v;
    } else if (isArray$1(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
}
var qs = {
  encode: stringify$1,
  stringify: stringify$1,
  decode: parse$5,
  parse: parse$5
};



var qs$1 = Object.freeze({
	stringify: stringify$1,
	parse: parse$5,
	default: qs,
	encode: stringify$1,
	decode: parse$5
});

var global$1;
if (typeof WorkerGlobalScope !== 'undefined') {
  global$1 = self;
} else {
  global$1 = typeof window != 'undefined' && window || (function() { return this; })();
}

var WebSocket$1 = global$1.WebSocket || global$1.MozWebSocket;

/**
 * WebSocket constructor.
 *
 * The third `opts` options object gets ignored in web browsers, since it's
 * non-standard, and throws a TypeError if passed to the constructor.
 * See: https://github.com/einaros/ws/issues/227
 *
 * @param {String} uri
 * @param {Array} protocols (optional)
 * @param {Object} opts (optional)
 * @api public
 */

function ws(uri, protocols, opts) {
  var instance;
  if (protocols) {
    instance = new WebSocket$1(uri, protocols);
  } else {
    instance = new WebSocket$1(uri);
  }
  return instance;
}

if (WebSocket$1) ws.prototype = WebSocket$1.prototype;

var wsBrowser = WebSocket$1 ? ws : null;

var querystring = ( qs$1 && qs ) || qs$1;

var SCEmitter$4 = index$12.SCEmitter;
var Response$2 = response.Response;

var WebSocket;
var createWebSocket;

if (commonjsGlobal.WebSocket) {
  WebSocket = commonjsGlobal.WebSocket;
  createWebSocket = function (uri, options) {
    return new WebSocket(uri);
  };
} else {
  WebSocket = wsBrowser;
  createWebSocket = function (uri, options) {
    return new WebSocket(uri, null, options);
  };
}


var TimeoutError$2 = index$18.TimeoutError;


var SCTransport$1 = function (authEngine, codecEngine, options) {
  this.state = this.CLOSED;
  this.auth = authEngine;
  this.codec = codecEngine;
  this.options = options;
  this.connectTimeout = options.connectTimeout;
  this.pingTimeout = options.ackTimeout;
  this.callIdGenerator = options.callIdGenerator;

  this._pingTimeoutTicker = null;
  this._callbackMap = {};

  this.open();
};

SCTransport$1.prototype = Object.create(SCEmitter$4.prototype);

SCTransport$1.CONNECTING = SCTransport$1.prototype.CONNECTING = 'connecting';
SCTransport$1.OPEN = SCTransport$1.prototype.OPEN = 'open';
SCTransport$1.CLOSED = SCTransport$1.prototype.CLOSED = 'closed';

SCTransport$1.prototype.uri = function () {
  var query = this.options.query || {};
  var schema = this.options.secure ? 'wss' : 'ws';

  if (this.options.timestampRequests) {
    query[this.options.timestampParam] = (new Date()).getTime();
  }

  query = querystring.encode(query);

  if (query.length) {
    query = '?' + query;
  }

  var host;
  if (this.options.host) {
    host = this.options.host;
  } else {
    var port = '';

    if (this.options.port && ((schema == 'wss' && this.options.port != 443)
      || (schema == 'ws' && this.options.port != 80))) {
      port = ':' + this.options.port;
    }
    host = this.options.hostname + port;
  }

  return schema + '://' + host + this.options.path + query;
};

SCTransport$1.prototype.open = function () {
  var self = this;

  this.state = this.CONNECTING;
  var uri = this.uri();

  var wsSocket = createWebSocket(uri, this.options);
  wsSocket.binaryType = this.options.binaryType;
  this.socket = wsSocket;

  wsSocket.onopen = function () {
    self._onOpen();
  };

  wsSocket.onclose = function (event) {
    var code;
    if (event.code == null) {
      // This is to handle an edge case in React Native whereby
      // event.code is undefined when the mobile device is locked.
      // TODO: This is not perfect since this condition could also apply to
      // an abnormal close (no close control frame) which would be a 1006.
      code = 1005;
    } else {
      code = event.code;
    }
    self._onClose(code, event.reason);
  };

  wsSocket.onmessage = function (message, flags) {
    self._onMessage(message.data);
  };

  wsSocket.onerror = function (error) {
    // The onclose event will be called automatically after the onerror event
    // if the socket is connected - Otherwise, if it's in the middle of
    // connecting, we want to close it manually with a 1006 - This is necessary
    // to prevent inconsistent behavior when running the client in Node.js
    // vs in a browser.

    if (self.state === self.CONNECTING) {
      self._onClose(1006);
    }
  };

  this._connectTimeoutRef = setTimeout(function () {
    self._onClose(4007);
    self.socket.close(4007);
  }, this.connectTimeout);
};

SCTransport$1.prototype._onOpen = function () {
  var self = this;

  clearTimeout(this._connectTimeoutRef);
  this._resetPingTimeout();

  this._handshake(function (err, status) {
    if (err) {
      self._onError(err);
      self._onClose(4003);
      self.socket.close(4003);
    } else {
      self.state = self.OPEN;
      SCEmitter$4.prototype.emit.call(self, 'open', status);
      self._resetPingTimeout();
    }
  });
};

SCTransport$1.prototype._handshake = function (callback) {
  var self = this;
  this.auth.loadToken(this.options.authTokenName, function (err, token) {
    if (err) {
      callback(err);
    } else {
      // Don't wait for this.state to be 'open'.
      // The underlying WebSocket (this.socket) is already open.
      var options = {
        force: true
      };
      self.emit('#handshake', {
        authToken: token
      }, options, function (err, status) {
        if (status) {
          // Add the token which was used as part of authentication attempt
          // to the status object.
          status.authToken = token;
          if (status.authError) {
            status.authError = index$18.hydrateError(status.authError);
          }
        }
        callback(err, status);
      });
    }
  });
};

SCTransport$1.prototype._onClose = function (code, data) {
  delete this.socket.onopen;
  delete this.socket.onclose;
  delete this.socket.onmessage;
  delete this.socket.onerror;

  clearTimeout(this._connectTimeoutRef);

  if (this.state == this.OPEN) {
    this.state = this.CLOSED;
    SCEmitter$4.prototype.emit.call(this, 'close', code, data);

  } else if (this.state == this.CONNECTING) {
    this.state = this.CLOSED;
    SCEmitter$4.prototype.emit.call(this, 'openAbort', code, data);
  }
};

SCTransport$1.prototype._onMessage = function (message) {
  SCEmitter$4.prototype.emit.call(this, 'event', 'message', message);

  var obj = this.decode(message);

  // If ping
  if (obj == '#1') {
    this._resetPingTimeout();
    if (this.socket.readyState == this.socket.OPEN) {
      this.sendObject('#2');
    }
  } else {
    var event = obj.event;

    if (event) {
      var response$$1 = new Response$2(this, obj.cid);
      SCEmitter$4.prototype.emit.call(this, 'event', event, obj.data, response$$1);
    } else if (obj.rid != null) {

      var eventObject = this._callbackMap[obj.rid];
      if (eventObject) {
        clearTimeout(eventObject.timeout);
        delete this._callbackMap[obj.rid];

        if (eventObject.callback) {
          var rehydratedError = index$18.hydrateError(obj.error);
          eventObject.callback(rehydratedError, obj.data);
        }
      }
    } else {
      SCEmitter$4.prototype.emit.call(this, 'event', 'raw', obj);
    }
  }
};

SCTransport$1.prototype._onError = function (err) {
  SCEmitter$4.prototype.emit.call(this, 'error', err);
};

SCTransport$1.prototype._resetPingTimeout = function () {
  var self = this;

  var now = (new Date()).getTime();
  clearTimeout(this._pingTimeoutTicker);

  this._pingTimeoutTicker = setTimeout(function () {
    self._onClose(4000);
    self.socket.close(4000);
  }, this.pingTimeout);
};

SCTransport$1.prototype.getBytesReceived = function () {
  return this.socket.bytesReceived;
};

SCTransport$1.prototype.close = function (code, data) {
  code = code || 1000;

  if (this.state == this.OPEN) {
    var packet = {
      code: code,
      data: data
    };
    this.emit('#disconnect', packet);

    this._onClose(code, data);
    this.socket.close(code);

  } else if (this.state == this.CONNECTING) {
    this._onClose(code, data);
    this.socket.close(code);
  }
};

SCTransport$1.prototype.emitObject = function (eventObject) {
  var simpleEventObject = {
    event: eventObject.event,
    data: eventObject.data
  };

  if (eventObject.callback) {
    simpleEventObject.cid = eventObject.cid = this.callIdGenerator();
    this._callbackMap[eventObject.cid] = eventObject;
  }

  this.sendObject(simpleEventObject);
  return eventObject.cid || null;
};

SCTransport$1.prototype._handleEventAckTimeout = function (eventObject) {
  var errorMessage = "Event response for '" + eventObject.event + "' timed out";
  var error = new TimeoutError$2(errorMessage);

  if (eventObject.cid) {
    delete this._callbackMap[eventObject.cid];
  }
  var callback = eventObject.callback;
  delete eventObject.callback;
  callback.call(eventObject, error, eventObject);
};

// The last two optional arguments (a and b) can be options and/or callback
SCTransport$1.prototype.emit = function (event, data, a, b) {
  var self = this;

  var callback, options;

  if (b) {
    options = a;
    callback = b;
  } else {
    if (a instanceof Function) {
      options = {};
      callback = a;
    } else {
      options = a;
    }
  }

  var eventObject = {
    event: event,
    data: data,
    callback: callback
  };

  if (callback && !options.noTimeout) {
    eventObject.timeout = setTimeout(function () {
      self._handleEventAckTimeout(eventObject);
    }, this.options.ackTimeout);
  }

  var cid = null;
  if (this.state == this.OPEN || options.force) {
    cid = this.emitObject(eventObject);
  }
  return cid;
};

SCTransport$1.prototype.cancelPendingResponse = function (cid) {
  delete this._callbackMap[cid];
};

SCTransport$1.prototype.decode = function (message) {
  return this.codec.decode(message);
};

SCTransport$1.prototype.encode = function (object) {
  return this.codec.encode(object);
};

SCTransport$1.prototype.send = function (data) {
  if (this.socket.readyState != this.socket.OPEN) {
    this._onClose(1005);
  } else {
    this.socket.send(data);
  }
};

SCTransport$1.prototype.serializeObject = function (object) {
  var str, formatError;
  try {
    str = this.encode(object);
  } catch (err) {
    formatError = err;
    this._onError(formatError);
  }
  if (!formatError) {
    return str;
  }
  return null;
};

SCTransport$1.prototype.sendObject = function (object) {
  var str = this.serializeObject(object);
  if (str != null) {
    this.send(str);
  }
};

var SCTransport_1 = SCTransport$1;

var sctransport = {
	SCTransport: SCTransport_1
};

/**
 * Constants.
 */

var errorMessage;

errorMessage = 'An argument without append, prepend, ' +
    'or detach methods was given to `List';

/**
 * Creates a new List: A linked list is a bit like an Array, but
 * knows nothing about how many items are in it, and knows only about its
 * first (`head`) and last (`tail`) items. Each item (e.g. `head`, `tail`,
 * &c.) knows which item comes before or after it (its more like the
 * implementation of the DOM in JavaScript).
 * @global
 * @private
 * @constructor
 * @class Represents an instance of List.
 */

function List$3(/*items...*/) {
    if (arguments.length) {
        return List$3.from(arguments);
    }
}

var ListPrototype;

ListPrototype = List$3.prototype;

/**
 * Creates a new list from the arguments (each a list item) passed in.
 * @name List.of
 * @param {...ListItem} [items] - Zero or more items to attach.
 * @returns {list} - A new instance of List.
 */

List$3.of = function (/*items...*/) {
    return List$3.from.call(this, arguments);
};

/**
 * Creates a new list from the given array-like object (each a list item)
 * passed in.
 * @name List.from
 * @param {ListItem[]} [items] - The items to append.
 * @returns {list} - A new instance of List.
 */
List$3.from = function (items) {
    var list = new this(), length, iterator, item;

    if (items && (length = items.length)) {
        iterator = -1;

        while (++iterator < length) {
            item = items[iterator];

            if (item !== null && item !== undefined) {
                list.append(item);
            }
        }
    }

    return list;
};

/**
 * List#head
 * Default to `null`.
 */
ListPrototype.head = null;

/**
 * List#tail
 * Default to `null`.
 */
ListPrototype.tail = null;

/**
 * Returns the list's items as an array. This does *not* detach the items.
 * @name List#toArray
 * @returns {ListItem[]} - An array of (still attached) ListItems.
 */
ListPrototype.toArray = function () {
    var item = this.head,
        result = [];

    while (item) {
        result.push(item);
        item = item.next;
    }

    return result;
};

/**
 * Prepends the given item to the list: Item will be the new first item
 * (`head`).
 * @name List#prepend
 * @param {ListItem} item - The item to prepend.
 * @returns {ListItem} - An instance of ListItem (the given item).
 */
ListPrototype.prepend = function (item) {
    if (!item) {
        return false;
    }

    if (!item.append || !item.prepend || !item.detach) {
        throw new Error(errorMessage + '#prepend`.');
    }

    var self, head;

    // Cache self.
    self = this;

    // If self has a first item, defer prepend to the first items prepend
    // method, and return the result.
    head = self.head;

    if (head) {
        return head.prepend(item);
    }

    // ...otherwise, there is no `head` (or `tail`) item yet.

    // Detach the prependee.
    item.detach();

    // Set the prependees parent list to reference self.
    item.list = self;

    // Set self's first item to the prependee, and return the item.
    self.head = item;

    return item;
};

/**
 * Appends the given item to the list: Item will be the new last item (`tail`)
 * if the list had a first item, and its first item (`head`) otherwise.
 * @name List#append
 * @param {ListItem} item - The item to append.
 * @returns {ListItem} - An instance of ListItem (the given item).
 */

ListPrototype.append = function (item) {
    if (!item) {
        return false;
    }

    if (!item.append || !item.prepend || !item.detach) {
        throw new Error(errorMessage + '#append`.');
    }

    var self, head, tail;

    // Cache self.
    self = this;

    // If self has a last item, defer appending to the last items append
    // method, and return the result.
    tail = self.tail;

    if (tail) {
        return tail.append(item);
    }

    // If self has a first item, defer appending to the first items append
    // method, and return the result.
    head = self.head;

    if (head) {
        return head.append(item);
    }

    // ...otherwise, there is no `tail` or `head` item yet.

    // Detach the appendee.
    item.detach();

    // Set the appendees parent list to reference self.
    item.list = self;

    // Set self's first item to the appendee, and return the item.
    self.head = item;

    return item;
};

/**
 * Creates a new ListItem: A linked list item is a bit like DOM node:
 * It knows only about its "parent" (`list`), the item before it (`prev`),
 * and the item after it (`next`).
 * @global
 * @private
 * @constructor
 * @class Represents an instance of ListItem.
 */

function ListItem() {}

List$3.Item = ListItem;

var ListItemPrototype = ListItem.prototype;

ListItemPrototype.next = null;

ListItemPrototype.prev = null;

ListItemPrototype.list = null;

/**
 * Detaches the item operated on from its parent list.
 * @name ListItem#detach
 * @returns {ListItem} - The item operated on.
 */
ListItemPrototype.detach = function () {
    // Cache self, the parent list, and the previous and next items.
    var self = this,
        list = self.list,
        prev = self.prev,
        next = self.next;

    // If the item is already detached, return self.
    if (!list) {
        return self;
    }

    // If self is the last item in the parent list, link the lists last item
    // to the previous item.
    if (list.tail === self) {
        list.tail = prev;
    }

    // If self is the first item in the parent list, link the lists first item
    // to the next item.
    if (list.head === self) {
        list.head = next;
    }

    // If both the last and first items in the parent list are the same,
    // remove the link to the last item.
    if (list.tail === list.head) {
        list.tail = null;
    }

    // If a previous item exists, link its next item to selfs next item.
    if (prev) {
        prev.next = next;
    }

    // If a next item exists, link its previous item to selfs previous item.
    if (next) {
        next.prev = prev;
    }

    // Remove links from self to both the next and previous items, and to the
    // parent list.
    self.prev = self.next = self.list = null;

    // Return self.
    return self;
};

/**
 * Prepends the given item *before* the item operated on.
 * @name ListItem#prepend
 * @param {ListItem} item - The item to prepend.
 * @returns {ListItem} - The item operated on, or false when that item is not
 * attached.
 */
ListItemPrototype.prepend = function (item) {
    if (!item || !item.append || !item.prepend || !item.detach) {
        throw new Error(errorMessage + 'Item#prepend`.');
    }

    // Cache self, the parent list, and the previous item.
    var self = this,
        list = self.list,
        prev = self.prev;

    // If self is detached, return false.
    if (!list) {
        return false;
    }

    // Detach the prependee.
    item.detach();

    // If self has a previous item...
    if (prev) {
        // ...link the prependees previous item, to selfs previous item.
        item.prev = prev;

        // ...link the previous items next item, to self.
        prev.next = item;
    }

    // Set the prependees next item to self.
    item.next = self;

    // Set the prependees parent list to selfs parent list.
    item.list = list;

    // Set the previous item of self to the prependee.
    self.prev = item;

    // If self is the first item in the parent list, link the lists first item
    // to the prependee.
    if (self === list.head) {
        list.head = item;
    }

    // If the the parent list has no last item, link the lists last item to
    // self.
    if (!list.tail) {
        list.tail = self;
    }

    // Return the prependee.
    return item;
};

/**
 * Appends the given item *after* the item operated on.
 * @name ListItem#append
 * @param {ListItem} item - The item to append.
 * @returns {ListItem} - The item operated on, or false when that item is not
 * attached.
 */
ListItemPrototype.append = function (item) {
    // If item is falsey, return false.
    if (!item || !item.append || !item.prepend || !item.detach) {
        throw new Error(errorMessage + 'Item#append`.');
    }

    // Cache self, the parent list, and the next item.
    var self = this,
        list = self.list,
        next = self.next;

    // If self is detached, return false.
    if (!list) {
        return false;
    }

    // Detach the appendee.
    item.detach();

    // If self has a next item...
    if (next) {
        // ...link the appendees next item, to selfs next item.
        item.next = next;

        // ...link the next items previous item, to the appendee.
        next.prev = item;
    }

    // Set the appendees previous item to self.
    item.prev = self;

    // Set the appendees parent list to selfs parent list.
    item.list = list;

    // Set the next item of self to the appendee.
    self.next = item;

    // If the the parent list has no last item or if self is the parent lists
    // last item, link the lists last item to the appendee.
    if (self === list.tail || !list.tail) {
        list.tail = item;
    }

    // Return the appendee.
    return item;
};

/**
 * Expose `List`.
 */

var linkedList = List$3;

var index$22 = linkedList;

var base64 = createCommonjsModule(function (module, exports) {
/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
(function(root) {

	// Detect free variables `exports`.
	var freeExports = 'object' == 'object' && exports;

	// Detect free variable `module`.
	var freeModule = 'object' == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
			error(
				'The string to be encoded contains characters outside of the ' +
				'Latin1 range.'
			);
		}
		var padding = input.length % 3;
		var output = '';
		var position = -1;
		var a;
		var b;
		var c;
		var d;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
		}

		if (padding == 2) {
			a = input.charCodeAt(position) << 8;
			b = input.charCodeAt(++position);
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
		} else if (padding == 1) {
			buffer = input.charCodeAt(position);
			output += (
				TABLE.charAt(buffer >> 2) +
				TABLE.charAt((buffer << 4) & 0x3F) +
				'=='
			);
		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'decode': decode,
		'version': '0.1.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof undefined == 'function' &&
		typeof undefined.amd == 'object' &&
		undefined.amd
	) {
		undefined(function() {
			return base64;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = base64;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in base64) {
				base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.base64 = base64;
	}

}(commonjsGlobal));
});

var clone_1 = createCommonjsModule(function (module) {
var clone = (function() {
'use strict';

function _instanceof(obj, type) {
  return type != null && obj instanceof type;
}

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
 * @param `includeNonEnumerable` - set to true if the non-enumerable properties
 *    should be cloned as well. Non-enumerable properties on the prototype
 *    chain will be ignored. (optional - false by default)
*/
function clone(parent, circular, depth, prototype, includeNonEnumerable) {
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    includeNonEnumerable = circular.includeNonEnumerable;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (_instanceof(parent, nativeMap)) {
      child = new nativeMap();
    } else if (_instanceof(parent, nativeSet)) {
      child = new nativeSet();
    } else if (_instanceof(parent, nativePromise)) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      child = new Buffer(parent.length);
      parent.copy(child);
      return child;
    } else if (_instanceof(parent, Error)) {
      child = Object.create(parent);
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (_instanceof(parent, nativeMap)) {
      parent.forEach(function(value, key) {
        var keyChild = _clone(key, depth - 1);
        var valueChild = _clone(value, depth - 1);
        child.set(keyChild, valueChild);
      });
    }
    if (_instanceof(parent, nativeSet)) {
      parent.forEach(function(value) {
        var entryChild = _clone(value, depth - 1);
        child.add(entryChild);
      });
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
        if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
          continue;
        }
        child[symbol] = _clone(parent[symbol], depth - 1);
        if (!descriptor.enumerable) {
          Object.defineProperty(child, symbol, {
            enumerable: false
          });
        }
      }
    }

    if (includeNonEnumerable) {
      var allPropertyNames = Object.getOwnPropertyNames(parent);
      for (var i = 0; i < allPropertyNames.length; i++) {
        var propertyName = allPropertyNames[i];
        var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
        if (descriptor && descriptor.enumerable) {
          continue;
        }
        child[propertyName] = _clone(parent[propertyName], depth - 1);
        Object.defineProperty(child, propertyName, {
          enumerable: false
        });
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if ('object' === 'object' && module.exports) {
  module.exports = clone;
}
});

var SCEmitter$1 = index$12.SCEmitter;
var SCChannel = index$16.SCChannel;
var AuthEngine = auth.AuthEngine;

var SCTransport = sctransport.SCTransport;






var InvalidArgumentsError = index$18.InvalidArgumentsError;
var InvalidMessageError = index$18.InvalidMessageError;
var SocketProtocolError = index$18.SocketProtocolError;
var TimeoutError = index$18.TimeoutError;

var isBrowser = typeof window != 'undefined';


var SCSocket = function (opts) {
  var self = this;

  SCEmitter$1.call(this);

  this.id = null;
  this.state = this.CLOSED;
  this.authState = this.PENDING;
  this.signedAuthToken = null;
  this.authToken = null;
  this.pendingReconnect = false;
  this.pendingReconnectTimeout = null;
  this.pendingConnectCallback = false;

  this.connectTimeout = opts.connectTimeout;
  this.ackTimeout = opts.ackTimeout;
  this.channelPrefix = opts.channelPrefix || null;
  this.disconnectOnUnload = opts.disconnectOnUnload == null ? true : opts.disconnectOnUnload;

  // pingTimeout will be ackTimeout at the start, but it will
  // be updated with values provided by the 'connect' event
  this.pingTimeout = this.ackTimeout;

  var maxTimeout = Math.pow(2, 31) - 1;

  var verifyDuration = function (propertyName) {
    if (self[propertyName] > maxTimeout) {
      throw new InvalidArgumentsError('The ' + propertyName +
        ' value provided exceeded the maximum amount allowed');
    }
  };

  verifyDuration('connectTimeout');
  verifyDuration('ackTimeout');
  verifyDuration('pingTimeout');

  this._localEvents = {
    'connect': 1,
    'connectAbort': 1,
    'disconnect': 1,
    'message': 1,
    'error': 1,
    'raw': 1,
    'fail': 1,
    'kickOut': 1,
    'subscribe': 1,
    'unsubscribe': 1,
    'subscribeStateChange': 1,
    'authStateChange': 1,
    'authenticate': 1,
    'deauthenticate': 1,
    'removeAuthToken': 1,
    'subscribeRequest': 1
  };

  this.connectAttempts = 0;

  this._emitBuffer = new index$22();
  this._channels = {};

  this.options = opts;

  this._cid = 1;

  this.options.callIdGenerator = function () {
    return self._callIdGenerator();
  };

  if (this.options.autoReconnect) {
    if (this.options.autoReconnectOptions == null) {
      this.options.autoReconnectOptions = {};
    }

    // Add properties to the this.options.autoReconnectOptions object.
    // We assign the reference to a reconnectOptions variable to avoid repetition.
    var reconnectOptions = this.options.autoReconnectOptions;
    if (reconnectOptions.initialDelay == null) {
      reconnectOptions.initialDelay = 10000;
    }
    if (reconnectOptions.randomness == null) {
      reconnectOptions.randomness = 10000;
    }
    if (reconnectOptions.multiplier == null) {
      reconnectOptions.multiplier = 1.5;
    }
    if (reconnectOptions.maxDelay == null) {
      reconnectOptions.maxDelay = 60000;
    }
  }

  if (this.options.subscriptionRetryOptions == null) {
    this.options.subscriptionRetryOptions = {};
  }

  if (this.options.authEngine) {
    this.auth = this.options.authEngine;
  } else {
    this.auth = new AuthEngine();
  }

  if (this.options.codecEngine) {
    this.codec = this.options.codecEngine;
  } else {
    // Default codec engine
    this.codec = index$20;
  }

  this.options.path = this.options.path.replace(/\/$/, '') + '/';

  this.options.query = opts.query || {};
  if (typeof this.options.query == 'string') {
    this.options.query = querystring.parse(this.options.query);
  }

  if (this.options.autoConnect) {
    this.connect();
  }

  this._channelEmitter = new SCEmitter$1();

  if (isBrowser && this.disconnectOnUnload) {
    var unloadHandler = function () {
      self.disconnect();
    };

    if (commonjsGlobal.attachEvent) {
      commonjsGlobal.attachEvent('onunload', unloadHandler);
    } else if (commonjsGlobal.addEventListener) {
      commonjsGlobal.addEventListener('beforeunload', unloadHandler, false);
    }
  }
};

SCSocket.prototype = Object.create(SCEmitter$1.prototype);

SCSocket.CONNECTING = SCSocket.prototype.CONNECTING = SCTransport.prototype.CONNECTING;
SCSocket.OPEN = SCSocket.prototype.OPEN = SCTransport.prototype.OPEN;
SCSocket.CLOSED = SCSocket.prototype.CLOSED = SCTransport.prototype.CLOSED;

SCSocket.AUTHENTICATED = SCSocket.prototype.AUTHENTICATED = 'authenticated';
SCSocket.UNAUTHENTICATED = SCSocket.prototype.UNAUTHENTICATED = 'unauthenticated';
SCSocket.PENDING = SCSocket.prototype.PENDING = 'pending';

SCSocket.ignoreStatuses = index$18.socketProtocolIgnoreStatuses;
SCSocket.errorStatuses = index$18.socketProtocolErrorStatuses;

SCSocket.prototype._privateEventHandlerMap = {
  '#publish': function (data) {
    var undecoratedChannelName = this._undecorateChannelName(data.channel);
    var isSubscribed = this.isSubscribed(undecoratedChannelName, true);

    if (isSubscribed) {
      this._channelEmitter.emit(undecoratedChannelName, data.data);
    }
  },
  '#kickOut': function (data) {
    var undecoratedChannelName = this._undecorateChannelName(data.channel);
    var channel = this._channels[undecoratedChannelName];
    if (channel) {
      SCEmitter$1.prototype.emit.call(this, 'kickOut', data.message, undecoratedChannelName);
      channel.emit('kickOut', data.message, undecoratedChannelName);
      this._triggerChannelUnsubscribe(channel);
    }
  },
  '#setAuthToken': function (data, response$$1) {
    var self = this;

    if (data) {
      var triggerAuthenticate = function (err) {
        if (err) {
          // This is a non-fatal error, we don't want to close the connection
          // because of this but we do want to notify the server and throw an error
          // on the client.
          response$$1.error(err);
          self._onSCError(err);
        } else {
          self._changeToAuthenticatedState(data.token);
          response$$1.end();
        }
      };

      this.auth.saveToken(this.options.authTokenName, data.token, {}, triggerAuthenticate);
    } else {
      response$$1.error(new InvalidMessageError('No token data provided by #setAuthToken event'));
    }
  },
  '#removeAuthToken': function (data, response$$1) {
    var self = this;

    this.auth.removeToken(this.options.authTokenName, function (err, oldToken) {
      if (err) {
        // Non-fatal error - Do not close the connection
        response$$1.error(err);
        self._onSCError(err);
      } else {
        SCEmitter$1.prototype.emit.call(self, 'removeAuthToken', oldToken);
        self._changeToUnauthenticatedState();
        response$$1.end();
      }
    });
  },
  '#disconnect': function (data) {
    this.transport.close(data.code, data.data);
  }
};

SCSocket.prototype._callIdGenerator = function () {
  return this._cid++;
};

SCSocket.prototype.getState = function () {
  return this.state;
};

SCSocket.prototype.getBytesReceived = function () {
  return this.transport.getBytesReceived();
};

SCSocket.prototype.deauthenticate = function (callback) {
  var self = this;

  this.auth.removeToken(this.options.authTokenName, function (err, oldToken) {
    if (err) {
      // Non-fatal error - Do not close the connection
      self._onSCError(err);
    } else {
      self.emit('#removeAuthToken');
      SCEmitter$1.prototype.emit.call(self, 'removeAuthToken', oldToken);
      self._changeToUnauthenticatedState();
    }
    callback && callback(err);
  });
};

SCSocket.prototype.connect = SCSocket.prototype.open = function () {
  var self = this;

  if (this.state == this.CLOSED) {
    this.pendingReconnect = false;
    this.pendingReconnectTimeout = null;
    clearTimeout(this._reconnectTimeoutRef);

    this.state = this.CONNECTING;
    SCEmitter$1.prototype.emit.call(this, 'connecting');

    this._changeToPendingAuthState();

    if (this.transport) {
      this.transport.off();
    }

    this.transport = new SCTransport(this.auth, this.codec, this.options);

    this.transport.on('open', function (status) {
      self.state = self.OPEN;
      self._onSCOpen(status);
    });

    this.transport.on('error', function (err) {
      self._onSCError(err);
    });

    this.transport.on('close', function (code, data) {
      self.state = self.CLOSED;
      self._onSCClose(code, data);
    });

    this.transport.on('openAbort', function (code, data) {
      self.state = self.CLOSED;
      self._onSCClose(code, data, true);
    });

    this.transport.on('event', function (event, data, res) {
      self._onSCEvent(event, data, res);
    });
  }
};

SCSocket.prototype.reconnect = function () {
  this.disconnect();
  this.connect();
};

SCSocket.prototype.disconnect = function (code, data) {
  code = code || 1000;

  if (typeof code != 'number') {
    throw new InvalidArgumentsError('If specified, the code argument must be a number');
  }

  if (this.state == this.OPEN || this.state == this.CONNECTING) {
    this.transport.close(code, data);
  } else {
    this.pendingReconnect = false;
    this.pendingReconnectTimeout = null;
    clearTimeout(this._reconnectTimeoutRef);
  }
};

SCSocket.prototype._changeToPendingAuthState = function () {
  if (this.authState != this.PENDING) {
    var oldState = this.authState;
    this.authState = this.PENDING;
    var stateChangeData = {
      oldState: oldState,
      newState: this.authState
    };
    SCEmitter$1.prototype.emit.call(this, 'authStateChange', stateChangeData);
  }
};

SCSocket.prototype._changeToUnauthenticatedState = function () {
  if (this.authState != this.UNAUTHENTICATED) {
    var oldState = this.authState;
    this.authState = this.UNAUTHENTICATED;
    this.signedAuthToken = null;
    this.authToken = null;

    var stateChangeData = {
      oldState: oldState,
      newState: this.authState
    };
    SCEmitter$1.prototype.emit.call(this, 'authStateChange', stateChangeData);
    if (oldState == this.AUTHENTICATED) {
      SCEmitter$1.prototype.emit.call(this, 'deauthenticate');
    }
    SCEmitter$1.prototype.emit.call(this, 'authTokenChange', this.signedAuthToken);
  }
};

SCSocket.prototype._changeToAuthenticatedState = function (signedAuthToken) {
  this.signedAuthToken = signedAuthToken;
  this.authToken = this._extractAuthTokenData(signedAuthToken);

  if (this.authState != this.AUTHENTICATED) {
    var oldState = this.authState;
    this.authState = this.AUTHENTICATED;
    var stateChangeData = {
      oldState: oldState,
      newState: this.authState,
      signedAuthToken: signedAuthToken,
      authToken: this.authToken
    };
    this.processPendingSubscriptions();

    SCEmitter$1.prototype.emit.call(this, 'authStateChange', stateChangeData);
    SCEmitter$1.prototype.emit.call(this, 'authenticate', signedAuthToken);
  }
  SCEmitter$1.prototype.emit.call(this, 'authTokenChange', signedAuthToken);
};

SCSocket.prototype.decodeBase64 = function (encodedString) {
  var decodedString;
  if (typeof Buffer == 'undefined') {
    if (commonjsGlobal.atob) {
      decodedString = commonjsGlobal.atob(encodedString);
    } else {
      decodedString = base64.decode(encodedString);
    }
  } else {
    var buffer = new Buffer(encodedString, 'base64');
    decodedString = buffer.toString('utf8');
  }
  return decodedString;
};

SCSocket.prototype.encodeBase64 = function (decodedString) {
  var encodedString;
  if (typeof Buffer == 'undefined') {
    if (commonjsGlobal.btoa) {
      encodedString = commonjsGlobal.btoa(decodedString);
    } else {
      encodedString = base64.encode(decodedString);
    }
  } else {
    var buffer = new Buffer(decodedString, 'utf8');
    encodedString = buffer.toString('base64');
  }
  return encodedString;
};

SCSocket.prototype._extractAuthTokenData = function (signedAuthToken) {
  var tokenParts = (signedAuthToken || '').split('.');
  var encodedTokenData = tokenParts[1];
  if (encodedTokenData != null) {
    var tokenData = encodedTokenData;
    try {
      tokenData = this.decodeBase64(tokenData);
      return JSON.parse(tokenData);
    } catch (e) {
      return tokenData;
    }
  }
  return null;
};

SCSocket.prototype.getAuthToken = function () {
  return this.authToken;
};

SCSocket.prototype.getSignedAuthToken = function () {
  return this.signedAuthToken;
};

// Perform client-initiated authentication by providing an encrypted token string
SCSocket.prototype.authenticate = function (signedAuthToken, callback) {
  var self = this;

  this._changeToPendingAuthState();

  this.emit('#authenticate', signedAuthToken, function (err, authStatus) {
    if (authStatus && authStatus.authError) {
      authStatus.authError = index$18.hydrateError(authStatus.authError);
    }
    if (err) {
      self._changeToUnauthenticatedState();
      callback && callback(err, authStatus);
    } else {
      self.auth.saveToken(self.options.authTokenName, signedAuthToken, {}, function (err) {
        callback && callback(err, authStatus);
        if (err) {
          self._changeToUnauthenticatedState();
          self._onSCError(err);
        } else {
          if (authStatus.isAuthenticated) {
            self._changeToAuthenticatedState(signedAuthToken);
          } else {
            self._changeToUnauthenticatedState();
          }
        }
      });
    }
  });
};

SCSocket.prototype._tryReconnect = function (initialDelay) {
  var self = this;

  var exponent = this.connectAttempts++;
  var reconnectOptions = this.options.autoReconnectOptions;
  var timeout;

  if (initialDelay == null || exponent > 0) {
    var initialTimeout = Math.round(reconnectOptions.initialDelay + (reconnectOptions.randomness || 0) * Math.random());

    timeout = Math.round(initialTimeout * Math.pow(reconnectOptions.multiplier, exponent));
  } else {
    timeout = initialDelay;
  }

  if (timeout > reconnectOptions.maxDelay) {
    timeout = reconnectOptions.maxDelay;
  }

  clearTimeout(this._reconnectTimeoutRef);

  this.pendingReconnect = true;
  this.pendingReconnectTimeout = timeout;
  this._reconnectTimeoutRef = setTimeout(function () {
    self.connect();
  }, timeout);
};

SCSocket.prototype._onSCOpen = function (status) {
  var self = this;

  if (status) {
    this.id = status.id;
    this.pingTimeout = status.pingTimeout;
    this.transport.pingTimeout = this.pingTimeout;
    if (status.isAuthenticated) {
      this._changeToAuthenticatedState(status.authToken);
    } else {
      this._changeToUnauthenticatedState();
    }
  } else {
    this._changeToUnauthenticatedState();
  }

  this.connectAttempts = 0;
  if (this.options.autoProcessSubscriptions) {
    this.processPendingSubscriptions();
  } else {
    this.pendingConnectCallback = true;
  }

  // If the user invokes the callback while in autoProcessSubscriptions mode, it
  // won't break anything - The processPendingSubscriptions() call will be a no-op.
  SCEmitter$1.prototype.emit.call(this, 'connect', status, function () {
    self.processPendingSubscriptions();
  });

  this._flushEmitBuffer();
};

SCSocket.prototype._onSCError = function (err) {
  var self = this;

  // Throw error in different stack frame so that error handling
  // cannot interfere with a reconnect action.
  setTimeout(function () {
    if (self.listeners('error').length < 1) {
      throw err;
    } else {
      SCEmitter$1.prototype.emit.call(self, 'error', err);
    }
  }, 0);
};

SCSocket.prototype._suspendSubscriptions = function () {
  var channel, newState;
  for (var channelName in this._channels) {
    if (this._channels.hasOwnProperty(channelName)) {
      channel = this._channels[channelName];
      if (channel.state == channel.SUBSCRIBED ||
        channel.state == channel.PENDING) {

        newState = channel.PENDING;
      } else {
        newState = channel.UNSUBSCRIBED;
      }

      this._triggerChannelUnsubscribe(channel, newState);
    }
  }
};

SCSocket.prototype._onSCClose = function (code, data, openAbort) {
  var self = this;

  this.id = null;

  if (this.transport) {
    this.transport.off();
  }
  this.pendingReconnect = false;
  this.pendingReconnectTimeout = null;
  clearTimeout(this._reconnectTimeoutRef);

  this._changeToPendingAuthState();
  this._suspendSubscriptions();

  // Try to reconnect
  // on server ping timeout (4000)
  // or on client pong timeout (4001)
  // or on close without status (1005)
  // or on handshake failure (4003)
  // or on socket hung up (1006)
  if (this.options.autoReconnect) {
    if (code == 4000 || code == 4001 || code == 1005) {
      // If there is a ping or pong timeout or socket closes without
      // status, don't wait before trying to reconnect - These could happen
      // if the client wakes up after a period of inactivity and in this case we
      // want to re-establish the connection as soon as possible.
      this._tryReconnect(0);

      // Codes 4500 and above will be treated as permanent disconnects.
      // Socket will not try to auto-reconnect.
    } else if (code != 1000 && code < 4500) {
      this._tryReconnect();
    }
  }

  if (openAbort) {
    SCEmitter$1.prototype.emit.call(self, 'connectAbort', code, data);
  } else {
    SCEmitter$1.prototype.emit.call(self, 'disconnect', code, data);
  }

  if (!SCSocket.ignoreStatuses[code]) {
    var failureMessage;
    if (data) {
      failureMessage = 'Socket connection failed: ' + data;
    } else {
      failureMessage = 'Socket connection failed for unknown reasons';
    }
    var err = new SocketProtocolError(SCSocket.errorStatuses[code] || failureMessage, code);
    this._onSCError(err);
  }
};

SCSocket.prototype._onSCEvent = function (event, data, res) {
  var handler = this._privateEventHandlerMap[event];
  if (handler) {
    handler.call(this, data, res);
  } else {
    SCEmitter$1.prototype.emit.call(this, event, data, function () {
      res && res.callback.apply(res, arguments);
    });
  }
};

SCSocket.prototype.decode = function (message) {
  return this.transport.decode(message);
};

SCSocket.prototype.encode = function (object) {
  return this.transport.encode(object);
};

SCSocket.prototype._flushEmitBuffer = function () {
  var currentNode = this._emitBuffer.head;
  var nextNode;

  while (currentNode) {
    nextNode = currentNode.next;
    var eventObject = currentNode.data;
    currentNode.detach();
    this.transport.emitObject(eventObject);
    currentNode = nextNode;
  }
};

SCSocket.prototype._handleEventAckTimeout = function (eventObject, eventNode) {
  if (eventNode) {
    eventNode.detach();
  }
  var callback = eventObject.callback;
  if (callback) {
    delete eventObject.callback;
    var error = new TimeoutError("Event response for '" + eventObject.event + "' timed out");
    callback.call(eventObject, error, eventObject);
  }
};

SCSocket.prototype._emit = function (event, data, callback) {
  var self = this;

  if (this.state == this.CLOSED) {
    this.connect();
  }
  var eventObject = {
    event: event,
    data: data,
    callback: callback
  };

  var eventNode = new index$22.Item();

  if (this.options.cloneData) {
    eventNode.data = clone_1(eventObject);
  } else {
    eventNode.data = eventObject;
  }

  eventObject.timeout = setTimeout(function () {
    self._handleEventAckTimeout(eventObject, eventNode);
  }, this.ackTimeout);

  this._emitBuffer.append(eventNode);

  if (this.state == this.OPEN) {
    this._flushEmitBuffer();
  }
};

SCSocket.prototype.send = function (data) {
  this.transport.send(data);
};

SCSocket.prototype.emit = function (event, data, callback) {
  if (this._localEvents[event] == null) {
    this._emit(event, data, callback);
  } else {
    SCEmitter$1.prototype.emit.call(this, event, data);
  }
};

SCSocket.prototype.publish = function (channelName, data, callback) {
  var pubData = {
    channel: this._decorateChannelName(channelName),
    data: data
  };
  this.emit('#publish', pubData, callback);
};

SCSocket.prototype._triggerChannelSubscribe = function (channel, subscriptionOptions) {
  var channelName = channel.name;

  if (channel.state != channel.SUBSCRIBED) {
    var oldState = channel.state;
    channel.state = channel.SUBSCRIBED;

    var stateChangeData = {
      channel: channelName,
      oldState: oldState,
      newState: channel.state,
      subscriptionOptions: subscriptionOptions
    };
    channel.emit('subscribeStateChange', stateChangeData);
    channel.emit('subscribe', channelName, subscriptionOptions);
    SCEmitter$1.prototype.emit.call(this, 'subscribeStateChange', stateChangeData);
    SCEmitter$1.prototype.emit.call(this, 'subscribe', channelName, subscriptionOptions);
  }
};

SCSocket.prototype._triggerChannelSubscribeFail = function (err, channel, subscriptionOptions) {
  var channelName = channel.name;
  var meetsAuthRequirements = !channel.waitForAuth || this.authState == this.AUTHENTICATED;

  if (channel.state != channel.UNSUBSCRIBED && meetsAuthRequirements) {
    channel.state = channel.UNSUBSCRIBED;

    channel.emit('subscribeFail', err, channelName, subscriptionOptions);
    SCEmitter$1.prototype.emit.call(this, 'subscribeFail', err, channelName, subscriptionOptions);
  }
};

// Cancel any pending subscribe callback
SCSocket.prototype._cancelPendingSubscribeCallback = function (channel) {
  if (channel._pendingSubscriptionCid != null) {
    this.transport.cancelPendingResponse(channel._pendingSubscriptionCid);
    delete channel._pendingSubscriptionCid;
  }
};

SCSocket.prototype._decorateChannelName = function (channelName) {
  if (this.channelPrefix) {
    channelName = this.channelPrefix + channelName;
  }
  return channelName;
};

SCSocket.prototype._undecorateChannelName = function (decoratedChannelName) {
  if (this.channelPrefix && decoratedChannelName.indexOf(this.channelPrefix) == 0) {
    return decoratedChannelName.replace(this.channelPrefix, '');
  }
  return decoratedChannelName;
};

SCSocket.prototype._trySubscribe = function (channel) {
  var self = this;

  var meetsAuthRequirements = !channel.waitForAuth || this.authState == this.AUTHENTICATED;

  // We can only ever have one pending subscribe action at any given time on a channel
  if (this.state == this.OPEN && !this.pendingConnectCallback &&
    channel._pendingSubscriptionCid == null && meetsAuthRequirements) {

    var options = {
      noTimeout: true
    };

    var subscriptionOptions = {
      channel: this._decorateChannelName(channel.name)
    };
    if (channel.waitForAuth) {
      options.waitForAuth = true;
      subscriptionOptions.waitForAuth = options.waitForAuth;
    }
    if (channel.data) {
      subscriptionOptions.data = channel.data;
    }

    channel._pendingSubscriptionCid = this.transport.emit(
      '#subscribe', subscriptionOptions, options,
      function (err) {
        delete channel._pendingSubscriptionCid;
        if (err) {
          self._triggerChannelSubscribeFail(err, channel, subscriptionOptions);
        } else {
          self._triggerChannelSubscribe(channel, subscriptionOptions);
        }
      }
    );
    SCEmitter$1.prototype.emit.call(this, 'subscribeRequest', channel.name, subscriptionOptions);
  }
};

SCSocket.prototype.subscribe = function (channelName, options) {
  var channel = this._channels[channelName];

  if (!channel) {
    channel = new SCChannel(channelName, this, options);
    this._channels[channelName] = channel;
  } else if (options) {
    channel.setOptions(options);
  }

  if (channel.state == channel.UNSUBSCRIBED) {
    channel.state = channel.PENDING;
    this._trySubscribe(channel);
  }

  return channel;
};

SCSocket.prototype._triggerChannelUnsubscribe = function (channel, newState) {
  var channelName = channel.name;
  var oldState = channel.state;

  if (newState) {
    channel.state = newState;
  } else {
    channel.state = channel.UNSUBSCRIBED;
  }
  this._cancelPendingSubscribeCallback(channel);

  if (oldState == channel.SUBSCRIBED) {
    var stateChangeData = {
      channel: channelName,
      oldState: oldState,
      newState: channel.state
    };
    channel.emit('subscribeStateChange', stateChangeData);
    channel.emit('unsubscribe', channelName);
    SCEmitter$1.prototype.emit.call(this, 'subscribeStateChange', stateChangeData);
    SCEmitter$1.prototype.emit.call(this, 'unsubscribe', channelName);
  }
};

SCSocket.prototype._tryUnsubscribe = function (channel) {
  var self = this;

  if (this.state == this.OPEN) {
    var options = {
      noTimeout: true
    };
    // If there is a pending subscribe action, cancel the callback
    this._cancelPendingSubscribeCallback(channel);

    // This operation cannot fail because the TCP protocol guarantees delivery
    // so long as the connection remains open. If the connection closes,
    // the server will automatically unsubscribe the socket and thus complete
    // the operation on the server side.
    var decoratedChannelName = this._decorateChannelName(channel.name);
    this.transport.emit('#unsubscribe', decoratedChannelName, options);
  }
};

SCSocket.prototype.unsubscribe = function (channelName) {

  var channel = this._channels[channelName];

  if (channel) {
    if (channel.state != channel.UNSUBSCRIBED) {

      this._triggerChannelUnsubscribe(channel);
      this._tryUnsubscribe(channel);
    }
  }
};

SCSocket.prototype.channel = function (channelName, options) {
  var currentChannel = this._channels[channelName];

  if (!currentChannel) {
    currentChannel = new SCChannel(channelName, this, options);
    this._channels[channelName] = currentChannel;
  }
  return currentChannel;
};

SCSocket.prototype.destroyChannel = function (channelName) {
  var channel = this._channels[channelName];
  channel.unwatch();
  channel.unsubscribe();
  delete this._channels[channelName];
};

SCSocket.prototype.subscriptions = function (includePending) {
  var subs = [];
  var channel, includeChannel;
  for (var channelName in this._channels) {
    if (this._channels.hasOwnProperty(channelName)) {
      channel = this._channels[channelName];

      if (includePending) {
        includeChannel = channel && (channel.state == channel.SUBSCRIBED ||
          channel.state == channel.PENDING);
      } else {
        includeChannel = channel && channel.state == channel.SUBSCRIBED;
      }

      if (includeChannel) {
        subs.push(channelName);
      }
    }
  }
  return subs;
};

SCSocket.prototype.isSubscribed = function (channelName, includePending) {
  var channel = this._channels[channelName];
  if (includePending) {
    return !!channel && (channel.state == channel.SUBSCRIBED ||
      channel.state == channel.PENDING);
  }
  return !!channel && channel.state == channel.SUBSCRIBED;
};

SCSocket.prototype.processPendingSubscriptions = function () {
  var self = this;

  this.pendingConnectCallback = false;

  for (var i in this._channels) {
    if (this._channels.hasOwnProperty(i)) {
      (function (channel) {
        if (channel.state == channel.PENDING) {
          self._trySubscribe(channel);
        }
      })(this._channels[i]);
    }
  }
};

SCSocket.prototype.watch = function (channelName, handler) {
  if (typeof handler != 'function') {
    throw new InvalidArgumentsError('No handler function was provided');
  }
  this._channelEmitter.on(channelName, handler);
};

SCSocket.prototype.unwatch = function (channelName, handler) {
  if (handler) {
    this._channelEmitter.removeListener(channelName, handler);
  } else {
    this._channelEmitter.removeAllListeners(channelName);
  }
};

SCSocket.prototype.watchers = function (channelName) {
  return this._channelEmitter.listeners(channelName);
};

var scsocket = SCSocket;

var InvalidArgumentsError$2 = index$18.InvalidArgumentsError;

var _connections = {};

function getMultiplexId(options) {
  var protocolPrefix = options.secure ? 'https://' : 'http://';
  var queryString = '';
  if (options.query) {
    if (typeof options.query == 'string') {
      queryString = options.query;
    } else {
      var queryArray = [];
      var queryMap = options.query;
      for (var key in queryMap) {
        if (queryMap.hasOwnProperty(key)) {
          queryArray.push(key + '=' + queryMap[key]);
        }
      }
      if (queryArray.length) {
        queryString = '?' + queryArray.join('&');
      }
    }
  }
  var host;
  if (options.host) {
    host = options.host;
  } else {
    host = options.hostname + ':' + options.port;
  }
  return protocolPrefix + host + options.path + queryString;
}

function isUrlSecure() {
  return commonjsGlobal.location && location.protocol == 'https:';
}

function getPort(options, isSecureDefault) {
  var isSecure = options.secure == null ? isSecureDefault : options.secure;
  return options.port || (commonjsGlobal.location && location.port ? location.port : isSecure ? 443 : 80);
}

function connect$2(options) {
  var self = this;

  options = options || {};

  if (options.host && options.port) {
    throw new InvalidArgumentsError$2('The host option should already include the' +
      ' port number in the format hostname:port - Because of this, the host and port options' +
      ' cannot be specified together; use the hostname option instead');
  }

  var isSecureDefault = isUrlSecure();

  var opts = {
    port: getPort(options, isSecureDefault),
    hostname: commonjsGlobal.location && location.hostname,
    path: '/socketcluster/',
    secure: isSecureDefault,
    autoConnect: true,
    autoReconnect: true,
    autoProcessSubscriptions: true,
    connectTimeout: 20000,
    ackTimeout: 10000,
    timestampRequests: false,
    timestampParam: 't',
    authEngine: null,
    authTokenName: 'socketCluster.authToken',
    binaryType: 'arraybuffer',
    multiplex: true,
    cloneData: false
  };
  for (var i in options) {
    if (options.hasOwnProperty(i)) {
      opts[i] = options[i];
    }
  }
  var multiplexId = getMultiplexId(opts);
  if (opts.multiplex === false) {
    return new scsocket(opts);
  }
  if (_connections[multiplexId]) {
    _connections[multiplexId].connect();
  } else {
    _connections[multiplexId] = new scsocket(opts);
  }
  return _connections[multiplexId];
}

function destroy$1(options) {
  var self = this;

  options = options || {};
  var isSecureDefault = isUrlSecure();

  var opts = {
    port: getPort(options, isSecureDefault),
    hostname: commonjsGlobal.location && location.hostname,
    path: '/socketcluster/',
    secure: isSecureDefault
  };
  for (var i in options) {
    if (options.hasOwnProperty(i)) {
      opts[i] = options[i];
    }
  }
  var multiplexId = getMultiplexId(opts);
  var socket = _connections[multiplexId];
  if (socket) {
    socket.disconnect();
  }
  delete _connections[multiplexId];
}

var scsocketcreator = {
  connect: connect$2,
  destroy: destroy$1,
  connections: _connections
};

var SCSocketCreator_1 = scsocketcreator;
var SCSocket_1 = scsocket;

var SCEmitter = index$12.SCEmitter;

var connect$1 = function (options) {
  return scsocketcreator.connect(options);
};

var destroy = function (options) {
  return scsocketcreator.destroy(options);
};

var connections = scsocketcreator.connections;

var version = '5.5.2';

var index$10 = {
	SCSocketCreator: SCSocketCreator_1,
	SCSocket: SCSocket_1,
	SCEmitter: SCEmitter,
	connect: connect$1,
	destroy: destroy,
	connections: connections,
	version: version
};

var constants = createCommonjsModule(function (module, exports) {
'use strict';

exports.__esModule = true;
var defaultSocketOptions = exports.defaultSocketOptions = {
  secure: true,
  hostname: 'remotedev.io',
  port: 443,
  autoReconnect: true,
  autoReconnectOptions: {
    randomness: 60000
  }
};
});

var devTools = createCommonjsModule(function (module, exports) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.__esModule = true;
exports.send = undefined;
exports.extractState = extractState;
exports.generateId = generateId;
exports.start = start;
exports.connect = connect;
exports.connectViaExtension = connectViaExtension;





var _socketclusterClient2 = _interopRequireDefault(index$10);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socket = undefined;
var channel = undefined;
var listeners = {};

function extractState(message) {
  return message && message.state ? (0, index$6.parse)(message.state) : undefined;
}

function generateId() {
  return Math.random().toString(36).substr(2);
}

function handleMessages(message) {
  if (!message.payload) message.payload = message.action;
  Object.keys(listeners).forEach(function (id) {
    if (message.instanceId && id !== message.instanceId) return;
    if (typeof listeners[id] === 'function') listeners[id](message);else listeners[id].forEach(function (fn) {
      fn(message);
    });
  });
}

function watch() {
  if (channel) return;
  socket.emit('login', 'master', function (err, channelName) {
    if (err) {
      console.log(err);return;
    }
    channel = socket.subscribe(channelName);
    channel.watch(handleMessages);
    socket.on(channelName, handleMessages);
  });
}

function connectToServer(options) {
  if (socket) return;
  var socketOptions = undefined;
  if (options.port) {
    socketOptions = {
      port: options.port,
      hostname: options.hostname || 'localhost',
      secure: !!options.secure
    };
  } else socketOptions = constants.defaultSocketOptions;
  socket = _socketclusterClient2.default.connect(socketOptions);
  watch();
}

function start(options) {
  if (options) {
    if (options.port && !options.hostname) {
      options.hostname = 'localhost';
    }
  }
  connectToServer(options);
}

function transformAction(action) {
  if (action.action) return action;
  var liftedAction = { timestamp: Date.now() };
  if ((typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object') {
    liftedAction.action = action;
    if (!action.type) liftedAction.action.type = action.id || action.actionType || 'update';
  } else if (typeof action === 'undefined') {
    liftedAction.action = 'update';
  } else {
    liftedAction.action = { type: action };
  }
  return liftedAction;
}

function _send(action, state, options, type, instanceId) {
  start(options);
  setTimeout(function () {
    var message = {
      payload: state ? (0, index$6.stringify)(state) : '',
      action: type === 'ACTION' ? (0, index$6.stringify)(transformAction(action)) : action,
      type: type || 'ACTION',
      id: socket.id,
      instanceId: instanceId,
      name: options.name
    };
    socket.emit(socket.id ? 'log' : 'log-noid', message);
  }, 0);
}

exports.send = _send;
function connect() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var id = generateId(options.instanceId);
  start(options);
  return {
    init: function init(state, action) {
      _send(action || {}, state, options, 'INIT', id);
    },
    subscribe: function subscribe(listener) {
      if (!listener) return undefined;
      if (!listeners[id]) listeners[id] = [];
      listeners[id].push(listener);

      return function unsubscribe() {
        var index = listeners[id].indexOf(listener);
        listeners[id].splice(index, 1);
      };
    },
    unsubscribe: function unsubscribe() {
      delete listeners[id];
    },
    send: function send(action, payload) {
      if (action) {
        _send(action, payload, options, 'ACTION', id);
      } else {
        _send(undefined, payload, options, 'STATE', id);
      }
    },
    error: function error(payload) {
      socket.emit({ type: 'ERROR', payload: payload, id: socket.id, instanceId: id });
    }
  };
}

function connectViaExtension(options) {
  if (options && options.remote || typeof window === 'undefined' || !window.devToolsExtension) {
    return connect(options);
  }
  return window.devToolsExtension.connect(options);
}

exports.default = { connect: connect, connectViaExtension: connectViaExtension, send: _send, extractState: extractState, generateId: generateId };
});

var index$4 = devTools;

var index_1$1 = index$4.connectViaExtension;
var index_2 = index$4.extractState;

var MsgTypes = function (__exports) {
  var Start = __exports.Start = "START";
  var Action = __exports.Action = "ACTION";
  var Dispatch = __exports.Dispatch = "DISPATCH";
  return __exports;
}({});
var PayloadTypes = function (__exports) {
  var ImportState = __exports.ImportState = "IMPORT_STATE";
  var JumpToState = __exports.JumpToState = "JUMP_TO_STATE";
  var JumpToAction = __exports.JumpToAction = "JUMP_TO_ACTION";
  return __exports;
}({});
var Options = function () {
  function Options(remote, port, hostname, secure, getActionType, serialize) {
    babelHelpers.classCallCheck(this, Options);
    this.remote = remote;
    this.port = port | 0;
    this.hostname = hostname;
    this.secure = secure;
    this.getActionType = getActionType;
    this.serialize = serialize;
  }

  babelHelpers.createClass(Options, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Fable.Import.RemoteDev.Options",
        interfaces: ["FSharpRecord"],
        properties: {
          remote: "boolean",
          port: "number",
          hostname: "string",
          secure: "boolean",
          getActionType: Option(FableFunction([Any, Any])),
          serialize: Any
        }
      };
    }
  }]);
  return Options;
}();
setType("Fable.Import.RemoteDev.Options", Options);
var Action = function () {
  function Action(type, fields) {
    babelHelpers.classCallCheck(this, Action);
    this.type = type;
    this.fields = fields;
  }

  babelHelpers.createClass(Action, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Fable.Import.RemoteDev.Action",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          type: "string",
          fields: FableArray(Any)
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }]);
  return Action;
}();
setType("Fable.Import.RemoteDev.Action", Action);
var LiftedState = function () {
  function LiftedState(actionsById, computedStates, currentStateIndex, nextActionId) {
    babelHelpers.classCallCheck(this, LiftedState);
    this.actionsById = actionsById;
    this.computedStates = computedStates;
    this.currentStateIndex = currentStateIndex | 0;
    this.nextActionId = nextActionId | 0;
  }

  babelHelpers.createClass(LiftedState, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Fable.Import.RemoteDev.LiftedState",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          actionsById: FableArray(Action),
          computedStates: FableArray(Any),
          currentStateIndex: "number",
          nextActionId: "number"
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }]);
  return LiftedState;
}();
setType("Fable.Import.RemoteDev.LiftedState", LiftedState);
var Payload = function () {
  function Payload(nextLiftedState, type) {
    babelHelpers.classCallCheck(this, Payload);
    this.nextLiftedState = nextLiftedState;
    this.type = type;
  }

  babelHelpers.createClass(Payload, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Fable.Import.RemoteDev.Payload",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          nextLiftedState: LiftedState,
          type: "string"
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }]);
  return Payload;
}();
setType("Fable.Import.RemoteDev.Payload", Payload);
var Msg$3 = function () {
  function Msg(state, action, type, payload) {
    babelHelpers.classCallCheck(this, Msg);
    this.state = state;
    this.action = action;
    this.type = type;
    this.payload = payload;
  }

  babelHelpers.createClass(Msg, [{
    key: _Symbol.reflection,
    value: function value() {
      return {
        type: "Fable.Import.RemoteDev.Msg",
        interfaces: ["FSharpRecord", "System.IEquatable"],
        properties: {
          state: "string",
          action: Any,
          type: "string",
          payload: Payload
        }
      };
    }
  }, {
    key: "Equals",
    value: function Equals(other) {
      return equalsRecords(this, other);
    }
  }]);
  return Msg;
}();
setType("Fable.Import.RemoteDev.Msg", Msg$3);

var Debugger = function (__exports) {
  var ConnectionOptions = __exports.ConnectionOptions = function () {
    function ConnectionOptions(tag, data) {
      babelHelpers.classCallCheck(this, ConnectionOptions);
      this.tag = tag;
      this.data = data;
    }

    babelHelpers.createClass(ConnectionOptions, [{
      key: _Symbol.reflection,
      value: function value() {
        return {
          type: "Elmish.Debug.Debugger.ConnectionOptions",
          interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
          cases: [["ViaExtension"], ["Remote", "string", "number"], ["Secure", "string", "number"]]
        };
      }
    }, {
      key: "Equals",
      value: function Equals(other) {
        return this === other || this.tag === other.tag && equals(this.data, other.data);
      }
    }, {
      key: "CompareTo",
      value: function CompareTo(other) {
        return compareUnions(this, other) | 0;
      }
    }]);
    return ConnectionOptions;
  }();

  setType("Elmish.Debug.Debugger.ConnectionOptions", ConnectionOptions);

  var connect$$1 = __exports.connect = function () {
    var serialize = {
      replacer: function replacer(_arg1, v) {
        return deflate(v);
      }
    };
    var fallback = new Options(true, 443, "remotedev.io", true, function (cmd) {
      return {
        type: function () {
          var matchValue = getUnionFields(cmd, Any);
          return getName(matchValue[0]);
        }(),
        msg: cmd
      };
    }, serialize);
    return function ($var1) {
      return index_1$1(function (_arg1_1) {
        if (_arg1_1.tag === 1) {
          var getActionType = null;
          return new Options(fallback.remote, _arg1_1.data[1], _arg1_1.data[0], false, getActionType, fallback.serialize);
        } else if (_arg1_1.tag === 2) {
          var getActionType_1 = null;
          return new Options(fallback.remote, _arg1_1.data[1], _arg1_1.data[0], fallback.secure, getActionType_1, fallback.serialize);
        } else {
          return new Options(false, 8000, "localhost", false, fallback.getActionType, fallback.serialize);
        }
      }($var1));
    };
  }();

  return __exports;
}({});
var Program$1 = function (__exports) {
  var withDebuggerUsing = __exports.withDebuggerUsing = function (connection, program, _genArgs) {
    var init = function init(a) {
      var patternInput = program.init(a);

      var deflated = function (arg00) {
        return JSON.parse(arg00);
      }(toJson(patternInput[0]));

      connection.init(deflated, null);
      return [patternInput[0], patternInput[1]];
    };

    var update = function update(msg, model) {
      var patternInput_1 = program.update(msg, model);
      connection.send(msg, patternInput_1[0]);
      return [patternInput_1[0], patternInput_1[1]];
    };

    var subscribe = function subscribe(model_1) {
      var sub = function sub(dispatch) {
        (function (arg00_1) {
          return connection.subscribe(arg00_1);
        })(function (_arg1) {
          if (_arg1.type === "DISPATCH") {
            try {
              var matchValue = _arg1.payload.type;

              switch (matchValue) {
                case "JUMP_TO_ACTION":
                case "JUMP_TO_STATE":
                  var state = inflatePublic(function (arg00_2) {
                    return index_2(arg00_2);
                  }(_arg1), {
                    T: _genArgs.model
                  });
                  program.setState(state, dispatch);
                  break;

                case "IMPORT_STATE":
                  var state_1 = last(_arg1.payload.nextLiftedState.computedStates);
                  program.setState(inflatePublic(state_1.state, {
                    T: _genArgs.model
                  }), dispatch);
                  connection.send(null, _arg1.payload.nextLiftedState);
                  break;

                default:}
            } catch (ex) {
              console.error("Unable to process monitor command", _arg1, ex);
            }
          }
        });
      };

      return Cmd.batch(ofArray([ofArray([sub]), program.subscribe(model_1)]));
    };

    var onError = function onError(tupledArg) {
      connection.error([tupledArg[0], tupledArg[1]]);
    };

    return new Program(init, update, subscribe, program.view, program.setState, onError);
  };

  var withDebuggerAt = __exports.withDebuggerAt = function (options, program, _genArgs) {
    try {
      return withDebuggerUsing(Debugger.connect(options), program, {
        a: _genArgs.a,
        model: _genArgs.model,
        msg: _genArgs.msg,
        view: _genArgs.view
      });
    } catch (ex) {
      console.error("Unable to connect to the monitor, continuing w/o debugger", ex);
      return program;
    }
  };

  var withDebugger = __exports.withDebugger = function (program, _genArgs) {
    try {
      return withDebuggerUsing(Debugger.connect(new Debugger.ConnectionOptions(0)), program, {
        a: _genArgs.a,
        model: _genArgs.model,
        msg: _genArgs.msg,
        view: _genArgs.view
      });
    } catch (ex) {
      console.error("Unable to connect to the monitor, continuing w/o debugger", ex);
      return program;
    }
  };

  return __exports;
}({});

var options = {
  highlight: function highlight(code) {
    return Prism.highlight(code, Prism.languages.fsharp);
  },
  langPrefix: "language-"
};
marked.setOptions(options);
function menuItem(label$$1, page, currentPage) {
  return react_1("li", {}, react_1("a", createObj(ofArray([classList(ofArray([["is-active", page.Equals(currentPage)]])), new Props.HTMLAttr(51, toHash(page))]), 1), label$$1));
}
function menu(currentPage) {
  return menu$1(new List$1(), ofArray([list(new List$1(), ofArray([menuItem("Home", new Page(0), currentPage)])), label(new List$1(), ofArray(["Elements"])), list(new List$1(), ofArray([menuItem("Checkradio", new Page(1, new Elements(0)), currentPage)]))]));
}
var header = react_1("div", {
  className: "hero is-primary"
}, react_1("div", {
  className: "hero-body"
}, react_1("div", {
  className: "column has-text-centered"
}, react_1("h2", {
  className: "subtitle cookieregular"
}, "Binding for Elmish using Bulma CSS framework"))));
function root(model, dispatch) {
  var pageHtml = function pageHtml(_arg1) {
    if (_arg1.tag === 1) {
      return root$1(model.Elements.Checkradio, function ($var1) {
        return dispatch(function (arg0) {
          return new Msg$2(0, arg0);
        }($var1));
      });
    } else {
      return root$3(model.Home);
    }
  };

  return react_1("div", {}, react_1("div", {
    className: "navbar-bg"
  }, react_1("div", {
    className: "container"
  }, root$4)), header, react_1("div", {
    className: "section"
  }, react_1("div", {
    className: "container"
  }, react_1("div", {
    className: "columns"
  }, react_1("div", {
    className: "column is-2"
  }, menu(model.CurrentPage)), react_1("div", {
    className: "column"
  }, pageHtml(model.CurrentPage))))));
}
ProgramModule.run(withReact("elmish-app", ProgramModule$1.toNavigable(function (location) {
  return parseHash(pageParser, location);
}, function (result, model) {
  return urlUpdate(result, model);
}, Program$1.withDebugger(ProgramModule.mkProgram(function (result_1) {
  return init(result_1);
}, function (msg, model_1) {
  return update(msg, model_1);
}, function (model_2, dispatch) {
  return root(model_2, dispatch);
}), {
  a: Option(Page),
  model: Model$2,
  msg: Msg$2,
  view: Interface("Fable.Import.React.ReactElement")
}))));

exports.options = options;
exports.menuItem = menuItem;
exports.menu = menu;
exports.header = header;
exports.root = root;

return exports;

}({}));
