document.addEventListener("DOMContentLoaded", initialize);

    // Don't remove anything just complete the functions

    // When the page get load display all users
function initialize() {
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    for (let i = 0; i < usersList.length; i++)
    {
        display(usersList[i]);
    }
    sessionStorage.removeItem("editId");
    }

    // add new users in usersList array
function handleFormSubmit(event) {  
    event.preventDefault();
    const expense = event.target.expense.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const userDetails = {
        expense,
        description,
        category
    };
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    
    
    const editId = sessionStorage.getItem("editId");
    if (editId)
    {
        update(usersList, editId, userDetails);
    }
    else
    {
        add(usersList, userDetails);
    }
    localStorage.setItem("usersList", JSON.stringify(usersList));
    }

    // use this function to display user on screen
function display(data) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.textContent = data.expense + " " + data.description + " " + data.category;
    li.id = data.id;
    ul.appendChild(li);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteData(data.id, li))
    li.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editData(data));
    li.appendChild(editButton);


    
    }

    // use this function to add user details into local storage
function add(usersList, userDetails) {
    userDetails.id = Date.now();
    usersList.push(userDetails);
    display(userDetails);
        
    
    }


    // use this function to delete the user details from local store and DOM (screen)
function deleteData(id, li) {
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    const updatedUsersList = [];
    for (let i = 0; i < usersList.length; i++)
    {
        if (id != usersList[i].id)
        {
            updatedUsersList.push(usersList[i]);
        }
    }
    localStorage.setItem("usersList", JSON.stringify(updatedUsersList));
    li.remove();
        
    
    }

    // use this function to update user details from local storage
function editData(data) {
    const expenseInput = document.querySelector("#expense");
    const descriptionInput = document.querySelector("#description");
    const categoryInput = document.querySelector("#category");
    console.log(expenseInput,descriptionInput,categoryInput);
    expenseInput.value = data.expense;
    descriptionInput.value = data.description;
    categoryInput.value = data.category;
    sessionStorage.setItem("editId", data.id);
    const submitBtn = document.querySelector("button[type = submit]");
    submitBtn.textcontent = "Update";

}
function update(usersList, editId, userDetails) {
    for (let i = 0; i < usersList.length; i++)
    {
        if (usersList[i].id == editId)
        {
            usersList[i].expense = userDetails.expense;
            usersList[i].description = userDetails.description;
            usersList[i].category = userDetails.category;
        }
    }
    const li = document.getElementById(editId);
    li.firstChild.textContent = userDetails.expense + " " + userDetails.description + " " + userDetails.category;
    sessionStorage.removeItem("editId");

    const submitBtn = document.querySelector("button[type = submit]");
    submitBtn.textContent = "Submit";
    }

//module.exports = handleFormSubmit;