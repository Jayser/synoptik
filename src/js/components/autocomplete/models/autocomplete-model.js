import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.Model.extend({
    url () {
        return "https://maps.googleapis.com/maps/api/js?" + this.config();
    },
    config () {
        return $.param({
            key: 'AIzaSyBCOMMeq3NvV2w4XOOBJKkF1ADfVPPhqJk',
            signed_in: true,
            libraries: 'places'
        })
    }
})
