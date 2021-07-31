import { relative } from 'path'
import { readFileSync } from 'fs'
import { red } from 'colors'

export const getRuntimeDependencies = (pathToPackageJson: string): string[] => {
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
