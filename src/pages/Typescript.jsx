import SubjectPage from "../components/ui/SubjectPage.jsx";

const topics = [
  "TypeScript Fundamentals",
  "TypeScript vs JavaScript",
  "Static Typing & Type Inference",
  "Primitive Types",
  "any vs unknown vs never",
  "void vs undefined",
  "Type Aliases vs Interfaces",
  "Optional & Readonly Properties",
  "Union & Intersection Types",
  "Literal Types",
  "Enums vs Union Types",
  "Tuples & Arrays",
  "Functions & Type Signatures",
  "Function Overloads",
  "Generics",
  "Generic Constraints",
  "keyof & typeof",
  "Indexed Access Types",
  "Type Assertions",
  "Type Guards",
  "Type Narrowing",
  "Discriminated Unions",
  "Utility Types",
  "Partial / Required / Readonly",
  "Pick / Omit / Record",
  "Exclude / Extract / NonNullable",
  "ReturnType / Parameters",
  "Mapped Types",
  "Conditional Types",
  "Infer Keyword",
  "Template Literal Types",
  "Classes & Access Modifiers",
  "Abstract Classes",
  "Implements vs Extends",
  "Structural Typing",
  "Type Compatibility",
  "Declaration Files",
  "Namespaces vs Modules",
  "tsconfig Configuration",
  "Strict Mode",
  "TypeScript with React",
  "Typing Props & State",
  "Typing Hooks",
  "Typing Events & Refs",
  "Generic React Components",
  "TypeScript with Redux Toolkit",
  "Common TypeScript Interview Challenges",
];

export default function TypeScript() {
  return (
    <SubjectPage
      title="TypeScript"
      short="TS"
      description="Understand TypeScript's type system, generics, advanced type transformations and type-safe application architecture."
      topics={topics}
    />
  );
}