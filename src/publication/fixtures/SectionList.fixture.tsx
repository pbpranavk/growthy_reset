import { SectionList } from "publication/components/SectionList";
import { FixtureWrapper } from "../../fixtures/FixtureWrapper";
import { PublicationSection } from "types";
import { useState } from "react";

const publicationSections: PublicationSection[] = [
  {
    title: "Introduction to My Sanskrit Journey",
    content: "Dummy Content 5",
  },
  {
    title: "Discovering The Sanskrit Channel",
    content: "Dummy content 4",
  },
  {
    title: "My Daily Sanskrit Learning Routine",
    content: "Dummy content 3",
  },
  {
    title: "Reflections and Impressions",
    content: "Dummy content 1\nDummy content 2",
  },
];

export default {
  "Without Callback": (
    <FixtureWrapper>
      <SectionList
        publicationSections={publicationSections}
        selectedSectionIndex={0}
      />
    </FixtureWrapper>
  ),

  "With Callback": () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0);
    const onSelectionCallback = (id: number) => {
      setSelectedSectionIndex(id);
    };

    return (
      <FixtureWrapper>
        <SectionList
          publicationSections={publicationSections}
          onSelectionCallback={onSelectionCallback}
          selectedSectionIndex={selectedSectionIndex}
        />
      </FixtureWrapper>
    );
  },
};
