import Backbone from 'backbone';
import WeatherItem from '../models/weather-item.js'

const WeatherCollection = Backbone.Collection.extend({
    model: WeatherItem
});

export default new WeatherCollection();