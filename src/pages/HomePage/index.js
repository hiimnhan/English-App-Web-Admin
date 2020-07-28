import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Carousel from '../../components/Carousel';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { wordActions } from '../../redux/actions/words.actions';
import { connect } from 'react-redux';
import { useState } from 'react';

import './styles.scss';
import { makeStyles, MenuItem } from '@material-ui/core';
import WordTable from '../../components/WordTable';

import WordForm from '../../components/WordForm';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ADD_ACTION = 'add';
const EDIT_ACTION = 'edit';

function HomePage(props) {
  const {
    words = {},
    getAllWords,
    getFilters,
    getWordDetail,
    filters = {},
    word = {},
  } = props;
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState('Words');
  const [topic, setTopic] = useState(null);
  const [level, setLevel] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [wordId, setWordId] = useState(null);

  console.log('wordiD', wordId);

  const { topicDtoList = [], levelDtoList = [] } = filters;

  const handleSelectWord = (id) => {
    setWordId(id);
  };

  const handleSelectedItem = (item) => setSelectedItem(item);

  const handleChangeTopic = (event) => {
    setTopic(event.target.value);
  };

  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getAllWords({
      page: 0,
      size: 10,
      topicId: topic,
      levelId: level,
    });
  }, [topic, level]);

  useEffect(() => {
    getFilters();
  }, []);

  useEffect(() => {
    if (wordId !== null) {
      getWordDetail(wordId);
    }
  }, [wordId]);

  return (
    <div className='homepage-container'>
      <Navbar onSelectedItem={handleSelectedItem} />
      <Carousel item={selectedItem} quantity={words.totalElements} />
      <div className='filter-container'>
        {selectedItem === 'Words' && (
          <div className='filter'>
            <FormControl className={classes.formControl}>
              <InputLabel id='select-label-topic'>Topic</InputLabel>
              <Select
                labelId='select-label-topic'
                id='select-topic'
                value={topic}
                onChange={handleChangeTopic}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                {topicDtoList.map((topic) => (
                  <MenuItem value={topic.id}>{topic.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id='select-label-level'>Level</InputLabel>
              <Select
                labelId='select-label-level'
                id='select-label'
                value={level}
                onChange={handleChangeLevel}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                {levelDtoList.map((level) => (
                  <MenuItem value={level.id}>{level.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
        <Button
          variant='contained'
          color='default'
          startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
          onClick={() => handleOpenModal()}
        >
          Add new
        </Button>
      </div>
      <div className='table-container'>
        {selectedItem === 'Words' ? (
          <WordTable
            words={words}
            topic={topic}
            level={level}
            onOpenModal={handleOpenModal}
            onSelectWord={handleSelectWord}
          />
        ) : null}
      </div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className={classes.modal}
      >
        <WordForm word={word} onCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    words: state.wordReducers.words,
    filters: state.wordReducers.filters,
    word: state.wordReducers.word,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...dispatch,
    getAllWords: (params) => dispatch(wordActions.getAllWordsRequest(params)),
    getFilters: () => dispatch(wordActions.getFiltersRequest()),
    getWordDetail: (id) => dispatch(wordActions.getWordDetailRequest(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
