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

const MODULE_ID = 'weather-app';

export default Backbone.View.extend({
    weatherStorageModel: weatherStorageService.model,

    selectors: {
        searchContainer: `.${MODULE_ID}__search`,
        searchContent: `.${MODULE_ID}__content`
    },

    initialize() {
        this.render();
        this.addListeners();
        this.initFindPlace();
        this.prePopulate();
    },

    render() {
        return this.$el.html(template());
    },

    handlerLocation(results) {
        const citiesList = new CitiesList().render(results.toJSON().results);
        this.$(this.selectors.searchContent).html(citiesList);
    },

    saveWeatherToStorage(model){
        const newWeatherItem = new this.weatherStorageModel(model.toJSON());
        const name = googleService.toJSON().name;

        newWeatherItem.set('name', name);
        weatherStorageService.localStorage.create(newWeatherItem);

        // Redraw weather list
        weatherStorageService.fetch();
    },

    handlerWeather(collection){
        const weatherList = new WeatherList().render(collection);
        this.$(this.selectors.searchContent).html(weatherList);
    },

    addListeners(){
        this.listenTo(googleService, 'sync', this.handlerLocation);
        this.listenTo(weatherService, 'sync', this.saveWeatherToStorage);
        this.listenTo(weatherStorageService, 'sync', this.handlerWeather);
    },

    initFindPlace() {
        const findPlace = new FindPlace().render();
        return this.$(this.selectors.searchContainer).html(findPlace);
    },

    prePopulate() {
        weatherStorageService.fetch();
    }
});
