import React from "react";
import Button from "@material-ui/core/Button";
import { AddCircle } from "@material-ui/icons";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';



export default function Register() {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [wrongRegister, setWrongRegister] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState();

    const handleOpen = () => {
        setWrongRegister(false)
        setOpenDialog(true)
    }

    const handleWrongRegister = (message) => {
        setWrongRegister(true)
        setOpenDialog(true)
        setErrorMessage(message)
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {firstName: firstName, lastName: lastName, email: email, password: password};
        RegisterUser(newUser);
    }


    const RegisterUser = (newUser) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        };
        fetch(`https://localhost:5001/api/authenticate/register`, requestOptions)
        .then(response => {
            if (response.status === 400) {throw new Error('All fields are required in correct format')};
            if (response.status === 500) {throw new Error('User already exists!')}
            if (response.status === 406) {throw new Error('Password needs min. 8 signs with capital letters and specials')}
            return response.json()
        })
        .catch((error) => {console.log(error); handleWrongRegister(error.message)});
    }

    return (
        <div>
            <Button
                variant="contained"
                size={'large'}
                endIcon={<AddCircle />}
                onClick={handleOpen}
            >
                Register
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"register-form"}>
                <DialogTitle id={"register-form"}>Register new user</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2} direction={"column"}>
                        {wrongRegister ?
                                <Alert severity="error">{errorMessage}</Alert> : null}
                            <Grid item>
                                <TextField
                                    id={'firstName'}
                                    label={'First Name'}
                                    onChange={e => setFirstName(e.target.value)}
                                    fullWidth
                                    variant={'outlined'} />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id={'lastName'}
                                    label={'Last Name'}
                                    onChange={e => setLastName(e.target.value)}
                                    fullWidth
                                    variant={'outlined'} />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id={'email'}
                                    label={'E-mail'}
                                    onChange={e => setEmail(e.target.value)}
                                    fullWidth
                                    variant={'outlined'} />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id={'password'}
                                    label={'Password'}
                                    type={'password'}
                                    onChange={e => setPassword(e.target.value)}
                                    fullWidth
                                    variant={'outlined'} />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}
                            variant="contained"
                            type={'submit'}
                            size={'large'}>
                            Register!
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}