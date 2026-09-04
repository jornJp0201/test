 
 type LearningLogProps = {
    id: number;
    chapter: number;
    title: string;
    isCompleted: boolean;
}; 

export const LearningLog = ({id, chapter, title, isCompleted}: LearningLogProps) => {
    return (
        <li key={id}>
            Chapter {chapter}: {title} 
            【{isCompleted ? "完了" : "進行中"}】
        </li>
    );
}