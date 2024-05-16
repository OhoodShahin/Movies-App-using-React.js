import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromWatchList } from './Store/slices/wishlistSlice'
export default function WatchList() {

  let count = useSelector(state => state.watch.count)
let watchlisted =useSelector(state=>state.watch.watchlist)
console.log("watchlisted",watchlisted)
let dispatch =useDispatch()
let navigate =useNavigate()

  return (
   <>
{count>0?  <> <div className='container'>
    <h3 className='my-2'> watch list</h3>
    <div className='row g-4 my-2'>
{watchlisted.map((movie)=>{
 return <> <div className='col-md-6' key={movie.id}>
<div className='item p-2 d-flex justify-content-between align-items-center' style={{border:"1px solid black",borderRadius:"10px",height:"300px"}}>

<div className='img ' style={{maxWidth:"30%"}}>
  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='img' className='w-100 rounded-2'/>
</div> 
<div className='info' style={{maxWidth:"65%"}}>
<h3>{movie.title} <span onClick={()=>{dispatch(removeFromWatchList(movie.id))}}><i class="fa-solid  fa-heart text-warning"></i></span></h3>
<p className='text-muted'>{movie.release_date}</p>
<p>{movie.overview.split(" ").splice(0,30).join(" ")} <span className='text-warning'>read more </span></p>
</div>
</div>
</div>
</>
})}
    </div>
   </div> </>:<>
    <div className='container'>
    <h1>watch list</h1>
     <div className='row'>
 
 <div className='text-center m-auto'>
 <i class="fa-solid fa-heart-crack fa-2xl"></i>
 <p style={{fontSize:"20px"}} className='mt-3'> No Movies in the list </p>
 <button className='btn btn-warning px-5' onClick={()=>{navigate('/')}} >back to home</button>
 </div>
     </div>
    </div></>}
 
  
   </>
  )
}
