import React from 'react';
import './App.css';
import { Navbar } from './Layouts/NavbarAndFooter/Navbar';
import { Footer } from './Layouts/NavbarAndFooter/Footer';
import { HomePage } from './Layouts/HomePage/HomePage';
import { SearchBooksPage } from './Layouts/SearchBooksPage/SearchBooksPage';
import { Pagination } from './Layouts/Utils/Pagination';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BookCheckoutPage } from './Layouts/BookCheckoutPage/BookCheckoutPage';
export const App = () => {
  return (
    <div> {/*We added a div because JSX expressions must have one parent element*/}
      <div className='d-flex flex-column min-vh-100'>{ /*to make the footer fixed in the bottom*/}
        <Navbar />
        <div className='flex-grow-1'>
          <Switch>

            <Route path='/' exact>
              <Redirect to='/home' />
            </Route>

            <Route path='/home'>
              <HomePage />
            </Route>

            <Route path='/search'>
              <SearchBooksPage />
            </Route>

            <Route path="/checkout/:bookId">
              <BookCheckoutPage/>
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
