/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="tsickle/src/module_type_translator" />
/**
 * @fileoverview module_type_translator builds on top of type_translator, adding functionality to
 * translate types within the scope of a single module. The main entry point is
 * ModuleTypeTranslator.
 */
import * as ts from 'typescript';
import { AnnotatorHost } from './annotator_host';
import * as jsdoc from './jsdoc';
import * as typeTranslator from './type_translator';
/**
 * MutableJSDoc encapsulates a (potential) JSDoc comment on a specific node, and allows code to
 * modify (including delete) it.
 */
export declare class MutableJSDoc {
    private node;
    private sourceComment;
    tags: jsdoc.Tag[];
    constructor(node: ts.Node, sourceComment: ts.SynthesizedComment | null, tags: jsdoc.Tag[]);
    updateComment(escapeExtraTags?: Set<string>): void;
}
/**
 * ModuleTypeTranslator encapsulates knowledge and helper functions to translate types in the scope
 * of a specific module. This includes managing Closure requireType statements and any symbol
 * aliases in scope for a whole file.
 */
export declare class ModuleTypeTranslator {
    sourceFile: ts.SourceFile;
    typeChecker: ts.TypeChecker;
    private host;
    private diagnostics;
    private isForExterns;
    /**
     * A mapping of aliases for symbols in the current file, used when emitting types. TypeScript
     * emits imported symbols with unpredictable prefixes. To generate correct type annotations,
     * tsickle creates its own aliases for types, and registers them in this map (see
     * `emitImportDeclaration` and `requireType()` below). The aliases are then used when emitting
     * types.
     */
    symbolsToAliasedNames: Map<ts.Symbol, string>;
    /**
     * The set of module symbols requireTyped in the local namespace.  This tracks which imported
     * modules we've already added to additionalImports below.
     */
    private requireTypeModules;
    /**
     * The list of generated goog.requireType statements for this module. These are inserted into
     * the module's body statements after translation.
     */
    private additionalImports;
    constructor(sourceFile: ts.SourceFile, typeChecker: ts.TypeChecker, host: AnnotatorHost, diagnostics: ts.Diagnostic[], isForExterns: boolean);
    debugWarn(context: ts.Node, messageText: string): void;
    error(node: ts.Node, messageText: string): void;
    /**
     * Convert a TypeScript ts.Type into the equivalent Closure type.
     *
     * @param context The ts.Node containing the type reference; used for resolving symbols
     *     in context.
     * @param type The type to translate; if not provided, the Node's type will be used.
     * @param resolveAlias If true, do not emit aliases as their symbol, but rather as the resolved
     *     type underlying the alias. This should be true only when emitting the typedef itself.
     */
    typeToClosure(context: ts.Node, type?: ts.Type): string;
    newTypeTranslator(context: ts.Node): typeTranslator.TypeTranslator;
    isBlackListed(context: ts.Node): boolean;
    /**
     * Get the ts.Symbol at a location or throw.
     * The TypeScript API can return undefined when fetching a symbol, but in many contexts we know it
     * won't (e.g. our input is already type-checked).
     */
    mustGetSymbolAtLocation(node: ts.Node): ts.Symbol;
    /** Finds an exported (i.e. not global) declaration for the given symbol. */
    protected findExportedDeclaration(sym: ts.Symbol): ts.Declaration | undefined;
    /**
     * Generates a somewhat human-readable module prefix for the given import context, to make
     * debugging the emitted Closure types a bit easier.
     */
    private generateModulePrefix;
    /**
     * Records that we we want a `const x = goog.requireType...` import of the given `importPath`,
     * which will be inserted when we emit.
     * This also registers aliases for symbols from the module that map to this requireType.
     *
     * @param isDefaultImport True if the import statement is a default import, e.g.
     *     `import Foo from ...;`, which matters for adjusting whether we emit a `.default`.
     */
    requireType(importPath: string, moduleSymbol: ts.Symbol, isDefaultImport?: boolean): void;
    protected ensureSymbolDeclared(sym: ts.Symbol): void;
    insertAdditionalImports(sourceFile: ts.SourceFile): ts.SourceFile;
    /**
     * Parses and synthesizes comments on node, and returns the JSDoc from it, if any.
     * @param reportWarnings if true, will report warnings from parsing the JSDoc. Set to false if
     *     this is not the "main" location dealing with a node to avoid duplicated warnings.
     */
    getJSDoc(node: ts.Node, reportWarnings: boolean): jsdoc.Tag[];
    getMutableJSDoc(node: ts.Node): MutableJSDoc;
    private parseJSDoc;
    /**
     * Creates the jsdoc for methods, including overloads.
     * If overloaded, merges the signatures in the list of SignatureDeclarations into a single jsdoc.
     * - Total number of parameters will be the maximum count found across all variants.
     * - Different names at the same parameter index will be joined with "_or_"
     * - Variable args (...type[] in TypeScript) will be output as "...type",
     *    except if found at the same index as another argument.
     * @param fnDecls Pass > 1 declaration for overloads of same name
     * @return The list of parameter names that should be used to emit the actual
     *    function statement; for overloads, name will have been merged.
     */
    getFunctionTypeJSDoc(fnDecls: ts.SignatureDeclaration[], extraTags?: jsdoc.Tag[]): {
        tags: jsdoc.Tag[];
        parameterNames: string[];
        thisReturnType: ts.Type | null;
    };
}
