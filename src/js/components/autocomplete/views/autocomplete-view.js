import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import template from '../templates/autocomplete.hbs';
import modelWeather from '../models/weather-model.js'
import autocompleteWeather from '../models/autocomplete-model.js'
import ListItemModel from '../../autocompleteList/models/list-item-model.js'
import ListItemView from '../../autocompleteList/views/list-item-view.js'

export default Backbone.View.extend({
    getWeather (lat, lng) {
        modelWeather.fetch({
            url: modelWeather.getUrl(lat, lng),
            dataType: 'jsonp'
        })
    },
    initAutocomplete (data) {
        let results  = data.toJSON().results;
        let resultList = ' ';

        if (!results.length) {
            this.$el.find('.search-list').html('<li>Have no result !!!</li>');
            return;
        }

        _.each(results, (item) => {
            resultList += new ListItemView ({
                model: new ListItemModel(item)
            }).render();
        });
        this.$el.find('.search-list').html(resultList);
    },
    getCoordinates (e) {
        let val = $(e.currentTarget).val();
        if (!val) {
            return;
        }
        autocompleteWeather.fetch({
            url: autocompleteWeather.getUrl(val),
            type: 'GET'
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
