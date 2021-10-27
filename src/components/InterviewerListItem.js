import React, { useState }  from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  const { id, name, avatar, selected } = props;
  const [interviewer, setInterviewer] = useState(0);
  
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  const displayName = function() {
    if (selected) {
      return name;
    }
  }

  const displayedName = displayName();

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {displayedName}
    </li>
  );
  
}