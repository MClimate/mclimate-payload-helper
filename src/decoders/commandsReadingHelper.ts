import { DeviceType } from '@/decoders/payloadParsers/types'
import { CustomError } from '@/utils'

export const commandsReadingHelper = (hexData: string, payloadLength: number, deviceType: DeviceType) => {
	let resultToPass = {}
	let data = hexData
	let commands = data.match(/.{1,2}/g)
	let command_len = 0

	const decbin = (byte: number) => {
		return byte.toString(2).padStart(8, '0')
	}

	const decodeKeepalive = (commands: string[], payloadLength: number, deviceType: DeviceType) => {
		let decodeKeepalive = false
		const potentialKeepAlive = commands.slice(-payloadLength / 2)

		if (
			potentialKeepAlive[0] === '81' &&
			(deviceType === DeviceType.Vicki || deviceType === DeviceType.WirelessThermostat || deviceType === DeviceType.MultiSensor)
		) {
			decodeKeepalive = true
		} else if ((potentialKeepAlive[0] === '00' || potentialKeepAlive[0] === '88') && deviceType === DeviceType.TFlood) {
			decodeKeepalive = true
		} else if (potentialKeepAlive[0] === '82' && deviceType === DeviceType.MultiSensor) {
			decodeKeepalive = true
		} else if (
			(potentialKeepAlive[0] === '01' || potentialKeepAlive[0] === '20' || potentialKeepAlive[0] === '21') &&
			deviceType === DeviceType.OpenCloseSensor
		) {
			decodeKeepalive = true
		} else if (potentialKeepAlive[0] === '01') {
			decodeKeepalive = true
		} else {
			decodeKeepalive = false
		}

		if (decodeKeepalive) {
			commands = commands.slice(0, -payloadLength / 2)
			const data = { decodeKeepalive: true }
			Object.assign(resultToPass, { ...resultToPass }, { ...data })
		}

		return commands
	}

	if (!commands) return

	// NOTE: make sure to add a break statement after each case!!!
	commands.map((command: string, i: number) => {
		switch (command.toLowerCase()) {
			case '00':
			case '88':
				{
					try {
						if (deviceType === DeviceType.TFlood) {
							command_len = payloadLength / 2
							let data = { decodeKeepalive: true }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '88'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '01':
				{
					try {
						command_len = payloadLength / 2
						let data = { decodeKeepalive: true }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '01'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '81':
				{
					try {
						command_len = payloadLength / 2
						let data = { decodeKeepalive: true }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '81'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '04':
				{
					try {
						command_len = 2
						let hardwareVersion = commands[i + 1]
						let softwareVersion = commands[i + 2]
						let data = { deviceVersions: { hardware: Number(hardwareVersion), software: Number(softwareVersion) } }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '04'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '05':
				{
					try {
						command_len = 1
						let data = { targetTemperatureStep: parseInt(commands[i + 1], 16) / 10 }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '05'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '06':
				{
					try {
						command_len = 1
						if (deviceType === DeviceType.MelissaLorawan) {
							command_len = 2
							let codeAddress = (parseInt(commands[i + 1], 16) << 8) | parseInt(commands[i + 2], 16)
							let codeAddressRaw = `${commands[i + 1]}${commands[i + 2]}`
							let data = { preloadedCode: { codeAddress, codeAddressRaw } }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else {
							let data = { alarmDuration: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '06'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '07':
				{
					try {
						command_len = 2
						let hardwareVersion = commands[i + 1]
						let softwareVersion = commands[i + 2]
						let data = { deviceVersions: { hardware: Number(hardwareVersion), software: Number(softwareVersion) } }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '07'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '09':
				{
					try {
						command_len = 1
						let data = { floodEventSendTime: parseInt(commands[i + 1], 16) }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '09'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '0a':
				{
					try {
						let data
						if (deviceType === DeviceType.MelissaLorawan) {
							command_len = 4
							let recordedIrCodeSize = (parseInt(commands[i + 1], 16) << 8) | parseInt(commands[i + 2], 16)
							let bytesSent = `${commands[i + 3]}${commands[i + 4]}`
							data = { recordedIrInfo: { recordedIrCodeSize, bytesSent } }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '0a'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '0b':
				{
					try {
						let data
						if (deviceType === DeviceType.MelissaLorawan) {
							// First byte after command indicates how many bytes follow
							const bytesCount = parseInt(commands[i + 1], 16)
							command_len = 1 + bytesCount // 1 for bytesCount + the actual bytes

							// Next two bytes are buffer offset
							const bufferOffsetMSB = parseInt(commands[i + 2], 16)
							const bufferOffsetLSB = parseInt(commands[i + 3], 16)
							const address = (bufferOffsetMSB << 8) | bufferOffsetLSB

							// The rest is IR code data
							let irCodeDataString = ''
							for (let j = 4; j < 4 + bytesCount - 2; j++) {
								// -2 to account for the offset bytes
								irCodeDataString += commands[i + j]
							}

							data = {
								irCodeData: {
									bytesCount: bytesCount - 2,
									address,
									data: irCodeDataString,
								},
							}
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '0b'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '0e':
				{
					try {
						command_len = 4
						let openingTime = (parseInt(commands[i + 1], 16) << 8) | parseInt(commands[i + 2], 16)
						let closingTime = (parseInt(commands[i + 3], 16) << 8) | parseInt(commands[i + 4], 16)
						let data = { openCloseTimeExtended: { openingTime: Number(openingTime), closingTime: Number(closingTime) } }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '0e'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '0f':
				{
					try {
						command_len = 1
						let data = { emergencyOpenings: parseInt(commands[i + 1], 16) }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '0f'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '10':
				{
					try {
						command_len = 1
						let data = { floodAlarmTime: parseInt(commands[i + 1], 16) }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '10'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '11':
				{
					try {
						command_len = 1
						let data = { workingVoltage: parseInt(commands[i + 1], 16) * 8 + 1600 }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '11'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '12':
				{
					try {
						command_len = 1
						let data = { keepAliveTime: parseInt(commands[i + 1], 16) }
						if (deviceType === DeviceType.TFlood) {
							command_len = 2
							data = { keepAliveTime: parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '12'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '13':
				{
					try {
						let data
						if (deviceType === DeviceType.TValve) {
							command_len = 1
							data = { deviceFloodSensor: parseInt(commands[i + 1], 16) }
						} else {
							command_len = 4
							let enabled = !!parseInt(commands[i + 1], 16)
							let duration = parseInt(commands[i + 2], 16) * 5
							let motorPos1 = parseInt(commands[i + 4], 16) >> 4 // upper 4 bits of Byte 4
							let motorPos2 = parseInt(commands[i + 3], 16) & 0xff // lower 8 bits of Byte 3
							let motorPosition = (motorPos1 << 8) | motorPos2
							let delta = parseInt(commands[i + 4], 16) & 0x0f // lower 4 bits of Byte 4
							data = { openWindowParams: { enabled: enabled, duration: duration, motorPosition: motorPosition, delta: delta } }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '13'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '14':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { keysLock: parseInt(commands[i + 1]) }
						} else if (deviceType === DeviceType.TFlood) {
							command_len = 1
							data = { floodEventUplinkType: parseInt(commands[i + 1]) }
						} else {
							command_len = 1
							data = { childLock: !!parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '14'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '15':
				{
					try {
						command_len = 2
						let data = {
							temperatureRangeSettings: { min: parseInt(commands[i + 1], 16), max: parseInt(commands[i + 2], 16) },
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '15'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '16':
				{
					try {
						let data
						if (deviceType === DeviceType.TValve) {
							command_len = 1
							let commandResponse = parseInt(commands[i + 1], 16)
							let periodInMinutes = (commandResponse * 5) / 60
							data = { joinRetryPeriod: periodInMinutes }
						} else {
							command_len = 2
							data = {
								internalAlgoParams: {
									period: parseInt(commands[i + 1], 16),
									pFirstLast: parseInt(commands[i + 2], 16),
									pNext: parseInt(commands[i + 3], 16),
								},
							}
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '16'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '17':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 4
							data = {
								heatingCoolingTargetTempRanges: {
									heatingTempMin: parseInt(commands[i + 1], 16),
									heatingTempMax: parseInt(commands[i + 2], 16),
									coolingTempMin: parseInt(commands[i + 3], 16),
									coolingTempMax: parseInt(commands[i + 4], 16),
								},
							}
						} else {
							command_len = 2
							data = { internalAlgoTdiffParams: { warm: parseInt(commands[i + 1], 16), cold: parseInt(commands[i + 2], 16) } }
						}

						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '17'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '18':
				{
					try {
						let data
						if (deviceType === DeviceType.TValve) {
							command_len = 1
							data = { uplinkType: commands[i + 1] }
						} else {
							command_len = 1
							data = { operationalMode: commands[i + 1].toString() }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '18'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '19':
				{
					try {
						command_len = 1
						let commandResponse = parseInt(commands[i + 1], 16)
						let periodInMinutes = (commandResponse * 5) / 60
						let data = { joinRetryPeriod: periodInMinutes }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '19'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '1a':
				{
					try {
						command_len = 2
						let wdpC = commands[i + 1] == '00' ? false : parseInt(commands[i + 1], 16)
						let wdpUc = commands[i + 2] == '00' ? false : parseInt(commands[i + 2], 16)
						let data = { watchDogParams: { wdpC, wdpUc } }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '1a'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '1b':
				{
					try {
						command_len = 1
						let data = { uplinkType: commands[i + 1] }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '1b'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '1d':
				{
					try {
						command_len = 2
						let wdpC = commands[i + 1] == '00' ? false : parseInt(commands[i + 1], 16)
						let wdpUc = commands[i + 2] == '00' ? false : parseInt(commands[i + 2], 16)
						let data = { watchDogParams: { wdpC, wdpUc } }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '1d'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '1f':
				{
					try {
						if (deviceType === DeviceType.Vicki) {
							command_len = 1
							let data = { primaryOperationalMode: commands[i + 1] }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.DskDevice) {
							command_len = 1
							let data = { status: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.OpenCloseSensor) {
							command_len = 1
							let data = { notificationBlindTime: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.MCButton) {
							command_len = 1
							let data = { sendEventLater: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.Relay16) {
							command_len = 2
							let data = {
								overheatingThresholds: { trigger: parseInt(commands[i + 1], 16), recovery: parseInt(commands[i + 2], 16) },
							}
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.MultiSensor) {
							command_len = 1
							let data = { lightEnabled: parseInt(commands[i + 1], 16) === 1 }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else {
							command_len = 4
							let good_medium = parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16)
							let medium_bad = parseInt(`${commands[i + 3]}${commands[i + 4]}`, 16)
							let data = { boundaryLevels: { good_medium: Number(good_medium), medium_bad: Number(medium_bad) } }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '1f'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '21':
				{
					try {
						if (deviceType === DeviceType.Vicki) {
							command_len = 6
							let data = {
								batteryRangesBoundaries: {
									Boundary1: parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16),
									Boundary2: parseInt(`${commands[i + 3]}${commands[i + 4]}`, 16),
									Boundary3: parseInt(`${commands[i + 5]}${commands[i + 6]}`, 16),
								},
							}
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.Relay16) {
							command_len = 3
							let data = {
								overvoltageThresholds: {
									trigger: (parseInt(commands[i + 1], 16) << 8) | parseInt(commands[i + 2], 16),
									recovery: parseInt(commands[i + 3], 16),
								},
							}
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.MultiSensor) {
							command_len = 1
							let data = { hallEnabled: parseInt(commands[i + 1], 16) === 1 }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType !== DeviceType.OpenCloseSensor) {
							command_len = 2
							let data = { autoZeroValue: parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '21'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '22':
				{
					try {
						if (deviceType === DeviceType.DskDevice) {
							command_len = 2
							let data = { onTime: parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '22'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '23':
				{
					try {
						if (deviceType === DeviceType.Vicki) {
							command_len = 4
							let data = {
								batteryRangesOverVoltage: {
									Range1: parseInt(commands[i + 2], 16),
									Range2: parseInt(commands[i + 3], 16),
									Range3: parseInt(commands[i + 4], 16),
								},
							}
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.DskDevice) {
							command_len = 2
							let data = { offTime: parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.Relay16) {
							command_len = 1
							let data = { overcurrentThreshold: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.MultiSensor) {
							command_len = 2
							let data = { hallBlindPeriod: (parseInt(commands[i + 1], 16) << 8) | parseInt(commands[i + 2], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else {
							command_len = 3
							let good_zone = parseInt(commands[i + 1], 16)
							let medium_zone = parseInt(commands[i + 2], 16)
							let bad_zone = parseInt(commands[i + 3], 16)

							let data = {
								notifyPeriod: { good_zone: Number(good_zone), medium_zone: Number(medium_zone), bad_zone: Number(bad_zone) },
							}
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '23'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '25':
				{
					try {
						let data
						if (deviceType == DeviceType.Relay16) {
							command_len = 2
							data = { overpowerThreshold: (parseInt(commands[i + 1], 16) << 8) | parseInt(commands[i + 2], 16) }
						} else if (deviceType == DeviceType.Vicki) {
							command_len = 31
							data = {
								debug: {
									batterySubrange: parseInt(commands[i + 1], 16),
									motorCurrentConsumption: parseInt(commands[i + 2], 16) * 4,
									powerSupplyVoltageMeasured: parseInt(commands[i + 3], 16) * 16,
									daysSinceLastDeviceReset: parseInt(commands[i + 4], 16),
									detectedMotorOverVoltages: parseInt(commands[i + 5], 16),
									motorHardwareDriverType: (parseInt(commands[i + 6], 16) >> 4) & 0x0f,
									temperatureSensorModel: parseInt(commands[i + 6], 16) & 0x0f,
									motorTotalTravelSteps:
										(parseInt(commands[i + 7], 16) << 24) |
										(parseInt(commands[i + 8], 16) << 16) |
										(parseInt(commands[i + 9], 16) << 8) |
										parseInt(commands[i + 10], 16),
									packetsSentOnSF7:
										(parseInt(commands[i + 11], 16) << 16) |
										(parseInt(commands[i + 12], 16) << 8) |
										parseInt(commands[i + 13], 16),
									packetsSentOnSF8:
										(parseInt(commands[i + 14], 16) << 16) |
										(parseInt(commands[i + 15], 16) << 8) |
										parseInt(commands[i + 16], 16),
									packetsSentOnSF9:
										(parseInt(commands[i + 17], 16) << 16) |
										(parseInt(commands[i + 18], 16) << 8) |
										parseInt(commands[i + 19], 16),
									packetsSentOnSF10:
										(parseInt(commands[i + 20], 16) << 16) |
										(parseInt(commands[i + 21], 16) << 8) |
										parseInt(commands[i + 22], 16),
									packetsSentOnSF11:
										(parseInt(commands[i + 23], 16) << 16) |
										(parseInt(commands[i + 24], 16) << 8) |
										parseInt(commands[i + 25], 16),
									packetsSentOnSF12:
										(parseInt(commands[i + 26], 16) << 16) |
										(parseInt(commands[i + 27], 16) << 8) |
										parseInt(commands[i + 28], 16),
									totalSentPackets:
										(parseInt(commands[i + 29], 16) << 16) |
										(parseInt(commands[i + 30], 16) << 8) |
										parseInt(commands[i + 31], 16),
								},
							}
						} else if (deviceType === DeviceType.MultiSensor) {
							command_len = 1
							data = { microphoneEnabled: parseInt(commands[i + 1], 16) === 1 }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else {
							command_len = 3
							let good_zone = parseInt(commands[i + 1], 16)
							let medium_zone = parseInt(commands[i + 2], 16)
							let bad_zone = parseInt(commands[i + 3], 16)

							data = {
								measurementPeriod: {
									good_zone: Number(good_zone),
									medium_zone: Number(medium_zone),
									bad_zone: Number(bad_zone),
								},
							}
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '25'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '27':
				{
					try {
						if (deviceType === DeviceType.Vicki) {
							command_len = 1
							let data = { OVAC: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.MultiSensor) {
							command_len = 2
							let data = {
								microphoneSamplingPeriod: (parseInt(commands[i + 1], 16) << 8) | parseInt(commands[i + 2], 16),
							}
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else {
							command_len = 9
							let duration_good_beeping = parseInt(commands[i + 1], 16)
							let duration_good_loud = parseInt(commands[i + 2], 16) * 10
							let duration_good_silent = parseInt(commands[i + 3], 16) * 10
							let duration_medium_beeping = parseInt(commands[i + 4], 16)
							let duration_medium_loud = parseInt(commands[i + 5], 16) * 10
							let duration_medium_silent = parseInt(commands[i + 6], 16) * 10
							let duration_bad_beeping = parseInt(commands[i + 7], 16)
							let duration_bad_loud = parseInt(commands[i + 8], 16) * 10
							let duration_bad_silent = parseInt(commands[i + 9], 16) * 10
							let data = {
								buzzerNotification: {
									duration_good_beeping: Number(duration_good_beeping),
									duration_good_loud: Number(duration_good_loud),
									duration_good_silent: Number(duration_good_silent),
									duration_medium_beeping: Number(duration_medium_beeping),
									duration_medium_loud: Number(duration_medium_loud),
									duration_medium_silent: Number(duration_medium_silent),
									duration_bad_beeping: Number(duration_bad_beeping),
									duration_bad_loud: Number(duration_bad_loud),
									duration_bad_silent: Number(duration_bad_silent),
								},
							}
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '27'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '28':
				{
					command_len = 1
					let data = { manualTargetTemperatureUpdate: parseInt(commands[i + 1], 16) }
					Object.assign(resultToPass, { ...resultToPass }, { ...data })
				}
				break
			case '29':
				{
					try {
						if (deviceType === DeviceType.Vicki) {
							command_len = 2
							let coefficient = parseInt(commands[i + 1], 16)
							let period = parseInt(commands[i + 2], 16)
							let data = { proportionalAlgorithmParameters: { coefficient: Number(coefficient), period: Number(period) } }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.MultiSensor) {
							command_len = 1
							let data = { gasEnabled: parseInt(commands[i + 1], 16) === 1 }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else {
							command_len = 15
							let red_good = parseInt(commands[i + 1], 16)
							let green_good = parseInt(commands[i + 2], 16)
							let blue_good = parseInt(commands[i + 3], 16)
							let duration_good = parseInt(`${commands[i + 4]}${commands[i + 5]}`, 16) * 10
							let red_medium = parseInt(commands[i + 6], 16)
							let green_medium = parseInt(commands[i + 7], 16)
							let blue_medium = parseInt(commands[i + 8], 16)
							let duration_medium = parseInt(`${commands[i + 9]}${commands[i + 10]}`, 16) * 10
							let red_bad = parseInt(commands[i + 11], 16)
							let green_bad = parseInt(commands[i + 12], 16)
							let blue_bad = parseInt(commands[i + 13], 16)
							let duration_bad = parseInt(`${commands[i + 14]}${commands[i + 15]}`, 16) * 10
							let data = {
								ledNotification: {
									red_good: Number(red_good),
									green_good: Number(green_good),
									blue_good: Number(blue_good),
									duration_good: Number(duration_good),
									red_medium: Number(red_medium),
									green_medium: Number(green_medium),
									blue_medium: Number(blue_medium),
									duration_medium: Number(duration_medium),
									red_bad: Number(red_bad),
									green_bad: Number(green_bad),
									blue_bad: Number(blue_bad),
									duration_bad: Number(duration_bad),
								},
							}
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '29'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '2b':
				{
					try {
						if (deviceType === DeviceType.Vicki) {
							command_len = 1
							let algo = 'equal'
							switch (parseInt(commands[i + 1], 16)) {
								case 0:
									algo = 'proportional'
									break
								case 1:
									algo = 'equal'
									break
								case 2:
									algo = 'proportionalIntegral'
									break
							}
							let data = { temperatureControlAlgorithm: algo }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.MultiSensor) {
							command_len = 1
							let data = { gasMeasurementPeriodMinutes: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else {
							command_len = 1
							let data = { autoZeroPeriod: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '2b'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '2d':
				{
					try {
						if (deviceType === DeviceType.MultiSensor) {
							command_len = 1
							let data = { pirEnabled: parseInt(commands[i + 1], 16) === 1 }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '2d'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '2f':
				{
					try {
						let data
						if (deviceType === DeviceType.MultiSensor) {
							command_len = 2
							data = { pirBlindPeriod: (parseInt(commands[i + 1], 16) << 8) | parseInt(commands[i + 2], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (
							deviceType === DeviceType.CO2DisplayLite ||
							deviceType === DeviceType.CO2PirLite ||
							deviceType === DeviceType.HTPirLite
						) {
							command_len = 1
							data = { uplinkSendingOnButtonPress: parseInt(commands[i + 1], 16) }
						} else {
							command_len = 1
							data = { targetTemperature: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '2f'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '30':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 2
							data = {
								manualTargetTemperatureUpdate: ((parseInt(commands[i + 1], 16) << 8) | parseInt(commands[i + 2], 16)) / 10,
							}
						} else {
							command_len = 1
							data = { manualTargetTemperatureUpdate: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '30'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break

			case 'a4':
				{
					try {
						command_len = 1
						let data = { region: parseInt(commands[i + 1], 16) }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command 'a4'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '32':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { valveOpenCloseTime: parseInt(commands[i + 1], 16) }
						} else if (deviceType === DeviceType.HTSensor) {
							command_len = 2
							data = {
								temperatureCompensation: {
									negativeCompensation: !!parseInt(commands[i + 1], 16),
									compensation: parseInt(commands[i + 2], 16) / 10,
								},
							}
						} else {
							command_len = 1
							data = { heatingStatus: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '32'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '34':
				{
					try {
						if (deviceType === DeviceType.Vicki) {
							command_len = 1
							let data = { childLockBehavior: commands[i + 1] }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.HTSensor) {
							command_len = 2
							let data = {
								humidityCompensation: {
									negativeCompensation: !!parseInt(commands[i + 1], 16),
									compensation: parseInt(commands[i + 2], 16),
								},
							}
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else {
							command_len = 1
							let data = { displayRefreshPeriod: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '34'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '36':
				{
					try {
						if (deviceType === DeviceType.Vicki) {
							command_len = 3
							let kp = parseInt(`${commands[i + 1]}${commands[i + 2]}${commands[i + 3]}`, 16) / 131072
							let data = { proportionalGain: Number(kp).toFixed(5) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							let data = { extAutomaticTemperatureControl: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else {
							command_len = 1
							let data = { sendTargetTempDelay: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '36'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '38':
				{
					try {
						command_len = 1
						let data = { automaticHeatingStatus: parseInt(commands[i + 1], 16) }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '38'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '3a':
				{
					try {
						command_len = 1
						let data = { sensorMode: parseInt(commands[i + 1], 16) }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '3a'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '3d':
				{
					try {
						if (deviceType === DeviceType.Vicki) {
							command_len = 3
							let ki = parseInt(`${commands[i + 1]}${commands[i + 2]}${commands[i + 3]}`, 16) / 131072
							let data = { integralGain: Number(ki).toFixed(5) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else {
							command_len = 1
							let data = { pirSensorStatus: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '3d'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '3e':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 2
							data = { extSensorTemperature: parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16) / 10 }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '3e'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '3f':
				{
					try {
						if (deviceType === DeviceType.Vicki) {
							command_len = 2
							let data = { integralValue: parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16) / 10 }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else {
							command_len = 1
							let data = { pirSensorSensitivity: parseInt(commands[i + 1], 16) }
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						}
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '3f'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '40':
				{
					try {
						command_len = 1
						let data = { piRunPeriod: parseInt(commands[i + 1], 16) }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '40'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '41':
				{
					try {
						command_len = 1
						let data = { currentTemperatureVisibility: parseInt(commands[i + 1], 16) }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '41'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '42':
				{
					try {
						command_len = 1
						let data = { tempHysteresis: parseInt(commands[i + 1], 16) / 10 }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '42'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '43':
				{
					try {
						command_len = 1
						let data = { humidityVisibility: parseInt(commands[i + 1], 16) }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '43'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '44':
				{
					try {
						command_len = 2
						let data = { extSensorTemperature: parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16) / 10 }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '44'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '45':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { fanSpeed: parseInt(commands[i + 1], 16) }
						} else {
							command_len = 1
							data = { lightIntensityVisibility: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '45'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '46':
				{
					try {
						command_len = 3
						let enabled = !!parseInt(commands[i + 1], 16)
						let duration = parseInt(commands[i + 2], 16) * 5
						let delta = parseInt(commands[i + 3], 16) / 10
						let data = { openWindowPrecisely: { enabled: enabled, duration: duration, delta: delta } }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '46'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '47':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { fanSpeedLimit: parseInt(commands[i + 1], 16) }
						} else {
							command_len = 1
							data = { pirInitPeriod: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '47'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '48':
				{
					try {
						command_len = 1
						let data = { forceAttach: !!parseInt(commands[i + 1], 16) }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '48'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '49':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 2
							data = { ecmVoltageRange: { min: parseInt(commands[i + 1], 16) / 10, max: parseInt(commands[i + 2], 16) / 10 } }
						} else {
							command_len = 1
							data = { pirMeasurementPeriod: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '49'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '4a':
				{
					try {
						command_len = 3
						let activatedTemperature = parseInt(commands[i + 1], 16) / 10
						let deactivatedTemperature = parseInt(commands[i + 2], 16) / 10
						let targetTemperature = parseInt(commands[i + 3], 16)
						let data = { antiFreezeParams: { activatedTemperature, deactivatedTemperature, targetTemperature } }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '4a'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '4b':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { ecmStartUpTime: parseInt(commands[i + 1], 16) }
						} else if (deviceType === DeviceType.Vicki) {
							command_len = 1
							data = { patchVersion: parseInt(commands[i + 1], 16) }
						} else {
							command_len = 2
							data = { pirCheckPeriod: parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '4b'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '4d':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { ecmRelay: parseInt(commands[i + 1], 16) }
						} else if (deviceType === DeviceType.Vicki) {
							command_len = 2
							data = { maxAllowedIntegralValue: parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16) / 10 }
						} else {
							command_len = 2
							data = { pirBlindPeriod: parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '4d'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '4f':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { frostProtection: parseInt(commands[i + 1], 16) }
						} else if (deviceType === DeviceType.WirelessThermostat) {
							command_len = 1
							data = { temperatureHysteresis: parseInt(commands[i + 1], 16) / 10 }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '4f'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '50':
				{
					try {
						command_len = 2
						let data = {
							valveOpennessRangeInPercentage: {
								max: 100 - parseInt(commands[i + 1], 16),
								min: 100 - parseInt(commands[i + 2], 16),
							},
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '50'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '51':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 2
							data = {
								frostProtectionSettings: { threshold: parseInt(commands[i + 1], 16), setpoint: parseInt(commands[i + 2], 16) },
							}
						} else if (deviceType === DeviceType.WirelessThermostat) {
							command_len = 2
							data = { targetTemperature: parseInt(`0x${commands[i + 1]}${commands[i + 2]}`, 16) / 10 }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '51'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '52':
				{
					try {
						command_len = 2
						let data = { targetTemperatureFloat: parseInt(`${commands[i + 1]}${commands[i + 2]}`, 16) / 10 }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '52'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '53':
				{
					try {
						command_len = 1
						let data = { targetTemperatureStep: parseInt(commands[i + 1], 16) / 10 }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '53'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '54':
				{
					try {
						let data
						if (deviceType === DeviceType.WirelessThermostat) {
							command_len = 2
							data = { manualTargetTemperatureUpdate: parseInt(`0x${commands[i + 1]}${commands[i + 2]}`, 16) / 10 }
						} else if (deviceType === DeviceType.Relay16 || deviceType === DeviceType.Relay16Dry) {
							command_len = 1
							data = { relayStateChangeReason: parseInt(commands[i + 1], 16) }
						} else {
							command_len = 1
							let offset = (parseInt(commands[i + 1], 16) - 28) * 0.176
							data = { temperatureOffset: offset }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '54'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '55':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { allowedOperationalModes: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '55'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '56':
				{
					try {
						let data
						if (deviceType === DeviceType.Vicki) {
							command_len = 1
							data = { displayTemperatureUnits: parseInt(commands[i + 1], 16) }
						} else if (deviceType === DeviceType.Relay16 || deviceType === DeviceType.Relay16Dry) {
							command_len = 3
							let state = parseInt(commands[i + 1], 16)
							let time = (parseInt(commands[i + 2], 16) << 8) | parseInt(commands[i + 3], 16)
							data = { relayTimerInMilliseconds: { state, time } }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '56'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '57':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { coolingSetpointNotOccupied: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '57'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '58':
				{
					try {
						let data
						if (deviceType === DeviceType.Vicki) {
							command_len = 2
							let notificationByte = parseInt(commands[i + 1], 16)
							// Extract notification flags from bits
							let temperatureRestoredAfterManualBoost = !!(notificationByte & 0x01) // Bit 0
							let temperatureChangedByHeatingSchedule = !!(notificationByte & 0x02) // Bit 1
							data = {
								notifications: {
									temperatureRestoredAfterManualBoost: temperatureRestoredAfterManualBoost,
									temperatureChangedByHeatingSchedule: temperatureChangedByHeatingSchedule,
								},
							}
						} else {
							command_len = 3
							let state = parseInt(commands[i + 1], 16)
							let time = (parseInt(commands[i + 2], 16) << 8) | parseInt(commands[i + 3], 16)
							data = { relayTimerInSeconds: { state, time } }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '58'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '59':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { heatingSetpointNotOccupied: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '59'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '5b':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 2
							data = {
								tempSensorCompensation: {
									compensation: parseInt(commands[i + 1], 16),
									temperature: parseInt(commands[i + 2], 16) / 10,
								},
							}
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '5b'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '5d':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { fanSpeedNotOccupied: parseInt(commands[i + 1], 16) }
						} else {
							command_len = 1
							data = { manualChangeRelayState: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '5d'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '5f':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { automaticChangeover: parseInt(commands[i + 1], 16) }
						} else if (deviceType === DeviceType.Relay16) {
							command_len = 1
							data = { relayRecoveryState: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '5f'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '60':
				{
					try {
						let data
						if (deviceType === DeviceType.Relay16) {
							command_len = 2
							data = {
								overheatingEvents: { events: parseInt(commands[i + 1], 16), temperature: parseInt(commands[i + 2], 16) },
							}
						} else if (deviceType === DeviceType.Vicki) {
							command_len = 1
							let offsetByte = parseInt(commands[i + 1], 16)
							let offsetHours = offsetByte & 0x80 ? offsetByte - 256 : offsetByte
							data = { deviceTimeZone: offsetHours }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '60'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '61':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { wiringDiagram: parseInt(commands[i + 1], 16) }
						} else if (deviceType === DeviceType.Relay16) {
							command_len = 3
							data = {
								overvoltageEvents: {
									events: parseInt(commands[i + 1], 16),
									voltage: (parseInt(commands[i + 2], 16) << 8) | parseInt(commands[i + 3], 16),
								},
							}
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '61'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '62':
				{
					try {
						let data
						if (deviceType === DeviceType.Relay16) {
							command_len = 3
							data = {
								overcurrentEvents: {
									events: parseInt(commands[i + 1], 16),
									current: (parseInt(commands[i + 2], 16) << 8) | parseInt(commands[i + 3], 16),
								},
							}
						} else {
							command_len = 1
							let timeValue = parseInt(commands[i + 1], 16)
							data = { autoSetpointRestoreStatus: timeValue === 0 ? 0 : timeValue * 10 }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '62'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '63':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { occFunction: parseInt(commands[i + 1], 16) }
						} else if (deviceType == DeviceType.Relay16) {
							command_len = 3
							data = {
								overpowerEvents: {
									events: parseInt(commands[i + 1], 16),
									power: (parseInt(commands[i + 2], 16) << 8) | parseInt(commands[i + 3], 16),
								},
							}
						}

						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '63'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '65':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 2
							data = {
								automaticChangeoverThreshold: {
									coolingThreshold: parseInt(commands[i + 1], 16),
									heatingThreshold: parseInt(commands[i + 2], 16),
								},
							}
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '65'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '69':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { returnOfPowerOperation: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '69'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '6b':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { deltaTemperature1: parseInt(commands[i + 1], 16) / 10 }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '6b'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '6d':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 2
							data = {
								deltaTemperature2and3: {
									deltaTemperature2: parseInt(commands[i + 1], 16) / 10,
									deltaTemperature3: parseInt(commands[i + 2], 16) / 10,
								},
							}
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '6d'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '6e':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { frostProtectionStatus: parseInt(commands[i + 1], 16) }
						} else {
							command_len = 1
							data = { timeRequestByMACcommand: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '6e'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '70':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { occupancySensorStatusSetPoint: parseInt(commands[i + 1], 16) }
						} else if (deviceType === DeviceType.Relay16) {
							command_len = 2
							data = { overheatingRecoveryTime: (parseInt(commands[i + 1], 16) << 8) | parseInt(commands[i + 2], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '70'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '71':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { occupancySensorStatus: parseInt(commands[i + 1], 16) }
						} else if (deviceType === DeviceType.Relay16) {
							command_len = 2
							data = { overvoltageRecoveryTime: (parseInt(commands[i + 1], 16) << 8) | parseInt(commands[i + 2], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '71'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '72':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { dewPointSensorStatus: parseInt(commands[i + 1], 16) }
						} else if (deviceType === DeviceType.Relay16) {
							command_len = 1
							data = { overcurrentRecoveryTemp: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '72'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '73':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { filterAlarm: parseInt(commands[i + 1], 16) }
						} else if (deviceType === DeviceType.Relay16) {
							command_len = 1
							data = { overpowerRecoveryTemp: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '73'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '74':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 2
							data = {
								automaticChangeoverMode: {
									ntcTemperature: parseInt(commands[i + 1], 16),
									automaticChangeover: parseInt(commands[i + 2], 16),
								},
							}
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '74'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '75':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { powerModuleStatus: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '75'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '77':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 4
							data = {
								heatingCoolingTargetTempRangesUnoccupied: {
									heatingTempMin: parseInt(commands[i + 1], 16),
									heatingTempMax: parseInt(commands[i + 2], 16),
									coolingTempMin: parseInt(commands[i + 3], 16),
									coolingTempMax: parseInt(commands[i + 4], 16),
								},
							}
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '77'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '79':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { fanOffDelayTime: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '79'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '7b':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { additionalFanMode: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '7b'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '7c':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { internalTemperatureSensorError: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '7c'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '7d':
				{
					try {
						let data
						if (deviceType === DeviceType.FanCoilThermostat) {
							command_len = 1
							data = { externalTemperatureSensorError: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '7d'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '80':
				{
					try {
						command_len = 1
						let data = { measurementBlindTime: parseInt(commands[i + 1], 16) }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '80'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '83':
				{
					try {
						command_len = 1
						let bin = decbin(parseInt(commands[i + 1], 16))
						let chart = Number(bin[5])
						let digital_value = Number(bin[6])
						let emoji = Number(bin[7])
						let data = { imagesVisibility: { chart, digital_value, emoji } }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '83'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case 'b1':
				{
					try {
						let data
						if (deviceType === DeviceType.MCButton) {
							command_len = 3
							data = {
								singlePressEventCounter:
									(parseInt(commands[i + 1], 16) << 16) | (parseInt(commands[i + 2], 16) << 8) | parseInt(commands[i + 3], 16),
							}
						} else {
							command_len = 1
							data = { relayState: parseInt(commands[i + 1], 16) === 0x01 }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command 'b1'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case 'b2':
				{
					try {
						command_len = 3
						let data = {
							doublePressEventCounter:
								(parseInt(commands[i + 1], 16) << 16) | (parseInt(commands[i + 2], 16) << 8) | parseInt(commands[i + 3], 16),
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command 'b2'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case 'b3':
				{
					try {
						command_len = 3
						let data = {
							triplePressEventCounter:
								(parseInt(commands[i + 1], 16) << 16) | (parseInt(commands[i + 2], 16) << 8) | parseInt(commands[i + 3], 16),
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command 'b3'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case 'a0':
				{
					try {
						command_len = 4
						let fuota_address = parseInt(`${commands[i + 1]}${commands[i + 2]}${commands[i + 3]}${commands[i + 4]}`, 16)
						let fuota_address_raw = `${commands[i + 1]}${commands[i + 2]}${commands[i + 3]}${commands[i + 4]}`
						let data = { fuota: { fuota_address, fuota_address_raw } }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command 'a0'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case 'a6':
				{
					try {
						command_len = 1
						let data = { crystalOscillatorError: true }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command 'a6'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '5a':
				{
					try {
						let data
						if (deviceType === DeviceType.Relay16 || deviceType === DeviceType.Relay16Dry) {
							command_len = 1
							data = { afterOverheatingProtectionRecovery: parseInt(commands[i + 1], 16) }
						} else {
							command_len = 41
							let eventsGroup = parseInt(commands[i + 1], 16) // 0 = events 0-7, 1 = events 8-15, 2 = events 16-19
							let eventGroupIndex = ['0-7', '8-15', '16-19']
							let heatingEvents = []

							// Process up to 8 events for groups 0 and 1, but only 4 events for group 2
							let eventsToProcess = eventsGroup === 2 ? 4 : 8
							for (let eventIdx = 0; eventIdx < eventsToProcess; eventIdx++) {
								// Each event takes 5 bytes (hour, minute, temp high, temp low, weekday bitmask)
								let offset = i + 2 + eventIdx * 5

								// Check if this event is configured
								// Make sure we have valid values at this offset
								if (offset >= commands.length || offset + 4 >= commands.length) {
									continue
								}

								let hour = parseInt(commands[offset], 16)
								let minute = parseInt(commands[offset + 1], 16)
								let tempHigh = parseInt(commands[offset + 2], 16)
								let tempLow = parseInt(commands[offset + 3], 16)
								let weekdayByte = parseInt(commands[offset + 4], 16)

								// Skip events that are not configured (zeros or NaN values)
								if (
									isNaN(hour) ||
									isNaN(minute) ||
									isNaN(tempHigh) ||
									isNaN(tempLow) ||
									isNaN(weekdayByte) ||
									(hour === 0 && minute === 0 && tempHigh === 0 && tempLow === 0 && weekdayByte === 0)
								) {
									continue
								}

								// Calculate actual event index in the full range (0-23)
								let globalEventIndex = eventsGroup * 8 + eventIdx
								// Decode weekday bitmask (bit 0=Mon, bit 1=Tue, bit 2=Wed, bit 3=Thu, bit 4=Fri, bit 5=Sat, bit 6=Sun)
								let weekdays = {
									monday: !!(weekdayByte & 0x01), // bit 0
									tuesday: !!(weekdayByte & 0x02), // bit 1
									wednesday: !!(weekdayByte & 0x04), // bit 2
									thursday: !!(weekdayByte & 0x08), // bit 3
									friday: !!(weekdayByte & 0x10), // bit 4
									saturday: !!(weekdayByte & 0x20), // bit 5
									sunday: !!(weekdayByte & 0x40), // bit 6
								}

								// Create heating event object
								let heatingEvent = {
									index: globalEventIndex,
									start: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
									targetTemperature: ((tempHigh << 8) | tempLow) / 10,
									weekdays: weekdays,
								}
								heatingEvents.push(heatingEvent)
							}
							data = {
								heatingEventGroup: eventGroupIndex[eventsGroup],
								heatingEvents: heatingEvents,
							}
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '5a'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '5c':
				{
					try {
						let data
						if (deviceType === DeviceType.Vicki) {
							command_len = 4
							// Note: Months are 0-11 (January=0, December=11)
							let startMonth = parseInt(commands[i + 1], 16)
							let startDay = parseInt(commands[i + 2], 16)
							let endMonth = parseInt(commands[i + 3], 16)
							let endDay = parseInt(commands[i + 4], 16)

							// Convert to human-readable month names
							let monthNames = [
								'January',
								'February',
								'March',
								'April',
								'May',
								'June',
								'July',
								'August',
								'September',
								'October',
								'November',
								'December',
							]

							data = {
								heatingSchedule: {
									start: startDay + ' ' + monthNames[startMonth],
									end: endDay + ' ' + monthNames[endMonth],
								},
							}
							Object.assign(resultToPass, { ...resultToPass }, { ...data })
						} else {
							command_len = 1
							data = { ledIndicationMode: parseInt(commands[i + 1], 16) }
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '5c'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '5e':
				{
					try {
						command_len = 4
						// Parse 32-bit UNIX timestamp (4 bytes)
						var unixTimestamp =
							(parseInt(commands[i + 1], 16) << 24) |
							(parseInt(commands[i + 2], 16) << 16) |
							(parseInt(commands[i + 3], 16) << 8) |
							parseInt(commands[i + 4], 16)

						// Convert UNIX timestamp to JavaScript Date
						let dateObj = new Date(unixTimestamp * 1000) // Convert seconds to milliseconds
						let date = dateObj.getUTCDate() + '/' + (dateObj.getUTCMonth() + 1) + '/' + dateObj.getUTCFullYear()
						let time = dateObj.getUTCHours() + ':' + (dateObj.getUTCMinutes() < 10 ? '0' : '') + dateObj.getUTCMinutes()
						let data = {
							deviceTime: '' + date + ' ' + time,
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '5e'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '64':
				{
					try {
						command_len = 1
						let ledDurationValue = parseInt(commands[i + 1], 16)
						let durationInSeconds = ledDurationValue / 2 // As per the docs, value is divided by 2 to get seconds

						let data = {
							ledIndicationDuration: durationInSeconds,
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '64'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '66':
				{
					try {
						command_len = 2

						let tempHigh = parseInt(commands[i + 1], 16)
						let tempLow = parseInt(commands[i + 2], 16)
						let targetTemp = (tempHigh << 8) | tempLow
						let data = {
							offlineTargetTemperature: targetTemp === 0 ? 0 : targetTemp / 10,
						}
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '66'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '68':
				{
					try {
						command_len = 1
						let data = { internalAlgoTemporaryState: parseInt(commands[i + 1], 16) === 0 ? true : false }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '68'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '6a':
				{
					try {
						command_len = 12
						let temperatureLevels: { [key: string]: number } = {}

						// Process 6 scale levels (0-5), each with a 2-byte temperature value
						for (let level = 0; level < 6; level++) {
							let tempHighByte = parseInt(commands[i + 1 + level * 2], 16)
							let tempLowByte = parseInt(commands[i + 2 + level * 2], 16)
							let tempValue = (tempHighByte << 8) | tempLowByte

							// The temperature values are pre-multiplied by 10
							temperatureLevels['level' + level] = tempValue / 10
						}

						let data = {
							temperatureLevels: temperatureLevels,
						}

						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '6a'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			case '6c': {
				try {
					command_len = 4
					let eventsHighByte = parseInt(commands[i + 2], 16) // Events 19-16
					let eventsMidByte = parseInt(commands[i + 3], 16) // Events 15-8
					let eventsLowByte = parseInt(commands[i + 4], 16) // Events 7-0

					// Create a more structured and readable format for heating events
					let heatingEventStates: { [key: string]: boolean } = {}

					// Process all 20 events (0-19) in a single loop
					for (let eventIdx = 0; eventIdx < 20; eventIdx++) {
						// Calculate which bit to check
						let bitPosition
						if (eventIdx >= 16) {
							// Events 16-19 in high byte
							bitPosition = eventIdx - 16
							heatingEventStates[eventIdx] = !!(eventsHighByte & (1 << bitPosition))
						} else if (eventIdx >= 8) {
							// Events 8-15 in mid byte
							bitPosition = eventIdx - 8
							heatingEventStates[eventIdx] = !!(eventsMidByte & (1 << bitPosition))
						} else {
							// Events 0-7 in low byte
							bitPosition = eventIdx
							heatingEventStates[eventIdx] = !!(eventsLowByte & (1 << bitPosition))
						}
					}

					let data = {
						heatingEventStates: heatingEventStates,
					}

					Object.assign(resultToPass, { ...resultToPass }, { ...data })
				} catch (e) {
					throw new CustomError({
						message: `Failed to process command '6c'`,
						hexData,
						command,
						deviceType,
						originalError: e as Error,
					})
				}
				break
			}
			case '9b':
				{
					try {
						command_len = 1
						let data = { userInterfaceLanguage: parseInt(commands[i + 1], 16) }
						Object.assign(resultToPass, { ...resultToPass }, { ...data })
					} catch (e) {
						throw new CustomError({
							message: `Failed to process command '9b'`,
							hexData,
							command,
							deviceType,
							originalError: e as Error,
						})
					}
				}
				break
			default:
				decodeKeepalive(commands, payloadLength, deviceType)
				commands.splice(i, commands.length)
				break
		}
		commands.splice(i, command_len)
	})
	return resultToPass
}
