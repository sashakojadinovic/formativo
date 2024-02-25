import { Button } from "@mui/material";
import { styled } from '@mui/system';
const FPrimaryButton = styled(Button)({
    backgroundColor: '#455a64 ',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: "#263238",
      },

});

export default FPrimaryButton;
