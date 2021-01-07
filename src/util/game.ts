import { io, Socket } from "socket.io-client"

enum MsgTypes {
    questionStart = "questionStart",
    questionEnd = "questionEnd",
    gameStart = "gameStart",
    gameEnd = "gameEnd",
    topUsers = "topUsers",
    questions = "questions",
    chat = "chat"
};

interface OpentdbQuestion {
    category: string,
    type: "multiple" | "boolean",
    difficulty: "medium" | "easy" | "hard",
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
};

export interface UserScore {
    username: string;
    score: number;
}

export class Game {

    socket: Socket;

    constructor() {
        this.socket = io("http://localhost:3000");
    }

    startGame(answerMaxTime: number) {
        this.socket.emit(MsgTypes.gameStart, answerMaxTime);
    }

    startQuestion(answer: string) {
        this.socket.emit(MsgTypes.questionStart, answer);
    }

    endQuestion() {
        this.socket.emit(MsgTypes.questionEnd);
    }

    topUsers(n: number) {
        return new Promise((res, rej) => {
            this.socket.emit(MsgTypes.topUsers, n, (data: any) => {
                res(data)
            });
        }) as Promise<UserScore[]>;
    }

    questions(n: number) {
        return new Promise((res, rej) => {
            this.socket.emit(MsgTypes.questions, n, (data: any) => {
                res(data)
            });
        }) as Promise<OpentdbQuestion[]>;
    }

    sendMessage(msg: string) {
        this.socket.emit(MsgTypes.chat, msg);
    }
}