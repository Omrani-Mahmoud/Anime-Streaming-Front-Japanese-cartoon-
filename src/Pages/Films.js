import React from 'react';
import { Input, Icon, Divider, Breadcrumb, Header} from 'semantic-ui-react'
import  {Link} from 'react-router-dom';
import Film from '../components/Film';
import {arab} from '../components/languages'


function Films (){
      
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
                      {//Types.map((type)=>
                          // <Link to={`/perType/${type}`} key={type}><li>{type}</li></Link>)
                        }
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

      <Divider clearing />
      <Header as='h3' block >
        <Breadcrumb size="large">
        <Link to='/'><Breadcrumb.Section>{window.localStorage.getItem('language')==="Arabic"?arab[0].home:"Home"}</Breadcrumb.Section></Link>
          <Breadcrumb.Divider icon='right chevron' />
          <Breadcrumb.Section >{window.localStorage.getItem('language')==="Arabic"?arab[0].filmSection:"films section"}</Breadcrumb.Section>
        </Breadcrumb> 
      </Header>
      <Film navRef={navRef}/>
</div>
    )}

export default Films;