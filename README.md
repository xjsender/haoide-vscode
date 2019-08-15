# haoide-vscode README

haoide-vscode is migrated from haoide, so far, it just supports lightning component completion and not released to vscode marketplace, more and more feat
ures will be delivered in the next months.

## Features

As today, haoide-vscode supports many features, such as below,
+ [Completions](https://github.com/xjsender/haoide-vscode/blob/master/docs/haoide-vscode.gif)
    - [Apex Completion](https://github.com/xjsender/haoide-vscode/blob/master/docs/haoide-vscode-apex.gif)
    - Visualforce Completion
    - Aura Completion
    - LWC Completion
+ OAuth2 Login
+ Utilities
    - Open Default Org
    - Format JSON


## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## What's included

Within the download you'll find the following directories and files, you can find differnet modules which is focused on spcified purpose, like this, 

```text
HAOIDE-VSCODE
└── snippets/
│   ├── aura.code-snippets    -- aura related snippets
│   ├── class.code-snippets    -- apex class related snippets
│   ├── lwc.code-snippets    -- lwc related snippets
│   ├── trigger.code-snippets    -- trigger related snippets
│   └── visualforce.code-snippets    -- visualforce related snippets
└── src
    ├──commands/    -- all commands are put here
    │   ├── aura.ts    -- all aura related commands
    │   ├── auth.ts    -- all login related commands
    │   ├── lwc.ts    -- all lwc related commands
    │   ├── main.ts    -- commands involving to request to server
    │   ├── package.ts    -- all deployment related commands
    │   ├── utility.ts    -- all utilities command, for example, xml and json convert, json to apex
    │   └── index.ts
    │── salesforce/
    │   ├── api/
    │   |    ├── apex.ts
    │   |    ├── metadata.ts
    │   |    ├── rest.ts
    │   |    └── tooling.ts
    │   ├── completions/
    │   |    ├── lib/
    │   |    |    ├── front/
    │   |    |    |    ├── lightning.ts    -- lightning lib which is manually collected from guide
    │   |    |    |    └── vf.ts    -- vf lib which is fetched from /tooling/completions?type=visualforce
    │   |    |    ├── server/
    │   |    |    |    ├── apex.ts    -- from /tooling/completions?type=apex and is parsed by ./util.ts
    │   |    |    |    ├── classes.ts    -- which is parsed by util.parseClasses
    │   |    |    |    └── namespaces.ts    -- which is parsed by util.parseNamespace
    │   |    |    ├── index.ts
    │   |    |    └── util.ts    -- which is used to parsing apex lib by tooling api to classes and namespaces
    │   |    ├── provider/
    │   |    |    ├── index.ts
    │   |    |    ├── apexCompletionProvider.ts    -- completion provider for apex language
    │   |    |    ├── lightningCompletionProvider.ts    -- completion provider for lightning language
    │   |    |    └── visualforceCompletionProvider.ts    -- completion provider for visualforce language
    │   |    └── utils/
    │   |        ├── index.ts
    │   |        └── util.ts    -- which is used in completion provider
    │   └── lib/
    │       ├── auth/
    │       |   ├── config.ts    -- haoide-vscode oauth2 client credentials
    │       |   ├── oauth.ts    -- oauth lib, i.e., request token, refresh token and revoke token
    │       |   └── server.ts    -- start oauth2 login flow to get token by express lib
    │       └── soap.ts    -- build all metadata request body, including, apex, metadata, bulk
    │── settings/
    │    ├── index.ts
    │    ├── extension.ts    -- used to mgt. simple extension settings
    │    ├── metadata.ts    -- used to mgt. metadata from DescribeMetadata request
    │    ├── session.ts    -- used to mgt. session information
    │    ├── settings.ts    -- used to mgt. complicate extension settings
    │    └── settingsUtil.ts    -- util for other settings
    │── test/
    │    ├── suite/    -- test suite based on the structure of function class
    │    │   ├── utils    -- test suite for utils
    │    │   ├── settings    -- test suite for settings
    │    │   ├── salesforce    -- test suite for salesforce
    │    │   └── ...
    │    └── runTests.ts    -- Mocha start point
    └── utils/
    |    ├── package.ts    -- util for package related
    |    ├── progress.ts    -- vscode progress wrapper
    |    └── util.ts    -- genernal util for everywhere in this extension
    └── extension.ts    -- commands register and completion provider binding
```

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
