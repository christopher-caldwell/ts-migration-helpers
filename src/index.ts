import {
  gatherCommands,
  gatherCommandContext,
  handleCli,
  getRuntimeDependencies,
  installTypesAndGatherStubs,
  removeStubs
} from './helpers'

const main = async () => {
  const { useNpm, pathToProjectRoot } = await handleCli()
  const cliContext = gatherCommandContext(pathToProjectRoot)
  const runtimeDependencies = getRuntimeDependencies(cliContext.cwd as string)
  const commands = gatherCommands(runtimeDependencies, useNpm)
  const stubs = installTypesAndGatherStubs(commands, cliContext)
  removeStubs(stubs, cliContext, useNpm)
}

main()
