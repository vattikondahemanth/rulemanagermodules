"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const ts = require("typescript");
const rules_1 = require("../rules");
const utils_1 = require("../utils");
const theming_1 = require("./theming");
const readSource = (modulePath) => (tree) => {
    const sourceText = utils_1.fileContent(tree, modulePath);
    return ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
};
function updateNgModule(host, moduleToUpdate, data) {
    const read = readSource(moduleToUpdate);
    const changes = utils_1.addImportToModule({
        source: read(host),
        symbolName: data.import,
        modulePath: data.from
    });
    rules_1.applyChanges(host, moduleToUpdate, changes);
    if (data.export) {
        const changes = utils_1.addExportToModule({
            source: read(host),
            symbolName: data.import,
            modulePath: data.from
        });
        rules_1.applyChanges(host, moduleToUpdate, changes);
    }
}
const runner = (deps, callback) => (...options) => deps.forEach(dep => {
    if (!dep.hasOwnProperty('condition') || dep.condition) {
        callback(...options, dep);
    }
});
function importAllModules(options) {
    return (host) => {
        const moduleToUpdate = options.module;
        if (!moduleToUpdate)
            return host;
        const dependencies = [
            {
                import: options.mainNgModule,
                from: `@progress/kendo-angular-${options.package}`,
                export: options.export
            },
            {
                import: 'BrowserAnimationsModule',
                from: '@angular/platform-browser/animations'
            },
            {
                from: 'hammerjs',
                condition: options.importHammerjs
            },
            ...options.dependencies
        ];
        const run = runner(dependencies, updateNgModule);
        run(host, moduleToUpdate);
        return host;
    };
}
function npmInstall(options) {
    return (host, context) => {
        if (options.skipInstall)
            return;
        context.addTask(new tasks_1.NodePackageInstallTask());
    };
}
const progressDependencies = (json, importHammerjs) => {
    const hammerRegEx = importHammerjs ? '|hammerjs' : '';
    const validator = new RegExp(`^(@progress.*${hammerRegEx})$`);
    return Object.entries(json.peerDependencies)
        .filter(([k, v]) => validator.test(k))
        .reduce((s, [k, v]) => (s[k] = v, s), {});
};
function registerInPackageJson(options) {
    return (tree, context) => {
        const fullPackageName = `kendo-angular-${options.package}`;
        const content = utils_1.fileContent(tree, `node_modules/@progress/${fullPackageName}/package.json`);
        const dependencies = progressDependencies(JSON.parse(content), options.importHammerjs);
        return rules_1.addToPackageJson({ dependencies })(tree, context);
    };
}
function ngAdd(options) {
    return (host, context) => {
        const project = utils_1.resolveProject(host, options.project);
        const targets = project.architect || project.targets;
        const mainPath = targets.build.options.main;
        options.module = utils_1.getAppModulePath(host, mainPath);
        const toInstall = schematics_1.chain([
            registerInPackageJson(options),
            theming_1.importTheme(options),
            npmInstall(options) //install as a last rule
        ]);
        return schematics_1.chain([
            importAllModules(options),
            toInstall
        ])(host, context);
    };
}
exports.ngAdd = ngAdd;
