import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button, Box, AppBar, Toolbar, IconButton, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import PlaylistAddTwoToneIcon from '@mui/icons-material/PlaylistAddTwoTone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from './apiUrls';
import { Form } from 'react-router-dom';
import { Container } from 'postcss';



function NewOutcome(props) {
    const [subjects, setSubjects] = useState([]);
    const [activeSubject, setActiveSubject] = useState("");
    const [themes, setThemes] = useState([]);
    const [activeTheme, setActiveTheme] = useState("");
    const [units, setUnits] = useState([]);
    const [activeUnit, setActiveUnit] = useState("");
    const [outcomeToSave, setOutcomeToSave] = useState("");
    const [outcomesToDisplay, setOutcomesToDisplay] = useState([]);
    const [activeOutcome, setActiveOutcome] = useState("");
    const [questionToSave, setQuestionToSave] = useState("");
    //
    const [outcomeDalogOpen, setOutcomeDialogOpen] = useState(false);
    const [questionDalogOpen, setQuestionDialogOpen] = useState(false);
    //
    const [snackOpened, setSnackOpened] = useState(false);

    useEffect(() => {
        fetch(API_BASE_URL + "/api/subject", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => setSubjects(data));
    }, []);

    const changeSubject = (e) => {
        setActiveSubject(e.target.value);
        fetch(API_BASE_URL + "/api/subject/" + e.target.value, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }, [])
            .then(res => res.json())
            .then(data => setThemes(data.themes));
    }

    const changeTheme = e => {
        setActiveTheme(e.target.value);
        fetch(API_BASE_URL + "/api/theme/" + e.target.value, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }, [])
            .then(res => res.json())
            .then(data => setUnits(data.units));
    }
    const changeUnit = (e) => {
        setActiveUnit(e.target.value);
        console.log(e.target.value);

        setOutcomesToDisplay(units.find(unit => unit.id === e.target.value).outcomes);
    }


    const saveOutcome = e => {
        fetch(API_BASE_URL + "/api/outcome", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ "description": outcomeToSave, "unit_id": activeUnit })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    setSnackOpened(data.status);
                    const newOutcome = data.outcome;
                    newOutcome.questions = [];
                    setOutcomesToDisplay([...outcomesToDisplay, newOutcome]);
                    setOutcomeDialogOpen(false);
                    setOutcomeToSave('');

                }
            });
    }
    const saveQuestion = e => {
        fetch(API_BASE_URL + "/api/question", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ "description": questionToSave, "outcomes": activeOutcome })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    setSnackOpened(data.status === "success" ? true : false);
                    const newQuestion = data.question;
                    //Ovde bi bilo bolje da bude filter umesto map
                    const newOutcomes = outcomesToDisplay.map(outcome => {
                        if (outcome.id === activeOutcome) {
                            outcome.questions.push(data.question);

                        }
                        return outcome;
                    })

                    setOutcomesToDisplay(newOutcomes);
                    setQuestionDialogOpen(false);
                    setQuestionToSave('');

                }
            });
    };
    const deleteOutcome = id => {
        fetch(API_BASE_URL + "/api/outcome/"+id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            //console.log(data.status);
            if(data.status==="success"){
                const newOutcomes = outcomesToDisplay.filter(outcome=>outcome.id!==id);
                setOutcomesToDisplay(newOutcomes);
                console.log("Izbrisan ishod sa ID:"+id);
            } 
        })
        
    }
    const deleteQuestion = id => {

        fetch(API_BASE_URL + "/api/question/" + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === "success") {
                    setSnackOpened(data.status === "success" ? true : false);
                    const outcomesToDisplayFiltered = outcomesToDisplay.map(outcome => {
                        return {
                            //Pogledaj ovo i razjasni kad bude vremena
                            ...outcome,
                            questions: outcome.questions.filter(question => question.pivot.question_id !== id)
                        };
                    });
                    setOutcomesToDisplay(outcomesToDisplayFiltered);
                    setQuestionDialogOpen(false);
                }


            });
        return 1;
    }
    return (
        <div style={{ backgroundColor: '#F9F9F9' }}>
            <Dialog maxWidth="md" fullWidth open={outcomeDalogOpen}>
                <DialogTitle>Нови исход у оквиру наставне јединице</DialogTitle>
                <DialogContent>
                    <TextField value={outcomeToSave} onChange={(e) => setOutcomeToSave(e.target.value)} multiline rows={2} fullWidth id="new-outcome-textfield" label="Опис исхода" variant="outlined" />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOutcomeDialogOpen(false)} size='small' color='warning' variant='contained'><CloudOffIcon className='mr-2' fontSize='small' />  Поништи</Button>
                    <Button disabled={outcomeToSave === ""} onClick={saveOutcome} size='small' color='info' variant='contained'><CloudUploadIcon className='mr-2' fontSize='small' /> Сачувај</Button>
                </DialogActions>
            </Dialog>
            <Dialog maxWidth="md" fullWidth open={questionDalogOpen}>
                <DialogTitle>Ново питање</DialogTitle>
                <DialogContent>
                    <TextField value={questionToSave} onChange={(e) => setQuestionToSave(e.target.value)} multiline rows={3} fullWidth id="new-question-textfield" label="Опис питања" variant="outlined" />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setQuestionDialogOpen(false)} size='small' color='warning' variant='contained'><CloudOffIcon className='mr-2' fontSize='small' /> Поништи</Button>
                    <Button disabled={questionToSave === ""} onClick={saveQuestion} size='small' color='info' variant='contained'><CloudUploadIcon className='mr-2' fontSize='small' /> Сачувај</Button>
                </DialogActions>
            </Dialog>
            
            <Box sx={{ flexGrow: 1 }}>
                <Snackbar open={snackOpened} autoHideDuration={6000} onClose={() => setSnackOpened(false)}>
                    <Alert onClose={() => setSnackOpened(false)} severity={snackOpened === "success" ? "success" : (snackOpened === "error" ? "error" : "info")} sx={{ width: '100%' }}>
                        {snackOpened === true ? "Подаци су успешно сачувани" : (snackOpened === "error" ? "Догодила се грешка приликом покушаја уписа података у базу" : "")}
                    </Alert>
                </Snackbar>
                <AppBar position="static" sx={{ backgroundColor: '#1C2536' }} className='p-2' >
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <FormControl sx={{ width: '20%' }} >
                            <InputLabel sx={{ color: '#ffffff' }} id="select-subject-label">Предмет</InputLabel>
                            <Select variant='outlined' sx={{ color: '#ffffff' }} id="select-subject" value={activeSubject} label="Предмет" onChange={changeSubject}>
                                {subjects.map((subject, index) => <MenuItem key={index} value={subject.id}>{subject.title}</MenuItem>)}
                            </Select>
                        </FormControl>
                        {activeSubject ? <FormControl sx={{ width: '30%' }}>
                            <InputLabel sx={{ color: '#ffffff' }} id="select-theme-label">Тема</InputLabel>
                            <Select variant='outlined' sx={{ color: '#ffffff' }} id="select-theme" value={activeTheme} label="Тема" onChange={changeTheme}>
                                {themes.map((theme, index) => <MenuItem key={index} value={theme.id}>{theme.title}</MenuItem>)}
                            </Select>
                        </FormControl> : ""}

                        {activeTheme ? <FormControl sx={{ width: '30%' }}>
                            <InputLabel sx={{ color: '#ffffff' }} id="select-unit-label">Наставна јединица</InputLabel>
                            <Select variant='outlined' sx={{ color: '#ffffff' }} id="dselect-unit" value={activeUnit} label="Наставна јединица" onChange={changeUnit}>
                                {units.map((unit, index) => <MenuItem key={index} data-index={index} value={unit.id}>{unit.title}</MenuItem>)}
                            </Select>
                        </FormControl> : ""}
                    </Toolbar>
                </AppBar>
            </Box>
            <Box maxWidth={800} className='flex align-center mt-10 m-auto '>
                {activeUnit ? <Button onClick={() => setOutcomeDialogOpen(!outcomeDalogOpen)} color='info'><PostAddTwoToneIcon fontSize='medium' color='info' /> Додај исход </Button> : ""}



            </Box>
            <Box maxWidth={800} className='flex align-center mt-2 m-auto '>


            </Box>
            <Box maxWidth={800} className='flex align-center mt-10 m-auto '>
                {activeUnit ? <Typography sx={{ fontSize: '18px' }} color={Text.secondary}>Након обрађене наставне јединице ученик ће бити у стању да:</Typography> : ""}
            </Box>
            <Box maxWidth={800} className='mt-2 m-auto '>
                {outcomesToDisplay.map((outcome, index) => {
                    return (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id={`accordion-${index}`}>
                                {outcome.description} {outcome.questions ? " (" + outcome.questions.length + ")" : ""}
                            </AccordionSummary>
                            <AccordionDetails>
                                <Button sx={{ marginBottom: '15px', marginRight: '15px' }} color='warning' variant='text' size='small' onClick={() => { setActiveOutcome(outcome.id); deleteOutcome(outcome.id) }} ><RemoveCircleOutlinedIcon fontSize='small' sx={{ marginRight: '2px' }} /> Избриши исход</Button>
                                <Button sx={{ marginBottom: '15px' }} color='info' variant='text' size='small' onClick={() => { setQuestionDialogOpen(!questionDalogOpen); setActiveOutcome(outcome.id) }} ><PlaylistAddTwoToneIcon color='inherit' fontSize='medium' /> Додај питање</Button>
                                <h3>Питања везана за исход:</h3>
                                {outcome.questions.length < 1 ? "Нема"
                                    : <ol style={{ listStyle: 'auto', paddingLeft: '15px' }}>{outcome.questions.map((question, index) => {
                                        return (<li key={index}>{question.description}<Button onClick={() => deleteQuestion(question.pivot.question_id)} sx={{ marginLeft: '10px' }} color='warning' size='small' ><RemoveCircleOutlinedIcon fontSize='small' sx={{ marginRight: '2px' }} />Избриши </Button></li>);
                                    })}</ol>
                                }


                            </AccordionDetails>
                        </Accordion>
                    );

                })}
            </Box>

        </div>)



}

export default NewOutcome;
