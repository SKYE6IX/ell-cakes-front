import {
  TransformStream,
  ReadableStream,
  WritableStream,
} from "node:stream/web";

global.TransformStream = TransformStream;
global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;
