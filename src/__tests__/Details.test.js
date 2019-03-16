import React from "react";
import { create } from "react-test-renderer";
import Details from "../Details";

test("snapshot", () => {
  const c = create(<Details />);
  // expect to stay the same over time.
  expect(c.toJSON()).toMatchSnapshot();
});

test("shows modal then toggleModal is called", () => {
  const c = create(<Details search={() => {}} />);
  const instance = c.getInstance();

  expect(instance.state.showModal).toBe(false);
  instance.toggleModal();
  expect(instance.state.showModal).toBe(true);
});
