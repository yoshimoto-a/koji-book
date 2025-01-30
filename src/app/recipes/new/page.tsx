import { ArticleForm } from "./_components/ArticleForm";
export default function MaltArticle() {
  return (
    <div className="max-w-md mx-auto py-10 px-5">
      <h2 className="text-xl pb-5">レシピの投稿</h2>
      <ArticleForm />
    </div>
  );
}
