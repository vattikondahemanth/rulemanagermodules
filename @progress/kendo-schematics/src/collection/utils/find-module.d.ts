import { Path } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
export interface ModuleOptions {
    module?: string;
    name?: string;
    flat?: boolean;
    path?: string;
    skipImport?: boolean;
}
/**
 * Find the module referred by a set of options passed to the schematics.
 */
export declare function findModule(host: Tree, options: ModuleOptions): Path | undefined;
/**
 * Function to find the "closest" module to a generated file's path.
 */
export declare function resolveModule(host: Tree, generateDir: string): Path;
/**
 * Build a relative path from one file path to another file path.
 */
export declare function buildRelativePath(from: string, to: string): string;
