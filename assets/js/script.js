var notes = JSON.parse(localStorage.getItem('notes'));
if(notes == null) {
    notes = [];
}
const addNoteBtn = document.getElementById('add_note_btn');
const saveBtn = document.getElementById('save_note');
const deleteBtn = document.getElementById('delete_note');
const editBtn = document.getElementById('edit_note');
const editNotesHeader = document.getElementsByClassName('edit_notes_header')[0];
const noteTextarea = document.getElementById('note_textarea');

addNoteBtn.addEventListener('click', addNewNote);
saveBtn.addEventListener('click', saveNote);
editBtn.addEventListener('click', editNote);
deleteBtn.addEventListener('click', deleteNote);

populateNotesList(notes);

function populateNotesList(notes) {
    const notesList = document.getElementById('notes_list');
    notesList.innerHTML = "";
    if(notes != null) {
        notes.forEach(note => {
            let text = document.createTextNode(note.text);
            let note_item = document.createElement("div");
            let paragraph = document.createElement("p");
            
            paragraph.appendChild(text)
            note_item.appendChild(paragraph);
           
            note_item.className = "note_list_item";
            note_item.setAttribute('data-id', note.id);
            note_item.addEventListener('click', displayNote);
            notesList.appendChild(note_item);
        });
    } 
}

function displayNote() {
    noteTextarea.value = "";
    editNotesHeader.style.display = "block";
    saveBtn.style.display = "none";
    addNoteBtn.style.display = "flex";
    saveBtn.style.display = "none";
    editBtn.style.display = "block";
    deleteBtn.style.display = "block";
    deleteBtn.setAttribute('data-note_id', this.getAttribute('data-id'));
    editBtn.setAttribute('data-note_id', this.getAttribute('data-id'));
    
    notes.forEach(note => {
        if(note.id == this.getAttribute('data-id')) {
            noteTextarea.value = note.text;
        }
    });
    noteTextarea.setAttribute('readonly', 'true');
}


function addNewNote() {
    noteTextarea.removeAttribute('readonly');
    noteTextarea.value = "";
    deleteBtn.setAttribute('data-note_id', this.getAttribute(''));
    saveBtn.style.display = "block";
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";
    editNotesHeader.style.display = "block";
    this.style.display = "none";
    noteTextarea.focus();
}

function saveNote() {
    const noteText = noteTextarea.value;
    const noteID = this.getAttribute('data-note_id')

    if(noteText != '') {
        if(noteID == '') {
            const note = {
                id: Date.now(),
                text: noteText.trim()
            }
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
        }
        else {
            notes.forEach(note => {
                if(note.id == noteID) {
                    note.text = noteText;                    
                }
            });
            localStorage.setItem('notes', JSON.stringify(notes));
        }
        populateNotesList(notes);
        editNotesHeader.style.display = "none";
        noteTextarea.value = "";
        addNoteBtn.style.display = "flex";
    }
}

function editNote() {
    noteTextarea.removeAttribute('readonly');
    addNoteBtn.style.display = "none";
    saveBtn.style.display = "block";
    editBtn.style.display = "none";
    deleteBtn.style.display = "none";

    saveBtn.setAttribute('data-note_id', this.getAttribute('data-note_id'));
    noteTextarea.focus();
}

function deleteNote() {
    const noteID = this.getAttribute('data-note_id');
    var key = -1;
   
    for(let i = 0; i < notes.length; i++) {
        if(noteID == notes[i].id) {
            key = i;
            break;
        }
    }

    if(key > -1) {
        notes.splice(key, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        populateNotesList(notes);
        editNotesHeader.style.display = "none";
        noteTextarea.value = "";
    }
}