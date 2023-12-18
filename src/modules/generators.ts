interface Iterable {
  [Symbol.iterator]();
}

export function* enumerate<T extends Iterable, R>(
  iterable: T,
): Generator<R[], void, unknown> {
  let i = 0;

  for (const x of iterable) {
    yield [i, x];
    i++;
  }
}
