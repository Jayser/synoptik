import TestComponent from './components/test-component/index';
import template from './components/test-component/templates/test.hbs';

new TestComponent();

console.log(template({name: 'sarhan'}));
