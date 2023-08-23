
import axios from 'axios';

const backendURL = 'https://expensetracker-b406c-default-rtdb.europe-west1.firebasedatabase.app';

export async function storeExpense(expenseData){
  const response = await axios.post(backendURL + '/expenses.json',expenseData);
  const id = response.data.name;
  return id;
}
//sending HTTP request is an asynchronous task. That means it's not complited immediately. POST and GET return promises.
//a PROMISE is an object that will eventually give you access to some other data eventually.

export async function fetchExpenses(){ //we are using async and await
  const response = await axios.get(backendURL + '/expenses.json');
  
  //next lines gets executed after the await code gets its response
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    //for every id, we create an expense object, which we will push to the expenses array
    expenses.push(expenseObj);
  }
  return expenses;
}
export function updateExpense(id, expenseData){
  return axios.put(backendURL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id){
  return axios.delete(backendURL + `/expenses/${id}.json`);
}
  