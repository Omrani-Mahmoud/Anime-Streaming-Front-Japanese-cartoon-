import React,{useState, useEffect}from 'react';
import  {Link} from 'react-router-dom';
import Episode from '../components/Episode';
import { Input, Icon, Divider, Header, Breadcrumb, Message, Dimmer, Item, ItemGroup, Pagination, Rating,Button } from 'semantic-ui-react'
import Footer from '../components/Footer';
import {arab} from '../components/languages'
import Comments from '../components/Comments';


function Episodes(props){
  const navRef = React.createRef();
  const menuRef = React.createRef();
  const[Ep_Data,setEp_Data]= React.useState([]);
  const[active,setActive]=useState(1);
  const[Animedata,setAnimeData]= useState();
  const[tryme,setTryme] = useState(0);
  const [loading, setLoading] = useState(true);
  const[start,setStart]= useState(0);
  const[end,setEnd]= useState(10);
  const[index,setIndex]= React.useState(-1);


  const[Types,setTypes]= React.useState([]);
    const getTypes = async () =>{
      const resp = await fetch(`${process.env.REACT_APP_ADR_SRV}api/animes/types/`);
        const data = await resp.json();
        setTypes(data);
      };
  
  const getAnimeChosed = async () =>{
    const resp = await fetch(`${process.env.REACT_APP_ADR_SRV}api/animes/${props.match.params.id}/`);
    const data = await resp.json();
    const respEp = await fetch(`${process.env.REACT_APP_ADR_SRV}api/animes/${props.match.params.id}/episodes/`);
    const dataEp = await respEp.json();
    
    setEp_Data(dataEp.reverse());
    setAnimeData(data);
    setTryme(1);
    };

    React.useEffect(()=>{
      getAnimeChosed();
      getTypes();
      function handleStatusChange() {
        setLoading(false);
      }
      if(tryme===1)
        handleStatusChange();
        return ()=>{console.log("clean up")}
    },[tryme]);

    const handlePaginationChange = (e, { activePage }) =>setActive(activePage);
    useEffect(()=>{
      setStart((active*10)-10);
      setEnd(active*10);
      navRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        return()=> {console.log("clean up")};
     
  },[active]);
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

      <Divider clearing />
      {loading===true? <div className="loadingDiv">
                    <Dimmer active> 
                    <Message icon>
                        <Icon name='circle notched' loading />
                        <Message.Content>
                        <Message.Header>{window.localStorage.getItem('language')==="Arabic"?arab[0].waitSec:"Wait few seconds..."}</Message.Header>
                        {window.localStorage.getItem('language')==="Arabic"?arab[0].waitFetch:"We are fetching episodes content for you."}
                        </Message.Content>
                    </Message>
                    </Dimmer>
                </div>:<div>
      <Header as='h3' block >
        <Breadcrumb size="large">
        <Link to='/'><Breadcrumb.Section>{window.localStorage.getItem('language')==="Arabic"?arab[0].home:"Home"}</Breadcrumb.Section></Link>
          <Breadcrumb.Divider icon='right chevron' />
          <Breadcrumb.Section >{Animedata.title}</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right chevron' />
          <Breadcrumb.Section >{window.localStorage.getItem('language')==="Arabic"?arab[0].episodes:"Episodes"}</Breadcrumb.Section>
        </Breadcrumb> 
      </Header>
      <ItemGroup className="anim_det">
      <Button animated='fade' color="black" onClick={()=>window.history.go(index)}>
                <Button.Content visible>{window.localStorage.getItem('language')==="Arabic"?arab[0].back:"Go Back"}</Button.Content>
                <Button.Content hidden><Icon name='home'/>{window.localStorage.getItem('language')==="Arabic"?arab[0].home:"Home"}</Button.Content>
          </Button>
      <Item>
    
      <Item.Image size='medium' src={Animedata.cover} />

      <Item.Content>
        <Item.Header><span className="animeSpanDesc">{Animedata.title}</span></Item.Header>
        <Item.Meta><span className="animeSpanDesc">{window.localStorage.getItem('language')==="Arabic"?arab[0].otherName:"Other Names"} :</span> 
          <span className="animeSpanDesc"> still undefined</span>
          <span className="animeSpanDesc"> xxxx</span>
        </Item.Meta>
        <Item.Description>
          <span className="animeSpanDesc">
            <p>{window.localStorage.getItem('language')==="Arabic"?arab[0].animeEps:"Anime episodes :"} {Animedata.epsNumber===0?"Unknown":Animedata.eps_number}</p>
            <p>{window.localStorage.getItem('language')==="Arabic"?arab[0].animeEps:"Production year :"} {Animedata.yearProd}</p>
            <p>{window.localStorage.getItem('language')==="Arabic"?arab[0].type:"Type : "}{Animedata.types}</p>
            {window.localStorage.getItem('language')==="Arabic"?arab[0].story:"Story : "}<p>{Animedata.story}</p>
            <Rating icon='heart' defaultRating={Animedata.rates} disabled maxRating={8}/>
          </span>             
        </Item.Description>
        <Item.Extra><h3>{window.localStorage.getItem('language')==="Arabic"?arab[0].AdditionalDetails:"Additional Details"}</h3></Item.Extra>
        <Item.Extra>
          <p className="animeSpanDesc">{window.localStorage.getItem('language')==="Arabic"?arab[0].animeProd :"Anime producer"} {Animedata.studio==="Unknown"?"Unknown":Animedata.studio}</p>
          <p className="animeSpanDesc">{window.localStorage.getItem('language')==="Arabic"?arab[0].categories:"Categories "} : {Animedata.cat}</p>
          <p className="animeSpanDesc">{window.localStorage.getItem('language')==="Arabic"?arab[0].animeState:"anime state"} : {Animedata.status}</p>
        </Item.Extra>
      </Item.Content>
    </Item>
    </ItemGroup>
    <Divider horizontal inverted> {window.localStorage.getItem('language')==="Arabic"?arab[0].animeEps:"anime episodes"}</Divider>
    <React.Fragment>
            <div className="elements">
                {Ep_Data.slice(start,end).map( episode=>     
                     <Episode eps={episode} key={episode.id}/>
                )}
            </div>
            <Divider horizontal inverted> {window.localStorage.getItem('language')==="Arabic"?arab[0].comments:"comments"}</Divider>
            <Comments />
            <div className="pagi">
            <Pagination  
                firstItem={null}
                lastItem={null}
                activePage={active}
                pointing
                secondary
                totalPages={Math.trunc(Ep_Data.length/10)+1}
                onPageChange={handlePaginationChange}
            />
            </div>
            <Footer />
            </React.Fragment>
       </div>}
     
    
       
</div>
            
    )};

export default Episodes;