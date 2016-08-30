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
    skyCons: new (Skycons(window))({"color": "#c2c5ca"}),

    initialize() {
        this.render();
        new WeatherList();
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
        console.log(this.skyCons, 'this.skyCons');
        this.$el.append(this.skyCons.add("clear-day", this.SkyCons.CLEAR_DAY));
        this.skyCons.play();
    },

    render() {
        this.$el.html(template());
    }
});
