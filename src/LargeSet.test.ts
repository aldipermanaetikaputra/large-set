import LargeSet from './LargeSet';

describe('LargeSet', () => {
  describe('constructor', () => {
    it('should set the default limit per size if no limit is provided', () => {
      const largeSet = new LargeSet();
      expect(largeSet['limit']).toBe(2 ** 24);
    });

    it('should set the limit per size if provided', () => {
      const largeSet = new LargeSet(10);
      expect(largeSet['limit']).toBe(10);
    });
  });

  describe('has', () => {
    let largeSet: LargeSet<number>;

    beforeEach(() => {
      largeSet = new LargeSet();
      largeSet.add(1);
      largeSet.add(2);
    });

    it('should return true if the element exists in any set', () => {
      expect(largeSet.has(1)).toBe(true);
      expect(largeSet.has(2)).toBe(true);
    });

    it('should return false if the element does not exist in any set', () => {
      expect(largeSet.has(3)).toBe(false);
    });
  });

  describe('add', () => {
    let largeSet: LargeSet<number>;

    beforeEach(() => {
      largeSet = new LargeSet(2);
    });

    it('should add elements to a single set up to the size limit', () => {
      largeSet.add(1);
      largeSet.add(2);
      expect(largeSet.count).toBe(1);
      expect(largeSet.size).toBe(2);
      expect(Array.from(largeSet.keys())).toEqual([1, 2]);
    });

    it('should create a new set when adding an element to a full set', () => {
      largeSet.add(1);
      largeSet.add(2);
      largeSet.add(3);
      largeSet.add(4);
      expect(largeSet.count).toBe(2);
      expect(largeSet.size).toBe(4);
      expect(Array.from(largeSet.keys())).toEqual([1, 2, 3, 4]);
    });

    it('should respect the size limit when adding elements to multiple sets', () => {
      largeSet.add(1);
      largeSet.add(2);
      largeSet.add(3);
      largeSet.add(4);
      largeSet.add(5);
      expect(largeSet.count).toBe(3);
      expect(largeSet.size).toBe(5);
      expect(Array.from(largeSet.keys())).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle duplicates correctly', () => {
      largeSet.add(1);
      largeSet.add(2);
      largeSet.add(2);
      largeSet.add(3);
      largeSet.add(3);
      largeSet.add(3);
      expect(largeSet.count).toBe(2);
      expect(largeSet.size).toBe(3);
      expect(Array.from(largeSet.keys())).toEqual([1, 2, 3]);
    });

    it('should add a key to the current set if it does not already exist', () => {
      const largeSet = new LargeSet<string>();

      largeSet.add('a');
      expect(largeSet.size).toBe(1);
      expect(largeSet.count).toBe(1);

      largeSet.add('b');
      expect(largeSet.size).toBe(2);
      expect(largeSet.count).toBe(1);

      largeSet.add('c');
      expect(largeSet.size).toBe(3);
      expect(largeSet.count).toBe(1);
    });

    it('should not add a key if it already exists in one of the sets', () => {
      const largeSet = new LargeSet<string>(2);

      largeSet.add('a');
      largeSet.add('b');
      expect(largeSet.size).toBe(2);
      expect(largeSet.count).toBe(1);

      largeSet.add('c');
      largeSet.add('a');
      expect(largeSet.size).toBe(3);
      expect(largeSet.count).toBe(2);

      largeSet.add('d');
      largeSet.add('e');
      expect(largeSet.size).toBe(5);
      expect(largeSet.count).toBe(3);
    });
  });

  describe('keys', () => {
    let largeSet: LargeSet<number>;

    beforeEach(() => {
      largeSet = new LargeSet();
      for (const x of [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
      ])
        largeSet.add(x);
    });

    it('should return all the keys in the LargeSet', () => {
      expect(Array.from(largeSet.keys())).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
      ]);
    });
  });

  describe('delete', () => {
    let largeSet: LargeSet<number>;

    beforeEach(() => {
      largeSet = new LargeSet();
    });

    it('should return true when deleting an existing item', () => {
      largeSet.add(1);
      expect(largeSet.delete(1)).toBe(true);
    });

    it('should return false when deleting a non-existing item', () => {
      expect(largeSet.delete(1)).toBe(false);
    });

    it('should remove the item from the set when it exists', () => {
      largeSet.add(1);
      largeSet.delete(1);
      expect(largeSet.has(1)).toBe(false);
    });

    it('should not remove other items from the set when deleting an item that does not exist', () => {
      largeSet.add(1);
      largeSet.add(2);
      largeSet.delete(3);
      expect(largeSet.has(1)).toBe(true);
      expect(largeSet.has(2)).toBe(true);
    });

    it('should remove an empty set when deleting the last item from it', () => {
      largeSet.add(1);
      largeSet.delete(1);
      expect(largeSet.count).toBe(1);
      expect(largeSet.size).toBe(0);
      largeSet.delete(2);
      expect(largeSet.count).toBe(1);
      expect(largeSet.size).toBe(0);
    });

    it('should not remove the last empty set in the set of sets', () => {
      largeSet.add(1);
      largeSet.clear();
      expect(largeSet.count).toBe(1);
      expect(largeSet.size).toBe(0);
      largeSet.delete(2);
      expect(largeSet.count).toBe(1);
      expect(largeSet.size).toBe(0);
    });
  });

  describe('clear', () => {
    let largeSet: LargeSet<number>;
    beforeEach(() => {
      largeSet = new LargeSet(2);
      largeSet.add(1);
      largeSet.add(2);
      largeSet.add(3);
      largeSet.add(4);
    });

    it('should clear all the sets and leave only one empty set', () => {
      largeSet.clear();
      expect(largeSet.count).toBe(1);
      expect(largeSet.size).toBe(0);
      expect(Array.from(largeSet.keys())).toEqual([]);
    });
  });
});
