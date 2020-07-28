import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import './styles.scss';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { wordActions } from '../../redux/actions/words.actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  contained: {
    width: 100,
  },
}));

function WordForm(props) {
  const {
    onCloseModal,
    createWord,
    word = {},
    action,
    wordId = null,
    filters,
  } = props;
  const { topicDtoList, levelDtoList } = filters;

  console.log('word', word);

  console.log(word ? word.vocabulary : 'hello');

  const [vocab, setVocab] = useState('');
  const [spelling, setSpelling] = useState('');
  const [translate, setTranslate] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [topic, setTopic] = useState(null);
  const [level, setLevel] = useState(null);
  const classes = useStyles();
  const handleSubmit = () => {
    createWord({
      vocabulary: vocab,
      spell: spelling,
      translateVi: translate,
      levelId: level,
      topicId: topic,
      image: imageLink,
    });
    onCloseModal();
  };

  const handleOnChangeVocab = (event) => {
    setVocab(event.target.value);
  };

  const handleOnChangeSpelling = (event) => {
    setSpelling(event.target.value);
  };

  const handleOnChangeTranslate = (event) => {
    setTranslate(event.target.value);
  };

  const handleOnChangeImage = (event) => {
    setImageLink(event.target.value);
  };

  const handleChangeTopic = (event) => {
    setTopic(event.target.value);
  };
  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };
  return (
    <div className='form-container'>
      <div className='form-title'>ADD NEW WORD</div>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          required
          id='txt-word'
          label='Word'
          onChange={handleOnChangeVocab}
          defaultValue={word ? word.vocabulary : ''}
        />
        <TextField
          required
          id='txt-spelling'
          label='Spelling'
          onChange={handleOnChangeSpelling}
          defaultValue={word ? word.spell : ''}
        />
        <TextField
          required
          id='txt-translate'
          label='Translate'
          onChange={handleOnChangeTranslate}
          defaultValue={word ? word.translateVi : ''}
        />
        <TextField
          required
          id='txt-image'
          label='Image link'
          onChange={handleOnChangeImage}
          defaultValue={word ? word.image : ''}
        />
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
        <div className='button-container'>
          <Button
            classes={{
              contained: classes.contained,
            }}
            variant='contained'
            color='primary'
            onClick={() => handleSubmit()}
          >
            Add
          </Button>
          <Button
            classes={{
              contained: classes.contained,
            }}
            variant='contained'
            onClick={onCloseModal}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filters: state.wordReducers.filters,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...dispatch,
    createWord: (params) => dispatch(wordActions.createWordRequest(params)),
  };
};

WordForm.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(WordForm);
