import Backbone from 'backbone';
import $ from 'jquery';
import template from '../templates/list-item.hbs';
import serviceWeather from '../../services/weather-service-model.js';

export default Backbone.View.extend({
    el: '.search-list',
    events: {
        'click .autocomplete-item': 'saveItem'
    },
    saveItem (e) {
        const currentElem = e.currentTarget; 
        const name = currentElem.dataset.name;
        const lat = currentElem.dataset.lat;
        const lng = currentElem.dataset.lng;

        this.getWeather(lat, lng, name);
    },
    getWeather (lat, lng, name) {
        serviceWeather.setItemName(name);
        serviceWeather.fetch({
            url: serviceWeather.getUrl(lat, lng),
            dataType: 'jsonp'
        })
    },
    render (data) {
        this.$el.html(template({
            data: data
        }));
    }
});