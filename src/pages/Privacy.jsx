import { Link } from "react-router-dom"
import { building } from "../data.js"
import { usePageTitle } from "../usePageTitle.js"

export function Privacy() {
  usePageTitle(`Privacy policy · ${building.name}`)

  return (
    <div className="page narrow">
      <header className="page-intro">
        <p className="eyebrow">Privacy policy</p>
        <h1>What this site keeps.</h1>
        <p className="lede">
          This policy describes the personal information collected by the {building.name} website at {building.address}
          , {building.city}. It was last updated on October 13, 2026. The site uses that information to answer a tour
          request or to open the resident library. It does not sell personal information, and it does not build an
          advertising profile. How the site may be used is on the <Link to="/terms">terms of use</Link> page.
        </p>
      </header>

      <h2>Who this policy covers</h2>
      <p>
        It covers visitors who read the public pages, people who send a tour request, and unit owners or association
        employees who open the resident library. The front desk at{" "}
        <a href={building.phoneHref}>{building.phone}</a> is the place to ask a question about either kind of record.
        The desk is staffed 24 hours.
      </p>

      <h2>Reading the public pages</h2>
      <p>
        The home page, the building page, the neighborhood page, and the about page do not ask you to create an
        account. They do not ask for your name. This website does not set its own tracking cookies and does not run
        an analytics or advertising program of its own.
      </p>
      <p>
        Choosing Directions opens Google Maps in a new tab for the building address. From that moment, Google’s
        privacy policy applies to that tab, not this one. A phone link only starts a call on your device. The website
        does not record the call.
      </p>

      <h2>A tour request</h2>
      <p>
        The tour form collects the fields you fill in:
      </p>
      <ul>
        <li>Name, which is required.</li>
        <li>Email address, which is required, so the desk can reply.</li>
        <li>Phone number, including the area code, which is required.</li>
        <li>Plan, if you choose one. You may leave this as “Not sure yet.”</li>
        <li>Timing: as soon as you can, in the next three months, in three to six months, or just looking.</li>
        <li>A note, which is optional. Write only what the desk needs in order to plan the visit.</li>
      </ul>
      <p>
        When you send the form, those fields are delivered to the front desk by FormSubmit, a message-delivery
        service. The message subject is “Tour request from the Ocean Park website,” and the reply address is the email
        you entered, so the desk can answer you directly. The desk uses the note to arrange or decline the visit. The
        website does not keep a separate account of tour requests after the note is sent. If you want the desk to
        delete the note, correct a phone number, or stop using the email you sent, call {building.phone}.
      </p>
      <p>
        Do not put a Social Security number, a financial account number, a password, or a copy of an identity document
        in the note. The form is not the place for those papers.
      </p>

      <h2>The resident library</h2>
      <p>
        The library is the document section of the About page. It lists association files by category, including
        insurance, budgets, financial reports, governing documents, minutes, move-in applications, inspections,
        reservation forms, satisfaction letters, special assessments, and unit modification forms. The list and the
        files are not shown until a code is accepted.
      </p>
      <p>
        To request a code, you enter an email address. The site asks the association’s VestaFlo desk system whether
        that address belongs to an approved unit owner or an approved association employee for this building. If it
        does, VestaFlo emails a one-time numeric code to that inbox. The code expires after 15 minutes and works
        once. If the address is not on file, or if the account is not approved, no code is sent. The page uses the
        same confirmation either way, so the form does not reveal whether an address is in the association’s records.
      </p>
      <p>
        After you enter a valid code, this browser tab stores the email address and the time the library session
        expires. It does not store the code. The session lasts up to 12 hours. It ends sooner if you choose “Close
        the library” or if you close the tab. Opening a new tab starts over and asks for a code again. While the
        session is open, the page requests the document list from VestaFlo and shows each file in its category.
        Opening a file loads it from that same desk system so you can read it.
      </p>
      <p>
        The email addresses themselves are records the association already keeps for owners and staff. This website
        does not create that directory, and it does not publish it. To change the email on file, or to ask that a
        code no longer be sent to an old address, call the front desk.
      </p>

      <h2>What the site does not do</h2>
      <p>
        The site does not sell, rent, or trade personal information. It does not send a mailing list to advertisers.
        It does not ask children to create accounts or to submit a tour form. A parent who believes a child sent a
        tour note can call the desk and ask that the note be discarded.
      </p>
      <p>
        The association may update this policy when the form or the library changes. The date at the top of this page
        is the version in effect.
      </p>

      <h2>Questions</h2>
      <p>
        Call <a href={building.phoneHref}>{building.phone}</a>, or speak to the desk at {building.address},{" "}
        {building.city}, {building.state} {building.zip}.
      </p>
    </div>
  )
}
