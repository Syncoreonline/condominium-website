import { Link } from "react-router-dom"
import { amenities, building } from "../data.js"
import { usePageTitle } from "../usePageTitle.js"

export function Building() {
  usePageTitle(`About · ${building.name}`)

  return (
    <div className="page">
      <header className="page-intro">
        <h1>About</h1>
        <p className="lede">
          Ocean Park Condominium is {building.homes} residences in a {building.stories}-story oceanfront building at{" "}
          {building.address}, developed in {building.year}. Policies, budgets, minutes, and forms are in the resident
          portal.
        </p>
      </header>

      <section className="split band-tight">
        <div>
          <h2>North Shore, on Collins Avenue.</h2>
          <p>
            {building.architect} designed the tower. The facade is mostly white, with a regular pattern of windows.
            Residents have a balcony, ocean views, a heated pool, a fitness center, a clubhouse, and one or two
            assigned spaces in the secured garage.
          </p>
          <p>
            An on-site manager and a 24-hour front desk look after the lobby. The desk is at{" "}
            <a href={building.phoneHref}>{building.phone}</a>. Pets are allowed, with restrictions and a size limit.
          </p>
          <p>
            <Link className="text-link" to="/about#in-the-building">
              How the building works
            </Link>
          </p>
        </div>
        <figure className="frame">
          <img
            className="photo-park"
            src="/images/ocean-park.jpg"
            alt="The park in front of the condominium: palms, a sandy path, the beach, and the Atlantic, with the building along the right edge."
          />
          <figcaption>Ocean Park Condominium, from the park</figcaption>
        </figure>
      </section>

      <section className="band-tight" id="in-the-building">
        <div className="section-head">
          <p className="eyebrow">In the building</p>
          <h2>Pool, a gym, a secured garage, and a desk that stays open.</h2>
        </div>
        <ol className="amenity-list">
          {amenities.map((item, index) => (
            <li key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="split band-tight">
        <div>
          <h2>Inside the residences</h2>
          <p>
            Studios are about 700 square feet with one bathroom. One-bedrooms run from 630 to 1,380 square feet, with
            one or two bathrooms. They often have stainless steel appliances, granite countertops, and impact windows
            and doors.
          </p>
          <p>
            Two-bedrooms run from 1,006 to 1,380 square feet, with one to two and a half bathrooms, ocean terraces,
            and finishes such as travertine and, in some homes, smart-home features.
            Three-bedrooms run from 1,006 to 2,200 square feet, with two to four bathrooms, flow-through porcelain
            tile, and views of the ocean and the skyline.
          </p>
          <p>
            Residences have a balcony and ocean views. Many also have a walk-in closet, a washer and dryer in the home,
            and smart lighting. The building has its own laundry and community storage. Those interior details vary.
          </p>
        </div>
        <figure className="frame">
          <img
            src="/images/kitchen3.jpg"
            alt="A bright kitchen with a long island, white cabinets, and wood stools."
          />
          <figcaption>Finishes in the larger plans run to stone and a full kitchen</figcaption>
        </figure>
      </section>

    </div>
  )
}
