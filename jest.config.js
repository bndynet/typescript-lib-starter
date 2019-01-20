module.exports = {
    verbose: true,
    transform: {
        ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js",
    },
    testEnvironment: "node",
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    setupTestFrameworkScriptFile: "./test/_setup.ts",
    moduleFileExtensions: ["ts", "tsx", "js"],
    coveragePathIgnorePatterns: ["/node_modules/", "/test/"],
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 60,
            lines: 60,
            statements: 60,
        },
    },
    collectCoverageFrom: ["src/*.{js,ts,tsx}"],
};