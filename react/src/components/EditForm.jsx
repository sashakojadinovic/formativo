import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { useContext, useEffect, useState } from "react";
import { BookAdminContext } from "../contexts/BookAdminContext";
import { API_BASE_URL } from './apiUrls';
import { json } from "react-router-dom";
const EditForm = () => {
    const [dataToSave, setDataToSave] = useState("");
    const {editFormOpen, setEditFormOpen, editFormSettings, refresh, doRefresh} = useContext(BookAdminContext);

    const saveSubject = () => {
        fetch(API_BASE_URL+ "/api/subject",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify({subjectTitle:dataToSave})
        })
        .then(res => res.json())
        .then(data=>{
            setEditFormOpen(false);
            doRefresh(!refresh);
        });
    }
    return (<Dialog maxWidth="md" fullWidth open={editFormOpen}>
    <DialogTitle>{editFormSettings.title}</DialogTitle>
    <DialogContent>
        <TextField value={dataToSave} onChange={(e) => setDataToSave(e.target.value)} multiline rows={2} fullWidth id="new-outcome-textfield" label="Назив предмета" variant="outlined" />

    </DialogContent>
    <DialogActions>
        <Button onClick={() => setEditFormOpen(false)} size='small' color='warning' variant='contained'><CloudOffIcon className='mr-2' fontSize='small' />  Поништи</Button>
        <Button  onClick={saveSubject} size='small' color='info' variant='contained'><CloudUploadIcon className='mr-2' fontSize='small' /> Сачувај</Button>
    </DialogActions>
</Dialog>);
}


export default EditForm;