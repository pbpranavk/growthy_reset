import React, { useRef, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

import { MarkdownEditor } from "common/components/MarkdownEditor";
import { PreviewSection } from "types";

type Props = {
  sections: PreviewSection[] | undefined;
  selectedSectionIndex: number;
  onTopSectionChangeCallback: (id: number) => void;
};

export const Article: React.FC<Props> = ({
  selectedSectionIndex,
  sections,
  onTopSectionChangeCallback,
}) => {
  const sectionsContainerRef = useRef<HTMLDivElement | null>(null);
  const visibleSectionRefs = useRef<(HTMLDivElement | null)[]>(
    new Array(sections?.length || 0).fill(null)
  );

  const handleScroll = () => {
    const sectionIndexes = visibleSectionRefs.current
      .filter((ref) => ref !== null)
      .map((ref, index) => {
        const { top } = ref!.getBoundingClientRect();
        return { index, top };
      })
      .filter(({ top }) => top >= 0);

    if (sectionIndexes.length > 0) {
      const topSection = sectionIndexes[0];
      onTopSectionChangeCallback(topSection.index);
    }
  };

  useEffect(() => {
    const scrollableElement = sectionsContainerRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
      return () => {
        scrollableElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const setVisibleSectionRef = (node: HTMLDivElement | null, index: number) => {
    visibleSectionRefs.current[index] = node;
  };

  return (
    <Box
      pl="16px"
      ref={sectionsContainerRef}
      css={{
        // Max height calculation is hacky
        maxHeight: "calc(101vh - 135px)",
        overflowY: "scroll",
      }}
    >
      {sections?.map((section, index) => (
        <Box
          key={index}
          mb={10}
          ref={(node) => setVisibleSectionRef(node, index)}
          id={`execute-preview-mode-section-${index}`}
        >
          <Box mb={4}>
            <Text
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={index === selectedSectionIndex ? "blue" : undefined}
            >
              {section.title}
            </Text>
          </Box>
          {section?.tasks?.map((task, index) => {
            return task?.content ? (
              <MarkdownEditor key={index} markdown={task.content} />
            ) : (
              <Box
                height="200px"
                border="2px dashed #e3e3e3"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="gray.500">{`No Content Available for task - ${task.title}`}</Text>
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};
