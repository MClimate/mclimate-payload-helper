import {
	BaseCommand,
	GeneralCommands,
	Relay16Commands,
	VickiCommands,
	FanCoilThermostatCommands,
	TValveCommands,
	TFloodCommands,
	TringThermostatCommands,
	WirelessThermostatCommands,
	CO2SensorCommands,
	CO2DisplayCommands,
	DskDeviceCommands,
	OpenCloseSensorCommands,
	ButtonCommands,
	SetAqiLed,
} from '@/encoders'

// types
import {
	GeneralCommandTypes,
	Relay16CommandTypes,
	VickiCommandTypes,
	FanCoilThermostatCommandTypes,
	TValveCommandTypes,
	TFloodCommandTypes,
	TringThermostatCommandTypes,
	WirelessThermostatCommandTypes,
	CO2SensorCommandTypes,
	CO2DisplayCommandTypes,
	DSKDeviceCommandTypes,
	OpenCloseSensorCommandTypes,
	ButtonCommandTypes,
	AQICommandTypes,
} from '@/encoders/types'

export class CommandBuilder {
	device_type: string

	constructor(device_type: string) {
		this.device_type = device_type
	}

	build(type: string, params: unknown) {
		switch (type) {
			// ------------------------------------------------ GENERAL COMMANDS ------------------------------------------------

			case 'SendCustomHexCommand': {
				return GeneralCommands.sendCustomHexCommand(params as GeneralCommandTypes.CustomHexCommandParams)
			}

			case 'SetKeepAlive': {
				if (this.device_type === 't_valve') {
					return TValveCommands.setKeepAlive(params as TValveCommandTypes.SetKeepAliveParams)
				} else if (this.device_type === 't_flood') {
					return TFloodCommands.setKeepAlive(params as TFloodCommandTypes.SetKeepAliveParams)
				} else if (this.device_type === 'thermostat') {
					return TringThermostatCommands.setKeepAlive(params as TringThermostatCommandTypes.SetKeepAliveParams)
				}
				return GeneralCommands.setKeepAlive(params as GeneralCommandTypes.SetKeepAliveParams)
			}

			case 'GetKeepAliveTime': {
				return GeneralCommands.getKeepAlive()
			}

			case 'GetDeviceVersion': {
				if (this.device_type === 't_flood') {
					return TFloodCommands.getDeviceVersion()
				}
				return GeneralCommands.getDeviceVersion()
			}

			case 'SetTemperatureRange': {
				return GeneralCommands.setTemperatureRange(params as GeneralCommandTypes.SetTemperatureRangeParams)
			}

			case 'GetTemperatureRange': {
				return GeneralCommands.getTemperatureRange()
			}

			case 'SetUplinkType': {
				if (this.device_type === 't_valve') {
					return TValveCommands.setUplinkType(params as TValveCommandTypes.SetUplinkTypeTValveParams)
				}
				return GeneralCommands.setUplinkType(params as GeneralCommandTypes.SetUplinkTypeParams)
			}

			case 'GetUplinkType': {
				if (this.device_type === 't_valve') {
					return TValveCommands.getUplinkType()
				}
				return GeneralCommands.getUplinkType()
			}

			case 'SetJoinRetryPeriod': {
				if (this.device_type === 't_valve') {
					return TValveCommands.setJoinRetryPeriod(params as TValveCommandTypes.SetJoinRetryPeriodTValveParams)
				}
				return GeneralCommands.setJoinRetryPeriod(params as GeneralCommandTypes.SetJoinRetryPeriodParams)
			}

			case 'GetJoinRetryPeriod': {
				if (this.device_type === 't_valve') {
					return TValveCommands.getJoinRetryPeriod()
				}
				return GeneralCommands.getJoinRetryPeriod()
			}

			case 'GetChildLock': {
				return GeneralCommands.getChildLock()
			}

			case 'SetChildLock': {
				return GeneralCommands.setChildLock(params as GeneralCommandTypes.SetChildLockParams)
			}

			case 'SetWatchDogParams': {
				if (this.device_type === 't_valve') {
					return TValveCommands.setWatchDogParams(params as TValveCommandTypes.SetWatchDogTValveParams)
				}
				return GeneralCommands.setWatchDogParams(params as GeneralCommandTypes.SetWatchDogParams)
			}

			case 'GetWatchDogParams': {
				if (this.device_type === 't_valve') {
					return TValveCommands.getWatchDogParams()
				}
				return GeneralCommands.getWatchDogParams()
			}

			case 'SetTargetTemperature': {
				if (this.device_type === 'wireless_thermostat') {
					return WirelessThermostatCommands.setTargetTemperature(
						params as WirelessThermostatCommandTypes.SetTargetTemperatureParams,
					)
				} else if (this.device_type === 'fan_coil_thermostat') {
					return FanCoilThermostatCommands.setTargetTemperature(
						params as FanCoilThermostatCommandTypes.SetTargetTemperatureFanCoilParams,
					)
				}
				return VickiCommands.setTargetTemperature(params as VickiCommandTypes.SetTargetTemperatureParams)
			}

			case 'GetTargetTemperature': {
				return WirelessThermostatCommands.getTargetTemperature()
			}

			case 'SetTemperatureHysteresis': {
				if (this.device_type === 'wireless_thermostat') {
					return WirelessThermostatCommands.setTemperatureHysteresis(
						params as WirelessThermostatCommandTypes.SetTemperatureHysteresisParams,
					)
				}
				return VickiCommands.setTemperatureHysteresis(params as VickiCommandTypes.SetTemperatureHysteresisParams)
			}

			case 'GetTemperatureHysteresis': {
				if (this.device_type === 'wireless_thermostat') {
					return WirelessThermostatCommands.getTemperatureHysteresis()
				}
				return VickiCommands.getTemperatureHysteresis()
			}

			case 'SetTargetTemperatureStep': {
				if (this.device_type === 'wireless_thermostat') {
					return WirelessThermostatCommands.setTargetTemperatureStep(
						params as WirelessThermostatCommandTypes.SetTargetTemperatureStepParams,
					)
				}
				return FanCoilThermostatCommands.setTargetTemperatureStep(
					params as FanCoilThermostatCommandTypes.SetTargetTemperatureStepParams,
				)
			}

			case 'GetTargetTemperatureStep': {
				if (this.device_type === 'wireless_thermostat') {
					return WirelessThermostatCommands.getTargetTemperatureStep()
				}
				return FanCoilThermostatCommands.getTargetTemperatureStep()
			}
			// --------------- DISPLAY COMMANDS ---------------

			case 'SetDeepSleepMode': {
				return GeneralCommands.setDeepSleepMode(params as GeneralCommandTypes.SetDeepSleepModeParams)
			}

			case 'SetCurrentTemperatureVisibility': {
				return GeneralCommands.setCurrentTemperatureVisibility(
					params as GeneralCommandTypes.SetCurrentTemperatureVisibilityParams,
				)
			}

			case 'GetCurrentTemperatureVisibility': {
				return GeneralCommands.getCurrentTemperatureVisibility()
			}

			case 'SetHumidityVisibility': {
				return GeneralCommands.setHumidityVisibility(params as GeneralCommandTypes.SetHumidityVisibilityParams)
			}

			case 'GetHumidityVisibility': {
				return GeneralCommands.getHumidityVisibility()
			}

			case 'SetLightIntensityVisibility': {
				return GeneralCommands.setLightIntensityVisibility(params as GeneralCommandTypes.SetLightIntensityVisibilityParams)
			}

			case 'GetLightIntensityVisibility': {
				return GeneralCommands.getLightIntensityVisibility()
			}

			case 'SetDisplayRefreshPeriod': {
				return GeneralCommands.setDisplayRefreshPeriod(params as GeneralCommandTypes.SetDisplayRefreshPeriodParams)
			}

			case 'GetDisplayRefreshPeriod': {
				return GeneralCommands.getDisplayRefreshPeriod()
			}

			case 'SetCo2ImagesVisibility': {
				return GeneralCommands.setCo2ImagesVisibility(params as GeneralCommandTypes.SetCo2ImagesVisibilityParams)
			}

			case 'GetCo2ImagesVisibility': {
				return GeneralCommands.getCo2ImagesVisibility()
			}

			// --------------- PIR COMMANDS ---------------

			case 'SetPIRSensorStatus': {
				return GeneralCommands.setPIRSensorStatus(params as GeneralCommandTypes.SetPIRSensorStatusParams)
			}

			case 'GetPIRSensorStatus': {
				return GeneralCommands.getPIRSensorStatus()
			}

			case 'SetPIRSensorSensitivity': {
				return GeneralCommands.setPIRSensorSensitivity(params as GeneralCommandTypes.SetPIRSensorSensitivityParams)
			}

			case 'GetPIRSensorSensitivity': {
				return GeneralCommands.getPIRSensorSensitivity()
			}

			case 'SetPIRInitPeriod': {
				return GeneralCommands.setPIRInitPeriod(params as GeneralCommandTypes.SetPIRPeriodParams)
			}

			case 'GetPIRInitPeriod': {
				return GeneralCommands.getPIRInitPeriod()
			}

			case 'SetPIRMeasurementPeriod': {
				return GeneralCommands.setPIRMeasurementPeriod(params as GeneralCommandTypes.SetPIRPeriodParams)
			}

			case 'GetPIRMeasurementPeriod': {
				return GeneralCommands.getPIRMeasurementPeriod()
			}

			case 'SetPIRCheckPeriod': {
				return GeneralCommands.setPIRCheckPeriod(params as GeneralCommandTypes.SetPIRPeriodParams)
			}

			case 'GetPIRCheckPeriod': {
				return GeneralCommands.getPIRCheckPeriod()
			}

			case 'SetPIRBlindPeriod': {
				return GeneralCommands.setPIRBlindPeriod(params as GeneralCommandTypes.SetPIRPeriodParams)
			}

			case 'GetPIRBlindPeriod': {
				return GeneralCommands.getPIRBlindPeriod()
			}

			// ------------------------------------------------ VICKI COMMANDS ------------------------------------------------

			case 'ForceClose': {
				return VickiCommands.forceClose()
			}

			case 'RecalibrateMotor': {
				return VickiCommands.recalibrateMotor()
			}

			case 'SetOpenWindow': {
				return VickiCommands.setOpenWindow(params as VickiCommandTypes.SetOpenWindowParams)
			}

			case 'GetOpenWindowParams': {
				return VickiCommands.getOpenWindowParams()
			}

			case 'SetInternalAlgoParams': {
				return VickiCommands.setInternalAlgoParams(params as VickiCommandTypes.SetInternalAlgoParamsParams)
			}

			case 'GetInternalAlgoParams': {
				return VickiCommands.getInternalAlgoParams()
			}

			case 'SetOperationalMode': {
				return VickiCommands.setOperationalMode(params as VickiCommandTypes.SetOperationalModeParams)
			}

			case 'GetOperationalMode': {
				return VickiCommands.getOperationalMode()
			}

			case 'SetExternalTemperature': {
				return VickiCommands.setExternalTemperature(params as VickiCommandTypes.SetExternalTemperatureParams)
			}

			case 'GetExternalTemperature': {
				return VickiCommands.getExternalTemperature()
			}

			case 'SetExternalTemperatureFloat': {
				return VickiCommands.setExternalTemperatureFloat(params as VickiCommandTypes.SetExternalTemperatureFloatParams)
			}

			case 'SetInternalAlgoTdiffParams': {
				return VickiCommands.setInternalAlgoTdiffParams(params as VickiCommandTypes.SetInternalAlgoTdiffParamsParams)
			}

			case 'GetInternalAlgoTdiffParams': {
				return VickiCommands.getInternalAlgoTdiffParams()
			}

			case 'SetPrimaryOperationalMode': {
				return VickiCommands.setPrimaryOperationalMode(params as VickiCommandTypes.SetPrimaryOperationalModeParams)
			}

			case 'GetPrimaryOperationalMode': {
				return VickiCommands.getPrimaryOperationalMode()
			}

			case 'SetBatteryRangesBoundaries': {
				return VickiCommands.setBatteryRangesBoundaries(params as VickiCommandTypes.SetBatteryRangesBoundariesParams)
			}

			case 'GetBatteryRangesBoundaries': {
				return VickiCommands.getBatteryRangesBoundaries()
			}

			case 'SetBatteryRangesOverVoltage': {
				return VickiCommands.setBatteryRangesOverVoltage(params as VickiCommandTypes.SetBatteryRangesOverVoltageParams)
			}

			case 'GetBatteryRangesOverVoltage': {
				return VickiCommands.getBatteryRangesOverVoltage()
			}

			case 'SetOvac': {
				return VickiCommands.setOvac(params as VickiCommandTypes.SetOvacParams)
			}

			case 'GetOvac': {
				return VickiCommands.getOvac()
			}

			case 'SetProportionalAlgorithmParameters': {
				return VickiCommands.setProportionalAlgorithmParameters(
					params as VickiCommandTypes.SetProportionalAlgorithmParametersParams,
				)
			}

			case 'GetProportionalAlgorithmParameters': {
				return VickiCommands.getProportionalAlgorithmParameters()
			}

			case 'SetTemperatureControlAlgorithm': {
				return VickiCommands.setTemperatureControlAlgorithm(
					params as VickiCommandTypes.SetTemperatureControlAlgorithmParams,
				)
			}

			case 'GetTemperatureControlAlgorithm': {
				return VickiCommands.getTemperatureControlAlgorithm()
			}

			case 'SetMotorPositionOnly': {
				return VickiCommands.setMotorPositionOnly(params as VickiCommandTypes.SetMotorPositionOnlyParams)
			}

			case 'DeviceReset': {
				return VickiCommands.deviceReset()
			}

			case 'SetTargetTemperatureAndMotorPosition': {
				return VickiCommands.setTargetTemperatureAndMotorPosition(
					params as VickiCommandTypes.SetTargetTemperatureAndMotorPositionParams,
				)
			}

			case 'SetChildLockBehavior': {
				return VickiCommands.setChildLockBehavior(params as VickiCommandTypes.SetChildLockBehaviorParams)
			}

			case 'GetChildLockBehavior': {
				return VickiCommands.getChildLockBehavior()
			}

			case 'SetProportionalGain': {
				return VickiCommands.setProportionalGain(params as VickiCommandTypes.SetProportionalGainParams)
			}

			case 'GetProportionalGain': {
				return VickiCommands.getProportionalGain()
			}

			case 'SetIntegralGain': {
				return VickiCommands.setIntegralGain(params as VickiCommandTypes.SetIntegralGainParams)
			}

			case 'GetIntegralGain': {
				return VickiCommands.getIntegralGain()
			}

			case 'GetIntegralValue': {
				return VickiCommands.getIntegralValue()
			}

			case 'SetPiRunPeriod': {
				return VickiCommands.setPiRunPeriod(params as VickiCommandTypes.SetPiRunPeriodParams)
			}

			case 'GetPiRunPeriod': {
				return VickiCommands.getPiRunPeriod()
			}

			case 'SetOpenWindowPrecisely': {
				return VickiCommands.setOpenWindowPrecisely(params as VickiCommandTypes.SetOpenWindowPreciselyParams)
			}

			case 'GetOpenWindowPrecisely': {
				return VickiCommands.getOpenWindowPrecisely()
			}

			case 'SetForceAttach': {
				return VickiCommands.setForceAttach(params as VickiCommandTypes.SetForceAttachParams)
			}

			case 'GetForceAttach': {
				return VickiCommands.getForceAttach()
			}

			case 'SetAntiFreezeParams': {
				return VickiCommands.setAntiFreezeParams(params as VickiCommandTypes.SetAntiFreezeParamsParams)
			}

			case 'GetAntiFreezeParams': {
				return VickiCommands.getAntiFreezeParams()
			}

			case 'SetMaxAllowedIntegralValue': {
				return VickiCommands.setMaxAllowedIntegralValue(params as VickiCommandTypes.SetMaxAllowedIntegralValueParams)
			}

			case 'GetMaxAllowedIntegralValue': {
				return VickiCommands.getMaxAllowedIntegralValue()
			}

			case 'SetValveOpennessInPercentage': {
				return VickiCommands.setValveOpennessInPercentage(params as VickiCommandTypes.SetValveOpennessInPercentageParams)
			}

			case 'SetValveOpennessRangeInPercentage': {
				return VickiCommands.setValveOpennessRangeInPercentage(
					params as VickiCommandTypes.SetValveOpennessRangeInPercentageParams,
				)
			}

			case 'GetValveOpennessRangeInPercentage': {
				return VickiCommands.getValveOpennessRangeInPercentage()
			}

			case 'SetTemperatureOffset': {
				return VickiCommands.setTemperatureOffset(params as VickiCommandTypes.SetTemperatureOffsetParams)
			}

			case 'GetTemperatureOffset': {
				return VickiCommands.getTemperatureOffset()
			}

			// ------------------------------------------------ WIRELESS THERMOSTAT COMMANDS ------------------------------------------------

			case 'SetHeatingStatus': {
				return WirelessThermostatCommands.setHeatingStatus(params as WirelessThermostatCommandTypes.SetHeatingStatusParams)
			}

			case 'GetHeatingStatus': {
				return WirelessThermostatCommands.getHeatingStatus()
			}

			case 'SetTargetSendDelay': {
				return WirelessThermostatCommands.setTargetSendDelay(
					params as WirelessThermostatCommandTypes.SetTargetSendDelayParams,
				)
			}

			case 'GetTargetSendDelay': {
				return WirelessThermostatCommands.getTargetSendDelay()
			}

			case 'SetAutomaticHeatingStatus': {
				return WirelessThermostatCommands.setAutomaticHeatingStatus(
					params as WirelessThermostatCommandTypes.SetAutomaticHeatingStatusParams,
				)
			}

			case 'GetAutomaticHeatingStatus': {
				return WirelessThermostatCommands.getAutomaticHeatingStatus()
			}

			case 'SetSensorMode': {
				return WirelessThermostatCommands.setSensorMode(params as WirelessThermostatCommandTypes.SetSensorModeParams)
			}

			case 'GetSensorMode': {
				return WirelessThermostatCommands.getSensorMode()
			}

			case 'SetTargetTemperaturePrecisely': {
				return WirelessThermostatCommands.setTargetTemperaturePrecisely(
					params as WirelessThermostatCommandTypes.SetTargetTemperaturePreciselyParams,
				)
			}

			case 'GetTargetTemperaturePrecisely': {
				return WirelessThermostatCommands.getTargetTemperaturePrecisely()
			}

			// ------------------------------------------------ T-VALVE COMMANDS ------------------------------------------------

			case 'SetOpenCloseTime': {
				return TValveCommands.setOpenCloseTime(params as TValveCommandTypes.SetOpenCloseTimeParams)
			}

			case 'SetLed': {
				return TValveCommands.setLED(params as TValveCommandTypes.SetLEDParams)
			}

			case 'SetBuzzer': {
				return TValveCommands.setBuzzer(params as TValveCommandTypes.SetBuzzerParams)
			}

			case 'SetEmergencyOpenings': {
				return TValveCommands.setEmergencyOpenings(params as TValveCommandTypes.SetEmergencyOpeningsParams)
			}

			case 'GetEmergencyOpenings': {
				return TValveCommands.getEmergencyOpenings()
			}

			case 'SetManualControl': {
				return TValveCommands.setManualControl(params as TValveCommandTypes.SetManualControlParams)
			}

			case 'RequestFullData': {
				return TValveCommands.requestFullData()
			}

			case 'SetWorkingVoltage': {
				return TValveCommands.setWorkingVoltage(params as TValveCommandTypes.SetWorkingVoltageParams)
			}

			case 'GetWorkingVoltage': {
				return TValveCommands.getWorkingVoltage()
			}

			case 'SetDeviceFloodSensor': {
				return TValveCommands.setDeviceFloodSensor(params as TValveCommandTypes.SetDeviceFloodSensorParams)
			}

			case 'GetDeviceFloodSensor': {
				return TValveCommands.getDeviceFloodSensor()
			}

			case 'SetFloodAlarmTime': {
				return TValveCommands.setFloodAlarmTime(params as TValveCommandTypes.SetFloodAlarmTimeParams)
			}

			case 'GetFloodAlarmTime': {
				return TValveCommands.getFloodAlarmTime()
			}

			case 'SetValveState': {
				return TValveCommands.setValveState(params as TValveCommandTypes.SetValveStateParams)
			}

			case 'SetOpenCloseTimeExtended': {
				return TValveCommands.setOpenCloseTimeExtended(params as TValveCommandTypes.SetOpenCloseTimeExtendedParams)
			}

			case 'GetOpenCloseTimeExtended': {
				return TValveCommands.getOpenCloseTimeExtended()
			}

			case 'SetSingleTimeValveState': {
				return TValveCommands.setSingleTimeValveState(params as TValveCommandTypes.SetSingleTimeValveStateParams)
			}

			// ------------------------------------------------ T-FLOOD COMMANDS ------------------------------------------------

			case 'GetTemperature': {
				return TFloodCommands.getTemperature()
			}

			case 'SetFloodAlarmTime': {
				return TFloodCommands.setFloodAlarmTime(params as TFloodCommandTypes.SetFloodAlarmTimeParams)
			}

			case 'GetFloodAlarmTime': {
				return TFloodCommands.getFloodAlarmTime()
			}

			case 'SetFloodEventSendTime': {
				return TFloodCommands.setFloodEventSendTime(params as TFloodCommandTypes.SetFloodEventSendTimeParams)
			}

			case 'GetFloodEventSendTime': {
				return TFloodCommands.getFloodEventSendTime()
			}

			case 'SetFloodEventUplinkType': {
				return TFloodCommands.setFloodEventUplinkType(params as TFloodCommandTypes.SetFloodEventUplinkTypeParams)
			}

			case 'GetFloodEventUplinkType': {
				return TFloodCommands.getFloodEventUplinkType()
			}

			// ------------------------------------------------ AQI COMMANDS ------------------------------------------------

			case 'SetAqiLed': {
				return new SetAqiLed(params as AQICommandTypes.SetAqiLedParams)
			}

			// ------------------------------------------------ C02 COMMANDS ------------------------------------------------

			case 'SetCo2BoundaryLevels': {
				return CO2SensorCommands.setCo2BoundaryLevels(params as CO2SensorCommandTypes.SetCo2BoundaryLevelsParams)
			}

			case 'GetCo2BoundaryLevels': {
				return CO2SensorCommands.getCo2BoundaryLevels()
			}

			case 'SetCo2AutoZeroValue': {
				return CO2SensorCommands.setCo2AutoZeroValue(params as CO2SensorCommandTypes.SetCo2AutoZeroValueParams)
			}

			case 'GetCo2AutoZeroValue': {
				return CO2SensorCommands.getCo2AutoZeroValue()
			}

			case 'SetNotifyPeriod': {
				return CO2SensorCommands.setNotifyPeriod(params as CO2SensorCommandTypes.SetNotifyPeriodParams)
			}

			case 'GetNotifyPeriod': {
				return CO2SensorCommands.getNotifyPeriod()
			}

			case 'SetCo2MeasurementPeriod': {
				return CO2SensorCommands.setCo2MeasurementPeriod(params as CO2SensorCommandTypes.SetCo2MeasurementPeriodParams)
			}

			case 'GetCo2MeasurementPeriod': {
				return CO2SensorCommands.getCo2MeasurementPeriod()
			}

			case 'SetBuzzerNotification': {
				return CO2SensorCommands.setBuzzerNotification(params as CO2SensorCommandTypes.SetBuzzerNotificationParams)
			}

			case 'GetBuzzerNotification': {
				return CO2SensorCommands.getBuzzerNotification()
			}

			case 'SetCo2Led': {
				return CO2SensorCommands.setCo2Led(params as CO2SensorCommandTypes.SetCo2LedParams)
			}

			case 'GetCo2Led': {
				return CO2SensorCommands.getCo2Led()
			}

			case 'SetCo2AutoZeroPeriod': {
				return CO2SensorCommands.setCo2AutoZeroPeriod(params as CO2SensorCommandTypes.SetCo2AutoZeroPeriodParams)
			}

			case 'GetCo2AutoZeroPeriod': {
				return CO2SensorCommands.getCo2AutoZeroPeriod()
			}

			// ------------------------------------------------ C02 DISPLAY COMMANDS ------------------------------------------------

			case 'SetCo2MeasurementBlindTime': {
				return CO2DisplayCommands.setCo2MeasurementBlindTime(
					params as CO2DisplayCommandTypes.SetCo2MeasurementBlindTimeParams,
				)
			}

			case 'GetCo2MeasurementBlindTime': {
				return CO2DisplayCommands.getCo2MeasurementBlindTime()
			}

			// ------------------------------------------------ TRING THERMOSTAT COMMANDS ------------------------------------------------

			case 'SetThermostatTarget': {
				return TringThermostatCommands.setThermostatTarget(params as TringThermostatCommandTypes.SetThermostatTargetParams)
			}

			case 'SetThermostatConfig': {
				return TringThermostatCommands.setThermostatConfig(params as TringThermostatCommandTypes.SetThermostatConfigParams)
			}

			// ------------------------------------------------ DSK DEVICE COMMANDS ------------------------------------------------

			case 'SetVrvStatus': {
				return DskDeviceCommands.setVrvStatus(params as DSKDeviceCommandTypes.SetVrvStatusParams)
			}

			case 'GetVrvStatus': {
				return DskDeviceCommands.getVrvStatus()
			}

			case 'SetVrvOnTime': {
				return DskDeviceCommands.setVrvOnTime(params as DSKDeviceCommandTypes.SetVrvOnTimeParams)
			}

			case 'GetVrvOnTime': {
				return DskDeviceCommands.getVrvOnTime()
			}

			case 'SetVrvOffTime': {
				return DskDeviceCommands.setVrvOffTime(params as DSKDeviceCommandTypes.SetVrvOffTimeParams)
			}

			case 'GetVrvOffTime': {
				return DskDeviceCommands.getVrvOffTime()
			}

			// ------------------------------------------------ OPEN CLOSE SENSOR COMMANDS ------------------------------------------------

			case 'SetNotificationBlindTime': {
				return OpenCloseSensorCommands.setNotificationBlindTime(
					params as OpenCloseSensorCommandTypes.SetNotificationBlindTimeParams,
				)
			}

			case 'GetNotificationBlindTime': {
				return OpenCloseSensorCommands.getNotificationBlindTime()
			}

			// ------------------------------------------------ BUTTON COMMANDS ------------------------------------------------

			case 'SetSendEventLater': {
				return ButtonCommands.setSendEventLater(params as ButtonCommandTypes.SetSendEventLaterParams)
			}

			case 'GetSendEventLater': {
				return ButtonCommands.getSendEventLater()
			}

			// ------------------------------------------------ FAN COIL THERMOSTAT COMMANDS ------------------------------------------------

			case 'SetKeysLock': {
				return FanCoilThermostatCommands.setKeysLock(params as FanCoilThermostatCommandTypes.SetKeysLockParams)
			}

			case 'GetKeysLock': {
				return FanCoilThermostatCommands.getKeysLock()
			}

			case 'SetFanCoilTarget': {
				return FanCoilThermostatCommands.setFanCoilTarget(params as FanCoilThermostatCommandTypes.SetFanCoilTargetParams)
			}

			case 'SetTargetTemperature': {
				return FanCoilThermostatCommands.setTargetTemperature(
					params as FanCoilThermostatCommandTypes.SetTargetTemperatureFanCoilParams,
				)
			}

			case 'SetValveOpenCloseTime': {
				return FanCoilThermostatCommands.setValveOpenCloseTime(
					params as FanCoilThermostatCommandTypes.SetValveOpenCloseTimeParams,
				)
			}

			case 'GetValveOpenCloseTime': {
				return FanCoilThermostatCommands.getValveOpenCloseTime()
			}

			case 'SetExtAutomaticTemperatureControl': {
				return FanCoilThermostatCommands.setExtAutomaticTemperatureControl(
					params as FanCoilThermostatCommandTypes.SetExtAutomaticTemperatureControlParams,
				)
			}

			case 'GetExtAutomaticTemperatureControl': {
				return FanCoilThermostatCommands.getExtAutomaticTemperatureControl()
			}

			case 'SetFanSpeed': {
				return FanCoilThermostatCommands.setFanSpeed(params as FanCoilThermostatCommandTypes.SetFanSpeedParams)
			}

			case 'GetFanSpeed': {
				return FanCoilThermostatCommands.getFanSpeed()
			}

			case 'SetFanSpeedLimit': {
				return FanCoilThermostatCommands.setFanSpeedLimit(params as FanCoilThermostatCommandTypes.SetFanSpeedLimitParams)
			}

			case 'GetFanSpeedLimit': {
				return FanCoilThermostatCommands.getFanSpeedLimit()
			}

			case 'SetEcmVoltageRange': {
				return FanCoilThermostatCommands.setEcmVoltageRange(
					params as FanCoilThermostatCommandTypes.SetEcmVoltageRangeParams,
				)
			}

			case 'GetEcmVoltageRange': {
				return FanCoilThermostatCommands.getEcmVoltageRange()
			}

			case 'SetEcmStartUpTime': {
				return FanCoilThermostatCommands.setEcmStartUpTime(params as FanCoilThermostatCommandTypes.SetEcmStartUpTimeParams)
			}

			case 'GetEcmStartUpTime': {
				return FanCoilThermostatCommands.getEcmStartUpTime()
			}

			case 'SetEcmRelay': {
				return FanCoilThermostatCommands.setEcmRelay(params as FanCoilThermostatCommandTypes.SetEcmRelayParams)
			}

			case 'GetEcmRelay': {
				return FanCoilThermostatCommands.getEcmRelay()
			}

			case 'SetFrostProtection': {
				return FanCoilThermostatCommands.setFrostProtection(
					params as FanCoilThermostatCommandTypes.SetFrostProtectionParams,
				)
			}

			case 'GetFrostProtection': {
				return FanCoilThermostatCommands.getFrostProtection()
			}

			case 'SetFrostProtectionSettings': {
				return FanCoilThermostatCommands.setFrostProtectionSettings(
					params as FanCoilThermostatCommandTypes.SetFrostProtectionSettingsParams,
				)
			}

			case 'GetFrostProtectionSettings': {
				return FanCoilThermostatCommands.getFrostProtectionSettings()
			}

			case 'SetFctOperationalMode': {
				return FanCoilThermostatCommands.setFctOperationalMode(
					params as FanCoilThermostatCommandTypes.SetFctOperationalModeParams,
				)
			}

			case 'SetAllowedOperationalModes': {
				return FanCoilThermostatCommands.setAllowedOperationalModes(
					params as FanCoilThermostatCommandTypes.SetAllowedOperationalModesParams,
				)
			}

			case 'GetAllowedOperationalModes': {
				return FanCoilThermostatCommands.getAllowedOperationalModes()
			}

			case 'SetCoolingSetpointNotOccupied': {
				return FanCoilThermostatCommands.setCoolingSetpointNotOccupied(
					params as FanCoilThermostatCommandTypes.SetCoolingSetpointNotOccupiedParams,
				)
			}

			case 'GetCoolingSetpointNotOccupied': {
				return FanCoilThermostatCommands.getCoolingSetpointNotOccupied()
			}

			case 'SetHeatingSetpointNotOccupied': {
				return FanCoilThermostatCommands.setHeatingSetpointNotOccupied(
					params as FanCoilThermostatCommandTypes.SetHeatingSetpointNotOccupiedParams,
				)
			}

			case 'GetHeatingSetpointNotOccupied': {
				return FanCoilThermostatCommands.getHeatingSetpointNotOccupied()
			}

			case 'SetTempSensorCompensation': {
				return FanCoilThermostatCommands.setTempSensorCompensation(
					params as FanCoilThermostatCommandTypes.SetTempSensorCompensationParams,
				)
			}

			case 'GetTempSensorCompensation': {
				return FanCoilThermostatCommands.getTempSensorCompensation()
			}

			case 'SetFanSpeedNotOccupied': {
				return FanCoilThermostatCommands.setFanSpeedNotOccupied(
					params as FanCoilThermostatCommandTypes.SetFanSpeedNotOccupiedParams,
				)
			}

			case 'GetFanSpeedNotOccupied': {
				return FanCoilThermostatCommands.getFanSpeedNotOccupied()
			}

			case 'SetAutomaticChangeover': {
				return FanCoilThermostatCommands.setAutomaticChangeover(
					params as FanCoilThermostatCommandTypes.SetAutomaticChangeoverParams,
				)
			}

			case 'GetAutomaticChangeover': {
				return FanCoilThermostatCommands.getAutomaticChangeover()
			}

			case 'SetWiringDiagram': {
				return FanCoilThermostatCommands.setWiringDiagram(params as FanCoilThermostatCommandTypes.SetWiringDiagramParams)
			}

			case 'GetWiringDiagram': {
				return FanCoilThermostatCommands.getWiringDiagram()
			}

			case 'SetOccFunction': {
				return FanCoilThermostatCommands.setOccFunction(params as FanCoilThermostatCommandTypes.SetOccFunctionParams)
			}

			case 'GetOccFunction': {
				return FanCoilThermostatCommands.getOccFunction()
			}

			case 'SetAutomaticChangeoverThreshold': {
				return FanCoilThermostatCommands.setAutomaticChangeoverThreshold(
					params as FanCoilThermostatCommandTypes.SetAutomaticChangeoverThresholdParams,
				)
			}

			case 'GetAutomaticChangeoverThreshold': {
				return FanCoilThermostatCommands.getAutomaticChangeoverThreshold()
			}

			case 'SetDeviceStatus': {
				return FanCoilThermostatCommands.setDeviceStatus(params as FanCoilThermostatCommandTypes.SetDeviceStatusParams)
			}

			case 'SetReturnOfPowerOperation': {
				return FanCoilThermostatCommands.setReturnOfPowerOperation(
					params as FanCoilThermostatCommandTypes.SetReturnOfPowerOperationParams,
				)
			}

			case 'GetReturnOfPowerOperation': {
				return FanCoilThermostatCommands.getReturnOfPowerOperation()
			}

			case 'SetDeltaTemperature1': {
				return FanCoilThermostatCommands.setDeltaTemperature1(
					params as FanCoilThermostatCommandTypes.SetDeltaTemperature1Params,
				)
			}

			case 'GetDeltaTemperature1': {
				return FanCoilThermostatCommands.getDeltaTemperature1()
			}

			case 'SetDeltaTemperature2and3': {
				return FanCoilThermostatCommands.setDeltaTemperature2and3(
					params as FanCoilThermostatCommandTypes.SetDeltaTemperature2and3Params,
				)
			}

			case 'GetDeltaTemperature2and3': {
				return FanCoilThermostatCommands.getDeltaTemperature2and3()
			}

			case 'GetFrostProtectionStatus': {
				return FanCoilThermostatCommands.getFrostProtectionStatus()
			}

			case 'GetOccupancySensorStatusSetPoint': {
				return FanCoilThermostatCommands.getOccupancySensorStatusSetPoint()
			}

			case 'GetOccupancySensorStatus': {
				return FanCoilThermostatCommands.getOccupancySensorStatus()
			}

			case 'GetDewPointSensorStatus': {
				return FanCoilThermostatCommands.getDewPointSensorStatus()
			}

			case 'GetFilterAlarm': {
				return FanCoilThermostatCommands.getFilterAlarm()
			}

			// ------------------------------------------------ RELAY 16 / 16ASPM ------------------------------------------------

			case 'SetOverheatingThresholds': {
				return Relay16Commands.setOverheatingThresholds(params as Relay16CommandTypes.SetOverheatingThresholdsParams)
			}

			case 'GetOverheatingThresholds': {
				return Relay16Commands.getOverheatingThresholds()
			}

			case 'SetOvervoltageThresholds': {
				return Relay16Commands.setOvervoltageThresholds(params as Relay16CommandTypes.SetOvervoltageThresholdsParams)
			}

			case 'GetOvervoltageThresholds': {
				return Relay16Commands.getOvervoltageThresholds()
			}

			case 'SetOvercurrentThreshold': {
				return Relay16Commands.setOvercurrentThreshold(params as Relay16CommandTypes.SetOvercurrentThresholdParams)
			}

			case 'GetOvercurrentThreshold': {
				return Relay16Commands.getOvercurrentThreshold()
			}

			case 'SetOverpowerThreshold': {
				return Relay16Commands.setOverpowerThreshold(params as Relay16CommandTypes.SetOverpowerThresholdParams)
			}

			case 'GetOverpowerThreshold': {
				return Relay16Commands.getOverpowerThreshold()
			}

			case 'SetAfterOverheatingProtectionRecovery': {
				return Relay16Commands.setAfterOverheatingProtectionRecovery(
					params as Relay16CommandTypes.SetAfterOverheatingProtectionRecoveryParams,
				)
			}

			case 'GetAfterOverheatingProtectionRecovery': {
				return Relay16Commands.getAfterOverheatingProtectionRecovery()
			}

			case 'SetLedIndicationMode': {
				return Relay16Commands.setLedIndicationMode(params as Relay16CommandTypes.SetLedIndicationModeParams)
			}

			case 'GetLedIndicationMode': {
				return Relay16Commands.getLedIndicationMode()
			}

			case 'SetRelayRecoveryState': {
				return Relay16Commands.setRelayRecoveryState(params as Relay16CommandTypes.SetRelayRecoveryStateParams)
			}

			case 'GetRelayRecoveryState': {
				return Relay16Commands.getRelayRecoveryState()
			}

			case 'SetRelayState': {
				return Relay16Commands.setRelayState(params as Relay16CommandTypes.SetRelayStateParams)
			}

			case 'GetRelayState': {
				return Relay16Commands.getRelayState()
			}

			case 'GetOverheatingEvents': {
				return Relay16Commands.getOverheatingEvents()
			}

			case 'GetOvervoltageEvents': {
				return Relay16Commands.getOvervoltageEvents()
			}

			case 'GetOvercurrentEvents': {
				return Relay16Commands.getOvercurrentEvents()
			}

			case 'GetOverpowerEvents': {
				return Relay16Commands.getOverpowerEvents()
			}
			default:
				return new BaseCommand(type, 55)
		}
	}

	combine(commands: BaseCommand[]) {
		return commands.reduce((hex: string, command: BaseCommand) => (hex += command.toHex().toUpperCase()), '')
	}
}
