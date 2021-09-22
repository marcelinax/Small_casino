import React, {useEffect, useState} from 'react';

const Casino: React.FC = () => {

    const [dicesNumber, setDicesNumber] = useState<number[]>([]);
    const [startGame, setStartGame] = useState<boolean>(false);
    const [dicesPosition, setDicesPosition] = useState<{ left: number, top: number }[]>([]);

    const dicePositionCondition = (dicesPositions: { left: number, top: number }[], currentCoordinates: { left: number, top: number }): boolean => {
        console.log(dicesPositions.length);
        for (let i = 0; i < dicesPositions.length; i++) {
            const comparedPosition = dicesPositions[i];
            if (currentCoordinates.left > comparedPosition.left - 100
                && currentCoordinates.left < comparedPosition.left + 100
                && currentCoordinates.top > comparedPosition.top - 100
                && currentCoordinates.top < comparedPosition.top + 100) return true;
        }
        return false;
    };

    const getClassNameForDices = (diceNumber: number): string => {
        switch (diceNumber) {
            case 1:
                return 'dice-with-one-dot';
            case 2:
                return 'dice-with-two-dot';
            case 3:
                return 'dice-with-three-dot';
            case 4:
                return 'dice-with-four-dot';
            case 5:
                return 'dice-with-five-dot';
            case 6:
                return 'dice-with-six-dot';
            default:
                return '';
        }

    };

    const setRandomDicePosition = (): void => {
        const dicesPositions: { left: number, top: number }[] = [];
        const minTop = Math.ceil(10);
        const maxTop = Math.floor(760);
        const minLeft = Math.ceil(10);
        const maxLeft = Math.floor(410);
        let top: number;
        let left: number;

        for (let i = 0; i < 4; i++) {
            do {
                top = Math.floor(Math.random() * (maxTop - minTop + 1)) + minTop;
                left = Math.floor(Math.random() * (maxLeft - minLeft + 1)) + minLeft;
            }
            while (dicePositionCondition(dicesPositions, {left, top}));
            dicesPositions.push({left, top});
        }
        setDicesPosition([...dicesPositions]);
    };

    const setRandomDicesNumber = (): void => {
        const min = Math.ceil(1);
        const max = Math.floor(7);
        const dicesNumber: number[] = [];
        for (let i = 0; i < 4; i++) {
            const diceNumber = Math.floor(Math.random() * (max - min)) + min;
            dicesNumber.push(diceNumber);


        }
        setDicesNumber([...dicesNumber]);

    };


    const renderDicesNumber = (renderingAmount: number): JSX.Element[] => {
        const amountRenderingDicesNumber = [];
        for (let i = 0; i < renderingAmount; i++) {
            amountRenderingDicesNumber.push(
                <span></span>
            );
        }
        return amountRenderingDicesNumber;
    };


    useEffect(() => {
        setRandomDicesNumber();
        setRandomDicePosition();
    }, [startGame]);

    return (
        <div className={'casino'}>

            <div className={'casino-left'}>
                <div className={'casino-left-game-board'}>
                    {dicesPosition.map(({top, left}, index) => (
                        <div className={`dice ${getClassNameForDices(dicesNumber[index])}`} style={{top, left}}>
                            {renderDicesNumber(dicesNumber[index])}
                        </div>
                    ))}

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
                <button onClick={() => setStartGame(!startGame)}>Play</button>
            </div>
            <div className={'casino-right'}>
                <h1>Congratulations! You won $50</h1>
            </div>

        </div>
    );
};

export default Casino;