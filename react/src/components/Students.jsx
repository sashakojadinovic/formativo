import { Button, Box, AppBar, Toolbar, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from './apiUrls';
import StudentStageBadge from './StudentStageBadge';


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

    if (students) {
        studentsList = students.map(item => {
            return (
                <>
{/*                     <StudentStageBadge component={Link} to={'/student/' + item.id} onClick={() => console.log("OK")} first_name={item.first_name} last_name={item.last_name} key={item.id} color='success' />
                    <span>Test</span> */}
                    < Button component={Link} to={'/student/' + item.id} key={item.id} color='warning' className='w-full xl:6/12' size='large' variant='outlined' > {item.first_name} {item.last_name} {`(${item.answers_count})`}</Button >

                </>
                 
            )
        })
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{ backgroundColor: "#1C2536" }}>
                        <Toolbar>
                            <SchoolIcon
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}></SchoolIcon> <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
