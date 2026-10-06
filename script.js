const button = document.getElementById("btn");
const message = document.getElementById("message");
let count = 0;
button.addEventListener("click", function (){
    count = count + 1;
    message.textContent = "Нажатий: " + count;
});
const themeButton = document.getElementById("theme-btn");
themeButton.addEventListener("click", function(){
    document.body.classList.toggle("light");
    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light");
}
const noteInput = document.getElementById("note-input");
const addButton = document.getElementById("add-btn");
const noteList = document.getElementById("note-list");
let notes = [];
function saveNotes(){
    localStorage.setItem("notes", JSON.stringify(notes));
}
function loadNotes(){
    const saved = localStorage.getItem("notes");
    if (saved !== null) {
        notes = JSON.parse(saved);
    }
}
function renderNotes(){
    noteList.innerHTML="";
    notes.forEach(function(text, index){
        const newItem = document.createElement("li");
        newItem.textContent = text;
        noteList.appendChild(newItem);
        newItem.addEventListener("click", function(){
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });
    });
}
function addNote() {
    const text = noteInput.value.trim();
    if (text === "") {
        return;
    }
    notes.push(text);
    saveNotes();
    renderNotes();
    noteInput.value = "";
}
addButton.addEventListener("click", addNote);
noteInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNote();
    }
});
loadNotes();
renderNotes();