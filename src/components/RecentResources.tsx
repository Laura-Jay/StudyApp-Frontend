import SingleStudyResourceCarousel from "./SingleStudyResourceCarousel";
import { ResourceDataInterface } from "./interfaces";



export default function RecentResources(props: {
  allResources: ResourceDataInterface[];
  loggedInUserId: number;
}): JSX.Element {

  const recent10Resources = props.allResources.slice(0, 10);

  const recent10Carousel: JSX.Element[] = recent10Resources.map((resource) => (
    <SingleStudyResourceCarousel
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
    />))


  // component contains list of 10 most recently added resources mapped to the SingleStudyResource component
  return (
    <>
      <h1 className="heading">Recent Resources</h1>
      <p className="sub-heading">
        Find the latest study resources being shared by members!
      </p>
      <section className="resource-list">
        <div className="photobanner">{recent10Carousel}</div>
      </section>
    </>
  )
}
