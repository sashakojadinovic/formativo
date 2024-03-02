import { Button } from "@mui/material";
import { styled } from '@mui/system';
const FPrimaryButton = styled(Button)({
    backgroundColor: '#ffffff',
    color: '#37474f',
    borderColor: '#9cb2bd',
    textTransform: 'capitalize',
    '&:hover': {
        backgroundColor: 'transparent',
        borderColor: '#78909c'
    }
});

export default FPrimaryButton;
