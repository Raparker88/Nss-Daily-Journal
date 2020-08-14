const eventHub = document.querySelector(".container")

export const createEntryHTML = (entryObj) =>{
    
    return `
        <li>
            <h3>${entryObj.concept}</h3>
            <p>${entryObj.entry}</p>
            <p>Mood: ${entryObj.mood}</p>
            <p>${entryObj.date}</P>
            <button id="editEntry--${entryObj.id}">edit</button>
            <button id="deleteEntry--${entryObj.id}">delete</button>
            <input type="hidden" name="entryId" id="${entryObj.id}">
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