# Windows Sandbox 設定ファイル仕様

このドキュメントは、WSB（Windows Sandbox）設定ファイルのフォーマットについて説明します。

## 概要

Windows Sandboxの設定ファイルは、`.wsb`拡張子を持つXML形式のファイルです。これらのファイルを使用することで、仮想化、ネットワーク、共有フォルダー、起動コマンドなど、Windows Sandboxインスタンスの様々な設定をカスタマイズできます。

## ファイルフォーマット

- **フォーマット**: XML 1.0
- **エンコーディング**: UTF-8
- **拡張子**: `.wsb`
- **ルート要素**: `<Configuration>`

## XML構造

```xml
<?xml version="1.0" encoding="utf-8"?>
<Configuration>
  <!-- 設定要素 -->
</Configuration>
```

## 設定要素

### VGpu

サンドボックスのGPU仮想化を制御します。

- **型**: 文字列
- **値**: `Enable` | `Disable` | `Default`
- **デフォルト**: `Default`
- **省略可能**: はい

**例**:
```xml
<VGpu>Enable</VGpu>
```

**説明**:
- `Enable`: GPU仮想化を有効化（対応GPUが必要）
- `Disable`: GPU仮想化を無効化（ソフトウェアレンダリングのみ）
- `Default`: Windowsのデフォルト動作を使用

---

### Networking

サンドボックスのネットワークアクセスを制御します。

- **型**: 文字列
- **値**: `Enable` | `Disable` | `Default`
- **デフォルト**: `Enable`
- **省略可能**: はい

**例**:
```xml
<Networking>Disable</Networking>
```

**説明**:
- `Enable`: サンドボックスがネットワークアクセス可能
- `Disable`: サンドボックスをネットワークから分離
- `Default`: Windowsのデフォルト動作を使用（通常は有効）

---

### MappedFolders

ホストとサンドボックス間の共有フォルダーを定義します。

- **型**: コンテナ要素
- **省略可能**: はい
- **子要素**: 1つ以上の`<MappedFolder>`要素

**例（単一フォルダー）**:
```xml
<MappedFolders>
  <MappedFolder>
    <HostFolder>C:\Users\Public</HostFolder>
    <ReadOnly>true</ReadOnly>
  </MappedFolder>
</MappedFolders>
```

**例（複数フォルダー）**:
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

単一の共有フォルダーマッピングを定義します。

**子要素**:

##### HostFolder

- **型**: 文字列
- **必須**: はい
- **説明**: ホストマシン上のフォルダーへの絶対パス
- **例**: `C:\Users\Public\Downloads`

##### SandboxFolder

- **型**: 文字列
- **省略可能**: はい
- **説明**: サンドボックス内でフォルダーが表示されるパス。指定しない場合、ホストと同じパスに表示されます。
- **例**: `C:\Workspace`

##### ReadOnly

- **型**: 文字列（真偽値）
- **値**: `true` | `false`
- **デフォルト**: `false`
- **省略可能**: はい
- **説明**: 共有フォルダーへの書き込みアクセスを制御
  - `true`: 読み取り専用アクセス
  - `false`: 読み書きアクセス

---

### LogonCommand

サンドボックス起動時に実行するコマンドを指定します。

- **型**: コンテナ要素
- **省略可能**: はい
- **子要素**: `<Command>`

**例**:
```xml
<LogonCommand>
  <Command>explorer.exe C:\Users\WDAGUtilityAccount\Desktop</Command>
</LogonCommand>
```

#### Command

- **型**: 文字列
- **必須**: はい（LogonCommandが存在する場合）
- **説明**: サンドボックス起動時に実行するコマンドライン
- **注意**: サンドボックスユーザー（WDAGUtilityAccount）として実行されます

**よく使う例**:
```xml
<!-- 特定のフォルダーを開く -->
<Command>explorer.exe C:\Workspace</Command>

<!-- バッチスクリプトを実行 -->
<Command>C:\Scripts\setup.bat</Command>

<!-- ブラウザでURLを開く -->
<Command>cmd.exe /c start https://example.com</Command>
```

---

### AudioInput

サンドボックスのマイクアクセスを制御します。

- **型**: 文字列
- **値**: `Enable` | `Disable` | `Default`
- **デフォルト**: `Disable`
- **省略可能**: はい
- **最小Windowsバージョン**: Windows 10 ビルド 19041（2004）

**例**:
```xml
<AudioInput>Enable</AudioInput>
```

---

### VideoInput

サンドボックスのWebカメラアクセスを制御します。

- **型**: 文字列
- **値**: `Enable` | `Disable` | `Default`
- **デフォルト**: `Disable`
- **省略可能**: はい
- **最小Windowsバージョン**: Windows 10 ビルド 19041（2004）

**例**:
```xml
<VideoInput>Enable</VideoInput>
```

---

### ProtectedClient

サンドボックスの保護クライアントモードを制御します。

- **型**: 文字列
- **値**: `Enable` | `Disable` | `Default`
- **デフォルト**: `Disable`
- **省略可能**: はい
- **最小Windowsバージョン**: Windows 10 ビルド 19041（2004）

**例**:
```xml
<ProtectedClient>Enable</ProtectedClient>
```

**説明**:
有効化すると、追加のセキュリティ保護が提供されますが、一部のアプリケーションとの互換性に影響する可能性があります。

---

### PrinterRedirection

サンドボックスのプリンターアクセスを制御します。

- **型**: 文字列
- **値**: `Enable` | `Disable` | `Default`
- **デフォルト**: `Disable`
- **省略可能**: はい
- **最小Windowsバージョン**: Windows 10 ビルド 19041（2004）

**例**:
```xml
<PrinterRedirection>Enable</PrinterRedirection>
```

---

### ClipboardRedirection

ホストとサンドボックス間のクリップボード共有を制御します。

- **型**: 文字列
- **値**: `Enable` | `Disable` | `Default`
- **デフォルト**: `Enable`
- **省略可能**: はい
- **最小Windowsバージョン**: Windows 10 ビルド 19041（2004）

**例**:
```xml
<ClipboardRedirection>Disable</ClipboardRedirection>
```

**説明**:
- `Enable`: ホストとサンドボックス間でクリップボードの内容を共有可能
- `Disable`: クリップボードを分離
- `Default`: Windowsのデフォルト動作を使用（通常は有効）

---

### MemoryInMB

サンドボックスに割り当てるメモリ量を制御します。

- **型**: 整数
- **単位**: メガバイト（MB）
- **省略可能**: はい
- **デフォルト**: ホストの利用可能メモリに基づいて計算
- **最小Windowsバージョン**: Windows 10 ビルド 19041（2004）

**例**:
```xml
<MemoryInMB>4096</MemoryInMB>
```

**注意**:
- 指定しない場合、Windowsが自動的に適切なメモリ割り当てを計算します
- メモリを少なく指定しすぎるとパフォーマンスの問題が発生する可能性があります
- ホストの利用可能メモリを超えることはできません

---

## 完全な例

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

## 使い方

1. `.wsb`拡張子でテキストファイルを作成
2. 上記のようなXML設定を追加
3. `.wsb`ファイルをダブルクリックして、指定した設定でWindows Sandboxを起動

## システム要件

- **Windows 10 Pro/Enterprise**: ビルド 18305 以降
- **Windows 11**: 全エディション（Pro、Enterprise、Education）
- **ハードウェア**:
  - BIOSで仮想化を有効化
  - 最低4GB RAM（8GB推奨）
  - 最低1GBの空きディスク容量
  - 2 CPUコア（4コア推奨）

## 参考資料

- [公式Microsoftドキュメント](https://docs.microsoft.com/ja-jp/windows/security/threat-protection/windows-sandbox/windows-sandbox-configure-using-wsb-file)
- [Windows Sandbox概要](https://docs.microsoft.com/ja-jp/windows/security/threat-protection/windows-sandbox/windows-sandbox-overview)

## バージョン履歴

| Windowsビルド | 新機能 |
|--------------|--------|
| 18305 | 初期WSBサポート（VGpu、Networking、MappedFolders、LogonCommand） |
| 19041（2004） | AudioInput、VideoInput、ProtectedClient、PrinterRedirection、ClipboardRedirection、MemoryInMB |

## 注意事項

- すべての設定要素は省略可能です
- XML要素名は大文字小文字を区別します
- 真偽値は文字列形式を使用: `"true"` または `"false"`
- パスは絶対パスでなければなりません
- ホストフォルダーはサンドボックス起動前に存在している必要があります
- `.wsb`ファイルへの変更を反映するには、サンドボックスを再起動する必要があります
