import{ saveEntry, editEntry, useJournalEntries } from "./JournalDataProvider.js"
import{ useMoods, getMoods } from "./MoodDataProvider.js"
import { getTags, useTags } from "./tags/TagsDataProvider.js"
import { useEntriesTags, saveEntryTags, deleteEntriesTags } from "./tags/EntriesTagsDataProvider.js" 


const contentTarget = document.querySelector(".entryForm__container")
const eventHub = document.querySelector(".container")




eventHub.addEventListener("editEntryClicked", event => {
    const allEntries = useJournalEntries()
    const entryId = event.detail.entryId
    const entryObject = allEntries.find(entry => entry.id === entryId)
    const relationships = useEntriesTags()
    const relationshipArr = relationships.filter(r => entryObject.id === r.entryId)
    
    const concepts = document.querySelector("#journalConcepts")
    const date = document.querySelector("#journalDate")
    const mood = document.querySelector("#journalMood")
    const entry = document.querySelector("#journalEntry")
    const id = document.querySelector("#journalId")

    const optionsArr = Array.from(concepts.options)
    const selected = relationshipArr.map(t => optionsArr.find(o => parseInt(o.value) === t.tagId))
    console.log(selected)

    //concepts.selectedOptions = selected
    date.value = entryObject.date
    mood.value = entryObject.mood.id
    entry.value = entryObject.entry
    id.value = entryId
   
})    

eventHub.addEventListener("click", clickEvent =>{
    if (clickEvent.target.id === "recordEntry") {
        
        const concepts = document.querySelector("#journalConcepts")
        const date = document.querySelector("#journalDate")
        const mood = document.querySelector("#journalMood")
        const entry = document.querySelector("#journalEntry")
        const id = document.querySelector("#journalId")
        

        if (concepts.value && date.value && mood.value && entry.value){
            const id = document.querySelector(`#journalId`)
            if(id.value === ""){

                const newEntry = {
                    date: date.value,
                    moodId: mood.value,
                    entry: entry.value
                }
                saveEntry(newEntry)
                .then(() => {
                    const entries = useJournalEntries()

                    Array.from(concepts.selectedOptions).forEach(o => {
                        const newRelationship = {
                            entryId: entries.length,
                            tagId: parseInt(o.value)
                        }
                            saveEntryTags(newRelationship)
                        })
                    })

                render()
            }else{
                const updatedEntry = {
                    date: date.value,
                    moodId: mood.value,
                    entry: entry.value,
                    id: parseInt(id.value)
                }

                editEntry(updatedEntry)
                const relationships = useEntriesTags()
                const relationshipsFound = relationships.filter(r => r.entryId === parseInt(id.value))
                relationshipsFound.forEach(r => deleteEntriesTags(r.id))

                Array.from(concepts.selectedOptions).forEach(o => {
                    const newRelationship = {
                        entryId: parseInt(id.value),
                        tagId: parseInt(o.value)
                    }
                        saveEntryTags(newRelationship)
                    })

                render()
            }
        }else{
            window.alert("Please fill in all fields")
        }

    }
})

export const entryForm = () => {
    getMoods()
    .then(getTags)
    .then(render)
}

const render = () => {

    const moods = useMoods()

    const tags = useTags()

    contentTarget.innerHTML = `
    <h2 class="entryFormHeader">Create Journal Entry</h2>
    <div class="concepts__date">
        <div  class="concepts">
            <select id="journalConcepts" multiple="multiple">
                <option value="0">Please select concepts covered...</option>
                ${
                    tags.map(tag => `<option value="${tag.id}">${tag.subject}</option>`).join('')
                }
            </select>
        </div>
        <div>
            <label for="journalDate">Date of Entry</label>
            <input type="date" name="journalDate" id="journalDate">
        </div>
            
    </div>
    <div class="mood__entry">
            <select id="journalMood">
                <option value="0">Please select a mood...</option>
                ${
                    moods.map(mood => `<option value="${mood.id}">${mood.label}</option>`).join('')
                }
            </select>
        <div>
            <textarea placeholder="Write Entry Here" id="journalEntry"></textarea>
        </div>
    </div>
    
    <div class="button_div">
        <button id="recordEntry">Record Journal Entry</button>
    </div>
    <input type="hidden" name="entryId" id="journalId" value = "">
    `
}
