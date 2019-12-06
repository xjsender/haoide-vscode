/**
 * @file Utility for completions
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

export interface PositionOption {
    offset: number;
    wholeText: string;
    lineText: string;
    char: string;
    word: string; 
}

// Used to parse ui icons in salesforce-ux
export interface Icons {
    sprite: string;
    symbol: string;
}

export interface UiIcon {
    name: string;
    description: string;
    icons: Icons[];
}
