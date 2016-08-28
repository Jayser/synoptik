import Backbone from 'backbone';
import $ from 'jquery';

export default Backbone.View.extend({
    initInput () {
        let input = document.getElementById('pac-input');
        let autocomplete = new google.maps.places.Autocomplete(input);

        autocomplete.addListener('place_changed', () => {
            let place = autocomplete.getPlace();
        });
    },
    setHandlers () {
        this.model.on('sync', this.initInput);
    },
    initialize () {
        this.model.fetch({dataType: 'jsonp'});
        this.setHandlers();
        this.render();
    },
    render () {
        return this;
    }
})
