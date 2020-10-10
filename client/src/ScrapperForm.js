import React, { Fragment, useState, Link } from "react";
import axios from "axios";

const ScrapperForm = () => {
  const [webLinks, setwebLinks] = useState([]);
  const [currentWebUrl, setcurrentWebUrl] = useState([]);

  const clearWebLinks = () => {
    setwebLinks([]);
  };

  const sendUrlToServer = async (passedParameter) => {
    clearWebLinks();
    const res = await axios.get(
      `/api/webpagelinks?websiteUrl=${passedParameter}`
    );

    console.log(`------------------------------`);
    console.log(`sendUrlToServer passedParameter: `, passedParameter);
    console.log(`sendurltoServer. res.data: `, res.data);

    setwebLinks(res.data);
    console.log(`sliced web links: `, webLinks.slice(0, 10));
    console.log(`------------------------------`);
    return res.data;
  };

  const onChange = (e) => {
    setcurrentWebUrl(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(`onSubmit Func currentWebUrl: `, currentWebUrl);

    sendUrlToServer(currentWebUrl);
    console.log(`onSubmit function webLinks: `, webLinks);
  };

  let returnStuff = Array.from(webLinks);

  return (
    <div>
      <h1>Get Links from a specific URL</h1>
      <form onSubmit={onSubmit} className="inputWebForm">
        <input
          type="text"
          placeholder="Please enter URL to get the links..."
          name="webpageUrl"
          value={currentWebUrl}
          onChange={onChange}
        />
        <input type="submit" value="Get Links" />
      </form>
      {/* <button>Clear Search</button> */}
      <p>
        {" "}
        Please insert the URL in the correct format. E.g:
        "https://www.google.com/"
      </p>
      <>
        <h3>Scanned Webpage: </h3>
        <h4>{currentWebUrl}</h4>
        {webLinks ? (
          <>
            <h4>First 10 links</h4>
            <ul>
              {webLinks &&
                webLinks.slice(0, 10).map((oneLink, index) => (
                  <li key={index}>
                    <a href={oneLink} target="_blank" rel="noopener noreferrer">
                      {oneLink}
                    </a>
                  </li>
                ))}
            </ul>
          </>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default ScrapperForm;
