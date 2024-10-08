export class BaseCommand {
	commandName: string
	cmdId: number
	params: string[]

	constructor(cmdName: string, cmdId: number, ...params: string[]) {
		this.commandName = cmdName
		this.cmdId = cmdId
		this.params = params
	}

	toHex(): string {
		if (this.commandName === 'SetOpenWindow') {
			return (
				this.cmdId.toString(16).padStart(2, '0') +
				this.params.reduce((paramString, param) => {
					return (paramString += param)
				}, '')
			)
		} else {
			return (
				this.cmdId.toString(16).padStart(2, '0') +
				this.params.reduce((paramString, param) => {
					return (paramString += param.padStart(2, '0'))
				}, '')
			)
		}
	}
}
