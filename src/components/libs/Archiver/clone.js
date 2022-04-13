"use strict";

var getPrototypeof =
  Object.getPrototypeof ||
  function (obj) {
    return obj.__proto__;
  };

export function clone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  if (obj instanceof Object) {
    var copy = { __proto__: getPrototypeof(obj) };
  } else {
    var copy = Object.create(null);
  }

  Object.getOwnPropertyNames(obj).forEach(function (key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
  });

  return copy;
}
