# TS Migration Helper

In order to properly use the tool [ts-migrate](https://github.com/airbnb/ts-migrate), you need your types installed for your various libraries.

This tool is here to automate that for you.

## Usage

```shell
npx @caldwell619/ts-migrate-helpers --path-to-project-root .
```

## Options

| Option                        | Description                                                                                                                                                                                                                                                     |     Required?      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------: |
| `path-to-project-root` or `p` | The path to the project root ( where the package json is). This will usually be `.` if ran from the main dir. **DO NOT** add `package.json` to the end of this path. This should resolve to a directory that has the targeted `package.json` at the first level | :white_check_mark: |
| `use-npm`                     | If this is provided, npm will be used instead of yarn. Yarn is the default.                                                                                                                                                                                     |        :x:         |

## What does it do?

[ts-migrate](https://github.com/airbnb/ts-migrate) is great, but if you do not have the corresponding type definitions, it will simply add a `@ts-expect-error` above your package import. This can be tedious to find / remove.

This tool will attempt to install types for **every single one** of your prod dependencies. That is to say, not the `devDependencies`.

If a type does not exist, the script will simply continue.

### Stubbed Types

Many packages have included types in a later version, etc so they provide a stubbed type. Having these in your package.json is totally unnecessary, and causes bloat.

This script will keep track of which types are stubs, and delete them at the end.

```
Running "yarn --silent add -D @types/classnames"

classnames is a stubbed type. Adding to removal list

Removing 1 stubbed types
```
