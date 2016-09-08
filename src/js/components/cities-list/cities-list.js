'use strict';

import $ from 'jquery';
import isEmpty from 'lodash/isEmpty'
import Backbone from 'backbone';

import './styles/index.scss';
import template from './templates/index.hbs';
import templateNoResults from './templates/no-results';

import weatherService from '../../services/weather';
import googleService from '../../services/google-geocode';

const MODULE_ID = 'weather-app';

export default Backbone.View.extend({
    el: `.${MODULE_ID}__content`,

    initialize() {
        this.listenTo(googleService, 'sync', this.handlerLocation);
    },

    events: {
        'click .cities-list__item': 'handlerWeather'
    },

    handlerWeather({ target }) {
        const { lat, lng, name } = $(target).data();
        const baseUrl = weatherService.url();
        const url = `${ baseUrl }${ lat },${ lng }?units=si`;

        googleService.set('name', name);
        weatherService.fetch({ url: url });
    },

    handlerLocation(model){
        const data = model.toJSON();
        const html = isEmpty(data.results) ? templateNoResults() : template(data.results);

        this.render(html);
    },

    render(html) {
        return this.$el.html(html);
    }
});
