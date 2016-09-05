'use strict';

import 'jquery';
import trim from 'lodash/trim';
import delay from 'lodash/delay';
import Backbone from 'backbone';

import './styles/index.scss';
import template from './templates/index.hbs';
import googleService from '../../services/google-geocode';

const MODULE_ID = 'weather-app';
const TIME_TO_DELAY = 500;

export default Backbone.View.extend({
    className: `${MODULE_ID}__find-place`,

    events: {
        'keyup #google-place-auto-complete': 'handlerInputLocation'
    },

    handlerInputLocation({ target }) {
        const value = trim(target.value);

        if (value) {
            delay(() => {
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
