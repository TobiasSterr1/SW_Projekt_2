from server.db.mapper import Mapper
from server.bo.person import Person
from datetime import datetime


class PersonMapper(Mapper):
    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):
        result = []

        if len(tuples) == 0:
            result = None
        if len(tuples) == 1:
            for (id, username, firstname, lastname, email, google_id, avatar, created_at, last_update_at) in tuples:
                person = Person()
                person.set_id(id)
                person.set_username(username)
                person.set_firstname(firstname)
                person.set_lastname(lastname)
                person.set_email(email)
                person.set_google_id(google_id)
                person.set_avatar(avatar)
                person.set_created_at(created_at)
                person.set_last_update_at(last_update_at)
                result = person
        else:
            for (id, username, firstname, lastname, email, google_id, avatar, created_at, last_update_at) in tuples:
                person = Person()
                person.set_id(id)
                person.set_username(username)
                person.set_firstname(firstname)
                person.set_lastname(lastname)
                person.set_email(email)
                person.set_google_id(google_id)
                person.set_avatar(avatar)
                person.set_created_at(created_at)
                person.set_last_update_at(last_update_at)
                result.append(person)
        return result

    def find_all(self):
        cursor = self._cnx.cursor()
        command = "SELECT id, username, firstname, lastname, email, google_id, avatar, created_at, last_update_at FROM persons"
        cursor.execute(command)
        tuples = cursor.fetchall()
        result = self.build_bo(tuples)

        self._cnx.close()
        return result

    def find_by_id(self, id: int):
        cursor = self._cnx.cursor()
        command = "SELECT id, username, firstname, lastname, email, google_id, avatar, created_at, last_update_at FROM persons WHERE id = {}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None

        self._cnx.close()
        return result

    def find_person_by_google_id(self, google_id: str):
        cursor = self._cnx.cursor()
        command = "SELECT id, username, firstname, lastname, email, google_id, avatar, created_at, last_update_at FROM persons WHERE google_id = '{}'".format(google_id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None

        self._cnx.close()
        return result

    def insert(self, person: Person):
        cursor = self._cnx.cursor()
        cursor.execute(f"SELECT MAX(id) as maxid FROM persons")
        tuples = cursor.fetchall()
        for (values) in tuples:
            if values[0] is None:
                maxid = 1
            else:
                maxid = values[0]+1
        person.set_id(maxid)
        command = "INSERT INTO persons (id, username, firstname, lastname, email, google_id, avatar, created_at, last_update_at) VALUES \
                   (%(id)s, %(username)s, %(firstname)s, %(lastname)s, %(email)s, %(google_id)s, %(avatar)s, %(created_at)s, %(last_update_at)s)"
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        person.set_last_update_at(now)
        person.set_created_at(now)
        data = {
            "id": person.get_id(),
            "username": person.get_username(),
            "firstname": person.get_firstname(),
            "lastname": person.get_lastname(),
            "email": person.get_email(),
            "google_id": person.get_google_id(),
            "avatar": person.get_avatar(),
            "created_at": person.get_created_at(),
            "last_update_at": person.get_last_update_at()
        }
        try:
            cursor.execute(command, data)
        except:
            pass

        self._cnx.commit()
        self._cnx.close()
        return person

    def update(self, person: Person):
        cursor = self._cnx.cursor()
        command = "UPDATE persons SET username = %(username)s, firstname = %(firstname)s, lastname = %(lastname)s, \
                   email = %(email)s, google_id = %(google_id)s, avatar = %(avatar)s, last_update_at = %(last_update_at)s WHERE id = %(id)s"
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        person.set_last_update_at(now)
        data = {
            "id": person.get_id(),
            "username": person.get_username(),
            "firstname": person.get_firstname(),
            "lastname": person.get_lastname(),
            "email": person.get_email(),
            "google_id": person.get_google_id(),
            "avatar": person.get_avatar(),
            "last_update_at": person.get_last_update_at()
        }
        try:
            cursor.execute(command, data)
        except Exception as e:
            print(e)

        self._cnx.commit()
        self._cnx.close()
        return person

    def delete(self, person: Person):
        cursor = self._cnx.cursor()
        command = "DELETE FROM persons WHERE id = {}".format(person.get_id())
        cursor.execute(command)
        self._cnx.commit()
        self._cnx.close()
        return person