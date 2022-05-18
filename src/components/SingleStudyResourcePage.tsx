import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { backendURL } from "../utils/URLs";
import {useNavigate} from "react-router-dom"

interface ResourceDataInterface {
  name: string;
  author_name: string;
  url: string;
  description: string;
  tags: string;
  content_type: string;
  stage: string;
  original_recommendation: string;
  recommendation_reasoning: string;
  userid: number;
  resourceid: number;
  creation_date: string;
}

interface commentDataInterface {
  commentText: string;
  resourceID: number;
  userID: number;
}

interface commentDataInputInterface {
  commentid: number;
  userid: number;
  resourceid: number;
  comment_text: string;
}

export default function SingleStudyResourcePage(): JSX.Element {
  const [commentText, setCommentText] = useState("");
  const [trigger, setTrigger] = useState(true);
  const [commentData, setCommentData] = useState<commentDataInputInterface[]>([
    {
      commentid: 0,
      userid: 0,
      resourceid: 0,
      comment_text: "allo",
    },
  ]);
  const { resource_id } = useParams();
  console.log(backendURL + "resources/" + resource_id);

  const navigate = useNavigate();

  const [currentResource, setCurrentResources] =
    useState<ResourceDataInterface>({
      name: "",
      author_name: "",
      url: "",
      description: "",
      tags: "",
      content_type: "",
      stage: "",
      original_recommendation: "",
      recommendation_reasoning: "",
      userid: 0,
      resourceid: 0,
      creation_date: "",
    });

  useEffect(
    () => {
      const fetchResourceInfo = async () => {
        const response = await axios.get(
          backendURL + "resources/" + resource_id
        );
        const resourceInfo = await response.data;
        console.log(currentResource);
        setCurrentResources(resourceInfo);
      };

      fetchResourceInfo();
    },
    // eslint-disable-next-line
    []
  );
  useEffect(() => {
    const fetchCommentInfo = async () => {
      console.log(backendURL + "resources/" + "comments/" + resource_id);
      const response = await axios.get(
        backendURL + "resources/" + "comments/" + resource_id
      );
      const commentInfo: commentDataInputInterface[] = await response.data;
      setCommentData(commentInfo);
    };
    fetchCommentInfo();
  }, [trigger]);

  async function handlePostComment(commentInput: string) {
    const requestData: commentDataInterface = {
      commentText: commentInput,
      resourceID: currentResource.resourceid,
      userID: currentResource.userid,
    };
    const response = await axios.post(backendURL + "comments", requestData);
    console.log(response);
    setCommentText("");
  }

  function handleAddToStudyList(){
    //post request to users study list in database
    console.log("added resource")
  }

  return (
    <>
      <Header />
      <button onClick={ () => navigate(-1)}>Home</button> 
      <button onClick={handleAddToStudyList}>Add To Study List</button>
      <section className="single-resource-element">
        <h3>{currentResource.name}</h3>
        <h3>{currentResource.author_name}</h3>
        <h3>{currentResource.content_type}</h3>
        <h3>{currentResource.creation_date}</h3>
        <h3>{currentResource.url}</h3>
        <p>{currentResource.description}</p>
        <h3>{currentResource.tags}</h3>
        <h3>{currentResource.stage}</h3>
        <h3>{currentResource.original_recommendation}</h3>
        <p>{currentResource.recommendation_reasoning}</p>
      </section>
      <section className="comments">
        <h3>Comments</h3>
        <textarea
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        ></textarea>
        <button
          disabled={!commentText}
          onClick={() => {
            handlePostComment(commentText), setTrigger(!trigger);
          }}
        >
          Post your comment
        </button>
        {commentData.map((commentObject) => (
          <p key={commentObject.commentid}>{commentObject.comment_text}</p>
        ))}
      </section>
      <Footer />
    </>
  );
}
