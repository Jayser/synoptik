'use strict';

import $ from 'jquery';
import Backbone from 'backbone';

import './styles/place-autocomplete.scss';
import template from './templates/place-autocomplete.hbs';

import googleService from '../../services/google-place-auto-complete';
import weatherService from '../../services/weather';
import weatherStorageService from '../../services/weather-storage';

const GET_JS_DOM_OBJECT = 0;
const GOOGLE_API_EVENT_PLACE_CHANGED = "place_changed";

export default Backbone.View.extend({
    selectors: {
        autoComplete: '#google-place-auto-complete'
    },

    initialize() {
        this.addListeners();
        this.render();
        googleService.fetch();
    },

    addListeners(){
        this.listenTo(googleService, 'sync', this.initPlaceAutoComplete);
        this.listenTo(weatherService, 'sync', this.saveWeatherToStorage);
    },

    initPlaceAutoComplete() {
        const placeAutoComplete = this.$(this.selectors.autoComplete).get(GET_JS_DOM_OBJECT);
        this.autocomplete = new google.maps.places.Autocomplete(placeAutoComplete);
        this.autocomplete.addListener(GOOGLE_API_EVENT_PLACE_CHANGED, () => this.handlerLocation());
    },

    fetchWeather(url, {lat, lng}) {
        weatherService.fetch({url: `${url}${lat},${lng}?units=si`});
    },

    handlerLocation() {
        googleService.set(googleService.parsing(this.autocomplete.getPlace()));
        this.fetchWeather(weatherService.url(), googleService.toJSON());

        // TODO: temporary for see the results
        console.log('Geo location API return ::', googleService.toJSON());
    },

    saveWeatherToStorage(model) {
        // TODO: temporary for see the results
        console.log('Weather API ::', model.toJSON());

        model.set({
            name: googleService.get('name'),
            fullName: googleService.get('fullName')
        });

        const newWeatherItem = new weatherStorageService.model(model.toJSON());
        weatherStorageService.localStorage.create(newWeatherItem);
        weatherStorageService.fetch();
    },

    render() {
        this.$el.html(template());
    }
});
