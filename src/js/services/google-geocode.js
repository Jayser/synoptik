'use strict';

import Backbone from 'backbone';

const GeoLocation = Backbone.Model.extend({
    url() {
        return 'https://maps.google.com/maps/api/geocode/json?';
    },

    getUrl(address) {
        return `${this.url()}&address=${address}`;
    }
});

export default new GeoLocation;
