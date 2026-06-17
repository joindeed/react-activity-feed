// Type declarations for linkifyjs 4.x
declare module 'linkifyjs' {
  export interface Token {
    e: number;
    s: number;
    t: string;
    v: string;
  }

  export interface MultiToken {
    isLink: boolean;
    t: string;
    toHref(scheme?: string): string;
    toObject(protocol?: string): {
      end: number;
      href: string;
      isLink: boolean;
      start: number;
      type: string;
      value: string;
    };
    toString(): string;
    v: string;
  }

  export interface State<T> {
    t: T | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ta(tokens: string[], result?: any): State<T>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tt(token: string, result?: any): State<T>;
  }

  export interface ScannerInit {
    start: State<string>;
    tokens: {
      [key: string]: unknown;
      groups: { [collection: string]: string[] };
    };
  }

  export interface ParserInit {
    start: State<MultiToken>;
    tokens: { [key: string]: unknown };
  }

  export interface PluginArg {
    parser: ParserInit;
    scanner: ScannerInit;
  }

  export type Plugin = (arg: PluginArg) => void;

  export interface TokenClassOptions {
    isLink?: boolean;
    toHref?(): string;
  }

  export function init(): void;
  export function find(
    str: string,
    type?: string | null,
    options?: unknown,
  ): Array<{
    end: number;
    href: string;
    isLink: boolean;
    start: number;
    type: string;
    value: string;
  }>;
  export function test(str: string, type?: string | null): boolean;
  export function tokenize(str: string): MultiToken[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function createTokenClass(type: string, options?: TokenClassOptions): any;
  export function registerPlugin(name: string, plugin: Plugin): void;
  export function registerCustomProtocol(protocol: string, optionalSlashSlash?: boolean): void;
  export function reset(): void;
}

declare module 'linkify-plugin-mention' {
  // This module registers itself with linkifyjs, no explicit exports
}
