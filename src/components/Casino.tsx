import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GameMode} from "../enums/GameMode";
import {changeLoggedUserMoney, logOutUser} from "../state/usersSlice";
import {RootState} from "../store";

const Casino: React.FC = () => {

    const [dicesNumber, setDicesNumber] = useState<number[]>([]);
    const [dicesPosition, setDicesPosition] = useState<{ left: number, top: number }[]>([]);
    const [moneyForBet, setMoneyForBet] = useState<number>(0);
    const [sumFromDices, setSumFromDices] = useState<number>(0);
    const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
    const [currentGameMode, setCurrentGameMode] = useState<number>(5);
    const [result, setResult] = useState<number>(0);
    const [userDiceNumber, setUserDiceNumber] = useState<string>('');

    const dispatch = useDispatch();
    const loggedUser = useSelector((state: RootState) => state.users.loggedUser);


    const handleMoneyForBetInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setMoneyForBet(+e.target.value);
    };
    const handleUserDiceNumberInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserDiceNumber(e.target.value);
    };

    const startGame = (): void => {
        if (moneyForBet < 10) {
            setInputErrorMessage("Enter a sum greater than 10!");
            return;
        }
        if (currentGameMode > 4) {
            setInputErrorMessage("Choose a game mode!");
            return;
        }
        if (currentGameMode === 4 && userDiceNumber === '') {
            setInputErrorMessage("Enter a number dice!");
            return;
        }
        if (loggedUser !== null && loggedUser.money <= 0) {
            setInputErrorMessage("You have no money!");
            return;
        }
        setSumFromDices(0);
        setInputErrorMessage('');
        setResult(0);
        setRandomDicesNumber();
        setRandomDicePosition();
    };

    const checkGameResult = (): void => {
        console.log(sumFromDices);
        console.log(moneyForBet);
        if (currentGameMode === GameMode.LESSTHAN14 && sumFromDices < 14) {
            console.log('win');
            setResult(+(moneyForBet * 1.2).toFixed(2));
        } else if (currentGameMode === GameMode.LESSTHANOREQUALTO14 && sumFromDices <= 14) {
            setResult(+(moneyForBet * 1.4).toFixed(2));
        } else if (currentGameMode === GameMode.MORETHAN14 && sumFromDices > 14) {
            setResult(+(moneyForBet * 1.2).toFixed(2));
        } else if (currentGameMode === GameMode.MORETHANOREQUALTO14 && sumFromDices >= 14) {
            setResult(+(moneyForBet * 1.4).toFixed(2));
        } else if (currentGameMode === GameMode.EQUALTO && sumFromDices === +userDiceNumber) {
            setResult(+(moneyForBet * 1.4).toFixed(2));
        } else {
            console.log('lose');
            setResult(moneyForBet * (-1));
        }

    };


    const dicePositionCondition = (dicesPositions: { left: number, top: number }[], currentCoordinates: { left: number, top: number }): boolean => {
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
        if (dicesNumber.length > 0)
            setSumFromDices(dicesNumber.reduce((acc, cur) => acc + cur));
    }, [dicesNumber]);


    useEffect(() => {
        dispatch(changeLoggedUserMoney(loggedUser !== null ? loggedUser.money + result : 0));
    }, [result]);
    useEffect(() => {
        if (sumFromDices > 0)
            checkGameResult();
    }, [sumFromDices]);


    return (
        <div className={'casino'}>
            <div className={'casino-user-box'}>
                <div className={'casino-user-box-account-balance'}>
                    <p>$ {loggedUser !== null ? loggedUser.money.toFixed(2) : ''}</p>
                </div>
                <button onClick={() => dispatch(logOutUser())}><i className="bx bx-log-out"/></button>
            </div>


            <div className={'casino-left'}>
                <div className={'casino-left-game-board'}>
                    {dicesPosition.map(({top, left}, index) => (
                        <div className={`dice ${getClassNameForDices(dicesNumber[index])}`} style={{top, left}}>
                            {renderDicesNumber(dicesNumber[index])}
                        </div>
                    ))}
                    <p>{dicesNumber.length > 0 ? sumFromDices : ''}</p>
                </div>
            </div>
            <div className={'casino-middle'}>
                <div className={'casino-middle-game-betting-modes'}>
                    <button onClick={() => setCurrentGameMode(0)}
                            className={currentGameMode === GameMode.LESSTHAN14 ? 'btn--active' : ''}>Less than 14
                    </button>
                    <button onClick={() => setCurrentGameMode(1)}
                            className={currentGameMode === GameMode.LESSTHANOREQUALTO14 ? 'btn--active' : ''}>Less than
                        or equal
                        to 14
                    </button>
                    <button onClick={() => setCurrentGameMode(2)}
                            className={currentGameMode === GameMode.MORETHAN14 ? 'btn--active' : ''}>More than 14
                    </button>
                    <button onClick={() => setCurrentGameMode(3)}
                            className={currentGameMode === GameMode.MORETHANOREQUALTO14 ? 'btn--active' : ''}>More than
                        or equal
                        to 14
                    </button>
                    <button onClick={() => setCurrentGameMode(4)}
                            className={currentGameMode === GameMode.EQUALTO ? 'btn--active' : ''}>Equal to
                        <input value={userDiceNumber} onChange={handleUserDiceNumberInput}/>
                    </button>
                </div>
                <button onClick={startGame}>Play</button>
            </div>
            <div className={'casino-right'}>
                <div className={'casino-right-bet-box'}>
                    <input value={moneyForBet} onChange={handleMoneyForBetInput}/>
                    {inputErrorMessage ? <span>{inputErrorMessage}</span> : <></>}
                </div>
                {result !== 0 ? <h1>{result < 0 ? `You lost $ ${result * -1}` : `You won $ ${result}`}</h1> : <></>}
                {loggedUser !== null && loggedUser.money < 0 && <h1>You went bankrupt. You can't play any more...</h1>}

            </div>

        </div>
    );
};

export default Casino;