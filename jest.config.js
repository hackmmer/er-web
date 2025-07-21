module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  
  // Directorios a ignorar
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/e2e/'
  ],
  
  // Mapeo de rutas (ajusta según tu tsconfig)
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^environments/(.*)$': '<rootDir>/src/environments/$1',
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1'
  },
  
  // Transformación de archivos
  // transform: {
  //   '^.+\\.(ts|js|html|svg)$': 'jest-preset-angular',
  // },
  
  // Extensión de archivos a testear
  moduleFileExtensions: ['ts', 'js', 'html'],
  
  // Configuración de cobertura
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/jest',
  coverageReporters: ['html', 'text', 'text-summary', 'lcov'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/testing/',
    '.mock.ts',
    '.module.ts',
    '.routes.ts'
  ],
  
  // Snapshots
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ]
};