import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;
    
  const daysList = days.map(element => {
    return (
      <DayListItem 
        key = {element.id}
        name = {element.name}
        spots = {element.spots}
        selected = {element.name === value}
        setDay = {(event) => onChange(element.name)}
      />
    )
  })

  return (
    <ul>{daysList}</ul>
  )
}