import {
  ANSWER_1,
  ANSWER_2,
  ANSWER_3,
  ANSWER_4,
  ANSWER_5,
  YES,
  CLEAR_INPUTS,
  AGREE,
  DISAGREE,
  SHOW_CHART
} from "../Action/ActionsTypes";
import * as crossfilter from "crossfilter";
import * as dc from "dc";
import * as d3 from "d3";

export function f1(value) {
  return {
    type: ANSWER_1,
    payload: value
  };
}

export function f2(value) {
  return {
    type: ANSWER_2,
    payload: value
  };
}

export function f3(value) {
  return {
    type: ANSWER_3,
    payload: value
  };
}

export function f4(value) {
  return {
    type: ANSWER_4,
    payload: value
  };
}

export function f5(value,tag) {
  return {
    type: ANSWER_5,
      payload: value,
    tag: tag
  };
}

export function f6(value, page) {
  return {
    type: YES,
    payload: value,
    page: page
  };
}

export function f7(value) {
  return {
    type: CLEAR_INPUTS,
    payload: value
  };
}

export function f8(value, page) {
  return {
    type: AGREE,
    payload: value,
    page: page
  };
}

export function f9(value, page) {
  return {
    type: DISAGREE,
    payload: value,
    page: page
  };
}

export function f10(value) {
  return {
    type: SHOW_CHART,
    payload: value
  };
}

export function showWindow(value) {
  let x = document.querySelector(".bg_modalwindow");
  x.classList.remove("hide");
}

export function hideWindow(value) {
  let x = document.querySelector(".bg_modalwindow");
  x.classList.add("hide");
}

// построение графика
export function showChart(data) {
  let pieChart = dc.pieChart("#chart");
  let ndx = crossfilter([
    { name: "answer", type: "Правильно", count: data.yes },
    { name: "answer", type: "Неправильно", count: data.no }
  ]);

  let typeDemension = ndx.dimension(d => d.type);
  let count_typeDemension = typeDemension.group().reduceSum(d => d.count);

  pieChart
    .width(500)
    .height(300)
    .ordinalColors(["#FF0000", "#32CD32"])
    .label(function(d) {
      return d.key + ": " + d.value;
    })
    .legend(dc.legend().x(350).y(0).gap(5))
    .dimension(typeDemension)
    .group(count_typeDemension);

  pieChart.render();
}


