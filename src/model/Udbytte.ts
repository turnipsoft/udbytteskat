export default class Udbytte {
    virksomhedSkat: Number;
    personligSkat: Number;
    andelBeloeb: Number;
    udbetaltEfterSkat: Number;
    udbetaltFoerSkat: Number;
    fradragIalt: Number;
    grundlagForBeskatning: Number;

    constructor(virksomhedSkat: Number, personligSkat: Number, andelBeloeb: Number, udbetaltEfterSkat: Number, udbetaltFoerSkat: Number, fradragIalt: number) {
        this.virksomhedSkat = virksomhedSkat;
        this.personligSkat = personligSkat;
        this.andelBeloeb = andelBeloeb;
        this.udbetaltEfterSkat = udbetaltEfterSkat;
        this.udbetaltFoerSkat = udbetaltFoerSkat;
        this.fradragIalt = fradragIalt;
        this.grundlagForBeskatning = andelBeloeb.valueOf() - fradragIalt;
    }
}