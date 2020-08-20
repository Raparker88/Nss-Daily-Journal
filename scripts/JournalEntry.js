import { deleteEntry } from "./JournalDataProvider.js"
import { deleteEntriesTags, useEntriesTags } from "./tags/EntriesTagsDataProvider.js"

const eventHub = document.querySelector(".container")

export const createEntryHTML = (entryObj, tagArr) =>{
    
    return `
        <li>
            ${tagArr.map(t => `<h3>${t.subject}</h3>`).join("")}
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
        const customEvent = new CustomEvent("editEntryClicked", {
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

        const entryTags = useEntriesTags()
        const entryTagsArr = entryTags.filter(et => et.entryId === entryId)
        entryTagsArr.forEach(et => {
            deleteEntriesTags(et.id)
        })

    }
})