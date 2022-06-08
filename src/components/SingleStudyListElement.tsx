import axios from "axios";
import { backendURL, frontendURL } from "../utils/URLs";
import { SingleStudyResourceProps, likeDataInterface } from "./interfaces";

//component used for MyStudyList component
export default function SingleStudyListElement(
  props: SingleStudyResourceProps
): JSX.Element {
  //adding like for each resource and posting to backend
  async function handleLike() {
    const requestData: likeDataInterface = {
      likeValue: true,
      resourceID: props.resourceId,
      userID: props.userId,
    };
    await axios.post(backendURL + "likes", requestData);
  }

  //adding dislike for each resource and posting to backend
  async function handleDislike() {
    const requestData: likeDataInterface = {
      likeValue: false,
      resourceID: props.resourceId,
      userID: props.userId,
    };
    await axios.post(backendURL + "likes", requestData);
  }

  async function handleDelete(resourceId: number) {
    const response = await axios.delete(
      backendURL + "studylist/" + props.loggedInUserId + "/" + resourceId
    );
    console.log(response);
  }

  return (
    <div className="grid-element">
      {/*link to the single study resource page which includes the logged in user id */}
      <a
        href={
          frontendURL +
          "resource/" +
          props.resourceId +
          "/" +
          props.loggedInUserId
        }
      >
        <section className="study-resource-element">
          <h3>
            <strong>Resource Name:</strong> {props.resourceName}
          </h3>
          <p>
            <strong>Author:</strong> {props.authorName}
          </p>
          <p>{props.recommendation}</p>
          <p>
            <strong>Tags:</strong> {props.tags}
          </p>
          <p>
            <strong> Date Added:</strong> <em>{props.creationDate}</em>
          </p>
        </section>
      </a>
      <div className="button-container">
        <button onClick={() => handleDelete(props.resourceId)}>
          Remove from Study List
        </button>
      </div>
    </div>
  );
}
