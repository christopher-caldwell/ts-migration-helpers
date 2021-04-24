import { relative } from 'path'
import { readFileSync } from 'fs'
import { execSync, ExecSyncOptions } from 'child_process'
import { cyan, red } from 'colors'

const parseCliArgs = (): ExecSyncOptions => {
  const baseArgs: Record<string, string> = {}
  process.argv.slice(2).map(element => {
    const matches = element.match('--([a-zA-Z0-9]+)=(.*)')
    if (matches) {
      baseArgs[matches[1]] = matches[2].replace(/^['"]/, '').replace(/['"]$/, '')
    }
  })
  if (!((baseArgs as unknown) as CliContext).pathToProjectRoot) throw new Error('pathToProjectRoot not provided')
  return { cwd: baseArgs.pathToProjectRoot, env: process.env, encoding: 'utf-8' }
}

const getRuntimeDependencies = (pathToPackageJson: string): string[] => {
  try {
    const packageJsonPath = relative(process.cwd(), `${pathToPackageJson}/package.json`)
    const packageAsString = readFileSync(packageJsonPath, { encoding: 'utf-8' })
    const parsedJson = JSON.parse(packageAsString)
    const { dependencies } = parsedJson
    return Object.keys(dependencies)
  } catch (error) {
    console.error(red('Error fetching runtime dependencies'), error)
    throw error
  }
}

const gatherCommands = (runTimeDependencies: string[]): Command[] => {
  const commands: Command[] = []
  for (const dependency of runTimeDependencies) {
    if (dependency.includes('@')) continue
    const baseCommand = `@types/${dependency}`
    commands.push({
      dependency,
      baseCommand,
    })
  }
  return commands
}

const installTypesAndGatherStubs = (commands: Command[], execSyncOptions: ExecSyncOptions): string[] => {
  const stubTypes: string[] = []
  const stringSpacedTypes = commands.reduce((accumulator, { baseCommand }) => `${accumulator} ${baseCommand}`, '')

  console.log('stringSpacedTypes', stringSpacedTypes)

  try {
    execSync('touch out.txt', execSyncOptions)
    execSync(`yarn --silent add -D ${stringSpacedTypes} --prefer-offline > out.txt 2>&1`, execSyncOptions)
    const res = execSync(`grep "stub" out.txt`, execSyncOptions)
    console.log('res', res?.toString())
    if (res?.toString().includes('stub')) {
      // console.log(red(dependency), 'is a stubbed type. Adding to removal list')
      // stubTypes.push(`@types/${dependency}`)
    }
  } catch (error) {
    //
  }

  return stubTypes
}

const removeStubs = (stubTypes: string[], execSyncOptions: ExecSyncOptions) => {
  if (!stubTypes.length) return
  console.log(cyan(`Removing ${stubTypes.length} stubbed types`))
  execSync(`yarn --silent remove ${stubTypes.join(' ')}`, execSyncOptions)
}

const main = () => {
  const cliContext = parseCliArgs()
  const runtimeDependencies = getRuntimeDependencies(cliContext.cwd as string)
  const commands = gatherCommands(runtimeDependencies)
  const stubs = installTypesAndGatherStubs(commands, cliContext)
  removeStubs(stubs, cliContext)
}

main()

interface Command {
  baseCommand: string
  dependency: string
}
interface CliContext {
  pathToProjectRoot: string
}
