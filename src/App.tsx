import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader} from './assets/components/Loader';
import {CuteLoader} from './assets/components/CuteLoader'
import { Header } from './components/Header/Header';
import { getLoginThunk } from './store/authReducer';
import { RootState } from './store/store';
import {ThunkAppDispatch} from './store/authReducer'
import classes from './App.module.css';
import { LoginAndRegistrationWrapper } from './components/LoginAndRegistration/Wrapper';
import { Redirect, Route, Switch } from 'react-router';
import { MainSectionWrapper } from './components/MainSection/MainSectionWrapper';

const App:React.FC = () => {
  const initialized = useSelector<RootState, boolean>(state => state.auth.initialize)
  const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth)
  const dispatchThunk = useDispatch<ThunkAppDispatch>()
  useEffect(() => {
    dispatchThunk(getLoginThunk())
  }, [dispatchThunk])

  return (
    <>
    <Header />
    {
      initialized ? 
      <main className={classes.mainWrapper}>  
        {
          isAuth ?    
                
          <Switch>
              <Route path="/home" component={MainSectionWrapper} />
              <Route path="/*" render={() => <Redirect to="/home"/>}/>
          </Switch>       
          : 
          <Switch>
            <Route path="/login" component={LoginAndRegistrationWrapper}/>
            <Route path="/*" render={() => <Redirect to="/login"/>}/>
          </Switch> 
        }
      </main> : <><Loader/></>
    }
      
    </>
  );
}

export default App;
