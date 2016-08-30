'use strict';

import 'jquery';
import Backbone from 'backbone';

import './styles/weather-app.scss';
import template from './templates/weather-app.hbs';

import PlaceAutoComplete from '../place-autocomplete/place-autocomplete';
import WeatherList from '../weather-list/weather-list';

export default Backbone.View.extend({

    selectors: {
        searchContainer: '.weather-app__search'
    },

    initialize() {
        this.render();
        this.initWeatherList();
        this.initAutoComplete();
    },

    initWeatherList(){
        return new WeatherList();
    },

    initAutoComplete() {
        return new PlaceAutoComplete({
            el: this.$(this.selectors.searchContainer)
        });
    },

    render() {
        this.$el.html(template());
    }
});
