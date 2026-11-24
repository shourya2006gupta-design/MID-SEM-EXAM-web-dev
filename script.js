const expenseForm = document.getElementById("expense-form");
const expenseNote = document.getElementById("expense-note");
const expenseAmount = document.getElementById("expense-amount");
const expenseDate = document.getElementById("expense-date");
const expenseCategory = document.getElementById("expense-category");
const totalExpenses = document.getElementById("total-expenses");
const expenseList = document.getElementById("expense-list");
const categoryFilter = document.getElementById("category-filter");

let expenses = [];

function displayExpenses() {

    expenseList.innerHTML = "";

    let selectedCategory = categoryFilter.value;

    expenses.forEach(function(expense, index) {
        if (selectedCategory === "all" || selectedCategory === expense.category) {

            let li = document.createElement("li");

            let expenseName = document.createElement("p");
            expenseName.textContent = "Name: " + expense.note;

            let amount = document.createElement("p");
            amount.textContent = "Amount: ₹" + expense.amount.toFixed(2);

            let category = document.createElement("p");
            category.textContent = "Category: " + expense.category;

            let date = document.createElement("p");
            date.textContent = "Date: " + expense.date;

            let deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function() {
                expenses.splice(index, 1);
                displayExpenses();
                updateSummary();
            });

            li.appendChild(expenseName);
            li.appendChild(amount);
            li.appendChild(category);
            li.appendChild(date);
            li.appendChild(deleteButton);

            expenseList.appendChild(li);
        }
    });

    if (expenseList.children.length === 0) {
        let li = document.createElement("li");
        li.textContent = "No expenses found.";
        expenseList.appendChild(li);
    }

}


function updateSummary() {

    let total = 0;

    let food = 0;
    let transport = 0;
    let shopping = 0;
    let entertainment = 0;
    let education = 0;
    let other = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;

        if (expense.category === "food") {
            food += expense.amount;
        }

        else if (expense.category === "transport") {
            transport += expense.amount;
        }

        else if (expense.category === "shopping") {
            shopping += expense.amount;
        }

        else if (expense.category === "entertainment") {
            entertainment += expense.amount;
        }

        else if (expense.category === "education") {
            education += expense.amount;
        }

        else if (expense.category === "other") {
            other += expense.amount;
        }

    });

    totalExpenses.textContent = total.toFixed(2);
    document.getElementById("food-expenses").textContent = food.toFixed(2);
    document.getElementById("transport-expenses").textContent = transport.toFixed(2);
    document.getElementById("shopping-expenses").textContent = shopping.toFixed(2);
    document.getElementById("entertainment-expenses").textContent = entertainment.toFixed(2);
    document.getElementById("education-expenses").textContent = education.toFixed(2);
    document.getElementById("other-expenses").textContent = other.toFixed(2);
}

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();
    let note = expenseNote.value.trim();
    let amount = Number(expenseAmount.value);
    let date = expenseDate.value;
    let category = expenseCategory.value;

    if (note === "" || date === "" || category === "") {
        alert("Please fill all the fields.");
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid amount greater than zero.");
        return;
    }

    let expense = {
        note: note,
        amount: amount,
        date: date,
        category: category
    };

    expenses.push(expense);
    displayExpenses();
    updateSummary();
    expenseForm.reset();

});

categoryFilter.addEventListener("change", function() {
    displayExpenses();
});
