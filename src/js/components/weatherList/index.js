import itemView from './views/item-view.js';
import collectionWeather from '../store/collections/weather-collection.js';
import localStore from 'store';

let store = localStore.get('weatherItems') || [];

collectionWeather.add(store);
itemView.render(store);
itemView.listenTo(collectionWeather, 'add', itemView.addItemToWeatherList);
