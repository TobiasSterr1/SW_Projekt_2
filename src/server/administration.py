from typing import List, Union
from server.bo.card import Card
from server.bo.comment import Comment
from server.bo.person import Person
from server.bo.phase import Phase
from server.bo.project import Project
from server.bo.project_person import ProjectPerson
from server.bo.project_phase import ProjectPhase

from server.db.card_mapper import CardMapper
from server.db.comment_mapper import CommentMapper
from server.db.person_mapper import PersonMapper
from server.db.phase_mapper import PhaseMapper
from server.db.project_mapper import ProjectMapper
from server.db.project_person_mapper import ProjectPersonMapper
from server.db.project_phase_mapper import ProjectPhaseMapper

from server.utils import get_logged_user_google_id


class Administration(object):
    def __init__(self):
        super().__init__()

    ###########################################
    ###### Personen-spezifische Methoden ######
    ###########################################

    def create_person(self, person: Person) -> Person:
        # Methode, um eine Person in der Datenbank einzufügen
        with PersonMapper() as mapper:
            return mapper.insert(person)

    def get_person_by_google_id(self, google_id: str) -> Person:
        # Methode, um eine Person anhand der ID zu erhalten
        with PersonMapper() as mapper:
            data = mapper.find_person_by_google_id(google_id)
        if isinstance(data, list):
            return data[0]
        else:
            return data

    def get_person_by_id(self, id: int) -> Person:
        # Methode, um alle Personen zu erhalten
        with PersonMapper() as mapper:
            data = mapper.find_by_id(id)
        return data

    def get_persons(self) -> List[Person]:
        # Methode, um eine Person zu aktualisieren
        with PersonMapper() as mapper:
            data = mapper.find_all()
        if data is None:
            return []
        elif isinstance(data, list):
            return data
        else:
            return [data]

    def change_person(self, person: Person) -> Person:
        # Methode, um eine Person zu aktualisieren
        with PersonMapper() as mapper:
            return mapper.update(person)

    def delete_person(self, person: Person) -> Person:
        # Löschen der Kommentare der Personen
        person_comments = self.get_comments_by_person_id(person.get_id())
        for comment in person_comments:
            self.delete_comment(comment)

        # Löschen der Karten der Personen
        person_cards = self.get_cards_by_person_id(person.get_id())
        for card in person_cards:
            self.delete_card(card)

        # Lösche all Projekt von der Person
        with ProjectPersonMapper() as mapper:
            person_in_projects: List[ProjectPerson] = mapper.find_by_person_id(person.get_id())

        for pp in person_in_projects:
            self.delete_person_from_project(
                pp.get_project_id(),
                pp.get_person_id()
            )

        # Lösche alle Projekt von der Person
        person_projects = self.get_project_by_person_id(person.get_id())
        for project in person_projects:
            project_persons = self.get_project_persons(project.get_id())
            if len(project_persons) == 0:
                self.delete_project(project)
            else:
                first_person = project_persons[0]
                project.set_person_id(first_person.get_id())
                self.change_project(project)

        # Löschen des Projekts
        with PersonMapper() as mapper:
            mapper.delete(person)

    ####################################
    ###### ProjectPerson Methoden ######
    ####################################

    def get_project_persons(self, project_id: int) -> List[Person]:
        # Methode, um Personen in einem bestimmten Projekt zu erhalten
        with ProjectPersonMapper() as mapper:
            project_persons: List[ProjectPerson] = mapper.find_by_project_id(project_id)

        result = []
        for pp in project_persons:
            # Ruft die Person für jede Projekt-Person ab und fügt sie dem Ergebnis hinzu
            person = self.get_person_by_id(pp.get_person_id())
            result.append(person)
        return result

    def get_persons_to_add_to_project(self, project_id: int) -> List[Person]:
        # Methode, um Personen hinzuzufügen, die nicht bereits Teil eines Projekts sind
        all_persons = self.get_persons()
        project_persons = self.get_project_persons(project_id)
        project_persons_ids = list(map(lambda person: person.get_id(), project_persons))
        results = []
        for person in all_persons:
            # Überprüft, ob die Person bereits im Projekt ist, und fügt sie der Ergebnisliste hinzu
            if person.get_id() in project_persons_ids:
                continue
            results.append(person)
        return results

    def get_person_projects(self, person_id: int) -> List[Project]:
        # Methode, um Projekte einer Person zu erhalten
        with ProjectPersonMapper() as mapper:
            person_projects: List[ProjectPerson] = mapper.find_by_person_id(person_id)

        result = []
        for pp in person_projects:
            # Ruft das Projekt für jede Projekt-Person ab und fügt es dem Ergebnis hinzu
            project = self.get_project_by_id(pp.get_project_id())
            result.append(project)
        return result

    def add_person_to_project(self, project_id: int, person_id: int):
        # Methode, um eine Person zu einem Projekt hinzuzufügen
        pp = ProjectPerson()
        pp.set_project_id(project_id)
        pp.set_person_id(person_id)
        with ProjectPersonMapper() as mapper:
            return mapper.insert(pp)

    def delete_person_from_project(self, project_id: int, person_id: int):
        # Methode, um eine Person aus einem Projekt zu entfernen
        pp = ProjectPerson()
        pp.set_project_id(project_id)
        pp.set_person_id(person_id)
        with ProjectPersonMapper() as mapper:
            data = mapper.delete(pp)
        person = self.get_person_by_id(data.get_person_id())
        return person

    #######################################
    ###### card-spezifische Methoden ######
    #######################################

    def create_card(self, card: Card) -> Card:
        # Erstellt eine neue Karte in der Datenbank
        with CardMapper() as mapper:
            return mapper.insert(card)

    def get_card_by_id(self, id: int) -> Card:
        # Ruft eine Karte anhand ihrer ID ab
        with CardMapper() as mapper:
            data = mapper.find_by_id(id)
        return data

    def get_cards(self) -> List[Card]:
        # Ruft alle Karten aus der Datenbank ab
        with CardMapper() as mapper:
            data = mapper.find_all()
        if data is None:
            return []
        elif isinstance(data, list): # Überprüft, ob die Daten eine Liste sind
            return data
        else:
            return [data]

    def get_card_by_project_and_phase(self, project_id: int, phase_id: int) -> List[Card]:
        # Ruft alle Karten für ein bestimmtes Projekt und eine bestimmte Phase ab
        all_card: List[Card] = self.get_cards()
        data = []
        for card in all_card:
            # Prüft, ob die Karte zu dem bestimmten Projekt und der bestimmten Phase gehört
            if int(card.get_phase_id()) == phase_id and int(card.get_project_id()) == project_id:
                data.append(card)
        return data

    def get_card_by_project_and_person(self, project_id: int, person_id: int) -> List[Card]:
        # Holt alle Karten im System
        all_card: List[Card] = self.get_cards()
        data = []
        for card in all_card:
            # Überprüfe, ob die Karte zur angegebenen Person und Projekt gehört
            if int(card.get_person_id()) == person_id and int(card.get_project_id()) == project_id:
                data.append(card)
        return data

    def change_card(self, card: Card) -> Card:
        # Aktualisiert eine vorhandene Karte in der Datenbank
        with CardMapper() as mapper:
            return mapper.update(card)

    def delete_card(self, card: Card) -> Card:
        # Lösche all Kommentare die zu der Karte gehören
        card_comments = self.get_comments_by_card_id(card.get_id())
        for comment in card_comments:
            self.delete_comment(comment)
        # Löschen der Karte
        with CardMapper() as mapper:
            mapper.delete(card)

    def get_cards_by_project_id(self, project_id: int) -> List[Card]:
        # Ruft alle Karten für ein bestimmtes Projekt ab
        data = []
        all_card = self.get_cards()
        for card in all_card:
            # Prüft, ob die Karte zu dem bestimmten Projekt gehört
            if int(card.get_project_id()) == project_id:
                data.append(card)
        return data

    def get_cards_by_person_id(self, person_id: int) -> List[Card]:
        data = []
        all_card = self.get_cards()
        for card in all_card:
            if int(card.get_person_id()) == person_id:
                data.append(card)
        return data

    ############################################
    ###### Kommentar-spezifische Methoden ######
    ############################################

    def create_comment(self, comment: Comment) -> Comment:
        # Fügt einen neuen Kommentar in die Datenbank ein
        with CommentMapper() as mapper:
            return mapper.insert(comment)

    def get_comment_by_id(self, id: int) -> Comment:
        # Ruft einen Kommentar anhand seiner ID ab
        with CommentMapper() as mapper:
            data = mapper.find_by_id(id)
        return data

    def get_comments(self) -> List[Comment]:
        # Ruft alle Kommentare aus der Datenbank ab
        with CommentMapper() as mapper:
            data = mapper.find_all()  # Sucht alle Kommentare
        if data is None:
            return []
        elif isinstance(data, list):
            return data
        else:
            return [data]

    def change_comment(self, comment: Comment) -> Comment:
        # Aktualisiert einen vorhandenen Kommentar in der Datenbank
        with CommentMapper() as mapper:
            return mapper.update(comment)

    def delete_comment(self, comment: Comment) -> Comment:
        with CommentMapper() as mapper:
            mapper.delete(comment)

    def get_comments_by_card_id(self, card_id: int) -> List[Comment]:
        # Ruft alle Kommentare für eine bestimmte Karte ab
        data = []
        all_comment = self.get_comments()
        for comment in all_comment:
            # Prüft, ob der Kommentar zu der bestimmten Karte gehört
            if int(comment.get_card_id()) == card_id:
                data.append(comment)
        return data

    def get_comments_by_person_id(self, person_id: int) -> List[Comment]:
        # Ruft alle Kommentare einer Person auf
        data = []
        all_comment = self.get_comments()
        for comment in all_comment:
            # Prüft ob ein Kommentar zu einer Person passt
            if int(comment.get_person_id()) == person_id:
                data.append(comment)
        return data

    ########################################
    ###### Phase-spezifische Methoden ######
    ########################################

    def create_phase(self, phase: Phase) -> Phase:
        # Erstellt eine neue Phase, falls sie noch nicht existiert, sonst gibt die vorhandene zurück
        db_phase = self.get_phase_by_name(phase.get_name())
        if db_phase:
            return db_phase
        with PhaseMapper() as mapper:
            return mapper.insert(phase)

    def create_phase_to_project(self, project_id: int, phase: Phase) -> Union[Phase, None]:
        # Erstellt eine Phase und fügt sie einem Projekt hinzu
        db_project = self.get_project_by_id(project_id)
        if not db_project:
            return None  # Gibt None zurück, wenn das Projekt nicht existiert
        db_phase = self.create_phase(phase)
        if not db_phase:
            return None  # Gibt None zurück, wenn die Phase nicht erstellt werden konnte
        self.add_phase_to_project(  # Fügt die Phase dem Projekt hinzu
            db_project.get_id(),
            db_phase.get_id()
        )
        return db_phase  # Gibt die erstellte oder vorhandene Phase zurück

    def get_phase_by_id(self, id: int) -> Phase:
        # Ruft eine Phase anhand ihrer ID ab
        with PhaseMapper() as mapper:
            data = mapper.find_by_id(id)
        return data

    def get_phases(self) -> List[Phase]:
        # Ruft alle Phasen aus der Datenbank ab
        with PhaseMapper() as mapper:
            data = mapper.find_all()  # Sucht alle Phasen
        if data is None:
            return []
        elif isinstance(data, list):  # Überprüft, ob die Daten eine Liste sind
            return data
        else:
            return [data]

    def get_phase_by_name(self, name: str) -> Union[Phase, None]:
        # Ruft eine Phase anhand ihres Namens ab
        phases = self.get_phases()
        for elem in phases:
            # Überprüft, ob der Name der Phase übereinstimmt
            if elem.get_name().lower() == name.lower():
                return elem  # Gibt die gefundene Phase zurück
        return None

    def change_phase(self, phase: Phase) -> Phase:
        # Aktualisiert eine vorhandene Phase in der Datenbank
        with PhaseMapper() as mapper:
            return mapper.update(phase)

    def delete_phase(self, phase: Phase) -> Phase:
        # Löscht eine Phase aus der Datenbank
        with PhaseMapper() as mapper:
            mapper.delete(phase)

    ###############################################
    ###### ProjectPhase-spezifische Methoden ######
    ###############################################

    def get_project_phases(self, project_id: int) -> List[Phase]:
        # Ruft alle Phasen für ein bestimmtes Projekt ab
        with ProjectPhaseMapper() as mapper:
            project_phases: List[ProjectPhase] = mapper.find_by_project_id(project_id)  # Ruft Projekt-Phasen ab

        result = []
        for pp in project_phases:
            phase = self.get_phase_by_id(pp.get_phase_id())  # Ruft jede Phase ab
            result.append(phase)
        return result

    def add_phase_to_project(self, project_id: int, phase_id: int):
        # Fügt eine Phase einem Projekt hinzu
        pp = ProjectPhase()  # Erstellt eine Instanz von Projekt-Phase
        pp.set_project_id(project_id)  # Setzt die Projekt-ID
        pp.set_phase_id(phase_id)  # Setzt die Phasen-ID
        with ProjectPhaseMapper() as mapper:  # Verbindung zum Mapper herstellen
            mapper.insert(pp)  # Fügt die Projekt-Phase der Datenbank hinzu

    def update_phase_rank_in_project(self, project_id: int, phase_id: int, rank: int):
        # Aktualisiert den Rang einer Phase in einem Projekt
        pp = ProjectPhase()
        pp.set_project_id(project_id)
        pp.set_phase_id(phase_id)
        pp.set_rank(rank)  # Setzt den Rang
        with ProjectPhaseMapper() as mapper:
            return mapper.update(pp)

    def delete_phase_from_project(self, project_id: int, phase_id: int):
        # Löscht eine Phase aus einem Projekt
        pp = ProjectPhase()
        pp.set_project_id(project_id)
        pp.set_phase_id(phase_id)
        with ProjectPhaseMapper() as mapper:
            return mapper.delete(pp)

    def get_phases_to_add_to_project(self, project_id: int) -> List[Phase]:
        # Ruft Phasen ab, die zu einem Projekt hinzugefügt werden können
        all_phases = self.get_phases()
        project_phases = self.get_project_phases(project_id)
        project_phases_ids = list(map(lambda phase: phase.get_id(), project_phases))
        results = []
        for phase in all_phases:
            # Überprüft, ob die Phase nicht bereits zum Projekt gehört und fügt sie der Ergebnisliste hinzu
            if phase.get_id() in project_phases_ids:
                continue
            results.append(phase)
        return results  # Gibt Phasen zurück, die dem Projekt hinzugefügt werden können

    def get_phase_projects(self, phase_id: int) -> List[Project]:
        # Ruft Projekte für eine bestimmte Phase ab
        with ProjectPhaseMapper() as mapper:
            phase_projects: List[ProjectPhase] = mapper.find_by_phase_id(phase_id)  # Ruft Projekte der Phase ab

        result = []
        for pp in phase_projects:
            project = self.get_project_by_id(pp.get_project_id())
            result.append(project)
        return result

    def update_project_project_phase_from_to(self, project_id: int, phase: Phase, actual_pos: int, new_pos: int):
        # Aktualisiert die Position einer Phase in einem Projekt
        with ProjectPhaseMapper() as mapper:
            p_phases: List[ProjectPhase] = mapper.find_by_project_id(project_id)

        if actual_pos != new_pos:
            self.update_phase_rank_in_project(  # Aktualisiert den Rang der Phase
                project_id, phase.get_id(), new_pos
            )
            if new_pos > actual_pos:
                for _phase in p_phases:
                    if (_phase.get_rank() <= actual_pos):
                        continue
                    print(f"update from {_phase.get_rank()} to {_phase.get_rank() - 1}")  # Aktualisiert den Rang der anderen Phasen
                    new_rank = _phase.get_rank() - 1
                    self.update_phase_rank_in_project(
                        project_id, _phase.get_phase_id(), new_rank
                    )

            else:
                for _phase in p_phases:
                    if (_phase.get_rank() >= actual_pos):
                        continue
                    print(f"update from {_phase.get_rank()} to {_phase.get_rank() + 1}")  # Aktualisiert den Rang der anderen Phasen
                    new_rank = _phase.get_rank() + 1
                    self.update_phase_rank_in_project(
                        project_id, _phase.get_phase_id(), new_rank
                    )
        self.change_phase(phase)  # Aktualisiert die Phase

    ##########################################
    ###### Project-spezifische Methoden ######
    ##########################################

    def create_project(self, project: Project) -> Project:
        # Erstellt ein neues Projekt
        with ProjectMapper() as mapper:
            db_project = mapper.insert(project)
        google_id = get_logged_user_google_id() # Ruft die Google-ID des eingeloggten Benutzers ab
        person = self.get_person_by_google_id(google_id)  # Ruft die Person mit der Google-ID ab
        if google_id:
            self.add_person_to_project(  # Fügt die Person dem Projekt hinzu
                db_project.get_id(),
                person.get_id()
            )
        # Erstellt die Standardphasen, falls sie nicht existieren
        for name in ["Todo", "Doing", "Done"]:
            phase = self.get_phase_by_name(name) # Ruft die Phase anhand des Namens a
            if phase is None:
                _phase = Phase()
                _phase.set_name(name)
                phase = self.create_phase(_phase)
            self.add_phase_to_project(
                db_project.get_id(),
                phase.get_id()
            )
        return db_project

    def get_project_by_id(self, id: int) -> Project:
        # Ruft ein Projekt anhand seiner ID ab
        with ProjectMapper() as mapper:
            data = mapper.find_by_id(id)
        return data

    def get_projects(self) -> List[Project]:
        # Ruft alle Projekte aus der Datenbank ab
        with ProjectMapper() as mapper:
            data = mapper.find_all()
        if data is None:
            return []
        elif isinstance(data, list):  # Falls die Daten eine Liste sind
            return data
        else:
            return [data]

    def get_project_by_person_id(self, person_id: int) -> List[Project]:
        all_projects = self.get_projects()
        data = []
        for project in all_projects:
            if int(project.get_person_id()) == person_id:
                data.append(project)
        print(data)
        return data

    def change_project(self, project: Project) -> Project:
        with ProjectMapper() as mapper:
            return mapper.update(project)

    def delete_project(self, project: Project) -> Project:
        # Löscht ein Projekt und alle zugehörigen Komponenten aus der Datenbank
        project_phases = self.get_project_phases(project.get_id())
        for phase in project_phases:  # Für jede Phase im Projekt
            self.delete_phase_from_project(  # Phase löschen
                project.get_id(),
                phase.get_id()
            )
        # Karten des Projekts abrufen
        project_cards = self.get_cards_by_project_id(project.get_id())  # Karten des Projekts abrufen
        for card in project_cards:
            self.delete_card(card)

        project_persons = self.get_project_persons(project.get_id())  # Teammitglieder des Projekts abrufen
        for person in project_persons:  # Für jedes Teammitglied im Projekt
            self.delete_person_from_project(  # Teammitglied löschen
                project.get_id(),
                person.get_id()
            )
        # Lösche das Project selbst
        with ProjectMapper() as mapper:
            mapper.delete(project)  # Projekt löschen