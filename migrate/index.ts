import { relative } from 'path'
import { readFileSync } from 'fs'
import { execSync, ExecSyncOptions } from 'child_process'
import { cyan, red, green } from 'colors'

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
  console.log('Adding types for', green(runTimeDependencies.length.toString()), 'dependencies. This will take a hot minute.')
  const commands: Command[] = []
  for (const dependency of runTimeDependencies) {
    if (dependency.includes('@')) continue
    const baseCommand = `yarn --silent add -D @types/${dependency}`
    commands.push({
      dependency,
      baseCommand,
    })
  }
  return [
    ...commands,
    {
      // Required to use ts-migrate
      baseCommand: 'yarn add -D typescript ts-migrate',
      dependency: '',
    }
  ]
}

const installTypesAndGatherStubs = (commands: Command[], execSyncOptions: ExecSyncOptions): string[] => {
  const stubTypes: string[] = []
  commands.forEach(({ baseCommand, dependency }) => {
    console.log(cyan(`\nRunning "${baseCommand}"`))
    try {
      execSync('touch out.txt', execSyncOptions)
      execSync(`${baseCommand} > out.txt 2>&1`, execSyncOptions)
      const res = execSync(`grep "stub" out.txt`, execSyncOptions)
      if (res?.toString().includes('stub')) {
        console.log(red(`"${dependency}"`), 'is a stubbed type. Adding to removal list')
        stubTypes.push(`@types/${dependency}`)
      }
    } catch (error) {
      // console.error(red('Error trying to install types'), error)
      // don't care. Means there are no types or the grep failed
    }
  })
  return stubTypes
}

const removeStubs = (stubTypes: string[], execSyncOptions: ExecSyncOptions) => {
  if (!stubTypes.length) return
  console.log('\nRemoving', green(stubTypes.length.toString()), 'stubbed types'))
  execSync(`yarn --silent remove ${stubTypes.join(' ')} > out.txt 2>&1`, execSyncOptions)
  execSync(`rm out.txt`, execSyncOptions)
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
