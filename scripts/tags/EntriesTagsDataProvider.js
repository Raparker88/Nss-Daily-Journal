const eventHub = document.querySelector(".container")

let entriesTags = []

export const getEntriesTags = () => {
    return fetch('http://localhost:3000/entriesTags')
        .then(response => response.json())
        .then(parsedEntriesTags => {
            entriesTags = parsedEntriesTags
        })

}

export const useEntriesTags = () => {
    return entriesTags.slice()
}

export const saveEntryTags = entry => {
    return fetch('http://localhost:3000/entriesTags', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
    .then(getEntriesTags)
    .then(dispatchChangeEvent)
}

export const deleteEntriesTags = entryId => {
    return fetch(`http://localhost:3000/entriesTags/${entryId}`, {
        method: "DELETE"
    })
        .then(getEntriesTags)
        .then(dispatchChangeEvent)
}

// export const editEntryTags = (entryTag) => {
//     return fetch(`http://localhost:3000/entriesTags/${entryTag.id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(entryTag)
//     })
//     .then(getEntriesTags)
//     .then(dispatchChangeEvent)
// }

const dispatchChangeEvent = () => {
    const customEvent = new CustomEvent("entryTagsStateChanged")
    eventHub.dispatchEvent(customEvent)
}


