'use strict';

import 'jquery';
import Backbone from 'backbone';

import './styles/index.scss';
import template from './templates/index.hbs';

import googleService from '../../services/google-geocode';

const MODULE_ID = 'weather-app';

export default Backbone.View.extend({
    className: `${MODULE_ID}__find-place`,

    events: {
        'change #google-place-auto-complete': 'handlerInputLocation'
    },

    handlerInputLocation({ target }) {
        googleService.fetch({ 
            url:  googleService.getUrl(target.value || '') 
        });
    },

    render() {
        return this.$el.html(template());
    }
});
