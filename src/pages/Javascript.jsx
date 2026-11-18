import InterviewExplorer from "../components/interview/InterviewExplorer.jsx";
import categories from "../data/js/categories.json";

// 1. LOAD ALL JSON FILES
const files = import.meta.glob("../data/js/*.json", {
  eager: true,
  import: "default",
});

// 2. BUILD CONTENT REGISTRY
const content = Object.fromEntries(
  Object.entries(files)
    .filter(([path]) => !path.endsWith("/categories.json"))
    .map(([path, data]) => [
      path.split("/").pop().replace(".json", ""),
      data,
    ]),
);

// 3. DEBUG CONTENT
console.table(
  categories.categories.map(({ id, title }) => ({
    category: title,
    id,
    loaded: Boolean(content[id]),
    concepts: content[id]?.concepts?.length ?? 0,
    questions:
      content[id]?.concepts?.reduce(
        (total, concept) => total + (concept.questions?.length ?? 0),
        0,
      ) ?? 0,
  })),
);

// 4. RENDER
export default function JavaScript() {
  return <InterviewExplorer subject={categories} content={content} />;
}