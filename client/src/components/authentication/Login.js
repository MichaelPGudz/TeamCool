import React from "react";
import Button from "@material-ui/core/Button";
import {Grid, TextField} from "@material-ui/core";
import {UserContext} from "../Store/Store";
import Alert from '@material-ui/lab/Alert';


export default function Login() {

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [state, dispatch] = React.useContext(UserContext);
    const [wrongLogin, setWrongLogin] = React.useState(false);


    const handleWrongLogin = () => {
        setWrongLogin(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {email: email, password: password};
        Login(user)
    }


    const Login = (user) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        };
        fetch(`https://localhost:5001/api/authenticate/login`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Invalida Data")
                }
                return response.json()
            })
            .then(data => {
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('id', data.id);
                dispatch({type: 'SET_ROLE', payload: data.globalRole});
            })
            .catch((error) => {
                console.log(error);
                handleWrongLogin()
            })
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container
                      spacing={2}
                      direction={"column"}
                      alignItems="center"
                >
                    {wrongLogin ?
                        <Alert severity="error">Wrong data, try again!<br/></Alert> : null}
                    <Grid item>
                        <TextField
                            id={'email'}
                            label={'E-mail'}
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            variant={'outlined'}/>
                    </Grid>
                    <Grid item>
                        <TextField
                            id={'password'}
                            label={'Password'}
                            type={'password'}
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                            variant={'outlined'}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            type={'submit'}
                            size={'large'}>
                            Login!
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}