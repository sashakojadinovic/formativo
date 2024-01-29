import { Box, AppBar, Toolbar, Typography, Paper, CardContent, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, IconButton } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from './apiUrls';

function Student() {
  const { id } = useParams();
  let [student, setStudent] = useState(null)
  let [answers, setAnswers] = useState(null)
  useEffect(() => {
    const url = API_BASE_URL + "/api/student/" + id
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setStudent(data.student);
        setAnswers(data.answers);

      })
  }, []);
  const deleteAnswer = (idToDelete) =>{
    fetch(API_BASE_URL + '/api/answer/'+idToDelete, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "DELETE",
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.status==="success"){
        setAnswers(()=>answers.filter(answer=>answer.id!==idToDelete));
      }
    });
   
  }
  let appbar = "Loading";

  if (student) {
    appbar = (<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1C2536" }}>
        <Toolbar>
          <AccountCircleIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}></AccountCircleIcon> <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {student.first_name} {student.last_name}
          </Typography>
        </Toolbar>
      </AppBar>

    </Box >)
  }
  else {
    appbar = ('Loading...')
  }


  return (<>{appbar}
    {/* <Snackbar open={snackOpened} autoHideDuration={6000} onClose={() => setSnackOpened(false)}>
      <Alert onClose={() => setSnackOpened(false)} severity={snackOpened === "success" ? "success" : (snackOpened === "error" ? "error" : "")} sx={{ width: '100%' }}>
        {snackOpened === "success" ? "Подаци су успешно сачувани" : (snackOpened === "error" ? "Догодила се грешка приликом покушаја уписа података у базу" : "")}
      </Alert>
    </Snackbar> */}
    <TableContainer component={Paper} className='p-5'>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1C2536' }}>
            <TableCell sx={{color: '#ffffff;', fontWeight: 'bold'}}>Исход</TableCell>
            <TableCell sx={{color: '#ffffff;', fontWeight: 'bold'}}>Питање</TableCell>
            <TableCell sx={{color: '#ffffff;', fontWeight: 'bold'}}>Одговор</TableCell>
            <TableCell sx={{color: '#ffffff;', fontWeight: 'bold'}}>Време</TableCell>
            <TableCell sx={{color: '#ffffff;', fontWeight: 'bold'}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {answers ? answers.map(answer => (

            <TableRow key={answer.id}>
              <TableCell component="th" scope="row">{answer.question.outcomes[0].description}</TableCell>
              <TableCell component="th" scope="row">{answer.question.description}</TableCell>              
              <TableCell component="th" scope="row">{answer.assessment_id}</TableCell>
              <TableCell component="th" scope="row">{answer.date}</TableCell>
              <TableCell component="th" scope="row"><IconButton onClick={()=>deleteAnswer(answer.id)} aria-label="delete"> <DeleteIcon   /></IconButton></TableCell>

            </TableRow>

          )) : <TableRow>
            <TableCell component="th" scope="row">#</TableCell>
            <TableCell component="th" scope="row">#</TableCell>
            <TableCell component="th" scope="row">#</TableCell>
            <TableCell component="th" scope="row">#</TableCell>
          </TableRow>}
        </TableBody>

      </Table>

    </TableContainer>
  </>)
}

export default Student