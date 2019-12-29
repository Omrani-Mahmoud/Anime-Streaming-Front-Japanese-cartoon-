import React from "react";
import {Image, Card, Label, Reveal} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

function Episode(props){
   
   
    const checkClicks =()=>{console.log(`img clicked have an ID of  ${props.eps.id}`) ;}
    return(
        <div id="element_ep" >
        <div>
        <Link to={`/watch/${props.eps.id}`}><Reveal animated='small fade' onClick={checkClicks}>
            <Reveal.Content visible>
            <Card className="insideCard">
                <Label color='red' attached='top right'>
                    {props.eps.ep_number}
                </Label>
                <Image src='https://image.freepik.com/vecteurs-libre/film-camera-logo_7108-42.jpg' />
                </Card>
            </Reveal.Content>

            <Reveal.Content hidden>
            <Card className="insideCard">

                <Image src='https://image.freepik.com/vecteurs-libre/film-camera-logo_7108-42.jpg' />
            
                <Card.Content>
                <Card.Header>{props.eps.title}</Card.Header>
                <Card.Description>
                    <ul>
                        <label>Anime Name :</label><span>{props.eps.anime_name}</span>
                        <li><label>Episode Likes :</label><span>{props.eps.likes}</span></li> 
                        <li><label>watched :</label><span>{props.eps.watched}</span></li>
                        <li><label>Poste Time :</label><span>{props.eps.posted_time}</span></li>
                    </ul>
                </Card.Description>
                </Card.Content>
            </Card>
            </Reveal.Content>
           
        </Reveal></Link>
        </div>
        </div>
         
        )
    
}

export default Episode;

/*<Card className="insideCard">
            <Label color='red' attached='top left'>
                {"eps number"}
            </Label>
            <Image src='https://image.freepik.com/vecteurs-libre/film-camera-logo_7108-42.jpg' />
        
            <Card.Content>
            <Card.Header>{props.eps.title}</Card.Header>
            <Card.Meta>
                <span>eps Info </span>
            </Card.Meta>
            <Card.Description>
                <span>Eps Desc</span>
            </Card.Description>
            </Card.Content>
          
            
        </Card> */