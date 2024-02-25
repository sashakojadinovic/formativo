import StudentStageBadge from './StudentStageBadge.jsx';
import { useContext } from 'react';
import { StageContext } from '../contexts/StageContext.js';


function ClassDep(props) {

  const { students, setStudents, setActiveStudent } = useContext(StageContext);


  let studentsList = [];

  if (students) {
    studentsList = students.map(item => {
      return (
        <StudentStageBadge first_name={item.first_name} last_name={item.last_name} answers_count={item.answers_count} key={item.id} onClick={() => setActiveStudent(item)} color='info' />
      )
    })
    return (
      <>
        <div className='p-2 grid grid-cols-2 gap-3 mt-4'>
          {studentsList}
        </div>
      </>)
  }
  else {
    return ('Loading...')
  }

}

export default ClassDep
