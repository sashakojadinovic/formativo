import { Box, AppBar, Toolbar, Typography, Paper, FormControl, Select, MenuItem, InputLabel, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from './apiUrls';
import MainMenu from './MainMenu';
import Person from '@mui/icons-material/Person';

function Student() {
  const { id } = useParams();
  const nextStudentId = Number(id) + 1;
  const [student, setStudent] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [activeTheme, setActiveTheme] = useState(-1);
  const [uniqueThemesList, setUniqueThemesList] = useState(null);

  useEffect(() => {
    const url = API_BASE_URL + "/api/student/" + id
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setStudent(data.student);
        setAnswers(data.answers);
        // ostatak koda 

      });

  }, [id]);
  useEffect(() => {
   /*  let themes = [];
    answers ? answers.forEach((answer) => {
      themes.push(answer.question.outcomes[0].unit.theme);
    }) : '';
    const uniqueThemes = [...new Set(themes)];
    console.log(uniqueThemes);
    setUniqueThemesList(uniqueThemes.map((theme) => <MenuItem key={theme.id} value={theme.id}>{theme.title}</MenuItem>)); */
    if(answers){
    const uniqueAnswers = answers.reduce((uniqueArray, answer) => {
      const seenOutcomes = new Set([...uniqueArray.map(obj => obj.question.outcomes[0].unit.theme.id)]); 
    
      if (!seenOutcomes.has(answer.question.outcomes[0].unit.theme.id)) {
        uniqueArray.push(answer); 
      }
      seenOutcomes.add(answer.question.outcomes[0].unit.theme.id); 
    
      return uniqueArray; 
    }, []); 
    
    console.log(uniqueAnswers); 
    setUniqueThemesList(uniqueAnswers.map((answer) => <MenuItem key={answer.question.outcomes[0].unit.theme.id} value={answer.question.outcomes[0].unit.theme.id}>{answer.question.outcomes[0].unit.theme.title}</MenuItem>));
   
  }
    
  }, [student]);
  const deleteAnswer = (idToDelete) => {
    fetch(API_BASE_URL + '/api/answer/' + idToDelete, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setAnswers(() => answers.filter(answer => answer.id !== idToDelete));
        }
      });
  }
  let appbar = "Loading";

  if (student) {
    appbar = (<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#4b5052" }}>
        <Toolbar>
          <MainMenu />
          <PersonIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}></PersonIcon> <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {student.first_name} {student.last_name}
          </Typography>
          <Button color='inherit' component={Link} to={'/student/' + (id - 1)} aria-label="едит"> <ArrowBackIosIcon /></Button>
          <Button color='inherit' component={Link} to={'/student/' + nextStudentId} aria-label="едит"> <ArrowForwardIosIcon /></Button>
        </Toolbar>
      </AppBar>

    </Box >)
  }
  else {
    appbar = ('Loading...')
  }

  const assesmentColor = '#ffffff';
  const getAssesmentColor = (assessment_id) => {

    switch (assessment_id) {
      case 1:
        return '#ffddc9';
      case 2:
        return '#ffefbe';
      case 3:
        return '#d1e8da';
      default:
        return assesmentColor;
    }
  }
  const changeTheme = (e) => {
    setActiveTheme(e.target.value);
  }
  return (<>{appbar}
    {/* <Snackbar open={snackOpened} autoHideDuration={6000} onClose={() => setSnackOpened(false)}>
      <Alert onClose={() => setSnackOpened(false)} severity={snackOpened === "success" ? "success" : (snackOpened === "error" ? "error" : "")} sx={{ width: '100%' }}>
        {snackOpened === "success" ? "Подаци су успешно сачувани" : (snackOpened === "error" ? "Догодила се грешка приликом покушаја уписа података у базу" : "")}
      </Alert>
    </Snackbar> */}

    <TableContainer component={Paper} className='p-5'>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-simple-select-label">Тема</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activeTheme}
          label="Тема"
          onChange={changeTheme}
        >
          {/* <MenuItem value={-1}>Све теме</MenuItem>
          <MenuItem value={2}>Угљоводоници</MenuItem>
          <MenuItem value={3}>Једињења са кисеоником</MenuItem> */}
          <MenuItem value={-1}>Све теме</MenuItem>
          {uniqueThemesList}
        </Select>
      </FormControl>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#a0a8ab' }}>
            <TableCell sx={{ color: '#ffffff;', fontWeight: 'bold' }}>Исход</TableCell>
            <TableCell sx={{ color: '#ffffff;', fontWeight: 'bold' }}>Питање</TableCell>
            {/* <TableCell sx={{color: '#ffffff;', fontWeight: 'bold'}}>Одговор</TableCell> */}
            <TableCell sx={{ color: '#ffffff;', fontWeight: 'bold' }}>Време</TableCell>
            <TableCell sx={{ color: '#ffffff;', fontWeight: 'bold' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {answers ? answers.map(answer => (
           answer.question.outcomes[0].unit.theme.id==activeTheme || activeTheme===-1?
            <TableRow key={answer.id} sx={{ backgroundColor: getAssesmentColor(answer.assessment_id) }}>
              <TableCell component="td" scope="row">{answer.question.outcomes[0].description}</TableCell>
              <TableCell component="td" scope="row">{answer.question.description}</TableCell>
              {/*               <TableCell component="td" scope="row">{answer.assessment_id}</TableCell> */}
              <TableCell component="td" scope="row">{answer.date}</TableCell>
              <TableCell sx={{ minWidth: '100px' }} component="td" scope="row"><IconButton onClick={() => console.log("OK")} aria-label="едит"> <EditNoteIcon /></IconButton><IconButton onClick={() => deleteAnswer(answer.id)} aria-label="delete"> <DeleteIcon /></IconButton></TableCell>

            </TableRow>:''

          )) : <TableRow>
            <TableCell component="td" scope="row">#</TableCell>
            <TableCell component="td" scope="row">#</TableCell>
            <TableCell component="td" scope="row">#</TableCell>
            <TableCell component="td" scope="row">#</TableCell>
          </TableRow>}
        </TableBody>

      </Table>

    </TableContainer>
  </>)
}

export default Student
