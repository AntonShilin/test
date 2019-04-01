import React, { Component } from 'react';
import { connect } from 'react-redux';
import { f1 } from '../../Action/Actions';

class SelectForm extends Component {
    render() {
    return (
      <div className='card p-3 alert-warning shadow text-dark'>
         <h6 className='pb-3'>
          <span>{`${this.props.data.num}. `}</span>
          {this.props.data.question}
        </h6>
        <form>
          <div className='form-group'>
            <label htmlFor='answ'>Выберите правильный ответ:</label>
            <select
              className='form-control'
              id='answ'
              onChange={event => this.props.handleChange(event.target.value)}
            >
              <option />
              {this.props.data.answer.map((value, i) => (
                <option key={i} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </form> 
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.allQuestions[0],
    x: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange: event => dispatch(f1(event))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectForm);
