import "./testbed.css";

import React, { useEffect } from "react";

/**
 * Your imports here. For example:
 *
 * import "some-lib/dist/style.css";
 * import { Button } from 'some-lib';
 *
 */

export const App = () => {
  useEffect(() => {
    // App is ready, show the page
    document.body.classList.remove("tb-hidden");
  });

  return (
    <React.Fragment>
      <pre> your code goes here </pre>
    </React.Fragment>
  );
};
