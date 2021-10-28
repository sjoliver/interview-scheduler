import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const { interviewers, onSave, onCancel } = props;
  // use props.student because useState getter is called student as well (same for props.interviewer)
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function() {
    setStudent("")
    setInterviewer(null)
    return;
  }

  const cancel = function() {
    reset()
    onCancel()
    return;
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            onSubmit={event => event.preventDefault()}
          />
        </form>
        <InterviewerList 
          onChange={setInterviewer}
          value={interviewer}
          interviewers={interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}