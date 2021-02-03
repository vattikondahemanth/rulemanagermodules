/// <amd-module name="@angular/compiler-cli/ngcc/src/rendering/renderer" />
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ConstantPool } from '@angular/compiler';
import * as ts from 'typescript';
import { ImportManager } from '../../../src/ngtsc/translator';
import { CompiledClass, CompiledFile, DecorationAnalyses } from '../analysis/types';
import { PrivateDeclarationsAnalyses } from '../analysis/private_declarations_analyzer';
import { SwitchMarkerAnalyses, SwitchMarkerAnalysis } from '../analysis/switch_marker_analyzer';
import { FileSystem } from '../../../src/ngtsc/file_system';
import { EntryPointBundle } from '../packages/entry_point_bundle';
import { Logger } from '../logging/logger';
import { FileToWrite } from './utils';
import { RenderingFormatter } from './rendering_formatter';
/**
 * A base-class for rendering an `AnalyzedFile`.
 *
 * Package formats have output files that must be rendered differently. Concrete sub-classes must
 * implement the `addImports`, `addDefinitions` and `removeDecorators` abstract methods.
 */
export declare class Renderer {
    private srcFormatter;
    private fs;
    private logger;
    private bundle;
    constructor(srcFormatter: RenderingFormatter, fs: FileSystem, logger: Logger, bundle: EntryPointBundle);
    renderProgram(decorationAnalyses: DecorationAnalyses, switchMarkerAnalyses: SwitchMarkerAnalyses, privateDeclarationsAnalyses: PrivateDeclarationsAnalyses): FileToWrite[];
    /**
     * Render the source code and source-map for an Analyzed file.
     * @param compiledFile The analyzed file to render.
     * @param targetPath The absolute path where the rendered file will be written.
     */
    renderFile(sourceFile: ts.SourceFile, compiledFile: CompiledFile | undefined, switchMarkerAnalysis: SwitchMarkerAnalysis | undefined, privateDeclarationsAnalyses: PrivateDeclarationsAnalyses): FileToWrite[];
    /**
     * From the given list of classes, computes a map of decorators that should be removed.
     * The decorators to remove are keyed by their container node, such that we can tell if
     * we should remove the entire decorator property.
     * @param classes The list of classes that may have decorators to remove.
     * @returns A map of decorators to remove, keyed by their container node.
     */
    private computeDecoratorsToRemove;
}
/**
 * Render the constant pool as source code for the given class.
 */
export declare function renderConstantPool(sourceFile: ts.SourceFile, constantPool: ConstantPool, imports: ImportManager): string;
/**
 * Render the definitions as source code for the given class.
 * @param sourceFile The file containing the class to process.
 * @param clazz The class whose definitions are to be rendered.
 * @param compilation The results of analyzing the class - this is used to generate the rendered
 * definitions.
 * @param imports An object that tracks the imports that are needed by the rendered definitions.
 */
export declare function renderDefinitions(sourceFile: ts.SourceFile, compiledClass: CompiledClass, imports: ImportManager): string;
