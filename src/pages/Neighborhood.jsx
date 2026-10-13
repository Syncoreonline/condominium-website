import { Link } from "react-router-dom"
import { building, placePhotos, places, schools } from "../data.js"
import { usePageTitle } from "../usePageTitle.js"

export function Neighborhood() {
  usePageTitle("Neighborhood · Ocean Park Condominium")

  return (
    <div className="page">
      <header className="page-intro">
        <p className="eyebrow">{building.neighborhood}</p>
        <h1>A quieter beach, between Surfside and Mid Beach.</h1>
        <p className="lede">
          Ocean Park Condominium is at {building.address}, in North Shore. The neighborhood sits between the ocean,
          Biscayne Bay, and the bayside islands. South Beach is five miles south. The pace here is lower.
        </p>
      </header>

      <figure className="wide-photo photo-fit">
        <img
          src="/images/ocean-park.jpg"
          alt="The park in front of the condominium: palms, a sandy path, the beach, and the Atlantic, with the building along the right edge."
        />
        <figcaption>The park between the building and the beach.</figcaption>
      </figure>

      <ul className="place-photos">
        {placePhotos.map((place) => (
          <li key={place.name}>
            <figure>
              <img src={place.src} alt={place.alt} />
              <figcaption>{place.name}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <section className="split band-tight">
        <div>
          <h2>How people actually live here</h2>
          <p>
            North Shore is residential and low-key. A lot of the day happens in workout clothes or a bathing suit. The
            ocean is the front edge. The bay and the islands are the back edge. You can walk to a market, a Publix, and
            a pharmacy.
          </p>
          <p>
            Street parking is free and, for Miami Beach, unusually available. Biking works. The neighborhood is
            walkable. Public transit is thinner, so a car still helps for the airport and for anything past a short
            ride. Miami International is about 35 minutes by car. Fort Lauderdale–Hollywood is about 40.
          </p>
          <p>
            Collins Avenue has the everyday restaurants, including El Ranchero Grande. Prime 54 is the steakhouse when
            the meal is the evening. Boutiques are local rather than a mall.
          </p>
        </div>
        <figure className="frame">
          <img src="/images/beach.jpg" alt="Morning light on a quiet shoreline." />
          <figcaption>Oceanfront, from the park in front of the building</figcaption>
        </figure>
      </section>

      <section className="band-tight">
        <h2>On foot, and a little farther</h2>
        <ul className="place-blocks">
          {places.map((place) => (
            <li key={place.name}>
              <div>
                <h3>{place.name}</h3>
                <p>{place.note}</p>
              </div>
              <span>{place.time}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="band-tight">
        <div className="section-head">
          <p className="eyebrow">Schools</p>
          <h2>For a family that is here all year.</h2>
        </div>
        <ul className="place-blocks">
          {schools.map((school) => (
            <li key={school.name}>
              <div>
                <h3>{school.name}</h3>
                <p>A Miami Beach public school serving this part of the island.</p>
              </div>
              <span>{school.level}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="split band-tight">
        <figure className="frame">
          <img
            src="/images/south-beach.jpg"
            alt="The Miami skyline across the water at dusk."
          />
          <figcaption>South Beach is five miles away. The skyline is the bay view.</figcaption>
        </figure>
        <div>
          <h2>Parks before nightlife</h2>
          <p>
            North Beach Oceanside Park is the main green space: tropical planting, a shaded playground, arts along the
            paths, walking trails, tennis, and a gate onto the beach. Allison Park is the one-minute walk from the
            lobby. Brittany Bay Park and La Gorce Park add bike trails, picnic lawns, and more playgrounds.
          </p>
          <p>
            The Miami Beach Bandshell, a historic venue, programs concerts, dances, shows, and community talks. Ocean
            Life Studio is a fitness room within walking distance if you want a class outside the building gym.
          </p>
          <Link className="text-link" to="/inquire">
            Ask the front desk a neighborhood question
          </Link>
        </div>
      </section>
    </div>
  )
}
