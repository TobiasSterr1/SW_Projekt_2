from flask import Flask, request, redirect, url_for
from flask_restx import Api, Resource, fields
from flask_cors import CORS

from server.administration import Administration

from server.bo.card import Card
from server.bo.comment import Comment
from server.bo.person import Person
from server.bo.phase import Phase
from server.bo.project import Project
from server.bo.project_phase import ProjectPhase

from security_decorator import secured

app = Flask(__name__, static_folder="./build", static_url_path='/')
app.config['ERROR_404_HELP'] = False
@app.route('/')
def index():
    return app.send_static_file('index.html')

api = Api(app, version='1.0', title='SwiftBoard API',
          description='Dokumentation für the SwiftBoard API')

CORS(app, resources=r"/api/*")
app.config['ERROR_404_HELP'] = False

@app.errorhandler(404)
def handle_404(e):
    if request.path.startswith('/api'):
        return "Fehler", 404
    else:
        return redirect(url_for('index'))

swiftboard = api.namespace("api", description="The Api reference for the SwiftBoard App.")

bo = api.model(
    "BusinessObject",
    {
        "id": fields.Integer(
            attribute="_id",
            description="Der Unique Identifier eines BusinessObject"
        ),
        "created_at": fields.DateTime(
            attribute="_created_at",
            description="Das Erstellungsdatum eines bo",
            dt_format="iso8601"
        ),
        "last_update_at": fields.DateTime(
            attribute="_last_update_at",
            description="Das Datum des letzten Updates eines bo",
            dt_format="iso8601"
        )
    }
)

card = api.inherit(
    "Card",
    bo,
    {
        "title": fields.String(
            attribute="_title",
            description="Title des Card"
        ),
        "description": fields.String(
            attribute="_description",
            description="Description des Card"
        ),
        "points": fields.Integer(
            attribute="_points",
            description="Anzahl an Storypoints des Card"
        ),
        "person_id": fields.Integer(
            attribute="_person_id",
            description="Unique Id des Persons der Person, die Card bearbeitet wird"
        ),
        "project_id": fields.Integer(
            attribute="_project_id",
            description="Unique Id des Projects zu dem, die Card gehört"
        ),
        "phase_id": fields.Integer(
            attribute="_phase_id",
            description="Unique Id der phase des Projects"
        ),
        "starts_at": fields.String(
            attribute="_starts_at",
            description="Das Start Datum des Card",
            dt_format="iso8601"
        ),
        "ends_at": fields.String(
            attribute="_ends_at",
            description="Das Enddatum der Karte",
            dt_format="iso8601"
        )
    }
)

person = api.inherit(
    "Person",
    bo,
    {
        "username": fields.String(
            attribute="_username",
            description="Username der Person"
        ),
        "firstname": fields.String(
            attribute="_firstname",
            description="Firstname der Person"
        ),
        "lastname": fields.String(
            attribute="_lastname",
            description="Lastname der Person"
        ),
        "email": fields.String(
            attribute="_email",
            description="Email derPerson"
        ),
        "google_id": fields.String(
            attribute="_google_id",
            description="Unique Google Id der Person"
        ),
        "avatar": fields.String(
            attribute="_avatar",
            description="Avatar der Person"
        )
    }
)

project = api.inherit(
    "Project",
    bo,
    {
        "title": fields.String(
            attribute="_title",
            description="Title des Projekt"
        ),
        "description": fields.String(
            attribute="_description",
            description="Description der Projekt"
        ),
        "person_id": fields.Integer(
            attribute="_person_id",
            description="Unique Id der Person, der das der Projekt erstellt hat."
        ),
        "starts_at": fields.String(
            attribute="_starts_at",
            description="Das Startd Datum des Project",
            dt_format="iso8601"
        ),
        "ends_at": fields.String(
            attribute="_ends_at",
            description="Das End datum des Projekt",
            dt_format="iso8601"
        )
    }
)

phase = api.inherit(
    "Phase",
    bo,
    {
        "name": fields.String(
            attribute="_name",
            description="Name der Phase"
        ),
        "Description": fields.String(
            attribute="_Description",
            description="Description der Phase"
        )
    }
)

project_phase = api.model(
    "ProjectPhase",
    {
        "project_id": fields.String(
            attribute="_project_id",
            description="The Project Id"
        ),
        "phase_id": fields.String(
            attribute="_phase_id",
            description="The Phase Id"
        ),
        "rank": fields.String(
            attribute="_rank",
            description="The rank"
        )
    }
)

comment = api.inherit(
    "Comment",
    bo,
    {
        "text": fields.String(
            attribute="_text",
            description="text des Comment"
        ),
        "person_id": fields.Integer(
            attribute="_person_id",
            description="Unique Id des Persons der Person, das Comment erstellt hat"
        ),
        "card_id": fields.Integer(
            attribute="_card_id",
            description="Unique Id des Projects zu dem, die Comment gehört"
        )
    }
)


        ############################
        ##### Person.Methoden #####
        ############################


@swiftboard.route('/persons')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class PersonListOperations(Resource):
    @swiftboard.marshal_list_with(person)
    @secured
    def get(self):
        adm = Administration()
        persons = adm.get_persons()
        return persons

    @swiftboard.marshal_with(person, code=200)
    @swiftboard.expect(person)
    @secured
    def post(self):
        adm = Administration()
        person = Person.from_dict(api.payload)
        if person is not None:
            s = adm.create_person(person)
            return s, 200
        else:
            return '', 500


@swiftboard.route('/persons/<int:id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class PersonOperations(Resource):
    @swiftboard.marshal_with(person)
    @secured
    def get(self, id: int):
        adm = Administration()
        single_person = adm.get_person_by_id(id)
        return single_person

    @swiftboard.marshal_with(person)
    @swiftboard.expect(person, validate=True)
    @secured
    def put(self, id: int):
        adm = Administration()
        person = Person.from_dict(api.payload)
        if person is not None:
            person.set_id(id)
            data = adm.change_person(person)
            return data, 200
        else:
            return '', 500

    @secured
    def delete(self, id: int):
        adm = Administration()
        single_person = adm.get_person_by_id(id)
        adm.delete_person(single_person)
        return '', 200


@swiftboard.route('/persons-by-google-id/<string:google_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class PersonGoogleOperations(Resource):
    @swiftboard.marshal_with(person)
    @secured
    def get(self, google_id: str):
        adm = Administration()
        person = adm.get_person_by_google_id(google_id)
        return person


@swiftboard.route('/person-projects/<int:person_id>/')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class PersonProjectListGoogleOperations(Resource):
    @swiftboard.marshal_list_with(project)
    @secured
    def get(self, person_id: int):
        adm = Administration()
        projects = adm.get_person_projects(person_id)
        return projects


        ##########################
        ##### Card-Methoden #####
        ##########################


@swiftboard.route('/cards')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class CardListOperations(Resource):
    @swiftboard.marshal_list_with(card)
    @secured
    def get(self):
        adm = Administration()
        cards = adm.get_cards()
        return cards

    @swiftboard.marshal_with(card, code=200)
    @swiftboard.expect(card)
    @secured
    def post(self):
        adm = Administration()
        card = Card.from_dict(api.payload)
        if card is not None:
            s = adm.create_card(card)
            return s, 200
        else:
            return '', 500


@swiftboard.route('/cards/<int:id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class CardOperations(Resource):
    @swiftboard.marshal_with(card)
    @secured
    def get(self, id: int):
        adm = Administration()
        single_card = adm.get_card_by_id(id)
        return single_card

    @swiftboard.marshal_with(card)
    @swiftboard.expect(card, validate=True)
    @secured
    def put(self, id: int):
        adm = Administration()
        card = Card.from_dict(api.payload)
        if card is not None:
            card.set_id(id)
            data = adm.change_card(card)
            return data, 200
        else:
            return '', 500

    @secured
    def delete(self, id: int):
        adm = Administration()
        single_card = adm.get_card_by_id(id)
        adm.delete_card(single_card)
        return '', 200


@swiftboard.route('/cards-by-project-id/<int:project_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class CardByProjectOperations(Resource):
    @swiftboard.marshal_list_with(card)
    @secured
    def get(self, project_id: int):
        adm = Administration()
        data = adm.get_cards_by_project_id(project_id)
        return data


@swiftboard.route('/cards-by-project-und-phase/<int:project_id>/<int:phase_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class CardByProjectAndPhaseOperations(Resource):
    @swiftboard.marshal_list_with(card)
    @secured
    def get(self, project_id: int, phase_id: int):
        adm = Administration()
        data = adm.get_card_by_project_and_phase(project_id, phase_id)
        return data


@swiftboard.route('/cards-by-project-und-person/<int:project_id>/<int:person_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class CardByProjectAndPersonOperations(Resource):
    @swiftboard.marshal_list_with(card)
    @secured
    def get(self, project_id: int, person_id: int):
        adm = Administration()
        data = adm.get_card_by_project_and_person(project_id, person_id)
        return data


        ###############################
        ##### Kommenatar-Methoden #####
        ###############################


@swiftboard.route('/comments')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class CommentListOperations(Resource):
    @swiftboard.marshal_list_with(comment)
    @secured
    def get(self):
        adm = Administration()
        comments = adm.get_comments()
        return comments

    @swiftboard.marshal_with(comment, code=200)
    @swiftboard.expect(comment)
    @secured
    def post(self):
        adm = Administration()
        comment = Comment.from_dict(api.payload)
        if comment is not None:
            s = adm.create_comment(comment)
            return s, 200
        else:
            return '', 500


@swiftboard.route('/comments/<int:id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class CommentOperations(Resource):
    @swiftboard.marshal_with(comment)
    @secured
    def get(self, id: int):
        adm = Administration()
        single_comment = adm.get_comment_by_id(id)
        return single_comment

    @swiftboard.marshal_with(comment)
    @swiftboard.expect(comment, validate=True)
    @secured
    def put(self, id: int):
        adm = Administration()
        comment = Comment.from_dict(api.payload)
        if comment is not None:
            comment.set_id(id)
            data = adm.change_comment(comment)
            return data, 200
        else:
            return '', 500

    @secured
    def delete(self, id: int):
        adm = Administration()
        single_comment = adm.get_comment_by_id(id)
        adm.delete_comment(single_comment)
        return '', 200


@swiftboard.route('/comments-by-card-id/<int:card_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class CommentByCardOperations(Resource):
    @swiftboard.marshal_list_with(comment)
    @secured
    def get(self, card_id: int):
        adm = Administration()
        data = adm.get_comments_by_card_id(card_id)
        return data


        ###########################
        ##### Phase-Methoden #####
        ###########################


@swiftboard.route('/phases')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class PhaseListOperations(Resource):
    @swiftboard.marshal_list_with(phase)
    @secured
    def get(self):
        adm = Administration()
        phases = adm.get_phases()
        return phases

    @swiftboard.marshal_with(phase, code=200)
    @swiftboard.expect(phase)
    @secured
    def post(self):
        adm = Administration()
        phase = Phase.from_dict(api.payload)
        if phase is not None:
            s = adm.create_phase(phase)
            return s, 200
        else:
            return '', 500


@swiftboard.route('/phases/<int:id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class PhaseOperations(Resource):
    @swiftboard.marshal_with(phase)
    @secured
    def get(self, id: int):
        adm = Administration()
        single_phase = adm.get_phase_by_id(id)
        return single_phase

    @swiftboard.marshal_with(phase)
    @swiftboard.expect(phase, validate=True)
    @secured
    def put(self, id: int):
        adm = Administration()
        phase = Phase.from_dict(api.payload)
        if phase is not None:
            phase.set_id(id)
            data = adm.change_phase(phase)
            return data, 200
        else:
            return '', 500

    @secured
    def delete(self, id: int):
        adm = Administration()
        single_phase = adm.get_phase_by_id(id)
        adm.delete_phase(single_phase)
        return '', 200


@swiftboard.route('/phase-by-name/<string:name>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class PhaseByNameOperations(Resource):
    @swiftboard.marshal_with(phase)
    @secured
    def get(self, name: str):
        adm = Administration()
        phase = adm.get_phase_by_name(name)
        return phase


        ##################################
        ##### ProjectPhase-Methoden ######
        ##################################


@swiftboard.route('/project-phases/<int:project_id>/<int:phase_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class ProjectPhaseOperations(Resource):
    @swiftboard.marshal_with(phase)
    @secured
    def post(self, project_id: int, phase_id: int):
        adm = Administration()
        phase = adm.add_phase_to_project(project_id, phase_id)
        return phase

    @swiftboard.marshal_with(phase)
    @swiftboard.expect(project_phase, validate=True)
    @secured
    def put(self, project_id: int, phase_id: int):
        adm = Administration()
        pp = ProjectPhase.from_dict(api.payload)
        if pp:
            phase = adm.update_phase_rank_in_project(
                project_id,
                phase_id,
                pp.get_rank()
            )
            return phase
        else:
            return '', 500

    @swiftboard.marshal_with(phase)
    @secured
    def delete(self, project_id: int, phase_id: int):
        adm = Administration()
        phase = adm.delete_phase_from_project(project_id, phase_id)
        return phase


@swiftboard.route('/create-phase-to-Project/<int:project_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class AddProjectPhaseOperations(Resource):
    @swiftboard.marshal_with(phase)
    @swiftboard.expect(phase, validate=True)
    @secured
    def post(self, project_id: int):
        adm = Administration()
        phase = Phase.from_dict(api.payload)
        if phase is not None:
            db_phase = adm.create_phase_to_project(project_id, phase)
            return db_phase


@swiftboard.route('/update-project-phase-from-to/<int:project_id>/<int:actual_pos>/<int:new_pos>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class UpdateProjectPhaseFromToOperations(Resource):
    @swiftboard.marshal_with(phase)
    @swiftboard.expect(phase)
    @secured
    def put(self, project_id: int, actual_pos: int, new_pos: int):
        adm = Administration()
        phase = Phase.from_dict(api.payload)
        print("endpoint phae", phase)
        if phase is not None:
            db_phase = adm.update_project_project_phase_from_to(project_id, phase, actual_pos, new_pos)
            return db_phase


@swiftboard.route('/phases-in-project/<int:project_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class PhasesInProjectListOperations(Resource):
    @swiftboard.marshal_list_with(phase)
    @secured
    def get(self, project_id: int):
        adm = Administration()
        phases = adm.get_project_phases(project_id)
        return phases


@swiftboard.route('/phases-to-add-to-project/<int:project_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class PhaseToAddToProjectListOperations(Resource):
    @swiftboard.marshal_list_with(phase)
    @secured
    def get(self, project_id: int):
        adm = Administration()
        phases = adm.get_phases_to_add_to_project(project_id)
        return phases


        #############################
        ##### Project-Methoden #####
        #############################


@swiftboard.route('/projects')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class ProjectListOperations(Resource):
    @swiftboard.marshal_list_with(project)
    @secured
    def get(self):
        adm = Administration()
        projects = adm.get_projects()
        return projects

    @swiftboard.marshal_with(project, code=200)
    @swiftboard.expect(project)
    @secured
    def post(self):
        adm = Administration()
        project = Project.from_dict(api.payload)
        if project is not None:
            s = adm.create_project(project)
            return s, 200
        else:
            return '', 500


@swiftboard.route('/projects/<int:id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class ProjectOperations(Resource):
    @swiftboard.marshal_with(project)
    @secured
    def get(self, id: int):
        adm = Administration()
        single_project = adm.get_project_by_id(id)
        return single_project

    @swiftboard.marshal_with(project)
    @swiftboard.expect(project, validate=True)
    @secured
    def put(self, id: int):
        adm = Administration()
        project = Project.from_dict(api.payload)
        if project is not None:
            project.set_id(id)
            data = adm.change_project(project)
            return data, 200
        else:
            return '', 500

    @secured
    def delete(self, id: int):
        adm = Administration()
        single_project = adm.get_project_by_id(id)
        adm.delete_project(single_project)
        return '', 200


        ###################################
        ##### ProjectPerson-Methoden #####
        ###################################


@swiftboard.route('/project-persons/<int:project_id>/<int:person_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class ProjectPersonOperations(Resource):
    @swiftboard.marshal_with(person)
    @secured
    def post(self, project_id: int, person_id: int):
        adm = Administration()
        person = adm.add_person_to_project(project_id, person_id)
        return person

    @swiftboard.marshal_with(person)
    @secured
    def delete(self, project_id: int, person_id: int):
        adm = Administration()
        person = adm.delete_person_from_project(project_id, person_id)
        return person


@swiftboard.route('/persons-in-project/<int:project_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class PersonSInProjectListOperations(Resource):
    @swiftboard.marshal_list_with(person)
    @secured
    def get(self, project_id: int):
        adm = Administration()
        persons = adm.get_project_persons(project_id)
        return persons


@swiftboard.route('/persons-to-add-to-project/<int:project_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class PersonToAddToProjectListOperations(Resource):
    @swiftboard.marshal_list_with(person)
    @secured
    def get(self, project_id: int):
        adm = Administration()
        persons = adm.get_persons_to_add_to_project(project_id)
        return persons


@swiftboard.route('/projects-by-person/<int:person_id>')
@swiftboard.response(500, 'Wenn ein Server-seitiger Fehler aufkommt')
class ProjectsByPersonListOperations(Resource):
    @swiftboard.marshal_list_with(project)
    @secured
    def get(self, person_id: int):
        adm = Administration()
        persons = adm.get_person_projects(person_id)
        return persons


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")