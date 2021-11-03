import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";
import "./styles.scss"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { time, interview, interviewers } = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW, true)) // does this need the true?
      .catch((error) => transition(ERROR_SAVE, true))
  }

  function deleteAppointment() {
    transition(EMPTY, true); 
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY, true)) // does this need the true?
      .catch(() => transition(ERROR_DELETE, true))
  }

  return (
    <article className="appointment">
      <Header 
        time={time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EDIT && (
        <Form 
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
          interviewer = {interview.interviewer.id}
          student={interview.student}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (  
        <Status 
          message={"Saving"}
        />
      )}
      {mode === DELETING && (
        <Status 
          message={"Deleting"}
        />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message={"Are you sure you want to delete?"}
          onConfirm={() => deleteAppointment()}
          onCancel={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          message="There was an error saving, please try again."
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
          message="There was an error deleting, please try again."
          onClose={() => back()}
        />
      )}
    </article>
  );
}