import { useEffect, useState } from "react";
import GridEdit from "./GridEdit";
import { AppBar, Toolbar, Container, Box, SpeedDial, SpeedDialIcon, SpeedDialAction, Stack, Grid } from '@mui/material';

import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import GridOnIcon from '@mui/icons-material/GridOn';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MultilleChoice from "./MultipleChoice";
import MultipleChoiceEdit from "./MultipleChoiceEdit";
const actions = [
    { icon: <LibraryAddCheckIcon />, name: 'Multiple Choice' },
    { icon: <RadioButtonCheckedIcon />, name: 'Single Choice' },
    { icon: <GridOnIcon />, name: 'Grid Question' },
    { icon: <BorderColorIcon />, name: 'Short Answer' },

];
function QuizCreate() {
    const [questions, setQuestions] = useState([]);
    const handleClick = (key) => {
        switch (key) {
            case "Grid Question":
                setQuestions([...questions, { type: key, text: "Grid Question text" }]);
                break;
            case "Multiple Choice":
                setQuestions([...questions, { type: key, text: "Multiple Choice Question text" }]);
                break;
        }

    };
    return <Box>
        <AppBar position="static" sx={{ backgroundColor: '#4b5052' }} className='p-2' >
            <Toolbar sx={{ gap: 1 }}> Formativo Test
            </Toolbar>
        </AppBar>
        <Container className="mt-20 pt-10">
            <Stack>
                {questions.map((question, index) => {
                    switch (question.type) {
                        case "Multiple Choice":
                            return <MultipleChoiceEdit key={index} />;
                        case "Grid Question":
                            return <GridEdit key={index} />;

                        default:
                            return <MultipleChoiceEdit key={index} />;
                    }

                })}
            </Stack>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleClick(action.name)}
                    />
                ))}
            </SpeedDial>
        </Container>

    </Box>
}

export default QuizCreate;