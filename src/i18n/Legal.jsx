import { Rich } from "./Rich.jsx"

export function Legal({ page, values }) {
  return (
    <div className="page narrow">
      <header className="page-intro">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.heading}</h1>
        <p className="lede">
          <Rich parts={page.lede} values={values} />
        </p>
      </header>
      {page.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.blocks.map((block, index) =>
            block.items ? (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p key={index}>
                <Rich parts={block} values={values} />
              </p>
            ),
          )}
        </section>
      ))}
    </div>
  )
}
