from abc import ABC, abstractmethod
from datetime import datetime


# BusinessObject Klasse
class BusinessObject(ABC):

    def __init__(self):
        self._id = 0
        self._created_at = datetime.now().isoformat()
        self._last_update_at = datetime.now().isoformat()

    def get_id(self):
        return self._id

    def set_id(self, value):
        self._id = value

    def get_created_at(self):
        return self._created_at

    def set_created_at(self, new_date):
        self._created_at = new_date

    def get_last_update_at(self):
        return self._last_update_at

    def set_last_update_at(self, new_date):
        self._last_update_at = new_date

    @staticmethod
    def date_format(date_string):
        if date_string is not None:
            return datetime.strptime(date_string.replace("Z", ""), "%Y-%m-%d")
        return None

    @staticmethod
    def time_format(time_string):
        if time_string is not None:
            time_string = time_string.split(".")[0]
            return datetime.strptime(time_string.replace("Z", "").replace("T", " "), "%Y-%m-%d %H:%M:%S")
        return None