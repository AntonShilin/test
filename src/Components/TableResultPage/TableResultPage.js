import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../TableResultPage/TableResultPage.scss';
import { f10 } from '../../Action/Actions';

class TableResultPage extends Component {
  render() {
    let defaultAnswers = this.props.data[5].defaultAnswers;
    let userAnswers = this.props.data[5].resultUserAnswer;
    let { yes, no } = this.props.data[5];
    return (
      <div className='container'>
        <div className='row'>
          <table className='table table-bordered mt-5 table-responsive-md table-hover'>
            <thead className='thead-dark'>
              <tr>
                <th>№</th>
                <th>Правильный ответ</th>
                <th>Ваш ответ</th>
                <th>Результат</th>
              </tr>
            </thead>
            <tbody>
              {defaultAnswers.map((elem, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{elem}</td>
                  <td>
                    {Object.entries(userAnswers).length > 0
                      ? ` ${userAnswers[i]} `
                      : 'Нет ответа'}
                  </td>
                  <td>
                    {elem === userAnswers[i] ? 'Правильно' : 'Неправильно'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {yes > 0 || no > 0 ? (
          <React.Fragment>
            <div className='row mt-5 mb-5'>
              <div className='col'>
                <button
                  className='btn btn-primary d-block mx-auto'
                  onClick={() => this.props.showChart(this.props.data[5])}
                >
                  Построить диаграмму результатов
                </button>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div id='chart' />
              </div>
            </div>
          </React.Fragment>
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.allQuestions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showChart: value => dispatch(f10(value))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableResultPage);
