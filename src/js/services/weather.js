'use strict';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

const Weather = Backbone.Model.extend({
    url() {
        return 'https://api.forecast.io/forecast/e6b2ec46c1a1424d28fd7606c38272c6/'
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

    parse(data) {
        data.currently.temperature = parseInt(data.currently.temperature, 10);
        return data;
    }
});

export default new Weather();