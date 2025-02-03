import { ArticleForm } from "../_components/AriticleForm";
export default function MaltArticle() {
  return (
    <div className="max-w-md mx-auto py-10 px-5">
      <h2 className="text-xl pb-5">麹調味料レシピの投稿</h2>
      <div>麹調味料のレシピは申請制になります。</div>
      <ArticleForm />
    </div>
  );
}
