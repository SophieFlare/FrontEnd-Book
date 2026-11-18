import InterviewExplorer from "../components/interview/InterviewExplorer.jsx";
import categories from "../data/js/categories.json";

const files = import.meta.glob("../data/js/*/*.json", {
  eager: true,
  import: "default",
});



const content = Object.fromEntries(
  categories.categories.map((category) => {
    const concepts = Object.entries(files)
      .filter(([path]) =>
        path.startsWith(`../data/js/${category.id}/`),
      )
      .map(([, concept]) => concept);

    return [
      category.id,
      {
        id: category.id,
        title: category.title,
        concepts,
      },
    ];
  }),
);

export default function JavaScript() {
  return <InterviewExplorer subject={categories} content={content} />;
}