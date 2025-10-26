/**
 * Windows Sandbox Configuration types and schemas
 */

import * as z from "zod";

/**
 * Enable or Disable state schema
 */
export const EnableStateSchema: z.ZodEnum<["Enable", "Disable", "Default"]> = z.enum(["Enable", "Disable", "Default"]);
export type EnableState = z.infer<typeof EnableStateSchema>;

/**
 * Read-only state for mapped folders schema
 * Accepts both string ("true"/"false") and boolean values
 */
export const ReadOnlyStateSchema: z.ZodEffects<z.ZodUnion<[z.ZodEnum<["true", "false"]>, z.ZodBoolean]>, "true" | "false", string | boolean> = z.union([
  z.enum(["true", "false"]),
  z.boolean(),
]).transform((val) => {
  // Normalize to string for consistency
  if (typeof val === "boolean") {
    return val ? "true" as const : "false" as const;
  }
  return val;
});
export type ReadOnlyState = "true" | "false";

/**
 * Mapped folder configuration schema
 */
export const MappedFolderSchema: z.ZodObject<{
  HostFolder: z.ZodString;
  SandboxFolder: z.ZodOptional<z.ZodString>;
  ReadOnly: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodEnum<["true", "false"]>, z.ZodBoolean]>, "true" | "false", string | boolean>>;
}> = z.object({
  /** Host folder path */
  HostFolder: z.string(),
  /** Sandbox folder path (optional) */
  SandboxFolder: z.string().optional(),
  /** Read-only flag */
  ReadOnly: ReadOnlyStateSchema.optional(),
});
export type MappedFolder = z.infer<typeof MappedFolderSchema>;

/**
 * Logon command configuration schema
 */
export const LogonCommandSchema: z.ZodObject<{
  Command: z.ZodString;
}> = z.object({
  /** Command to execute */
  Command: z.string(),
});
export type LogonCommand = z.infer<typeof LogonCommandSchema>;

/**
 * Windows Sandbox Configuration schema
 */
export const WsbConfigurationSchema: z.ZodObject<{
  VGpu: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
  Networking: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
  MappedFolders: z.ZodOptional<z.ZodObject<{
    MappedFolder: z.ZodUnion<[
      z.ZodObject<{
        HostFolder: z.ZodString;
        SandboxFolder: z.ZodOptional<z.ZodString>;
        ReadOnly: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodEnum<["true", "false"]>, z.ZodBoolean]>, "true" | "false", string | boolean>>;
      }>,
      z.ZodArray<z.ZodObject<{
        HostFolder: z.ZodString;
        SandboxFolder: z.ZodOptional<z.ZodString>;
        ReadOnly: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodEnum<["true", "false"]>, z.ZodBoolean]>, "true" | "false", string | boolean>>;
      }>>
    ]>;
  }>>;
  LogonCommand: z.ZodOptional<z.ZodObject<{
    Command: z.ZodString;
  }>>;
  AudioInput: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
  VideoInput: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
  ProtectedClient: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
  PrinterRedirection: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
  ClipboardRedirection: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
  MemoryInMB: z.ZodOptional<z.ZodNumber>;
}> = z.object({
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
export type WsbConfiguration = z.infer<typeof WsbConfigurationSchema>;

/**
 * Root configuration structure schema
 */
export const ConfigurationSchema: z.ZodObject<{
  Configuration: z.ZodObject<{
    VGpu: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
    Networking: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
    MappedFolders: z.ZodOptional<z.ZodObject<{
      MappedFolder: z.ZodUnion<[
        z.ZodObject<{
          HostFolder: z.ZodString;
          SandboxFolder: z.ZodOptional<z.ZodString>;
          ReadOnly: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodEnum<["true", "false"]>, z.ZodBoolean]>, "true" | "false", string | boolean>>;
        }>,
        z.ZodArray<z.ZodObject<{
          HostFolder: z.ZodString;
          SandboxFolder: z.ZodOptional<z.ZodString>;
          ReadOnly: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodEnum<["true", "false"]>, z.ZodBoolean]>, "true" | "false", string | boolean>>;
        }>>
      ]>;
    }>>;
    LogonCommand: z.ZodOptional<z.ZodObject<{
      Command: z.ZodString;
    }>>;
    AudioInput: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
    VideoInput: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
    ProtectedClient: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
    PrinterRedirection: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
    ClipboardRedirection: z.ZodOptional<z.ZodEnum<["Enable", "Disable", "Default"]>>;
    MemoryInMB: z.ZodOptional<z.ZodNumber>;
  }>;
}> = z.object({
  Configuration: WsbConfigurationSchema,
});
export type Configuration = z.infer<typeof ConfigurationSchema>;
