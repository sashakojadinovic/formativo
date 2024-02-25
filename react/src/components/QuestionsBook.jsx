import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GradeIcon from '@mui/icons-material/Grade';
import FlagIcon from '@mui/icons-material/Flag';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Card } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from './apiUrls';
import { StageContext } from '../contexts/StageContext';


const QuestionsBook = (props) => {
  const [themeTitle, setThemeTitle] = useState('');
  const [themeUnits, setThemeUnits] = useState(null);

  const {activeThemeId, setActiveOutcome} = useContext(StageContext);
  useEffect(() => {
    const dataURL = API_BASE_URL + "/api/theme/" + activeThemeId;
    fetch(dataURL)
      .then(res => res.json())
      .then(data => {
        //setBookData(data);
        setThemeTitle(data.title);
        setThemeUnits(data.units);
        console.log(data);
      })
  }, [activeThemeId])
  const renderTree = (units) => (
    units.map((unit, index) =>
    (<TreeItem disabled={unit.outcomes.length < 1} sx={{ padding: '5px 20px' }} icon={<AccountTreeIcon  sx={{color:'#37474f'}}  />} key={index} nodeId={unit.id.toString()} label={index + 1 + ". " + unit.title} >
      {unit.outcomes.length > 0
        ? unit.outcomes.map((outcome, index) =>
          <TreeItem  icon={<GradeIcon sx={{color:'#37474f'}}  />} sx={{ marginBottom: '5px', marginTop: '5px', fontSize:'12px' }} onClick={() => { setActiveOutcome(outcome); }} key={index} nodeId={unit.id + "." + outcome.id.toString()} label={outcome.description}></TreeItem>)
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