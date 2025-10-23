/**
 * Windows Sandbox (WSB) configuration file parser and serializer
 *
 * @module
 *
 * @example
 * ```ts
 * import { parse, serialize } from "@masinc/deno-wsb";
 *
 * // Parse WSB XML
 * const xml = `<?xml version="1.0" encoding="utf-8"?>
 * <Configuration>
 *   <VGpu>Enable</VGpu>
 *   <Networking>Enable</Networking>
 *   <MemoryInMB>4096</MemoryInMB>
 * </Configuration>`;
 *
 * const config = parse(xml);
 * console.log(config.Configuration.MemoryInMB); // 4096
 *
 * // Serialize to WSB XML
 * const output = serialize(config);
 * console.log(output);
 * ```
 */

export { parse } from "./parser.ts";
export { serialize } from "./serializer.ts";
export type {
  Configuration,
  EnableState,
  LogonCommand,
  MappedFolder,
  ReadOnlyState,
  WsbConfiguration,
} from "./types.ts";
