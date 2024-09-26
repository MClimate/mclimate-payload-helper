import { BaseCommand, GeneralCommands } from '@/encoders'

// types
import {
	CustomHexCommandParams,
	SetKeepAliveParams,
	SetChildLockParams,
	SetTemperatureRangeParams,
	SetJoinRetryPeriodParams,
	SetUplinkTypeParams,
	SetWatchDogParams,
	SetDisplayRefreshPeriodParams,
	SetDeepSleepModeParams,
	SetPIRSensorStatusParams,
	SetPIRSensorSensitivityParams,
	SetCurrentTemperatureVisibilityParams,
	SetHumidityVisibilityParams,
	SetLightIntensityVisibilityParams,
	SetCo2ImagesVisibilityParams,
	SetPIRPeriodParams,
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
				return GeneralCommands.sendCustomHexCommand(params as CustomHexCommandParams)
			}

			case 'SetKeepAlive': {
				if (this.device_type === 't_valve') {
					return TValveCommands.setKeepAlive(params as SetKeepAliveParams)
				} else if (this.device_type === 't_flood') {
					return TFloodCommands.setKeepAlive(params as SetKeepAliveParams)
				} else if (this.device_type === 'thermostat') {
					return TringThermostatCommands.setKeepAlive(params as SetKeepAliveParams)
				}
				return GeneralCommands.setKeepAlive(params as SetKeepAliveParams)
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
				return GeneralCommands.setTemperatureRange(params as SetTemperatureRangeParams)
			}

			case 'GetTemperatureRange': {
				return GeneralCommands.getTemperatureRange()
			}

			case 'SetUplinkType': {
				if (this.device_type === 't_valve') {
					return TValveCommands.setUplinkType(params as SetUplinkTypeParams)
				}
				return GeneralCommands.setUplinkType(params as SetUplinkTypeParams)
			}

			case 'GetUplinkType': {
				if (this.device_type === 't_valve') {
					return TValveCommands.getUplinkType()
				}
				return GeneralCommands.getUplinkType()
			}

			case 'SetJoinRetryPeriod': {
				if (this.device_type === 't_valve') {
					return TValveCommands.setJoinRetryPeriod(params as SetJoinRetryPeriodParams)
				}
				return GeneralCommands.setJoinRetryPeriod(params as SetJoinRetryPeriodParams)
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
				return GeneralCommands.setChildLock(params as SetChildLockParams)
			}

			case 'SetWatchDogParams': {
				if (this.device_type === 't_valve') {
					return TValveCommands.setWatchDogParams(params as SetWatchDogParams)
				}
				return GeneralCommands.setWatchDogParams(params as SetWatchDogParams)
			}

			case 'GetWatchDogParams': {
				if (this.device_type === 't_valve') {
					return TValveCommands.getWatchDogParams()
				}
				return GeneralCommands.getWatchDogParams()
			}

			case 'SetTargetTemperature': {
				if (this.device_type === 'wireless_thermostat') {
					return WirelessThermostatCommands.setTargetTemperature(params)
				} else if (this.device_type === 'fan_coil_thermostat') {
					return FanCoilThermostatCommands.setTargetTemperature(params)
				}
				return VickiCommands.setTargetTemperature(params)
			}

			case 'GetTargetTemperature': {
				return WirelessThermostatCommands.getTargetTemperature(params)
			}

			case 'SetTemperatureHysteresis': {
				if (this.device_type === 'wireless_thermostat') {
					return WirelessThermostatCommands.setTemperatureHysteresis(params)
				}
				return VickiCommands.setTemperatureHysteresis(params)
			}

			case 'GetTemperatureHysteresis': {
				if (this.device_type === 'wireless_thermostat') {
					return WirelessThermostatCommands.getTemperatureHysteresis()
				}
				return VickiCommands.getTemperatureHysteresis()
			}

			case 'SetTargetTemperatureStep': {
				if (this.device_type === 'wireless_thermostat') {
					return WirelessThermostatCommands.setTargetTemperatureStep(params)
				}
				return FanCoilThermostatCommands.setTargetTemperatureStep(params)
			}

			case 'GetTargetTemperatureStep': {
				if (this.device_type === 'wireless_thermostat') {
					return WirelessThermostatCommands.getTargetTemperatureStep()
				}
				return FanCoilThermostatCommands.getTargetTemperatureStep()
			}

			// --------------- DISPLAY COMMANDS ---------------

			case 'SetDeepSleepMode': {
				return GeneralCommands.setDeepSleepMode(params as SetDeepSleepModeParams)
			}

			case 'SetCurrentTemperatureVisibility': {
				return GeneralCommands.setCurrentTemperatureVisibility(params as SetCurrentTemperatureVisibilityParams)
			}

			case 'GetCurrentTemperatureVisibility': {
				return GeneralCommands.getCurrentTemperatureVisibility()
			}

			case 'SetHumidityVisibility': {
				return GeneralCommands.setHumidityVisibility(params as SetHumidityVisibilityParams)
			}

			case 'GetHumidityVisibility': {
				return GeneralCommands.getHumidityVisibility()
			}

			case 'SetLightIntensityVisibility': {
				return GeneralCommands.setLightIntensityVisibility(params as SetLightIntensityVisibilityParams)
			}

			case 'GetLightIntensityVisibility': {
				return GeneralCommands.getLightIntensityVisibility()
			}

			case 'SetDisplayRefreshPeriod': {
				return GeneralCommands.setDisplayRefreshPeriod(params as SetDisplayRefreshPeriodParams)
			}

			case 'GetDisplayRefreshPeriod': {
				return GeneralCommands.getDisplayRefreshPeriod()
			}

			case 'SetCo2ImagesVisibility': {
				return GeneralCommands.setCo2ImagesVisibility(params as SetCo2ImagesVisibilityParams)
			}

			case 'GetCo2ImagesVisibility': {
				return GeneralCommands.getCo2ImagesVisibility()
			}

			// --------------- PIR COMMANDS ---------------

			case 'SetPIRSensorStatus': {
				return GeneralCommands.setPIRSensorStatus(params as SetPIRSensorStatusParams)
			}

			case 'GetPIRSensorStatus': {
				return GeneralCommands.getPIRSensorStatus()
			}

			case 'SetPIRSensorSensitivity': {
				return GeneralCommands.setPIRSensorSensitivity(params as SetPIRSensorSensitivityParams)
			}

			case 'GetPIRSensorSensitivity': {
				return GeneralCommands.getPIRSensorSensitivity()
			}

			case 'SetPIRInitPeriod': {
				return GeneralCommands.setPIRInitPeriod(params as SetPIRPeriodParams)
			}

			case 'GetPIRInitPeriod': {
				return GeneralCommands.getPIRInitPeriod()
			}

			case 'SetPIRMeasurementPeriod': {
				return GeneralCommands.setPIRMeasurementPeriod(params as SetPIRPeriodParams)
			}

			case 'GetPIRMeasurementPeriod': {
				return GeneralCommands.getPIRMeasurementPeriod()
			}

			case 'SetPIRCheckPeriod': {
				return GeneralCommands.setPIRCheckPeriod(params as SetPIRPeriodParams)
			}

			case 'GetPIRCheckPeriod': {
				return GeneralCommands.getPIRCheckPeriod()
			}

			case 'SetPIRBlindPeriod': {
				return GeneralCommands.setPIRBlindPeriod(params as SetPIRPeriodParams)
			}

			case 'GetPIRBlindPeriod': {
				return GeneralCommands.getPIRBlindPeriod()
			}

			// ------------------------------------------------ VICKI COMMANDS ------------------------------------------------

			case 'ForceClose': {
				return VickiCommands.forceClose(params)
			}

			case 'RecalibrateMotor': {
				return VickiCommands.recalibrateMotor(params)
			}

			case 'SetOpenWindow': {
				return VickiCommands.setOpenWindow(params)
			}

			case 'GetOpenWindowParams': {
				return VickiCommands.getOpenWindowParams(params)
			}

			case 'SetInternalAlgoParams': {
				return VickiCommands.setInternalAlgoParams(params)
			}

			case 'GetInternalAlgoParams': {
				return VickiCommands.getInternalAlgoParams(params)
			}

			case 'SetOperationalMode': {
				return VickiCommands.setOperationalMode(params)
			}

			case 'GetOperationalMode': {
				return VickiCommands.getOperationalMode(params)
			}

			case 'SetExternalTemperature': {
				return VickiCommands.setExternalTemperature(params)
			}

			case 'GetExternalTemperature': {
				return VickiCommands.getExternalTemperature(params)
			}

			case 'SetExternalTemperatureFloat': {
				return VickiCommands.setExternalTemperatureFloat(params)
			}

			case 'SetInternalAlgoTdiffParams': {
				return VickiCommands.setInternalAlgoTdiffParams(params)
			}

			case 'GetInternalAlgoTdiffParams': {
				return VickiCommands.getInternalAlgoTdiffParams(params)
			}

			case 'SetPrimaryOperationalMode': {
				return VickiCommands.setPrimaryOperationalMode(params)
			}

			case 'GetPrimaryOperationalMode': {
				return VickiCommands.getPrimaryOperationalMode(params)
			}

			case 'SetBatteryRangesBoundaries': {
				return VickiCommands.setBatteryRangesBoundaries(params)
			}

			case 'GetBatteryRangesBoundaries': {
				return VickiCommands.getBatteryRangesBoundaries(params)
			}

			case 'SetBatteryRangesOverVoltage': {
				return VickiCommands.setBatteryRangesOverVoltage(params)
			}

			case 'GetBatteryRangesOverVoltage': {
				return VickiCommands.getBatteryRangesOverVoltage(params)
			}

			case 'SetOvac': {
				return VickiCommands.setOvac(params)
			}

			case 'GetOvac': {
				return VickiCommands.getOvac(params)
			}

			case 'SetProportionalAlgorithmParameters': {
				return VickiCommands.setProportionalAlgorithmParameters(params)
			}

			case 'GetProportionalAlgorithmParameters': {
				return VickiCommands.getProportionalAlgorithmParameters(params)
			}

			case 'SetTemperatureControlAlgorithm': {
				return VickiCommands.setTemperatureControlAlgorithm(params)
			}

			case 'GetTemperatureControlAlgorithm': {
				return VickiCommands.getTemperatureControlAlgorithm(params)
			}

			case 'SetMotorPositionOnly': {
				return VickiCommands.setMotorPositionOnly(params)
			}

			case 'DeviceReset': {
				return VickiCommands.deviceReset(params)
			}

			case 'SetTargetTemperatureAndMotorPosition': {
				return VickiCommands.setTargetTemperatureAndMotorPosition(params)
			}

			case 'SetChildLockBehavior': {
				return VickiCommands.setChildLockBehavior(params)
			}

			case 'GetChildLockBehavior': {
				return VickiCommands.getChildLockBehavior(params)
			}

			case 'SetProportionalGain': {
				return VickiCommands.setProportionalGain(params)
			}

			case 'GetProportionalGain': {
				return VickiCommands.getProportionalGain(params)
			}

			case 'SetIntegralGain': {
				return VickiCommands.setIntegralGain(params)
			}

			case 'GetIntegralGain': {
				return VickiCommands.getIntegralGain(params)
			}

			case 'GetIntegralValue': {
				return VickiCommands.getIntegralValue(params)
			}

			case 'SetPiRunPeriod': {
				return VickiCommands.setPiRunPeriod(params)
			}

			case 'GetPiRunPeriod': {
				return VickiCommands.getPiRunPeriod(params)
			}

			case 'SetOpenWindowPrecisely': {
				return VickiCommands.setOpenWindowPrecisely(params)
			}

			case 'GetOpenWindowPrecisely': {
				return VickiCommands.getOpenWindowPrecisely(params)
			}

			case 'SetForceAttach': {
				return VickiCommands.setForceAttach(params)
			}

			case 'GetForceAttach': {
				return VickiCommands.getForceAttach(params)
			}

			case 'SetAntiFreezeParams': {
				return VickiCommands.setAntiFreezeParams(params)
			}

			case 'GetAntiFreezeParams': {
				return VickiCommands.getAntiFreezeParams(params)
			}

			case 'SetMaxAllowedIntegralValue': {
				return VickiCommands.setMaxAllowedIntegralValue(params)
			}

			case 'GetMaxAllowedIntegralValue': {
				return VickiCommands.getMaxAllowedIntegralValue(params)
			}

			case 'SetValveOpennessInPercentage': {
				return VickiCommands.setValveOpennessInPercentage(params)
			}

			case 'SetValveOpennessRangeInPercentage': {
				return VickiCommands.setValveOpennessRangeInPercentage(params)
			}

			case 'GetValveOpennessRangeInPercentage': {
				return VickiCommands.getValveOpennessRangeInPercentage(params)
			}

			case 'SetTemperatureOffset': {
				return VickiCommands.setTemperatureOffset(params)
			}

			case 'GetTemperatureOffset': {
				return VickiCommands.getTemperatureOffset(params)
			}

			case 'GetAllParams': {
				return VickiCommands.getAllParams(params)
			}

			// ------------------------------------------------ WIRELESS THERMOSTAT COMMANDS ------------------------------------------------

			case 'SetHeatingStatus': {
				return WirelessThermostatCommands.setHeatingStatus(params)
			}

			case 'GetHeatingStatus': {
				return WirelessThermostatCommands.getHeatingStatus(params)
			}

			case 'SetTargetSendDelay': {
				return WirelessThermostatCommands.setTargetSendDelay(params)
			}

			case 'GetTargetSendDelay': {
				return WirelessThermostatCommands.getTargetSendDelay(params)
			}

			case 'SetAutomaticHeatingStatus': {
				return WirelessThermostatCommands.setAutomaticHeatingStatus(params)
			}

			case 'GetAutomaticHeatingStatus': {
				return WirelessThermostatCommands.getAutomaticHeatingStatus(params)
			}

			case 'SetSensorMode': {
				return WirelessThermostatCommands.setSensorMode(params)
			}

			case 'GetSensorMode': {
				return WirelessThermostatCommands.getSensorMode(params)
			}

			case 'SetTargetTemperaturePrecisely': {
				return WirelessThermostatCommands.setTargetTemperaturePrecisely(params)
			}

			case 'GetTargetTemperaturePrecisely': {
				return WirelessThermostatCommands.getTargetTemperaturePrecisely(params)
			}

			// ------------------------------------------------ T-VALVE COMMANDS ------------------------------------------------

			case 'SetOpenCloseTime': {
				return TValveCommands.setOpenCloseTime(params)
			}

			case 'SetLed': {
				return TValveCommands.setLED(params)
			}

			case 'SetBuzzer': {
				return TValveCommands.setBuzzer(params)
			}

			case 'SetEmergencyOpenings': {
				return TValveCommands.setEmergencyOpenings(params)
			}

			case 'GetEmergencyOpenings': {
				return TValveCommands.getEmergencyOpenings(params)
			}

			case 'SetManualControl': {
				return TValveCommands.setManualControl(params)
			}

			case 'RequestFullData': {
				return TValveCommands.requestFullData(params)
			}

			case 'SetWorkingVoltage': {
				return TValveCommands.setWorkingVoltage(params)
			}

			case 'GetWorkingVoltage': {
				return TValveCommands.getWorkingVoltage(params)
			}

			case 'SetDeviceFloodSensor': {
				return TValveCommands.setDeviceFloodSensor(params)
			}

			case 'GetDeviceFloodSensor': {
				return TValveCommands.getDeviceFloodSensor(params)
			}

			case 'SetFloodAlarmTime': {
				return TValveCommands.setFloodAlarmTime(params)
			}

			case 'GetFloodAlarmTime': {
				return TValveCommands.getFloodAlarmTime(params)
			}

			case 'SetValveState': {
				return TValveCommands.setValveState(params)
			}

			case 'SetOpenCloseTimeExtended': {
				return TValveCommands.setOpenCloseTimeExtended(params)
			}

			case 'GetOpenCloseTimeExtended': {
				return TValveCommands.getOpenCloseTimeExtended(params)
			}

			case 'SetSingleTimeValveState': {
				return TValveCommands.setSingleTimeValveState(params)
			}

			// ------------------------------------------------ T-FLOOD COMMANDS ------------------------------------------------

			case 'GetTemperature': {
				return TFloodCommands.getTemperature(params)
			}

			case 'SetFloodAlarmTime': {
				return TFloodCommands.setFloodAlarmTime(params)
			}

			case 'GetFloodAlarmTime': {
				return TFloodCommands.getFloodAlarmTime(params)
			}

			case 'SetFloodEventSendTime': {
				return TFloodCommands.setFloodEventSendTime(params)
			}

			case 'GetFloodEventSendTime': {
				return TFloodCommands.getFloodEventSendTime(params)
			}

			case 'SetFloodEventUplinkType': {
				return TFloodCommands.setFloodEventUplinkType(params)
			}

			case 'GetFloodEventUplinkType': {
				return TFloodCommands.getFloodEventUplinkType(params)
			}

			// ------------------------------------------------ AQI COMMANDS ------------------------------------------------

			case 'SetAqiLed': {
				return new SetAqiLed(params)
			}

			// ------------------------------------------------ C02 COMMANDS ------------------------------------------------

			case 'SetCo2BoundaryLevels': {
				return CO2SensorCommands.setCo2BoundaryLevels(params)
			}

			case 'GetCo2BoundaryLevels': {
				return CO2SensorCommands.getCo2BoundaryLevels(params)
			}

			case 'SetCo2AutoZeroValue': {
				return CO2SensorCommands.setCo2AutoZeroValue(params)
			}

			case 'GetCo2AutoZeroValue': {
				return CO2SensorCommands.getCo2AutoZeroValue(params)
			}

			case 'SetNotifyPeriod': {
				return CO2SensorCommands.setNotifyPeriod(params)
			}

			case 'GetNotifyPeriod': {
				return CO2SensorCommands.getNotifyPeriod(params)
			}

			case 'SetCo2MeasurementPeriod': {
				return CO2SensorCommands.setCo2MeasurementPeriod(params)
			}

			case 'GetCo2MeasurementPeriod': {
				return CO2SensorCommands.getCo2MeasurementPeriod(params)
			}

			case 'SetBuzzerNotification': {
				return CO2SensorCommands.setBuzzerNotification(params)
			}

			case 'GetBuzzerNotification': {
				return CO2SensorCommands.getBuzzerNotification(params)
			}

			case 'SetCo2Led': {
				return CO2SensorCommands.setCo2Led(params)
			}

			case 'GetCo2Led': {
				return CO2SensorCommands.getCo2Led(params)
			}

			case 'SetCo2AutoZeroPeriod': {
				return CO2SensorCommands.setCo2AutoZeroPeriod(params)
			}

			case 'GetCo2AutoZeroPeriod': {
				return CO2SensorCommands.getCo2AutoZeroPeriod(params)
			}

			// ------------------------------------------------ C02 DISPLAY COMMANDS ------------------------------------------------

			case 'SetCo2MeasurementBlindTime': {
				return CO2DisplayCommands.SetCo2MeasurementBlindTime(params)
			}

			case 'GetCo2MeasurementBlindTime': {
				return CO2DisplayCommands.getCo2MeasurementBlindTime(params)
			}

			// ------------------------------------------------ TRING THERMOSTAT COMMANDS ------------------------------------------------

			case 'SetThermostatTarget': {
				return TringThermostatCommands.setThermostatTarget(params)
			}

			case 'SetThermostatConfig': {
				return TringThermostatCommands.setThermostatConfig(params)
			}

			// ------------------------------------------------ DSK DEVICE COMMANDS ------------------------------------------------

			case 'SetVrvStatus': {
				return DskDeviceCommands.setVrvStatus(params)
			}

			case 'GetVrvStatus': {
				return DskDeviceCommands.getVrvStatus(params)
			}

			case 'SetVrvOnTime': {
				return DskDeviceCommands.setVrvOnTime(params)
			}

			case 'GetVrvOnTime': {
				return DskDeviceCommands.getVrvOnTime(params)
			}

			case 'SetVrvOffTime': {
				return DskDeviceCommands.setVrvOffTime(params)
			}

			case 'GetVrvOffTime': {
				return DskDeviceCommands.getVrvOffTime(params)
			}

			// ------------------------------------------------ OPEN CLOSE SENSOR COMMANDS ------------------------------------------------

			case 'SetNotificationBlindTime': {
				return OpenCloseSensorCommands.setNotificationBlindTime(params)
			}

			case 'GetNotificationBlindTime': {
				return OpenCloseSensorCommands.getNotificationBlindTime(params)
			}

			// ------------------------------------------------ BUTTON COMMANDS ------------------------------------------------

			case 'SetSendEventLater': {
				return ButtonCommands.setSendEventLater(params)
			}

			case 'GetSendEventLater': {
				return ButtonCommands.getSendEventLater(params)
			}

			// ------------------------------------------------ FAN COIL THERMOSTAT COMMANDS ------------------------------------------------

			case 'SetKeysLock': {
				return FanCoilThermostatCommands.setKeysLock(params)
			}

			case 'GetKeysLock': {
				return FanCoilThermostatCommands.getKeysLock(params)
			}

			case 'SetFanCoilTarget': {
				return FanCoilThermostatCommands.setFanCoilTarget(params)
			}

			case 'SetValveOpenCloseTime': {
				return FanCoilThermostatCommands.setValveOpenCloseTime(params)
			}

			case 'GetValveOpenCloseTime': {
				return FanCoilThermostatCommands.getValveOpenCloseTime(params)
			}

			case 'SetExtAutomaticTemperatureControl': {
				return FanCoilThermostatCommands.setExtAutomaticTemperatureControl(params)
			}

			case 'GetExtAutomaticTemperatureControl': {
				return FanCoilThermostatCommands.getExtAutomaticTemperatureControl(params)
			}

			case 'SetFanSpeed': {
				return FanCoilThermostatCommands.setFanSpeed(params)
			}

			case 'GetFanSpeed': {
				return FanCoilThermostatCommands.getFanSpeed(params)
			}

			case 'SetFanSpeedLimit': {
				return FanCoilThermostatCommands.setFanSpeedLimit(params)
			}

			case 'GetFanSpeedLimit': {
				return FanCoilThermostatCommands.getFanSpeedLimit(params)
			}

			case 'SetEcmVoltageRange': {
				return FanCoilThermostatCommands.setEcmVoltageRange(params)
			}

			case 'GetEcmVoltageRange': {
				return FanCoilThermostatCommands.getEcmVoltageRange(params)
			}

			case 'SetEcmStartUpTime': {
				return FanCoilThermostatCommands.setEcmStartUpTime(params)
			}

			case 'GetEcmStartUpTime': {
				return FanCoilThermostatCommands.getEcmStartUpTime(params)
			}

			case 'SetEcmRelay': {
				return FanCoilThermostatCommands.setEcmRelay(params)
			}

			case 'GetEcmRelay': {
				return FanCoilThermostatCommands.getEcmRelay(params)
			}

			case 'SetFrostProtection': {
				return FanCoilThermostatCommands.setFrostProtection(params)
			}

			case 'GetFrostProtection': {
				return FanCoilThermostatCommands.getFrostProtection(params)
			}

			case 'SetFrostProtectionSettings': {
				return FanCoilThermostatCommands.setFrostProtectionSettings(params)
			}

			case 'GetFrostProtectionSettings': {
				return FanCoilThermostatCommands.getFrostProtectionSettings(params)
			}

			case 'SetFctOperationalMode': {
				return FanCoilThermostatCommands.SetFctOperationalMode(params)
			}

			case 'SetAllowedOperationalModes': {
				return FanCoilThermostatCommands.setAllowedOperationalModes(params)
			}

			case 'GetAllowedOperationalModes': {
				return FanCoilThermostatCommands.getAllowedOperationalModes(params)
			}

			case 'SetCoolingSetpointNotOccupied': {
				return FanCoilThermostatCommands.setCoolingSetpointNotOccupied(params)
			}

			case 'GetCoolingSetpointNotOccupied': {
				return FanCoilThermostatCommands.getCoolingSetpointNotOccupied(params)
			}

			case 'SetHeatingSetpointNotOccupied': {
				return FanCoilThermostatCommands.setHeatingSetpointNotOccupied(params)
			}

			case 'GetHeatingSetpointNotOccupied': {
				return FanCoilThermostatCommands.getHeatingSetpointNotOccupied(params)
			}

			case 'SetTempSensorCompensation': {
				return FanCoilThermostatCommands.setTempSensorCompensation(params)
			}

			case 'GetTempSensorCompensation': {
				return FanCoilThermostatCommands.getTempSensorCompensation(params)
			}

			case 'SetFanSpeedNotOccupied': {
				return FanCoilThermostatCommands.setFanSpeedNotOccupied(params)
			}

			case 'GetFanSpeedNotOccupied': {
				return FanCoilThermostatCommands.getFanSpeedNotOccupied(params)
			}

			case 'SetAutomaticChangeover': {
				return FanCoilThermostatCommands.setAutomaticChangeover(params)
			}

			case 'GetAutomaticChangeover': {
				return FanCoilThermostatCommands.getAutomaticChangeover(params)
			}

			case 'SetWiringDiagram': {
				return FanCoilThermostatCommands.setWiringDiagram(params)
			}

			case 'GetWiringDiagram': {
				return FanCoilThermostatCommands.getWiringDiagram(params)
			}

			case 'SetOccFunction': {
				return FanCoilThermostatCommands.setOccFunction(params)
			}

			case 'GetOccFunction': {
				return FanCoilThermostatCommands.getOccFunction(params)
			}

			case 'SetAutomaticChangeoverThreshold': {
				return FanCoilThermostatCommands.setAutomaticChangeoverThreshold(params)
			}

			case 'GetAutomaticChangeoverThreshold': {
				return FanCoilThermostatCommands.getAutomaticChangeoverThreshold(params)
			}

			case 'SetDeviceStatus': {
				return FanCoilThermostatCommands.setDeviceStatus(params)
			}

			case 'SetReturnOfPowerOperation': {
				return FanCoilThermostatCommands.setReturnOfPowerOperation(params)
			}

			case 'GetReturnOfPowerOperation': {
				return FanCoilThermostatCommands.getReturnOfPowerOperation(params)
			}

			case 'SetDeltaTemperature1': {
				return FanCoilThermostatCommands.setDeltaTemperature1(params)
			}

			case 'GetDeltaTemperature1': {
				return FanCoilThermostatCommands.getDeltaTemperature1(params)
			}

			case 'SetDeltaTemperature2and3': {
				return FanCoilThermostatCommands.setDeltaTemperature2and3(params)
			}

			case 'GetDeltaTemperature2and3': {
				return FanCoilThermostatCommands.getDeltaTemperature2and3(params)
			}

			case 'GetFrostProtectionStatus': {
				return FanCoilThermostatCommands.getFrostProtectionStatus(params)
			}

			case 'GetOccupancySensorStatusSetPoint': {
				return FanCoilThermostatCommands.getOccupancySensorStatusSetPoint(params)
			}

			case 'GetOccupancySensorStatus': {
				return FanCoilThermostatCommands.getOccupancySensorStatus(params)
			}

			case 'GetDewPointSensorStatus': {
				return FanCoilThermostatCommands.getDewPointSensorStatus(params)
			}

			case 'GetFilterAlarm': {
				return FanCoilThermostatCommands.getFilterAlarm(params)
			}

			// ------------------------------------------------ RELAY 16 / 16ASPM ------------------------------------------------

			case 'SetOverheatingThreshold': {
				return Relay16Commands.setOverheatingThreshold(params)
			}

			case 'GetOverheatingThreshold': {
				return Relay16Commands.getOverheatingThreshold(params)
			}

			case 'SetOvervoltageThreshold': {
				return Relay16Commands.setOvervoltageThreshold(params)
			}

			case 'GetOvervoltageThreshold': {
				return Relay16Commands.getOvervoltageThreshold(params)
			}

			case 'SetOvercurrentThreshold': {
				return Relay16Commands.setOvercurrentThreshold(params)
			}

			case 'GetOvercurrentThreshold': {
				return Relay16Commands.getOvercurrentThreshold(params)
			}

			case 'SetOverpowerThreshold': {
				return Relay16Commands.setOverpowerThreshold(params)
			}

			case 'GetOverpowerThreshold': {
				return Relay16Commands.getOverpowerThreshold(params)
			}

			case 'SetRelayRecoveryState': {
				return Relay16Commands.setRelayRecoveryState(params)
			}

			case 'GetRelayRecoveryState': {
				return Relay16Commands.getRelayRecoveryState(params)
			}

			case 'SetRelayState': {
				return Relay16Commands.setRelayState(params)
			}

			case 'GetRelayState': {
				return Relay16Commands.getRelayState(params)
			}

			case 'GetOverheatingEvents': {
				return Relay16Commands.getOverheatingEvents(params)
			}

			case 'GetOvervoltageEvents': {
				return Relay16Commands.getOvervoltageEvents(params)
			}

			case 'GetOvercurrentEvents': {
				return Relay16Commands.getOvercurrentEvents(params)
			}

			case 'GetOverpowerEvents': {
				return Relay16Commands.getOverpowerEvents(params)
			}

			default:
				return new BaseCommand(type, 55)
		}
	}

	combine(commands: BaseCommand[]) {
		return commands.reduce((hex: string, command: BaseCommand) => (hex += command.toHex().toUpperCase()), '')
	}
}
