const fs = require('fs/promises')
const path = require('path')
const chalk = require("chalk");

const notesPath = path.join(__dirname, 'db.json')

// ---------------------------------
async function addNote(title) {
  const notes = await getNotes()

  const note = {
    title,
    id: Date.now().toString()
  }

  notes.push(note)

  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.green(`Note was added. (${title})`))
}

// ---------------------------------
async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

// ---------------------------------
async function printNotes() {
  const notes = await getNotes()

  console.log(chalk.bgBlack('Here is the list of notes:'))
  notes.forEach(note => {
    console.log(`${chalk.green(note.id)} ${chalk.blue(note.title)}`)
  })
}

// ---------------------------------
async function removeNote(itemId) {
  const notes = await getNotes()

  if (notes.some(({id}) => id === itemId)) {
    const modifiedArray = notes.filter(({id}) => id !== itemId)
    await fs.writeFile(notesPath, JSON.stringify(modifiedArray))
    console.log(chalk.green(`The item with ID: ${itemId} was successfully deleted.`))
    return
  }

  console.log(chalk.red(`No one item with id - ${itemId}.`))
}

module.exports = {
  addNote, printNotes, removeNote
}