const eventHub = document.querySelector(".container")


let entries = []

const dispatchChangeEvent = () => {
    const entryStateChangedEvent = new CustomEvent("entryStateChanged")
    eventHub.dispatchEvent(entryStateChangedEvent)
}

export const getEntries = () => {
    return fetch('http://localhost:3000/entries?_expand=mood')
        .then(response => response.json())
        .then(parsedEntries => {
            entries = parsedEntries
        })

}

export const saveEntry = entry => {
    return fetch('http://localhost:3000/entries', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
    .then(getEntries)
    .then(dispatchChangeEvent)
}

export const useJournalEntries = () => {
    const sortedByDate = entries.sort(
        (currentEntry, nextEntry) =>
            Date.parse(nextEntry.date) - Date.parse(currentEntry.date)
    )
    return sortedByDate
}

export const editEntry = (entry) => {
    return fetch(`http://localhost:3000/entries/${entry.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(entry)
    })
    .then(getEntries)
    .then(dispatchChangeEvent)
}