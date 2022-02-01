const { setReleaseVersion, sDistPackage, bDistPackage } = require('../lib/prepare')
const path = require('path')
const fs = require('fs-extra')
const { genPackage } = require('./util')

const version = '1.0.1'
const setupPy = '.tmp/prepare/setup.py'
const distDir = 'dist'
const setupPyDir = path.dirname(setupPy)
const packageName = 'semantic-release-pypi-prepare-test'

beforeAll(async () => {
  await genPackage(setupPy, packageName)
})

afterAll(async () => {
  fs.removeSync(setupPyDir)
})

test('test prepare functions', async () => {
  await expect(setReleaseVersion(setupPy, version)).resolves.toBe(undefined)
  await expect(sDistPackage(setupPy, distDir)).resolves.toBe(undefined)
  await expect(bDistPackage(setupPy, distDir)).resolves.toBe(undefined)
})
