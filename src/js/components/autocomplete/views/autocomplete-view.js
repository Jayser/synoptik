import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import template from '../templates/autocomplete.hbs';
import autocompleteWeather from '../models/autocomplete-model.js';
import ListItemView from '../../autocompleteList/views/list-item-view.js';

export default Backbone.View.extend({
    initAutocomplete (data) {
        let results  = data.toJSON().results;

        if (!results.length) {
            this.$el.find('.search-list').html('<li>Have no result !!!</li>');
            return;
        }

        this.listItemView.render(results);
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
        this.initListView();
        this.setHandlers();
    },
    initListView () {
        this.listItemView =  new ListItemView();
    },
    render () {
        this.$el.html(template());
    }
})
