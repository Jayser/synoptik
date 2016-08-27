'use strict';

import 'jquery';
import Backbone from 'backbone';

import './styles/weather-list.scss';
import template from './templates/weather-list.hbs';

import geoLocationModel from '../../models/geolocation';
import WeatherService from '../../models/weather';

export default Backbone.View.extend({
    model: new WeatherService,

    initialize() {
        this.listenTo(geoLocationModel, 'change', this.fetchWeather);
        this.listenTo(this.model, 'sync', this.render);
    },

    fetchWeather(model) {
        const {lat, lng} = model.toJSON();
        this.model.fetch({url: this.model.url() + `${lat},${lng}`});
    },

    render(data) {
        // TODO: temporary for see the results
        console.log(data.toJSON());
    }
});
