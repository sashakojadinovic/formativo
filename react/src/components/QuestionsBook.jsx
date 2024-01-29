import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from './apiUrls';

const QuestionsBook = (props) => {
  const [themeTitle, setThemeTitle] = useState('');
  const [themeUnits, setThemeUnits] = useState(null);
  useEffect(() => {
    //const dataURL = "http://192.168.0.101:8000/api/theme/" + props.themeId;
    const dataURL = API_BASE_URL + "/api/theme/" + props.themeId;
    fetch(dataURL)
      .then(res => res.json())
      .then(data => {
        //setBookData(data);
        setThemeTitle(data.title);
        setThemeUnits(data.units);
        console.log(data);
      })
  }, [props.themeId])
  const renderTree = (units) => (
    units.map((unit, index) =>
    (<TreeItem disabled={unit.outcomes.length < 1} sx={{ padding: '10px 20px' }} icon={<AccountTreeIcon  sx={{color:'white'}}  />} key={index} nodeId={unit.id.toString()} label={index + 1 + ". " + unit.title} >
      {unit.outcomes.length > 0
        ? unit.outcomes.map((outcome, index) =>
          <TreeItem icon={<LiveHelpIcon color='primary'  />} sx={{ marginBottom: '5px', marginTop: '5px' }} onClick={() => { props.setOutcome(outcome); }} key={index} nodeId={unit.id + "." + outcome.id.toString()} label={outcome.description}></TreeItem>)
        : ""
      }
    </TreeItem>)
    )
  );
  if (themeUnits) {
    return (
      <TreeView aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ paddingTop: '30px' }}
      >
        {renderTree(themeUnits)}
      </TreeView>


    )
  }
}

export default QuestionsBook;