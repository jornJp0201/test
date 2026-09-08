 type HeaderProps = {
    appName : string;
    totalCount:number;
    completedCount: number;
};

export const Header = ({appName,totalCount,completedCount}: HeaderProps) =>{
    return (
        <header>
            <h3>{appName} : 完了数: {completedCount} / 合計学習数: {totalCount}</h3>
        </header>
    );
}