import React, { Suspense } from 'react';
import Nav from 'components/Nav';
import { Switch, Route } from 'react-router-dom';
import Edit from 'containers/Edit';
import './style.scss';
import Feed from 'containers/Feed';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  return (
    <div className='index'>
      <Nav />

      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route path='/' exact component={Feed} />
          <Route path='/edit' component={Edit} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default Index;
