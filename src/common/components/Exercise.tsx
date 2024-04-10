import React from "react";
import { useNavigate } from "react-router-dom";
import { TExercise } from "types";
// @ts-expect-error: Svg import
import StudyExerciseIcon from "assets/StudyExerciseIcon.svg?react";
// @ts-expect-error: Svg import
import BlogArticleIcon from "assets/BlogArticleIcon.svg?react";
// @ts-expect-error: Svg import
import TodayILearnedIcon from "assets/TodayILearnedIcon.svg?react";
import { HStack, VStack, Flex, Box, Text } from "@chakra-ui/react";

type Props = {
  exercise: TExercise;
};

export const Exercise: React.FC<Props> = ({ exercise }) => {
  const navigate = useNavigate();

  const handleNavigateToPreviewScreen = () => {
    navigate(`/preview/${exercise.id}`);
  };

  const type: string = exercise.type;
  const title: string = exercise.title;

  return (
    <HStack spacing={4} align="center">
      <Box as="span" color="green.500">
        {type === "blog-article" ? <BlogArticleIcon /> : null}
        {type === "study-exercise" ? <StudyExerciseIcon /> : null}
        {type === "til" ? <TodayILearnedIcon /> : null}
      </Box>
      <VStack align="start" spacing="0">
        <Flex align="center">
          <Text fontSize={"md"} cursor={"pointer"} onClick={handleNavigateToPreviewScreen}>
            {title}
          </Text>
        </Flex>
      </VStack>
    </HStack>
  );
};