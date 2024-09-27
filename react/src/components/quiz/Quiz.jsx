import { useEffect, useState } from "react";
import MultipleChoice from "./MultipleChoice";
import { AppBar, Toolbar, Box } from '@mui/material';
function Quiz() {
    const apiSource = "/quiz.json";
    useEffect(() => {
        fetch(apiSource, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
            });
        console.log("OK")
    }, []);
    const [questions, setQuestions] = useState([]);
    return <Box>
        <AppBar position="fixed" sx={{ backgroundColor: '#4b5052' }} className='p-2' >
            <Toolbar sx={{ gap: 1 }}> Formativo Test
            </Toolbar>
        </AppBar>
        {questions.map((question,index)=><MultipleChoice  question={question} key={index}>{question.text}</MultipleChoice>)}
    </Box>
}

export default Quiz;