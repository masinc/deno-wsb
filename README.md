# deno-wsb

Windows Sandbox (WSB) configuration file parser and serializer for Deno and Node.js.

## Features

- 🔄 Parse WSB XML files to JavaScript objects
- 📝 Serialize JavaScript objects to WSB XML
- ✅ Type-safe with TypeScript and Zod validation
- 🚀 Works with both Deno and Node.js (via JSR)
- 🧪 Well-tested with comprehensive test coverage

## Installation

### Deno

```bash
deno add @masinc/wsb
```

### Node.js

```bash
npx jsr add @masinc/wsb
```

## Usage

### Parsing WSB Files

```typescript
import { parse } from "@masinc/wsb";

const xml = `<?xml version="1.0" encoding="utf-8"?>
<Configuration>
  <VGpu>Enable</VGpu>
  <Networking>Enable</Networking>
  <MemoryInMB>4096</MemoryInMB>
  <MappedFolders>
    <MappedFolder>
      <HostFolder>C:\\Users\\Public</HostFolder>
      <ReadOnly>true</ReadOnly>
    </MappedFolder>
  </MappedFolders>
</Configuration>`;

const config = parse(xml);
console.log(config.Configuration.MemoryInMB); // 4096
```

### Serializing to WSB Files

```typescript
import { serialize, type Configuration } from "@masinc/wsb";

const config: Configuration = {
  Configuration: {
    VGpu: "Enable",
    Networking: "Enable",
    MemoryInMB: 4096,
    MappedFolders: {
      MappedFolder: {
        HostFolder: "C:\\Users\\Public",
        ReadOnly: "true",
      },
    },
  },
};

const xml = serialize(config);
console.log(xml);
```

### Type Definitions

The library exports TypeScript types and Zod schemas:

```typescript
import type {
  Configuration,
  WsbConfiguration,
  MappedFolder,
  LogonCommand,
  EnableState,
  ReadOnlyState,
} from "@masinc/wsb";

import {
  ConfigurationSchema,
  WsbConfigurationSchema,
  MappedFolderSchema,
  EnableStateSchema,
} from "@masinc/wsb";
```

## Configuration Options

### WsbConfiguration

- `VGpu` - Enable/Disable GPU virtualization
- `Networking` - Enable/Disable networking
- `AudioInput` - Enable/Disable audio input
- `VideoInput` - Enable/Disable video input
- `ProtectedClient` - Enable/Disable protected client mode
- `PrinterRedirection` - Enable/Disable printer redirection
- `ClipboardRedirection` - Enable/Disable clipboard redirection
- `MemoryInMB` - Memory allocation in MB
- `MappedFolders` - Shared folders between host and sandbox
- `LogonCommand` - Command to execute on sandbox startup

## Development

### Running Tests

```bash
deno test
```

### Type Checking

```bash
deno check src/mod.ts
```

## License

MIT
