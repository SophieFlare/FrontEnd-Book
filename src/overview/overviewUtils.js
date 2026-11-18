export function getSummary(question) {
  if (question.summary?.trim()) {
    return question.summary;
  }

  const source =
    question.interviewAnswer || question.answer || question.what || "";

  if (!source.trim()) return "";

  const sentences = source.match(/[^.!?]+[.!?]+|[^.!?]+$/g);

  return (sentences ?? [source]).slice(0, 2).join(" ").trim();
}

export function getSections(concepts = [], overview) {
  const overviewSections = overview?.sections ?? [];

  // No overview file → use original concepts directly
  if (!overviewSections.length) {
    return concepts.map((concept) => ({
      id: concept.id,
      title: concept.title,
      definition: concept.definition,
      keywords: concept.keywords,
      questions: concept.questions ?? [],
    }));
  }

  const sections = overviewSections.map((section) => {
    const sourceConcept = concepts.find((concept) => concept.id === section.id);

    const overviewQuestions = section.questions ?? [];
    const sourceQuestions = sourceConcept?.questions ?? [];

    const overviewById = new Map(
      overviewQuestions.map((question) => [question.id, question]),
    );

    // Original JSON takes priority
    const mergedQuestions = sourceQuestions.map((question) => ({
      ...overviewById.get(question.id),
      ...question,
    }));

    const sourceIds = new Set(sourceQuestions.map((question) => question.id));

    // Preserve questions existing only in _overview.json
    const overviewOnlyQuestions = overviewQuestions.filter(
      (question) => !sourceIds.has(question.id),
    );

    return {
      ...section,
      title: sourceConcept?.title || section.title,
      keywords: sourceConcept?.keywords || section.keywords,
      questions: [...mergedQuestions, ...overviewOnlyQuestions],
    };
  });

  // Include concepts not listed in _overview.json
  const existingIds = new Set(overviewSections.map((section) => section.id));

  const missingSections = concepts
    .filter((concept) => !existingIds.has(concept.id))
    .map((concept) => ({
      id: concept.id,
      title: concept.title,
      definition: concept.definition,
      keywords: concept.keywords,
      questions: concept.questions ?? [],
    }));

  return [...sections, ...missingSections];
}
