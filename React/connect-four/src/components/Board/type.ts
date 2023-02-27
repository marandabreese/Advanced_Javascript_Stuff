import { ChipsPosition } from "../App/types";

export interface Props {
    columns: number;
    rows: number;
    chipsPosition: ChipsPosition;
    onTileClick: (id: string) => any;
}