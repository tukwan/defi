const fs = require('fs')
const path = require('path')

// Consts
const indexFilePath = path.resolve('./', 'index.ts')
const abisPath = path.resolve('./', 'build/contracts')
const abisFiles = fs.readdirSync(abisPath)

// Builders
const safeVariableName = fileName => {
  const indexOfDot = fileName.indexOf('.')
  return fileName.slice(0, indexOfDot)
}

const buildImportBlocks = files => {
  const importBlocks = files.map(
    fileName => 'import ' + safeVariableName(fileName) + " from './build/contracts/" + fileName + "'"
  )
  const importBlocksJoined = importBlocks.join('\n')
  return importBlocksJoined
}

const buildExportBlocks = files => {
  const startExport = 'export const ABIS = {\n'
  const endExport = '\n}'
  const exportBlocks = files.map(fileName => '  ' + safeVariableName(fileName))
  const exportBlocksJoined = exportBlocks.join(',\n')
  const finalExport = startExport + exportBlocksJoined + endExport
  return finalExport
}

const indexCode = files => buildImportBlocks(files) + '\n\n' + buildExportBlocks(files)

// Writer
fs.writeFileSync(indexFilePath, indexCode(abisFiles))
