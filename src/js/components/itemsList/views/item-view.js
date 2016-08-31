import Backbone from 'backbone';
import $ from 'jquery';
import template from '../templates/item.hbs';

export default Backbone.View.extend({
    tagName  () {
        return 'li'
    },
    initialize () {
        this.render();
    },
    render () {
        this.$el.append(template(this.model.toJSON()));
    }
})