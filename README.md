# LargeSet

`LargeSet` is a wrapper for the built-in `Set` data structure that enables storage and handling of a large number of elements without worrying about the maximum limit of $16.777.216$ ($2^{24}$) entries in a `Set`. However, `LargeSet` is optimized to handle a much larger number of elements than the built-in `Set` while maintaining high performance. It has zero external dependencies and written in TypeScript.

```js
import LargeSet from 'large-set';

// using LargeSet
const largeSet = new LargeSet();
for (let i = 0; i <= 16777216; i++) {
  largeSet.add(i); // No errors will be thrown
}

// using built-in Set
const set = new Set();
for (let i = 0; i <= 16777216; i++) {
  set.add(i); // Throws a 'RangeError: Value undefined out of range for undefined options property undefined'
}
```

## Install

```bash
# using npm
npm install large-set
# using yarn
yarn add large-set
```

## Usage

`LargeSet` has the identical interface as `Set`, which means that it can be used in the same way as `Set`.

```js
import LargeSet from 'large-set';

const set = new LargeSet();

set.add('foo');
set.add('bar');

console.log(set.has('foo')); // true
console.log(set.has('baz')); // false
console.log(set.size); // 2

set.forEach(value => console.log(value));
```

## Limitations

The `LargeSet` class is designed for use cases where the size of the set may exceed the maximum limit of a built-in `Set`. However, it is not a drop-in replacement for `Set`, and may not be suitable for all use cases. Additionally, the partitioning of the set into smaller sets can incur a performance penalty, particularly for operations that involve searching for elements or iterating over the set. It is recommended to use `LargeSet` only when dealing with very large sets, and to test its performance against built-in `Set` for your specific use case.

## Testing

This library is well tested. You can test the code as follows:

```bash
# using npm
npm test
# using yarn
yarn test
```

## Contribute

If you have anything to contribute, or functionality that you lack - you are more than welcome to participate in this!

## License

Feel free to use this library under the conditions of the MIT license.
