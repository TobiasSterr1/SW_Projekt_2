from server.db.mapper import Mapper
from server.bo.card import Card
from datetime import datetime


class CardMapper(Mapper):
    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):
        result = []

        if len(tuples) == 0:
            result = None
        if len(tuples) == 1:
            for (id, title, description, points, person_id, project_id, phase_id, starts_at, ends_at, created_at, last_update_at) in tuples:
                card = Card()
                card.set_id(id)
                card.set_title(title)
                card.set_description(description)
                card.set_points(points)
                card.set_person_id(person_id)
                card.set_project_id(project_id)
                card.set_phase_id(phase_id)
                card.set_starts_at(starts_at)
                card.set_ends_at(ends_at)
                card.set_created_at(created_at)
                card.set_last_update_at(last_update_at)
                result = card
        else:
            for (id, title, description, points, person_id, project_id, phase_id, starts_at, ends_at, created_at, last_update_at) in tuples:
                card = Card()
                card.set_id(id)
                card.set_title(title)
                card.set_description(description)
                card.set_points(points)
                card.set_person_id(person_id)
                card.set_project_id(project_id)
                card.set_phase_id(phase_id)
                card.set_starts_at(starts_at)
                card.set_ends_at(ends_at)
                card.set_created_at(created_at)
                card.set_last_update_at(last_update_at)
                result.append(card)
        return result

    def find_all(self):
        cursor = self._cnx.cursor()
        command = "SELECT id, title, description, points, person_id, project_id, phase_id, starts_at, ends_at, created_at, last_update_at FROM cards"
        cursor.execute(command)
        tuples = cursor.fetchall()
        result = self.build_bo(tuples)

        self._cnx.close()
        return result

    def find_by_id(self, id: int):
        cursor = self._cnx.cursor()
        command = "SELECT id, title, description, points, person_id, project_id, phase_id, starts_at, ends_at, created_at, last_update_at FROM cards WHERE id = {}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None

        self._cnx.close()
        return result

    def insert(self, card: Card):
        cursor = self._cnx.cursor()
        cursor.execute(f"SELECT MAX(id) as maxid FROM cards")
        tuples = cursor.fetchall()
        for (values) in tuples:
            if values[0] is None:
                maxid = 1
            else:
                maxid = values[0]+1

        card.set_id(maxid)
        command = "INSERT INTO cards (id, title, description, points, person_id, project_id, phase_id, starts_at, ends_at, created_at, last_update_at) VALUES \
                   (%(id)s, %(title)s, %(description)s, %(points)s, %(person_id)s, %(project_id)s, %(phase_id)s, %(starts_at)s, %(ends_at)s, %(created_at)s, %(last_update_at)s)"
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        card.set_last_update_at(now)
        card.set_created_at(now)
        data = {
            "id": card.get_id(),
            "title": card.get_title(),
            "description": card.get_description(),
            "points": card.get_points(),
            "person_id": card.get_person_id(),
            "project_id": card.get_project_id(),
            "phase_id": card.get_phase_id(),
            "starts_at": card.get_starts_at(),
            "ends_at": card.get_ends_at(),
            "created_at": card.get_created_at(),
            "last_update_at": card.get_last_update_at()
        }
        try:
            cursor.execute(command, data)
        except:
            pass

        self._cnx.commit()
        self._cnx.close()
        return card

    def update(self, card: Card):
        cursor = self._cnx.cursor()
        command = "UPDATE cards SET title = %(title)s, description = %(description)s, points = %(points)s, person_id = %(person_id)s, \
                   project_id = %(project_id)s, phase_id = %(phase_id)s, starts_at = %(starts_at)s, ends_at = %(ends_at)s, last_update_at = %(last_update_at)s WHERE id = %(id)s"
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        card.set_last_update_at(now)
        data = {
            "id": card.get_id(),
            "title": card.get_title(),
            "description": card.get_description(),
            "points": card.get_points(),
            "person_id": card.get_person_id(),
            "project_id": card.get_project_id(),
            "phase_id": card.get_phase_id(),
            "starts_at": card.get_starts_at(),
            "ends_at": card.get_ends_at(),
            "last_update_at": card.get_last_update_at()
        }
        try:
            cursor.execute(command, data)
        except Exception as e:
            print(e)

        self._cnx.commit()
        self._cnx.close()
        return card

    def delete(self, card: Card):
        cursor = self._cnx.cursor()
        command = "DELETE FROM cards WHERE id = {}".format(card.get_id())
        cursor.execute(command)
        self._cnx.commit()
        self._cnx.close()
        return card