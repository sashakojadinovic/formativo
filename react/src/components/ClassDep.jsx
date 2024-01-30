import StudentStageBadge from './StudentStageBadge.jsx';
import { useContext } from 'react'
import { StudentsContext } from '../contexts/StudentsContext.js';


function ClassDep(props) {

const {students, setStudents} = useContext(StudentsContext);

let studentsList = [];
  
  if (students) {
    studentsList = students.map(item => {
      return (
        <StudentStageBadge first_name={item.first_name} last_name={item.last_name} key={item.id} onClick={()=>console.log(item.first_name)} color='success' />
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
