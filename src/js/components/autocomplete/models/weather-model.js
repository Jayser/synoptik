import Backbone from 'backbone';
import $ from 'jquery';
import collectionWeather from '../collections/weather-collection.js'
import ItemWeatherModel from './weather-item.js'

const API_KEY = 'e6b2ec46c1a1424d28fd7606c38272c6';

const ModelWeather = Backbone.Model.extend({
    url () {
        return `https://api.forecast.io/forecast/${API_KEY}/`;
    },
    getUrl (lat, lng) {
        return `${this.url()}${lat},${lng}`;
    },
    parse (response) {
        collectionWeather.add(new ItemWeatherModel(response));
        return response.results;
    }
})

export default new ModelWeather(); 