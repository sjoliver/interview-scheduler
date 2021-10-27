import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { day, setDay, days } = props;

  const daysList = days.map(element => {
    return (
      <DayListItem 
        key = {element.id}
        name = {element.name}
        spots = {element.spots}
        selected = {element.name === day}
        setDay = {setDay}
      />
    )
  })

  return (
    <ul>{daysList}</ul>
  )
}