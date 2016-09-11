import Backbone from 'backbone';
import $ from 'jquery';
import template from '../templates/item.hbs';
import collectionWeather from '../../store/collections/weather-collection.js';

const ItemView = Backbone.View.extend({
    el: '#main-list',
    tagName () {
        return 'li'
    },
    addItemToWeatherList () {
        let data =  collectionWeather.last();
        this.render({
            data: data.toJSON()
        });
    },
    render (data) {
        this.$el.append(template({
            data: data
        }));
    }
});

export default new ItemView();