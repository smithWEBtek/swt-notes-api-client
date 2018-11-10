class Notes {
	constructor() {
		this.notes = []
		this.songs = []
		this.adapter = new NotesAdapter()
		this.initBindEventListeners()
		// this.fetchAndLoadNotes()
		this.fetchAndLoadSongs()
	}

	initBindEventListeners() {
		this.notesContainer = document.getElementById('notes-container')
		this.body = document.querySelector('body')

		this.noteForm = document.getElementById('new-note-form')
		this.newNoteBody = document.getElementById('new-note-body')
		this.noteForm.addEventListener('submit', this.createNote.bind(this))
		this.notesContainer.addEventListener('dblclick', this.handleNoteClick.bind(this))

		// this.notesContainer.addEventListener('blur', this.updateNote.bind(this), true) // worked
		this.updateButton = document.getElementById('update-button')
		this.notesContainer.addEventListener('blur', this.updateNote.bind(this), true)

		this.studentInfo = document.getElementById('student-info-button')
		this.studentInfo.addEventListener('click', this.fetchAndLoadStudent.bind(this), true)
	}

	handleNoteClick(e) {
		this.toggleNote(e)
	}

	toggleNote(e) {
		const li = e.target
		li.contentEditable = true
		li.classList.add('editable')
		this.updateButton.classList.add('showing');
		this.updateButton.classList.remove('not-showing');
		li.focus()
	}

	updateNote(e) {
		e.preventDefault()
		const li = e.target
		li.contentEditable = false
		li.classList.remove('editable')
		this.updateButton.classList.remove('showing');
		this.updateButton.classList.add('not-showing');

		let body = e.target.textContent
		let id = e.target.dataset.id
		let note = { id, body }
		this.adapter.updateNote(note)
	}

	createNote(e) {
		e.preventDefault()
		const value = this.newNoteBody.value
		this.adapter.createNote(value)
			.then(note => {
				this.notes.push(new Note(note))
				this.newNoteBody.value = ''
				this.render()
			})
	}

	fetchAndLoadNotes() {
		this.adapter.getNotes()
			.then(notes => {
				// notes.forEach(note => this.notes.push(new Note(note)))
				notes.sort((a, b) => a.id - b.id).forEach(note => this.notes.push(new Note(note)))
			})
			.then(() => {
				this.render()
			})
	}

	// 1 ----------------------------------------------------------------------------
	// render() {
	// 	let notesContainer = document.getElementById('notes-container')
	// 	this.notes.map((note, index) => {
	// 		// notesContainer.innerHTML += (`<li note-id=${index}>${note.body}</li>`)
	// 	})
	// }

	// 2 ----------------------------------------------------------------------------
	// render() {
	// 	const notesString = this.notes.map(note => `<li>${note.body}</li>`)
	// 	console.log(notesString.join(''));
	// 	this.notesContainer.innerHTML = notesString.join('')
	// }

	// 3 ----------------------------------------------------------------------------
	render() {
		// this.newNoteBody.value = ''
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

	fetchAndLoadStudent() {
		document.getElementById('student').textContent += this.adapter.getStudent();
	}
}
