import Backbone from 'backbone';
import $ from 'jquery';
import template from '../templates/autocomplete.hbs';
import modelWeather from '../models/weather-model.js'
import autocompleteWeather from '../models/autocomplete-model.js'

export default Backbone.View.extend({
    getWeather (lat, lng) {
        modelWeather.fetch({
            url: modelWeather.getUrl(lat, lng),
            dataType: 'jsonp'
        })
    },
    initAutocomplete () {
        return 'initAutocomplete-sync';
        // let autocomplete = new google.maps.places.Autocomplete(this.$('#autocomplete-input').get(0));

        // autocomplete.addListener('place_changed', () => {
        //     const place = autocomplete.getPlace();
        //     const lat = place.geometry.location.lat();
        //     const lng = place.geometry.location.lng();

        //     this.getWeather(lat, lng);
        // });
    },
    getCoordinates (e) {
        let val = $(e.currentTarget).val();
        autocompleteWeather.fetch({
            url: autocompleteWeather.get(val)
        });
    },
    events: {
        'keyup #autocomplete-input': 'getCoordinates'
    },
    setHandlers () {
        this.listenTo(this.model, 'sync', this.initAutocomplete);
    },
    initialize () {
        this.render();
        //this.model.fetch({dataType: 'jsonp'});
        this.setHandlers();
    },
    render () {
        this.$el.html(template());
    }
})
