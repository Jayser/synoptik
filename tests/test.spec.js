'use strict';

import sum from '../src/js/test';

describe('adder', () => {
    it('should have able to addition', () => {
        expect(sum(3,3)).not.toBe(null);
    });
});