import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { backendURL } from "../utils/URLs";
import { useNavigate } from "react-router-dom";
import {
  commentDataInputInterface,
  commentDataInterface,
  ResourceDataInterface,
} from "./interfaces";

//component to display invidual resource when clicked on using react router
export default function SingleStudyResourcePage(): JSX.Element {
  const [commentText, setCommentText] = useState("");
  const [commentData, setCommentData] = useState<commentDataInputInterface[]>([
    {
      commentid: 0,
      userid: 0,
      resourceid: 0,
      comment_text: "allo",
    },
  ]);
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
  //trigger to display comments
  const [trigger, setTrigger] = useState(true);

  //using the parameters from the react router
  const { resource_id, user_id } = useParams();

  const definedLoggedInUserID: number = user_id ? parseInt(user_id) : 0;

  const navigate = useNavigate();

  //fetching the relevant resource
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

  //fetching comments for the resource
  useEffect(() => {
    const fetchCommentInfo = async () => {
      console.log(backendURL + "resources/" + "comments/" + resource_id);
      const response = await axios.get(
        backendURL + "resources/" + "comments/" + resource_id
      );
      const commentInfo: commentDataInputInterface[] = await response.data;
      const data = setCommentData(commentInfo);
      return await data;
    };
    fetchCommentInfo();
  }, [trigger]);

  //post comment with the logged in user
  async function handlePostComment(commentInput: string) {
    const requestData: commentDataInterface = {
      commentText: commentInput,
      resourceID: currentResource.resourceid,
      userID: definedLoggedInUserID,
    };
    const response = await axios.post(backendURL + "comments", requestData);
    console.log(response);
    setCommentText("");
  }

  //allowing logged in user to add the resource to their study list
  function handleAddToStudyList() {
    async function postResource() {
      const requestData = {
        userid: user_id,
        resourceid: currentResource.resourceid,
      };
      const response = await axios.post(backendURL + "studylist", requestData);
      console.log(response);
    }
    postResource();
  }

  return (
    <>
      <Header />
      {/*using react router to go back to the home page */}
      <div className="button-bar">
        <button onClick={() => navigate(-1)}>Home</button>
        {user_id !== "0" && (
          <button onClick={handleAddToStudyList}>Add to Study List</button>
        )}
      </div>
      <section className="single-resource-page">
        <h1 className="heading">{currentResource.name}</h1>
        <h3>Recommended By: {currentResource.author_name}</h3>
        <h3>Content Type: {currentResource.content_type}</h3>
        <h3>{new Date(currentResource.creation_date).toDateString()}</h3>
        <a href={currentResource.url}>{currentResource.url}</a>
        <p>{currentResource.description}</p>
        <h3>Tags: {currentResource.tags.split(" ").join(", ")}</h3>
        <h3>Relevant Course Stage: {currentResource.stage}</h3>
        <p>{currentResource.original_recommendation}</p>
        <p>{currentResource.recommendation_reasoning}</p>
        {/*logic to only display the add to study list button  and comments if the user is logged in*/}
      </section>
      {user_id !== "0" && (
        <section className="comments">
          <h1 className="heading-center">Comments</h1>
          <h3>Leave a comment:</h3>
          <textarea
            className="comment--textarea"
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
            <p className="comment--info" key={commentObject.commentid}>
              {commentObject.comment_text}
            </p>
          ))}
        </section>
      )}
      <Footer />
    </>
  );
}
