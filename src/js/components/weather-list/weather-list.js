'use strict';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Skycons from 'skycons';

import './styles/weather-list.scss';
import template from './templates/weather-list.hbs';

import weatherStorageService from '../../services/weather-storage';

export default Backbone.View.extend({
    className: 'weather-list',

    SkyCons: Skycons(window),
    skyCons: new (Skycons(window))({"color": "#c2c5ca"}),

    selectors: {
        weatherContent: '.weather-app__content'
    },

    initialize() {
        this.listenTo(weatherStorageService, 'sync', this.render);
        weatherStorageService.fetch();
    },

    formatIconName(name = ''){
        return name.toUpperCase().replace(/\-/g, '_');
    },

    initIcon(collection){
        _.each(collection, ({ icon = '', time = null }) => {
            this.$el.append(this.skyCons.add(`${icon}-${time}`, this.SkyCons[this.formatIconName(icon)]));
        });
        this.skyCons.play();
    },

    render(collection) {
        console.log('Pre populate collection ::', collection.toJSON());
        $(this.selectors.weatherContent).append(this.$el.html(template(collection.toJSON())));
        this.initIcon(collection.toJSON());
    }
});
