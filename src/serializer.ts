/**
 * WSB file serializer (JavaScript object to XML)
 */

import { XMLBuilder } from "fast-xml-parser";
import { ConfigurationSchema, type Configuration } from "./types.ts";

/**
 * Serialize Configuration object to WSB XML string
 * @param config Configuration object
 * @returns WSB XML string
 * @throws {Error} If config doesn't match the expected schema
 */
export function serialize(config: Configuration): string {
  // Validate with zod schema before serializing
  const result = ConfigurationSchema.safeParse(config);

  if (!result.success) {
    throw new Error(`Invalid WSB configuration: ${result.error.message}`);
  }

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    indentBy: "  ",
    suppressEmptyNode: true,
  });

  const xmlDeclaration = '<?xml version="1.0" encoding="utf-8"?>';
  const xmlBody = builder.build(result.data);

  return `${xmlDeclaration}\n${xmlBody}`;
}
