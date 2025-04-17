import Card from "./bo/Card";
import Comment from "./bo/Comment";
import Person from "./bo/Person";
import Phase from "./bo/Phase";
import Project from "./bo/Project";
import ProjectPhase from "./bo/ProjectPhase";

export default class SwiftBoardAPI {
  static #api = null;
  #apiServerBaseURL = '/api';

  // Persons
  #getPersonsURL = () => `${this.#apiServerBaseURL}/persons`;
  #getPersonByIdURL = (id) => `${this.#apiServerBaseURL}/persons/${id}`;
  #getPersonProjectsURL = (person_id) => `${this.#apiServerBaseURL}/person-projects/${person_id}`;
  #addPersonURL = () => `${this.#apiServerBaseURL}/persons`;
  #deletePersonURL = (id) => `${this.#apiServerBaseURL}/persons/${id}`;
  #updatePersonURL = (id) => `${this.#apiServerBaseURL}/persons/${id}`;
  #getPersonByGoogleIdURL = (google_id) => `${this.#apiServerBaseURL}/persons-by-google-id/${google_id}`;

  // Cards
  #getCardsURL = () => `${this.#apiServerBaseURL}/cards`;
  #getCardByIdURL = (id) => `${this.#apiServerBaseURL}/cards/${id}`;
  #getCardByProjectURL = (project_id) => `${this.#apiServerBaseURL}/cards-by-project-id/${project_id}`;
  #getProjectCardsByPhaseURL = (project_id, phase_id) => `${this.#apiServerBaseURL}/cards-by-project-und-phase/${project_id}/${phase_id}`;
  #getProjectCardsByPersonURL = (project_id, person_id) => `${this.#apiServerBaseURL}/cards-by-project-und-person/${project_id}/${person_id}`;
  #addCardURL = () => `${this.#apiServerBaseURL}/cards`;
  #deleteCardURL = (id) => `${this.#apiServerBaseURL}/cards/${id}`;
  #updateCardURL = (id) => `${this.#apiServerBaseURL}/cards/${id}`;

  // Projects
  #getProjectsURL = () => `${this.#apiServerBaseURL}/projects`;
  #getProjectByIdURL = (id) => `${this.#apiServerBaseURL}/projects/${id}`;
  #getProjectsByPersonURL = (person_id) => `${this.#apiServerBaseURL}/projects-by-person/${person_id}`;
  #addProjectURL = () => `${this.#apiServerBaseURL}/projects`;
  #deleteProjectURL = (id) => `${this.#apiServerBaseURL}/projects/${id}`;
  #updateProjectURL = (id) => `${this.#apiServerBaseURL}/projects/${id}`;

  // Comments
  #getCommentsURL = () => `${this.#apiServerBaseURL}/comments`;
  #getCommentByIdURL = (id) => `${this.#apiServerBaseURL}/comments/${id}`;
  #getCommentdByCardURL = (card_id) => `${this.#apiServerBaseURL}/comments-by-card-id/${card_id}`;
  #addCommentURL = () => `${this.#apiServerBaseURL}/comments`;
  #deleteCommentURL = (id) => `${this.#apiServerBaseURL}/comments/${id}`;
  #updateCommentURL = (id) => `${this.#apiServerBaseURL}/comments/${id}`;

  // Phases
  #getPhasesURL = () => `${this.#apiServerBaseURL}/phases`;
  #getPhaseByIdURL = (id) => `${this.#apiServerBaseURL}/phases/${id}`;
  #getPhaseByNameURL = (name) => `${this.#apiServerBaseURL}/phase-by-name/${name}`;
  #addPhaseURL = () => `${this.#apiServerBaseURL}/phases`;
  #addPhaseToProjectURL = (project_id) => `${this.#apiServerBaseURL}/create-phase-to-Project/${project_id}`;
  #deletePhaseURL = (id) => `${this.#apiServerBaseURL}/phases/${id}`;
  #updatePhaseURL = (id) => `${this.#apiServerBaseURL}/phases/${id}`;

  // Project Phases
  #getPhasesInProjectURL = (project_id) => `${this.#apiServerBaseURL}/phases-in-project/${project_id}`;
  #getPhaseToAddURL = (project_id) => `${this.#apiServerBaseURL}/phases-to-add-to-project/${project_id}`;
  #addProjectPhasesURL = (project_id, phase_id) => `${this.#apiServerBaseURL}/project-phases/${project_id}/${phase_id}`;
  #deleteProjectPhasesURL = (project_id, phase_id) => `${this.#apiServerBaseURL}/project-phases/${project_id}/${phase_id}`;
  #updateProjectPhasesURL = (project_id, phase_id) => `${this.#apiServerBaseURL}/project-phases/${project_id}/${phase_id}`;
  #updateProjectPhaseFromToURL = (project_id, actual_pos, new_pos) => `${this.#apiServerBaseURL}/update-project-phase-from-to/${project_id}/${actual_pos}/${new_pos}`;

  // Project Persons
  #getPersonsInProjectURL = (project_id) => `${this.#apiServerBaseURL}/persons-in-project/${project_id}`;
  #getPersonToAddToProjectURL = (project_id) => `${this.#apiServerBaseURL}/persons-to-add-to-project/${project_id}`;
  #addProjectPersonsURL = (project_id, person_id) => `${this.#apiServerBaseURL}/project-persons/${project_id}/${person_id}`;
  #deleteProjectPersonsURL = (project_id, person_id) => `${this.#apiServerBaseURL}/project-persons/${project_id}/${person_id}`;
   // Auth
	#getAuth = () => `${this.#apiServerBaseURL}/auth`;

	static getAPI() {
    if (this.#api == null) {
      this.#api = new SwiftBoardAPI();
    }
    return this.#api;
  }

  #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    }
  )

  //////////////////////////
  ///// Persons Methoden ///
  //////////////////////////

  getPersons() {
    return this.#fetchAdvanced(this.#getPersonsURL()).then((responseJSON) => {
      let response = Person.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  getPersonById(personId) {
    return this.#fetchAdvanced(this.#getPersonByIdURL(personId)).then((responseJSON) => {
      let response = Person.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  addPerson(person) {
    return this.#fetchAdvanced(this.#addPersonURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(person)
    }).then((responseJSON) => {
      let response = Person.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  deletePerson(personId) {
    return this.#fetchAdvanced(this.#deletePersonURL(personId), {
      method: 'DELETE'
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  updatePerson(person) {
    return this.#fetchAdvanced(this.#updatePersonURL(person.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(person)
    }).then((responseJSON) => {
      let response = Person.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  getPersonByGoogleId(googleId) {
    return this.#fetchAdvanced(this.#getPersonByGoogleIdURL(googleId)).then((responseJSON) => {
      let response = Person.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  getPersonProjects(personId) {
    return this.#fetchAdvanced(this.#getPersonProjectsURL(personId)).then((responseJSON) => {
      let response = Project.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  //////////////////////////
  ///// Cards Methoden /////
  //////////////////////////

  getCards() {
    return this.#fetchAdvanced(this.#getCardsURL()).then((responseJSON) => {
      let response = Card.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  getProjectCards(projectId) {
    return this.#fetchAdvanced(this.#getCardByProjectURL(projectId)).then((responseJSON) => {
      let response = Card.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  getProjectCardsByPhase(projectId, phaseId) {
    return this.#fetchAdvanced(this.#getProjectCardsByPhaseURL(projectId, phaseId)).then((responseJSON) => {
      let response = Card.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  getCardById(cardId) {
    return this.#fetchAdvanced(this.#getCardByIdURL(cardId)).then((responseJSON) => {
      let response = Card.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  getProjectCardsByPerson(projectId, personId) {
    return this.#fetchAdvanced(this.#getProjectCardsByPersonURL(projectId, personId)).then((responseJSON) => {
      let response = Card.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  addCard(card) {
    return this.#fetchAdvanced(this.#addCardURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(card)
    }).then((responseJSON) => {
      let response = Card.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  deleteCard(cardId) {
    return this.#fetchAdvanced(this.#deleteCardURL(cardId), {
      method: 'DELETE'
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  updateCard(card) {
    return this.#fetchAdvanced(this.#updateCardURL(card.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(card)
    }).then((responseJSON) => {
      let response = Card.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  /////////////////////////////
  ///// Projects Methoden /////
  /////////////////////////////

  getProjects() {
    return this.#fetchAdvanced(this.#getProjectsURL()).then((responseJSON) => {
      let response = Project.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  getProjectsByPerson(personId) {
    return this.#fetchAdvanced(this.#getProjectsByPersonURL(personId)).then((responseJSON) => {
      let response = Project.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }


  getProjectById(projectId) {
    return this.#fetchAdvanced(this.#getProjectByIdURL(projectId)).then((responseJSON) => {
      let response = Project.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  addProject(project) {
    return this.#fetchAdvanced(this.#addProjectURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project)
    }).then((responseJSON) => {
      let response = Project.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  deleteProject(projectId) {
    return this.#fetchAdvanced(this.#deleteProjectURL(projectId), {
      method: 'DELETE'
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  updateProject(project) {
    return this.#fetchAdvanced(this.#updateProjectURL(project.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(project)
    }).then((responseJSON) => {
      let response = Project.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

   /////////////////////////////
  ///// Comments Methoden /////
  /////////////////////////////

  getComments() {
    return this.#fetchAdvanced(this.#getCommentsURL()).then((responseJSON) => {
      let response = Comment.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  getCommentById(commentId) {
    return this.#fetchAdvanced(this.#getCommentByIdURL(commentId)).then((responseJSON) => {
      let response = Comment.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  addComment(comment) {
    return this.#fetchAdvanced(this.#addCommentURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(comment)
    }).then((responseJSON) => {
      let response = Comment.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  deleteComment(commentId) {
    return this.#fetchAdvanced(this.#deleteCommentURL(commentId), {
      method: 'DELETE'
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  updateComment(comment) {
    return this.#fetchAdvanced(this.#updateCommentURL(comment.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(comment)
    }).then((responseJSON) => {
      let response = Comment.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  getCommentByCardId(cardId) {
    return this.#fetchAdvanced(this.#getCommentdByCardURL(cardId)).then((responseJSON) => {
      let response = Comment.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

 ///////////////////////////
  ///// Phases Methoden /////
  ///////////////////////////

  getPhases() {
    return this.#fetchAdvanced(this.#getPhasesURL()).then((responseJSON) => {
      let response = Phase.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  getPhaseById(phaseId) {
    return this.#fetchAdvanced(this.#getPhaseByIdURL(phaseId)).then((responseJSON) => {
      let response = Phase.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  getPhaseByName(name) {
    return this.#fetchAdvanced(this.#getPhaseByNameURL(name)).then((responseJSON) => {
      let response = Phase.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  addPhase(phase) {
    return this.#fetchAdvanced(this.#addPhaseURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(phase)
    }).then((responseJSON) => {
      let response = Phase.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  addPhaseToProject(projectId, phase) {
    return this.#fetchAdvanced(this.#addPhaseToProjectURL(projectId), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(phase)
    }).then((responseJSON) => {
      let response = Phase.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  deletePhase(phaseId) {
    return this.#fetchAdvanced(this.#deletePhaseURL(phaseId), {
      method: 'DELETE'
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  updatePhase(phase) {
    return this.#fetchAdvanced(this.#updatePhaseURL(phase.getId()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(phase)
    }).then((responseJSON) => {
      let response = Phase.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(response);
      })
    })
  }

  ///////////////////////////////////
  ///// ProjectPersons Methoden /////
  ///////////////////////////////////

  getProjectPersons(project_id) {
    return this.#fetchAdvanced(this.#getPersonsInProjectURL(project_id)).then((responseJSON) => {
      let response = Person.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  getPersonsToAddToPoject(projectId) {
    return this.#fetchAdvanced(this.#getPersonToAddToProjectURL(projectId)).then((responseJSON) => {
      let response = Person.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  addProjectPerson(projectId, personId) {
    return this.#fetchAdvanced(this.#addProjectPersonsURL(projectId, personId), {
      method: 'POST'
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  deleteProjectPerson(projectId, personId) {
    return this.#fetchAdvanced(this.#deleteProjectPersonsURL(projectId, personId), {
      method: 'DELETE'
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  //////////////////////////////////
  ///// ProjectPhases Methoden /////
  //////////////////////////////////

  getProjectPhases(projectId) {
    return this.#fetchAdvanced(this.#getPhasesInProjectURL(projectId)).then((responseJSON) => {
      let response = Phase.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  getPhasesToAddToPoject(projectId) {
    return this.#fetchAdvanced(this.#getPhaseToAddURL(projectId)).then((responseJSON) => {
      let response = Phase.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(response)
      })
    })
  }

  addProjectPhase(projectId, phaseId) {
    return this.#fetchAdvanced(this.#addProjectPhasesURL(projectId, phaseId), {
      method: 'POST'
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  updateProjectPhase(projectId, phaseId, rank) {
    const pp = ProjectPhase(projectId, phaseId, rank);
    return this.#fetchAdvanced(this.#updateProjectPhasesURL(projectId, phaseId), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(pp)
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  updateProjectPhaseFromTo(phase, projectId, actuaPos, newPos) {
    return this.#fetchAdvanced(this.#updateProjectPhaseFromToURL(projectId, actuaPos, newPos), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(phase)
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }

  deleteProjectPhase(projectId, phaseId) {
    return this.#fetchAdvanced(this.#deleteProjectPhasesURL(projectId, phaseId), {
      method: 'DELETE'
    }).then((responseJSON) => {
      return new Promise(function (resolve) {
        resolve(responseJSON);
      })
    })
  }
}