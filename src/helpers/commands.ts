import { green } from 'colors'

import { Command } from '../interfaces'

export const gatherCommands = (runTimeDependencies: string[], useNpm: boolean): Command[] => {
  const baseAddCommand = useNpm ? 'npm i --save-dev --silent' : 'yarn --silent add -D'
  console.log(
    'Adding types for',
    green(runTimeDependencies.length.toString()),
    'dependencies. This will take a hot minute.'
  )
  const commands: Command[] = []
  for (const dependency of runTimeDependencies) {
    let baseCommand = `${baseAddCommand} @types/${dependency}`
    if (dependency.includes('@')) {
      const rawDependency = dependency.replace('@', '')
      const [scope, packageName] = rawDependency.split('/')
      baseCommand = `@types/${scope}__${packageName}`
    }
    commands.push({
      dependency,
      baseCommand
    })
  }
  return [
    ...commands,
    {
      // Required to use ts-migrate
      baseCommand: `${baseAddCommand} typescript ts-migrate`,
      dependency: ''
    }
  ]
}
