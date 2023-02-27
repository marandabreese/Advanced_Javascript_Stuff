import React from "react";
import Column from "../Column/Column";
import styles from "./Board.module.css";
import { Props } from "./type";

export default class Board extends React.PureComponent<Props> {
    renderColumns() {
        const { columns, rows, chipsPosition, onTileClick } = this.props;
        const columnsComponents = [];

        for (let column = 0; column < columns; column++) {
            columnsComponents.push(
                <Column
                key={column}
                column={column}
                row={rows}
                chipsPosition={chipsPosition}
                onTileClick={onTileClick}
                />
            );
        }
        return <>{columnsComponents}</>;
    }

    render(): React.ReactNode {
        return <div className={styles.board}>{this.renderColumns()}</div>
    }
}