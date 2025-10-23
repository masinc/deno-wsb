import { assertEquals } from "@std/assert";
import { parse } from "./parser.ts";
import type { Configuration } from "./types.ts";

Deno.test("parse - simple configuration", () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<Configuration>
  <VGpu>Enable</VGpu>
  <Networking>Disable</Networking>
  <MemoryInMB>4096</MemoryInMB>
</Configuration>`;

  const result = parse(xml);

  const expected: Configuration = {
    Configuration: {
      VGpu: "Enable",
      Networking: "Disable",
      MemoryInMB: 4096,
    },
  };

  assertEquals(result, expected);
});

Deno.test("parse - with single mapped folder", () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<Configuration>
  <MappedFolders>
    <MappedFolder>
      <HostFolder>C:\\Users\\Public</HostFolder>
      <ReadOnly>true</ReadOnly>
    </MappedFolder>
  </MappedFolders>
</Configuration>`;

  const result = parse(xml);

  const expected: Configuration = {
    Configuration: {
      MappedFolders: {
        MappedFolder: {
          HostFolder: "C:\\Users\\Public",
          ReadOnly: "true",
        },
      },
    },
  };

  assertEquals(result, expected);
});

Deno.test("parse - with multiple mapped folders", () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<Configuration>
  <MappedFolders>
    <MappedFolder>
      <HostFolder>C:\\Users\\Public</HostFolder>
      <ReadOnly>true</ReadOnly>
    </MappedFolder>
    <MappedFolder>
      <HostFolder>C:\\Temp</HostFolder>
      <SandboxFolder>C:\\Workspace</SandboxFolder>
      <ReadOnly>false</ReadOnly>
    </MappedFolder>
  </MappedFolders>
</Configuration>`;

  const result = parse(xml);

  const expected: Configuration = {
    Configuration: {
      MappedFolders: {
        MappedFolder: [
          {
            HostFolder: "C:\\Users\\Public",
            ReadOnly: "true",
          },
          {
            HostFolder: "C:\\Temp",
            SandboxFolder: "C:\\Workspace",
            ReadOnly: "false",
          },
        ],
      },
    },
  };

  assertEquals(result, expected);
});

Deno.test("parse - with logon command", () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<Configuration>
  <LogonCommand>
    <Command>explorer.exe C:\\</Command>
  </LogonCommand>
</Configuration>`;

  const result = parse(xml);

  const expected: Configuration = {
    Configuration: {
      LogonCommand: {
        Command: "explorer.exe C:\\",
      },
    },
  };

  assertEquals(result, expected);
});

Deno.test("parse - full configuration", () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
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
      <HostFolder>C:\\Users\\Public</HostFolder>
      <ReadOnly>true</ReadOnly>
    </MappedFolder>
  </MappedFolders>
  <LogonCommand>
    <Command>cmd.exe /c start https://example.com</Command>
  </LogonCommand>
</Configuration>`;

  const result = parse(xml);

  const expected: Configuration = {
    Configuration: {
      VGpu: "Enable",
      Networking: "Enable",
      AudioInput: "Enable",
      VideoInput: "Disable",
      ProtectedClient: "Enable",
      PrinterRedirection: "Enable",
      ClipboardRedirection: "Enable",
      MemoryInMB: 4096,
      MappedFolders: {
        MappedFolder: {
          HostFolder: "C:\\Users\\Public",
          ReadOnly: "true",
        },
      },
      LogonCommand: {
        Command: "cmd.exe /c start https://example.com",
      },
    },
  };

  assertEquals(result, expected);
});
