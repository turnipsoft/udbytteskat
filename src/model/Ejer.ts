import Udbytte from './Udbytte';

export default class Ejer {
    navn: string;
    andel: Number;
    gift: boolean;
    udbytte: Udbytte;

    constructor(navn: string, andel: Number, gift: boolean, udbytte: Udbytte) {
        this.andel = andel;
        this.navn = navn;
        this.gift = gift;
        this.udbytte = udbytte;
    }

    public giftString(): string {
        return this.gift ? 'Ja' : 'Nej';
    }
}