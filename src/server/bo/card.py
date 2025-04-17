from server.bo.business_object import BusinessObject


class Card(BusinessObject):
    def __init__(self):
        super().__init__()
        self._title = ""
        self._description = ""
        self._points = 0
        self._person_id = 0
        self._project_id = 0
        self._phase_id = 0
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

    def set_points(self, points):
        self._points = points

    def get_points(self):
        return self._points

    def get_person_id(self):
        return self._person_id

    def set_person_id(self, person_id):
        self._person_id = person_id

    def get_project_id(self):
        return self._project_id

    def set_project_id(self, project_id):
        self._project_id = project_id

    def get_phase_id(self):
        return self._phase_id

    def set_phase_id(self, phase_id):
        self._phase_id = phase_id

    def get_starts_at(self):
        return self._starts_at

    def set_starts_at(self, starts_at):
        self._starts_at = starts_at

    def get_ends_at(self):
        return self._ends_at

    def set_ends_at(self, ends_at):
        self._ends_at = ends_at

    @staticmethod
    def from_dict(card_dict=dict()):
        card = Card()
        card.set_id(card_dict.get("id", 0))
        card.set_created_at(Card.time_format(card_dict.get("created_at", None)))
        card.set_last_update_at(Card.time_format(card_dict.get("last_update_at", None)))
        card.set_title(card_dict.get("title", ""))
        card.set_description(card_dict.get("description", ""))
        card.set_points(card_dict.get("points", 0))
        card.set_person_id(card_dict.get("person_id", 0))
        card.set_project_id(card_dict.get("project_id", 0))
        card.set_phase_id(card_dict.get("phase_id", 0))
        card.set_starts_at(card_dict.get("starts_at", ""))
        card.set_ends_at(card_dict.get("ends_at", ""))
        return card