'use strict';

import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

export default Backbone.Model.extend({
    url() {
        return `https://maps.googleapis.com/maps/api/js?` + this.getParams();
    },

    sync({model, options}) {
        const params = _.extend({
            type: 'GET',
            dataType: 'jsonp',
            url: model.url() + '&callback=?',
            processData: false
        }, options);

        return $.ajax(params);
    },

    parsing: function (data) {
        const { formatted_address, geometry} = data;
        return {
            geometry: {
                location: {
                    lat: geometry.location.lat(),
                    lng: geometry.location.lng()
                }
            },
            name: formatted_address
        };
    },

    getParams() {
        return $.param({
            key: 'AIzaSyBCOMMeq3NvV2w4XOOBJKkF1ADfVPPhqJk',
            signed_in: true,
            libraries: 'places'
        });
    }
});
