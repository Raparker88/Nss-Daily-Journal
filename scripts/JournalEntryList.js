import { createEntryHTML } from "./JournalEntry.js"
import { useJournalEntries, getEntries } from "./JournalDataProvider.js"
import { getTags, useTags } from "./tags/TagsDataProvider.js"
import { getEntriesTags, useEntriesTags } from "./tags/EntriesTagsDataProvider.js"

const eventHub = document.querySelector(".container")
const contentElement = document.querySelector(".past__entries")

let entries = []
let entryTags = []
let tags = []

eventHub.addEventListener("entryStateChanged", event => {
    entries = useJournalEntries()
    render()
})

eventHub.addEventListener("entryTagsStateChanged", event => {
    entryTags = useEntriesTags()
    render()
})


const render = () => {
    
    contentElement.innerHTML = entries.map(entry => {
        let relationshipArr = entryTags.filter(et => entry.id === et.entryId)
        let foundTags = relationshipArr.map(rObj => tags.find(t => t.id === rObj.tagId))
        
        return createEntryHTML(entry, foundTags)
    }).join("")
}

const entryList = () => {
    getEntries()
    .then(getTags)
    .then(getEntriesTags)
    .then(() => {
        entryTags = useEntriesTags()
        tags = useTags()
        entries = useJournalEntries()
        render()
    })
    
}
entryList()

