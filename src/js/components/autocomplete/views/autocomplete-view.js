import Backbone from 'backbone';
import $ from 'jquery';
import template from '../templates/autocomplete.hbs';
import modelWeather from '../models/weather-model.js'

export default Backbone.View.extend({
    getWeather (lat, lng) {
        modelWeather.fetch({
            url: modelWeather.getUrl(lat, lng),
            dataType: 'jsonp'
        })
    },
    initAutocomplete () {
        let autocomplete = new google.maps.places.Autocomplete(this.$('#autocomplete-input').get(0));

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            this.getWeather(lat, lng);
        });
    },
    setHandlers () {
        this.listenTo(this.model, 'sync', this.initAutocomplete);
    },
    initialize () {
        this.render();
        this.model.fetch({dataType: 'jsonp'});
        this.setHandlers();
    },
    render () {
        this.$el.html(template());
        return this;
    }
})
