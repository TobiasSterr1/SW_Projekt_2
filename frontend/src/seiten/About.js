import React, { Component } from "react";
import { Typography, Divider } from "@mui/material";
import Link from '@mui/material/Link';

/**
 * Zeigt die About Page mit den Verantwortlichen, die Autoren und ihre Bereiche an; inklusive Verlinkung zu den Github Profilen
 */

class About extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="main-content" style={{ textAlign: "center" }}>
        <div
          className="content"
          style={{
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography variant='h4'>
            Swiftboard
          </Typography>
          <br />

          <h4>Database</h4>
          <Typography>
            Database erstellt von <Link href='https://github.com/WilliKoljada'>Willi Koljada</Link> <br />
            Database erstellt von <Link href='https://github.com/Ayhan-Coemert'>Ayhan Cömert</Link> <br />
          </Typography>
          <br />

          <h4> React Frontend</h4>
          <Typography>
            React Frontend erstellt von <Link href='https://github.com/soumayyahaboubakar'>Soumayyah Aboubakar</Link> <br />
            React Frontend erstellt von <Link href='https://github.com/aniqakhan21'>Aniqa Khan</Link> <br />
            React Frontend erstellt von <Link href='https://github.com/Ayhan-Coemert'>Ayhan Cömert</Link> <br />
            React Frontend erstellt von <Link href='https://github.com/WilliKoljada'>Willi Koljada</Link> <br />
            React Frontend erstellt von <Link href='https://github.com/benjamintok'>Benjamin Tok</Link> <br />
            React Frontend erstellt von <Link href='https://github.com/TobiasSterr1'>Tobias Sterr</Link> <br />
          </Typography>
          <br />

          <h4>Python Backend </h4>
          <Typography>
            Python Backend erstellt von <Link href='https://github.com/soumayyahaboubakar'>Soumayyah Aboubakar</Link> <br />
            Python Backend erstellt von <Link href='https://github.com/aniqakhan21'>Aniqa Khan</Link> <br />
            Python Backend erstellt von <Link href='https://github.com/Ayhan-Coemert'>Ayhan Cömert</Link> <br />
            Python Backend erstellt von <Link href='https://github.com/WilliKoljada'>Willi Koljada</Link> <br />
            Python Backend erstellt von <Link href='https://github.com/benjamintok'>Benjamin Tok</Link> <br />
            Python Backend erstellt von <Link href='https://github.com/TobiasSterr1'>Tobias Sterr</Link> <br />
          </Typography>

          <br />
          <Typography variant='body2'>
            © Hochschule der Medien 2024, all rights reserved.
          </Typography>
        </div>
      </div>
    );
  }
}

export default About;