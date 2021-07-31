import { ExecSyncOptions } from 'child_process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/** Handles the parsing of cmd line args, sets the config accordingly */
export const handleCli = async () => {
  const { pathToProjectRoot, 'use-npm': useNpm } = await yargs(hideBin(process.argv))
    .alias('h', 'help')
    .alias('p', 'pathToProjectRoot')
    .options('pathToProjectRoot', {
      type: 'string',
      requiresArg: true,
      describe: 'The path to the package.json that will be the basis of migration'
    })
    .options('use-npm', {
      type: 'boolean',
      default: false,
      describe: 'Will use npm as the page manager instead of yarn'
    })
    .help()
    .demandOption('pathToProjectRoot')
    .version()
    .alias('version', 'v')
    .strict().argv
  return { pathToProjectRoot, useNpm }
}

export const gatherCommandContext = (pathToProjectRoot: string): ExecSyncOptions => {
  return { cwd: pathToProjectRoot, env: process.env, encoding: 'utf-8' }
}
