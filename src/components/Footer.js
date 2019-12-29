import React from "react";
import {Image, Container, Divider, Header, Icon, Button} from 'semantic-ui-react';
import {arab} from '../components/languages'



function Footer (){
    return(
        <div className="footer">
            
            <Divider clearing />  
            <div className="main">
                <Image src="../img/anim.png" size="small"></Image>
                <div className="about">
                     <Container fluid>
                        <Header as='h3' className="about_Titel">{window.localStorage.getItem('language')==="Arabic"?arab[0].animFilms:"What is THE LOGO?"}</Header>
                        <p>
                        {window.localStorage.getItem('language')==="Arabic"?arab[0].desc:"Founded as an anime & manga recommendation database \
                            Create lists for what you've seen, watch over 40,000  episodes online."}
                        </p>
                    </Container>
                </div>

                <div className="support">
                <Container fluid>
                <Header as='h5'>{window.localStorage.getItem('language')==="Arabic"?arab[0].title:"The Logo is a site made by fans, for fans."}</Header>
                <Button animated='fade' color="orange">
                    <Button.Content visible>{window.localStorage.getItem('language')==="Arabic"?arab[0].supportUs:"SUPPORT  US"}</Button.Content>
                    <Button.Content hidden><Icon name='heart' color='black' size="large" /></Button.Content>
                </Button>
                </Container>
                </div>

                <div className="cc">
                © The Logo ,  2019
                </div>
                

                
            </div>
        </div>
    )
}


export default Footer