'use strict';

import 'jquery';
import Backbone from 'backbone';

import './styles/weather-list.scss';
import template from './templates/weather-list.hbs';

import weatherStorageService from '../../services/weather-storage';

export default Backbone.View.extend({
    initialize() {
        this.listenTo(weatherStorageService, 'sync', this.handlerWeather);
        weatherStorageService.fetch();
    },

    handlerWeather(model) {
        // TODO: temporary for see the results
        console.log('Pre populate ::', model.toJSON());
    }
});
