/*
 *   Journal data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.
const journal = [
    {
        id: 1,
        date: "07/24/2025",
        concept: "HTML & CSS",
        entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
        mood: "Ok"
    },
    {
        id:2,
        date:"07/13/2020",
        concept: "Javascript Automation",
        entry: "We learned how to add Javascript into our projects in order to automate the writing of html when adding new content",
        mood: "tired"

    },
    {
        id:3,
        date:"07/15/2020",
        concept: "Debugging",
        entry: "We learned to use our dev tools in the browser to find bugs the files and troubleshoot problems occurring in our code.",
        mood: "happy"

    }
]

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}