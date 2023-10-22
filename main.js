//My JS code
console.log("main.js is loaded...");


//My HTML element variables
const input = document.querySelector("#todoinput");
const list = document.querySelector(".lidiv");
const button = document.querySelector("#addtodo");
const info = document.querySelector("h2")
const completedinfo = document.querySelector("p")
const todo = document.getElementById("todoList").style.cursor = "pointer";


//My JS variables
let completedCount = 0;
const todoArray = [];
const simpletodoArray = [];



//function to handle change status on object in array
//takes parameter completed (bool)
function changestatus(todoText, completed) {

    //find index, look in objects and value on "name"
    let correctIndex = todoArray.map(t => t.name).indexOf(todoText)

    //change status on the object at correct index
    todoArray[correctIndex].status = completed;
}

button.addEventListener("click", function() {

    //Fetch value from input
    const text = input.value;

    //Check that text is not empty
    if (text.length == 0) {
        info.innerText = "Input must not be empty";
        return;
    } else {
        info.innerText = "";
    }

    //Add todo to todoArray
    const todoObject = { name: text, status: false };
    todoArray.push(todoObject);

    //Add todo to our simple todoArray
    simpletodoArray.push(text);


    // Create li-element in ul
    const item = document.createElement("li");
    list.appendChild(item);

    //create a span-element in our new li and add text
    const itemLabel = document.createElement("span");
    itemLabel.innerText = text;
    item.appendChild(itemLabel);

    //Create a span-element that has a trashcan
    const trashcan = document.createElement("span");
    trashcan.innerHTML = "&#128465;";
    trashcan.setAttribute("class", "trashcan");
    item.appendChild(trashcan);

    //Add a listener to the span & change completedCount
    itemLabel.addEventListener("click", function() {

        //Toggle completed/uncompleted

        if (item.getAttribute("class") == "completed") {

            item.setAttribute("class", "");

            //Change status on object in array to false
            let clickedText = item.firstChild.firstChild.textContent
            changestatus(clickedText, false);
            completedCount--
        } else {
            item.setAttribute("class", "completed");

            //Change status to object in array to true
            let clickedText = item.firstChild.firstChild.textContent
            changestatus(clickedText, true);
            completedCount++;

        }

        completedinfo.innerText = `${completedCount} completed`;

    })

    //Add a listener to the trashcan
    trashcan.addEventListener("click", function() {

        //Set complete correct
        if (item.getAttribute("class") == "completed") {
            completedCount--

        }

        completedinfo.innerText = `${completedCount} completed`;

        //Set todoArray correct
        let removetext = item.firstChild.firstChild.textContent;
        let indexToRemove = simpletodoArray.indexOf(removetext)
        simpletodoArray.splice(indexToRemove, 1);

        //remove li-element
        item.remove();

    })

    //Empty input field
    input.value = "";
})