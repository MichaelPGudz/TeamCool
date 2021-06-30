import React from "react";
import Button from "@material-ui/core/Button";
import {AddCircle} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

const useStyles = makeStyles(() => ({}))


export default function AddFeature({}) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleAddBtnClick = () => {
        setOpenDialog(true)
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                size={'large'}
                endIcon={<AddCircle/>}
                onClick={handleAddBtnClick}
            >
                Add feature
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby={"add-feature-form"}>
                <DialogTitle id={"add-feature-form"}>Add feature</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        TEST TEST TEST TEST TEST TEST
                        TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST
                        TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST
                        TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST
                        TEST TEST TEST TEST TEST TESTTEST TEST TEST TEST TEST TEST
                        TEST TEST TEST TEST TEST TEST
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                            variant="contained">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}