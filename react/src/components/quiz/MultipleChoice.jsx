import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
function MultilleChoice(param) {
    return <div className='p-5'>
        <h2 className='text-xl'>{param.question.text}</h2>
        <FormGroup>
            {param.question.answers.map((answer, index)=><FormControlLabel key={index} control={<Checkbox  />} label={answer} />)}
            
        </FormGroup>
    </div>
}

export default MultilleChoice;