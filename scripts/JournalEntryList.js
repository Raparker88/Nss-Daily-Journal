import { createEntryHTML } from "./JournalEntry.js"
import { useJournalEntries } from "./JournalDataProvider.js"

let entryListHTML = ""

export const entryList = () => {
    const contentElement = document.querySelector(".past__entries")
    const entries = useJournalEntries()

    for (const entry of entries) {
        entryListHTML += createEntryHTML(entry)
    }

    contentElement.innerHTML += `
        ${entryListHTML}
    `
}