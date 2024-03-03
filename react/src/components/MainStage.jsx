import { useContext, useState, useEffect } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GradeIcon from '@mui/icons-material/Grade';
import { Container, Box, Card, Dialog, DialogActions, Typography, Button, DialogContent, Snackbar, Alert, RadioGroup, FormControlLabel, Radio, TextField, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import FPrimaryButton from './ui/buttons/FPrimaryButton'
import { API_BASE_URL } from './apiUrls';
import { StageContext } from '../contexts/StageContext';
import { PieChart } from '@mui/x-charts/PieChart';

function MainStage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [rate, setRate] = useState(null);
    const [snackOpened, setSnackOpened] = useState(false);
    const [choosenQuestion, setChoosenQuestion] = useState(null);
    const [comment, setComment] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [studentStatistics, setStudentStatistics] = useState({ accomplished: 10, partially: 20, unaccomplished: 30 });

    const { activeStudent, activeOutcome } = useContext(StageContext);
    const saveAnswer = () => {
        //setDialogOpen(false);
        //console.log({ studentId: activeStudent.id, questionId: choosenQuestion, assessmentId: rate, comment: comment, recommendation: recommendation });
        const postUrl = API_BASE_URL + "/api/answer";
        fetch(postUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ studentId: activeStudent.id, questionId: choosenQuestion, assessmentId: rate, comment: comment, recommendation: recommendation })
        })
            .then(res => res.json())
            .then(data => {
                setDialogOpen(false);
                console.log(data);
                if (data.status === "success") {

                    setComment("");
                    setRecommendation("");
                    setSnackOpened('success');
                }
                else {
                    setSnackOpened('error');
                }
            });
    }
    useEffect(() => {
        const countAssesments = (assessmentId) => activeStudent ? activeStudent.answers.filter(answer => answer.assessment_id === assessmentId).length : 0;
        setStudentStatistics({ accomplished: countAssesments(3), partially: countAssesments(2), unaccomplished: countAssesments(1) });
    }, [activeStudent]);
    const handleChange = (e) => setChoosenQuestion(e.target.value);

    const getAssessmentColor = (outcome) => {

        if (activeStudent && activeStudent.answers) {
            const matchingAnswer = activeStudent.answers.find(answer => answer.question.outcomes[0].pivot.outcome_id === outcome.id);

            if (matchingAnswer) {
                switch (matchingAnswer.assessment_id) {
                    case 3:
                        //return '#68b586';
                        return '#d9ece0';
                    case 2:
                        //return '#ffcc29';
                        return '#fef2c9';
                    case 1:
                        //return '#ff8f4d';
                        return '#fee3d2';
                    default:
                        //return '#4b5052';
                        return '#ffffff';
                }
            }
        }

        return '#ffffff';
    }

    return (
        <Container sx={{ minWidth: 275 }}>
            <Snackbar open={snackOpened?true:false} autoHideDuration={6000} onClose={() => setSnackOpened(false)}>
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
                    <Button variant='contained' size='small' color='success' onClick={() => saveAnswer()}><CloudUploadIcon className='mr-2' fontSize='small' /> Потврди</Button>
                </DialogActions>
            </Dialog>


            <Card className='p-5 mt-5 mb-5'>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Исход:
                        </Typography>
                <Typography sx={{ fontSize: 16, backgroundColor: getAssessmentColor(activeOutcome), display:'inline' }} gutterBottom>
                    Ученик/ученица је у стању да {activeOutcome ? activeOutcome.description : ""}
                </Typography>
                <Accordion key={1} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Предложена питања:
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {activeOutcome && activeOutcome.questions.length > 0
                            ?
                            <RadioGroup
                                value={choosenQuestion}
                                name="radio-buttons-group"
                                onChange={handleChange}
                            >
                                {activeOutcome.questions.map((question, index) =>
                                    <FormControlLabel key={index} value={question.pivot.question_id} control={<Radio />} label={<Typography sx={{ fontSize: 14 }}>{question.description}</Typography>} />)}

                            </RadioGroup>

                            : ""}
                    </AccordionDetails>
                </Accordion>


            </Card>

            <Card className='p-5 mt-5 mb-5' sx={{ borderLeft: '4px solid ' + (getAssessmentColor(activeOutcome) === '#ffffff' ? '#4b5052' : getAssessmentColor(activeOutcome)) }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ученик:
                </Typography>
                <Typography sx={{ fontSize: 18 }}>{activeStudent ? activeStudent.first_name + " " + activeStudent.last_name : ""}</Typography>
                {activeStudent ? (<PieChart tooltip={{ trigger: 'none' }}

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
            <Accordion key={1} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Коментар:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField value={comment} onChange={(e) => setComment(e.target.value)} multiline rows={2} fullWidth id="new-comment-textfield" label="Текст коментара" variant="outlined" />

                </AccordionDetails>
            </Accordion>
            <Accordion key={2} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Препорука:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField value={recommendation} onChange={(e) => setRecommendation(e.target.value)} multiline rows={2} fullWidth id="new-recommendation-textfield" label="Текст препоруке" variant="outlined" />

                </AccordionDetails>
            </Accordion>

            <Box className='flex justify-end pt-10 gap-1'>
                <FPrimaryButton startIcon={<GradeIcon sx={{ color: '#ff8f4d' }} />} onClick={() => { setRate(1); setDialogOpen(true) }} variant='outlined' >Лоше</FPrimaryButton>
                <FPrimaryButton startIcon={<GradeIcon sx={{ color: '#ffcc29' }} />} onClick={() => { setRate(2); setDialogOpen(true) }} variant='outlined' >Делимично</FPrimaryButton>
                <FPrimaryButton startIcon={<GradeIcon sx={{ color: '#68b586' }} />} onClick={() => { setRate(3); setDialogOpen(true) }} variant='outlined' >Добро</FPrimaryButton>



            </Box>


        </Container>



    )
}

export default MainStage;