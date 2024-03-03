import StudentStageBadge from './StudentStageBadge.jsx';
import { useContext } from 'react';
import { StageContext } from '../contexts/StageContext.js';


function ClassDep(props) {

  const { students, activeOutcome, setStudents, setActiveStudent } = useContext(StageContext);


  let studentsList = [];
  let outcomeStatusColor = '';
  if (students) {
    studentsList = students.map(student => {
      let foundMatchingOutcome = false;
        student.answers.forEach(answer => {
        //if (answer.question.outcomes[0].id === activeOutcome.id && !foundMatchingOutcome) {
          if (answer.question.outcomes.some(outcome => outcome.id===activeOutcome.id) && !foundMatchingOutcome) {
          switch (answer.assessment_id) {
            case 3:
              outcomeStatusColor = '#68b586';
              break;
            case 2:
              outcomeStatusColor = '#ffcc29';
              break;
            case 1:
              outcomeStatusColor = '#ff8f4d';
              break;
            default:
              outcomeStatusColor = "#4b5052";
              break;
          }
  
          foundMatchingOutcome = true; // Postavi flag na true da prekineš petlju
        }
      });
      
      
  
      if (!foundMatchingOutcome) {
        outcomeStatusColor = "#ffffff";
      }
  
      return (
        <StudentStageBadge status={outcomeStatusColor} first_name={student.first_name} last_name={student.last_name} answers_count={student.answers_count} key={student.id} onClick={() => setActiveStudent(student)} color='info' />
      );
    });
  
    return (
      <>
        <div className='p-2 grid grid-cols-2 gap-3 mt-4'>
          {studentsList}
        </div>
      </>
    );
  }
  
  else {
    return ('Loading...')
  }

}

export default ClassDep
