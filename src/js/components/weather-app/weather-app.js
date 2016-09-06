'use strict';

import 'jquery';
import Backbone from 'backbone';

import './styles/weather-app.scss';
import template from './templates/weather-app.hbs';

import googleService from '../../services/google-geocode';
import weatherService from '../../services/weather';
import weatherStorageService from '../../services/weather-storage';

import FindPlace from '../find-place/find-place';
import WeatherList from '../weather-list/weather-list';
import CitiesList from '../../components/cities-list/cities-list';

export default Backbone.View.extend({
    events: {
        'click .weather-app__actions-clear': 'handlerClear'
    },

    initialize() {
        this.render();
        this.initFindPlace();
        this.initCitiesList();
        this.initWeatherList();
        this.addListeners();
        this.prePopulate();
    },

    render() {
        return this.$el.html(template());
    },

    initFindPlace() {
        return new FindPlace();
    },

    initCitiesList() {
        return new CitiesList();
    },

    initWeatherList(){
        return new WeatherList();
    },

    addListeners() {
        this.listenTo(weatherService, 'sync', this.saveWeatherToStorage);
    },

    saveWeatherToStorage(model) {
        const newWeatherItem = new weatherStorageService.model(model.toJSON());

        newWeatherItem.set('name', googleService.get('name'));
        weatherStorageService.localStorage.create(newWeatherItem);
        this.prePopulate();
    },

    prePopulate() {
        // Redraw weather list
        weatherStorageService.fetch();
    },

    handlerClear() {
        weatherStorageService.reset();
        weatherStorageService.localStorage._clear();
        this.prePopulate();
    }
});
