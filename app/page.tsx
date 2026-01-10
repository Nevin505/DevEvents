import EventCard, { Props } from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { EVENTS } from "@/lib/contants.";

const NextJs = () => {
  return (
    <section className="text-center">
      <h1>
        {" "}
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className=" text-center mt-5">
        Hackathons,Meetups and Conferences All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {EVENTS.map((element: Props) => {
            return (
              <li key={element.title}>
                <EventCard {...element} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default NextJs;
