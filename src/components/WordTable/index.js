import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt,
  faTimesCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import './styles.scss';
import { useState } from 'react';
import { makeStyles, TableFooter, TablePagination } from '@material-ui/core';
import { wordActions } from '../../redux/actions/words.actions';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#5b62b3',
    fontWeight: 'bold',
  },
}));
function WordTable(props) {
  const {
    words = {},
    onOpenModal,
    onSelectWord,
    getAllWords,
    topic = null,
    level = null,
    deleteWord,
  } = props;
  const classes = useStyles();
  const { content = [], totalElements } = words;
  const [page, setPage] = useState(0);

  const handleClickEdit = (id) => {
    onOpenModal('edit');
    onSelectWord(id);
  };

  const handleDeleteWord = (id) => {
    deleteWord(id);
    handleCloseDelete();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickDelete = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDelete = () => {
    setAnchorEl(null);
  };

  const handleChangePage = async (event, newPage) => {
    await setPage(newPage);
    await getAllWords({
      page: page,
      size: 10,
      topicId: topic,
      levelId: level,
    });
  };

  const isOpen = Boolean(anchorEl);
  return (
    <TableContainer component={Paper}>
      <Table className='table'>
        <TableHead>
          <TableRow>
            <TableCell
              classes={{
                root: classes.root,
              }}
            >
              No
            </TableCell>
            <TableCell
              classes={{
                root: classes.root,
              }}
            >
              Word
            </TableCell>
            <TableCell
              classes={{
                root: classes.root,
              }}
            >
              Spelling
            </TableCell>
            <TableCell
              classes={{
                root: classes.root,
              }}
            >
              Translate
            </TableCell>
            <TableCell
              classes={{
                root: classes.root,
              }}
            >
              Topic of word
            </TableCell>
            <TableCell
              classes={{
                root: classes.root,
              }}
            >
              Level of word
            </TableCell>
            <TableCell
              classes={{
                root: classes.root,
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((word) => {
            return (
              <TableRow key={word.id}>
                <TableCell>{word.id}</TableCell>
                <TableCell>{word.vocabulary}</TableCell>
                <TableCell>{word.spell}</TableCell>
                <TableCell>{word.translateVi}</TableCell>
                <TableCell>{word.topicOfWord.name}</TableCell>
                <TableCell>{word.levelOfWord.name}</TableCell>
                <TableCell>
                  <FontAwesomeIcon
                    className='table-icon'
                    icon={faEdit}
                    color={'#4a83f2'}
                    onClick={() => handleClickEdit(word.id)}
                  />
                  <FontAwesomeIcon
                    className='table-icon'
                    icon={faTrashAlt}
                    color={'#eb002b'}
                    onClick={(event) => handleClickDelete(event)}
                  />
                  <Popover
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={isOpen}
                    anchorEl={anchorEl}
                    onClose={handleCloseDelete}
                  >
                    Are you sure to delete this item?
                    <FontAwesomeIcon
                      className='table-icon'
                      icon={faTimesCircle}
                      color={'#eb002b'}
                      onClick={() => handleCloseDelete()}
                    />
                    <FontAwesomeIcon
                      className='table-icon'
                      icon={faCheckCircle}
                      color={'#48C690'}
                      onClick={() => handleDeleteWord(word.id)}
                    />
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              page={page}
              onChangePage={handleChangePage}
              count={totalElements}
              rowsPerPage={10}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     words: state.wordReducers.words,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    ...dispatch,
    getAllWords: (params) => dispatch(wordActions.getAllWordsRequest(params)),
    deleteWord: (id) => dispatch(wordActions.deleteWordRequest(id)),
  };
};

WordTable.propTypes = {
  children: PropTypes.array,
  getBank: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(WordTable);
