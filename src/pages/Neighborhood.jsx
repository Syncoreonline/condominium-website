import { Link } from "react-router-dom"
import { building, placePhotos, places, schools } from "../data.js"
import { format, useLanguage } from "../i18n/Language.jsx"
import { usePageTitle } from "../usePageTitle.js"

export function Neighborhood() {
  const { copy } = useLanguage()
  const page = copy.neighborhood
  usePageTitle(`${page.pageTitle} · ${building.name}`)

  return (
    <div className="page">
      <header className="page-intro">
        <p className="eyebrow">{building.neighborhood}</p>
        <h1>{page.title}</h1>
        <p className="lede">{format(page.lede, building)}</p>
      </header>

      <figure className="wide-photo photo-fit">
        <img src="/images/ocean-park.jpg" alt={page.parkAlt} />
        <figcaption>{page.parkCaption}</figcaption>
      </figure>

      <ul className="place-photos">
        {placePhotos.map((place) => {
          const label = copy.photos[place.name] ?? place
          return (
            <li key={place.name}>
              <figure>
                <img src={place.src} alt={label.alt} />
                <figcaption>{label.name}</figcaption>
              </figure>
            </li>
          )
        })}
      </ul>

      <section className="split band-tight">
        <div>
          <h2>{page.liveTitle}</h2>
          <p>{page.liveOne}</p>
          <p>{page.liveTwo}</p>
          <p>{page.liveThree}</p>
        </div>
        <figure className="frame">
          <img src="/images/beach.jpg" alt={page.morningAlt} />
          <figcaption>{page.morningCaption}</figcaption>
        </figure>
      </section>

      <section className="band-tight">
        <h2>{page.footTitle}</h2>
        <ul className="place-blocks">
          {places.map((place) => {
            const label = copy.places[place.name] ?? place
            return (
              <li key={place.name}>
                <div>
                  <h3>{label.name}</h3>
                  <p>{label.note}</p>
                </div>
                <span>{label.time}</span>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="band-tight">
        <div className="section-head">
          <p className="eyebrow">{page.schoolsEyebrow}</p>
          <h2>{page.schoolsTitle}</h2>
        </div>
        <ul className="place-blocks">
          {schools.map((school) => (
            <li key={school.name}>
              <div>
                <h3>{school.name}</h3>
                <p>{copy.schools.note}</p>
              </div>
              <span>{copy.schools.levels[school.level] ?? school.level}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="split band-tight">
        <figure className="frame">
          <img src="/images/south-beach.jpg" alt={page.skylineAlt} />
          <figcaption>{page.skylineCaption}</figcaption>
        </figure>
        <div>
          <h2>{page.parksTitle}</h2>
          <p>{page.parksOne}</p>
          <p>{page.parksTwo}</p>
          <Link className="text-link" to="/inquire">
            {page.parksLink}
          </Link>
        </div>
      </section>
    </div>
  )
}
