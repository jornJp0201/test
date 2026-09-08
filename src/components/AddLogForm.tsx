import { useState } from "react";

type AddLogFormProps = {
  // 親（App.tsx）から「新しいログを追加する関数」を受け取る型定義
  onAddLog: (title: string, chapter: number) => void;
};

export const AddLogForm = ({ onAddLog }: AddLogFormProps) => {
  // 入力フォーム用の State
  const [title, setTitle] = useState<string>("");
  const [chapter, setChapter] = useState<number>(0);

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページ全体の再読み込みを防止

    if (title.trim() === "") return; // 空文字チェック

    // 親の関数を呼び出してデータ追加
    onAddLog(title, chapter);

    // フォームをリセット
    setTitle("");
    setChapter(0);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "15px" }}>
      <h3>新しい学習ログを追加</h3>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Chapter: 
          <input
            type="number"
            value={chapter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChapter(Number(e.target.value))}
            style={{ marginLeft: "10px", width: "60px",color:"white" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          タイトル: 
          <input
            type="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            style={{ marginLeft: "10px", width: "250px" , color:"white"}}
          />
        </label>
      </div>
      <button type="submit">追加する</button>
    </form>
  );
};