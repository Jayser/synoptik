'use strict';

import 'jquery';
import Backbone from 'backbone';

import './styles/weather-app.scss';
import template from './templates/weather-app.hbs';

import PlaceAutoComplete from '../place-autocomplete/place-autocomplete';
import WeatherList from '../weather-list/weather-list';

export default Backbone.View.extend({
    el: '.weather-app',
    weatherList: new WeatherList(),

    initialize() {
        this.render();
        this.initAutoComplete();
    },

    initAutoComplete() {
        return new PlaceAutoComplete({ el: this.$el });
    },

    render() {
        this.$el.html(template());
    }
});
