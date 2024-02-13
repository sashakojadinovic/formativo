import { TextField, Button, Box, AppBar, Toolbar, Typography, ListItemButton, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



function NewSubject(props) {
    const [subjectTitle, setSubjectTitle] = useState("");
    const [subjectListArray, setSubjectList] = useState(null);
    const subjectUrl = 'http://192.168.0.101:8000/api/subject';

    useEffect(() => {
        fetch(subjectUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",
        })
            .then(res => res.json())
            .then(data => setSubjectList(data));

    }, []);

    const saveSubject = () => {
        fetch(subjectUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ "subjectTitle": subjectTitle })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setSubjectList([...subjectListArray, data.last]);
                }
            });
    }
    const handleSubjectTitle = (e) => {
        setSubjectTitle(e.target.value);
    }
    let subjectList = [];
    if (subjectListArray) {
        subjectList = subjectListArray.map((subject) => {
            return (
            <ListItemButton  component={Link} to={'/subject/'+subject.id}>
                <ListItemText primary={subject.title} />
            </ListItemButton>);

        });
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{ backgroundColor: "#1C2536" }}>
                        <Toolbar>
                            <AddIcon
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}></AddIcon> <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Креирај нови предмет
                            </Typography>
                        </Toolbar>
                    </AppBar>

                </Box>
                <Box maxWidth={800} className='mt-10 m-auto '>
                    {subjectList}
                </Box>
                <Box maxWidth={800} className='flex align-center mt-10 m-auto '>
                    <TextField value={subjectTitle} onChange={handleSubjectTitle} fullWidth id="standard-basic" label="Назив" variant="outlined" /><Button onClick={saveSubject} size='normal' variant='contained'>Сачувај</Button>

                </Box>
            </>)
    }
    else {
        return ('Loading...');
    }



}

export default NewSubject;
