'use strict';

import 'jquery';
import Backbone from 'backbone';

import './styles/place-autocomplete.scss';
import template from './templates/place-autocomplete.hbs';

import googlePlaceAutoCompleteService from '../../services/google-place-auto-complete';
import weatherService from '../../services/weather';
import weatherStorageService from '../../services/weather-storage';

const GET_JS_DOM_OBJECT = 0;
const GOOGLE_API_PLACE_CHANGED = "place_changed";

export default Backbone.View.extend({
    selectors: {
        autoComplete: '#google-place-auto-complete'
    },

    initialize() {
        this.addListeners();
        this.render();
        googlePlaceAutoCompleteService.fetch();
    },

    addListeners(){
        this.listenTo(googlePlaceAutoCompleteService, 'sync', this.initPlaceAutoComplete);
        this.listenTo(weatherService, 'sync', this.handlerWeather);
    },

    initPlaceAutoComplete() {
        const placeAutoComplete = this.$(this.selectors.autoComplete).get(GET_JS_DOM_OBJECT);
        this.autocomplete = new google.maps.places.Autocomplete(placeAutoComplete);
        this.autocomplete.addListener(GOOGLE_API_PLACE_CHANGED, () => this.handlerLocation());
    },

    fetchWeather(url, {lat, lng}) {
        weatherService.fetch({url: `${url}${lat},${lng}`});
    },

    handlerLocation() {
        const geoLocationData = googlePlaceAutoCompleteService.parsing(this.autocomplete.getPlace());
        this.fetchWeather(weatherService.url(), geoLocationData);

        // TODO: temporary for see the results
        console.log('Geo location API return ::', geoLocationData);
    },

    handlerWeather(data) {
        // TODO: temporary for see the results
        console.log('Weather API return ::', data.toJSON());

        weatherStorageService.create(data.toJSON());
    },

    render() {
        this.$el.append(template());
    }
});
