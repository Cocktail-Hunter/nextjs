import { FC } from "react";

import "./About.scss";

const About: FC = () => (
  <div className="page about">
    <h2>Why?</h2>
    <section>
      <h1>Context</h1>
      <p>
        Like some families, we have that one cupboard that's full of alcohol that most likely just
        sits there and collects dust. With my recent job as a bartender, looking at my cupboard at
        home, I didn't really know what type of cocktails I could make and sure I can simply search
        it up but that sounded like lot of hassle and back and forth between tabs. That is when the
        idea sparked to create this app to allow people such as myself to be able to simply put all
        that you have and let the app do its thing and show you specific cocktails that you can make
        straight away and treat yourself to a nice cocktail that you can make at home.
      </p>
    </section>
    <h2>Creators</h2>
    <section>
      <h1>Chumak, Eray</h1>
      <p>Frontend Developer</p>
    </section>
    <section>
      <h1>Law, William</h1>
      <p>Backend Developer</p>
    </section>
    <h2>Credits</h2>
    <section>
      <h1>Rodrigues, Andrea</h1>
      <p>We thank Andrea for the beautiful logo she created for us.</p>
    </section>
  </div>
);

export default About;
