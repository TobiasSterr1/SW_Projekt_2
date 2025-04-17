import BusinessObject from './BusinessObject';


export default class Person extends BusinessObject {
    constructor(username, firstname, lastname, email, google_id, avatar) {
        super();
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.google_id = google_id;
        this.avatar = avatar;
    }

    setUsername(username) {
        this.username = username;
    }

    getUsername() {
        return this.username;
    }

    setFirstname(firstname) {
        this.firstname = firstname;
    }

    getFirstname() {
        return this.firstname;
    }

    setLastname(lastname) {
        this.lastname = lastname;
    }

    getLastname() {
        return this.lastname;
    }

    setEmail(email) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

    setGoogleId(google_id) {
        this.google_id = google_id;
    }

    getGoogleId() {
        return this.google_id;
    }

    setAvatar(avatar) {
        this.avatar = avatar;
    }

    getAvatar() {
        return this.avatar;
    }

    static fromJSON(person) {
        let result = [];
        if (Array.isArray(person)) {
            person.forEach((p) => {
                Object.setPrototypeOf(p, Person.prototype);
                result.push(p);
            })
        } else {
            let p = person;
            Object.setPrototypeOf(p, Person.prototype);
            result.push(p);
        }
        return result;
    }
}