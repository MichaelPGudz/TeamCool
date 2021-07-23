import React from "react";
import Button from "@material-ui/core/Button";
import {Grid, Paper, Snackbar, TextField} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';


export default function Register({setOptionLogin, setSuccessfulRegister}) {

    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [wrongRegister, setWrongRegister] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState();



    const handleWrongRegister = (message) => {
        setWrongRegister(true)
        setErrorMessage(message)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {firstName: firstName, lastName: lastName, email: email, password: password};
        RegisterUser(newUser);
    }



    const RegisterUser = (newUser) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        };
        fetch(`https://localhost:5001/api/authenticate/register`, requestOptions)
            .then(response => {
                if (response.status === 400) {
                    throw new Error('All fields are required in correct format')
                }
                if (response.status === 500) {
                    throw new Error('User already exists!')
                }
                if (response.status === 406) {
                    throw new Error('Password needs min. 8 signs with capital letters and specials')
                }
                return response.json()
            })
            .then((data) => {
                    console.log(data);
                    setSuccessfulRegister(true);
                    setOptionLogin(true);
                }
            )
            .catch((error) => {
                console.log(error);
                handleWrongRegister(error.message)
            });
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <Grid container
                      spacing={2}
                      direction={"column"}
                      alignItems="center">
                    {wrongRegister ?
                        <Alert severity="error">{errorMessage}</Alert> : null}
                    <Grid item>
                        <Paper>
                        <TextField
                            id={'firstName'}
                            label={'First Name'}
                            onChange={e => setFirstName(e.target.value)}
                            fullWidth
                            variant={'outlined'}/>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper>
                        <TextField
                            id={'lastName'}
                            label={'Last Name'}
                            onChange={e => setLastName(e.target.value)}
                            fullWidth
                            variant={'outlined'}/>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper>
                        <TextField
                            id={'email'}
                            label={'E-mail'}
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            variant={'outlined'}/>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper>
                        <TextField
                            id={'password'}
                            label={'Password'}
                            type={'password'}
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            variant={'outlined'}/>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            type={'submit'}
                            size={'large'}>
                            Register!
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}