'use strict';

import $ from 'jquery';
import Backbone from 'backbone';

import './styles/index.scss';
import template from './templates/index.hbs';

import weatherService from '../../services/weather';
import googleService from '../../services/google-geocode';

const MODULE_ID = 'weather-app';

export default Backbone.View.extend({
    className: `${MODULE_ID}__list`,

    events: {
        'click': 'handlerWeather'
    },

    handlerWeather({ target }) {
        const { lat, lng, name } = $(target).data();
        const url = weatherService.url();

        googleService.set('name', name);
        weatherService.fetch({
            url: `${ url }${ lat },${ lng }?units=si`
        });
    },

    render(cities) {
        return this.$el.html(template(cities));
    }
});
