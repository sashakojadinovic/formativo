import { Button } from "@mui/material"
import { styled } from "@mui/system";
import { Badge as BaseBadge, badgeClasses } from '@mui/base/Badge';
import { useState } from "react";

const StudentStageBadge = (props) => {
const [score, setScore] = useState(0);

    if (score > 0) {
        return (
            <Badge badgeContent={score} >
                <Button sx={{textTransform:'capitalize', lineHeight:'1.25rem'}} onClick={()=>{props.onClick(); console.log(score); setScore(score+1)}} color={props.color} size='normal' fullWidth variant='contained' >{props.first_name}<br />{props.last_name}</Button>
            </Badge>)
    }
    else {
        return (
            <Button sx={{textTransform:'capitalize', lineHeight:'1.25rem'}}  onClick={()=>{props.onClick(); console.log(score); setScore(score+1)}}  color={props.color} size='normal' fullWidth variant='contained' >{props.first_name}<br />{props.last_name}</Button>)

    }
}
const blue = {
    500: '#007FFF',
   
};
const orange = {
    500: '#ed6c02'
}

const Badge = styled(BaseBadge)(
    ({ theme }) => `
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-variant: tabular-nums;
    list-style: none;
    font-family: 'IBM Plex Sans', sans-serif;
    position: relative;
    display: inline-block;
    line-height: 1;
  
    & .${badgeClasses.badge} {
      z-index: 10;
      position: absolute;
      top: 0;
      right: 0;
      min-width: 25px;
      height: 25px;
      padding: 0 6px;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      white-space: nowrap;
      text-align: center;
      border-radius: 12px;
      background: ${orange[500]}; 
      transform: translate(33%, -33%);
      transform-origin: 100% 0;
    }
    `,
);

export default StudentStageBadge;