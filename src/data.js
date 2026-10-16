export const building = {
  name: "Ocean Park Condominium",
  stories: 15,
  homes: 119,
  year: 1969,
  architect: "Sklar Isaac & Associates Architects Inc",
  address: "6450 Collins Avenue",
  city: "Miami Beach",
  state: "FL",
  zip: "33141",
  neighborhood: "North Shore",
  phone: "(305) 864-1348",
  phoneHref: "tel:+13058641348",
  desk: "Front desk, 24 hours",
  hoaMin: 1210,
  hoaMax: 1644,
}

export const residences = [
  {
    id: "studio",
    name: "Studio",
    offering: "layout",
    beds: 0,
    bathsText: "1 bath",
    sqftLabel: "About 700 sq ft",
    exposure: "Ocean",
    plan: "studio",
    line: "A compact residence with one bathroom.",
    summary:
      "Studios are about 700 square feet with one bathroom: a compact residence for someone who wants the ocean close and the plan simple.",
    fine: "One bathroom · about 700 sq ft",
    story: [
      "Studio residences are the smallest plans in the building, about 700 square feet, with a single bathroom. They are meant to be comfortable without spreading across a large floor.",
      "The plan includes a balcony.",
    ],
    images: [
      {
        src: "/images/living.jpg",
        alt: "A furnished living room with a sofa and tall windows.",
      },
      {
        src: "/images/kitchen.jpg",
        alt: "A kitchen with dark cabinets and a window over the sink.",
      },
    ],
  },
  {
    id: "1br",
    name: "One bedroom",
    offering: "layout",
    beds: 1,
    bathsText: "1–2 baths",
    sqftLabel: "630–1,380 sq ft",
    exposure: "Ocean",
    plan: "1br",
    line: "The size most people picture when they ask about the building.",
    summary:
      "One-bedroom residences run from 630 to 1,380 square feet, with one or two bathrooms.",
    fine: "One or two bathrooms",
    story: [
      "One-bedroom plans vary more than the name suggests. The smaller ones are about 630 square feet. The larger ones reach about 1,380 square feet and can have a second bathroom.",
      "These plans have a balcony. Many have stainless steel appliances, granite countertops, and impact windows and doors.",
    ],
    images: [
      {
        src: "/images/living.jpg",
        alt: "A living room with a leather sofa and tall windows.",
      },
      {
        src: "/images/bedroom.jpg",
        alt: "A bedroom with an upholstered bed and linen curtains.",
      },
      {
        src: "/images/kitchen.jpg",
        alt: "A kitchen with dark cabinets and a window over the sink.",
      },
    ],
  },
  {
    id: "2br",
    name: "Two bedrooms",
    offering: "layout",
    beds: 2,
    bathsText: "1–2.5 baths",
    sqftLabel: "1,006–1,380 sq ft",
    exposure: "Ocean",
    plan: "2br",
    line: "A wider plan, often with a large terrace toward the ocean.",
    summary:
      "Two-bedroom residences run from 1,006 to 1,380 square feet, with one to two and a half bathrooms.",
    fine: "Ocean terrace · one to two and a half baths",
    story: [
      "Two-bedroom residences are spacious for the building, from 1,006 to 1,380 square feet, with one to two and a half bathrooms. Large terraces often face the ocean.",
      "Finishes on these plans run to travertine floors and, in some homes, smart-home features.",
    ],
    images: [
      {
        src: "/images/kitchen3.jpg",
        alt: "A bright kitchen with a long island and wood stools.",
      },
      {
        src: "/images/kitchen.jpg",
        alt: "A kitchen with dark cabinets and open shelves.",
      },
      {
        src: "/images/living.jpg",
        alt: "A living room with tall windows and afternoon light.",
      },
    ],
  },
  {
    id: "3br",
    name: "Three bedrooms",
    offering: "layout",
    beds: 3,
    bathsText: "2–4 baths",
    sqftLabel: "1,006–2,200 sq ft",
    exposure: "Ocean",
    plan: "3br",
    line: "The largest plans, with the ocean and the skyline.",
    summary:
      "Three-bedroom residences are the largest in the building, from 1,006 to 2,200 square feet, with two to four bathrooms, and views toward the ocean and the Miami skyline.",
    fine: "Two to four bathrooms · flow-through plans",
    story: [
      "Three-bedroom residences are the largest homes here, from about 1,006 to 2,200 square feet, with two to four bathrooms and a balcony. The plans open up: flow-through porcelain tile, and views of both the ocean and the Miami skyline.",
      "Many homes in the building, including these, have walk-in closets, a washer and dryer in the residence, and smart lighting.",
    ],
    images: [
      {
        src: "/images/bath2.jpg",
        alt: "A primary bath with a freestanding tub and a glass shower.",
      },
      {
        src: "/images/kitchen3.jpg",
        alt: "A white kitchen with a marble island.",
      },
      {
        src: "/images/bedroom.jpg",
        alt: "A bedroom with layered bedding and tall windows.",
      },
    ],
  },
]

export const amenities = [
  {
    title: "Pool",
    text: "A heated community pool, with a deck, a barbecue, and a picnic area. The building is waterfront, and the residences look out to the ocean.",
  },
  {
    title: "Fitness",
    text: "A fitness center with Wi-Fi and an activity room.",
  },
  {
    title: "Clubhouse",
    text: "A clubhouse for residents, separate from the lobby.",
  },
  {
    title: "Laundry and storage",
    text: "Laundry in the building, community storage, bicycle storage, and package reception at the desk. Many residences also have a washer and dryer of their own.",
  },
  {
    title: "Secure lobby",
    text: "A secure lobby, and an on-site manager. The front desk and security are staffed 24 hours.",
  },
  {
    title: "Elevator",
    text: "The tower is fifteen stories. You ride up; you do not walk it.",
  },
  {
    title: "Garage",
    text: "One or two assigned garage spaces per residence, in a secured garage, plus community parking.",
  },
  {
    title: "Pets",
    text: "Pets are allowed, with restrictions and a size limit. Ask the manager for the current rule before you arrive with an animal.",
  },
]

export const placePhotos = [
  {
    name: "Allison Park",
    src: "/images/places/allison-park.jpg",
    alt: "Allison Park in Miami Beach, a palm-lined path opening toward the ocean.",
  },
  {
    name: "The park in front",
    src: "/images/ocean-park.jpg",
    alt: "The park in front of Ocean Park Condominium, with palms, a sandy path, and the beach.",
  },
  {
    name: "The beach",
    src: "/images/places/midbeach.jpg",
    alt: "The Atlantic shoreline in Miami Beach, with the water on the right and towers inland.",
  },
  {
    name: "The boardwalk",
    src: "/images/places/boardwalk.jpg",
    alt: "The brick beach boardwalk in Miami Beach, bordered by sea grape and palms.",
  },
  {
    name: "Miami Beach Bandshell",
    src: "/images/places/bandshell.jpg",
    alt: "The Miami Beach Bandshell, a round canopy on yellow columns beside a white wall and palms.",
  },
]

export const places = [
  {
    name: "Allison Park",
    time: "1 min",
    note: "A one-minute walk. Bike trails, picnic areas, and a playground, with the beach just beyond.",
  },
  {
    name: "The beach",
    time: "Oceanfront",
    note: "The building is on the ocean. The sand is the near edge of the day, not an errand.",
  },
  {
    name: "North Beach Oceanside Park",
    time: "Nearby",
    note: "The neighborhood’s main green space: tropical planting, a shaded playground, walking trails, a tennis facility, and a direct way onto the beach.",
  },
  {
    name: "Miami Beach Bandshell",
    time: "Nearby",
    note: "A historic venue for concerts, dances, shows, and community talks.",
  },
  {
    name: "Brittany Bay Park",
    time: "Short ride",
    note: "Another nearby park, with bike trails, picnic areas, and a playground.",
  },
  {
    name: "La Gorce Park",
    time: "Short ride",
    note: "On the bay side of the neighborhood, with the same easy mix of paths and picnic shade.",
  },
  {
    name: "El Ranchero Grande",
    time: "On Collins",
    note: "A neighborhood restaurant on Collins Avenue, known here for Mexican cooking.",
  },
  {
    name: "Prime 54",
    time: "Nearby",
    note: "A steakhouse with its own reading of the form, when dinner is the point of the evening.",
  },
  {
    name: "Publix",
    time: "Walk",
    note: "Groceries, a market, and a pharmacy are within walking distance. Day-to-day errands do not require a causeway.",
  },
  {
    name: "Ocean Life Studio",
    time: "Walk",
    note: "A fitness studio outside the building, highly rated, if the gym downstairs is not the workout you want.",
  },
  {
    name: "South Beach",
    time: "5 miles",
    note: "Five miles south. Close enough for a night out, far enough that North Shore stays quieter.",
  },
  {
    name: "Miami International",
    time: "35 min",
    note: "About thirty-five minutes by car.",
  },
  {
    name: "Fort Lauderdale / Hollywood",
    time: "40 min",
    note: "About forty minutes by car to the other airport.",
  },
]

export const schools = [
  { name: "Biscayne Elementary School", level: "Elementary" },
  { name: "Nautilus Middle School", level: "Middle" },
  { name: "Miami Beach Senior High School", level: "High school" },
]

export function formatMoney(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
}

export function bedsLabel(count) {
  if (count === 0) return "Studio"
  return `${count} bed${count === 1 ? "" : "s"}`
}

export function getResidence(id) {
  return residences.find((home) => home.id === id)
}
