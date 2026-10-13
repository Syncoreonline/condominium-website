import { bedsLabel } from "../data.js"

export function ResidenceCard({ home }) {
  const image = home.images[0]
  return (
    <article className="card">
      <div className="card-media">
        <img src={image.src} alt={image.alt} />
      </div>
      <div className="card-body">
        <p className="eyebrow">Floor plan</p>
        <h3>{home.name}</h3>
        <p className="card-line">{home.line}</p>
        <p className="card-meta">
          {home.exposure} light
          <br />
          {bedsLabel(home.beds)} · {home.bathsText} · {home.sqftLabel}
        </p>
        <p className="card-fine">{home.fine}</p>
      </div>
    </article>
  )
}
