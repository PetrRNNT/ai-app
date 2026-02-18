import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server } from 'node:http';
import path, { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getQuery as getQuery$1, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, getHeader, getResponseStatusText } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/@vue/shared/dist/shared.cjs.js';
import { PrismaClient } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/@prisma/client/default.js';
import { fileURLToPath } from 'node:url';
import jwt from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/jsonwebtoken/index.js';
import bcrypt from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/bcryptjs/index.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/ufo/dist/index.mjs';
import destr, { destr as destr$1 } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/destr/dist/index.mjs';
import { renderToString } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/vue/server-renderer/index.mjs';
import { klona } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/scule/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/devalue/index.js';
import { isVNode, isRef, toValue } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/vue/index.mjs';
import { createHooks } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/nitropack/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/youch-core/build/index.js';
import { Youch } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/errx/dist/index.js';
import { promises } from 'node:fs';
import { dirname as dirname$1, resolve as resolve$1 } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/pathe/dist/index.mjs';
import { walkResolver } from 'file://C:/Users/ipetr/Documents/todo-app/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"C:/Users/ipetr/Documents/todo-app/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/ipetr/Documents/todo-app","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/ipetr/Documents/todo-app/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/ipetr/Documents/todo-app/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/ipetr/Documents/todo-app/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:/Users/ipetr/Documents/todo-app/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "appName": "Enterprise TodoList"
  },
  "jwtSecret": "qID<eo|oqRx^29v7P+-F|oBlj)YikZ)h[aobpMxneK/",
  "jwtExpiresIn": "7d"
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

/**
* Nitro internal functions extracted from https://github.com/nitrojs/nitro/blob/v2/src/runtime/internal/utils.ts
*/
function isJsonRequest(event) {
	// If the client specifically requests HTML, then avoid classifying as JSON.
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const iframeStorageBridge = (nonce) => `
(function () {
  const NONCE = ${JSON.stringify(nonce)};
  const memoryStore = Object.create(null);

  const post = (type, payload) => {
    window.parent.postMessage({ type, nonce: NONCE, ...payload }, '*');
  };

  const isValid = (data) => data && data.nonce === NONCE;

  const mockStorage = {
    getItem(key) {
      return Object.hasOwn(memoryStore, key)
        ? memoryStore[key]
        : null;
    },
    setItem(key, value) {
      const v = String(value);
      memoryStore[key] = v;
      post('storage-set', { key, value: v });
    },
    removeItem(key) {
      delete memoryStore[key];
      post('storage-remove', { key });
    },
    clear() {
      for (const key of Object.keys(memoryStore))
        delete memoryStore[key];
      post('storage-clear', {});
    },
    key(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] ?? null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };

  const defineLocalStorage = () => {
    try {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: false,
        configurable: true
      });
    } catch {
      window.localStorage = mockStorage;
    }
  };

  defineLocalStorage();

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!isValid(data) || data.type !== 'storage-sync-data') return;

    const incoming = data.data || {};
    for (const key of Object.keys(incoming))
      memoryStore[key] = incoming[key];

    if (typeof window.initTheme === 'function')
      window.initTheme();
    window.dispatchEvent(new Event('storage-ready'));
  });

  // Clipboard API is unavailable in data: URL iframe, so we use postMessage
  document.addEventListener('DOMContentLoaded', function() {
    window.copyErrorMessage = function(button) {
      post('clipboard-copy', { text: button.dataset.errorText });
      button.classList.add('copied');
      setTimeout(function() { button.classList.remove('copied'); }, 2000);
    };
  });

  post('storage-sync-request', {});
})();
`;
const parentStorageBridge = (nonce) => `
(function () {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;

  const NONCE = ${JSON.stringify(nonce)};
  const isValid = (data) => data && data.nonce === NONCE;

  // Handle clipboard copy from iframe
  window.addEventListener('message', function(e) {
    if (isValid(e) && e.data.type === 'clipboard-copy') {
      navigator.clipboard.writeText(e.data.text).catch(function() {});
    }
  });

  const collectLocalStorage = () => {
    const all = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k != null) all[k] = localStorage.getItem(k);
    }
    return all;
  };

  const attachWhenReady = () => {
    const root = host.shadowRoot;
    if (!root)
      return false;
    const iframe = root.getElementById('frame');
    if (!iframe || !iframe.contentWindow)
      return false;

    const handlers = {
      'storage-set': (d) => localStorage.setItem(d.key, d.value),
      'storage-remove': (d) => localStorage.removeItem(d.key),
      'storage-clear': () => localStorage.clear(),
      'storage-sync-request': () => {
        iframe.contentWindow.postMessage({
          type: 'storage-sync-data',
          data: collectLocalStorage(),
          nonce: NONCE
        }, '*');
      }
    };

    window.addEventListener('message', (event) => {
      const data = event.data;
      if (!isValid(data)) return;
      const fn = handlers[data.type];
      if (fn) fn(data);
    });

    return true;
  };

  if (attachWhenReady())
    return;

  const obs = new MutationObserver(() => {
    if (attachWhenReady())
      obs.disconnect();
  });

  obs.observe(host, { childList: true, subtree: true });
})();
`;
const errorCSS = `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  --error-pip-left: auto;
  --error-pip-top: auto;
  --error-pip-right: 5px;
  --error-pip-bottom: 5px;
  --error-pip-origin: bottom right;
  --app-preview-left: auto;
  --app-preview-top: auto;
  --app-preview-right: 5px;
  --app-preview-bottom: 5px;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: var(--error-pip-right);
  bottom: var(--error-pip-bottom);
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: var(--error-pip-origin);
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: var(--app-preview-right);
  bottom: var(--app-preview-bottom);
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 6px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#preview iframe {
  transform-origin: var(--error-pip-origin);
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  left: var(--app-preview-left);
  top: var(--app-preview-top);
  right: calc(var(--app-preview-right) - 3px);
  bottom: calc(var(--app-preview-bottom) - 3px);
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 0;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
#frame[inert] ~ #toggle {
  left: var(--error-pip-left);
  top: var(--error-pip-top);
  right: calc(var(--error-pip-right) - 3px);
  bottom: calc(var(--error-pip-bottom) - 3px);
  cursor: grab;
}
:host(.dragging) #frame[inert] ~ #toggle {
  cursor: grabbing;
}
#frame:not([inert]) ~ #toggle,
#frame:not([inert]) + #preview {
  cursor: grab;
}
:host(.dragging-preview) #frame:not([inert]) ~ #toggle,
:host(.dragging-preview) #frame:not([inert]) + #preview {
  cursor: grabbing;
}

#pip-close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  pointer-events: auto;
}
#pip-close:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}

#pip-restore {
  position: fixed;
  right: 16px;
  bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 2px solid #00DC82;
  background: #111;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  z-index: calc(var(--z-base) + 2);
  cursor: grab;
}
#pip-restore:focus-visible {
  outline: 2px solid #00DC82;
  outline-offset: 2px;
}
:host(.dragging-restore) #pip-restore {
  cursor: grabbing;
}

#frame[hidden],
#toggle[hidden],
#preview[hidden],
#pip-restore[hidden],
#pip-close[hidden] {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`;
function webComponentScript(base64HTML, startMinimized) {
	return `
(function () {
  try {
    // =========================
    // Host + Shadow
    // =========================
    const host = document.querySelector('nuxt-error-overlay');
    if (!host)
      return;
    const shadow = host.attachShadow({ mode: 'open' });

    // =========================
    // DOM helpers
    // =========================
    const el = (tag) => document.createElement(tag);
    const on = (node, type, fn, opts) => node.addEventListener(type, fn, opts);
    const hide = (node, v) => node.toggleAttribute('hidden', !!v);
    const setVar = (name, value) => host.style.setProperty(name, value);
    const unsetVar = (name) => host.style.removeProperty(name);

    // =========================
    // Create DOM
    // =========================
    const style = el('style');
    style.textContent = ${JSON.stringify(errorCSS)};

    const iframe = el('iframe');
    iframe.id = 'frame';
    iframe.src = 'data:text/html;base64,${base64HTML}';
    iframe.title = 'Detailed error stack trace';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');

    const preview = el('div');
    preview.id = 'preview';

    const toggle = el('div');
    toggle.id = 'toggle';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';

    const liveRegion = el('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.className = 'sr-only';

    const pipCloseButton = el('button');
    pipCloseButton.id = 'pip-close';
    pipCloseButton.setAttribute('type', 'button');
    pipCloseButton.setAttribute('aria-label', 'Hide error preview overlay');
    pipCloseButton.innerHTML = '&times;';
    pipCloseButton.hidden = true;
    toggle.appendChild(pipCloseButton);

    const pipRestoreButton = el('button');
    pipRestoreButton.id = 'pip-restore';
    pipRestoreButton.setAttribute('type', 'button');
    pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
    pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
    pipRestoreButton.hidden = true;

    // Order matters: #frame + #preview adjacency
    shadow.appendChild(style);
    shadow.appendChild(liveRegion);
    shadow.appendChild(iframe);
    shadow.appendChild(preview);
    shadow.appendChild(toggle);
    shadow.appendChild(pipRestoreButton);

    // =========================
    // Constants / keys
    // =========================
    const POS_KEYS = {
      position: 'nuxt-error-overlay:position',
      hiddenPretty: 'nuxt-error-overlay:error-pip:hidden',
      hiddenPreview: 'nuxt-error-overlay:app-preview:hidden'
    };

    const CSS_VARS = {
      pip: {
        left: '--error-pip-left',
        top: '--error-pip-top',
        right: '--error-pip-right',
        bottom: '--error-pip-bottom'
      },
      preview: {
        left: '--app-preview-left',
        top: '--app-preview-top',
        right: '--app-preview-right',
        bottom: '--app-preview-bottom'
      }
    };

    const MIN_GAP = 5;
    const DRAG_THRESHOLD = 2;

    // =========================
    // Local storage safe access + state
    // =========================
    let storageReady = true;
    let isPrettyHidden = false;
    let isPreviewHidden = false;

    const safeGet = (k) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };

    const safeSet = (k, v) => {
      if (!storageReady) 
        return;
      try {
        localStorage.setItem(k, v);
      } catch {}
    };

    // =========================
    // Sizing helpers
    // =========================
    const vvSize = () => {
      const v = window.visualViewport;
      return v ? { w: v.width, h: v.height } : { w: window.innerWidth, h: window.innerHeight };
    };

    const previewSize = () => {
      const styles = getComputedStyle(host);
      const w = parseFloat(styles.getPropertyValue('--preview-width')) || 240;
      const h = parseFloat(styles.getPropertyValue('--preview-height')) || 180;
      return { w, h };
    };

    const sizeForTarget = (target) => {
      if (!target)
        return previewSize();
      const rect = target.getBoundingClientRect();
      if (rect.width && rect.height)
        return { w: rect.width, h: rect.height };
      return previewSize();
    };

    // =========================
    // Dock model + offset/alignment calculations
    // =========================
    const dock = { edge: null, offset: null, align: null, gap: null };

    const maxOffsetFor = (edge, size) => {
      const vv = vvSize();
      if (edge === 'left' || edge === 'right')
        return Math.max(MIN_GAP, vv.h - size.h - MIN_GAP);
      return Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
    };

    const clampOffset = (edge, value, size) => {
      const max = maxOffsetFor(edge, size);
      return Math.min(Math.max(value, MIN_GAP), max);
    };

    const updateDockAlignment = (size) => {
      if (!dock.edge || dock.offset == null)
        return;
      const max = maxOffsetFor(dock.edge, size);
      if (dock.offset <= max / 2) {
        dock.align = 'start';
        dock.gap = dock.offset;
      } else {
        dock.align = 'end';
        dock.gap = Math.max(0, max - dock.offset);
      }
    };

    const appliedOffsetFor = (size) => {
      if (!dock.edge || dock.offset == null)
        return null;
      const max = maxOffsetFor(dock.edge, size);

      if (dock.align === 'end' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, max - dock.gap, size);
      }
      if (dock.align === 'start' && typeof dock.gap === 'number') {
        return clampOffset(dock.edge, dock.gap, size);
      }
      return clampOffset(dock.edge, dock.offset, size);
    };

    const nearestEdgeAt = (x, y) => {
      const { w, h } = vvSize();
      const d = { left: x, right: w - x, top: y, bottom: h - y };
      return Object.keys(d).reduce((a, b) => (d[a] < d[b] ? a : b));
    };

    const cornerDefaultDock = () => {
      const vv = vvSize();
      const size = previewSize();
      const offset = Math.max(MIN_GAP, vv.w - size.w - MIN_GAP);
      return { edge: 'bottom', offset };
    };

    const currentTransformOrigin = () => {
      if (!dock.edge) return null;
      if (dock.edge === 'left' || dock.edge === 'top')
        return 'top left';
      if (dock.edge === 'right')
        return 'top right';
      return 'bottom left';
    };

    // =========================
    // Persist / load dock
    // =========================
    const loadDock = () => {
      const raw = safeGet(POS_KEYS.position);
      if (!raw)
        return;
      try {
        const parsed = JSON.parse(raw);
        const { edge, offset, align, gap } = parsed || {};
        if (!['left', 'right', 'top', 'bottom'].includes(edge))
          return;
        if (typeof offset !== 'number')
          return;

        dock.edge = edge;
        dock.offset = clampOffset(edge, offset, previewSize());
        dock.align = align === 'start' || align === 'end' ? align : null;
        dock.gap = typeof gap === 'number' ? gap : null;

        if (!dock.align || dock.gap == null)
          updateDockAlignment(previewSize());
      } catch {}
    };

    const persistDock = () => {
      if (!dock.edge || dock.offset == null)
        return; 
      safeSet(POS_KEYS.position, JSON.stringify({
        edge: dock.edge,
        offset: dock.offset,
        align: dock.align,
        gap: dock.gap
      }));
    };

    // =========================
    // Apply dock
    // =========================
    const dockToVars = (vars) => ({
      set: (side, v) => host.style.setProperty(vars[side], v),
      clear: (side) => host.style.removeProperty(vars[side])
    });

    const dockToEl = (node) => ({
      set: (side, v) => { node.style[side] = v; },
      clear: (side) => { node.style[side] = ''; }
    });

    const applyDock = (target, size, opts) => {
      if (!dock.edge || dock.offset == null) {
        target.clear('left');
        target.clear('top');
        target.clear('right');
        target.clear('bottom');
        return;
      }

      target.set('left', 'auto');
      target.set('top', 'auto');
      target.set('right', 'auto');
      target.set('bottom', 'auto');

      const applied = appliedOffsetFor(size);

      if (dock.edge === 'left') {
        target.set('left', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'right') {
        target.set('right', MIN_GAP + 'px');
        target.set('top', applied + 'px');
      } else if (dock.edge === 'top') {
        target.set('top', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      } else {
        target.set('bottom', MIN_GAP + 'px');
        target.set('left', applied + 'px');
      }

      if (!opts || opts.persist !== false)
        persistDock();
    };

    const applyDockAll = (opts) => {
      applyDock(dockToVars(CSS_VARS.pip), previewSize(), opts);
      applyDock(dockToVars(CSS_VARS.preview), previewSize(), opts);
      applyDock(dockToEl(pipRestoreButton), sizeForTarget(pipRestoreButton), opts);
    };

    const repaintToDock = () => {
      if (!dock.edge || dock.offset == null)
        return;
      const origin = currentTransformOrigin();
      if (origin)
        setVar('--error-pip-origin', origin);
      else 
        unsetVar('--error-pip-origin');
      applyDockAll({ persist: false });
    };

    // =========================
    // Hidden state + UI
    // =========================
    const loadHidden = () => {
      const rawPretty = safeGet(POS_KEYS.hiddenPretty);
      if (rawPretty != null)
        isPrettyHidden = rawPretty === '1' || rawPretty === 'true';
      const rawPreview = safeGet(POS_KEYS.hiddenPreview);
      if (rawPreview != null)
        isPreviewHidden = rawPreview === '1' || rawPreview === 'true';
    };

    const setPrettyHidden = (v) => {
      isPrettyHidden = !!v;
      safeSet(POS_KEYS.hiddenPretty, isPrettyHidden ? '1' : '0');
      updateUI();
    };

    const setPreviewHidden = (v) => {
      isPreviewHidden = !!v;
      safeSet(POS_KEYS.hiddenPreview, isPreviewHidden ? '1' : '0');
      updateUI();
    };

    const isMinimized = () => iframe.hasAttribute('inert');

    const setMinimized = (v) => {
      if (v) {
        iframe.setAttribute('inert', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        iframe.removeAttribute('inert');
        toggle.setAttribute('aria-expanded', 'true');
      }
    };

    const setRestoreLabel = (kind) => {
      if (kind === 'pretty') {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error overlay</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error overlay');
      } else {
        pipRestoreButton.innerHTML = '<span aria-hidden="true">⟲</span><span>Show error page</span>';
        pipRestoreButton.setAttribute('aria-label', 'Show error page');
      }
    };

    const updateUI = () => {
      const minimized = isMinimized();
      const showPiP = minimized && !isPrettyHidden;
      const showPreview = !minimized && !isPreviewHidden;
      const pipHiddenByUser = minimized && isPrettyHidden;
      const previewHiddenByUser = !minimized && isPreviewHidden;
      const showToggle = minimized ? showPiP : showPreview;
      const showRestore = pipHiddenByUser || previewHiddenByUser;

      hide(iframe, pipHiddenByUser);
      hide(preview, !showPreview);
      hide(toggle, !showToggle);
      hide(pipCloseButton, !showToggle);
      hide(pipRestoreButton, !showRestore);

      pipCloseButton.setAttribute('aria-label', minimized ? 'Hide error overlay' : 'Hide error page preview');

      if (pipHiddenByUser)
        setRestoreLabel('pretty');
      else if (previewHiddenByUser)
        setRestoreLabel('preview');

      host.classList.toggle('pip-hidden', isPrettyHidden);
      host.classList.toggle('preview-hidden', isPreviewHidden);
    };

    // =========================
    // Preview snapshot
    // =========================
    const updatePreview = () => {
      try {
        let previewIframe = preview.querySelector('iframe');
        if (!previewIframe) {
          previewIframe = el('iframe');
          previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
          previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
          preview.appendChild(previewIframe);
        }

        const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
        const cleanedHTML = document.documentElement.outerHTML
          .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
          .replace(/<script[^>]*>.*?<\\/script>/gs, '');

        const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(doctype + cleanedHTML);
        iframeDoc.close();
      } catch (err) {
        console.error('Failed to update preview:', err);
      }
    };

    // =========================
    // View toggling
    // =========================
    const toggleView = () => {
      if (isMinimized()) {
        updatePreview();
        setMinimized(false);
        liveRegion.textContent = 'Showing detailed error view';
        setTimeout(() => { 
          try { 
            iframe.contentWindow.focus();
          } catch {}
        }, 100);
      } else {
        setMinimized(true);
        liveRegion.textContent = 'Showing error page';
        repaintToDock();
        void iframe.offsetWidth;
      }
      updateUI();
    };

    // =========================
    // Dragging (unified, rAF throttled)
    // =========================
    let drag = null;
    let rafId = null;
    let suppressToggleClick = false;
    let suppressRestoreClick = false;

    const beginDrag = (e) => {
      if (drag) 
        return;

      if (!dock.edge || dock.offset == null) {
        const def = cornerDefaultDock();
        dock.edge = def.edge;
        dock.offset = def.offset;
        updateDockAlignment(previewSize());
      }

      const isRestoreTarget = e.currentTarget === pipRestoreButton;

      drag = {
        kind: isRestoreTarget ? 'restore' : (isMinimized() ? 'pip' : 'preview'),
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        moved: false,
        target: e.currentTarget
      };

      drag.target.setPointerCapture(e.pointerId);

      if (drag.kind === 'restore')
        host.classList.add('dragging-restore');
      else 
        host.classList.add(drag.kind === 'pip' ? 'dragging' : 'dragging-preview');

      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      
      const dx = drag.lastX - drag.startX;
      const dy = drag.lastY - drag.startY;

      if (!drag.moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
        drag.moved = true;
      }

      if (!drag.moved)
        return;
      if (rafId)
        return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const edge = nearestEdgeAt(drag.lastX, drag.lastY);
        const size = sizeForTarget(drag.target);

        let offset;
        if (edge === 'left' || edge === 'right') {
          const top = drag.lastY - (size.h / 2);
          offset = clampOffset(edge, Math.round(top), size);
        } else {
          const left = drag.lastX - (size.w / 2);
          offset = clampOffset(edge, Math.round(left), size);
        }

        dock.edge = edge;
        dock.offset = offset;
        updateDockAlignment(size);

        const origin = currentTransformOrigin();
        setVar('--error-pip-origin', origin || 'bottom right');

        applyDockAll({ persist: false });
      });
    };

    const endDrag = (e) => {
      if (!drag || drag.pointerId !== e.pointerId)
        return;

      const endedKind = drag.kind;
      drag.target.releasePointerCapture(e.pointerId);

      if (endedKind === 'restore')
        host.classList.remove('dragging-restore');
      else 
        host.classList.remove(endedKind === 'pip' ? 'dragging' : 'dragging-preview');

      const didMove = drag.moved;
      drag = null;

      if (didMove) {
        persistDock();
        if (endedKind === 'restore')
          suppressRestoreClick = true;
        else 
          suppressToggleClick = true;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const bindDragTarget = (node) => {
      on(node, 'pointerdown', beginDrag);
      on(node, 'pointermove', moveDrag);
      on(node, 'pointerup', endDrag);
      on(node, 'pointercancel', endDrag);
    };

    bindDragTarget(toggle);
    bindDragTarget(pipRestoreButton);

    // =========================
    // Events (toggle / close / restore)
    // =========================
    on(toggle, 'click', (e) => {
      if (suppressToggleClick) {
        e.preventDefault();
        suppressToggleClick = false;
        return;
      }
      toggleView();
    });

    on(toggle, 'keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleView();
      }
    });

    on(pipCloseButton, 'click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized())
        setPrettyHidden(true);
      else
        setPreviewHidden(true);
    });

    on(pipCloseButton, 'pointerdown', (e) => {
      e.stopPropagation();
    });

    on(pipRestoreButton, 'click', (e) => {
      if (suppressRestoreClick) {
        e.preventDefault();
        suppressRestoreClick = false;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (isMinimized()) 
        setPrettyHidden(false);
      else 
        setPreviewHidden(false);
    });

    // =========================
    // Lifecycle: load / sync / repaint
    // =========================
    const loadState = () => {
      loadDock();
      loadHidden();

      if (isPrettyHidden && !isMinimized())
        setMinimized(true);

      updateUI();
      repaintToDock();
    };

    loadState();

    on(window, 'storage-ready', () => {
      storageReady = true;
      loadState();
    });

    const onViewportChange = () => repaintToDock();

    on(window, 'resize', onViewportChange);

    if (window.visualViewport) {
      on(window.visualViewport, 'resize', onViewportChange);
      on(window.visualViewport, 'scroll', onViewportChange);
    }

    // initial preview
    setTimeout(updatePreview, 100);

    // initial minimized option
    if (${startMinimized}) {
      setMinimized(true);
      repaintToDock();
      void iframe.offsetWidth;
      updateUI();
    }
  } catch (err) {
    console.error('Failed to initialize Nuxt error overlay:', err);
  }
})();
`;
}
function generateErrorOverlayHTML(html, options) {
	const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
	const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
	const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
	return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		// let Nitro handle JSON errors
		return;
	}
	// invoke default Nitro error handler (which will log appropriately if required)
	const defaultRes = await defaultHandler(error, event, { json: true });
	// let Nitro handle redirect if appropriate
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
		// normalize to string format expected by nuxt `error.vue`
		defaultRes.body.stack = defaultRes.body.stack.join("\n");
	}
	const errorObject = defaultRes.body;
	// remove proto/hostname/port from URL
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	// add default server message (keep sanitized for unhandled errors)
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	// we will be rendering this error internally so we can pass along the error.data safely
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	// Access request headers
	const reqHeaders = getRequestHeaders(event);
	// Detect to avoid recursion in SSR rendering of errors
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	// HTML response (via SSR)
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	// Fallback to static rendered error page
	if (!res) {
		const { template } = await Promise.resolve().then(function () { return error500; });
		{
			// TODO: Support `message` in template
			errorObject.description = errorObject.message;
		}
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	if (!globalThis._importMeta_.test && typeof html === "string") {
		const prettyResponse = await defaultHandler(error, event, { json: false });
		if (typeof prettyResponse.body === "string") {
			return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= status && status < 500 })}</body>`));
		}
	}
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _q_S0Z2VfjZLHzP0WyHN8Ou1uCQ9EKSDPtJpsxd_q7o = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "C:/Users/ipetr/Documents/todo-app";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"name":"description","content":"Enterprise TodoList - полнофункциональное приложение для управления задачами"}],"link":[{"rel":"icon","type":"image/x-icon","href":"/favicon.ico"}],"style":[],"script":[],"noscript":[],"title":"Enterprise TodoList"};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const devReducers = {
	VNode: (data) => isVNode(data) ? {
		type: data.type,
		props: data.props
	} : undefined,
	URL: (data) => data instanceof URL ? data.toString() : undefined
};
const asyncContext = getContext("nuxt-dev", {
	asyncContext: true,
	AsyncLocalStorage
});
const _KaLOPbWcZ6NPY1nf9ydfFk3xzN5k00gq5zPOhIrPw = (nitroApp) => {
	const handler = nitroApp.h3App.handler;
	nitroApp.h3App.handler = (event) => {
		return asyncContext.callAsync({
			logs: [],
			event
		}, () => handler(event));
	};
	onConsoleLog((_log) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		const rawStack = captureRawStackTrace();
		if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
			return;
		}
		const trace = [];
		let filename = "";
		for (const entry of parseRawStackTrace(rawStack)) {
			if (entry.source === globalThis._importMeta_.url) {
				continue;
			}
			if (EXCLUDE_TRACE_RE.test(entry.source)) {
				continue;
			}
			filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
			trace.push({
				...entry,
				source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
			});
		}
		const log = {
			..._log,
			filename,
			stack: trace
		};
		// retain log to be include in the next render
		ctx.logs.push(log);
	});
	nitroApp.hooks.hook("afterResponse", () => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		return nitroApp.hooks.callHook("dev:ssr-logs", {
			logs: ctx.logs,
			path: ctx.event.path
		});
	});
	// Pass any logs to the client
	nitroApp.hooks.hook("render:html", (htmlContext) => {
		const ctx = asyncContext.tryUse();
		if (!ctx) {
			return;
		}
		try {
			const reducers = Object.assign(Object.create(null), devReducers, ctx.event.context["~payloadReducers"]);
			htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
		} catch (e) {
			const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
			console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload.`);
		}
	});
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
	consola$1.addReporter({ log(logObj) {
		callback(logObj);
	} });
	consola$1.wrapConsole();
}

const _bszLy5FDsG3IUGdszGGPgJwTZ4jDjmdl7eLGxj4GP8 = defineNitroPlugin(() => {
  console.log("Enterprise TodoList server started");
});

const plugins = [
  _q_S0Z2VfjZLHzP0WyHN8Ou1uCQ9EKSDPtJpsxd_q7o,
_KaLOPbWcZ6NPY1nf9ydfFk3xzN5k00gq5zPOhIrPw,
_bszLy5FDsG3IUGdszGGPgJwTZ4jDjmdl7eLGxj4GP8
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _6tqt7m = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

const NUXT_RUNTIME_PAYLOAD_EXTRACTION = false;

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function createSSRContext(event) {
	const ssrContext = {
		url: event.path,
		event,
		runtimeConfig: useRuntimeConfig(event),
		noSSR: event.context.nuxt?.noSSR || (false),
		head: createHead(unheadOptions),
		error: false,
		nuxt: undefined,
		payload: {},
		["~payloadReducers"]: Object.create(null),
		modules: new Set()
	};
	return ssrContext;
}
function setSSRError(ssrContext, error) {
	ssrContext.error = true;
	ssrContext.payload = { error };
	ssrContext.url = error.url;
}

function buildAssetsDir() {
	// TODO: support passing event to `useRuntimeConfig`
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	// TODO: support passing event to `useRuntimeConfig`
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
// @ts-expect-error file will be produced after app build
const getServerEntry = () => import('file://C:/Users/ipetr/Documents/todo-app/.nuxt//dist/server/server.mjs').then((r) => r.default || r);
// @ts-expect-error file will be produced after app build
const getClientManifest = () => import('file://C:/Users/ipetr/Documents/todo-app/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
// -- SSR Renderer --
const getSSRRenderer = lazyCachedFunction(async () => {
	// Load server bundle
	const createSSRApp = await getServerEntry();
	if (!createSSRApp) {
		throw new Error("Server bundle is not available");
	}
	// Load precomputed dependencies
	const precomputed = undefined ;
	// Create renderer
	const renderer = createRenderer(createSSRApp, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: renderToString$1,
		buildAssetsURL
	});
	async function renderToString$1(input, context) {
		const html = await renderToString(input, context);
		// In development with vite-node, the manifest is on-demand and will be available after rendering
		// eslint-disable-next-line no-restricted-globals
		if (process.env.NUXT_VITE_NODE_OPTIONS) {
			renderer.rendererContext.updateManifest(await getClientManifest());
		}
		return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
	}
	return renderer;
});
// -- SPA Renderer --
const getSPARenderer = lazyCachedFunction(async () => {
	const precomputed = undefined ;
	// @ts-expect-error virtual file
	const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
		{
			const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
			const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
			const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
			const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
			return appTemplate + loaderTemplate;
		}
	});
	// Create SPA renderer and cache the result for all requests
	const renderer = createRenderer(() => () => {}, {
		precomputed,
		manifest: await getClientManifest() ,
		renderToString: () => spaTemplate,
		buildAssetsURL
	});
	const result = await renderer.renderToString({});
	const renderToString = (ssrContext) => {
		const config = useRuntimeConfig(ssrContext.event);
		ssrContext.modules ||= new Set();
		ssrContext.payload.serverRendered = false;
		ssrContext.config = {
			public: config.public,
			app: config.app
		};
		return Promise.resolve(result);
	};
	return {
		rendererContext: renderer.rendererContext,
		renderToString
	};
});
function lazyCachedFunction(fn) {
	let res = null;
	return () => {
		if (res === null) {
			res = fn().catch((err) => {
				res = null;
				throw err;
			});
		}
		return res;
	};
}
function getRenderer(ssrContext) {
	return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
// @ts-expect-error file will be produced after app build
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
	const styleMap = await getSSRStyles();
	const inlinedStyles = new Set();
	for (const mod of usedModules) {
		if (mod in styleMap && styleMap[mod]) {
			for (const style of await styleMap[mod]()) {
				inlinedStyles.add(style);
			}
		}
	}
	return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

// @ts-expect-error virtual file
const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
/**
* remove the root node from the html body
*/
function getServerComponentHTML(body) {
	const match = body.match(ROOT_NODE_REGEX);
	return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
		return undefined;
	}
	const response = {};
	for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
		response[name] = {
			...slot,
			fallback: ssrContext.teleports?.[`island-fallback=${name}`]
		};
	}
	return response;
}
function getClientIslandResponse(ssrContext) {
	if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
		return undefined;
	}
	const response = {};
	for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
		// remove teleport anchor to avoid hydration issues
		const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
		response[clientUid] = {
			...component,
			html,
			slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
		};
	}
	return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
	const entries = Object.entries(teleports);
	const slots = {};
	for (const [key, value] of entries) {
		const match = key.match(SSR_CLIENT_SLOT_MARKER);
		if (match) {
			const [, id, slot] = match;
			if (!slot || clientUid !== id) {
				continue;
			}
			slots[slot] = value;
		}
	}
	return slots;
}
function replaceIslandTeleports(ssrContext, html) {
	const { teleports, islandContext } = ssrContext;
	if (islandContext || !teleports) {
		return html;
	}
	for (const key in teleports) {
		const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
		if (matchClientComp) {
			const [, uid, clientId] = matchClientComp;
			if (!uid || !clientId) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
			continue;
		}
		const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
		if (matchSlot) {
			const [, uid, slot] = matchSlot;
			if (!uid || !slot) {
				continue;
			}
			html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
				return full + teleports[key];
			});
		}
	}
	return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
	const nitroApp = useNitroApp();
	setResponseHeaders(event, {
		"content-type": "application/json;charset=utf-8",
		"x-powered-by": "Nuxt"
	});
	const islandContext = await getIslandContext(event);
	const ssrContext = {
		...createSSRContext(event),
		islandContext,
		noSSR: false,
		url: islandContext.url
	};
	// Render app
	const renderer = await getSSRRenderer();
	const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
		await ssrContext.nuxt?.hooks.callHook("app:error", err);
		throw err;
	});
	// Handle errors
	if (ssrContext.payload?.error) {
		throw ssrContext.payload.error;
	}
	const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult
	});
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	{
		const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
		const link = [];
		for (const resource of Object.values(styles)) {
			// Do not add links to resources that are inlined (vite v5+)
			if ("inline" in getQuery(resource.file)) {
				continue;
			}
			// Add CSS links in <head> for CSS files
			// - in dev mode when rendering an island and the file has scoped styles and is not a page
			if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
				link.push({
					rel: "stylesheet",
					href: renderer.rendererContext.buildAssetsURL(resource.file),
					crossorigin: ""
				});
			}
		}
		if (link.length) {
			ssrContext.head.push({ link }, { mode: "server" });
		}
	}
	const islandHead = {};
	for (const entry of ssrContext.head.entries.values()) {
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
			const currentValue = islandHead[key];
			if (Array.isArray(currentValue)) {
				currentValue.push(...value);
			} else {
				islandHead[key] = value;
			}
		}
	}
	const islandResponse = {
		id: islandContext.id,
		head: islandHead,
		html: getServerComponentHTML(renderResult.html),
		components: getClientIslandResponse(ssrContext),
		slots: getSlotIslandResponse(ssrContext)
	};
	await nitroApp.hooks.callHook("render:island", islandResponse, {
		event,
		islandContext
	});
	return islandResponse;
});
async function getIslandContext(event) {
	// TODO: Strict validation for url
	let url = event.path || "";
	const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
	const hashId = componentParts.length > 1 ? componentParts.pop() : undefined;
	const componentName = componentParts.join("_");
	// TODO: Validate context
	const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
	const ctx = {
		url: "/",
		...context,
		id: hashId,
		name: componentName,
		props: destr$1(context.props) || {},
		slots: {},
		components: {}
	};
	return ctx;
}

const _lazy_quap0s = () => Promise.resolve().then(function () { return index_get$j; });
const _lazy_weTjCH = () => Promise.resolve().then(function () { return index_post$d; });
const _lazy_258F7s = () => Promise.resolve().then(function () { return me_get$1; });
const _lazy_6wXAbd = () => Promise.resolve().then(function () { return _id__delete$b; });
const _lazy_OKDH3G = () => Promise.resolve().then(function () { return index_get$h; });
const _lazy_4G55nA = () => Promise.resolve().then(function () { return index_post$b; });
const _lazy_HEE5jo = () => Promise.resolve().then(function () { return index_get$f; });
const _lazy_YF7HJG = () => Promise.resolve().then(function () { return _id__delete$9; });
const _lazy_I8qr1U = () => Promise.resolve().then(function () { return _id__get$3; });
const _lazy_9LJpeV = () => Promise.resolve().then(function () { return _id__put$3; });
const _lazy_CopoNQ = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_wu3NLK = () => Promise.resolve().then(function () { return index_post$9; });
const _lazy_spK4ij = () => Promise.resolve().then(function () { return _id__delete$7; });
const _lazy_dPC5d3 = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_MGlRPM = () => Promise.resolve().then(function () { return index_post$7; });
const _lazy_CBwI1D = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_RyCG0m = () => Promise.resolve().then(function () { return index_put$1; });
const _lazy_IFPitQ = () => Promise.resolve().then(function () { return _id__delete$5; });
const _lazy_msYdWf = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_sg3oC9 = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_x_urrs = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_LGVtGK = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_WLGHKj = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_2UzujJ = () => Promise.resolve().then(function () { return complete_post$1; });
const _lazy_2CmkVj = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_tEoRsy = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_LkCyMs = () => Promise.resolve().then(function () { return move_post$1; });
const _lazy_Sw1tBo = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_3ospdf = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_YZSwZv = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_RSuPWY = () => Promise.resolve().then(function () { return active_get$1; });
const _lazy_Tvj3T2 = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_WWB_4r = () => Promise.resolve().then(function () { return start_post$1; });
const _lazy_5rK4WD = () => Promise.resolve().then(function () { return stop_post$1; });
const _lazy_crA01c = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _6tqt7m, lazy: false, middleware: true, method: undefined },
  { route: '/api/analytics', handler: _lazy_quap0s, lazy: true, middleware: false, method: "get" },
  { route: '/api/auth', handler: _lazy_weTjCH, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/me', handler: _lazy_258F7s, lazy: true, middleware: false, method: "get" },
  { route: '/api/automations/:id', handler: _lazy_6wXAbd, lazy: true, middleware: false, method: "delete" },
  { route: '/api/automations', handler: _lazy_OKDH3G, lazy: true, middleware: false, method: "get" },
  { route: '/api/automations', handler: _lazy_4G55nA, lazy: true, middleware: false, method: "post" },
  { route: '/api/calendar', handler: _lazy_HEE5jo, lazy: true, middleware: false, method: "get" },
  { route: '/api/projects/:id', handler: _lazy_YF7HJG, lazy: true, middleware: false, method: "delete" },
  { route: '/api/projects/:id', handler: _lazy_I8qr1U, lazy: true, middleware: false, method: "get" },
  { route: '/api/projects/:id', handler: _lazy_9LJpeV, lazy: true, middleware: false, method: "put" },
  { route: '/api/projects', handler: _lazy_CopoNQ, lazy: true, middleware: false, method: "get" },
  { route: '/api/projects', handler: _lazy_wu3NLK, lazy: true, middleware: false, method: "post" },
  { route: '/api/reminders/:id', handler: _lazy_spK4ij, lazy: true, middleware: false, method: "delete" },
  { route: '/api/reminders', handler: _lazy_dPC5d3, lazy: true, middleware: false, method: "get" },
  { route: '/api/reminders', handler: _lazy_MGlRPM, lazy: true, middleware: false, method: "post" },
  { route: '/api/settings', handler: _lazy_CBwI1D, lazy: true, middleware: false, method: "get" },
  { route: '/api/settings', handler: _lazy_RyCG0m, lazy: true, middleware: false, method: "put" },
  { route: '/api/tags/:id', handler: _lazy_IFPitQ, lazy: true, middleware: false, method: "delete" },
  { route: '/api/tags', handler: _lazy_msYdWf, lazy: true, middleware: false, method: "get" },
  { route: '/api/tags', handler: _lazy_sg3oC9, lazy: true, middleware: false, method: "post" },
  { route: '/api/tasks/:id', handler: _lazy_x_urrs, lazy: true, middleware: false, method: "delete" },
  { route: '/api/tasks/:id', handler: _lazy_LGVtGK, lazy: true, middleware: false, method: "get" },
  { route: '/api/tasks/:id', handler: _lazy_WLGHKj, lazy: true, middleware: false, method: "put" },
  { route: '/api/tasks/:id/complete', handler: _lazy_2UzujJ, lazy: true, middleware: false, method: "post" },
  { route: '/api/tasks', handler: _lazy_2CmkVj, lazy: true, middleware: false, method: "get" },
  { route: '/api/tasks', handler: _lazy_tEoRsy, lazy: true, middleware: false, method: "post" },
  { route: '/api/tasks/move', handler: _lazy_LkCyMs, lazy: true, middleware: false, method: "post" },
  { route: '/api/templates/:id', handler: _lazy_Sw1tBo, lazy: true, middleware: false, method: "delete" },
  { route: '/api/templates', handler: _lazy_3ospdf, lazy: true, middleware: false, method: "get" },
  { route: '/api/templates', handler: _lazy_YZSwZv, lazy: true, middleware: false, method: "post" },
  { route: '/api/time-entries/active', handler: _lazy_RSuPWY, lazy: true, middleware: false, method: "get" },
  { route: '/api/time-entries', handler: _lazy_Tvj3T2, lazy: true, middleware: false, method: "get" },
  { route: '/api/time-entries/start', handler: _lazy_WWB_4r, lazy: true, middleware: false, method: "post" },
  { route: '/api/time-entries/stop', handler: _lazy_5rK4WD, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_crA01c, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_crA01c, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineNitroPlugin(def) {
  return def;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = {
	"appName": "Nuxt",
	"status": 500,
	"statusText": "Internal server error",
	"description": "This page is temporarily unavailable.",
	"refresh": "Refresh this page"
};
const template$1 = (messages) => {
	messages = {
		..._messages,
		...messages
	};
	return "<!DOCTYPE html><html lang=\"en\"><head><title>" + escapeHtml(messages.status) + " - " + escapeHtml(messages.statusText) + " | " + escapeHtml(messages.appName) + "</title><meta charset=\"utf-8\"><meta content=\"width=device-width,initial-scale=1.0,minimum-scale=1.0\" name=\"viewport\"><script>!function(){const e=document.createElement(\"link\").relList;if(!(e&&e.supports&&e.supports(\"modulepreload\"))){for(const e of document.querySelectorAll('link[rel=\"modulepreload\"]'))r(e);new MutationObserver(e=>{for(const o of e)if(\"childList\"===o.type)for(const e of o.addedNodes)\"LINK\"===e.tagName&&\"modulepreload\"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),\"use-credentials\"===e.crossOrigin?r.credentials=\"include\":\"anonymous\"===e.crossOrigin?r.credentials=\"omit\":r.credentials=\"same-origin\",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:\"\"}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class=\"antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide\"><div class=\"max-w-520px text-center\"><h1 class=\"font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]\">" + escapeHtml(messages.status) + "</h1><h2 class=\"font-semibold mb-2 sm:text-3xl text-2xl\">" + escapeHtml(messages.statusText) + "</h2><p class=\"mb-4 px-2 text-[#64748B] text-md\">" + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

const __dirname$1 = path.dirname(fileURLToPath(globalThis._importMeta_.url));
const dbPath = path.join(__dirname$1, "../../prisma/dev.db");
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`
    }
  }
});

class AnalyticsService {
  async getProductivityStats(userId) {
    const now = /* @__PURE__ */ new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
    const allTasks = await prisma.task.findMany({
      where: {
        userId,
        deletedAt: null
      }
    });
    const completedTasks = allTasks.filter((t) => t.status === "COMPLETED");
    const tasksByStatus = {
      NEW: allTasks.filter((t) => t.status === "NEW").length,
      IN_PROGRESS: allTasks.filter((t) => t.status === "IN_PROGRESS").length,
      PAUSED: allTasks.filter((t) => t.status === "PAUSED").length,
      WAITING: allTasks.filter((t) => t.status === "WAITING").length,
      COMPLETED: completedTasks.length,
      CANCELLED: allTasks.filter((t) => t.status === "CANCELLED").length,
      ARCHIVED: allTasks.filter((t) => t.status === "ARCHIVED").length
    };
    const tasksByPriority = {
      CRITICAL: allTasks.filter((t) => t.priority === "CRITICAL").length,
      HIGH: allTasks.filter((t) => t.priority === "HIGH").length,
      MEDIUM: allTasks.filter((t) => t.priority === "MEDIUM").length,
      LOW: allTasks.filter((t) => t.priority === "LOW").length,
      NONE: allTasks.filter((t) => t.priority === "NONE").length
    };
    const tasksCompletedByDay = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const count = completedTasks.filter((t) => {
        if (!t.completedAt) return false;
        return t.completedAt.toISOString().split("T")[0] === dateStr;
      }).length;
      tasksCompletedByDay.push({
        date: date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }),
        count
      });
    }
    const timeEntries = await prisma.timeEntry.findMany({
      where: {
        userId,
        startTime: { gte: thirtyDaysAgo }
      }
    });
    const totalTimeTracked = timeEntries.reduce((sum, entry) => {
      return sum + (entry.duration || 0);
    }, 0);
    const estimatedTime = allTasks.reduce((sum, t) => sum + (t.estimatedTime || 0), 0);
    const actualTime = allTasks.reduce((sum, t) => sum + (t.actualTime || 0), 0);
    return {
      totalTasks: allTasks.length,
      completedTasks: completedTasks.length,
      completionRate: allTasks.length > 0 ? Math.round(completedTasks.length / allTasks.length * 100) : 0,
      avgCompletionTime: completedTasks.length > 0 ? Math.round(
        completedTasks.reduce((sum, t) => {
          if (!t.completedAt || !t.createdAt) return sum;
          return sum + (t.completedAt.getTime() - t.createdAt.getTime());
        }, 0) / completedTasks.length / (1e3 * 60 * 60)
        // hours
      ) : 0,
      tasksByStatus,
      tasksByPriority,
      tasksCompletedByDay,
      timeTracked: totalTimeTracked,
      estimatedVsActual: {
        estimated: estimatedTime,
        actual: actualTime
      }
    };
  }
  async getCalendarEvents(userId, startDate, endDate) {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        deletedAt: null,
        OR: [
          { dueDate: { gte: new Date(startDate), lte: new Date(endDate) } },
          { startDate: { gte: new Date(startDate), lte: new Date(endDate) } }
        ]
      },
      include: {
        project: true
      }
    });
    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      start: task.dueDate || task.startDate,
      end: task.dueDate,
      allDay: !task.startDate,
      type: "task",
      taskId: task.id,
      projectId: task.projectId,
      color: task.project?.color || "#3B82F6",
      description: task.description,
      status: task.status,
      priority: task.priority
    }));
  }
}

const JWT_SECRET$6 = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
function hashPassword(password) {
  return bcrypt.hash(password, 10);
}
function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET$6, {
    expiresIn: JWT_EXPIRES_IN
  });
}
function verifyToken(token, secret = JWT_SECRET$6) {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}
function getUserIdFromToken(token, secret = JWT_SECRET$6) {
  const payload = verifyToken(token, secret);
  return payload?.userId || null;
}
function getUserIdFromEvent(event) {
  const token = getHeader(event, "authorization")?.replace("Bearer ", "");
  if (!token) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized"
    });
  }
  const userId = getUserIdFromToken(token, JWT_SECRET$6);
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: "Invalid token"
    });
  }
  return userId;
}

const index_get$i = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const analyticsService = new AnalyticsService();
    const stats = await analyticsService.getProductivityStats(userId);
    return {
      data: stats
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch analytics"
    });
  }
});

const index_get$j = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$i
}, Symbol.toStringTag, { value: 'Module' }));

const JWT_SECRET$5 = process.env.JWT_SECRET;
process.env.JWT_EXPIRES_IN || "7d";
class AuthService {
  async register(email, name, password) {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "USER",
        settings: {
          create: {
            theme: "system",
            language: "ru",
            timezone: "Europe/Kaliningrad"
          }
        }
      },
      include: {
        settings: true
      }
    });
    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role
      },
      token
    };
  }
  async login(email, password) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        settings: true
      }
    });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error("Invalid email or password");
    }
    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role
      },
      token
    };
  }
  async getUserByToken(token) {
    const payload = verifyToken(token, JWT_SECRET$5);
    if (!payload) return null;
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        settings: true
      }
    });
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      settings: user.settings
    };
  }
  generateToken(payload) {
    return signToken(payload);
  }
}

const index_post$c = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password, name } = body;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: "Email and password are required"
      });
    }
    const authService = new AuthService();
    if (name) {
      const result = await authService.register(email, name, password);
      return {
        data: result.user,
        token: result.token,
        message: "Registration successful"
      };
    } else {
      const result = await authService.login(email, password);
      return {
        data: result.user,
        token: result.token,
        message: "Login successful"
      };
    }
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Authentication failed"
    });
  }
});

const index_post$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$c
}, Symbol.toStringTag, { value: 'Module' }));

const me_get = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const authService = new AuthService();
    const user = await authService.getUserByToken(token);
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    return {
      data: user
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to get user"
    });
  }
});

const me_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: me_get
}, Symbol.toStringTag, { value: 'Module' }));

class AutomationService {
  async getAutomations(userId) {
    return prisma.automation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }
  async createAutomation(userId, name, trigger, actions, description) {
    return prisma.automation.create({
      data: {
        userId,
        name,
        description,
        trigger,
        actions
      }
    });
  }
  async updateAutomation(userId, id, data) {
    const existing = await prisma.automation.findFirst({
      where: { id, userId }
    });
    if (!existing) throw new Error("Automation not found");
    return prisma.automation.update({
      where: { id },
      data
    });
  }
  async deleteAutomation(userId, id) {
    await prisma.automation.delete({
      where: { id, userId }
    });
  }
  async toggleAutomation(userId, id, isActive) {
    return prisma.automation.update({
      where: { id, userId },
      data: { isActive }
    });
  }
  async getActiveAutomations(userId, triggerType) {
    const where = { userId, isActive: true };
    if (triggerType) {
      where.trigger = {
        path: ["type"],
        equals: triggerType
      };
    }
    return prisma.automation.findMany({ where });
  }
  async executeAutomation(userId, automationId, context) {
    const automation = await prisma.automation.findFirst({
      where: { id: automationId, userId }
    });
    if (!automation) throw new Error("Automation not found");
    await prisma.automation.update({
      where: { id: automationId },
      data: { lastRun: /* @__PURE__ */ new Date() }
    });
    return automation.actions;
  }
}

const _id__delete$a = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) throw createError({ statusCode: 401, message: "Unauthorized" });
    const userId = getUserIdFromToken(token);
    if (!userId) throw createError({ statusCode: 401, message: "Invalid token" });
    const id = event.context.params?.id;
    if (!id) throw createError({ statusCode: 400, message: "Automation ID required" });
    const service = new AutomationService();
    await service.deleteAutomation(userId, id);
    return { message: "Automation deleted" };
  } catch (error) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message });
  }
});

const _id__delete$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$a
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$g = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) throw createError({ statusCode: 401, message: "Unauthorized" });
    const userId = getUserIdFromToken(token);
    if (!userId) throw createError({ statusCode: 401, message: "Invalid token" });
    const service = new AutomationService();
    const automations = await service.getAutomations(userId);
    return { data: automations };
  } catch (error) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message });
  }
});

const index_get$h = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$g
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$a = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) throw createError({ statusCode: 401, message: "Unauthorized" });
    const userId = getUserIdFromToken(token);
    if (!userId) throw createError({ statusCode: 401, message: "Invalid token" });
    const body = await readBody(event);
    const { name, description, trigger, actions } = body;
    if (!name || !trigger || !actions) {
      throw createError({ statusCode: 400, message: "Name, trigger, and actions are required" });
    }
    const service = new AutomationService();
    const automation = await service.createAutomation(userId, name, trigger, actions, description);
    return { data: automation, message: "Automation created" };
  } catch (error) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message });
  }
});

const index_post$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$a
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$e = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const query = getQuery$1(event);
    const startDate = query.start;
    const endDate = query.end;
    if (!startDate || !endDate) {
      throw createError({
        statusCode: 400,
        message: "Start and end dates are required"
      });
    }
    const analyticsService = new AnalyticsService();
    const events = await analyticsService.getCalendarEvents(userId, startDate, endDate);
    return {
      data: events
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch calendar events"
    });
  }
});

const index_get$f = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$e
}, Symbol.toStringTag, { value: 'Module' }));

class ProjectService {
  async getProjects(userId) {
    return prisma.project.findMany({
      where: {
        userId
      },
      include: {
        area: true,
        parent: true,
        children: true,
        sections: {
          orderBy: { order: "asc" }
        },
        _count: {
          select: { tasks: true }
        }
      },
      orderBy: { order: "asc" }
    });
  }
  async getProjectById(id, userId) {
    return prisma.project.findFirst({
      where: {
        id,
        userId
      },
      include: {
        area: true,
        parent: true,
        children: true,
        sections: {
          orderBy: { order: "asc" }
        },
        tasks: {
          where: {},
          include: {
            tags: {
              include: { tag: true }
            }
          }
        },
        _count: {
          select: { tasks: true }
        }
      }
    });
  }
  async createProject(userId, data) {
    const project = await prisma.project.create({
      data: {
        ...data,
        userId,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null
      },
      include: {
        sections: true
      }
    });
    await prisma.activity.create({
      data: {
        type: "CREATE",
        action: "created project",
        entityType: "Project",
        entityId: project.id,
        userId
      }
    });
    return project;
  }
  async updateProject(userId, data) {
    const { id, ...updateData } = data;
    const existingProject = await prisma.project.findFirst({
      where: { id, userId, deletedAt: null }
    });
    if (!existingProject) {
      throw new Error("Project not found");
    }
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...updateData,
        startDate: updateData.startDate ? new Date(updateData.startDate) : void 0,
        endDate: updateData.endDate ? new Date(updateData.endDate) : void 0
      }
    });
    await prisma.activity.create({
      data: {
        type: "UPDATE",
        action: "updated project",
        entityType: "Project",
        entityId: project.id,
        userId
      }
    });
    return project;
  }
  async deleteProject(userId, id) {
    await prisma.project.delete({
      where: {
        id,
        userId
      }
    });
    await prisma.activity.create({
      data: {
        type: "DELETE",
        action: "deleted project",
        entityType: "Project",
        entityId: id,
        userId
      }
    });
  }
  async getProjectWithTasks(id, userId) {
    return prisma.project.findFirst({
      where: {
        id,
        userId
      },
      include: {
        area: true,
        sections: {
          orderBy: { order: "asc" },
          include: {
            tasks: {
              where: {},
              include: {
                tags: {
                  include: { tag: true }
                }
              },
              orderBy: { order: "asc" }
            }
          }
        },
        tasks: {
          where: {},
          include: {
            tags: {
              include: { tag: true }
            }
          },
          orderBy: { order: "asc" }
        }
      }
    });
  }
}

const JWT_SECRET$4 = process.env.JWT_SECRET;
const _id__delete$8 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - no token provided"
      });
    }
    const userId = getUserIdFromToken(token, JWT_SECRET$4);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - invalid token"
      });
    }
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Project ID is required"
      });
    }
    const projectService = new ProjectService();
    await projectService.deleteProject(userId, id);
    return {
      message: "Project deleted successfully"
    };
  } catch (error) {
    console.error("Project delete error:", error.message);
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to delete project"
    });
  }
});

const _id__delete$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$8
}, Symbol.toStringTag, { value: 'Module' }));

const JWT_SECRET$3 = process.env.JWT_SECRET;
const _id__get$2 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - no token provided"
      });
    }
    const userId = getUserIdFromToken(token, JWT_SECRET$3);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - invalid token"
      });
    }
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Project ID is required"
      });
    }
    const projectService = new ProjectService();
    const project = await projectService.getProjectById(id, userId);
    if (!project) {
      throw createError({
        statusCode: 404,
        message: "Project not found"
      });
    }
    return {
      data: project
    };
  } catch (error) {
    console.error("Project API error:", error.message);
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch project"
    });
  }
});

const _id__get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$2
}, Symbol.toStringTag, { value: 'Module' }));

const JWT_SECRET$2 = process.env.JWT_SECRET;
const _id__put$2 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - no token provided"
      });
    }
    const userId = getUserIdFromToken(token, JWT_SECRET$2);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - invalid token"
      });
    }
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Project ID is required"
      });
    }
    const body = await readBody(event);
    const projectService = new ProjectService();
    const project = await projectService.updateProject(userId, { id, ...body });
    return {
      data: project,
      message: "Project updated successfully"
    };
  } catch (error) {
    console.error("Project update error:", error.message);
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to update project"
    });
  }
});

const _id__put$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$2
}, Symbol.toStringTag, { value: 'Module' }));

const JWT_SECRET$1 = process.env.JWT_SECRET;
const index_get$c = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - no token provided"
      });
    }
    const userId = getUserIdFromToken(token, JWT_SECRET$1);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - invalid token"
      });
    }
    const projectService = new ProjectService();
    const projects = await projectService.getProjects(userId);
    return {
      data: projects
    };
  } catch (error) {
    console.error("Projects API error:", error.message);
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch projects"
    });
  }
});

const index_get$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$c
}, Symbol.toStringTag, { value: 'Module' }));

const JWT_SECRET = process.env.JWT_SECRET;
const index_post$8 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - no token provided"
      });
    }
    const userId = getUserIdFromToken(token, JWT_SECRET);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized - invalid token"
      });
    }
    const body = await readBody(event);
    const { name } = body;
    if (!name) {
      throw createError({
        statusCode: 400,
        message: "Project name is required"
      });
    }
    const projectService = new ProjectService();
    const project = await projectService.createProject(userId, body);
    return {
      data: project,
      message: "Project created successfully"
    };
  } catch (error) {
    console.error("Project create error:", error.message);
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to create project"
    });
  }
});

const index_post$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$8
}, Symbol.toStringTag, { value: 'Module' }));

class ReminderService {
  async getReminders(userId) {
    return prisma.reminder.findMany({
      where: { userId },
      include: {
        task: true
      },
      orderBy: {
        triggerAt: "asc"
      }
    });
  }
  async createReminder(userId, taskId, type, triggerAt, context, condition) {
    return prisma.reminder.create({
      data: {
        userId,
        taskId,
        type,
        triggerAt,
        context,
        condition
      },
      include: {
        task: true
      }
    });
  }
  async updateReminder(userId, id, data) {
    const existing = await prisma.reminder.findFirst({
      where: { id, userId }
    });
    if (!existing) {
      throw new Error("Reminder not found");
    }
    return prisma.reminder.update({
      where: { id },
      data,
      include: {
        task: true
      }
    });
  }
  async deleteReminder(userId, id) {
    await prisma.reminder.delete({
      where: {
        id,
        userId
      }
    });
  }
  async getPendingReminders(userId) {
    return prisma.reminder.findMany({
      where: {
        userId,
        isTriggered: false,
        triggerAt: { lte: /* @__PURE__ */ new Date() }
      },
      include: {
        task: true
      }
    });
  }
  async markAsTriggered(id) {
    return prisma.reminder.update({
      where: { id },
      data: {
        isTriggered: true
      }
    });
  }
}

const _id__delete$6 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) throw createError({ statusCode: 401, message: "Unauthorized" });
    const userId = getUserIdFromToken(token);
    if (!userId) throw createError({ statusCode: 401, message: "Invalid token" });
    const id = event.context.params?.id;
    if (!id) throw createError({ statusCode: 400, message: "Reminder ID required" });
    const service = new ReminderService();
    await service.deleteReminder(userId, id);
    return { message: "Reminder deleted" };
  } catch (error) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message });
  }
});

const _id__delete$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$6
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$a = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) throw createError({ statusCode: 401, message: "Unauthorized" });
    const userId = getUserIdFromToken(token);
    if (!userId) throw createError({ statusCode: 401, message: "Invalid token" });
    const service = new ReminderService();
    const reminders = await service.getReminders(userId);
    return { data: reminders };
  } catch (error) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message });
  }
});

const index_get$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$a
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$6 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) throw createError({ statusCode: 401, message: "Unauthorized" });
    const userId = getUserIdFromToken(token);
    if (!userId) throw createError({ statusCode: 401, message: "Invalid token" });
    const body = await readBody(event);
    const { taskId, type, triggerAt, context, condition } = body;
    if (!taskId || !type) {
      throw createError({ statusCode: 400, message: "Task ID and type are required" });
    }
    const service = new ReminderService();
    const reminder = await service.createReminder(
      userId,
      taskId,
      type,
      triggerAt ? new Date(triggerAt) : void 0,
      context,
      condition
    );
    return { data: reminder, message: "Reminder created" };
  } catch (error) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message });
  }
});

const index_post$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$6
}, Symbol.toStringTag, { value: 'Module' }));

class SettingsService {
  async getUserSettings(userId) {
    let settings = await prisma.userSettings.findUnique({
      where: { userId }
    });
    if (!settings) {
      settings = await prisma.userSettings.create({
        data: {
          userId,
          theme: "system",
          language: "ru",
          timezone: "Europe/Kaliningrad",
          dateFormat: "DD.MM.YYYY",
          timeFormat: "24h",
          weekStart: 1,
          pomodoroWork: 25,
          pomodoroBreak: 5,
          pomodoroLong: 15
        }
      });
    }
    return settings;
  }
  async updateSettings(userId, data) {
    return prisma.userSettings.update({
      where: { userId },
      data
    });
  }
  async getSettingsValue(userId, key, defaultValue) {
    const settings = await this.getUserSettings(userId);
    return settings[key] ?? defaultValue;
  }
}

const index_get$8 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const service = new SettingsService();
    const settings = await service.getUserSettings(userId);
    return {
      data: settings
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch settings"
    });
  }
});

const index_get$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$8
}, Symbol.toStringTag, { value: 'Module' }));

const index_put = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const body = await readBody(event);
    const service = new SettingsService();
    const settings = await service.updateSettings(userId, body);
    return {
      data: settings,
      message: "Settings updated successfully"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to update settings"
    });
  }
});

const index_put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_put
}, Symbol.toStringTag, { value: 'Module' }));

class TagService {
  async getTags(userId) {
    return prisma.tag.findMany({
      where: { userId },
      include: {
        _count: {
          select: { tasks: true }
        }
      },
      orderBy: { name: "asc" }
    });
  }
  async createTag(userId, name, color) {
    const tag = await prisma.tag.create({
      data: {
        name: name.toLowerCase(),
        color,
        userId
      }
    });
    return tag;
  }
  async updateTag(userId, id, data) {
    const existingTag = await prisma.tag.findFirst({
      where: { id, userId }
    });
    if (!existingTag) {
      throw new Error("Tag not found");
    }
    return prisma.tag.update({
      where: { id },
      data
    });
  }
  async deleteTag(userId, id) {
    const existingTag = await prisma.tag.findFirst({
      where: { id, userId }
    });
    if (!existingTag) {
      throw new Error("Tag not found");
    }
    await prisma.tag.delete({
      where: { id }
    });
  }
}

const _id__delete$4 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Tag ID is required"
      });
    }
    const tagService = new TagService();
    await tagService.deleteTag(userId, id);
    return {
      message: "Tag deleted successfully"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to delete tag"
    });
  }
});

const _id__delete$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$4
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$6 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const tagService = new TagService();
    const tags = await tagService.getTags(userId);
    return {
      data: tags
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch tags"
    });
  }
});

const index_get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$6
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$4 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const body = await readBody(event);
    const { name, color } = body;
    if (!name || !color) {
      throw createError({
        statusCode: 400,
        message: "Name and color are required"
      });
    }
    const tagService = new TagService();
    const tag = await tagService.createTag(userId, name, color);
    return {
      data: tag,
      message: "Tag created successfully"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to create tag"
    });
  }
});

const index_post$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$4
}, Symbol.toStringTag, { value: 'Module' }));

class TaskService {
  async getTasks(userId, filters) {
    const where = {
      userId,
      deletedAt: null
    };
    if (filters) {
      if (filters.status?.length) {
        where.status = { in: filters.status };
      }
      if (filters.priority?.length) {
        where.priority = { in: filters.priority };
      }
      if (filters.projectId) {
        where.projectId = filters.projectId;
      }
      if (filters.sectionId) {
        where.sectionId = filters.sectionId;
      }
      if (filters.assigneeId) {
        where.assigneeId = filters.assigneeId;
      }
      if (filters.isImportant !== void 0) {
        where.isImportant = filters.isImportant;
      }
      if (filters.isUrgent !== void 0) {
        where.isUrgent = filters.isUrgent;
      }
      if (filters.search) {
        where.OR = [
          { title: { contains: filters.search } },
          { description: { contains: filters.search } }
        ];
      }
      if (filters.dueDateFrom || filters.dueDateTo) {
        where.dueDate = {};
        if (filters.dueDateFrom) {
          where.dueDate.gte = new Date(filters.dueDateFrom);
        }
        if (filters.dueDateTo) {
          where.dueDate.lte = new Date(filters.dueDateTo);
        }
      }
    }
    return prisma.task.findMany({
      where,
      include: {
        project: true,
        section: true,
        parent: true,
        children: true,
        tags: {
          include: {
            tag: true
          }
        },
        checklists: true,
        reminders: true
      },
      orderBy: {
        [filters?.sortBy || "order"]: filters?.sortOrder || "asc"
      }
    });
  }
  async getTaskById(id, userId) {
    return prisma.task.findFirst({
      where: {
        id,
        userId,
        deletedAt: null
      },
      include: {
        project: true,
        section: true,
        parent: true,
        children: true,
        tags: {
          include: {
            tag: true
          }
        },
        checklists: true,
        comments: {
          include: {
            user: true
          }
        },
        attachments: true,
        reminders: true,
        timeEntries: {
          include: {
            user: true
          }
        }
      }
    });
  }
  async createTask(userId, data) {
    const { tagIds, ...taskData } = data;
    const task = await prisma.task.create({
      data: {
        ...taskData,
        userId,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        startDate: data.startDate ? new Date(data.startDate) : null,
        tags: tagIds?.length ? {
          create: tagIds.map((tagId) => ({
            tagId
          }))
        } : void 0
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });
    await prisma.activity.create({
      data: {
        type: "CREATE",
        action: "created task",
        entityType: "Task",
        entityId: task.id,
        userId,
        taskId: task.id
      }
    });
    return task;
  }
  async updateTask(userId, data) {
    const { id, tagIds, ...updateData } = data;
    const existingTask = await prisma.task.findFirst({
      where: { id, userId, deletedAt: null }
    });
    if (!existingTask) {
      throw new Error("Task not found");
    }
    const task = await prisma.task.update({
      where: { id },
      data: {
        ...updateData,
        dueDate: updateData.dueDate ? new Date(updateData.dueDate) : void 0,
        startDate: updateData.startDate ? new Date(updateData.startDate) : void 0,
        completedAt: updateData.completedAt ? new Date(updateData.completedAt) : void 0,
        tags: tagIds ? {
          deleteMany: {},
          create: tagIds.map((tagId) => ({
            tagId
          }))
        } : void 0
      },
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      }
    });
    await prisma.activity.create({
      data: {
        type: "UPDATE",
        action: "updated task",
        entityType: "Task",
        entityId: task.id,
        userId,
        taskId: task.id
      }
    });
    return task;
  }
  async deleteTask(userId, id) {
    await prisma.task.update({
      where: { id },
      data: {
        deletedAt: /* @__PURE__ */ new Date()
      }
    });
    await prisma.activity.create({
      data: {
        type: "DELETE",
        action: "deleted task",
        entityType: "Task",
        entityId: id,
        userId
      }
    });
  }
  async completeTask(userId, id) {
    const task = await prisma.task.update({
      where: { id, userId, deletedAt: null },
      data: {
        status: "COMPLETED",
        completedAt: /* @__PURE__ */ new Date()
      }
    });
    await prisma.activity.create({
      data: {
        type: "COMPLETE",
        action: "completed task",
        entityType: "Task",
        entityId: id,
        userId,
        taskId: id
      }
    });
    return task;
  }
  async bulkUpdateStatus(userId, taskIds, status) {
    await prisma.task.updateMany({
      where: {
        id: { in: taskIds },
        userId
      },
      data: {
        status,
        completedAt: status === "COMPLETED" ? /* @__PURE__ */ new Date() : null
      }
    });
  }
}

const _id__delete$2 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Task ID is required"
      });
    }
    const taskService = new TaskService();
    await taskService.deleteTask(userId, id);
    return {
      message: "Task deleted successfully"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to delete task"
    });
  }
});

const _id__delete$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Task ID is required"
      });
    }
    const taskService = new TaskService();
    const task = await taskService.getTaskById(id, userId);
    if (!task) {
      throw createError({
        statusCode: 404,
        message: "Task not found"
      });
    }
    return {
      data: task
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch task"
    });
  }
});

const _id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Task ID is required"
      });
    }
    const body = await readBody(event);
    const taskService = new TaskService();
    const task = await taskService.updateTask(userId, { id, ...body });
    return {
      data: task,
      message: "Task updated successfully"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to update task"
    });
  }
});

const _id__put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put
}, Symbol.toStringTag, { value: 'Module' }));

const complete_post = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const id = event.context.params?.id;
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Task ID is required"
      });
    }
    const taskService = new TaskService();
    const task = await taskService.completeTask(userId, id);
    return {
      data: task,
      message: "Task completed successfully"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to complete task"
    });
  }
});

const complete_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: complete_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$4 = defineEventHandler(async (event) => {
  try {
    const userId = getUserIdFromEvent(event);
    const query = getQuery$1(event);
    const filters = {
      status: query.status ? Array.isArray(query.status) ? query.status : [query.status] : void 0,
      priority: query.priority ? Array.isArray(query.priority) ? query.priority : [query.priority] : void 0,
      projectId: query.projectId,
      sectionId: query.sectionId,
      search: query.search,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder
    };
    const taskService = new TaskService();
    const tasks = await taskService.getTasks(userId, filters);
    return {
      data: tasks
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch tasks"
    });
  }
});

const index_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$2 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const body = await readBody(event);
    const { title } = body;
    if (!title) {
      throw createError({
        statusCode: 400,
        message: "Title is required"
      });
    }
    const taskService = new TaskService();
    const task = await taskService.createTask(userId, body);
    return {
      data: task,
      message: "Task created successfully"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to create task"
    });
  }
});

const index_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const move_post = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const body = await readBody(event);
    const { taskId, status } = body;
    if (!taskId || !status) {
      throw createError({
        statusCode: 400,
        message: "Task ID and status are required"
      });
    }
    const taskService = new TaskService();
    const task = await taskService.updateTask(userId, { id: taskId, status });
    return {
      data: task,
      message: "Task moved successfully"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to move task"
    });
  }
});

const move_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: move_post
}, Symbol.toStringTag, { value: 'Module' }));

class TemplateService {
  async getTemplates(userId, type) {
    const where = { userId };
    if (type) where.type = type;
    return prisma.template.findMany({
      where,
      orderBy: { createdAt: "desc" }
    });
  }
  async createTemplate(userId, name, type, content, variables, isPublic) {
    return prisma.template.create({
      data: {
        userId,
        name,
        type,
        content,
        variables,
        isPublic: isPublic || false
      }
    });
  }
  async updateTemplate(userId, id, data) {
    const existing = await prisma.template.findFirst({
      where: { id, userId }
    });
    if (!existing) throw new Error("Template not found");
    return prisma.template.update({
      where: { id },
      data
    });
  }
  async deleteTemplate(userId, id) {
    await prisma.template.delete({
      where: { id, userId }
    });
  }
  async applyTemplate(userId, templateId, targetId, variables) {
    const template = await prisma.template.findFirst({
      where: { id: templateId, userId }
    });
    if (!template) throw new Error("Template not found");
    let content = template.content;
    if (variables) {
      Object.keys(variables).forEach((key) => {
        content = JSON.parse(JSON.stringify(content).replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), variables[key]));
      });
    }
    return { template, content };
  }
  async getPublicTemplates(type) {
    const where = { isPublic: true };
    if (type) where.type = type;
    return prisma.template.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  }
}

const _id__delete = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) throw createError({ statusCode: 401, message: "Unauthorized" });
    const userId = getUserIdFromToken(token);
    if (!userId) throw createError({ statusCode: 401, message: "Invalid token" });
    const id = event.context.params?.id;
    if (!id) throw createError({ statusCode: 400, message: "Template ID required" });
    const service = new TemplateService();
    await service.deleteTemplate(userId, id);
    return { message: "Template deleted" };
  } catch (error) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message });
  }
});

const _id__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$2 = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) throw createError({ statusCode: 401, message: "Unauthorized" });
    const userId = getUserIdFromToken(token);
    if (!userId) throw createError({ statusCode: 401, message: "Invalid token" });
    const query = getQuery$1(event);
    const service = new TemplateService();
    const templates = await service.getTemplates(userId, query.type);
    return { data: templates };
  } catch (error) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message });
  }
});

const index_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_post = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) throw createError({ statusCode: 401, message: "Unauthorized" });
    const userId = getUserIdFromToken(token);
    if (!userId) throw createError({ statusCode: 401, message: "Invalid token" });
    const body = await readBody(event);
    const { name, type, content, variables, isPublic } = body;
    if (!name || !type || !content) {
      throw createError({ statusCode: 400, message: "Name, type, and content are required" });
    }
    const service = new TemplateService();
    const template = await service.createTemplate(userId, name, type, content, variables, isPublic);
    return { data: template, message: "Template created" };
  } catch (error) {
    throw createError({ statusCode: error.statusCode || 400, message: error.message });
  }
});

const index_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post
}, Symbol.toStringTag, { value: 'Module' }));

class TimeTrackingService {
  async startTimeEntry(userId, taskId, description) {
    const entry = await prisma.timeEntry.create({
      data: {
        userId,
        taskId,
        startTime: /* @__PURE__ */ new Date(),
        description
      },
      include: {
        task: true
      }
    });
    return entry;
  }
  async stopTimeEntry(userId, entryId) {
    const entry = await prisma.timeEntry.findFirst({
      where: {
        id: entryId,
        userId,
        endTime: null
      }
    });
    if (!entry) {
      throw new Error("Active time entry not found");
    }
    const endTime = /* @__PURE__ */ new Date();
    const duration = Math.floor((endTime.getTime() - entry.startTime.getTime()) / 1e3);
    const updated = await prisma.timeEntry.update({
      where: { id: entryId },
      data: {
        endTime,
        duration
      },
      include: {
        task: true
      }
    });
    await prisma.task.update({
      where: { id: entry.taskId },
      data: {
        actualTime: {
          increment: Math.floor(duration / 60)
        }
      }
    });
    return updated;
  }
  async getTimeEntries(userId, taskId) {
    const where = { userId };
    if (taskId) {
      where.taskId = taskId;
    }
    return prisma.timeEntry.findMany({
      where,
      include: {
        task: true
      },
      orderBy: {
        startTime: "desc"
      }
    });
  }
  async getActiveEntry(userId) {
    return prisma.timeEntry.findFirst({
      where: {
        userId,
        endTime: null
      },
      include: {
        task: true
      }
    });
  }
  async deleteTimeEntry(userId, entryId) {
    await prisma.timeEntry.delete({
      where: {
        id: entryId,
        userId
      }
    });
  }
  async getTotalTimeByTask(userId, taskId) {
    const entries = await prisma.timeEntry.findMany({
      where: {
        userId,
        taskId
      }
    });
    return entries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
  }
}

const active_get = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const service = new TimeTrackingService();
    const entry = await service.getActiveEntry(userId);
    return {
      data: entry
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to get active entry"
    });
  }
});

const active_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: active_get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const query = getQuery$1(event);
    const taskId = query.taskId;
    const service = new TimeTrackingService();
    const entries = await service.getTimeEntries(userId, taskId);
    return {
      data: entries
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to fetch time entries"
    });
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

const start_post = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const body = await readBody(event);
    const { taskId, description } = body;
    if (!taskId) {
      throw createError({
        statusCode: 400,
        message: "Task ID is required"
      });
    }
    const service = new TimeTrackingService();
    const activeEntry = await service.getActiveEntry(userId);
    if (activeEntry) {
      await service.stopTimeEntry(userId, activeEntry.id);
    }
    const entry = await service.startTimeEntry(userId, taskId, description);
    return {
      data: entry,
      message: "Time tracking started"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to start time tracking"
    });
  }
});

const start_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: start_post
}, Symbol.toStringTag, { value: 'Module' }));

const stop_post = defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, "authorization")?.replace("Bearer ", "");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized"
      });
    }
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Invalid token"
      });
    }
    const body = await readBody(event);
    const { entryId } = body;
    if (!entryId) {
      throw createError({
        statusCode: 400,
        message: "Entry ID is required"
      });
    }
    const service = new TimeTrackingService();
    const entry = await service.stopTimeEntry(userId, entryId);
    return {
      data: entry,
      message: "Time tracking stopped"
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: error.message || "Failed to stop time tracking"
    });
  }
});

const stop_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: stop_post
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
	return {
		body: stringify(splitPayload(ssrContext).payload, ssrContext["~payloadReducers"]) ,
		statusCode: getResponseStatus(ssrContext.event),
		statusMessage: getResponseStatusText(ssrContext.event),
		headers: {
			"content-type": "application/json;charset=utf-8" ,
			"x-powered-by": "Nuxt"
		}
	};
}
function renderPayloadJsonScript(opts) {
	const contents = opts.data ? stringify(opts.data, opts.ssrContext["~payloadReducers"]) : "";
	const payload = {
		"type": "application/json",
		"innerHTML": contents,
		"data-nuxt-data": appId,
		"data-ssr": !(opts.ssrContext.noSSR)
	};
	{
		payload.id = "__NUXT_DATA__";
	}
	if (opts.src) {
		payload["data-src"] = opts.src;
	}
	const config = uneval(opts.ssrContext.config);
	return [payload, { innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}` }];
}
function splitPayload(ssrContext) {
	const { data, prerenderedAt, ...initial } = ssrContext.payload;
	return {
		initial: {
			...initial,
			prerenderedAt
		},
		payload: {
			data,
			prerenderedAt
		}
	};
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__buildAssetsURL = buildAssetsURL;
// @ts-expect-error private property consumed by vite-generated url helpers
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const PAYLOAD_FILENAME = "_payload.json" ;
const renderer = defineRenderHandler(async (event) => {
	const nitroApp = useNitroApp();
	// Whether we're rendering an error page
	const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
	if (ssrError && !("__unenv__" in event.node.req)) {
		throw createError({
			status: 404,
			statusText: "Page Not Found: /__nuxt_error",
			message: "Page Not Found: /__nuxt_error"
		});
	}
	// Initialize ssr context
	const ssrContext = createSSRContext(event);
	// needed for hash hydration plugin to work
	const headEntryOptions = { mode: "server" };
	ssrContext.head.push(appHead, headEntryOptions);
	if (ssrError) {
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		const status = ssrError.status || ssrError.statusCode;
		if (status) {
			// eslint-disable-next-line @typescript-eslint/no-deprecated
			ssrError.status = ssrError.statusCode = Number.parseInt(status);
		}
		if (typeof ssrError.data === "string") {
			try {
				ssrError.data = destr(ssrError.data);
			} catch {}
		}
		setSSRError(ssrContext, ssrError);
	}
	// Get route options (for `ssr: false`, `isr`, `cache` and `noScripts`)
	const routeOptions = getRouteRules(event);
	// Whether we are prerendering route or using ISR/SWR caching
	const _PAYLOAD_EXTRACTION = !ssrContext.noSSR && (NUXT_RUNTIME_PAYLOAD_EXTRACTION);
	const isRenderingPayload = (_PAYLOAD_EXTRACTION || routeOptions.prerender) && PAYLOAD_URL_RE.test(ssrContext.url);
	if (isRenderingPayload) {
		const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
		ssrContext.url = url;
		event._path = event.node.req.url = url;
	}
	if (routeOptions.ssr === false) {
		ssrContext.noSSR = true;
	}
	const payloadURL = _PAYLOAD_EXTRACTION ? joinURL(ssrContext.runtimeConfig.app.cdnURL || ssrContext.runtimeConfig.app.baseURL, ssrContext.url.replace(/\?.*$/, ""), PAYLOAD_FILENAME) + "?" + ssrContext.runtimeConfig.app.buildId : undefined;
	// Render app
	const renderer = await getRenderer(ssrContext);
	const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
		// We use error to bypass full render if we have an early response we can make
		// TODO: remove _renderResponse in nuxt v5
		if ((ssrContext["~renderResponse"] || ssrContext._renderResponse) && error.message === "skipping render") {
			return {};
		}
		// Use explicitly thrown error in preference to subsequent rendering errors
		const _err = !ssrError && ssrContext.payload?.error || error;
		await ssrContext.nuxt?.hooks.callHook("app:error", _err);
		throw _err;
	});
	// Render inline styles
	// TODO: remove _renderResponse in nuxt v5
	const inlinedStyles = [];
	await ssrContext.nuxt?.hooks.callHook("app:rendered", {
		ssrContext,
		renderResult: _rendered
	});
	if (ssrContext["~renderResponse"] || ssrContext._renderResponse) {
		// TODO: remove _renderResponse in nuxt v5
		return ssrContext["~renderResponse"] || ssrContext._renderResponse;
	}
	// Handle errors
	if (ssrContext.payload?.error && !ssrError) {
		throw ssrContext.payload.error;
	}
	// Directly render payload routes
	if (isRenderingPayload) {
		const response = renderPayloadResponse(ssrContext);
		return response;
	}
	const NO_SCRIPTS = routeOptions.noScripts;
	// Setup head
	const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
	// 1. Preload payloads and app manifest
	if (_PAYLOAD_EXTRACTION && !NO_SCRIPTS) {
		ssrContext.head.push({ link: [{
			rel: "preload",
			as: "fetch",
			crossorigin: "anonymous",
			href: payloadURL
		} ] }, headEntryOptions);
	}
	if (ssrContext["~preloadManifest"] && !NO_SCRIPTS) {
		ssrContext.head.push({ link: [{
			rel: "preload",
			as: "fetch",
			fetchpriority: "low",
			crossorigin: "anonymous",
			href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`)
		}] }, {
			...headEntryOptions,
			tagPriority: "low"
		});
	}
	// 2. Styles
	if (inlinedStyles.length) {
		ssrContext.head.push({ style: inlinedStyles });
	}
	const link = [];
	for (const resource of Object.values(styles)) {
		// Do not add links to resources that are inlined (vite v5+)
		if ("inline" in getQuery(resource.file)) {
			continue;
		}
		// Add CSS links in <head> for CSS files
		// - in production
		// - in dev mode when not rendering an island
		link.push({
			rel: "stylesheet",
			href: renderer.rendererContext.buildAssetsURL(resource.file),
			crossorigin: ""
		});
	}
	if (link.length) {
		ssrContext.head.push({ link }, headEntryOptions);
	}
	if (!NO_SCRIPTS) {
		// 4. Resource Hints
		// Remove lazy hydrated modules from ssrContext.modules so they don't get preloaded
		// (CSS links are already added above, this only affects JS preloads)
		if (ssrContext["~lazyHydratedModules"]) {
			for (const id of ssrContext["~lazyHydratedModules"]) {
				ssrContext.modules?.delete(id);
			}
		}
		ssrContext.head.push({ link: getPreloadLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		ssrContext.head.push({ link: getPrefetchLinks(ssrContext, renderer.rendererContext) }, headEntryOptions);
		// 5. Payloads
		ssrContext.head.push({ script: _PAYLOAD_EXTRACTION ? renderPayloadJsonScript({
			ssrContext,
			data: splitPayload(ssrContext).initial,
			src: payloadURL
		})  : renderPayloadJsonScript({
			ssrContext,
			data: ssrContext.payload
		})  }, {
			...headEntryOptions,
			tagPosition: "bodyClose",
			tagPriority: "high"
		});
	}
	// 6. Scripts
	if (!routeOptions.noScripts) {
		const tagPosition = "head";
		ssrContext.head.push({ script: Object.values(scripts).map((resource) => ({
			type: resource.module ? "module" : null,
			src: renderer.rendererContext.buildAssetsURL(resource.file),
			defer: resource.module ? null : true,
			tagPosition,
			crossorigin: ""
		})) }, headEntryOptions);
	}
	const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
	// Create render context
	const htmlContext = {
		htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
		head: normalizeChunks([headTags]),
		bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
		bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
		body: [replaceIslandTeleports(ssrContext, _rendered.html) , APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG],
		bodyAppend: [bodyTags]
	};
	// Allow hooking into the rendered result
	await nitroApp.hooks.callHook("render:html", htmlContext, { event });
	// Construct HTML response
	return {
		body: renderHTMLDocument(htmlContext),
		statusCode: getResponseStatus(event),
		statusMessage: getResponseStatusText(event),
		headers: {
			"content-type": "text/html;charset=utf-8",
			"x-powered-by": "Nuxt"
		}
	};
});
function normalizeChunks(chunks) {
	const result = [];
	for (const _chunk of chunks) {
		const chunk = _chunk?.trim();
		if (chunk) {
			result.push(chunk);
		}
	}
	return result;
}
function joinTags(tags) {
	return tags.join("");
}
function joinAttrs(chunks) {
	if (chunks.length === 0) {
		return "";
	}
	return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
	return "<!DOCTYPE html>" + `<html${joinAttrs(html.htmlAttrs)}>` + `<head>${joinTags(html.head)}</head>` + `<body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>` + "</html>";
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
