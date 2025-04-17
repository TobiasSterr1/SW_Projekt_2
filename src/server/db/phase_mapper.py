from server.db.mapper import Mapper
from server.bo.phase import Phase
from datetime import datetime


class PhaseMapper(Mapper):
    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):
        result = []

        if len(tuples) == 0:
            result = None
        if len(tuples) == 1:
            for (id, name, description, created_at, last_update_at) in tuples:
                phase = Phase()
                phase.set_id(id)
                phase.set_name(name)
                phase.set_description(description)
                phase.set_created_at(created_at)
                phase.set_last_update_at(last_update_at)
                result = phase
        else:
            for (id, name, description, created_at, last_update_at) in tuples:
                phase = Phase()
                phase.set_id(id)
                phase.set_name(name)
                phase.set_description(description)
                phase.set_created_at(created_at)
                phase.set_last_update_at(last_update_at)
                result.append(phase)
        return result

    def find_all(self):
        cursor = self._cnx.cursor()
        command = "SELECT id, name, description, created_at, last_update_at FROM phases"
        cursor.execute(command)
        tuples = cursor.fetchall()
        result = self.build_bo(tuples)

        self._cnx.close()
        return result

    def find_by_id(self, id: int):
        cursor = self._cnx.cursor()
        command = "SELECT id, name, description, created_at, last_update_at FROM phases WHERE id = {}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None

        self._cnx.close()
        return result

    def insert(self, phase: Phase):
        cursor = self._cnx.cursor()
        cursor.execute(f"SELECT MAX(id) as maxid FROM phases")
        tuples = cursor.fetchall()
        for (values) in tuples:
            if values[0] is None:
                maxid = 1
            else:
                maxid = values[0]+1

        phase.set_id(maxid)
        command = "INSERT INTO phases (id, name, description, created_at, last_update_at) VALUES (%(id)s,%(name)s,%(description)s,%(created_at)s, %(last_update_at)s)"
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        phase.set_last_update_at(now)
        phase.set_created_at(now)
        data = {
            "id": phase.get_id(),
            "name": phase.get_name(),
            "description": phase.get_description(),
            "created_at": phase.get_created_at(),
            "last_update_at": phase.get_last_update_at()
        }
        try:
            cursor.execute(command, data)
        except Exception as e:
            print(str(e))
            raise ValueError(e)

        self._cnx.commit()
        self._cnx.close()
        return phase

    def update(self, phase: Phase):
        cursor = self._cnx.cursor()
        command = "UPDATE phases SET name = %(name)s, description = %(description)s, last_update_at = %(last_update_at)s WHERE id = %(id)s"
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        phase.set_last_update_at(now)
        data = {
            "id": phase.get_id(),
            "name": phase.get_name(),
            "description": phase.get_description(),
            "last_update_at": phase.get_last_update_at()
        }
        try:
            cursor.execute(command, data)
        except Exception as e:
            print(e)

        self._cnx.commit()
        self._cnx.close()
        return phase

    def delete(self, phase: Phase):
        cursor = self._cnx.cursor()
        command = "DELETE FROM phases WHERE id = {}".format(phase.get_id())
        cursor.execute(command)
        self._cnx.commit()
        self._cnx.close()
        return phase