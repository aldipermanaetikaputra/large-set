class LargeSet<T> implements Set<T> {
  private sets: Set<T>[];

  public [Symbol.toStringTag] = 'LargeSet';

  public get size() {
    return this.sets.reduce((p, c) => p + c.size, 0);
  }

  public get count() {
    return this.sets.length;
  }

  /**
   * Creates a new LargeSet instance.
   *
   * @param limit Optional parameter to set the maximum number of elements that can be added to a single set in the LargeSet.
   *              If no limit is provided, a default limit of 16777216 is used, which is the maximum number of elements that can be added to a built-in Set.
   */
  constructor(private readonly limit: number = 16777216) {
    this.sets = [new Set()];
  }

  public has(value: T): boolean {
    return this.sets.some(set => set.has(value));
  }

  public add(value: T): this {
    if (this.sets[this.sets.length - 1].size >= this.limit) {
      this.sets.push(new Set());
    }

    for (let i = 0; i < this.sets.length - 1; i++) {
      if (this.sets[i].has(value)) {
        return this;
      }
    }

    this.sets[this.sets.length - 1].add(value);
    return this;
  }

  public delete(value: T): boolean {
    for (let i = this.sets.length - 1; i >= 0; i--) {
      const set = this.sets[i];
      if (set.delete(value)) {
        if (set.size === 0 && i !== this.sets.length - 1) {
          this.sets.splice(i, 1);
        }
        return true;
      }
    }
    return false;
  }

  public *[Symbol.iterator](): IterableIterator<T> {
    for (const set of this.sets) {
      yield* set.values();
    }
  }

  public *values(): IterableIterator<T> {
    for (const set of this.sets) {
      yield* set.values();
    }
  }

  public *keys(): IterableIterator<T> {
    for (const set of this.sets) {
      yield* set.values();
    }
  }

  public *entries(): IterableIterator<[T, T]> {
    for (const set of this.sets) {
      yield* set.entries();
    }
  }

  public forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    for (const set of this.sets) {
      set.forEach(callbackfn);
    }
  }

  public clear(): void {
    const set = this.sets[this.sets.length - 1];
    this.sets = [set];
    set.clear();
  }
}

export default LargeSet;
