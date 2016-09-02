'use strict';

import $ from 'jquery';
import Backbone from 'backbone';

import './styles/index.scss';
import template from './templates/index.hbs';
import templateNoResults from './templates/no-results.hbs';

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
        const baseUrl = weatherService.url();
        const url = `${ baseUrl }${ lat },${ lng }?units=si`;

        googleService.set('name', name);
        weatherService.fetch({ url: url });
    },

    render(cities) {
        const tpl = cities.length ? template : templateNoResults;
        return this.$el.html(tpl(cities));
    }
});
