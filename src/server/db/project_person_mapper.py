from server.db.mapper import Mapper
from server.bo.project_person import ProjectPerson
from datetime import datetime


class ProjectPersonMapper(Mapper):
    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):
        result = []

        for (project_id, person_id) in tuples:
            pp = ProjectPerson()
            pp.set_project_id(project_id)
            pp.set_person_id(person_id)
            result.append(pp)
        return result

    def find_all(self):
        cursor = self._cnx.cursor()
        command = "SELECT project_id, person_id FROM project_persons"
        cursor.execute(command)
        tuples = cursor.fetchall()
        result = self.build_bo(tuples)

        self._cnx.close()
        return result

    def find_by_project_id(self, project_id: int):
        cursor = self._cnx.cursor()
        command = "SELECT project_id, person_id FROM project_persons WHERE project_id = {}".format(project_id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None

        self._cnx.close()
        return result

    def find_by_person_id(self, person_id: int):
        cursor = self._cnx.cursor()
        command = "SELECT project_id, person_id FROM project_persons WHERE person_id = {}".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None

        self._cnx.close()
        return result

    def insert(self, pp: ProjectPerson):
        cursor = self._cnx.cursor()
        command = "INSERT INTO project_persons (project_id, person_id) VALUES (%(project_id)s, %(person_id)s)"
        data = {
            "project_id": pp.get_project_id(),
            "person_id": pp.get_person_id()
        }
        try:
            cursor.execute(command, data)
        except:
            pass

        self._cnx.commit()
        self._cnx.close()
        return pp

    def find_by_id(self, id):
        pass

    def update(self):
        pass

    def delete(self, pp: ProjectPerson):
        cursor = self._cnx.cursor()
        command = "DELETE FROM project_persons WHERE person_id = {} AND project_id = {}".format(
            pp.get_person_id(),
            pp.get_project_id()
        )
        cursor.execute(command)
        self._cnx.commit()
        self._cnx.close()
        return pp