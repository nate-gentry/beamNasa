import React from 'react'

export default function Welcome() {
    return (
        
            <div className="jumbotron">
          <h1 className="display-3">Hello, Alex!</h1>
          <p className="lead">
            Use the Mars Rover Photo Api to build a ‘landing page’ (get it) that
            displays the Mars photos on the most recent day with available data.
            Displaying photo metadata is optional/ up to personal
            aesthetic/design choices. Please include the ability to query for
            photos on a certain date as well -- (i.e. see mars when you were
            born etc. )
          </p>
          <hr className="my-4" />
          <ul id="Criteria">
            Evaluation Criteria:
            <li>
              ● Does the default homepage display images of Mars from the most
              recent day with available data? (y/n)
            </li>
            <li>
              ● Does the site have functionality that allows the user to query
              for photos from a specific day? (y/n)
            </li>
            <li>
              ● Do the photos display correctly for the correct date? (y/n)
            </li>
            <li> ● Error Handling</li>
            <li> ● Code Organization</li>
            <li>● Modularity</li>
            <li>● Readability</li>
            <li>● Usability / User experience</li>
            <li> ● Does the ReadMe adequately walk through setup</li>
          </ul>
        </div>
        
    )
}
