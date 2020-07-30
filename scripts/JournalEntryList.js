import { createEntryHTML } from "./JournalEntry.js"
import { useJournalEntries, getEntries } from "./JournalDataProvider.js"

const eventHub = document.querySelector(".container")
const contentElement = document.querySelector(".past__entries")


eventHub.addEventListener("entryStateChanged", event => {
    entryList()
})

const render = (entryArray) => {
    
    contentElement.innerHTML = entryArray.map(entry => createEntryHTML(entry)).join("")
    
}

export const entryList = () => {
    getEntries().then(() => {
        const entries = useJournalEntries()
        render(entries)
    })
    
}
entryList()
