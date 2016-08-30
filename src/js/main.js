'use strict';

import '../scss/main.scss';

import WeatherApp from './components/weather-app/weather-app';

export default new WeatherApp({
    el: '.main-content'
});