import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

function getModalStyle() {
    const top = 20;
    const left = 20;

    return {
        top: `${top}%`,
        left: `${left}%`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '60%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    button: {
        margin: "1%"
    }
}));

export default function SimpleModal(props) {
    useEffect(() => {
        fetch(`https://localhost:5001/api/skill/${props.id}/users`)
            .then(reponse => reponse.json())
            .then(data => {
                setIsLoading(false);
                setLoadedUsers(data);
            });
    }, [props]);

    const [isLoading, setIsLoading] = useState(true);
    const [loadedUsers, setLoadedUsers] = useState([]);



    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Users below have the same skill</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {loadedUsers.map(({ id, firstName, lastName, email }) => (
                        <TableRow key={id}>
                                <TableCell>
                                    {firstName}
                                </TableCell>
                                <TableCell>
                                    {lastName}
                                </TableCell>
                                <TableCell>
                                    {email}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={handleClose}>
                                        <Link to ={`/user/${id}`} >
                                            Go to profile
                                        </Link>
                                    </Button>
                                </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button className={classes.button} variant="contained" color="secondary" onClick={handleClose}>
                Close
            </Button>
        </div>
    );

    return (
        <div>
            <Button className={classes.button} variant="contained" color="secondary" onClick={handleOpen}>
                {props.skillName}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}