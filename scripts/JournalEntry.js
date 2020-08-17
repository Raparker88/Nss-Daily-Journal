import { deleteEntry } from "./JournalDataProvider.js"

const eventHub = document.querySelector(".container")

export const createEntryHTML = (entryObj) =>{
    
    return `
        <li>
            <h3>${entryObj.concept}</h3>
            <p>${entryObj.entry}</p>
            <p>Mood: ${entryObj.mood.label}</p>
            <p>${entryObj.date}</P>
            <button id="editEntry--${entryObj.id}">edit</button>
            <button id="deleteEntry--${entryObj.id}">delete</button>
            
        </li>
    `
}

eventHub.addEventListener("click", event => {
    if(event.target.id.startsWith("editEntry")){
        const entryId = event.target.id.split("--")[1]
        const customEvent = new CustomEvent("editNoteClicked", {
            detail: {
                entryId: parseInt(entryId)
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})

eventHub.addEventListener("click", event => {
    if(event.target.id.startsWith("deleteEntry")){
        const entryId = event.target.id.split("--")[1]
        deleteEntry(entryId)
    }
})