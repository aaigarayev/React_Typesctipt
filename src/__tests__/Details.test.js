import React from "react";
import { create } from "react-test-renderer";
import Details from "../Details";

test("snapshot", () => {
  const c = create(<Details />);
  // expect to stay the same over time.
  expect(c.toJSON()).toMatchSnapshot();
});
