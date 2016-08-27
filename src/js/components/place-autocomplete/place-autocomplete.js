'use strict';

import 'jquery';
import Backbone from 'backbone';

import './styles/place-autocomplete.scss';
import template from './templates/place-autocomplete.hbs';

import geoLocationModel from '../../models/geolocation';
import WeatherList from '../weather-list/weather-list';

const GET_JS_DOM_OBJECT = 0;
const GOOGLE_API_PLACE_CHANGED = "place_changed";

export default Backbone.View.extend({
    weather: new WeatherList(),
    model: geoLocationModel,

    initialize() {
        this.listenTo(this.model, 'sync', this.initPlaceAutocomplete);
        this.model.fetch();
        this.render();
    },

    selectors: {
        placeAutocomplete: '#place-autocomplete'
    },

    initPlaceAutocomplete() {
        const placeAutocomplete = this.$(this.selectors.placeAutocomplete).get(GET_JS_DOM_OBJECT);
        this.autocomplete = new google.maps.places.Autocomplete(placeAutocomplete);
        this.autocomplete.addListener(GOOGLE_API_PLACE_CHANGED, () => this.handlerLocation());
    },

    handlerLocation() {
        this.model.set(this.model.parsing(this.autocomplete.getPlace()));

        // TODO: temporary for see the results
        console.log(this.model.toJSON());
    },

    render() {
        this.$el.append(template());
    }
});
