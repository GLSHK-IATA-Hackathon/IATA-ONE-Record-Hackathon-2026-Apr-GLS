true              &&(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
}());

/**
* @vue/shared v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate$1 = (val) => toTypeString(val) === "[object Date]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$1(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return ((str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  });
};
const camelizeRE = /-\w/g;
const camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
  }
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
const def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props) return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length) return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b) return true;
  let aValidType = isDate$1(a);
  let bValidType = isDate$1(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray$1(a);
  bValidType = isArray$1(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject$1(a);
  bValidType = isObject$1(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
const isRef$1 = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (isRef$1(val)) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};

/**
* @vue/reactivity v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeEffectScope;
class EffectScope {
  // TODO isolatedDeclarations "__v_skip"
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this._on = 0;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this.__v_skip = true;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (activeEffectScope === this) {
        activeEffectScope = this.prevScope;
      } else {
        let current = activeEffectScope;
        while (current) {
          if (current.prevScope === this) {
            current.prevScope = this.prevScope;
            break;
          }
          current = current.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn, failSilently = false) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  }
}
let activeSub;
const pausedQueueEffects = /* @__PURE__ */ new WeakSet();
class ReactiveEffect {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
}
let batchDepth = 0;
let batchedSub;
let batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed2) {
  if (computed2.flags & 4 && !(computed2.flags & 16)) {
    return;
  }
  computed2.flags &= -17;
  if (computed2.globalVersion === globalVersion) {
    return;
  }
  computed2.globalVersion = globalVersion;
  if (!computed2.isSSR && computed2.flags & 128 && (!computed2.deps && !computed2._dirty || !isDirty(computed2))) {
    return;
  }
  computed2.flags |= 2;
  const dep = computed2.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed2;
  shouldTrack = true;
  try {
    prepareDeps(computed2);
    const value = computed2.fn(computed2._value);
    if (dep.version === 0 || hasChanged(value, computed2._value)) {
      computed2.flags |= 128;
      computed2._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed2);
    computed2.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
let globalVersion = 0;
class Link {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Dep {
  // TODO isolatedDeclarations "__v_skip"
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
    this.__v_skip = true;
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) ;
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed2 = link.dep.computed;
    if (computed2 && !link.dep.subs) {
      computed2.flags |= 4 | 16;
      for (let l = computed2.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    link.dep.subs = link;
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
const ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray$1(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function getDepFromReactive(object, key) {
  const depMap = targetMap.get(object);
  return depMap && depMap.get(key);
}
function reactiveReadArray(array) {
  const raw = /* @__PURE__ */ toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
function toWrapped(target, item) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
  }
  return toReactive(item);
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray$1(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toWrapped(this, value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(
      this,
      "filter",
      fn,
      thisArg,
      (v) => v.map((item) => toWrapped(this, item)),
      arguments
    );
  },
  find(fn, thisArg) {
    return apply(
      this,
      "find",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(
      this,
      "findLast",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", (item) => toWrapped(this, item));
  }
};
function iterator(self, method, wrapValue) {
  const arr = shallowReadArray(self);
  const iter = arr[method]();
  if (arr !== self && !/* @__PURE__ */ isShallow(self)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (!result.done) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self);
  const needsWrap = arr !== self && !/* @__PURE__ */ isShallow(self);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toWrapped(self, item), index, self);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self, method, fn, args) {
  const arr = shallowReadArray(self);
  const needsWrap = arr !== self && !/* @__PURE__ */ isShallow(self);
  let wrappedFn = fn;
  let wrapInitialAccumulator = false;
  if (arr !== self) {
    if (needsWrap) {
      wrapInitialAccumulator = args.length === 0;
      wrappedFn = function(acc, item, index) {
        if (wrapInitialAccumulator) {
          wrapInitialAccumulator = false;
          acc = toWrapped(self, acc);
        }
        return fn.call(this, acc, toWrapped(self, item), index, self);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self);
      };
    }
  }
  const result = arr[method](wrappedFn, ...args);
  return wrapInitialAccumulator ? toWrapped(self, result) : result;
}
function searchProxy(self, method, args) {
  const arr = /* @__PURE__ */ toRaw(self);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
    args[0] = /* @__PURE__ */ toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self, method, args = []) {
  pauseTracking();
  startBatch();
  const res = (/* @__PURE__ */ toRaw(self))[method].apply(self, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = /* @__PURE__ */ toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (/* @__PURE__ */ isRef(res)) {
      const value = targetIsArray && isIntegerKey(key) ? res : res.value;
      return isReadonly2 && isObject$1(value) ? /* @__PURE__ */ readonly(value) : value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const isArrayWithIntegerKey = isArray$1(target) && isIntegerKey(key);
    if (!this._isShallow) {
      const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
      if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
        oldValue = /* @__PURE__ */ toRaw(oldValue);
        value = /* @__PURE__ */ toRaw(value);
      }
      if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
        if (isOldValueReadonly) {
          return true;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (target === /* @__PURE__ */ toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$1(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = /* @__PURE__ */ toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return extend(
      // inheriting all iterator properties
      Object.create(innerIterator),
      {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        }
      }
    );
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
      return target.size;
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        const target = /* @__PURE__ */ toRaw(this);
        const proto = getProto(target);
        const rawValue = /* @__PURE__ */ toRaw(value);
        const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
        const hadKey = proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue);
        if (!hadKey) {
          target.add(valueToAdd);
          trigger(target, "add", valueToAdd, valueToAdd);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          value = /* @__PURE__ */ toRaw(value);
        }
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
        return this;
      },
      delete(key) {
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        }
        get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      },
      clear() {
        const target = /* @__PURE__ */ toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0);
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
// @__NO_SIDE_EFFECTS__
function reactive(target) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
// @__NO_SIDE_EFFECTS__
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
// @__NO_SIDE_EFFECTS__
function isReactive(value) {
  if (/* @__PURE__ */ isReadonly(value)) {
    return /* @__PURE__ */ isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
// @__NO_SIDE_EFFECTS__
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
// @__NO_SIDE_EFFECTS__
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
// @__NO_SIDE_EFFECTS__
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
// @__NO_SIDE_EFFECTS__
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$1(value) ? /* @__PURE__ */ reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? /* @__PURE__ */ readonly(value) : value;
// @__NO_SIDE_EFFECTS__
function isRef(r) {
  return r ? r["__v_isRef"] === true : false;
}
// @__NO_SIDE_EFFECTS__
function ref(value) {
  return createRef(value, false);
}
// @__NO_SIDE_EFFECTS__
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (/* @__PURE__ */ isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
    newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
function unref(ref2) {
  return /* @__PURE__ */ isRef(ref2) ? ref2.value : ref2;
}
function toValue$1(source) {
  return isFunction(source) ? source() : unref(source);
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (/* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return /* @__PURE__ */ isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ObjectRefImpl {
  constructor(_object, key, _defaultValue) {
    this._object = _object;
    this._defaultValue = _defaultValue;
    this["__v_isRef"] = true;
    this._value = void 0;
    this._key = isSymbol(key) ? key : String(key);
    this._raw = /* @__PURE__ */ toRaw(_object);
    let shallow = true;
    let obj = _object;
    if (!isArray$1(_object) || isSymbol(this._key) || !isIntegerKey(this._key)) {
      do {
        shallow = !/* @__PURE__ */ isProxy(obj) || /* @__PURE__ */ isShallow(obj);
      } while (shallow && (obj = obj["__v_raw"]));
    }
    this._shallow = shallow;
  }
  get value() {
    let val = this._object[this._key];
    if (this._shallow) {
      val = unref(val);
    }
    return this._value = val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    if (this._shallow && /* @__PURE__ */ isRef(this._raw[this._key])) {
      const nestedRef = this._object[this._key];
      if (/* @__PURE__ */ isRef(nestedRef)) {
        nestedRef.value = newVal;
        return;
      }
    }
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(this._raw, this._key);
  }
}
class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this["__v_isRef"] = true;
    this["__v_isReadonly"] = true;
    this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function toRef(source, key, defaultValue) {
  if (/* @__PURE__ */ isRef(source)) {
    return source;
  } else if (isFunction(source)) {
    return new GetterRefImpl(source);
  } else if (isObject$1(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return /* @__PURE__ */ ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  return new ObjectRefImpl(source, key, defaultValue);
}
class ComputedRefImpl {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    }
  }
  get value() {
    const link = this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    }
  }
}
// @__NO_SIDE_EFFECTS__
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  return cRef;
}
const INITIAL_WATCHER_VALUE = {};
const cleanupMap = /* @__PURE__ */ new WeakMap();
let activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  }
}
function watch$1(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (/* @__PURE__ */ isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (/* @__PURE__ */ isRef(source)) {
    getter = () => source.value;
    forceTrigger = /* @__PURE__ */ isShallow(source);
  } else if (/* @__PURE__ */ isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => /* @__PURE__ */ isReactive(s) || /* @__PURE__ */ isShallow(s));
    getter = () => source.map((s) => {
      if (/* @__PURE__ */ isRef(s)) {
        return s.value;
      } else if (/* @__PURE__ */ isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return call ? call(s, 2) : s();
      } else ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          oldValue = newValue;
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Map();
  if ((seen.get(value) || 0) >= depth) {
    return value;
  }
  seen.set(value, depth);
  depth--;
  if (/* @__PURE__ */ isRef(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}

/**
* @vue/runtime-core v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack = [];
let isWarning = false;
function warn$1(msg, ...args) {
  if (isWarning) return;
  isWarning = true;
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
  isWarning = false;
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray$1(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
const queue = [];
let flushIndex = -1;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex$1(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex$1(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false) ;
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs();
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    return vnode;
  }
  const instance = getComponentPublicInstance(currentRenderingInstance);
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function provide(key, value) {
  if (currentInstance) {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = getCurrentInstance();
  if (instance || currentApp) {
    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else ;
  }
}
const ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  const baseWatchOptions = extend({}, options);
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch$1(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
const pendingMounts = /* @__PURE__ */ new WeakMap();
const TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if (isString(targetSelector)) {
    if (!select) {
      return null;
    } else {
      const target = select(targetSelector);
      return target;
    }
  } else {
    return targetSelector;
  }
};
const TeleportImpl = {
  name: "Teleport",
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment, parentNode }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { dynamicChildren } = n2;
    const mount = (vnode, container2, anchor2) => {
      if (vnode.shapeFlag & 16) {
        mountChildren(
          vnode.children,
          container2,
          anchor2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    };
    const mountToTarget = (vnode = n2) => {
      const disabled2 = isTeleportDisabled(vnode.props);
      const target = vnode.target = resolveTarget(vnode.props, querySelector);
      const targetAnchor = prepareAnchor(target, vnode, createText, insert);
      if (target) {
        if (namespace !== "svg" && isTargetSVG(target)) {
          namespace = "svg";
        } else if (namespace !== "mathml" && isTargetMathML(target)) {
          namespace = "mathml";
        }
        if (parentComponent && parentComponent.isCE) {
          (parentComponent.ce._teleportTargets || (parentComponent.ce._teleportTargets = /* @__PURE__ */ new Set())).add(target);
        }
        if (!disabled2) {
          mount(vnode, target, targetAnchor);
          updateCssVars(vnode, false);
        }
      }
    };
    const queuePendingMount = (vnode) => {
      const mountJob = () => {
        if (pendingMounts.get(vnode) !== mountJob) return;
        pendingMounts.delete(vnode);
        if (isTeleportDisabled(vnode.props)) {
          const mountContainer = parentNode(vnode.el) || container;
          mount(vnode, mountContainer, vnode.anchor);
          updateCssVars(vnode, true);
        }
        mountToTarget(vnode);
      };
      pendingMounts.set(vnode, mountJob);
      queuePostRenderEffect(mountJob, parentSuspense);
    };
    if (n1 == null) {
      const placeholder = n2.el = createText("");
      const mainAnchor = n2.anchor = createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      if (isTeleportDeferred(n2.props) || parentSuspense && parentSuspense.pendingBranch) {
        queuePendingMount(n2);
        return;
      }
      if (disabled) {
        mount(n2, container, mainAnchor);
        updateCssVars(n2, true);
      }
      mountToTarget();
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const pendingMount = pendingMounts.get(n1);
      if (pendingMount) {
        pendingMount.flags |= 8;
        pendingMounts.delete(n1);
        queuePendingMount(n2);
        return;
      }
      n2.targetStart = n1.targetStart;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      if (namespace === "svg" || isTargetSVG(target)) {
        namespace = "svg";
      } else if (namespace === "mathml" || isTargetMathML(target)) {
        namespace = "mathml";
      }
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          false
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            1
          );
        } else {
          if (n2.props && n1.props && n2.props.to !== n1.props.to) {
            n2.props.to = n1.props.to;
          }
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(
            n2.props,
            querySelector
          );
          if (nextTarget) {
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              0
            );
          }
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target,
            targetAnchor,
            internals,
            1
          );
        }
      }
      updateCssVars(n2, disabled);
    }
  },
  remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const {
      shapeFlag,
      children,
      anchor,
      targetStart,
      targetAnchor,
      target,
      props
    } = vnode;
    let shouldRemove = doRemove || !isTeleportDisabled(props);
    const pendingMount = pendingMounts.get(vnode);
    if (pendingMount) {
      pendingMount.flags |= 8;
      pendingMounts.delete(vnode);
      shouldRemove = false;
    }
    if (target) {
      hostRemove(targetStart);
      hostRemove(targetAnchor);
    }
    doRemove && hostRemove(anchor);
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        unmount(
          child,
          parentComponent,
          parentSuspense,
          shouldRemove,
          !!child.dynamicChildren
        );
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!pendingMounts.has(vnode) && (!isReorder || isTeleportDisabled(props))) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(
          children[i],
          container,
          parentAnchor,
          2
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
  o: { nextSibling, parentNode, querySelector, insert, createText }
}, hydrateChildren) {
  function hydrateAnchor(target2, targetNode) {
    let targetAnchor = targetNode;
    while (targetAnchor) {
      if (targetAnchor && targetAnchor.nodeType === 8) {
        if (targetAnchor.data === "teleport start anchor") {
          vnode.targetStart = targetAnchor;
        } else if (targetAnchor.data === "teleport anchor") {
          vnode.targetAnchor = targetAnchor;
          target2._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
          break;
        }
      }
      targetAnchor = nextSibling(targetAnchor);
    }
  }
  function hydrateDisabledTeleport(node2, vnode2) {
    vnode2.anchor = hydrateChildren(
      nextSibling(node2),
      vnode2,
      parentNode(node2),
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
  }
  const target = vnode.target = resolveTarget(
    vnode.props,
    querySelector
  );
  const disabled = isTeleportDisabled(vnode.props);
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (disabled) {
        hydrateDisabledTeleport(node, vnode);
        hydrateAnchor(target, targetNode);
        if (!vnode.targetAnchor) {
          prepareAnchor(
            target,
            vnode,
            createText,
            insert,
            // if target is the same as the main view, insert anchors before current node
            // to avoid hydrating mismatch
            parentNode(node) === target ? node : null
          );
        }
      } else {
        vnode.anchor = nextSibling(node);
        hydrateAnchor(target, targetNode);
        if (!vnode.targetAnchor) {
          prepareAnchor(target, vnode, createText, insert);
        }
        hydrateChildren(
          targetNode && nextSibling(targetNode),
          vnode,
          target,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      }
    }
    updateCssVars(vnode, disabled);
  } else if (disabled) {
    if (vnode.shapeFlag & 16) {
      hydrateDisabledTeleport(node, vnode);
      vnode.targetStart = node;
      vnode.targetAnchor = nextSibling(node);
    }
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode, isDisabled) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node, anchor;
    if (isDisabled) {
      node = vnode.el;
      anchor = vnode.anchor;
    } else {
      node = vnode.targetStart;
      anchor = vnode.targetAnchor;
    }
    while (node && node !== anchor) {
      if (node.nodeType === 1) node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
function prepareAnchor(target, vnode, createText, insert, anchor = null) {
  const targetStart = vnode.targetStart = createText("");
  const targetAnchor = vnode.targetAnchor = createText("");
  targetStart[TeleportEndKey] = targetAnchor;
  if (target) {
    insert(targetStart, target, anchor);
    insert(targetAnchor, target, anchor);
  }
  return targetAnchor;
}
const leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
const enterCbKey = /* @__PURE__ */ Symbol("_enterCb");
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
const recursiveGetSubtree = (instance) => {
  const subTree = instance.subTree;
  return subTree.component ? recursiveGetSubtree(subTree.component) : subTree;
};
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      const child = children && children.length ? findNonCommentChild(children) : (
        // Keep explicit default-slot conditionals on the same transition path
        // as regular v-if branches, which render a comment placeholder.
        instance.subTree ? createCommentVNode() : void 0
      );
      if (!child) {
        return;
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getInnerChild$1(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      let enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance,
        // #11061, ensure enterHooks is fresh after clone
        (hooks) => enterHooks = hooks
      );
      if (innerChild.type !== Comment) {
        setTransitionHooks(innerChild, enterHooks);
      }
      let oldInnerChild = instance.subTree && getInnerChild$1(instance.subTree);
      if (oldInnerChild && oldInnerChild.type !== Comment && !isSameVNodeType(oldInnerChild, innerChild) && recursiveGetSubtree(instance).type !== Comment) {
        let leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in" && innerChild.type !== Comment) {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (!(instance.job.flags & 8)) {
              instance.update();
            }
            delete leavingHooks.afterLeave;
            oldInnerChild = void 0;
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el[leaveCbKey] = () => {
              earlyRemove();
              el[leaveCbKey] = void 0;
              delete enterHooks.delayedLeave;
              oldInnerChild = void 0;
            };
            enterHooks.delayedLeave = () => {
              delayedLeave();
              delete enterHooks.delayedLeave;
              oldInnerChild = void 0;
            };
          };
        } else {
          oldInnerChild = void 0;
        }
      } else if (oldInnerChild) {
        oldInnerChild = void 0;
      }
      return child;
    };
  }
};
function findNonCommentChild(children) {
  let child = children[0];
  if (children.length > 1) {
    for (const c of children) {
      if (c.type !== Comment) {
        child = c;
        break;
      }
    }
  }
  return child;
}
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance, postClone) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$1(hook)) {
      if (hook.every((hook2) => hook2.length <= 1)) done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el[leaveCbKey]) {
        el[leaveCbKey](
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
        leavingVNode.el[leaveCbKey]();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      if (leavingVNodesCache[key] === vnode) return;
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      el[enterCbKey] = (cancelled) => {
        if (called) return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey] = void 0;
      };
      const done = el[enterCbKey].bind(null, false);
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el[enterCbKey]) {
        el[enterCbKey](
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      el[leaveCbKey] = (cancelled) => {
        if (called) return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el[leaveCbKey] = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      const done = el[leaveCbKey].bind(null, false);
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      const hooks2 = resolveTransitionHooks(
        vnode2,
        props,
        state,
        instance,
        postClone
      );
      if (postClone) postClone(hooks2);
      return hooks2;
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getInnerChild$1(vnode) {
  if (!isKeepAlive(vnode)) {
    if (isTeleport(vnode.type) && vnode.children) {
      return findNonCommentChild(vnode.children);
    }
    return vnode;
  }
  if (vnode.component) {
    return vnode.component.subTree;
  }
  const { shapeFlag, children } = vnode;
  if (children) {
    if (shapeFlag & 16) {
      return children[0];
    }
    if (shapeFlag & 32 && isFunction(children.default)) {
      return children.default();
    }
  }
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128) keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
function useTemplateRef(key) {
  const i = getCurrentInstance();
  const r = shallowRef(null);
  if (i) {
    const refs = i.refs === EMPTY_OBJ ? i.refs = {} : i.refs;
    {
      Object.defineProperty(refs, key, {
        enumerable: true,
        get: () => r.value,
        set: (val) => r.value = val
      });
    }
  }
  const ret = r;
  return ret;
}
function isTemplateRefKey(refs, key) {
  let desc;
  return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
}
const pendingSetRefMap = /* @__PURE__ */ new WeakMap();
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref3 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
    if (isTemplateRefKey(refs, key)) {
      return false;
    }
    return hasOwn(rawSetupState, key);
  };
  const canSetRef = (ref22, key) => {
    if (key && isTemplateRefKey(refs, key)) {
      return false;
    }
    return true;
  };
  if (oldRef != null && oldRef !== ref3) {
    invalidatePendingSetRef(oldRawRef);
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      const oldRawRefAtom = oldRawRef;
      if (canSetRef(oldRef, oldRawRefAtom.k)) {
        oldRef.value = null;
      }
      if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
    }
  }
  if (isFunction(ref3)) {
    callWithErrorHandling(ref3, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref3);
    const _isRef = isRef(ref3);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref3) ? setupState[ref3] : refs[ref3] : canSetRef() || !rawRef.k ? ref3.value : refs[rawRef.k];
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref3] = [refValue];
                if (canSetSetupRef(ref3)) {
                  setupState[ref3] = refs[ref3];
                }
              } else {
                const newVal = [refValue];
                if (canSetRef(ref3, rawRef.k)) {
                  ref3.value = newVal;
                }
                if (rawRef.k) refs[rawRef.k] = newVal;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref3] = value;
          if (canSetSetupRef(ref3)) {
            setupState[ref3] = value;
          }
        } else if (_isRef) {
          if (canSetRef(ref3, rawRef.k)) {
            ref3.value = value;
          }
          if (rawRef.k) refs[rawRef.k] = value;
        } else ;
      };
      if (value) {
        const job = () => {
          doSet();
          pendingSetRefMap.delete(rawRef);
        };
        job.id = -1;
        pendingSetRefMap.set(rawRef, job);
        queuePostRenderEffect(job, parentSuspense);
      } else {
        invalidatePendingSetRef(rawRef);
        doSet();
      }
    }
  }
}
function invalidatePendingSetRef(rawRef) {
  const pendingSetRef = pendingSetRefMap.get(rawRef);
  if (pendingSetRef) {
    pendingSetRef.flags |= 8;
    pendingSetRefMap.delete(rawRef);
  }
}
getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook(
  "bu"
);
const onUpdated = createHook("u");
const onBeforeUnmount = createHook(
  "bum"
);
const onUnmounted = createHook("um");
const onServerPrefetch = createHook(
  "sp"
);
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if (isString(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache;
  const sourceIsArray = isArray$1(source);
  if (sourceIsArray || isString(source)) {
    const sourceIsReactiveArray = sourceIsArray && isReactive(source);
    let needsWrap = false;
    let isReadonlySource = false;
    if (sourceIsReactiveArray) {
      needsWrap = !isShallow(source);
      isReadonlySource = isReadonly(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i],
        i,
        void 0,
        cached
      );
    }
  } else if (typeof source === "number") {
    {
      ret = new Array(source);
      for (let i = 0; i < source; i++) {
        ret[i] = renderItem(i + 1, i, void 0, cached);
      }
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached)
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function createSlots(slots, dynamicSlots) {
  for (let i = 0; i < dynamicSlots.length; i++) {
    const slot = dynamicSlots[i];
    if (isArray$1(slot)) {
      for (let j = 0; j < slot.length; j++) {
        slots[slot[j].name] = slot[j].fn;
      }
    } else if (slot) {
      slots[slot.name] = slot.key ? (...args) => {
        const res = slot.fn(...args);
        if (res) res.key = slot.key;
        return res;
      } : slot.fn;
    }
  }
  return slots;
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
    const hasProps = Object.keys(props).length > 0;
    if (name !== "default") props.name = name;
    return openBlock(), createBlock(
      Fragment,
      null,
      [createVNode("slot", props, fallback && fallback())],
      hasProps ? -2 : 64
    );
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const slotKey = props.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  validSlotContent && validSlotContent.key;
  const rendered = createBlock(
    Fragment,
    {
      key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name}`) + // #7256 force differentiate fallback content from actual content
      (!validSlotContent && fallback ? "_fb" : "")
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child)) return true;
    if (child.type === Comment) return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => i.props,
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots,
    $refs: (i) => i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i) ,
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i) 
  })
);
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (hasOwn(props, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, props, type }
  }, key) {
    let cssModules;
    return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
function useSlots() {
  return getContext().slots;
}
function getContext(calledFunctionName) {
  const i = getCurrentInstance();
  return i.setupContext || (i.setupContext = createSetupContext(i));
}
function normalizePropsOrEmits(props) {
  return isArray$1(props) ? props.reduce(
    (normalized, p) => (normalized[p] = null, normalized),
    {}
  ) : props;
}
function mergeDefaults(raw, defaults) {
  const props = normalizePropsOrEmits(raw);
  for (const key in defaults) {
    if (key.startsWith("__skip")) continue;
    let opt = props[key];
    if (opt) {
      if (isArray$1(opt) || isFunction(opt)) {
        opt = props[key] = { type: opt, default: defaults[key] };
      } else {
        opt.default = defaults[key];
      }
    } else if (opt === null) {
      opt = props[key] = { default: defaults[key] };
    } else ;
    if (opt && defaults[`__skip_${key}`]) {
      opt.skipFactory = true;
    }
  }
  return props;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$1(data)) ; else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val,
          enumerable: true
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      {
        watch(getter, handler);
      }
    }
  } else if (isFunction(raw)) {
    {
      watch(getter, raw.bind(publicThis));
    }
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else ;
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions$1(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions$1(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions$1(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") ; else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) ; else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else ;
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          return getComponentPublicInstance(vnode.component);
        }
      },
      onUnmount(cleanupFn) {
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app._instance,
            16
          );
          render(null, app._container);
          delete app._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
const getModelModifiers = (props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
const mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false) ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          false ? shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render2(
          false ? shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    setTransitionHooks(root, vnode.transition);
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function hasPropValueChanged(nextProps, prevProps, key) {
  const nextProp = nextProps[key];
  const prevProp = prevProps[key];
  if (key === "style" && isObject$1(nextProp) && isObject$1(prevProp)) {
    return !looseEqual(nextProp, prevProp);
  }
  return nextProp !== prevProp;
}
function updateHOCHostEl({ vnode, parent, suspense }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.suspense.vnode.el = root.el = el;
      vnode = root;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
  if (suspense && suspense.activeBranch === vnode) {
    suspense.vnode.el = el;
  }
}
const internalObjectProto = {};
const createInternalObject = () => Object.create(internalObjectProto);
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
const mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray$1(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  }
  return false;
}
const isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || !isInternalKey(key)) {
      slots[key] = children[key];
    }
  }
};
const initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target = getGlobalThis();
  target.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref3, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else ;
    }
    if (ref3 != null && parentComponent) {
      setRef(ref3, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    } else if (ref3 == null && n1 && n1.ref != null) {
      setRef(n1.ref, null, parentSuspense, n1, true);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
      try {
        if (customElement) {
          customElement._beginPatch();
        }
        patchElement(
          n1,
          n2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } finally {
        if (customElement) {
          customElement._endPatch();
        }
      }
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        try {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        } finally {
        }
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance, false, optimized);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
        initialVNode.placeholder = placeholder.el;
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        {
          if (root.ce && root.ce._hasShadowRoot()) {
            root.ce._injectChildStyle(
              type,
              instance.parent ? instance.parent.type : void 0
            );
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              queuePostRenderEffect(() => {
                if (!instance.isUnmounted) update();
              }, parentSuspense);
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    instance.scope.on();
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect2.run.bind(effect2);
    const job = instance.job = effect2.runIfDirty.bind(effect2);
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchorVNode = c2[nextIndex + 1];
        const anchor = nextIndex + 1 < l2 ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode)
        ) : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => {
          if (vnode.ctx.isUnmounted) {
            hostRemove(el);
          } else {
            hostInsert(el, container, anchor);
          }
        };
        const performLeave = () => {
          if (el._isLeaving) {
            el[leaveCbKey](
              true
              /* cancelled */
            );
          }
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref3,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex,
      memo
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref3 != null) {
      pauseTracking();
      setRef(ref3, null, parentSuspense, vnode, true);
      resetTracking();
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    const shouldInvalidateMemo = memo != null && cacheIndex == null;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs || shouldInvalidateMemo) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
        if (shouldInvalidateMemo) {
          vnode.el = null;
        }
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, job, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing = false;
  const render = (vnode, container, namespace) => {
    let instance;
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
        instance = container._vnode.component;
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs(instance);
      flushPostFlushCbs();
      isFlushing = false;
    }
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  return {
    render,
    hydrate,
    createApp: createAppAPI(render)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= -33;
    job.flags &= -5;
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        if (c2.patchFlag === -1) {
          c2 = ch2[i] = cloneIfMounted(c2);
        }
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 8;
  }
}
function resolveAsyncComponentPlaceholder(anchorVnode) {
  if (anchorVnode.placeholder) {
    return anchorVnode.placeholder;
  }
  const instance = anchorVnode.component;
  if (instance) {
    return resolveAsyncComponentPlaceholder(instance.subTree);
  }
  return null;
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
const Text = /* @__PURE__ */ Symbol.for("v-txt");
const Comment = /* @__PURE__ */ Symbol.for("v-cmt");
const Static = /* @__PURE__ */ Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString(ref3) || isRef(ref3) || isFunction(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray$1(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    placeholder: vnode.placeholder,
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (isVNode(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        } else if (incoming == null && existing == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !isModelListener(key)) {
          ret[key] = incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized || isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult);
    }
  } else {
    finishComponentSetup(instance);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else ;
  finishComponentSetup(instance);
}
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    instance.render = Component.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
}
const attrsProxyHandlers = {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
const classifyRE = /(?:^|[-_])\w/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(
      instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  const c = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  return c;
};
function h(type, propsOrChildren, children) {
  try {
    setBlockTracking(-1);
    const l = arguments.length;
    if (l === 2) {
      if (isObject$1(propsOrChildren) && !isArray$1(propsOrChildren)) {
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        return createVNode(type, propsOrChildren);
      } else {
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  } finally {
    setBlockTracking(1);
  }
}
const version = "3.5.33";

/**
* @vue/runtime-dom v3.5.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy = void 0;
const tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
const unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
const svgNS = "http://www.w3.org/2000/svg";
const mathmlNS = "http://www.w3.org/1998/Math/MathML";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
const TRANSITION = "transition";
const ANIMATION = "animation";
const vtcKey = /* @__PURE__ */ Symbol("_vtc");
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = /* @__PURE__ */ extend(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
const decorate$1 = (t) => {
  t.displayName = "Transition";
  t.props = TransitionPropsValidators;
  return t;
};
const Transition = /* @__PURE__ */ decorate$1(
  (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots)
);
const callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done, isCancelled) => {
    el._enterCancelled = isCancelled;
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      if (!el._enterCancelled) {
        forceReflow(el);
        addTransitionClass(el, leaveActiveClass);
      } else {
        addTransitionClass(el, leaveActiveClass);
        forceReflow(el);
      }
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve);
        }
      });
      callHook(onLeave, [el, resolve]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false, void 0, true);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true, void 0, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject$1(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el[vtcKey] = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve();
    }
  };
  if (explicitTimeout != null) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(?:transform|all)(?:,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  if (s === "auto") return 0;
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow(el) {
  const targetDocument = el ? el.ownerDocument : document;
  return targetDocument.body.offsetHeight;
}
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
const vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
const vShowHidden = /* @__PURE__ */ Symbol("_vsh");
const vShow = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : "none";
  el[vShowHidden] = !value;
}
const CSS_VAR_TEXT = /* @__PURE__ */ Symbol("");
const displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      const value = next[key];
      if (value != null) {
        if (!shouldPreserveTextareaResizeStyle(
          el,
          key,
          !isString(prev) && prev ? prev[key] : void 0,
          value
        )) {
          setStyle(style, key, value);
        }
      } else {
        setStyle(style, key, "");
      }
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
function shouldPreserveTextareaResizeStyle(el, key, prev, next) {
  return el.tagName === "TEXTAREA" && (key === "width" || key === "height") && isString(next) && prev === next;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
const isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
const patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && // #12408 check if it's declared prop or it's async custom element
    (shouldSetAsPropForVueCE(el, key) || // @ts-expect-error _def is private
    el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(nextValue)))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
    return false;
  }
  if (key === "sandbox" && el.tagName === "IFRAME") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
function shouldSetAsPropForVueCE(el, key) {
  const props = (
    // @ts-expect-error _def is private
    el._def.props
  );
  if (!props) {
    return false;
  }
  const camelKey = camelize(key);
  return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
}
const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return isArray$1(fn) ? (value) => invokeArrayFns(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const assignKey = /* @__PURE__ */ Symbol("_assign");
function castValue(value, trim, number) {
  if (trim) value = value.trim();
  if (number) value = looseToNumber(value);
  return value;
}
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing) return;
      el[assignKey](castValue(el.value, trim, castToNumber));
    });
    if (trim || castToNumber) {
      addEventListener(el, "change", () => {
        el.value = castValue(el.value, trim, castToNumber);
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing) return;
    const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
    const newValue = value == null ? "" : value;
    if (elValue === newValue) {
      return;
    }
    const rootNode = el.getRootNode();
    if ((rootNode instanceof Document || rootNode instanceof ShadowRoot) && rootNode.activeElement === el && el.type !== "range") {
      if (lazy && value === oldValue) {
        return;
      }
      if (trim && el.value.trim() === newValue) {
        return;
      }
    }
    el.value = newValue;
  }
};
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  if (!fn) return fn;
  const cache = fn._withMods || (fn._withMods = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = ((event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers)) return;
    }
    return fn(event, ...args);
  }));
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  const cache = fn._withKeys || (fn._withKeys = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = ((event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some(
      (k) => k === eventKey || keyNames[k] === eventKey
    )) {
      return fn(event);
    }
  }));
};
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
});
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$8 = {  };

function _sfc_render$1(_ctx, _cache) {
  const _component_router_view = resolveComponent("router-view");

  return (openBlock(), createBlock(_component_router_view))
}
const App = /*#__PURE__*/_export_sfc(_sfc_main$8, [['render',_sfc_render$1]]);

/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const isBrowser = typeof document !== "undefined";
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop$1 = () => {
};
const isArray = Array.isArray;
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  return options;
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return text == null ? "" : encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  if (text == null) return null;
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery$1, location, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location.indexOf("#");
  let searchPos = location.indexOf("?");
  searchPos = hashPos >= 0 && searchPos > hashPos ? -1 : searchPos;
  if (searchPos >= 0) {
    path = location.slice(0, searchPos);
    searchString = location.slice(searchPos, hashPos > 0 ? hashPos : location.length);
    query = parseQuery$1(searchString.slice(1));
  }
  if (hashPos >= 0) {
    path = path || location.slice(0, hashPos);
    hash = location.slice(hashPos, location.length);
  }
  path = resolveRelativePath(path != null ? path : location, currentLocation);
  return {
    fullPath: path + searchString + hash,
    path,
    query,
    hash: decode(hash)
  };
}
function stringifyURL(stringifyQuery$1, location) {
  const query = location.query ? stringifyQuery$1(location.query) : "";
  return location.path + (query && "?") + query + (location.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase())) return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery$1, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery$1(a.query) === stringifyQuery$1(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (var key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : a?.valueOf() === b?.valueOf();
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/")) return to;
  if (!to) return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") toSegments.push("");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".") continue;
    if (segment === "..") {
      if (position > 1) position--;
    } else break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
let NavigationType = /* @__PURE__ */ (function(NavigationType$1) {
  NavigationType$1["pop"] = "pop";
  NavigationType$1["push"] = "push";
  return NavigationType$1;
})({});
let NavigationDirection = /* @__PURE__ */ (function(NavigationDirection$1) {
  NavigationDirection$1["back"] = "back";
  NavigationDirection$1["forward"] = "forward";
  NavigationDirection$1["unknown"] = "";
  return NavigationDirection$1;
})({});
function normalizeBase(base) {
  if (!base) if (isBrowser) {
    const baseEl = document.querySelector("base");
    base = baseEl && baseEl.getAttribute("href") || "/";
    base = base.replace(/^\w+:\/\/[^\/]+/, "");
  } else base = "/";
  if (base[0] !== "/" && base[0] !== "#") base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location) {
  return base.replace(BEFORE_HASH_RE, "#") + location;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else scrollToOptions = position;
  if ("scrollBehavior" in document.documentElement.style) window.scrollTo(scrollToOptions);
  else window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
}
function getScrollKey(path, delta) {
  return (history.state ? history.state.position - delta : -1) + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
let ErrorTypes = /* @__PURE__ */ (function(ErrorTypes$1) {
  ErrorTypes$1[ErrorTypes$1["MATCHER_NOT_FOUND"] = 1] = "MATCHER_NOT_FOUND";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_GUARD_REDIRECT"] = 2] = "NAVIGATION_GUARD_REDIRECT";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_ABORTED"] = 4] = "NAVIGATION_ABORTED";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_CANCELLED"] = 8] = "NAVIGATION_CANCELLED";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_DUPLICATED"] = 16] = "NAVIGATION_DUPLICATED";
  return ErrorTypes$1;
})({});
const NavigationFailureSymbol = Symbol("");
({
  [ErrorTypes.MATCHER_NOT_FOUND]({ location, currentLocation }) {
    return `No match for
 ${JSON.stringify(location)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [ErrorTypes.NAVIGATION_GUARD_REDIRECT]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_ABORTED]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_CANCELLED]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [ErrorTypes.NAVIGATION_DUPLICATED]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
});
function createRouterError(type, params) {
  return assign(/* @__PURE__ */ new Error(), {
    type,
    [NavigationFailureSymbol]: true
  }, params);
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const propertiesToLog = [
  "params",
  "query",
  "hash"
];
function stringifyRoute(to) {
  if (typeof to === "string") return to;
  if (to.path != null) return to.path;
  const location = {};
  for (const key of propertiesToLog) if (key in to) location[key] = to[key];
  return JSON.stringify(location, null, 2);
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?") return query;
  const searchParams = (search[0] === "?" ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) currentValue = query[key] = [currentValue];
      currentValue.push(value);
    } else query[key] = value;
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) search += (search.length ? "&" : "") + key;
      continue;
    }
    (isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)]).forEach((value$1) => {
      if (value$1 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value$1 != null) search += "=" + value$1;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("");
const viewDepthKey = Symbol("");
const routerKey = Symbol("");
const routeLocationKey = Symbol("");
const routerViewLocationKey = Symbol("");
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1) handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers.slice(),
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve, reject) => {
    const next = (valid) => {
      if (valid === false) reject(createRouterError(ErrorTypes.NAVIGATION_ABORTED, {
        from,
        to
      }));
      else if (valid instanceof Error) reject(valid);
      else if (isRouteLocation(valid)) reject(createRouterError(ErrorTypes.NAVIGATION_GUARD_REDIRECT, {
        from: to,
        to: valid
      }));
      else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") enterCallbackArray.push(valid);
        resolve();
      }
    };
    const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, next));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3) guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name]) continue;
      if (isRouteComponent(rawComponent)) {
        const guard = (rawComponent.__vccOpts || rawComponent)[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.mods[name] = resolved;
          record.components[name] = resolvedComponent;
          const guard = (resolvedComponent.__vccOpts || resolvedComponent)[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
        }));
      }
    }
  }
  return guards;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) if (to.matched.find((record) => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);
    else leavingRecords.push(recordFrom);
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) enteringRecords.push(recordTo);
    }
  }
  return [
    leavingRecords,
    updatingRecords,
    enteringRecords
  ];
}

/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location$1) {
  const { pathname, search, hash } = location$1;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/") pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  return stripBase(pathname, base) + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else replace(to);
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    if (document.visibilityState === "hidden") {
      const { history: history$1 } = window;
      if (!history$1.state) return;
      history$1.replaceState(assign({}, history$1.state, { scroll: computeScrollPosition() }), "");
    }
  }
  function destroy() {
    for (const teardown of teardowns) teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("pagehide", beforeUnloadListener);
    document.removeEventListener("visibilitychange", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("pagehide", beforeUnloadListener);
  document.addEventListener("visibilitychange", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history$1, location: location$1 } = window;
  const currentLocation = { value: createCurrentLocation(base, location$1) };
  const historyState = { value: history$1.state };
  if (!historyState.value) changeLocation(currentLocation.value, {
    back: null,
    current: currentLocation.value,
    forward: null,
    position: history$1.length - 1,
    replaced: true,
    scroll: null
  }, true);
  function changeLocation(to, state, replace$1) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location$1.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history$1[replace$1 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      console.error(err);
      location$1[replace$1 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    changeLocation(to, assign({}, history$1.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position }), true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign({}, historyState.value, history$1.state, {
      forward: to,
      scroll: computeScrollPosition()
    });
    changeLocation(currentState.current, currentState, true);
    changeLocation(to, assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data), false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners) historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
let TokenType = /* @__PURE__ */ (function(TokenType$1) {
  TokenType$1[TokenType$1["Static"] = 0] = "Static";
  TokenType$1[TokenType$1["Param"] = 1] = "Param";
  TokenType$1[TokenType$1["Group"] = 2] = "Group";
  return TokenType$1;
})({});
var TokenizerState = /* @__PURE__ */ (function(TokenizerState$1) {
  TokenizerState$1[TokenizerState$1["Static"] = 0] = "Static";
  TokenizerState$1[TokenizerState$1["Param"] = 1] = "Param";
  TokenizerState$1[TokenizerState$1["ParamRegExp"] = 2] = "ParamRegExp";
  TokenizerState$1[TokenizerState$1["ParamRegExpEnd"] = 3] = "ParamRegExpEnd";
  TokenizerState$1[TokenizerState$1["EscapeNext"] = 4] = "EscapeNext";
  return TokenizerState$1;
})(TokenizerState || {});
const ROOT_TOKEN = {
  type: TokenType.Static,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path) return [[]];
  if (path === "/") return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) throw new Error(`Invalid path "${path}"`);
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = TokenizerState.Static;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment) tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer) return;
    if (state === TokenizerState.Static) segment.push({
      type: TokenType.Static,
      value: buffer
    });
    else if (state === TokenizerState.Param || state === TokenizerState.ParamRegExp || state === TokenizerState.ParamRegExpEnd) {
      if (segment.length > 1 && (char === "*" || char === "+")) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: TokenType.Param,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else crash("Invalid state to consume buffer");
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== TokenizerState.ParamRegExp) {
      previousState = state;
      state = TokenizerState.EscapeNext;
      continue;
    }
    switch (state) {
      case TokenizerState.Static:
        if (char === "/") {
          if (buffer) consumeBuffer();
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = TokenizerState.Param;
        } else addCharToBuffer();
        break;
      case TokenizerState.EscapeNext:
        addCharToBuffer();
        state = previousState;
        break;
      case TokenizerState.Param:
        if (char === "(") state = TokenizerState.ParamRegExp;
        else if (VALID_PARAM_RE.test(char)) addCharToBuffer();
        else {
          consumeBuffer();
          state = TokenizerState.Static;
          if (char !== "*" && char !== "?" && char !== "+") i--;
        }
        break;
      case TokenizerState.ParamRegExp:
        if (char === ")") if (customRe[customRe.length - 1] == "\\") customRe = customRe.slice(0, -1) + char;
        else state = TokenizerState.ParamRegExpEnd;
        else customRe += char;
        break;
      case TokenizerState.ParamRegExpEnd:
        consumeBuffer();
        state = TokenizerState.Static;
        if (char !== "*" && char !== "?" && char !== "+") i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === TokenizerState.ParamRegExp) crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
var PathScore = /* @__PURE__ */ (function(PathScore$1) {
  PathScore$1[PathScore$1["_multiplier"] = 10] = "_multiplier";
  PathScore$1[PathScore$1["Root"] = 90] = "Root";
  PathScore$1[PathScore$1["Segment"] = 40] = "Segment";
  PathScore$1[PathScore$1["SubSegment"] = 30] = "SubSegment";
  PathScore$1[PathScore$1["Static"] = 40] = "Static";
  PathScore$1[PathScore$1["Dynamic"] = 20] = "Dynamic";
  PathScore$1[PathScore$1["BonusCustomRegExp"] = 10] = "BonusCustomRegExp";
  PathScore$1[PathScore$1["BonusWildcard"] = -50] = "BonusWildcard";
  PathScore$1[PathScore$1["BonusRepeatable"] = -20] = "BonusRepeatable";
  PathScore$1[PathScore$1["BonusOptional"] = -8] = "BonusOptional";
  PathScore$1[PathScore$1["BonusStrict"] = 0.7000000000000001] = "BonusStrict";
  PathScore$1[PathScore$1["BonusCaseSensitive"] = 0.25] = "BonusCaseSensitive";
  return PathScore$1;
})(PathScore || {});
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [PathScore.Root];
    if (options.strict && !segment.length) pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = PathScore.Segment + (options.sensitive ? PathScore.BonusCaseSensitive : 0);
      if (token.type === TokenType.Static) {
        if (!tokenIndex) pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += PathScore.Static;
      } else if (token.type === TokenType.Param) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re$1 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re$1 !== BASE_PARAM_PATTERN) {
          subSegmentScore += PathScore.BonusCustomRegExp;
          try {
            `${re$1}`;
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re$1}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re$1})(?:/(?:${re$1}))*)` : `(${re$1})`;
        if (!tokenIndex) subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional) subPattern += "?";
        pattern += subPattern;
        subSegmentScore += PathScore.Dynamic;
        if (optional) subSegmentScore += PathScore.BonusOptional;
        if (repeatable) subSegmentScore += PathScore.BonusRepeatable;
        if (re$1 === ".*") subSegmentScore += PathScore.BonusWildcard;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += PathScore.BonusStrict;
  }
  if (!options.strict) pattern += "/?";
  if (options.end) pattern += "$";
  else if (options.strict && !pattern.endsWith("/")) pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match) return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/")) path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) if (token.type === TokenType.Static) path += token.value;
      else if (token.type === TokenType.Param) {
        const { value, repeatable, optional } = token;
        const param = value in params ? params[value] : "";
        if (isArray(param) && !repeatable) throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
        const text = isArray(param) ? param.join("/") : param;
        if (!text) if (optional) {
          if (segment.length < 2) if (path.endsWith("/")) path = path.slice(0, -1);
          else avoidDuplicatedSlash = true;
        } else throw new Error(`Missing required param "${value}"`);
        path += text;
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff) return diff;
    i++;
  }
  if (a.length < b.length) return a.length === 1 && a[0] === PathScore.Static + PathScore.Segment ? -1 : 1;
  else if (a.length > b.length) return b.length === 1 && b[0] === PathScore.Static + PathScore.Segment ? 1 : -1;
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp) return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore)) return 1;
    if (isLastScoreNegative(bScore)) return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const PATH_PARSER_OPTIONS_DEFAULTS = {
  strict: false,
  end: true,
  sensitive: false
};
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions(PATH_PARSER_OPTIONS_DEFAULTS, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [mainNormalizedRecord];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) normalizedRecords.push(normalizeRouteRecord(assign({}, mainNormalizedRecord, {
        components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
        path: alias,
        aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
      })));
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher)) {
          removeRoute(record.name);
        }
      }
      if (isMatchable(matcher)) insertMatcher(matcher);
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
      }
      originalRecord = originalRecord || matcher;
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop$1;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    const index = findInsertionIndex(matcher, matchers);
    matchers.splice(index, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
  }
  function resolve(location$1, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location$1 && location$1.name) {
      matcher = matcherMap.get(location$1.name);
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, { location: location$1 });
      name = matcher.record.name;
      params = assign(pickParams(currentLocation.params, matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)), location$1.params && pickParams(location$1.params, matcher.keys.map((k) => k.name)));
      path = matcher.stringify(params);
    } else if (location$1.path != null) {
      path = location$1.path;
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, {
        location: location$1,
        currentLocation
      });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location$1.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  return {
    addRoute,
    resolve,
    removeRoute,
    clearRoutes,
    getRoutes,
    getRecordMatcher
  };
}
function pickParams(params, keys) {
  const newParams = {};
  for (const key of keys) if (key in params) newParams[key] = params[key];
  return newParams;
}
function normalizeRouteRecord(record) {
  const normalized = {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: record.aliasOf,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
  Object.defineProperty(normalized, "mods", { value: {} });
  return normalized;
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) propsObject.default = props;
  else for (const name in record.components) propsObject[name] = typeof props === "object" ? props[name] : props;
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf) return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function findInsertionIndex(matcher, matchers) {
  let lower = 0;
  let upper = matchers.length;
  while (lower !== upper) {
    const mid = lower + upper >> 1;
    if (comparePathParserScore(matcher, matchers[mid]) < 0) upper = mid;
    else lower = mid + 1;
  }
  const insertionAncestor = getInsertionAncestor(matcher);
  if (insertionAncestor) {
    upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
  }
  return upper;
}
function getInsertionAncestor(matcher) {
  let ancestor = matcher;
  while (ancestor = ancestor.parent) if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) return ancestor;
}
function isMatchable({ record }) {
  return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => {
    const to = unref(props.to);
    return router.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length) return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1) return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p = router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop$1);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) document.startViewTransition(() => p);
      return p;
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  if (e.defaultPrevented) return;
  if (e.button !== void 0 && e.button !== 0) return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target)) return;
  }
  if (e.preventDefault) e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) return false;
    } else if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) initialDepth++;
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [
      viewRef.value,
      matchedRouteRef.value,
      props.name
    ], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) to.leaveGuards = from.leaveGuards;
          if (!to.updateGuards.size) to.updateGuards = from.updateGuards;
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) return normalizeSlot(slots.default, {
        Component: ViewComponent,
        route
      });
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) matchedRoute.instances[currentName] = null;
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return normalizeSlot(slots.default, {
        Component: component,
        route
      }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot) return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) history.scrollRestoration = "manual";
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else record = parentOrRoute;
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) matcher.removeRoute(recordMatcher);
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute$1 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href$1 = routerHistory.createHref(locationNormalized.fullPath);
      return assign(locationNormalized, matchedRoute$1, {
        params: decodeParams(matchedRoute$1.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href$1
      });
    }
    let matcherLocation;
    if (rawLocation.path != null) {
      matcherLocation = assign({}, rawLocation, { path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) if (targetParams[key] == null) delete targetParams[key];
      matcherLocation = assign({}, rawLocation, { params: encodeParams(targetParams) });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign({
      fullPath,
      hash,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) return createRouterError(ErrorTypes.NAVIGATION_CANCELLED, {
      from,
      to
    });
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to, from) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to, from) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: newTargetLocation.path != null ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace$1 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation, from);
    if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
      state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
      force,
      replace: replace$1
    }), redirectedFrom || targetLocation);
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(ErrorTypes.NAVIGATION_DUPLICATED, {
        to: toLocation,
        from
      });
      handleScroll(from, from, true, false);
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure$1) => {
      if (failure$1) {
        if (isNavigationFailure(failure$1, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          return pushWithRedirect(assign({ replace: replace$1 }, locationAsObject(failure$1.to), {
            state: typeof failure$1.to === "object" ? assign({}, data, failure$1.to.state) : data,
            force
          }), redirectedFrom || toLocation);
        }
      } else failure$1 = finalizeNavigation(toLocation, from, true, replace$1, data);
      triggerAfterEach(toLocation, from, failure$1);
      return failure$1;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) record.leaveGuards.forEach((guard) => {
      guards.push(guardToPromiseFn(guard, to, from));
    });
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) record.updateGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of enteringRecords) if (record.beforeEnter) if (isArray(record.beforeEnter)) for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
      else guards.push(guardToPromiseFn(record.beforeEnter, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, ErrorTypes.NAVIGATION_CANCELLED) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
  }
  function finalizeNavigation(toLocation, from, isPush, replace$1, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error) return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) if (replace$1 || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({ scroll: isFirstNavigation && state && state.scroll }, data));
    else routerHistory.push(toLocation.fullPath, data);
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener) return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening) return;
      const toLocation = resolve(to);
      const shouldRedirect = handleRedirectRecord(toLocation, router.currentRoute.value);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, {
          replace: true,
          force: true
        }), toLocation).catch(noop$1);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_CANCELLED)) return error;
        if (isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          pushWithRedirect(assign(locationAsObject(error.to), { force: true }), toLocation).then((failure) => {
            if (isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED) && !info.delta && info.type === NavigationType.pop) routerHistory.go(-1, false);
          }).catch(noop$1);
          return Promise.reject();
        }
        if (info.delta) routerHistory.go(-info.delta, false);
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(toLocation, from, false);
        if (failure) {
          if (info.delta && !isNavigationFailure(failure, ErrorTypes.NAVIGATION_CANCELLED)) routerHistory.go(-info.delta, false);
          else if (info.type === NavigationType.pop && isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED)) routerHistory.go(-1, false);
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop$1);
    });
  }
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorListeners.list();
    if (list.length) list.forEach((handler) => handler(error, to, from));
    else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
    return new Promise((resolve$1, reject) => {
      readyHandlers.add([resolve$1, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve$1, reject]) => err ? reject(err) : resolve$1());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior) return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes,
    resolve,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app) {
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) Object.defineProperty(reactiveRoute, key, {
        get: () => currentRoute.value[key],
        enumerable: true
      });
      app.provide(routerKey, router);
      app.provide(routeLocationKey, shallowReactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router;
}
function useRouter() {
  return inject(routerKey);
}
function useRoute(_name) {
  return inject(routeLocationKey);
}

const _hoisted_1$7 = { class: "nav-bar" };
const _hoisted_2$7 = ["onClick"];
const _hoisted_3$7 = ["onClick"];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "AppNavBar",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("nav", _hoisted_1$7, [
        createVNode(unref(RouterLink), {
          to: "/shipment-list",
          custom: ""
        }, {
          default: withCtx(({ navigate }) => [
            createBaseVNode("span", { onClick: navigate }, "Shipment", 8, _hoisted_2$7)
          ]),
          _: 1
        }),
        createVNode(unref(RouterLink), {
          to: "/dashboard",
          custom: ""
        }, {
          default: withCtx(({ navigate }) => [
            createBaseVNode("span", { onClick: navigate }, "Cargo iQ", 8, _hoisted_3$7)
          ]),
          _: 1
        }),
        _cache[0] || (_cache[0] = createBaseVNode("span", null, "Terminal", -1)),
        _cache[1] || (_cache[1] = createBaseVNode("span", null, "Airline", -1))
      ]);
    };
  }
});

const AppNavBar = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-1d919ee1"]]);

const _imports_0$2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAAAjCAYAAADR94eaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAB4tJREFUeAHtWU9rG0cUf7OzUpQ4qeVSKL0k2w/QxoH2VNLIn6DOLeRPrUALru008ieIfS2ktolsDDlYIW7xzcq1EKxQyCUX5RNkDYUeeoj6D2xpd6ZvVjur2dVqZ0y2gkB+IHZ25u3M6M37PwDv8A7jAIEx46Offn2Nq5YzSDq/X788pXbcXFhaIYTcAw0ebz4Yy/+xYIxwdg7KGoYBB2gn+wiQi6ABB9KGMcFOdnz2oFbBUz2AHFAoWc7zb+4fyvcj257WiQIB9jKlM2I0J/wqPjpJEsb8oG+2ViuXjo5GHsxRqdRRx/e2t90kjTpH2ridssFpyAkqwwJY3NFbBOKmdMo9dXbr9SZk4FzP3wdaqIwat7veBqEFIbkBTbVWm2qsr0eHcG2+5hR6/gHO4eBrA3+3k3MMqSfn4EA+SFEXwbRscD+uZvinxIkHp87TGRr/Hnim+qOqtznnz+R7t9udVcdPUX4XH45oU7+3mjbHkKQRAlr7YQIC/HB4bks7t295MdXzjrxpQomcc/rW4h2e/AaZsLq7VV8R7d3N+iV1bG7xzg5D3gd0BOk2642bS0sV5G7gWCihV6AvUYGUMfBrkraRopoC1vCfJQ7kAMbTJE0vxX/cmIl9h5vXm4v0tYYZVg8ZW6+3YGAXI0krUF96aNe27XUYgZikTa8FquBADuCp6qm1l8OekxAnmhP/OD5aSRr7lD303SiGRXMx/oRYZA6b5evfLkxbtuVASI+bX1Xt3NB66kuhiAzjkAtIiofD+OvEcRRK/gXZZses+fPDLW1ooWNYMC8hLUEatG1SQQbeDYfcx1sPGlnzx9STsdycAHge5BI34Z92ZLs4UXR19CYME6BFGnlhy7KEWjpBv9+bAQ1iJ48xmlHkbYDOi6W1KcgBquHHzbppNEjQwmzgtsow6Et68uDaSLeszC3i0Yoy3hDzgAYJ7ym8Wy76mYuUXV9YiNlAPsLeovf8U4Qmfs+vKt3CPlcSdC8T789QSCSNOyrESCLONMLK2uDT76Hu/ZtJ8l6pV77/9HIVNLAs2lyeaY00uMVi0fW7vsHJs/4hcbhtRBdtAA83lBFU5UejQowkYhz6vL78GkCTG3b/Bv7Pb1kk8Mn5Hnx63gPt4oRMZTHt/wCq5A73+SORmqHxX4O+9Lqolh+bzhFJWhhulLVf+EdakvcnGBigM26Gfb3w/V3MGKoYLFeV7o6J8VcReU/bNss5uXespZkoGdnFsVUlJJjFDpFpct0OtlvIsEumaikRSRpG8A41iqJ8LcXUhJ5pmK65MGaEyX4T3hCRpFnEMEbzstVz4pSZ92UspQT0lkDxngbhBvdF/pFJcrZkZM/Q3VPXhE7Uts4d96qckMDeEs47Pe4390ao1M15TMZD7G4HOWYMQcpErTLzWUdmF7IPNLBLdlukVwOmEX3ZBgzsmYlqClCarZ6CWZM9fo/1sOpgWQM3j3pdAGsNvWCDFuiymiOKuE4toGI1YyZMzgfrFuk+Phxq0ScQJutW0drBdE1n0zu4VhCw24O9BAYy0zh/cOav6bOnvczJP5w0kzT0nCPXkoVAFg9m3fAp+6oYzIp25Pko0PjeWMCUlnwNA+Dge+kQwj6tE1QcyIBpLxbXtUHkj0+/XEfuGnlZDTIPJyzROKItav+2370qPVwVGepT/yAcr4jaWCRNBK6o86DUzSFTVqQ0qrU5tOatoT5Mo3ojsoISlsll24aTgJBcCpSQUgGRCG1SNXx17YI109jcjugb2+vuje8WNzDJXgs6FGlCacA7CCLnD+JOzws0IxhHRlXkPFgvayf7RLlozyD8OBnTTIJfEyRyQBV46nMDuvS6VoEXmj74AdPUoqm0S5hTPkIp+wqbDuFBAaIVjl/sT0vact7kTde1+XknuZ64jGkq+zjpFV4eqikkws0Yi9ZQyzcj6QmfFE/Va+IkLcG48K0S3jNEl0bogQeleOUiCdOq/QItvEr+znX9WXVNY6b98EslF4YJMEZH2jTFi7mjqqceeE70wiGQWrUszjzm2sVBudrrerWQccF3jLOWeAqHAwaVanQUsf0aqychXln4pzxw+kz3FbwBVBUm4SWxRSzpBKL4C8OSFj7EPe4cGvxWdEFD+9/YNto73u/jnGx4rLuett7ew7idM2aaZZHcJG3pi+eHGcORERfSkZS2vnT4FflOWa8lnqLCK5yAGhqIyi3aNEHrIKOi4mrkbRk6Aek4Ldbc2zLLQY3VM69bKtAl6jyKqzB+4rEqsgh4bcqC4DQgJXxDhCKCuZFah+oqkLh1qvSHuZxfhCSRE4i8qQHMvWdu4QY/zBy1+AZKR2h4We3Wwh0H/+hLQugk9Cuz0oOLa7YV0YjFWjx+W4UOYSNWwleYCopjQ7u1j+oMwxuCDl60XFW7TuI98/GcPFvShHSEV3V9EJjt/2lWg+imPSjpzESqq8Rawgmo86kOob+BPlPDUroaQlXSfriXoTDLWNKOj8klyAGlEunoaMQNEkb+DY96K/h6QZoGlJo2MmgjmU9ifwcT+oZoJ6/4BGMxa1hFQx9cBRa4F42z8GY9CxYnz+Ad3hz/AdJQN0oCRubbAAAAAElFTkSuQmCC";

const _hoisted_1$6 = { class: "header" };
const _hoisted_2$6 = { class: "header-right" };
const _hoisted_3$6 = { class: "icon-link" };
const _hoisted_4$6 = {
  style: { "width": "20px", "height": "20px" },
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#6B8080",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const _hoisted_5$6 = { class: "news-icon-wrapper" };
const _hoisted_6$6 = {
  style: { "width": "20px", "height": "20px" },
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#6B8080",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const _hoisted_7$6 = { class: "news-item" };
const _hoisted_8$6 = { class: "news-alert-title" };
const _hoisted_9$5 = {
  style: { "width": "14px", "height": "14px", "margin-right": "6px" },
  viewBox: "0 0 24 24",
  fill: "red",
  stroke: "white",
  "stroke-width": "2"
};
const _hoisted_10$5 = { class: "icon-link" };
const _hoisted_11$5 = {
  style: { "width": "20px", "height": "20px" },
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#00A3C5",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const _hoisted_12$5 = { style: { "display": "flex", "flex-direction": "column", "align-items": "center", "gap": "2px" } };
const _hoisted_13$5 = {
  style: { "width": "10px", "height": "6px" },
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#6B8080",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const _hoisted_14$5 = { class: "user-avatar" };
const _hoisted_15$5 = {
  style: { "width": "16px", "height": "16px", "margin-left": "4px" },
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#0F172A",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  setup(__props) {
    const router = useRouter();
    const showNewsDropdown = ref(false);
    const toggleNews = () => {
      showNewsDropdown.value = !showNewsDropdown.value;
    };
    const goToTrackShipment = () => {
      showNewsDropdown.value = false;
      router.push("/track-shipment");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("header", _hoisted_1$6, [
        _cache[16] || (_cache[16] = createBaseVNode("div", { class: "logo-area" }, [
          createBaseVNode("img", {
            src: _imports_0$2,
            alt: "Ezy Cargo",
            style: { "height": "32px" }
          })
        ], -1)),
        createBaseVNode("div", _hoisted_2$6, [
          createBaseVNode("div", _hoisted_3$6, [
            (openBlock(), createElementBlock("svg", _hoisted_4$6, [..._cache[1] || (_cache[1] = [
              createBaseVNode("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }, null, -1),
              createBaseVNode("polyline", { points: "22,6 12,13 2,6" }, null, -1)
            ])])),
            _cache[2] || (_cache[2] = createTextVNode(" Inbox ", -1))
          ]),
          createBaseVNode("div", {
            class: "icon-link news-container",
            onClick: toggleNews
          }, [
            createBaseVNode("div", _hoisted_5$6, [
              (openBlock(), createElementBlock("svg", _hoisted_6$6, [..._cache[3] || (_cache[3] = [
                createBaseVNode("path", { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }, null, -1),
                createBaseVNode("path", { d: "M13.73 21a2 2 0 0 1-3.46 0" }, null, -1)
              ])])),
              _cache[4] || (_cache[4] = createBaseVNode("span", { class: "red-dot" }, null, -1))
            ]),
            _cache[9] || (_cache[9] = createTextVNode(" News ", -1)),
            showNewsDropdown.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "news-dropdown",
              onClick: _cache[0] || (_cache[0] = withModifiers(() => {
              }, ["stop"]))
            }, [
              createBaseVNode("div", _hoisted_7$6, [
                createBaseVNode("div", _hoisted_8$6, [
                  (openBlock(), createElementBlock("svg", _hoisted_9$5, [..._cache[5] || (_cache[5] = [
                    createBaseVNode("circle", {
                      cx: "12",
                      cy: "12",
                      r: "10"
                    }, null, -1),
                    createBaseVNode("line", {
                      x1: "12",
                      y1: "8",
                      x2: "12",
                      y2: "12"
                    }, null, -1),
                    createBaseVNode("line", {
                      x1: "12",
                      y1: "16",
                      x2: "12.01",
                      y2: "16"
                    }, null, -1)
                  ])])),
                  _cache[6] || (_cache[6] = createTextVNode(" Temperature Alert ", -1))
                ]),
                createBaseVNode("div", { class: "news-alert-content" }, [
                  _cache[7] || (_cache[7] = createBaseVNode("span", { class: "news-date" }, "03 Jun 24 15:49", -1)),
                  _cache[8] || (_cache[8] = createBaseVNode("span", { class: "news-desc" }, [
                    createBaseVNode("span", { class: "highlight-code" }, "[NRT]"),
                    createTextVNode(" ULD Temperature Alert, (3°C Exceed control temperature range +2°C to +8°C.)")
                  ], -1)),
                  createBaseVNode("span", {
                    class: "news-link",
                    onClick: goToTrackShipment
                  }, "View Details")
                ])
              ])
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_10$5, [
            (openBlock(), createElementBlock("svg", _hoisted_11$5, [..._cache[10] || (_cache[10] = [
              createBaseVNode("circle", {
                cx: "12",
                cy: "12",
                r: "10"
              }, null, -1),
              createBaseVNode("line", {
                x1: "2",
                y1: "12",
                x2: "22",
                y2: "12"
              }, null, -1),
              createBaseVNode("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" }, null, -1)
            ])])),
            createBaseVNode("div", _hoisted_12$5, [
              _cache[12] || (_cache[12] = createBaseVNode("span", null, "EN", -1)),
              (openBlock(), createElementBlock("svg", _hoisted_13$5, [..._cache[11] || (_cache[11] = [
                createBaseVNode("polyline", { points: "6 9 12 15 18 9" }, null, -1)
              ])]))
            ])
          ]),
          createBaseVNode("div", _hoisted_14$5, [
            _cache[14] || (_cache[14] = createBaseVNode("div", { class: "avatar-circle" }, "E", -1)),
            _cache[15] || (_cache[15] = createBaseVNode("div", { class: "user-info" }, [
              createBaseVNode("span", { class: "user-name" }, "Elon M"),
              createBaseVNode("span", { class: "user-company" }, "GLSHK")
            ], -1)),
            (openBlock(), createElementBlock("svg", _hoisted_15$5, [..._cache[13] || (_cache[13] = [
              createBaseVNode("polyline", { points: "6 9 12 15 18 9" }, null, -1)
            ])]))
          ])
        ])
      ]);
    };
  }
});

const AppHeader = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-eeb65265"]]);

const _imports_0$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAA2CAYAAABp26+xAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAABeBJREFUeAHtWctu20YUvZekFANGUHpXoAHKfIFloN0G0qbbOLs0jRN5UcDwo5Y33dr5gEJyIhvemamNokv3Awqp6xaI8gWld9lVBvpwLHKmdyiZIqkZmmK8UuYAskTOzJ2ZM/c5BtDQ0NDQ0NDQ0NDQ0NDQ0ND4mIFwy/j0uONA2ajLW9F7980DF2YAFtwysGQuA+KuvJXtw4wgIu6LdqODgA5MC+Td3zdaq7FnR63I6MGMICKOSKtCETC8SDyjsajqygPswYzAEH++PGhUoCA4ci/5ApSyLn1/tohjDBwoCg4RGc5xxybVtRU9+/3VWh9mBKGpIhYnDg2IyLicI9J4SgPHPT2YIYTEcQ4OFkxMKDBEGvfu65pHX/fhI8C1xi1CMdyaz3q6tllF5BUwKLjwkbmj4XEW/Pb3Hat71mpNmPnjtYZTMoLq9XMAQe+nw8Op1rTcaNh3r4LlYVBjYzfD2FvOsXd61O7Kxg2JAywUHBD4OXwgVta36oi4zYFIu05jIu1ntB9s3B0E3rP179wfD1++iI81cSA23IxecBBpUS7iQsIGQRMGQX04H0t2MIzw9crGlkcBcOe03T6LN1uVZkOwrHLowAf/Avj/SNvuLfz3yQ+/PthTjTUMo7VT60oDQqgtZnBMP6tEGtwAhxa/R5twTg5eRTkjEe6k5vMgB8K5B0FHyM3R3UGGE/xYlgXZ2nbVB/7+Qtr02b0rMi91/kek7cnej0ibWDgR2OOAPeShJi+S7Eq8D7Un+pOlfB5/ps3k0rb03CS3i4z/QtpLm2U2R5N8Pn8o+og1nR623bQMi87azooLnA2UbfNzmZrSy79wSoyRCXPopvs+3dzcQ467pHH71N5IrI2qFBzbdd+V+MEJeeRLIXlg7ulBe1XStSHciMX8rkyORdNma5x/qWxamM8iTu7/xGIgRZpVMmpu66V000TWHpHXlZEa981CMyAPDKjGH7nQNAVODl+5ajGgLpGoRhKSpU1l0lXxUQ7lCo1DSFwAWMHVo5s0RUbak/X1xIGTVl5AHvCkeyC/uPvk2/Wpg6NFJmIri3L/vXLgwjyDzPVxY4I40pzl1MJd9+jIgwIwmGGDGZsvp8aR3+zS1/PYuIpZNt+I6EmPXaGBPvd7P9+wLkpHwogh7VQ2B7Y5x6QRd/4OZII0blKLGJlJ7IzIR73OkpHO02iDZ9faSWMrmBCWLw0R5kckCeKqqSaHPnVKf+olKAmXcjZggx0VgdYfm80l1SQi1UDl3Vo2KFpPbCQdBRnnf2bJSOdpRJobyUqlIsxnHuQEpTQ14WuJ/G1lDouwXDJLVXIJNVlSbWRPgUUrir40f0tfAFzxBciaPUZOGHmTbYm1lefLHkwBoXkUTZfMwLwvEmfOuUhw02u2TTSbsvGZN8AfUPxLzYb8xzmZwli+FeaAPfX8cXJYelNO7HeuVEQG96jlia/RJ0p/FPNEuEHjihLHpREu7cApom3XGw1l1QLxVInDW1CsLXcqAsNSK6tdpD8Q0zzSdOmBKIlrdqqZpVgWVKlI6U7JhaQ5OMEgeDNKShMYvbPHMsfXVelUREKqFCLYUH36F9W9u4/X1hxZH2rbjs+LikNRmqrv+xXTNKEIZKmIgDCnlY0NKtSNuN9w0MTOKB3wyFnbo9IqcWjUJ5JJmurEy1sy6efPNrYegmo9lGaIGpcqltAERd1Ljl/Uvl0xJx3KOckQgUuUWNXYUM8MBi9kMpXEGUaxGxMB4ttTtZ0cHLTIj9gpPyLgwHDhE2NELZmoQxmZcDL1tHmWdXBYoDmr9F1PtVTFH5RfRnomDx6p8kylqRb6j9cIFFEzfU7oR0Qky/ZNfUEYaUeNol8t7vxxymgfFupUfYgISr9f39C9T/dw+2bJXHIz7vaU9T35uIrvT+/jROL7/Vfd3M66Tn7Ht/xKqEXhgtDjBveEhqkiZZ18nG8YudcmkyU0EANe4Ti8MqIbmT4nd5A1r4aGhoaGhoaGhoaGhoaGhobGNf4HmmVdG2HEpFcAAAAASUVORK5CYII=";

const _sfc_main$5 = {  };


const _hoisted_1$5 = { class: "footer" };
const _hoisted_2$5 = { class: "footer-top" };
const _hoisted_3$5 = { class: "footer-right" };
const _hoisted_4$5 = { class: "lang-selector" };
const _hoisted_5$5 = {
  style: {"width":"25px","height":"25px"},
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#556565",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const _hoisted_6$5 = { style: {"display":"flex","flex-direction":"column","align-items":"center","gap":"2px"} };
const _hoisted_7$5 = {
  style: {"width":"10px","height":"6px"},
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#556565",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const _hoisted_8$5 = { class: "footer-bottom" };

function _sfc_render(_ctx, _cache) {
  return (openBlock(), createElementBlock("footer", _hoisted_1$5, [
    createBaseVNode("div", _hoisted_2$5, [
      _cache[4] || (_cache[4] = createStaticVNode("<div class=\"footer-left\" data-v-cc90972a><div class=\"footer-logo\" data-v-cc90972a><img src=\"" + _imports_0$1 + "\" alt=\"GLS Logo\" style=\"height:54px;width:78px;object-fit:contain;\" data-v-cc90972a></div><div class=\"footer-contact\" data-v-cc90972a><div class=\"separator\" data-v-cc90972a></div><span class=\"help-desk\" data-v-cc90972a>Help desk:</span><a href=\"tel:+85228381999\" class=\"contact-link\" data-v-cc90972a>(+852) 2838 1999</a><div class=\"separator\" data-v-cc90972a></div><a href=\"mailto:helpdesk@glshk.com\" class=\"contact-link\" data-v-cc90972a>helpdesk@glshk.com</a><div class=\"separator\" data-v-cc90972a></div><span class=\"footer-link\" data-v-cc90972a>Downloads</span><div class=\"separator\" data-v-cc90972a></div><span class=\"footer-link\" data-v-cc90972a>FAQ</span><div class=\"separator\" data-v-cc90972a></div><span class=\"footer-link\" data-v-cc90972a>Privacy</span><div class=\"separator\" data-v-cc90972a></div><span class=\"footer-link\" data-v-cc90972a>Terms</span></div></div>", 1)),
      createBaseVNode("div", _hoisted_3$5, [
        _cache[3] || (_cache[3] = createBaseVNode("div", { class: "linkedin-icon" }, [
          createBaseVNode("svg", {
            viewBox: "0 0 24 24",
            width: "25",
            height: "25",
            fill: "#556565"
          }, [
            createBaseVNode("path", { d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" })
          ])
        ], -1)),
        createBaseVNode("div", _hoisted_4$5, [
          (openBlock(), createElementBlock("svg", _hoisted_5$5, [...(_cache[0] || (_cache[0] = [
            createBaseVNode("circle", {
              cx: "12",
              cy: "12",
              r: "10"
            }, null, -1),
            createBaseVNode("line", {
              x1: "2",
              y1: "12",
              x2: "22",
              y2: "12"
            }, null, -1),
            createBaseVNode("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" }, null, -1)
          ]))])),
          createBaseVNode("div", _hoisted_6$5, [
            _cache[2] || (_cache[2] = createBaseVNode("span", { class: "lang-text" }, "EN", -1)),
            (openBlock(), createElementBlock("svg", _hoisted_7$5, [...(_cache[1] || (_cache[1] = [
              createBaseVNode("polyline", { points: "6 9 12 15 18 9" }, null, -1)
            ]))]))
          ])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_8$5, " © " + toDisplayString(new Date().getFullYear()) + " Global Logistics System (HK) Co. Ltd. All Rights Reserved. ", 1)
  ]))
}
const AppFooter = /*#__PURE__*/_export_sfc(_sfc_main$5, [['render',_sfc_render],['__scopeId',"data-v-cc90972a"]]);

//#endregion
//#region utils/is.ts
const isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {};
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}

//#endregion
//#region watchImmediate/index.ts
/**
* Shorthand for watching value with {immediate: true}
*
* @see https://vueuse.org/watchImmediate
*/
function watchImmediate(source, cb, options) {
	return watch(source, cb, {
		...options,
		immediate: true
	});
}

//#endregion
//#region _configurable.ts
const defaultWindow = isClient ? window : void 0;

//#endregion
//#region unrefElement/index.ts
/**
* Get the dom element of a ref of element or Vue component instance
*
* @param elRef
*/
function unrefElement(elRef) {
	var _$el;
	const plain = toValue$1(elRef);
	return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
}

//#endregion
//#region useEventListener/index.ts
function useEventListener(...args) {
	const register = (el, event, listener, options) => {
		el.addEventListener(event, listener, options);
		return () => el.removeEventListener(event, listener, options);
	};
	const firstParamTargets = computed(() => {
		const test = toArray(toValue$1(args[0])).filter((e) => e != null);
		return test.every((e) => typeof e !== "string") ? test : void 0;
	});
	return watchImmediate(() => {
		var _firstParamTargets$va, _firstParamTargets$va2;
		return [
			(_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e) => unrefElement(e))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e) => e != null),
			toArray(toValue$1(firstParamTargets.value ? args[1] : args[0])),
			toArray(unref(firstParamTargets.value ? args[2] : args[1])),
			toValue$1(firstParamTargets.value ? args[3] : args[2])
		];
	}, ([raw_targets, raw_events, raw_listeners, raw_options], _, onCleanup) => {
		if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
		const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
		const cleanups = raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))));
		onCleanup(() => {
			cleanups.forEach((fn) => fn());
		});
	}, { flush: "post" });
}
function onClickOutside(target, handler, options = {}) {
	const { window: window$1 = defaultWindow, ignore = [], capture = true, detectIframe = false, controls = false } = options;
	if (!window$1) return controls ? {
		stop: noop,
		cancel: noop,
		trigger: noop
	} : noop;
	let shouldListen = true;
	const shouldIgnore = (event) => {
		return toValue$1(ignore).some((target$1) => {
			if (typeof target$1 === "string") return Array.from(window$1.document.querySelectorAll(target$1)).some((el) => el === event.target || event.composedPath().includes(el));
			else {
				const el = unrefElement(target$1);
				return el && (event.target === el || event.composedPath().includes(el));
			}
		});
	};
	/**
	* Determines if the given target has multiple root elements.
	* Referenced from: https://github.com/vuejs/test-utils/blob/ccb460be55f9f6be05ab708500a41ec8adf6f4bc/src/vue-wrapper.ts#L21
	*/
	function hasMultipleRoots(target$1) {
		const vm = toValue$1(target$1);
		return vm && vm.$.subTree.shapeFlag === 16;
	}
	function checkMultipleRoots(target$1, event) {
		const vm = toValue$1(target$1);
		const children = vm.$.subTree && vm.$.subTree.children;
		if (children == null || !Array.isArray(children)) return false;
		return children.some((child) => child.el === event.target || event.composedPath().includes(child.el));
	}
	const listener = (event) => {
		const el = unrefElement(target);
		if (event.target == null) return;
		if (!(el instanceof Element) && hasMultipleRoots(target) && checkMultipleRoots(target, event)) return;
		if (!el || el === event.target || event.composedPath().includes(el)) return;
		if ("detail" in event && event.detail === 0) shouldListen = !shouldIgnore(event);
		if (!shouldListen) {
			shouldListen = true;
			return;
		}
		handler(event);
	};
	let isProcessingClick = false;
	const cleanup = [
		useEventListener(window$1, "click", (event) => {
			if (!isProcessingClick) {
				isProcessingClick = true;
				setTimeout(() => {
					isProcessingClick = false;
				}, 0);
				listener(event);
			}
		}, {
			passive: true,
			capture
		}),
		useEventListener(window$1, "pointerdown", (e) => {
			const el = unrefElement(target);
			shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
		}, { passive: true }),
		detectIframe && useEventListener(window$1, "blur", (event) => {
			setTimeout(() => {
				var _window$document$acti;
				const el = unrefElement(target);
				if (((_window$document$acti = window$1.document.activeElement) === null || _window$document$acti === void 0 ? void 0 : _window$document$acti.tagName) === "IFRAME" && !(el === null || el === void 0 ? void 0 : el.contains(window$1.document.activeElement))) handler(event);
			}, 0);
		}, { passive: true })
	].filter(Boolean);
	const stop = () => cleanup.forEach((fn) => fn());
	if (controls) return {
		stop,
		cancel: () => {
			shouldListen = false;
		},
		trigger: (event) => {
			shouldListen = true;
			listener(event);
			shouldListen = false;
		}
	};
	return stop;
}

//#endregion
//#region useSwipe/index.ts
/**
* Reactive swipe detection.
*
* @see https://vueuse.org/useSwipe
* @param target
* @param options
*/
function useSwipe(target, options = {}) {
	const { threshold = 50, onSwipe, onSwipeEnd, onSwipeStart, passive = true } = options;
	const coordsStart = reactive({
		x: 0,
		y: 0
	});
	const coordsEnd = reactive({
		x: 0,
		y: 0
	});
	const diffX = computed(() => coordsStart.x - coordsEnd.x);
	const diffY = computed(() => coordsStart.y - coordsEnd.y);
	const { max, abs } = Math;
	const isThresholdExceeded = computed(() => max(abs(diffX.value), abs(diffY.value)) >= threshold);
	const isSwiping = shallowRef(false);
	const direction = computed(() => {
		if (!isThresholdExceeded.value) return "none";
		if (abs(diffX.value) > abs(diffY.value)) return diffX.value > 0 ? "left" : "right";
		else return diffY.value > 0 ? "up" : "down";
	});
	const getTouchEventCoords = (e) => [e.touches[0].clientX, e.touches[0].clientY];
	const updateCoordsStart = (x, y) => {
		coordsStart.x = x;
		coordsStart.y = y;
	};
	const updateCoordsEnd = (x, y) => {
		coordsEnd.x = x;
		coordsEnd.y = y;
	};
	const listenerOptions = {
		passive,
		capture: !passive
	};
	const onTouchEnd = (e) => {
		if (isSwiping.value) onSwipeEnd === null || onSwipeEnd === void 0 || onSwipeEnd(e, direction.value);
		isSwiping.value = false;
	};
	const stops = [
		useEventListener(target, "touchstart", (e) => {
			if (e.touches.length !== 1) return;
			const [x, y] = getTouchEventCoords(e);
			updateCoordsStart(x, y);
			updateCoordsEnd(x, y);
			onSwipeStart === null || onSwipeStart === void 0 || onSwipeStart(e);
		}, listenerOptions),
		useEventListener(target, "touchmove", (e) => {
			if (e.touches.length !== 1) return;
			const [x, y] = getTouchEventCoords(e);
			updateCoordsEnd(x, y);
			if (listenerOptions.capture && !listenerOptions.passive && Math.abs(diffX.value) > Math.abs(diffY.value)) e.preventDefault();
			if (!isSwiping.value && isThresholdExceeded.value) isSwiping.value = true;
			if (isSwiping.value) onSwipe === null || onSwipe === void 0 || onSwipe(e);
		}, listenerOptions),
		useEventListener(target, ["touchend", "touchcancel"], onTouchEnd, listenerOptions)
	];
	const stop = () => stops.forEach((s) => s());
	return {
		isSwiping,
		direction,
		coordsStart,
		coordsEnd,
		lengthX: diffX,
		lengthY: diffY,
		stop
	};
}

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === 't' || firstChar === 'b' ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes('start') ? placement.replace('start', 'end') : placement.replace('end', 'start');
}
const lrPlacement = ['left', 'right'];
const rlPlacement = ['right', 'left'];
const tbPlacement = ['top', 'bottom'];
const btPlacement = ['bottom', 'top'];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

// Maximum number of resets that can occur before bailing to avoid infinite reset loops.
const MAX_RESET_COUNT = 50;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const platformWithDetectOverflow = platform.detectOverflow ? platform : {
    ...platform,
    detectOverflow
  };
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$2 = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === 'alignment' ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow ||
          // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every(d => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

const originSides = /*#__PURE__*/new Set(['left', 'top']);

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$1 = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        platform
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await platform.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};

function hasWindow() {
  return typeof window !== 'undefined';
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== 'inline' && display !== 'contents';
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(':popover-open')) {
      return true;
    }
  } catch (_e) {
    // no-op
  }
  try {
    return element.matches(':modal');
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = value => !!value && value !== 'none';
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  // https://drafts.csswg.org/css-transforms-2/#individual-transforms
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || '') || containRe.test(css.contain || '');
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('-webkit-backdrop-filter', 'none');
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement$1(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement$1(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement$1(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

// If <html> has a CSS width greater than the viewport, then this will be
// incorrect for RTL.
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}

function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Safety check: ensure the scrollbar space is reasonable in case this
// calculation is affected by unusual styles.
// Most scrollbars leave 15-18px of space.
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  // <html> `overflow: hidden` + `scrollbar-gutter: stable` reduces the
  // visual width of the <html> but this is not considered in the size
  // of `html.clientWidth`.
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === 'CSS1Compat' ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    // If the <body> scrollbar is on the left, the width needs to be extended
    // by the scrollbar amount so there isn't extra space on the right.
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === 'absolute' || currentContainingBlockComputedStyle.position === 'fixed') || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);

  // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
  // Firefox with layout.scrollbar.side = 3 in about:config to test this.
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;

  // Firefox returns the <html> element as the offsetParent if it's non-static,
  // while Chrome and Safari return the <body> element. The <body> element must
  // be used to perform the correct calculations even if the <html> element is
  // non-static.
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped, the ratio is 0. Throttle the refresh
          // to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        // It's possible that even though the ratio is reported as 1, the
        // element is not actually fully within the IntersectionObserver's root
        // area anymore. This can happen under performance constraints. This may
        // be a bug in the browser's IntersectionObserver implementation. To
        // work around this, we compare the element's bounding rect now with
        // what it was at the time we created the IntersectionObserver. If they
        // are not equal then the element moved, so we refresh.
        refresh();
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement$1(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...(floating ? getOverflowAncestors(floating) : [])] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = offset$1;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = shift$1;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = flip$1;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$1 = arrow$2;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

function isComponentPublicInstance(target) {
  return target != null && typeof target === 'object' && '$el' in target;
}
function unwrapElement(target) {
  if (isComponentPublicInstance(target)) {
    const element = target.$el;
    return isNode(element) && getNodeName(element) === '#comment' ? null : element;
  }
  return target;
}

function toValue(source) {
  return typeof source === 'function' ? source() : unref(source);
}

/**
 * Positions an inner element of the floating element such that it is centered to the reference element.
 * @param options The arrow options.
 * @see https://floating-ui.com/docs/arrow
 */
function arrow(options) {
  return {
    name: 'arrow',
    options,
    fn(args) {
      const element = unwrapElement(toValue(options.element));
      if (element == null) {
        return {};
      }
      return arrow$1({
        element,
        padding: options.padding
      }).fn(args);
    }
  };
}

function getDPR(element) {
  if (typeof window === 'undefined') {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}

function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element next to a reference element when it is given a certain CSS positioning strategy.
 * @param reference The reference template ref.
 * @param floating The floating template ref.
 * @param options The floating options.
 * @see https://floating-ui.com/docs/vue
 */
function useFloating(reference, floating, options) {
  if (options === void 0) {
    options = {};
  }
  const whileElementsMountedOption = options.whileElementsMounted;
  const openOption = computed(() => {
    var _toValue;
    return (_toValue = toValue(options.open)) != null ? _toValue : true;
  });
  const middlewareOption = computed(() => toValue(options.middleware));
  const placementOption = computed(() => {
    var _toValue2;
    return (_toValue2 = toValue(options.placement)) != null ? _toValue2 : 'bottom';
  });
  const strategyOption = computed(() => {
    var _toValue3;
    return (_toValue3 = toValue(options.strategy)) != null ? _toValue3 : 'absolute';
  });
  const transformOption = computed(() => {
    var _toValue4;
    return (_toValue4 = toValue(options.transform)) != null ? _toValue4 : true;
  });
  const referenceElement = computed(() => unwrapElement(reference.value));
  const floatingElement = computed(() => unwrapElement(floating.value));
  const x = ref(0);
  const y = ref(0);
  const strategy = ref(strategyOption.value);
  const placement = ref(placementOption.value);
  const middlewareData = shallowRef({});
  const isPositioned = ref(false);
  const floatingStyles = computed(() => {
    const initialStyles = {
      position: strategy.value,
      left: '0',
      top: '0'
    };
    if (!floatingElement.value) {
      return initialStyles;
    }
    const xVal = roundByDPR(floatingElement.value, x.value);
    const yVal = roundByDPR(floatingElement.value, y.value);
    if (transformOption.value) {
      return {
        ...initialStyles,
        transform: "translate(" + xVal + "px, " + yVal + "px)",
        ...(getDPR(floatingElement.value) >= 1.5 && {
          willChange: 'transform'
        })
      };
    }
    return {
      position: strategy.value,
      left: xVal + "px",
      top: yVal + "px"
    };
  });
  let whileElementsMountedCleanup;
  function update() {
    if (referenceElement.value == null || floatingElement.value == null) {
      return;
    }
    const open = openOption.value;
    computePosition(referenceElement.value, floatingElement.value, {
      middleware: middlewareOption.value,
      placement: placementOption.value,
      strategy: strategyOption.value
    }).then(position => {
      x.value = position.x;
      y.value = position.y;
      strategy.value = position.strategy;
      placement.value = position.placement;
      middlewareData.value = position.middlewareData;
      /**
       * The floating element's position may be recomputed while it's closed
       * but still mounted (such as when transitioning out). To ensure
       * `isPositioned` will be `false` initially on the next open, avoid
       * setting it to `true` when `open === false` (must be specified).
       */
      isPositioned.value = open !== false;
    });
  }
  function cleanup() {
    if (typeof whileElementsMountedCleanup === 'function') {
      whileElementsMountedCleanup();
      whileElementsMountedCleanup = undefined;
    }
  }
  function attach() {
    cleanup();
    if (whileElementsMountedOption === undefined) {
      update();
      return;
    }
    if (referenceElement.value != null && floatingElement.value != null) {
      whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
      return;
    }
  }
  function reset() {
    if (!openOption.value) {
      isPositioned.value = false;
    }
  }
  watch([middlewareOption, placementOption, strategyOption, openOption], update, {
    flush: 'sync'
  });
  watch([referenceElement, floatingElement], attach, {
    flush: 'sync'
  });
  watch(openOption, reset, {
    flush: 'sync'
  });
  if (getCurrentScope()) {
    onScopeDispose(cleanup);
  }
  return {
    x: shallowReadonly(x),
    y: shallowReadonly(y),
    strategy: shallowReadonly(strategy),
    placement: shallowReadonly(placement),
    middlewareData: shallowReadonly(middlewareData),
    isPositioned: shallowReadonly(isPositioned),
    floatingStyles,
    update
  };
}

/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */


/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = 1000;

/**
 * @constant
 * @name constructFromSymbol
 * @summary Symbol enabling Date extensions to inherit properties from the reference date.
 *
 * The symbol is used to enable the `constructFrom` function to construct a date
 * using a reference date and a value. It allows to transfer extra properties
 * from the reference date to the new date. It's useful for extensions like
 * [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
 * a constructor argument.
 */
const constructFromSymbol = Symbol.for("constructDateFrom");

/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from "./constructFrom/date-fns";
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date>(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use constructor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   );
 * }
 */
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);

  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);

  if (date instanceof Date) return new date.constructor(value);

  return new Date(value);
}

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument, context) {
  // [TODO] Get rid of `toDate` or `constructFrom`?
  return constructFrom(context || argument, argument);
}

/**
 * The {@link addDays} function options.
 */

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 * @param options - An object with options
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(options?.in || date, NaN);

  // If 0 days, no-op to avoid changing times in the hour before end of DST
  if (!amount) return _date;

  _date.setDate(_date.getDate() + amount);
  return _date;
}

/**
 * The {@link addMonths} function options.
 */

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be added.
 * @param options - The options object
 *
 * @returns The new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 *
 * // Add one month to 30 January 2023:
 * const result = addMonths(new Date(2023, 0, 30), 1)
 * //=> Tue Feb 28 2023 00:00:00
 */
function addMonths(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(date, NaN);
  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return _date;
  }
  const dayOfMonth = _date.getDate();

  // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.
  const endOfDesiredMonth = constructFrom(date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth,
    );
    return _date;
  }
}

/**
 * The {@link add} function options.
 */

/**
 * @name add
 * @category Common Helpers
 * @summary Add the specified years, months, weeks, days, hours, minutes, and seconds to the given date.
 *
 * @description
 * Add the specified years, months, weeks, days, hours, minutes, and seconds to the given date.
 *
 * @typeParam DateType - The `Date` type the function operates on. Gets inferred from passed arguments. Allows using extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes, and seconds to be added.
 * @param options - An object with options
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add the following duration to 1 September 2014, 10:19:50
 * const result = add(new Date(2014, 8, 1, 10, 19, 50), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30,
 * })
 * //=> Thu Jun 15 2017 15:29:20
 */
function add(date, duration, options) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = duration;

  // Add years and months
  const _date = toDate(date, options?.in);
  const dateWithMonths =
    months || years ? addMonths(_date, months + years * 12) : _date;

  // Add weeks and days
  const dateWithDays =
    days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;

  // Add days, hours, minutes, and seconds
  const minutesToAdd = minutes + hours * 60;
  const secondsToAdd = seconds + minutesToAdd * 60;
  const msToAdd = secondsToAdd * 1000;

  return constructFrom(date, +dateWithDays + msToAdd);
}

let defaultOptions = {};

function getDefaultOptions$1() {
  return defaultOptions;
}

/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = getDefaultOptions$1();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

/**
 * The {@link startOfISOWeek} function options.
 */

/**
 * @name startOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}

/**
 * The {@link getISOWeekYear} function options.
 */

/**
 * @name getISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();

  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);

  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);

  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    dates.find((date) => typeof date === "object"),
  );
  return dates.map(normalize);
}

/**
 * The {@link startOfDay} function options.
 */

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

/**
 * The {@link differenceInCalendarDays} function options.
 */

/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - The options object
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);

  const laterTimestamp =
    +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp =
    +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);

  // Round the number of days to the nearest integer because the number of
  // milliseconds in a day is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}

/**
 * The {@link startOfISOWeekYear} function options.
 */

/**
 * @name startOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an ISO week-numbering year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

/**
 * The {@link addQuarters} function options.
 */

/**
 * @name addQuarters
 * @category Quarter Helpers
 * @summary Add the specified number of year quarters to the given date.
 *
 * @description
 * Add the specified number of year quarters to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be added.
 * @param options - An object with options
 *
 * @returns The new date with the quarters added
 *
 * @example
 * // Add 1 quarter to 1 September 2014:
 * const result = addQuarters(new Date(2014, 8, 1), 1)
 * //=; Mon Dec 01 2014 00:00:00
 */
function addQuarters(date, amount, options) {
  return addMonths(date, amount * 3, options);
}

/**
 * The {@link addYears} function options.
 */

/**
 * @name addYears
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of years to be added.
 * @param options - The options
 *
 * @returns The new date with the years added
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * const result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears(date, amount, options) {
  return addMonths(date, amount * 12, options);
}

/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc(dateLeft, dateRight) {
  const diff = +toDate(dateLeft) - +toDate(dateRight);

  if (diff < 0) return -1;
  else if (diff > 0) return 1;

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}

/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a date
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
function isDate(value) {
  return (
    value instanceof Date ||
    (typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Date]")
  );
}

/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param date - The date to check
 *
 * @returns The date is valid
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertible into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
function isValid(date) {
  return !((!isDate(date) && typeof date !== "number") || isNaN(+toDate(date)));
}

/**
 * The {@link getQuarter} function options.
 */

/**
 * @name getQuarter
 * @category Quarter Helpers
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The quarter
 *
 * @example
 * // Which quarter is 2 July 2014?
 * const result = getQuarter(new Date(2014, 6, 2));
 * //=> 3
 */
function getQuarter(date, options) {
  const _date = toDate(date, options?.in);
  const quarter = Math.trunc(_date.getMonth() / 3) + 1;
  return quarter;
}

/**
 * The {@link differenceInCalendarYears} function options.
 */

/**
 * @name differenceInCalendarYears
 * @category Year Helpers
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options

 * @returns The number of calendar years
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * );
 * //=> 2
 */
function differenceInCalendarYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  return laterDate_.getFullYear() - earlierDate_.getFullYear();
}

function getRoundingMethod(method) {
  return (number) => {
    const round = method ? Math[method] : Math.trunc;
    const result = round(number);
    // Prevent negative zero
    return result === 0 ? 0 : result;
  };
}

/**
 * The {@link differenceInYears} function options.
 */

/**
 * @name differenceInYears
 * @category Year Helpers
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full years
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
 * //=> 1
 */
function differenceInYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  // -1 if the left date is earlier than the right date
  // 2023-12-31 - 2024-01-01 = -1
  const sign = compareAsc(laterDate_, earlierDate_);

  // First calculate the difference in calendar years
  // 2024-01-01 - 2023-12-31 = 1 year
  const diff = Math.abs(differenceInCalendarYears(laterDate_, earlierDate_));

  // Now we need to calculate if the difference is full. To do that we set
  // both dates to the same year and check if the both date's month and day
  // form a full year.
  laterDate_.setFullYear(1584);
  earlierDate_.setFullYear(1584);

  // For it to be true, when the later date is indeed later than the earlier date
  // (2026-02-01 - 2023-12-10 = 3 years), the difference is full if
  // the normalized later date is also later than the normalized earlier date.
  // In our example, 1584-02-01 is earlier than 1584-12-10, so the difference
  // is partial, hence we need to subtract 1 from the difference 3 - 1 = 2.
  const partial = compareAsc(laterDate_, earlierDate_) === -sign;

  const result = sign * (diff - +partial);

  // Prevent negative zero
  return result === 0 ? 0 : result;
}

function normalizeInterval(context, interval) {
  const [start, end] = normalizeDates(context, interval.start, interval.end);
  return { start, end };
}

/**
 * The {@link eachDayOfInterval} function options.
 */

/**
 * The {@link eachDayOfInterval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name eachDayOfInterval
 * @category Interval Helpers
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of days from the day of the interval start to the day of the interval end
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * const result = eachDayOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 9, 10)
 * })
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
function eachDayOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);

  let step = 1;

  const dates = [];

  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date.setDate(date.getDate() + step);
    date.setHours(0, 0, 0, 0);
  }

  return reversed ? dates.reverse() : dates;
}

/**
 * The {@link startOfQuarter} function options.
 */

/**
 * @name startOfQuarter
 * @category Quarter Helpers
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a quarter
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */
function startOfQuarter(date, options) {
  const _date = toDate(date, options?.in);
  const currentMonth = _date.getMonth();
  const month = currentMonth - (currentMonth % 3);
  _date.setMonth(month, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

/**
 * The {@link eachQuarterOfInterval} function options.
 */

/**
 * The {@link eachQuarterOfInterval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name eachQuarterOfInterval
 * @category Interval Helpers
 * @summary Return the array of quarters within the specified time interval.
 *
 * @description
 * Return the array of quarters within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval
 * @param options - An object with options
 *
 * @returns The array with starts of quarters from the quarter of the interval start to the quarter of the interval end
 *
 * @example
 * // Each quarter within interval 6 February 2014 - 10 August 2014:
 * const result = eachQuarterOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10),
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * // ]
 */
function eachQuarterOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);

  let reversed = +start > +end;
  const endTime = reversed ? +startOfQuarter(start) : +startOfQuarter(end);
  let date = reversed ? startOfQuarter(end) : startOfQuarter(start);

  let step = 1;

  const dates = [];

  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date = addQuarters(date, step);
  }

  return reversed ? dates.reverse() : dates;
}

/**
 * The {@link startOfMonth} function options.
 */

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date. The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments.
 * Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed,
 * or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  _date.setDate(1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

/**
 * The {@link endOfYear} function options.
 */

/**
 * @name endOfYear
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
function endOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  _date.setFullYear(year + 1, 0, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

/**
 * The {@link startOfYear} function options.
 */

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}

/**
 * The {@link endOfWeek} function options.
 */

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(date, options) {
  const defaultOptions = getDefaultOptions$1();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

/**
 * The {@link endOfQuarter} function options.
 */

/**
 * @name endOfQuarter
 * @category Quarter Helpers
 * @summary Return the end of a year quarter for the given date.
 *
 * @description
 * Return the end of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a quarter
 *
 * @example
 * // The end of a quarter for 2 September 2014 11:55:00:
 * const result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfQuarter(date, options) {
  const _date = toDate(date, options?.in);
  const currentMonth = _date.getMonth();
  const month = currentMonth - (currentMonth % 3) + 3;
  _date.setMonth(month, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds",
  },

  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds",
  },

  halfAMinute: "half a minute",

  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes",
  },

  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes",
  },

  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours",
  },

  xHours: {
    one: "1 hour",
    other: "{{count}} hours",
  },

  xDays: {
    one: "1 day",
    other: "{{count}} days",
  },

  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks",
  },

  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks",
  },

  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months",
  },

  xMonths: {
    one: "1 month",
    other: "{{count}} months",
  },

  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years",
  },

  xYears: {
    one: "1 year",
    other: "{{count}} years",
  },

  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years",
  },

  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years",
  },
};

const formatDistance = (token, count, options) => {
  let result;

  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }

  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }

  return result;
};

function buildFormatLongFn(args) {
  return (options = {}) => {
    // TODO: Remove String()
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy",
};

const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a",
};

const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}",
};

const formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full",
  }),

  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full",
  }),

  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full",
  }),
};

const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P",
};

const formatRelative = (token, _date, _baseDate, _options) =>
  formatRelativeLocale[token];

/**
 * The localize function argument callback which allows to convert raw value to
 * the actual type.
 *
 * @param value - The value to convert
 *
 * @returns The converted value
 */

/**
 * The map of localized values for each width.
 */

/**
 * The index type of the locale unit value. It types conversion of units of
 * values that don't start at 0 (i.e. quarters).
 */

/**
 * Converts the unit value to the tuple of values.
 */

/**
 * The tuple of localized era values. The first element represents BC,
 * the second element represents AD.
 */

/**
 * The tuple of localized quarter values. The first element represents Q1.
 */

/**
 * The tuple of localized day values. The first element represents Sunday.
 */

/**
 * The tuple of localized month values. The first element represents January.
 */

function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";

    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;

      valuesArray =
        args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;

    // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}

const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"],
};

const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
};

const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};

const localize = {
  ordinalNumber,

  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide",
  }),

  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1,
  }),

  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide",
  }),

  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide",
  }),

  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide",
  }),
};

function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;

    const matchPattern =
      (width && args.matchPatterns[width]) ||
      args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];

    const parsePatterns =
      (width && args.parsePatterns[width]) ||
      args.parsePatterns[args.defaultParseWidth];

    const key = Array.isArray(parsePatterns)
      ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
      : // [TODO] -- I challenge you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString));

    let value;

    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback
      ? // [TODO] -- I challenge you to fix the type
        options.valueCallback(value)
      : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

function findKey(object, predicate) {
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      predicate(object[key])
    ) {
      return key;
    }
  }
  return undefined;
}

function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}

function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];

    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback
      ? args.valueCallback(parseResult[0])
      : parseResult[0];

    // [TODO] I challenge you to fix the type
    value = options.valueCallback ? options.valueCallback(value) : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i,
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i],
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i],
};

const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],

  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],
};

const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
};

const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i,
  },
};

const match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10),
  }),

  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any",
  }),

  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1,
  }),

  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any",
  }),

  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any",
  }),

  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any",
  }),
};

/**
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */
const enUS = {
  code: "en-US",
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
};

/**
 * The {@link getDayOfYear} function options.
 */

/**
 * @name getDayOfYear
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

/**
 * The {@link getISOWeek} function options.
 */

/**
 * @name getISOWeek
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / millisecondsInWeek) + 1;
}

/**
 * The {@link getWeekYear} function options.
 */

/**
 * @name getWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The local week-numbering year
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * const result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();

  const defaultOptions = getDefaultOptions$1();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);

  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);

  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}

/**
 * The {@link startOfWeekYear} function options.
 */

/**
 * @name startOfWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week-numbering year
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfWeekYear(date, options) {
  const defaultOptions = getDefaultOptions$1();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

/**
 * The {@link getWeek} function options.
 */

/**
 * @name getWeek
 * @category Week Helpers
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * const result = getWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * const result = getWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / millisecondsInWeek) + 1;
}

function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

const lightFormatters = {
  // Year
  y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    const signedYear = date.getFullYear();
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },

  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },

  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },

  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },

  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },

  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },

  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },

  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },

  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3),
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  },
};

const dayPeriodEnum = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
};

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

const formatters = {
  // Era
  G: function (date, token, localize) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize.era(era, { width: "wide" });
    }
  },

  // Year
  y: function (date, token, localize) {
    // Ordinal number
    if (token === "yo") {
      const signedYear = date.getFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, { unit: "year" });
    }

    return lightFormatters.y(date, token);
  },

  // Local week-numbering year
  Y: function (date, token, localize, options) {
    const signedWeekYear = getWeekYear(date, options);
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

    // Two digit year
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }

    // Ordinal number
    if (token === "Yo") {
      return localize.ordinalNumber(weekYear, { unit: "year" });
    }

    // Padding
    return addLeadingZeros(weekYear, token.length);
  },

  // ISO week-numbering year
  R: function (date, token) {
    const isoWeekYear = getISOWeekYear(date);

    // Padding
    return addLeadingZeros(isoWeekYear, token.length);
  },

  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },

  // Quarter
  Q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "formatting",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone quarter
  q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "standalone",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // Month
  M: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize.month(month, {
          width: "abbreviated",
          context: "formatting",
        });
      // J, F, ..., D
      case "MMMMM":
        return localize.month(month, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize.month(month, { width: "wide", context: "formatting" });
    }
  },

  // Stand-alone month
  L: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize.month(month, {
          width: "abbreviated",
          context: "standalone",
        });
      // J, F, ..., D
      case "LLLLL":
        return localize.month(month, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize.month(month, { width: "wide", context: "standalone" });
    }
  },

  // Local week of year
  w: function (date, token, localize, options) {
    const week = getWeek(date, options);

    if (token === "wo") {
      return localize.ordinalNumber(week, { unit: "week" });
    }

    return addLeadingZeros(week, token.length);
  },

  // ISO week of year
  I: function (date, token, localize) {
    const isoWeek = getISOWeek(date);

    if (token === "Io") {
      return localize.ordinalNumber(isoWeek, { unit: "week" });
    }

    return addLeadingZeros(isoWeek, token.length);
  },

  // Day of the month
  d: function (date, token, localize) {
    if (token === "do") {
      return localize.ordinalNumber(date.getDate(), { unit: "date" });
    }

    return lightFormatters.d(date, token);
  },

  // Day of year
  D: function (date, token, localize) {
    const dayOfYear = getDayOfYear(date);

    if (token === "Do") {
      return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }

    return addLeadingZeros(dayOfYear, token.length);
  },

  // Day of week
  E: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "EEEEE":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "EEEE":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Local day of week
  e: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "eeeee":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "eeee":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone",
        });
      // T
      case "ccccc":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "standalone",
        });
      // Tuesday
      case "cccc":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // ISO day of week
  i: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "iiiii":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "iiiiii":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "iiii":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM or PM
  a: function (date, token, localize) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "aaa":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "aaaaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }

    switch (token) {
      case "b":
      case "bb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "bbb":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "bbbbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "BBBBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return lightFormatters.h(date, token);
  },

  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === "Ho") {
      return localize.ordinalNumber(date.getHours(), { unit: "hour" });
    }

    return lightFormatters.H(date, token);
  },

  // Hour [0-11]
  K: function (date, token, localize) {
    const hours = date.getHours() % 12;

    if (token === "Ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return addLeadingZeros(hours, token.length);
  },

  // Hour [1-24]
  k: function (date, token, localize) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;

    if (token === "ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return addLeadingZeros(hours, token.length);
  },

  // Minute
  m: function (date, token, localize) {
    if (token === "mo") {
      return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }

    return lightFormatters.m(date, token);
  },

  // Second
  s: function (date, token, localize) {
    if (token === "so") {
      return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
    }

    return lightFormatters.s(date, token);
  },

  // Fraction of second
  S: function (date, token) {
    return lightFormatters.S(date, token);
  },

  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return "Z";
    }

    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (GMT)
  O: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (specific non-location)
  z: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Seconds timestamp
  t: function (date, token, _localize) {
    const timestamp = Math.trunc(+date / 1000);
    return addLeadingZeros(timestamp, token.length);
  },

  // Milliseconds timestamp
  T: function (date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  },
};

function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}

function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}

function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

const dateLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "P":
      return formatLong.date({ width: "short" });
    case "PP":
      return formatLong.date({ width: "medium" });
    case "PPP":
      return formatLong.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong.date({ width: "full" });
  }
};

const timeLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "p":
      return formatLong.time({ width: "short" });
    case "pp":
      return formatLong.time({ width: "medium" });
    case "ppp":
      return formatLong.time({ width: "long" });
    case "pppp":
    default:
      return formatLong.time({ width: "full" });
  }
};

const dateTimeLongFormatter = (pattern, formatLong) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  let dateTimeFormat;

  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong.dateTime({ width: "full" });
      break;
  }

  return dateTimeFormat
    .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
    .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};

const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter,
};

const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;

const throwTokens = ["D", "DD", "YY", "YYYY"];

function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}

function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}

function warnOrThrowProtectedError(token, format, input) {
  const _message = message(token, format, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}

function message(token, format, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp$1 =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp$1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp$1 = /^'([^]*?)'?$/;
const doubleQuoteRegExp$1 = /''/g;
const unescapedLatinCharacterRegExp$1 = /[a-zA-Z]/;

/**
 * The {@link format} function options.
 */

/**
 * @name format
 * @alias formatDate
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
 *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @param date - The original date
 * @param format - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `localize` property
 * @throws `options.locale` must contain `formatLong` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
function format(date, formatStr, options) {
  const defaultOptions = getDefaultOptions$1();
  const locale = options?.locale ?? defaultOptions.locale ?? enUS;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const originalDate = toDate(date, options?.in);

  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }

  let parts = formatStr
    .match(longFormattingTokensRegExp$1)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        const longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp$1)
    .map((substring) => {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return { isToken: false, value: "'" };
      }

      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString$1(substring) };
      }

      if (formatters[firstCharacter]) {
        return { isToken: true, value: substring };
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp$1)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      return { isToken: false, value: substring };
    });

  // invoke localize preprocessor (only for french locales at the moment)
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }

  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  return parts
    .map((part) => {
      if (!part.isToken) return part.value;

      const token = part.value;

      if (
        (!options?.useAdditionalWeekYearTokens &&
          isProtectedWeekYearToken(token)) ||
        (!options?.useAdditionalDayOfYearTokens &&
          isProtectedDayOfYearToken(token))
      ) {
        warnOrThrowProtectedError(token, formatStr, String(date));
      }

      const formatter = formatters[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    })
    .join("");
}

function cleanEscapedString$1(input) {
  const matched = input.match(escapedStringRegExp$1);

  if (!matched) {
    return input;
  }

  return matched[1].replace(doubleQuoteRegExp$1, "'");
}

/**
 * The {@link getDay} function options.
 */

/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The day of week, 0 represents Sunday
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
function getDay(date, options) {
  return toDate(date, options?.in).getDay();
}

/**
 * The {@link getDaysInMonth} function options.
 */

/**
 * @name getDaysInMonth
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date, considering the context if provided.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * const result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const monthIndex = _date.getMonth();
  const lastDayOfMonth = constructFrom(_date, 0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

/**
 * @name getDefaultOptions
 * @category Common Helpers
 * @summary Get default options.
 * @pure false
 *
 * @description
 * Returns an object that contains defaults for
 * `options.locale`, `options.weekStartsOn` and `options.firstWeekContainsDate`
 * arguments for all functions.
 *
 * You can change these with [setDefaultOptions](https://date-fns.org/docs/setDefaultOptions).
 *
 * @returns The default options
 *
 * @example
 * const result = getDefaultOptions()
 * //=> {}
 *
 * @example
 * setDefaultOptions({ weekStarsOn: 1, firstWeekContainsDate: 4 })
 * const result = getDefaultOptions()
 * //=> { weekStarsOn: 1, firstWeekContainsDate: 4 }
 */
function getDefaultOptions() {
  return Object.assign({}, getDefaultOptions$1());
}

/**
 * The {@link getHours} function options.
 */

/**
 * @name getHours
 * @category Hour Helpers
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The hours
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * const result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */
function getHours(date, options) {
  return toDate(date, options?.in).getHours();
}

/**
 * The {@link getISODay} function options.
 */

/**
 * @name getISODay
 * @category Weekday Helpers
 * @summary Get the day of the ISO week of the given date.
 *
 * @description
 * Get the day of the ISO week of the given date,
 * which is 7 for Sunday, 1 for Monday etc.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The day of ISO week
 *
 * @example
 * // Which day of the ISO week is 26 February 2012?
 * const result = getISODay(new Date(2012, 1, 26))
 * //=> 7
 */
function getISODay(date, options) {
  const day = toDate(date, options?.in).getDay();
  return day === 0 ? 7 : day;
}

/**
 * The {@link getMinutes} function options.
 */

/**
 * @name getMinutes
 * @category Minute Helpers
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The minutes
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */
function getMinutes(date, options) {
  return toDate(date, options?.in).getMinutes();
}

/**
 * The {@link getMonth} function options.
 */

/**
 * @name getMonth
 * @category Month Helpers
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The month index (0-11)
 *
 * @example
 * // Which month is 29 February 2012?
 * const result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
function getMonth(date, options) {
  return toDate(date, options?.in).getMonth();
}

/**
 * @name getSeconds
 * @category Second Helpers
 * @summary Get the seconds of the given date.
 *
 * @description
 * Get the seconds of the given date.
 *
 * @param date - The given date
 *
 * @returns The seconds
 *
 * @example
 * // Get the seconds of 29 February 2012 11:45:05.123:
 * const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 5
 */
function getSeconds(date) {
  return toDate(date).getSeconds();
}

/**
 * The {@link getYear} function options.
 */

/**
 * @name getYear
 * @category Year Helpers
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The year
 *
 * @example
 * // Which year is 2 July 2014?
 * const result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
function getYear(date, options) {
  return toDate(date, options?.in).getFullYear();
}

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param date - The date that should be after the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is after the second date
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * const result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter(date, dateToCompare) {
  return +toDate(date) > +toDate(dateToCompare);
}

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param date - The date that should be before the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore(date, dateToCompare) {
  return +toDate(date) < +toDate(dateToCompare);
}

/**
 * @name isEqual
 * @category Common Helpers
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The dates are equal
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * const result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
function isEqual(leftDate, rightDate) {
  return +toDate(leftDate) === +toDate(rightDate);
}

/**
 * @name transpose
 * @category Generic Helpers
 * @summary Transpose the date to the given constructor.
 *
 * @description
 * The function transposes the date to the given constructor. It helps you
 * to transpose the date in the system time zone to say `UTCDate` or any other
 * date extension.
 *
 * @typeParam InputDate - The input `Date` type derived from the passed argument.
 * @typeParam ResultDate - The result `Date` type derived from the passed constructor.
 *
 * @param date - The date to use values from
 * @param constructor - The date constructor to use
 *
 * @returns Date transposed to the given constructor
 *
 * @example
 * // Create July 10, 2022 00:00 in locale time zone
 * const date = new Date(2022, 6, 10)
 * //=> 'Sun Jul 10 2022 00:00:00 GMT+0800 (Singapore Standard Time)'
 *
 * @example
 * // Transpose the date to July 10, 2022 00:00 in UTC
 * transpose(date, UTCDate)
 * //=> 'Sun Jul 10 2022 00:00:00 GMT+0000 (Coordinated Universal Time)'
 */
function transpose(date, constructor) {
  const date_ = isConstructor(constructor)
    ? new constructor(0)
    : constructFrom(constructor, 0);
  date_.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  date_.setHours(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );
  return date_;
}

function isConstructor(constructor) {
  return (
    typeof constructor === "function" &&
    constructor.prototype?.constructor === constructor
  );
}

const TIMEZONE_UNIT_PRIORITY = 10;

class Setter {
  subPriority = 0;

  validate(_utcDate, _options) {
    return true;
  }
}

class ValueSetter extends Setter {
  constructor(
    value,

    validateValue,

    setValue,

    priority,
    subPriority,
  ) {
    super();
    this.value = value;
    this.validateValue = validateValue;
    this.setValue = setValue;
    this.priority = priority;
    if (subPriority) {
      this.subPriority = subPriority;
    }
  }

  validate(date, options) {
    return this.validateValue(date, this.value, options);
  }

  set(date, flags, options) {
    return this.setValue(date, flags, this.value, options);
  }
}

class DateTimezoneSetter extends Setter {
  priority = TIMEZONE_UNIT_PRIORITY;
  subPriority = -1;

  constructor(context, reference) {
    super();
    this.context = context || ((date) => constructFrom(reference, date));
  }

  set(date, flags) {
    if (flags.timestampIsSet) return date;
    return constructFrom(date, transpose(date, this.context));
  }
}

class Parser {
  run(dateString, token, match, options) {
    const result = this.parse(dateString, token, match, options);
    if (!result) {
      return null;
    }

    return {
      setter: new ValueSetter(
        result.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority,
      ),
      rest: result.rest,
    };
  }

  validate(_utcDate, _value, _options) {
    return true;
  }
}

class EraParser extends Parser {
  priority = 140;

  parse(dateString, token, match) {
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return (
          match.era(dateString, { width: "abbreviated" }) ||
          match.era(dateString, { width: "narrow" })
        );

      // A, B
      case "GGGGG":
        return match.era(dateString, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return (
          match.era(dateString, { width: "wide" }) ||
          match.era(dateString, { width: "abbreviated" }) ||
          match.era(dateString, { width: "narrow" })
        );
    }
  }

  set(date, flags, value) {
    flags.era = value;
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["R", "u", "t", "T"];
}

const numericPatterns = {
  month: /^(1[0-2]|0?\d)/, // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/, // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/, // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/, // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/, // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/, // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/, // 0 to 12
  minute: /^[0-5]?\d/, // 0 to 59
  second: /^[0-5]?\d/, // 0 to 59

  singleDigit: /^\d/, // 0 to 9
  twoDigits: /^\d{1,2}/, // 0 to 99
  threeDigits: /^\d{1,3}/, // 0 to 999
  fourDigits: /^\d{1,4}/, // 0 to 9999

  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/, // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/, // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/, // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/, // 0 to 9999, -0 to -9999
};

const timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/,
};

function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }

  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest,
  };
}

function parseNumericPattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);

  if (!matchResult) {
    return null;
  }

  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length),
  };
}

function parseTimezonePattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);

  if (!matchResult) {
    return null;
  }

  // Input is 'Z'
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1),
    };
  }

  const sign = matchResult[1] === "+" ? 1 : -1;
  const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;

  return {
    value:
      sign *
      (hours * millisecondsInHour +
        minutes * millisecondsInMinute +
        seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length),
  };
}

function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}

function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}

function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}

function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}

function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  const isCommonEra = currentYear > 0;
  // Absolute number of the current year:
  // 1 -> 1 AC
  // 0 -> 1 BC
  // -1 -> 2 BC
  const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;

  let result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    const rangeEnd = absCurrentYear + 50;
    const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
    const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }

  return isCommonEra ? result : 1 - result;
}

function isLeapYearIndex(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

// From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
// | Year     |     y | yy |   yyy |  yyyy | yyyyy |
// |----------|-------|----|-------|-------|-------|
// | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
// | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
// | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
// | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
// | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
class YearParser extends Parser {
  priority = 130;
  incompatibleTokens = ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"];

  parse(dateString, token, match) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "yy",
    });

    switch (token) {
      case "y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "yo":
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: "year",
          }),
          valueCallback,
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }

  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }

  set(date, flags, value) {
    const currentYear = date.getFullYear();

    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear,
      );
      date.setFullYear(normalizedTwoDigitYear, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    const year =
      !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}

// Local week-numbering year
class LocalWeekYearParser extends Parser {
  priority = 130;

  parse(dateString, token, match) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "YY",
    });

    switch (token) {
      case "Y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "Yo":
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: "year",
          }),
          valueCallback,
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }

  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }

  set(date, flags, value, options) {
    const currentYear = getWeekYear(date, options);

    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear,
      );
      date.setFullYear(
        normalizedTwoDigitYear,
        0,
        options.firstWeekContainsDate,
      );
      date.setHours(0, 0, 0, 0);
      return startOfWeek(date, options);
    }

    const year =
      !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, options.firstWeekContainsDate);
    date.setHours(0, 0, 0, 0);
    return startOfWeek(date, options);
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T",
  ];
}

// ISO week-numbering year
class ISOWeekYearParser extends Parser {
  priority = 130;

  parse(dateString, token) {
    if (token === "R") {
      return parseNDigitsSigned(4, dateString);
    }

    return parseNDigitsSigned(token.length, dateString);
  }

  set(date, _flags, value) {
    const firstWeekOfYear = constructFrom(date, 0);
    firstWeekOfYear.setFullYear(value, 0, 4);
    firstWeekOfYear.setHours(0, 0, 0, 0);
    return startOfISOWeek(firstWeekOfYear);
  }

  incompatibleTokens = [
    "G",
    "y",
    "Y",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T",
  ];
}

class ExtendedYearParser extends Parser {
  priority = 130;

  parse(dateString, token) {
    if (token === "u") {
      return parseNDigitsSigned(4, dateString);
    }

    return parseNDigitsSigned(token.length, dateString);
  }

  set(date, _flags, value) {
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"];
}

class QuarterParser extends Parser {
  priority = 120;

  parse(dateString, token, match) {
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
      case "QQ": // 01, 02, 03, 04
        return parseNDigits(token.length, dateString);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return match.ordinalNumber(dateString, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return (
          match.quarter(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return match.quarter(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return (
          match.quarter(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.quarter(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 4;
  }

  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}

class StandAloneQuarterParser extends Parser {
  priority = 120;

  parse(dateString, token, match) {
    switch (token) {
      // 1, 2, 3, 4
      case "q":
      case "qq": // 01, 02, 03, 04
        return parseNDigits(token.length, dateString);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return match.ordinalNumber(dateString, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return (
          match.quarter(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "standalone",
          })
        );

      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return match.quarter(dateString, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return (
          match.quarter(dateString, {
            width: "wide",
            context: "standalone",
          }) ||
          match.quarter(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "standalone",
          })
        );
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 4;
  }

  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}

class MonthParser extends Parser {
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "L",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];

  priority = 110;

  parse(dateString, token, match) {
    const valueCallback = (value) => value - 1;

    switch (token) {
      // 1, 2, ..., 12
      case "M":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback,
        );
      // 01, 02, ..., 12
      case "MM":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: "month",
          }),
          valueCallback,
        );
      // Jan, Feb, ..., Dec
      case "MMM":
        return (
          match.month(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.month(dateString, { width: "narrow", context: "formatting" })
        );

      // J, F, ..., D
      case "MMMMM":
        return match.month(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return (
          match.month(dateString, { width: "wide", context: "formatting" }) ||
          match.month(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.month(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}

class StandAloneMonthParser extends Parser {
  priority = 110;

  parse(dateString, token, match) {
    const valueCallback = (value) => value - 1;

    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback,
        );
      // 01, 02, ..., 12
      case "LL":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: "month",
          }),
          valueCallback,
        );
      // Jan, Feb, ..., Dec
      case "LLL":
        return (
          match.month(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.month(dateString, { width: "narrow", context: "standalone" })
        );

      // J, F, ..., D
      case "LLLLL":
        return match.month(dateString, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return (
          match.month(dateString, { width: "wide", context: "standalone" }) ||
          match.month(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.month(dateString, { width: "narrow", context: "standalone" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}

/**
 * The {@link setWeek} function options.
 */

/**
 * @name setWeek
 * @category Week Helpers
 * @summary Set the local week to the given date.
 *
 * @description
 * Set the local week to the given date, saving the weekday number.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param week - The week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the local week set
 *
 * @example
 * // Set the 1st week to 2 January 2005 with default options:
 * const result = setWeek(new Date(2005, 0, 2), 1)
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // Set the 1st week to 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January:
 * const result = setWeek(new Date(2005, 0, 2), 1, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sun Jan 4 2004 00:00:00
 */
function setWeek(date, week, options) {
  const date_ = toDate(date, options?.in);
  const diff = getWeek(date_, options) - week;
  date_.setDate(date_.getDate() - diff * 7);
  return toDate(date_, options?.in);
}

// Local week of year
class LocalWeekParser extends Parser {
  priority = 100;

  parse(dateString, token, match) {
    switch (token) {
      case "w":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "wo":
        return match.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 53;
  }

  set(date, _flags, value, options) {
    return startOfWeek(setWeek(date, value, options), options);
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T",
  ];
}

/**
 * The {@link setISOWeek} function options.
 */

/**
 * @name setISOWeek
 * @category ISO Week Helpers
 * @summary Set the ISO week to the given date.
 *
 * @description
 * Set the ISO week to the given date, saving the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The `Date` type of the context function.
 *
 * @param date - The date to be changed
 * @param week - The ISO week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the ISO week set
 *
 * @example
 * // Set the 53rd ISO week to 7 August 2004:
 * const result = setISOWeek(new Date(2004, 7, 7), 53)
 * //=> Sat Jan 01 2005 00:00:00
 */
function setISOWeek(date, week, options) {
  const _date = toDate(date, options?.in);
  const diff = getISOWeek(_date, options) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}

// ISO week of year
class ISOWeekParser extends Parser {
  priority = 100;

  parse(dateString, token, match) {
    switch (token) {
      case "I":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "Io":
        return match.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 53;
  }

  set(date, _flags, value) {
    return startOfISOWeek(setISOWeek(date, value));
  }

  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T",
  ];
}

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_MONTH_LEAP_YEAR = [
  31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];

// Day of the month
class DateParser extends Parser {
  priority = 90;
  subPriority = 1;

  parse(dateString, token, match) {
    switch (token) {
      case "d":
        return parseNumericPattern(numericPatterns.date, dateString);
      case "do":
        return match.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = isLeapYearIndex(year);
    const month = date.getMonth();
    if (isLeapYear) {
      return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
    } else {
      return value >= 1 && value <= DAYS_IN_MONTH[month];
    }
  }

  set(date, _flags, value) {
    date.setDate(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}

class DayOfYearParser extends Parser {
  priority = 90;

  subpriority = 1;

  parse(dateString, token, match) {
    switch (token) {
      case "D":
      case "DD":
        return parseNumericPattern(numericPatterns.dayOfYear, dateString);
      case "Do":
        return match.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = isLeapYearIndex(year);
    if (isLeapYear) {
      return value >= 1 && value <= 366;
    } else {
      return value >= 1 && value <= 365;
    }
  }

  set(date, _flags, value) {
    date.setMonth(0, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "E",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}

/**
 * The {@link setDay} function options.
 */

/**
 * @name setDay
 * @category Weekday Helpers
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param day - The day of the week of the new date
 * @param options - An object with options.
 *
 * @returns The new date with the day of the week set
 *
 * @example
 * // Set week day to Sunday, with the default weekStartsOn of Sunday:
 * const result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Set week day to Sunday, with a weekStartsOn of Monday:
 * const result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
function setDay(date, day, options) {
  const defaultOptions = getDefaultOptions$1();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const date_ = toDate(date, options?.in);
  const currentDay = date_.getDay();

  const remainder = day % 7;
  const dayIndex = (remainder + 7) % 7;

  const delta = 7 - weekStartsOn;
  const diff =
    day < 0 || day > 6
      ? day - ((currentDay + delta) % 7)
      : ((dayIndex + delta) % 7) - ((currentDay + delta) % 7);
  return addDays(date_, diff, options);
}

// Day of week
class DayParser extends Parser {
  priority = 90;

  parse(dateString, token, match) {
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return (
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // T
      case "EEEEE":
        return match.day(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return (
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // Tuesday
      case "EEEE":
      default:
        return (
          match.day(dateString, { width: "wide", context: "formatting" }) ||
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 6;
  }

  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["D", "i", "e", "c", "t", "T"];
}

// Local day of week
class LocalDayParser extends Parser {
  priority = 90;
  parse(dateString, token, match, options) {
    const valueCallback = (value) => {
      // We want here floor instead of trunc, so we get -7 for value 0 instead of 0
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
    };

    switch (token) {
      // 3
      case "e":
      case "ee": // 03
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      // 3rd
      case "eo":
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: "day",
          }),
          valueCallback,
        );
      // Tue
      case "eee":
        return (
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // T
      case "eeeee":
        return match.day(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return (
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // Tuesday
      case "eeee":
      default:
        return (
          match.day(dateString, { width: "wide", context: "formatting" }) ||
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 6;
  }

  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "c",
    "t",
    "T",
  ];
}

// Stand-alone local day of week
class StandAloneLocalDayParser extends Parser {
  priority = 90;

  parse(dateString, token, match, options) {
    const valueCallback = (value) => {
      // We want here floor instead of trunc, so we get -7 for value 0 instead of 0
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
    };

    switch (token) {
      // 3
      case "c":
      case "cc": // 03
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      // 3rd
      case "co":
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: "day",
          }),
          valueCallback,
        );
      // Tue
      case "ccc":
        return (
          match.day(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.day(dateString, { width: "short", context: "standalone" }) ||
          match.day(dateString, { width: "narrow", context: "standalone" })
        );

      // T
      case "ccccc":
        return match.day(dateString, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return (
          match.day(dateString, { width: "short", context: "standalone" }) ||
          match.day(dateString, { width: "narrow", context: "standalone" })
        );

      // Tuesday
      case "cccc":
      default:
        return (
          match.day(dateString, { width: "wide", context: "standalone" }) ||
          match.day(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.day(dateString, { width: "short", context: "standalone" }) ||
          match.day(dateString, { width: "narrow", context: "standalone" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 6;
  }

  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "e",
    "t",
    "T",
  ];
}

/**
 * The {@link setISODay} function options.
 */

/**
 * @name setISODay
 * @category Weekday Helpers
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday, etc.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param day - The day of the ISO week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the day of the ISO week set
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * const result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
function setISODay(date, day, options) {
  const date_ = toDate(date, options?.in);
  const currentDay = getISODay(date_, options);
  const diff = day - currentDay;
  return addDays(date_, diff, options);
}

// ISO day of week
class ISODayParser extends Parser {
  priority = 90;

  parse(dateString, token, match) {
    const valueCallback = (value) => {
      if (value === 0) {
        return 7;
      }
      return value;
    };

    switch (token) {
      // 2
      case "i":
      case "ii": // 02
        return parseNDigits(token.length, dateString);
      // 2nd
      case "io":
        return match.ordinalNumber(dateString, { unit: "day" });
      // Tue
      case "iii":
        return mapValue(
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
            match.day(dateString, {
              width: "short",
              context: "formatting",
            }) ||
            match.day(dateString, {
              width: "narrow",
              context: "formatting",
            }),
          valueCallback,
        );
      // T
      case "iiiii":
        return mapValue(
          match.day(dateString, {
            width: "narrow",
            context: "formatting",
          }),
          valueCallback,
        );
      // Tu
      case "iiiiii":
        return mapValue(
          match.day(dateString, {
            width: "short",
            context: "formatting",
          }) ||
            match.day(dateString, {
              width: "narrow",
              context: "formatting",
            }),
          valueCallback,
        );
      // Tuesday
      case "iiii":
      default:
        return mapValue(
          match.day(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
            match.day(dateString, {
              width: "abbreviated",
              context: "formatting",
            }) ||
            match.day(dateString, {
              width: "short",
              context: "formatting",
            }) ||
            match.day(dateString, {
              width: "narrow",
              context: "formatting",
            }),
          valueCallback,
        );
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 7;
  }

  set(date, _flags, value) {
    date = setISODay(date, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "E",
    "e",
    "c",
    "t",
    "T",
  ];
}

class AMPMParser extends Parser {
  priority = 80;

  parse(dateString, token, match) {
    switch (token) {
      case "a":
      case "aa":
      case "aaa":
        return (
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      case "aaaaa":
        return match.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return (
          match.dayPeriod(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["b", "B", "H", "k", "t", "T"];
}

class AMPMMidnightParser extends Parser {
  priority = 80;

  parse(dateString, token, match) {
    switch (token) {
      case "b":
      case "bb":
      case "bbb":
        return (
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      case "bbbbb":
        return match.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return (
          match.dayPeriod(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "B", "H", "k", "t", "T"];
}

// in the morning, in the afternoon, in the evening, at night
class DayPeriodParser extends Parser {
  priority = 80;

  parse(dateString, token, match) {
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return (
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      case "BBBBB":
        return match.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return (
          match.dayPeriod(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "b", "t", "T"];
}

class Hour1to12Parser extends Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "h":
        return parseNumericPattern(numericPatterns.hour12h, dateString);
      case "ho":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 12;
  }

  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else if (!isPM && value === 12) {
      date.setHours(0, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }

  incompatibleTokens = ["H", "K", "k", "t", "T"];
}

class Hour0to23Parser extends Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "H":
        return parseNumericPattern(numericPatterns.hour23h, dateString);
      case "Ho":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 23;
  }

  set(date, _flags, value) {
    date.setHours(value, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "b", "h", "K", "k", "t", "T"];
}

class Hour0To11Parser extends Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "K":
        return parseNumericPattern(numericPatterns.hour11h, dateString);
      case "Ko":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }

  incompatibleTokens = ["h", "H", "k", "t", "T"];
}

class Hour1To24Parser extends Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "k":
        return parseNumericPattern(numericPatterns.hour24h, dateString);
      case "ko":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 24;
  }

  set(date, _flags, value) {
    const hours = value <= 24 ? value % 24 : value;
    date.setHours(hours, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "b", "h", "H", "K", "t", "T"];
}

class MinuteParser extends Parser {
  priority = 60;

  parse(dateString, token, match) {
    switch (token) {
      case "m":
        return parseNumericPattern(numericPatterns.minute, dateString);
      case "mo":
        return match.ordinalNumber(dateString, { unit: "minute" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 59;
  }

  set(date, _flags, value) {
    date.setMinutes(value, 0, 0);
    return date;
  }

  incompatibleTokens = ["t", "T"];
}

class SecondParser extends Parser {
  priority = 50;

  parse(dateString, token, match) {
    switch (token) {
      case "s":
        return parseNumericPattern(numericPatterns.second, dateString);
      case "so":
        return match.ordinalNumber(dateString, { unit: "second" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 59;
  }

  set(date, _flags, value) {
    date.setSeconds(value, 0);
    return date;
  }

  incompatibleTokens = ["t", "T"];
}

class FractionOfSecondParser extends Parser {
  priority = 30;

  parse(dateString, token) {
    const valueCallback = (value) =>
      Math.trunc(value * Math.pow(10, -token.length + 3));
    return mapValue(parseNDigits(token.length, dateString), valueCallback);
  }

  set(date, _flags, value) {
    date.setMilliseconds(value);
    return date;
  }

  incompatibleTokens = ["t", "T"];
}

// Timezone (ISO-8601. +00:00 is `'Z'`)
class ISOTimezoneWithZParser extends Parser {
  priority = 10;

  parse(dateString, token) {
    switch (token) {
      case "X":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString,
        );
      case "XX":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "XXXX":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString,
        );
      case "XXXXX":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString,
        );
      case "XXX":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }

  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value,
    );
  }

  incompatibleTokens = ["t", "T", "x"];
}

// Timezone (ISO-8601)
class ISOTimezoneParser extends Parser {
  priority = 10;

  parse(dateString, token) {
    switch (token) {
      case "x":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString,
        );
      case "xx":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "xxxx":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString,
        );
      case "xxxxx":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString,
        );
      case "xxx":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }

  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value,
    );
  }

  incompatibleTokens = ["t", "T", "X"];
}

class TimestampSecondsParser extends Parser {
  priority = 40;

  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }

  set(date, _flags, value) {
    return [constructFrom(date, value * 1000), { timestampIsSet: true }];
  }

  incompatibleTokens = "*";
}

class TimestampMillisecondsParser extends Parser {
  priority = 20;

  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }

  set(date, _flags, value) {
    return [constructFrom(date, value), { timestampIsSet: true }];
  }

  incompatibleTokens = "*";
}

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
 * |  p  |                                |  P  |                                |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 */
const parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser(),
};

/**
 * The {@link parse} function options.
 */

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;

const notWhitespaceRegExp = /\S/;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

/**
 * @name parse
 * @category Common Helpers
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters in the format string wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 5 below the table).
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
 *
 * ```javascript
 * parse('23 AM', 'HH a', new Date())
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
 *
 * Accepted format string patterns:
 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
 * |---------------------------------|-----|---------|-----------------------------------|-------|
 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 |     | GGGGG   | A, B                              |       |
 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
 * |                                 |     | yyyyy   | ...                               | 2,4   |
 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
 * |                                 |     | YYYYY   | ...                               | 2,4   |
 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
 * |                                 |     | uuuuu   | ...                               | 2,4   |
 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 |     | DDDD    | ...                               | 2     |
 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
 * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
 * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
 * |                                 |     | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
 * |                                 |     | tt      | ...                               | 2     |
 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
 * |                                 |     | SSS     | 000, 001, ..., 999                |       |
 * |                                 |     | SSSS    | ...                               | 2     |
 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
 * |                                 |     | TT      | ...                               | 2     |
 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
 * |                                 |     | XX      | -0800, +0530, Z                   |       |
 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
 * |                                 |     | xx      | -0800, +0530, +0000               |       |
 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
 * |                                 |     | PP      | May 29, 1453                      |       |
 * |                                 |     | PPP     | May 29th, 1453                    |       |
 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
 * |                                 |     | pp      | 12:00:00 AM                       |       |
 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *    In `format` function, they will produce different result:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 *    `parse` will try to match both formatting and stand-alone units interchangeably.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table:
 *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
 *      as wide as the sequence
 *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
 *      These variations are marked with "2" in the last column of the table.
 *
 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 4. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
 *
 *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
 *
 *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
 *
 *    while `uu` will just assign the year as is:
 *
 *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
 *
 *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear](https://date-fns.org/docs/setISOWeekYear)
 *    and [setWeekYear](https://date-fns.org/docs/setWeekYear)).
 *
 * 5. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 7. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
 *    on the given locale.
 *
 *    using `en-US` locale: `P` => `MM/dd/yyyy`
 *    using `en-US` locale: `p` => `hh:mm a`
 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
 *    using `pt-BR` locale: `p` => `HH:mm`
 *
 * Values will be assigned to the date in the descending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
 * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
 *
 * `referenceDate` must be passed for correct work of the function.
 * If you're not sure which `referenceDate` to supply, create a new instance of Date:
 * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
 * In this case parsing will be done in the context of the current date.
 * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
 * then `Invalid Date` will be returned.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
 *
 * If parsing failed, `Invalid Date` will be returned.
 * Invalid Date is a Date, whose time value is NaN.
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - defines values missing from the parsed dateString
 * @param options - An object with options.
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @returns The parsed date
 *
 * @throws `options.locale` must contain `match` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
 * //=> Tue Feb 11 2014 00:00:00
 *
 * @example
 * // Parse 28th of February in Esperanto locale in the context of 2010 year:
 * import eo from 'date-fns/locale/eo'
 * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
 *   locale: eo
 * })
 * //=> Sun Feb 28 2010 00:00:00
 */
function parse(dateStr, formatStr, referenceDate, options) {
  const invalidDate = () => constructFrom(options?.in || referenceDate, NaN);
  const defaultOptions = getDefaultOptions();
  const locale = options?.locale ?? defaultOptions.locale ?? enUS;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  if (!formatStr)
    return dateStr ? invalidDate() : toDate(referenceDate, options?.in);

  const subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  // If timezone isn't specified, it will try to use the context or
  // the reference date and fallback to the system time zone.
  const setters = [new DateTimezoneSetter(options?.in, referenceDate)];

  const tokens = formatStr
    .match(longFormattingTokensRegExp)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter in longFormatters) {
        const longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp);

  const usedTokens = [];

  for (let token of tokens) {
    if (
      !options?.useAdditionalWeekYearTokens &&
      isProtectedWeekYearToken(token)
    ) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    if (
      !options?.useAdditionalDayOfYearTokens &&
      isProtectedDayOfYearToken(token)
    ) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }

    const firstCharacter = token[0];
    const parser = parsers[firstCharacter];
    if (parser) {
      const { incompatibleTokens } = parser;
      if (Array.isArray(incompatibleTokens)) {
        const incompatibleToken = usedTokens.find(
          (usedToken) =>
            incompatibleTokens.includes(usedToken.token) ||
            usedToken.token === firstCharacter,
        );
        if (incompatibleToken) {
          throw new RangeError(
            `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`,
          );
        }
      } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
        throw new RangeError(
          `The format string mustn't contain \`${token}\` and any other token at the same time`,
        );
      }

      usedTokens.push({ token: firstCharacter, fullToken: token });

      const parseResult = parser.run(
        dateStr,
        token,
        locale.match,
        subFnOptions,
      );

      if (!parseResult) {
        return invalidDate();
      }

      setters.push(parseResult.setter);

      dateStr = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      // Replace two single quote characters with one single quote character
      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString(token);
      }

      // Cut token from string, or, if string doesn't match the token, return Invalid Date
      if (dateStr.indexOf(token) === 0) {
        dateStr = dateStr.slice(token.length);
      } else {
        return invalidDate();
      }
    }
  }

  // Check if the remaining input contains something other than whitespace
  if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
    return invalidDate();
  }

  const uniquePrioritySetters = setters
    .map((setter) => setter.priority)
    .sort((a, b) => b - a)
    .filter((priority, index, array) => array.indexOf(priority) === index)
    .map((priority) =>
      setters
        .filter((setter) => setter.priority === priority)
        .sort((a, b) => b.subPriority - a.subPriority),
    )
    .map((setterArray) => setterArray[0]);

  let date = toDate(referenceDate, options?.in);

  if (isNaN(+date)) return invalidDate();

  const flags = {};
  for (const setter of uniquePrioritySetters) {
    if (!setter.validate(date, subFnOptions)) {
      return invalidDate();
    }

    const result = setter.set(date, flags, subFnOptions);
    // Result is tuple (date, flags)
    if (Array.isArray(result)) {
      date = result[0];
      Object.assign(flags, result[1]);
      // Result is date
    } else {
      date = result;
    }
  }

  return date;
}

function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}

/**
 * The {@link isSameQuarter} function options.
 */

/**
 * @name isSameQuarter
 * @category Quarter Helpers
 * @summary Are the given dates in the same quarter (and year)?
 *
 * @description
 * Are the given dates in the same quarter (and year)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same quarter (and year)
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
 * //=> true
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameQuarter(laterDate, earlierDate, options) {
  const [dateLeft_, dateRight_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  return +startOfQuarter(dateLeft_) === +startOfQuarter(dateRight_);
}

/**
 * The {@link subDays} function options.
 */

/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the days subtracted
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays(date, amount, options) {
  return addDays(date, -amount, options);
}

/**
 * The {@link roundToNearestMinutes} function options.
 */

/**
 * @name roundToNearestMinutes
 * @category Minute Helpers
 * @summary Rounds the given date to the nearest minute
 *
 * @description
 * Rounds the given date to the nearest minute (or number of minutes).
 * Rounds up when the given date is exactly between the nearest round minutes.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to round
 * @param options - An object with options.
 *
 * @returns The new date rounded to the closest minute
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34))
 * //=> Thu Jul 10 2014 12:13:00
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest quarter hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { nearestTo: 15 })
 * //=> Thu Jul 10 2014 12:15:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'floor' })
 * //=> Thu Jul 10 2014 12:12:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:12:34 to nearest half hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'ceil', nearestTo: 30 })
 * //=> Thu Jul 10 2014 12:30:00
 */
function roundToNearestMinutes(date, options) {
  const nearestTo = options?.nearestTo ?? 1;

  if (nearestTo < 1 || nearestTo > 30) return constructFrom(date, NaN);

  const date_ = toDate(date, options?.in);
  const fractionalSeconds = date_.getSeconds() / 60;
  const fractionalMilliseconds = date_.getMilliseconds() / 1000 / 60;
  const minutes =
    date_.getMinutes() + fractionalSeconds + fractionalMilliseconds;

  const method = options?.roundingMethod ?? "round";
  const roundingMethod = getRoundingMethod(method);

  const roundedMinutes = roundingMethod(minutes / nearestTo) * nearestTo;

  date_.setMinutes(roundedMinutes, 0, 0);
  return date_;
}

/**
 * The {@link setMonth} function options.
 */

/**
 * @name setMonth
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param month - The month index to set (0-11)
 * @param options - The options
 *
 * @returns The new date with the month set
 *
 * @example
 * // Set February to 1 September 2014:
 * const result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
function setMonth(date, month, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const day = _date.getDate();

  const midMonth = constructFrom(date, 0);
  midMonth.setFullYear(year, month, 15);
  midMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(midMonth);

  // Set the earlier date, allows to wrap Jan 31 to Feb 28
  _date.setMonth(month, Math.min(day, daysInMonth));
  return _date;
}

/**
 * The {@link set} function options.
 */

/**
 * @name set
 * @category Common Helpers
 * @summary Set date values to a given date.
 *
 * @description
 * Set date values to a given date.
 *
 * Sets time values to date from object `values`.
 * A value is not set if it is undefined or null or doesn't exist in `values`.
 *
 * Note about bundle size: `set` does not internally use `setX` functions from date-fns but instead opts
 * to use native `Date#setX` methods. If you use this function, you may not want to include the
 * other `setX` functions that date-fns provides if you are concerned about the bundle size.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param values - The date values to be set
 * @param options - The options
 *
 * @returns The new date with options set
 *
 * @example
 * // Transform 1 September 2014 into 20 October 2015 in a single line:
 * const result = set(new Date(2014, 8, 20), { year: 2015, month: 9, date: 20 })
 * //=> Tue Oct 20 2015 00:00:00
 *
 * @example
 * // Set 12 PM to 1 September 2014 01:23:45 to 1 September 2014 12:00:00:
 * const result = set(new Date(2014, 8, 1, 1, 23, 45), { hours: 12 })
 * //=> Mon Sep 01 2014 12:23:45
 */
function set(date, values, options) {
  let _date = toDate(date, options?.in);

  // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
  if (isNaN(+_date)) return constructFrom(date, NaN);

  if (values.year != null) _date.setFullYear(values.year);
  if (values.month != null) _date = setMonth(_date, values.month);
  if (values.date != null) _date.setDate(values.date);
  if (values.hours != null) _date.setHours(values.hours);
  if (values.minutes != null) _date.setMinutes(values.minutes);
  if (values.seconds != null) _date.setSeconds(values.seconds);
  if (values.milliseconds != null) _date.setMilliseconds(values.milliseconds);

  return _date;
}

/**
 * The {@link setMilliseconds} function options.
 */

/**
 * @name setMilliseconds
 * @category Millisecond Helpers
 * @summary Set the milliseconds to the given date.
 *
 * @description
 * Set the milliseconds to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param milliseconds - The milliseconds of the new date
 * @param options - The options
 *
 * @returns The new date with the milliseconds set
 *
 * @example
 * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
 * const result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
 * //=> Mon Sep 01 2014 11:30:40.300
 */
function setMilliseconds(date, milliseconds, options) {
  const _date = toDate(date, options?.in);
  _date.setMilliseconds(milliseconds);
  return _date;
}

/**
 * The {@link setSeconds} function options.
 */

/**
 * @name setSeconds
 * @category Second Helpers
 * @summary Set the seconds to the given date, with context support.
 *
 * @description
 * Set the seconds to the given date, with an optional context for time zone specification.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param seconds - The seconds of the new date
 * @param options - An object with options
 *
 * @returns The new date with the seconds set
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * const result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
function setSeconds(date, seconds, options) {
  const _date = toDate(date, options?.in);
  _date.setSeconds(seconds);
  return _date;
}

/**
 * The {@link setYear} function options.
 */

/**
 * @name setYear
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param year - The year of the new date
 * @param options - An object with options.
 *
 * @returns The new date with the year set
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * const result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
function setYear(date, year, options) {
  const date_ = toDate(date, options?.in);

  // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
  if (isNaN(+date_)) return constructFrom(date, NaN);

  date_.setFullYear(year);
  return date_;
}

/**
 * The subMonths function options.
 */

/**
 * @name subMonths
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the months subtracted
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * const result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
function subMonths(date, amount, options) {
  return addMonths(date, -amount, options);
}

/**
 * The {@link sub} function options.
 */

/**
 * @name sub
 * @category Common Helpers
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 * @param options - An object with options
 *
 * | Key     | Description                        |
 * |---------|------------------------------------|
 * | years   | Amount of years to be subtracted   |
 * | months  | Amount of months to be subtracted  |
 * | weeks   | Amount of weeks to be subtracted   |
 * | days    | Amount of days to be subtracted    |
 * | hours   | Amount of hours to be subtracted   |
 * | minutes | Amount of minutes to be subtracted |
 * | seconds | Amount of seconds to be subtracted |
 *
 * All values default to 0
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */
function sub(date, duration, options) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = duration;

  const withoutMonths = subMonths(date, months + years * 12, options);
  const withoutDays = subDays(withoutMonths, days + weeks * 7, options);

  const minutesToSub = minutes + hours * 60;
  const secondsToSub = seconds + minutesToSub * 60;
  const msToSub = secondsToSub * 1000;

  return constructFrom(date, +withoutDays - msToSub);
}

/**
 * The {@link subYears} function options.
 */

/**
 * @name subYears
 * @category Year Helpers
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of years to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the years subtracted
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * const result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */
function subYears(date, amount, options) {
  return addYears(date, -amount, options);
}

/**
 * Time zone name format.
 */

/**
 * The function returns the time zone name for the given date in the specified
 * time zone.
 *
 * It uses the `Intl.DateTimeFormat` API and by default outputs the time zone
 * name in a long format, e.g. "Pacific Standard Time" or
 * "Singapore Standard Time".
 *
 * It is possible to specify the format as the third argument using one of the following options
 *
 * - "short": e.g. "EDT" or "GMT+8".
 * - "long": e.g. "Eastern Daylight Time".
 * - "shortGeneric": e.g. "ET" or "Singapore Time".
 * - "longGeneric": e.g. "Eastern Time" or "Singapore Standard Time".
 *
 * These options correspond to TR35 tokens `z..zzz`, `zzzz`, `v`, and `vvvv` respectively: https://www.unicode.org/reports/tr35/tr35-dates.html#dfst-zone
 *
 * @param timeZone - Time zone name (IANA or UTC offset)
 * @param date - Date object to get the time zone name for
 * @param format - Optional format of the time zone name. Defaults to "long". Can be "short", "long", "shortGeneric", or "longGeneric".
 *
 * @returns Time zone name (e.g. "Singapore Standard Time")
 */
function tzName(timeZone, date, format = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: timeZone,
    timeZoneName: format
  }).format(date).split(/\s/g) // Format.JS uses non-breaking spaces
  .slice(2) // Skip the hour and AM/PM parts
  .join(" ");
}

const offsetFormatCache = {};
const offsetCache = {};

/**
 * The function extracts UTC offset in minutes from the given date in specified
 * time zone.
 *
 * Unlike `Date.prototype.getTimezoneOffset`, this function returns the value
 * mirrored to the sign of the offset in the time zone. For Asia/Singapore
 * (UTC+8), `tzOffset` returns 480, while `getTimezoneOffset` returns -480.
 *
 * @param timeZone - Time zone name (IANA or UTC offset)
 * @param date - Date to check the offset for
 *
 * @returns UTC offset in minutes
 */
function tzOffset(timeZone, date) {
  try {
    const format = offsetFormatCache[timeZone] ||= new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "longOffset"
    }).format;
    const offsetStr = format(date).split("GMT")[1];
    if (offsetStr in offsetCache) return offsetCache[offsetStr];
    return calcOffset(offsetStr, offsetStr.split(":"));
  } catch {
    // Fallback to manual parsing if the runtime doesn't support ±HH:MM/±HHMM/±HH
    // See: https://github.com/nodejs/node/issues/53419
    if (timeZone in offsetCache) return offsetCache[timeZone];
    const captures = timeZone?.match(offsetRe);
    if (captures) return calcOffset(timeZone, captures.slice(1));
    return NaN;
  }
}
const offsetRe = /([+-]\d\d):?(\d\d)?/;
function calcOffset(cacheStr, values) {
  const hours = +(values[0] || 0);
  const minutes = +(values[1] || 0);
  // Convert seconds to minutes by dividing by 60 to keep the function return in minutes.
  const seconds = +(values[2] || 0) / 60;
  return offsetCache[cacheStr] = hours * 60 + minutes > 0 ? hours * 60 + minutes + seconds : hours * 60 - minutes - seconds;
}

class TZDateMini extends Date {
  //#region static

  constructor(...args) {
    super();
    if (args.length > 1 && typeof args[args.length - 1] === "string") {
      this.timeZone = args.pop();
    }
    this.internal = new Date();
    if (isNaN(tzOffset(this.timeZone, this))) {
      this.setTime(NaN);
    } else {
      if (!args.length) {
        this.setTime(Date.now());
      } else if (typeof args[0] === "number" && (args.length === 1 || args.length === 2 && typeof args[1] !== "number")) {
        this.setTime(args[0]);
      } else if (typeof args[0] === "string") {
        this.setTime(+new Date(args[0]));
      } else if (args[0] instanceof Date) {
        this.setTime(+args[0]);
      } else {
        this.setTime(+new Date(...args));
        adjustToSystemTZ(this);
        syncToInternal(this);
      }
    }
  }
  static tz(tz, ...args) {
    return args.length ? new TZDateMini(...args, tz) : new TZDateMini(Date.now(), tz);
  }

  //#endregion

  //#region time zone

  withTimeZone(timeZone) {
    return new TZDateMini(+this, timeZone);
  }
  getTimezoneOffset() {
    const offset = -tzOffset(this.timeZone, this);
    // Remove the seconds offset
    // use Math.floor for negative GMT timezones and Math.ceil for positive GMT timezones.
    return offset > 0 ? Math.floor(offset) : Math.ceil(offset);
  }

  //#endregion

  //#region time

  setTime(time) {
    Date.prototype.setTime.apply(this, arguments);
    syncToInternal(this);
    return +this;
  }

  //#endregion

  //#region date-fns integration

  [Symbol.for("constructDateFrom")](date) {
    return new TZDateMini(+new Date(date), this.timeZone);
  }

  //#endregion
}

// Assign getters and setters
const re = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach(method => {
  if (!re.test(method)) return;
  const utcMethod = method.replace(re, "$1UTC");
  // Filter out methods without UTC counterparts
  if (!TZDateMini.prototype[utcMethod]) return;
  if (method.startsWith("get")) {
    // Delegate to internal date's UTC method
    TZDateMini.prototype[method] = function () {
      return this.internal[utcMethod]();
    };
  } else {
    // Assign regular setter
    TZDateMini.prototype[method] = function () {
      Date.prototype[utcMethod].apply(this.internal, arguments);
      syncFromInternal(this);
      return +this;
    };

    // Assign UTC setter
    TZDateMini.prototype[utcMethod] = function () {
      Date.prototype[utcMethod].apply(this, arguments);
      syncToInternal(this);
      return +this;
    };
  }
});

/**
 * Function syncs time to internal date, applying the time zone offset.
 *
 * @param {Date} date - Date to sync
 */
function syncToInternal(date) {
  date.internal.setTime(+date);
  date.internal.setUTCSeconds(date.internal.getUTCSeconds() - Math.round(-tzOffset(date.timeZone, date) * 60));
}

/**
 * Function syncs the internal date UTC values to the date. It allows to get
 * accurate timestamp value.
 *
 * @param {Date} date - The date to sync
 */
function syncFromInternal(date) {
  // First we transpose the internal values
  Date.prototype.setFullYear.call(date, date.internal.getUTCFullYear(), date.internal.getUTCMonth(), date.internal.getUTCDate());
  Date.prototype.setHours.call(date, date.internal.getUTCHours(), date.internal.getUTCMinutes(), date.internal.getUTCSeconds(), date.internal.getUTCMilliseconds());

  // Now we have to adjust the date to the system time zone
  adjustToSystemTZ(date);
}

/**
 * Function adjusts the date to the system time zone. It uses the time zone
 * differences to calculate the offset and adjust the date.
 *
 * @param {Date} date - Date to adjust
 */
function adjustToSystemTZ(date) {
  // Save the time zone offset before all the adjustments
  const baseOffset = tzOffset(date.timeZone, date);
  // Remove the seconds offset
  // use Math.floor for negative GMT timezones and Math.ceil for positive GMT timezones.
  const offset = baseOffset > 0 ? Math.floor(baseOffset) : Math.ceil(baseOffset);
  //#region System DST adjustment

  // The biggest problem with using the system time zone is that when we create
  // a date from internal values stored in UTC, the system time zone might end
  // up on the DST hour:
  //
  //   $ TZ=America/New_York node
  //   > new Date(2020, 2, 8, 1).toString()
  //   'Sun Mar 08 2020 01:00:00 GMT-0500 (Eastern Standard Time)'
  //   > new Date(2020, 2, 8, 2).toString()
  //   'Sun Mar 08 2020 03:00:00 GMT-0400 (Eastern Daylight Time)'
  //   > new Date(2020, 2, 8, 3).toString()
  //   'Sun Mar 08 2020 03:00:00 GMT-0400 (Eastern Daylight Time)'
  //   > new Date(2020, 2, 8, 4).toString()
  //   'Sun Mar 08 2020 04:00:00 GMT-0400 (Eastern Daylight Time)'
  //
  // Here we get the same hour for both 2 and 3, because the system time zone
  // has DST beginning at 8 March 2020, 2 a.m. and jumps to 3 a.m. So we have
  // to adjust the internal date to reflect that.
  //
  // However we want to adjust only if that's the DST hour the change happenes,
  // not the hour where DST moves to.

  // We calculate the previous hour to see if the time zone offset has changed
  // and we have landed on the DST hour.
  const prevHour = new Date(+date);
  // We use UTC methods here as we don't want to land on the same hour again
  // in case of DST.
  prevHour.setUTCHours(prevHour.getUTCHours() - 1);

  // Calculate if we are on the system DST hour.
  const systemOffset = -new Date(+date).getTimezoneOffset();
  const prevHourSystemOffset = -new Date(+prevHour).getTimezoneOffset();
  const systemDSTChange = systemOffset - prevHourSystemOffset;
  // Detect the DST shift. System DST change will occur both on
  const dstShift = Date.prototype.getHours.apply(date) !== date.internal.getUTCHours();

  // Move the internal date when we are on the system DST hour.
  if (systemDSTChange && dstShift) date.internal.setUTCMinutes(date.internal.getUTCMinutes() + systemDSTChange);

  //#endregion

  //#region System diff adjustment

  // Now we need to adjust the date, since we just applied internal values.
  // We need to calculate the difference between the system and date time zones
  // and apply it to the date.

  const offsetDiff = systemOffset - offset;
  if (offsetDiff) Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetDiff);

  //#endregion

  //#region Seconds System diff adjustment

  const systemDate = new Date(+date);
  // Set the UTC seconds to 0 to isolate the timezone offset in seconds.
  systemDate.setUTCSeconds(0);
  // For negative systemOffset, invert the seconds.
  const systemSecondsOffset = systemOffset > 0 ? systemDate.getSeconds() : (systemDate.getSeconds() - 60) % 60;

  // Calculate the seconds offset based on the timezone offset.
  const secondsOffset = Math.round(-(tzOffset(date.timeZone, date) * 60)) % 60;
  if (secondsOffset || systemSecondsOffset) {
    date.internal.setUTCSeconds(date.internal.getUTCSeconds() + secondsOffset);
    Date.prototype.setUTCSeconds.call(date, Date.prototype.getUTCSeconds.call(date) + secondsOffset + systemSecondsOffset);
  }

  //#endregion

  //#region Post-adjustment DST fix

  const postBaseOffset = tzOffset(date.timeZone, date);
  // Remove the seconds offset
  // use Math.floor for negative GMT timezones and Math.ceil for positive GMT timezones.
  const postOffset = postBaseOffset > 0 ? Math.floor(postBaseOffset) : Math.ceil(postBaseOffset);
  const postSystemOffset = -new Date(+date).getTimezoneOffset();
  const postOffsetDiff = postSystemOffset - postOffset;
  const offsetChanged = postOffset !== offset;
  const postDiff = postOffsetDiff - offsetDiff;
  if (offsetChanged && postDiff) {
    Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + postDiff);

    // Now we need to check if got offset change during the post-adjustment.
    // If so, we also need both dates to reflect that.

    const newBaseOffset = tzOffset(date.timeZone, date);
    // Remove the seconds offset
    // use Math.floor for negative GMT timezones and Math.ceil for positive GMT timezones.
    const newOffset = newBaseOffset > 0 ? Math.floor(newBaseOffset) : Math.ceil(newBaseOffset);
    const offsetChange = postOffset - newOffset;
    if (offsetChange) {
      date.internal.setUTCMinutes(date.internal.getUTCMinutes() + offsetChange);
      Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetChange);
    }
  }

  //#endregion
}

class TZDate extends TZDateMini {
  //#region static

  static tz(tz, ...args) {
    return args.length ? new TZDate(...args, tz) : new TZDate(Date.now(), tz);
  }

  //#endregion

  //#region representation

  toISOString() {
    const [sign, hours, minutes] = this.tzComponents();
    const tz = `${sign}${hours}:${minutes}`;
    return this.internal.toISOString().slice(0, -1) + tz;
  }
  toString() {
    // "Tue Aug 13 2024 07:50:19 GMT+0800 (Singapore Standard Time)";
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    // toUTCString returns RFC 7231 ("Mon, 12 Aug 2024 23:36:08 GMT")
    const [day, date, month, year] = this.internal.toUTCString().split(" ");
    // "Tue Aug 13 2024"
    return `${day?.slice(0, -1) /* Remove "," */} ${month} ${date} ${year}`;
  }
  toTimeString() {
    // toUTCString returns RFC 7231 ("Mon, 12 Aug 2024 23:36:08 GMT")
    const time = this.internal.toUTCString().split(" ")[4];
    const [sign, hours, minutes] = this.tzComponents();
    // "07:42:23 GMT+0800 (Singapore Standard Time)"
    return `${time} GMT${sign}${hours}${minutes} (${tzName(this.timeZone, this)})`;
  }
  toLocaleString(locales, options) {
    return Date.prototype.toLocaleString.call(this, locales, {
      ...options,
      timeZone: options?.timeZone || this.timeZone
    });
  }
  toLocaleDateString(locales, options) {
    return Date.prototype.toLocaleDateString.call(this, locales, {
      ...options,
      timeZone: options?.timeZone || this.timeZone
    });
  }
  toLocaleTimeString(locales, options) {
    return Date.prototype.toLocaleTimeString.call(this, locales, {
      ...options,
      timeZone: options?.timeZone || this.timeZone
    });
  }

  //#endregion

  //#region private

  tzComponents() {
    const offset = this.getTimezoneOffset();
    const sign = offset > 0 ? "-" : "+";
    const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
    const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
    return [sign, hours, minutes];
  }

  //#endregion

  withTimeZone(timeZone) {
    return new TZDate(+this, timeZone);
  }

  //#region date-fns integration

  [Symbol.for("constructDateFrom")](date) {
    return new TZDate(+new Date(date), this.timeZone);
  }

  //#endregion
}

function Et() {
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      h("path", {
        d: "M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z"
      }),
      h("path", {
        d: "M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      h("path", {
        d: "M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      h("path", {
        d: "M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z"
      })
    ]
  );
}
function On() {
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      h("path", {
        d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z"
      }),
      h("path", {
        d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
function Ca() {
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      h("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
function xa() {
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      h("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
function Oa() {
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      h("path", {
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      h("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
function Ya() {
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      h("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
function Ba() {
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon",
      role: "img"
    },
    [
      h("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
const Ia = Symbol("ContextKey"), Yn = (e, A) => {
  const { setTimeModelValue: f } = Ie(), o = Tr(e), c = ref(null), s = reactive({
    menuFocused: false,
    shiftKeyInMenu: false,
    isInputFocused: false,
    isTextInputDate: false,
    arrowNavigationLevel: 0
  }), r = o.getDate(/* @__PURE__ */ new Date()), u = ref(""), v = ref([{ month: getMonth(r), year: getYear(r) }]), Y = reactive({ hours: 0, minutes: 0, seconds: 0 });
  f(Y, null, r, o.range.value.enabled);
  const P = computed({
    get: () => c.value,
    set: (h) => {
      c.value = h;
    }
  }), B = computed(
    () => (h) => v.value[h] ? v.value[h].month : 0
  ), O = computed(
    () => (h) => v.value[h] ? v.value[h].year : 0
  ), l = (h, _) => {
    s[h] = _;
  }, w = () => {
    f(Y, P.value, r, o.range.value.enabled);
  };
  provide(Ia, {
    rootProps: e,
    defaults: o,
    modelValue: P,
    state: readonly(s),
    rootEmit: A,
    calendars: v,
    month: B,
    year: O,
    time: Y,
    today: r,
    inputValue: u,
    setState: l,
    updateTime: w,
    getDate: o.getDate
  });
}, Me = () => {
  const e = inject(Ia);
  if (!e)
    throw new Error("Can't use context");
  return e;
};
var Ge = /* @__PURE__ */ ((e) => (e.month = "month", e.year = "year", e))(Ge || {}), bt = /* @__PURE__ */ ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(bt || {}), He = /* @__PURE__ */ ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(He || {});
const Bn = ["timestamp", "date", "iso"];
var Xe = /* @__PURE__ */ ((e) => (e.up = "up", e.down = "down", e.left = "left", e.right = "right", e))(Xe || {}), $e = /* @__PURE__ */ ((e) => (e.arrowUp = "ArrowUp", e.arrowDown = "ArrowDown", e.arrowLeft = "ArrowLeft", e.arrowRight = "ArrowRight", e.enter = "Enter", e.space = " ", e.esc = "Escape", e.tab = "Tab", e.home = "Home", e.end = "End", e.pageUp = "PageUp", e.pageDown = "PageDown", e))($e || {}), Mt = /* @__PURE__ */ ((e) => (e.MONTH_AND_YEAR = "MM-yyyy", e.YEAR = "yyyy", e.DATE = "dd-MM-yyyy", e))(Mt || {}), Ea = /* @__PURE__ */ ((e) => (e[e.Sunday = 0] = "Sunday", e[e.Monday = 1] = "Monday", e[e.Tuesday = 2] = "Tuesday", e[e.Wednesday = 3] = "Wednesday", e[e.Thursday = 4] = "Thursday", e[e.Friday = 5] = "Friday", e[e.Saturday = 6] = "Saturday", e))(Ea || {});
const In = () => {
  const { rootProps: e, state: A } = Me(), f = computed(() => A.arrowNavigationLevel), o = ref(-1), c = ref(-1);
  watch(f, (E, k) => {
    b(E === 0 && k > 0);
  });
  const s = ref([]), r = ref(/* @__PURE__ */ new Map()), u = () => {
    const E = Array.from(
      document.querySelectorAll(`[data-dp-action-element="${f.value}"]`)
    ), k = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map();
    for (const M of E) {
      const R = M.getBoundingClientRect(), $ = R.top, S = R.left;
      k.has($) || k.set($, []), k.get($).push(M), g.set(M, { row: $, col: S });
    }
    s.value = Array.from(k.entries()).sort((M, R) => M[0] - R[0]).map(([M, R]) => v(R, g)), r.value = g;
  }, v = (E, k) => E.sort((g, M) => {
    const R = k.get(g), $ = k.get(M);
    return R.col - $.col;
  }), Y = (E, k) => {
    f.value === 0 && (o.value = E, c.value = k);
  }, P = (E) => {
    if (![$e.arrowUp, $e.arrowDown, $e.arrowLeft, $e.arrowRight].includes(E.key))
      return;
    u(), E.preventDefault();
    const k = document.activeElement;
    if (!k?.hasAttribute("data-dp-action-element"))
      return;
    let g = -1, M = -1;
    for (let R = 0; R < s.value.length; R++) {
      const $ = s.value[R].indexOf(k);
      if ($ !== -1) {
        g = R, M = $;
        break;
      }
    }
    if (g !== -1)
      switch (E.key) {
        case $e.arrowLeft:
          return B(g, M);
        case $e.arrowRight:
          return O(g, M);
        case $e.arrowUp:
          return l(g, M);
        case $e.arrowDown:
          return w(g, M);
        default:
          return;
      }
  }, B = (E, k) => {
    if (k > 0) {
      const g = s.value[E][k - 1];
      Y(E, k - 1), g && g.focus();
    }
  }, O = (E, k) => {
    if (k < s.value[E].length - 1) {
      const g = s.value[E][k + 1];
      Y(E, k + 1), g && g.focus();
    }
  }, l = (E, k) => {
    if (E > 0) {
      const g = s.value[E - 1], M = Math.min(k, g.length - 1), R = g[M];
      Y(E - 1, M), R && R.focus();
    }
  }, w = (E, k) => {
    if (E < s.value.length - 1) {
      const g = s.value[E + 1], M = Math.min(k, g.length - 1), R = g[M];
      Y(E + 1, M), R && R.focus();
    }
  }, h = () => {
    nextTick().then(() => {
      u();
      const E = s.value[o.value]?.[c.value];
      E && _(E);
    });
  }, _ = (E) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        E.focus({ preventScroll: true });
      });
    });
  }, b = (E) => {
    if (E)
      return h();
    const k = document.querySelector(`[data-dp-element-active="${f.value}"]`);
    if (k && !E)
      _(k);
    else {
      const g = document.querySelector(`[data-dp-action-element="${f.value}"]`);
      g && _(g);
    }
  };
  onMounted(() => {
    e.arrowNavigation && (b(false), document.addEventListener("keydown", P));
  }), onUnmounted(() => {
    e.arrowNavigation && document.removeEventListener("keydown", P);
  });
}, En = () => {
  const { checkPartialRangeValue: e, checkRangeEnabled: A, isValidDate: f } = Ue(), { convertType: o, errorMapper: c } = Ie(), {
    getDate: s,
    rootEmit: r,
    state: u,
    rootProps: v,
    inputValue: Y,
    defaults: { textInput: P, range: B, multiDates: O, timeConfig: l, formats: w },
    modelValue: h,
    updateTime: _
  } = Me(), { setTime: b, getWeekFromDate: E } = We(), { formatSelectedDate: k, formatForTextInput: g } = pt();
  watch(
    h,
    (y, H) => {
      r("internal-model-change", h.value), JSON.stringify(H ?? {}) !== JSON.stringify(y ?? {}) && _();
    },
    { deep: true }
  ), watch(B, (y, H) => {
    y.enabled !== H.enabled && (h.value = null);
  }), watch(
    () => w.value.input,
    () => {
      Z();
    }
  );
  const M = (y) => y ? v.modelType ? G(y) : {
    hours: getHours(y),
    minutes: getMinutes(y),
    seconds: l.value.enableSeconds ? getSeconds(y) : 0
  } : null, R = (y) => v.modelType ? G(y) : { month: getMonth(y), year: getYear(y) }, $ = (y) => Array.isArray(y) ? O.value.enabled ? y.map((H) => S(H, setYear(s(), H))) : A(
    () => [
      setYear(s(), y[0]),
      y[1] ? setYear(s(), y[1]) : e(B.value.partialRange)
    ],
    B.value.enabled
  ) : setYear(s(), +y), S = (y, H) => (typeof y == "string" || typeof y == "number") && v.modelType ? de(y) : H, p = (y) => Array.isArray(y) ? [
    S(y[0], b(y[0])),
    S(y[1], b(y[1]))
  ] : S(y, b(y)), D = (y) => {
    const H = set(s(), { date: 1 });
    return Array.isArray(y) ? O.value.enabled ? y.map(
      (fe) => S(fe, set(H, { month: +fe.month, year: +fe.year }))
    ) : A(
      () => [
        S(y[0], set(H, { month: +y[0].month, year: +y[0].year })),
        S(
          y[1],
          y[1] ? set(H, { month: +y[1].month, year: +y[1].year }) : e(B.value.partialRange)
        )
      ],
      B.value.enabled
    ) : S(y, set(H, { month: +y.month, year: +y.year }));
  }, V = (y) => {
    if (Array.isArray(y))
      return y.map((H) => de(H));
    throw new Error(c.dateArr("multi-dates"));
  }, F = (y) => {
    if (Array.isArray(y) && B.value.enabled) {
      const H = y[0], fe = y[1];
      return [
        s(Array.isArray(H) ? H[0] : null),
        Array.isArray(fe) && fe.length ? s(fe[0]) : null
      ];
    }
    return s(y[0]);
  }, L = (y) => v.modelAuto ? Array.isArray(y) ? [de(y[0]), de(y[1])] : v.autoApply ? [de(y)] : [de(y), null] : Array.isArray(y) ? A(
    () => y[1] ? [
      de(y[0]),
      y[1] ? de(y[1]) : e(B.value.partialRange)
    ] : [de(y[0])],
    B.value.enabled
  ) : de(y), ne = () => {
    Array.isArray(h.value) && B.value.enabled && h.value.length === 1 && h.value.push(e(B.value.partialRange));
  }, re = () => {
    const y = h.value;
    return [
      G(y[0]),
      y[1] ? G(y[1]) : e(B.value.partialRange)
    ];
  }, X = () => Array.isArray(h.value) ? h.value[1] ? re() : G(o(h.value[0])) : [], x = () => (h.value || []).map((y) => G(y)), te = (y = false) => (y || ne(), v.modelAuto ? X() : O.value.enabled ? x() : Array.isArray(h.value) ? A(() => re(), B.value.enabled) : G(o(h.value))), q = (y) => !y || Array.isArray(y) && !y.length ? null : v.timePicker ? p(o(y)) : v.monthPicker ? D(o(y)) : v.yearPicker ? $(o(y)) : O.value.enabled ? V(o(y)) : v.weekPicker ? F(o(y)) : L(o(y)), oe = (y) => {
    if (u.isTextInputDate) return;
    const H = q(y);
    f(o(H)) ? (h.value = o(H), Z()) : (h.value = null, Y.value = "");
  }, K = () => h.value ? O.value.enabled ? h.value.map((y) => k(y)).join("; ") : P.value.enabled ? g() : k(h.value) : "", Z = () => {
    Y.value = K();
  }, de = (y) => v.modelType ? Bn.includes(v.modelType) ? s(y) : v.modelType === "format" && typeof w.value.input == "string" ? parse(y, w.value.input, s(), { locale: v.locale }) : parse(y, v.modelType, s(), { locale: v.locale }) : s(y), G = (y) => y ? v.modelType ? v.modelType === "timestamp" ? +y : v.modelType === "iso" ? y.toISOString() : v.modelType === "format" && typeof w.value.input == "string" ? k(y) : k(y, v.modelType) : y : null, ce = (y) => {
    r("update:model-value", y);
  }, le = (y) => Array.isArray(h.value) ? O.value.enabled ? h.value.map((H) => y(H)) : [y(h.value[0]), h.value[1] ? y(h.value[1]) : null] : y(o(h.value)), we = () => {
    if (Array.isArray(h.value)) {
      const y = E(h.value[0], v.weekStart), H = h.value[1] ? E(h.value[1], v.weekStart) : [];
      return [y.map((fe) => s(fe)), H.map((fe) => s(fe))];
    }
    return E(h.value, v.weekStart).map((y) => s(y));
  }, ve = (y) => ce(o(le(y))), Ae = () => r("update:model-value", we());
  return {
    checkBeforeEmit: () => h.value ? B.value.enabled ? B.value.partialRange ? h.value.length >= 1 : h.value.length === 2 : !!h.value : false,
    parseExternalModelValue: oe,
    formatInputValue: Z,
    emitModelValue: () => (Z(), v.monthPicker ? ve(R) : v.timePicker ? ve(M) : v.yearPicker ? ve(getYear) : v.weekPicker ? Ae() : ce(te()))
  };
}, Vt = () => {
  const {
    defaults: { transitions: e }
  } = Me(), A = computed(() => (o) => e.value ? o ? e.value.open : e.value.close : ""), f = computed(() => (o) => e.value ? o ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: A, showTransition: !!e.value, menuTransition: f };
}, Ft = (e) => {
  const {
    today: A,
    time: f,
    modelValue: o,
    defaults: { range: c }
  } = Me(), { setTimeModelValue: s } = Ie();
  watch(
    c,
    (r, u) => {
      r.enabled !== u.enabled && s(f, o.value, A, c.value.enabled);
    },
    { deep: true }
  ), watch(
    o,
    (r, u) => {
      e && JSON.stringify(r ?? {}) !== JSON.stringify(u ?? {}) && e();
    },
    { deep: true }
  );
}, Ue = () => {
  const {
    defaults: { safeDates: e, range: A, multiDates: f, filters: o, timeConfig: c },
    rootProps: s,
    getDate: r
  } = Me(), { getMapKeyType: u, getMapDate: v, errorMapper: Y, convertType: P } = Ie(), { isDateBefore: B, isDateAfter: O, isDateEqual: l, resetDate: w, getDaysInBetween: h, setTimeValue: _, getTimeObj: b, setTime: E } = We(), k = (i) => e.value.disabledDates ? typeof e.value.disabledDates == "function" ? e.value.disabledDates(r(i)) : !!v(i, e.value.disabledDates) : false, g = (i) => e.value.maxDate ? s.yearPicker ? getYear(i) > getYear(e.value.maxDate) : O(i, e.value.maxDate) : false, M = (i) => e.value.minDate ? s.yearPicker ? getYear(i) < getYear(e.value.minDate) : B(i, e.value.minDate) : false, R = (i) => {
    if (!i) return false;
    const d = g(i), a = M(i), n = k(i), m = o.value.months.map((Qe) => +Qe).includes(getMonth(i)), N = o.value.weekDays?.length ? o.value.weekDays.some((Qe) => +Qe === getDay(i)) : false, U = V(i), pe = getYear(i), ge = pe < +s.yearRange[0] || pe > +s.yearRange[1];
    return !(d || a || n || m || ge || N || U);
  }, $ = (i, d) => B(...Ae(e.value.minDate, i, d)) || l(...Ae(e.value.minDate, i, d)), S = (i, d) => O(...Ae(e.value.maxDate, i, d)) || l(...Ae(e.value.maxDate, i, d)), p = (i, d, a) => {
    let n = false;
    return e.value.maxDate && a && S(i, d) && (n = true), e.value.minDate && !a && $(i, d) && (n = true), n;
  }, D = (i, d, a, n) => {
    let C = false;
    return n && (e.value.minDate || e.value.maxDate) ? e.value.minDate && e.value.maxDate ? C = p(i, d, a) : (e.value.minDate && $(i, d) || e.value.maxDate && S(i, d)) && (C = true) : C = true, C;
  }, V = (i) => Array.isArray(e.value.allowedDates) && !e.value.allowedDates.length ? true : e.value.allowedDates ? !v(
    i,
    e.value.allowedDates,
    u(s.monthPicker, s.yearPicker)
  ) : false, F = (i) => !R(i), L = (i) => A.value.noDisabledRange ? !eachDayOfInterval({ start: i[0], end: i[1] }).some((a) => F(a)) : true, ne = (i) => {
    if (i) {
      const d = getYear(i);
      return d >= +s.yearRange[0] && d <= s.yearRange[1];
    }
    return true;
  }, re = (i, d) => !!(Array.isArray(i) && i[d] && (A.value.maxRange || A.value.minRange) && ne(i[d])), X = (i, d, a = 0) => {
    if (re(d, a) && ne(i)) {
      const n = differenceInCalendarDays(i, d[a]), C = h(d[a], i), m = C.length === 1 ? 0 : C.filter((U) => F(U)).length, N = Math.abs(n) - (A.value.minMaxRawRange ? 0 : m);
      if (A.value.minRange && A.value.maxRange)
        return N >= +A.value.minRange && N <= +A.value.maxRange;
      if (A.value.minRange) return N >= +A.value.minRange;
      if (A.value.maxRange) return N <= +A.value.maxRange;
    }
    return true;
  }, x = () => !c.value.enableTimePicker || s.monthPicker || s.yearPicker || c.value.ignoreTimeValidation, te = (i) => Array.isArray(i) ? [i[0] ? _(i[0]) : null, i[1] ? _(i[1]) : null] : _(i), q = (i, d, a) => d ? i.find(
    (n) => +n.hours === getHours(d) && n.minutes === "*" ? true : +n.minutes === getMinutes(d) && +n.hours === getHours(d)
  ) && a : false, oe = (i, d, a) => {
    const [n, C] = i, [m, N] = d;
    return !q(n, m, a) && !q(C, N, a) && a;
  }, K = (i, d) => {
    const a = Array.isArray(d) ? d : [d];
    return Array.isArray(s.disabledTimes) ? Array.isArray(s.disabledTimes[0]) ? oe(s.disabledTimes, a, i) : !a.some((n) => q(s.disabledTimes, n, i)) : i;
  }, Z = (i, d) => {
    const a = Array.isArray(d) ? [b(d[0]), d[1] ? b(d[1]) : void 0] : b(d), n = !s.disabledTimes(a);
    return i && n;
  }, de = (i, d) => s.disabledTimes ? Array.isArray(s.disabledTimes) ? K(d, i) : Z(d, i) : d, G = (i) => {
    let d = true;
    if (!i || x()) return true;
    const a = !e.value.minDate && !e.value.maxDate ? te(i) : i;
    return (s.maxTime || e.value.maxDate) && (d = I(
      s.maxTime,
      e.value.maxDate,
      "max",
      P(a),
      d
    )), (s.minTime || e.value.minDate) && (d = I(
      s.minTime,
      e.value.minDate,
      "min",
      P(a),
      d
    )), de(i, d);
  }, ce = (i) => {
    if (!s.monthPicker) return true;
    let d = true;
    const a = r(w(i));
    if (e.value.minDate && e.value.maxDate) {
      const n = r(w(e.value.minDate)), C = r(w(e.value.maxDate));
      return O(a, n) && B(a, C) || l(a, n) || l(a, C);
    }
    if (e.value.minDate) {
      const n = r(w(e.value.minDate));
      d = O(a, n) || l(a, n);
    }
    if (e.value.maxDate) {
      const n = r(w(e.value.maxDate));
      d = B(a, n) || l(a, n);
    }
    return d;
  }, le = computed(() => (i) => !c.value.enableTimePicker || c.value.ignoreTimeValidation ? true : G(i)), we = computed(() => (i) => s.monthPicker ? Array.isArray(i) && (A.value.enabled || f.value.enabled) ? !i.filter((a) => !ce(a)).length : ce(i) : true), ve = (i, d, a) => {
    if (!d || a && !e.value.maxDate || !a && !e.value.minDate) return false;
    const n = a ? addMonths(i, 1) : subMonths(i, 1), C = [getMonth(n), getYear(n)];
    return a ? !S(...C) : !$(...C);
  }, Ae = (i, d, a) => [set(r(i), { date: 1 }), set(r(), { month: d, year: a, date: 1 })], Q = (i, d, a, n) => {
    if (!i) return true;
    if (n) {
      const C = a === "max" ? isBefore(i, d) : isAfter(i, d), m = { seconds: 0, milliseconds: 0 };
      return C || isEqual(set(i, m), set(d, m));
    }
    return a === "max" ? i.getTime() <= d.getTime() : i.getTime() >= d.getTime();
  }, I = (i, d, a, n, C) => {
    if (Array.isArray(n)) {
      const N = y(i, n[0], d), U = y(i, n[1], d);
      return Q(n[0], N, a, !!d) && Q(n[1], U, a, !!d) && C;
    }
    const m = y(i, n, d);
    return Q(n, m, a, !!d) && C;
  }, y = (i, d, a) => i ? E(i, d) : r(a ?? d);
  return {
    isDisabled: F,
    validateDate: R,
    validateMonthYearInRange: D,
    isDateRangeAllowed: L,
    checkMinMaxRange: X,
    isValidTime: G,
    validateMonthYear: ve,
    validateMinDate: $,
    validateMaxDate: S,
    isValidDate: (i) => Array.isArray(i) ? isValid(i[0]) && (i[1] ? isValid(i[1]) : true) : i ? isValid(i) : false,
    checkPartialRangeValue: (i) => {
      if (i) return null;
      throw new Error(Y.prop("partial-range"));
    },
    checkRangeEnabled: (i, d) => {
      if (d) return i();
      throw new Error(Y.prop("range"));
    },
    checkMinMaxValue: (i, d, a) => {
      const n = a != null, C = d != null;
      if (!n && !C) return false;
      const m = +a, N = +d;
      return n && C ? +i > m || +i < N : n ? +i > m : C ? +i < N : false;
    },
    isTimeValid: le,
    isMonthValid: we
  };
}, Vn = (e) => {
  const {
    rootEmit: A,
    rootProps: f,
    defaults: { timeConfig: o, flow: c }
  } = Me(), s = ref(0), r = reactive({
    [bt.timePicker]: !o.value.enableTimePicker || f.timePicker || f.monthPicker,
    [bt.calendar]: false,
    [bt.header]: false
  }), u = computed(() => f.monthPicker || f.timePicker), v = (l) => {
    if (c.value?.steps?.length) {
      if (!l && u.value) return O();
      r[l] = true, Object.keys(r).filter((w) => !r[w]).length || O();
    }
  }, Y = () => {
    c.value?.steps?.length && s.value !== -1 && (s.value += 1, A("flow-step", s.value), O()), c.value?.steps?.length === s.value && nextTick().then(() => P());
  }, P = () => {
    s.value = -1;
  }, B = (l, w, ...h) => {
    c.value?.steps[s.value] === l && e.value && e.value[w]?.(...h);
  }, O = (l = 0) => {
    l && (s.value += l), B(He.month, "toggleMonthPicker", true), B(He.year, "toggleYearPicker", true), B(He.calendar, "toggleTimePicker", false, true), B(He.time, "toggleTimePicker", true, true);
    const w = c.value?.steps[s.value];
    (w === He.hours || w === He.minutes || w === He.seconds) && B(w, "toggleTimePicker", true, true, w);
  };
  return { childMount: v, updateFlowStep: Y, resetFlow: P, handleFlow: O, flowStep: s };
};
function fa(e) {
  return (A = {}) => {
    const f = A.width ? String(A.width) : e.defaultWidth;
    return e.formats[f] || e.formats[e.defaultWidth];
  };
}
function xt(e) {
  return (A, f) => {
    const o = f?.context ? String(f.context) : "standalone";
    let c;
    if (o === "formatting" && e.formattingValues) {
      const r = e.defaultFormattingWidth || e.defaultWidth, u = f?.width ? String(f.width) : r;
      c = e.formattingValues[u] || e.formattingValues[r];
    } else {
      const r = e.defaultWidth, u = f?.width ? String(f.width) : e.defaultWidth;
      c = e.values[u] || e.values[r];
    }
    const s = e.argumentCallback ? e.argumentCallback(A) : A;
    return c[s];
  };
}
function Ot(e) {
  return (A, f = {}) => {
    const o = f.width, c = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth], s = A.match(c);
    if (!s)
      return null;
    const r = s[0], u = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], v = Array.isArray(u) ? Nn(u, (B) => B.test(r)) : (
      // [TODO] -- I challenge you to fix the type
      Fn(u, (B) => B.test(r))
    );
    let Y;
    Y = e.valueCallback ? e.valueCallback(v) : v, Y = f.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      f.valueCallback(Y)
    ) : Y;
    const P = A.slice(r.length);
    return { value: Y, rest: P };
  };
}
function Fn(e, A) {
  for (const f in e)
    if (Object.prototype.hasOwnProperty.call(e, f) && A(e[f]))
      return f;
}
function Nn(e, A) {
  for (let f = 0; f < e.length; f++)
    if (A(e[f]))
      return f;
}
function Wn(e) {
  return (A, f = {}) => {
    const o = A.match(e.matchPattern);
    if (!o) return null;
    const c = o[0], s = A.match(e.parsePattern);
    if (!s) return null;
    let r = e.valueCallback ? e.valueCallback(s[0]) : s[0];
    r = f.valueCallback ? f.valueCallback(r) : r;
    const u = A.slice(c.length);
    return { value: r, rest: u };
  };
}
const Ln = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, Hn = (e, A, f) => {
  let o;
  const c = Ln[e];
  return typeof c == "string" ? o = c : A === 1 ? o = c.one : o = c.other.replace("{{count}}", A.toString()), f?.addSuffix ? f.comparison && f.comparison > 0 ? "in " + o : o + " ago" : o;
}, jn = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Kn = (e, A, f, o) => jn[e], zn = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, qn = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Un = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, Qn = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, Jn = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, Gn = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Xn = (e, A) => {
  const f = Number(e), o = f % 100;
  if (o > 20 || o < 10)
    switch (o % 10) {
      case 1:
        return f + "st";
      case 2:
        return f + "nd";
      case 3:
        return f + "rd";
    }
  return f + "th";
}, Zn = {
  ordinalNumber: Xn,
  era: xt({
    values: zn,
    defaultWidth: "wide"
  }),
  quarter: xt({
    values: qn,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: xt({
    values: Un,
    defaultWidth: "wide"
  }),
  day: xt({
    values: Qn,
    defaultWidth: "wide"
  }),
  dayPeriod: xt({
    values: Jn,
    defaultWidth: "wide",
    formattingValues: Gn,
    defaultFormattingWidth: "wide"
  })
}, er = /^(\d+)(th|st|nd|rd)?/i, tr = /\d+/i, ar = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, nr = {
  any: [/^b/i, /^(a|c)/i]
}, rr = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, lr = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, or = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, sr = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, ur = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, ir = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, cr = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, dr = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, vr = {
  ordinalNumber: Wn({
    matchPattern: er,
    parsePattern: tr,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ot({
    matchPatterns: ar,
    defaultMatchWidth: "wide",
    parsePatterns: nr,
    defaultParseWidth: "any"
  }),
  quarter: Ot({
    matchPatterns: rr,
    defaultMatchWidth: "wide",
    parsePatterns: lr,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ot({
    matchPatterns: or,
    defaultMatchWidth: "wide",
    parsePatterns: sr,
    defaultParseWidth: "any"
  }),
  day: Ot({
    matchPatterns: ur,
    defaultMatchWidth: "wide",
    parsePatterns: ir,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ot({
    matchPatterns: cr,
    defaultMatchWidth: "any",
    parsePatterns: dr,
    defaultParseWidth: "any"
  })
}, fr = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, mr = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, pr = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, hr = {
  date: fa({
    formats: fr,
    defaultWidth: "full"
  }),
  time: fa({
    formats: mr,
    defaultWidth: "full"
  }),
  dateTime: fa({
    formats: pr,
    defaultWidth: "full"
  })
}, gr = {
  code: "en-US",
  formatDistance: Hn,
  formatLong: hr,
  formatRelative: Kn,
  localize: Zn,
  match: vr,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, Da = {
  noDisabledRange: false,
  showLastInRange: true,
  minMaxRawRange: false,
  partialRange: true,
  disableTimeRangeValidation: false,
  maxRange: void 0,
  minRange: void 0,
  autoRange: void 0,
  fixedStart: false,
  fixedEnd: false,
  autoSwitchStartEnd: true
}, yr = {
  allowStopPropagation: true,
  closeOnScroll: false,
  modeHeight: 255,
  allowPreventDefault: false,
  closeOnClearValue: true,
  closeOnAutoApply: true,
  noSwipe: false,
  keepActionRow: false,
  onClickOutside: void 0,
  tabOutClosesMenu: true,
  arrowLeft: void 0,
  keepViewOnOffsetClick: false,
  timeArrowHoldThreshold: 0,
  shadowDom: false,
  mobileBreakpoint: 600,
  setDateOnMenuClose: false,
  escClose: true,
  spaceConfirm: true,
  monthChangeOnArrows: true,
  monthChangeOnScroll: true
}, Ma = {
  enterSubmit: true,
  tabSubmit: true,
  openMenu: "open",
  selectOnFocus: false,
  rangeSeparator: " - ",
  escClose: true,
  format: void 0,
  maskFormat: void 0,
  applyOnBlur: false,
  separators: void 0
}, br = {
  dates: [],
  years: [],
  months: [],
  quarters: [],
  weeks: [],
  weekdays: [],
  options: { highlightDisabled: false }
}, kr = {
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  selectBtnLabel: "Select",
  cancelBtnLabel: "Cancel",
  nowBtnLabel: "Now",
  nowBtnRound: void 0
}, wr = {
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
  openTimePicker: "Open time picker",
  closeTimePicker: "Close time Picker",
  incrementValue: (e) => `Increment ${e}`,
  decrementValue: (e) => `Decrement ${e}`,
  openTpOverlay: (e) => `Open ${e} overlay`,
  amPmButton: "Switch AM/PM mode",
  openYearsOverlay: "Open years overlay",
  openMonthsOverlay: "Open months overlay",
  nextMonth: "Next month",
  prevMonth: "Previous month",
  nextYear: "Next year",
  prevYear: "Previous year",
  day: void 0,
  weekDay: void 0,
  clearInput: "Clear value",
  calendarIcon: "Calendar icon",
  timePicker: "Time picker",
  monthPicker: (e) => `Month picker${e ? " overlay" : ""}`,
  yearPicker: (e) => `Year picker${e ? " overlay" : ""}`,
  timeOverlay: (e) => `${e} overlay`
}, _a = {
  menuAppearTop: "dp-menu-appear-top",
  menuAppearBottom: "dp-menu-appear-bottom",
  open: "dp-slide-down",
  close: "dp-slide-up",
  next: "calendar-next",
  previous: "calendar-prev",
  vNext: "dp-slide-up",
  vPrevious: "dp-slide-down"
}, Dr = {
  weekDays: [],
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] }
}, Mr = {
  month: "LLL",
  year: "yyyy",
  weekDay: "EEEEEE",
  quarter: "MMMM",
  day: "d",
  input: void 0,
  preview: void 0
}, _r = {
  enableTimePicker: true,
  ignoreTimeValidation: false,
  enableSeconds: false,
  enableMinutes: true,
  is24: true,
  noHoursOverlay: false,
  noMinutesOverlay: false,
  noSecondsOverlay: false,
  hoursGridIncrement: 1,
  minutesGridIncrement: 5,
  secondsGridIncrement: 5,
  hoursIncrement: 1,
  minutesIncrement: 1,
  secondsIncrement: 1,
  timePickerInline: false,
  startTime: void 0
}, Ar = {
  flowStep: 0,
  menuWrapRef: null,
  collapse: false
}, Pr = {
  weekStart: Ea.Monday,
  yearRange: () => [1900, 2100],
  ui: () => ({}),
  locale: () => gr,
  dark: false,
  transitions: true,
  hideNavigation: () => [],
  vertical: false,
  hideMonthYearSelect: false,
  disableYearSelect: false,
  autoApply: false,
  disabledDates: () => [],
  hideOffsetDates: false,
  noToday: false,
  markers: () => [],
  presetDates: () => [],
  preventMinMaxNavigation: false,
  reverseYears: false,
  weekPicker: false,
  arrowNavigation: false,
  monthPicker: false,
  yearPicker: false,
  quarterPicker: false,
  timePicker: false,
  modelAuto: false,
  multiDates: false,
  range: false,
  inline: false,
  sixWeeks: false,
  focusStartDate: false,
  yearFirst: false,
  loading: false,
  centered: false
}, Aa = {
  name: void 0,
  required: false,
  autocomplete: "off",
  state: void 0,
  clearable: true,
  alwaysClearable: false,
  hideInputIcon: false,
  id: void 0,
  inputmode: "none"
}, qt = {
  type: "local",
  hideOnOffsetDates: false,
  label: "W"
}, Tr = (e) => {
  const { getMapKey: A, getMapKeyType: f, getTimeObjFromCurrent: o } = Ie();
  function c(x, te) {
    let q;
    return e.timezone ? q = new TZDate(x ?? /* @__PURE__ */ new Date(), e.timezone) : q = x ? new Date(x) : /* @__PURE__ */ new Date(), te ? set(q, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }) : q;
  }
  const s = () => {
    const x = L.value.enableSeconds ? ":ss" : "", te = L.value.enableMinutes ? ":mm" : "";
    return L.value.is24 ? `HH${te}${x}` : `hh${te}${x} aa`;
  }, r = () => e.monthPicker ? "MM/yyyy" : e.timePicker ? s() : e.weekPicker ? `${R.value?.type === "iso" ? "II" : "ww"}-RR` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : L.value.enableTimePicker ? `MM/dd/yyyy, ${s()}` : "MM/dd/yyyy", u = (x) => o(c(), x, L.value.enableSeconds), v = () => p.value.enabled ? L.value.startTime && Array.isArray(L.value.startTime) ? [u(L.value.startTime[0]), u(L.value.startTime[1])] : null : L.value.startTime && !Array.isArray(L.value.startTime) ? u(L.value.startTime) : null, Y = (x) => x ? typeof x == "boolean" ? x ? 2 : 0 : Math.max(+x, 2) : 0, P = (x) => {
    const te = f(e.monthPicker, e.yearPicker);
    return new Map(
      x.map((q) => {
        const oe = c(q, B.value);
        return [A(oe, te), oe];
      })
    );
  }, B = computed(() => e.monthPicker || e.yearPicker || e.quarterPicker), O = computed(() => {
    const x = typeof e.multiCalendars == "object" && e.multiCalendars, te = {
      static: true,
      solo: false
    };
    if (!e.multiCalendars) return { ...te, count: Y(false) };
    const q = x ? e.multiCalendars : {}, oe = x ? q.count ?? true : e.multiCalendars, K = Y(oe);
    return Object.assign(te, q, { count: K });
  }), l = computed(() => v()), w = computed(() => ({ ...wr, ...e.ariaLabels })), h = computed(() => ({ ...Dr, ...e.filters })), _ = computed(() => typeof e.transitions == "boolean" ? e.transitions ? _a : false : { ..._a, ...e.transitions }), b = computed(() => ({ ...kr, ...e.actionRow })), E = computed(() => typeof e.textInput == "object" ? {
    ...Ma,
    ...e.textInput,
    format: typeof e.textInput.format == "string" ? e.textInput.format : V.value.input,
    pattern: e.textInput.format ?? V.value.input,
    enabled: true
  } : {
    ...Ma,
    format: V.value.input,
    pattern: V.value.input,
    enabled: e.textInput
  }), k = computed(() => {
    const x = { input: false };
    return typeof e.inline == "object" ? { ...x, ...e.inline, enabled: true } : {
      enabled: e.inline,
      ...x
    };
  }), g = computed(() => ({ ...yr, ...e.config })), M = computed(() => typeof e.highlight == "function" ? e.highlight : {
    ...br,
    ...e.highlight
  }), R = computed(() => typeof e.weekNumbers == "object" ? {
    type: e.weekNumbers?.type ?? qt.type,
    hideOnOffsetDates: e.weekNumbers?.hideOnOffsetDates ?? qt.hideOnOffsetDates,
    label: e.weekNumbers.label ?? qt.label
  } : e.weekNumbers ? qt : void 0), $ = computed(() => typeof e.multiDates == "boolean" ? { enabled: e.multiDates, dragSelect: true, limit: null } : {
    enabled: !!e.multiDates,
    limit: e.multiDates?.limit ? +e.multiDates.limit : null,
    dragSelect: e.multiDates?.dragSelect ?? true
  }), S = computed(() => ({
    minDate: e.minDate ? c(e.minDate) : null,
    maxDate: e.maxDate ? c(e.maxDate) : null,
    disabledDates: Array.isArray(e.disabledDates) ? P(e.disabledDates) : e.disabledDates,
    allowedDates: Array.isArray(e.allowedDates) ? P(e.allowedDates) : null,
    highlight: typeof M.value == "object" && Array.isArray(M.value.dates) ? P(M.value.dates) : M.value,
    markers: e.markers?.length ? new Map(
      e.markers.map((x) => {
        const te = c(x.date);
        return [A(te, Mt.DATE), x];
      })
    ) : null
  })), p = computed(() => typeof e.range == "object" ? { enabled: true, ...Da, ...e.range } : {
    enabled: e.range,
    ...Da
  }), D = computed(() => ({
    ...Object.fromEntries(
      Object.keys(e.ui).map((te) => {
        const q = te, oe = e.ui[q];
        if (q === "dayClass") return [q, e.ui[q]];
        const K = typeof e.ui[q] == "string" ? { [oe]: true } : Object.fromEntries(oe.map((Z) => [Z, true]));
        return [te, K];
      })
    )
  })), V = computed(() => ({
    ...Mr,
    ...e.formats,
    input: e.formats?.input ?? r(),
    preview: e.formats?.preview ?? r()
  })), F = computed(() => {
    if (e.teleport)
      return typeof e.teleport == "string" ? e.teleport : typeof e.teleport == "boolean" ? "body" : e.teleport;
  }), L = computed(() => ({ ..._r, ...e.timeConfig })), ne = computed(() => {
    if (e.flow)
      return { steps: [], partial: false, ...e.flow };
  }), re = computed(() => {
    const x = E.value.enabled ? "text" : "none";
    return e.inputAttrs ? { ...Aa, inputmode: x, ...e.inputAttrs } : { ...Aa, inputmode: x };
  }), X = computed(() => ({
    offset: e.floating?.offset ?? 10,
    arrow: e.floating?.arrow ?? true,
    strategy: e.floating?.strategy ?? void 0,
    placement: e.floating?.placement ?? void 0,
    flip: e.floating?.flip ?? true,
    shift: e.floating?.shift ?? true
  }));
  return {
    transitions: _,
    multiCalendars: O,
    startTime: l,
    ariaLabels: w,
    filters: h,
    actionRow: b,
    textInput: E,
    inline: k,
    config: g,
    highlight: M,
    weekNumbers: R,
    range: p,
    safeDates: S,
    multiDates: $,
    ui: D,
    formats: V,
    teleport: F,
    timeConfig: L,
    flow: ne,
    inputAttrs: re,
    floatingConfig: X,
    getDate: c
  };
}, Ie = () => {
  const e = (g, M) => format(g, M ?? Mt.DATE), A = (g, M) => g ? Mt.MONTH_AND_YEAR : M ? Mt.YEAR : Mt.DATE, f = (g, M, R) => M.get(e(g, R)), o = (g) => g, c = (g) => g === 0 ? g : !g || Number.isNaN(+g) ? null : +g, s = () => [
    "a[href]",
    "area[href]",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
    "[data-datepicker-instance]"
  ].join(", "), r = (g, M) => {
    let R = [...document.querySelectorAll(s())];
    R = R.filter((S) => !g.contains(S) || "datepicker-instance" in S.dataset);
    const $ = R.indexOf(g);
    if ($ >= 0 && (M ? $ - 1 >= 0 : $ + 1 <= R.length))
      return R[$ + (M ? -1 : 1)];
  }, u = (g) => String(g).padStart(2, "0"), v = (g, M) => g?.querySelector(`[data-dp-element="${M}"]`), Y = (g, M, R = false) => {
    g && M.allowStopPropagation && (R && g.stopImmediatePropagation(), g.stopPropagation());
  }, P = (g, M, R = false, $) => {
    if (g.key === $e.enter || g.key === $e.space)
      return R && g.preventDefault(), M();
    if ($) return $(g);
  }, B = (g, M) => {
    M.allowStopPropagation && g.stopPropagation(), M.allowPreventDefault && g.preventDefault();
  }, O = (g) => {
    if (g)
      return [...g.querySelectorAll("input, button, select, textarea, a[href]")][0];
  }, l = () => "ontouchstart" in globalThis || navigator.maxTouchPoints > 0, w = (g) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][g], h = (g) => {
    const M = [], R = ($) => $.filter((S) => !!S);
    for (let $ = 0; $ < g.length; $ += 3) {
      const S = [g[$], g[$ + 1], g[$ + 2]];
      M.push(R(S));
    }
    return M;
  }, _ = {
    prop: (g) => `"${g}" prop must be enabled!`,
    dateArr: (g) => `You need to use array as "model-value" binding in order to support "${g}"`
  }, b = (g, M, R, $, S) => {
    const p = {
      hours: getHours,
      minutes: getMinutes,
      seconds: getSeconds
    };
    if (!M) return $ ? [p[g](R), p[g](R)] : p[g](R);
    if (Array.isArray(M) && $) {
      const D = M[0] ?? R, V = M[1];
      return [p[g](D), V ? p[g](V) : S[g][1] ?? p[g](R)];
    }
    return Array.isArray(M) && !$ ? p[g](M[M.length - 1] ?? R) : p[g](M);
  };
  return {
    getMapKey: e,
    getMapKeyType: A,
    getMapDate: f,
    convertType: o,
    getNumVal: c,
    findNextFocusableElement: r,
    padZero: u,
    getElWithin: v,
    checkStopPropagation: Y,
    checkKeyDown: P,
    handleEventPropagation: B,
    findFocusableEl: O,
    isTouchDevice: l,
    hoursToAmPmHours: w,
    getGroupedList: h,
    setTimeModelValue: (g, M, R, $) => {
      g.hours = b("hours", M, R, $, g), g.minutes = b("minutes", M, R, $, g), g.seconds = b("seconds", M, R, $, g);
    },
    getTimeObjFromCurrent: (g, M, R) => {
      const $ = {
        hours: getHours(g),
        minutes: getMinutes(g),
        seconds: R ? getSeconds(g) : 0
      };
      return Object.assign($, M);
    },
    errorMapper: _
  };
}, We = () => {
  const { getDate: e } = Me(), { getMapDate: A, getGroupedList: f } = Ie(), o = (p, D) => {
    if (!p) return e();
    const V = e(p), F = set(V, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    return D ? startOfMonth(F) : F;
  }, c = (p, D) => {
    const V = e(D);
    return set(V, {
      hours: +(p.hours ?? getHours(V)),
      minutes: +(p.minutes ?? getMinutes(V)),
      seconds: +(p.seconds ?? getSeconds(V)),
      milliseconds: 0
    });
  }, s = (p, D) => {
    const V = startOfWeek(p, { weekStartsOn: +D }), F = endOfWeek(p, { weekStartsOn: +D });
    return [V, F];
  }, r = (p, D) => !p || !D ? false : isBefore(o(p), o(D)), u = (p, D) => !p || !D ? false : isEqual(o(p), o(D)), v = (p, D) => !p || !D ? false : isAfter(o(p), o(D)), Y = (p, D, V) => p?.[0] && p?.[1] ? v(V, p[0]) && r(V, p[1]) : p?.[0] && D ? v(V, p[0]) && r(V, D) || r(V, p[0]) && v(V, D) : false, P = (p, D) => {
    const V = v(p, D) ? D : p, F = v(D, p) ? D : p;
    return eachDayOfInterval({ start: V, end: F });
  }, B = (p) => `dp-${format(p, "yyyy-MM-dd")}`, O = (p) => o(set(e(p), { date: 1 })), l = (p, D) => {
    if (D) {
      const V = getYear(e(D));
      if (V > p) return 12;
      if (V === p) return getMonth(e(D));
    }
  }, w = (p, D) => {
    if (D) {
      const V = getYear(e(D));
      return V < p ? -1 : V === p ? getMonth(e(D)) : void 0;
    }
  }, h = (p) => {
    if (p) return getYear(e(p));
  }, _ = (p) => ({
    hours: getHours(p),
    minutes: getMinutes(p),
    seconds: getSeconds(p)
  });
  return {
    resetDateTime: o,
    groupListAndMap: (p, D) => f(p).map((V) => V.map((F) => {
      const { active: L, disabled: ne, isBetween: re, highlighted: X } = D(F);
      return {
        ...F,
        active: L,
        disabled: ne,
        className: {
          dp__overlay_cell_active: L,
          dp__overlay_cell: !L,
          dp__overlay_cell_disabled: ne,
          dp__overlay_cell_pad: true,
          dp__overlay_cell_active_disabled: ne && L,
          dp__cell_in_between: re,
          "dp--highlighted": X
        }
      };
    })),
    setTime: c,
    getWeekFromDate: s,
    isDateAfter: v,
    isDateBefore: r,
    isDateBetween: Y,
    isDateEqual: u,
    getDaysInBetween: P,
    getCellId: B,
    resetDate: O,
    getMinMonth: l,
    getMaxMonth: w,
    getYearFromDate: h,
    getTimeObj: _,
    setTimeValue: (p) => set(e(), _(p)),
    sanitizeTime: (p, D, V) => D && (V || V === 0) ? Object.fromEntries(
      ["hours", "minutes", "seconds"].map((F) => F === D ? [F, V] : [F, Number.isNaN(+p[F]) ? void 0 : +p[F]])
    ) : {
      hours: Number.isNaN(+p.hours) ? void 0 : +p.hours,
      minutes: Number.isNaN(+p.minutes) ? void 0 : +p.minutes,
      seconds: Number.isNaN(+(p.seconds ?? "")) ? void 0 : +p.seconds
    },
    getBeforeAndAfterInRange: (p, D) => {
      const V = subDays(o(D), p), F = addDays(o(D), p);
      return { before: V, after: F };
    },
    isModelAuto: (p) => Array.isArray(p) ? !!p[0] && !!p[1] : false,
    matchDate: (p, D) => p ? D ? D instanceof Map ? !!A(p, D) : D(e(p)) : false : true,
    checkHighlightMonth: (p, D, V) => typeof p == "function" ? p({ month: D, year: V }) : p.months.some((F) => F.month === D && F.year === V),
    checkHighlightYear: (p, D) => typeof p == "function" ? p(D) : p.years.includes(D)
  };
}, Zt = () => {
  const {
    defaults: { config: e }
  } = Me(), A = ref(0);
  onMounted(() => {
    f(), globalThis.addEventListener("resize", f, { passive: true });
  }), onUnmounted(() => {
    globalThis.removeEventListener("resize", f);
  });
  const f = () => {
    A.value = globalThis.document.documentElement.clientWidth;
  };
  return {
    isMobile: computed(() => A.value <= e.value.mobileBreakpoint ? true : void 0)
  };
}, pt = () => {
  const {
    getDate: e,
    state: A,
    modelValue: f,
    rootProps: o,
    defaults: { formats: c, textInput: s }
  } = Me(), r = (_) => format(setYear(e(), _), c.value.year, { locale: o.locale }), u = (_) => format(setMonth(e(), _), c.value.month, { locale: o.locale }), v = (_) => format(_, c.value.weekDay, { locale: o.locale }), Y = (_) => format(_, c.value.quarter, { locale: o.locale }), P = (_, b) => [_, b].map((E) => Y(E)).join("-"), B = (_) => format(_, c.value.day, { locale: o.locale }), O = (_, b, E) => {
    const k = E ? c.value.preview : c.value.input;
    if (!_) return "";
    if (typeof k == "function") return k(_);
    const g = b ?? k, M = { locale: o.locale };
    return Array.isArray(_) ? `${format(_[0], g, M)}${o.modelAuto && !_[1] ? "" : s.value.rangeSeparator}${_[1] ? format(_[1], g, M) : ""}` : format(_, g, M);
  }, l = () => {
    const _ = (b) => format(b, s.value.format);
    return Array.isArray(f.value) ? `${_(f.value[0])} ${s.value.rangeSeparator} ${f.value[1] ? _(f.value[1]) : ""}` : "";
  };
  return {
    formatYear: r,
    formatMonth: u,
    formatWeekDay: v,
    formatQuarter: Y,
    formatSelectedDate: O,
    formatForTextInput: () => A.isInputFocused && f.value ? Array.isArray(f.value) ? l() : format(f.value, s.value.format) : O(f.value),
    formatPreview: (_) => O(_, void 0, true),
    formatQuarterText: P,
    formatDay: B
  };
}, ea = () => {
  const { rootProps: e } = Me(), { formatYear: A, formatMonth: f } = pt();
  return {
    getMonths: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((r) => ({
      text: f(r),
      value: r
    })),
    getYears: () => {
      const r = [];
      for (let u = +e.yearRange[0]; u <= +e.yearRange[1]; u++)
        r.push({ value: +u, text: A(u) });
      return e.reverseYears ? r.reverse() : r;
    },
    isOutOfYearRange: (r) => r < +e.yearRange[0] || r > +e.yearRange[1]
  };
}, $r = (e) => ({
  openMenu: () => e.value?.openMenu(),
  closeMenu: () => e.value?.closeMenu(),
  selectDate: () => e.value?.selectDate(),
  clearValue: () => e.value?.clearValue(),
  formatInputValue: () => e.value?.formatInputValue(),
  updateInternalModelValue: (h) => e.value?.updateInternalModelValue(h),
  setMonthYear: (h, _) => e.value?.setMonthYear(h, _),
  parseModel: () => e.value?.parseModel(),
  switchView: (h, _) => e.value?.switchView(h, _),
  handleFlow: () => e.value?.handleFlow(),
  toggleMenu: () => e.value?.toggleMenu(),
  dpMenuRef: () => e.value?.dpMenuRef(),
  dpWrapMenuRef: () => e.value?.dpWrapMenuRef(),
  inputRef: () => e.value?.inputRef()
}), Pt = () => ({
  boolHtmlAttribute: (A) => A ? true : void 0
}), Sr = () => {
  const {
    getDate: e,
    rootProps: A,
    defaults: { textInput: f, startTime: o, timeConfig: c }
  } = Me(), { getTimeObjFromCurrent: s } = Ie(), r = ref(false), u = computed(
    () => Array.isArray(o.value) ? o.value[0] : o.value ?? s(e(), {}, c.value.enableSeconds)
  ), v = (l, w) => {
    const h = /[^a-zA-Z]+/g, _ = /\D+/g, b = w.split(_), E = l.split(h), k = l.match(h) || [], g = w.match(_) || [];
    let M = "";
    for (let R = 0; R < b.length && R < E.length; R++) {
      R > 0 && g[R - 1] && (M += k[R - 1] || g[R - 1]);
      const $ = b[R]?.length;
      M += E[R]?.slice(0, $);
    }
    return M;
  }, Y = (l, w, h) => {
    const _ = parse(l, v(w, l), e(), {
      locale: A.locale
    });
    return isValid(_) && isDate(_) ? h || r.value ? _ : set(_, {
      hours: +u.value.hours,
      minutes: +u.value.minutes,
      seconds: +(u.value.seconds ?? 0),
      milliseconds: 0
    }) : null;
  };
  return {
    textPasted: r,
    parseFreeInput: (l, w) => {
      if (typeof f.value.pattern == "string")
        return Y(l, f.value.pattern, w);
      if (Array.isArray(f.value.pattern)) {
        let h = null;
        for (const _ of f.value.pattern)
          if (h = Y(l, _, w), h)
            break;
        return h;
      }
      return typeof f.value.pattern == "function" ? f.value.pattern(l) : null;
    },
    applyMaxValues: (l, w) => {
      const h = {
        MM: 12,
        DD: 31,
        hh: 23,
        mm: 59,
        ss: 59
      };
      let _ = "", b = 0;
      for (let E = 0; E < w.length; E++) {
        const k = w[E], g = k.length, M = l.slice(b, b + g);
        if (!M) break;
        if (M.length < g)
          _ += M;
        else {
          let R = Number.parseInt(M, 10);
          h[k] && R > h[k] && (R = h[k]), _ += R.toString().padStart(g, "0").slice(0, g);
        }
        b += g;
      }
      return _;
    },
    createMaskedValue: (l, w) => {
      const h = /(YYYY|MM|DD|hh|mm|ss)/g, _ = [...w.matchAll(h)].map((M) => M[0]), b = w.replace(h, "|").split("|").filter(Boolean), E = _.map((M) => M.length);
      let k = "", g = 0;
      for (let M = 0; M < _.length; M++) {
        const R = E[M], $ = l.slice(g, g + R);
        if (!$) break;
        k += $, $.length === R && b[M] && (k += b[M]), g += R;
      }
      return k;
    }
  };
};
var at = /* @__PURE__ */ ((e) => (e.Input = "input", e.DatePicker = "date-picker", e.Calendar = "calendar", e.DatePickerHeader = "date-picker-header", e.Menu = "menu", e.ActionRow = "action-row", e.TimePicker = "time-picker", e.TimeInput = "time-input", e.PassTrough = "pass-trough", e.MonthPicker = "month-picker", e.YearMode = "year-mode", e.QuarterPicker = "quarter-picker", e.YearPicker = "year-picker", e))(at || {});
const wt = [
  "time-input",
  "time-picker",
  "pass-trough"
  /* PassTrough */
], Va = [
  { name: "trigger", use: [
    "input"
    /* Input */
  ] },
  { name: "input-icon", use: [
    "input"
    /* Input */
  ] },
  { name: "clear-icon", use: [
    "input"
    /* Input */
  ] },
  { name: "dp-input", use: [
    "input"
    /* Input */
  ] },
  { name: "clock-icon", use: [
    "time-picker",
    "time-input",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "arrow-left", use: [
    "date-picker-header",
    "pass-trough",
    "year-mode"
    /* YearMode */
  ] },
  { name: "arrow-right", use: [
    "date-picker-header",
    "pass-trough",
    "year-mode"
    /* YearMode */
  ] },
  {
    name: "arrow-up",
    use: [
      "time-picker",
      "time-input",
      "date-picker-header",
      "pass-trough"
      /* PassTrough */
    ]
  },
  {
    name: "arrow-down",
    use: [
      "time-picker",
      "time-input",
      "date-picker-header",
      "pass-trough"
      /* PassTrough */
    ]
  },
  {
    name: "calendar-icon",
    use: [
      "date-picker-header",
      "time-picker",
      "pass-trough",
      "year-mode"
      /* YearMode */
    ]
  },
  { name: "day", use: [
    "calendar",
    "pass-trough"
    /* PassTrough */
  ] },
  {
    name: "month-overlay-value",
    use: [
      "date-picker-header",
      "pass-trough",
      "month-picker"
      /* MonthPicker */
    ]
  },
  {
    name: "year-overlay-value",
    use: [
      "date-picker-header",
      "pass-trough",
      "year-mode",
      "year-picker"
      /* YearPicker */
    ]
  },
  { name: "year-overlay", use: [
    "date-picker-header",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "month-overlay", use: [
    "date-picker-header",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "month-overlay-header", use: [
    "date-picker-header",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "year-overlay-header", use: [
    "date-picker-header",
    "pass-trough"
    /* PassTrough */
  ] },
  {
    name: "hours-overlay-value",
    use: wt
  },
  {
    name: "hours-overlay-header",
    use: wt
  },
  {
    name: "minutes-overlay-value",
    use: wt
  },
  {
    name: "minutes-overlay-header",
    use: wt
  },
  {
    name: "seconds-overlay-value",
    use: wt
  },
  {
    name: "seconds-overlay-header",
    use: wt
  },
  { name: "hours", use: [
    "time-input",
    "time-picker",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "minutes", use: [
    "time-input",
    "time-picker",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "seconds", use: [
    "time-input",
    "time-picker",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "month", use: [
    "date-picker-header",
    "time-picker",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "year", use: [
    "date-picker-header",
    "time-picker",
    "pass-trough",
    "year-mode"
    /* YearMode */
  ] },
  { name: "action-buttons", use: [
    "action-row"
    /* ActionRow */
  ] },
  { name: "action-preview", use: [
    "action-row"
    /* ActionRow */
  ] },
  { name: "calendar-header", use: [
    "calendar",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "marker-tooltip", use: [
    "calendar",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "action-extra", use: [
    "menu"
    /* Menu */
  ] },
  { name: "time-picker-overlay", use: [
    "time-picker",
    "time-picker",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "am-pm-button", use: [
    "time-picker",
    "time-input",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "left-sidebar", use: [
    "menu"
    /* Menu */
  ] },
  { name: "right-sidebar", use: [
    "menu"
    /* Menu */
  ] },
  {
    name: "month-year",
    use: [
      "date-picker-header",
      "pass-trough",
      "month-picker",
      "year-picker"
      /* YearPicker */
    ]
  },
  { name: "time-picker", use: [
    "date-picker",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "action-row", use: [
    "action-row"
    /* ActionRow */
  ] },
  { name: "marker", use: [
    "calendar",
    "pass-trough"
    /* PassTrough */
  ] },
  { name: "quarter", use: [
    "quarter-picker",
    "pass-trough"
    /* PassTrough */
  ] },
  {
    name: "top-extra",
    use: [
      "date-picker-header",
      "pass-trough",
      "month-picker",
      "quarter-picker",
      "year-picker"
      /* YearPicker */
    ]
  },
  {
    name: "tp-inline-arrow-up",
    use: [
      "date-picker",
      "time-input",
      "time-picker",
      "pass-trough"
      /* PassTrough */
    ]
  },
  {
    name: "tp-inline-arrow-down",
    use: [
      "date-picker",
      "time-input",
      "time-picker",
      "pass-trough"
      /* PassTrough */
    ]
  },
  { name: "arrow", use: [
    "menu"
    /* Menu */
  ] },
  { name: "menu-header", use: [
    "menu"
    /* Menu */
  ] }
], lt = (e, A) => Va.filter((f) => e[f.name] && f.use.includes(A)).map((f) => f.name), Fa = (e, A) => Va.map((f) => f.name).concat(A?.filter((f) => f.slot).map((f) => f.slot) ?? []).filter((f) => !!e[f]), Rr = {
  key: 1,
  class: "dp__input_wrap"
}, Cr = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"], xr = {
  key: 1,
  class: "dp--clear-btn"
}, Or = ["aria-label"], Yr = /* @__PURE__ */ defineComponent({
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false }
  },
  emits: ["clear", "open", "set-input-date", "close", "select-date", "set-empty-date", "toggle", "focus", "blur", "real-blur"],
  setup(e, { expose: A, emit: f }) {
    const o = f, c = e, {
      rootEmit: s,
      inputValue: r,
      rootProps: u,
      defaults: { textInput: v, ariaLabels: Y, inline: P, config: B, range: O, multiDates: l, ui: w, inputAttrs: h }
    } = Me(), { checkMinMaxRange: _, isValidDate: b } = Ue(), { parseFreeInput: E, textPasted: k, createMaskedValue: g, applyMaxValues: M } = Sr(), { checkKeyDown: R, checkStopPropagation: $ } = Ie(), { boolHtmlAttribute: S } = Pt(), p = useTemplateRef("dp-input"), D = ref(null), V = ref(false), F = computed(
      () => ({
        dp__pointer: !u.disabled && !u.readonly && !v.value.enabled,
        dp__disabled: u.disabled,
        dp__input_readonly: !v.value.enabled,
        dp__input: true,
        dp__input_not_clearable: !h.value.clearable,
        dp__input_icon_pad: !h.value.hideInputIcon,
        dp__input_valid: typeof h.value.state == "boolean" ? h.value.state : false,
        dp__input_invalid: typeof h.value.state == "boolean" ? !h.value.state : false,
        dp__input_focus: V.value || c.isMenuOpen,
        dp__input_reg: !v.value.enabled,
        ...w.value.input
      })
    ), L = () => {
      o("set-input-date", null), h && u.autoApply && (o("set-empty-date"), D.value = null);
    }, ne = (Q) => {
      if (v.value.separators?.length) {
        const I = new RegExp(
          v.value.separators.map((y) => y.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")
        );
        return Q.split(I);
      }
      return Q.split(v.value.rangeSeparator);
    }, re = (Q) => {
      const [I, y] = ne(Q);
      if (I) {
        const H = E(I.trim(), r.value), fe = y ? E(y.trim(), r.value) : void 0;
        if (isAfter(H, fe)) return;
        const Pe = H && fe ? [H, fe] : [H];
        _(fe, Pe, 0) && (D.value = H ? Pe : null);
      }
    }, X = () => {
      k.value = true;
    }, x = (Q) => {
      if (O.value.enabled)
        re(Q);
      else if (l.value.enabled) {
        const I = Q.split(";");
        D.value = I.map((y) => E(y.trim())).filter((y) => !!y);
      } else
        D.value = E(Q, r.value);
    }, te = (Q) => {
      const I = typeof Q == "string" ? Q : Q.target?.value, y = v?.value?.maskFormat;
      let H = I;
      if (typeof y == "string") {
        const fe = /(YYYY|MM|DD|hh|mm|ss)/g, Ce = [...y.matchAll(fe)].map((a) => a[0]), i = I.replace(/\D/g, ""), d = M(i, Ce);
        H = g(d, y);
      }
      H === "" ? L() : (v.value.openMenu && !c.isMenuOpen && o("open"), x(H), o("set-input-date", D.value)), k.value = false, r.value = H, s("text-input", Q, D.value);
    }, q = (Q) => {
      v.value.enabled ? (x(Q.target.value), v.value.enterSubmit && b(D.value) && r.value !== "" ? (o("set-input-date", D.value, true), D.value = null) : v.value.enterSubmit && r.value === "" && (D.value = null, o("clear"))) : Z(Q);
    }, oe = (Q, I) => {
      v.value.enabled && v.value.tabSubmit && !I && x(Q.target.value), v.value.tabSubmit && b(D.value) && r.value !== "" ? (o("set-input-date", D.value, true, true), D.value = null) : v.value.tabSubmit && r.value === "" && (D.value = null, o("clear"));
    }, K = () => {
      V.value = true, o("focus"), nextTick().then(() => {
        v.value.enabled && v.value.selectOnFocus && p.value?.select();
      });
    }, Z = (Q) => {
      if ($(Q, B.value, true), v.value.enabled && v.value.openMenu && !P.value.input) {
        if (v.value.openMenu === "open" && !c.isMenuOpen) return o("open");
        if (v.value.openMenu === "toggle") return o("toggle");
      } else v.value.enabled || o("toggle");
    }, de = () => {
      o("real-blur"), V.value = false, (!c.isMenuOpen || P.value.enabled && P.value.input) && o("blur"), (u.autoApply && v.value.enabled && D.value && !c.isMenuOpen || v.value.applyOnBlur) && (o("set-input-date", D.value), o("select-date"), D.value = null);
    }, G = (Q) => {
      $(Q, B.value, true), o("clear");
    }, ce = () => {
      o("close");
    }, le = (Q) => {
      if (Q.key === "Tab" && oe(Q), Q.key === "Enter" && q(Q), Q.key === "Escape" && v.value.escClose && ce(), !v.value.enabled) {
        if (Q.code === "Tab") return;
        Q.preventDefault();
      }
    }, we = () => {
      p.value?.focus({ preventScroll: true });
    }, ve = (Q) => {
      D.value = Q;
    }, Ae = (Q) => {
      Q.key === $e.tab && oe(Q, true);
    };
    return A({
      focusInput: we,
      setParsedDate: ve
    }), (Q, I) => (openBlock(), createElementBlock("div", { onClick: Z }, [
      !Q.$slots["dp-input"] && !unref(P).enabled ? renderSlot(Q.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
      !Q.$slots.trigger && (!unref(P).enabled || unref(P).input) ? (openBlock(), createElementBlock("div", Rr, [
        !Q.$slots.trigger && (!unref(P).enabled || unref(P).enabled && unref(P).input) ? renderSlot(Q.$slots, "dp-input", {
          key: 0,
          value: unref(r),
          isMenuOpen: e.isMenuOpen,
          onInput: te,
          onEnter: q,
          onTab: oe,
          onClear: G,
          onBlur: de,
          onKeypress: le,
          onPaste: X,
          onFocus: K,
          openMenu: () => Q.$emit("open"),
          closeMenu: () => Q.$emit("close"),
          toggleMenu: () => Q.$emit("toggle")
        }, () => [
          createBaseVNode("input", {
            id: unref(h).id,
            ref: "dp-input",
            "data-test-id": "dp-input",
            name: unref(h).name,
            class: normalizeClass(F.value),
            inputmode: unref(h).inputmode,
            placeholder: unref(u).placeholder,
            disabled: unref(S)(unref(u).disabled),
            readonly: unref(S)(unref(u).readonly),
            required: unref(S)(unref(h).required),
            value: unref(r),
            autocomplete: unref(h).autocomplete,
            "aria-label": unref(Y).input,
            "aria-disabled": unref(u).disabled || void 0,
            "aria-invalid": unref(h).state === false ? true : void 0,
            onInput: te,
            onBlur: de,
            onFocus: K,
            onKeypress: le,
            onKeydown: I[0] || (I[0] = (y) => le(y)),
            onPaste: X,
            onInvalid: I[1] || (I[1] = (y) => unref(s)("invalid", y))
          }, null, 42, Cr)
        ]) : createCommentVNode("", true),
        createBaseVNode("div", {
          onClick: I[4] || (I[4] = (y) => o("toggle"))
        }, [
          Q.$slots["input-icon"] && !unref(h).hideInputIcon ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: "dp__input_icon",
            onClick: I[2] || (I[2] = (y) => o("toggle"))
          }, [
            renderSlot(Q.$slots, "input-icon")
          ])) : createCommentVNode("", true),
          !Q.$slots["input-icon"] && !unref(h).hideInputIcon && !Q.$slots["dp-input"] ? (openBlock(), createBlock(unref(Et), {
            key: 1,
            "aria-label": unref(Y)?.calendarIcon,
            class: "dp__input_icon dp__input_icons",
            onClick: I[3] || (I[3] = (y) => o("toggle"))
          }, null, 8, ["aria-label"])) : createCommentVNode("", true)
        ]),
        Q.$slots["clear-icon"] && (unref(h).alwaysClearable || unref(r) && unref(h).clearable && !unref(u).disabled && !unref(u).readonly) ? (openBlock(), createElementBlock("span", xr, [
          renderSlot(Q.$slots, "clear-icon", { clear: G })
        ])) : createCommentVNode("", true),
        !Q.$slots["clear-icon"] && (unref(h).alwaysClearable || unref(h).clearable && unref(r) && !unref(u).disabled && !unref(u).readonly) ? (openBlock(), createElementBlock("button", {
          key: 2,
          "aria-label": unref(Y)?.clearInput,
          class: "dp--clear-btn",
          type: "button",
          "data-test-id": "clear-input-value-btn",
          onKeydown: I[5] || (I[5] = (y) => unref(R)(y, () => G(y), true, Ae)),
          onClick: I[6] || (I[6] = withModifiers((y) => G(y), ["prevent"]))
        }, [
          createVNode(unref(On), { class: "dp__input_icons" })
        ], 40, Or)) : createCommentVNode("", true)
      ])) : createCommentVNode("", true)
    ]));
  }
}), Br = {
  ref: "action-row",
  class: "dp__action_row"
}, Ir = ["title"], Er = {
  ref: "action-buttons-container",
  class: "dp__action_buttons",
  "data-dp-element": "action-row"
}, Vr = ["disabled"], Fr = /* @__PURE__ */ defineComponent({
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { default: 0 }
  },
  emits: ["close-picker", "select-date", "select-now"],
  setup(e, { emit: A }) {
    const f = A, o = e, {
      rootEmit: c,
      rootProps: s,
      modelValue: r,
      defaults: { actionRow: u, multiCalendars: v, inline: Y, range: P, multiDates: B, formats: O }
    } = Me(), { isTimeValid: l, isMonthValid: w } = Ue(), { formatPreview: h } = pt(), { checkKeyDown: _, convertType: b } = Ie(), { boolHtmlAttribute: E } = Pt(), k = useTemplateRef("action-buttons-container"), g = useTemplateRef("action-row"), M = ref(false), R = ref({});
    onMounted(() => {
      $(), globalThis.addEventListener("resize", $);
    }), onUnmounted(() => {
      globalThis.removeEventListener("resize", $);
    });
    const $ = () => {
      M.value = false, setTimeout(() => {
        const X = k.value?.getBoundingClientRect(), x = g.value?.getBoundingClientRect();
        X && x && (R.value.maxWidth = `${x.width - X.width - 20}px`), M.value = true;
      }, 0);
    }, S = computed(() => P.value.enabled && !P.value.partialRange && r.value ? r.value.length === 2 : true), p = computed(
      () => !l.value(r.value) || !w.value(r.value) || !S.value
    ), D = () => {
      const X = O.value.preview;
      return s.timePicker || s.monthPicker, X(b(r.value));
    }, V = () => {
      const X = r.value;
      return v.value.count > 0 ? `${h(X[0])} - ${h(X[1])}` : [h(X[0]), h(X[1])];
    }, F = computed(() => !r.value || !o.menuMount ? "" : typeof O.value.preview == "string" ? Array.isArray(r.value) ? r.value.length === 2 && r.value[1] ? V() : B.value.enabled ? r.value.map((X) => `${h(X)}`) : s.modelAuto ? `${h(r.value[0])}` : `${h(r.value[0])} -` : h(r.value) : D()), L = () => B.value.enabled ? "; " : " - ", ne = computed(
      () => Array.isArray(F.value) ? F.value.join(L()) : F.value
    ), re = () => {
      l.value(r.value) && w.value(r.value) && S.value ? f("select-date") : c("invalid-select");
    };
    return (X, x) => (openBlock(), createElementBlock("div", Br, [
      X.$slots["action-row"] ? renderSlot(X.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        modelValue: unref(r),
        disabled: p.value,
        selectDate: () => X.$emit("select-date"),
        closePicker: () => X.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(u).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: ne.value || void 0,
          style: normalizeStyle(R.value)
        }, [
          X.$slots["action-preview"] && M.value ? renderSlot(X.$slots, "action-preview", {
            key: 0,
            value: unref(r),
            formatValue: ne.value
          }) : createCommentVNode("", true),
          !X.$slots["action-preview"] && M.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(ne.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, Ir)) : createCommentVNode("", true),
        createBaseVNode("div", Er, [
          X.$slots["action-buttons"] ? renderSlot(X.$slots, "action-buttons", {
            key: 0,
            value: unref(r),
            selectDate: re,
            selectionDisabled: p.value
          }) : createCommentVNode("", true),
          X.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(Y).enabled && unref(u).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref: "cancel-btn",
              type: "button",
              "data-dp-action-element": "0",
              class: "dp__action_button dp__action_cancel",
              onClick: x[0] || (x[0] = (te) => X.$emit("close-picker")),
              onKeydown: x[1] || (x[1] = (te) => unref(_)(te, () => X.$emit("close-picker")))
            }, toDisplayString(unref(u).cancelBtnLabel), 545)) : createCommentVNode("", true),
            unref(u).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              "data-dp-action-element": "0",
              class: "dp__action_button dp__action_cancel",
              onClick: x[2] || (x[2] = (te) => X.$emit("select-now")),
              onKeydown: x[3] || (x[3] = (te) => unref(_)(te, () => X.$emit("select-now")))
            }, toDisplayString(unref(u).nowBtnLabel), 33)) : createCommentVNode("", true),
            unref(u).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref: "select-btn",
              type: "button",
              "data-dp-action-element": "0",
              class: "dp__action_button dp__action_select",
              disabled: unref(E)(p.value),
              "data-test-id": "select-button",
              onKeydown: x[4] || (x[4] = (te) => unref(_)(te, () => re())),
              onClick: re
            }, toDisplayString(unref(u).selectBtnLabel), 41, Vr)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
}), ta = () => {
  const {
    rootProps: e,
    defaults: { multiCalendars: A }
  } = Me(), f = computed(() => (s) => e.hideNavigation?.includes(s)), o = computed(() => (s) => A.value.count ? A.value.solo ? true : s === 0 : true), c = computed(() => (s) => A.value.count ? A.value.solo ? true : s === A.value.count - 1 : true);
  return { hideNavigationButtons: f, showLeftIcon: o, showRightIcon: c };
}, Nr = ["role", "aria-label", "tabindex"], Wr = { class: "dp__selection_grid_header" }, Lr = ["aria-selected", "aria-disabled", "data-dp-action-element", "data-dp-element-active", "data-test-id", "onClick", "onKeydown", "onMouseover"], Hr = ["aria-label", "data-dp-action-element"], Nt = /* @__PURE__ */ defineComponent({
  __name: "SelectionOverlay",
  props: {
    items: {},
    type: {},
    useRelative: { type: Boolean },
    height: {},
    overlayLabel: {},
    isLast: { type: Boolean },
    level: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e, { emit: A }) {
    const f = A, o = e, {
      setState: c,
      defaults: { ariaLabels: s, config: r }
    } = Me(), { hideNavigationButtons: u } = ta(), { handleEventPropagation: v, checkKeyDown: Y } = Ie(), P = useTemplateRef("toggle-button"), B = useTemplateRef("overlay-container"), O = useTemplateRef("grid-wrap"), l = ref(false), w = ref(null), h = ref(), _ = ref(0);
    onBeforeUpdate(() => {
      w.value = null;
    }), onMounted(async () => {
      await nextTick(), R(), c("arrowNavigationLevel", o.level ?? 1);
    }), onUnmounted(() => {
      c("arrowNavigationLevel", (o.level ?? 1) - 1);
    });
    const b = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !o.useRelative,
        "dp--overlay-relative": o.useRelative
      })
    ), E = computed(
      () => o.useRelative ? { height: `${o.height}px`, width: "var(--dp-menu-min-width)" } : void 0
    ), k = computed(() => ({
      dp__overlay_col: true
    })), g = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: l.value,
        dp__button_bottom: o.isLast
      })
    ), M = computed(() => ({
      dp__overlay_container: true,
      dp__container_flex: o.items?.length <= 6,
      dp__container_block: o.items?.length > 6
    }));
    watch(
      () => o.items,
      () => R(false),
      { deep: true }
    );
    const R = (L = true) => {
      nextTick().then(() => {
        const ne = document.querySelector(`[data-dp-element-active="${o.level ?? 1}"]`), re = unrefElement(O), X = unrefElement(P), x = unrefElement(B), te = X ? X.getBoundingClientRect().height : 0;
        re && (re.getBoundingClientRect().height ? _.value = re.getBoundingClientRect().height - te : _.value = r.value.modeHeight - te), ne && x && L && (x.scrollTop = ne.offsetTop - x.offsetTop - (_.value / 2 - ne.getBoundingClientRect().height) - te);
      });
    }, $ = (L) => {
      L.disabled || f("selected", L.value);
    }, S = () => {
      f("toggle"), f("reset-flow");
    }, p = (L) => {
      r.value.escClose && (S(), v(L, r.value));
    }, D = (L) => {
      h.value = L, f("hover-value", L);
    }, V = (L) => {
      if (L.key === $e.esc) return p(L);
    }, F = (L) => {
      if (L.key === $e.enter) return S();
    };
    return (L, ne) => (openBlock(), createElementBlock("div", {
      ref: "grid-wrap",
      class: normalizeClass(b.value),
      style: normalizeStyle(E.value),
      role: e.useRelative ? void 0 : "dialog",
      "aria-label": e.overlayLabel,
      tabindex: e.useRelative ? void 0 : "0",
      onKeydown: V,
      onClick: ne[0] || (ne[0] = withModifiers(() => {
      }, ["prevent"]))
    }, [
      createBaseVNode("div", {
        ref: "overlay-container",
        class: normalizeClass(M.value),
        style: normalizeStyle({ "--dp-overlay-height": `${_.value}px` }),
        role: "grid"
      }, [
        createBaseVNode("div", Wr, [
          renderSlot(L.$slots, "header")
        ]),
        renderSlot(L.$slots, "overlay", {}, () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.items, (re, X) => (openBlock(), createElementBlock("div", {
            key: X,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: e.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(re, (x) => (openBlock(), createElementBlock("div", {
              key: x.value,
              role: "gridcell",
              class: normalizeClass(k.value),
              "aria-selected": x.active || void 0,
              "aria-disabled": x.disabled || void 0,
              "data-dp-action-element": e.level ?? 1,
              "data-dp-element-active": x.active ? e.level ?? 1 : void 0,
              tabindex: "0",
              "data-test-id": x.text,
              onClick: withModifiers((te) => $(x), ["prevent"]),
              onKeydown: (te) => unref(Y)(te, () => $(x), true),
              onMouseover: (te) => D(x.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(x.className)
              }, [
                renderSlot(L.$slots, "item", { item: x }, () => [
                  createTextVNode(toDisplayString(x.text), 1)
                ])
              ], 2)
            ], 42, Lr))), 128))
          ], 2))), 128))
        ])
      ], 6),
      L.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
        key: 0,
        ref: "toggle-button",
        type: "button",
        "aria-label": unref(s)?.toggleOverlay,
        class: normalizeClass(g.value),
        tabindex: "0",
        "data-dp-action-element": e.level ?? 1,
        onClick: S,
        onKeydown: F
      }, [
        renderSlot(L.$slots, "button-icon")
      ], 42, Hr)), [
        [vShow, !unref(u)(e.type)]
      ]) : createCommentVNode("", true)
    ], 46, Nr));
  }
}), jr = ["data-dp-mobile"], aa = /* @__PURE__ */ defineComponent({
  __name: "InstanceWrap",
  props: {
    stretch: { type: Boolean },
    collapse: { type: Boolean }
  },
  setup(e) {
    const {
      defaults: { multiCalendars: A }
    } = Me(), { isMobile: f } = Zt(), o = computed(
      () => A.value.count > 0 ? [...new Array(A.value.count).keys()] : [0]
    );
    return (c, s) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !e.stretch,
        "dp--menu--inner-stretched": e.stretch,
        dp__flex_display: unref(A).count > 0,
        "dp--flex-display-collapsed": e.collapse
      }),
      "data-dp-mobile": unref(f)
    }, [
      renderSlot(c.$slots, "default", {
        instances: o.value,
        wrapClass: { dp__instance_calendar: unref(A).count > 0 }
      })
    ], 10, jr));
  }
}), Kr = ["data-dp-element", "aria-label", "aria-disabled"], Bt = /* @__PURE__ */ defineComponent({
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    elName: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: A }) {
    const { checkKeyDown: f } = Ie(), o = A;
    return (c, s) => (openBlock(), createElementBlock("button", {
      ref: "arrow-btn",
      type: "button",
      "data-dp-element": e.elName,
      "data-dp-action-element": "0",
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": e.ariaLabel,
      "aria-disabled": e.disabled || void 0,
      onClick: s[0] || (s[0] = (r) => o("activate")),
      onKeydown: s[1] || (s[1] = (r) => unref(f)(r, () => o("activate"), true))
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: e.disabled }])
      }, [
        renderSlot(c.$slots, "default")
      ], 2)
    ], 40, Kr));
  }
}), zr = ["aria-label", "data-test-id"], Na = /* @__PURE__ */ defineComponent({
  __name: "YearModePicker",
  props: {
    items: {},
    instance: {},
    year: {},
    showYearPicker: { type: Boolean, default: false },
    isDisabled: {}
  },
  emits: ["handle-year", "year-select", "toggle-year-picker"],
  setup(e, { emit: A }) {
    const f = A, o = e, { showRightIcon: c, showLeftIcon: s } = ta(), {
      rootProps: r,
      defaults: { config: u, ariaLabels: v, ui: Y }
    } = Me(), { showTransition: P, transitionName: B } = Vt(), { formatYear: O } = pt(), { boolHtmlAttribute: l } = Pt(), w = ref(false), h = computed(() => O(o.year)), _ = (k = false, g) => {
      w.value = !w.value, f("toggle-year-picker", { flow: k, show: g });
    }, b = (k) => {
      w.value = false, f("year-select", k);
    }, E = (k = false) => {
      f("handle-year", k);
    };
    return (k, g) => (openBlock(), createElementBlock(Fragment, null, [
      createBaseVNode("div", {
        class: normalizeClass(["dp--year-mode-picker", { "dp--hidden-el": w.value }])
      }, [
        unref(s)(e.instance) ? (openBlock(), createBlock(Bt, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": unref(v)?.prevYear,
          disabled: unref(l)(e.isDisabled(false)),
          class: normalizeClass(unref(Y)?.navBtnPrev),
          onActivate: g[0] || (g[0] = (M) => E(false))
        }, {
          default: withCtx(() => [
            k.$slots["arrow-left"] ? renderSlot(k.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", !0),
            k.$slots["arrow-left"] ? createCommentVNode("", !0) : (openBlock(), createBlock(unref(Ca), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
        createBaseVNode("button", {
          ref: "mpYearButtonRef",
          class: "dp__btn dp--year-select",
          type: "button",
          "aria-label": `${e.year}-${unref(v)?.openYearsOverlay}`,
          "data-test-id": `year-mode-btn-${e.instance}`,
          "data-dp-action-element": "0",
          onClick: g[1] || (g[1] = () => _(false)),
          onKeydown: g[2] || (g[2] = withKeys(withModifiers(() => _(false), ["prevent"]), ["enter"]))
        }, [
          k.$slots.year ? renderSlot(k.$slots, "year", {
            key: 0,
            text: h.value,
            value: e.year
          }) : createCommentVNode("", true),
          k.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e.year), 1)
          ], 64))
        ], 40, zr),
        unref(c)(e.instance) ? (openBlock(), createBlock(Bt, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": unref(v)?.nextYear,
          disabled: unref(l)(e.isDisabled(true)),
          class: normalizeClass(unref(Y)?.navBtnNext),
          onActivate: g[3] || (g[3] = (M) => E(true))
        }, {
          default: withCtx(() => [
            k.$slots["arrow-right"] ? renderSlot(k.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", !0),
            k.$slots["arrow-right"] ? createCommentVNode("", !0) : (openBlock(), createBlock(unref(xa), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true)
      ], 2),
      createVNode(Transition, {
        name: unref(B)(e.showYearPicker),
        css: unref(P)
      }, {
        default: withCtx(() => [
          e.showYearPicker ? (openBlock(), createBlock(Nt, {
            key: 0,
            items: e.items,
            config: unref(u),
            "is-last": unref(r).autoApply && !unref(u).keepActionRow,
            "overlay-label": unref(v)?.yearPicker?.(!0),
            type: "year",
            onToggle: _,
            onSelected: g[4] || (g[4] = (M) => b(M))
          }, createSlots({
            "button-icon": withCtx(() => [
              k.$slots["calendar-icon"] ? renderSlot(k.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", !0),
              k.$slots["calendar-icon"] ? createCommentVNode("", !0) : (openBlock(), createBlock(unref(Et), { key: 1 }))
            ]),
            _: 2
          }, [
            k.$slots["year-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: M }) => [
                renderSlot(k.$slots, "year-overlay-value", {
                  text: M.text,
                  value: M.value
                })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["items", "config", "is-last", "overlay-label"])) : createCommentVNode("", !0)
        ]),
        _: 3
      }, 8, ["name", "css"])
    ], 64));
  }
}), Wa = (e) => {
  const {
    getDate: A,
    rootEmit: f,
    state: o,
    month: c,
    year: s,
    modelValue: r,
    calendars: u,
    rootProps: v,
    defaults: { multiCalendars: Y, range: P, safeDates: B, filters: O, highlight: l }
  } = Me(), { resetDate: w, getYearFromDate: h, checkHighlightYear: _, groupListAndMap: b } = We(), { getYears: E } = ea(), { validateMonthYear: k, checkMinMaxValue: g } = Ue(), M = ref([false]), R = computed(() => E()), $ = computed(() => (K, Z) => {
    const de = set(w(A()), {
      month: c.value(K),
      year: s.value(K)
    }), G = Z ? endOfYear(de) : startOfYear(de);
    return k(G, v.preventMinMaxNavigation, Z);
  }), S = () => Array.isArray(r.value) && Y.value.solo && r.value[1], p = () => {
    for (let K = 0; K < Y.value.count; K++)
      if (K === 0)
        u.value[K] = u.value[0];
      else if (K === Y.value.count - 1 && S())
        u.value[K] = {
          month: getMonth(r.value[1]),
          year: getYear(r.value[1])
        };
      else {
        const Z = set(A(), u.value[K - 1]);
        u.value[K] = { month: getMonth(Z), year: getYear(addYears(Z, 1)) };
      }
  }, D = (K) => {
    if (!K) return p();
    const Z = set(A(), u.value[K]);
    return u.value[0].year = getYear(subYears(Z, Y.value.count - 1)), p();
  }, V = (K, Z) => {
    const de = differenceInYears(Z, K);
    return P.value.showLastInRange && de > 1 ? Z : K;
  }, F = (K) => v.focusStartDate || Y.value.solo ? K[0] : K[1] ? V(K[0], K[1]) : K[0], L = () => {
    if (r.value) {
      const K = Array.isArray(r.value) ? F(r.value) : r.value;
      u.value[0] = { month: getMonth(K), year: getYear(K) };
    }
  }, ne = () => {
    L(), Y.value.count && p();
  };
  watch(r, (K, Z) => {
    o.isTextInputDate && JSON.stringify(K ?? {}) !== JSON.stringify(Z ?? {}) && ne();
  }), onMounted(() => {
    ne();
  });
  const re = (K, Z) => {
    u.value[Z].year = K, f("update-month-year", { instance: Z, year: K, month: u.value[Z].month }), Y.value.count && !Y.value.solo && D(Z);
  }, X = computed(() => (K) => b(R.value, (Z) => {
    const de = s.value(K) === Z.value, G = g(
      Z.value,
      h(B.value.minDate),
      h(B.value.maxDate)
    ) || O.value.years?.includes(s.value(K)), ce = _(l.value, Z.value);
    return { active: de, disabled: G, highlighted: ce };
  })), x = (K, Z) => {
    re(K, Z), q(Z);
  }, te = (K, Z = false) => {
    if (!$.value(K, Z)) {
      const de = Z ? s.value(K) + 1 : s.value(K) - 1;
      re(de, K);
    }
  }, q = (K, Z = false, de) => {
    Z || e("reset-flow"), de === void 0 ? M.value[K] = !M.value[K] : M.value[K] = de, M.value[K] ? f("overlay-toggle", { open: true, overlay: He.year }) : f("overlay-toggle", { open: false, overlay: He.year });
  };
  return {
    isDisabled: $,
    groupedYears: X,
    showYearPicker: M,
    selectYear: re,
    setStartDate: () => {
      v.startDate && (r.value && v.focusStartDate || !r.value) && re(getYear(A(v.startDate)), 0);
    },
    toggleYearPicker: q,
    handleYearSelect: x,
    handleYear: te
  };
}, na = () => {
  const { isDateAfter: e, isDateBefore: A, isDateEqual: f } = We(), {
    getDate: o,
    rootEmit: c,
    rootProps: s,
    modelValue: r,
    defaults: { range: u }
  } = Me();
  return {
    getRangeWithFixedDate: (l) => Array.isArray(r.value) && (r.value.length === 2 || r.value.length === 1 && u.value.partialRange) ? u.value.fixedStart && (e(l, r.value[0]) || f(l, r.value[0])) ? [r.value[0], l] : u.value.fixedEnd && (A(l, r.value[1]) || f(l, r.value[1])) ? [l, r.value[1]] : (c("invalid-fixed-range", l), r.value) : [],
    setPresetDate: (l) => {
      Array.isArray(l.value) && l.value.length <= 2 && u.value.enabled ? r.value = l.value.map((w) => o(w)) : Array.isArray(l.value) || (r.value = o(l.value));
    },
    checkRangeAutoApply: (l, w, h) => {
      u && (l[0] && l[1] && s.autoApply && w("auto-apply", h), l[0] && !l[1] && (s.modelAuto || u.value.partialRange) && s.autoApply && w("auto-apply", h));
    },
    setMonthOrYearRange: (l) => {
      let w = r.value ? r.value.slice() : [];
      return w.length === 2 && w[1] !== null && (w = []), w.length ? (A(l, w[0]) ? w.unshift(l) : w[1] = l, c("range-end", l)) : (w = [l], c("range-start", l)), w;
    },
    handleMultiDatesSelect: (l, w) => {
      if (r.value && Array.isArray(r.value))
        if (r.value.some((h) => f(l, h))) {
          const h = r.value.filter((_) => !f(_, l));
          r.value = h.length ? h : null;
        } else (w && +w > r.value.length || !w) && r.value.push(l);
      else
        r.value = [l];
    }
  };
}, qr = (e, A) => {
  const {
    getDate: f,
    rootEmit: o,
    state: c,
    calendars: s,
    year: r,
    modelValue: u,
    rootProps: v,
    defaults: { range: Y, highlight: P, safeDates: B, filters: O, multiDates: l }
  } = Me();
  Ft(() => {
    c.isTextInputDate && x(getYear(f(v.startDate)), 0);
  });
  const { checkMinMaxRange: w, checkMinMaxValue: h } = Ue(), { isDateBetween: _, resetDateTime: b, resetDate: E, getMinMonth: k, getMaxMonth: g, checkHighlightMonth: M, groupListAndMap: R } = We(), { checkRangeAutoApply: $, getRangeWithFixedDate: S, handleMultiDatesSelect: p, setMonthOrYearRange: D, setPresetDate: V } = na(), { padZero: F } = Ie(), { getMonths: L, isOutOfYearRange: ne } = ea(), re = computed(() => L()), X = ref(null), {
    selectYear: x,
    groupedYears: te,
    showYearPicker: q,
    toggleYearPicker: oe,
    handleYearSelect: K,
    handleYear: Z,
    isDisabled: de,
    setStartDate: G
  } = Wa(A);
  onMounted(() => {
    G();
  });
  const ce = (m) => m ? { month: getMonth(m), year: getYear(m) } : { month: null, year: null }, le = () => u.value ? Array.isArray(u.value) ? u.value.map((m) => ce(m)) : ce(u.value) : ce(), we = (m, N) => {
    const U = s.value[m], pe = le();
    return Array.isArray(pe) ? pe.some((ge) => ge.year === U?.year && ge.month === N) : U?.year === pe.year && N === pe.month;
  }, ve = (m, N, U) => {
    const pe = le();
    return Array.isArray(pe) ? r.value(N) === pe[U]?.year && m === pe[U]?.month : false;
  }, Ae = (m, N) => {
    if (Y.value.enabled) {
      const U = le();
      if (Array.isArray(u.value) && Array.isArray(U)) {
        const pe = ve(m, N, 0) || ve(m, N, 1), ge = set(E(f()), { month: m, year: r.value(N) });
        return _(u.value, X.value, ge) && !pe;
      }
      return false;
    }
    return false;
  }, Q = computed(() => (m) => R(re.value, (N) => {
    const U = we(m, N.value), pe = h(
      N.value,
      k(r.value(m), B.value.minDate),
      g(r.value(m), B.value.maxDate)
    ) || n(B.value.disabledDates, r.value(m), N.value) || O.value.months?.includes(N.value) || !C(B.value.allowedDates, r.value(m), N.value) || ne(r.value(m)), ge = Ae(N.value, m), Qe = M(P.value, N.value, r.value(m));
    return { active: U, disabled: pe, isBetween: ge, highlighted: Qe };
  })), I = (m, N) => set(E(f()), { month: m, year: r.value(N) }), y = (m, N) => {
    const U = u.value ? u.value : E(f());
    u.value = set(U, { month: m, year: r.value(N) }), A("auto-apply"), A("update-flow-step");
  }, H = (m, N) => {
    const U = I(m, N);
    Y.value.fixedEnd || Y.value.fixedStart ? u.value = S(U) : u.value ? w(U, u.value) && (u.value = D(I(m, N))) : u.value = [I(m, N)], nextTick().then(() => {
      $(u.value, A, u.value.length < 2);
    });
  }, fe = (m, N) => {
    p(I(m, N), l.value.limit), A("auto-apply", true);
  }, Pe = (m, N) => (s.value[N].month = m, i(N, s.value[N].year, m), l.value.enabled ? fe(m, N) : Y.value.enabled ? H(m, N) : y(m, N)), Ce = (m, N) => {
    x(m, N), i(N, m, null);
  }, i = (m, N, U) => {
    let pe = U;
    if (!pe && pe !== 0) {
      const ge = le();
      pe = Array.isArray(ge) ? ge[m].month : ge.month;
    }
    o("update-month-year", { instance: m, year: N, month: pe });
  }, d = (m, N) => {
    X.value = I(m, N);
  }, a = (m) => {
    V({
      value: m
    }), A("auto-apply");
  }, n = (m, N, U) => {
    if (m instanceof Map) {
      const pe = `${F(U + 1)}-${N}`;
      return m.size ? m.has(pe) : false;
    }
    return typeof m == "function" ? m(b(set(f(), { month: U, year: N }), true)) : false;
  }, C = (m, N, U) => {
    if (m instanceof Map) {
      const pe = `${F(U + 1)}-${N}`;
      return m.size ? m.has(pe) : true;
    }
    return true;
  };
  return {
    groupedMonths: Q,
    groupedYears: te,
    year: r,
    isDisabled: de,
    showYearPicker: q,
    modelValue: u,
    toggleYearPicker: oe,
    handleYearSelect: K,
    handleYear: Z,
    presetDate: a,
    setHoverDate: d,
    selectMonth: Pe,
    selectYear: Ce,
    getModelMonthYear: le
  };
}, Ur = /* @__PURE__ */ defineComponent({
  __name: "MonthPicker",
  props: {
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  },
  emits: ["reset-flow", "auto-apply", "update-flow-step", "mount"],
  setup(e, { expose: A, emit: f }) {
    const o = f, c = e, s = useSlots(), {
      rootProps: r,
      defaults: { config: u }
    } = Me(), v = lt(s, at.YearMode);
    onMounted(() => {
      o("mount");
    });
    const {
      groupedMonths: Y,
      groupedYears: P,
      year: B,
      isDisabled: O,
      showYearPicker: l,
      modelValue: w,
      presetDate: h,
      setHoverDate: _,
      selectMonth: b,
      selectYear: E,
      toggleYearPicker: k,
      handleYearSelect: g,
      handleYear: M,
      getModelMonthYear: R
    } = qr(c, o);
    return A({ getSidebarProps: () => ({
      modelValue: w,
      year: B,
      getModelMonthYear: R,
      selectMonth: b,
      selectYear: E,
      handleYear: M
    }), presetDate: h, toggleYearPicker: (S) => k(0, S) }), (S, p) => (openBlock(), createBlock(aa, {
      collapse: e.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instances: D, wrapClass: V }) => [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(D, (F) => (openBlock(), createElementBlock("div", {
          key: F,
          class: normalizeClass(V)
        }, [
          S.$slots["top-extra"] ? renderSlot(S.$slots, "top-extra", {
            key: 0,
            value: unref(w)
          }) : createCommentVNode("", !0),
          renderSlot(S.$slots, "month-year", mergeProps({ ref_for: !0 }, {
            year: unref(B),
            months: unref(Y)(F),
            years: unref(P)(F),
            selectMonth: unref(b),
            selectYear: unref(E),
            instance: F
          }), () => [
            createVNode(Nt, {
              items: unref(Y)(F),
              "is-last": unref(r).autoApply && !unref(u).keepActionRow,
              height: unref(u).modeHeight,
              "no-overlay-focus": !!(e.noOverlayFocus || unref(r).textInput),
              "use-relative": "",
              level: 0,
              type: "month",
              onSelected: (L) => unref(b)(L, F),
              onHoverValue: (L) => unref(_)(L, F)
            }, createSlots({
              header: withCtx(() => [
                createVNode(Na, {
                  items: unref(P)(F),
                  instance: F,
                  "show-year-picker": unref(l)[F],
                  year: unref(B)(F),
                  "is-disabled": (L) => unref(O)(F, L),
                  onHandleYear: (L) => unref(M)(F, L),
                  onYearSelect: (L) => unref(g)(L, F),
                  onToggleYearPicker: (L) => unref(k)(F, L?.flow, L?.show)
                }, createSlots({ _: 2 }, [
                  renderList(unref(v), (L, ne) => ({
                    name: L,
                    fn: withCtx((re) => [
                      renderSlot(S.$slots, L, mergeProps({ ref_for: !0 }, re))
                    ])
                  }))
                ]), 1032, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
              ]),
              _: 2
            }, [
              S.$slots["month-overlay-value"] ? {
                name: "item",
                fn: withCtx(({ item: L }) => [
                  renderSlot(S.$slots, "month-overlay-value", {
                    text: L.text,
                    value: L.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "is-last", "height", "no-overlay-focus", "onSelected", "onHoverValue"])
          ])
        ], 2))), 128))
      ]),
      _: 3
    }, 8, ["collapse"]));
  }
}), Qr = (e, A) => {
  const {
    rootEmit: f,
    getDate: o,
    state: c,
    modelValue: s,
    rootProps: r,
    defaults: { highlight: u, multiDates: v, filters: Y, range: P, safeDates: B }
  } = Me(), { getYears: O } = ea(), { isDateBetween: l, resetDate: w, resetDateTime: h, getYearFromDate: _, checkHighlightYear: b, groupListAndMap: E } = We(), { checkRangeAutoApply: k, setMonthOrYearRange: g } = na(), { checkMinMaxValue: M, checkMinMaxRange: R } = Ue();
  Ft(() => {
    c.isTextInputDate && (S.value = getYear(o(r.startDate)));
  });
  const $ = ref(null), S = ref();
  onMounted(() => {
    r.startDate && (s.value && r.focusStartDate || !s.value) && (S.value = getYear(o(r.startDate)));
  });
  const p = (x) => Array.isArray(s.value) ? s.value.some((te) => getYear(te) === x) : s.value ? getYear(s.value) === x : false, D = (x) => P.value.enabled && Array.isArray(s.value) ? l(s.value, $.value, ne(x)) : false, V = (x) => B.value.allowedDates?.size ? B.value.allowedDates.has(`${x}`) : true, F = (x) => B.value.disabledDates instanceof Map ? B.value.disabledDates.size ? B.value.disabledDates.has(`${x}`) : false : typeof B.value.disabledDates == "function" ? B.value.disabledDates(setYear(h(startOfYear(o())), x)) : true, L = computed(() => E(O(), (x) => {
    const te = p(x.value), q = M(
      x.value,
      _(B.value.minDate),
      _(B.value.maxDate)
    ) || Y.value.years.includes(x.value) || !V(x.value) || F(x.value), oe = D(x.value) && !te, K = b(u.value, x.value);
    return { active: te, disabled: q, isBetween: oe, highlighted: K };
  })), ne = (x) => setYear(w(startOfYear(o())), x);
  return {
    groupedYears: L,
    focusYear: S,
    setHoverValue: (x) => {
      $.value = setYear(w(o()), x);
    },
    selectYear: (x) => {
      if (f("update-month-year", { instance: 0, year: x, month: Number.NaN }), v.value.enabled)
        return s.value ? Array.isArray(s.value) && ((s.value?.map((q) => getYear(q))).includes(x) ? s.value = s.value.filter((q) => getYear(q) !== x) : s.value.push(setYear(h(o()), x))) : s.value = [setYear(h(startOfYear(o())), x)], A("auto-apply", true);
      P.value.enabled ? R(ne(x), s.value) && (s.value = g(ne(x)), nextTick().then(() => {
        k(s.value, A, s.value.length < 2);
      })) : (s.value = ne(x), A("auto-apply"));
    }
  };
}, Jr = /* @__PURE__ */ defineComponent({
  __name: "YearPicker",
  props: {
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  },
  emits: ["reset-flow", "auto-apply"],
  setup(e, { expose: A, emit: f }) {
    const o = f, c = e, {
      modelValue: s,
      defaults: { config: r },
      rootProps: u
    } = Me(), { groupedYears: v, focusYear: Y, selectYear: P, setHoverValue: B } = Qr(c, o);
    return A({ getSidebarProps: () => ({
      modelValue: s,
      selectYear: P
    }) }), (l, w) => (openBlock(), createElementBlock("div", null, [
      l.$slots["top-extra"] ? renderSlot(l.$slots, "top-extra", {
        key: 0,
        value: unref(s)
      }) : createCommentVNode("", true),
      l.$slots["month-year"] ? renderSlot(l.$slots, "month-year", normalizeProps(mergeProps({ key: 1 }, {
        years: unref(v),
        selectYear: unref(P)
      }))) : (openBlock(), createBlock(Nt, {
        key: 2,
        items: unref(v),
        "is-last": unref(u).autoApply && !unref(r).keepActionRow,
        height: unref(r).modeHeight,
        "no-overlay-focus": !!(e.noOverlayFocus || unref(u).textInput),
        "focus-value": unref(Y),
        type: "year",
        "use-relative": "",
        onSelected: unref(P),
        onHoverValue: unref(B)
      }, createSlots({ _: 2 }, [
        l.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: h }) => [
            renderSlot(l.$slots, "year-overlay-value", {
              text: h.text,
              value: h.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
}), Gr = {
  key: 0,
  class: "dp__time_input"
}, Xr = ["data-compact", "data-collapsed"], Zr = ["data-test-id", "aria-label", "data-dp-action-element", "onKeydown", "onClick", "onMousedown"], el = ["aria-label", "disabled", "data-dp-action-element", "data-test-id", "onKeydown", "onClick"], tl = ["data-test-id", "aria-label", "data-dp-action-element", "onKeydown", "onClick", "onMousedown"], al = { key: 0 }, nl = ["aria-label", "data-dp-action-element", "data-compact"], rl = /* @__PURE__ */ defineComponent({
  __name: "TimeInput",
  props: {
    hours: {},
    minutes: {},
    seconds: {},
    order: {},
    closeTimePickerBtn: {},
    disabledTimesConfig: {},
    validateTime: {}
  },
  emits: ["update:hours", "update:minutes", "update:seconds", "overlay-opened", "overlay-closed", "set-hours", "set-minutes", "reset-flow", "mounted"],
  setup(e, { expose: A, emit: f }) {
    const o = f, c = e, {
      getDate: s,
      rootEmit: r,
      rootProps: u,
      defaults: { ariaLabels: v, filters: Y, config: P, range: B, multiCalendars: O, timeConfig: l }
    } = Me(), { checkKeyDown: w, hoursToAmPmHours: h } = Ie(), { boolHtmlAttribute: _ } = Pt(), { sanitizeTime: b, groupListAndMap: E } = We(), { transitionName: k, showTransition: g } = Vt(), M = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), R = ref("AM"), $ = ref(null), S = ref(), p = ref(false);
    onMounted(() => {
      o("mounted");
    });
    const D = (n) => set(s(), {
      hours: n.hours,
      minutes: n.minutes,
      seconds: l.value.enableSeconds ? n.seconds : 0,
      milliseconds: 0
    }), V = computed(() => u.timePicker || l.value.timePickerInline ? 0 : 1), F = computed(
      () => (n) => ce(n, c[n]) || ne(n, c[n])
    ), L = computed(() => ({ hours: c.hours, minutes: c.minutes, seconds: c.seconds })), ne = (n, C) => B.value.enabled && !B.value.disableTimeRangeValidation ? !c.validateTime(n, C) : false, re = (n, C) => {
      if (B.value.enabled && !B.value.disableTimeRangeValidation) {
        const m = C ? +l.value[`${n}Increment`] : -+l.value[`${n}Increment`], N = c[n] + m;
        return !c.validateTime(n, N);
      }
      return false;
    }, X = computed(() => (n) => !Q(+c[n] + +l.value[`${n}Increment`], n) || re(n, true)), x = computed(() => (n) => !Q(+c[n] - +l.value[`${n}Increment`], n) || re(n, false)), te = (n, C) => add(set(s(), n), C), q = (n, C) => sub(set(s(), n), C), oe = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !l.value.timePickerInline,
        dp__time_col_reg_block: !l.value.enableSeconds && l.value.is24 && !l.value.timePickerInline,
        dp__time_col_reg_inline: !l.value.enableSeconds && l.value.is24 && l.value.timePickerInline,
        dp__time_col_reg_with_button: !l.value.enableSeconds && !l.value.is24,
        dp__time_col_sec: l.value.enableSeconds && l.value.is24,
        dp__time_col_sec_with_button: l.value.enableSeconds && !l.value.is24
      })
    ), K = computed(
      () => l.value.timePickerInline && B.value.enabled && !O.value.count
    ), Z = computed(() => {
      const n = [{ type: "hours" }];
      return l.value.enableMinutes && n.push({ type: "", separator: true }, {
        type: "minutes"
      }), l.value.enableSeconds && n.push({ type: "", separator: true }, {
        type: "seconds"
      }), n;
    }), de = computed(() => Z.value.filter((n) => !n.separator)), G = computed(() => (n) => {
      if (n === "hours") {
        const C = Ce(+c.hours);
        return { text: C < 10 ? `0${C}` : `${C}`, value: C };
      }
      return { text: c[n] < 10 ? `0${c[n]}` : `${c[n]}`, value: c[n] };
    }), ce = (n, C) => {
      if (!c.disabledTimesConfig) return false;
      const m = c.disabledTimesConfig(c.order, n === "hours" ? C : void 0);
      return m[n] ? !!m[n]?.includes(C) : true;
    }, le = (n, C) => C !== "hours" || R.value === "AM" ? n : n + 12, we = (n) => {
      const C = l.value.is24 ? 24 : 12, m = n === "hours" ? C : 60, N = +l.value[`${n}GridIncrement`], U = n === "hours" && !l.value.is24 ? N : 0, pe = [];
      for (let ge = U; ge < m; ge += N)
        pe.push({
          value: l.value.is24 ? ge : le(ge, n),
          text: ge < 10 ? `0${ge}` : `${ge}`
        });
      return n === "hours" && !l.value.is24 && pe.unshift({ value: R.value === "PM" ? 12 : 0, text: "12" }), E(pe, (ge) => ({ active: false, disabled: Y.value.times[n].includes(ge.value) || !Q(ge.value, n) || ce(n, ge.value) || ne(n, ge.value) }));
    }, ve = (n) => n >= 0 ? n : 59, Ae = (n) => n >= 0 ? n : 23, Q = (n, C) => {
      const m = u.minTime ? D(b(u.minTime)) : null, N = u.maxTime ? D(b(u.maxTime)) : null, U = D(
        b(
          L.value,
          C,
          C === "minutes" || C === "seconds" ? ve(n) : Ae(n)
        )
      );
      return m && N ? (isBefore(U, N) || isEqual(U, N)) && (isAfter(U, m) || isEqual(U, m)) : m ? isAfter(U, m) || isEqual(U, m) : N ? isBefore(U, N) || isEqual(U, N) : true;
    }, I = (n) => l.value[`no${n[0].toUpperCase() + n.slice(1)}Overlay`], y = (n) => {
      I(n) || (M[n] = !M[n], M[n] ? (p.value = true, o("overlay-opened", n)) : (p.value = false, o("overlay-closed", n)));
    }, H = (n) => n === "hours" ? getHours : n === "minutes" ? getMinutes : getSeconds, fe = () => {
      S.value && clearTimeout(S.value);
    }, Pe = (n, C = true, m) => {
      const N = C ? te : q, U = C ? +l.value[`${n}Increment`] : -+l.value[`${n}Increment`];
      Q(+c[n] + U, n) && o(
        `update:${n}`,
        H(n)(
          N({ [n]: +c[n] }, { [n]: +l.value[`${n}Increment`] })
        )
      ), !m?.keyboard && P.value.timeArrowHoldThreshold && (S.value = setTimeout(() => {
        Pe(n, C);
      }, P.value.timeArrowHoldThreshold));
    }, Ce = (n) => l.value.is24 ? n : (n >= 12 ? R.value = "PM" : R.value = "AM", h(n)), i = () => {
      R.value === "PM" ? (R.value = "AM", o("update:hours", c.hours - 12)) : (R.value = "PM", o("update:hours", c.hours + 12)), r("am-pm-change", R.value);
    }, d = (n) => {
      M[n] = true;
    }, a = (n, C) => (y(n), o(`update:${n}`, C));
    return A({ openChildCmp: d }), (n, C) => unref(u).disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Gr, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(Z.value, (m, N) => (openBlock(), createElementBlock("div", {
        key: N,
        class: normalizeClass(oe.value),
        "data-compact": K.value && !unref(l).enableSeconds,
        "data-collapsed": K.value && unref(l).enableSeconds
      }, [
        m.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          p.value ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode(":")
          ], 64))
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("button", {
            type: "button",
            class: normalizeClass({
              dp__btn: true,
              dp__inc_dec_button: !unref(l).timePickerInline,
              dp__inc_dec_button_inline: unref(l).timePickerInline,
              dp__tp_inline_btn_top: unref(l).timePickerInline,
              dp__inc_dec_button_disabled: X.value(m.type),
              "dp--hidden-el": p.value
            }),
            "data-test-id": `${m.type}-time-inc-btn-${c.order}`,
            "aria-label": unref(v)?.incrementValue(m.type),
            tabindex: "0",
            "data-dp-action-element": V.value,
            onKeydown: (U) => unref(w)(U, () => Pe(m.type, true, { keyboard: true }), true),
            onClick: (U) => unref(P).timeArrowHoldThreshold ? void 0 : Pe(m.type, true),
            onMousedown: (U) => unref(P).timeArrowHoldThreshold ? Pe(m.type, true) : void 0,
            onMouseup: fe
          }, [
            unref(l).timePickerInline ? renderSlot(n.$slots, "tp-inline-arrow-up", { key: 1 }, () => [
              C[2] || (C[2] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1)),
              C[3] || (C[3] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1))
            ]) : renderSlot(n.$slots, "arrow-up", { key: 0 }, () => [
              createVNode(unref(Ya))
            ])
          ], 42, Zr),
          createBaseVNode("button", {
            type: "button",
            "aria-label": `${G.value(m.type).text}-${unref(v)?.openTpOverlay(m.type)}`,
            class: normalizeClass({
              dp__time_display: true,
              dp__time_display_block: !unref(l).timePickerInline,
              dp__time_display_inline: unref(l).timePickerInline,
              "dp--time-invalid": F.value(m.type),
              "dp--time-overlay-btn": !F.value(m.type),
              "dp--hidden-el": p.value
            }),
            disabled: unref(_)(I(m.type)),
            tabindex: "0",
            "data-dp-action-element": V.value,
            "data-test-id": `${m.type}-toggle-overlay-btn-${c.order}`,
            onKeydown: (U) => unref(w)(U, () => y(m.type), true),
            onClick: (U) => y(m.type)
          }, [
            renderSlot(n.$slots, m.type, {
              text: G.value(m.type).text,
              value: G.value(m.type).value
            }, () => [
              createTextVNode(toDisplayString(G.value(m.type).text), 1)
            ])
          ], 42, el),
          createBaseVNode("button", {
            type: "button",
            class: normalizeClass({
              dp__btn: true,
              dp__inc_dec_button: !unref(l).timePickerInline,
              dp__inc_dec_button_inline: unref(l).timePickerInline,
              dp__tp_inline_btn_bottom: unref(l).timePickerInline,
              dp__inc_dec_button_disabled: x.value(m.type),
              "dp--hidden-el": p.value
            }),
            "data-test-id": `${m.type}-time-dec-btn-${c.order}`,
            "aria-label": unref(v)?.decrementValue(m.type),
            tabindex: "0",
            "data-dp-action-element": V.value,
            onKeydown: (U) => unref(w)(U, () => Pe(m.type, false, { keyboard: true }), true),
            onClick: (U) => unref(P).timeArrowHoldThreshold ? void 0 : Pe(m.type, false),
            onMousedown: (U) => unref(P).timeArrowHoldThreshold ? Pe(m.type, false) : void 0,
            onMouseup: fe
          }, [
            unref(l).timePickerInline ? renderSlot(n.$slots, "tp-inline-arrow-down", { key: 1 }, () => [
              C[4] || (C[4] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1)),
              C[5] || (C[5] = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1))
            ]) : renderSlot(n.$slots, "arrow-down", { key: 0 }, () => [
              createVNode(unref(Ba))
            ])
          ], 42, tl)
        ], 64))
      ], 10, Xr))), 128)),
      unref(l).is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", al, [
        renderSlot(n.$slots, "am-pm-button", {
          toggle: i,
          value: R.value
        }, () => [
          createBaseVNode("button", {
            ref_key: "amPmButton",
            ref: $,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": unref(v)?.amPmButton,
            tabindex: "0",
            "data-dp-action-element": V.value,
            "data-compact": K.value,
            onClick: i,
            onKeydown: C[0] || (C[0] = (m) => unref(w)(m, () => i(), true))
          }, toDisplayString(R.value), 41, nl)
        ])
      ])),
      (openBlock(true), createElementBlock(Fragment, null, renderList(de.value, (m, N) => (openBlock(), createBlock(Transition, {
        key: N,
        name: unref(k)(M[m.type]),
        css: unref(g)
      }, {
        default: withCtx(() => [
          M[m.type] ? (openBlock(), createBlock(Nt, {
            key: 0,
            items: we(m.type),
            "is-last": unref(u).autoApply && !unref(P).keepActionRow,
            type: m.type,
            "aria-labels": unref(v),
            level: unref(l).timePickerInline || unref(u).timePicker ? 1 : 2,
            "overlay-label": unref(v).timeOverlay?.(m.type),
            onSelected: (U) => a(m.type, U),
            onToggle: (U) => y(m.type),
            onResetFlow: C[1] || (C[1] = (U) => n.$emit("reset-flow"))
          }, createSlots({
            "button-icon": withCtx(() => [
              renderSlot(n.$slots, "clock-icon", {}, () => [
                n.$slots["clock-icon"] ? createCommentVNode("", !0) : (openBlock(), createBlock(resolveDynamicComponent(unref(l).timePickerInline ? unref(Et) : unref(Oa)), { key: 0 }))
              ])
            ]),
            _: 2
          }, [
            n.$slots[`${m.type}-overlay-value`] ? {
              name: "item",
              fn: withCtx(({ item: U }) => [
                renderSlot(n.$slots, `${m.type}-overlay-value`, {
                  text: U.text,
                  value: U.value
                })
              ]),
              key: "0"
            } : void 0,
            n.$slots[`${m.type}-overlay-header`] ? {
              name: "header",
              fn: withCtx(() => [
                renderSlot(n.$slots, `${m.type}-overlay-header`, {
                  toggle: () => y(m.type)
                })
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["items", "is-last", "type", "aria-labels", "level", "overlay-label", "onSelected", "onToggle"])) : createCommentVNode("", !0)
        ]),
        _: 2
      }, 1032, ["name", "css"]))), 128))
    ]));
  }
}), ll = ["data-dp-mobile"], ol = ["aria-label", "tabindex"], sl = ["role", "aria-label", "tabindex"], ul = ["aria-label"], La = /* @__PURE__ */ defineComponent({
  __name: "TimePicker",
  props: {
    hours: {},
    minutes: {},
    seconds: {},
    disabledTimesConfig: { type: [Function, null] },
    noOverlayFocus: { type: Boolean },
    validateTime: { type: Function }
  },
  emits: ["update:hours", "update:minutes", "update:seconds", "mount", "reset-flow"],
  setup(e, { expose: A, emit: f }) {
    const o = f, c = e, {
      rootEmit: s,
      setState: r,
      modelValue: u,
      rootProps: v,
      defaults: { ariaLabels: Y, textInput: P, config: B, range: O, timeConfig: l }
    } = Me(), { isModelAuto: w } = We(), { checkKeyDown: h, findFocusableEl: _ } = Ie(), { transitionName: b, showTransition: E } = Vt(), { hideNavigationButtons: k } = ta(), { isMobile: g } = Zt(), M = useSlots(), R = useTemplateRef("overlay"), $ = useTemplateRef("close-tp-btn"), S = useTemplateRef("tp-input"), p = ref(false);
    onMounted(() => {
      o("mount");
    });
    const D = computed(() => O.value.enabled && v.modelAuto ? w(u.value) : true), V = ref(false), F = (G) => ({
      hours: Array.isArray(c.hours) ? c.hours[G] : c.hours,
      minutes: Array.isArray(c.minutes) ? c.minutes[G] : c.minutes,
      seconds: Array.isArray(c.seconds) ? c.seconds[G] : c.seconds
    }), L = computed(() => {
      const G = [];
      if (O.value.enabled)
        for (let ce = 0; ce < 2; ce++)
          G.push(F(ce));
      else
        G.push(F(0));
      return G;
    }), ne = (G, ce = false, le = "") => {
      ce || o("reset-flow"), V.value = G, r("arrowNavigationLevel", G ? 1 : 0), s("overlay-toggle", { open: G, overlay: He.time }), nextTick(() => {
        le !== "" && S.value?.[0] && S.value[0].openChildCmp(le);
      });
    }, re = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: v.autoApply && !B.value.keepActionRow
    })), X = lt(M, at.TimeInput), x = (G, ce, le) => O.value.enabled ? ce === 0 ? [G, L.value[1][le]] : [L.value[0][le], G] : G, te = (G) => {
      o("update:hours", G);
    }, q = (G) => {
      o("update:minutes", G);
    }, oe = (G) => {
      o("update:seconds", G);
    }, K = () => {
      if (R.value && !P.value.enabled && !c.noOverlayFocus) {
        const G = _(R.value);
        G && G.focus({ preventScroll: true });
      }
    }, Z = (G) => {
      p.value = false, s("overlay-toggle", { open: false, overlay: G });
    }, de = (G) => {
      p.value = true, s("overlay-toggle", { open: true, overlay: G });
    };
    return A({ toggleTimePicker: ne }), (G, ce) => (openBlock(), createElementBlock("div", {
      class: "dp--tp-wrap",
      "data-dp-mobile": unref(g)
    }, [
      !unref(v).timePicker && !unref(l).timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
        key: 0,
        ref: "open-tp-btn",
        type: "button",
        "data-dp-action-element": "0",
        class: normalizeClass({ ...re.value, "dp--hidden-el": V.value }),
        "aria-label": unref(Y)?.openTimePicker,
        tabindex: e.noOverlayFocus ? void 0 : 0,
        "data-test-id": "open-time-picker-btn",
        onKeydown: ce[0] || (ce[0] = (le) => unref(h)(le, () => ne(true))),
        onClick: ce[1] || (ce[1] = (le) => ne(true))
      }, [
        renderSlot(G.$slots, "clock-icon", {}, () => [
          createVNode(unref(Oa))
        ])
      ], 42, ol)), [
        [vShow, !unref(k)("time")]
      ]) : createCommentVNode("", true),
      createVNode(Transition, {
        name: unref(b)(V.value),
        css: unref(E) && !unref(l).timePickerInline
      }, {
        default: withCtx(() => [
          V.value || unref(v).timePicker || unref(l).timePickerInline ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref: "overlay",
            role: unref(l).timePickerInline ? void 0 : "dialog",
            class: normalizeClass({
              dp__overlay: !unref(l).timePickerInline,
              "dp--overlay-absolute": !unref(v).timePicker && !unref(l).timePickerInline,
              "dp--overlay-relative": unref(v).timePicker
            }),
            style: normalizeStyle(unref(v).timePicker ? { height: `${unref(B).modeHeight}px` } : void 0),
            "aria-label": unref(Y)?.timePicker,
            tabindex: unref(l).timePickerInline ? void 0 : 0
          }, [
            createBaseVNode("div", {
              class: normalizeClass(
                unref(l).timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
              ),
              style: { display: "flex" }
            }, [
              renderSlot(G.$slots, "time-picker-overlay", {
                hours: e.hours,
                minutes: e.minutes,
                seconds: e.seconds,
                setHours: te,
                setMinutes: q,
                setSeconds: oe
              }, () => [
                createBaseVNode("div", {
                  class: normalizeClass(unref(l).timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                }, [
                  (openBlock(!0), createElementBlock(Fragment, null, renderList(L.value, (le, we) => withDirectives((openBlock(), createBlock(rl, mergeProps({ key: we }, { ref_for: !0 }, {
                    order: we,
                    hours: le.hours,
                    minutes: le.minutes,
                    seconds: le.seconds,
                    closeTimePickerBtn: $.value,
                    disabledTimesConfig: e.disabledTimesConfig,
                    disabled: we === 0 ? unref(O).fixedStart : unref(O).fixedEnd
                  }, {
                    ref_for: !0,
                    ref: "tp-input",
                    "validate-time": (ve, Ae) => e.validateTime(ve, x(Ae, we, ve)),
                    "onUpdate:hours": (ve) => te(x(ve, we, "hours")),
                    "onUpdate:minutes": (ve) => q(x(ve, we, "minutes")),
                    "onUpdate:seconds": (ve) => oe(x(ve, we, "seconds")),
                    onMounted: K,
                    onOverlayClosed: Z,
                    onOverlayOpened: de
                  }), createSlots({ _: 2 }, [
                    renderList(unref(X), (ve, Ae) => ({
                      name: ve,
                      fn: withCtx((Q) => [
                        renderSlot(G.$slots, ve, mergeProps({ ref_for: !0 }, Q))
                      ])
                    }))
                  ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                    [vShow, we === 0 ? !0 : D.value]
                  ])), 128))
                ], 2)
              ]),
              !unref(v).timePicker && !unref(l).timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                key: 0,
                ref: "close-tp-btn",
                "data-dp-action-element": "1",
                type: "button",
                class: normalizeClass({ ...re.value, "dp--hidden-el": p.value }),
                "aria-label": unref(Y)?.closeTimePicker,
                tabindex: "0",
                onKeydown: ce[2] || (ce[2] = (le) => unref(h)(le, () => ne(!1))),
                onClick: ce[3] || (ce[3] = (le) => ne(!1))
              }, [
                renderSlot(G.$slots, "calendar-icon", {}, () => [
                  createVNode(unref(Et))
                ])
              ], 42, ul)), [
                [vShow, !unref(k)("time")]
              ]) : createCommentVNode("", !0)
            ], 2)
          ], 14, sl)) : createCommentVNode("", !0)
        ]),
        _: 3
      }, 8, ["name", "css"])
    ], 8, ll));
  }
}), Ha = (e) => {
  const {
    getDate: A,
    modelValue: f,
    time: o,
    rootProps: c,
    defaults: { range: s, timeConfig: r }
  } = Me(), { isDateEqual: u, setTime: v } = We(), Y = ($, S) => Array.isArray(o[$]) ? o[$][S] : o[$], P = ($) => r.value.enableSeconds ? Array.isArray(o.seconds) ? o.seconds[$] : o.seconds : 0, B = ($, S) => $ ? v(
    S !== void 0 ? { hours: Y("hours", S), minutes: Y("minutes", S), seconds: P(S) } : { hours: o.hours, minutes: o.minutes, seconds: P() },
    $
  ) : setSeconds(A(), P(S)), O = ($, S) => {
    o[$] = S;
  }, l = computed(() => c.modelAuto && s.value.enabled ? Array.isArray(f.value) ? f.value.length > 1 : false : s.value.enabled), w = ($, S) => {
    const p = Object.fromEntries(
      Object.keys(o).map((D) => D === $ ? [D, S] : [D, o[D]].slice())
    );
    if (l.value && !s.value.disableTimeRangeValidation) {
      const D = (F) => f.value ? v(
        {
          hours: p.hours[F],
          minutes: p.minutes[F],
          seconds: p.seconds[F]
        },
        f.value[F]
      ) : null, V = (F) => setMilliseconds(f.value[F], 0);
      return !(u(D(0), D(1)) && (isAfter(D(0), V(1)) || isBefore(D(1), V(0))));
    }
    return true;
  }, h = ($, S) => {
    w($, S) && (O($, S), e && e());
  }, _ = ($) => {
    h("hours", $);
  }, b = ($) => {
    h("minutes", $);
  }, E = ($) => {
    h("seconds", $);
  }, k = ($, S) => {
    _($.hours), b($.minutes), E($.seconds), f.value && S(f.value);
  }, g = ($) => {
    if ($) {
      const S = Array.isArray($), p = S ? [+$[0].hours, +$[1].hours] : +$.hours, D = S ? [+$[0].minutes, +$[1].minutes] : +$.minutes, V = S ? [+($[0].seconds ?? 0), +($[1].seconds ?? 0)] : +($.seconds ?? 0);
      O("hours", p), O("minutes", D), r.value.enableSeconds && O("seconds", V);
    }
  }, M = ($, S) => {
    const p = {
      hours: Array.isArray(o.hours) ? o.hours[$] : o.hours,
      disabledArr: []
    };
    return (S || S === 0) && (p.hours = S), Array.isArray(c.disabledTimes) && (p.disabledArr = s.value.enabled && Array.isArray(c.disabledTimes[$]) ? c.disabledTimes[$] : c.disabledTimes), p;
  }, R = computed(() => ($, S) => {
    if (Array.isArray(c.disabledTimes)) {
      const { disabledArr: p, hours: D } = M($, S), V = p.filter((F) => +F.hours === D);
      return V[0]?.minutes === "*" ? { hours: [D], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: V?.map((F) => +F.minutes) ?? [],
        seconds: V?.map((F) => F.seconds ? +F.seconds : void 0) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    assignTime: O,
    updateHours: _,
    updateMinutes: b,
    updateSeconds: E,
    getSetDateTime: B,
    updateTimeValues: k,
    getSecondsValue: P,
    assignStartTime: g,
    validateTime: w,
    disabledTimesConfig: R
  };
}, il = (e) => {
  const {
    getDate: A,
    time: f,
    modelValue: o,
    state: c,
    defaults: { startTime: s, range: r, timeConfig: u }
  } = Me(), { getTimeObj: v } = We();
  Ft(() => {
    c.isTextInputDate && M();
  });
  const { updateTimeValues: Y, getSetDateTime: P, assignTime: B, assignStartTime: O, disabledTimesConfig: l, validateTime: w } = Ha(h);
  function h() {
    e("update-flow-step");
  }
  const _ = (S) => {
    const { hours: p, minutes: D, seconds: V } = S;
    return { hours: +p, minutes: +D, seconds: V ? +V : 0 };
  }, b = () => {
    if (u.value.startTime) {
      if (Array.isArray(u.value.startTime)) {
        const p = _(u.value.startTime[0]), D = _(u.value.startTime[1]);
        return [set(A(), p), set(A(), D)];
      }
      const S = _(u.value.startTime);
      return set(A(), S);
    }
    return r.value.enabled ? [null, null] : null;
  }, E = () => {
    if (r.value.enabled) {
      const [S, p] = b();
      o.value = [P(S, 0), P(p, 1)];
    } else
      o.value = P(b());
  }, k = (S) => Array.isArray(S) ? [v(A(S[0])), v(A(S[1]))] : [v(S ?? A())], g = (S, p, D) => {
    B("hours", S), B("minutes", p), B("seconds", u.value.enableSeconds ? D : 0);
  }, M = () => {
    const [S, p] = k(o.value);
    return r.value.enabled ? g(
      [S.hours, p.hours],
      [S.minutes, p.minutes],
      [S.seconds, p.seconds]
    ) : g(S.hours, S.minutes, S.seconds);
  };
  onMounted(() => (O(s.value), o.value ? M() : E()));
  const R = () => {
    Array.isArray(o.value) ? o.value = o.value.map((S, p) => S && P(S, p)) : o.value = P(o.value), e("time-update");
  };
  return {
    modelValue: o,
    time: f,
    disabledTimesConfig: l,
    validateTime: w,
    updateTime: (S) => {
      Y(S, R);
    }
  };
}, cl = /* @__PURE__ */ defineComponent({
  __name: "TimePickerSolo",
  props: {
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  },
  emits: ["time-update", "mount", "reset-flow", "update-flow-step"],
  setup(e, { expose: A, emit: f }) {
    const o = f, c = useSlots(), s = lt(c, at.TimePicker), r = useTemplateRef("time-input"), { time: u, modelValue: v, disabledTimesConfig: Y, updateTime: P, validateTime: B } = il(o);
    return onMounted(() => {
      o("mount");
    }), A({ getSidebarProps: () => ({
      modelValue: v,
      time: u,
      updateTime: P
    }), toggleTimePicker: (w, h = false, _ = "") => {
      r.value?.toggleTimePicker(w, h, _);
    } }), (w, h) => (openBlock(), createBlock(aa, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(({ wrapClass: _ }) => [
        createBaseVNode("div", {
          class: normalizeClass(_)
        }, [
          createVNode(La, mergeProps({ ref: "time-input" }, w.$props, {
            hours: unref(u).hours,
            minutes: unref(u).minutes,
            seconds: unref(u).seconds,
            "disabled-times-config": unref(Y),
            "validate-time": unref(B),
            "onUpdate:hours": h[0] || (h[0] = (b) => unref(P)({ hours: b, minutes: unref(u).minutes, seconds: unref(u).seconds })),
            "onUpdate:minutes": h[1] || (h[1] = (b) => unref(P)({ hours: unref(u).hours, minutes: b, seconds: unref(u).seconds })),
            "onUpdate:seconds": h[2] || (h[2] = (b) => unref(P)({ hours: unref(u).hours, minutes: unref(u).minutes, seconds: b })),
            onResetFlow: h[3] || (h[3] = (b) => w.$emit("reset-flow"))
          }), createSlots({ _: 2 }, [
            renderList(unref(s), (b, E) => ({
              name: b,
              fn: withCtx((k) => [
                renderSlot(w.$slots, b, normalizeProps(guardReactiveProps(k)))
              ])
            }))
          ]), 1040, ["hours", "minutes", "seconds", "disabled-times-config", "validate-time"])
        ], 2)
      ]),
      _: 3
    }));
  }
}), dl = (e, A) => {
  const {
    getDate: f,
    rootProps: o,
    defaults: { filters: c }
  } = Me(), { validateMonthYearInRange: s, validateMonthYear: r } = Ue(), u = (O, l) => {
    let w = O;
    return c.value.months.includes(getMonth(w)) ? (w = l ? addMonths(O, 1) : subMonths(O, 1), u(w, l)) : w;
  }, v = (O, l) => {
    let w = O;
    return c.value.years.includes(getYear(w)) ? (w = l ? addYears(O, 1) : subYears(O, 1), v(w, l)) : w;
  }, Y = (O, l = false) => {
    const w = set(f(), { month: e.month, year: e.year });
    let h = O ? addMonths(w, 1) : subMonths(w, 1);
    o.disableYearSelect && (h = setYear(h, e.year));
    let _ = getMonth(h), b = getYear(h);
    c.value.months.includes(_) && (h = u(h, O), _ = getMonth(h), b = getYear(h)), c.value.years.includes(b) && (h = v(h, O), b = getYear(h)), s(_, b, O, o.preventMinMaxNavigation) && P(_, b, l);
  }, P = (O, l, w = false) => {
    A("update-month-year", { month: O, year: l, fromNav: w });
  }, B = computed(() => (O) => r(
    set(f(), { month: e.month, year: e.year }),
    o.preventMinMaxNavigation,
    O
  ));
  return { handleMonthYearChange: Y, isDisabled: B, updateMonthYear: P };
}, vl = { class: "dp--header-wrap" }, fl = {
  key: 0,
  class: "dp__month_year_wrap"
}, ml = { key: 0 }, pl = { class: "dp__month_year_wrap" }, hl = ["data-dp-element", "aria-label", "data-test-id", "onClick", "onKeydown"], gl = /* @__PURE__ */ defineComponent({
  __name: "DpHeader",
  props: {
    month: {},
    year: {},
    instance: {},
    years: {},
    months: {},
    menuWrapRef: {}
  },
  emits: ["mount", "reset-flow", "update-month-year"],
  setup(e, { expose: A, emit: f }) {
    const o = f, c = e, {
      rootEmit: s,
      rootProps: r,
      modelValue: u,
      defaults: { ariaLabels: v, filters: Y, config: P, highlight: B, safeDates: O, ui: l }
    } = Me(), { transitionName: w, showTransition: h } = Vt(), { showLeftIcon: _, showRightIcon: b } = ta(), { handleMonthYearChange: E, isDisabled: k, updateMonthYear: g } = dl(c, o), { getMaxMonth: M, getMinMonth: R, getYearFromDate: $, groupListAndMap: S, checkHighlightYear: p, checkHighlightMonth: D } = We(), { checkKeyDown: V } = Ie(), { formatYear: F } = pt(), { checkMinMaxValue: L } = Ue(), { boolHtmlAttribute: ne } = Pt(), re = ref(false), X = ref(false), x = ref(false);
    onMounted(() => {
      o("mount");
    });
    const te = (I) => ({
      get: () => c[I],
      set: (y) => {
        const H = I === Ge.month ? Ge.year : Ge.month;
        o("update-month-year", { [I]: y, [H]: c[H] }), I === Ge.month ? le(true) : we(true);
      }
    }), q = computed(te(Ge.month)), oe = computed(te(Ge.year)), K = computed(() => (I) => ({
      month: c.month,
      year: c.year,
      items: I === Ge.month ? c.months : c.years,
      instance: c.instance,
      updateMonthYear: g,
      toggle: I === Ge.month ? le : we
    })), Z = computed(() => {
      const I = c.months.find((y) => y.value === c.month);
      return I || { text: "", value: 0 };
    }), de = computed(() => S(c.months, (I) => {
      const y = c.month === I.value, H = L(
        I.value,
        R(c.year, O.value.minDate),
        M(c.year, O.value.maxDate)
      ) || Y.value.months.includes(I.value), fe = D(B.value, I.value, c.year);
      return { active: y, disabled: H, highlighted: fe };
    })), G = computed(() => S(c.years, (I) => {
      const y = c.year === I.value, H = L(
        I.value,
        $(O.value.minDate),
        $(O.value.maxDate)
      ) || Y.value.years.includes(I.value), fe = p(B.value, I.value);
      return { active: y, disabled: H, highlighted: fe };
    })), ce = (I, y, H) => {
      H === void 0 ? I.value = !I.value : I.value = H, I.value ? (x.value = true, s("overlay-toggle", { open: true, overlay: y })) : (x.value = false, s("overlay-toggle", { open: false, overlay: y }));
    }, le = (I = false, y) => {
      ve(I), ce(re, He.month, y);
    }, we = (I = false, y) => {
      ve(I), ce(X, He.year, y);
    }, ve = (I) => {
      I || o("reset-flow");
    }, Ae = computed(() => [
      {
        type: Ge.month,
        index: 1,
        toggle: le,
        modelValue: q.value,
        updateModelValue: (I) => q.value = I,
        text: Z.value.text,
        showSelectionGrid: re.value,
        items: de.value,
        ariaLabel: v.value?.openMonthsOverlay,
        overlayLabel: v.value.monthPicker?.(true) ?? void 0
      },
      {
        type: Ge.year,
        index: 2,
        toggle: we,
        modelValue: oe.value,
        updateModelValue: (I) => oe.value = I,
        text: F(c.year),
        showSelectionGrid: X.value,
        items: G.value,
        ariaLabel: v.value?.openYearsOverlay,
        overlayLabel: v.value.yearPicker?.(true) ?? void 0
      }
    ]), Q = computed(() => r.disableYearSelect ? [Ae.value[0]] : r.yearFirst ? [...Ae.value].reverse() : Ae.value);
    return A({
      toggleMonthPicker: le,
      toggleYearPicker: we,
      handleMonthYearChange: E
    }), (I, y) => (openBlock(), createElementBlock("div", vl, [
      I.$slots["month-year"] ? (openBlock(), createElementBlock("div", fl, [
        renderSlot(I.$slots, "month-year", normalizeProps(guardReactiveProps({
          month: e.month,
          year: e.year,
          months: e.months,
          years: e.years,
          updateMonthYear: unref(g),
          handleMonthYearChange: unref(E),
          instance: e.instance,
          isDisabled: unref(k)
        })))
      ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        I.$slots["top-extra"] ? (openBlock(), createElementBlock("div", ml, [
          renderSlot(I.$slots, "top-extra", { value: unref(u) })
        ])) : createCommentVNode("", true),
        createBaseVNode("div", pl, [
          unref(_)(e.instance) && !unref(r).vertical ? (openBlock(), createBlock(Bt, {
            key: 0,
            "aria-label": unref(v)?.prevMonth,
            disabled: unref(ne)(unref(k)(false)),
            class: normalizeClass(unref(l)?.navBtnPrev),
            "el-name": "action-prev",
            onActivate: y[0] || (y[0] = (H) => unref(E)(false, true))
          }, {
            default: withCtx(() => [
              I.$slots["arrow-left"] ? renderSlot(I.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", !0),
              I.$slots["arrow-left"] ? createCommentVNode("", !0) : (openBlock(), createBlock(unref(Ca), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["dp__month_year_wrap", {
              dp__year_disable_select: unref(r).disableYearSelect
            }])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(Q.value, (H) => (openBlock(), createElementBlock(Fragment, {
              key: H.type
            }, [
              createBaseVNode("button", {
                type: "button",
                "data-dp-element": `overlay-${H.type}`,
                class: normalizeClass(["dp__btn dp__month_year_select", { "dp--hidden-el": x.value }]),
                "aria-label": `${H.text}-${H.ariaLabel}`,
                "data-test-id": `${H.type}-toggle-overlay-${e.instance}`,
                tabindex: "0",
                "data-dp-action-element": "0",
                onClick: (fe) => H.toggle(false),
                onKeydown: (fe) => unref(V)(fe, () => H.toggle(), true)
              }, [
                I.$slots[H.type] ? renderSlot(I.$slots, H.type, {
                  key: 0,
                  text: H.text,
                  value: c[H.type]
                }) : createCommentVNode("", true),
                I.$slots[H.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(H.text), 1)
                ], 64))
              ], 42, hl),
              createVNode(Transition, {
                name: unref(w)(H.showSelectionGrid),
                css: unref(h)
              }, {
                default: withCtx(() => [
                  H.showSelectionGrid ? (openBlock(), createBlock(Nt, {
                    key: 0,
                    items: H.items,
                    "is-last": unref(r).autoApply && !unref(P).keepActionRow,
                    "skip-button-ref": !1,
                    type: H.type,
                    "header-refs": [],
                    "menu-wrap-ref": e.menuWrapRef,
                    "overlay-label": H.overlayLabel,
                    onSelected: H.updateModelValue,
                    onToggle: H.toggle
                  }, createSlots({
                    "button-icon": withCtx(() => [
                      I.$slots["calendar-icon"] ? renderSlot(I.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", !0),
                      I.$slots["calendar-icon"] ? createCommentVNode("", !0) : (openBlock(), createBlock(unref(Et), { key: 1 }))
                    ]),
                    _: 2
                  }, [
                    I.$slots[`${H.type}-overlay-value`] ? {
                      name: "item",
                      fn: withCtx(({ item: fe }) => [
                        renderSlot(I.$slots, `${H.type}-overlay-value`, {
                          text: fe.text,
                          value: fe.value
                        })
                      ]),
                      key: "0"
                    } : void 0,
                    I.$slots[`${H.type}-overlay`] ? {
                      name: "overlay",
                      fn: withCtx(() => [
                        renderSlot(I.$slots, `${H.type}-overlay`, mergeProps({ ref_for: !0 }, K.value(H.type)))
                      ]),
                      key: "1"
                    } : void 0,
                    I.$slots[`${H.type}-overlay-header`] ? {
                      name: "header",
                      fn: withCtx(() => [
                        renderSlot(I.$slots, `${H.type}-overlay-header`, {
                          toggle: H.toggle
                        })
                      ]),
                      key: "2"
                    } : void 0
                  ]), 1032, ["items", "is-last", "type", "menu-wrap-ref", "overlay-label", "onSelected", "onToggle"])) : createCommentVNode("", !0)
                ]),
                _: 2
              }, 1032, ["name", "css"])
            ], 64))), 128))
          ], 2),
          unref(_)(e.instance) && unref(r).vertical ? (openBlock(), createBlock(Bt, {
            key: 1,
            "aria-label": unref(v)?.prevMonth,
            "el-name": "action-prev",
            disabled: unref(ne)(unref(k)(false)),
            class: normalizeClass(unref(l)?.navBtnPrev),
            onActivate: y[1] || (y[1] = (H) => unref(E)(false, true))
          }, {
            default: withCtx(() => [
              I.$slots["arrow-up"] ? renderSlot(I.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", !0),
              I.$slots["arrow-up"] ? createCommentVNode("", !0) : (openBlock(), createBlock(unref(Ya), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled", "class"])) : createCommentVNode("", true),
          unref(b)(e.instance) ? (openBlock(), createBlock(Bt, {
            key: 2,
            ref: "rightIcon",
            "el-name": "action-next",
            disabled: unref(ne)(unref(k)(true)),
            "aria-label": unref(v)?.nextMonth,
            class: normalizeClass(unref(l)?.navBtnNext),
            onActivate: y[2] || (y[2] = (H) => unref(E)(true, true))
          }, {
            default: withCtx(() => [
              I.$slots[unref(r).vertical ? "arrow-down" : "arrow-right"] ? renderSlot(I.$slots, unref(r).vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", !0),
              I.$slots[unref(r).vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", !0) : (openBlock(), createBlock(resolveDynamicComponent(unref(r).vertical ? unref(Ba) : unref(xa)), { key: 1 }))
            ]),
            _: 3
          }, 8, ["disabled", "aria-label", "class"])) : createCommentVNode("", true)
        ])
      ], 64))
    ]));
  }
}), yl = {
  class: "dp__calendar_header",
  role: "row"
}, bl = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
}, kl = ["aria-label"], wl = {
  key: 0,
  class: "dp__calendar_item dp__week_num",
  role: "gridcell"
}, Dl = { class: "dp__cell_inner" }, Ml = ["id", "aria-selected", "aria-disabled", "aria-label", "tabindex", "data-test-id", "data-dp-element-active", "onClick", "onTouchend", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"], _l = /* @__PURE__ */ defineComponent({
  __name: "DpCalendar",
  props: {
    instance: {},
    mappedDates: {},
    month: {},
    year: {}
  },
  emits: ["mount", "select-date", "set-hover-date", "handle-scroll", "handle-swipe"],
  setup(e, { expose: A, emit: f }) {
    const o = f, c = e, {
      getDate: s,
      rootEmit: r,
      rootProps: u,
      defaults: { transitions: v, config: Y, ariaLabels: P, multiCalendars: B, weekNumbers: O, multiDates: l, ui: w }
    } = Me(), { isDateAfter: h, isDateEqual: _, resetDateTime: b, getCellId: E } = We(), { checkKeyDown: k, checkStopPropagation: g, isTouchDevice: M } = Ie(), { formatWeekDay: R } = pt(), $ = useTemplateRef("calendar-wrap"), S = useTemplateRef("active-tooltip"), p = ref([]), D = ref(null), V = ref(true), F = ref(false), L = ref(""), ne = ref({
      bottom: "",
      left: "",
      transform: ""
    }), re = ref({ left: "50%" });
    useSwipe($, {
      onSwipeEnd: (d, a) => {
        Y.value.noSwipe || (u.vertical ? (a === "up" || a === "down") && o("handle-swipe", a === "up" ? "left" : "right") : (a === "left" || a === "right") && o("handle-swipe", a === "right" ? "left" : "right"));
      }
    });
    const X = computed(() => u.calendar ? u.calendar(c.mappedDates) : c.mappedDates), x = computed(() => u.dayNames ? Array.isArray(u.dayNames) ? u.dayNames : u.dayNames() : i());
    onMounted(() => {
      o("mount", { cmp: "calendar", dayRefs: p.value }), Y.value.monthChangeOnScroll && $.value && $.value.addEventListener("wheel", I, { passive: false });
    }), onUnmounted(() => {
      Y.value.monthChangeOnScroll && $.value && $.value.removeEventListener("wheel", I);
    });
    const te = (d) => d ? u.vertical ? "vNext" : "next" : u.vertical ? "vPrevious" : "previous", q = (d, a) => {
      if (u.transitions) {
        const n = b(set(s(), { month: c.month, year: c.year }));
        L.value = h(b(set(s(), { month: d, year: a })), n) ? v.value[te(true)] : v.value[te(false)], V.value = false, nextTick(() => {
          V.value = true;
        });
      }
    }, oe = computed(
      () => ({
        ...w.value.calendar
      })
    ), K = (d) => ({ type: "dot", ...d }), Z = computed(() => (d) => {
      const a = K(d);
      return {
        dp__marker_dot: a.type === "dot",
        dp__marker_line: a.type === "line"
      };
    }), de = computed(() => (d) => _(d, D.value)), G = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: B.value.count > 0 && c.instance !== 0
    })), ce = computed(() => (d) => u.hideOffsetDates ? d.current : true), le = async (d, a) => {
      const { width: n, height: C } = d.getBoundingClientRect();
      D.value = a.value;
      let m = { left: `${n / 2}px` }, N = -50;
      if (await nextTick(), S.value?.[0]) {
        const { left: U, width: pe } = S.value[0].getBoundingClientRect();
        U < 0 && (m = { left: "0" }, N = 0, re.value.left = `${n / 2}px`), globalThis.innerWidth < U + pe && (m = { right: "0" }, N = 0, re.value.left = `${pe - n / 2}px`);
      }
      ne.value = {
        bottom: `${C}px`,
        ...m,
        transform: `translateX(${N}%)`
      };
    }, we = async (d, a, n) => {
      const C = unrefElement(p.value?.[a]?.[n]);
      C && (d.marker?.customPosition && d.marker?.tooltip?.length ? ne.value = d.marker.customPosition(C) : await le(C, d), r("tooltip-open", d.marker));
    }, ve = async (d, a, n) => {
      if (F.value && l.value.enabled && l.value.dragSelect)
        return o("select-date", d);
      if (o("set-hover-date", d), d.marker?.tooltip?.length) {
        if (u.hideOffsetDates && !d.current) return;
        await we(d, a, n);
      }
    }, Ae = (d) => {
      D.value && (D.value = null, ne.value = structuredClone({ bottom: "", left: "", transform: "" }), r("tooltip-close", d.marker));
    }, Q = (d, a, n) => {
      d && (Array.isArray(p.value[a]) ? p.value[a][n] = d : p.value[a] = [d]);
    }, I = (d) => {
      Y.value.monthChangeOnScroll && (d.preventDefault(), o("handle-scroll", d));
    }, y = (d) => O.value ? O.value.type === "local" ? getWeek(d.value, {
      weekStartsOn: +u.weekStart,
      locale: u.locale
    }) : O.value.type === "iso" ? getISOWeek(d.value) : typeof O.value.type == "function" ? O.value.type(d.value) : "" : "", H = (d) => {
      const a = d[0];
      return O.value?.hideOnOffsetDates ? d.some((n) => n.current) ? y(a) : "" : y(a);
    }, fe = (d, a, n = true) => {
      !n && M() || (!l.value.enabled || Y.value.allowPreventDefault) && (g(d, Y.value), o("select-date", a));
    }, Pe = (d) => {
      g(d, Y.value);
    }, Ce = (d) => {
      l.value.enabled && l.value.dragSelect ? (F.value = true, o("select-date", d)) : l.value.enabled && o("select-date", d);
    }, i = () => {
      const d = s(), a = startOfWeek(d, { locale: u.locale, weekStartsOn: +u.weekStart }), n = endOfWeek(d, { locale: u.locale, weekStartsOn: +u.weekStart });
      return eachDayOfInterval({ start: a, end: n }).map((m) => R(m));
    };
    return A({ triggerTransition: q }), (d, a) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(G.value)
    }, [
      createBaseVNode("div", {
        ref: "calendar-wrap",
        class: normalizeClass(oe.value),
        role: "grid"
      }, [
        createBaseVNode("div", yl, [
          unref(O) ? (openBlock(), createElementBlock("div", bl, toDisplayString(unref(O).label), 1)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(x.value, (n, C) => (openBlock(), createElementBlock("div", {
            key: C,
            class: "dp__calendar_header_item",
            role: "gridcell",
            "data-test-id": "calendar-header",
            "aria-label": unref(P)?.weekDay?.(C)
          }, [
            renderSlot(d.$slots, "calendar-header", {
              day: n,
              index: C
            }, () => [
              createTextVNode(toDisplayString(n), 1)
            ])
          ], 8, kl))), 128))
        ]),
        a[2] || (a[2] = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1)),
        createVNode(Transition, {
          name: L.value,
          css: !!unref(v)
        }, {
          default: withCtx(() => [
            V.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "dp__calendar",
              role: "rowgroup",
              onMouseleave: a[1] || (a[1] = (n) => F.value = !1)
            }, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(X.value, (n, C) => (openBlock(), createElementBlock("div", {
                key: C,
                class: "dp__calendar_row",
                role: "row"
              }, [
                unref(O) ? (openBlock(), createElementBlock("div", wl, [
                  createBaseVNode("div", Dl, toDisplayString(H(n.days)), 1)
                ])) : createCommentVNode("", !0),
                (openBlock(!0), createElementBlock(Fragment, null, renderList(n.days, (m, N) => (openBlock(), createElementBlock("div", {
                  id: unref(E)(m.value),
                  ref_for: !0,
                  ref: (U) => Q(U, C, N),
                  key: N + C,
                  role: "gridcell",
                  class: "dp__calendar_item",
                  "aria-selected": (m.classData.dp__active_date || m.classData.dp__range_start || m.classData.dp__range_end) ?? void 0,
                  "aria-disabled": m.classData.dp__cell_disabled || void 0,
                  "aria-label": unref(P)?.day?.(m),
                  tabindex: !m.current && unref(u).hideOffsetDates ? void 0 : 0,
                  "data-test-id": unref(E)(m.value),
                  "data-dp-element-active": m.classData.dp__active_date ? 0 : void 0,
                  "data-dp-action-element": "0",
                  onClick: withModifiers((U) => fe(U, m), ["prevent"]),
                  onTouchend: (U) => fe(U, m, !1),
                  onKeydown: (U) => unref(k)(U, () => d.$emit("select-date", m)),
                  onMouseenter: (U) => ve(m, C, N),
                  onMouseleave: (U) => Ae(m),
                  onMousedown: (U) => Ce(m),
                  onMouseup: a[0] || (a[0] = (U) => F.value = !1)
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(["dp__cell_inner", m.classData])
                  }, [
                    d.$slots.day && ce.value(m) ? renderSlot(d.$slots, "day", {
                      key: 0,
                      day: +m.text,
                      date: m.value
                    }) : createCommentVNode("", !0),
                    d.$slots.day ? createCommentVNode("", !0) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(m.text), 1)
                    ], 64)),
                    m.marker && ce.value(m) ? renderSlot(d.$slots, "marker", {
                      key: 2,
                      marker: m.marker,
                      day: +m.text,
                      date: m.value
                    }, () => [
                      createBaseVNode("div", {
                        class: normalizeClass(Z.value(m.marker)),
                        style: normalizeStyle(m.marker.color ? { backgroundColor: m.marker.color } : {})
                      }, null, 6)
                    ]) : createCommentVNode("", !0),
                    de.value(m.value) ? (openBlock(), createElementBlock("div", {
                      key: 3,
                      ref_for: !0,
                      ref: "active-tooltip",
                      class: "dp__marker_tooltip",
                      style: normalizeStyle(ne.value)
                    }, [
                      m.marker?.tooltip ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        class: "dp__tooltip_content",
                        onClick: Pe
                      }, [
                        (openBlock(!0), createElementBlock(Fragment, null, renderList(m.marker.tooltip, (U, pe) => (openBlock(), createElementBlock("div", {
                          key: pe,
                          class: "dp__tooltip_text"
                        }, [
                          renderSlot(d.$slots, "marker-tooltip", {
                            tooltip: U,
                            day: m.value
                          }, () => [
                            createBaseVNode("div", {
                              class: "dp__tooltip_mark",
                              style: normalizeStyle(U.color ? { backgroundColor: U.color } : {})
                            }, null, 4),
                            createBaseVNode("div", null, toDisplayString(U.text), 1)
                          ])
                        ]))), 128)),
                        createBaseVNode("div", {
                          class: "dp__arrow_bottom_tp",
                          style: normalizeStyle(re.value)
                        }, null, 4)
                      ])) : createCommentVNode("", !0)
                    ], 4)) : createCommentVNode("", !0)
                  ], 2)
                ], 40, Ml))), 128))
              ]))), 128))
            ], 32)) : createCommentVNode("", !0)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ], 2)
    ], 2));
  }
}), Al = (e, A, f, o) => {
  const c = ref([]), s = ref(/* @__PURE__ */ new Date()), r = ref(), {
    getDate: u,
    rootEmit: v,
    calendars: Y,
    month: P,
    year: B,
    time: O,
    modelValue: l,
    rootProps: w,
    today: h,
    state: _,
    defaults: { multiCalendars: b, startTime: E, range: k, config: g, safeDates: M, multiDates: R, timeConfig: $, flow: S }
  } = Me(), { validateMonthYearInRange: p, isDisabled: D, isDateRangeAllowed: V, checkMinMaxRange: F } = Ue(), { updateTimeValues: L, getSetDateTime: ne, assignTime: re, assignStartTime: X, validateTime: x, disabledTimesConfig: te } = Ha(o), { formatDay: q } = pt(), { resetDateTime: oe, setTime: K, isDateBefore: Z, isDateEqual: de, getDaysInBetween: G } = We(), { checkRangeAutoApply: ce, getRangeWithFixedDate: le, handleMultiDatesSelect: we, setPresetDate: ve } = na(), { getMapDate: Ae } = Ie();
  Ft(() => Ce(_.isTextInputDate));
  const Q = (T) => !g.value.keepViewOnOffsetClick || T ? true : !r.value, I = (T, z, ue, ke = false) => {
    Q(ke) && (Y.value[T] ??= Y.value[T] = { month: 0, year: 0 }, Y.value[T].month = z ?? Y.value[T]?.month, Y.value[T].year = ue ?? Y.value[T]?.year);
  }, y = () => {
    w.autoApply && A("select-date");
  }, H = () => {
    E.value && X(E.value);
  };
  onMounted(() => {
    l.value || (Tt(), H()), Ce(true), w.focusStartDate && w.startDate && Tt();
  });
  const fe = computed(() => S.value?.steps?.length && !S.value?.partial ? e.flowStep === S.value.steps.length : true), Pe = () => {
    w.autoApply && fe.value && A("auto-apply", S.value?.partial ? e.flowStep !== S.value?.steps?.length : false);
  }, Ce = (T = false) => {
    if (l.value)
      return Array.isArray(l.value) ? (c.value = l.value, U(T)) : n(l.value, T);
    if (b.value.count && T && !w.startDate)
      return a(u(), T);
  }, i = () => Array.isArray(l.value) && k.value.enabled ? getMonth(l.value[0]) === getMonth(l.value[1] ?? l.value[0]) : false, d = (T) => {
    const z = addMonths(T, 1);
    return { month: getMonth(z), year: getYear(z) };
  }, a = (T = u(), z = false) => {
    if ((!b.value.count || !b.value.static || z) && I(0, getMonth(T), getYear(T)), b.value.count && (!l.value || i() || !b.value.solo) && (!b.value.solo || z))
      for (let ue = 1; ue < b.value.count; ue++) {
        const ke = set(u(), { month: P.value(ue - 1), year: B.value(ue - 1) }), Oe = add(ke, { months: 1 });
        Y.value[ue] = { month: getMonth(Oe), year: getYear(Oe) };
      }
  }, n = (T, z) => {
    a(T), re("hours", getHours(T)), re("minutes", getMinutes(T)), re("seconds", getSeconds(T)), b.value.count && z && Qe();
  }, C = (T) => {
    if (b.value.count) {
      if (b.value.solo) return 0;
      const z = getMonth(T[0]), ue = getMonth(T[1]);
      return Math.abs(ue - z) < b.value.count ? 0 : 1;
    }
    return 1;
  }, m = (T, z) => {
    T[1] && k.value.showLastInRange ? a(T[C(T)], z) : a(T[0], z);
    const ue = (ke, Oe) => [
      ke(T[0]),
      T?.[1] ? ke(T[1]) : O[Oe][1]
    ];
    re("hours", ue(getHours, "hours")), re("minutes", ue(getMinutes, "minutes")), re("seconds", ue(getSeconds, "seconds"));
  }, N = (T, z) => {
    if ((k.value.enabled || w.weekPicker) && !R.value.enabled)
      return m(T, z);
    if (R.value.enabled && z) {
      const ue = T[T.length - 1];
      return n(ue, z);
    }
  }, U = (T) => {
    const z = l.value;
    N(z, T), b.value.count && b.value.solo && Qe();
  }, pe = (T, z) => {
    const ue = set(u(), { month: P.value(z), year: B.value(z) }), ke = T < 0 ? addMonths(ue, 1) : subMonths(ue, 1);
    p(getMonth(ke), getYear(ke), T < 0, w.preventMinMaxNavigation) && (I(z, getMonth(ke), getYear(ke)), v("update-month-year", { instance: z, month: getMonth(ke), year: getYear(ke) }), b.value.count && !b.value.solo && ge(z), f());
  }, ge = (T) => {
    for (let z = T - 1; z >= 0; z--) {
      const ue = subMonths(set(u(), { month: P.value(z + 1), year: B.value(z + 1) }), 1);
      I(z, getMonth(ue), getYear(ue));
    }
    for (let z = T + 1; z <= b.value.count - 1; z++) {
      const ue = addMonths(set(u(), { month: P.value(z - 1), year: B.value(z - 1) }), 1);
      I(z, getMonth(ue), getYear(ue));
    }
  }, Qe = () => {
    if (Array.isArray(l.value) && l.value.length === 2) {
      const T = u(u(l.value[1] ?? addMonths(l.value[0], 1))), [z, ue] = [getMonth(l.value[0]), getYear(l.value[0])], [ke, Oe] = [getMonth(l.value[1]), getYear(l.value[1])];
      (z !== ke || z === ke && ue !== Oe) && b.value.solo && I(1, getMonth(T), getYear(T));
    } else l.value && !Array.isArray(l.value) && (I(0, getMonth(l.value), getYear(l.value)), a(u()));
  }, Tt = () => {
    w.startDate && (I(0, getMonth(u(w.startDate)), getYear(u(w.startDate))), b.value.count && ge(0));
  }, Wt = (T, z) => {
    if (g.value.monthChangeOnScroll) {
      const ue = Date.now() - s.value.getTime(), ke = Math.abs(T.deltaY);
      let Oe = 500;
      ke > 1 && (Oe = 100), ke > 100 && (Oe = 0), ue > Oe && (s.value = /* @__PURE__ */ new Date(), pe(
        g.value.monthChangeOnScroll === "inverse" ? T.deltaY : -T.deltaY,
        z
      ));
    }
  }, ra = (T, z, ue = false) => {
    g.value.monthChangeOnArrows && w.vertical === ue && Lt(T, z);
  }, Lt = (T, z) => {
    pe(T === "right" ? -1 : 1, z);
  }, la = (T) => {
    if (M.value.markers)
      return Ae(T.value, M.value.markers);
  }, oa = (T, z) => {
    switch (w.sixWeeks === true ? "append" : w.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [T == 0, true];
      case "fair":
        return [T == 0 || z > T, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, sa = (T, z, ue, ke) => {
    if (w.sixWeeks && T.length < 6) {
      const Oe = 6 - T.length, ct = (z.getDay() + 7 - ke) % 7, Kt = 6 - (ue.getDay() + 7 - ke) % 7, [Ct, da] = oa(ct, Kt);
      for (let gt = 1; gt <= Oe; gt++)
        if (da ? !!(gt % 2) == Ct : Ct) {
          const zt = T[0].days[0], va = $t(addDays(zt.value, -7), getMonth(z));
          T.unshift({ days: va });
        } else {
          const zt = T[T.length - 1], va = zt.days[zt.days.length - 1], en = $t(addDays(va.value, 1), getMonth(z));
          T.push({ days: en });
        }
    }
    return T;
  }, $t = (T, z) => {
    const ue = u(T), ke = [];
    for (let Oe = 0; Oe < 7; Oe++) {
      const ct = addDays(ue, Oe), Rt = getMonth(ct) !== z;
      ke.push({
        text: w.hideOffsetDates && Rt ? "" : q(ct),
        value: ct,
        current: !Rt,
        classData: {}
      });
    }
    return ke;
  }, ua = (T, z) => {
    const ue = [], ke = u(new Date(z, T)), Oe = u(new Date(z, T + 1, 0)), ct = w.weekStart, Rt = startOfWeek(ke, { weekStartsOn: ct }), Kt = (Ct) => {
      const da = $t(Ct, T);
      if (ue.push({ days: da }), !ue[ue.length - 1].days.some((gt) => de(u(gt.value), oe(Oe)))) {
        const gt = addDays(Ct, 7);
        Kt(gt);
      }
    };
    return Kt(Rt), sa(ue, ke, Oe, ct);
  }, ia = (T) => {
    const z = K(
      { hours: O.hours, minutes: O.minutes, seconds: jt() },
      u(T.value)
    );
    v("date-click", z), R.value.enabled ? we(z, R.value.limit) : l.value = z, o(), nextTick().then(() => {
      Pe();
    });
  }, Ht = (T) => k.value.noDisabledRange ? G(c.value[0], T).some((ue) => D(ue)) : false, se = () => {
    c.value = l.value ? l.value.slice().filter((T) => !!T) : [], c.value.length === 2 && !(k.value.fixedStart || k.value.fixedEnd) && (c.value = []);
  }, Le = (T, z) => {
    const ue = [u(T.value), addDays(u(T.value), +k.value.autoRange)];
    V(ue) ? (z && Je(T.value), c.value = ue) : v("invalid-date", T.value);
  }, Je = (T) => {
    const z = getMonth(u(T)), ue = getYear(u(T));
    if (I(0, z, ue), b.value.count > 0)
      for (let ke = 1; ke < b.value.count; ke++) {
        const Oe = d(
          set(u(T), { year: B.value(ke - 1), month: P.value(ke - 1) })
        );
        I(ke, Oe.month, Oe.year);
      }
  }, St = (T) => {
    if (Ht(T.value) || !F(T.value, l.value, k.value.fixedStart ? 0 : 1))
      return v("invalid-date", T.value);
    c.value = le(u(T.value));
  }, ht = (T, z) => {
    if (se(), k.value.autoRange) return Le(T, z);
    if (k.value.fixedStart || k.value.fixedEnd) return St(T);
    c.value[0] ? F(u(T.value), l.value) && !Ht(T.value) ? Z(u(T.value), u(c.value[0])) ? k.value.autoSwitchStartEnd ? (c.value.unshift(u(T.value)), v("range-end", c.value[0])) : (c.value[0] = u(T.value), v("range-start", c.value[0])) : (c.value[1] = u(T.value), v("range-end", c.value[1])) : v("invalid-date", T.value) : (c.value[0] = u(T.value), v("range-start", c.value[0]));
  }, jt = (T = true) => $.value.enableSeconds ? Array.isArray(O.seconds) ? T ? O.seconds[0] : O.seconds[1] : O.seconds : 0, ca = (T) => {
    c.value[T] = K(
      {
        hours: O.hours[T],
        minutes: O.minutes[T],
        seconds: jt(T !== 1)
      },
      c.value[T]
    );
  }, ja = () => {
    c.value[0] && c.value[1] && +c.value?.[0] > +c.value?.[1] && (c.value.reverse(), v("range-start", c.value[0]), v("range-end", c.value[1]));
  }, Ka = () => {
    c.value.length && (c.value[0] && !c.value[1] ? ca(0) : (ca(0), ca(1), o()), ja(), l.value = c.value.slice(), ce(
      c.value,
      A,
      c.value.length < 2 || S.value?.steps.length ? e.flowStep !== S.value?.steps?.length : false
    ));
  }, za = (T, z = false) => {
    if (D(T.value) || !T.current && w.hideOffsetDates)
      return v("invalid-date", T.value);
    if (r.value = structuredClone(T), !k.value.enabled) return ia(T);
    Array.isArray(O.hours) && Array.isArray(O.minutes) && !R.value.enabled && (ht(T, z), Ka());
  }, qa = (T, z) => {
    I(T, z.month, z.year, true), b.value.count && !b.value.solo && ge(T), v("update-month-year", { instance: T, month: z.month, year: z.year }), f(b.value.solo ? T : void 0);
    const ue = S.value?.steps?.length ? S.value.steps[e.flowStep] : void 0;
    !z.fromNav && (ue === He.month || ue === He.year) && o();
  }, Ua = (T) => {
    ve({
      value: T
    }), y(), w.multiCalendars && nextTick().then(() => Ce(true));
  }, Qa = () => {
    let T = u();
    return w.actionRow?.nowBtnRound && (T = roundToNearestMinutes(T, {
      roundingMethod: w.actionRow.nowBtnRound.rounding ?? "ceil",
      nearestTo: w.actionRow.nowBtnRound.roundTo ?? 15
    })), T;
  }, Ja = () => {
    const T = Qa();
    !k.value.enabled && !R.value.enabled ? l.value = T : l.value && Array.isArray(l.value) && l.value[0] ? R.value.enabled ? l.value = [...l.value, T] : l.value = Z(T, l.value[0]) ? [T, l.value[0]] : [l.value[0], T] : l.value = [T], y();
  }, Ga = () => {
    if (Array.isArray(l.value))
      if (R.value.enabled) {
        const T = Xa();
        l.value[l.value.length - 1] = ne(T);
      } else
        l.value = l.value.map((T, z) => T && ne(T, z));
    else
      l.value = ne(l.value);
    A("time-update");
  }, Xa = () => Array.isArray(l.value) && l.value.length ? l.value[l.value.length - 1] : null, Za = (T) => {
    let z = "";
    if (k.value.enabled && Array.isArray(l.value))
      for (const ue of Object.keys(T)) {
        const ke = T[ue];
        Array.isArray(ke) && (O[ue][0] !== ke[0] && (z = "range-start"), O[ue][1] !== ke[1] && (z = "range-start"));
      }
    return z;
  };
  return {
    calendars: Y,
    modelValue: l,
    month: P,
    year: B,
    time: O,
    disabledTimesConfig: te,
    today: h,
    validateTime: x,
    getCalendarDays: ua,
    getMarker: la,
    handleScroll: Wt,
    handleSwipe: Lt,
    handleArrow: ra,
    selectDate: za,
    updateMonthYear: qa,
    presetDate: Ua,
    selectCurrentDate: Ja,
    updateTime: (T) => {
      const z = Za(T);
      L(T, Ga), z && v(z, l.value[z === "range-start" ? 0 : 1]);
    },
    assignMonthAndYear: a,
    setStartTime: H
  };
}, Pl = () => {
  const {
    isModelAuto: e,
    matchDate: A,
    isDateAfter: f,
    isDateBefore: o,
    isDateBetween: c,
    isDateEqual: s,
    getWeekFromDate: r,
    getBeforeAndAfterInRange: u
  } = We(), {
    getDate: v,
    today: Y,
    rootProps: P,
    defaults: { multiCalendars: B, multiDates: O, ui: l, highlight: w, safeDates: h, range: _ },
    modelValue: b
  } = Me(), { isDisabled: E } = Ue(), k = ref(null), g = (a) => {
    !a.current && P.hideOffsetDates || (k.value = a.value);
  }, M = () => {
    k.value = null;
  }, R = (a) => Array.isArray(b.value) && _.value.enabled && b.value[0] && k.value ? a ? f(k.value, b.value[0]) : o(k.value, b.value[0]) : true, $ = (a, n) => {
    const C = () => b.value ? n ? b.value[0] || null : b.value[1] : null, m = b.value && Array.isArray(b.value) ? C() : null;
    return s(v(a.value), m);
  }, S = (a) => {
    const n = Array.isArray(b.value) ? b.value[0] : null;
    return a ? !o(k.value, n) : true;
  }, p = (a, n = true) => (_.value.enabled || P.weekPicker) && Array.isArray(b.value) && b.value.length === 2 ? P.hideOffsetDates && !a.current ? false : s(v(a.value), b.value[n ? 0 : 1]) : _.value.enabled ? $(a, n) && S(n) || s(a.value, Array.isArray(b.value) ? b.value[0] : null) && R(n) : false, D = (a, n) => {
    if (Array.isArray(b.value) && b.value[0] && b.value.length === 1) {
      const C = s(a.value, k.value);
      return n ? f(b.value[0], a.value) && C : o(b.value[0], a.value) && C;
    }
    return false;
  }, V = (a) => !b.value || P.hideOffsetDates && !a.current ? false : _.value.enabled ? P.modelAuto && Array.isArray(b.value) ? s(a.value, b.value[0] ?? Y) : false : O.value.enabled && Array.isArray(b.value) ? b.value.some((n) => s(n, a.value)) : s(a.value, b.value ? b.value : Y), F = (a) => {
    if (_.value.autoRange || P.weekPicker) {
      if (k.value) {
        if (P.hideOffsetDates && !a.current) return false;
        const n = addDays(k.value, +_.value.autoRange), C = r(v(k.value), P.weekStart);
        return P.weekPicker ? s(C[1], v(a.value)) : s(n, v(a.value));
      }
      return false;
    }
    return false;
  }, L = (a) => {
    if (_.value.autoRange || P.weekPicker) {
      if (k.value) {
        const n = addDays(k.value, +_.value.autoRange);
        if (P.hideOffsetDates && !a.current) return false;
        const C = r(v(k.value), P.weekStart);
        return P.weekPicker ? f(a.value, C[0]) && o(a.value, C[1]) : f(a.value, k.value) && o(a.value, n);
      }
      return false;
    }
    return false;
  }, ne = (a) => {
    if (_.value.autoRange || P.weekPicker) {
      if (k.value) {
        if (P.hideOffsetDates && !a.current) return false;
        const n = r(v(k.value), P.weekStart);
        return P.weekPicker ? s(n[0], a.value) : s(k.value, a.value);
      }
      return false;
    }
    return false;
  }, re = (a) => c(b.value, k.value, a.value), X = () => P.modelAuto && Array.isArray(b.value) ? !!b.value[0] : false, x = () => P.modelAuto ? e(b.value) : true, te = (a) => {
    if (P.weekPicker) return false;
    const n = _.value.enabled ? !p(a) && !p(a, false) : true;
    return !E(a.value) && !V(a) && !(!a.current && P.hideOffsetDates) && n;
  }, q = (a) => _.value.enabled ? P.modelAuto ? X() && V(a) : false : V(a), oe = (a) => w.value ? A(a.value, h.value.highlight) : false, K = (a) => {
    const n = E(a.value);
    return n && (typeof w.value == "function" ? !w.value(a.value, n) : !w.value.options.highlightDisabled);
  }, Z = (a) => typeof w.value == "function" ? w.value(a.value) : w.value.weekdays?.includes(a.value.getDay()), de = (a) => (_.value.enabled || P.weekPicker) && (!(B.value.count > 0) || a.current) && x() && !(!a.current && P.hideOffsetDates) && !V(a) ? re(a) : false, G = (a) => {
    if (Array.isArray(b.value) && b.value.length === 1) {
      const { before: n, after: C } = u(+_.value.maxRange, b.value[0]);
      return isBefore(a.value, n) || isAfter(a.value, C);
    }
    return false;
  }, ce = (a) => {
    if (Array.isArray(b.value) && b.value.length === 1) {
      const { before: n, after: C } = u(+_.value.minRange, b.value[0]);
      return c([n, C], b.value[0], a.value);
    }
    return false;
  }, le = (a) => _.value.enabled && (_.value.maxRange || _.value.minRange) ? _.value.maxRange && _.value.minRange ? G(a) || ce(a) : _.value.maxRange ? G(a) : ce(a) : false, we = (a) => {
    const { isRangeStart: n, isRangeEnd: C } = I(a), m = _.value.enabled ? n || C : false;
    return {
      dp__cell_offset: !a.current,
      dp__pointer: !P.disabled && !(!a.current && P.hideOffsetDates) && !E(a.value) && !le(a),
      dp__cell_disabled: E(a.value) || le(a),
      dp__cell_highlight: !K(a) && (oe(a) || Z(a)) && !q(a) && !m && !ne(a) && !(de(a) && P.weekPicker) && !C,
      dp__cell_highlight_active: !K(a) && (oe(a) || Z(a)) && q(a),
      dp__today: !P.noToday && s(a.value, Y) && a.current,
      "dp--past": o(a.value, Y),
      "dp--future": f(a.value, Y)
    };
  }, ve = (a) => ({
    dp__active_date: q(a),
    dp__date_hover: te(a)
  }), Ae = (a) => {
    if (b.value && !Array.isArray(b.value)) {
      const n = r(b.value, P.weekStart);
      return {
        ...Ce(a),
        dp__range_start: s(n[0], a.value),
        dp__range_end: s(n[1], a.value),
        dp__range_between_week: f(a.value, n[0]) && o(a.value, n[1])
      };
    }
    return {
      ...Ce(a)
    };
  }, Q = (a) => {
    if (b.value && Array.isArray(b.value)) {
      const n = r(b.value[0], P.weekStart), C = b.value[1] ? r(b.value[1], P.weekStart) : [];
      return {
        ...Ce(a),
        dp__range_start: s(n[0], a.value) || s(C[0], a.value),
        dp__range_end: s(n[1], a.value) || s(C[1], a.value),
        dp__range_between_week: f(a.value, n[0]) && o(a.value, n[1]) || f(a.value, C[0]) && o(a.value, C[1]),
        dp__range_between: f(a.value, n[1]) && o(a.value, C[0])
      };
    }
    return {
      ...Ce(a)
    };
  }, I = (a) => {
    const n = B.value.count > 0 ? a.current && p(a) && x() : p(a) && x(), C = B.value.count > 0 ? a.current && p(a, false) && x() : p(a, false) && x();
    return { isRangeStart: n, isRangeEnd: C };
  }, y = (a) => _.value.enabled && (_.value.fixedStart || _.value.fixedEnd) && Array.isArray(b.value) && b.value.length === 2, H = (a, n, C, m) => !y(b.value) || !k.value ? false : n ? _.value.fixedEnd && s(a.value, k.value) && isBefore(a.value, b.value[0]) && !C : _.value.fixedStart && s(a.value, k.value) && isAfter(a.value, b.value[1]) && !m, fe = (a, n) => !y(b.value) || !k.value ? false : n ? _.value.fixedEnd && isAfter(a.value, k.value) && isBefore(a.value, b.value[0]) : _.value.fixedStart && isBefore(a.value, k.value) && isAfter(a.value, b.value[1]), Pe = (a) => {
    const { isRangeStart: n, isRangeEnd: C } = I(a);
    return {
      dp__range_start: n,
      dp__range_end: C,
      dp__range_between: de(a),
      dp__date_hover: s(a.value, k.value) && !n && !C && !P.weekPicker,
      dp__date_hover_start: D(a, true) || H(a, true, n, C),
      dp__date_hover_end: D(a, false) || H(a, false, n, C),
      "dp--extended-fixed-start": fe(a, true),
      "dp--extended-fixed-end": fe(a, false)
    };
  }, Ce = (a) => ({
    ...Pe(a),
    dp__cell_auto_range: L(a),
    dp__cell_auto_range_start: ne(a),
    dp__cell_auto_range_end: F(a)
  }), i = (a) => _.value.enabled ? _.value.autoRange ? Ce(a) : P.modelAuto ? { ...ve(a), ...Pe(a) } : P.weekPicker ? Q(a) : Pe(a) : P.weekPicker ? Ae(a) : ve(a);
  return {
    setHoverDate: g,
    clearHoverDate: M,
    getDayClassData: (a) => P.hideOffsetDates && !a.current ? {} : {
      ...we(a),
      ...i(a),
      [l.value.dayClass ? l.value.dayClass(a.value, b.value) : ""]: true,
      ...l.value.calendarCell
    }
  };
}, Tl = { key: 0 }, $l = /* @__PURE__ */ defineComponent({
  __name: "DatePicker",
  props: /* @__PURE__ */ mergeDefaults({
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  }, Ar),
  emits: ["mount", "update-flow-step", "reset-flow", "focus-menu", "select-date", "time-update", "auto-apply"],
  setup(e, { expose: A, emit: f }) {
    const o = f, c = e, {
      month: s,
      year: r,
      modelValue: u,
      time: v,
      disabledTimesConfig: Y,
      today: P,
      validateTime: B,
      getCalendarDays: O,
      getMarker: l,
      handleArrow: w,
      handleScroll: h,
      handleSwipe: _,
      selectDate: b,
      updateMonthYear: E,
      presetDate: k,
      selectCurrentDate: g,
      updateTime: M,
      assignMonthAndYear: R,
      setStartTime: $
    } = Al(c, o, ve, Ae), S = useSlots(), { setHoverDate: p, getDayClassData: D, clearHoverDate: V } = Pl(), {
      getDate: F,
      rootEmit: L,
      rootProps: ne,
      defaults: { multiCalendars: re, timeConfig: X }
    } = Me(), { getYears: x, getMonths: te } = ea(), { getCellId: q } = We(), oe = useTemplateRef("calendar-header"), K = useTemplateRef("calendar"), Z = useTemplateRef("time-picker"), de = lt(S, at.Calendar), G = lt(S, at.DatePickerHeader), ce = lt(S, at.TimePicker), le = (d) => {
      o("mount", d);
    };
    watch(
      re,
      (d, a) => {
        d.count - a.count > 0 && R();
      },
      { deep: true }
    );
    const we = computed(() => (d) => O(s.value(d), r.value(d)).map((a) => ({
      ...a,
      days: a.days.map((n) => (n.marker = l(n), n.classData = D(n), n))
    })));
    function ve(d) {
      d || d === 0 ? K.value?.[d]?.triggerTransition(s.value(d), r.value(d)) : K.value?.forEach((a, n) => a?.triggerTransition(s.value(n), r.value(n)));
    }
    function Ae() {
      o("update-flow-step");
    }
    const Q = (d, a, n = 0) => {
      oe.value?.[n]?.toggleMonthPicker(d, a);
    }, I = (d, a, n = 0) => {
      oe.value?.[n]?.toggleYearPicker(d, a);
    }, y = (d, a, n) => {
      Z.value?.toggleTimePicker(d, a, n);
    }, H = (d, a) => {
      if (!ne.range) {
        const n = u.value ? u.value : P, C = a ? F(a) : n, m = d ? startOfWeek(C, { weekStartsOn: 1 }) : endOfWeek(C, { weekStartsOn: 1 });
        b({
          value: m,
          current: getMonth(C) === s.value(0),
          text: "",
          classData: {}
        }), document.getElementById(q(m))?.focus();
      }
    }, fe = (d) => {
      oe.value?.[0]?.handleMonthYearChange(d, true);
    }, Pe = (d) => {
      E(0, { month: s.value(0), year: r.value(0) + (d ? 1 : -1), fromNav: true });
    }, Ce = (d) => {
      L("overlay-toggle", { open: false, overlay: d }), o("focus-menu");
    };
    return A({
      clearHoverDate: V,
      presetDate: k,
      selectCurrentDate: g,
      handleArrow: w,
      updateMonthYear: E,
      setStartTime: $,
      toggleMonthPicker: Q,
      toggleYearPicker: I,
      toggleTimePicker: y,
      getSidebarProps: () => ({
        modelValue: u,
        month: s,
        year: r,
        time: v,
        updateTime: M,
        updateMonthYear: E,
        selectDate: b,
        presetDate: k
      }),
      changeMonth: fe,
      changeYear: Pe,
      selectWeekDate: H
    }), (d, a) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(aa, { collapse: e.collapse }, {
        default: withCtx(({ instances: n, wrapClass: C }) => [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(n, (m) => (openBlock(), createElementBlock("div", {
            key: m,
            class: normalizeClass(C)
          }, [
            unref(ne).hideMonthYearSelect ? createCommentVNode("", !0) : (openBlock(), createBlock(gl, {
              key: 0,
              ref_for: !0,
              ref: "calendar-header",
              months: unref(te)(),
              years: unref(x)(),
              month: unref(s)(m),
              year: unref(r)(m),
              instance: m,
              "menu-wrap-ref": e.menuWrapRef,
              onMount: a[0] || (a[0] = (N) => le(unref(bt).header)),
              onResetFlow: a[1] || (a[1] = (N) => d.$emit("reset-flow")),
              onUpdateMonthYear: (N) => unref(E)(m, N),
              onOverlayClosed: Ce
            }, createSlots({ _: 2 }, [
              renderList(unref(G), (N, U) => ({
                name: N,
                fn: withCtx((pe) => [
                  renderSlot(d.$slots, N, mergeProps({ ref_for: !0 }, pe))
                ])
              }))
            ]), 1032, ["months", "years", "month", "year", "instance", "menu-wrap-ref", "onUpdateMonthYear"])),
            createVNode(_l, {
              ref_for: !0,
              ref: "calendar",
              "mapped-dates": we.value(m),
              instance: m,
              month: unref(s)(m),
              year: unref(r)(m),
              onSelectDate: (N) => unref(b)(N, m !== 1),
              onSetHoverDate: a[2] || (a[2] = (N) => unref(p)(N)),
              onHandleScroll: (N) => unref(h)(N, m),
              onHandleSwipe: (N) => unref(_)(N, m),
              onMount: a[3] || (a[3] = (N) => le(unref(bt).calendar))
            }, createSlots({ _: 2 }, [
              renderList(unref(de), (N, U) => ({
                name: N,
                fn: withCtx((pe) => [
                  renderSlot(d.$slots, N, mergeProps({ ref_for: !0 }, pe))
                ])
              }))
            ]), 1032, ["mapped-dates", "instance", "month", "year", "onSelectDate", "onHandleScroll", "onHandleSwipe"])
          ], 2))), 128))
        ]),
        _: 3
      }, 8, ["collapse"]),
      unref(X).enableTimePicker ? (openBlock(), createElementBlock("div", Tl, [
        renderSlot(d.$slots, "time-picker", normalizeProps(guardReactiveProps({ time: unref(v), updateTime: unref(M) })), () => [
          createVNode(La, {
            ref: "time-picker",
            hours: unref(v).hours,
            minutes: unref(v).minutes,
            seconds: unref(v).seconds,
            "disabled-times-config": unref(Y),
            "validate-time": unref(B),
            "no-overlay-focus": e.noOverlayFocus,
            onMount: a[4] || (a[4] = (n) => le(unref(bt).timePicker)),
            "onUpdate:hours": a[5] || (a[5] = (n) => unref(M)({ hours: n, minutes: unref(v).minutes, seconds: unref(v).seconds })),
            "onUpdate:minutes": a[6] || (a[6] = (n) => unref(M)({ hours: unref(v).hours, minutes: n, seconds: unref(v).seconds })),
            "onUpdate:seconds": a[7] || (a[7] = (n) => unref(M)({ hours: unref(v).hours, minutes: unref(v).minutes, seconds: n })),
            onResetFlow: a[8] || (a[8] = (n) => d.$emit("reset-flow"))
          }, createSlots({ _: 2 }, [
            renderList(unref(ce), (n, C) => ({
              name: n,
              fn: withCtx((m) => [
                renderSlot(d.$slots, n, normalizeProps(guardReactiveProps(m)))
              ])
            }))
          ]), 1032, ["hours", "minutes", "seconds", "disabled-times-config", "validate-time", "no-overlay-focus"])
        ])
      ])) : createCommentVNode("", true)
    ], 64));
  }
}), Sl = (e, A) => {
  const {
    getDate: f,
    modelValue: o,
    year: c,
    calendars: s,
    defaults: { highlight: r, range: u, multiDates: v }
  } = Me(), { isDateBetween: Y, isDateEqual: P } = We(), { checkRangeAutoApply: B, handleMultiDatesSelect: O, setMonthOrYearRange: l } = na();
  Ft();
  const { isDisabled: w } = Ue(), { formatQuarterText: h } = pt(), {
    selectYear: _,
    groupedYears: b,
    showYearPicker: E,
    isDisabled: k,
    toggleYearPicker: g,
    handleYearSelect: M,
    handleYear: R,
    setStartDate: $
  } = Wa(A), S = ref();
  onMounted(() => {
    $();
  });
  const p = computed(() => (q) => o.value ? Array.isArray(o.value) ? o.value.some((oe) => isSameQuarter(q, oe)) : isSameQuarter(o.value, q) : false), D = (q) => {
    if (u.value.enabled) {
      if (Array.isArray(o.value)) {
        const oe = P(q, o.value[0]) || P(q, o.value[1]);
        return Y(o.value, S.value, q) && !oe;
      }
      return false;
    }
    return false;
  }, V = (q, oe) => q.quarter === getQuarter(oe) && q.year === getYear(oe), F = (q) => typeof r.value == "function" ? r.value({ quarter: getQuarter(q), year: getYear(q) }) : r.value.quarters.some((oe) => V(oe, q)), L = computed(() => (q) => {
    const oe = set(f(), { year: c.value(q) });
    return eachQuarterOfInterval({
      start: startOfYear(oe),
      end: endOfYear(oe)
    }).map((K) => {
      const Z = startOfQuarter(K), de = endOfQuarter(K), G = w(K), ce = D(Z), le = F(Z);
      return {
        text: h(Z, de),
        value: Z,
        active: p.value(Z),
        highlighted: le,
        disabled: G,
        isBetween: ce
      };
    });
  }), ne = (q) => {
    O(q, v.value.limit), A("auto-apply", true);
  }, re = (q) => {
    o.value = l(q), B(o.value, A, o.value.length < 2);
  }, X = (q) => {
    o.value = q, A("auto-apply");
  };
  return {
    groupedYears: b,
    year: c,
    isDisabled: k,
    quarters: L,
    showYearPicker: E,
    modelValue: o,
    selectYear: _,
    toggleYearPicker: g,
    handleYearSelect: M,
    handleYear: R,
    setHoverDate: (q) => {
      S.value = q;
    },
    selectQuarter: (q, oe, K) => {
      if (!K)
        return s.value[oe].month = getMonth(endOfQuarter(q)), v.value.enabled ? ne(q) : u.value.enabled ? re(q) : X(q);
    }
  };
}, Rl = { class: "dp--quarter-items" }, Cl = ["data-test-id", "disabled", "onClick", "onMouseover"], xl = /* @__PURE__ */ defineComponent({
  __name: "QuarterPicker",
  props: {
    flowStep: {},
    collapse: { type: Boolean },
    menuWrapRef: {},
    noOverlayFocus: { type: Boolean }
  },
  emits: ["reset-flow", "auto-apply"],
  setup(e, { expose: A, emit: f }) {
    const o = f, c = e, {
      defaults: { config: s }
    } = Me(), r = useSlots(), { boolHtmlAttribute: u } = Pt(), v = lt(r, at.YearMode), {
      groupedYears: Y,
      year: P,
      isDisabled: B,
      quarters: O,
      modelValue: l,
      showYearPicker: w,
      setHoverDate: h,
      selectQuarter: _,
      toggleYearPicker: b,
      handleYearSelect: E,
      handleYear: k
    } = Sl(c, o);
    return A({ getSidebarProps: () => ({
      modelValue: l,
      year: P,
      selectQuarter: _,
      handleYearSelect: E,
      handleYear: k
    }) }), (M, R) => (openBlock(), createBlock(aa, {
      collapse: e.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instances: $, wrapClass: S }) => [
        (openBlock(!0), createElementBlock(Fragment, null, renderList($, (p) => (openBlock(), createElementBlock("div", {
          key: p,
          class: normalizeClass(S)
        }, [
          createBaseVNode("div", {
            class: "dp-quarter-picker-wrap",
            style: normalizeStyle({ minHeight: `${unref(s).modeHeight}px` })
          }, [
            M.$slots["top-extra"] ? renderSlot(M.$slots, "top-extra", {
              key: 0,
              value: unref(l)
            }) : createCommentVNode("", !0),
            createBaseVNode("div", null, [
              createVNode(Na, {
                items: unref(Y)(p),
                instance: p,
                "show-year-picker": unref(w)[p],
                year: unref(P)(p),
                "is-disabled": (D) => unref(B)(p, D),
                onHandleYear: (D) => unref(k)(p, D),
                onYearSelect: (D) => unref(E)(D, p),
                onToggleYearPicker: (D) => unref(b)(p, D?.flow, D?.show)
              }, createSlots({ _: 2 }, [
                renderList(unref(v), (D, V) => ({
                  name: D,
                  fn: withCtx((F) => [
                    renderSlot(M.$slots, D, mergeProps({ ref_for: !0 }, F))
                  ])
                }))
              ]), 1032, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
            ]),
            createBaseVNode("div", Rl, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(O)(p), (D, V) => (openBlock(), createElementBlock("div", { key: V }, [
                createBaseVNode("button", {
                  type: "button",
                  class: normalizeClass(["dp--qr-btn", {
                    "dp--qr-btn-active": D.active,
                    "dp--qr-btn-between": D.isBetween,
                    "dp--qr-btn-disabled": D.disabled,
                    "dp--highlighted": D.highlighted
                  }]),
                  "data-dp-action-element": "0",
                  "data-test-id": D.value,
                  disabled: unref(u)(D.disabled),
                  onClick: (F) => unref(_)(D.value, p, D.disabled),
                  onMouseover: (F) => unref(h)(D.value)
                }, [
                  renderSlot(M.$slots, "quarter", {
                    value: D.value,
                    text: D.text
                  }, () => [
                    createTextVNode(toDisplayString(D.text), 1)
                  ])
                ], 42, Cl)
              ]))), 128))
            ])
          ], 4)
        ], 2))), 128))
      ]),
      _: 3
    }, 8, ["collapse"]));
  }
}), Ol = ["id", "tabindex", "role", "aria-label"], Yl = {
  key: 0,
  class: "dp--menu-load-container"
}, Bl = {
  key: 1,
  class: "dp--menu-header"
}, Il = ["data-dp-mobile"], El = {
  key: 0,
  class: "dp__sidebar_left"
}, Vl = ["data-dp-mobile"], Fl = ["data-test-id", "data-dp-mobile", "onClick", "onKeydown"], Nl = { class: "dp__instance_calendar" }, Wl = {
  key: 2,
  class: "dp__sidebar_right"
}, Ll = {
  key: 2,
  class: "dp__action_extra"
}, Hl = /* @__PURE__ */ defineComponent({
  __name: "DatepickerMenu",
  props: {
    collapse: { type: Boolean },
    noOverlayFocus: { type: Boolean },
    getInputRect: { type: Function }
  },
  emits: ["close-picker", "select-date", "auto-apply", "time-update", "menu-blur"],
  setup(e, { expose: A, emit: f }) {
    const o = f, c = useSlots(), {
      state: s,
      rootProps: r,
      defaults: { textInput: u, inline: v, config: Y, ui: P, ariaLabels: B },
      setState: O
    } = Me(), { isMobile: l } = Zt(), { handleEventPropagation: w, getElWithin: h, checkStopPropagation: _, checkKeyDown: b } = Ie();
    In();
    const E = useTemplateRef("inner-menu"), k = useTemplateRef("dp-menu"), g = useTemplateRef("dyn-cmp"), M = ref(0), R = ref(false), $ = ref(false), { flowStep: S, updateFlowStep: p, childMount: D, resetFlow: V, handleFlow: F } = Vn(g), L = (i) => {
      $.value = true, Y.value.allowPreventDefault && i.preventDefault(), _(i, Y.value, true);
    };
    onMounted(() => {
      R.value = true, ne(), globalThis.addEventListener("resize", ne);
      const i = unrefElement(k);
      i && !u.value.enabled && !v.value.enabled && O("menuFocused", true), i && (i.addEventListener("pointerdown", L), i.addEventListener("mousedown", L)), document.addEventListener("mousedown", Pe);
    }), onUnmounted(() => {
      globalThis.removeEventListener("resize", ne), document.removeEventListener("mousedown", Pe);
      const i = unrefElement(k);
      i && (i.removeEventListener("pointerdown", L), i.removeEventListener("mousedown", L));
    });
    const ne = () => {
      const i = unrefElement(E);
      i && (M.value = i.getBoundingClientRect().width);
    }, re = computed(() => r.monthPicker ? Ur : r.yearPicker ? Jr : r.timePicker ? cl : r.quarterPicker ? xl : $l), X = () => {
      const i = unrefElement(k);
      i && i.focus({ preventScroll: true });
    }, x = computed(() => g.value?.getSidebarProps() || {}), te = lt(c, at.ActionRow), q = lt(c, at.PassTrough), oe = computed(() => ({
      dp__menu_disabled: r.disabled,
      dp__menu_readonly: r.readonly,
      "dp-menu-loading": r.loading
    })), K = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !v.value.enabled,
        dp__relative: v.value.enabled,
        ...P.value.menu
      })
    ), Z = (i) => {
      _(i, Y.value, true);
    }, de = (i) => {
      Y.value.escClose && (o("close-picker"), w(i, Y.value));
    }, G = (i) => {
      r.arrowNavigation || (i === Xe.left || i === Xe.up ? ve("handleArrow", Xe.left, 0, i === Xe.up) : ve("handleArrow", Xe.right, 0, i === Xe.down));
    }, ce = (i) => {
      O("shiftKeyInMenu", i.shiftKey), !r.hideMonthYearSelect && i.code === $e.tab && i.target.classList.contains("dp__menu") && s.shiftKeyInMenu && (i.preventDefault(), _(i, Y.value, true), o("close-picker"));
    }, le = (i) => {
      g.value?.toggleTimePicker(false, false), g.value?.toggleMonthPicker(false, false, i), g.value?.toggleYearPicker(false, false, i);
    }, we = (i, d = 0) => i === "month" ? g.value?.toggleMonthPicker(false, true, d) : i === "year" ? g.value?.toggleYearPicker(false, true, d) : i === "time" ? g.value?.toggleTimePicker(true, false) : le(d), ve = (i, ...d) => {
      g.value?.[i] && g.value?.[i](...d);
    }, Ae = () => {
      ve("selectCurrentDate");
    }, Q = (i) => {
      ve("presetDate", toValue$1(i));
    }, I = () => {
      ve("clearHoverDate");
    }, y = (i, d) => {
      ve("updateMonthYear", i, d);
    }, H = (i, d) => {
      i.preventDefault(), G(d);
    }, fe = (i) => {
      if (ce(i), i.key === $e.home || i.key === $e.end)
        return ve(
          "selectWeekDate",
          i.key === $e.home,
          i.target.getAttribute("id")
        );
      switch ((i.key === $e.pageUp || i.key === $e.pageDown) && (i.shiftKey ? (ve("changeYear", i.key === $e.pageUp), h(k.value, "overlay-year")?.focus()) : (ve("changeMonth", i.key === $e.pageUp), h(k.value, i.key === $e.pageUp ? "action-prev" : "action-next")?.focus()), i.target.getAttribute("id") && k.value?.focus({ preventScroll: true })), i.key) {
        case $e.esc:
          return de(i);
        case $e.arrowLeft:
          return H(i, Xe.left);
        case $e.arrowRight:
          return H(i, Xe.right);
        case $e.arrowUp:
          return H(i, Xe.up);
        case $e.arrowDown:
          return H(i, Xe.down);
        default:
          return;
      }
    }, Pe = (i) => {
      v.value.enabled && !v.value.input && !k.value?.contains(i.target) && $.value && ($.value = false, o("menu-blur"));
    };
    return A({
      updateMonthYear: y,
      switchView: we,
      onValueCleared: () => {
        g.value?.setStartTime?.();
      },
      handleFlow: F
    }), (i, d) => (openBlock(), createElementBlock("div", {
      id: unref(r).menuId,
      ref: "dp-menu",
      tabindex: unref(v).enabled ? void 0 : "0",
      role: unref(v).enabled ? void 0 : "dialog",
      "aria-label": unref(B)?.menu,
      class: normalizeClass(K.value),
      onMouseleave: I,
      onClick: Z,
      onKeydown: fe
    }, [
      (unref(r).disabled || unref(r).readonly) && unref(v).enabled || unref(r).loading ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(oe.value)
      }, [
        unref(r).loading ? (openBlock(), createElementBlock("div", Yl, [...d[5] || (d[5] = [
          createBaseVNode("span", { class: "dp--menu-loader" }, null, -1)
        ])])) : createCommentVNode("", true)
      ], 2)) : createCommentVNode("", true),
      i.$slots["menu-header"] ? (openBlock(), createElementBlock("div", Bl, [
        renderSlot(i.$slots, "menu-header")
      ])) : createCommentVNode("", true),
      renderSlot(i.$slots, "arrow"),
      createBaseVNode("div", {
        ref: "inner-menu",
        class: normalizeClass({
          dp__menu_content_wrapper: unref(r).presetDates?.length || !!i.$slots["left-sidebar"] || !!i.$slots["right-sidebar"],
          "dp--menu-content-wrapper-collapsed": e.collapse && (unref(r).presetDates?.length || !!i.$slots["left-sidebar"] || !!i.$slots["right-sidebar"])
        }),
        "data-dp-mobile": unref(l),
        style: normalizeStyle({ "--dp-menu-width": `${M.value}px` })
      }, [
        i.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", El, [
          renderSlot(i.$slots, "left-sidebar", normalizeProps(guardReactiveProps(x.value)))
        ])) : createCommentVNode("", true),
        unref(r).presetDates.length ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true }),
          "data-dp-mobile": unref(l)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(r).presetDates, (a, n) => (openBlock(), createElementBlock(Fragment, { key: n }, [
            a.slot ? renderSlot(i.$slots, a.slot, {
              key: 0,
              presetDate: Q,
              label: a.label,
              value: a.value
            }) : (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              style: normalizeStyle(a.style || {}),
              class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
              "data-test-id": a.testId ?? void 0,
              "data-dp-mobile": unref(l),
              onClick: withModifiers((C) => Q(a.value), ["prevent"]),
              onKeydown: (C) => unref(b)(C, () => Q(a.value), true)
            }, toDisplayString(a.label), 47, Fl))
          ], 64))), 128))
        ], 10, Vl)) : createCommentVNode("", true),
        createBaseVNode("div", Nl, [
          (openBlock(), createBlock(resolveDynamicComponent(re.value), {
            ref: "dyn-cmp",
            "flow-step": unref(S),
            collapse: e.collapse,
            "no-overlay-focus": e.noOverlayFocus,
            "menu-wrap-ref": k.value,
            onMount: unref(D),
            onUpdateFlowStep: unref(p),
            onResetFlow: unref(V),
            onFocusMenu: X,
            onSelectDate: d[0] || (d[0] = (a) => i.$emit("select-date")),
            onAutoApply: d[1] || (d[1] = (a) => i.$emit("auto-apply", a)),
            onTimeUpdate: d[2] || (d[2] = (a) => i.$emit("time-update"))
          }, createSlots({ _: 2 }, [
            renderList(unref(q), (a, n) => ({
              name: a,
              fn: withCtx((C) => [
                renderSlot(i.$slots, a, normalizeProps(guardReactiveProps({ ...C })))
              ])
            }))
          ]), 1064, ["flow-step", "collapse", "no-overlay-focus", "menu-wrap-ref", "onMount", "onUpdateFlowStep", "onResetFlow"]))
        ]),
        i.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", Wl, [
          renderSlot(i.$slots, "right-sidebar", normalizeProps(guardReactiveProps(x.value)))
        ])) : createCommentVNode("", true)
      ], 14, Il),
      i.$slots["action-extra"] ? (openBlock(), createElementBlock("div", Ll, [
        i.$slots["action-extra"] ? renderSlot(i.$slots, "action-extra", {
          key: 0,
          selectCurrentDate: Ae
        }) : createCommentVNode("", true)
      ])) : createCommentVNode("", true),
      !unref(r).autoApply || unref(Y).keepActionRow ? (openBlock(), createBlock(Fr, {
        key: 3,
        "menu-mount": R.value,
        "calendar-width": M.value,
        onClosePicker: d[3] || (d[3] = (a) => i.$emit("close-picker")),
        onSelectDate: d[4] || (d[4] = (a) => i.$emit("select-date")),
        onSelectNow: Ae
      }, createSlots({ _: 2 }, [
        renderList(unref(te), (a, n) => ({
          name: a,
          fn: withCtx((C) => [
            renderSlot(i.$slots, a, normalizeProps(guardReactiveProps(C)))
          ])
        }))
      ]), 1032, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
    ], 42, Ol));
  }
}), jl = ["data-dp-mobile"], Kl = /* @__PURE__ */ defineComponent({
  __name: "VueDatePicker",
  setup(e, { expose: A }) {
    const {
      rootEmit: f,
      setState: o,
      inputValue: c,
      modelValue: s,
      rootProps: r,
      defaults: { inline: u, config: v, textInput: Y, range: P, multiDates: B, teleport: O, floatingConfig: l }
    } = Me(), { validateDate: w, isValidTime: h } = Ue(), { menuTransition: _, showTransition: b } = Vt(), { isMobile: E } = Zt(), { findNextFocusableElement: k, getNumVal: g } = Ie(), M = useSlots(), R = ref(false), $ = ref(u.value.enabled || r.centered), S = toRef(r, "modelValue"), p = toRef(r, "timezone"), D = useTemplateRef("dp-menu-wrap"), V = useTemplateRef("dp-menu"), F = useTemplateRef("input-cmp"), L = useTemplateRef("picker-wrapper"), ne = useTemplateRef("menu-arrow"), re = ref(false), X = ref(false), x = ref(false), te = ref(true), q = (se) => (l.value.arrow && se.push(
      arrow({ element: l.value.arrow === true ? ne : l.value.arrow })
    ), l.value.flip && se.push(flip(typeof l.value.flip == "object" ? l.value.flip : {})), l.value.shift && se.push(shift(typeof l.value.shift == "object" ? l.value.shift : {})), se), { floatingStyles: oe, middlewareData: K, placement: Z, y: de } = useFloating(
      F,
      D,
      {
        strategy: l.value.strategy,
        placement: l.value.placement,
        middleware: q([offset(l.value.offset)]),
        whileElementsMounted: autoUpdate
      }
    );
    onMounted(() => {
      le(r.modelValue), nextTick().then(() => {
        u.value.enabled || globalThis.addEventListener("resize", Pe);
      }), u.value.enabled && (R.value = true), globalThis.addEventListener("keyup", Ce), globalThis.addEventListener("keydown", i);
    }), onUnmounted(() => {
      u.value.enabled || globalThis.removeEventListener("resize", Pe), globalThis.removeEventListener("keyup", Ce), globalThis.removeEventListener("keydown", i);
    });
    const G = Fa(M, r.presetDates), ce = lt(M, at.Input);
    watch(
      [S, p],
      () => {
        le(S.value);
      },
      { deep: true }
    ), watch([Z, de], () => {
      !u.value.enabled && !r.centered && te.value && ($.value = false, nextTick().then(() => {
        te.value = false, $.value = true;
      }));
    });
    const { parseExternalModelValue: le, emitModelValue: we, formatInputValue: ve, checkBeforeEmit: Ae } = En(), Q = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: r.dark,
        dp__theme_light: !r.dark,
        dp__flex_display: u.value.enabled,
        "dp--flex-display-collapsed": x.value,
        dp__flex_display_with_input: u.value.input
      })
    ), I = computed(() => r.dark ? "dp__theme_dark" : "dp__theme_light"), y = computed(() => u.value.enabled && (r.timePicker || r.monthPicker || r.yearPicker || r.quarterPicker)), H = () => F.value?.$el?.getBoundingClientRect() ?? { width: 0, left: 0, right: 0 }, fe = () => {
      R.value && v.value.closeOnScroll && ge();
    }, Pe = () => {
      const se = V.value?.$el.getBoundingClientRect().width ?? 0;
      x.value = document.body.offsetWidth <= se;
    }, Ce = (se) => {
      se.key === "Tab" && !u.value.enabled && !r.teleport && v.value.tabOutClosesMenu && (L.value.contains(document.activeElement) || ge()), X.value = se.shiftKey;
    }, i = (se) => {
      X.value = se.shiftKey;
    }, d = () => {
      !r.disabled && !r.readonly && (te.value = true, R.value = true, R.value && f("open"), R.value || pe(), le(r.modelValue));
    }, a = () => {
      c.value = "", pe(), V.value?.onValueCleared(), F.value?.setParsedDate(null), f("update:model-value", null), f("cleared"), v.value.closeOnClearValue && ge();
    }, n = () => {
      const se = s.value;
      return !se || !Array.isArray(se) && w(se) ? true : Array.isArray(se) ? B.value.enabled || se.length === 2 && w(se[0]) && w(se[1]) ? true : P.value.partialRange && !r.timePicker ? w(se[0]) : false : false;
    }, C = () => {
      Ae() && n() ? (we(), ge()) : f("invalid-select");
    }, m = (se) => {
      N(), we(), v.value.closeOnAutoApply && !se && ge();
    }, N = () => {
      F.value && Y.value.enabled && F.value.setParsedDate(s.value);
    }, U = (se = false) => {
      r.autoApply && h(s.value) && n() && (P.value.enabled && Array.isArray(s.value) ? (P.value.partialRange || s.value.length === 2) && m(se) : m(se));
    }, pe = () => {
      Y.value.enabled || (s.value = null);
    }, ge = (se = false) => {
      te.value = true, se && s.value && v.value.setDateOnMenuClose && C(), u.value.enabled || (R.value && (R.value = false, o("menuFocused", false), o("shiftKeyInMenu", false), f("closed"), c.value && le(S.value)), pe(), f("blur"));
    }, Qe = (se, Le, Je = false) => {
      if (!se) {
        s.value = null;
        return;
      }
      const St = Array.isArray(se) ? se.every((jt) => w(jt)) : w(se), ht = h(se);
      St && ht ? (o("isTextInputDate", true), s.value = se, Le ? (re.value = Je, C(), f("text-submit")) : r.autoApply && U(true), nextTick().then(() => {
        o("isTextInputDate", false);
      })) : f("invalid-date", se);
    }, Tt = () => {
      r.autoApply && h(s.value) && we(), N();
    }, Wt = () => R.value ? ge() : d(), ra = (se) => {
      s.value = se;
    }, Lt = () => {
      Y.value.enabled && (o("isInputFocused", true), ve()), f("focus");
    }, la = () => {
      Y.value.enabled && (o("isInputFocused", false), le(r.modelValue), re.value && k(L.value, X.value)?.focus()), f("blur");
    }, oa = (se, Le) => {
      V.value && V.value.updateMonthYear(Le ?? 0, {
        month: g(se.month),
        year: g(se.year)
      });
    }, sa = (se) => {
      le(se ?? r.modelValue);
    }, $t = (se, Le) => {
      V.value?.switchView(se, Le);
    }, ua = (se, Le) => {
      if (R.value)
        return v.value.onClickOutside ? v.value.onClickOutside(se, Le) : ge(true);
    }, ia = (se = 0) => {
      V.value?.handleFlow(se);
    }, Ht = () => D;
    return onClickOutside(D, (se) => ua(n, se), {
      ignore: [F]
    }), A({
      closeMenu: ge,
      selectDate: C,
      clearValue: a,
      openMenu: d,
      onScroll: fe,
      formatInputValue: ve,
      // exposed for testing purposes
      updateInternalModelValue: ra,
      // modify internal modelValue
      setMonthYear: oa,
      parseModel: sa,
      switchView: $t,
      toggleMenu: Wt,
      handleFlow: ia,
      getDpWrapMenuRef: Ht,
      dpMenuRef: () => V,
      dpWrapMenuRef: () => D,
      inputRef: () => F
    }), (se, Le) => (openBlock(), createElementBlock("div", {
      ref: "picker-wrapper",
      class: normalizeClass(Q.value),
      "data-datepicker-instance": "",
      "data-dp-mobile": unref(E)
    }, [
      createVNode(Yr, {
        ref: "input-cmp",
        "is-menu-open": R.value,
        onClear: a,
        onOpen: d,
        onSetInputDate: Qe,
        onSetEmptyDate: unref(we),
        onSelectDate: C,
        onToggle: Wt,
        onClose: ge,
        onFocus: Lt,
        onBlur: la,
        onRealBlur: Le[0] || (Le[0] = (Je) => unref(o)("isInputFocused", false))
      }, createSlots({ _: 2 }, [
        renderList(unref(ce), (Je, St) => ({
          name: Je,
          fn: withCtx((ht) => [
            renderSlot(se.$slots, Je, normalizeProps(guardReactiveProps(ht)))
          ])
        }))
      ]), 1032, ["is-menu-open", "onSetEmptyDate"]),
      createVNode(Teleport, {
        to: unref(O),
        disabled: !unref(O)
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            ref: "dp-menu-wrap",
            class: normalizeClass({
              "dp--menu-wrapper": !unref(u).enabled,
              dp__outer_menu_wrap: true,
              "dp--centered": unref(r).centered
            }),
            style: normalizeStyle(!unref(u).enabled && !unref(r).centered ? unref(oe) : void 0)
          }, [
            createVNode(Transition, {
              name: unref(_)(unref(Z).startsWith("top")),
              css: unref(b) && !unref(u).enabled && !unref(r).centered && $.value
            }, {
              default: withCtx(() => [
                R.value && $.value ? (openBlock(), createBlock(Hl, {
                  key: 0,
                  ref: "dp-menu",
                  class: normalizeClass({ [I.value]: true }),
                  "no-overlay-focus": y.value,
                  collapse: x.value,
                  "get-input-rect": H,
                  onClosePicker: ge,
                  onSelectDate: C,
                  onAutoApply: U,
                  onTimeUpdate: Tt,
                  onMenuBlur: Le[1] || (Le[1] = (Je) => unref(f)("blur"))
                }, createSlots({ _: 2 }, [
                  renderList(unref(G), (Je, St) => ({
                    name: Je,
                    fn: withCtx((ht) => [
                      renderSlot(se.$slots, Je, normalizeProps(guardReactiveProps({ ...ht })))
                    ])
                  })),
                  !unref(u).enabled && !unref(r).centered && unref(l).arrow === true ? {
                    name: "arrow",
                    fn: withCtx(() => [
                      createBaseVNode("div", {
                        ref: "menu-arrow",
                        class: normalizeClass({
                          dp__arrow_top: unref(Z) === "bottom",
                          dp__arrow_bottom: unref(Z) === "top"
                        }),
                        style: normalizeStyle({
                          left: unref(K).arrow?.x != null ? `${unref(K).arrow.x}px` : "",
                          top: unref(K).arrow?.y != null ? `${unref(K).arrow.y}px` : ""
                        })
                      }, null, 6)
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["class", "no-overlay-focus", "collapse"])) : createCommentVNode("", true)
              ]),
              _: 3
            }, 8, ["name", "css"])
          ], 6)
        ]),
        _: 3
      }, 8, ["to", "disabled"])
    ], 10, jl));
  }
}), Zl = /* @__PURE__ */ defineComponent({
  __name: "VueDatePickerRoot",
  props: /* @__PURE__ */ mergeDefaults({
    multiCalendars: { type: [Boolean, Number, String, Object] },
    modelValue: {},
    modelType: {},
    dark: { type: Boolean },
    transitions: { type: [Boolean, Object] },
    ariaLabels: {},
    hideNavigation: {},
    timezone: {},
    vertical: { type: Boolean },
    hideMonthYearSelect: { type: Boolean },
    disableYearSelect: { type: Boolean },
    yearRange: {},
    autoApply: { type: Boolean },
    disabledDates: { type: [Array, Function] },
    startDate: {},
    hideOffsetDates: { type: Boolean },
    noToday: { type: Boolean },
    allowedDates: {},
    markers: {},
    presetDates: {},
    flow: {},
    preventMinMaxNavigation: { type: Boolean },
    reverseYears: { type: Boolean },
    weekPicker: { type: Boolean },
    filters: {},
    arrowNavigation: { type: Boolean },
    highlight: { type: [Function, Object] },
    teleport: { type: [String, Boolean] },
    centered: { type: Boolean },
    locale: {},
    weekStart: {},
    weekNumbers: { type: [Boolean, Object] },
    dayNames: { type: [Function, Array] },
    monthPicker: { type: Boolean },
    yearPicker: { type: Boolean },
    modelAuto: { type: Boolean },
    formats: {},
    multiDates: { type: [Boolean, Object] },
    minDate: {},
    maxDate: {},
    minTime: {},
    maxTime: {},
    inputAttrs: {},
    timeConfig: {},
    placeholder: {},
    timePicker: { type: Boolean },
    range: { type: [Boolean, Object] },
    menuId: {},
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    inline: { type: [Boolean, Object] },
    textInput: { type: [Boolean, Object] },
    sixWeeks: { type: [Boolean, String] },
    actionRow: {},
    focusStartDate: { type: Boolean },
    disabledTimes: { type: [Function, Array] },
    calendar: { type: Function },
    config: {},
    quarterPicker: { type: Boolean },
    yearFirst: { type: Boolean },
    loading: { type: Boolean },
    ui: {},
    floating: {}
  }, Pr),
  emits: ["update:model-value", "internal-model-change", "text-submit", "text-input", "open", "closed", "focus", "blur", "cleared", "flow-step", "update-month-year", "invalid-select", "invalid-fixed-range", "invalid-date", "tooltip-open", "tooltip-close", "am-pm-change", "range-start", "range-end", "date-click", "overlay-toggle", "invalid"],
  setup(e, { expose: A, emit: f }) {
    const o = f, c = e;
    Yn(c, o);
    const s = useSlots(), r = Fa(s, c.presetDates), u = useTemplateRef("date-picker");
    return A($r(u)), (v, Y) => (openBlock(), createBlock(Kl, { ref: "date-picker" }, createSlots({ _: 2 }, [
      renderList(unref(r), (P, B) => ({
        name: P,
        fn: withCtx((O) => [
          renderSlot(v.$slots, P, normalizeProps(guardReactiveProps(O)))
        ])
      }))
    ]), 1536));
  }
});

const _hoisted_1$4 = {
  key: 0,
  class: "offcanvas-content"
};
const _hoisted_2$4 = { class: "oc-header-grid" };
const _hoisted_3$4 = {
  class: "oc-stat-item",
  style: { "grid-column": "span 4", "background-color": "#f7f9fc", "padding": "12px", "border-radius": "6px", "border": "1px solid #e2e8f0", "margin-bottom": "8px" }
};
const _hoisted_4$4 = {
  class: "oc-stat-value",
  style: { "font-family": "monospace", "word-break": "break-all", "color": "#444", "font-size": "14px" }
};
const _hoisted_5$4 = { class: "oc-stat-item" };
const _hoisted_6$4 = { class: "oc-stat-value" };
const _hoisted_7$4 = { class: "oc-stat-item" };
const _hoisted_8$4 = { class: "oc-stat-value" };
const _hoisted_9$4 = { class: "oc-stat-item" };
const _hoisted_10$4 = { class: "oc-stat-value" };
const _hoisted_11$4 = { class: "oc-stat-item" };
const _hoisted_12$4 = {
  class: "oc-stat-value",
  style: { "opacity": "0.5" }
};
const _hoisted_13$4 = { class: "oc-section" };
const _hoisted_14$4 = { class: "oc-card route-map-wrapper" };
const _hoisted_15$4 = { class: "route-map-container" };
const _hoisted_16$2 = {
  key: 0,
  class: "route-flight-segment"
};
const _hoisted_17$2 = { class: "flight-visual" };
const _hoisted_18$2 = { class: "flight-city" };
const _hoisted_19$2 = { class: "flight-line" };
const _hoisted_20$2 = { class: "flight-badge" };
const _hoisted_21$2 = { class: "flight-city" };
const _hoisted_22$2 = { class: "route-times flight-times" };
const _hoisted_23$1 = {
  key: 1,
  class: "route-milestone"
};
const _hoisted_24$1 = { class: "route-times" };
const _hoisted_25$1 = { key: 0 };
const _hoisted_26$1 = { key: 1 };
const _hoisted_27$1 = { key: 2 };
const _hoisted_28$1 = { key: 3 };
const _hoisted_29$1 = {
  key: 2,
  class: "route-arrow"
};
const _hoisted_30$1 = { class: "oc-section" };
const _hoisted_31$1 = { class: "oc-table-wrapper" };
const _hoisted_32$1 = { class: "oc-table" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "RecordOffcanvas",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    recordData: {
      type: Object,
      default: null
    }
  },
  emits: ["update:isOpen"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const closeOffCanvas = () => {
      emit("update:isOpen", false);
    };
    const defaultRouteMap = [
      { code: "FWB", status: "complete", pDate: "24Apr 05:45", mDate: "-", aDate: "-" },
      { code: "LAT", status: "complete", pDate: "24Apr 05:50", mDate: "22Apr 12:46", aDate: "22Apr 12:45" },
      { code: "RCS", status: "complete", pDate: "24Apr 05:50", mDate: "22Apr 12:46", aDate: "22Apr 12:46" },
      { code: "FOW", status: "missing", pDate: "24Apr 07:20", mDate: "-", aDate: "-" },
      { code: "DEP", status: "missing", pDate: "24Apr 09:20", mDate: "-", aDate: "-" },
      { isFlight: true, from: "HKG", to: "SGN", flightNo: "CX767", sDate: "24Apr 08:20", aDate: "-" },
      { code: "ARR", status: "missing", pDate: "24Apr 10:50", mDate: "-", aDate: "-" },
      { code: "RCF", status: "missing", pDate: "24Apr 13:05", mDate: "-", aDate: "-" },
      { code: "NFD", status: "missing", pDate: "24Apr 13:05", mDate: "-", aDate: "-", bDate: "24Apr 13:05" },
      { code: "AWD", status: "missing", pDate: "24Apr 12:35", mDate: "-", aDate: "-" },
      { code: "DLV", status: "new", pDate: "26Apr 10:05", mDate: "-", aDate: "-" }
    ];
    const defaultEvents = [
      { code: "RCS", desc: "Consignment received from shipper or agent", time: "05 Jun 10:10" },
      { code: "PUP", desc: "Pickup from shipper", time: "24 Jun 10:38" },
      { code: "REW", desc: "Received Export Warehouse", time: "24 Jun 10:58" },
      { code: "DEW", desc: "Departed Export Warehouse", time: "24 Jun 11:15" },
      { code: "REH", desc: "Received Export Hub", time: "24 Jun 11:32" },
      { code: "DEH", desc: "Departed Export Hub", time: "24 Jun 12:07" }
    ];
    const displayRouteMap = computed(() => {
      return props.recordData?.routeMap || defaultRouteMap;
    });
    const displayEvents = computed(() => {
      return props.recordData?.events || defaultEvents;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        __props.isOpen ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "offcanvas-overlay",
          onClick: closeOffCanvas
        })) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(["offcanvas", { "is-open": __props.isOpen }])
        }, [
          __props.recordData ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
            createBaseVNode("button", {
              class: "btn-close",
              onClick: closeOffCanvas
            }, "X"),
            createBaseVNode("div", _hoisted_2$4, [
              createBaseVNode("div", _hoisted_3$4, [
                _cache[0] || (_cache[0] = createBaseVNode("span", {
                  class: "oc-stat-label",
                  style: { "color": "#1A8242", "font-weight": "600" }
                }, "1R (ONE Record) LO ID", -1)),
                createBaseVNode("span", _hoisted_4$4, toDisplayString(__props.recordData.oneRecordLo || "N/A"), 1)
              ]),
              createBaseVNode("div", _hoisted_5$4, [
                _cache[1] || (_cache[1] = createBaseVNode("span", { class: "oc-stat-label" }, "AWB", -1)),
                createBaseVNode("span", _hoisted_6$4, toDisplayString(__props.recordData.awb), 1)
              ]),
              createBaseVNode("div", _hoisted_7$4, [
                _cache[2] || (_cache[2] = createBaseVNode("span", { class: "oc-stat-label" }, "Origin", -1)),
                createBaseVNode("span", _hoisted_8$4, toDisplayString(__props.recordData.origin), 1)
              ]),
              createBaseVNode("div", _hoisted_9$4, [
                _cache[3] || (_cache[3] = createBaseVNode("span", { class: "oc-stat-label" }, "Destination", -1)),
                createBaseVNode("span", _hoisted_10$4, toDisplayString(__props.recordData.destination), 1)
              ]),
              createBaseVNode("div", _hoisted_11$4, [
                _cache[4] || (_cache[4] = createBaseVNode("span", { class: "oc-stat-label" }, "Product", -1)),
                createBaseVNode("span", _hoisted_12$4, toDisplayString(__props.recordData.awb), 1)
              ]),
              _cache[5] || (_cache[5] = createStaticVNode('<div class="oc-stat-item" data-v-304df020><span class="oc-stat-label" data-v-304df020>Total Pieces</span><span class="oc-stat-value" data-v-304df020>4</span></div><div class="oc-stat-item" data-v-304df020><span class="oc-stat-label" data-v-304df020>Total Weight</span><span class="oc-stat-value" data-v-304df020>4299 KG</span></div><div class="oc-stat-item" data-v-304df020><span class="oc-stat-label" data-v-304df020>Total Volume</span><span class="oc-stat-value" data-v-304df020>0</span></div>', 3))
            ]),
            createBaseVNode("div", _hoisted_13$4, [
              _cache[8] || (_cache[8] = createStaticVNode('<h4 class="oc-section-title" data-v-304df020>Route Map</h4><div class="oc-legend" data-v-304df020><span class="legend-item" data-v-304df020><span class="legend-dot status-new" data-v-304df020></span>New</span><span class="legend-item" data-v-304df020><span class="legend-dot status-missing" data-v-304df020></span>Missing</span><span class="legend-item" data-v-304df020><span class="legend-dot status-complete" data-v-304df020></span>Complete</span><span class="legend-item" data-v-304df020><span class="legend-dot status-partial" data-v-304df020></span>Partial Complete</span><span class="legend-item" data-v-304df020><span class="legend-dot status-discrepancy" data-v-304df020></span>Discrepancy</span></div>', 2)),
              createBaseVNode("div", _hoisted_14$4, [
                createBaseVNode("div", _hoisted_15$4, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(displayRouteMap.value, (milestone, idx) => {
                    return openBlock(), createElementBlock(Fragment, { key: idx }, [
                      milestone.isFlight ? (openBlock(), createElementBlock("div", _hoisted_16$2, [
                        createBaseVNode("div", _hoisted_17$2, [
                          createBaseVNode("span", _hoisted_18$2, toDisplayString(milestone.from), 1),
                          createBaseVNode("div", _hoisted_19$2, [
                            _cache[6] || (_cache[6] = createBaseVNode("svg", {
                              class: "flight-icon",
                              viewBox: "0 0 24 24",
                              fill: "currentColor"
                            }, [
                              createBaseVNode("path", { d: "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" })
                            ], -1)),
                            createBaseVNode("span", _hoisted_20$2, toDisplayString(milestone.flightNo), 1)
                          ]),
                          createBaseVNode("span", _hoisted_21$2, toDisplayString(milestone.to), 1)
                        ]),
                        createBaseVNode("div", _hoisted_22$2, [
                          createBaseVNode("div", null, "S: " + toDisplayString(milestone.sDate), 1),
                          createBaseVNode("div", null, "A: " + toDisplayString(milestone.aDate), 1)
                        ])
                      ])) : (openBlock(), createElementBlock("div", _hoisted_23$1, [
                        createBaseVNode("div", {
                          class: normalizeClass(["milestone-node", `status-${milestone.status}`])
                        }, toDisplayString(milestone.code), 3),
                        createBaseVNode("div", _hoisted_24$1, [
                          milestone.pDate ? (openBlock(), createElementBlock("div", _hoisted_25$1, "P: " + toDisplayString(milestone.pDate), 1)) : createCommentVNode("", true),
                          milestone.mDate ? (openBlock(), createElementBlock("div", _hoisted_26$1, "M: " + toDisplayString(milestone.mDate), 1)) : createCommentVNode("", true),
                          milestone.aDate ? (openBlock(), createElementBlock("div", _hoisted_27$1, "A: " + toDisplayString(milestone.aDate), 1)) : createCommentVNode("", true),
                          milestone.bDate ? (openBlock(), createElementBlock("div", _hoisted_28$1, "B: " + toDisplayString(milestone.bDate), 1)) : createCommentVNode("", true)
                        ])
                      ])),
                      Number(idx) < displayRouteMap.value.length - 1 ? (openBlock(), createElementBlock("div", _hoisted_29$1, [..._cache[7] || (_cache[7] = [
                        createBaseVNode("svg", {
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          fill: "none",
                          "stroke-width": "3"
                        }, [
                          createBaseVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M14 5l7 7m0 0l-7 7m7-7H3"
                          })
                        ], -1)
                      ])])) : createCommentVNode("", true)
                    ], 64);
                  }), 128))
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_30$1, [
              _cache[10] || (_cache[10] = createBaseVNode("h4", { class: "oc-section-title" }, "ONE Record Events", -1)),
              createBaseVNode("div", _hoisted_31$1, [
                createBaseVNode("table", _hoisted_32$1, [
                  _cache[9] || (_cache[9] = createBaseVNode("thead", null, [
                    createBaseVNode("tr", null, [
                      createBaseVNode("th", null, "Event"),
                      createBaseVNode("th", null, "Description"),
                      createBaseVNode("th", null, "Actual Event Time")
                    ])
                  ], -1)),
                  createBaseVNode("tbody", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(displayEvents.value, (evt, idx) => {
                      return openBlock(), createElementBlock("tr", { key: idx }, [
                        createBaseVNode("td", null, toDisplayString(evt.code), 1),
                        createBaseVNode("td", null, toDisplayString(evt.desc), 1),
                        createBaseVNode("td", null, toDisplayString(evt.time), 1)
                      ]);
                    }), 128))
                  ])
                ])
              ])
            ])
          ])) : createCommentVNode("", true)
        ], 2)
      ]);
    };
  }
});

const RecordOffcanvas = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-304df020"]]);

const _hoisted_1$3 = { class: "dashboard-page" };
const _hoisted_2$3 = { class: "main-content" };
const _hoisted_3$3 = { class: "page-tabs" };
const _hoisted_4$3 = { class: "card search-card" };
const _hoisted_5$3 = { class: "form-grid" };
const _hoisted_6$3 = { class: "form-group" };
const _hoisted_7$3 = { class: "form-group" };
const _hoisted_8$3 = {
  class: "form-group",
  style: { "z-index": "10" }
};
const _hoisted_9$3 = {
  class: "form-group",
  style: { "z-index": "10" }
};
const _hoisted_10$3 = { class: "card results-card" };
const _hoisted_11$3 = { class: "table-container" };
const _hoisted_12$3 = { key: 0 };
const _hoisted_13$3 = ["onClick"];
const _hoisted_14$3 = ["onClick"];
const _hoisted_15$3 = ["onClick"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Dashboard",
  setup(__props) {
    const activeTab = ref("Air Waybill");
    const searchAwb = ref("");
    const searchOneRecordLO = ref("");
    const searchDateRange = ref(null);
    const searchLastUpdateDate = ref(null);
    const isOffCanvasOpen = ref(false);
    const selectedRecordData = ref(null);
    const openOffCanvas = (record) => {
      selectedRecordData.value = record;
      isOffCanvasOpen.value = true;
    };
    const allRecords = [
      {
        awb: "160-12345675",
        oneRecordLo: "fecbe019-f3d6-4436-ad35-66ce87a7d985",
        source: "Manual",
        hse: "0",
        flightDate: "2026-04-26",
        origin: "HKG",
        destination: "LHR",
        status: "Pending",
        print: "N",
        shipper: "ABC Logistics",
        consignee: "XYZ Imports",
        user: "admin",
        lastUpdate: "2026-04-25 10:00",
        routeMap: [
          { code: "FWB", status: "complete", pDate: "24Apr 05:45", mDate: "-", aDate: "-" },
          { code: "LAT", status: "complete", pDate: "24Apr 05:50", mDate: "22Apr 12:46", aDate: "22Apr 12:45" },
          { code: "SAC", status: "complete", pDate: "24Apr 05:50", mDate: "22Apr 12:46", aDate: "22Apr 12:45" },
          { code: "RCS", status: "complete", pDate: "24Apr 05:50", mDate: "22Apr 12:46", aDate: "22Apr 12:46" },
          { code: "FOW", status: "new", pDate: "24Apr 07:20", mDate: "-", aDate: "-" },
          { code: "DEP", status: "new", pDate: "24Apr 09:20", mDate: "-", aDate: "-" },
          { isFlight: true, from: "HKG", to: "SGN", flightNo: "CX767", sDate: "24Apr 08:20", aDate: "-" },
          { code: "ARR", status: "new", pDate: "24Apr 10:50", mDate: "-", aDate: "-" },
          { code: "RCF", status: "new", pDate: "24Apr 13:05", mDate: "-", aDate: "-" },
          { code: "NFD", status: "new", pDate: "24Apr 13:05", mDate: "-", aDate: "-", bDate: "24Apr 13:05" },
          { code: "AWD", status: "new", pDate: "24Apr 12:35", mDate: "-", aDate: "-" },
          { code: "DLV", status: "new", pDate: "26Apr 10:05", mDate: "-", aDate: "-" }
        ],
        events: [
          { code: "FWB", desc: "Creation of MAWB", time: "24 Apr 05:45" },
          { code: "LAT", desc: "Latest Acceptance Time", time: "24 Apr 05:50" },
          { code: "RCS", desc: "Freight Checked in at Departure Airline", time: "24 Apr 05:50" }
        ]
      },
      {
        awb: "160-98765432",
        oneRecordLo: "7a2f1b40-8c29-4d6d-9286-a51b5e282b8a",
        source: "API",
        hse: "2",
        flightDate: "2026-04-27",
        origin: "SIN",
        destination: "FRA",
        status: "Accepted",
        print: "Y",
        shipper: "Global Freight",
        consignee: "Euro Cargo",
        user: "system",
        lastUpdate: "2026-04-25 11:30",
        routeMap: [
          { code: "FWB", status: "complete", pDate: "25Apr 05:45", mDate: "-", aDate: "-" },
          { code: "LAT", status: "complete", pDate: "25Apr 05:50", mDate: "-", aDate: "-" },
          { code: "SAC", status: "missing", pDate: "25Apr 05:50", mDate: "-", aDate: "-" },
          { code: "RCS", status: "new", pDate: "25Apr 05:50", mDate: "-", aDate: "-" },
          { code: "FOW", status: "new", pDate: "25Apr 07:20", mDate: "-", aDate: "-" },
          { code: "DEP", status: "new", pDate: "25Apr 09:20", mDate: "-", aDate: "-" },
          { isFlight: true, from: "SIN", to: "FRA", flightNo: "SQ326", sDate: "26Apr 14:00", aDate: "-" },
          { code: "ARR", status: "new", pDate: "26Apr 21:00", mDate: "-", aDate: "-" },
          { code: "RCF", status: "new", pDate: "26Apr 22:05", mDate: "-", aDate: "-" },
          { code: "NFD", status: "new", pDate: "26Apr 22:35", mDate: "-", aDate: "-" },
          { code: "AWD", status: "new", pDate: "26Apr 22:35", mDate: "-", aDate: "-" },
          { code: "DLV", status: "new", pDate: "27Apr 10:05", mDate: "-", aDate: "-" }
        ],
        events: [
          { code: "FWB", desc: "Creation of MAWB", time: "25 Apr 05:45" },
          { code: "LAT", desc: "Latest Acceptance Time", time: "25 Apr 05:50" },
          { code: "SAC", desc: "Security Autocheck Failed", time: "25 Apr 05:50" }
        ]
      },
      {
        awb: "160-55554444",
        oneRecordLo: "3c8e4f1a-b615-492c-ad2f-e8b91a78370f",
        source: "Manual",
        hse: "1",
        flightDate: "2026-04-28",
        origin: "NRT",
        destination: "JFK",
        status: "Delivered",
        print: "Y",
        shipper: "Tokyo Exp",
        consignee: "NY Dist",
        user: "jl",
        lastUpdate: "2026-04-28 10:15",
        routeMap: [
          { code: "FWB", status: "complete", pDate: "27Apr 05:45", mDate: "-", aDate: "-" },
          { code: "LAT", status: "complete", pDate: "27Apr 05:50", mDate: "27Apr 05:48", aDate: "27Apr 05:48" },
          { code: "SAC", status: "complete", pDate: "27Apr 05:50", mDate: "27Apr 05:48", aDate: "27Apr 05:48" },
          { code: "RCS", status: "complete", pDate: "27Apr 05:50", mDate: "27Apr 05:50", aDate: "27Apr 05:50" },
          { code: "FOW", status: "complete", pDate: "27Apr 07:20", mDate: "-", aDate: "-" },
          { code: "DEP", status: "complete", pDate: "27Apr 09:20", mDate: "-", aDate: "-" },
          { isFlight: true, from: "NRT", to: "JFK", flightNo: "JL006", sDate: "27Apr 11:20", aDate: "28Apr 10:10" },
          { code: "ARR", status: "complete", pDate: "28Apr 10:50", mDate: "-", aDate: "-" },
          { code: "RCF", status: "complete", pDate: "28Apr 13:05", mDate: "-", aDate: "-" },
          { code: "NFD", status: "complete", pDate: "28Apr 13:05", mDate: "-", aDate: "-", bDate: "28Apr 13:05" },
          { code: "AWD", status: "complete", pDate: "28Apr 12:35", mDate: "-", aDate: "-" },
          { code: "DLV", status: "complete", pDate: "28Apr 15:05", mDate: "-", aDate: "-" }
        ],
        events: [
          { code: "FWB", desc: "Creation of MAWB", time: "27 Apr 05:45" },
          { code: "LAT", desc: "Latest Acceptance Time", time: "27 Apr 05:50" },
          { code: "SAC", desc: "Security Autocheck Passed", time: "27 Apr 05:50" },
          { code: "RCS", desc: "Consignment received", time: "27 Apr 05:50" },
          { code: "FOW", desc: "Freight Out of Warehouse", time: "27 Apr 07:20" },
          { code: "DEP", desc: "Departed", time: "27 Apr 09:20" },
          { code: "ARR", desc: "Arrived", time: "28 Apr 10:50" },
          { code: "RCF", desc: "Received at Flight", time: "28 Apr 13:05" },
          { code: "NFD", desc: "Notified", time: "28 Apr 13:05" },
          { code: "AWD", desc: "Available for Delivery", time: "28 Apr 12:35" },
          { code: "DLV", desc: "Delivered", time: "28 Apr 15:05" }
        ]
      }
    ];
    const displayedRecords = ref([...allRecords]);
    const triggerSearch = () => {
      displayedRecords.value = allRecords.filter((record) => {
        const termAwb = searchAwb.value ? searchAwb.value.trim().toLowerCase() : "";
        const term1R = searchOneRecordLO.value ? searchOneRecordLO.value.trim().toLowerCase() : "";
        const matchAwb = !termAwb || record.awb.toLowerCase().includes(termAwb);
        const match1R = !term1R || record.oneRecordLo.toLowerCase().includes(term1R);
        return matchAwb && match1R;
      });
    };
    const clearSearch = () => {
      searchAwb.value = "";
      searchOneRecordLO.value = "";
      searchDateRange.value = null;
      searchLastUpdateDate.value = null;
      triggerSearch();
    };
    const getRecordStatus = (routeMap) => {
      if (!routeMap || !routeMap.length) return "Pending";
      const discrepancy = routeMap.find((r) => r.status === "discrepancy" || r.status === "missing");
      if (discrepancy) return `Exception (${discrepancy.code})`;
      const completed = routeMap.slice().reverse().find((r) => r.status === "complete" && !r.isFlight);
      if (completed) {
        if (completed.code === "DLV") return "Delivered";
        return `In Progress (${completed.code})`;
      }
      return "Pending";
    };
    const getStatusBadgeClass = (routeMap) => {
      if (!routeMap || !routeMap.length) return "badge-pending";
      const discrepancy = routeMap.find((r) => r.status === "discrepancy" || r.status === "missing");
      if (discrepancy) return "badge-exception";
      const completed = routeMap.slice().reverse().find((r) => r.status === "complete" && !r.isFlight);
      if (completed) {
        if (completed.code === "DLV") return "badge-delivered";
        return "badge-progress";
      }
      return "badge-pending";
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createVNode(AppHeader),
        createVNode(RecordOffcanvas, {
          isOpen: isOffCanvasOpen.value,
          "onUpdate:isOpen": _cache[0] || (_cache[0] = ($event) => isOffCanvasOpen.value = $event),
          recordData: selectedRecordData.value
        }, null, 8, ["isOpen", "recordData"]),
        createVNode(AppNavBar),
        createBaseVNode("main", _hoisted_2$3, [
          _cache[15] || (_cache[15] = createBaseVNode("h2", { class: "page-title" }, "Shipment Performance (Cargo iQ)", -1)),
          createBaseVNode("div", _hoisted_3$3, [
            createBaseVNode("span", {
              class: normalizeClass(["tab", { active: activeTab.value === "Air Waybill" }]),
              onClick: _cache[1] || (_cache[1] = ($event) => activeTab.value = "Air Waybill")
            }, " Air Waybill ", 2),
            createBaseVNode("span", {
              class: normalizeClass(["tab", { active: activeTab.value === "Template" }]),
              onClick: _cache[2] || (_cache[2] = ($event) => activeTab.value = "Template")
            }, " Template ", 2)
          ]),
          createBaseVNode("section", _hoisted_4$3, [
            _cache[11] || (_cache[11] = createBaseVNode("div", { class: "card-header" }, [
              createBaseVNode("h3", null, "Search"),
              createBaseVNode("button", { class: "btn btn-outline" }, "+ Create FWB")
            ], -1)),
            createBaseVNode("div", _hoisted_5$3, [
              createBaseVNode("div", _hoisted_6$3, [
                _cache[7] || (_cache[7] = createBaseVNode("label", null, "Air Waybill Number", -1)),
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => searchAwb.value = $event),
                  placeholder: "Enter AWB..."
                }, null, 512), [
                  [vModelText, searchAwb.value]
                ])
              ]),
              createBaseVNode("div", _hoisted_7$3, [
                _cache[8] || (_cache[8] = createBaseVNode("label", null, "1R (ONE Record) LO", -1)),
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => searchOneRecordLO.value = $event),
                  placeholder: "Enter LO URI or ID..."
                }, null, 512), [
                  [vModelText, searchOneRecordLO.value]
                ])
              ]),
              createBaseVNode("div", _hoisted_8$3, [
                _cache[9] || (_cache[9] = createBaseVNode("label", null, "Date Range", -1)),
                createVNode(unref(Zl), {
                  modelValue: searchDateRange.value,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => searchDateRange.value = $event),
                  range: "",
                  "multi-calendars": "",
                  placeholder: "Select Date Range"
                }, null, 8, ["modelValue"])
              ]),
              createBaseVNode("div", _hoisted_9$3, [
                _cache[10] || (_cache[10] = createBaseVNode("label", null, "Last Update Date", -1)),
                createVNode(unref(Zl), {
                  modelValue: searchLastUpdateDate.value,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => searchLastUpdateDate.value = $event),
                  placeholder: "Select Last Update Date"
                }, null, 8, ["modelValue"])
              ])
            ]),
            createBaseVNode("div", {
              class: "search-actions",
              style: { "gap": "12px", "display": "flex", "justify-content": "flex-end" }
            }, [
              createBaseVNode("button", {
                class: "btn btn-outline",
                onClick: clearSearch
              }, "Clear"),
              createBaseVNode("button", {
                class: "btn btn-green",
                onClick: triggerSearch
              }, "Search")
            ])
          ]),
          createBaseVNode("section", _hoisted_10$3, [
            _cache[14] || (_cache[14] = createBaseVNode("h4", { class: "card-subtitle" }, "Recent FWB Record", -1)),
            createBaseVNode("div", _hoisted_11$3, [
              createBaseVNode("table", null, [
                _cache[13] || (_cache[13] = createBaseVNode("thead", null, [
                  createBaseVNode("tr", null, [
                    createBaseVNode("th", null, "AWB"),
                    createBaseVNode("th", null, "1R LO"),
                    createBaseVNode("th", null, "Source"),
                    createBaseVNode("th", null, "Hse"),
                    createBaseVNode("th", null, "Flight Date"),
                    createBaseVNode("th", null, "Origin"),
                    createBaseVNode("th", null, "Destination"),
                    createBaseVNode("th", null, "Status"),
                    createBaseVNode("th", null, "Print"),
                    createBaseVNode("th", null, "Shipper"),
                    createBaseVNode("th", null, "Consignee"),
                    createBaseVNode("th", null, "User"),
                    createBaseVNode("th", null, "Last Update"),
                    createBaseVNode("th", null, "Action")
                  ])
                ], -1)),
                createBaseVNode("tbody", null, [
                  displayedRecords.value.length === 0 ? (openBlock(), createElementBlock("tr", _hoisted_12$3, [..._cache[12] || (_cache[12] = [
                    createBaseVNode("td", {
                      colspan: "14",
                      style: { "text-align": "center", "padding": "20px", "color": "#888" }
                    }, "No recent records found matching search criteria.", -1)
                  ])])) : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(displayedRecords.value, (record, index) => {
                    return openBlock(), createElementBlock("tr", { key: index }, [
                      createBaseVNode("td", {
                        onClick: ($event) => openOffCanvas(record),
                        style: { "cursor": "pointer" }
                      }, [
                        createBaseVNode("span", {
                          class: normalizeClass(["status-badge", getStatusBadgeClass(record.routeMap)])
                        }, toDisplayString(record.awb), 3)
                      ], 8, _hoisted_13$3),
                      createBaseVNode("td", {
                        onClick: ($event) => openOffCanvas(record),
                        style: { "cursor": "pointer" }
                      }, [
                        createBaseVNode("span", {
                          class: normalizeClass(["status-badge", getStatusBadgeClass(record.routeMap)])
                        }, toDisplayString(record.oneRecordLo), 3)
                      ], 8, _hoisted_14$3),
                      createBaseVNode("td", null, toDisplayString(record.source), 1),
                      createBaseVNode("td", null, toDisplayString(record.hse), 1),
                      createBaseVNode("td", null, toDisplayString(record.flightDate), 1),
                      createBaseVNode("td", null, toDisplayString(record.origin), 1),
                      createBaseVNode("td", null, toDisplayString(record.destination), 1),
                      createBaseVNode("td", null, toDisplayString(getRecordStatus(record.routeMap)), 1),
                      createBaseVNode("td", null, toDisplayString(record.print), 1),
                      createBaseVNode("td", null, toDisplayString(record.shipper), 1),
                      createBaseVNode("td", null, toDisplayString(record.consignee), 1),
                      createBaseVNode("td", null, toDisplayString(record.user), 1),
                      createBaseVNode("td", null, toDisplayString(record.lastUpdate), 1),
                      createBaseVNode("td", null, [
                        createBaseVNode("a", {
                          href: "#",
                          class: "action-link",
                          onClick: withModifiers(($event) => openOffCanvas(record), ["prevent"])
                        }, "View", 8, _hoisted_15$3)
                      ])
                    ]);
                  }), 128))
                ])
              ])
            ])
          ])
        ]),
        createVNode(AppFooter)
      ]);
    };
  }
});

const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-3e043971"]]);

const _imports_0 = "/assets/1R%20Logo-CuALisTU.png";

const _hoisted_1$2 = { class: "dashboard-page" };
const _hoisted_2$2 = { class: "main-content" };
const _hoisted_3$2 = { class: "layout-container" };
const _hoisted_4$2 = { class: "left-panel" };
const _hoisted_5$2 = { class: "info-row" };
const _hoisted_6$2 = { class: "info-val" };
const _hoisted_7$2 = { class: "info-row" };
const _hoisted_8$2 = { class: "info-val loid-val" };
const _hoisted_9$2 = { class: "right-panel" };
const _hoisted_10$2 = { class: "tabs-container" };
const _hoisted_11$2 = { class: "table-container" };
const _hoisted_12$2 = { class: "detail-table" };
const _hoisted_13$2 = { style: { "font-weight": "500", "color": "#444" } };
const _hoisted_14$2 = { class: "text-gray" };
const _hoisted_15$2 = {
  key: 1,
  class: "upload-section"
};
const _hoisted_16$1 = { class: "upload-form" };
const _hoisted_17$1 = { class: "file-input-group" };
const _hoisted_18$1 = {
  style: { "width": "12px", "height": "12px", "margin-right": "4px" },
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_19$1 = ["value"];
const _hoisted_20$1 = {
  key: 0,
  class: "upload-list-container"
};
const _hoisted_21$1 = { class: "upload-list" };
const _hoisted_22$1 = {
  key: 2,
  class: "proceed-action"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DashboardDetail",
  setup(__props) {
    const route = useRoute();
    const awb = ref(route.query.awb || "160-12345678");
    const loid = ref(route.query.loid || "fecbe019-f3d6-4436-ad35-66ce87a7d985");
    const activeTab = ref("DG Checking");
    const showUploadSection = ref(false);
    const showProceedBtn = ref(false);
    const fullDocumentList = ref([]);
    const selectedFileName = ref("");
    const docs = [
      { desc: "Shipper's Declaration for Dangerous Goods (DGD)", time: "2026-04-20 08:23:52" },
      { desc: "UN Test Summary", time: "2026-04-20 08:24:51" },
      { desc: "Packing List", time: "2026-04-22 10:45:12" },
      { desc: "Commercial Invoice", time: "2026-04-23 12:30:45" },
      { desc: "Certificate of Origin", time: "2026-04-24 14:05:18" },
      { desc: "Safety Data Sheet (SDS)", time: "2026-04-25 16:20:33" }
    ];
    const fileInputRef = ref(null);
    const triggerFileInput = () => {
      fileInputRef.value?.click();
    };
    const handleFileChange = (event) => {
      const target = event.target;
      if (target.files && target.files.length > 0) {
        selectedFileName.value = target.files[0].name;
      }
    };
    const handleUpload = () => {
      if (selectedFileName.value) {
        fullDocumentList.value.push(selectedFileName.value);
        selectedFileName.value = "";
        showProceedBtn.value = true;
        if (fileInputRef.value) {
          fileInputRef.value.value = "";
        }
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(AppHeader),
        createVNode(AppNavBar),
        createBaseVNode("main", _hoisted_2$2, [
          _cache[18] || (_cache[18] = createStaticVNode('<div class="page-header" data-v-771961ec><h2 class="page-title" data-v-771961ec>Air Waybill Detail</h2></div><div class="one-record-badge" data-v-771961ec><img src="' + _imports_0 + '" alt="IATA ONE Record" class="badge-icon" data-v-771961ec><span class="badge-text" style="color:#1d4ed8;padding:4px 12px;background:#eef2ff;border-radius:12px;font-weight:600;font-size:13px;" data-v-771961ec>Backed by ONE Record</span></div>', 2)),
          createBaseVNode("div", _hoisted_3$2, [
            createBaseVNode("div", _hoisted_4$2, [
              createBaseVNode("div", _hoisted_5$2, [
                _cache[5] || (_cache[5] = createBaseVNode("span", { class: "info-label" }, "AWB Number", -1)),
                createBaseVNode("span", _hoisted_6$2, toDisplayString(awb.value), 1)
              ]),
              createBaseVNode("div", _hoisted_7$2, [
                _cache[6] || (_cache[6] = createBaseVNode("span", { class: "info-label" }, "One Record LO ID", -1)),
                createBaseVNode("span", _hoisted_8$2, toDisplayString(loid.value), 1)
              ]),
              _cache[7] || (_cache[7] = createStaticVNode('<div class="divider" data-v-771961ec></div><h3 class="section-title" data-v-771961ec>Shipment Status</h3><div class="info-row status-row" data-v-771961ec><span class="info-label" data-v-771961ec>Status</span><span class="info-val text-gray" data-v-771961ec>In Progress</span></div><div class="action-buttons" data-v-771961ec><button class="btn btn-action" data-v-771961ec>Accept</button><button class="btn btn-action" data-v-771961ec>Reject</button></div><div class="divider" data-v-771961ec></div><h3 class="section-title" data-v-771961ec>Special Handing Code Declaration</h3><div class="info-row" data-v-771961ec><span class="info-label" data-v-771961ec>Pouch Declare Code</span><span class="info-val text-gray" data-v-771961ec>EAW</span></div><div class="info-row" data-v-771961ec><span class="info-label" data-v-771961ec>FWB Declare Code</span><span class="info-val text-gray" data-v-771961ec>EAW / SPX</span></div><div class="info-row" data-v-771961ec><span class="info-label" data-v-771961ec>Booking Declare Code</span><span class="info-val text-gray" data-v-771961ec>EAW / SPX</span></div><div class="divider" data-v-771961ec></div><h3 class="section-title" data-v-771961ec>FOH</h3><div class="info-row" data-v-771961ec><span class="info-label" data-v-771961ec>Piece</span><span class="info-val text-gray" data-v-771961ec>34</span></div><div class="info-row" data-v-771961ec><span class="info-label" data-v-771961ec>Weight</span><span class="info-val text-gray" data-v-771961ec>1013.00</span></div><div class="divider" data-v-771961ec></div><h3 class="section-title" data-v-771961ec>RCS</h3><div class="info-row" data-v-771961ec><span class="info-label" data-v-771961ec>Piece</span><span class="info-val text-gray" data-v-771961ec></span></div><div class="info-row" data-v-771961ec><span class="info-label" data-v-771961ec>Weight</span><span class="info-val text-gray" data-v-771961ec></span></div>', 17))
            ]),
            createBaseVNode("div", _hoisted_9$2, [
              createBaseVNode("div", _hoisted_10$2, [
                createBaseVNode("button", {
                  class: normalizeClass(["tab-btn", { active: activeTab.value === "DG Checking" }]),
                  onClick: _cache[0] || (_cache[0] = ($event) => activeTab.value = "DG Checking")
                }, "DG Checking", 2),
                createBaseVNode("button", {
                  class: normalizeClass(["tab-btn", { active: activeTab.value === "EyeBall Checking" }]),
                  onClick: _cache[1] || (_cache[1] = ($event) => activeTab.value = "EyeBall Checking")
                }, "EyeBall Checking", 2),
                createBaseVNode("button", {
                  class: normalizeClass(["tab-btn", { active: activeTab.value === "Sanction Checking" }]),
                  onClick: _cache[2] || (_cache[2] = ($event) => activeTab.value = "Sanction Checking")
                }, "Sanction Checking", 2),
                createBaseVNode("button", {
                  class: normalizeClass(["tab-btn", { active: activeTab.value === "Import & Export Commodity Checking" }]),
                  onClick: _cache[3] || (_cache[3] = ($event) => activeTab.value = "Import & Export Commodity Checking")
                }, "Import & Export Commodity Checking", 2)
              ]),
              createBaseVNode("div", _hoisted_11$2, [
                createBaseVNode("table", _hoisted_12$2, [
                  _cache[9] || (_cache[9] = createBaseVNode("thead", null, [
                    createBaseVNode("tr", null, [
                      createBaseVNode("th", { style: { "width": "40%" } }, "Description"),
                      createBaseVNode("th", null, "Uploaded Date Time"),
                      createBaseVNode("th", { style: { "text-align": "right" } }, "Action")
                    ])
                  ], -1)),
                  createBaseVNode("tbody", null, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(docs, (doc, idx) => {
                      return createBaseVNode("tr", {
                        key: idx,
                        class: normalizeClass({ "alt-row": idx % 2 === 0 })
                      }, [
                        createBaseVNode("td", _hoisted_13$2, toDisplayString(doc.desc), 1),
                        createBaseVNode("td", _hoisted_14$2, toDisplayString(doc.time), 1),
                        _cache[8] || (_cache[8] = createBaseVNode("td", { style: { "text-align": "right" } }, [
                          createBaseVNode("a", {
                            href: "#",
                            class: "view-link"
                          }, "View")
                        ], -1))
                      ], 2);
                    }), 64))
                  ])
                ])
              ]),
              !showUploadSection.value ? (openBlock(), createElementBlock("button", {
                key: 0,
                class: "btn btn-upload",
                onClick: _cache[4] || (_cache[4] = ($event) => showUploadSection.value = true)
              }, "+ Upload more document button")) : createCommentVNode("", true),
              showUploadSection.value ? (openBlock(), createElementBlock("div", _hoisted_15$2, [
                _cache[15] || (_cache[15] = createBaseVNode("div", { class: "upload-title" }, "Upload File", -1)),
                _cache[16] || (_cache[16] = createBaseVNode("div", { class: "upload-subtitle" }, [
                  createTextVNode("Support 1 file only, in "),
                  createBaseVNode("strong", null, ".pdf, .jpg, .png"),
                  createTextVNode(" formats, up to "),
                  createBaseVNode("strong", null, "20 MB"),
                  createTextVNode(".")
                ], -1)),
                createBaseVNode("div", _hoisted_16$1, [
                  _cache[12] || (_cache[12] = createBaseVNode("span", { class: "file-label" }, "File Name", -1)),
                  createBaseVNode("div", _hoisted_17$1, [
                    createBaseVNode("input", {
                      type: "file",
                      ref_key: "fileInputRef",
                      ref: fileInputRef,
                      style: { "display": "none" },
                      onChange: handleFileChange,
                      accept: ".pdf,.jpg,.png"
                    }, null, 544),
                    createBaseVNode("button", {
                      class: "btn btn-browse",
                      onClick: triggerFileInput
                    }, [
                      (openBlock(), createElementBlock("svg", _hoisted_18$1, [..._cache[10] || (_cache[10] = [
                        createBaseVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        }, null, -1)
                      ])])),
                      _cache[11] || (_cache[11] = createTextVNode(" Browse File ", -1))
                    ]),
                    createBaseVNode("input", {
                      type: "text",
                      class: "file-text-input",
                      placeholder: "",
                      value: selectedFileName.value,
                      readonly: ""
                    }, null, 8, _hoisted_19$1),
                    createBaseVNode("button", {
                      class: "btn btn-do-upload",
                      onClick: handleUpload
                    }, "Upload")
                  ])
                ]),
                fullDocumentList.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_20$1, [
                  _cache[13] || (_cache[13] = createBaseVNode("div", { class: "divider" }, null, -1)),
                  _cache[14] || (_cache[14] = createBaseVNode("div", { class: "upload-list-title" }, "Full Document List", -1)),
                  createBaseVNode("ol", _hoisted_21$1, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(fullDocumentList.value, (fileName, index) => {
                      return openBlock(), createElementBlock("li", { key: index }, toDisplayString(fileName), 1);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              showProceedBtn.value ? (openBlock(), createElementBlock("div", _hoisted_22$1, [..._cache[17] || (_cache[17] = [
                createBaseVNode("button", { class: "btn btn-proceed" }, "Proceed DG Auto Check", -1)
              ])])) : createCommentVNode("", true)
            ])
          ])
        ]),
        createVNode(AppFooter)
      ]);
    };
  }
});

const DashboardDetail = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-771961ec"]]);

const _hoisted_1$1 = { class: "dashboard-page" };
const _hoisted_2$1 = { class: "main-content" };
const _hoisted_3$1 = { class: "search-section" };
const _hoisted_4$1 = { class: "search-grid" };
const _hoisted_5$1 = {
  class: "form-group",
  style: { "grid-column": "1 / 3" }
};
const _hoisted_6$1 = {
  class: "form-group",
  style: { "grid-column": "3 / 6" }
};
const _hoisted_7$1 = {
  class: "form-group",
  style: { "z-index": "10" }
};
const _hoisted_8$1 = { class: "results-section" };
const _hoisted_9$1 = { class: "table-container" };
const _hoisted_10$1 = { class: "modern-table" };
const _hoisted_11$1 = { key: 0 };
const _hoisted_12$1 = ["onClick"];
const _hoisted_13$1 = { style: { "color": "#333", "font-weight": "500" } };
const _hoisted_14$1 = { style: { "color": "#666", "font-size": "12px", "font-family": "monospace", "max-width": "150px", "word-wrap": "break-word" } };
const _hoisted_15$1 = { style: { "background": "#f4f6f8", "padding": "4px 8px", "border-radius": "4px", "border": "1px solid #e1e4e8" } };
const _hoisted_16 = { style: { "color": "#666" } };
const _hoisted_17 = { style: { "color": "#666" } };
const _hoisted_18 = { style: { "color": "#666" } };
const _hoisted_19 = { style: { "color": "#666" } };
const _hoisted_20 = { style: { "color": "#666" } };
const _hoisted_21 = { style: { "text-align": "center" } };
const _hoisted_22 = {
  key: 0,
  class: "badge badge-error"
};
const _hoisted_23 = {
  key: 1,
  class: "badge badge-error-part"
};
const _hoisted_24 = {
  key: 2,
  class: "badge badge-view-part"
};
const _hoisted_25 = {
  key: 3,
  class: "badge badge-none"
};
const _hoisted_26 = { style: { "text-align": "center" } };
const _hoisted_27 = {
  key: 0,
  class: "badge badge-view"
};
const _hoisted_28 = {
  key: 1,
  class: "badge badge-error-part"
};
const _hoisted_29 = {
  key: 2,
  class: "badge badge-none"
};
const _hoisted_30 = { style: { "text-align": "center" } };
const _hoisted_31 = {
  key: 0,
  class: "badge badge-none"
};
const _hoisted_32 = { style: { "text-align": "center" } };
const _hoisted_33 = {
  key: 0,
  class: "badge badge-folder"
};
const _hoisted_34 = { style: { "color": "#666" } };
const _hoisted_35 = { style: { "color": "#666" } };
const _hoisted_36 = { style: { "color": "#666" } };
const _hoisted_37 = { style: { "color": "#666" } };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ShipmentList",
  setup(__props) {
    const searchAwb = ref("");
    const searchOneRecordLO = ref("");
    const searchDateRange = ref(null);
    const isOffCanvasOpen = ref(false);
    const selectedRecordData = ref(null);
    const router = useRouter();
    const openDetail = (record) => {
      router.push({ path: "/dashboard/detail", query: { awb: record.awb, loid: record.oneRecordLo } });
    };
    const allRecords = [
      { chk: false, awb: "160-52711536", oneRecordLo: "fecbe019-f3d6-4436-ad35-66ce87a7d985", hasIconPencil: true, hasIconBox: true, pouch: "EAW", sshc: "SHC", flight: "CX366", fltDate: "2026-04-26", std: "2026-04-26 19:21", mStatus: "error", hmStatus: "view", fStatus: "none", apStatus: "folder", org: "HKG", dest: "PVG", pcs: "2", wgt: "15.5 K", desc: "Battery", lastEventTime: "2026-04-24 10:23" },
      { chk: false, awb: "160-52711540", oneRecordLo: "2cd2f6a9-8c29-4d6d-9286-a51b5e282b8a", hasIconPencil: true, hasIconBox: true, pouch: "EAP", sshc: "", flight: "CX366", fltDate: "2026-04-26", std: "2026-04-26 19:21", mStatus: "error", hmStatus: "view", fStatus: "none", apStatus: "folder", org: "HKG", dest: "PVG", pcs: "42", wgt: "507.0 K", desc: "CONSOL", lastEventTime: "2026-04-24 14:43" },
      { chk: false, awb: "160-10448690", oneRecordLo: "7a2f1b40-b615-492c-ad2f-e8b91a78370f", hasIconPencil: true, hasIconBox: true, pouch: "", sshc: "VAL", flight: "CX472", fltDate: "2026-04-29", std: "2026-04-29 15:45", mStatus: "error", hmStatus: "none", fStatus: "none", apStatus: "folder", org: "HKG", dest: "TPE", pcs: "1", wgt: "10.2 K", desc: "CONSOL", lastEventTime: "2026-04-28 12:01" },
      { chk: false, awb: "160-10193341", oneRecordLo: "3c8e4f1a-b615-492c-ad2f-e8b91a78370f", hasIconPencil: true, hasIconBox: true, pouch: "EAW", sshc: "", flight: "CX366", fltDate: "2026-09-01", std: "", mStatus: "error-part", hmStatus: "error-part", fStatus: "none", apStatus: "folder", org: "HKG", dest: "PVG", pcs: "1", wgt: "1.0 K", desc: "CONSOL", lastEventTime: "2026-08-29 16:27" },
      { chk: false, awb: "160-33333322", oneRecordLo: "c5d18196-b615-492c-ad2f-e8b91a78370f", hasIconPencil: true, hasIconBox: true, pouch: "EAW", sshc: "", flight: "CX1234", fltDate: "2026-11-21", std: "", mStatus: "view-part", hmStatus: "view-part", fStatus: "none", apStatus: "folder", org: "HKG", dest: "BKK", pcs: "1", wgt: "123.0 K", desc: "GOODS", lastEventTime: "2026-09-03 16:13" },
      { chk: false, awb: "160-52001176", oneRecordLo: "8b4566c3-b615-492c-ad2f-e8b91a78370f", hasIconPencil: false, hasIconBox: true, pouch: "EAP", sshc: "", flight: "CX100", fltDate: "2026-09-08", std: "", mStatus: "error-part", hmStatus: "none", fStatus: "none", apStatus: "folder", org: "HKG", dest: "TPE", pcs: "1", wgt: "11.5 K", desc: "TEST", lastEventTime: "2026-09-08 09:39" },
      { chk: false, awb: "160-10314942", oneRecordLo: "d22dcc1a-b615-492c-ad2f-e8b91a78370f", hasIconPencil: true, hasIconBox: true, pouch: "EAW", sshc: "", flight: "CX705", fltDate: "2026-04-29", std: "", mStatus: "error-file", hmStatus: "error-part", fStatus: "none", apStatus: "folder", org: "HKG", dest: "BKK", pcs: "1", wgt: "100.0 K", desc: "BATTERY", lastEventTime: "2026-04-28 10:51" }
    ];
    const displayedRecords = ref([...allRecords]);
    const triggerSearch = () => {
      displayedRecords.value = allRecords.filter((record) => {
        const termAwb = searchAwb.value ? searchAwb.value.trim().toLowerCase() : "";
        const term1R = searchOneRecordLO.value ? searchOneRecordLO.value.trim().toLowerCase() : "";
        const matchAwb = !termAwb || record.awb.toLowerCase().includes(termAwb);
        const match1R = !term1R || record.oneRecordLo.toLowerCase().includes(term1R);
        return matchAwb && match1R;
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(AppHeader),
        createVNode(RecordOffcanvas, {
          isOpen: isOffCanvasOpen.value,
          "onUpdate:isOpen": _cache[0] || (_cache[0] = ($event) => isOffCanvasOpen.value = $event),
          recordData: selectedRecordData.value
        }, null, 8, ["isOpen", "recordData"]),
        createVNode(AppNavBar),
        createBaseVNode("main", _hoisted_2$1, [
          _cache[13] || (_cache[13] = createBaseVNode("h2", { class: "page-title" }, "Shipment List", -1)),
          createBaseVNode("section", _hoisted_3$1, [
            createBaseVNode("div", _hoisted_4$1, [
              createBaseVNode("div", _hoisted_5$1, [
                _cache[4] || (_cache[4] = createBaseVNode("label", null, "Air Waybill Number", -1)),
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => searchAwb.value = $event),
                  placeholder: ""
                }, null, 512), [
                  [vModelText, searchAwb.value]
                ])
              ]),
              createBaseVNode("div", _hoisted_6$1, [
                _cache[5] || (_cache[5] = createBaseVNode("label", null, "One Record LOID", -1)),
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => searchOneRecordLO.value = $event),
                  placeholder: ""
                }, null, 512), [
                  [vModelText, searchOneRecordLO.value]
                ])
              ]),
              _cache[9] || (_cache[9] = createBaseVNode("div", { class: "form-group" }, [
                createBaseVNode("label", null, "Flight Number"),
                createBaseVNode("input", {
                  type: "text",
                  placeholder: ""
                })
              ], -1)),
              createBaseVNode("div", _hoisted_7$1, [
                _cache[6] || (_cache[6] = createBaseVNode("label", null, "Flight Date", -1)),
                createVNode(unref(Zl), {
                  modelValue: searchDateRange.value,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => searchDateRange.value = $event),
                  placeholder: "Select Date",
                  "enable-time-picker": false
                }, null, 8, ["modelValue"])
              ]),
              createBaseVNode("div", {
                class: "form-group",
                style: { "grid-column": "3 / 6" }
              }, [
                _cache[8] || (_cache[8] = createBaseVNode("label", null, "Forwarder", -1)),
                createBaseVNode("div", { style: { "display": "flex", "gap": "10px" } }, [
                  _cache[7] || (_cache[7] = createBaseVNode("input", {
                    type: "text",
                    placeholder: "",
                    style: { "flex": "1" }
                  }, null, -1)),
                  createBaseVNode("button", {
                    class: "btn btn-search",
                    onClick: triggerSearch,
                    style: { "width": "120px" }
                  }, "Search")
                ])
              ])
            ])
          ]),
          createBaseVNode("section", _hoisted_8$1, [
            createBaseVNode("div", _hoisted_9$1, [
              createBaseVNode("table", _hoisted_10$1, [
                _cache[11] || (_cache[11] = createBaseVNode("thead", null, [
                  createBaseVNode("tr", null, [
                    createBaseVNode("th", null, "Air WayBill No."),
                    createBaseVNode("th", null, "LOID"),
                    createBaseVNode("th", null, "Pouch"),
                    createBaseVNode("th", null, "SHC"),
                    createBaseVNode("th", null, "Flight"),
                    createBaseVNode("th", null, "Flight Date"),
                    createBaseVNode("th", null, "STD"),
                    createBaseVNode("th", {
                      style: { "width": "30px", "text-align": "center" },
                      title: "M"
                    }, "M"),
                    createBaseVNode("th", {
                      style: { "width": "30px", "text-align": "center" },
                      title: "HM"
                    }, "HM"),
                    createBaseVNode("th", {
                      style: { "width": "30px", "text-align": "center" },
                      title: "F"
                    }, "F"),
                    createBaseVNode("th", {
                      style: { "width": "30px", "text-align": "center" },
                      title: "AP"
                    }, "AP"),
                    createBaseVNode("th", null, "Pcs"),
                    createBaseVNode("th", null, "Wgt"),
                    createBaseVNode("th", null, "Description"),
                    createBaseVNode("th", null, "Last Event Time")
                  ])
                ], -1)),
                createBaseVNode("tbody", null, [
                  displayedRecords.value.length === 0 ? (openBlock(), createElementBlock("tr", _hoisted_11$1, [..._cache[10] || (_cache[10] = [
                    createBaseVNode("td", {
                      colspan: "15",
                      style: { "text-align": "center", "padding": "20px", "color": "#888" }
                    }, "No recent records found matching search criteria.", -1)
                  ])])) : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(displayedRecords.value, (record, index) => {
                    return openBlock(), createElementBlock("tr", {
                      key: index,
                      class: "table-row-hover",
                      onClick: ($event) => openDetail(record),
                      style: { "cursor": "pointer" }
                    }, [
                      createBaseVNode("td", _hoisted_13$1, toDisplayString(record.awb), 1),
                      createBaseVNode("td", _hoisted_14$1, [
                        createBaseVNode("div", _hoisted_15$1, toDisplayString(record.oneRecordLo), 1)
                      ]),
                      createBaseVNode("td", _hoisted_16, toDisplayString(record.pouch), 1),
                      createBaseVNode("td", _hoisted_17, toDisplayString(record.sshc), 1),
                      createBaseVNode("td", _hoisted_18, toDisplayString(record.flight), 1),
                      createBaseVNode("td", _hoisted_19, toDisplayString(record.fltDate), 1),
                      createBaseVNode("td", _hoisted_20, toDisplayString(record.std), 1),
                      createBaseVNode("td", _hoisted_21, [
                        record.mStatus === "error" ? (openBlock(), createElementBlock("span", _hoisted_22, "E")) : record.mStatus === "error-part" ? (openBlock(), createElementBlock("span", _hoisted_23, "EP")) : record.mStatus === "view-part" ? (openBlock(), createElementBlock("span", _hoisted_24, "VP")) : (openBlock(), createElementBlock("span", _hoisted_25, "-"))
                      ]),
                      createBaseVNode("td", _hoisted_26, [
                        record.hmStatus === "view" ? (openBlock(), createElementBlock("span", _hoisted_27, "V")) : record.hmStatus === "error-part" ? (openBlock(), createElementBlock("span", _hoisted_28, "EP")) : (openBlock(), createElementBlock("span", _hoisted_29, "-"))
                      ]),
                      createBaseVNode("td", _hoisted_30, [
                        record.fStatus === "none" ? (openBlock(), createElementBlock("span", _hoisted_31, "-")) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("td", _hoisted_32, [
                        record.apStatus === "folder" ? (openBlock(), createElementBlock("span", _hoisted_33, "F")) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("td", _hoisted_34, toDisplayString(record.pcs), 1),
                      createBaseVNode("td", _hoisted_35, toDisplayString(record.wgt), 1),
                      createBaseVNode("td", _hoisted_36, toDisplayString(record.desc), 1),
                      createBaseVNode("td", _hoisted_37, toDisplayString(record.lastEventTime), 1)
                    ], 8, _hoisted_12$1);
                  }), 128))
                ])
              ])
            ]),
            _cache[12] || (_cache[12] = createStaticVNode('<div class="pagination-container" data-v-eb520d31><span class="pagination-info" data-v-eb520d31>1-10 of 855 items</span><div class="pagination-controls" data-v-eb520d31><span style="color:#666;" data-v-eb520d31>Items per page</span><select class="items-per-page" data-v-eb520d31><option data-v-eb520d31>10</option></select><div class="page-numbers" data-v-eb520d31><span class="active" data-v-eb520d31>1</span><span data-v-eb520d31>2</span><span data-v-eb520d31>3</span><span data-v-eb520d31>4</span><span data-v-eb520d31>...</span><span data-v-eb520d31>9</span></div></div></div>', 1))
          ])
        ]),
        createVNode(AppFooter)
      ]);
    };
  }
});

const ShipmentList = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-eb520d31"]]);

const _hoisted_1 = { class: "dashboard-page" };
const _hoisted_2 = { class: "main-content" };
const _hoisted_3 = { class: "layout-container" };
const _hoisted_4 = { class: "left-panel" };
const _hoisted_5 = { class: "info-row" };
const _hoisted_6 = { class: "info-val" };
const _hoisted_7 = { class: "info-row" };
const _hoisted_8 = { class: "info-val loid-val" };
const _hoisted_9 = { class: "right-panel" };
const _hoisted_10 = { class: "alert-banner" };
const _hoisted_11 = {
  style: { "width": "18px", "height": "18px", "margin-right": "8px" },
  viewBox: "0 0 24 24",
  fill: "red",
  stroke: "white",
  "stroke-width": "2"
};
const _hoisted_12 = { class: "tabs-container" };
const _hoisted_13 = { class: "table-container" };
const _hoisted_14 = { class: "detail-table" };
const _hoisted_15 = { class: "text-gray" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TrackShipment",
  setup(__props) {
    const route = useRoute();
    const awb = ref(route.query.awb || "160-55554444");
    const loid = ref(route.query.loid || "3c8e4f1a-b615-492c-ad2f-e8b91a78370f");
    const activeTab = ref("Temperature Log");
    const logs = [
      { desc: "[NRT] ULD Temperature Alert", time: "2026-06-03 15:49:00", remark: "3°C Exceed control temperature range +2°C to +8°C" },
      { desc: "[NRT] Normal", time: "2026-06-03 14:00:00", remark: "In range" },
      { desc: "[NRT] Cargo Accepted", time: "2026-06-03 12:30:00", remark: "" }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(AppHeader),
        createVNode(AppNavBar),
        createBaseVNode("main", _hoisted_2, [
          _cache[8] || (_cache[8] = createStaticVNode('<div class="page-header" data-v-a066eda3><h2 class="page-title" data-v-a066eda3>Track Shipment</h2></div><div class="one-record-badge" data-v-a066eda3><img src="' + _imports_0 + '" alt="IATA ONE Record" class="badge-icon" data-v-a066eda3><span class="badge-text" style="color:#1d4ed8;padding:4px 12px;background:#eef2ff;border-radius:12px;font-weight:600;font-size:13px;" data-v-a066eda3>Backed by ONE Record</span></div>', 2)),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                _cache[2] || (_cache[2] = createBaseVNode("span", { class: "info-label" }, "AWB Number", -1)),
                createBaseVNode("span", _hoisted_6, toDisplayString(awb.value), 1)
              ]),
              createBaseVNode("div", _hoisted_7, [
                _cache[3] || (_cache[3] = createBaseVNode("span", { class: "info-label" }, "One Record LO ID", -1)),
                createBaseVNode("span", _hoisted_8, toDisplayString(loid.value), 1)
              ]),
              _cache[4] || (_cache[4] = createStaticVNode('<div class="divider" data-v-a066eda3></div><h3 class="section-title" data-v-a066eda3>Shipment Status</h3><div class="info-row status-row" data-v-a066eda3><span class="info-label" data-v-a066eda3>Alert Status</span><span class="info-val" style="color:#ef4444;" data-v-a066eda3>Critical Alert</span></div><div class="divider" data-v-a066eda3></div><h3 class="section-title" data-v-a066eda3>Temperature Control</h3><div class="info-row" data-v-a066eda3><span class="info-label" data-v-a066eda3>Requirement</span><span class="info-val text-gray" data-v-a066eda3>+2°C to +8°C</span></div><div class="info-row" data-v-a066eda3><span class="info-label" data-v-a066eda3>Current reading</span><span class="info-val" style="color:#ef4444;font-weight:bold;" data-v-a066eda3>+11°C</span></div><div class="divider" data-v-a066eda3></div><h3 class="section-title" data-v-a066eda3>Location</h3><div class="info-row" data-v-a066eda3><span class="info-label" data-v-a066eda3>Check Point</span><span class="info-val text-gray" data-v-a066eda3>NRT (Narita)</span></div><div class="info-row" data-v-a066eda3><span class="info-label" data-v-a066eda3>ULD</span><span class="info-val text-gray" data-v-a066eda3>AKE12345JL</span></div>', 11))
            ]),
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                (openBlock(), createElementBlock("svg", _hoisted_11, [..._cache[5] || (_cache[5] = [
                  createBaseVNode("circle", {
                    cx: "12",
                    cy: "12",
                    r: "10"
                  }, null, -1),
                  createBaseVNode("line", {
                    x1: "12",
                    y1: "8",
                    x2: "12",
                    y2: "12"
                  }, null, -1),
                  createBaseVNode("line", {
                    x1: "12",
                    y1: "16",
                    x2: "12.01",
                    y2: "16"
                  }, null, -1)
                ])])),
                _cache[6] || (_cache[6] = createBaseVNode("div", { style: { "flex": "1" } }, [
                  createBaseVNode("strong", { style: { "display": "block", "margin-bottom": "2px" } }, "Temperature Alert Detected"),
                  createBaseVNode("span", { style: { "font-size": "12px" } }, "Immediate action requested for ULD AKE12345JL at NRT. Reading exceeded bounds by +3°C.")
                ], -1))
              ]),
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("button", {
                  class: normalizeClass(["tab-btn", { active: activeTab.value === "Temperature Log" }]),
                  onClick: _cache[0] || (_cache[0] = ($event) => activeTab.value = "Temperature Log")
                }, "Temperature Log", 2),
                createBaseVNode("button", {
                  class: normalizeClass(["tab-btn", { active: activeTab.value === "Action History" }]),
                  onClick: _cache[1] || (_cache[1] = ($event) => activeTab.value = "Action History")
                }, "Action History", 2)
              ]),
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("table", _hoisted_14, [
                  _cache[7] || (_cache[7] = createBaseVNode("thead", null, [
                    createBaseVNode("tr", null, [
                      createBaseVNode("th", { style: { "width": "35%" } }, "Event"),
                      createBaseVNode("th", null, "Date Time"),
                      createBaseVNode("th", null, "Remark")
                    ])
                  ], -1)),
                  createBaseVNode("tbody", null, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(logs, (log, idx) => {
                      return createBaseVNode("tr", {
                        key: idx,
                        class: normalizeClass({ "alt-row": idx % 2 === 0 })
                      }, [
                        createBaseVNode("td", {
                          style: normalizeStyle(idx === 0 ? "color: #ef4444; font-weight: bold;" : "font-weight: 500; color: #444;")
                        }, toDisplayString(log.desc), 5),
                        createBaseVNode("td", _hoisted_15, toDisplayString(log.time), 1),
                        createBaseVNode("td", {
                          style: normalizeStyle(idx === 0 ? "color: #ef4444;" : "color: #666;")
                        }, toDisplayString(log.remark), 5)
                      ], 2);
                    }), 64))
                  ])
                ])
              ])
            ])
          ])
        ]),
        createVNode(AppFooter)
      ]);
    };
  }
});

const TrackShipment = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a066eda3"]]);

const baseUrl = "/";
const baseChildren = [
  {
    path: "shipment-list",
    name: "ShipmentList",
    component: ShipmentList
  },
  {
    path: "dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "carrier-code",
    name: "CarrierCodeMaintenance",
    component: ShipmentList
    // Reuse ShipmentList for this route
  },
  {
    path: "dashboard/detail",
    name: "DashboardDetail",
    component: DashboardDetail
  },
  {
    path: "track-shipment",
    name: "TrackShipment",
    component: TrackShipment
  }
];
baseChildren.unshift({
  path: "",
  redirect: "/shipment-list"
});
const routes = [
  {
    path: baseUrl,
    component: RouterView,
    children: baseChildren
  }
];

const router = createRouter({
  history: createWebHistory(),
  // uses HTML5 history mode
  routes
});

/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      pinia._a = app;
      app.provide(piniaSymbol, pinia);
      app.config.globalProperties.$pinia = pinia;
      toBeInstalled.forEach((plugin) => _p.push(plugin));
      toBeInstalled = [];
    },
    use(plugin) {
      if (!this._a) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}

createApp(App).use(createPinia()).use(router).mount("#app");
