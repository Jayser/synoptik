'use strict';

import 'jquery';
import trim from 'lodash/trim';
import Backbone from 'backbone';

import './styles/index.scss';
import template from './templates/index.hbs';
import googleService from '../../services/google-geocode';
import weatherStorageService from '../../services/weather-storage';

const MODULE_ID = 'weather-app';
const TIME_TO_DELAY = 500;

let timer = 0;

export default Backbone.View.extend({
    el: `.${MODULE_ID}__search`,

    events: {
        'keyup #google-place-auto-complete': 'handlerInput'
    },

    initialize(){
        this.listenTo(weatherStorageService, 'sync', this.clearValue);
        this.render();
    },

    clearValue() {
      this.$('#google-place-auto-complete').val('');
    },

    delay(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    },

    handlerInput({ target }) {
        const value = trim(target.value);

        if (value) {
            this.delay(() => {
                googleService.fetch({
                    url: googleService.getUrl(value)
                });
            }, TIME_TO_DELAY);
        }
    },

    render() {
        return this.$el.html(template());
    }
});
