/**
 *   Archiver core
 *   @ignore
 *   @license [MIT]
 *   @copyright (c) 2022
 */

import fs from "fs";
import glob from "readdir-glob";
import async from "async";
import path from "path";
import util from "archiver-utils";

import ArchiverError from "./error";
import { Transform } from "readable-stream";

var win32 = process.platform === "win32";

/**
 * @constructor
 * @param {String} format The archive format to use.
 * @param {(CoreOptions|TransformOptions)} options See also {@link ZipOptions} and {@link TarOptions}.
 */

var Archiver = function (format, options) {
  if (!(this instanceof Archiver)) {
    return new Archiver(format, options);
  }

  if (typeof format !== "string") {
    options = format;
    format = "zip";
  }

  options = this.options = util.defaults(options, {
    highWaterMark: 1024 * 1024,
    statConcurrency: 4,
  });
};
