/**
 * WSB file parser (XML to JavaScript object)
 */

import { XMLParser } from "fast-xml-parser";
import { ConfigurationSchema, type Configuration } from "./types.ts";

/**
 * Parse WSB XML string to Configuration object
 * @param xml WSB XML string
 * @returns Parsed and validated Configuration object
 * @throws {Error} If XML is invalid or doesn't match the expected schema
 */
export function parse(xml: string): Configuration {
  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
    numberParseOptions: {
      leadingZeros: false,
      hex: false,
    },
  });

  const parsed = parser.parse(xml);

  // Validate with zod schema
  const result = ConfigurationSchema.safeParse(parsed);

  if (!result.success) {
    throw new Error(`Invalid WSB configuration: ${result.error.message}`);
  }

  return result.data;
}
