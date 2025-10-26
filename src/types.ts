/**
 * Windows Sandbox Configuration types and schemas
 */

import * as z from "zod";

/**
 * Enable or Disable state schema
 */
const _EnableStateSchema = z.enum(["Enable", "Disable", "Default"]);
export const EnableStateSchema: typeof _EnableStateSchema = _EnableStateSchema;
export type EnableState = z.infer<typeof EnableStateSchema>;

/**
 * Read-only state for mapped folders schema
 * Accepts both string ("true"/"false") and boolean values
 */
const _ReadOnlyStateSchema = z.union([
  z.enum(["true", "false"]),
  z.boolean(),
]).transform((val) => {
  // Normalize to string for consistency
  if (typeof val === "boolean") {
    return val ? "true" as const : "false" as const;
  }
  return val;
});
export const ReadOnlyStateSchema: typeof _ReadOnlyStateSchema = _ReadOnlyStateSchema;
export type ReadOnlyState = "true" | "false";

/**
 * Mapped folder configuration schema
 */
const _MappedFolderSchema = z.object({
  /** Host folder path */
  HostFolder: z.string(),
  /** Sandbox folder path (optional) */
  SandboxFolder: z.string().optional(),
  /** Read-only flag */
  ReadOnly: _ReadOnlyStateSchema.optional(),
});
export const MappedFolderSchema: typeof _MappedFolderSchema = _MappedFolderSchema;
export type MappedFolder = z.infer<typeof MappedFolderSchema>;

/**
 * Logon command configuration schema
 */
const _LogonCommandSchema = z.object({
  /** Command to execute */
  Command: z.string(),
});
export const LogonCommandSchema: typeof _LogonCommandSchema = _LogonCommandSchema;
export type LogonCommand = z.infer<typeof LogonCommandSchema>;

/**
 * Windows Sandbox Configuration schema
 */
const _WsbConfigurationSchema = z.object({
  /** Enable or disable GPU virtualization */
  VGpu: _EnableStateSchema.optional(),
  /** Enable or disable networking */
  Networking: _EnableStateSchema.optional(),
  /** Mapped folders between host and sandbox */
  MappedFolders: z.object({
    MappedFolder: z.union([
      _MappedFolderSchema,
      z.array(_MappedFolderSchema),
    ]),
  }).optional(),
  /** Logon command to execute on sandbox startup */
  LogonCommand: _LogonCommandSchema.optional(),
  /** Enable or disable audio input */
  AudioInput: _EnableStateSchema.optional(),
  /** Enable or disable video input */
  VideoInput: _EnableStateSchema.optional(),
  /** Enable or disable protected client mode */
  ProtectedClient: _EnableStateSchema.optional(),
  /** Enable or disable printer redirection */
  PrinterRedirection: _EnableStateSchema.optional(),
  /** Enable or disable clipboard redirection */
  ClipboardRedirection: _EnableStateSchema.optional(),
  /** Memory allocation in MB */
  MemoryInMB: z.number().int().positive().optional(),
});
export const WsbConfigurationSchema: typeof _WsbConfigurationSchema = _WsbConfigurationSchema;
export type WsbConfiguration = z.infer<typeof WsbConfigurationSchema>;

/**
 * Root configuration structure schema
 */
const _ConfigurationSchema = z.object({
  Configuration: _WsbConfigurationSchema,
});
export const ConfigurationSchema: typeof _ConfigurationSchema = _ConfigurationSchema;
export type Configuration = z.infer<typeof ConfigurationSchema>;
