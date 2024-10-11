import { GeneralCommands } from '@/encoders/GeneralCommands'
import { DisplayCommands } from '@/encoders/DisplayCommands'
import { applyMixins } from '@/utils'

export class HTDisplayLite {}

applyMixins(HTDisplayLite, [GeneralCommands, DisplayCommands])
