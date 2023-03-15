module.exports = {
    rootDir: '../',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    testPathIgnorePatterns: [
        'data',
    ],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js'
    ],
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/build/'
    ],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
            // branches: 90,
            // functions: 95,
            // lines: 95,
            // statements: 95
        }
    },
    collectCoverageFrom: [
        'source/*.{js,ts}'
    ],
    testTimeout: 30000,
    moduleNameMapper: {
        "~client/(.*)": "<rootDir>/source/client/$1",
        "~server/(.*)": "<rootDir>/source/server/$1",
        "~kernel-assets/(.*)": "<rootDir>/source/shared/kernel/assets/$1",
        "~kernel-components/(.*)": "<rootDir>/source/shared/kernel/components/$1",
        "~kernel-containers/(.*)": "<rootDir>/source/shared/kernel/containers/$1",
        "~kernel-planes/(.*)": "<rootDir>/source/shared/kernel/planes/$1",
        "~kernel-data/(.*)": "<rootDir>/source/shared/kernel/data/$1",
        "~kernel-services/(.*)": "<rootDir>/source/shared/kernel/services/$1",
        "~routes/(.*)": "<rootDir>/source/shared/routes/$1",
        "~shell/(.*)": "<rootDir>/source/shared/shell/$1"
    },
}
