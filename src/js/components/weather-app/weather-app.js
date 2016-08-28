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

    SkyCons: Skycons(window),
    weatherList: new WeatherList(),
    skyCons: new (Skycons(window))({"color": "deepskyblue"}),

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
        /*
         * TODO: 'icon1' it's #id element in DOM
         * you can the DOM 1element see in templates/weather-app.hbs
         */
        this.$el.append(this.skyCons.add("icon1", this.SkyCons.PARTLY_CLOUDY_DAY));
        this.skyCons.play();
    },

    render() {
        this.$el.html(template());
    }
});
