<template>
<div>
  <div class="header d-flex justify-content-center">
    <h2><v-icon name="calculator"/> &nbsp;<b>udbytteskat.dk</b></h2>
  </div>
  <div class="container">
    <br/>
    <div class="card udbyttecard" >
        <div class="card-block resizable-block">
          <p>Velkommmen til udbytteskat.dk</p>
          <p>Her på siden finder du en simpel udbytteskat beregner, som på grundlag af et udbytte og informationer om ejerne af virksomheden kan beregne hvor meget der skal betales i skat af hhv. virksomheden og ejerne selv</p>
          <p>Man kan se den detaljerede beregning for hver ejer ved at klikke på den.</p>
          <p>Beregningen tager udgangspunkt i at virksomheden udlodder udbytte direkte til Ejerne som personer og ikke andre virksomheder.</p>
          <br/>
        </div>
    </div>
    <div class="intro">
      <div class="alert alert-danger" role="alert" v-if="errorMessage">
        <strong>Fejl i indtastning</strong> {{errorMessage}}.
      </div>
    </div>
    
    <div class="card udbyttecard" >
        <div class="card-block resizable-block">
          
          <div v-if="!udbytteIndtastet">
          <form name="udbytteform" v-on:submit="submitUdbytte">
          <div class="row">
            <div class="col-8">
          
              <div class="form-group">
                <h5 class="card-title">Udbytte</h5>
                <label for="udbytteInput">Indtast Udbytte for virksomheden</label>
                  <input v-on:keyup="opdaterUdbytte" type="text" autofocus ref="udbytteInput" v-model="udbytte" class="form-control" id="udbytteInput" aria-describedby="udbytteHelp" placeholder="Indtast udbytte">
                  <small id="udbytteHelp" class="form-text text-muted">Indtast det fulde udbytte der skal udloddes her</small>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-8 pull right">
              <button type="submit" class="btn btn-primary">Næste</button>
            </div>
          </div>
          
          </form>
          </div>
          <div v-if="udbytteIndtastet">
            <p>Der beregnes ud fra et udbytte på <b>{{udbytteNumber.toLocaleString('da-DK')}},-</b></p>
          </div>

        </div>
        
      </div>
      <div v-if="udbytteIndtastet">
        <div class="card udbyttecard" >
          <div class="card-block resizable-block">
            <h5 class="card-title">Tilføj ejer</h5>

            <form name="udbytteform" v-on:submit="tilfoejEjer">
              <div class="row">
                  <div class="col-6">
                    <div class="form-group">
                      <label for="ejerInput">Ejers navn</label>
                      <input type="text" ref="navnInput" v-model="ejer" class="form-control" id="ejerInput" aria-describedby="ejerHelp" placeholder="Indtast ejerens navn">
                      <small id="ejerHelp" class="form-text text-muted">Ejers navn</small>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="form-group">
                      <label for="andelInput">Andel</label>
                      <input type="text" v-model="andel" class="form-control" id="andelInput" aria-describedby="andelHelp" placeholder="Andel">
                      <small id="andelHelp" class="form-text text-muted">Ejerens andel i procent</small>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="form-group">
                      <label for="giftInput">Gift</label>
                      <input type="checkbox" v-model="gift" class="form-control" id="giftInput" aria-describedby="giftHelp">
                      <small id="giftHelp" class="form-text text-muted">Er ejeren gift</small>
                    </div>
                  </div>
                
              </div>
            <div class="row">
              <div class="col">
                <p>Hvis ejeren er gift kan man udnytte æftefældens fradrag, såfremt ægtefælden ikke allerede har udnyttet fradraget</p>
                <p>Fradraget udgør i {{aar}} : {{fradrag.toLocaleString('da-DK')}},- pr. person</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 pull right">
                <button type="submit" class="btn btn-primary">Tilføj ejer og beregn</button>
              </div>
            </div>
            
            </form>
            
          </div>
        </div>

        <div class="card tablecard" id="showMobile" v-if="ejere.length>0">
          <div class="card-block resizable-block">
            <h5>Ejere</h5>
            <div v-for="(ejer,index) in ejere" v-bind:key="ejer.navn" v-on:click="visEjerBeregning(index)" class="mouseover">
              <hr/>
              <div class="row">
                <div class="col">
                  {{ejer.navn}} ejer {{ejer.andel.toLocaleString('da-DK')}} % 
                </div>
              </div>
              <div class="row">
                <div class="col-5">
                  Andel  
                </div>
                <div class="col-7">
                  {{ejer.udbytte.andelBeloeb.toLocaleString('da-DK')}},-
                </div>
              </div>
              <div class="row">
                <div class="col-5">
                  Udbytteskat  
                </div>
                <div class="col-7">
                  {{ejer.udbytte.virksomhedSkat.toLocaleString('da-DK')}},-
                </div>
              </div>
              <div class="row">
                <div class="col-5">
                  Personlig skat  
                </div>
                <div class="col-7">
                  {{ejer.udbytte.personligSkat.toLocaleString('da-DK')}},-
                </div>
              </div>
              <div class="row">
                <div class="col-5">
                  Udbetalt  
                </div>
                <div class="col-7">
                  {{ejer.udbytte.udbetaltEfterSkat.toLocaleString('da-DK')}},-
                </div>
              </div>
              <br/>
              <div class="row">
                <div class="col-6">
                  <input type="button" class="btn btn-primary" v-on:click="visEjerBeregning(index)" value="Se detaljeret beregning" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card tablecard" id="showDesktop" v-if="ejere.length>0">
          <div class="card-block resizable-block">
            <h5>Ejere</h5>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Ejer</th>
                  <th>Andel</th>
                  <th>Gift</th>
                  <th>Andel af udbytte</th>
                  <th>Skat (virksomhed)</th>
                  <th>Skat (personlig)</th>
                  <th>Udbetalt efter skat</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ejer, index) in ejere" v-bind:key="ejer.navn" v-on:click="visEjerBeregning(index)" class="mouseover">
                  <td>{{ejer.navn}}</td>
                  <td>{{ejer.andel.toLocaleString('da-DK')}} % </td>
                  <td>{{ejer.giftString()}}</td>
                  <td>{{ejer.udbytte.andelBeloeb.toLocaleString('da-DK')}}</td>
                  <td>{{ejer.udbytte.virksomhedSkat.toLocaleString('da-DK')}}</td>
                  <td>{{ejer.udbytte.personligSkat.toLocaleString('da-DK')}}</td>
                  <td>{{ejer.udbytte.udbetaltEfterSkat.toLocaleString('da-DK')}}</td>
                  <td><span title="Se detaljer om berening af skatten"><v-icon name="search" /></span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="card udregningcard" v-if="vistEjer">
          <div class="card-block resizable-block">
            <h5 class="card-title">Beregning og vejledning for ejeren {{vistEjer.navn}}</h5>
            <p>Virksomheden udlodder ialt {{udbytteNumber.toLocaleString('da-DK')}},- i udbytte og <b>{{vistEjer.navn}}</b> ejer {{vistEjer.andel.toLocaleString('da-DK')}} % af firmaet, andelen af udbyttet er derfor:</p>
            <p><b>{{vistEjer.udbytte.andelBeloeb.toLocaleString('da-DK')}},-</b></p>
            <br/>
            <hr/>
            <h6><v-icon name="industry"/> &nbsp; Udbytteskat</h6>
            <p>Virksomheden skal betale udbytteskatten på {{udbytteskatteprocent}} % af dette beløb: </p>
            <p><b>{{vistEjer.udbytte.virksomhedSkat.toLocaleString('da-DK')}},-</b></p>
            <div class="infobox">
              <p><small>Dette betales til skat med et indbetalingsid eller girokortnummer som man får fra revisor i forbindelse med at regnskabet selvangives.
                Bemærk at denne indbetaling skal senest foretages d. 10 i måneden efter at udbyttet er udbetalt. Dog d. 17 i januar.
                <br/>
                <a href="https://skat.dk/skat.aspx?oId=2234902" target="_blank"> Læs mere om udbytteskat og hvordan man indbetaler her</a></small></p>
            </div>
            <br/>
            <hr/>
            <h6><v-icon name="user-tie"/>&nbsp; Personlig Skat</h6>
            <p>Der er et fradrag på <b>{{vistEjer.udbytte.fradragIalt.toLocaleString('da-DK')}},-</b> da ejeren <span v-if="!vistEjer.gift">ikke</span> udnytter ægtefældens fradrag</p>
            <p>Grundlaget for den personlige beskatning er derfor:</p>
            <p><b>{{vistEjer.udbytte.grundlagForBeskatning.toLocaleString('da-DK')}},-</b> &nbsp; <small class="muted">( {{vistEjer.udbytte.andelBeloeb.toLocaleString('da-DK')}} - {{vistEjer.udbytte.fradragIalt.toLocaleString('da-DK')}} )</small> </p>
            <p>Ejeren skal betale {{skatteprocent}} % af beløbet der overstiger fradraget, men da virksomheden har betalt de første {{udbytteskatteprocent}} % skal 
              ejeren betale {{skatteprocent-udbytteskatteprocent}} % af {{vistEjer.udbytte.grundlagForBeskatning.toLocaleString('da-DK')}},- ialt:</p>
            <p><b>{{vistEjer.udbytte.personligSkat.toLocaleString('da-DK')}},-</b></p>
            <div class="infobox">
              <p><small>Dette beløb skal indbetales til skat ved at logge ind på skat med sit NemID og vælge frivillig indbetaling af restskat for året. 
                Skatten skal betales inden årsskiftet, men vær opmærksom på at skat, i forbindelse med at udbyttet indberettes, kan lave en ny forskudsopgørelse som bevirker
                at udbyttet bliver regnet som B-skat. Sker dette skal ejeren selv ind og rette forskudsopgørelsen tilbage, men husk stadig at indbetale restskatten som beskrevet.</small></p>
            </div>
            <br/>
            <hr/>
            <h6>Udbetalt efter skat</h6>
            <p>Ejeren får således udbetalt {{vistEjer.udbytte.udbetaltFoerSkat.toLocaleString("da-DK")}} som der skal svares ovenstående personlige skat af, 
              hvilket betyder at det beløb der er tilbage efter skat bliver:</p>
            <p><b>{{vistEjer.udbytte.udbetaltEfterSkat.toLocaleString('da-DK')}},-</b></p>
          </div>
        </div>
        
      </div>
      <div class="end">
        <div class="row">
          <div class="col">
            <form v-on:submit="resetForm">
              <button type="submit" class="btn btn-primary aligned">Start Forfra</button>
            </form>
          </div>
        </div>
      </div>
      
    </div>
    <br/>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Ejer from '../model/Ejer'
import Udbytte from '../model/Udbytte';

@Component
export default class UdbytteSkat extends Vue {
  udbytte: string = ''; 
  udbytteNumber: number = 0;
  udbytteIndtastet: boolean = false;
  aar: Number = 2018;
  fradrag: Number = 52900;
  ejer: string = '';
  andel: string = '';
  gift: boolean = false;
  skatteprocent: number = 42;
  udbytteskatteprocent: number = 27;
  vistEjer: Ejer = null;
  errorMessage: String = '';

  ejere: Ejer[] = [];
  //@Prop() private msg!: string;

  opdaterUdbytte() {
    const s: string = this.udbytte.replace(/\./g, '');
    const n: number = Number.parseFloat(s);
    if (n) {
      this.udbytte = n.toLocaleString('da-DK');
    }
  }

  submitUdbytte(e: any) {
    e.preventDefault();
    this.errorMessage = '';
    const s: string = this.udbytte.replace(/\./g, '');
    this.udbytteNumber = Number.parseFloat(s);

    if (isNaN(this.udbytteNumber)) {
      this.errorMessage = 'Udbyttet skal være et tal';
      return;
    }

    if (this.udbytteNumber<0) {
      this.errorMessage = 'Man kan ikke udlodde negativt udbytte';
      return;
    }
    this.udbytteIndtastet=true;
    let self = this;
    Vue.nextTick(function () {
      let elem = <HTMLInputElement> self.$refs.navnInput;
      elem.focus();
    });
  }

  validateEjer(): String {
    
    if (this.ejer==='') {
      return 'Ejerens navn skal angives';
    }

    if (this.andel==='') {
      return 'Andel må ikke være tom'
    }

    const andel = Number.parseFloat(this.andel);
    if (isNaN(andel)) {
      return 'Den angivne andel er ikke et validt tal'
    }

    if (andel<0 || andel>100) {
      return 'Andelen skal være mellem 0 og 100 %'
    }

    let ialt: number = 0;
    this.ejere.forEach( (ejer)=> {
      ialt+=ejer.andel.valueOf();
    });

    ialt+=andel;

    if (ialt>100) {
      return 'De samlede andele må ikke overstige 100%';
    }

    return '';
  }

  tilfoejEjer(e: any) {
    e.preventDefault();
    this.errorMessage = this.validateEjer()
    if (this.errorMessage) {
      return;
    }
    const andel: Number = Number.parseFloat(this.andel.replace(',','.'));
    const udbytte: Udbytte = this.beregnUdbytte(this.udbytteNumber, andel, this.gift)
    const ejer: Ejer = new Ejer(this.ejer, andel, this.gift, udbytte);
    this.ejere.push(ejer);
    this.reset();
    const mq = window.matchMedia( "(min-width: 1000px)" );
    if (mq.matches) {
      let elem = <HTMLInputElement> this.$refs.navnInput;
      elem.focus();
    }
  }

  beregnUdbytte(udbytte: Number, ejerandel: Number, gift: boolean): Udbytte {
    const andel: number = this.udbytteNumber*(ejerandel.valueOf()/100);
    const fradrag: number = this.gift? this.fradrag.valueOf()*2 : this.fradrag.valueOf();
    let grundlagforbeskatning: number = andel - fradrag;
    if (grundlagforbeskatning<0) {
      grundlagforbeskatning = 0;
    }
    const difference: number = this.skatteprocent-this.udbytteskatteprocent;
    let personligbeskatning: number = grundlagforbeskatning * (difference/100);
    if (personligbeskatning<0) {
      personligbeskatning = 0;
    }
    let udbytteskat: number = andel*(this.udbytteskatteprocent/100);
    if (udbytteskat<0) {
      udbytteskat = 0;
    }

    let udbetaltindenskat: number = andel - udbytteskat;
    if (udbetaltindenskat<0) {
      udbetaltindenskat = 0;
    }
    
    const efterskat: number = udbetaltindenskat-personligbeskatning;

    return new Udbytte(udbytteskat,personligbeskatning,andel,efterskat, udbetaltindenskat, fradrag);
  }

  resetForm(e: any) {
    e.preventDefault();
    this.ejere = [];
    this.udbytte = '';
    this.udbytteIndtastet = false;
    this.vistEjer = null;
    let self=this;
    Vue.nextTick(function () {
      let elem = <HTMLInputElement> self.$refs.udbytteInput;
      elem.focus();
    });
  }

  reset() {
    this.ejer = '';
    this.gift = false;
    this.andel = '';
  }

  visEjerBeregning(index: number) {
    this.vistEjer = this.ejere[index]; 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.card {
  margin-bottom: 20px;
  margin-left:10%;
  margin-right:10%;
  padding: 10px 10px 10px 10px;
}

.intro {
  margin-left: 10%;
  margin-right: 10%;
}

.aligned {
  margin-left: 10%;
}

.mouseover {
  cursor: pointer;
}

.infobox {
  background-color: #434461;
  color: white;
  border-radius: .25rem;
  padding-left: 5px;
}

h5 {
  color: #434461;
  font-weight: bolder;
}

h6 {
  color: #434461;
}

.header {
  background-color: #14153a;
  color: white;
}

.btn-primary {
  background-color: #434461;
  border-color: #434461;
}

@media screen and (max-width: 999px) {
  #showDesktop {
    visibility: hidden;
    height: 0;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
  };
}

@media screen and (max-width: 999px) {
  .card {
    margin-left: 1px;
    margin-right: 1px;
  };
}

@media screen and (max-width: 999px) {
  .end {
    margin-left: 1px;
    margin-right: 1px;
  };
}

@media screen and (min-width: 1000px) {
  #showDesktop {
    visibility: visible;
  };
}

@media screen and (min-width: 1000px) {
  #showMobile {
    visibility: hidden;
    height: 0;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
  }
}

@media screen and (max-width: 900px) {
  .container {
    font-size: 14px
  };
}

@media screen and (max-width: 900px) {
  .aligned {
    margin-left: 10px;
  }
}

@media screen and (max-width: 999px) {
  ::-webkit-input-placeholder {
    font-size: 14px!important;
  }
}
</style>
