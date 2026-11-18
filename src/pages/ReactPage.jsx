import InterviewExplorer from "../components/interview/InterviewExplorer.jsx";
import categories from "../data/react/categories.json";

const files = import.meta.glob("../data/react/*/*.json", {
  eager: true,
  import: "default",
});

const content = Object.fromEntries(
  categories.categories.map((category) => {
    const prefix = `../data/react/${category.id}/`;

    const concepts = Object.entries(files)
      .filter(
        ([path]) =>
          path.startsWith(prefix) && !path.endsWith("/_overview.json"),
      )
      .map(([, concept]) => concept);

    const overview = files[`${prefix}_overview.json`] ?? null;

    return [
      category.id,
      {
        id: category.id,
        title: category.title,
        concepts,
        overview,
      },
    ];
  }),
);

export default function ReactPage() {
  return <InterviewExplorer subject={categories} content={content} />;
}
