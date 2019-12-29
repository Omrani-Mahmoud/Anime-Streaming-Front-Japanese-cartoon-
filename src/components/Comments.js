import React, {useState,useRef} from 'react'
import { Button, Comment, Form, Message } from 'semantic-ui-react'
import {arab} from '../components/languages'
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
 
var tabComment = [  {id:1,name:"mahmoud",date:"1day", content:"bla bla bla"},
                {id:2,name:"omrani",date:"2 days", content:"blo blo blo"}
              ]




function Comments() {
  const[pushed,SetPushed] = useState(tabComment);
  const[comment,SetComment]= useState("");
  const[Commenterror,setError]= useState(false);
 
  const addComment=(CommentContent)=>{
    if(CommentContent){
   setError(false);
   SetPushed(pushed.concat({id:3,name:"mah",date:[new Date().getDate()," ",monthNames[new Date().getMonth()]," ",new Date().getFullYear()],content:CommentContent}));
   SetComment("");}
   else
      setError(true);
  }
    return (
      
        <div className="commentsDiv">
            <Comment.Group>
              {pushed.map(x=>
              <div className="singleComment" key={x.id}>
              <Comment >
                <div className="commentAvatar" >
              <Comment.Avatar as='a' src='../img/user.png'/>
              </div >
              <Comment.Content>
              <Comment.Author>{x.name}</Comment.Author>
                <Comment.Metadata>
              <div>{x.date}</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>
                    {x.content}
                  </p>
                </Comment.Text>
              </Comment.Content>
            </Comment>
            </div>
                )}
    
    <Form>
      <Form.TextArea value={comment} onChange={(e)=>SetComment(e.target.value)} error={Commenterror?{ content:window.localStorage.getItem('language')==="Arabic"?arab[0].commentError:'Please enter a comment before you add it', pointing: 'below' }:false} />

      <Button type="submit" content={window.localStorage.getItem('language')==="Arabic"?arab[0].addComment:'Add Comment'} labelPosition='left' icon='edit' secondary  onClick={()=>addComment(comment)}/>
      
    </Form>
    </Comment.Group>
    </div>
        
    )
}

export default Comments
