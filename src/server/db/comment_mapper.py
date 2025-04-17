from server.db.mapper import Mapper
from server.bo.comment import Comment
from datetime import datetime


class CommentMapper(Mapper):
    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):
        result = []

        if len(tuples) == 0:
            result = None
        if len(tuples) == 1:
            for (id, text, person_id, card_id, created_at, last_update_at) in tuples:
                comment = Comment()
                comment.set_id(id)
                comment.set_text(text)
                comment.set_person_id(person_id)
                comment.set_card_id(card_id)
                comment.set_created_at(created_at)
                comment.set_last_update_at(last_update_at)
                result = comment
        else:
            for (id, text, person_id, card_id, created_at, last_update_at) in tuples:
                comment = Comment()
                comment.set_id(id)
                comment.set_text(text)
                comment.set_person_id(person_id)
                comment.set_card_id(card_id)
                comment.set_created_at(created_at)
                comment.set_last_update_at(last_update_at)
                result.append(comment)
        return result

    def find_all(self):
        cursor = self._cnx.cursor()
        command = "SELECT id, text, person_id, card_id, created_at, last_update_at FROM comments"
        cursor.execute(command)
        tuples = cursor.fetchall()
        result = self.build_bo(tuples)

        self._cnx.close()
        return result

    def find_by_id(self, id: int):
        cursor = self._cnx.cursor()
        command = "SELECT id, text, person_id, card_id, created_at, last_update_at FROM comments WHERE id = {}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None

        self._cnx.close()
        return result

    def insert(self, comment: Comment):
        cursor = self._cnx.cursor()
        cursor.execute(f"SELECT MAX(id) as maxid FROM comments")
        tuples = cursor.fetchall()
        for (values) in tuples:
            if values[0] is None:
                maxid = 1
            else:
                maxid = values[0]+1

        comment.set_id(maxid)
        command = "INSERT INTO comments (id, text, person_id, card_id, created_at, last_update_at) VALUES \
                   (%(id)s, %(text)s, %(person_id)s, %(card_id)s, %(created_at)s, %(last_update_at)s)"
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        comment.set_last_update_at(now)
        comment.set_created_at(now)
        data = {
            "id": comment.get_id(),
            "text": comment.get_text(),
            "person_id": comment.get_person_id(),
            "card_id": comment.get_card_id(),
            "created_at": comment.get_created_at(),
            "last_update_at": comment.get_last_update_at()
        }
        try:
            cursor.execute(command, data)
        except:
            pass

        self._cnx.commit()
        self._cnx.close()
        return comment

    def update(self, comment: Comment):
        cursor = self._cnx.cursor()
        command = "UPDATE comments SET text = %(text)s, person_id = %(person_id)s, \
                   card_id = %(card_id)s, last_update_at = %(last_update_at)s WHERE id = %(id)s"
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        comment.set_last_update_at(now)
        data = {
            "id": comment.get_id(),
            "text": comment.get_text(),
            "person_id": comment.get_person_id(),
            "card_id": comment.get_card_id(),
            "last_update_at": comment.get_last_update_at()
        }
        try:
            cursor.execute(command, data)
        except Exception as e:
            print(e)

        self._cnx.commit()
        self._cnx.close()
        return comment

    def delete(self, comment: Comment):
        cursor = self._cnx.cursor()
        command = "DELETE FROM comments WHERE id = {}".format(comment.get_id())
        cursor.execute(command)
        self._cnx.commit()
        self._cnx.close()
        return comment