import { Co2DisplayCommonCommands, CO2SensorCommands, DisplayCommands, GeneralCommands } from '@/encoders'
import { applyMixins } from '@/utils'

export class CO2DisplayLiteCommands extends GeneralCommands {}

applyMixins(CO2DisplayLiteCommands, [CO2SensorCommands, DisplayCommands, Co2DisplayCommonCommands])
