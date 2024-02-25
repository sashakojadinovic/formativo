import { Button, Box, AppBar, Toolbar, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from './apiUrls';
import StudentStageBadge from './StudentStageBadge';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MainMenu from './MainMenu';
import { styled } from '@mui/material/styles';

function ClassDep(props) {
    const { id } = useParams();
    const getID = id ? id : props.id;;

    let [students, setStudents] = useState(null);
    let [classDep, setClassDep] = useState(null);
    let studentsList = [];
    useEffect(() => {
        const url = API_BASE_URL + "/api/class_dep/" + getID;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setClassDep(data.class_name)
                setStudents(data.students)

            })
    }, []);
    const WhiteButton = styled(Button)(({ theme }) => ({
        color: "#37474f",
        backgroundColor: "#ffffff",
        borderColor: "#78909c",
        '&:hover': {
          backgroundColor: "#eceff1",
          borderColor: "#78909c"
        },
      }));
    if (students) {
        studentsList = students.map(item => {
            return (
                <>
{/*                     <StudentStageBadge component={Link} to={'/student/' + item.id} onClick={() => console.log("OK")} first_name={item.first_name} last_name={item.last_name} key={item.id} color='success' />
                    <span>Test</span> */}
                    < WhiteButton component={Link} to={'/student/' + item.id} key={item.id} color='warning' className='w-full xl:6/12' size='large' variant='outlined' > {item.first_name} {item.last_name} {`(${item.answers_count})`}</WhiteButton >

                </>
                 
            )
        })
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{ backgroundColor: "#4b5052" }}>
                        <Toolbar>
                            <MainMenu />
                            <PeopleAltIcon
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}></PeopleAltIcon> <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {classDep}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box >
                <div className='p-2 grid grid-cols-2 gap-1 mt-8'>
                    {studentsList}
                </div>
            </>)
    }
    else {
        return ('Loading...')
    }

}

export default ClassDep
