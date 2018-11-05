class NotesAdapter {
	constructor() {
		this.baseUrl = 'http://localhost:3000/api/v1/notes'
		// this.baseUrl = 'https://swt-notes-api.herokuapp.com/api/v1/notes'
		this.baseUrl2 = 'https://music-db-api.herokuapp.com/api/songs'
	}

	getNotes() {
		return fetch(this.baseUrl).then(res => {
			return res.json()
		})
	}

	createNote(value) {
		console.log('createNote value: ', value);
		const note = {
			body: value
		}
		return fetch(this.baseUrl, {
			method: 'post',
			// cors: 'cors',
			headers: { "Content-Type": "application/json; charset=utf-8" },
			body: JSON.stringify({ note }) // equivalent in ES6 to: {note: note } because the key and value are same
		}).then(res => res.json())
	}

	updateNote(note) {
		let url = this.baseUrl + `/${note.id}`

		return fetch(url, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(note),
		}).then(res => res.json());
	}

	deleteNote(id) {
		console.log('delete id: ', id);
		let url = this.baseUrl + `/${id}`

		return fetch(url, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			body: JSON.stringify(id),
		}).then(res => res.json());
	}

	getSongs() {
		return fetch(this.baseUrl2).then(res => res.json())
	}
}
