import { useState } from "react";
import { Outline } from "common/components/outline/Outline";
import { UIOutline } from "domain/common/UIOutline";
import { FixtureWrapper } from "FixtureWrapper";

export default {
  "Outline for Creation": () => {
    const [outlineXML, setOutlineXML] = useState(
      "<Outline><Section name='section1'><Task name='task1' /><Task name='task2' /></Section></Outline>"
    );

    return (
      <FixtureWrapper>
        <Outline
          uiOutline={new UIOutline(outlineXML)}
          onUpdateOutlineCallback={(uiOutline) => {
            console.log("onUpdateOutlineCallback called");
            setOutlineXML(uiOutline._xml);
          }}
        />
      </FixtureWrapper>
    );
  },
  "Outline for Execution": () => {
    const [outlineXML, setOutlineXML] = useState(
      "<Outline><Section name='section1'><Task name='task1' /><Task name='task2' /></Section></Outline>"
    );

    return (
      <FixtureWrapper>
        <Outline
          uiOutline={new UIOutline(outlineXML)}
          checkingEnabled={true}
          taskSelectionEnabled={true}
          onUpdateOutlineCallback={(uiOutline) => {
            console.log("onUpdateOutlineCallback called");
            setOutlineXML(uiOutline._xml);
          }}
        />
      </FixtureWrapper>
    );
  },
};