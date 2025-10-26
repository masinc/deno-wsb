/**
 * Internal Zod schemas for validation
 * This file is not part of the public API
 */

import * as z from "zod";

/**
 * Enable or Disable state schema
 */
export const EnableStateSchema = z.enum(["Enable", "Disable", "Default"]);

/**
 * Read-only state for mapped folders schema
 * Accepts both string ("true"/"false") and boolean values
 */
export const ReadOnlyStateSchema = z.union([
  z.enum(["true", "false"]),
  z.boolean(),
]).transform((val) => {
  // Normalize to string for consistency
  if (typeof val === "boolean") {
    return val ? "true" as const : "false" as const;
  }
  return val;
});

/**
 * Mapped folder configuration schema
 */
export const MappedFolderSchema = z.object({
  /** Host folder path */
  HostFolder: z.string(),
  /** Sandbox folder path (optional) */
  SandboxFolder: z.string().optional(),
  /** Read-only flag */
  ReadOnly: ReadOnlyStateSchema.optional(),
});

/**
 * Logon command configuration schema
 */
export const LogonCommandSchema = z.object({
  /** Command to execute */
  Command: z.string(),
});

/**
 * Windows Sandbox Configuration schema
 */
export const WsbConfigurationSchema = z.object({
  /** Enable or disable GPU virtualization */
  VGpu: EnableStateSchema.optional(),
  /** Enable or disable networking */
  Networking: EnableStateSchema.optional(),
  /** Mapped folders between host and sandbox */
  MappedFolders: z.object({
    MappedFolder: z.union([
      MappedFolderSchema,
      z.array(MappedFolderSchema),
    ]),
  }).optional(),
  /** Logon command to execute on sandbox startup */
  LogonCommand: LogonCommandSchema.optional(),
  /** Enable or disable audio input */
  AudioInput: EnableStateSchema.optional(),
  /** Enable or disable video input */
  VideoInput: EnableStateSchema.optional(),
  /** Enable or disable protected client mode */
  ProtectedClient: EnableStateSchema.optional(),
  /** Enable or disable printer redirection */
  PrinterRedirection: EnableStateSchema.optional(),
  /** Enable or disable clipboard redirection */
  ClipboardRedirection: EnableStateSchema.optional(),
  /** Memory allocation in MB */
  MemoryInMB: z.number().int().positive().optional(),
});

/**
 * Root configuration structure schema
 */
export const ConfigurationSchema = z.object({
  Configuration: WsbConfigurationSchema,
});
