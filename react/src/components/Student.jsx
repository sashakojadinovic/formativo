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
  const [achievements, setAchievements] = useState(null);
  const [activeTheme, setActiveTheme] = useState(-1);
  const [uniqueThemesList, setUniqueThemesList] = useState(null);
  const [filteredachievements, setFilteredachievements] = useState(null);
  const [studentStatistics, setStudentStatistics] = useState({ accomplished: 10, partially: 20, unaccomplished: 30 });

  useEffect(() => {
    const url = API_BASE_URL + "/api/student/" + id
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setStudent(data.student);
        setAchievements(data.achievements);
        setFilteredachievements(data.achievements);
        setActiveTheme(-1);
        console.log(data);

      });

  }, [id]);
  useEffect(() => {
    if (achievements) {
      const uniqueachievements = achievements.reduce((uniqueArray, achievement) => {
        const seenOutcomes = new Set([...uniqueArray.map(obj => obj.outcome.unit.theme.id)]);

        if (!seenOutcomes.has(achievement.outcome.unit.theme.id)) {
          uniqueArray.push(achievement);
        }
        seenOutcomes.add(achievement.outcome.unit.theme.id);

        return uniqueArray;
      }, []);


      setUniqueThemesList(uniqueachievements.map((achievement) => <MenuItem key={achievement.outcome.unit.theme.id} value={achievement.outcome.unit.theme.id}>{achievement.outcome.unit.theme.title}</MenuItem>));

      const countAssesments = (assessmentId) => filteredachievements ? filteredachievements.filter(achievement => achievement.assessment_id === assessmentId).length : 0;
      setStudentStatistics({ accomplished: countAssesments(3), partially: countAssesments(2), unaccomplished: countAssesments(1) });
    }

  }, [student, activeTheme]);
  const deleteachievement = (idToDelete) => {
    fetch(API_BASE_URL + '/api/achievement/' + idToDelete, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setAchievements(() => achievements.filter(achievement => achievement.id !== idToDelete));
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
  const changeTheme = (e) => {
    setActiveTheme(e.target.value);
    e.target.value !== -1 ? setFilteredachievements(achievements.filter(achievement => achievement.question.outcomes[0].unit.theme.id === e.target.value)) : setFilteredachievements(achievements);
  }
  return (<Box><AppBar position="static" sx={{ backgroundColor: "#4b5052" }} className='p-2'>
    <Toolbar>
      <MainMenu />
      <FormControl size='normal' sx={{minWidth:'300px'}} >
        <InputLabel  sx={{ color: '#ffffff' }} id="select-theme-label">Тема</InputLabel>
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
      <Box sx={{ flexGrow: 2, display:'flex', justifyContent:'end', alignItems:'center', gap:'10px' }} >
         <PersonIcon
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}></PersonIcon> {student ? <Typography variant="h6" component="div">
           {student.first_name} {student.last_name} 
        </Typography> : ''}
        <Button sx={{backgroundColor:'#51585a', border:'1px solid #0000003b'}} size='large' color='inherit' component={Link} to={`/class/${student? student.class_department.id:"1"}` } aria-label="одељење" className='ms-2'><Typography variant="h6">{student? student.class_department.name:''}</Typography></Button>
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
    <TableContainer component={Paper} className='p-5'>


      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#a0a8ab' }}>
            <TableCell sx={{ color: '#ffffff;', fontWeight: 'bold' }}>Ученик/ученица је у стању да</TableCell>
            {/* <TableCell sx={{color: '#ffffff;', fontWeight: 'bold'}}>Одговор</TableCell> */}
            <TableCell sx={{ color: '#ffffff;', fontWeight: 'bold' }}>Време</TableCell>
            <TableCell sx={{ color: '#ffffff;', fontWeight: 'bold' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredachievements ? filteredachievements.map(achievement => (
            achievement.outcome.description === activeTheme || activeTheme === -1 ?
              <TableRow key={achievement.id} sx={{ backgroundColor: getAssesmentColor(achievement.assessment_id) }}>
                <TableCell component="td" scope="row">{achievement.outcome.description}</TableCell>
                {/*               <TableCell component="td" scope="row">{achievement.assessment_id}</TableCell> */}
                <TableCell component="td" scope="row">{achievement.date}</TableCell>
                <TableCell sx={{ minWidth: '100px' }} component="td" scope="row"><IconButton onClick={() => console.log("OK")} aria-label="едит"> <EditNoteIcon /></IconButton><IconButton onClick={() => deleteachievement(achievement.id)} aria-label="delete"> <DeleteIcon /></IconButton></TableCell>

              </TableRow> : ''

          )) : <TableRow>
            <TableCell component="td" scope="row">#</TableCell>
            <TableCell component="td" scope="row">#</TableCell>
            <TableCell component="td" scope="row">#</TableCell>
            <TableCell component="td" scope="row">#</TableCell>
          </TableRow>}
        </TableBody>

      </Table>

    </TableContainer>


  </Box>)
}

export default Student
