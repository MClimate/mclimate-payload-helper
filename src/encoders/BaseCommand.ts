export class BaseCommand {
	commandName: string
	cmdId: number | string
	params: string[]

	constructor(cmdName: string, cmdId: number | string, ...params: string[]) {
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
				(typeof this.cmdId === 'string' ? this.cmdId : this.cmdId.toString(16)).padStart(2, '0') +
				this.params.reduce((paramString, param) => {
					return (paramString += param.padStart(2, '0'))
				}, '')
			)
		}
	}
}
