import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
//  const top = 50 + rand();
//  const left = 50 + rand();
    const top = 50;
    const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {

  render() {
    const { classes } = this.props;
    const { clickOk, clickCancel, title, body, open} = this.props;

    return (
      <div>
        <Modal
          open={open}
          onClose={clickCancel}
          disableEscapeKeyDown={true}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
                {title}
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
                {body}
            </Typography>
            <Button variant="contained" color="primary" onClick={clickOk}>OK</Button>
            <Button onClick={clickCancel}>Cancel</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
  clickOk: PropTypes.func.isRequired,
  clickCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
