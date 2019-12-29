import React,{useEffect,useState} from 'react';
import { Dimmer, Pagination, Message, Icon } from 'semantic-ui-react'
import Anime from './Anime';
import Footer from './Footer';

function AnimePerType (props){
  
    const[myData,setMyData]= React.useState([]);
    const[active,setActive]=useState(1);
    const getByType = async () =>{
    const resp = await fetch(`${process.env.REACT_APP_ADR_SRV}api/animes/_${props.chosed}/`);
      const data = await resp.json();
      setMyData(data);
      setTryme(1);
    };
    const [loading, setLoading] = useState(true);
        const[tryme,setTryme] = useState(0);
        const[start,setStart]= useState(0);
        const[end,setEnd]= useState(10);
        
         
        useEffect(()=>{
            getByType();
            function handleStatusChange() {
                setLoading(false);
              }
              if(tryme===1)
              handleStatusChange();
              else 
              setLoading(true);
        },[tryme,props.chosed]);

         const handlePaginationChange = (e, { activePage }) =>setActive(activePage);
        
        useEffect(()=>{
            setStart((active*10)-10);
            setEnd(active*10);
            props.navRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
           
        },[active]);

        useEffect(()=>{
            setActive(1);
            setTryme(0);
        },[props.chosed]);
            
        if(loading===true)
        return (<div className="loadingDiv">
                    <Dimmer active> 
                    <Message icon>
                        <Icon name='circle notched' loading />
                        <Message.Content>
                        <Message.Header>Just a seconds</Message.Header>
                        We are fetching {props.chosed} content for you.
                        </Message.Content>
                    </Message>
                    </Dimmer>
                </div>)
        else
        return(
            <React.Fragment>
            <div className="elements">
                {myData.slice(start,end).map((anime,index)=>
                     <Anime anime={anime} index={index} key={anime.id}/>
                )}
            </div>
            <div className="pagi">
            <Pagination  
                firstItem={null}
                lastItem={null}
                activePage={active}
                pointing
                secondary
                totalPages={Math.trunc(myData.length/10)+1}
                onPageChange={handlePaginationChange}
            />
            </div>
            <Footer />
            </React.Fragment>
    
            )


  }

export default AnimePerType;