import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/icons';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';

export default function AddFeature({ updateFeatures, features, teamId }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [name, setName] = React.useState();
  const [url, setUrl] = React.useState();

  const handleAddBtnClick = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newFeature = { name: name, url: getValidUrl(url), type: 'feature' };
    addFeature(newFeature);
  };

  const getValidUrl = (newUrl = '') => {
    newUrl = newUrl.trim().replace(/\s/g, '');

    if (/^(:\/\/)/.test(newUrl)) {
      return `https${newUrl}`;
    }
    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
      return `https://${newUrl}`;
    }
    return newUrl;
  };

  const addFeature = newFeature => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify(newFeature),
    };
    fetch(
      `https://localhost:5001/api/team/${teamId}/addFeature`,
      requestOptions
    )
      .then(response => response.json())
      .then(data => updateFeatures([...features, data]));
  };

  return (
    <div>
      <Button
        variant="contained"
        size={'large'}
        endIcon={<Link />}
        onClick={handleAddBtnClick}
      >
        Add Feature
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby={'add-feature-form'}
      >
        <DialogTitle id={'add-feature-form'}>Add Feature</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2} direction={'column'}>
              <Grid item>
                <TextField
                  id={'name'}
                  label={'Name'}
                  onChange={e => setName(e.target.value)}
                  fullWidth
                  variant={'outlined'}
                />
              </Grid>
              <Grid item>
                <TextField
                  id={'url'}
                  label={'Url'}
                  onChange={e => setUrl(e.target.value)}
                  fullWidth
                  variant={'outlined'}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="contained"
              type={'button'}
              size={'large'}
            >
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              type={'submit'}
              size={'large'}
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
