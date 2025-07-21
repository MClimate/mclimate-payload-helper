# Add Encoder Command Workflow

This command guides you through adding new device commands in the encoder system. Follow each step and provide input when prompted.

## Prerequisites

Ensure you have access to:

- `src/encoders/` directory
- `src/encoders/types/schemas/` directory
- Knowledge of existing device command classes for reference

## Step 1: Create Device Command Class

### 🔍 ASK: What is the name of your device command class?

**Naming Convention**: Follow the pattern of existing classes (e.g., `CO2DisplayCommands`, `TemperatureSensorCommands`)

```
Example: MyDeviceCommands
```

Once you provide the class name, the following file will be created:

**File**: `src/encoders/[YourDeviceCommands].ts`

```typescript
import { GeneralCommands } from './GeneralCommands';
// Add other imports as needed

export class [YourDeviceCommands] extends GeneralCommands {
  // Commands will be added in Step 2
}
```

## Step 2: Add Commands

### 🔍 ASK: What commands do you want to add?

For each command, provide:

1. **Command name** (e.g., `setTemperature`, `configureDisplay`)
2. **Parameters** with their types

**Format**:

```
Command: setTemperature
Parameters:
  - value: number
  - unit: 'celsius' | 'fahrenheit'
```

### Command Template

```typescript
public [commandName](params: { [paramName]: [paramType] }): Buffer {
  // Implementation
  return this.buildCommand({
    command: '[COMMAND_HEX]',
    params: {
      // Map parameters to hex values
    }
  });
}
```

## Step 3: Apply Mixins (Optional)

### 🔍 ASK: Does your device extend functionality from other command classes?

Common extensions:

- `Temperature` - for temperature-related commands
- `Display` - for display-related commands
- `Sensor` - for sensor-specific commands

If yes, specify which classes to extend.

### Mixin Template

Add at the bottom of your command class file:

```typescript
import { applyMixins } from '../utils/applyMixins'

// Apply mixins
applyMixins([YourDeviceCommands], [Temperature, Display])
```

## Step 4: Exclude Methods (Optional)

### 🔍 ASK: Are there any inherited methods you want to exclude?

If you're inheriting from other classes but don't want certain methods, list them.

**Example**: Excluding `setBacklight` and `setBrightness` from Display

### Exclusion Template

```typescript
import { delMethods } from '../utils/delMethods'

// Remove unwanted methods
delMethods([YourDeviceCommands], ['setBacklight', 'setBrightness'])
```

## Step 5: Update Index File

Add your new class to `src/encoders/index.ts`:

```typescript
export { [YourDeviceCommands] } from './[YourDeviceCommands]';
```

## Step 6: Add to CommandBuilder Registry

Add your new command class to the CommandBuilder registry in `src/encoders/CommandBuilder.ts`:

1. **Import** your new command class at the top of the file
2. **Add entry** to `this.commandRegistry` in the constructor

```typescript
// At the top with other imports
import { [YourDeviceCommands] } from './[YourDeviceCommands]';

// In constructor's commandRegistry
this.commandRegistry = {
  // ... existing entries
  [device_type_key]: [YourDeviceCommands],
}
```

**Note**: The `device_type_key` should match the corresponding `DeviceType` enum value (in snake_case format).

## Step 7: Create Schema and Types

### Schema Inheritance Questions

#### 🔍 ASK: Does your device inherit ALL commands from another schema class?

For example, if your device extends ALL commands from `TemperatureCommandSchemas` or `DisplayCommandSchemas`, specify it here. If not, answer "no".

**Note**: `GeneralCommandSchemas` is ALWAYS included by default - you don't need to mention it.

#### 🔍 ASK: Which specific commands from other schemas does your device need?

If you're not inheriting ALL commands from a schema, list the specific commands you need from other schemas.

**Format**:

```
From TemperatureCommandSchemas: setTemperature, getTemperature
From DisplayCommandSchemas: setBrightness
```

### Schema Generation Logic

Based on your answers, the schema will be structured as follows:

1. **Always include**: `...GeneralCommandSchemas` (spread by default)
2. **If inheriting ALL from another schema**: Spread that schema too
3. **For custom commands**: Add schema definitions for each command from Step 2
4. **For specific inherited commands**: Include them explicitly

**File**: `src/encoders/types/schemas/[YourDeviceCommandSchemas].ts`

### Schema Template

```typescript
import { z } from 'zod';
import { GeneralCommandSchemas } from './GeneralCommandSchemas';
// Import other schemas as needed based on inheritance

export const [YourDeviceCommandSchemas] = {
  ...GeneralCommandSchemas, // Always included

  // If inheriting ALL commands from another schema:
  // ...TemperatureCommandSchemas,

  // Custom commands (from Step 2)
  [commandName]: z.object({
    [paramName]: z.[paramType](),
    // Add all parameters with validation
  }),

  // Specific inherited commands (if not inheriting all)
  // setTemperature: TemperatureCommandSchemas.setTemperature,
};

// Type namespace - only for "set" commands
export namespace [YourDeviceCommandTypes] {
  // Types for custom "set" commands
  export type Set[CommandName] = z.infer<typeof [YourDeviceCommandSchemas].set[CommandName]>;

  // Types for inherited "set" commands
  // export type SetTemperature = z.infer<typeof [YourDeviceCommandSchemas].setTemperature>;
}
```

### Schema Examples

**Example 1: Device with full schema inheritance**

```typescript
export const MyThermostatCommandSchemas = {
	...GeneralCommandSchemas,
	...TemperatureCommandSchemas, // Inherits ALL temperature commands
	// Custom commands only
	setSchedule: z.object({
		days: z.array(z.string()),
		temperature: z.number(),
	}),
}
```

**Example 2: Device with specific inheritance**

```typescript
export const MyDisplayCommandSchemas = {
	...GeneralCommandSchemas,
	// Custom commands
	setMode: z.object({
		mode: z.enum(['eco', 'normal', 'boost']),
	}),
	// Specific inherited commands
	setBrightness: DisplayCommandSchemas.setBrightness,
	setContrast: DisplayCommandSchemas.setContrast,
}
```

## Step 8: Validation Checklist

Before completing:

- [ ] Device command class extends `GeneralCommands`
- [ ] All commands have proper parameter types
- [ ] Mixins applied correctly (if needed)
- [ ] Unwanted methods excluded (if needed)
- [ ] Class exported in `index.ts`
- [ ] Command class added to CommandBuilder registry with correct import
- [ ] Schema created with all command validations
- [ ] Type namespace includes all "set" commands
- [ ] Schema inherits from `GeneralCommandSchemas`
- [ ] Specific inherited commands listed explicitly (if not inheriting all)

## Example: Complete CO2DisplayCommands Implementation

```typescript
// src/encoders/CO2DisplayCommands.ts
import { GeneralCommands } from './GeneralCommands'
import { Display } from './Display'
import { Temperature } from './Temperature'
import { applyMixins } from '../utils/applyMixins'
import { delMethods } from '../utils/delMethods'

export class CO2DisplayCommands extends GeneralCommands {
	public setCO2Threshold(params: { threshold: number }): Buffer {
		return this.buildCommand({
			command: '0x15',
			params: {
				threshold: this.toHex(params.threshold, 2),
			},
		})
	}

	public setDisplayMode(params: { mode: 'normal' | 'eco' }): Buffer {
		return this.buildCommand({
			command: '0x16',
			params: {
				mode: params.mode === 'normal' ? '0x00' : '0x01',
			},
		})
	}
}

// Apply mixins
applyMixins(CO2DisplayCommands, [Temperature, Display])

// Remove unwanted Display methods
delMethods(CO2DisplayCommands, ['setBacklight'])
```

```typescript
// src/encoders/types/schemas/CO2DisplayCommandSchemas.ts
import { z } from 'zod'
import { GeneralCommandSchemas } from './GeneralCommandSchemas'
import { TemperatureCommandSchemas } from './TemperatureCommandSchemas'
import { DisplayCommandSchemas } from './DisplayCommandSchemas'

export const CO2DisplayCommandSchemas = {
	...GeneralCommandSchemas,
	setCO2Threshold: z.object({
		threshold: z.number().min(400).max(5000),
	}),
	setDisplayMode: z.object({
		mode: z.enum(['normal', 'eco']),
	}),
	// Specific inherited commands
	setTemperature: TemperatureCommandSchemas.setTemperature,
	setBrightness: DisplayCommandSchemas.setBrightness,
}

export namespace CO2DisplayCommandTypes {
	export type SetCO2Threshold = z.infer<typeof CO2DisplayCommandSchemas.setCO2Threshold>
	export type SetDisplayMode = z.infer<typeof CO2DisplayCommandSchemas.setDisplayMode>
	export type SetTemperature = z.infer<typeof CO2DisplayCommandSchemas.setTemperature>
	export type SetBrightness = z.infer<typeof CO2DisplayCommandSchemas.setBrightness>
}
```

## Ready to Start?

When you're ready, provide the answers to the ASK prompts and the implementation will be generated step by step.
