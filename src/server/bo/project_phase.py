class ProjectPhase(object):
    def __init__(self):
        super().__init__()
        self._project_id = 0
        self._phase_id = 0
        self._rank = 0

    def get_project_id(self):
        return self._project_id

    def set_project_id(self, project_id):
        self._project_id = project_id

    def get_phase_id(self):
        return self._phase_id

    def set_phase_id(self, phase_id):
        self._phase_id = phase_id

    def get_rank(self):
        return self._rank

    def set_rank(self, rank):
        self._rank = rank

    @staticmethod
    def from_dict(pp_dict=dict()):
        pp = ProjectPhase()
        pp.set_project_id(pp_dict.get("project_id", 0))
        pp.set_phase_id(pp_dict.get("phase_id", 0))
        pp.set_rank(pp_dict.get("rank", 0))
        return pp