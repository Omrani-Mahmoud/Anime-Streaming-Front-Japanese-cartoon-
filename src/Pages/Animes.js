import React from 'react';
import { Input, Icon, Divider, Header, Breadcrumb } from 'semantic-ui-react'
import  {Link} from 'react-router-dom';
import AnimePerType from '../components/AnimePerType';
import {arab} from '../components/languages'



function Animes (props){
    //const[Counter,setCounter]= React.useState(1);
    const counter = 1;
    const[Types,setTypes]= React.useState([]);
    const getTypes = async () =>{
      const resp = await fetch(`${process.env.REACT_APP_ADR_SRV}api/animes/types/`);
        const data = await resp.json();
        setTypes(data);
      };
  
      React.useEffect(()=>{
        getTypes();
      },[]);
    const navRef = React.createRef();
    const menuRef = React.createRef();
    console.log(window.localStorage.getItem("language"));
    return(
<div className="app">
<nav>
        <div className="logo">
          <h1>the logo</h1>
        </div>
        <Input
          icon={<Icon name='search' inverted circular link />}
          placeholder={window.localStorage.getItem('language')==="Arabic"?arab[0].search:"Search..."} inverted={true}
        />
            <ul className="nav-links" ref={navRef}>
              <li><Link to='/'>{window.localStorage.getItem('language')==="Arabic"?arab[0].home:"Home"}</Link></li>
              <li><a>{window.localStorage.getItem('language')==="Arabic"?arab[0].animeList:"Anime list"}</a></li>
              <div className="categoriesDrop">
                    <li><a>{window.localStorage.getItem('language')==="Arabic"?arab[0].categories:"Categories"}</a></li>
          
                    <div className="dropdown-content">
                      <div className="flexV">
                      {Types.map((type)=>
                           <Link to={`/perType/${type}`} key={type}><li>{type}</li></Link>
                          )}
                      </div>
                    </div>
              </div>
              <li><Link to='/films'>Anime films</Link></li>  
            </ul>
        <div className="menu" ref={menuRef} onClick={()=>{ navRef.current.classList.toggle('nav-active')
            menuRef.current.classList.toggle('toggle')}}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>

      <Divider clearing />
      <Header as='h3' block >
        <Breadcrumb size="large">
        <Link to='/'><Breadcrumb.Section>Home</Breadcrumb.Section></Link>
          <Breadcrumb.Divider icon='right chevron' />
          <Breadcrumb.Section >{props.match.params.type} section</Breadcrumb.Section>
        </Breadcrumb> 
      </Header>
        <AnimePerType chosed={props.match.params.type} counter={counter} navRef={navRef}/>
</div>
    )}

export default Animes;