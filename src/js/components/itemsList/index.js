import itemView from './views/item-view.js';
import collectionWeather from '../store/collections/weather-collection.js';
import localStore from 'store';

let store = localStore.get('weatherItems') || [];

if (store.length) {
    collectionWeather.add(store);

    collectionWeather.each((itemModel) => {
        new itemView({
            model: itemModel,
            el: '#main-list'
        });
    });
}
