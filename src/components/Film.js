import React,{useState,useEffect} from 'react';
import { Dimmer, Pagination, Message, Icon } from 'semantic-ui-react'
import Anime from './Anime';
import Footer from './Footer';

function Film(props){
    
    const getFilms = async () =>{
        if(window.localStorage.getItem("the_films")){
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
            getFilms();
            function handleStatusChange() {
                setLoading(false);
                console.log('state changed');
              }
              if(tryme===1)
              handleStatusChange();
        },[tryme]);

         const handlePaginationChange = (e, { activePage }) =>setActive(activePage);

        useEffect(()=>{
            setStart((active*10)-10);
            setEnd(active*10);
            props.navRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
        },[active]);
        
            

        if(anime_data.length!==0){
            window.localStorage.setItem("the_films",JSON.stringify(anime_data)); 
        }
    
        if(loading===true)
        return (<div className="loadingDiv">
                    <Dimmer active> 
                    <Message icon>
                        <Icon name='circle notched' loading />
                        <Message.Content>
                        <Message.Header>Just a seconds</Message.Header>
                        We are fetching movies content for you.
                        </Message.Content>
                    </Message>
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

export default Film;