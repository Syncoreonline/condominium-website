import { Link } from "react-router-dom"
import { amenities, building } from "../data.js"
import { format, useLanguage } from "../i18n/Language.jsx"
import { usePageTitle } from "../usePageTitle.js"

export function Building() {
  const { copy } = useLanguage()
  const page = copy.about
  usePageTitle(`${page.pageTitle} · ${building.name}`)

  return (
    <div className="page">
      <header className="page-intro">
        <h1>{page.title}</h1>
        <p className="lede">{format(page.lede, building)}</p>
      </header>

      <section className="split band-tight">
        <div>
          <h2>{page.placeTitle}</h2>
          <p>{format(page.placeBody, building)}</p>
          <p>
            {page.deskBefore} <a href={building.phoneHref}>{building.phone}</a>. {page.pets}
          </p>
          <p>
            <Link className="text-link" to="/about#in-the-building">
              {page.works}
            </Link>
          </p>
        </div>
        <figure className="frame">
          <img className="photo-park" src="/images/ocean-park.jpg" alt={page.parkAlt} />
          <figcaption>{page.parkCaption}</figcaption>
        </figure>
      </section>

      <section className="band-tight" id="in-the-building">
        <div className="section-head">
          <p className="eyebrow">{page.insideEyebrow}</p>
          <h2>{page.insideTitle}</h2>
        </div>
        <ol className="amenity-list">
          {amenities.map((item, index) => {
            const label = copy.amenities[item.title] ?? item
            return (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{label.title}</h3>
                  <p>{label.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="split band-tight">
        <div>
          <h2>{page.homesTitle}</h2>
          <p>{page.homesOne}</p>
          <p>{page.homesTwo}</p>
          <p>{page.homesThree}</p>
        </div>
        <figure className="frame">
          <img src="/images/residence-kitchen.jpg" alt={page.kitchenAlt} />
          <figcaption>{page.kitchenCaption}</figcaption>
        </figure>
      </section>
    </div>
  )
}
