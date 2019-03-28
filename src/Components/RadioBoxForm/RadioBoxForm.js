import React, { Component } from "react";
import { connect } from "react-redux";
import { f3 } from "../../Action/Actions";


class RadioBoxForm extends Component {
  render() {
    return (
      <div className="card p-3 alert-danger shadow text-dark">
        <h6 className="pb-3">
          <span>{`${this.props.data.num}. `}</span>
          {this.props.data.question}
        </h6>
          <form>
            {this.props.data.answer.map((value, i) => (
              <div className="form-check" key={i}>
                <label className="form-check-label" htmlFor={value}>
                  <input
                    type="radio"
                    className="form-check-input"
                    id={value}
                    name="optradio"
                    value={value}
                    onChange={event => this.props.handleChange(event.target.value)}
                  />
                  {value}
                </label>
              </div>
            ))}
          </form>
      </div>
    );
  }
}


function mapStateToProps(state) {
    return {
      data: state.allQuestions[2]
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      handleChange: value =>
        dispatch(f3(value))
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RadioBoxForm);
