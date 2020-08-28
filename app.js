// Selectors
const shoppingInput = document.querySelector('.shopping-input');
const shoppingListBtn = document.querySelector('.shopping-btn');
const shoppingListEl = document.querySelector('.shopping-list');
const filterOption = document.querySelector('.filter-list');

// Event listeners //
// On page load
document.addEventListener('DOMContentLoaded', getShoppingList);
// Add button
shoppingListBtn.addEventListener('click', addToShoppingList);
// Delete Button
shoppingListEl.addEventListener('click', doneOrDelete);
// Filter Option
filterOption.addEventListener('click', filterShoppingList);


// Functions
// Add item function
function addToShoppingList(event) {
    // Prevent form from submitting
    event.preventDefault();

    // Run if input is not empty
    if (shoppingInput.value !== '') {

        // Create shopping list Div
        const shoppingListDiv = document.createElement('div');
        shoppingListDiv.classList.add('shopping-item');

        // Create shopping list item (li)
        const newItem = document.createElement('li');
        newItem.classList.add('list-item');
        newItem.innerText = shoppingInput.value;
        shoppingListDiv.appendChild(newItem);

        // Add item to local storage
        saveItemToStorage(shoppingInput.value)

        // Completed button
        const doneBtn = document.createElement('button');
        doneBtn.innerHTML = `<i class="material-icons">done</i>`
        doneBtn.classList.add('done-btn');
        shoppingListDiv.appendChild(doneBtn);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<i class="material-icons">delete</i>`
        deleteBtn.classList.add('delete-btn');
        shoppingListDiv.appendChild(deleteBtn);

        // Append to list
        shoppingListEl.appendChild(shoppingListDiv);

        // Clear Input
        shoppingInput.value = '';
    }
}

// Delete item function
function doneOrDelete(event) {
    // Prevent form from submitting
    event.preventDefault();
    const item = event.target;

    if (item.classList[0] === 'delete-btn') {
        const listItem = item.parentElement;
        // Anuimation
        listItem.classList.add('fall');
        // Remove item after animation
        removeItemFromStorage(listItem);
        listItem.addEventListener('transitionend', function () {
            listItem.remove();
        });
    } else if (item.classList[0] === 'done-btn') {
        item.parentElement.classList.toggle('done');
    }
}

// Filter shopping list function
function filterShoppingList(event) {
    const myshoppingList = shoppingListEl.childNodes;

    myshoppingList.forEach(currentItem => {
        switch (event.target.value) {
            case "all":
                currentItem.style.display = 'flex';
                break;
            case "done":
                if (currentItem.classList.contains('done')) {
                    currentItem.style.display = 'flex';
                } else {
                    currentItem.style.display = 'none';
                }
                break;
            case "not-done":
                if (!currentItem.classList.contains('done')) {
                    currentItem.style.display = 'flex';
                } else {
                    currentItem.style.display = 'none';
                }
                break;
        }
    });
}

// Save items to local storage
function saveItemToStorage(item) {
    // Check if list exists in local storage
    let shoppingList;
    if (localStorage.getItem('shoppingList') === null) {
        shoppingList = [];
    } else {
        shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
    }

    // Push item to shopping List
    shoppingList.push(item);

    // Save new item in local storage
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Get shopping list on page load
function getShoppingList() {
    let shoppingList;

    if (localStorage.getItem('shoppingList') === null) {
        shoppingList = [];
    } else {
        shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
    }

    // Show in ui
    shoppingList.forEach(currentItem => {
        // Create shopping list Div
        const shoppingListDiv = document.createElement('div');
        shoppingListDiv.classList.add('shopping-item');

        // Create shopping list item (li)
        const newItem = document.createElement('li');
        newItem.classList.add('list-item');
        newItem.innerText = currentItem;
        shoppingListDiv.appendChild(newItem);

        // Completed button
        const doneBtn = document.createElement('button');
        doneBtn.innerHTML = `<i class="material-icons">done</i>`
        doneBtn.classList.add('done-btn');
        shoppingListDiv.appendChild(doneBtn);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<i class="material-icons">delete</i>`
        deleteBtn.classList.add('delete-btn');
        shoppingListDiv.appendChild(deleteBtn);

        // Append to list
        shoppingListEl.appendChild(shoppingListDiv);
    })
}

// Remove from local storage - function
function removeItemFromStorage(item) {
    // Get text of the item
    item = item.children[0].innerText;

    // Check items in local storage
    let shoppingList;

    if (localStorage.getItem('shoppingList') === null) {
        shoppingList = [];
    } else {
        shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
    }

    // Remove item from shopping list
    const itemIndex = shoppingList.indexOf(item);
    shoppingList.splice(itemIndex, 1);

    // Update in local storage
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}