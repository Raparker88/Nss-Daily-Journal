export const createEntryHTML = (entryObj) =>{
    
    return `
        <li>
            <h3>${entryObj.concept}</h3>
            <p>${entryObj.entry}</p>
            <p>Mood: ${entryObj.mood}</p>
            <p>${entryObj.date}</P>
            <button>edit</button>
            <button>delete</button>
        </li>
    `
}