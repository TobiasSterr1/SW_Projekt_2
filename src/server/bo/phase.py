from server.bo.business_object import BusinessObject


class Phase(BusinessObject):
    def __init__(self):
        super().__init__()
        self._name = ""
        self._description = ""

    def get_name(self):
        return self._name

    def set_name(self, name):
        self._name = name

    def get_description(self):
        return self._description

    def set_description(self, description):
        self._description = description

    @staticmethod
    def from_dict(phase_dict=dict()):
        phase = Phase()
        phase.set_id(phase_dict.get("id", 0))
        phase.set_created_at(Phase.time_format(phase_dict.get("created_at", None)))
        phase.set_last_update_at(Phase.time_format(phase_dict.get("last_update_at", None)))
        phase.set_name(phase_dict.get("name", ""))
        phase.set_description(phase_dict.get("description", ""))
        return phase