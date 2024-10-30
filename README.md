# mclimate-payload-helper

## How to add decoders for new devices

- Add new device type in src/decoders/payloadParsers/types/allDevices.ts following the established naming convention
- Add new device payload parser in src/decoders/payloadParsers. Make sure to export the class in the index.ts file so that it can be imported later using absolute imports with @
- Add new device payload parser in src/decoders/payloadParsers
- Add the new parser to src/decoders/payloadParsers/uplinkPayLoadParser appending a new case DeviceType.NEW_DEVICE
- Add a new command (if needed) in src/decoders/commandsReadingHelper. Make sure to add a break statement after the new 'case' - follow the example from previous commands

## How to add new commands in encoder

- Add new device command class in src/encoders. By design each device command class extends GeneralCommands. If the new device extends further classes - .e.g. Temperature, use the applyMixins utility function - check out the bottom of CO2DisplayCommands for an example. In case you want to exclude certain commands - you can use the delMethods utility function - the CO2DisplayCommands class has an example of this as well. Make sure to add the new class to the index.ts file.
- Add a schema and type for the new device command class in src/encoders/types/schemas. Follow the example from other devices. By default all device schemas spread the GeneralCommandSchemas. Some devices also inherit from other schemas and you can spread these directly in the schema object. In case only certain commands from a schema are inherited (e.g. only a few from DisplayCommands) - these need to be copied explicitly into the schema. Once the schema is complete, add the typing namespace below it - you only need to add the types for the "set" commands as only they are typed in the device command class.

## How to publish a new version of the package

- Bump the version in package.json
- Run 'npm publish'

