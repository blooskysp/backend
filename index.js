const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { printNotes, addNote, removeNote} = require('./note.controller')

const argv = yargs(hideBin(process.argv));

argv.command({
  command: 'add',
  describe: 'Add new node to list',
  builder: {
    title: {
      type: "string",
      describe: 'Note title',
      demandOption: true
    }
  },
  async handler({ title }) {
    await addNote(title)
  }
});

argv.command({
  command: 'list',
  describe: 'Print all nodes',
  async handler() {
    await printNotes()
  }
});

argv.command({
  command: 'remove',
  describe: 'Remove note by id',
  builder: {
    id: {
      type: "string",
      describe: 'Note id',
      demandOption: true
    }
  },
  async handler({ id }) {
    await removeNote(id)
  }
})

argv.parse();
