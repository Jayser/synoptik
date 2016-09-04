import Backbone from 'backbone';
import $ from 'jquery';
import template from '../templates/list-item.hbs';

export default Backbone.View.extend({
    render () {
        this.$el.append(template(this.model.toJSON()));
        return this.$el.html();
    }
})