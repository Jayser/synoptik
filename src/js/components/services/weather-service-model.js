import Backbone from 'backbone';
import $ from 'jquery';
import collectionWeather from '../store/collections/weather-collection.js'
import ItemWeatherModel from '../store/models/weather-item.js'
import localStore from 'store'

const API_KEY = 'e6b2ec46c1a1424d28fd7606c38272c6';

const ModelWeather = Backbone.Model.extend({
    url () {
        return `https://api.forecast.io/forecast/${API_KEY}/`;
    },
    setItemName (name) {
        this.name = name;
    },
    saveData (data) {
        let model = new ItemWeatherModel({
            temperature: data.currently.temperature,
            name: this.name
        });
        let store = localStore.get('weatherItems') || [];

        store.push(model);
        localStore.set('weatherItems', store);
        collectionWeather.add(model);
    },
    getUrl (lat, lng) {
        return `${this.url()}${lat},${lng}`;
    },
    parse (response) {
        this.saveData(response);
        return response;
    }
});

export default new ModelWeather(); 