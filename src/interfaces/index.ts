export interface Command {
  baseCommand: string
  dependency: string
}

export interface CliContext {
  pathToProjectRoot: string
  useNpm?: string
}
