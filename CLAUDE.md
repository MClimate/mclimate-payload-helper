# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Building the Package
```bash
npm run build  # Compiles TypeScript and resolves path aliases
```

### Running Tests
```bash
npm test       # Runs all tests
npm test -- [pattern]  # Run specific test files
```

### Publishing
```bash
npm publish    # Publishes to npm (runs build automatically via prepublishOnly)
```

## Architecture Overview

This is a TypeScript library for encoding and decoding payloads for MClimate IoT devices. The codebase is organized into three main areas:

### 1. Decoders (`src/decoders/`)
- **Purpose**: Parse incoming device payloads (hex strings) into structured data
- **Entry Point**: `uplinkPayloadParser` in `src/decoders/payloadParsers/uplinkPayloadParser.ts`
- **Device Parsers**: Individual parser classes in `src/decoders/payloadParsers/` (e.g., `VickiPayloadParser`, `HTSensorPayloadParser`)
- **Command Reading**: `commandsReadingHelper.ts` handles parsing of command responses

### 2. Encoders (`src/encoders/`)
- **Purpose**: Build commands to send to devices
- **Entry Point**: `CommandBuilder` class that routes to device-specific command classes
- **Command Classes**: Each device has its own command class (e.g., `VickiCommands`, `HTSensorCommands`)
- **Inheritance**: All device commands extend `GeneralCommands` and may use mixins for shared functionality
- **Schemas**: Command validation schemas in `src/encoders/types/schemas.ts`

### 3. Type System
- **Device Types**: Enumerated in `src/decoders/payloadParsers/types/allDevices.ts`
- **Path Aliases**: Uses `@/` prefix for absolute imports from `src/`
- **Zod Schemas**: Used for command parameter validation

## Key Implementation Patterns

### Adding New Devices
1. Add device type to `DeviceType` enum
2. Create payload parser class and export it
3. Add parser case to `uplinkPayloadParser` switch
4. Create command class extending `GeneralCommands`
5. Add command class to `CommandBuilder` registry in `src/encoders/CommandBuilder.ts`:
   - Import the new command class
   - Add entry to `this.commandRegistry` in constructor
6. Define Zod schema for command validation

### Command Structure
- Commands use hexadecimal encoding
- Each command extends `BaseCommand`
- Commands can be combined using `CommandBuilder.combine()`
- Mixins used for shared command sets (e.g., `TemperatureCommonCommands`)

### Testing
- Tests located in `src/test/`
- Separate test files for decoders and encoders
- Uses Jest with TypeScript support