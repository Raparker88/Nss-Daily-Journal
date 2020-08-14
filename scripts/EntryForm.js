import{ saveEntry, editEntry, useJournalEntries } from "./JournalDataProvider.js"


const contentTarget = document.querySelector(".entryForm__container")
const eventHub = document.querySelector(".container")


eventHub.addEventListener("editNoteClicked", event => {
    const allEntries = useJournalEntries()
    const entryId = event.detail.entryId
    const entryObject = allEntries.find(entry => entry.id === entryId)
})    

export const entryForm = () => {
    render ()
    eventHub.addEventListener("click", clickEvent =>{
        if (clickEvent.target.id === "recordEntry") {
            
            const concepts = document.querySelector("#journalConcepts")
            const date = document.querySelector("#journalDate")
            const mood = document.querySelector("#journalMood")
            const entry = document.querySelector("#journalEntry")

            const newEntry = {
                concept: concepts.value,
                date: date.value,
                mood: mood.value,
                entry: entry.value
            }
           

            if (concepts.value && date.value && mood.value && entry.value){
                const id = document.querySelector("#entryId")
                if(id === ""){
                    saveEntry(newEntry)
                    render()
                }else{
                    editEntry(newEntry)
                    render()
                }
            }else{
                window.alert("Please fill in all fields")
            }

        }
    })
}

const render = () => {
    contentTarget.innerHTML = `
    <h2 class="entryFormHeader">Create Journal Entry</h2>
    <div class="concepts__date">
        <div  class="concepts">
            <input type="text" placeholder="Concepts Covered" id="journalConcepts">
        </div>
        <div>
            <label for="journalDate">Date of Entry</label>
            <input type="date" name="journalDate" id="journalDate">
        </div>
            
    </div>
    <div class="mood__entry">
        <div>
            <input type="text" placeholder="Current Mood" id="journalMood">
        </div>
        <div>
            <textarea placeholder="Write Entry Here" id="journalEntry"></textarea>
        <div>
    </div>
    
    <div class="button_div">
        <button id="recordEntry">Record Journal Entry</button>
    </div>
    `
}
