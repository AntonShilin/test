import React, { Component } from 'react';
import './ResultButton.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { f7, f6, f8, f9 } from '../../Action/Actions';

class ResultButton extends Component {
  componentDidMount() {
    this.props.data.allQuestions[5].resultUserAnswer.splice(0, 5);
    let arr = this.props.data.allQuestions;
    for (let i = 0; i < arr.length - 1; i++) {
      if (typeof arr[i].userAnswer === 'string') {
        arr[i].userAnswer = '';
      } else if (typeof arr[i].userAnswer === 'object') {
        arr[i].userAnswer = [];
      }
    }
    this.props.data.allQuestions[5].yes = 0;
    this.props.data.allQuestions[5].no = 0;
  }
  render() {
    return (
      <React.Fragment>
        <div className='bg_modalwindow hide'>
          <div className='modalwindow p-4 shadow'>
            <h6 className='mt-5 mb-5'>
              'Каждый не отвеченный ответ считается неправильным, Вы уверены что
              хотите продолжить?
            </h6>
            <div className='d-flex justify-content-around'>
              <button
                className='btn btn-danger btn-lg'
                onClick={() => this.props.agree(this.props.data, this.props)}
              >
                Да
              </button>
              <button
                className='btn btn-success btn-lg'
                onClick={() => this.props.disagree(this.props.data, this.props)}
              >
                Нет
              </button>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-around'>
          <button
            className='btn btn-primary btn-lg'
            onClick={() => this.props.answer(this.props.data, this.props)}
          >
            Ответить
          </button>
          <button
            className='btn btn-danger btn-lg'
            onClick={() => this.props.clear(this.props.data)}
          >
            Очистить поля
          </button>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    answer: (value, routestate) => dispatch(f6(value, routestate)),
    clear: value => dispatch(f7(value)),
    agree: (value, routestate) => dispatch(f8(value, routestate)),
    disagree: (value, routestate) => dispatch(f9(value, routestate))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResultButton)
);
