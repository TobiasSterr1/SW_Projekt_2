from server.bo.business_object import BusinessObject


class Person(BusinessObject):
    def __init__(self):
        super().__init__()
        self._username = ""
        self._firstname = ""
        self._lastname = ""
        self._email = ""
        self._google_id = ""
        self._avatar = ""

    def get_username(self):
        return self._username

    def set_username(self, username):
        self._username = username

    def get_firstname(self):
        return self._firstname

    def set_firstname(self, firstname):
        self._firstname = firstname

    def get_lastname(self):
        return self._lastname

    def set_lastname(self, lastname):
        self._lastname = lastname

    def get_email(self):
        return self._email

    def set_email(self, email):
        self._email = email

    def get_google_id(self):
        return self._google_id

    def set_google_id(self, google_id):
        self._google_id = google_id

    def get_avatar(self):
        return self._avatar

    def set_avatar(self, avatar):
        self._avatar = avatar

    @staticmethod
    def from_dict(person_dict=dict()):
        person = Person()
        person.set_id(person_dict.get("id", 0))
        person.set_created_at(Person.time_format(person_dict.get("created_at", None)))
        person.set_last_update_at(Person.time_format(person_dict.get("last_update_at", None)))
        person.set_username(person_dict.get("username", ""))
        person.set_firstname(person_dict.get("firstname", ""))
        person.set_lastname(person_dict.get("lastname", ""))
        person.set_email(person_dict.get("email", ""))
        person.set_google_id(person_dict.get("google_id", ""))
        person.set_avatar(person_dict.get("avatar", ""))
        return person