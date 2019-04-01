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
} from '../../Action/ActionsTypes';
import { showWindow, hideWindow, showChart } from '../../Action/Actions';

const initiallState = [
  {
    num: 1,
    question: 'На какой реке расположен Киев?',
    answer: ['Дон', 'Днепр', 'Дунай'],
    rightAnswer: 'Днепр',
    userAnswer: ''
  },
  {
    num: 2,
    question: 'Выберите районы которые относятся к Киеву?',
    answer: ['Деснянский', 'Печерский', 'Подольский'],
    rightAnswer: 'Подольский,Деснянский,Печерский',
    rightAnswerNumber: 3,
    userAnswer: []
  },
  {
    num: 3,
    question: 'Какое транспортное средство впервые появилось в Киеве?',
    answer: ['Автобус', 'Омнибус', 'Электрический трамвай'],
    rightAnswer: 'Электрический трамвай',
    userAnswer: ''
  },
  {
    num: 4,
    question: 'Лист какого дерева является символом Киева?',
    answer: ['Дуб', 'Березa', 'Каштан'],
    rightAnswer: 'Каштан',
    userAnswer: ''
  },
  {
    num: 5,
    question: 'Какой тип климата характерен для Киева?',
    answer: ['Умеренный', 'Континентальный', 'Умеренно-континентальный'],
    rightAnswer: 'Умеренно-континентальный',
    userAnswer: ''
  },
  {
    defaultAnswers: [
      'Днепр',
      'Деснянский,Печерский,Подольский',
      'Электрический трамвай',
      'Каштан',
      'Умеренно-континентальный'
    ],
    resultUserAnswer: [],
    yes: 0,
    no: 0
  }
];

export default function reducerForQuestion(state = initiallState, action) {
  switch (action.type) {
    case ANSWER_1:
      state[0].userAnswer = action.payload;
      return state;

    case ANSWER_2:
      if (action.payload.checked) {
        if (state[1].userAnswer.length < 3) {
          state[1].userAnswer.push(action.payload.value);
        }
      } else if (!action.payload.checked) {
        let index = state[1].userAnswer.indexOf(action.payload.value);
        state[1].userAnswer.splice(index, 1);
      }
      //  state[1].userAnswer.push(action.payload.value);
      return state;

    case ANSWER_3:
      state[2].userAnswer = action.payload;
      return state;

    case ANSWER_4:
      state[3].userAnswer = action.payload;
      return state;

    case ANSWER_5:
      state[4].userAnswer = action.payload;
      action.tag.classList.toggle('choose');
      return state;

    case YES:
      // собираем все ответы пользователя в один пустой массив
      for (let index = 0; index < state.length - 1; index++) {
        if (typeof state[index].userAnswer === 'string') {
          state[5].resultUserAnswer.push(state[index].userAnswer.toString());
        } else if (typeof state[index].userAnswer === 'object') {
          state[5].resultUserAnswer.push(
            state[index].userAnswer.sort().toString()
          );
        }
      }


        // Проверяем на все ли вопросы пользователь ответил
        if (state[5].resultUserAnswer.includes('')) {
          showWindow();
        } else if (state[5].resultUserAnswer[1].length === 0) {
          showWindow();
        } else {
          action.page.history.push('/resultspage/');
      }
      

      //считаем правильные и неправильные ответы
      if (state[5].resultUserAnswer.length > 0) {
        state[5].resultUserAnswer.map(value => {
          if (state[5].defaultAnswers.includes(value)) {
            state[5].yes += 1;
          } else {
            state[5].no += 1;
          }
        });

      

      }


      return state;

    case CLEAR_INPUTS:
      // снимаем флажки
      document.querySelector('select').value = '';
      let check = document.querySelectorAll('input:checked');
      check.forEach(element => {
        element.checked = false;
      });
      document.querySelector('input[type=\'text\']').value = '';

      //проходим по каждому ответу пользователя и очищаем
      for (let i = 0; i < action.payload.allQuestions.length - 1; i++) {
        if (typeof action.payload.allQuestions[i].userAnswer === 'string') {
          action.payload.allQuestions[i].userAnswer = '';
        } else if (
          typeof action.payload.allQuestions[i].userAnswer === 'object'
        ) {
          action.payload.allQuestions[i].userAnswer = [];
        }
      }

      return state;

    case AGREE:
      action.page.history.push('/resultspage/');
      return state;

    case DISAGREE:
      // снимаем флажки
      document.querySelector('select').value = '';
      let inputs = document.querySelectorAll('input:checked');
      inputs.forEach(element => {
        element.checked = false;
      });
      document.querySelector('input[type=\'text\']').value = '';

      //проходим по каждому ответу пользователя и очищаем
      for (let i = 0; i < action.payload.allQuestions.length - 1; i++) {
        if (typeof action.payload.allQuestions[i].userAnswer === 'string') {
          action.payload.allQuestions[i].userAnswer = '';
        } else if (
          typeof action.payload.allQuestions[i].userAnswer === 'object'
        ) {
          action.payload.allQuestions[i].userAnswer = [];
        }
      }

      action.payload.allQuestions[5].no = 0;
      action.payload.allQuestions[5].yes = 0;
      action.payload.allQuestions[5].resultUserAnswer.splice(
        0,
        action.payload.allQuestions[5].resultUserAnswer.length
      );

      hideWindow();
      return state;

    case SHOW_CHART:
      showChart(action.payload);
      return state;

    default:
      return state;
  }
}
