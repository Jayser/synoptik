'use strict';

import PlaceAutoComplete from './components/place-autocomplete/place-autocomplete';
import WeatherList from './components/weather-list/weather-list';

new PlaceAutoComplete({ el: '.main-content' });
new WeatherList();
