/**
 * NOTE: At this point we're test driving the sample Todo list app.
 *       You'll be refering to js/todos.js quite a bit from now on,
 *       so make sure you have it open.
 */
describe('About Backbone.Model', function() {

    it('A Model can have default values for its attributes.', function() {
        var todo = new Todo();

        var defaultAttrs = {
            text: '',
            done : false,
            order: 0
        }

        expect(defaultAttrs).toEqual(todo.attributes);
    });

    it('Attributes can be set on the model instance when it is created.', function() {
        var todo = new Todo({ text: 'Get oil change for car.' });

        var expectedText = 'Get oil change for car.';

        expect(expectedText).toEqual(todo.get('text'));
    });

    it('If it is exists, an initialize function on the model will be called when it is created.', function() {
        var todo = new Todo({ text: 'Stop monkeys from throwing their own poop!' });

        // Why does the expected text differ from what is passed in when we create the Todo?
        // What is happening in Todo.initialize? (see js/todos.js line 22)
        // You can get this test passing without changing todos.js or the expected text.

        expect('Stop monkeys from throwing their own double rainbows!').toBe(todo.get('text'));
    });

    it('Fires a custom event when the state changes.', function() {
        var callback = jasmine.createSpy('-change event callback-');

        var todo = new Todo();

        todo.bind('change', callback);

        // How would you update a property on the todo here?
        // Hint: http://documentcloud.github.com/backbone/#Model-set
        todo.set('text', 'hi');

        expect(callback).toHaveBeenCalled();
    });

    it('Can contain custom validation rules, and will trigger an error event on failed validation.', function() {
        var errorCallback = jasmine.createSpy('-error event callback-');

        var todo = new Todo();

        todo.bind('error', errorCallback);

        // What would you need to set on the todo properties to cause validation to fail?
        // Refer to Todo.validate in js/todos.js to see the logic.
        todo.set('done', 'foo');

        var errorArgs = errorCallback.mostRecentCall.args;

        expect(errorArgs).toBeDefined();
        expect(errorArgs[0]).toBe(todo);
        expect(errorArgs[1]).toBe('Todo.done must be a boolean value.');
    });
});
