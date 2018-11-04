class NotesAdapter {
	constructor() {
		this.baseUrl = 'http://localhost:3000/api/v1'
		// this.baseUrl = 'https://swt-notes-api.herokuapp.com/api/v1/notes'
		this.baseUrl2 = 'https://music-db-api.herokuapp.com/api/songs'
	}

	getNotes() {
		return fetch(this.baseUrl + '/notes').then(res => {
			return res.json()
		})
	}

	createNote(value) {
		console.log('createNote value: ', value);
		const note = {
			body: value
		}
		return fetch(this.baseUrl + '/notes', {
			method: 'post',
			cors: 'cors',
			headers: { "Content-Type": "application/json; charset=utf-8" },
			body: JSON.stringify({ note }) // equivalent in ES6 to: {note: note } because the key and value are same
		}).then(res => res.json())
	}

	editNoteForm(id, body) {
		event.preventDefault()
		console.log('id: ', id);
		console.log('body: ', body);

		let editNoteForm = document.getElementById('edit-note-form')
		editNoteForm.style = { visibility: true }

		let editNoteBody = document.getElementById('edit-note-body').value

		this.updateNote(id, editNoteBody)
	}

	updateNote(id, body) {
		event.preventDefault()
		const note = {
			id: id,
			body: body
		}

		return fetch(this.baseUrl + `/notes/${id}`, {
			method: 'patch',
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify({ note })
		}).then(res => res.json())
	}


	getSongs() {
		return fetch(this.baseUrl2).then(res => res.json())
	}
}
