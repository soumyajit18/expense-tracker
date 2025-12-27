const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter text and amount");
    return;
}

if (Number(amount.value) === 0) {
    alert("Amount cannot be zero");
    return;
}

   const transaction = {
    id: Date.now(),
    text: text.value,
    amount: Number(amount.value)
};


    transactions.push(transaction);
    addTransactionToList(transaction);
    updateValues();
    saveToLocalStorage();

    text.value = "";
    amount.value = "";
});

function addTransactionToList(transaction) {
    const li = document.createElement("li");

    li.classList.add(transaction.amount > 0 ? "plus" : "minus");

    li.innerHTML = `
        <div class="transaction-info">
            <span class="transaction-text">${transaction.text}</span>
            <span class="transaction-amount">
                ${transaction.amount > 0 ? "+" : "-"}₹${Math.abs(transaction.amount)}
            </span>
        </div>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(li);
}

function updateValues() {
    let total = 0;
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach(function (transaction) {
        total += transaction.amount;

        if (transaction.amount > 0) {
            incomeTotal += transaction.amount;
        } else {
            expenseTotal += transaction.amount;
        }
    });

    balance.innerText = `₹${total}`;
    income.innerText = `₹${incomeTotal}`;
    expense.innerText = `₹${Math.abs(expenseTotal)}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(function (transaction) {
        return transaction.id !== id;
    });
    saveToLocalStorage();

    list.innerHTML = "";

    transactions.forEach(function (transaction) {
        addTransactionToList(transaction);
    });

    updateValues();
}

function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
    list.innerHTML = "";

    transactions.forEach(function (transaction) {
        addTransactionToList(transaction);
    });

    updateValues();
}
init();