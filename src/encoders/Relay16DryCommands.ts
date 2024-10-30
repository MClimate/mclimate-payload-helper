import { GeneralCommands, Relay16Commands } from '@/encoders'
import { applyMixins, delMethods } from '@/utils'

export class Relay16DryCommands extends GeneralCommands {
}
applyMixins(Relay16DryCommands, [
	Relay16Commands
])

delMethods(Relay16DryCommands, [
	'setOvervoltageThresholds',
	'getOvervoltageThresholds',
	'setOvercurrentThreshold',
	'getOvercurrentThreshold',
	'setOverpowerThreshold',
	'getOverpowerThreshold',
	'getOvervoltageEvents',
	'getOvercurrentEvents',
	'getOverpowerEvents',
])