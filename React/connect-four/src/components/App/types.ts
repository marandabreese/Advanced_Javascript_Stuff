export interface ChipsPosition {
    [key: string]: Player;
}

export type Player = "red" | "yellow" | "";
export interface Props {
    columns: number;
    rows: number;
}

export interface State {
    chipsPosition: ChipsPosition;
    gameStatus: string;
    playerTurn: Player;
}