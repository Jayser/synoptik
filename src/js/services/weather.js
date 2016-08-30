'use strict';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

const WEATHER_API = 'e6b2ec46c1a1424d28fd7606c38272c6';

const Weather = Backbone.Model.extend({
    url() {
        return `https://api.forecast.io/forecast/${WEATHER_API}/`
    },

    sync(method, model, options) {
        const params = _.extend({
            dataType: 'jsonp',
            url: model.url()
        }, options);

        return $.ajax(params);
    },

    parse({ currently = {} }) {
        return {
            icon: currently.icon,
            time: currently.time,
            temperature: ~~currently.temperature,
            summary: currently.summary
        };
    }
});

export default new Weather();