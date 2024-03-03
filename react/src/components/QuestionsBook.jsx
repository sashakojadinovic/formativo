import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GradeIcon from '@mui/icons-material/Grade';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Card, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from './apiUrls';
import { StageContext } from '../contexts/StageContext';


const QuestionsBook = (props) => {
  const [themeTitle, setThemeTitle] = useState('');
  const [themeUnits, setThemeUnits] = useState(null);
  const { activeThemeId, activeStudent, setActiveOutcome } = useContext(StageContext);

  const getStarColor = (outcome) => {
    if (activeStudent && activeStudent.answers) {
      const matchingAnswer = activeStudent.answers.find(answer => answer.question.outcomes[0].pivot.outcome_id === outcome.id);

      if (matchingAnswer) {
        switch (matchingAnswer.assessment_id) {
          case 3:
            //return '#68b586';
            return '#d9ece0';
          case 2:
            //return '#ffcc29';
            return '#fef2c9';
          case 1:
            //return '#ff8f4d';
            return '#fee3d2';
          default:
            //return '#4b5052';
            return '#ffffff';
        }
      }
    }

    return '#ffffff';
  }

  useEffect(() => {
    const dataURL = API_BASE_URL + "/api/theme/" + activeThemeId;
    fetch(dataURL)
      .then(res => res.json())
      .then(data => {
        //setBookData(data);
        setThemeTitle(data.title);
        setThemeUnits(data.units);
      })
  }, [activeThemeId]);
  const renderTree = (units) => (
    units.map((unit, index) =>
    (<TreeItem disabled={unit.outcomes.length < 1} sx={{ padding: '5px 20px' }} collapseIcon={<ArrowDownwardIcon sx={{ color: '#4b5052' }} />} expandIcon={<ArrowOutwardIcon />} key={index} nodeId={unit.id.toString()} label={index + 1 + ". " + unit.title} >
      <Typography sx={{ fontStyle: 'italic', fontSize: '14px', color: '#767e81' }}>Ученик/ученица ће бити у стању да:</Typography>
      {unit.outcomes.length > 0
        ? unit.outcomes.map((outcome, index) =>
          <TreeItem icon={<GradeIcon />} sx={{ backgroundColor: getStarColor(outcome), marginBottom: '5px', marginTop: '5px', fontSize: '12px' }} onClick={() => { setActiveOutcome(outcome); }} key={index} nodeId={unit.id + "." + outcome.id.toString()} label={outcome.description}></TreeItem>)
        : ""
      }
    </TreeItem>)
    )
  );
  if (themeUnits) {
    return (
      <Card className='ms-5 mt-5'> <TreeView aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ paddingTop: '30px' }}
      >
        {renderTree(themeUnits)}
      </TreeView></Card>



    )
  }
}

export default QuestionsBook;