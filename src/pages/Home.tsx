import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page home">
      <h1>Cocktail Hunter</h1>
      <p>Find cocktails you can make based on your inventory.</p>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <section>
        <h2>Context</h2>
        <p>
          People sometimes don't have a wide variety of alcohol in their
          homes and might not want to go all the way to the store for that
          one mysterious ingredient.
        </p>
      </section>
      <section>
        <h2>This is where this app comes in...</h2>
        <p>
          Users will be able to input a list of all the alcohol and ingredients
          they've got and the app will return all possible cocktails the user
          can make. By default, it will result with cocktails strictly with the
          ingredients the user has but it can be toggled off where the app can
          result with cocktails with 1-2 missing ingredients.
        </p>
      </section>
      <section>
        <h2>Long term plans</h2>
        <p>
          Users are able to publish their own cocktail recipes that they've
          discovered or want to share with the community.
        </p>
      </section>
      <footer>
        <hr/>
        <ul>
          <li>
            <Link to="/tos">Terms of Service</Link>
          </li>
          <li>
            <Link to="/privacy policy">Privacy Policy</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Home;
