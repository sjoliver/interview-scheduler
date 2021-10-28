import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;

  const interviewerList = interviewers.map((element) => {
    return (
      <InterviewerListItem
        key = {element.id}
        name = {element.name}
        avatar = {element.avatar}
        selected = {element.id === value}
        setInterviewer = {(event) => onChange(element.id)}
      />
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );

}