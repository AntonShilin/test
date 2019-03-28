import React, { Component } from 'react';
import { connect } from "react-redux";
import { f4 } from "../../Action/Actions";


class TextInputForm extends Component {
    render() { 
        return ( <div className="card p-3 alert-info shadow text-dark">
        <h6 className="pb-3">
          <span>{`${this.props.data.num}. `}</span>
          {this.props.data.question}
        </h6>
          <form>
            {this.props.data.answer.map((value, i) => (
              <span key={i} value={value} className="mr-5">
                {value}
              </span>
            ))}
            <div className="form-group">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Введите правильный ответ из перечисленных выше"
                name="text1"
                onChange={event => this.props.handleChange(event.target.value)}
              />
            </div>
          </form>
      </div> );
    }
}
 
function mapStateToProps(state) {
    return {
      data: state.allQuestions[3]
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      handleChange: value =>
        dispatch(f4(value))
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TextInputForm);