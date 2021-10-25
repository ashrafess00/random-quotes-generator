import React, { useState } from "react";
import "./quoteStyle.css";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faTumblr,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";

const QuoteMachine = () => {
  const [data, setData] = useState("");
  let colors = [
    "#FF0000",
    "#FF7F00",
    "#cfcf15",
    "#4d8714",
    "#00FF00",
    "#00FF7F",
    "#1a9f9f",
    "#007FFF",
    "#0000FF",
    "#7F00FF",
    "#FF00FF",
    "#FF007F",
  ];
  useEffect(() => {
    async function randomQuote() {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setData(data);
    }
    randomQuote();
    return () => {};
  }, []);
  console.log(data);

  async function randomQuote() {
    document.querySelector("p").classList.remove("pp_anim");

    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    setData(data);
    document.documentElement.style.setProperty(
      "--mainColor",
      colors[Math.floor(Math.random() * 12)]
    );
    document.querySelector("p").classList.add("pp_anim");
  }

  return (
    <div className="card">
      <div className="quoteContainer">
        <FontAwesomeIcon icon={faQuoteLeft} className="quote" />
        <p>{data.content}</p>
      </div>
      <span className="author">- {data.author}</span>
      <div className="flex">
        <a
          href={`https://twitter.com/intent/tweet?text="${data.content}"  -${data.author}&hashtags=quotes`}
          target="_blank"
        >
          <FontAwesomeIcon icon={faTwitter} className="icon" />
        </a>
        <a
          href={`http://tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=Unknown&title=myTitle&content=${data.content}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
          target="_blank"
        >
          <FontAwesomeIcon icon={faTumblr} className="icon" />
        </a>
        {/* //////////////////////// */}
        <a href={`whatsapp://send?text=${data.content}`} target="_blank">
          <FontAwesomeIcon icon={faWhatsapp} className="icon" />
        </a>
        <button className="newQuote btn" onClick={() => randomQuote()}>
          new Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteMachine;
