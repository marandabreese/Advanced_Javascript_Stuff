import { ChipsPosition } from "../App/types";

export interface Props {
    column: number;
    row: number;
    chipsPosition: ChipsPosition;
    onTileClick: (id: string) => any;
}