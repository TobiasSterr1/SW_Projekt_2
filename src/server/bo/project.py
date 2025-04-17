from server.bo.business_object import BusinessObject


class Project(BusinessObject):
    def __init__(self):
        super().__init__()
        self._title = ""
        self._description = ""
        self._person_id = 0
        self._starts_at = ""
        self._ends_at = ""

    def get_title(self):
        return self._title

    def set_title(self, title):
        self._title = title

    def set_description(self, description):
        self._description = description

    def get_description(self):
        return self._description

    def get_person_id(self):
        return self._person_id

    def set_person_id(self, person_id):
        self._person_id = person_id

    def get_starts_at(self):
        return self._starts_at

    def set_starts_at(self, starts_at):
        self._starts_at = starts_at

    def get_ends_at(self):
        return self._ends_at

    def set_ends_at(self, ends_at):
        self._ends_at = ends_at

    @staticmethod
    def from_dict(project_dict=dict()):
        project = Project()
        project.set_id(project_dict.get("id", 0))
        project.set_created_at(Project.time_format(project_dict.get("created_at", None)))
        project.set_last_update_at(Project.time_format(project_dict.get("last_update_at", None)))
        project.set_title(project_dict.get("title", ""))
        project.set_description(project_dict.get("description", ""))
        project.set_person_id(project_dict.get("person_id", 0))
        project.set_starts_at(project_dict.get("starts_at", ""))
        project.set_ends_at(project_dict.get("ends_at", ""))
        return project