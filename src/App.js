import React, { Component } from 'react';
import './App.scss';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import TableResultPage from './Components/TableResultPage/TableResultPage';
import SelectForm from './Components/SelectForm/SelectForm';
import CheckBoxForm from './Components/CheckBoxForm/CheckBoxForm';
import RadioBoxForm from './Components/RadioBoxForm/RadioBoxForm';
import TextInputForm from './Components/TextInputForm/TextInputForm';
import StandartBoxForm from './Components/StandartBoxForm/StandartBoxForm';
import ResultButton from './Components/ResultButton/ResultButton';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='jumbotron m-0'>
          <h1 className='text-center'>Тест 'Киев'</h1>
        </div>
        <section className='bg-dark mb-5'>
          <div className='container'>
            <div className='row text-center'>
              <div className='col-6 pt-2 pb-2'>
                <NavLink exact to='/'>
                  Начать тест
                </NavLink>
              </div>
              <div className='col-6  pt-2 pb-2'>
                <NavLink to='/resultspage'>Результат</NavLink>
              </div>
            </div>
          </div>
        </section>
       
      
        <Switch>
          <Route
            path='/'
            exact
            render={() => (
              <div className='container'>
                <div className='row mb-5'>
                  <div className='col'>
                    <SelectForm />
                  </div>
                </div>
                <div className='row mb-5'>
                  <div className='col'>
                    <CheckBoxForm />
                  </div>
                </div>
                <div className='row mb-5'>
                  <div className='col'>
                    <RadioBoxForm />
                  </div>
                </div>
                <div className='row mb-5'>
                  <div className='col'>
                    <TextInputForm />
                  </div>
                </div>
                <div className='row mb-5'>
                  <div className='col'>
                    <StandartBoxForm />
                  </div>
                </div>
                <div className='row mb-5'>
                  <div className='col'>
                    <ResultButton />
                  </div>
                </div>
              </div>
            )}
          />
          <Route path='/resultspage' render={() => <TableResultPage />} />
          <Redirect to={'/'} />
        </Switch>

        <footer className='navbar  bg-dark navbar-dark mt-5'>
    
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
