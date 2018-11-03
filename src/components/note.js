class Note {
	constructor(noteJSON) {
		this.id = noteJSON.id
		this.body = noteJSON.body
	}

	renderLi() {
		return (`<li>${this.id}: ${this.body}</li>`)
	}
}