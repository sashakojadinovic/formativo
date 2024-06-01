import { Box, AppBar, Toolbar, Typography, Paper, FormControl, Select, MenuItem, InputLabel, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, IconButton, Button, Card } from '@mui/material';
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
import { PieChart } from '@mui/x-charts/PieChart';

function Student() {
  const { id } = useParams();
  const nextStudentId = Number(id) + 1;

  const [student, setStudent] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [activeTheme, setActiveTheme] = useState(-1);
  const [uniqueThemesList, setUniqueThemesList] = useState(null);
  const [filteredAnswers, setFilteredAnswers] = useState(null);
  const [studentStatistics, setStudentStatistics] = useState({ accomplished: 10, partially: 20, unaccomplished: 30 });

  useEffect(() => {
    const url = API_BASE_URL + "/api/student/" + id
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setStudent(data.student);
        setAnswers(data.answers);
        setFilteredAnswers(data.answers);
        setActiveTheme(-1);

      });

  }, [id]);
  useEffect(() => {
    if (answers) {
      const uniqueAnswers = answers.reduce((uniqueArray, answer) => {
        const seenOutcomes = new Set([...uniqueArray.map(obj => obj.question.outcomes[0].unit.theme.id)]);

        if (!seenOutcomes.has(answer.question.outcomes[0].unit.theme.id)) {
          uniqueArray.push(answer);
        }
        seenOutcomes.add(answer.question.outcomes[0].unit.theme.id);

        return uniqueArray;
      }, []);


      setUniqueThemesList(uniqueAnswers.map((answer) => <MenuItem key={answer.question.outcomes[0].unit.theme.id} value={answer.question.outcomes[0].unit.theme.id}>{answer.question.outcomes[0].unit.theme.title}</MenuItem>));
      console.log(student);
      const countAssesments = (assessmentId) => filteredAnswers ? filteredAnswers.filter(answer => answer.assessment_id === assessmentId).length : 0;
      setStudentStatistics({ accomplished: countAssesments(3), partially: countAssesments(2), unaccomplished: countAssesments(1) });
    }

  }, [student, activeTheme]);
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
  const getAssesmentDescription = (assessment_id) => {

    switch (assessment_id) {
      case 1:
        return 'Није у стању да ';
      case 2:
        return 'Делимично је у стању да ';
      case 3:
        return 'У стању је да ';
      default:
        return 'У стању је да ';
    }
  }

  const changeTheme = (e) => {
    setActiveTheme(e.target.value);
    e.target.value !== -1 ? setFilteredAnswers(answers.filter(answer => answer.question.outcomes[0].unit.theme.id === e.target.value)) : setFilteredAnswers(answers);
  }
  return (<Box><AppBar position="static" sx={{ backgroundColor: "#4b5052" }} className='p-2'>
    <Toolbar>
      <MainMenu />
      <FormControl size='normal' sx={{ minWidth: '300px' }} >
        <InputLabel sx={{ color: '#ffffff' }} id="select-theme-label">Тема</InputLabel>
        <Select
          variant='outlined'
          sx={{ color: '#ffffff' }}
          labelId="select-theme"
          id="select-theme"
          value={activeTheme}
          label="Тема"
          onChange={changeTheme}
        >
          <MenuItem value={-1}>Све теме</MenuItem>
          {uniqueThemesList}
        </Select>
      </FormControl>
      <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '10px' }} >
        <PersonIcon
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}></PersonIcon> {student ? <Typography variant="h6" component="div">
            {student.first_name} {student.last_name}
          </Typography> : ''}
        <Button sx={{ backgroundColor: '#51585a', border: '1px solid #0000003b' }} size='large' color='inherit' component={Link} to={`/class/${student ? student.class_department.id : "1"}`} aria-label="одељење" className='ms-2'><Typography variant="h6">{student ? student.class_department.name : ''}</Typography></Button>
      </Box>


      <Button color='inherit' component={Link} to={'/student/' + (id - 1)} aria-label="едит"> <ArrowBackIosIcon /></Button>
      <Button color='inherit' component={Link} to={'/student/' + nextStudentId} aria-label="едит"> <ArrowForwardIosIcon /></Button>
    </Toolbar>
  </AppBar>
    {/* <Snackbar open={snackOpened} autoHideDuration={6000} onClose={() => setSnackOpened(false)}>
      <Alert onClose={() => setSnackOpened(false)} severity={snackOpened === "success" ? "success" : (snackOpened === "error" ? "error" : "")} sx={{ width: '100%' }}>
        {snackOpened === "success" ? "Подаци су успешно сачувани" : (snackOpened === "error" ? "Догодила се грешка приликом покушаја уписа података у базу" : "")}
      </Alert>
    </Snackbar> */}
    <Card sx={{ paddingLeft: '20px' }}>

      {student ? (<PieChart

        series={[
          {
            data: [
              { id: 0, value: studentStatistics.accomplished, label: 'Остварено: ' + studentStatistics.accomplished, color: '#68b586' },
              { id: 1, value: studentStatistics.partially, label: 'Делимично: ' + studentStatistics.partially, color: '#ffcc29' },
              { id: 2, value: studentStatistics.unaccomplished, label: 'Неостварено: ' + studentStatistics.unaccomplished, color: '#ff8f4d' },
            ],
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 25, additionalRadius: -25, color: 'gray' },
            innerRadius: 25,
            outerRadius: 75,
            paddingAngle: 0,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
            cx: 70,
            cy: 90,
          },
        ]}
        width={360}
        height={180}
      />) : ''}

    </Card>
    <Card sx={{ paddingLeft: '60px', marginTop: '60px' }}>

      <ul>
        {filteredAnswers ? filteredAnswers.map(answer => (<li>

          {answer.date + " " + getAssesmentDescription(answer.assessment_id) + answer.question.outcomes[0].description}
        </li>)) : ""}
      </ul>

    </Card>



  </Box>)
}

export default Student
