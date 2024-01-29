import { Button, Box, AppBar, Toolbar, Typography } from '@mui/material'
import StudentStageBadge from './StudentStageBadge.jsx';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from './apiUrls';


function ClassDep(props) {
  const { id } = useParams()
  const getID = id?id:props.id;

  let [students, setStudents] = useState(null)
  let [classDep, setClassDep] = useState(null)
  let studentsList = []
  useEffect(() => {
    //const url = "http://192.168.0.101:8000/api/class_dep/" + getID
    const url = API_BASE_URL+"/api/class_dep/" + getID;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setClassDep(data.class_name)
        setStudents(data.students)

      })
  }, [])
  if (students) {
    studentsList = students.map(item => {
      return (
        <StudentStageBadge first_name={item.first_name} last_name={item.last_name} key={item.id} onClick={()=>{props.setStudent(item)}} color='success' />
      )
    })
    return (
      <>
        <div className='p-2 grid grid-cols-2 gap-3 mt-8'>
          {studentsList}
        </div>
      </>)
  }
  else {
    return ('Loading...')
  }

}

export default ClassDep
