import autocompleteView from './views/autocomplete-view.js';
import autocompleteModel from './models/autocomplete-model.js';
import './scss/autocomplete-style.scss';

let viewAutocomplete = new autocompleteView({
    model: autocompleteModel,
    el: '#main-wrap'
});
