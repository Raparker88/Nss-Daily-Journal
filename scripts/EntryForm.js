import{ saveEntry } from "./JournalDataProvider.js"

const contentTarget = document.querySelector(".entry__all")
const eventHub = document.querySelector(".container")

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

            saveEntry(newEntry)
            render()
        }
    })
}

const render = () => {
    contentTarget.innerHTML = `
    <h2>Create Journal Entry</h2>
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