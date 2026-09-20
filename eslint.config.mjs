// eslint-config-next 16 ships flat config directly, so FlatCompat is no longer needed.
import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'src/payload-types.ts',
      'src/app/(payload)/admin/importMap.js',
    ],
  },
]

export default eslintConfig
