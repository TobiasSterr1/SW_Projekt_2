class ProjectPerson(object):
    def __init__(self):
        super().__init__()
        self._project_id = 0
        self._person_id = 0

    def get_project_id(self):
        return self._project_id

    def set_project_id(self, project_id):
        self._project_id = project_id

    def get_person_id(self):
        return self._person_id

    def set_person_id(self, person_id):
        self._person_id = person_id
