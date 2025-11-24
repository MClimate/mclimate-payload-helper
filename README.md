# mclimate-payload-helper

Utilities for working with MClimate IoT device payloads. The package exposes TypeScript helpers to parse uplink payloads, construct downlink command payloads, and reuse the enums/schemas that describe each supported device family.

## Features

- Typed `uplinkPayloadParser` that converts raw payload buffers into structured data for every supported `DeviceType`.
- Command builders and enums for devices such as Vicki, Relay 16, TFlood, CO₂ sensors, thermostats, and more.
- Shared error helpers (`CustomError`) and validation schemas so client apps can keep business logic consistent with the firmware payload contracts.

## Installation

```bash
npm install mclimate-payload-helper
```

The library ships TypeScript declarations, so no extra typings package is required.

## Usage

```ts
import { uplinkPayloadParser, CommandBuilder, DeviceType } from 'mclimate-payload-helper'

const uplink = uplinkPayloadParser({
	deviceType: DeviceType.Relay16,
	payloadHex: '0100aa34ff...',
})

const command = new CommandBuilder()
	.forDevice(DeviceType.Vicki)
	.useCommand('setTargetTemperature')
	.withPayload({ temperature: 22 })
	.build()
```

Refer to the `src/decoders` and `src/encoders` directories for the complete list of parsers, commands, enums, and helper functions.

## Pre-commit hooks

Husky enforces repository quality gates before every commit (`.husky/pre-commit`):

1. `npm run format:check` – Prettier formatting guard.
2. `npm run type-check` – Ensures the TypeScript project still compiles.
3. `npm run lint` – ESLint with the repo ruleset.
4. `npm run test` – Jest unit tests.

If a hook fails, fix the issue locally before committing again.

## Publishing a new version

1. Bump the version in `package.json` (or run `npm version patch|minor|major` which updates the lockfile and creates a git tag).
2. Run the full quality suite locally (`npm run format`, `npm run lint`, `npm run type-check`, `npm test`) and ensure `npm run build` succeeds.
3. Publish the package with `npm publish`. The `prepublishOnly` script will rebuild the dist folder automatically.

Skipping the version bump will cause `npm publish` to fail, so always increment the version before publishing.

## Testing approach

Unit tests live next to their encoders in `src/encoders` (e.g., `Relay16Commands.ts` and `Relay16Commands.test.ts`). For each command class with set commands:

- All set commands are exercised with exact `BaseCommand` payload expectations (command id + hex params).
- `CommandBuilder` is used when the device is available there, so registry routing and camel-casing are covered.
- Each suite includes at least one validation error case to ensure zod schema failures surface as `CustomError`.

Mixin-only classes are covered via the concrete implementations they extend; only classes with distinct command surfaces get their own suite. GeneralCommands is also tested to validate shared helpers like custom hex, keepalive, uplink type, and watchdog parameters.

- Decoder tests remain consolidated in `src/test/payloadDecoders.test.ts`.

## Adding encoder commands with AI helpers

Two interactive guides exist to speed up encoder additions:

- `add-encoder-command-existing.md`: walks through adding commands to an existing device class (prompts for command names, params, BaseCommand payloads, schema updates, mixins, and exclusions).
- `add-encoder-command-new.md`: guides creating a brand-new device class, wiring it into `CommandBuilder`, and adding schemas/types and mixins.

Both scripts explain the expected file locations (`src/encoders`, `src/encoders/types/schemas.ts`), import style (`@/...`), and validation patterns (Zod + `CustomError`). Use them as a step-by-step checklist.
