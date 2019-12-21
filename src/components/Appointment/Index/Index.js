import "components/Appointment/Show/Show.scss";
import React from 'react'
import Header from "components/Appointment/Header/Header.js"
import Empty from "components/Appointment/Empty/Empty.js"
import Show from "components/Appointment/Show/Show.js"
import Status from "components/Appointment/Status/Status.js"
import Form from "components/Appointment/Form/Form.js"
import Confirm from "components/Appointment/Confirm/Confirm.js"
import Error from "components/Appointment/Error/Error.js"
import useVisualMode from "hooks/useVisualMode.js"




export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR = "ERROR";

  const { mode = EMPTY, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY

  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    props.bookInterview(props.id, interview).then(
      () => transition(SHOW))
      .catch(error => transition(ERROR))

  }

  function edit() {
    transition(EDIT)
  }

  function confirm() {
    transition(CONFIRM)


  }
  function cancel() {
    transition(SHOW)
  }

  function deleteAppt(name, interview) {
      transition(DELETING)
      props.cancelInterview(props.id, interview).then(
        () => transition(EMPTY))
        .catch(error => transition(ERROR))
      

  }

  return(
    <article className="appointment" data-testid="appointment"> 
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={()=> transition(CREATE)} />}
      {mode === SHOW && props.interview &&(
      <Show
      student={props.interview.student}
      interviewer={props.interview}
      onDelete={confirm}
      onEdit={edit}
      />)}
      {mode === EDIT && <Form
       interviewers = {props.interviewers}
       onAdd={()=> transition(CREATE)}
       onCancel={()=>transition(SHOW)}
       onSave={save}
       name={props.interview.student}
       interviewer={props.interview.interviewer.id}
       />}
      {mode === CREATE && <Form
       interviewers = {props.interviewers}
       onAdd={()=> transition(CREATE)}
       onCancel={()=>back()}
       onSave={save}
       />}
       {mode === SAVING && <Status message={SAVING}/>}
       {mode === DELETING && <Status message={DELETING}/>}
       {mode === CONFIRM && <Confirm cancel={cancel} delete={deleteAppt}/>}
       {mode === ERROR && <Error

       onClick={()=>back()}

       />}


    </article>
  );




}
