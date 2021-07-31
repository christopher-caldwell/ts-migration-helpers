import { ExecSyncOptions } from 'child_process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/** Handles the parsing of cmd line args, sets the config accordingly */
export const handleCli = async () => {
  const { 'path-to-project-root': pathToProjectRoot, 'use-npm': useNpm } = await yargs(hideBin(process.argv))
    .options('path-to-project-root', {
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
    .demandOption('path-to-project-root')
    .version()
    .alias('version', 'v')
    .alias('h', 'help')
    .alias('p', 'pathToProjectRoot')
    .strict().argv
  return { pathToProjectRoot, useNpm }
}

export const gatherCommandContext = (pathToProjectRoot: string): ExecSyncOptions => {
  return { cwd: pathToProjectRoot, env: process.env, encoding: 'utf-8' }
}
