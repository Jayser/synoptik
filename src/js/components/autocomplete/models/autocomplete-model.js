import Backbone from 'backbone';
import $ from 'jquery';

const AutocompleteModel =  Backbone.Model.extend({
    url (place) {
        return 'https://maps.google.com/maps/api/geocode/json?sensor=false&address=' + place
    },
    getUrl (data) {
        return this.url(data);
    }
});

export default new AutocompleteModel();
