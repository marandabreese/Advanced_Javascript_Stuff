import React from "react";
import Board from "../Board/Board";
import { Props, State, ChipsPosition } from "./types";
import styles from "./App.module.css";

export default class App extends React.PureComponent<Props, State> {
    state: State = {
        chipsPosition: {},
        playerTurn: "red",
        gameStatus: "It's red's turn"
    };

    calculateGameStatus = (playerTurn: string, chipsPosition: ChipsPosition): string => {
        const { columns, rows } = this.props;

        for (let row = 0; row < rows; row++) {
            let repetitionCountStatus = { playerChip: "", count: 0 };

            //check count horizontally
            for (let column = 0; column < columns; column++) {
                const chip = chipsPosition[`${row}:${column}`];

                if (chip && chip === repetitionCountStatus.playerChip) {
                    repetitionCountStatus.count++;
                } else {
                    repetitionCountStatus = {playerChip: chip, count: 1};
                }

                if (repetitionCountStatus.count === 4) {
                    return `Player ${repetitionCountStatus.playerChip} won!`;
                }
            }
        }
        
        //check count vertically 
        for (let column = 0; column < rows; column++) {
            let repetitionCountStatus = { playerChip: "", count: 0};

            for (let row = 0; row < rows; row++) {
                const chip = chipsPosition[`${row}:${column}`];

                if (chip && chip === repetitionCountStatus.playerChip) {
                    repetitionCountStatus.count++;
                } else {
                    repetitionCountStatus = { playerChip: chip, count: 1};
                }

                if (repetitionCountStatus.count === 4) {
                    return `Player ${repetitionCountStatus.playerChip} won!`;
                }
            }
        }

        return `It's ${playerTurn}'s turn!`;
    };

    handleTileClick = (tileId: string) => {
        const { chipsPosition, playerTurn } = this.state;

        const column = parseInt(tileId.split(":")[1]);
        let lastEmptyTileId = this.getLastEmptyTile(column);

        if (!lastEmptyTileId) {
            return;
        }

        const newChipsPosition = {
            ...chipsPosition,
            [lastEmptyTileId]: playerTurn
        };

        const newPlayerTurn = playerTurn === 'red' ? 'yellow' : 'red';
        const gameStatus = this.calculateGameStatus(newPlayerTurn, newChipsPosition);

        this.setState({ chipsPosition: newChipsPosition, playerTurn: newPlayerTurn, gameStatus});
    };

    getLastEmptyTile(column: number) {
        const {rows} = this.props;
        const {chipsPosition} = this.state;

        for (let row = rows - 1; row >= 0; row--) {
            const tileId = `${row}:${column}`;
            if (!chipsPosition[tileId]) {
                return tileId;
            }
        }
    }

    renderBoard() {
        const { columns, rows } = this.props;
        const { chipsPosition } = this.state;
        return(
            <Board
            columns={columns}
            rows={rows}
            chipsPosition={chipsPosition}
            onTileClick={this.handleTileClick}
            />
        );
    }

    renderStatusMessage() {
        const { gameStatus } = this.state;
        return <div className={styles.statusMessage}>{gameStatus}</div>
    }

    render(): React.ReactNode {
        return (
            <div className={styles.app}>
                {this.renderBoard()}
                {this.renderStatusMessage()}
            </div>
        );
    }
}