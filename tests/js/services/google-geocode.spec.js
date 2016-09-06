'use strict';

import Backbone from 'backbone';
import geoCodeService from '../../../src/js/services/google-geocode';

describe('Geo code service', () => {
    const url = 'https://maps.google.com/maps/api/geocode/json?';

    it('should have geocode url', () => {
        expect(geoCodeService.url()).toBe(url);
    });

    it('should not have geocode url', () => {
        expect(geoCodeService.url()).not.toBe('some string');
    });

    it('should have geocode url with transmitted city', () => {
        const city = 'dnipro';
        expect(geoCodeService.getUrl(city)).toBe(`${url}&address=${city}`);
    });

    it('should not have geocode url with transmitted city', () => {
        const city = 'dnipro';
        expect(geoCodeService.getUrl(city)).not.toBe(`some string`);
    });
});
