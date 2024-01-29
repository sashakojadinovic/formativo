import { Button, Box, AppBar, Toolbar, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from './apiUrls';


function ClassDep(props) {
    const { id } = useParams();
    const getID = id ? id : props.id;;

    let [students, setStudents] = useState(null);
    let [classDep, setClassDep] = useState(null);
    let studentsList = [];
    useEffect(() => {
        //const url = "http://192.168.0.101:8000/api/class_dep/" + getID;
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

                < Button component={Link} to={'/student/' + item.id} key={item.id} color='warning' className='w-full xl:6/12' size='large' variant='outlined' > {item.first_name} {item.last_name}</Button >

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
