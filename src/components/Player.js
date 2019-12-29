import React from "react";
import { Embed, Input, Icon, Button ,Divider,Header} from 'semantic-ui-react'
import  {Link} from 'react-router-dom';
import Footer from "./Footer";
import {arab} from '../components/languages'






function Player (props){
  const navRef = React.createRef();
  const menuRef = React.createRef();
  const[Types,setTypes]= React.useState([]);
  const[myData,setmyData]= React.useState({});
  const[links,setLinks]= React.useState();
  const[servers,setServers]= React.useState([]);
  const[ff,setFf]= React.useState(false);
  const[hh,setHh]= React.useState(false);
  const[index,setIndex]= React.useState(-1);
  const[check,setCheck]= React.useState(false);
  const[array,setArray]= React.useState([]);
  const[toWattch,setToWatch]= React.useState("");
  
  const getTypes = async () =>{
      const resp = await fetch(`${process.env.REACT_APP_ADR_SRV}api/animes/types/`);
        const data = await resp.json();
        setTypes(data);
      };
      
      const getEp = async () =>{
        const resp = await fetch(`${process.env.REACT_APP_ADR_SRV}api/episodes/${props.match.params.ep}/`);
          const data = await resp.json();
          setmyData(data);
    
        };
        
      React.useEffect(()=>{
        getTypes();
        getEp();
        return ()=>{console.log("dd")}
      },[getEp]);

      React.useEffect(()=>{
        setLinks(myData.watch_links);
        setFf(true);
      },[myData]);

      React.useEffect(()=>{
        if(ff===true){
        setServers(links.split(','));
        setHh(true);
      }
      },[links]);

      React.useEffect(()=>{
        if(hh===true)
        setArray(servers.map(server=>server.split(":")));
      },[servers,hh]);
        
      React.useEffect(()=>{
        if(array[0]){console.log(array[0][2]);
        setToWatch(array[0][2]);
        }

      },[array])
      const linked =(xx)=>{
        setToWatch(`https:${xx}`);
        setCheck(true);
        setIndex((index-1))
      };

    return(
      <div className="app">
            <nav>
        <div className="logo">
          <h1>the logo</h1>
        </div>
        <Input
          icon={<Icon name='search' inverted circular link />}
          placeholder='Search...' inverted={true}
        />
            <ul className="nav-links" ref={navRef}>
              <li><Link to='/'>{window.localStorage.getItem('language')==="Arabic"?arab[0].home:"Home"}</Link></li>
              <li><a>{window.localStorage.getItem('language')==="Arabic"?arab[0].animeList:"Anime list"}</a></li>
              <div className="categoriesDrop">
                    <li><a>{window.localStorage.getItem('language')==="Arabic"?arab[0].categories:"Categories"}</a></li>
          
                    <div className="dropdown-content">
                      <div className="flexV">
                      {/*Types.map((type)=>
                           <Link to={`/perType/${type}`} key={type}><li>{type}</li></Link>
                      )*/}
                      </div>
                    </div>
              </div>
              <li><Link to='/films'>{window.localStorage.getItem('language')==="Arabic"?arab[0].animFilms:"Anime films"}</Link></li>  
            </ul>
        <div className="menu" ref={menuRef} onClick={()=>{ navRef.current.classList.toggle('nav-active')
            menuRef.current.classList.toggle('toggle')}}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
      
      <div className="main_player">
        <div className="player">
          <div className="bck_btn">
          <Button animated='fade' color="black" onClick={()=>window.history.go(index)}>
                <Button.Content visible>{window.localStorage.getItem('language')==="Arabic"?arab[0].back:"Go Back"}</Button.Content>
                <Button.Content hidden><Icon name='arrow left'/>{window.localStorage.getItem('language')==="Arabic"?arab[0].episodes:"Episodes"}</Button.Content>
          </Button>
          </div>
          <Embed
                active={true}
                url={toWattch}
                iframe={{
                  allowFullScreen: true,
                  style: {
                    padding: 10,
                  },
                }}
          />
        </div>
        <br />
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='film' />
            {window.localStorage.getItem('language')==="Arabic"?arab[0].watchServer:"Watch servers"}
          </Header>
        </Divider>
        <div className="vid_serv">
        
          {array.map((server,index)=>
          <Button inverted color='black' key={server[0]} onClick={()=>linked(server[2])}>
          {server[0]}
          </Button>)}
      
        </div>
        </div>
        <Footer />
        </div>
    )
}

export default Player;



/*<Embed
    icon='right circle arrow'
    placeholder='/images/image-16by9.png'
    url='https://www.myfav.es/jack'
  />*/
/*
 <Embed     
            active={true}
            brandedUI
            color='white'
            id="Y70Cqnd6ruM"
            hd={false}
            source='youtube'
            iframe={{
                allowFullScreen: true,
                style: {
                  padding: 10,
                },
              }}
        /> */