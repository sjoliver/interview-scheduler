import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, value, onChange } = props;
    
  const daysList = days.map(day => {
    return (
      <DayListItem 
        key = {day.id}
        name = {day.name}
        spots = {day.spots}
        selected = {day.name === value}
        setDay = {(event) => onChange(day.name)}
      />
    )
  })

  return (
    <ul>{daysList}</ul>
  )
}