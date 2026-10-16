import { Link } from "react-router-dom"
import { building } from "../data.js"
import { usePageTitle } from "../usePageTitle.js"

export function Terms() {
  usePageTitle(`Terms of use · ${building.name}`)

  return (
    <div className="page narrow">
      <header className="page-intro">
        <p className="eyebrow">Terms of use</p>
        <h1>Using this website.</h1>
        <p className="lede">
          These terms cover {building.name} at {building.address}, {building.city}, {building.state} {building.zip}.
          They were last updated on October 13, 2026. Using the site means you accept them. The{" "}
          <Link to="/privacy">privacy policy</Link> explains what the tour form and the resident library do with
          personal information.
        </p>
      </header>

      <h2>What the site is for</h2>
      <p>
        The public pages describe the tower, the amenities, and the North Shore neighborhood, and they let a visitor
        ask the front desk for a tour. A separate resident library holds association papers for unit owners and
        association employees. The site is not a listing service. It does not offer residences for sale or for rent,
        and a page on this site is not an offer, a contract, or a promise that a particular home is available.
      </p>
      <p>
        The front desk runs the visit schedule and answers questions about the building. The desk phone is{" "}
        <a href={building.phoneHref}>{building.phone}</a>, and the desk is staffed 24 hours.
      </p>

      <h2>Building facts on the public pages</h2>
      <p>
        Counts, sizes, and amenity descriptions are drawn from the association’s account of the building: 119
        residences, 15 stories, developed in {building.year}, on the ocean in North Shore. Floor areas are ranges.
        Finishes, closets, washers, and smart-home features vary from residence to residence. A photograph of a
        kitchen or another interior shows the kind of finish used in the building. It is not a photograph of every
        home, and it is not a promise that the residence you visit will match that picture.
      </p>
      <p>
        House rules change. That includes pets, parking, packages, and the use of the pool, fitness room, clubhouse,
        and garage. The pages say pets are allowed with restrictions and a size limit. Before you arrive with an
        animal, or before you rely on any other rule, ask the manager or the front desk for the current one.
      </p>
      <p>
        Neighborhood pages name nearby parks, the beach, the boardwalk, and the Miami Beach Bandshell. Hours, access,
        and what is open there are set by the city and by those places, not by this website.
      </p>

      <h2>Tours</h2>
      <p>
        The tour form asks for a name, an email address, and a phone number. You may also choose a plan, say when you
        hope to visit, and leave a note for the desk. Sending the form delivers that note to the front desk. It does
        not reserve a time, hold a residence, or confirm that a tour will happen. The desk confirms the visit, usually
        by phone or email. A tour covers the lobby, the heated pool, the fitness room, and the clubhouse. It is a
        visit to the building, arranged with the staff on duty.
      </p>
      <p>
        Write only what the desk needs in order to plan the visit. Do not send account numbers, passwords, or copies
        of identity documents through the form.
      </p>

      <h2>The resident library</h2>
      <p>
        Policies, budgets, financial reports, insurance papers, minutes, governing documents, move-in applications,
        inspection records, reservation forms, satisfaction letters, special assessment papers, and unit modification
        forms are for unit owners and association employees. The library stays closed until you enter an email address
        the association already has on file and then enter the one-time code sent to that inbox.
      </p>
      <p>
        The code is for you. Do not forward it, post it, or use someone else’s email to open the library. Do not copy
        the papers for anyone who is not an owner or an employee, except where the association has told you that you
        may. If your email address has changed, tell the front desk so the record can be updated before you request a
        code. An application that the desk has not approved does not open the library.
      </p>
      <p>
        A code expires after 15 minutes and works once. After it is accepted, this browser keeps the library open
        for up to 12 hours. Choosing “Close the library,” or closing the browser tab, ends that session sooner. A new
        tab asks for a code again.
      </p>

      <h2>How to use the site</h2>
      <p>
        Use the pages for their ordinary purpose: reading about the building, asking for a tour, getting directions,
        or, if you are an owner or an employee, reading the library. Do not attempt to bypass the library code, probe
        the site for other people’s information, or interfere with the form or the desk’s ability to receive a note.
      </p>
      <p>
        Directions leaves this site and opens Google Maps for {building.address}. Google’s own terms apply once you
        are there. Links and phone numbers on this site are provided so you can reach the building. The association
        does not control a page that belongs to someone else.
      </p>

      <h2>Availability and changes</h2>
      <p>
        The website can be unavailable during a change, an outage, or maintenance. A missing page, a failed form, or
        a code that does not arrive is a reason to call the front desk, not a reason to assume a rule or a document
        has changed. The association may update these terms. The date at the top of this page is the version in
        effect. Continuing to use the site after that date means the updated terms apply.
      </p>

      <h2>Questions</h2>
      <p>
        Call <a href={building.phoneHref}>{building.phone}</a>. The desk is at {building.address}, {building.city},{" "}
        {building.state} {building.zip}, and it is staffed 24 hours.
      </p>
    </div>
  )
}
