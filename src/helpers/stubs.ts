import { execSync, ExecSyncOptions } from 'child_process'
import { cyan, red, green } from 'colors'

import { Command } from '../interfaces'

export const installTypesAndGatherStubs = (commands: Command[], execSyncOptions: ExecSyncOptions): string[] => {
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

export const removeStubs = (stubTypes: string[], execSyncOptions: ExecSyncOptions, useNpm: boolean) => {
  const baseRemoveCommand = useNpm ? 'npm un --silent' : 'yarn --silent remove'
  if (!stubTypes.length) return
  console.log('\nRemoving', green(stubTypes.length.toString()), 'stubbed types')
  execSync(`${baseRemoveCommand} ${stubTypes.join(' ')} > out.txt 2>&1`, execSyncOptions)
  execSync(`rm out.txt`, execSyncOptions)
}
