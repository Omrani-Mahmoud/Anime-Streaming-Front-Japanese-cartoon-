import React from 'react';
import Element from '../src/components/Element';
import{Link} from "react-router-dom";
import { Input, Icon, Divider , Dropdown, Flag} from 'semantic-ui-react'
import {arab} from './components/languages'

const languageOptions = [
  {
    key: 'English',
    text: 'English',
    value: 'English',
    icon: <Flag name='uk' />,
   
  },
  {
    key: 'Arabic',
    text: 'Arabic',
    value: 'Arabic',
    icon: <Flag name='ma' />,
  },
]

function App() {
  const[Language,setLanguage]= React.useState(window.localStorage.getItem('language'));
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

  const xx =()=>{
    console.log(arab);
  }

  window.localStorage.setItem("language",Language); 
  
  return (
  
    <div className="app">
    
      <nav>
        <div className="logo">
          <h1>the logo</h1>
        </div>
              <Input icon={<Icon name='search' inverted circular link />} placeholder={window.localStorage.getItem('language')==="Arabic"?arab[0].search:"Search..."}   onChange={xx}/>
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
        <Dropdown
            inline
            button
            className='icon'
            icon="language"
            floating
            labeled
            options={languageOptions}
            defaultValue={Language}
              onChange={e=>setLanguage(e.target.textContent)}
            />
      </nav>
      
        <Divider clearing />  
        <Element navRef={navRef}/>
        
    </div>
    
    

  );
}

export default App;


/*
<Dropdown
               labeled
               button
               className='icon'
              options={languageOptions}
              defaultValue={languageOptions[0]}
              onChange={(e)=>setLanguage(e.target.textContent)}
            />*/