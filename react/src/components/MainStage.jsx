import { useContext, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { Container, Box, Card, Dialog, DialogActions, Typography, Button, DialogContent, Snackbar, Alert, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import FPrimaryButton from './ui/buttons/FPrimaryButton'
import { API_BASE_URL } from './apiUrls';
import { StageContext } from '../contexts/StageContext';

function MainStage(props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [rate, setRate] = useState(null);
    const [snackOpened, setSnackOpened] = useState(false);
    const [choosenQuestion, setChoosenQuestion] = useState("");

    const { activeStudent, activeOutcome } = useContext(StageContext);
    const saveAnswer = () => {
        const postUrl = API_BASE_URL + "/api/answer";
        fetch(postUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ studentId: activeStudent.id, questionId: choosenQuestion, assessmentId: rate })
        })
            .then(res => res.json())
            .then(data => {
                setDialogOpen(false);
                if (data.status === "success") {

                    setSnackOpened('success');
                }
                else {
                    setSnackOpened('error');
                }
            })
    }
    const handleChange = (e) => setChoosenQuestion(e.target.value);

    return (
        <Container sx={{ minWidth: 275 }}>
            <Snackbar open={snackOpened} autoHideDuration={6000} onClose={() => setSnackOpened(false)}>
                <Alert onClose={() => setSnackOpened(false)} severity={snackOpened === "success" ? "success" : (snackOpened === "error" ? "error" : "info")} sx={{ width: '100%' }}>
                    {snackOpened === "success" ? "Подаци су успешно сачувани" : (snackOpened === "error" ? "Догодила се грешка приликом покушаја уписа података у базу" : "")}
                </Alert>
            </Snackbar>
            <Dialog open={dialogOpen}>

                <DialogContent>
                    Да ли желите да потврдите своју процену?
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' size='small' color='warning' onClick={() => setDialogOpen(false)}><CloudOffIcon className='mr-2' fontSize='small' /> Поништи</Button>
                    <Button variant='contained' size='small' color='primary' onClick={() => saveAnswer()}><CloudUploadIcon className='mr-2' fontSize='small' /> Потврди</Button>
                </DialogActions>
            </Dialog>
            <Typography sx={{ fontSize: 18, marginTop: 3 }}  gutterBottom>
                Исход: Ученик/ученица је у стању да {activeOutcome ? activeOutcome.description : ""}
            </Typography>           
            <Typography className='pt-5' sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Предложена питања:
            </Typography>
            <Card className='p-5 mt-2 mb-5'>

                {activeOutcome && activeOutcome.questions.length > 0
                    ?
                    <RadioGroup
                        value={choosenQuestion}
                        name="radio-buttons-group"
                        onChange={handleChange}
                    >
                        {activeOutcome.questions.map((question, index) =>
                            <FormControlLabel key={index} value={question.pivot.question_id} control={<Radio />} label={question.description} />)}

                    </RadioGroup>

                    : ""}
            </Card>
            <Box className='flex justify-end pt-10 gap-1'>

                <FPrimaryButton onClick={() => { setRate(3); setDialogOpen(true) }} variant='contained' color='primary'>Добро</FPrimaryButton>
                <FPrimaryButton onClick={() => { setRate(2); setDialogOpen(true) }} variant='contained' color='primary'>Делимично</FPrimaryButton>
                <FPrimaryButton onClick={() => { setRate(1); setDialogOpen(true) }} variant='contained' color='primary'>Лоше</FPrimaryButton>

            </Box>

            <Card className='p-5 mt-5'>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ученик:
                </Typography>
                <p>{activeStudent ? activeStudent.first_name + " " + activeStudent.last_name : ""}</p>
            </Card>


        </Container>



    )
}

export default MainStage;