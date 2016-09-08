'use strict';

import 'jquery';
import each from 'lodash/each';
import Backbone from 'backbone';
import Skycons from 'skycons';

import './styles/weather-list.scss';
import template from './templates/weather-list';
import templateNoResults from './templates/no-results';

import weatherStorageService from '../../services/weather-storage';

const MODULE_ID = 'weather-app';

export default Backbone.View.extend({
    el: `.${MODULE_ID}__content`,

    selectors: {
        weatherContent: '.weather-app__content'
    },

    initialize(){
        this.listenTo(weatherStorageService, 'sync', this.handlerWeather);
    },

    formatIconName(name = ''){
        return name.toUpperCase().replace(/\-/g, '_');
    },

    initIcon(collection) {
        const SkyCons = Skycons(window);
        const skyCons = new (Skycons(window))({"color": "#c2c5ca"});

        each(collection, ({ icon = '', time = null }) => {
            const iconName = `${icon}-${time}`;
            const iconType = SkyCons[this.formatIconName(icon)];
            this.$el.append(skyCons.add(iconName, iconType));
        });

        skyCons.play();
    },

    handlerWeather(collection) {
        const weatherList = collection.toJSON();

        if (!weatherList.length) {
            return this.render(templateNoResults());
        }

        console.info('Pre populate collection ::', weatherList);

        this.render(template(weatherList));
        this.initIcon(weatherList);
    },

    render(html) {
        this.$el.html(html);
    }
});
