import { Button, Box, AppBar, Toolbar, Typography } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from './apiUrls';
import MainMenu from './MainMenu';
import { styled } from '@mui/material/styles';

function ClassDeps() {
    let [classDeps, setClassDeps] = useState(null)
    let classDepList = []
    useEffect(() => {
        const url = API_BASE_URL + "/api/class_dep";
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setClassDeps(data)

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
    if (classDeps) {
        classDepList = classDeps.map(item => {
            return (

                <div className='w-full xl:w-2/12 md:w-5/12' key={item.id}>
                    <Link to={`/class/${item.id}`}><WhiteButton className='w-full' class_dep_id={item.id} size='large' color='primary' variant='outlined' >{item.name}</WhiteButton></Link>
                </div>

            )
        })
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{ backgroundColor: "#4b5052" }}>
                        <Toolbar>
                            <MainMenu />
                            <SchoolIcon size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} ></SchoolIcon> <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>  ОШ "Свети Сава" Велика Плана </Typography>
                        </Toolbar>
                    </AppBar>
                </Box >
                <div className='flex flex-wrap gap-1 m-5 justify-center'>
                    {classDepList}
                </div>
            </>
        )
    }
    else {
        return ('Loading...')
    }

}

export default ClassDeps
