# Add Encoder Command Workflow - Existing Device Classes

This command guides you through adding new device commands in the encoder system. Follow each step and provide input when prompted.

## Prerequisites

Ensure you have access to:

- `src/encoders/` directory
- `src/encoders/types/schemas.ts` file
- Knowledge of existing device command classes for reference

For internal imports always use the @ syntax e.g.:

```typescript
import { applyMixins, delMethods } from '@/utils'
```

## Step 1: Locate the Device Command Class

### 🔍 ASK: What is the name of the device command class?

Once the user provides the class name, locate the file, it will be in:

**File**: `src/encoders/[YourDeviceCommands].ts`

## Step 2: Add Commands

### 🔍 ASK: What commands do you want to add?

For each command, provide:

1. **Command name** (e.g., `setTemperature`, `getTemperature`)
2. **Static function parameters** with their types (for "set" commands)
3. **Additional parameters for BaseCommand** (the hex value and any additional parameters like the decToHex utility function)

**Format**:

```
Command: setTemperature
Static Function Parameters: 1) value: number, 2) state: boolean
Additional Parameters: Ask user for the additional parameter values

Command: getTemperature
Static Function Parameters: none
Additional Parameters: Ask user for the additional parameter values
```

### Command Templates

**For commands WITH parameters:**

```typescript
static [commandName](params: [YourDeviceCommandTypes].[CommandNameParams]) {
  try {
    DeviceCommandSchemas.[YourDeviceCommandSchemas].[commandName].parse(params)
    // Command implementation here
    return new BaseCommand('[CommandName]', [ADDITIONAL_PARAMETERS])
  } catch (e) {
    if (e instanceof ZodError) {
      throw new CustomError({
        message: 'Zod validation error during [CommandName] execution',
        command: '[CommandName]',
        originalError: e,
      })
    } else {
      throw new CustomError({
        message: 'Error during [CommandName] execution',
        command: '[CommandName]',
        originalError: e as Error,
      })
    }
  }
}
```

**For commands WITHOUT parameters:**

```typescript
static [commandName]() {
  return new BaseCommand('[CommandName]', [ADDITIONAL_PARAMETERS])
}
```

**IMPORTANT**:

- All functions are `static`
- First parameter of `new BaseCommand` is always the command name in CamelCase
- For the second parameter and any additional parameters, ASK THE USER for input
- Always include proper try/catch blocks for commands with parameters
- Use the newly (to be) created schemas for validation
- Add any new commands below the existing ones

## Step 3: Apply Mixins (Optional)

### 🔍 ASK: Does your device extend any additional functionality from other command classes?

Common extensions:

- `Temperature` - for temperature-related commands
- `Display` - for display-related commands
- `Sensor` - for sensor-specific commands

If yes, specify which additional classes to extend.

### Mixin Template

Add at the bottom of your command class file:

```typescript
import { applyMixins } from '../utils/applyMixins'

// Apply mixins
applyMixins([YourDeviceCommands], [Temperature, Display])
```

## Step 4: Exclude Methods (Optional)

### 🔍 ASK: Are there any additional inherited methods you want to exclude?

If you're inheriting from other classes but don't want certain methods, list them.

**Example**: Excluding `setBacklight` and `setBrightness` from Display

### Exclusion Template

```typescript
import { delMethods } from '../utils/delMethods'

// Remove unwanted methods
delMethods([YourDeviceCommands], ['setBacklight', 'setBrightness'])
```

## Step 5: Add to Schema and Types in schemas.ts

### 🔍 ASK: What parameters does each new command need for the scehma validation?

For each custom command from Step 2, provide the parameter definitions and their types for schema validation.

**IMPORTANT**: Schemas must be added to `src/encoders/types/schemas.ts` in the appropriate sections.

### Schema Creation Steps

1. **Add Command Schemas**: Create a new schema group in `schemas.ts` following the established pattern
2. **Add Type Namespace**: Create corresponding TypeScript types
3. **Export Schema Group**: Add to the `DeviceCommandSchemas` export at the bottom

### Schema Template

**Add this to `src/encoders/types/schemas.ts`:**

```typescript
/* --------------------------------------- [YOUR DEVICE] COMMANDS --------------------------------------- */

const [YourDeviceCommandSchemas] = {
  ...GeneralCommandSchemas,  // Always include this
  // Add your custom command schemas here
  [customCommand]: z.object({
    [paramName]: z.[paramType](),
    // Add all parameters with validation
  }),
  [anotherCommand]: z.object({}), // For commands with no params
}

export namespace [YourDeviceCommandTypes] {
  // Only create types for commands that have parameters (typically "set" commands)
  export type [CustomCommandParams] = z.infer<typeof [YourDeviceCommandSchemas].[customCommand]>
  // Add more parameter types as needed
}
```

### Important Schema Guidelines

1. **Location**: Add schemas directly to `@src/encoders/types/schemas.ts`
2. **Pattern**: Follow the exact pattern used by other device schemas in the file
3. **Types**: Only create type exports for commands with parameters
4. **Export**: Add your schema to the `DeviceCommandSchemas` export at the bottom of the file
5. Ensure there are no formatting issues - e.g. closing brackets, end of comments etc.

### Schema Example

**Real example from existing CO2 PIR Lite commands in schemas.ts:**

```typescript
/* --------------------------------------- CO2 PIR LITE COMMANDS --------------------------------------- */
const Co2PirLiteCommandSchemas = {
 ...GeneralCommandSchemas,
 ...PIRCommandSchemas,
 setUplinkSendingOnButtonPress: z.object({
  value: z.number(),
 }),
 getUplinkSendingOnButtonPress: z.object({}),
 restartDevice: z.object({}),
 setCo2BoundaryLevels: z.object({
  good_medium: z.number(),
  medium_bad: z.number(),
 }),
 getCo2BoundaryLevels: z.object({}),
 // ... more commands
}

export namespace Co2PirLiteCommandTypes {
 export type SetUplinkSendingOnButtonPressParams = z.infer<
  typeof Co2PirLiteCommandSchemas.setUplinkSendingOnButtonPress
 >
 export type RestartDeviceParams = z.infer<typeof Co2PirLiteCommandSchemas.restartDevice>
 export type SetCo2BoundaryLevelsParams = z.infer<typeof Co2PirLiteCommandSchemas.setCo2BoundaryLevels>
}
```

**Then at the bottom of schemas.ts, add to DeviceCommandSchemas export:**

```typescript
export const DeviceCommandSchemas = {
  // ... existing schemas
  Co2PirLiteCommandSchemas,
  [YourNewDeviceCommandSchemas], // Add your new schema here
}
```

## Step 6: Validation Checklist

Before completing:

- [ ] Device command class created as a standalone class (no inheritance from GeneralCommands)
- [ ] All methods are `static`
- [ ] Commands with parameters follow the try/catch pattern with ZodError checking
- [ ] Commands without parameters use the simple static return pattern
- [ ] All commands return `new BaseCommand` with correct CamelCase command name as first parameter
- [ ] Schemas in `src/encoders/types/schemas.ts` updated following established patterns
- [ ] Type namespace created for commands with parameters
- [ ] Each command function uses the newly created schemas for validation

## Example: Complete Implementation Following New Conventions

**Example Command Class:**

```typescript
// src/encoders/MyDeviceCommands.ts
import { BaseCommand } from '@/encoders'
import { ZodError } from 'zod'
import { CustomError } from '@/utils'
import { MyDeviceCommandTypes, DeviceCommandSchemas } from '@/encoders/types'

export class MyDeviceCommands {
 static setTemperature(params: MyDeviceCommandTypes.SetTemperatureParams) {
  try {
   DeviceCommandSchemas.MyDeviceCommandSchemas.setTemperature.parse(params)
   const { value } = params
   return new BaseCommand('SetTemperature', 0x15, value)
  } catch (e) {
   if (e instanceof ZodError) {
    throw new CustomError({
     message: 'Zod validation error during SetTemperature execution',
     command: 'SetTemperature',
     originalError: e,
    })
   } else {
    throw new CustomError({
     message: 'Error during SetTemperature execution',
     command: 'SetTemperature',
     originalError: e as Error,
    })
   }
  }
 }

 static getTemperature() {
  return new BaseCommand('GetTemperature', 0x16)
 }
}
```

**Example Schema Addition to schemas.ts:**

```typescript
/* --------------------------------------- MY DEVICE COMMANDS --------------------------------------- */
const MyDeviceCommandSchemas = {
 ...GeneralCommandSchemas,
 setTemperature: z.object({
  value: z.number().min(-40).max(85),
 }),
 getTemperature: z.object({}),
}

export namespace MyDeviceCommandTypes {
 export type SetTemperatureParams = z.infer<typeof MyDeviceCommandSchemas.setTemperature>
}

// Then add to the export at bottom:
export const DeviceCommandSchemas = {
 // ... existing schemas
 MyDeviceCommandSchemas,
}
```

## Ready to Start?

When you're ready, provide the answers to the ASK prompts and the implementation will be generated step by step.
