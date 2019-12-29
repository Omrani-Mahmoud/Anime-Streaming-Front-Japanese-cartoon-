

import React,{useState,useEffect} from 'react';
import { Dimmer, Loader, Pagination, Message } from 'semantic-ui-react'
import Anime from './Anime';
import Footer from '../components/Footer';
import {arab} from '../components/languages'

function Element(props){


    
    const getAnimes = async () =>{
        if(window.localStorage.getItem("the_list")){
        setAnime_data(JSON.parse(window.localStorage.getItem("the_list")));
        setTryme(1);}
        else{
        const resp = await fetch(`${process.env.REACT_APP_ADR_SRV}api/animes/`);
          const data = await resp.json();
          setAnime_data(data);
          setTryme(1);
        }};

        const [loading, setLoading] = useState(true);
        const[tryme,setTryme] = useState(0);
        const[anime_data,setAnime_data] = useState([]);
        const[start,setStart]= useState(0);
        const[end,setEnd]= useState(10);
        const[active,setActive]=useState(1);
        useEffect(()=>{
           
            getAnimes();
            function handleStatusChange() {
                setLoading(false);
              }
              function diss() {
               
                setLoading(true);
              }
              if(tryme===1)
              handleStatusChange();
              return ()=>{
                  diss();
              }
            
        },[tryme]);

         const handlePaginationChange = (e, { activePage }) =>setActive(activePage);

        useEffect(()=>{
            setStart((active*10)-10);
            setEnd(active*10);
            props.navRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
        },[active,props.navRef]);

        if(anime_data.length!==0){
            window.localStorage.setItem("the_list",JSON.stringify(anime_data)); 
        }
        
        if(loading===true)
        return (<div className="loadingDiv">
                    <Dimmer active>
                        <Loader indeterminate><Message
                            header={window.localStorage.getItem('language')==="Arabic"?arab[0].wlcLogo:'Welcome to THE LOGO'}
                            content={window.localStorage.getItem('language')==="Arabic"?arab[0].secPlz:'seconds please !!'}/>
                        </Loader>
                    </Dimmer>
                </div>)
        else
        return(
            <React.Fragment>
            <div className="elements">

                {anime_data.slice(start,end).map((anime,index)=>
                <Anime anime={anime} index={index} key={anime.id}/>
                )}
            </div>
            <div className="pagi">
            <Pagination  
                defaultActivePage={active}
                firstItem={null}
                lastItem={null}
                pointing
                secondary
                totalPages={Math.trunc(anime_data.length/10)+1}
                onPageChange={handlePaginationChange}
            />
            </div>
           
                <Footer />
              
            </React.Fragment>
            )

}

export default Element;