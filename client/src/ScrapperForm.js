import React, { Fragment, useState } from "react";
import axios from "axios";

const ScrapperForm = () => {
  const [webLinks, setwebLinks] = useState([]);
  const [currentWebUrl, setcurrentWebUrl] = useState([]);

  const clearWebLinks = () => {
    setwebLinks([]);
  };

  const clearSearch = () => {
    // currentWebUrl = "";
    // document.getElementById("create-course-form").reset();
  };

  const sendUrlToServer = async (passedParameter) => {
    clearWebLinks();
    const res = await axios.get(
      `/api/webpagelinks?websiteUrl=${passedParameter}`
    );

    console.log(`------------------------------`);
    console.log(`sendUrlToServer passedParameter: `, passedParameter);
    console.log(`sendurltoServer. res.data: `, res.data);

    console.log(`sendurlToServer webLinks (before return)`, webLinks);
    console.log(`------------------------------`);
    setwebLinks(res.data);
    return res.data;
  };

  const onChange = (e) => {
    setcurrentWebUrl(e.target.value);
    console.log(`onChange func. currentWebUrl: `, currentWebUrl);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // console.log(`onsubmit webLinks pre sendurltoserver`, webLinks);
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
      <button onClick={clearSearch}>Clear Search</button>
      <p>
        {" "}
        Please insert the URL in the correct format. E.g:
        "https://www.google.com/"
      </p>
      <>
        <h3>Webpage: </h3>
        <h4>{currentWebUrl}</h4>
        {webLinks ? (
          <>
            <h4>Links List</h4>
            <ul>
              {webLinks &&
                webLinks.map((oneLink, index) => (
                  <li key={index}>
                    {" "}
                    <p>{oneLink}</p>
                  </li>
                ))}
            </ul>

            {/* {returnStuff.map((oneLink, index) => (
              <p key={index}>{oneLink}</p>
            ))} */}

            {/* {webLinks.map((oneLink) => (
              <div key={oneLink.index} className="linkItem">
                <p>{oneLink}</p>
              </div>
            ))} */}
          </>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default ScrapperForm;

// //Get Links
// const getLinks = async () => {
//   try {
//     const res = await axios.get("/api/webpagelinks");
//   } catch (err) {
//     console.error(err);
//   }
// };
