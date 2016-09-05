'use strict';

import $ from 'jquery';
import each from 'lodash/each';
import Backbone from 'backbone';
import Skycons from 'skycons';

import './styles/weather-list.scss';
import template from './templates/weather-list.hbs';


export default Backbone.View.extend({
    className: 'weather-list',

    SkyCons: Skycons(window),
    skyCons: new (Skycons(window))({"color": "#c2c5ca"}),

    selectors: {
        weatherContent: '.weather-app__content'
    },

    formatIconName(name = ''){
        return name.toUpperCase().replace(/\-/g, '_');
    },

    initIcon(collection){
        each(collection, ({ icon = '', time = null }) => {
            const iconName = `${icon}-${time}`;
            const iconType = this.SkyCons[this.formatIconName(icon)];
            this.$el.append(this.skyCons.add(iconName, iconType));
        });
        this.skyCons.play();
    },

    render(collection) {
        const weatherList = collection.toJSON();
        if (weatherList.length) {
            console.info('Pre populate collection ::', weatherList);
            $(this.selectors.weatherContent).html(this.$el.html(template(weatherList)));
            this.initIcon(weatherList);
        }
    }
});
