from server.bo.business_object import BusinessObject


class Comment(BusinessObject):
    def __init__(self):
        super().__init__()
        self._text = ""
        self._person_id = 0
        self._card_id = 0

    def get_text(self):
        return self._text

    def set_text(self, text):
        self._text = text

    def get_person_id(self):
        return self._person_id

    def set_person_id(self, person_id):
        self._person_id = person_id

    def get_card_id(self):
        return self._card_id

    def set_card_id(self, card_id):
        self._card_id = card_id

    @staticmethod
    def from_dict(comment_dict=dict()):
        comment = Comment()
        comment.set_id(comment_dict.get("id", 0))
        comment.set_created_at(Comment.time_format(comment_dict.get("created_at", None)))
        comment.set_last_update_at(Comment.time_format(comment_dict.get("last_update_at", None)))
        comment.set_text(comment_dict.get("text", ""))
        comment.set_person_id(comment_dict.get("person_id", 0))
        comment.set_card_id(comment_dict.get("card_id", 0))
        return comment