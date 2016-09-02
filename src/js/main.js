'use strict';

import '../scss/main.scss';
import WeatherApp from './components/weather-app/weather-app';

// Init App
new WeatherApp({
    el: '.main-content'
});
