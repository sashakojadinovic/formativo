import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import QuestionsBook from './QuestionsBook';
import MainStage from './MainStage';
import ClassDep from './ClassDep';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { API_BASE_URL } from './apiUrls';
import { StageContext } from '../contexts/StageContext';
//import {StudentsContext} from '../contexts/StudentsContext';

function Stage() {
  const [subjects, setSubjects] = useState([]);
  const [activeSubject, setActiveSubject] = useState("");
  const [activeOutcome, setActiveOutcome] = useState(null);
  const [activeStudent, setActiveStudent] = useState(null);
  const [themes, setThemes] = useState(0);
  const [activeThemeId, setActiveThemeId] = useState(null);
  const [students, setStudents] = useState([]);

  //const subjectsUrl = 'http://192.168.0.101:8000/api/subject';
  const subjectsUrl = API_BASE_URL + "/api/subject";
  //Load Subject list
  useEffect(() => {
    fetch(subjectsUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => setSubjects(data));
  }, []);
  //Load Students Class
  useEffect(() => {
    const getID = 8;
    const url = API_BASE_URL + "/api/class_dep/" + getID;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setStudents(data.students)

      })
  }, [])

  const subjectsList = subjects.map((subject) => <MenuItem key={subject.id} value={subject.id}>{subject.title}</MenuItem>);


  const changeSubject = (e) => {
    fetch(subjectsUrl + "/" + e.target.value, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => { console.log(data); setActiveSubject(e.target.value); setThemes(data.themes) });

  }

  const handleThemes = (e) => {
    console.log(e.target.value);
    setActiveThemeId(e.target.value)

  }

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#1C2536' }} className='p-2' >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <FormControl sx={{ flexGrow: 1 }} size='normal'>
            <InputLabel sx={{ color: '#ffffff' }} id="demo-simple-select-label">Предмет</InputLabel>
            <Select
              variant='outlined'
              sx={{ color: '#ffffff' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={activeSubject}
              label="Предмет"
              onChange={changeSubject}
            >
              {subjectsList}
            </Select>
          </FormControl>
          {activeSubject !== "" ? <FormControl sx={{ flexGrow: 4, margin: '0 15px' }} size='normal'>
            <InputLabel sx={{ color: '#ffffff' }} id="demo-simple-select-label">Тема</InputLabel>
            <Select
              variant='outlined'
              sx={{ color: '#ffffff' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={activeThemeId ? activeThemeId : ""}
              label="Теме"
              onChange={handleThemes}
            >
              {themes.map((theme) => <MenuItem key={theme.id} value={theme ? theme.id : ""}>{theme.title}</MenuItem>)}
            </Select>
          </FormControl> : ""
          }

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Grid container >
        <Grid item xs={3} xl={3} sx={{ backgroundColor: '#303c53', height: '100vh' }} >
          <StageContext.Provider value={{ activeThemeId, setActiveOutcome }}>
            <QuestionsBook />
          </StageContext.Provider>

        </Grid>
        <Grid item xs={6} xl={6} sx={{ backgroundColor: '#F9F9F9' }}>
          <StageContext.Provider value={{ activeStudent, activeOutcome }}>
            <MainStage  />
          </StageContext.Provider>

        </Grid>
        <Grid item xs={3} xl={3} sx={{ backgroundColor: '#303c53', height: '100vh' }}>
          <StageContext.Provider value={{ students, setStudents, setActiveStudent }}>
            <ClassDep />
          </StageContext.Provider>

        </Grid>
      </Grid>


    </Box>

  );
}

export default Stage;