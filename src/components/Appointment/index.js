import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import "./styles.scss"
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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
      .then(() => transition(SHOW, true))
  }

  function deleteAppointment() {
    transition(EMPTY, true);
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY, true))
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
    </article>
  );
}