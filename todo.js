document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch todos from the server and update the UI
    function fetchTodos() {
        fetch("/todos")
            .then(response => response.json())
            .then(data => {
                const todoList = document.getElementById("todo-list");
                todoList.innerHTML = "";
                data.forEach(todo => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <input type="checkbox" ${todo.done ? "checked" : ""} onclick="toggleTodo(${data.indexOf(todo)})">
                        <span>${todo.task}</span>
                        <button onclick="deleteTodo(${data.indexOf(todo)})">Delete</button>
                    `;
                    todoList.appendChild(listItem);
                });
            });
    }

    // Function to add a new todo
    function addTodo() {
        const todoInput = document.getElementById("todo-input");
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            fetch("/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ todo: todoText })
            })
            .then(response => response.json())
            .then(data => {
                fetchTodos();
                todoInput.value = "";
            });
        }
    }

    // Function to toggle the status of a todo
    function toggleTodo(index) {
        fetch(`/check/${index}`, {
            method: "PUT"
        })
        .then(response => response.json())
        .then(data => fetchTodos());
    }

    // Function to delete a todo
    function deleteTodo(index) {
        fetch(`/delete/${index}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => fetchTodos());
    }

    // Event listener for the add todo button
    document.getElementById("add-todo-btn").addEventListener("click", addTodo);

    // Fetch todos when the page loads
    fetchTodos();
});
