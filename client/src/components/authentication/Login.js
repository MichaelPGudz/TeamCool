import React from "react";
import Button from "@material-ui/core/Button";
import { AddCircle } from "@material-ui/icons";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";
import {UserContext} from "../../components/Store/Store";




export default function Login() {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [state, dispatch] = React.useContext(UserContext);

    const handleOpen = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = { email: email, password: password };
        Login(user)
    }


    const Login = (user) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch(`https://localhost:5001/api/authenticate/login`, requestOptions)
            .then(response => response.json())
            .then(data => {
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('id', data.id);
                dispatch({type: 'SET_ROLE', payload: data.globalRole});
            })
            .then(console.log(state))
    }


    return (
        <div>
            {window.localStorage.getItem('lastName')}
            <Button
                variant="contained"
                size={'large'}
                endIcon={<AddCircle />}
                onClick={handleOpen}
            >
                Login
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"login-form"}>
                <DialogTitle id={"login-form"}>Login</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2} direction={"column"}>
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
                            Login!
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}