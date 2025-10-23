import { assertEquals } from "@std/assert";
import { parse } from "../src/parser.ts";
import { serialize } from "../src/serializer.ts";

Deno.test("roundtrip - simple configuration", () => {
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<Configuration>
  <VGpu>Enable</VGpu>
  <Networking>Disable</Networking>
  <MemoryInMB>4096</MemoryInMB>
</Configuration>`;

  const parsed = parse(xml);
  const serialized = serialize(parsed);
  const reparsed = parse(serialized);

  assertEquals(parsed, reparsed);
});

Deno.test("roundtrip - full configuration", () => {
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

  const parsed = parse(xml);
  const serialized = serialize(parsed);
  const reparsed = parse(serialized);

  assertEquals(parsed, reparsed);
});

Deno.test("roundtrip - multiple mapped folders", () => {
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

  const parsed = parse(xml);
  const serialized = serialize(parsed);
  const reparsed = parse(serialized);

  assertEquals(parsed, reparsed);
});
