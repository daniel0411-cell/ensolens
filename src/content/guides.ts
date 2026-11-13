export interface Guide {
  published: string; modified: string; reviewed: string; sourcesChecked: string;
  slug: string; title: string; description: string; category: string; answer: string;
  sections: { title: string; paragraphs: string[] }[];
  checklist: string[];
  sources: { title: string; url: string; date: string }[];
  related: { title: string; href: string }[];
}
export const guides: Guide[] = [
  {
    published: '2026-11-12', modified: '2026-11-13', reviewed: '2026-11-13', sourcesChecked: '2026-11-12',
    slug: 'kelvin-waves-and-enso', title: 'What do Kelvin waves tell us about El Niño?', category: 'Ocean processes',
    description: 'Understand equatorial Kelvin waves, thermocline changes and the evidence needed before treating a subsurface signal as an El Niño forecast.',
    answer: 'A downwelling equatorial Kelvin wave can help move a warm subsurface signal eastward and deepen the thermocline. It is evidence about ocean evolution, not a declaration that El Niño will develop or strengthen.',
    sections: [
      { title: 'A wave that is bigger than the waves you see', paragraphs: [
        'An equatorial oceanic Kelvin wave is a broad, slowly traveling disturbance of the upper ocean. It is different from a breaking beach wave or a tsunami. NOAA describes equatorial waves crossing the Pacific over roughly two to three months. That travel time gives forecasters information about possible changes ahead, but it is not a countdown to an ENSO event.',
        'Changes in equatorial winds can generate these disturbances. Westerly wind episodes can help initiate a downwelling wave that travels east. The useful signal includes changes below the surface, in the depth of the thermocline: the transition between the warm upper layer and colder water beneath it.'
      ] },
      { title: 'Why thermocline depth matters', paragraphs: [
        'A downwelling wave deepens the thermocline. In the eastern equatorial Pacific, that can make it harder for upwelling to bring cold water close to the surface, supporting warmer surface conditions. An upwelling wave has the opposite thermocline displacement. The eventual surface response also depends on the winds and the background ocean state.',
        'This is why a surface temperature chart and a subsurface cross-section answer different questions. Surface anomalies describe the near-surface ocean temperatures represented by the SST product; subsurface observations describe a reservoir and its vertical structure. A warm surface patch alone does not demonstrate that a Kelvin wave is passing underneath it.'
      ] },
      { title: 'What a convincing monitoring sequence looks like', paragraphs: [
        'Look for a disturbance that progresses eastward across successive, consistently dated ocean analyses. Then check whether surface temperatures, equatorial winds and tropical rainfall evolve in a compatible way. Multiple waves can occur within one event, and later wind changes can support or interrupt development. A single colorful cross-section cannot establish the full sequence.',
        'Sea-level observations can provide another clue because upper-ocean temperature and thermocline changes affect sea-surface height. They are complementary evidence, not a substitute for temperature profiles. Coastal propagation after a wave reaches the Americas also does not assign a local flood height to a particular harbor.'
      ] },
      { title: 'How to use the signal without overreading it', paragraphs: [
        'Treat Kelvin-wave reports as one part of the monitoring discussion. Keep the observation date, ocean region and wave type attached to the claim. For the assessed ENSO state and seasonal odds, return to the dated CPC discussion and forecast. A wave is a physical mechanism; a probability forecast is an assessment of several possible outcomes.',
        'For coastal decisions, consult the relevant tide, coastal flood and weather products. A basin-scale ocean disturbance cannot specify whether a road will flood on a particular tide or whether a storm will reach your town.'
      ] }
    ], checklist: ['Check the wave type and subsurface observation dates.', 'Look for eastward progression across more than one analysis.', 'Confirm the atmospheric response before inferring an ENSO transition.'],
    sources: [{ title: 'NOAA Ocean Service: What is a Kelvin wave?', url: 'https://oceanservice.noaa.gov/facts/kelvin-waves.html', date: 'Updated October 15, 2026' }],
    related: [{ title: 'Ocean–atmosphere coupling', href: '/methodology/#ocean-atmosphere-heading' }, { title: 'How an ENSO event ends', href: '/forecast/when-will-it-end/' }]
  },
  {
    published: '2026-11-12', modified: '2026-11-13', reviewed: '2026-11-13', sourcesChecked: '2026-11-12',
    slug: 'soi-vs-ocean-indices', title: 'SOI versus Niño 3.4: why ENSO indices can disagree', category: 'Reading indicators',
    description: 'Compare the Southern Oscillation Index with ocean temperature indices, including opposite signs, averaging periods and short-lived disagreement.',
    answer: 'The Southern Oscillation Index measures a standardized air-pressure difference; Niño 3.4 measures ocean temperature over a defined region. Their signs, units and short-term behavior differ because they describe different parts of ENSO.',
    sections: [
      { title: 'Start with what each number measures', paragraphs: [
        'The traditional SOI is based on the sea-level pressure difference between Tahiti and Darwin, Australia. Normalization expresses that difference relative to its historical variability. It is an atmospheric indicator, not a temperature reading. NOAA PSL notes that calculation methods vary slightly between centers, so the provider matters when comparing values.',
        'Niño 3.4 refers to a box in the equatorial Pacific. A conventional SST anomaly measures how warm or cool its surface is relative to the relevant seasonal baseline. ONI and RONI are seasonal indices associated with that region, but their processing differs. ENSOLens labels weekly conventional anomalies separately from seasonal RONI; a number from one series should not be pasted into another.'
      ] },
      { title: 'The signs often point in opposite directions', paragraphs: [
        'El Niño is generally associated with a lower or negative SOI and warmer equatorial Pacific SST anomalies. La Niña is generally associated with a higher or positive SOI and cooler anomalies. This is not a contradiction: weaker east–west pressure differences and trade winds can accompany warmer central and eastern equatorial waters.',
        'A negative SOI therefore does not mean a cold ocean. Nor does one unit of SOI equal one degree of SST anomaly. A chart overlay needs separate labeled axes or a clearly explained standardization. Reading two lines against one unlabeled scale can create a relationship that the actual measurements do not support.'
      ] },
      { title: 'Why a daily reading can look out of step', paragraphs: [
        'Weather systems affect pressure at the two stations, so a brief SOI excursion can occur without a durable change in the coupled tropical Pacific. Ocean temperatures also evolve on different timescales. Comparing a daily pressure index with a three-month ocean average makes short-term disagreement especially likely.',
        'First align averaging periods and dates. Then consider whether the disagreement persists and whether winds and tropical convection support it. An atmosphere that has not settled into a matching pattern is useful information about coupling, rather than a reason to declare one dataset wrong. Missing or delayed observations need separate handling.'
      ] },
      { title: 'Use a dashboard, not a single trigger', paragraphs: [
        'An ENSO assessment combines ocean and atmospheric evidence. SOI can help explain that assessment, but it is not a standalone local weather forecast or a universal event-declaration switch. Check the issuing center’s definitions rather than borrowing a threshold from another provider.',
        'When sharing a reading, include the provider, averaging window, observation period and units. For a transition claim, cite the official assessment as well. This makes it possible to distinguish a noisy week from sustained ocean–atmosphere behavior without pretending that every indicator must change simultaneously.'
      ] }
    ], checklist: ['Identify pressure versus temperature and label the units.', 'Compare matching averaging periods and providers.', 'Use sustained ocean, wind and rainfall evidence together.'],
    sources: [{ title: 'NOAA PSL: SOI description and specifications', url: 'https://psl.noaa.gov/data/timeseries/month/DS/SOI/', date: 'No publication date displayed; method references include 1987' }, { title: 'NOAA PMEL: ENSO FAQ, index definitions', url: 'https://www.pmel.noaa.gov/elnino/faq', date: 'Undated reference; historical examples are not current forecasts' }],
    related: [{ title: 'ENSOLens data definitions', href: '/methodology/' }, { title: 'The Niño regions', href: '/learn/nino-regions-explained/' }]
  },
  {
    published: '2026-11-12', modified: '2026-11-13', reviewed: '2026-11-13', sourcesChecked: '2026-11-12',
    slug: 'nino-regions-explained', title: 'Niño 1+2, 3, 3.4 and 4: which Pacific region matters?', category: 'Reading indicators',
    description: 'Locate the four Niño sea-temperature regions and learn why coastal warming, a basin-wide ENSO assessment and regional impacts are different questions.',
    answer: 'The Niño regions sample different parts of the tropical Pacific. Niño 3.4 is central to ENSO monitoring, while the far-eastern Niño 1+2 region is closer to Peru and Ecuador. A large anomaly in one box does not describe the whole basin.',
    sections: [
      { title: 'Four boxes, different geographic questions', paragraphs: [
        'NOAA PSL lists Niño 1+2 at 0–10°S, 90–80°W; Niño 3 at 5°N–5°S, 150–90°W; Niño 3.4 at 5°N–5°S, 170–120°W; and Niño 4 at 5°N–5°S, 160°E–150°W. The boxes overlap in places. They are monitoring regions, not four separate ENSO events.',
        'Niño 1+2 samples the far eastern Pacific near South America. Niño 3 spans a broader eastern area, Niño 3.4 the east-central equatorial Pacific, and Niño 4 the central Pacific farther west. An area average compresses a spatial pattern into one number, so even a precisely measured index leaves information out.'
      ] },
      { title: 'Coastal warming is not automatically basin-wide El Niño', paragraphs: [
        'The name El Niño originated with warm water near the South American coast, but modern ENSO assessment describes a coupled basin-scale ocean–atmosphere pattern. Coastal anomalies and broad equatorial anomalies can develop differently. A headline about Peru therefore needs its region and definition attached.',
        'Strong warming in Niño 1+2 does not by itself establish a matching Niño 3.4 anomaly, sustained atmospheric coupling or a particular North American winter outcome. Conversely, a basin-wide event does not specify the exact coastal rainfall or marine impacts in every location. Use local agencies for those regional assessments.'
      ] },
      { title: 'Why the largest number does not win', paragraphs: [
        'The regions have different climatologies and variability. A larger anomaly in one region is not a fair ranking of event strength against an index from another region. Changing the averaging window, SST dataset or baseline can also change the comparison. The correct first step is to align the definitions, not select the most dramatic value.',
        'For example, comparing a weekly Niño 1+2 anomaly with seasonal RONI mixes geography, time averaging and index construction. It cannot show that an event has crossed an official strength threshold. Read a consistent series for changes through time and a map for the spatial pattern.'
      ] },
      { title: 'What the spatial pattern can and cannot tell you', paragraphs: [
        'Where warming is concentrated matters because atmospheric convection and circulation respond to the pattern of ocean conditions, not just one basin average. But turning a map into a regional precipitation forecast requires more than naming an eastern- or central-Pacific pattern. Other ocean conditions and atmospheric variability also contribute.',
        'Use regional indices to ask better monitoring questions: Is warming broadening? Is the center shifting? Are the winds and rainfall consistent? Answer those questions with dated analyses. For seasonal decisions, use a dated regional outlook rather than an assumed one-to-one translation from a Niño box.'
      ] }
    ], checklist: ['Keep the latitude and longitude box attached to each index.', 'Match dataset, baseline and time window before comparing.', 'Separate coastal observations from basin-wide assessment.'],
    sources: [{ title: 'NOAA PSL: Datasets useful for ENSO research', url: 'https://psl.noaa.gov/enso/data.html', date: 'No publication date displayed; geographic definitions used' }, { title: 'NOAA PMEL: ENSO naming and definitions', url: 'https://www.pmel.noaa.gov/elnino/faq', date: 'Undated reference; historical terminology discussed' }],
    related: [{ title: 'SOI versus ocean indices', href: '/learn/soi-vs-ocean-indices/' }, { title: 'Current ENSO observations', href: '/' }]
  },
  {
    published: '2026-11-12', modified: '2026-11-13', reviewed: '2026-11-13', sourcesChecked: '2026-11-12',
    slug: 'enso-and-climate-change', title: 'El Niño and climate change: what each explains', category: 'Climate context',
    description: 'Separate ENSO variability from long-term warming, regional ocean anomalies from global temperatures, and annual records from event attribution.',
    answer: 'ENSO redistributes heat and changes atmospheric circulation over months to years. Human-caused warming changes the long-term background. Both can influence the same year, but an ENSO index cannot measure or explain the entire global temperature trend.',
    sections: [
      { title: 'A temporary fluctuation on a changing background', paragraphs: [
        'El Niño can raise global average surface temperature as heat moves from the tropical ocean into the atmosphere. La Niña can temporarily pull that average in the other direction. These fluctuations occur within a longer-term climate trend; a cooler year relative to the preceding year is not necessarily cool relative to earlier decades.',
        'IPCC’s 2021 assessment treats future ENSO variability as a scenario-based climate question. Chapter 4 separates rainfall variability from sea-surface temperature variability: stronger projected rainfall fluctuations do not imply an equally certain change in SST amplitude. A projection over the 21st century is different from a forecast for the next season.'
      ] },
      { title: 'Do not compare unrelated anomaly numbers', paragraphs: [
        'A Niño 3.4 anomaly describes one ocean region relative to a product-specific climatology. A global surface temperature anomaly combines a much larger area and may use an 1850–1900 reference. Subtracting the two numbers does not isolate the contribution of El Niño to global warming.',
        'Likewise, a relative ENSO index is designed to describe a tropical Pacific signal against a broader temperature background. It is not a measurement of all ocean heat or a replacement for global temperature records. Always preserve the index name, spatial coverage and baseline when discussing a record.'
      ] },
      { title: 'A hot year does not attribute every event', paragraphs: [
        'A seasonal ENSO relationship and long-term warming can both affect the conditions in which weather occurs. But the cause of a particular heatwave, flood or drought requires an event-specific analysis. A global average cannot tell you how much rainfall a single storm produced or how its probability changed.',
        'The same caution applies to future ENSO behavior. One exceptional event cannot establish a trend in event frequency or strength. That question requires long records, consistent definitions, climate models and an explicit treatment of uncertainty. A short sequence of large anomalies is not enough to answer it.'
      ] },
      { title: 'Read temperature headlines in the right order', paragraphs: [
        'First identify the variable and region. Then check the reference period and whether the result is observed, provisional or forecast. Finally, separate the explanation of the broad background from the attribution of a specific event. This avoids treating a prediction for later in the year as an already observed record.',
        'For practical planning, combine the latest regional seasonal outlook with shorter-range weather information. Knowing the ENSO phase helps explain one source of seasonal predictability; it does not remove other climate influences or the need for current local warnings.'
      ] }
    ], checklist: ['Separate regional SST anomalies from global surface temperature.', 'Keep the baseline and provisional or final status visible.', 'Require event-specific evidence for individual extremes.'],
    sources: [{ title: 'IPCC AR6 WGI Chapter 4: ENSO variability, section 4.3.3.2', url: 'https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-4/', date: '2021 assessment; section checked November 13, 2026; long-term projections, not a current ENSO outlook' }, { title: 'WMO: State of the Climate 2026 update', url: 'https://wmo.int/news/media-centre/state-of-climate-2026-gives-new-meaning-phrase-charts', date: 'Published November 9, 2026; provisional update, not a final annual report' }, { title: 'NOAA: Understanding El Niño and ENSO', url: 'https://www.noaa.gov/understanding-el-nino', date: 'Updated June 10, 2026; mechanism overview only' }],
    related: [{ title: 'Climate normals and anomalies', href: '/learn/climate-normals-and-anomalies/' }, { title: 'ENSO-neutral explained', href: '/forecast/enso-neutral/' }]
  },
  {
    published: '2026-11-12', modified: '2026-11-13', reviewed: '2026-11-13', sourcesChecked: '2026-11-12',
    slug: 'marine-heatwaves-vs-el-nino', title: 'Is a Pacific marine heatwave the same as El Niño?', category: 'Climate context',
    description: 'Learn why a marine heatwave near the West Coast and a tropical Pacific ENSO event can overlap without being the same phenomenon.',
    answer: 'No. A marine heatwave describes unusually warm ocean conditions for a particular place and time of year. El Niño describes a coupled tropical Pacific pattern. They can interact, but neither label automatically establishes the other.',
    sections: [
      { title: 'Start with location and definition', paragraphs: [
        'NOAA’s California Current tracker defines marine heatwaves by temperatures that are unusually high for a location and season over an extended period. Its large-event tracking rules also consider strength and area. Those regional tracking criteria should not be treated as a universal ENSO definition.',
        'El Niño is assessed from conditions in the central and eastern equatorial Pacific and the matching atmospheric response. A warm patch in the Gulf of Alaska or off California is geographically distinct from Niño 3.4. Calling every red Pacific map El Niño erases the location information needed to understand it.'
      ] },
      { title: 'Local winds can change coastal temperatures', paragraphs: [
        'Along the U.S. West Coast, wind-driven upwelling can bring colder, nutrient-rich water toward the surface. When those winds weaken or reverse, coastal water can warm or offshore warm water can approach the coast. This gives regional winds an important role even when an ENSO event is also underway.',
        'An offshore heatwave therefore does not mean every coastal site has the same temperature anomaly. A regional average can conceal sharp differences near the coast. The tracker’s area, distance from shore and coastal coverage are different quantities; use the one that matches the ecological or management question.'
      ] },
      { title: 'Interaction is possible without a single cause', paragraphs: [
        'El Niño can influence coastal ocean conditions through atmospheric changes and oceanic wave propagation. A marine heatwave can also begin before an El Niño or occur in other ENSO phases. Co-occurrence alone cannot show how much warming each process contributed.',
        'NOAA’s tracker discussion explicitly distinguishes local atmospheric forcing from El Niño-related warming. This guide uses that mechanism-level distinction and does not reproduce its rolling event status as a live report. To discuss a specific episode, retain the tracker update date and the observation period of each map.'
      ] },
      { title: 'A temperature map is not an ecological impact count', paragraphs: [
        'Marine heatwaves can disrupt species distributions, food webs and fisheries, but impacts vary with depth, duration, season and exposure. Surface warmth alone does not establish a harmful algal bloom, a fishery closure or a quantified loss. Those claims need biological observations and the relevant management notices.',
        'For an ocean question, use the regional marine heatwave product and its methods. For ENSO, use CPC’s basin-scale assessment. For a coastal hazard or fishery decision, use the responsible agency’s current advice. Keeping these sources distinct makes the connection clearer without inventing a universal Pacific hazard index.'
      ] }
    ], checklist: ['Identify the region, depth, duration and heatwave criteria.', 'Check coastal conditions separately from offshore area.', 'Use observed biological evidence for ecological impact claims.'],
    sources: [{ title: 'NOAA IEA: California Current marine heatwave tracker', url: 'https://www.integratedecosystemassessment.noaa.gov/regions/california-current/california-current-marine-heatwave-tracker-blobtracker', date: 'Discussion updated October 30, 2026; definitions and mechanisms used, not live event status' }, { title: 'NOAA: Understanding ENSO', url: 'https://www.noaa.gov/understanding-el-nino', date: 'Updated June 10, 2026; broad ENSO mechanism' }],
    related: [{ title: 'Kelvin waves and ENSO', href: '/learn/kelvin-waves-and-enso/' }, { title: 'ENSO and climate change', href: '/learn/enso-and-climate-change/' }]
  },
  {
    published: '2026-11-12', modified: '2026-11-13', reviewed: '2026-11-13', sourcesChecked: '2026-11-12',
    slug: 'el-nino-and-drought-recovery', title: 'Can El Niño end a drought? Rainfall versus recovery', category: 'Water and weather',
    description: 'Understand why a wetter seasonal outlook is not a drought-recovery guarantee, and which soil, snow, reservoir and groundwater observations to check.',
    answer: 'El Niño can shift seasonal rainfall odds in some regions, but drought recovery depends on where water falls, how it is stored and the size of existing deficits. A wet storm or wet season does not automatically restore every part of the water system.',
    sections: [
      { title: 'A seasonal tendency is the start of the question', paragraphs: [
        'El Niño often favors a more active southern U.S. winter storm track, while La Niña often favors drier southern conditions. These broad relationships do not give every watershed the same probability. The actual CPC regional outlook can differ because it considers the specific season and other information.',
        'Even an outlook favoring above-normal precipitation describes a category probability, not the number of inches needed to erase a deficit. It also cannot specify whether precipitation will fall steadily, arrive in a few storms or miss the most depleted basin. Recovery requires observations after water arrives.'
      ] },
      { title: 'Different water stores recover on different clocks', paragraphs: [
        'Surface soil can respond to rainfall while deeper stores remain depleted. Snowpack stores water for later melt, reservoirs reflect inflow and operations, and aquifers depend on recharge as well as pumping. A favorable reading in one store does not establish that the entire system has recovered.',
        'USGS explains that groundwater levels depend on infiltration, aquifer characteristics and withdrawals. Shallow water-table wells can respond differently from deep confined wells. A rainy month cannot be translated into a universal groundwater-recovery deadline, and a rising river does not demonstrate that nearby wells have refilled.'
      ] },
      { title: 'Why flooding and drought can coexist', paragraphs: [
        'Flooding describes water causing harm at a particular place and time. Drought describes a shortage relative to the needs and conditions being assessed. Intense runoff can produce a dangerous flood while longer-term groundwater or reservoir deficits persist. The two labels are not mutually exclusive.',
        'In snow-fed basins, rain and snow also have different timing. A warm storm may deliver immediate runoff instead of building the mountain snow reservoir needed for spring and summer. This is why rainfall totals, snow-water equivalent and seasonal water-supply forecasts should be read separately.'
      ] },
      { title: 'Build a recovery check around the actual shortage', paragraphs: [
        'For a garden or crop, examine root-zone moisture and local agricultural advice. For a reservoir system, check storage, inflows and the operator’s supply assessment. For a private well, consult local groundwater observations and qualified local advice. Choose indicators for the resource, rather than using the ENSO phase as a recovery score.',
        'Record the comparison period and location for each indicator. A basin total, statewide percentage and individual station may tell different stories without contradicting one another. Continue to follow flood warnings during wet periods and water-use guidance while supply deficits remain; ENSO is context, not the operational instruction.'
      ] }
    ], checklist: ['Identify the depleted store: soil, snow, reservoir or aquifer.', 'Compare observed recovery with the same basin and baseline.', 'Keep flood hazards separate from long-term supply recovery.'],
    sources: [{ title: 'USGS: Drought and groundwater levels', url: 'https://www.usgs.gov/water-science-school/science/drought-and-groundwater-levels', date: 'Page dated September 17, 2026' }, { title: 'NWS: Typical ENSO winter circulation', url: 'https://www.weather.gov/mhx/ensowhat', date: 'No publication date displayed; seasonal tendencies only' }],
    related: [{ title: 'California rain, snow and water storage', href: '/impacts/california-snow-vs-rain/' }, { title: 'Northwest snow drought', href: '/impacts/pacific-northwest-winter/#snow-drought-heading' }]
  },
  {
    published: '2026-11-12', modified: '2026-11-13', reviewed: '2026-11-13', sourcesChecked: '2026-11-12',
    slug: 'enso-jet-stream-teleconnections', title: 'How does El Niño affect the jet stream over North America?', category: 'Water and weather',
    description: 'Follow the connection from tropical Pacific rainfall to atmospheric circulation and North American winter tendencies without treating jet-stream diagrams as daily forecasts.',
    answer: 'ENSO changes where tropical Pacific thunderstorms release heat into the atmosphere. The resulting circulation response can shift Pacific jet streams and storm tracks, changing North American seasonal odds rather than prescribing each storm.',
    sections: [
      { title: 'The connection begins with tropical rainfall', paragraphs: [
        'Warm ocean water supports evaporation and deep convection, but the spatial pattern matters. During El Niño, tropical Pacific rainfall tends to shift toward the central and eastern basin as the usual winds and circulation weaken. La Niña tends to reinforce the contrasting pattern. This changes the location of atmospheric heating.',
        'That heating helps alter atmospheric circulation beyond the tropics. The distant connection is called a teleconnection. It is not a stream of warm seawater traveling across North America, and it is not simply warm air from one ocean box blowing directly into every northern state.'
      ] },
      { title: 'What a typical winter diagram actually shows', paragraphs: [
        'The National Weather Service describes a stronger, extended Pacific jet across the southern U.S. as a typical El Niño winter pattern. That can support wetter southern conditions and milder seasonal conditions farther north. La Niña often favors a different, more variable Pacific pattern, with cooler northern and drier southern tendencies.',
        'These are broad late-fall through early-spring relationships, often illustrated using moderate or strong events. The drawn line is not the observed position of the jet on every winter day. Its exact placement, strength and interaction with other circulation features vary from week to week and event to event.'
      ] },
      { title: 'Why cold outbreaks still happen in a mild winter', paragraphs: [
        'A seasonal temperature average combines many days. A brief cold outbreak can occur within a warmer-than-normal season, just as a wet season can include dry weeks. Atmospheric blocking, internal variability and other drivers can temporarily dominate the local weather pattern.',
        'Snowfall adds another requirement: moisture and sufficiently cold air must coincide. A seasonal jet-stream tendency alone cannot determine whether that happens over a particular town. Elevation, storm track and the temperature profile through the atmosphere matter for each event, which is why seasonal rainfall odds are not snowfall totals.'
      ] },
      { title: 'Translate the mechanism into the right forecast', paragraphs: [
        'Use the teleconnection to understand why forecasters may tilt seasonal probabilities, then read the actual regional map for the target season. For an upcoming trip, switch to shorter-range forecasts. For a storm, consult local forecast discussions and warnings rather than a generic ENSO schematic.',
        'When comparing winters, ask whether the observed circulation resembled the typical pattern and for how long. A phase label alone cannot explain every regional outcome. Keeping the pathway—tropical heating, circulation response, storm tracks and local conditions—visible helps identify where uncertainty enters the chain.'
      ] }
    ], checklist: ['Read jet-stream diagrams as typical seasonal patterns.', 'Separate seasonal averages from individual cold outbreaks.', 'Use local forecasts for the timing and type of precipitation.'],
    sources: [{ title: 'NWS: What is ENSO? Typical winter circulation', url: 'https://www.weather.gov/mhx/ensowhat', date: 'No publication date displayed' }, { title: 'NOAA: Understanding ENSO', url: 'https://www.noaa.gov/understanding-el-nino', date: 'Updated June 10, 2026; tropical rainfall and coupling overview' }],
    related: [{ title: 'Regional winter impacts', href: '/impacts/' }, { title: 'Choosing a forecast horizon', href: '/winter-outlook/#forecast-horizon-heading' }]
  },
  {
    published: '2026-11-12', modified: '2026-11-13', reviewed: '2026-11-13', sourcesChecked: '2026-11-12',
    slug: 'enso-model-plumes-and-probabilities', title: 'How to read an ENSO model plume without inventing probabilities', category: 'Forecast literacy',
    description: 'Learn what ENSO model lines and ensemble spread represent, why a model average is not a guaranteed outcome and how IRI differs from official CPC probabilities.',
    answer: 'A model plume displays forecasts from multiple models. Its spread shows disagreement within that collection, but counting lines above a threshold does not automatically produce a calibrated probability or the official CPC forecast.',
    sections: [
      { title: 'Read the axes before the lines', paragraphs: [
        'Start with the predicted variable, units and target period. IRI’s plume displays Niño 3.4 SST-anomaly predictions from dynamical and statistical models. Check whether points represent overlapping three-month seasons, which reference period the product uses and when each forecast was initialized.',
        'The issue date is not the same as the target season or the start of every model run. Neighboring seasonal points share months, so they are not independent repetitions. A rising line describes a forecast trajectory in that product; it is not a sequence of future weekly observations.'
      ] },
      { title: 'Spread is useful, but not the full uncertainty', paragraphs: [
        'A wide plume shows that the displayed models disagree. A narrow plume shows more agreement within that set. Models can share observations, assumptions or biases, however, so close agreement does not guarantee accuracy. Forecast uncertainty also depends on lead time, season and the quality of the starting observations.',
        'The mean line summarizes the collection. It can sit between different possible evolutions and may never resemble the eventual observed path. Check whether each thin line is a model mean or an individual ensemble member before interpreting the number of lines as independent evidence.'
      ] },
      { title: 'IRI model probabilities and CPC odds are separate products', paragraphs: [
        'IRI explains that its objective plume-based probabilities use model forecasts through a statistical calculation. The official CPC probability forecast also uses human forecaster judgment and a wider assessment of observational and predictive evidence. Their publication timing and available starting information can differ.',
        'Consequently, different percentages need not mean one product is broken. Compare the same target season and year, issue dates and index definitions before discussing a difference. Do not append a later IRI forecast to an earlier CPC series and describe the result as a revision by CPC.'
      ] },
      { title: 'Why counting lines is not enough', paragraphs: [
        'If most displayed lines exceed a threshold, that indicates model agreement in the displayed collection. It does not by itself establish an equally large real-world chance. Calibration requires knowing how forecasts relate to observed outcomes, including model errors. The product’s own probability method matters.',
        'For a useful reading, summarize the favored evolution, the spread, the target season and the source. Then link to the named probability product for numerical odds. Keep event strength separate from local impact severity: even a confident tropical Pacific forecast does not determine a specific city’s winter precipitation.'
      ] }
    ], checklist: ['Identify variable, target season, issue and initialization dates.', 'Check whether lines are model means or ensemble members.', 'Keep IRI model products and official CPC probabilities separate.'],
    sources: [{ title: 'IRI: ENSO Quick Look and figure-method explanations', url: 'https://iri.columbia.edu/our-expertise/climate/forecasts/enso/current/', date: 'Displayed issue October 19, 2026; methods used, no numerical forecast copied' }],
    related: [{ title: 'Reading official CPC probabilities', href: '/forecast/#reading-probabilities-heading' }, { title: 'Lifecycle forecast limits', href: '/forecast/when-will-it-end/' }]
  },
  {
    published: '2026-11-12', modified: '2026-11-13', reviewed: '2026-11-13', sourcesChecked: '2026-11-12',
    slug: 'climate-normals-and-anomalies', title: 'What does above normal mean? Climate baselines and anomalies', category: 'Reading indicators',
    description: 'Understand temperature anomalies, 30-year climate normals and why changing baselines, seasons or datasets can change a comparison.',
    answer: 'An anomaly is a difference from a defined reference, not an absolute temperature. To interpret above normal, identify the variable, place, season, reference period and dataset before comparing numbers.',
    sections: [
      { title: 'Normal is a reference, not a promise', paragraphs: [
        'NOAA’s official U.S. climate normals describe typical conditions using 30-year periods. The current conventional U.S. station normals use 1991–2020. Products include annual, seasonal, monthly, daily and hourly statistics. Normal therefore depends on both location and time of year.',
        'A normal is not the weather expected on every day. Individual observations vary around it. Above-normal winter temperature means warmer relative to the relevant winter reference; it does not mean every day is warm or that freezing temperatures cannot occur. A category in a seasonal outlook is also a probability statement, not an observed departure.'
      ] },
      { title: 'An anomaly needs its full label', paragraphs: [
        'For temperature, a simple anomaly is the observed value minus the reference value for the matching place and period. In a teaching example, water at 28°C compared with a 27°C reference has a +1°C anomaly. Water at 20°C compared with a 19°C reference has the same anomaly despite being much colder in absolute terms.',
        'That arithmetic explains why a red anomaly map is not a map of the hottest absolute water. It also explains why a smaller anomaly in one region can coexist with a higher actual temperature. Use absolute temperature for questions that require physical temperature thresholds; use anomalies to discuss departures from a specified climatology.'
      ] },
      { title: 'Not every product uses the same baseline', paragraphs: [
        'U.S. station normals, global climate reports and ENSO datasets can use different reference periods or additional processing. Do not assume that the 1991–2020 U.S. normals define every ocean index. RONI also uses a relative construction, so it is not interchangeable with a conventional SST anomaly.',
        'If a reference average becomes warmer, the anomaly for the same absolute observation becomes smaller. That is a change of ruler, not evidence that the physical observation cooled. Comparing trends across products requires consistent methods, or an explicit adjustment that preserves what each series measures.'
      ] },
      { title: 'Percent of normal adds another comparison', paragraphs: [
        'Precipitation or snow products may report a percentage of an average or median rather than a temperature difference. The denominator, date and geographic coverage matter. A high percentage early in a season can still represent little accumulated water if the usual amount by that date is small.',
        'Before sharing a chart, retain its legend and reference period. Match the averaging window and location when comparing a new observation with an earlier one. If the baseline or source changes, explain the break instead of drawing a seamless trend. These checks make record and recovery claims much easier to evaluate.'
      ] }
    ], checklist: ['Keep the variable, location and season attached to normal.', 'Read the baseline and dataset in the chart legend.', 'Do not substitute a percentage, absolute value or relative index for an anomaly.'],
    sources: [{ title: 'NOAA NCEI: U.S. Climate Normals', url: 'https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals', date: '1991–2020 release May 2021; selected sites reissued in 2023; no page publication date displayed' }, { title: 'NOAA PSL: ENSO datasets and averaging choices', url: 'https://psl.noaa.gov/enso/data.html', date: 'No publication date displayed' }],
    related: [{ title: 'ENSOLens index methods', href: '/methodology/' }, { title: 'Snow-water percentages', href: '/impacts/california-snow-vs-rain/#swe-percent-heading' }]
  },
  {
    published: '2026-11-12', modified: '2026-11-13', reviewed: '2026-11-13', sourcesChecked: '2026-11-12',
    slug: 'how-enso-is-observed', title: 'How do scientists observe El Niño? Buoys, satellites and ocean analyses', category: 'Ocean processes',
    description: 'Follow ENSO evidence from ocean and atmospheric observations to analyzed indices, and understand why source dates, gaps and revisions matter.',
    answer: 'ENSO monitoring combines instruments in the ocean, satellite observations and atmospheric measurements. No single sensor measures the entire coupled system, and an analyzed regional index is different from one buoy’s reading.',
    sections: [
      { title: 'Different instruments answer different questions', paragraphs: [
        'NOAA PMEL describes an observing system that includes moored and drifting buoys, subsurface temperature measurements, sea-level observations and satellites. Together they provide information about the tropical Pacific that no single platform can supply. A surface map alone cannot describe the full depth of the warm upper ocean.',
        'In-water measurements provide direct information at sampled locations and depths. Satellites give broad views of properties such as surface temperature or sea-surface height, depending on the instrument. Sea-surface height is useful evidence of upper-ocean changes, but it is not a direct reading of temperature at every depth.'
      ] },
      { title: 'From scattered measurements to a regional index', paragraphs: [
        'Observations are not available at every point at every time. SST analyses combine information onto a grid, using dataset-specific methods to address gaps. NOAA PSL notes that SST datasets differ in resolution, time step, coverage and gap-filling approach. Two reputable products can therefore differ slightly without either being a fabricated observation.',
        'A Niño 3.4 index averages an analyzed field over a geographic box. A buoy samples a location within or near that box. Their readings need not match because a point and a regional average represent different scales. Seasonal indices add time averaging and, for relative indices, further processing.'
      ] },
      { title: 'The atmosphere must be observed too', paragraphs: [
        'ENSO is coupled: forecasters also examine winds, pressure and tropical convection. SOI describes a pressure contrast, while outgoing longwave radiation can help monitor deep tropical cloud activity. These indicators describe different pieces of the atmosphere, so agreement is assessed as a pattern rather than a requirement for identical numerical values.',
        'A warm ocean observation cannot establish all of those atmospheric conditions. Conversely, a short-lived wind or pressure disturbance need not imply a lasting ocean transition. Monitoring the system means checking whether compatible signals persist across appropriate timescales.'
      ] },
      { title: 'Why dates, revisions and missing data matter', paragraphs: [
        'The observation period, publication date and retrieval time are three different clocks. A source checked today can still contain last week’s measurements. A later analysis may also revise an earlier value as more observations or quality controls become available. Record the product version when making a historical comparison.',
        'A failed download does not show that conditions stayed unchanged. ENSOLens retains the last validated data and exposes source health so that continuity is not mistaken for freshness. For scientific interpretation, read the source dates first, then the observed evolution, and finally the forecast. This preserves the distinction between a measurement, an assessment and a future possibility.'
      ] }
    ], checklist: ['Distinguish direct measurements, gridded analyses and indices.', 'Read observation dates separately from retrieval checks.', 'Treat gaps or failed sources as missing evidence, not stable conditions.'],
    sources: [{ title: 'NOAA PMEL: How El Niño is detected', url: 'https://www.pmel.noaa.gov/elnino/faq', date: 'Undated reference; observing methods used, no historical forecast claims reused' }, { title: 'NOAA PSL: ENSO research datasets', url: 'https://psl.noaa.gov/enso/data.html', date: 'No publication date displayed; dataset-method distinctions used' }],
    related: [{ title: 'Dashboard dates and status', href: '/#status-reading-heading' }, { title: 'Data validation and sources', href: '/methodology/' }]
  }
];
