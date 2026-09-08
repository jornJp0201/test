 
 type LearningLogProps = {
    id: number;
    chapter: number;
    title: string;
    isCompleted: boolean;
    onToggle: (id: number) => void; 
    onDelete: (id: number) => void;
}; 

export const LearningLog = ({
    id, chapter, title, isCompleted,onToggle, onDelete

}: LearningLogProps) => {
    return (
        <li style={{ marginBottom: "8px" }}>
      Chapter {chapter}: {title} 【{isCompleted ? "完了" : "進行中"}】
      {/* ボタンを押したら親から受け取った onToggle(id) を実行 */}
      <button onClick={() => onToggle(id)} style={{ marginLeft: "10px" }}>
        ステータス切り替え
      </button>

      <button 
        onClick={() => onDelete(id)} 
        style={{ marginLeft: "5px", color: "red" }}
      >
        削除
      </button>
    </li>
    );
}