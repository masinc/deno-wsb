import { parse, serialize, type Configuration } from "./src/mod.ts";

// Example 1: Parse a WSB file
const wsbXml = `<?xml version="1.0" encoding="utf-8"?>
<Configuration>
  <VGpu>Enable</VGpu>
  <Networking>Enable</Networking>
  <MemoryInMB>4096</MemoryInMB>
  <MappedFolders>
    <MappedFolder>
      <HostFolder>C:\\Users\\Public\\Downloads</HostFolder>
      <ReadOnly>false</ReadOnly>
    </MappedFolder>
  </MappedFolders>
  <LogonCommand>
    <Command>explorer.exe C:\\Users\\WDAGUtilityAccount\\Desktop</Command>
  </LogonCommand>
</Configuration>`;

console.log("=== Parsing WSB XML ===");
const parsed = parse(wsbXml);
console.log(JSON.stringify(parsed, null, 2));

console.log("\n=== Creating Configuration from Scratch ===");
const config: Configuration = {
  Configuration: {
    VGpu: "Enable",
    Networking: "Disable",
    MemoryInMB: 8192,
    AudioInput: "Enable",
    VideoInput: "Disable",
    MappedFolders: {
      MappedFolder: [
        {
          HostFolder: "C:\\Projects",
          ReadOnly: "true",
        },
        {
          HostFolder: "C:\\Temp",
          SandboxFolder: "C:\\Workspace",
          ReadOnly: "false",
        },
      ],
    },
    LogonCommand: {
      Command: "cmd.exe /c start https://example.com",
    },
  },
};

console.log("\n=== Serializing to WSB XML ===");
const xml = serialize(config);
console.log(xml);

console.log("\n=== Round-trip Test ===");
const reparsed = parse(xml);
console.log("Round-trip successful:", JSON.stringify(config) === JSON.stringify(reparsed));
