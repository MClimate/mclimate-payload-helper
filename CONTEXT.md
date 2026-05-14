# CONTEXT.md

This file is the canonical, high-level reference for the `mclimate-payload-helper` repository. It is intended for AI assistants and new contributors so they can orient quickly without re-reading the entire codebase.

## 1. Project Overview

- **Name:** `mclimate-payload-helper` (npm package)
- **Version:** `1.3.4` (see `package.json`)
- **Language / Runtime:** TypeScript, compiled to CommonJS for Node.js consumers
- **Purpose:** Encode LoRaWAN downlink commands and decode uplink payloads for MClimate IoT devices (Vicki, Relay 16, T-Valve, T-Flood, CO₂ sensors/displays, Fan-Coil thermostat, PIR Mini, etc.).
- **Distribution:** Published to npm; consumers import `uplinkPayloadParser`, `CommandBuilder`, `DeviceType`, schemas and per-device command classes.
- **License:** ISC. **Author:** MClimate.

## 2. Tech Stack and Dependencies

- **Runtime dep:** `zod` (^3.23.8) — schema validation for command parameters.
- **Build:** `typescript` (^5.5.4) + `tsc-alias` (resolves `@/*` path aliases in emitted JS) + `typescript-transform-paths` (rewrites paths inside `.d.ts`).
- **Test:** `jest` (^29) + `ts-jest`.
- **Lint/Format:** `eslint` (with `@typescript-eslint`), `prettier`, `eslint-config-prettier`, `eslint-plugin-jest`.
- **Git hooks:** `husky` runs format/type-check/lint/test on pre-commit (see `.husky/pre-commit`).
- **TS Config:** `target: ES2016`, `module: commonjs`, `strict: true`, `rootDir: ./src`, `outDir: ./dist`, path alias `@/* -> ./src/*` (see `tsconfig.json`).

## 3. Project Structure

```
.
├── src/
│   ├── index.ts                         # Public package entry — re-exports parser, CommandBuilder, device commands, schemas, enums, CustomError
│   ├── decoders/
│   │   ├── index.ts
│   │   ├── commandsReadingHelper.ts     # Large helper that decodes command-response bytes embedded in keepalives
│   │   └── payloadParsers/
│   │       ├── index.ts
│   │       ├── uplinkPayloadParser.ts   # Switch on DeviceType → device-specific parser
│   │       ├── <Device>PayloadParser.ts # One file per device (Vicki, HTSensor, TFlood, TValve, CO2*, Relay16*, PirMini, MultiSensor, Melissa, etc.)
│   │       └── types/                   # DeviceType enum + Vicki/Relay enum types
│   ├── encoders/
│   │   ├── index.ts                     # Re-exports BaseCommand, CommandBuilder, all device command classes & mixins
│   │   ├── BaseCommand.ts               # Hex serialization (cmdId + params → hex string)
│   │   ├── CommandBuilder.ts            # Registry: device_type → command class; build(command, params), combine([...])
│   │   ├── GeneralCommands.ts           # Shared commands (keepalive, uplinkType, watchdog, region, customHex, joinRetry, deviceVersion)
│   │   ├── DisplayCommands.ts           # Mixin
│   │   ├── TemperatureCommonCommands.ts # Mixin
│   │   ├── PIRCommands.ts               # Mixin
│   │   ├── ChildLockCommands.ts         # Mixin
│   │   ├── <Device>Commands.ts          # One per device, extends GeneralCommands (+ mixins via applyMixins)
│   │   ├── <Device>Commands.test.ts     # Jest tests colocated with each command class
│   │   └── types/
│   │       ├── index.ts
│   │       └── schemas.ts               # All Zod schemas + per-device enums (large, ~82KB)
│   ├── helpers/                         # byteArrayParser, decbin, toBool
│   ├── utils/                           # caseConverter (toCamelCase), customErrorHandler (CustomError), decToHex, delMethods, mixin (applyMixins)
│   └── test/
│       └── payloadDecoders.test.ts      # Consolidated decoder tests (all devices)
├── docs/                                # External LoRaWAN API docs (PDFs + how-to-add-new-device.md, PIR Mini API)
├── add-encoder-command-existing.md      # Step-by-step guide for adding a command to an existing device
├── add-encoder-command-new.md           # Step-by-step guide for adding a brand-new device
├── README.md                            # Public-facing usage doc
├── CLAUDE.md                            # AI assistant guidance (overlap with this file)
├── package.json / package-lock.json
├── tsconfig.json
├── jest.config.ts
├── .eslintrc.cjs / .prettierrc
└── .husky/pre-commit
```

## 4. Core Flows

### 4.1 Uplink decode flow

1. Consumer calls `uplinkPayloadParser(hexData, DeviceType)` (`src/decoders/payloadParsers/uplinkPayloadParser.ts`).
2. Switch dispatches to a device-specific parser function (e.g. `vickiPayloadParser`, `pirMiniPayloadParser`).
3. The parser reads bytes (hex pairs) from the head, identifies the frame type by the first byte (e.g. keepalive command id), and returns a typed object of decoded fields (temperatures, humidity, battery, status flags, etc.).
4. If the frame contains a response to a previously-sent command, the parser delegates remaining bytes to `commandsReadingHelper.ts`, which switches on the response cmdId to populate the appropriate fields.
5. **Default fallback:** if `DeviceType` does not match any case, `vickiPayloadParser` is used (see TODO comment in `uplinkPayloadParser.ts`).

### 4.2 Downlink encode flow

1. Consumer constructs `new CommandBuilder(device_type)` (string matching the `DeviceType` enum value, e.g. `'vicki'`).
2. Calls `.build(commandName, params?)`.
   - `commandName` is converted via `toCamelCase` (snake_case or kebab → camelCase), then looked up as a static method on the registered command class.
   - The static method validates `params` with a Zod schema from `src/encoders/types/schemas.ts`; on failure, throws a `CustomError` wrapping the `ZodError`.
   - On success it returns a `BaseCommand(cmdName, cmdId, ...hexParams)`.
3. `BaseCommand.toHex()` produces the wire hex (cmdId padded to 2 chars + each param padded to 2 chars). Special case for `SetOpenWindow` skips param padding.
4. Multiple commands can be concatenated for a single downlink via `commandBuilder.combine([cmd1, cmd2, ...])`.

### 4.3 Mixin / inheritance pattern

- `GeneralCommands` is the base class — every device class extends it.
- Reusable command sets live in mixin classes (`DisplayCommands`, `TemperatureCommonCommands`, `PIRCommands`, `ChildLockCommands`).
- Mixins are applied via `applyMixins` in `src/utils/mixin.ts`. `delMethods` is used to remove inherited methods that don't apply to a particular device.

## 5. Data Stores

None. This package is a pure library — no database, no cache, no I/O at runtime. All inputs are hex strings / JS objects; outputs are decoded objects / hex strings.

## 6. Environment Variables

None required by the library or its tests.

## 7. How to Run and Test

```bash
npm install
npm run build         # tsc + tsc-alias → ./dist
npm test              # jest
npm test -- VickiCommands   # filter by file/pattern
npm run type-check    # tsc --noEmit
npm run lint          # eslint
npm run format        # prettier --write .
npm run format:check  # prettier --check .
```

Publishing:

```bash
npm version patch|minor|major   # bump + git tag
npm publish                     # prepublishOnly runs build
```

## 8. Key Patterns and Conventions

- **Path alias `@/`** maps to `src/` everywhere (imports, tests, build output).
- **Public entry** is `src/index.ts` only — keep new exports there.
- **Device registration is three-sided.** When adding a device, all three sides must be updated:
  1. `DeviceType` enum in `src/decoders/payloadParsers/types/allDevices.ts`.
  2. Decoder: new `xxxPayloadParser.ts` exported via `src/decoders/payloadParsers/index.ts` and wired into the switch in `uplinkPayloadParser.ts`.
  3. Encoder: new `XxxCommands.ts` (extends `GeneralCommands`, optional mixins) exported via `src/encoders/index.ts`, registered in `CommandBuilder.commandRegistry`, and re-exported in `src/index.ts`. Add Zod schemas + enums under `src/encoders/types/schemas.ts`.
- **Command class style:** all commands are `static` methods on the class. Each set/get pair returns `new BaseCommand(name, cmdId, ...params)`. `decToHex` from `src/utils/decToHex.ts` is the standard numeric-to-hex helper.
- **Validation:** every command with parameters parses with Zod first, wrapping failures in `CustomError` (`src/utils/customErrorHandler.ts`).
- **Error type:** `CustomError` is the only error type the library throws publicly.
- **Tests live next to encoders** (`<Class>.test.ts`); decoder tests are consolidated in `src/test/payloadDecoders.test.ts`.
- **Encoding helpers:** keep numeric → hex conversions in `src/utils/decToHex.ts`. Bit/byte parsing helpers live in `src/helpers/` (`byteArrayParser`, `decbin`, `toBool`).
- **Naming:** Device class files are PascalCase (`VickiCommands.ts`); decoder parser files are mixed (`vickiPayloadParser.ts`, `htSensorPayloadParser.ts`, `CO2SensorPayloadParser.ts`) — match the existing neighbours when adding new ones.

## 9. Known Gotchas

- **`uplinkPayloadParser` defaults to Vicki** when an unknown `DeviceType` is passed (see comment `// Q: is this OK?`). New devices that aren't wired into the switch will silently be parsed as Vicki.
- **`BaseCommand.toHex` has a Vicki-specific branch** for `SetOpenWindow` (skips per-param padding). Don't reuse that command name elsewhere.
- **`CommandBuilder.build` uses `toCamelCase`** on the command string; consumers can pass `"set_target_temperature"` or `"setTargetTemperature"` and both resolve. Method names on command classes must therefore be camelCase.
- **`commandsReadingHelper.ts` is shared across devices.** The same response cmdId can mean different things on different devices (e.g. `0x3d` → `pirDemoMode` for PirMini, `integralGain` for Vicki, `pirSensorStatus` elsewhere). When adding a new response, check existing case branches before reusing a byte.
- **Husky pre-commit is strict:** format-check, type-check, lint, and tests must all pass. CI/local commits will fail otherwise.
- **`prepublishOnly` runs `npm run build`.** Always bump the version in `package.json` before `npm publish` or it will be rejected by the registry.
- **Mixins + `delMethods`:** if a device inherits a command via a mixin that it should not expose, it must explicitly delete that method (pattern used in several command classes).

## 10. Key Files to Read First

When starting a new task, read these in order:

1. `src/index.ts` — public API surface.
2. `src/decoders/payloadParsers/uplinkPayloadParser.ts` and `src/decoders/payloadParsers/types/allDevices.ts` — supported devices.
3. `src/encoders/CommandBuilder.ts` — device → command-class registry.
4. `src/encoders/BaseCommand.ts` and `src/encoders/GeneralCommands.ts` — base command shape and shared commands.
5. `src/encoders/types/schemas.ts` — Zod schemas + device enums (large, scan by section).
6. `src/decoders/commandsReadingHelper.ts` — shared response decoder switch (large).
7. The specific `<Device>PayloadParser.ts` and `<Device>Commands.ts` for the device you are touching.
8. `add-encoder-command-existing.md` / `add-encoder-command-new.md` / `docs/how-to-add-new-device.md` — official extension checklists.

## 11. Changelog

- **2026-05-14** — Initial `CONTEXT.md` created. Captures architecture as of `package.json` v1.3.4: 22 supported `DeviceType`s, mixin-based encoder hierarchy, single shared `commandsReadingHelper`, Zod-validated command params, colocated encoder tests + consolidated decoder tests.
- **2026-05-14** — Added `FanCoilThermostatCommands.getFctOperationalMode` (cmdId `0x53`) in `src/encoders/FanCoilThermostatCommands.ts`. Added a `DeviceType.FanCoilThermostat` branch to case `'53'` in `src/decoders/commandsReadingHelper.ts` that decodes the byte as `fctOperationalMode` (raw int, 0=Vent / 1=Heat / 2=Cool) while leaving the default `targetTemperatureStep` decoding intact for other devices. Encoder + decoder tests added (`FanCoilThermostatCommands.test.ts`, `payloadDecoders.test.ts`). Reinforces the existing pattern of guarding shared response cmdIds by `deviceType` (gotcha §9).
