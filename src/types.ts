/**
 * Windows Sandbox Configuration types
 */

/**
 * Enable, Disable, or Default state
 */
export type EnableState = "Enable" | "Disable" | "Default";

/**
 * Read-only state for mapped folders
 */
export type ReadOnlyState = "true" | "false";

/**
 * Mapped folder configuration
 */
export type MappedFolder = {
  /** Host folder path */
  HostFolder: string;
  /** Sandbox folder path (optional) */
  SandboxFolder?: string;
  /** Read-only flag */
  ReadOnly?: ReadOnlyState;
};

/**
 * Logon command configuration
 */
export type LogonCommand = {
  /** Command to execute */
  Command: string;
};

/**
 * Windows Sandbox Configuration
 */
export type WsbConfiguration = {
  /** Enable or disable GPU virtualization */
  VGpu?: EnableState;
  /** Enable or disable networking */
  Networking?: EnableState;
  /** Mapped folders between host and sandbox */
  MappedFolders?: {
    MappedFolder: MappedFolder | MappedFolder[];
  };
  /** Logon command to execute on sandbox startup */
  LogonCommand?: LogonCommand;
  /** Enable or disable audio input */
  AudioInput?: EnableState;
  /** Enable or disable video input */
  VideoInput?: EnableState;
  /** Enable or disable protected client mode */
  ProtectedClient?: EnableState;
  /** Enable or disable printer redirection */
  PrinterRedirection?: EnableState;
  /** Enable or disable clipboard redirection */
  ClipboardRedirection?: EnableState;
  /** Memory allocation in MB */
  MemoryInMB?: number;
};

/**
 * Root configuration structure
 */
export type Configuration = {
  Configuration: WsbConfiguration;
};
