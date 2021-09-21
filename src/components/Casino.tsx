import React, {useState} from 'react';

const Casino: React.FC = () => {

    const [dicesNumber, setDicesNumber] = useState<number[]>([]);

    const getRandomDicePosition = (): Object[] => {
        const dicesPositions: Object[] = [];
        const minTop = Math.ceil(100);
        const maxTop = Math.floor(900);
        const minLeft = Math.ceil(100);
        const maxLeft = Math.floor(600);
        const top = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
        const left = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
        for (let i = 0; i < 4; i++) {
            dicesPositions.push({left, top});
        }
        return dicesPositions;
    };

    const setRandomDicesNumber = (): void => {
        const min = Math.ceil(1);
        const max = Math.floor(6);
        for (let i = 0; i < 4; i++) {
            const diceNumber = Math.floor(Math.random() * (max - min)) + min;
            setDicesNumber([...dicesNumber, diceNumber]);
        }
    };

    // const renderDicesNumber = (): JSX.Element[] => {
    //
    // };

    return (
        <div className={'casino'}>

            <div className={'casino-left'}>
                <div className={'casino-left-game-board'}>
                    <div className={'dice'}></div>
                    <div className={'dice'}></div>
                    <div className={'dice'}></div>
                    <div className={'dice'}></div>
                </div>
            </div>
            <div className={'casino-middle'}>
                <div className={'casino-middle-game-betting-modes'}>
                    <button>Less than 14</button>
                    <button>Less than or equal to 14</button>
                    <button>More than 14</button>
                    <button>More than or equal to 14</button>
                    <button>Equal to <input/></button>
                </div>
                <button>Play</button>
            </div>
            <div className={'casino-right'}>
                <h1>Congratulations! You won $50</h1>
            </div>

        </div>
    );
};

export default Casino;