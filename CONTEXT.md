# CONTEXT.md

This file is the canonical, high-level reference for the `mclimate-payload-helper` repository. It is intended for AI assistants and new contributors so they can orient quickly without re-reading the entire codebase.

## 1. Project Overview

- **Name:** `mclimate-payload-helper` (npm package)
- **Version:** `1.4.0` (see `package.json`)
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
- **2026-05-19** — Audited `VickiCommands` against the official Vicki cheat-sheet (`docs.mclimate.eu/.../command-cheat-sheet`). Only one documented GET was missing: `0x52` _GET Target temperature with resolution 0.1°C_. Added `VickiCommands.getTargetTemperaturePrecisely()` returning `BaseCommand('GetTargetTemperaturePrecisely', 0x52)`, a matching no-param Zod schema entry in `VickiCommandSchemas`, and an encoder test. Decoder already handles case `'52'` as `targetTemperatureFloat` (2-byte / 10) for all devices, so no `commandsReadingHelper` change needed. All other documented Vicki GETs (incl. `0x14`/`0x15` via `ChildLockCommands`/`TemperatureCommonCommands` mixins and `0x12`/`0x19`/`0x1b`/`0x1d`/`0xa4` via `GeneralCommands`) are already present.
- **2026-05-19** — Completed Vicki SET audit. Two documented SETs were missing: `0x33` _Set LoRaWAN AppEUI & AppKey_ (≥4.1) and `0x57` _SET target temperature in Fahrenheit_ (≥4.4). Added `setAppEuiAndAppKey({ appEui: hex16, appKey: hex32 })` and `setTargetTemperatureFahrenheit({ targetTemperature: 41–86 })` to `VickiCommands.ts`, matching Zod schemas (`appEui`/`appKey` are hex-string-typed with regex + length), type exports, and 4 new tests (encode + zod-fail per command). All other documented Vicki SETs were already present (incl. `0x4e`/`0x4f` valve openness, `0x59`/`0x5b`/`0x5d`/`0x5f`/`0x61`/`0x63`/`0x65`/`0x67`/`0x69`/`0x6b`/`0x6d` heating-schedule/time/setback/etc.). `0x58` _Additional notifications_ and `0xa6` _External crystal not working_ are uplink-only — out of scope.
- **2026-05-19** — HT-Sensor D2D protocol additions (per internal _HT new commands (1).odt_). **Encoder** (`HTSensorCommands.ts`): added `setD2dCommunicationState({ enabled: boolean })` (`0xa9`), `getD2dCommunicationState()` (`0xaa`), `setD2dCommunicationPeriod({ period: 1–8 min })` (`0xab`), `getD2dCommunicationPeriod()` (`0xac`). **Decoder** (`commandsReadingHelper.ts`): added `HTSensor`-guarded branches for cases `'aa'` → `d2dCommunicationState: boolean` and `'ac'` → `d2dCommunicationPeriod: number`. **Schemas** (`schemas.ts`): 4 new entries in `HTSensorCommandSchemas` + 2 type exports. 9 new tests (6 encoder + 3 decoder). 324/324 passing.\n- **2026-05-19** — Vicki keep-alive bit-by-bit audit (current docs `/vicki-lorawan-device-communication-protocol/keep-alive`). Only one bit was missing from `vickiPayloadParser`: byte 8 bit 1 → `batteryTooLow`. Pre-4.6 docs label that bit as "Reserved", but current spec exposes it. Added `batteryTooLow: boolean` to `VickiKeepAliveData` type and parser. All 5 existing Vicki keepalive snapshots updated (`batteryTooLow: false` since byte 8 = `0x30`/`0x34` in fixtures). New regression test with byte 8 = `0x32` confirms `batteryTooLow: true`. All other byte 7/8 bits were already covered.\n- **2026-05-19** — Vicki D2D / HT-sensor protocol additions (per internal _Vicki new commands (7).odt_). **Encoder:** added `setD2dNotificationDeviceAppKey({ appKey: hex32 })` (`0x6f` + 16-byte AppKey), `getD2dNotificationDeviceAppKey()` (`0x70`), `requestListenForD2dNotificationDevice()` (`0x71`). Extended `VickiCommandSchemas.setOperationalMode` enum + `VickiEnums.setOperationalMode` to include mode `'03'` (Online automatic with HT-sensor D2D temp). **Decoder:** added Vicki branches to `case '70'` (16-byte AppKey → `d2dNotificationDeviceAppKey` as uppercase hex) and `case '72'` (2-byte temp/10 → `htSensorTemperature`) in `commandsReadingHelper.ts`; other devices' existing handling on those bytes is preserved. **Keep-alive:** `vickiPayloadParser` now exposes `d2dCommunicationReliable` (byte 8 bit 2, previously reserved). `VickiKeepAliveData` type updated. Existing keepalive snapshot tests updated to include the new field (all `false` since byte 8 = `0x30`). 8 new tests added (3 decoder + 5 encoder). 314/314 passing.\n- **2026-05-19** — Thermostat-family audit (WirelessThermostat, FanCoilThermostat, T-Valve) against official cheat-sheets. **WirelessThermostat** (`WirelessThermostatCommands.ts`): added 5 commands — `0x55`/`0x56` `setSensorCompensationTemperature`/`getSensorCompensationTemperature` (sign-byte + abs\*10), `0x5d`/`0x5e` `setTemperatureMeasurementPeriod`/`getTemperatureMeasurementPeriod` (minutes 1–255), and `0xa5` `restartDevice`. **FanCoilThermostat** (`FanCoilThermostatCommands.ts`): added 6 commands — `0x2f` `getTargetTemperature`, `0x3b` `setExtTemperatureSensor1C` (int 1–99°C), `0x3c` `setExtTemperatureSensor` (0.1–99.9°C, 2-byte payload), `0x3e` `getExtTemperatureSensor`, `0x74` `getModeChangedByAutoChangeover`, `0x75` `getPowerModuleCommunicationStatus`. Also fixed two pre-existing `BaseCommand`-name bugs in FCT: the `0x77` get-method emitted name `'SetHeatingCoolingTargetTempRangesUnoccupied'` (now `'Get…'`) and `0x79` emitted `'getFanOffDelayTime'` (now `'GetFanOffDelayTime'`). **T-Valve** (`TValveCommands.ts`): added `0x0b` `deactivateDevice`. Matching Zod schemas + type exports added in `schemas.ts`; 14 new tests added (encode + zod-fail where applicable). **Out of scope** for this batch: `Thermostat` (T-Ring) and `MelissaLorawan` — no public cheat-sheets exist at `docs.mclimate.eu` for these two; their command sets are bespoke (TRing uses 6-byte fixed-format commands, Melissa only has IR recording at `0x09`) and verifying against firmware would require the internal MClimate spec, not the public docs.
- **2026-06-18** — PIR Mini FW ≥1.4 additions (per `MClimate-pir-new.pdf`). Audited the new datasheet against the code: the embedded JS decoder/encoder in the PDF is **stale** (it shows RGB LED brightness and demo mode at `0x3A`/`0x3B`), but the authoritative human-readable command table + per-command examples confirm the **existing** code is correct — LED brightness is a single value (`0x21`/`0x22`, e.g. `0x212F`), demo mode is `0x3C`/`0x3D`, and `0x3A`/`0x3B` are the uplink-only PIR occupancy events. **Keep-alive payload is unchanged** (same 10-byte layout); `lux` stays a raw numeric value. **Encoder** (`PirMiniCommands.ts`): added `setPIROperationMode` (`0x3E`, mode 0–3: Occupancy/Triggered Occupancy/Trigger/Count), `getPIROperationMode` (`0x3F`), `setPIRBlindTime` (`0x41`, 2-byte seconds, 10–65535), `getPIRBlindTime` (`0x42`), `setPIRCounterResetFlag` (`0x43`, 0/1), `getPIRCounterResetFlag` (`0x44`). **Decoder** (`commandsReadingHelper.ts`): added `PirMini`-guarded branches to shared cases `0x3F` → `pirOperationMode`, `0x40` → `{ event: 'pirTrigger' }` (uplink-only PIR Trigger Event, mirrors `0x3A`/`0x3B` + appended keep-alive), `0x42` → `pirBlindTime` (2 bytes), `0x44` → `pirCounterResetFlag`; other devices' handling on those bytes preserved. **Keep-alive** (`pirMiniPayloadParser.ts`): `lux` remains a raw numeric 16-bit value (`number`). Per spec, `0x0000`–`0xFFFA` is the valid range, `0xFFFF` = disabled, `0xFFFC`–`0xFFFE` = sensor error; these sentinels are documented via a code comment and left for the consumer to interpret (no string return). **Schemas** (`schemas.ts`): 6 new entries + 6 type exports + `setPIROperationMode`/`setPIRCounterResetFlag` enums. 15 new tests (9 encoder + 6 decoder); 339/339 passing. Reinforces gotcha §9: trust the human-readable cheat-sheet over the PDF's embedded JS when they disagree on command IDs.
