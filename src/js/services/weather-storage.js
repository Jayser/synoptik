import 'jquery';
import Backbone from 'backbone';
import 'backbone.localstorage'

const STORAGE_NAME = 'weather-collection';

const WeatherStorage = Backbone.Collection.extend({
    model: Backbone.Model.extend({}),
    localStorage: new Backbone.LocalStorage(STORAGE_NAME)
});

export default new WeatherStorage();