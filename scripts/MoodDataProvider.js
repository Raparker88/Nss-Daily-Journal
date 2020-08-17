

let moods = []

export const getMoods = () => {
    return fetch('http://localhost:3000/moods')
        .then(response => response.json())
        .then(parsedMoods => {
            moods = parsedMoods
        })

}

export const useMoods = () => {
    return moods.slice()
}