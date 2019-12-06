/**
 * @file meta related models
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

export interface Types {
    members: string[] | string;
    name: string;
}

export interface Package {
    types: Types[] | Types;
    version: number;
}

export interface Manifest {
    Package: Package;
}