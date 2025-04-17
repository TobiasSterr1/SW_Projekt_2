from server.db.mapper import Mapper
from server.bo.project import Project
from datetime import datetime


class ProjectMapper(Mapper):
    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):
        result = []

        if len(tuples) == 0:
            result = None
        if len(tuples) == 1:
            for (id, title, description, person_id, starts_at, ends_at, created_at, last_update_at) in tuples:
                project = Project()
                project.set_id(id)
                project.set_title(title)
                project.set_description(description)
                project.set_person_id(person_id)
                project.set_starts_at(starts_at)
                project.set_ends_at(ends_at)
                project.set_created_at(created_at)
                project.set_last_update_at(last_update_at)
                result = project
        else:
            for (id, title, description, person_id, starts_at, ends_at, created_at, last_update_at) in tuples:
                project = Project()
                project.set_id(id)
                project.set_title(title)
                project.set_description(description)
                project.set_person_id(person_id)
                project.set_starts_at(starts_at)
                project.set_ends_at(ends_at)
                project.set_created_at(created_at)
                project.set_last_update_at(last_update_at)
                result.append(project)
        return result

    def find_all(self):
        cursor = self._cnx.cursor()
        command = "SELECT id, title, description, person_id, starts_at, ends_at, created_at, last_update_at FROM projects"
        cursor.execute(command)
        tuples = cursor.fetchall()
        result = self.build_bo(tuples)

        self._cnx.close()
        return result

    def find_by_id(self, id: int):
        cursor = self._cnx.cursor()
        command = "SELECT id, title, description, person_id, starts_at, ends_at, created_at, last_update_at FROM projects WHERE id = {}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None

        self._cnx.close()
        return result

    def insert(self, project: Project):
        cursor = self._cnx.cursor()
        cursor.execute(f"SELECT MAX(id) as maxid FROM projects")
        tuples = cursor.fetchall()
        for (values) in tuples:
            if values[0] is None:
                maxid = 1
            else:
                maxid = values[0]+1

        project.set_id(maxid)
        command = "INSERT INTO projects (id, title, description, person_id, starts_at, ends_at, created_at, last_update_at) VALUES \
                   (%(id)s, %(title)s, %(description)s, %(person_id)s, %(starts_at)s, %(ends_at)s, %(created_at)s, %(last_update_at)s)"
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        project.set_last_update_at(now)
        project.set_created_at(now)
        data = {
            "id": project.get_id(),
            "title": project.get_title(),
            "description": project.get_description(),
            "person_id": project.get_person_id(),
            "starts_at": project.get_starts_at(),
            "ends_at": project.get_ends_at(),
            "created_at": project.get_created_at(),
            "last_update_at": project.get_last_update_at()
        }
        try:
            cursor.execute(command, data)
        except:
            pass

        self._cnx.commit()
        self._cnx.close()
        return project

    def update(self, project: Project):
        cursor = self._cnx.cursor()
        command = "UPDATE projects SET title = %(title)s, description = %(description)s, person_id = %(person_id)s, \
                   starts_at = %(starts_at)s, ends_at = %(ends_at)s, last_update_at = %(last_update_at)s WHERE id = %(id)s"
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        project.set_last_update_at(now)
        data = {
            "id": project.get_id(),
            "title": project.get_title(),
            "description": project.get_description(),
            "person_id": project.get_person_id(),
            "starts_at": project.get_starts_at(),
            "ends_at": project.get_ends_at(),
            "last_update_at": project.get_last_update_at()
        }
        try:
            cursor.execute(command, data)
        except Exception as e:
            print(e)

        self._cnx.commit()
        self._cnx.close()
        return project

    def delete(self, project: Project):
        cursor = self._cnx.cursor()
        command = "DELETE FROM projects WHERE id = {}".format(project.get_id())
        cursor.execute(command)
        self._cnx.commit()
        self._cnx.close()
        return project