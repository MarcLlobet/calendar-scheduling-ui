import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

import { handleModal, bookSlot } from '../../actions'
import { LONG_DATE } from '../../constants'

function ConfirmationModal({
  appointment,
  isModalOpen,
  modalInfo,
  bookSlot,
  handleModal
}) {
  const classes = useStyles()

  return (
    <Dialog
      className={classes.dialog}
      onClose={() => handleModal()}
      aria-labelledby="customized-dialog-title"
      open={!!isModalOpen}
    >
      <DialogTitle id="customized-dialog-title" onClose={() => handleModal()}>
        Por favor, confirma la nueva fecha
        <IconButton aria-label="close" className={classes.closeButton} onClick={() => handleModal()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <ListItem>
          <ListItemText
            className={classes.listItemText}
            primary="Cita original"
            secondary={moment(appointment).format(LONG_DATE)}
            secondaryTypographyProps={{ component: 's' }}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            className={classes.listItemText}
            primary="Nueva fecha"
            secondary={modalInfo && moment(modalInfo.Start).format(LONG_DATE)}
          />
        </ListItem>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => handleModal()}
        >
          Cancelar
        </Button>
        <Button
          className={classes.confirmButton}
          variant="contained"
          onClick={() => bookSlot(modalInfo)}
        >
          Confirmar cita
        </Button>
      </DialogActions>
    </Dialog>
  )
}


const mapStateToProps = ({
  appointment,
  isModalOpen,
  modalInfo
}) => ({
  appointment,
  isModalOpen,
  modalInfo
})

const mapDispatchToProps = {
  handleModal,
  bookSlot
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal)

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& .MuiDialog-paper': {
      minWidth: 400
    }
  },
  confirmButton: {
    color: 'white',
    backgroundColor: green[700]
  },
  listItemText: {
    '& .MuiListItemText-primary': {
      color: grey[500]
    },
    '& .MuiListItemText-secondary': {
      color: 'black'
    }
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: grey[500],
  },
}))