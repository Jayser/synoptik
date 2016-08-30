'use strict';

import $ from 'jquery';
import Backbone from 'backbone';

import './styles/weather-list.scss';
import template from './templates/weather-list.hbs';

import weatherStorageService from '../../services/weather-storage';

export default Backbone.View.extend({
    className: 'weather-list',

    selectors: {
        weatherContent: '.weather-app__content'
    },

    initialize() {
        this.listenTo(weatherStorageService, 'sync', this.render);
        weatherStorageService.fetch();
    },

    render(collection) {
        console.log('Pre populate ::', collection.toJSON());
        $(this.selectors.weatherContent).append(this.$el.html(template(collection.toJSON())));
    }
});
