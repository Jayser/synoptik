'use strict';

import 'jquery';
import Backbone from 'backbone';
import Skycons from 'skycons';

import './styles/weather-app.scss';
import template from './templates/weather-app.hbs';

import PlaceAutoComplete from '../place-autocomplete/place-autocomplete';
import WeatherList from '../weather-list/weather-list';

export default Backbone.View.extend({
    el: '.weather-app',
    weatherList: new WeatherList(),
    SkyCons: Skycons(window),
    skyCons: new (Skycons(window))(),

    initialize() {
        this.render();
        this.initAutoComplete();

        // TODO: temporary for see the results
        this.addIcon();
    },

    initAutoComplete() {
        return new PlaceAutoComplete({ el: this.$el });
    },

    // TODO: temporary for see the results
    addIcon() {
        this.$el.append(this.skyCons.add("icon1", this.SkyCons.PARTLY_CLOUDY_DAY));
        this.skyCons.play();
    },

    render() {
        this.$el.html(template());
    }
});
