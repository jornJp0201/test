 type HeaderProps = {
    appName : string;
    totalCount:number;
};

export const Header = ({appName,totalCount}: HeaderProps) =>{
    return (
        <header>
            <h3>{appName} : 合計学習数: {totalCount}</h3>
        </header>
    );
}