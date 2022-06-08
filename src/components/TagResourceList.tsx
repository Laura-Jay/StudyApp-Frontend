import { ResourceDataInterface } from "./interfaces";
import SingleStudyResource from "./SingleStudyResource";

export default function TagResourceList(props: {
  allResources: ResourceDataInterface[];
  loggedInUserId: number;
}): JSX.Element {
  //this function has resources which match the tag selected passed down as props, the 5 most recent tag-matched resources are then mapped onto 5 study resource tiles and diplayed
  return (
    <>
      <div className="grid-wrapper">
        {props.allResources.map((resource) => (
          <SingleStudyResource
            key={resource.resourceid}
            resourceName={resource.name}
            authorName={resource.author_name}
            resourceType={resource.content_type}
            creationDate={resource.creation_date}
            URL={resource.url}
            description={resource.description}
            tags={resource.tags}
            buildPhaseWeek={resource.stage}
            recommendation={resource.original_recommendation}
            reasonForRecommendation={resource.recommendation_reasoning}
            userId={resource.userid}
            resourceId={resource.resourceid}
            loggedInUserId={props.loggedInUserId}
          />
        ))}
      </div>
    </>
  );
}
