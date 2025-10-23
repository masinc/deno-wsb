# Windows Sandbox Configuration File Specification

This document describes the WSB (Windows Sandbox) configuration file format.

## Overview

Windows Sandbox configuration files use XML format with `.wsb` extension. These files allow customization of Windows Sandbox instances with various settings for virtualization, networking, shared folders, and startup commands.

## File Format

- **Format**: XML 1.0
- **Encoding**: UTF-8
- **Extension**: `.wsb`
- **Root Element**: `<Configuration>`

## XML Structure

```xml
<?xml version="1.0" encoding="utf-8"?>
<Configuration>
  <!-- Configuration elements -->
</Configuration>
```

## Configuration Elements

### VGpu

Controls GPU virtualization for the sandbox.

- **Type**: String
- **Values**: `Enable` | `Disable` | `Default`
- **Default**: `Default`
- **Optional**: Yes

**Example**:
```xml
<VGpu>Enable</VGpu>
```

**Description**:
- `Enable`: Enables GPU virtualization (requires compatible GPU)
- `Disable`: Disables GPU virtualization (software rendering only)
- `Default`: Uses Windows default behavior

---

### Networking

Controls network access for the sandbox.

- **Type**: String
- **Values**: `Enable` | `Disable` | `Default`
- **Default**: `Enable`
- **Optional**: Yes

**Example**:
```xml
<Networking>Disable</Networking>
```

**Description**:
- `Enable`: Sandbox has network access
- `Disable`: Sandbox is isolated from network
- `Default`: Uses Windows default behavior (typically enabled)

---

### MappedFolders

Defines shared folders between the host and sandbox.

- **Type**: Container element
- **Optional**: Yes
- **Child Elements**: One or more `<MappedFolder>` elements

**Example (Single Folder)**:
```xml
<MappedFolders>
  <MappedFolder>
    <HostFolder>C:\Users\Public</HostFolder>
    <ReadOnly>true</ReadOnly>
  </MappedFolder>
</MappedFolders>
```

**Example (Multiple Folders)**:
```xml
<MappedFolders>
  <MappedFolder>
    <HostFolder>C:\Projects</HostFolder>
    <SandboxFolder>C:\Workspace</SandboxFolder>
    <ReadOnly>true</ReadOnly>
  </MappedFolder>
  <MappedFolder>
    <HostFolder>C:\Temp</HostFolder>
    <ReadOnly>false</ReadOnly>
  </MappedFolder>
</MappedFolders>
```

#### MappedFolder

Defines a single shared folder mapping.

**Child Elements**:

##### HostFolder

- **Type**: String
- **Required**: Yes
- **Description**: Absolute path to the folder on the host machine
- **Example**: `C:\Users\Public\Downloads`

##### SandboxFolder

- **Type**: String
- **Optional**: Yes
- **Description**: Path where the folder appears in the sandbox. If not specified, the folder appears at the same path as on the host.
- **Example**: `C:\Workspace`

##### ReadOnly

- **Type**: Boolean String
- **Values**: `true` | `false`
- **Default**: `false`
- **Optional**: Yes
- **Description**: Controls write access to the shared folder
  - `true`: Read-only access
  - `false`: Read-write access

---

### LogonCommand

Specifies a command to execute when the sandbox starts.

- **Type**: Container element
- **Optional**: Yes
- **Child Elements**: `<Command>`

**Example**:
```xml
<LogonCommand>
  <Command>explorer.exe C:\Users\WDAGUtilityAccount\Desktop</Command>
</LogonCommand>
```

#### Command

- **Type**: String
- **Required**: Yes (if LogonCommand is present)
- **Description**: Command line to execute on sandbox startup
- **Notes**: Runs as the sandbox user (WDAGUtilityAccount)

**Common Examples**:
```xml
<!-- Open a specific folder -->
<Command>explorer.exe C:\Workspace</Command>

<!-- Run a batch script -->
<Command>C:\Scripts\setup.bat</Command>

<!-- Open a URL in browser -->
<Command>cmd.exe /c start https://example.com</Command>
```

---

### AudioInput

Controls microphone access for the sandbox.

- **Type**: String
- **Values**: `Enable` | `Disable` | `Default`
- **Default**: `Disable`
- **Optional**: Yes
- **Minimum Windows Version**: Windows 10 build 19041 (2004)

**Example**:
```xml
<AudioInput>Enable</AudioInput>
```

---

### VideoInput

Controls webcam access for the sandbox.

- **Type**: String
- **Values**: `Enable` | `Disable` | `Default`
- **Default**: `Disable`
- **Optional**: Yes
- **Minimum Windows Version**: Windows 10 build 19041 (2004)

**Example**:
```xml
<VideoInput>Enable</VideoInput>
```

---

### ProtectedClient

Controls protected client mode for the sandbox.

- **Type**: String
- **Values**: `Enable` | `Disable` | `Default`
- **Default**: `Disable`
- **Optional**: Yes
- **Minimum Windows Version**: Windows 10 build 19041 (2004)

**Example**:
```xml
<ProtectedClient>Enable</ProtectedClient>
```

**Description**:
When enabled, provides additional security protections but may impact compatibility with some applications.

---

### PrinterRedirection

Controls printer access for the sandbox.

- **Type**: String
- **Values**: `Enable` | `Disable` | `Default`
- **Default**: `Disable`
- **Optional**: Yes
- **Minimum Windows Version**: Windows 10 build 19041 (2004)

**Example**:
```xml
<PrinterRedirection>Enable</PrinterRedirection>
```

---

### ClipboardRedirection

Controls clipboard sharing between host and sandbox.

- **Type**: String
- **Values**: `Enable` | `Disable` | `Default`
- **Default**: `Enable`
- **Optional**: Yes
- **Minimum Windows Version**: Windows 10 build 19041 (2004)

**Example**:
```xml
<ClipboardRedirection>Disable</ClipboardRedirection>
```

**Description**:
- `Enable`: Clipboard content can be shared between host and sandbox
- `Disable`: Clipboard is isolated
- `Default`: Uses Windows default behavior (typically enabled)

---

### MemoryInMB

Controls the amount of memory allocated to the sandbox.

- **Type**: Integer
- **Unit**: Megabytes (MB)
- **Optional**: Yes
- **Default**: Calculated based on host available memory
- **Minimum Windows Version**: Windows 10 build 19041 (2004)

**Example**:
```xml
<MemoryInMB>4096</MemoryInMB>
```

**Notes**:
- If not specified, Windows automatically calculates appropriate memory allocation
- Specifying too little memory may cause performance issues
- Cannot exceed available host memory

---

## Complete Example

```xml
<?xml version="1.0" encoding="utf-8"?>
<Configuration>
  <VGpu>Enable</VGpu>
  <Networking>Enable</Networking>
  <AudioInput>Enable</AudioInput>
  <VideoInput>Disable</VideoInput>
  <ProtectedClient>Enable</ProtectedClient>
  <PrinterRedirection>Enable</PrinterRedirection>
  <ClipboardRedirection>Enable</ClipboardRedirection>
  <MemoryInMB>4096</MemoryInMB>

  <MappedFolders>
    <MappedFolder>
      <HostFolder>C:\Users\Public\Downloads</HostFolder>
      <SandboxFolder>C:\Downloads</SandboxFolder>
      <ReadOnly>false</ReadOnly>
    </MappedFolder>
    <MappedFolder>
      <HostFolder>C:\Projects</HostFolder>
      <ReadOnly>true</ReadOnly>
    </MappedFolder>
  </MappedFolders>

  <LogonCommand>
    <Command>cmd.exe /c start https://example.com</Command>
  </LogonCommand>
</Configuration>
```

## Usage

1. Create a text file with `.wsb` extension
2. Add XML configuration as described above
3. Double-click the `.wsb` file to launch Windows Sandbox with the specified configuration

## System Requirements

- **Windows 10 Pro/Enterprise**: Build 18305 or later
- **Windows 11**: All editions (Pro, Enterprise, Education)
- **Hardware**:
  - Virtualization enabled in BIOS
  - At least 4GB RAM (8GB recommended)
  - At least 1GB free disk space
  - 2 CPU cores (4 recommended)

## References

- [Official Microsoft Documentation](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-sandbox/windows-sandbox-configure-using-wsb-file)
- [Windows Sandbox Overview](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-sandbox/windows-sandbox-overview)

## Version History

| Windows Build | New Features |
|--------------|--------------|
| 18305 | Initial WSB support (VGpu, Networking, MappedFolders, LogonCommand) |
| 19041 (2004) | AudioInput, VideoInput, ProtectedClient, PrinterRedirection, ClipboardRedirection, MemoryInMB |

## Notes

- All configuration elements are optional
- Case-sensitive XML element names
- Boolean values use string format: `"true"` or `"false"`
- Paths must be absolute
- Host folders must exist before launching sandbox
- Changes to `.wsb` file require relaunching the sandbox to take effect
