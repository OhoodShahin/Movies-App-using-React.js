import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Login'
import Register from '../Register'
import NotFound from '../NotFound'
import Loader from '../Loader'

const MoviesPage = React.lazy(() => import('../Movies'));
const DetailsPage =React.lazy(()=> import('../MovieDetails'))
const WatchListPage =React.lazy(()=>import('../WatchList'))

export default function MainRouter() {
  return (
    <Suspense fallback={<Loader />}>
<Routes>
<Route path='/' element={<MoviesPage/>}/>
<Route path="/movies-details/:id" element={<DetailsPage/>}/>
<Route path='login' element={<Login/>}/>
<Route path='register' element={<Register/>}/>
<Route path='watchlist' element={<WatchListPage/>}/>
<Route path='*' element={<NotFound/>}/>


</Routes>
</Suspense>

    )
}
