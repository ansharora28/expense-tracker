const balance = document.getElementById("balance");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const expense_cat = document.getElementById("expense_cat");
const expense_date = document.getElementById("expense_date");

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e){
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('please add text and amount');
  } else {
    const transaction = {
      id:generateID(),
      text:text.value,
      amount:+amount.value,
      category:expense_cat.value,
      date:expense_date.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value='';
    amount.value='';
    // category.value='';
    // date.value='';
  }
}

function generateID(){
  return Math.floor(Math.random()*1000000000);
}

function addTransactionDOM(transaction) {
  const item = document.createElement("li");
  item.classList.add("plus");
  item.innerHTML = `
    ${transaction.text} <span>$${Math.abs(transaction.amount)}</span><span>${transaction.date}</span><span>${transaction.category}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
  list.appendChild(item);
}

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  balance.innerText=`$${total}`;
}

function removeTransaction(id){
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  Init();
}

function updateLocalStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}

function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

Init();

form.addEventListener('submit',addTransaction);
