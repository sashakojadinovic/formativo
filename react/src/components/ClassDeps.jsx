import { Button, Box, AppBar, Toolbar, Typography } from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from './apiUrls';

function ClassDeps() {
    let [classDeps, setClassDeps] = useState(null)
    let classDepList = []
    useEffect(() => {
        //const url = "http://192.168.0.101:8000/api/class_dep"
        const url = API_BASE_URL + "/api/class_dep";
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setClassDeps(data)

            })
    }, []);
    if (classDeps) {
        classDepList = classDeps.map(item => {
            return (

                <div className='w-full xl:w-2/12 md:w-5/12' key={item.id}>
                    <Link to={`/class/${item.id}`}><Button className='w-full' class_dep_id={item.id} size='large' color='primary' variant='outlined' >{item.name}</Button></Link>

                </div>

            )
        })
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{ backgroundColor: "#1C2536" }}>
                        <Toolbar>
                            <AccountBalanceIcon size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }} >

                            </AccountBalanceIcon>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                ОШ "Свети Сава" Велика Плана
                            </Typography>
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
