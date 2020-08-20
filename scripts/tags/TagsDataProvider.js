let tags = []

export const getTags = () => {
    return fetch('http://localhost:3000/tags')
        .then(response => response.json())
        .then(parsedTags => {
            tags = parsedTags
        })

}

export const useTags = () => {
    return tags.slice()
}