import React from 'react';
import { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 25
    },
    body: {
        fontSize: 20,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

const UserPage = (props) => {

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedUser, setLoadedUser] = useState([]);
    const [loadedSkills, setLoadedSkills] = useState([]);

    useEffect(() => {
        fetch(`https://localhost:5001/api/user/${props.id}`)
            .then(reponse => reponse.json())
            .then(data => {
                setIsLoading(false);
                setLoadedUser(data);
                setLoadedSkills(data.mySkills);
            });
    }, [props]);


    function createData(name, property) {
        return {name, property};
    }
    
    const rows = [
        createData("Your id", loadedUser.id),
        createData("Your name", loadedUser.firstName),
        createData("Your lastname", loadedUser.lastName),
        createData("Your e-mail", loadedUser.email)
    ];

    return (
        <div>
            {console.log(loadedUser)}
            
            <Typography variant="h3">
                User Page
            </Typography>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <StyledTableRow>
                        <StyledTableCell>Your user data</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.property}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <List>
                <React.Fragment key={loadedUser.id}>
                    <ListItem>
                        {loadedSkills.map(({ id, firstName }) =>
                            <React.Fragment key={id}>
                                <ListItem>
                                    <Typography variant="h5">
                                        {firstName}
                                    </Typography>
                                </ListItem>
                            </React.Fragment>
                        )}
                    </ListItem>
                </React.Fragment>
            </List>
        </div>
    )
}


export default UserPage;