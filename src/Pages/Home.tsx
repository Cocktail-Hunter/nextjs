import React, { FC } from "react";

import "./Home.scss";

const Home: FC = () => (
  <div className="page home">
    <h2>Hello,</h2>
    <section>
      <h1>Start making cocktails now</h1>
      <p>
        Add ingredients to your inventory and see a list of cocktails
        you can make using them at home or even at the bar.
      </p>
    </section>
    <section>
      <h1>Manage your inventory of ingredients</h1>
      <p>
        You can add and remove as many ingredients as you like from your inventory
        and you can control your flexibility to allow you to see cocktails you can
        make even if you're missing 1 or 2 ingredients.
      </p>
    </section>
    <section>
      <h1>Make and publish your own cocktails</h1>
      <p>
        You can create your own cocktails and share with everyone else by making it
        public, once your cocktail is approved, it will appear in everyone else's
        results if they have your ingredients and that it matches their flexibility!
      </p>
    </section>
  </div>
);

export default Home;
