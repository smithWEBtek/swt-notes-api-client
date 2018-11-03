class Notes {
	constructor() {
		this.notes = []
		this.songs = []
		this.adapter = new NotesAdapter()
		this.initBindEventListeners()
		this.fetchAndLoadNotes()
		this.fetchAndLoadSongs()
	}

	initBindEventListeners() {
		this.notesContainer = document.getElementById('notes-container')
		// creates the attribute notesContainer on 'THIS' instance of Notes object 
		this.noteForm = document.getElementById('new-note-form')
		this.newNoteBody = document.getElementById('new-note-body')
		this.noteForm.addEventListener('submit', this.createNote.bind(this))
	}

	createNote(e) {
		e.preventDefault()
		const value = this.newNoteBody.value
		this.adapter.createNote(value)
			.then(note => {
				this.notes.push(new Note(note))
				this.render()
			})
	}

	fetchAndLoadNotes() {
		this.adapter
			.getNotes()
			.then(notes => {
				notes.forEach(note => this.notes.push(new Note(note)))
			})
			.then(() => {
				this.render()
			})
	}

	// 1
	// render() {
	// 	let notesContainer = document.getElementById('notes-container')
	// 	this.notes.map((note, index) => {
	// 		// notesContainer.innerHTML += (`<li note-id=${index}>${note.body}</li>`)
	// 		notesContainer.innerHTML += (`<li note-id=${index}>${note.body}</li>`)
	// 	})
	// }

	// 2
	// render() {
	// 	const notesString = this.notes.map(note => `<li>${note.body}</li>`)
	// 	console.log(notesString);
	// 	console.log(notesString.join(''));
	// 	this.notesContainer.innerHTML = notesString.join('')
	// }

	// 3
	render() {
		const notesList = this.notes.map(n => n.renderLi()).join('')
		this.notesContainer.innerHTML = notesList
	}

	fetchAndLoadSongs() {
		this.adapter.getSongs().then(songs => {
			console.log('[notes.js]fetchAndLoadSongs: ', songs);
			let songList = document.getElementById('songs-container')
			songs.map((song, index) => {
				songList.innerHTML += (`<li song-id=${index}>${song.title}</li>`)
			})
		})
	}
}
