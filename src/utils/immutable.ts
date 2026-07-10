import immutable from 'immutable';

/**
 * Any keyed/indexed immutable collection. The deep-path accessors below
 * (`getIn`, `updateIn`, `fromJS`) are typed by immutable v4 as returning
 * `unknown`, independent of the collection's generic parameters, so a single
 * assertion is unavoidable at that boundary. These helpers confine that
 * assertion to one audited place instead of scattering it across call sites.
 */
type AnyCollection = immutable.Collection<unknown, unknown>;

/** Typed wrapper over `Collection.getIn`, which returns `unknown` in immutable v4. */
export function getInAs<T>(source: AnyCollection, keyPath: Iterable<unknown>, notSetValue?: unknown): T {
  return source.getIn(keyPath, notSetValue) as T;
}

/** Typed wrapper over `Collection.getIn(...).toJS()`, returning the plain-JS value as `T`. */
export function getInToJS<T>(source: AnyCollection, keyPath: Iterable<unknown>, notSetValue?: AnyCollection): T {
  return getInAs<AnyCollection>(source, keyPath, notSetValue).toJS() as unknown as T;
}

/**
 * Builds a typed updater for `Collection.updateIn` (whose value is `unknown`),
 * preserving the fluent chain. `notSetValue` mirrors the old default-parameter
 * semantics: it is applied when the existing value is `null`/`undefined`.
 */
export function typedUpdater<T>(updater: (value: T) => T, notSetValue: T): (value: unknown) => unknown {
  return (value) => updater((value === undefined ? notSetValue : value) as T);
}

/** Typed wrapper over `fromJS`, whose inferred type does not match our Record/Map shapes. */
export function fromJSAs<T>(jsValue: unknown): T {
  return immutable.fromJS(jsValue) as unknown as T;
}
