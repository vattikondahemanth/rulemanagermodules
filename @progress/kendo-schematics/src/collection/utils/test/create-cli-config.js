"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const config = {
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    "version": 1,
    "newProjectRoot": "projects",
    "projects": {
        "cli6": {
            "root": "",
            "sourceRoot": "/src",
            "projectType": "application",
            "prefix": "app",
            "schematics": {},
            "architect": {
                "build": {
                    "builder": "@angular-devkit/build-angular:browser",
                    "options": {
                        "outputPath": "dist/cli6",
                        "index": "src/index.html",
                        "main": "src/main.ts",
                        "polyfills": "src/polyfills.ts",
                        "tsConfig": "src/tsconfig.app.json",
                        "assets": [
                            {
                                "glob": "favicon.ico",
                                "input": "src",
                                "output": "/"
                            },
                            {
                                "glob": "**/*",
                                "input": "src/assets",
                                "output": "/assets"
                            }
                        ],
                        "styles": [
                            "src/styles.css"
                        ],
                        "scripts": []
                    },
                    "configurations": {
                        "production": {
                            "fileReplacements": [
                                {
                                    "replace": "src/environments/environment.ts",
                                    "with": "src/environments/environment.prod.ts"
                                }
                            ],
                            "optimization": true,
                            "outputHashing": "all",
                            "sourceMap": false,
                            "extractCss": true,
                            "namedChunks": false,
                            "aot": true,
                            "extractLicenses": true,
                            "vendorChunk": false,
                            "buildOptimizer": true
                        }
                    }
                },
                "serve": {
                    "builder": "@angular-devkit/build-angular:dev-server",
                    "options": {
                        "browserTarget": "cli6:build"
                    },
                    "configurations": {
                        "production": {
                            "browserTarget": "cli6:build:production"
                        }
                    }
                },
                "extract-i18n": {
                    "builder": "@angular-devkit/build-angular:extract-i18n",
                    "options": {
                        "browserTarget": "cli6:build"
                    }
                },
                "test": {
                    "builder": "@angular-devkit/build-angular:karma",
                    "options": {
                        "main": "src/test.ts",
                        "polyfills": "src/polyfills.ts",
                        "tsConfig": "src/tsconfig.spec.json",
                        "karmaConfig": "src/karma.conf.js",
                        "styles": [
                            "styles.css"
                        ],
                        "scripts": [],
                        "assets": [
                            {
                                "glob": "favicon.ico",
                                "input": "src/",
                                "output": "/"
                            },
                            {
                                "glob": "**/*",
                                "input": "src/assets",
                                "output": "/assets"
                            }
                        ]
                    }
                },
                "lint": {
                    "builder": "@angular-devkit/build-angular:tslint",
                    "options": {
                        "tsConfig": [
                            "src/tsconfig.app.json",
                            "src/tsconfig.spec.json"
                        ],
                        "exclude": [
                            "**/node_modules/**"
                        ]
                    }
                }
            }
        },
        "cli6-e2e": {
            "root": "e2e/",
            "projectType": "application",
            "architect": {
                "e2e": {
                    "builder": "@angular-devkit/build-angular:protractor",
                    "options": {
                        "protractorConfig": "e2e/protractor.conf.js",
                        "devServerTarget": "cli6:serve"
                    }
                },
                "lint": {
                    "builder": "@angular-devkit/build-angular:tslint",
                    "options": {
                        "tsConfig": "e2e/tsconfig.e2e.json",
                        "exclude": [
                            "**/node_modules/**"
                        ]
                    }
                }
            }
        }
    },
    "defaultProject": "cli6"
};
function createCliConfig(tree, options = {}) {
    if (options.skipTests) {
        delete config.projects.cli6.architect.test;
    }
    let content = __1.stringify(config);
    if (options.useTargets) {
        content = content.replace(/architect/g, 'targets');
    }
    tree.create('/angular.json', content);
    return tree;
}
exports.createCliConfig = createCliConfig;
