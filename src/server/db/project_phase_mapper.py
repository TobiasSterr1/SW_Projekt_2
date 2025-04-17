from server.db.mapper import Mapper
from server.bo.project_phase import ProjectPhase
from datetime import datetime


class ProjectPhaseMapper(Mapper):
    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):
        result = []

        for (project_id, phase_id, rank) in tuples:
            pp = ProjectPhase()
            pp.set_project_id(project_id)
            pp.set_phase_id(phase_id)
            pp.set_rank(rank)
            result.append(pp)
        return result

    def find_all(self):
        cursor = self._cnx.cursor()
        command = "SELECT project_id, phase_id, `rank` FROM project_phases order by `rank`"
        cursor.execute(command)
        tuples = cursor.fetchall()
        result = self.build_bo(tuples)

        self._cnx.close()
        return result

    def find_by_id(self, id):
        pass

    def find_by_project_id(self, project_id: int):
        cursor = self._cnx.cursor()
        command = "SELECT project_id, phase_id, `rank` FROM project_phases WHERE project_id = {} order by `rank`".format(project_id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None

        self._cnx.close()
        return result

    def find_by_phase_id(self, phase_id: int):
        cursor = self._cnx.cursor()
        command = "SELECT project_id, phase_id, `rank` FROM project_phases WHERE phase_id = {} order by `rank`".format(phase_id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None

        self._cnx.close()
        return result

    def insert(self, pp: ProjectPhase):
        cursor = self._cnx.cursor()
        cursor.execute(f"SELECT MAX(`rank`) as maxrank FROM project_phases WHERE project_id = {pp.get_project_id()}")
        tuples = cursor.fetchall()
        for (values) in tuples:
            if values[0] is None:
                maxrank = 1
            else:
                maxrank = values[0]+1

        pp.set_rank(maxrank)
        command = "INSERT INTO project_phases (project_id, phase_id, `rank`) VALUES (%(project_id)s, %(phase_id)s, %(rank)s)"
        data = {
            "project_id": pp.get_project_id(),
            "phase_id": pp.get_phase_id(),
            "rank": pp.get_rank()
        }
        try:
            cursor.execute(command, data)
        except:
            pass

        self._cnx.commit()
        self._cnx.close()
        return pp

    def update(self, pp: ProjectPhase):
        cursor = self._cnx.cursor()
        command = "UPDATE project_phases SET `rank` = %(rank)s WHERE project_id = %(project_id)s AND phase_id = %(phase_id)s"
        data = {
            "project_id": pp.get_project_id(),
            "phase_id": pp.get_phase_id(),
            "rank": pp.get_rank()
        }
        try:
            cursor.execute(command, data)
        except Exception as e:
            print(e)

        self._cnx.commit()
        self._cnx.close()
        return pp

    def delete(self, pp: ProjectPhase):
        cursor = self._cnx.cursor()
        command = "DELETE FROM project_phases WHERE phase_id = {} AND project_id = {}".format(
            pp.get_phase_id(),
            pp.get_project_id()
        )
        cursor.execute(command)
        self._cnx.commit()
        self._cnx.close()
        return pp