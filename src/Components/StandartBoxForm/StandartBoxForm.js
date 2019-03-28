import React, { Component } from "react";
import { connect } from "react-redux";
import { f5 } from "../../Action/Actions";
import '../StandartBoxForm/StandartBoxForm.scss'

class StandartBoxForm extends Component {
  render() {
    return (
      <div className="card p-3 alert-warning shadow text-dark">
        <h6 className="pb-3">
          <span>{`${this.props.data.num}. `}</span>
          {this.props.data.question}
        </h6>
          {this.props.data.answer.map((value, i) => (
            <p key={i} onClick={(event) => this.props.toElect(value,event.target)}>
              {value}
            </p>
          ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      data: state.allQuestions[4]
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      toElect: (value,tag) =>
        dispatch(f5(value,tag))
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(StandartBoxForm);
