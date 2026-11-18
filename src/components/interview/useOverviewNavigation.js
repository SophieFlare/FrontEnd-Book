export default function useOverviewNavigation(
  concepts,
  setConcept,
  setQuestion,
) {
  function openQuestion(conceptId, questionId) {
    const normalize = (value) =>
      String(value ?? "").trim().toLowerCase();

    const targetConcept = concepts.find(
      (concept) =>
        normalize(concept.id) === normalize(conceptId),
    );

    const searchConcepts = targetConcept ? [targetConcept] : concepts;

    for (const concept of searchConcepts) {
      const targetQuestion = concept.questions?.find(
        (question) =>
          normalize(question.id) === normalize(questionId),
      );

      if (targetQuestion) {
        setConcept(concept);
        setQuestion(targetQuestion);
        return;
      }
    }

    console.warn("Overview navigation failed:", {
      conceptId,
      questionId,
      availableConcepts: concepts.map((concept) => ({
        id: concept.id,
        questions: concept.questions?.map((question) => question.id),
      })),
    });
  }

  return { openQuestion };
}