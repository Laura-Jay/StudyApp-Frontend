import { frontendURL } from "../utils/URLs";
import { SingleStudyResourceProps } from "./interfaces";

//used in RecentResources component to show each study resource
export default function SingleStudyResource(
  props: SingleStudyResourceProps
): JSX.Element {
  // //adding like for each resource and posting to backend
  // async function handleLike() {
  //   const requestData: likeDataInterface = {
  //     likeValue: true,
  //     resourceID: props.resourceId,
  //     userID: props.userId,
  //   };
  //   await axios.post(backendURL + "likes", requestData);
  // }

  // //adding dislike for each resource and posting to backend
  // async function handleDislike() {
  //   const requestData: likeDataInterface = {
  //     likeValue: false,
  //     resourceID: props.resourceId,
  //     userID: props.userId,
  //   };
  //   await axios.post(backendURL + "likes", requestData);
  // }

  return (
    <div>
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
    </div>
  );
}
