'use strict';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

const API_KEY = "AIzaSyBCOMMeq3NvV2w4XOOBJKkF1ADfVPPhqJk";
const PLACES_KEY = "places";

const Geolocation = Backbone.Model.extend({
    url() {
        return'https://maps.googleapis.com/maps/api/js?' + this.getParams();
    },

    sync(method, model, options) {
        const params = _.extend({
            type: 'GET',
            dataType: 'jsonp',
            url: model.url() + '&callback=?',
            processData: false
        }, options);

        return $.ajax(params);
    },

    parsing({ name, formatted_address, geometry}) {
        return {
            lat: geometry.location.lat(),
            lng: geometry.location.lng(),
            name: name,
            fullName: formatted_address
        };
    },

    getParams() {
        return $.param({
            key: API_KEY,
            signed_in: true,
            libraries: PLACES_KEY
        });
    }
});

export default new Geolocation;
