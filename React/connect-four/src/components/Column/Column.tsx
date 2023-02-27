import React from "react";
import styles from './Column.module.css';
import { Props } from './types';
import Tile from "../Tile/Tile";

export default class Column extends React.PureComponent<Props> {
    render(): React.ReactNode {
        const { column, row, chipsPosition, onTileClick} = this.props;
        const tiles = [];

        for (let i = 0; i < row; i++) {
            const tileId = `${i}:${column}`;
            const chipType = chipsPosition[tileId];
            tiles.push(
                <Tile
                key={tileId}
                id={tileId}
                chipType={chipType}
                onClick={onTileClick}
                />
            );
        }
        return <div className={styles.column}>{tiles}</div>
    }

    
}