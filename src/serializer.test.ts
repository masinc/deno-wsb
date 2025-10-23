/**
 * Unit tests for serializer
 */

import { assertEquals, assertStringIncludes, assertThrows } from "@std/assert";
import { serialize } from "./serializer.ts";
import type { Configuration } from "./types.ts";

Deno.test("serialize - simple configuration", () => {
  const config: Configuration = {
    Configuration: {
      VGpu: "Disable",
      Networking: "Default",
      MemoryInMB: 4096,
    },
  };

  const xml = serialize(config);

  // Check XML declaration
  assertStringIncludes(xml, '<?xml version="1.0" encoding="utf-8"?>');

  // Check basic elements
  assertStringIncludes(xml, "<Configuration>");
  assertStringIncludes(xml, "<VGpu>Disable</VGpu>");
  assertStringIncludes(xml, "<Networking>Default</Networking>");
  assertStringIncludes(xml, "<MemoryInMB>4096</MemoryInMB>");
  assertStringIncludes(xml, "</Configuration>");
});

Deno.test("serialize - configuration with MappedFolder", () => {
  const config: Configuration = {
    Configuration: {
      VGpu: "Disable",
      Networking: "Default",
      MappedFolders: {
        MappedFolder: {
          HostFolder: "C:\\Users\\test",
          ReadOnly: "true",
        },
      },
    },
  };

  const xml = serialize(config);

  // Check MappedFolder serialization
  assertStringIncludes(xml, "<ReadOnly>true</ReadOnly>");
  assertStringIncludes(xml, "<HostFolder>C:\\Users\\test</HostFolder>");
});

Deno.test("serialize - configuration with array", () => {
  const config: Configuration = {
    Configuration: {
      VGpu: "Disable",
      Networking: "Default",
      MappedFolders: {
        MappedFolder: [
          {
            HostFolder: "C:\\Folder1",
            ReadOnly: "true",
          },
          {
            HostFolder: "C:\\Folder2",
            ReadOnly: "false",
          },
        ],
      },
    },
  };

  const xml = serialize(config);

  // Check multiple MappedFolder elements
  assertStringIncludes(xml, "C:\\Folder1");
  assertStringIncludes(xml, "C:\\Folder2");
  assertStringIncludes(xml, "<ReadOnly>true</ReadOnly>");
  assertStringIncludes(xml, "<ReadOnly>false</ReadOnly>");
});

Deno.test("serialize - full configuration", () => {
  const config: Configuration = {
    Configuration: {
      VGpu: "Enable",
      Networking: "Enable",
      AudioInput: "Enable",
      VideoInput: "Enable",
      ClipboardRedirection: "Disable",
      PrinterRedirection: "Disable",
      MemoryInMB: 8192,
      MappedFolders: {
        MappedFolder: {
          HostFolder: "C:\\Data",
          ReadOnly: "false",
        },
      },
      LogonCommand: {
        Command: "cmd.exe /c echo Hello",
      },
    },
  };

  const xml = serialize(config);

  // Check all elements exist
  assertStringIncludes(xml, "<VGpu>Enable</VGpu>");
  assertStringIncludes(xml, "<Networking>Enable</Networking>");
  assertStringIncludes(xml, "<AudioInput>Enable</AudioInput>");
  assertStringIncludes(xml, "<VideoInput>Enable</VideoInput>");
  assertStringIncludes(xml, "<ClipboardRedirection>Disable</ClipboardRedirection>");
  assertStringIncludes(xml, "<PrinterRedirection>Disable</PrinterRedirection>");
  assertStringIncludes(xml, "<MemoryInMB>8192</MemoryInMB>");
  assertStringIncludes(xml, "<Command>cmd.exe /c echo Hello</Command>");
});

Deno.test("serialize - formatting and indentation", () => {
  const config: Configuration = {
    Configuration: {
      VGpu: "Disable",
      Networking: "Default",
      MappedFolders: {
        MappedFolder: {
          HostFolder: "C:\\Test",
          ReadOnly: "true",
        },
      },
    },
  };

  const xml = serialize(config);

  // Check that output is formatted with proper indentation
  const lines = xml.split("\n");

  // Should have multiple lines (not a single line)
  assertEquals(lines.length > 1, true);

  // Check for 2-space indentation
  const hasIndentation = lines.some(line => line.startsWith("  "));
  assertEquals(hasIndentation, true);
});

Deno.test("serialize - invalid configuration throws error", () => {
  const invalidConfig = {
    Configuration: {
      // Invalid nested structure
      MappedFolders: {
        MappedFolder: {
          // Missing required HostFolder field
          ReadOnly: "true",
        },
      },
    },
  };

  assertThrows(
    () => serialize(invalidConfig as Configuration),
    Error,
    "Invalid WSB configuration",
  );
});

Deno.test("serialize - invalid VGpu value throws error", () => {
  const invalidConfig = {
    Configuration: {
      VGpu: "InvalidValue",
      Networking: "Default",
    },
  };

  assertThrows(
    () => serialize(invalidConfig as Configuration),
    Error,
    "Invalid WSB configuration",
  );
});

Deno.test("serialize - empty MappedFolders is suppressed", () => {
  const config: Configuration = {
    Configuration: {
      VGpu: "Disable",
      Networking: "Default",
    },
  };

  const xml = serialize(config);

  // Empty or undefined nodes should not appear in output
  // (thanks to suppressEmptyNode: true)
  assertEquals(xml.includes("<MappedFolders"), false);
});
