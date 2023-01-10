class Model {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos') || []
    }

    binTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }

    _commit(todos) {
        this.onTodoListChanged(todos):
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    addTodo(todoText) {
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false
        };
        this.todos.push(todo);

        this.onTodoListChanged(this.todos);
        this._commit(this.todos);
    }

    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) =>
        todo.id === id ? {id: todo.id, text: updatedText, complete: todo.complete} : todo,)
        this.onTodoListChanged(this.todos);
        this._commit(this.todos);
    }

    deleteTodo(id) {
        this.todos = this.todos.filter((todo) =>
        todo.id !== id)
        this.onTodoListChanged(this.todos);
        this._commit(this.todos);
    }

    toggleTodo(id) {
        this.todos = this.todos.map((todo) =>
        todo.id === id ? {id:todo.id, text: todo.text, complete: !todo.complete} : todo,)
        this.onTodoListChanged(this.todos);
        this._commit(this.todos);
    }
}

class View {
    constructor() {
        this.app = this.getElement('#root');
        this.title = this.createElement('h1');
        this.title.textContent = 'Todos';
        this.form = this.createElement('form');
        this.input = this.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Add todo';
        this.input.name = 'todo';
        this.submitButton = this.createElement('button');
        this.submitButton.textContent = 'Submit';
        this.todolist = this.createElement('ul', 'todo-list');
        this.form.append(this.input, this.submitButton);
        this.app.append(this.title, this.form, this.todolist);
        this._temporaryTodoText;
        this._initLocalListeners();
    }

    get _todoText() {
        return this.input.value;
    }

    _resetInput() {
        this.input.value = '';
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);

        return element;
    }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
    }

    displayTodos(todos) {
        //first delete all todos
        while (this.todolist.firstChild) {
            this.todolist.removeChild(this.todolist.firstChild);
        }

        //show the defualt 
        if (todos.length === 0) {
            const p = this.createElement('p');
            p.textContent = 'Nothing to do? Add a task!';
            this.todolist.append(p)
        } else { //or add all the items
            todos.forEach(todo => {
                const li = this.createElement('li');
                li.id = todo.id;

                const checkbox = this.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todo.complete;

                const span = this.createElement('span');
                span.contentEditable = true;
                span.classList.add('editable');

                if (todo.complete) {
                    const strike = this.createElement('s');
                    strike.textContent = todo.text;
                    span.append(strike);
                } else {
                    span.textContent = todo.text;
                }

                const deleteButton = this.createElement('button', 'delete');
                deleteButton.textContent = 'Delete';
                li.append(checkbox, span, deleteButton);

                this.todolist.append(li);
            })
        }
    }

    _initLocalListeners() {
        this.todolist.addEventListener('input', event => {
            if (event.target.className === 'editable') {
                this._temporaryTodoText = event.target.innerText;
            }
        })
    }

    binAddTodo(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            if (this._todoText) {
                handler(this._todoText);
                this._resetInput;
            }
        })
    }

    binDeleteTodo(handler) {
        this.todolist.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id);
                handler(id);
            }
        })
    }

    binEditTodo(handler) {
        this.todolist.addEventListener('focusout', event => {
            if (this._temporaryTodoText) {
                const id = parseInt(event.target.parentElement.id);
                handler(id, this._temporaryTodoText);
                this._temporaryTodoText = '';
            }
        })
    }

    binToggleTodo(handler) {
        this.todolist.addEventListener('change', event => {
            if (event.target.type === 'checkbox') {
                const id = parseInt(event.target.parentElement.id);
                handler(id);
            }
        })
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.binAddTodo(this.handleAddTodo);
        this.view.binDeleteTodo(this.handleDeleteTodo);
        this.view.binToggleTodo(this.handleToggleTodo);
        this.view.binEditTodo(this.handleEditTodo);
        this.model.binTodoListChanged(this.onTodoListChanged);

        this.onTodoListChanged(this.model.todos);
    }

    onTodoListChanged = (todos) => {
        this.view.displayTodos(todos);
    }

    handleAddTodo = (todoText) => {
        this.model.addTodo(todoText);
    }

    handleEditTodo = (id, todoText) => {
        this.model.editTodo(id, todoText);
    }

    handleDeleteTodo = (id) => {
        this.model.deleteTodo(id);
    }

    handleToggleTodo = (id) => {
        this.model.toggleTodo(id);
    }
}

const app = new Controller(new Model(), new View())