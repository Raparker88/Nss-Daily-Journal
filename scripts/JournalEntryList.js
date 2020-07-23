import { createEntryHTML } from "./JournalEntry.js"
import { useJournalEntries } from "./JournalDataProvider.js"



export const entryList = () => {
    const contentElement = document.querySelector(".past__entries")
    const entries = useJournalEntries()



    contentElement.innerHTML = entries.map(entry => createEntryHTML(entry)).join("")
    
}