import { Co2DisplayCommonCommands, CO2SensorCommands, DisplayCommands, GeneralCommands } from '@/encoders'
import { applyMixins, delMethods } from '@/utils'

export class CO2DisplayLiteCommands extends GeneralCommands {}

applyMixins(CO2DisplayLiteCommands, [CO2SensorCommands, DisplayCommands, Co2DisplayCommonCommands])

delMethods(CO2DisplayLiteCommands, [
	'setNotifyPeriod',
	'getNotifyPeriod',
	'setBuzzerNotification',
	'getBuzzerNotification',
	'setCo2Led',
	'getCo2Led',
])
